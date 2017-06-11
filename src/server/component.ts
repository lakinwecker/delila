import { Component, h, VNode,  Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import { Observable } from 'kaiju/observable'
import { Connection } from "./connection"

//-----------------------------------------------------------------------------------------
// Define our Connection States as a union type with convenience constants.
type ConnectionState = Connected | Retrying | WaitingToRetry
type Connected = { type: 'Connected' }
type Retrying = { type: 'Retrying' }
type WaitingToRetry = { type: 'WaitingToRetry' }
const Connected: ConnectionState = { type: 'Connected' }
const Retrying: ConnectionState = { type: 'Retrying' }
const WaitingToRetry: ConnectionState = { type: 'WaitingToRetry' }

//-----------------------------------------------------------------------------------------
export default function(props: Props) {
	return Component<Props, State>({ name: 'server', props, initState, connect, render })
}

//-----------------------------------------------------------------------------------------
interface Props {
  url: string
}
 
//-----------------------------------------------------------------------------------------
interface State {
  url: string,
	state: ConnectionState,
  timeout: number,
  timeToRetry: number,
  connection: Connection,
}
 
//-----------------------------------------------------------------------------------------
function initState(initProps: Props) {
	return { url: initProps.url, state: WaitingToRetry, timeout: 1, connection: Connection.getInstance(), timeToRetry: 0 }
}

//-----------------------------------------------------------------------------------------
const click = Message('click')
const disconnected = Message('disconnected')
const connected = Message('connected')
const tryReconnect = Message('tryReconnect')

function connect({ on, msg }: ConnectParams<{}, State>) {
  // TODO: Evaluate the effect of this on the battery life.
  const polling = Observable.interval(1000);

	on(click, () => msg.send(tryReconnect()))
  on(disconnected, state => {
    let timeout = Math.min(state.timeout * 2, 120);
    return update(state, { state: WaitingToRetry, timeout: timeout, timeToRetry: timeout })
  })
  on(polling, state => {
    if (state.state != WaitingToRetry) return state
    let timeToRetry = state.timeToRetry - 1;
    if (timeToRetry <= 0) msg.send(tryReconnect())
    return update(state, {timeToRetry: timeToRetry})
  });
  on(tryReconnect, state => {
    state.connection.connect(state.url);
    state.connection.onopen = () => msg.send(connected())
    state.connection.onclose = () => msg.send(disconnected())
    return update(state, { state: Retrying })
  });
  on(connected, state => update(state, {state: Connected, timeout: 1, timeToRetry: 1}))

}

//-----------------------------------------------------------------------------------------
function render({ state }: RenderParams<Props, State>) {
  let node:VNode = h("span")
  if (state.state == Retrying) {
    node = h("span", "Trying to connect")
  } else if (state.state == WaitingToRetry) {
    node = h("span", [
        "Disconnected - will retry in " + state.timeToRetry + "s.",
        h("a", { events: { click } }, [" (retry now)"])
    ])
  } else if (state.state == Connected) {
    node = h("span", "Connected")
  }
	return h('span.level-item', [
		h('i.fa.fa-link'),
    node,
  ])
}


