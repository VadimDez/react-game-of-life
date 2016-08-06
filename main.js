/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react';
import { render } from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';
import './styles/main.scss';
import Game from './components/Game';

const renderer = () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>,
      document.getElementById('app')
    );
};

renderer();