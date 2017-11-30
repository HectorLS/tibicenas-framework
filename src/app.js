import css from './public/scss/app.scss';

///////////////////// HELPERS ///////////////////////////
/////////////////////////////////////////////////////////
import Detector       from './helpers/Detector';
import Scroller       from './helpers/Scroller';
import Navbar         from './helpers/Navbar';
import LazyLoading    from './helpers/LazyLoading';
import States         from './helpers/StatesMachine';
import Pjax           from './helpers/Pjax';
import TweenLite      from 'gsap/TweenLite';
import TweenMax       from 'gsap/TweenMax';
import CSSPlugin      from 'gsap/CSSPlugin';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


///////////////////// COMPONENTS ////////////////////////
/////////////////////////////////////////////////////////
import Video               from './components/Video';


class Project {
  constructor() {
    this.detector   = new Detector();
    this.states     = new States();
    this.components = {};

    if(this.detector.device !== ('mobile' || 'tablet')) {
      this.scroller    = new Scroller(false);
      this.navbar      = new Navbar(false);
      this.lazyLoading = new LazyLoading(false);
    }
    else {
      this.scroller    = new Scroller(true);
      this.navbar      = new Navbar(true);
      this.lazyLoading = new LazyLoading(true);
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  var app = new Project();

  app.components.video = new Video( app.states, 'cmp-video', true);

  if(app.detector.device === 'desktop') {
    app.scroller.update();
    app.scroller.addListener(app.navbar);
  }

  app.navbar.addListenerToMenuIcon(app.scroller);


  // TESTING MENU ANCHOR LINKS CONTENT DETECTION
  var scrollbarContainer = document.getElementsByClassName('menu-content')[0];
  scrollbarContainer.style.border = '4px solid red';
  let links = document.getElementsByClassName('menu-list')[0].getElementsByTagName('a');

  for (let link of links) {
    link.addEventListener('click', (element) => {

      element.preventDefault;
      element.stopPropagation

      var scrollbarContainer = document.getElementsByClassName('menu-content')[0];
      var options = {
        scrollTo: {
          y: element.target.hash,
          // autoKill: true,
          offsetY: 268
        },
        ease: Power1.easeOut
      };

      TweenLite.to(scrollbarContainer, 2, options);

    });
  }
  // END TESTING
});
