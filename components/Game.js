/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react'

import Board from './Board'

class Game extends React.Component {

  constructor() {
    super()

    this.interval = null
    this.boardSizes = [
      {width: 50, height: 30},
      {width: 70, height: 50},
      {width: 100, height: 80}
    ]
  }

  setRandomBoard() {
    const rand = Math.floor(Math.random() * this.boardSizes.length)
    const randomSize = this.boardSizes[rand];
    this.changeBoardSize(randomSize.width, randomSize.height).bind(this)()
  }

  componentDidMount() {
    this.store = this.context.store

    this.unsubscribe = this.store.subscribe(() => {
      this.forceUpdate()
    })

    this.setRandomBoard()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  /**
   * Change board size
   * @param width
   * @param height
   * @returns {Function}
   */
  changeBoardSize(width, height) {
    return function () {
      this.store.dispatch({
        type: 'BOARD_SIZE',
        width,
        height
      })

      this.generateCells(width, height, true)
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
        cells[r] = cells[r] || {}

        cells[r][c] = randomize ? Math.floor(Math.random() * 2) : 0
      }
    }

    this.store.dispatch({
      type: 'SET_CELLS',
      cells: cells
    })
  }

  run() {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(this.cycle.bind(this), 500);
  }

  pause() {
    clearInterval(this.interval)
  }

  /**
   * Clear interval and board
   */
  clear() {
    clearInterval(this.interval)
    const game = this.store.getState().game
    this.generateCells(game.width, game.height, false)

    // reset generation count
    this.store.dispatch({
      type: 'GENERATION_RESET'
    })
  }

  cycle() {
    const cells = this.store.getState().cells.cells
    let updatedCells = Object.assign({}, cells);
    const rows = Object.keys(cells).length

    for (var row = 0; row < rows; row++) {
      var columns = Object.keys(cells[row]).length

      for (var column = 0; column < columns; column++) {
        const prevRow = cells[row - 1] || {};
        const nextRow = cells[row + 1] || {};

        const count = (prevRow[column - 1] || 0) +
          (prevRow[column] || 0) +
          (prevRow[column + 1] || 0) +
          (cells[row][column - 1] || 0) +
          (cells[row][column + 1] || 0) +
          (nextRow[column - 1] || 0) +
          (nextRow[column] || 0) +
          (nextRow[column + 1] || 0)

        if (count < 2 || count > 3) {
          updatedCells[row][column] = 0;
        } else if (count === 3) {
          updatedCells[row][column] = 1;
        }
      }
    }

    this.store.dispatch({
      type: 'SET_CELLS',
      cells: updatedCells
    })

    // update generation count
    this.store.dispatch({
      type: 'GENERATION_INCREMENT'
    })
  }

  render() {
    this.store = this.context.store
    const state = this.store.getState()

    return (
      <div>
        <div>Game</div>
        <div>
          <button onClick={this.run.bind(this)}>Run</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <button onClick={this.clear.bind(this)}>Clear</button>
        </div>
        <div>
          Size:
          {
            this.boardSizes.map(function (size, i) {
              return <button key={i} onClick={this.changeBoardSize(size.width, size.height).bind(this)}>{size.width}x{size.height}</button>
            }.bind(this))
          }
        </div>
        <div>
          Generation: {state.game.generation}
        </div>
        <Board />
      </div>
    );
  }
}

Game.contextTypes = {
  store: React.PropTypes.object
};

export default Game;