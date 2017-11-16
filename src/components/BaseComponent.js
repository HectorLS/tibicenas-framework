import States from './../helpers/StatesMachine';

var states = new States();

class baseComponent {
  constructor(componentName, needsWatcher) {
    this.pool = [];
    this.counter = 0
    this.init(componentName);
  }

  init(componentName) {
    document.arrive(componentName, (e) => {
      this.component = new states.machine();
      this.component.mount();
    });
  }


  getAllComponents() {

  }
  destroyComponent() {}
  destroyAllComponents() {}
}

export default baseComponent;
