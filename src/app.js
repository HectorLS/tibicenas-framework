const css = require('./public/scss/app.scss');

import React     from 'react';
import ReactDOM  from 'react-dom';

const App = require('./components/App')


ReactDOM.render(
  <App slogan='Focus on the design' />,
  document.getElementById('root')
);
