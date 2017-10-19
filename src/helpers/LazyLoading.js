
// We need to setup lazysizes autoinit to false before the imports
window.lazySizesConfig      = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

// Object-fit is a plugin that must be imported before lazysizes
import 'lazysizes/plugins/object-fit/ls.object-fit.min'; //if browsers don't support object-fit
import lazysizes from 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit.min';
import 'lazysizes/plugins/respimg/ls.respimg.min'; // extra for object-fit
import 'lazysizes/plugins/optimumx/ls.optimumx.min';
import 'lazysizes/plugins/progressive/ls.progressive.min';


class LazyLoading {
  constructor(mobileOrTablet) {
    // DevicePixelRatio reduced on touch devices to avoid extra large (weight) images on retina displays
    mobileOrTablet ? this.devicePixelRatio = window.devicePixelRatio * .8 : this.devicePixelRatio = window.devicePixelRatio * .8;
    window.lazySizesConfig.OptimumX = () => {
      return this.devicePixelRatio;
    }
    this.init();
  }


  init() {
    lazysizes.init();
  }
}

export default LazyLoading;
