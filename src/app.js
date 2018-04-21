// import 'babel-polyfill'; // Webpack needs
import css from './public/scss/app.scss';


///////////////////// GLOBAL LIBS ///////////////////////
/////////////////////////////////////////////////////////
import './helpers/HandyFunctions';

///////////////////// HELPERS ///////////////////////////
/////////////////////////////////////////////////////////
import Device         from './helpers/Device';
import Ajax           from './helpers/Ajax';
import Scroller       from './helpers/Scroller';
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
    this.device      = new Device();
    this.states      = new States();
    this.ajax        = new Ajax();
    this.components  = {};
  }
}


////////////////////// PAGE LOAD ////////////////////////
/////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  window.app      = new Project();
  app.scroller    = new Scroller();
  app.lazyLoading = new LazyLoading();
  app.pjax        = new Pjax();

  // Tracking current URL
  window.currentPage  = '';
  window.previousPage = '';
  window.setCurrentPage = () => {
    previousPage = currentPage;
    currentPage  = document.body.getAttribute('data-url');
  }
  setCurrentPage();


  //           ADDING COMPONENTS           \\
  // ______________________________________//
  app.components.navbar = new Navbar();

  if(!app.device.mobileOrTablet) {
    app.scroller.update();
  }
  // app.scroller.addListener(app.navbar); // // OPTIMIZE:


  // TODO navbar   REFACTOR
  // TODO scroller REFACTOR
  // TODO parallax REFACTOR
});
