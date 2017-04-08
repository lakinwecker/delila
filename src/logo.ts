import { Component, h } from 'kaiju'

export default function button() {
    return Component({ name: 'logo', initState, connect, render })
}

function initState() { return {} }

function connect() {}

function render() {
    return h("h2.delila.title.is-3", {}, "Delila")
}
