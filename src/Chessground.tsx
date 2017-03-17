import { Node } from 'tweed'
import { Renderer } from './types'
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'

export class ChessgroundWidget implements Renderer {
  //private _id = "asdf798asdf"
  private cg?: Api = undefined;
  constructor () {
  }

  render (): Node {
    let cgNode = document.createElement('div');
    cgNode.innerText = "Reader";
    this.cg = Chessground(cgNode, {});
    return (
      <chessground>
        <div>{cgNode}</div>
      </chessground>
    )
  }
}
