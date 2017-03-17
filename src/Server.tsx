import { mutating, Node } from 'tweed'
import { Renderer } from './types'
import { clamp } from './utils'

export class Server implements Renderer {
  private static instance: Server

  protected ws?: WebSocket = undefined
  protected url: string
  protected unsentMessages: string[] = []
  protected timeout?: number = undefined

  @mutating protected isConnected: boolean = false
  @mutating protected bounce?: number = undefined

  // This must run off of a URL so that the UI can
  // run on the server and you can control it from remote
  //
  protected scheduleReconnect() {
    if (this.bounce === undefined) {
      this.bounce = 1
    } else {
      this.bounce = clamp(this.bounce * 2, 0, 120)
    }
    console.log("Reconnecting in: " + this.bounce)
    this.timeout = setTimeout(this.ensureRunning.bind(this), this.bounce * 1000)
  }

  protected ensureRunning() {
    console.log("Connecting: " + this.url)
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout)
      this.timeout = undefined;
    }
    this.ws = new WebSocket(this.url)
    this.ws.onopen = () => {
      this.bounce = undefined
      this.isConnected = true
      while(this.unsentMessages.length > 0 && this.ws) {
        let message = this.unsentMessages.pop()
        this.ws.send(message)
      }
    }

    this.ws.onclose = () => {
      this.isConnected = false
      console.error("The server stopped")
      this.scheduleReconnect()
    }
    this.ws.onmessage = (evt) => {
      console.log("Message: " + evt.data)
    }
  }

  constructor(url: string) {
    this.url = url
    this.ensureRunning()
  }

  public static getSingleton(url: string) {
    if (!Server.instance) {
      Server.instance = new Server(url)
    }
    return Server.instance
  }

  public send(message: string) {
    if (this.ws === undefined) {
      this.unsentMessages.push(message)
    } else {
      this.ws.send(message)
    }
  }


  public render (): Node {
    var classes:{[index: string]: boolean} = {
      'fa': true,
    }
    var text = "connected."
    if (this.isConnected) {
      classes['fa-link'] = true
    } else if (this.timeout) {
      text = "unable to connect. Will try again in " + this.bounce + " seconds."
      classes['fa-refresh'] = true
    } else if (this.bounce) {
      text = "reconnecting"
      classes['fa-spin'] = classes['fa-spinner'] = true

    }
    return (
      <a class="level-item" on-click={this.ensureRunning.bind(this)}>
        <i class={classes} />&nbsp;
        <span> {text}</span>
      </a>
    )
  }
}
