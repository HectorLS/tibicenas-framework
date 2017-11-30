import States from './../helpers/StatesMachine';


class baseComponent {
  constructor(states, name, needsWatcher) {
    this.body    = document.getElementsByTagName('body')[0];
    this.counter = 0
    this.name    = name;
    this.pool    = [];
    this.states  = states;

    this.initialize();
  }


  initialize() {
    this.getAllElements();
    document.arrive(`.${this.name}`, (element) => {
      console.log('Arrive detected a new element which one match a component class:\n', element);
      this.createComponent(element);
    });
  }


  getAllElements(parent = this.body) {
    const list = parent.getElementsByClassName(this.name);
    var i, element;
    for(i = 0; i < list.length; i++) {
      element = list[i];
      this.createComponent(element);
    }
  }


  createComponent(element) {
    var hasSomeId;

    // See if the element is stored as a component by checking the ID
    if (!element.hasAttribute('id') ||
         element.getAttribute('id') === null ||
         element.getAttribute('id') === '') {
      // Doesn't have any ID
      hasSomeId = false;
    } else {
      if(element.getAttribute('id').indexOf(this.name) < 0) {
        // Has some ID's but no an element ID
        hasSomeId = true;
      } else {
        // Already has a component ID
        // Check, is this ID in the Instance POOL ?
        // If not, should be added ( or removed ) ?
      }
    }

    // If isn't tracked, update it, and store it into the Pool
    if(hasSomeId !== undefined) {
      this.updateId(hasSomeId, element)
        .then((component) => {
          this.addStatesMachine(component)
            .then((component) => {
              this.updatePool(component);
            }
          );
        }
      );
    }
  }


  async updateId(hasSomeId, element){
    this.counter++;
    var elementId = `${this.name}_${this.counter}`,
        fullId;

    if(hasSomeId) {
      var currentId = element.getAttribute('id');
      fullId = `${currentId} ${elementId}`;
    } else {
      fullId = elementId;
    }

    element.setAttribute('id', fullId);
    var component = {
      element : element,
      id      : elementId
    }

    return component;
  }


  async addStatesMachine(component) {
    component.fsm = new this.states.machine();
    await component.fsm.mount();
    this.updateState(component);

    await this.init(component);

    await component.fsm.render();
    this.updateState(component);

    return component;
  }


  updateState(component, state) {
    // FUTURE REFACTOR
    // switch(FutureState) {
    //   case: 'mount':
    //     await component.fsm.mount();
    //     break;
    //   case: 'render':
    //     await component.fsm.render();
    //     break;
    //   case: 'update':
    //     await component.fsm.update();
    //     break;
    //   case: 'unmount':
    //     await component.fsm.unmount();
    //     break;
    // }
    component.element.setAttribute('data-state', component.fsm.state);
  }


  updatePool(component) {
    this.pool.push(component);
  }


  destroyComponent() {}
  destroyAllComponents() {}
}

export default baseComponent;
