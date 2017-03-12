import { Node } from 'tweed'
import App from '../src/App'

describe('App', () => {
  test('it works', () => {
    const app = new App()

    expect(app.render()).toEqual(
      <div>
        <h1>Hello {'World'}</h1>
        <input
          value="World"
          on-input={app._setName}
        />
      </div>
    )

    app.name = 'Changed'

    expect(app.render()).toEqual(
      <div>
        <h1>Hello {'Changed'}</h1>
        <input
          value="Changed"
          on-input={app._setName}
        />
      </div>
    )
  })
})
