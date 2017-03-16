import { Node } from 'tweed'
import { Router } from 'tweed-router'
import { Page } from './Page'
import { ChessgroundWidget } from './Chessground'
import { ReaderMoveList } from './ReaderMoveList'
import { ReaderGameControls } from './ReaderGameControls'
import { Server } from './Server'

export class ReaderGamePage extends Page {
  private pgn_file = '';
  private board = new ChessgroundWidget();
  private move_list = new ReaderMoveList();
  private game_controls = new ReaderGameControls();
  protected server: Server;

  constructor (router: Router) {
    super(router);
    this.server = new Server("ws://127.0.0.1:3012")
  }

  render_page (): Node {
    if (this.pgn_file) {
      return (
        <reader>
          {this.board}
          {this.move_list}
          {this.game_controls}
        </reader>
      )
    } else {
      return <reader>
          <h1>No data in the database</h1>
        </reader>
    }
  }
}
