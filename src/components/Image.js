import BaseComponent from './BaseComponent';


class Image extends BaseComponent {
  constructor(componentName, needsWatcher){
    super(componentName, needsWatcher);
    this.init();
  }

  init() {}

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Image;
