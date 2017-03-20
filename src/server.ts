import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'


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
  timeToRetry?: number,
  timeoutId?: number
  ws?: WebSocket,
}
 
function initState(initProps: Props) {
	return { url: initProps.url, state: Retrying, timeout: 1, timeoutId: undefined, ws: undefined, timeToRetry: undefined }
}

const click = Message('click')
const disconnected = Message('disconnected')
const connected = Message('connected')
const tryReconnect = Message('tryReconnect')

function connect({ on, msg }: ConnectParams<{}, State>) {

	on(click, () => msg.send(tryReconnect()))
  on(disconnected, state => {
    console.log("Disconnected!")
    let timeout = state.timeout * 2
    let timeoutId = setTimeout(timeout, () => msg.send(tryReconnect()))
    update(state, { state: WaitingToRetry, timeout: timeout, timeoutId: timeoutId})
  })
  on(tryReconnect, state => {
    console.log("Connecting: " + state.url)
    if (state.timeoutId !== undefined) {
      clearTimeout(state.timeoutId)
    }
    let ws = new WebSocket(state.url)
    ws.onopen = () => msg.send(connected())
    ws.onclose = () => msg.send(disconnected())
    ws.onmessage = (evt) => {
      console.log("Message: " + evt.data)
    }
    update(state, { ws: ws, timeoutId: undefined })
  });
  on(connected, state => {
    console.log("Connected!");
    update(state, {state: Connected, timeoutId: undefined, timeout: 1, timeToRetry: 0})
  })

}

function render({ state }: RenderParams<Props, State>) {
  let text = "";
  if (state.state == Retrying) {
    text = "Retrying to connect"
  } else if (state.state == WaitingToRetry) {
    text = "Waiting to Retry"
  } else if (state.state == Connected) {
    text = "Connected"
  }
	return h('a.level-item', { events: { click } }, [
		h('i.fa.fa-link'),
		h('span', text)
	])
}


