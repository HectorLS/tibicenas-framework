import Scrollbar from 'smooth-scrollbar';


class Scroller {
  constructor() {
    this.element = document.querySelector('#scrollbar-wrapper');
    this.options = {
      damping: 0.15,
      thumbMinSize: 5,
      renderByPixel: true,
      alwaysShowTracks: false,
      continuousScrolling: true
    };
    this.init();
  }

  init() {
    Scrollbar.init(this.element, this.options);
    document.querySelector('body').setAttribute('scroller', true);
  }
}


export default Scroller;


// setAttribute('ewdwefw','vakye');
