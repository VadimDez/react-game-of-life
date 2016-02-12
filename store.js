import {createStore, combineReducers} from 'redux';

const board = (state = {width: 0, height: 0}, action) => {

  if (action.type === 'BOARD_SIZE') {
    return Object.assign({}, state, {
      height: action.height,
      width: action.width
    })
  }

  return state
};

export default createStore(combineReducers({
  board
}));