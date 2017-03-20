//--------------------------------------------------------------------------------------------------
// The reader component

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
	return h('reader', { events: { click } }, "Reader")
}


