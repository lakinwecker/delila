import { startApp } from 'kaiju'
import klass from 'snabbdom/modules/class'
import attributes from 'snabbdom/modules/attributes'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

import app from './app'

function run(element: HTMLElement) {
  startApp({
    app: app(),
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

