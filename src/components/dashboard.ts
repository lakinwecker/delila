//--------------------------------------------------------------------------------------------------
// The dashboard component.
//--------------------------------------------------------------------------------------------------

import { Component, h, ConnectParams, Message, RenderParams } from 'kaiju'
// import { update } from 'immupdate'
import { navigate, Route } from '../stores/route'
import routeStore from '../stores/route'

export default function () {
  return Component<{}, State>({
    name: 'dashboard',
    initState,
    connect,
    render
  })
}
 
const showReader = Message('showReader')

interface State { }
 
function initState() {
  return {}
}

function connect({ on }: ConnectParams<{}, State>) {
  on(showReader, () => routeStore.send(navigate(Route.Reader)))
}

function render({ msg }: RenderParams<{}, State>) {

  return h("dashboard", {}, [
    h("h1", "Dashboard"),
    h("a", { on: { click: () => msg.send(showReader()) } }, ["Reader"])
  ])
}


