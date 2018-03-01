// The splash screen.
import { Component, h, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import { InitializeState, Remote, factory, initialize } from '../server/initialization'

import routeStore from '../stores/route'
import { navigate, Route } from '../stores/route'
import VERSION from '../version'

//-----------------------------------------------------------------------------------------
export default function () {
  return Component<Props, State>({
    name: 'splash',
    props: defaultProps(),
    initState,
    connect,
    render
  })
}

//-----------------------------------------------------------------------------------------
interface Props {
  remoteStore: Remote
}

//-----------------------------------------------------------------------------------------
function defaultProps(): Props {
  let remoteStore = factory()
  console.log(remoteStore.store);
  remoteStore.store.send(
    initialize({version: VERSION})
  );
  return {
    remoteStore: remoteStore
  }
}

//-----------------------------------------------------------------------------------------
interface State {
  remoteState: InitializeState,
}

function initState() {
  return {
    remoteState: {
      activity: "...",
      progress: 0,
      version: VERSION,
      finished: false
    },
  }
}

//-----------------------------------------------------------------------------------------
function connect({ on, props, state }: ConnectParams<Props, State>) {
  on(props().remoteStore.store.state, (remoteState: InitializeState) => {
    let newState = update(state(), {remoteState: remoteState})
    if (newState.remoteState.finished) {
      routeStore.send(navigate(Route.Dashboard))
    }
    return newState
  })
}

//-----------------------------------------------------------------------------------------
function render({ state }: RenderParams<Props, State>) {
  return h("splash", {}, [
    h("centre", [
      h("h1", [
        h("c.d1", "D"),
        h("c.e1", "e"),
        h("c.l1", "l"),
        h("c.i1", "i"),
        h("c.l2", "l"),
        h("c.a1", "a"),
      ]),
      h("activity", state.remoteState.activity),
    ]),
  ])
}


