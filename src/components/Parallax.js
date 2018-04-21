import BaseComponent from './BaseComponent';

class Parallax extends BaseComponent {
  constructor(componentName){
    super(componentName, needsWatcher);

    this.screen = {
      // x: window.innerWidth,
      // y: window.innerHeight
      x: app.scroller.scrollbar.size.container.width,
      y: app.scroller.scrollbar.size.container.height
    };

    this.options = {
      speed : 76,
      center: false,
      round : true,
      vertical   : true,
      horizontal : false,
      callback   : () => {}
    };

    this.options.speed = this._clamp(this.options.speed, -150, 150);
    this.transformProp = this._getTransformPropertyAcceptedByTheBrowser();
  }


  init(component) {
    // elementData can take a while, maybe better refactor it as a promise, then the others functions can run
    this._getElementData(component);

    this.addCustomEvents(component);
    // Start the loop
    this.update(component);
    // The loop does nothing if the scrollPosition did not change
    // so call animate to make sure every element has their transforms
    this.animate(component);
  }


  _getElementData(component) {

    const dataPercentage  = component.element.getAttribute('data-rellax-percentage');
    const dataSpeed       = component.element.getAttribute('data-rellax-speed');
    const dataZindex      = component.element.getAttribute('data-rellax-zindex');


    component.running = true;
    component.zindex  = dataZindex || 0;
    app.scroller.elementIsVisible(component, 0, 'y')

    const position = app.scroller.getElementPosition(component.element);
    component.top    = position.top;
    component.bottom = position.bottom;
    component.left   = position.left;
    component.right  = position.right;
    component.width  = position.width;
    component.height = position.height;


    // Setup the speed
    // ==================
    if (dataPercentage || this.options.center) {
      component.speed = this._clamp(dataSpeed || this.options.speed, -5, 5);
    } else {
      component.speed = dataSpeed ? this._clamp(dataSpeed, -150, 150) : this.options.speed;
    }

    // Setup the position
    // ==================
    // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
    // ensures elements are positioned based on HTML layout.
    //
    // If the element has the percentage attribute, the posY and posX needs to be
    // the current scroll position's value, so that the elements are still positioned based on HTML layout
    component.posY = this.options.vertical   ? ( dataPercentage || this.options.center ? app.scroller.scrollbar.offset.y : 0 ) : 0;
    component.posX = this.options.horizontal ? ( dataPercentage || this.options.center ? app.scroller.scrollbar.offset.x : 0 ) : 0;

    // Setup the percentage
    // ====================
    let percentageX = 0;
    let percentageY = 0;

    if(this.options.center) {
      percentageX = 0.5;
      percentageY = 0.5;
    } else {
      let screenY = this.screen.y || 0;
      let screenX = this.screen.x || 0;

      percentageY = dataPercentage ? dataPercentage : (component.posY - component.top + screenY)  / (component.height + screenY);
      percentageX = dataPercentage ? dataPercentage : (component.posX - component.left + screenX) / (component.width + screenX);
    }

    // Set bases
    // ====================
    const bases = this.updatePosition(percentageX, percentageY, component.speed);
    component.baseX = bases.x;
    component.baseY = bases.y;

    // ~~Store non-translate3d transforms~~
    // Store inline styles and extract transforms
    component.transform = this._getInlineCSS(component.element);
    return component;
  }


  _clamp(num, min, max) {
    return (num <= min) ? min : ((num >= max) ? max : num);
  };


  updatePosition(percentageX, percentageY, speed) {
    const valueX = (speed * (100 * (1 - percentageX)));
    const valueY = (speed * (100 * (1 - percentageY)));

    const positionUpdated = {
      x: this.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100,
      y: this.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100
    };

    return positionUpdated;
  };


  update(component){
    // if (setPosition() && component.running) {
      // this.animate(component);
    // }
    app.scroller.scrollHasChanged(component.running, this.animate.bind(this), component);
    // loop again
    this.loop(this.update);
  }


  reloadUpdateListener() {
    for (let component of this.pool) {
      app.scroller.scrollHasChanged(component.running, this.animate.bind(this), component);
    }
    // loop again
    this.loop(this.update);
  }


  _getInlineCSS(element) {
    const style = element.style.cssText;
    let transform = '';

    // Check if there's an inline styled transform
    if (style.indexOf('transform') >= 0) {
      // Get the index of the transform
      const index = style.indexOf('transform');
      // Trim the style to the transform point and get the following semi-colon index
      const trimmedStyle = style.slice(index);
      const delimiter = trimmedStyle.indexOf(';');

      // Remove "transform" string and save the attribute
      if (delimiter) {
        transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
      } else {
        transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
      }
    }

    return transform;
  }


  addCustomEvents(component) {
    window.addEventListener('resize', () => {
      this.animate(component);
    });
  }


  _getTransformPropertyAcceptedByTheBrowser() {
    return window.transformProp || (function(){
      const testEl = document.createElement('div');
      if (testEl.style.transform == null) {
        const vendors = ['Webkit', 'Moz', 'ms'];
        for (let vendor of vendors) {
          if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
            return vendors[vendor] + 'Transform';
          }
        }
      }
      return 'transform';
    })();
  }


  loop(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback){ setTimeout(callback, 1000 / 60); }
    ;
  }


  animate(component) {
    component.posY = app.scroller.scrollbar.offset.y;
    component.posX = app.scroller.scrollbar.offset.x;
    const percentageY = ((component.posY - component.top  + this.screen.y) / (component.height + this.screen.y));
    const percentageX = ((component.posX - component.left + this.screen.x) / (component.width  + this.screen.x));
    // Subtracting initialize value, so element stays in same spot as HTML
    const positions = this.updatePosition(percentageX, percentageY, component.speed);// - component.baseX;
    const positionY = positions.y - component.baseY;
    const positionX = positions.x - component.baseX;
    const zindex    = component.zindex;

    const translate = `translate3d(${this.options.horizontal ? positionX : 0}px, ${this.options.vertical ? positionY : 0}px, ${zindex}px);`;
    // var translate = `translate3d(${this.options.horizontal ? positionX : 0}px, ${this.options.vertical ? positionY : 0}px, ${zindex}px) ${component.transform}`;

      // Move that element
      // (Set the new translation and append initial inline transforms.)
    // var translate = 'translate3d(' + (this.options.horizontal ? positionX : '0') + 'px,' + (this.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + component.transform;
    // console.log('translate', translate);

    // THIS IS NOT working so we need to set .style =  instead of .style.transform
    // component.element.style[this.transformProp] = translate;
    component.element.style = `${this.transformProp}: ${translate}`;
    // debugger;
    this.options.callback(this.positions);
  }
}

export default Parallax;
