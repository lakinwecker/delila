import { Node } from 'tweed'
import { Router } from 'tweed-router'
import { Page } from './Page'
import { ChessgroundWidget } from './Chessground'
import { ReaderMoveList } from './ReaderMoveList'
import { ReaderGameControls } from './ReaderGameControls'

export class ReaderGamePage extends Page {
  private pgnFile = '';
  private board = new ChessgroundWidget();
  private moveList = new ReaderMoveList();
  private gameControls = new ReaderGameControls();

  constructor (router: Router) {
    super(router);
  }

  renderPage (): Node {
    if (!this.pgnFile) {
      return (
        <reader>
          {this.board}
          {this.moveList}
          {this.gameControls}
        </reader>
      )
    } else {
      return <reader>
          <h1>No data in the database</h1>
        </reader>
    }
  }
}
