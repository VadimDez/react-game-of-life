/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react';
import { connect } from 'react-redux';

import Cell from './Cell'

class Board extends React.Component {
  render() {
    return (
      <div className={`board width-${ this.props.game.width }`}>
        { this.renderObject( this.props.cells ) }
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

const mapStateToProps = (state) => {
  return {
    game: state.game,
    cells: state.cells.cells
  };
};

export default connect(
  mapStateToProps
)(Board);