import {h, startApp } from 'kaiju'
import klass from 'snabbdom/modules/class'
import attributes from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

import server from './server'
import reader from './reader'
import importpgn from './importpgn'

function run(element: HTMLElement) {
  //var pages = [];
  function header(/*page_index*/) {
    return h("nav.nav", {}, [
      h("div.nav-left", {}, [
        h("h2.delila.title.is-3", {}, "Delila")
      ]),
      h("div.nav-right.nav-menu", {}, [
        // TODO: these menu/action items will eventually need to be moved elsewhere. :P
        h("a.nav-item", {}, importpgn()),
      ])
    ]);
  }
  function footer() {
    return h("connection", {}, [
      server({url: "ws://127.0.0.1:3012"})
    ])
  }
  function base() {
    return h("div#app", {}, [
      h("header", header()),
      h("section", reader()),
      h("footer", footer())
    ]);
  }
  startApp({
    app: base(),
    snabbdomModules: [klass, attributes, style, eventlisteners],
    elm: element,
    replaceElm: true
  });
}
var element = document.getElementById("app");
if (element === null) {
  console.error("Unable to mount app");
} else {
  run(element);
}

