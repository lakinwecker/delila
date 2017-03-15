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
    let cg_node = document.createElement('div');
    cg_node.innerText = "Reader";
    this.cg = Chessground(cg_node, {});
    return (
      <chessground>
        <div>{cg_node}</div>
      </chessground>
    )
  }
}
