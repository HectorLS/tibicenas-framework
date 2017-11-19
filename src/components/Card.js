import BaseComponent from './BaseComponent';


class Card extends BaseComponent {
  constructor(states, componentName, needsWatcher){
    super(states, componentName, needsWatcher);
    console.log(`--> Constructor ${componentName} initialized`);
    this.init();
  }

  init() {
    console.log('X-CARD INIT FUNCTION');
  }

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Card;
