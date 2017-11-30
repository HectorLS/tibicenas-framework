import Headroom from 'headroom.js';

class Navbar {
  constructor(mobileOrTablet) {
    this.element  = document.getElementsByClassName('navbar')[0];
    this.menuIcon = document.getElementById('menu-icon');
    this.logo     = this.element.getElementsByClassName('logo-wrapper')[0];
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

      // Smooth Menu content transition
      if (this.menuWrapper.classList.contains('is-active')) {
        setTimeout(()=> {
          this.menuWrapper.classList.toggle('is-active');
        }, 300);
      } else {
        this.menuWrapper.classList.toggle('is-active');
      }

      this.keepScrollPosition(scroller);
    });
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
    var yOffset;

    scroller.customScroll ? yOffset = window.pageYOffset : yOffset = scroller.scrollbar.offset.y;
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
