/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import Board from './Board';
import * as actionTypes from './../actionTypes';

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.interval = null;
    this.boardSizes = [
      { width: 50, height: 30 },
      { width: 70, height: 50 },
      { width: 100, height: 80 }
    ];
  }

  setRandomBoard() {
    const rand = Math.floor(Math.random() * this.boardSizes.length);
    const randomSize = this.boardSizes[rand];
    this.changeBoardSize(randomSize.width, randomSize.height).bind(this)();
  }

  componentDidMount() {
    this.setRandomBoard();
    this.run()
  }

  componentWillUnmount() {
  }

  /**
   * Change board size
   * @param width
   * @param height
   * @returns {Function}
   */
  changeBoardSize(width, height) {
    return () => {
      this.props.setBoardSize(width, height);

      clearInterval(this.interval);
      this.generateCells(width, height, true);
      this.props.resetGeneration();
    }
  }

  /**
   * Generate empty cells
   *
   * @param {int} width
   * @param {int} height
   * @param {bool} randomize
   * @returns {{}}
   */
  generateCells(width, height, randomize) {
    var cells = {};
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        cells[r] = cells[r] || {};

        cells[r][c] = randomize ? Math.floor(Math.random() * 2) : 0;
      }
    }

    this.props.setCells(cells);
  }

  /**
   * On run
   */
  run() {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(this.cycle.bind(this), 200);
  }

  /**
   * On pause
   */
  pause() {
    clearInterval(this.interval)
  }

  /**
   * Clear interval and board
   */
  clear() {
    clearInterval(this.interval);
    this.generateCells(this.props.game.width, this.props.game.height, false);

    this.props.resetGeneration();
  }

  /**
   * Cycle callback
   */
  cycle() {
    let stop = true;
    let updatedCells = {};
    const rows = Object.keys(this.props.cells).length;

    for (var row = 0; row < rows; row++) {
      var columns = Object.keys(this.props.cells[row]).length;
      updatedCells[row] = {};
      for (var column = 0; column < columns; column++) {

        // check if there're any lives
        if (this.props.cells[row][column] === 1) {
          stop = false
        }

        const prevRow = this.props.cells[row - 1] || {};
        const nextRow = this.props.cells[row + 1] || {};

        const count = (prevRow[column - 1] || 0) +
          (prevRow[column] || 0) +
          (prevRow[column + 1] || 0) +
          (this.props.cells[row][column - 1] || 0) +
          (this.props.cells[row][column + 1] || 0) +
          (nextRow[column - 1] || 0) +
          (nextRow[column] || 0) +
          (nextRow[column + 1] || 0);

        updatedCells[row][column] = 0;
        if (this.props.cells[row][column] === 1 && count === 2) {
          updatedCells[row][column] = 1
        } else if (count === 3) {
          updatedCells[row][column] = 1
        }
      }
    }

    // clear if no more life
    if (stop) {
      this.clear();
      return;
    }

    // update cells
    this.props.setCells(updatedCells);

    // update generation count
    this.props.incrementGeneration();
  }

  render() {
    return (
      <div>
        <h1>Game of life</h1>
        <div>
          <button className="btn" onClick={this.run.bind(this)}>Run</button>
          <button className="btn" onClick={this.pause.bind(this)}>Pause</button>
          <button className="btn" onClick={this.clear.bind(this)}>Clear</button>
        </div>
        <div>
          <div>Board size</div>
          {
            this.boardSizes.map(function (size, i) {
              return <button className="btn" key={i} onClick={this.changeBoardSize(size.width, size.height).bind(this)}>{size.width}x{size.height}</button>
            }.bind(this))
          }
        </div>
        <div>
          Generation: { this.props.game.generation }
        </div>
        <Board />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game.toJS(),
    cells: state.cells.get('cells').toJS()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementGeneration: () => {
      dispatch({
        type: actionTypes.GENERATION_INCREMENT
      });
    },
    setCells: (cells) => {
      dispatch({
        type: actionTypes.SET_CELLS,
        cells
      });
    },
    resetGeneration: () => {
      dispatch({
        type: actionTypes.GENERATION_RESET
      });
    },
    setBoardSize: (width, height) => {
      dispatch({
        type: actionTypes.BOARD_SIZE,
        width,
        height
      });
    }
  };
};

const GameConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameConnected;