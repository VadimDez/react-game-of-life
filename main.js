/**
 * Created by vadimdez on 09/02/16.
 */

import React from 'react';
import {render} from 'react-dom';

import './styles/main.scss';
import Game from './components/Game';

const renderer = () => {
    render(
        <Game />,
        document.getElementById('app')
    );
};

renderer();