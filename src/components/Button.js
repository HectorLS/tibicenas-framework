import BaseComponent from './BaseComponent';


class Button extends BaseComponent {
  constructor(states, componentName, needsWatcher){
    super(states, componentName, needsWatcher);
    console.log(`--> Constructor ${componentName} initialized`);
  }

  createInstance() {
    // console.log('Button: createInstance method called');
    // var newDiv = document.createElement("div");
    // var newContent = document.createTextNode("Hola!¿Qué tal?");
    // newDiv.appendChild(newContent); //añade texto al div creado.
    // newDiv.classList.add('componentName');
    // document.body.appendChild(newDiv);
  }

  addCustomEvents() {
    console.log('CUSTOM EVENTS GO HERE');
  }
}

export default Button;
