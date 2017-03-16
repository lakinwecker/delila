import { mutating, Node } from 'tweed'
import { Renderer } from './types'
import { clamp } from './utils'

export class Server implements Renderer {
  private static _instance: Server

  protected ws?: WebSocket = undefined
  protected url: string
  @mutating protected is_open: boolean = false
  protected unsent_messages: string[] = []
  @mutating protected bounce?: number = undefined
  protected timeout?: number = undefined

  // This must run off of a URL so that the UI can
  // run on the server and you can control it from remote
  //
  protected schedule_reconnect() {
    if (this.bounce === undefined) {
      this.bounce = 1
    } else {
      this.bounce = clamp(this.bounce * 2, 0, 120)
    }
    console.log("Reconnecting in: " + this.bounce)
    this.timeout = setTimeout(this.ensure_running.bind(this), this.bounce * 1000)
  }

  protected ensure_running() {
    console.log("Connecting: " + this.url)
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout)
      this.timeout = undefined;
    }
    this.ws = new WebSocket(this.url)
    this.ws.onopen = () => {
      this.bounce = undefined
      this.is_open = true
      while(this.unsent_messages.length > 0 && this.ws) {
        let message = this.unsent_messages.pop()
        this.ws.send(message)
      }
    }

    this.ws.onclose = () => {
      this.is_open = false
      console.error("The server stopped")
      this.schedule_reconnect()
    }
    this.ws.onmessage = (evt) => {
      console.log("Message: " + evt.data)
    }
  }

  constructor(url: string) {
    this.url = url
    this.ensure_running()
  }

  public static getSingleton(url: string) {
    if (!Server._instance) {
      Server._instance = new Server(url)
    }
    return Server._instance
  }

  public send(message: string) {
    if (this.ws === undefined) {
      this.unsent_messages.push(message)
    } else {
      this.ws.send(message)
    }
  }


  public render (): Node {
    var classes:{[index: string]: boolean} = {
      'fa': true,
    }
    var text = "connected."
    if (this.is_open) {
      classes['fa-link'] = true
    } else if (this.timeout) {
      text = "unable to connect. Will try again in " + this.bounce + " seconds."
      classes['fa-refresh'] = true
    } else if (this.bounce) {
      text = "reconnecting"
      classes['fa-spin'] = classes['fa-spinner'] = true

    }
    return (
      <a class="level-item" on-click="{this.ensure_running}">
        <i class={classes} />
        <span> {text}</span>
      </a>
    )
  }
}
