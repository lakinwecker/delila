// The import PGN modal dialog.
import { Component, h, ConnectParams, RenderParams } from 'kaiju'
// import { update } from 'immupdate'

//-----------------------------------------------------------------------------------------
export default function () {
  return Component<{}, State>({
    name: 'dashboard',
    initState,
    connect,
    render
  })
}
 
//-----------------------------------------------------------------------------------------
interface State { }
 
function initState() {
  return {}
}

//-----------------------------------------------------------------------------------------
function connect({ }: ConnectParams<{}, State>) {
}

//-----------------------------------------------------------------------------------------
function render({ }: RenderParams<{}, State>) {

  return h("dashboard", {}, [
    "Dashboard"
  ])
}


