import Scrollbar    from 'smooth-scrollbar';  // https://github.com/idiotWu/smooth-scrollbar/blob/develop/docs/api.md
import { debounce } from "lodash";
import { throttle } from "lodash";

class Scroller {
  constructor(mobileOrTablet, element = document.getElementById('scrollbar-wrapper')) {
    this.element = element;
    this.options = {
      damping: 0.25,
      thumbMinSize: 5,
      renderByPixel: true,
      alwaysShowTracks: false,
      continuousScrolling: true
    };
    this.customScroll = !mobileOrTablet;
    mobileOrTablet ? '' : this.init();
  }


  init() {
    this.scrollbar = Scrollbar.init(this.element, this.options);
    document.getElementsByTagName('body')[0].setAttribute('data-scroller', true);
  }

  update() {
    this.scrollbar.update();
  }

  addListener(navbar) {
    // TEMP.
    var parallax = document.getElementsByClassName('parallax')[0];
    var parallaxImage = parallax.getElementsByClassName('parallax-img')[0];
    var styles;
    // End TEMP.


    this.scrollbar.addListener( _.throttle((data) => {
      data.offset.y === 0 ? navbar.compact(true) : navbar.compact(false);
      // data.offset.y <= navbar.logo.getBoundingClientRect().height*2 ? navbar.logo.classList.remove('hidden') : navbar.logo.classList.add('hidden');
      // TEMP.
      const docEl    = document.documentElement,
            viewport = {};

      var scrollbar = this.element;

      viewport.width  = docEl.clientWidth  < window.innerWidth  ? window.innerWidth  : docEl.clientWidth;
      viewport.height = docEl.clientHeight < window.innerHeight ? window.innerHeight : docEl.clientHeight;

      var element = this.getElementPosition(parallax, 0);
      viewport.scrollX = this.scrollbar.offset.x;
      viewport.scrollY = this.scrollbar.offset.y;
      if(this.inYAxis(element, viewport)) {
        console.log('element', element);
        console.log('viewport', viewport);


        function percentageInScreen(element, viewport){
          return 100*element.top/viewport.height;
        }

        function getYOffset(element,viewport){
          return (percentageInScreen(element, viewport)*element.height/2)/100;
        }

        function parallaxIsCentered(element, viewport) {
          if( ((viewport.height/2 - element.height/2)+ 1) >= element.top  &&
              ((viewport.height/2 - element.height/2)- 1) <= element.top ) {
            return true;
          }
        }

        var yOffset = getYOffset(element, viewport);
        console.log('yOffset', yOffset);
        styles = {transform: `translateY(-50%) translate3d(0, ${yOffset}px, 0)`}
        Object.assign(parallaxImage.style, styles);
      }
      // End TEMP.
    }, 100));
  }


  lockScroll() {
    this.element.classList.add('scroll-locked');
  }


  unlockScroll() {
    this.element.classList.remove('scroll-locked');
  }

  // Future Refactor would be great to use this new API for the most modern browsers
  //  IntersectionObserver
  //  ====================
  //    https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  //    https://w3c.github.io/IntersectionObserver/
  //    https://github.com/w3c/IntersectionObserver/blob/gh-pages/explainer.md
  elementIsVisible(element, threshold, axis, scrollbarContainer, edgeDistance) {
    const docEl    = document.documentElement,
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

        axis === 'y' || 'Y' ? this.inYAxis(elementPosition, viewport) : this.inXAxis(elementPosition, viewport);
      });
    }
    else {
      // IF THE ELEMENT WITH THE SCROLL IS THE VIEWPORT
      // window.addEventListener('scroll', () => {
      //   viewport.scrollX = window.pageXOffset || docEl.scrollLeft;
      //   viewport.scrollY = window.pageYOffset || docEl.scrollTop;
      //
      //   axis === 'y' || 'Y' ? this.inYAxis(elementPosition, viewport) : this.inXAxis(elementPosition, viewport);
      // });

      // IF THE ELEMENT WITH THE SCROLL IS A CHILD DOCUMENT ELEMENT: LIKE A MODAL BOX
      // NEED A REFACTOR to catch both cases
      document.getElementsByClassName('menu-content')[0].addEventListener('scroll', () => {
        var elementPosition = this.getElementPosition(element, threshold);
        viewport.scrollX = document.getElementsByClassName('modal-content')[0].pageXOffset;
        viewport.scrollY = document.getElementsByClassName('modal-content')[0].pageYOffset;

        axis === 'y' || 'Y' ? this.inYAxis(elementPosition, viewport) : this.inXAxis(elementPosition, viewport);
      });
    }
  }


  elementReachsThisEdge (element, threshold, axis, scrollbarContainer, edgeDistance) {
    // just FOR Y AXIS now, needs refactor
    const target   = document.querySelectorAll(`a[href^='#${element.getAttribute('id')}']`)[0],
          docEl    = document.documentElement,
          viewport = {};

    var scrollbar;
    scrollbarContainer ? scrollbar = scrollbarContainer : scrollbar = this.element;

    if(edgeDistance !== undefined)  {
      viewport.height = edgeDistance;
    } else {
      viewport.height = docEl.clientHeight < window.innerHeight ? window.innerHeight : docEl.clientHeight;
    }

    scrollbar.addEventListener('scroll', _.throttle(() => {
      var elementPosition = this.getElementPosition(element, threshold);

      if (elementPosition.bottom >= viewport.height && elementPosition.top <= viewport.height) {
        !!target ? target.classList.add('is-active') : '';
      } else {
        !!target ? target.classList.remove('is-active') : '';
      }
    }, 200));
  }


  getElementPosition(element, threshold) {
    var calibrate = (ElementCoordinates, threshold = 0) => {
      var element = {
        top    : ElementCoordinates.top - threshold,
        bottom : ElementCoordinates.bottom + threshold,
        left   : ElementCoordinates.left - threshold,
        right  : ElementCoordinates.right + threshold
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
    console.log(elementPosition.bottom >= 0 && elementPosition.top <= viewport.height)
    return elementPosition.bottom >= 0 && elementPosition.top <= viewport.height;
  }


  scrollTo() {}
  setPosition(){}
}


export default Scroller;
