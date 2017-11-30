import BaseComponent from './BaseComponent';
import Plyr          from 'plyr';             // https://github.com/sampotts/plyr


class Video extends BaseComponent {
  constructor(states, componentName, autoInit, needsWatcher) {
    super(states, componentName, needsWatcher);
    this.options = {
      controls: [],
      autoplay: true,
      fullscreen: {
        enabled: false
      }
    };
    this.classElement = `.${componentName}`;
    autoInit ? this.autoInit() : '';
  }

  init() {
    // REFACTOR this to run once
  }

  autoInit() {
    this.video = Plyr.setup(this.classElement, this.options);
  }

  addCustomEvents() {
  }
}

export default Video;
