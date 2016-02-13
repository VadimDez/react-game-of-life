/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react'

class Cell extends React.Component {

  changeState() {
    //this.forceUpdate()

    this.context.store.dispatch({
      type: 'CELL_UPDATE',
      row: this.props.row,
      column: this.props.column,
      life: 1
    })
  }

  render() {
    return (
      <span onClick={this.changeState.bind(this)}>{this.props.life}</span>
    )
  }
}

Cell.contextTypes = {
  store: React.PropTypes.object
};

export default Cell