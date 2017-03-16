import { Node } from 'tweed'
import { Renderer } from './types'
import { Router } from 'tweed-router'
import { Server } from './Server'

export class DelilaFooter implements Renderer {
  protected router: Router;
  protected server: Server;

  constructor (router: Router) {
    this.router = router
    this.server = new Server("ws://127.0.0.1:3012")
  }

  render (): Node {
    return (
      <footer>
        <div class="level">
          <div class="level-left">
            {this.server}
          </div>
        </div>
      </footer>
    )
  }
}
