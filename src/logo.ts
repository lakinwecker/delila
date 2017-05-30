import { Component, h } from 'kaiju'

export default function button() {
    return Component({ name: 'logo', initState, connect, render })
}

function initState() { return {} }

function connect() {}

function render() {
    return h("h2.delila.title.is-3", {}, [
      h("c.d1", "D"),
      h("c.e1", "e"),
      h("c.l1", "l"),
      h("c.i1", "i"),
      h("c.l2", "l"),
      h("c.a1", "a")
    ])
}
