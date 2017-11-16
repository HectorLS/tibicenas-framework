import css from './public/scss/app.scss';

import Detector            from './helpers/Detector';
import Scroller            from './helpers/Scroller';
import Navbar              from './helpers/Navbar';
import LazyLoading         from './helpers/LazyLoading';
import ImagesBlockObserver from './helpers/ImagesBlockObserver';
// import Fsm                 from './helpers/StatesMachine';
// import BaseComponent       from './components/BaseComponent';
import Pjax                from './helpers/Pjax';


import Button              from './components/Button';


class Project {
  constructor() {
    this.detector            = new Detector();
    this.imagesBlockObserver = new ImagesBlockObserver();
    // this.fsm                 = new Fsm();


    if(this.detector.device !== ('mobile' || 'tablet')) {
      this.scroller    = new Scroller(false);
      this.navbar      = new Navbar(false);
      this.lazyLoading = new LazyLoading(false);
    }
    else {
      this.navbar      = new Navbar(true);
      this.lazyLoading = new LazyLoading(true);
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var app = new Project();

  document.getElementById('test').addEventListener('click', () => {
    var btn = new Button('.prueba', false);
    btn.createInstance();
  });

  if(app.detector.device === 'desktop') {
    app.scroller.update();
    app.scroller.addListener(app.navbar);
  }

  app.navbar.addListenerToMenuIcon(app.scroller);
  var imgContainer = document.getElementsByClassName('main-content')[0];
  app.imagesBlockObserver.createObserver(imgContainer);
});


// LISTENER PARA SI NO CARGA UNA IMAGEN Y SUSTITUIRLA POR OTRA FALLBACK !!!!
// document.addEventListener('error', function(e) {
//   if(e.target.nodeName == 'IMG') { e.target.src = 'fallback-img.jpg';}
// }, true);
