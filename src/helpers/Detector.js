import bowser from 'bowser';

class Detector {
  constructor() {
    this.html = document.querySelector('html');
    this.device;
    this.browser;
    this.os;

    this.init();
  }


  detectBrowser() {
    if      (bowser.chrome)  { this.html.className += ' browser--chrome';  this.browser = 'chrome';  }
    else if (bowser.safari)  { this.html.className += ' browser--safari';  this.browser = 'safari';  }
    else if (bowser.firefox) { this.html.className += ' browser--firefox'; this.browser = 'firefox'; }
    else if (bowser.silk)    { this.html.className += ' browser--silk';    this.browser = 'silk';    }
    else if (bowser.opera)   { this.html.className += ' browser--opera';   this.browser = 'opera';   }
    else if (bowser.msedge)  { this.html.className += ' browser--msEdge';  this.browser = 'msEdge';  }
    else if (bowser.msie) {
      bowser.version < 11 ? this.html.className += ' browser--msi--old' : this.html.className += ' browser--msi';
      this.browser = 'msi';
    }
  }


  detectDevice() {
    if      (bowser.mobile && !bowser.msie) { this.html.className += ' device--mobile'; this.device = 'mobile'; }
    else if (bowser.tablet && !bowser.msie) { this.html.className += ' device--tablet'; this.device = 'tablet'; }
    else { this.html.className += ' device--desktop'; this.device = 'desktop'; }
  }


  detectOS() {
    switch(this.device) {
      case 'mobile' :
      case 'tablet' :
        if      (bowser.ios)          { this.html.className += ' os--ios';           this.os = 'ios'; }
        else if (bowser.android)      { this.html.className += ' os--android';       this.os = 'android'; }
        else if (bowser.blackberry)   { this.html.className += ' os--blackberry';    this.os = 'blackberry'; }
        else if (bowser.windowsphone) { this.html.className += ' os--windows-phone'; this.os = 'windowsPhone'; }
        break;
      default :
      case 'desktop' :
        if      (bowser.mac)     { this.html.className += ' os--mac';     this.os = 'mac'; }
        else if (bowser.windows) { this.html.className += ' os--windows'; this.os = 'windows'; }
        else if (bowser.linux)   { this.html.className += ' os--linux';   this.os = 'linux'; }
        break;
    }
  }


  init() {
    this.detectBrowser();
    this.detectDevice();
    this.detectOS();

    console.log(`*******\nBrowser: ${this.browser}\nDevice: ${this.device}\nOS: ${this.os}\n*******`);

    alert(`*******\nBrowser: ${this.browser}\nDevice: ${this.device}\nOS: ${this.os}\n*******`);
  }
}


export default Detector;
