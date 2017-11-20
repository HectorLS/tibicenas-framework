import BaseComponent from './BaseComponent';


class Images extends BaseComponent {
  constructor(states, componentName, needsWatcher){
    super(states, componentName, needsWatcher);
    this.init();
  }

  init() {}

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Images;
