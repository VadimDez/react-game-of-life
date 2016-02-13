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

    const rand = Math.floor(Math.random() * (this.boardSizes.length))
    const randomSize = this.boardSizes[rand];
    //this.changeBoardSize(randomSize.width, randomSize.height);
  }

  componentDidMount() {
    const store = this.context.store

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
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

      this.generateCells(width, height)
    }
  }

  /**
   * Generate empty cells
   *
   * @param {int} width
   * @param {int} height
   * @returns {{}}
   */
  generateCells(width, height) {
    var cells = {};
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        cells[r] = cells[r] || {}

        cells[r][c] = 0
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

    this.interval = setInterval(this.cycle, 500);
  }

  pause() {
    clearInterval(this.interval)
  }

  /**
   * Clear interval and board
   */
  clear() {
    clearInterval(this.interval)
    const board = this.store.getState().board
    this.generateCells(board.width, board.height)
  }

  cycle() {
    console.log('cycle');
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
        <Board />
      </div>
    );
  }
}

Game.contextTypes = {
  store: React.PropTypes.object
};

export default Game;