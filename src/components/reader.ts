//--------------------------------------------------------------------------------------------------
// The reader component
import chessground from './chessground'

import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
// import { update } from 'immupdate'

export default function() {
	return Component<void, State>({ name: 'reader', initState, connect, render })
}

interface State {
}
 
//-----------------------------------------------------------------------------------------
function initState() {
	return { }
}

//-----------------------------------------------------------------------------------------
const click = Message('click')

function connect({ on }: ConnectParams<void, State>) {
	on(click, () => {console.log("click")})
}

//-----------------------------------------------------------------------------------------
function render({ }: RenderParams<void, State>) {
  // TODO: make the styling configurable
	return h('reader.blue.merida', { events: { click } }, chessground())
}


