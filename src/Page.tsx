import { Node } from 'tweed'
import { Renderer } from './types'
import { Router } from 'tweed-router'
import { DelilaHeader } from './DelilaHeader'

export class Page implements Renderer {
  protected header?: Renderer = undefined;
  protected footer?: Renderer = undefined;
  protected router: Router;

  constructor (router: Router) {
    this.router = router
    this.header = new DelilaHeader(router);
    this.footer = undefined;
  }

  render_page(): Node {
    return (<div>Empty</div>)
  }

  render (): Node {
    let page_content = this.render_page();
    return (
      <delila>
        {this.header}
        {page_content}
        {this.footer}
      </delila>
    )
  }
}
