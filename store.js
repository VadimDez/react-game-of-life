import {createStore, combineReducers} from 'redux';

const board = (state = {width: 0, height: 0}, action) => {

  if (action.type === 'BOARD_SIZE') {
    return Object.assign({}, state, {
      height: action.height,
      width: action.width
    })
  }

  return state
}

const cells = (state = {}, action) => {

  if (action.type === 'SET_CELLS') {
    return Object.assign({}, state, {
      cells: action.cells
    })
  }

  if (action.type === 'CELL_UPDATE') {
    state.cells[action.row][action.column] = action.life

    return Object.assign({}, state)
  }

  return state;
}

export default createStore(combineReducers({
  board,
  cells
}));