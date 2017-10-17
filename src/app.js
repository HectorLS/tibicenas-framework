import css from './public/scss/app.scss';

import Detector    from './helpers/Detector';
import Scroller    from './helpers/Scroller';
import Navbar      from './helpers/Navbar';
import LazyLoading from './helpers/LazyLoading';


class DY {
  constructor() {
    this.detector  = new Detector();

    if(this.detector.device !== ('mobile' || 'tablet')) {
      // alert('DESKTOP: Activating smooth-scrollbar');
      this.scroller = new Scroller(false);
      this.navbar   = new Navbar(false);
      console.log(this.navbar);
    } else {
      // alert('No smooth-scrollbar on mobile or tablet !');
      this.navbar = new Navbar(true);
    }
  }
}


document.addEventListener("DOMContentLoaded", function() {
  var dy = new DY();

  if(dy.detector.device === 'desktop') {
    dy.scroller.update();
    dy.scroller.addListener(dy.navbar);
    // if (dy.scroller.position.offset.y === 0) {
      // dy.navbar.compact(true);
    // } else {
      // dy.navbar.compact(false);
    // }
  }
});
