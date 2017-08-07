import css from './public/scss/app.scss';

import React     from 'react';
import ReactDOM  from 'react-dom';

import App from './components/App';


ReactDOM.render(
  <App slogan='Focus on the design' />,
  document.getElementById('root')
);
