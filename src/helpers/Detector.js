import bowser from 'bowser';

class Detector {
  constructor() {
    this.html = document.getElementsByTagName('html')[0];
    this.device;
    this.browser;
    this.os;

    this.init();
  }


  detectBrowser() {
    if      (bowser.chrome)  { this.html.setAttribute('data-browser', 'chrome');  this.browser = 'chrome';  }
    else if (bowser.safari)  { this.html.setAttribute('data-browser', 'safari');  this.browser = 'safari';  }
    else if (bowser.firefox) { this.html.setAttribute('data-browser', 'firefox'); this.browser = 'firefox'; }
    else if (bowser.silk)    { this.html.setAttribute('data-browser', 'silk');    this.browser = 'silk';    }
    else if (bowser.opera)   { this.html.setAttribute('data-browser', 'opera');   this.browser = 'opera';   }
    else if (bowser.msedge)  { this.html.setAttribute('data-browser', 'msEdge');  this.browser = 'msEdge';  }
    else if (bowser.msie) {
      bowser.version < 11 ? this.html.setAttribute('data-browser', 'msi--old') : this.html.setAttribute('browser', 'msi');
      this.browser = 'msi';
    }
  }


  detectDevice() {
    if      (bowser.mobile && !bowser.msie) { this.html.setAttribute('data-device', 'mobile'); this.device = 'mobile'; }
    else if (bowser.tablet && !bowser.msie) { this.html.setAttribute('data-device', 'tablet'); this.device = 'tablet'; }
    else { this.html.setAttribute('data-device', 'desktop'); this.device = 'desktop'; }
  }


  detectOS() {
    switch(this.device) {
      case 'mobile' :
      case 'tablet' :
        if      (bowser.ios)          { this.html.setAttribute('data-os', 'ios');           this.os = 'ios'; }
        else if (bowser.android)      { this.html.setAttribute('data-os', 'android');       this.os = 'android'; }
        else if (bowser.blackberry)   { this.html.setAttribute('data-os', 'blackberry');    this.os = 'blackberry'; }
        else if (bowser.windowsphone) { this.html.setAttribute('data-os', 'windowsphone');  this.os = 'windowsPhone'; }
        break;
      default :
      case 'desktop' :
        if      (bowser.mac)     { this.html.setAttribute('data-os', 'mac');     this.os = 'mac'; }
        else if (bowser.windows) { this.html.setAttribute('data-os', 'windows'); this.os = 'windows'; }
        else if (bowser.linux)   { this.html.setAttribute('data-os', 'linux');   this.os = 'linux'; }
        break;
    }
  }


  init() {
    this.detectBrowser();
    this.detectDevice();
    this.detectOS();
    console.log(`*******\nBrowser: ${this.browser}\nDevice: ${this.device}\nOS: ${this.os}\n*******`);
    // alert(`*******\nBrowser: ${this.browser}\nDevice: ${this.device}\nOS: ${this.os}\n*******`);
  }
}


export default Detector;
