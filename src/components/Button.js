import BaseComponent from './BaseComponent';

class Button extends BaseComponent {
  constructor(componentName, needsWatcher){
    super(componentName, needsWatcher);
    console.log('2) CHILD component constructor runs');
    this.componentName = componentName;
    this.getAllComponents(); // Just for testing purpose
  }

  createInstance() {
    console.log('Button: createInstance method called');
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("Hola!¿Qué tal?");
    newDiv.appendChild(newContent); //añade texto al div creado.
    newDiv.classList.add('prueba');
    document.body.appendChild(newDiv);
  }
}

export default Button;