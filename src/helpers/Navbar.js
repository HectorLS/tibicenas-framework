import Headroom from 'headroom.js';

class Navbar {
  constructor(mobileOrTablet) {
    this.element  = document.getElementsByClassName('navbar')[0];
    this.menuIcon = document.getElementById('menu-icon');
    this.options  = {
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


  addListenerToMenuIcon(scroller) {
    this.menuIcon.addEventListener('click', () => {
      this.menuIcon.classList.toggle('is-active');
      scroller.element.classList.toggle('locked');
    });
  }


  compact(state) {
    state ? this.element.classList.add('navbar--top') : this.element.classList.remove('navbar--top');
  }


  collapseMenu() {}
  expandMenu() {}
}

export default Navbar;
