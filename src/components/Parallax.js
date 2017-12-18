// import Rellax from 'rellax';

class Parallax {
  constructor(states, componentName, singleton, customOptions) {
    super(states, componentName, needsWatcher);
    this.classElement = `.${componentName}`;
    this.options = {
      speed      : -2,
      center     : false,
      round      : true,
      vertical   : true,
      horizontal : false,
      callback   : function() {}
    };
    // 0)
    //   TRANSFORM CSS property depend of the browser ( add prefix ), use bowser
    // 1)
    if(customOptions) this.updateOptions(customOptions);
    // 2) Get Viewport height & width ( scrollbar has this info )
    //
  }


  init(component) {
    this.addCustomEvents();
  }

  addCustomEvents() {
    // if(app.scroller.customScroll)
  }

  updateOptions(){
    Object.keys(customOptions).forEach((key) => {
      this.options[key] = customOptions[key];
    });

    this.options.speed = this.clamp(this.options.speed, -10, 10);
  }


  animate() {
    console.log('ANIMATE RUNNING');
    // Transform3d on parallax element
    var percentageY = ((viewport.scrollY - element.top + viewport.height) / (element.height + viewport.height));
    var percentageX = ((viewport.scrollX - element.left + viewport.width) / (element.width + viewport.width));

    // Subtracting initialize value, so element stays in same spot as HTML
    var positions = updatePosition(percentageX, percentageY, element.speed);// - blocks[i].baseX;
    var positionY = positions.y - blocks[i].baseY;
    var positionX = positions.x - blocks[i].baseX;

    var zindex = blocks[i].zindex;

    // Move that element
    // (Set the new translation and append initial inline transforms.)
    var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
    self.elems[i].style[transformProp] = translate;

    self.options.callback(positions);
  }

  clamp(num, min, max) {
    return (num <= min) ? min : ((num >= max) ? max : num);
  }
}


export default Parallax;
