import Scrollbar from 'smooth-scrollbar';


class Scroller {
  constructor(mobileOrTablet) {
    this.element = document.querySelector('#scrollbar-wrapper');
    this.options = {
      damping: 0.25,
      thumbMinSize: 5,
      renderByPixel: true,
      alwaysShowTracks: false,
      continuousScrolling: true
    };

    mobileOrTablet ? '' : this.init();
  }

  init() {
    this.scrollbar = Scrollbar.init(this.element, this.options);
    document.querySelector('body').setAttribute('scroller', true);
    this.scrollbar.addListener(this.addListener());
  }

  update() {
    this.scrollbar.update();
  }

  addListener() {
    console.log('Listener ---> Scrolling action detected !!')
  }

  scrollTo() {}
  setPosition(){}
  lockScroll() {}
  unlockScroll() {}
}


export default Scroller;
