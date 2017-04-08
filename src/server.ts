import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import { Observable } from 'kaiju/observable'


// TODO: At the moment - access to the websocket is not provided anywhere. Which we will need
//       to have in order for other components to access it. 

//-----------------------------------------------------------------------------------------
// Define our Connection States as a union type with convenience constants.
type ConnectionState = Connected | Retrying | WaitingToRetry
type Connected = { type: 'Connected' }
type Retrying = { type: 'Retrying' }
type WaitingToRetry = { type: 'WaitingToRetry' }
const Connected: ConnectionState = { type: 'Connected' }
const Retrying: ConnectionState = { type: 'Retrying' }
const WaitingToRetry: ConnectionState = { type: 'WaitingToRetry' }

export default function(props: Props) {
	return Component<Props, State>({ name: 'server', props, initState, connect, render })
}

interface Props {
  url: string
}
 
interface State {
  url: string,
	state: ConnectionState,
  timeout: number,
  timeToRetry: number,
  ws?: WebSocket,
}
 
//-----------------------------------------------------------------------------------------
function initState(initProps: Props) {
	return { url: initProps.url, state: WaitingToRetry, timeout: 1, ws: undefined, timeToRetry: 0 }
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
    let timeout = state.timeout * 2
    return update(state, { state: WaitingToRetry, timeout: timeout, timeToRetry: timeout })
  })
  on(polling, state => {
    if (state.state != WaitingToRetry) return state
    let timeToRetry = state.timeToRetry - 1;
    if (timeToRetry <= 0) msg.send(tryReconnect())
    return update(state, {timeToRetry: timeToRetry})
  });
  on(tryReconnect, state => {
    console.log("Connecting: " + state.url)
    let ws = new WebSocket(state.url)
    ws.onopen = () => msg.send(connected())
    ws.onclose = () => msg.send(disconnected())
    ws.onmessage = (evt) => {
      console.log("Message: " + evt.data)
    }
    return update(state, { ws: ws, state: Retrying })
  });
  on(connected, state => update(state, {state: Connected, timeout: 1, timeToRetry: 1}))

}

//-----------------------------------------------------------------------------------------
function render({ state }: RenderParams<Props, State>) {
  let text = "";
  if (state.state == Retrying) {
    text = "Trying to connect"
  } else if (state.state == WaitingToRetry) {
    text = "Disconnected - will retry in " + state.timeToRetry + "s. Click to force retry"
  } else if (state.state == Connected) {
    text = "Connected"
  }
	return h('a.level-item', { events: { click } }, [
		h('i.fa.fa-link'),
		h('span', text)
	])
}


