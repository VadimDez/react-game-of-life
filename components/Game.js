/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react'

import Board from './Board'

class Game extends React.Component {

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
    }
  }

  render() {
    this.store = this.context.store
    const state = this.store.getState()

    return (
      <div>
        <div>Game</div>
        <div>
          <button>Run</button>
          <button>Pause</button>
          <button>Clear</button>
        </div>
        <div>
          Size:
          <button onClick={this.changeBoardSize(50, 30).bind(this)}>50x30</button>
          <button onClick={this.changeBoardSize(70, 50).bind(this)}>70x50</button>
          <button onClick={this.changeBoardSize(100, 80).bind(this)}>100x80</button>
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