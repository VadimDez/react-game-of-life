/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react';

import Cell from './Cell'

class Board extends React.Component {
  render() {
    const state = this.context.store.getState()

    return (
      <div className={`board width-${state.game.width}`}>
        { this.renderObject(state.cells.cells) }
      </div>
    )
  }

  /**
   * Render object
   *
   * @param object
   * @returns {Array}
   */
  renderObject(object) {
    let lines = [];
    for (let row in object) {
      let line = [];

      for (let column in object[row]) {
        line.push(<Cell key={`cell-${row}-${column}`} row={row} column={column} life={object[row][column]} />);
      }

      lines.push(<div className="row" key={`row-${row}`}>{line}</div>);
    }

    return lines;
  }
}

Board.contextTypes = {
  store: React.PropTypes.object
};

export default Board;