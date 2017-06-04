//--------------------------------------------------------------------------------------------------
// The reader component
import chessground from './chessground'

import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
// import { update } from 'immupdate'

export default function() {
	return Component<{}, State>({ name: 'reader', initState, connect, render })
}

interface State {
}
 
//-----------------------------------------------------------------------------------------
function initState() {
	return { }
}

//-----------------------------------------------------------------------------------------
const click = Message('click')

function connect({ on }: ConnectParams<{}, State>) {
	on(click, () => {console.log("click")})
}

//-----------------------------------------------------------------------------------------
function render({ }: RenderParams<{}, State>) {
  // TODO: make the styling configurable
	return h('reader.blue.merida', { events: { click } }, chessground())
}


