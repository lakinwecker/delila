import { Node } from 'tweed'
import { Renderer } from './types'
//import { Chessground } from 'chessground'

export class ChessgroundWidget implements Renderer {
  //private _id = "asdf798asdf"
  constructor () {
  }

  render (): Node {
    let cg_node = document.createElement('div');
    cg_node.innerText = "Reader";
    //let cg = Chessground(cg_node, {});
    return (
      <chessground>
        <div>{cg_node}</div>
      </chessground>
    )
  }
}
