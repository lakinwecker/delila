//--------------------------------------------------------------------------------------------------
// The import PGN modal dialog.
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'

//-----------------------------------------------------------------------------------------
export default function() {
	return Component<void, State>({ name: 'reader', initState, connect, render })
}

//-----------------------------------------------------------------------------------------
interface State {
  isActive: boolean,
}
 
function initState() {
	return { isActive: false }
}

//-----------------------------------------------------------------------------------------
const showModal = Message('showModal')
const hideModal = Message('hideModal')

function connect({ on }: ConnectParams<void, State>) {
	on(showModal, (state) => update(state, {isActive: true}))
	on(hideModal, (state) => update(state, {isActive: false}))
}

//-----------------------------------------------------------------------------------------
function render({ state, msg }: RenderParams<void, State>) {
  let classExtra = "";
  if (state.isActive) {
    classExtra = " .is-active"
  }
  return h("import", {}, [
    h("button.import.button.is-primary", {on: { click: () => msg.send(showModal())}}, "+ Import Games"),
    h("div.modal" + classExtra, {}, [
      h("div.modal-background"),
      h("div.modal-card", {}, [
        h("header.modal-card-head", {}, [
          h("div.modal-card-title", "Import Games"),
          h("button.delete", {on: {click: () => msg.send(hideModal())}})
        ]),
        h("section.modal-card-body", {}, [
          h("div", {}, [
            h("div.field", [
              h("label", "Database"),
              h("select", {attrs: {name: "database"}}, [
                h("option", "New")
              ]),
            ]),
            h("div.field", [
              h("input", {attrs: {"type": "file", "name": "Browse"}})
            ])
          ])
        ]),
        h("footer.modal-card-foot", {}, [
          h("a.button is-success", "Save changes"),
          h("a.button", {on: {click: () => msg.send(hideModal())}}, "Cancel")
        ]),
      ]),
    ])
  ])
}


