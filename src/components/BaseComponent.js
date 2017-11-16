import States from './../helpers/StatesMachine';

// var states = new States;

class baseComponent {
  constructor(name, needsWatcher) {
    this.body    = document.getElementsByTagName('body')[0];
    this.name    = name;
    this.pool    = [];
    this.counter = 0
    this.init();
  }

  init() {
    this.stateMachine = new States;
    // this.component.mount();
    this.getAllComponents()
    console.log('Revisar que en arrive el THIS sea el correcto')
    document.arrive(this.name, (e) => {
      console.log('Arrive detected a new component created, ADD LOGIC here !!!!!')
    });
  }


  getAllComponents(parent = this.body) {
    var list = parent.getElementsByClassName(this.name);
    var i, element;
    for(i = 0; i < list.length; i++) {
      element = list[i];
      this.updateComponent(element);
    }
  }

  updateComponent(element) {
    // var isInThePool = false;
    if (!element.hasAttribute('id') ||
         element.getAttribute('id') === null ||
         element.getAttribute('id') === '') {
      // Doesn't have any ID
      this.updateId(false, element)
        .then((component) => {
          this.updatePool(component);
          component.mount();
        }
      );
    } else {
      if(element.getAttribute('id').indexOf(this.name) <= 0) {
        // Has some ID's but no a element ID
        this.updateId(true, element)
          .then((component) => {
            this.updatePool(component);
          }
        );
      } else {
        // Already has a component ID

        // Check, is this ID in the Instance POOL ?
        // If not, should be added ( or removed ) ?
      }
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

  updatePool(component) {
    this.pool.push(componentObject);
  }


  destroyComponent() {}
  destroyAllComponents() {}
}

export default baseComponent;
