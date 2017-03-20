// import { ReaderGamePage } from './ReaderGamePage'

import {h, startApp, VNode} from 'kaiju'
import klass from 'snabbdom/modules/class'
import attributes from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

import server from './server'

function run(element: HTMLElement) {
  //var pages = [];
  function header(/*page_index*/): VNode {
    return h("nav.nav", {}, [
      h("div.nav-left", {}, [
        h("h1.delila.title.is-3", {}, "Delila")
      ]),
      h("div.nav-right.nav-menu", {}, [
        h("a.nav-item", {}, "Study"),
        h("a.nav-item", {}, "Practice"),
        h("a.nav-item", {}, "Analyze"),
      ])
    ]);
  }
  function footer(): VNode {
    return h("connection", {}, [
      server({url: "ws://127.0.0.1:3012"})
    ])
  }
  function base(): VNode {
    return h("div", {}, [
      h("header", header()),
      h("section"),
      h("footer", footer())
    ]);
  }
  startApp({
    app: base(),
    snabbdomModules: [klass, attributes, style, eventlisteners],
    elm: element
  });
}
var element = document.getElementById("app");
if (element === null) {
  console.error("Unable to mount app");
} else {
  run(element);
}

