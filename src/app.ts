//--------------------------------------------------------------------------------------------------
// The main application
//--------------------------------------------------------------------------------------------------

import { Component, h, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'

import routeStore from './stores/route'
import { Route } from './stores/route'

import dashboard from './components/dashboard'
import importpgn from './components/importpgn'
import logo from './components/logo'
import reader from './components/reader'
import server from './server/component'
import splash from './components/splash'

export default function() {
	return Component<{}, State>({ name: 'app', initState, connect, render })
}

interface State {
  route: Route
}

function initState() {
	return { route: routeStore.state().route }
}

function connect({ on, state }: ConnectParams<{}, State>) {
  on(routeStore.state, (route) => {
		return update(state(), { route: route.route })
	})
}

function render({ state }: RenderParams<{}, State>) {
  function connection() {
    return h("connection", {}, [
      server({url: "ws://127.0.0.1:3012"})
    ])
  }
  if (state.route == Route.Splash) {
    return h("delila.splash", {}, [
      splash(),
      connection(),
    ]);
  } else if (state.route == Route.Dashboard) {
    return h("delila.dashboard", {}, [
      logo(),
      dashboard(),
      connection()
    ]);
  } else if (state.route == Route.Reader) {
    return h("delila.reader", {}, [
      logo(),
      importpgn(),
      reader(),
      connection()
    ]);
  } else {
    return h("delila.unknown", {}, [
      h("h1", "Unknown Route")
    ]);
  }
}


