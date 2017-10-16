import css from './public/scss/app.scss';

// import React     from 'react';
// import ReactDOM  from 'react-dom';
//
// import App from './components/App';
//
//
// ReactDOM.render(
//   <App slogan='Focus on the design' />,
//   document.getElementById('root')
// );


import Detector from './helpers/detection';



import lazysizes       from 'lazysizes';
import smoothScrollbar from 'smooth-scrollbar';


var detector = new Detector;

detector.getInfo();
