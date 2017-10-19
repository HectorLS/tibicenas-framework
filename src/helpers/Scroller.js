import Scrollbar from 'smooth-scrollbar';


class Scroller {
  constructor(mobileOrTablet) {
    this.element = document.getElementById('scrollbar-wrapper');
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
    document.getElementsByTagName('body')[0].setAttribute('scroller', true);
  }

  update() {
    this.scrollbar.update();
  }

  addListener(navbar) {
    this.scrollbar.addListener((data) => {
      data.offset.y === 0 ? navbar.compact(true) : navbar.compact(false);
    });
  }

  scrollTo() {}
  setPosition(){}

  lockScroll() {
    this.element.classList.add('locked');
  }
  unlockScroll() {
    this.element.classList.remove('locked');
  }
}


export default Scroller;
