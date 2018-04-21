
class WebStorage {
  constructor() {
    !!window.localStorage ? this.hasSupport = true : this.hasSupport = false;
    this.object = [];
    this.init();
  }

  init() {}


  setItem(itemName, value = this.object){
    if(this.hasSupport) {
      // if(typeof value === ('object' || 'number' || 'boolean' || 'undefined' || 'function')) {
      if(typeof value === 'object'    ||
         typeof value === 'number'    ||
         typeof value === 'boolean'   ||
         typeof value === 'undefined' ||
         typeof value === 'function') {
        localStorage.setItem(itemName, JSON.stringify(value));
      } else if(typeof value === 'string') {
        localStorage.setItem(itemName, value);
      }
    }
  }


  getItem(itemName){
    if(this.hasSupport) {
      return JSON.parse(localStorage.getItem(itemName));
    }
  }


  removeItem(itemName){
    if(this.hasSupport) {
      localStorage.removeItem(itemName);
    }
  }


  clearCache() {
    if(this.hasSupport) {
      localStorage.clear();
    }
  }


  itemExist(itemName){
    if(this.hasSupport) {
      if (localStorage.getItem(itemName) !== null) {
        return true;
      }
    }
  }
}

export default WebStorage;
