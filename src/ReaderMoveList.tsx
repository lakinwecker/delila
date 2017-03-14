import { Node } from 'tweed'
import { Renderer } from './types'

export class ReaderMoveList implements Renderer {
  constructor () {
  }

  render (): Node {
    return (
      <movelist>
        <h1>This is a reader move list</h1>
      </movelist>
    )
  }
}
