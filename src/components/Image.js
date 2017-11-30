import BaseComponent from './BaseComponent';


class Image extends BaseComponent {
  constructor(states, componentName, needsWatcher){
    super(states, componentName, needsWatcher);
    this.init();
  }

  init() {}

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Image;
