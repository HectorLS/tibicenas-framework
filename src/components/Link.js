import BaseComponent from './BaseComponent';


class Link extends BaseComponent {
  constructor(states, componentName, needsWatcher){
    super(states, componentName, needsWatcher);
    this.init();
  }

  init(element) {
    this.stateObject = {
      iframe : this.getIframe(element);
      client : element.getAttribute('data-client'),
      name   : element.getAttribute('data-name')
      // selection_id : ,
      // work_id :
    };

    this.url =  element.getAttribute('href');
  }


  getIframe(element) {
    const embed       = element.getAttribute('data-embed'),
          parser      = new DOMParser(),
          embedParsed = parser.parseFromString(embed, 'text/html');

    return embedParsed.getElementsByTagName('iframe')[0];
  }


  addCustomEvents(element) {
    console.log('CUSTOM EVENTS GO HERE');

    element.addEventListener('click tap', (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.pushState(this.stateObject, '', this.url);
    });

  }
}

export default Link;
