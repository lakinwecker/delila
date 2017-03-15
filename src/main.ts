import render from 'tweed/render/dom'

import { Router } from 'tweed-router'
import BrowserRouter from 'tweed-router/browser'

import { ReaderGamePage } from './ReaderGamePage'

const routes = {
    '/': (router: Router) => new ReaderGamePage(router),
    //'/': (router: Router) => new HomePage(router),
    //'/about': (router) => new AboutPage(router),
}
 
BrowserRouter.make(routes)
  .then((router) => render(router, document.querySelector('#app')))
