import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main';

injectTapEventPlugin();

render(<Main />, document.getElementById('root'));