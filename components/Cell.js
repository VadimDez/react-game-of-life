/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react'
import { CELL_UPDATE } from './../actionTypes';

class Cell extends React.Component {

  changeState() {
    this.context.store.dispatch({
      type: CELL_UPDATE,
      row: this.props.row,
      column: this.props.column,
      life: 1
    })
  }

  render() {
    return (
      <div
        className={'cell ' + ((this.props.life) ? 'life' : '')}
        onClick={this.changeState.bind(this)}></div>
    )
  }
}

Cell.contextTypes = {
  store: React.PropTypes.object
};

export default Cell