// The import PGN modal dialog.
import { Component, h, ConnectParams, RenderParams } from 'kaiju'
// import { update } from 'immupdate'

//-----------------------------------------------------------------------------------------
export default function () {
  return Component<void, State>({
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
function connect({ }: ConnectParams<void, State>) {
}

//-----------------------------------------------------------------------------------------
function render({ }: RenderParams<void, State>) {

  return h("dashboard", {}, [
    "Dashboard"
  ])
}


