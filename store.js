import {createStore, combineReducers} from 'redux';

const game = (state = {width: 0, height: 0, generation: 0}, action) => {

  if (action.type === 'BOARD_SIZE') {
    return Object.assign({}, state, {
      height: action.height,
      width: action.width
    })
  }

  if (action.type === 'GENERATION_INCREMENT') {
    return Object.assign({}, state, {
      generation: state.generation + 1
    })
  }

  if (action.type === 'GENERATION_RESET') {
    return Object.assign({}, state, {
      generation: 0
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
  game,
  cells
}));