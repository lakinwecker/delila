import {h, startApp } from 'kaiju'
import klass from 'snabbdom/modules/class'
import attributes from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

import server from './server'
import reader from './reader'
import importpgn from './importpgn'
import logo from './logo'

function run(element: HTMLElement) {
  function connection() {
    return h("connection", {}, [
      server({url: "ws://127.0.0.1:3012"})
    ])
  }
  function base() {
    return h("delila.reader", {}, [
      logo(),
      importpgn(),
      reader(),
      connection(),
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

