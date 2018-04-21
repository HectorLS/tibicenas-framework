import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';  // https://github.com/idiotWu/smooth-scrollbar/blob/develop/docs/api.md
import { debounce, throttle }         from 'lodash';



class InvertDeltaPlugin extends ScrollbarPlugin {
  static pluginName     = 'invertDelta';
  static defaultOptions = {
    events: [],
  };

  transformDelta(delta, fromEvent) {
    if (this.shouldInvertDelta(fromEvent)) {
      return {
        x: delta.y,
        y: 0          //This should be delta.x or 0 if you want to avoid vertical scrolling
      };
    }
    return delta;
  }

  shouldInvertDelta(fromEvent) {
    return this.options.events.some(rule => fromEvent.type.match(rule));
  }
}

Scrollbar.use(InvertDeltaPlugin);



class Scroller {
  constructor(verticalWheelScroll = true) {
    this.options = {
      damping: 0.25,
      thumbMinSize: 5,
      renderByPixel: true,
      alwaysShowTracks: false,
      continuousScrolling: true
    };

    if (!verticalWheelScroll) {
      this.options.plugins = {
        invertDelta: {
          events: [/wheel/]
        }
      }
    }

    if(!app.device.mobileOrTablet) this.init();
  }


  init(container = document) {
    this.customScroll = true;
    this.element = container.getElementsByClassName('scrollbar-wrapper')[0];

    if (!!this.element) {
      this.scrollbar = Scrollbar.init(this.element, this.options);
    } else {
      document.body.setAttribute('data-scroller', true);
    }
  }


  update() {
    if (!!this.scrollbar) this.scrollbar.update();
  }


  destroyAll() {
    if (!!this.scrollbar) this.scrollbar.update();
  }


  // This must be refactored for other elements
  addListener(navbar, childScroller) {
    this.scrollbar.addListener((data) => {
      data.offset.y === 0 ? navbar.compact(true) : navbar.compact(false);
      data.offset.y <= 10 ? navbar.logo.classList.remove('hidden') : navbar.logo.classList.add('hidden');
    });
  }


  scrollHasChanged(condition, callback, callbackParams, throttlingValue = 0) {
    this.scrollbar.addListener(_.throttle((data) => {
      if (condition) callback(callbackParams);
    }, throttlingValue));
  }


  restart(container = document, verticalWheelScroll = true) {
    if (this.customScroll) {

      if (verticalWheelScroll) {
        this.options.plugins = {};
      } else {
        this.options.plugins = {
          invertDelta: {
            events: [/wheel/]
          }
        }
      }

      this.element = document.getElementById('scrollbar-wrapper');
      this.init(container);
      this.update();
    }
  }

  elementIsVisible(component, threshold, axis, scrollbarContainer, edgeDistance) {
    const docEl    = document.documentElement,
          element  = component.element,
          viewport = {};

    var scrollbar;
    scrollbarContainer ? scrollbar = scrollbarContainer : scrollbar = this.element;

    viewport.width  = docEl.clientWidth  < window.innerWidth  ? window.innerWidth  : docEl.clientWidth;
    viewport.height = docEl.clientHeight < window.innerHeight ? window.innerHeight : docEl.clientHeight;

    if (this.customScroll) {
      this.scrollbar.addListener((data) => {

        var elementPosition = this.getElementPosition(element, threshold);
        viewport.scrollX = this.scrollbar.offset.x;
        viewport.scrollY = this.scrollbar.offset.y;
        var result;
        axis === 'y' || 'Y' ? result = this.inYAxis(elementPosition, viewport) : result = this.inXAxis(elementPosition, viewport);

        // This line only for parallax.js (needs to be extracted as a callback)
        // IDEA block scroll on all the list minus the active ones
        // new click, scroll to top, block the active one, active the new one
        // debugger;

        result ? component.running = true : component.running = false;
      });
    }
  }


  lockScroll() {
    this.element.classList.add('scroll-locked');
  }


  unlockScroll() {
    this.element.classList.remove('scroll-locked');
  }


  getElementPosition(element, threshold) {
    const oldContainer = app.pjax.oldContainerDimensions;

    var calibrate = (ElementCoordinates, threshold = 0) => {
      var element = {
        top    : ElementCoordinates.top - threshold - oldContainer.height,
        bottom : ElementCoordinates.bottom + threshold - oldContainer.height,
        left   : ElementCoordinates.left - threshold - oldContainer.width,
        right  : ElementCoordinates.right + threshold - oldContainer.width
      };

      element.width  = element.right  - element.left;
      element.height = element.bottom - element.top;

      return element;
    };

    return calibrate(element.getBoundingClientRect(), threshold);
  }


  inXAxis(elementPosition, viewport){
    return elementPosition.right >= 0 && elementPosition.left <= viewport.width;
  }


  inYAxis(elementPosition, viewport){
    return elementPosition.bottom >= 0 && elementPosition.top <= viewport.height;
  }


  scrollToTop(){
    if (this.customScroll) {
      this.scrollbar.scrollTop = 0;
    } else {
      window.scrollTo(0,0);
    }
  }

  scrollTo() {}
  setPosition(){}
}


export default Scroller;
