//--------------------------------------------------------------------------------------------------
// The import PGN modal dialog.
//--------------------------------------------------------------------------------------------------
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'
import { ImportFileState, Remote, factory, importFile } from '../server/importfile'
import path = require('path');

export default function () {
  return Component<Props, State>({
    name: 'importpgn',
    props: defaultProps(),
    initState,
    connect,
    render
  })
}

interface Props {
  remoteStore: Remote
}

function defaultProps(): Props {
  return { remoteStore: factory() }
}
 
interface State {
  showingSelectFileDialog: boolean,
  showFileImportProgress: boolean,
  targetDatabase: string,
  fileInput?: HTMLInputElement,
  remoteState: ImportFileState,
}
 
function initState() {
  return {
    showingSelectFileDialog: false,
    targetDatabase: "new",
    showFileImportProgress: false,
    remoteState: {
      activity: "",
      progress: 0,
      path: undefined
    },
  }
}

const showModal = Message('showModal')
const hideFileDialog = Message('hideFileDialog')
const setFileInput = Message<HTMLInputElement>('setFileInput')
const showFileDialog = Message('showFileDialog')
const selectFile = Message<HTMLInputElement>('selectFile')
const importPgn = Message('importPgn')
const cancelFileImport = Message('cancelFileImport')

function connect({ on, props }: ConnectParams<Props, State>) {
  on(showModal, (state) => update(state, {showingSelectFileDialog: true}))
  on(hideFileDialog, (state) => update(state, {showingSelectFileDialog: false}))
  on(importPgn, (state) => {
    props().remoteStore.store.send(importFile({path: state.remoteState.path}));
    // TODO: Unsure why this doesn't reset the progress to zero, should figure it out later.
    return update(state, {
      showingSelectFileDialog: false,
      showFileImportProgress: true,
      remoteState: update(state.remoteState, {activity: "waiting", progress: 0})
    })
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
      return update(state, {remoteState: update(state.remoteState, {path: file.path})})
    }
  })
  on(props().remoteStore.store.state, (state, remoteState: ImportFileState) => {
    return update(state, {remoteState: remoteState})
  })
}

function render({ state, msg }: RenderParams<Props, State>) {
  let fileDialogClass = ""
  if (state.showingSelectFileDialog) {
    fileDialogClass = " .is-active"
  }
  let progressDialogClass = ""
  if (state.showFileImportProgress) {
    progressDialogClass = " .is-active"
  }
  let buttonTitle = ""
  if (state.remoteState.path) {
    buttonTitle = "Change PGN File: " + path.basename(state.remoteState.path)
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
          h("progress.progress.is-large", {attrs: {"value": state.remoteState.progress, "max": 100}}, state.remoteState.progress + "%")
        ]),
        h("footer.modal-card-foot", {}, [
          h("a.button", {on: {click: () => msg.send(cancelFileImport())}}, "Cancel")
        ]),
      ]),
    ])
  ])
}


