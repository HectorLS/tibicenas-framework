import { findIndex } from 'lodash';

class baseComponent {
  constructor(name, needsWatcher, states = app.states) {
    this.body    = document.body;
    this.counter = 0
    this.name    = name;
    this.pool    = [];
    this.states  = states;

    this.initialize();
  }


  initialize() {
    this.getAllElements();
    document.arrive(`.${this.name}`, (element) => {
      // console.log('Arrive detected a new element which one match a component class:\n', element);
      this.createComponent(element);
    });
  }


  getAllElements(parent = this.body) {
    const list = parent.getElementsByClassName(this.name);

    if (list.length > 0) {
      let i, element;
      for(i = 0; i < list.length; i++) {
        element = list[i];
        this.createComponent(element);
      }
    }
  }


  createComponent(element) {
    let hasSomeId;

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
        // TODO Already has a component ID
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
    const elementId = `${this.name}_${this.counter}`;
    let fullId;

    if(hasSomeId) {
      const currentId = element.getAttribute('id');
      fullId = `${currentId} ${elementId}`;
    } else {
      fullId = elementId;
    }

    element.setAttribute('id', fullId);
    const component = {
      element : element,
      id      : elementId
    };

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


  getComponentById(elementId) {
    const index = _.findIndex(this.pool, { id: elementId });
    return this.pool[index];
  }


  destroyComponent(componentId, childComponentsClassName) {
    if (!!componentId) {
      const componentIndex = _.findIndex(this.pool, ['id', componentId]);

      if (componentIndex !== undefined) {

        var component;
        if (this.pool.length > 0) {
          component = this.pool[componentIndex];

          if (!!childComponentsClassName) {
            this.findChildComponents(component, childComponentsClassName, true);
          }

          if(!!component.element.parentNode) {
            component.element.parentNode.removeChild(component.element);
          }
          this.pool.splice(componentIndex, 1);
        }
      }
    }
  }


  destroyAllComponents(childComponentsClassName) {
    if (this.pool.length > 0) {
      for(let component of this.pool) {

        if (!!childComponentsClassName) {
          this.findChildComponents(component, childComponentsClassName, true);
        }

        if(!!component.element.parentNode) {
          component.element.parentNode.removeChild(component.element);
        }
      }
    }
    this.pool = [];
  }


  findChildComponents(component, childComponentsClassName, destroy) {
    const appComponentName = this.getAppComponentName(childComponentsClassName);
    const childIdList = [];

    if (!!childComponentsClassName) {
      component.childComponents = component.element.getElementsByClassName(childComponentsClassName);

      if(destroy && component.childComponents.length > 0) {

        for(let child of component.childComponents) {
          const childId = child.getAttribute('id');
          childIdList.push(childId);
        }

        for(let id of childIdList) {
          if (!!app.components[appComponentName]) {
            app.components[appComponentName].destroyComponent(id);
          }
        }
      }
    }
  }


  getAppComponentName(childComponentsClassName){
    const appComponentName = [];
    const tempArray = childComponentsClassName.split('-');
    tempArray.shift();

    function toCapitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(tempArray.length > 0) {
      for(let [index, string] of tempArray.entries()) {
        if (index == 0) {
          appComponentName.push(string);
        } else if (index > 0) {
          appComponentName.push(toCapitalize(string));
        }
      }
    }
    return appComponentName.join('');
  }
}

export default baseComponent;
