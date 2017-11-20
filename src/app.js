import css from './public/scss/app.scss';


///////////////////// HELPERS ///////////////////////////
/////////////////////////////////////////////////////////
import Detector            from './helpers/Detector';
import Scroller            from './helpers/Scroller';
import Navbar              from './helpers/Navbar';
import LazyLoading         from './helpers/LazyLoading';
import ImagesBlockObserver from './helpers/ImagesBlockObserver';
import States              from './helpers/StatesMachine';
import Pjax                from './helpers/Pjax';
import Parallax            from './helpers/Parallax';


///////////////////// COMPONENTS ////////////////////////
/////////////////////////////////////////////////////////
import Button              from './components/Button';
import Video               from './components/Video';
import Card                from './components/Card';


class Project {
  constructor() {
    this.detector            = new Detector();
    this.states              = new States();
    this.imagesBlockObserver = new ImagesBlockObserver();
    this.components          = {};

    if(this.detector.device !== ('mobile' || 'tablet')) {
      this.scroller    = new Scroller(false);
      this.navbar      = new Navbar(false);
      this.lazyLoading = new LazyLoading(false);
      this.parallax    = new Parallax(false);
    }
    else {
      this.navbar      = new Navbar(true);
      this.lazyLoading = new LazyLoading(true);
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var app = new Project();

  app.components.button = new Button(app.states, 'x-btn',   false);
  app.components.video  = new Video( app.states, 'x-video', true);
  app.components.card   = new Card(  app.states, 'x-card',  false);

  // document.getElementById('test').addEventListener('click', () => {
  //   btn.createInstance();
  // });

  if(app.detector.device === 'desktop') {
    app.scroller.update();
    app.scroller.addListener(app.navbar);
  }

  app.navbar.addListenerToMenuIcon(app.scroller);
  var imgContainer = document.getElementsByClassName('section--gallery')[0];
  // var imgContainer = document.getElementsByClassName('main-content')[0];
  app.imagesBlockObserver.createObserver(imgContainer);
});


// LISTENER PARA SI NO CARGA UNA IMAGEN Y SUSTITUIRLA POR OTRA FALLBACK !!!!
// document.addEventListener('error', function(e) {
//   if(e.target.nodeName == 'IMG') { e.target.src = 'fallback-img.jpg';}
// }, true);
