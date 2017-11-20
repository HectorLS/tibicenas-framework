import BaseComponent from './BaseComponent';
import Plyr          from 'plyr';


class Video extends BaseComponent {
  constructor(states, componentName, autoInit, needsWatcher) {
    super(states, componentName, needsWatcher);
    this.options = {};
    this.classElement = `.${componentName}`;
    autoInit ? this.init() : '';
  }

  init() {
    this.video = Plyr.setup(this.classElement, this.options);
  }

  addCustomEvents() {
  }
}

export default Video;
