import Headroom from 'headroom.js';

class Navbar {
  constructor() {
    this.element  = document.getElementsByClassName('navbar')[0];
    this.menuIcon = document.getElementById('menu-icon');

    if (!!this.element) this.logo = this.element.getElementsByClassName('logo-wrapper')[0];
    this.menuWrapper = document.getElementsByClassName('menu-wrapper')[0];

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
    this.init();
  }


  init(withHeadroom = app.device.mobileOrTablet) {
    if(withHeadroom && !!this.element) {
      this.headroom = new Headroom(this.element, this.options);
      this.headroom.init();
    }
  }


  addListenerToMenuIcon(scroller, childScroller) {
    this.childScroller = childScroller; // This should be removed once app belongs to window object

    this.menuIcon.addEventListener('click', () => {
      this.menuIcon.classList.toggle('is-active');

      // Smooth Menu content transition
      if (this.menuWrapper.classList.contains('is-active')) {
        setTimeout(()=> {
          this.logo.classList.remove('menu-open');
          this.menuWrapper.classList.toggle('is-active');
          this.childScroller.scrollToTop();
        }, 300);
      } else {
        this.menuWrapper.classList.toggle('is-active');
        this.logo.classList.add('menu-open');
      }

      this.keepScrollPosition(scroller);
    }, false);
  }


  keepScrollPosition(scroller) {
    const yOffset = window.pageYOffset;
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
    let yOffset;
    scroller.customScroll ? yOffset = scroller.scrollbar.offset.y : yOffset = window.pageYOffset;
    scroller.element.classList.toggle('scroll-locked');
    scroller.element.classList.toggle('work-opened');

    if(scroller.element.classList.contains('scroll-locked')) {
      scroller.element.style.marginTop = (yOffset * -1) + 'px';
    } else {
      scroller.element.style.marginTop = '0px';
      window.scrollTo(0, this.previusOffset);
    }

    this.previusOffset = yOffset;
    return yOffset;
  }




  compact(state) {
    state ? this.element.classList.add('navbar--top') : this.element.classList.remove('navbar--top');
  }
}

export default Navbar;
