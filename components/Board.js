/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react';

import Cell from './Cell'

class Board extends React.Component {
    render() {
        const width = this.props.width || 20;
        const height = this.props.height || 20;
        let cells = {};

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

export default Board;