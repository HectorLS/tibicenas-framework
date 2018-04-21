import Headroom from 'headroom.js';

class Navbar {
  constructor(mobileOrTablet) {
    this.element     = document.getElementsByClassName('navbar')[0];
    this.menuIcon    = document.getElementById('menu-icon');
    this.menuLinks   = document.getElementById('navbar-contents-wrapper');
    this.navbarList  = document.getElementsByClassName('navbar-list')[0];
    this.backLayer   = document.getElementsByClassName('back-layer--menu')[0];
    this.menuWrapper = document.getElementsByClassName('menu-wrapper')[0];

    if (!!this.element) this.logo = this.element.getElementsByClassName('logo-wrapper')[0];

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
    this.init(app.device.mobileOrTablet);
  }


  init(withHeadroom) {
    if(withHeadroom) {
      this.headroom = new Headroom(this.element, this.options);
      this.headroom.init();
    }

    this.addListenerToMenuIcon();
  }


  addListenerToMenuIcon() {
    this.menuIcon.addEventListener('click', () => {
      this.toggleMenuState();
    }, false);
  }


  toggleMenuState() {
    this.menuIcon.classList.toggle('is-active');
    this.menuLinks.classList.toggle('is-active');
    this.navbarList.classList.toggle('is-active');
    // this.backLayer.classList.toggle('is-active');
    app.scroller.element.classList.toggle('scroll-locked');
  }

  closeNavbar() {
    this.menuIcon.classList.remove('is-active');
    this.menuLinks.classList.remove('is-active');
    this.navbarList.classList.remove('is-active');
    // this.backLayer.classList.remove('is-active');
    app.scroller.element.classList.remove('scroll-locked');
  }


  keepScrollPosition(scroller) {
    var yOffset = window.pageYOffset;
    scroller.element.classList.toggle('scroll-locked');
    scroller.element.classList.toggle('menu-opened');

    if(scroller.element.classList.contains('scroll-locked')) {
      scroller.element.style.marginTop = (yOffset * -1) + 'px';
    } else {
      scroller.element.style.marginTop = '0px';
      window.scrollTo(0, this.previusOffset);
    }

    this.previusOffset = yOffset;
  }

  openModalAndSaveScrollPosition(scroller) {
    console.log('OPEN&CLOSE MOBAL NAVB');
    var yOffset;
    scroller.customScroll ? yOffset = scroller.scrollbar.offset.y : yOffset = window.pageYOffset;
    scroller.element.classList.toggle('scroll-locked');
    scroller.element.classList.toggle('modal-opened');

    if(scroller.element.classList.contains('scroll-locked')) {
      // scroller.element.style.marginTop = (yOffset * -1) + 'px';
    } else {
      // scroller.element.style.marginTop = '0px';
      // window.scrollTo(0, this.previusOffset);
    }

    this.previusOffset = yOffset;
    return yOffset;
  }


  compact(state) {
    state ? this.element.classList.add('navbar--top') : this.element.classList.remove('navbar--top');
  }
}

export default Navbar;
