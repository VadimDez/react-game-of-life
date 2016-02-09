/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react'

import Board from './Board'

class Game extends React.Component {
    render() {
        return (
            <div>
                <div>Game</div>
                <Board />
            </div>
        );
    }
}

export default Game;