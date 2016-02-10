/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react'

import Board from './Board'

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 50,
      height: 30
    }
  }

  /**
   * Change board size
   * @param width
   * @param height
   * @returns {Function}
   */
  changeBoardSize(width, height) {
    return function () {
      this.setState({
        width,
        height
      });
    }
  }

  render() {
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
        <Board width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default Game;