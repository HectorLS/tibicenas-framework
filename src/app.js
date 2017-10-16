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
import Detector  from './helpers/Detector';
import Scroller from './helpers/Scroller';

import lazysizes       from 'lazysizes';


class DY {
  constructor() {
    this.detector  = new Detector;

    if(this.detector.device !== ('mobile' || 'tablet')) {
      alert('DESKTOP: Activating smooth-scrollbar');
      this.scroller = new Scroller;
    } else {
      alert('No smooth-scrollbar on mobile or tablet !');
    }
  }


}

var dy = new DY;
