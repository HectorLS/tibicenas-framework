import 'babel-polyfill'; // Webpack needs
import css from './public/scss/app.scss';


///////////////////// GLOBAL LIBS ///////////////////////
/////////////////////////////////////////////////////////


///////////////////// HELPERS ///////////////////////////
/////////////////////////////////////////////////////////
import Device         from './helpers/Device';
import Scroller       from './helpers/Scroller';
import Navbar         from './helpers/Navbar';
import LazyLoading    from './helpers/LazyLoading';
import States         from './helpers/StatesMachine';
import Parser         from './helpers/Parser';
import Pjax           from './helpers/Pjax';
import WebStorage     from './helpers/WebStorage';


///////////////////// COMPONENTS ////////////////////////
/////////////////////////////////////////////////////////
import Navbar          from './components/Navbar';
import Parallax        from './components/Parallax';
// import Image           from './components/Image';



///////////////////// CONSTRUCTOR ///////////////////////
/////////////////////////////////////////////////////////
class Project {
  constructor() {
    this.device   = new Device();
    this.states     = new States();
    this.components = {};

    this.scroller    = new Scroller();
    this.lazyLoading = new LazyLoading();
  }
}


////////////////////// PAGE LOAD ////////////////////////
/////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  window.app = new Project();

  // Tracking current URL
  window.currentPage  = '';
  window.previousPage = '';
  window.setCurrentPage = () => {
    previousPage = currentPage;
    currentPage  = document.body.getAttribute('data-url');
  }
  setCurrentPage();




  //
  //           ADDING COMPONENTS           \\
  // ______________________________________//
  app.components.navbar = new Navbar();

  if(!app.device.mobileOrTablet) {
    app.scroller.update();
    app.scroller.addListener(app.navbar); // // OPTIMIZE:
  }


  // TODO navbar   REFACTOR
  // TODO scroller REFACTOR
  // TODO parallax REFACTOR
  app.navbar.addListenerToMenuIcon(app.scroller);  // OPTIMIZE
});
