import {createStore, combineReducers} from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as actionTypes from './actionTypes';

let initialGameState = Map({
  width: 0,
  height: 0,
  generation: 0
});

const game = (state = initialGameState, action) => {
  if (action.type === actionTypes.BOARD_SIZE) {
    return state.merge({
      height: action.height,
      width: action.width
    });
  }

  if (action.type === actionTypes.GENERATION_INCREMENT) {
    return state.set('generation', state.get('generation') + 1);
  }

  if (action.type === actionTypes.GENERATION_RESET) {
    return state.set('generation', 0);
  }

  return state;
};

const initialCellsState = Map({
  cells: Map({})
});
const cells = (state = initialCellsState, action) => {
  if (action.type === actionTypes.SET_CELLS) {
    return state.merge({cells: action.cells});
  }

  if (action.type === actionTypes.CELL_UPDATE) {
    return state.get('' + action.row).set('' + action.column, action.life);
  }

  return state;
};

export default createStore(combineReducers({
  game,
  cells
}));