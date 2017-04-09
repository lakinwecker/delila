//--------------------------------------------------------------------------------------------------
// The import PGN modal dialog.
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import path = require('path');

//-----------------------------------------------------------------------------------------
export default function() {
	return Component<void, State>({ name: 'importpgn', initState, connect, render })
}

//-----------------------------------------------------------------------------------------
interface State {
  isActive: boolean,
  pgnPath?: string,
  targetDatabase: string,
  fileInput?: HTMLInputElement
}
 
function initState() {
	return { isActive: false, pgnPath: undefined, targetDatabase: "new" }
}

//-----------------------------------------------------------------------------------------
const showModal = Message('showModal')
const hideModal = Message('hideModal')
const setFileInput = Message<HTMLInputElement>('setFileInput')
const showFileDialog = Message('showFileDialog')
const selectFile = Message<HTMLInputElement>('selectFile')

function connect({ on }: ConnectParams<void, State>) {
	on(showModal, (state) => update(state, {isActive: true}))
	on(hideModal, (state) => update(state, {isActive: false}))
	on(setFileInput, (state, elm: HTMLInputElement) => update(state, {fileInput: elm}))
	on(showFileDialog, (state) => {
    if (state.fileInput) {
      state.fileInput.click()
    }
  })
	on(selectFile, (state, elm) => {
    if (elm.files) {
      let file: any = elm.files[0];
      if (!file) return
      return update(state, {pgnPath: file.path})
    }
  })
}

//-----------------------------------------------------------------------------------------
function render({ state, msg }: RenderParams<void, State>) {
  let classExtra = ""
  if (state.isActive) {
    classExtra = " .is-active"
  }
  let buttonTitle = ""
  if (state.pgnPath) {
    buttonTitle = "Change PGN File: " + path.basename(state.pgnPath)
  } else {
    buttonTitle = "Select PGN File"
  }

  return h("import", {}, [
    h("button.import.button", {on: { click: () => msg.send(showModal())}}, "+ Import Games"),
    h("div.modal" + classExtra, {}, [
      h("div.modal-background"),
      h("div.modal-card", {}, [
        h("header.modal-card-head", {}, [
          h("div.modal-card-title", "Import Games"),
          h("button.delete", {on: {click: () => msg.send(hideModal())}})
        ]),
        h("section.modal-card-body", {}, [
          h("div.form", {}, [
            h("div.field", [
              h("p.control", [
                h("input.file",
                  {
                    attrs: {"type": "file", "name": "Browse", "style": "display: none"},
                    on: { change: (evt: Event) => msg.send(selectFile(evt.target as HTMLInputElement))},
                    hook: { insert: (vnode) => {
                      msg.send(setFileInput(vnode.elm as HTMLInputElement))
                    }}
                  }
                ),
                h("button.button",
                  {on: { click: () => msg.send(showFileDialog())}},
                  buttonTitle
                )
              ])
            ]),
            h("div.field", [
              h("p.control", [
              h("label.label", "Import into:"),
                h("span.select", [
                  h("select", {attrs: {name: "database"}}, [
                    h("option", "New Database")
                  ]),
                ]),
              ]),
            ])
          ])
        ]),
        h("footer.modal-card-foot", {}, [
          h("a.button is-success", "Import"),
          h("a.button", {on: {click: () => msg.send(hideModal())}}, "Cancel")
        ]),
      ]),
    ])
  ])
}


