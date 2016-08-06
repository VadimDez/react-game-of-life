/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react';
import { connect } from 'react-redux';

import { CELL_UPDATE } from './../actionTypes';

class Cell extends React.Component {

  changeState() {
    this.props.updateCell(this.props.row, this.props.column);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.life !== this.props.life;
  }

  render() {
    const lifeClass = this.props.life ? 'life' : '';
    return (
      <div
        className={ `cell ${lifeClass}` }
        onClick={this.changeState.bind(this)}
      ></div>
    )
  }
}

const mapSteteToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCell: (row, column) => {
      dispatch({
        type: CELL_UPDATE,
        row,
        column,
        life: 1
      });
    }
  };
};

export default connect(
  mapSteteToProps,
  mapDispatchToProps
)(Cell);