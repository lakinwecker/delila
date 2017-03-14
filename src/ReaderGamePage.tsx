import { Node } from 'tweed'
import { Renderer } from './types'
import { ChessgroundWidget } from './Chessground'
import { ReaderMoveList } from './ReaderMoveList'
import { ReaderGameControls } from './ReaderGameControls'
import { UCIEngine } from './UCIEngine'
import { Router } from 'tweed-router'

export class ReaderGamePage implements Renderer {
  private board = new ChessgroundWidget();
  private move_list = new ReaderMoveList();
  private game_controls = new ReaderGameControls();
  private engine = new UCIEngine();
  private router: Router;
  constructor (router: Router) {
    this.router = router;
  }

  render (): Node {
    return (
      <reader>
        {this.board}
        {this.engine}
        {this.move_list}
        {this.game_controls}
      </reader>
    )
  }
}
