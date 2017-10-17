import Headroom from 'headroom.js';

class Navbar {
  constructor(mobileOrTablet) {
    this.element = document.querySelector('.navbar');
    this.options = {
      classes : {
        initial   : 'navbar--initialized', // when element is initialised
        pinned    : 'navbar--pinned',      // when scrolling up
        unpinned  : 'navbar--unpinned',    // when scrolling down
        top       : 'navbar--top',         // when above offset
        notTop    : 'navbar--not-top',     // when below offset
        bottom    : 'navbar--bottom',      // when at bottom of scoll area
        notBottom : 'navbar--not-bottom'   // when not at bottom of scroll area
      }
    };
    mobileOrTablet ? this.init(true) : this.init(false);
  }

  init(withHeadroom) {
    if(withHeadroom) {
      this.headroom = new Headroom(this.element, this.options);
      this.headroom.init();
    }
  }

  collapseMenu() {

  }

  expandMenu() {

  }

  compact(state) {
    console.log('Check if compact the navbar:::' + state);
    state ? this.element.classList.add('navbar--top') : this.element.classList.remove('navbar--top');
  }
}

export default Navbar;
