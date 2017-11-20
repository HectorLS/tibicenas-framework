import Rellax from 'rellax';

class Parallax {
  constructor(mobileOrTablet) {
    this.className = '.rellax'
    this.options = {
      speed: -2,
      center: false,
      round: true,
    };
    mobileOrTablet ? '' : this.init();
  }


  init() {
    // this.parallax = new Rellax(this.element, this.options);
  }
}


export default Parallax;
