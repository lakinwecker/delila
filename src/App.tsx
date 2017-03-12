import { mutating, Node } from 'tweed'

export default class App {
  @mutating name = 'World'

  constructor () {
    this._setName = this._setName.bind(this)
  }

  _setName (event: Event): void {
    this.name = (event.target as HTMLInputElement).value
  }

  render (): Node {
    return (
      <div>
        <h1>Hello {this.name}</h1>
        <input
          value={this.name}
          on-input={this._setName}
        />
      </div>
    )
  }
}
