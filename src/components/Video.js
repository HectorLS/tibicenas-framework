import BaseComponent from './BaseComponent';
import Plyr          from 'plyr';


class Video extends BaseComponent {
  constructor(states, componentName, autoInit, needsWatcher) {
    super(states, componentName, needsWatcher);
    console.log(`--> Constructor ${componentName} initialized`);
    this.options = {};
    this.classElement = `.${componentName}`;
    autoInit ? this.init() : '';
  }

  init() {
    console.log('PLYRRRRR');
    console.log('this.classElement', this.classElement);
    this.video = Plyr.setup(this.classElement, this.options);
  }

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Video;
