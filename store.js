import {createStore, combineReducers} from 'redux';

const board = (state = {}, action) => {
  return state
};

export default createStore(combineReducers({
  board
}));