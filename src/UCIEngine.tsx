import { Node } from 'tweed'
import { Renderer } from './types'

export class UCIEngine implements Renderer {
  constructor () {
  }

  render (): Node {
    return (
      <engine>
        <h1>This is the engine analysis</h1>
      </engine>
    )
  }
}
