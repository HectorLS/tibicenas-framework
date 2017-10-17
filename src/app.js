import css from './public/scss/app.scss';

import Detector from './helpers/Detector';
import Scroller from './helpers/Scroller';
// import Navbar   from './helpers/Navbar';

import lazysizes       from 'lazysizes';

class DY {
  constructor() {
    this.detector  = new Detector();

    if(this.detector.device !== ('mobile' || 'tablet')) {
      // alert('DESKTOP: Activating smooth-scrollbar');
      this.scroller = new Scroller(false);
      // this.navbar   = new Navbar(false);
    } else {
      // alert('No smooth-scrollbar on mobile or tablet !');
      // this.navbar = new Navbar(true);
    }
  }
}

var dy = new DY();

document.addEventListener("DOMContentLoaded", function() {
  dy.scroller.update();
});
