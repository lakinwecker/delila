import { Node } from 'tweed'
import { Renderer } from './types'
import { Router } from 'tweed-router'

export class DelilaHeader implements Renderer {
  protected router: Router;

  constructor (router: Router) {
    this.router = router
  }

  render (): Node {
    return (
      <header>
        <nav class="nav">
          <div class="nav-left">
            <a class="nav-item delila">Delila</a>
          </div>

          <div class="nav-right nav-menu">
            <a class="nav-item">Study</a>
            <a class="nav-item">Practice</a>
            <a class="nav-item">Analyze</a>
          </div>
        </nav>
      </header>
    )
  }
}
