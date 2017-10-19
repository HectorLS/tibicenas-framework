import css from './public/scss/app.scss';

import Detector    from './helpers/Detector';
import Scroller    from './helpers/Scroller';
import Navbar      from './helpers/Navbar';
import LazyLoading from './helpers/LazyLoading';


class Project {
  constructor() {
    this.detector  = new Detector();

    if(this.detector.device !== ('mobile' || 'tablet')) {

      this.scroller    = new Scroller(false);
      this.navbar      = new Navbar(false);
      this.lazyLoading = new LazyLoading(false);

    } else {

      this.navbar      = new Navbar(true);
      this.lazyLoading = new LazyLoading(true);

    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var app = new Project();

  if(app.detector.device === 'desktop') {
    app.scroller.update();
    app.scroller.addListener(app.navbar);
  }

  app.navbar.addListenerToMenuIcon(app.scroller);
});
