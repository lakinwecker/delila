//--------------------------------------------------------------------------------------------------
// The reader component
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'

import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
// import { update } from 'immupdate'

export default function() {
	return Component<void, State>({ name: 'reader', initState, connect, render })
}

interface State {
  chessground?: Api
}
 
//-----------------------------------------------------------------------------------------
function initState() {
	return { chessground: undefined }
}

//-----------------------------------------------------------------------------------------
const inserted = Message<Element>('inserted')
const destroyed = Message('destroyed')

function connect({ on }: ConnectParams<void, State>) {
  on(inserted, ( state, elm ) => {
    state.chessground = Chessground(elm as HTMLElement, {})
  })
}

//-----------------------------------------------------------------------------------------
function render({ msg }: RenderParams<void, State>) {
	return h('cgcontainer', { hook: {
    insert: node => msg.send(inserted(node.elm)),
    destroy: () => msg.send(destroyed())
  }})
}


