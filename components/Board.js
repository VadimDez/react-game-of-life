/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react';

import Cell from './Cell'

class Board extends React.Component {
    render() {
        const state = this.context.store.getState()
        const width = state.board.width
        const height = state.board.height
        let cells = {}

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                cells[r] = cells[r] || {};

                cells[r][c] = <Cell key={`cell-${r}-${c}`} />
            }
        }

        return (
            <div>
                <div>Board</div>
                { this.renderObject(cells) }
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
                line.push(object[row][column]);
            }
            lines.push(<div key={`row-${row}`}>{line}</div>);
        }

        return lines;
    }
}

Board.contextTypes = {
    store: React.PropTypes.object
};

export default Board;