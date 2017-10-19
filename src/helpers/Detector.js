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
    if      (bowser.chrome)  { this.html.setAttribute('browser', 'chrome');  this.browser = 'chrome';  }
    else if (bowser.safari)  { this.html.setAttribute('browser', 'safari');  this.browser = 'safari';  }
    else if (bowser.firefox) { this.html.setAttribute('browser', 'firefox'); this.browser = 'firefox'; }
    else if (bowser.silk)    { this.html.setAttribute('browser', 'silk');    this.browser = 'silk';    }
    else if (bowser.opera)   { this.html.setAttribute('browser', 'opera');   this.browser = 'opera';   }
    else if (bowser.msedge)  { this.html.setAttribute('browser', 'msEdge');  this.browser = 'msEdge';  }
    else if (bowser.msie) {
      bowser.version < 11 ? this.html.setAttribute('browser', 'msi--old') : this.html.setAttribute('browser', 'msi');
      this.browser = 'msi';
    }
  }


  detectDevice() {
    if      (bowser.mobile && !bowser.msie) { this.html.setAttribute('device', 'mobile'); this.device = 'mobile'; }
    else if (bowser.tablet && !bowser.msie) { this.html.setAttribute('device', 'tablet'); this.device = 'tablet'; }
    else { this.html.setAttribute('device', 'desktop'); this.device = 'desktop'; }
  }


  detectOS() {
    switch(this.device) {
      case 'mobile' :
      case 'tablet' :
        if      (bowser.ios)          { this.html.setAttribute('os', 'ios');           this.os = 'ios'; }
        else if (bowser.android)      { this.html.setAttribute('os', 'android');       this.os = 'android'; }
        else if (bowser.blackberry)   { this.html.setAttribute('os', 'blackberry');    this.os = 'blackberry'; }
        else if (bowser.windowsphone) { this.html.setAttribute('os', 'windowsphone');  this.os = 'windowsPhone'; }
        break;
      default :
      case 'desktop' :
        if      (bowser.mac)     { this.html.setAttribute('os', 'mac');     this.os = 'mac'; }
        else if (bowser.windows) { this.html.setAttribute('os', 'windows'); this.os = 'windows'; }
        else if (bowser.linux)   { this.html.setAttribute('os', 'linux');   this.os = 'linux'; }
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
