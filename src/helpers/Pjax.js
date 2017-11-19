import Barba from 'barba.js';

class Pjax {
  constructor() {
    Barba.Pjax.Dom.wrapperId      = 'pjax-wrapper';
    Barba.Pjax.Dom.containerClass = 'pjax-content';
    this.init();
  }

  init() {
    this.barba = Barba.Pjax.start();
  }
}

export default Pjax;
