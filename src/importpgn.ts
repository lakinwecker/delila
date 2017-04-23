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
  showingSelectFileDialog: boolean,
  showFileImportProgress: boolean,
  pgnPath?: string,
  targetDatabase: string,
  fileInput?: HTMLInputElement,
  progress: number
}
 
function initState() {
	return {
    showingSelectFileDialog: false,
    pgnPath: undefined,
    targetDatabase: "new",
    showFileImportProgress: false,
    progress: 0.0
  }
}

//-----------------------------------------------------------------------------------------
const showModal = Message('showModal')
const hideFileDialog = Message('hideFileDialog')
const setFileInput = Message<HTMLInputElement>('setFileInput')
const showFileDialog = Message('showFileDialog')
const selectFile = Message<HTMLInputElement>('selectFile')
const importPgn = Message('importPgn')
const cancelFileImport = Message('cancelFileImport')

function connect({ on }: ConnectParams<void, State>) {
	on(showModal, (state) => update(state, {showingSelectFileDialog: true}))
	on(hideFileDialog, (state) => update(state, {showingSelectFileDialog: false}))
	on(importPgn, (state) => {
    console.log(state.pgnPath)
    return update(state, { showingSelectFileDialog: false, showFileImportProgress: true })
  })
	on(cancelFileImport, (state) => update(state, {showFileImportProgress: false}))
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
  let fileDialogClass = ""
  if (state.showingSelectFileDialog) {
    fileDialogClass = " .is-active"
  }
  let progressDialogClass = ""
  if (state.showFileImportProgress) {
    progressDialogClass = " .is-active"
  }
  console.log(progressDialogClass);
  let buttonTitle = ""
  if (state.pgnPath) {
    buttonTitle = "Change PGN File: " + path.basename(state.pgnPath)
  } else {
    buttonTitle = "Select PGN File"
  }

  return h("import", {}, [
    h("button.import.button", {on: { click: () => msg.send(showModal())}}, "+ Import Games"),
    h("div.modal" + fileDialogClass, {}, [
      h("div.modal-background"),
      h("div.modal-card", {}, [
        h("header.modal-card-head", {}, [
          h("div.modal-card-title", "Import Games"),
          h("button.delete", {on: {click: () => msg.send(hideFileDialog())}})
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
          h("a.button is-success", {on: {click: () => msg.send(importPgn())}}, "Import"),
          h("a.button", {on: {click: () => msg.send(hideFileDialog())}}, "Cancel")
        ]),
      ]),
    ]),
    h("div.modal" + progressDialogClass, {}, [
      h("div.modal-background"),
      h("div.modal-card", {}, [
        h("header.modal-card-head", {}, [
          h("div.modal-card-title", "Importing..."),
          h("button.delete", {on: {click: () => msg.send(cancelFileImport())}})
        ]),
        h("section.modal-card-body", {}, [
          h("progress.progress.is-large", {attrs: {"value": state.progress, "max": 100}}, state.progress + "%")
        ]),
        h("footer.modal-card-foot", {}, [
          h("a.button", {on: {click: () => msg.send(cancelFileImport())}}, "Cancel")
        ]),
      ]),
    ])
  ])
}


