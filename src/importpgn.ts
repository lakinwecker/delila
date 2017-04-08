//--------------------------------------------------------------------------------------------------
// The import PGN modal dialog.
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import { update } from 'immupdate'

//-----------------------------------------------------------------------------------------
export default function() {
	return Component<void, State>({ name: 'importpgn', initState, connect, render })
}

//-----------------------------------------------------------------------------------------
interface State {
  isActive: boolean,
  databasePath?: string
}
 
function initState() {
	return { isActive: false, databasePath: undefined }
}

//-----------------------------------------------------------------------------------------
const showModal = Message('showModal')
const hideModal = Message('hideModal')
const selectFile = Message<HTMLInputElement>('selectFile')

function connect({ on }: ConnectParams<void, State>) {
	on(showModal, (state) => update(state, {isActive: true}))
	on(hideModal, (state) => update(state, {isActive: false}))
	on(selectFile, (state, elm) => {
    if (elm.files) {
      let file: any = elm.files[0];
      if (!file) return
      console.log(file.path);
      update(state, {databasePath: file.path})
    }
  })
}

//-----------------------------------------------------------------------------------------
function render({ state, msg }: RenderParams<void, State>) {
  let classExtra = "";
  if (state.isActive) {
    classExtra = " .is-active"
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
          h("div", {}, [
            h("div.field", [
              h("label.label", "Database"),
              h("p.control", [
                h("select.select", {attrs: {name: "database"}}, [
                  h("option", "New")
                ]),
              ]),
            ]),
            h("div.field", [
              h("label.label", "File"),
              h("p.control", [
                h("input.button",
                  {
                    attrs: {"type": "file", "name": "Browse"},
                    on: { change: (evt: Event) => msg.send(selectFile(evt.target as HTMLInputElement))}
                  }
                )
              ])
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


