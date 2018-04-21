import Barba from 'barba.js';

class Pjax {
  constructor() {
    Barba.Pjax.Dom.wrapperId      = 'pjax-wrapper';
    Barba.Pjax.Dom.containerClass = 'pjax-content';
    this.counter = 0;
    const self = this;
    this.options = {
      start: function() {
        Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
      },
      fadeOut: function() {
        this.counter++
        const deferred = Barba.Utils.deferred();  // Promise to tell Barba that must to wait until we finish here

        // Close navbar
        app.navbar.closeNavbar();

        setTimeout(() => {
          this.oldContainer.classList.remove('visible');
          this.oldContainer.classList.add('hidden');
        }, 250);


        setTimeout(() => {
          deferred.resolve();
        }, 550);  // This have to match the opacity transition timing in the _common.scss file + the before timeout

        return deferred.promise;
      },
      fadeIn: function() {
        self.updateDataUrl(this.newContainer);
        this.newContainer.classList.add('fade-in');
        this.done();

        window.app.scroller.restart();
        window.app.scroller.scrollToTop();
        self.updateGoogleAnalytics();
      }
    };
    this.init();
  }


  init() {
    Barba.Pjax.start();
    this.addCustomEvents();
  }


  addCustomEvents(){
    let lastElementClicked;
    const self = this;

    Barba.Dispatcher.on('linkClicked', function(element) {
      var body = document.getElementsByTagName('body')[0];
      var bgcolor = element.getAttribute('data-bgcolor');
      !!bgcolor ? body.style.backgroundColor = bgcolor : '';

      lastElementClicked = element;
    });

    Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
      self.parseWeb(newPageRawHTML);
    });

    // Barba still hasn't a listener for onPopState
    window.onpopstate = () => {}

    this.addCustomTransition();
  }


  addCustomTransition() {
    this.customTransition = Barba.BaseTransition.extend(this.options);
    Barba.Pjax.getTransition = () => {
      return this.customTransition;
    }
  }


  parseWeb(rawPage) {
    const parser = new DOMParser();
    this.page = parser.parseFromString(rawPage, 'text/html');
  }


  updateMetaTags() {
    const metaDescription = document.querySelector('meta[name=description]');
    const metaOgTitle     = document.querySelector('meta[property="og:title"]');
    const metaOgUrl       = document.querySelector('meta[property="og:url"]');

    const newMetaDescription = this.page.querySelector('meta[name=description]').getAttribute('content');
    const newMetaOgTitle     = this.page.querySelector('meta[property="og:title"]').getAttribute('content');
    const newMetaOgUrl       = this.page.querySelector('meta[property="og:url"]').getAttribute('content');

    metaDescription.setAttribute('content', newMetaDescription);
    metaOgTitle.setAttribute('content', newMetaOgTitle);
    metaOgUrl.setAttribute('content', newMetaOgUrl);
  }


  updateDataUrl(container = document) {
    // const pathname = window.location.pathname.split('/');
    // pathname.shift();
    // const newDataUrl = pathname.join('/');
    const newDataUrl = container.getAttribute('data-url', newDataUrl);
    document.body.setAttribute('data-url', newDataUrl);
  }


  updateGoogleAnalytics() {
    const title = document.getElementsByTagName('title')[0].textContent;
    if(!!window.gtag) {
      window.gtag('config', window.googleAnalyticsId, {'page_path': window.location.pathname, 'title': title});
    }
  }
}

export default Pjax;
