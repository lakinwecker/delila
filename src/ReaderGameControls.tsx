import { Node } from 'tweed'
import { Renderer } from './types'

export class ReaderGameControls implements Renderer {
  constructor () {
  }

  render (): Node {
    return (
      <controls>
        <h1>This is the reader game controls</h1>
      </controls>
    )
  }
}
