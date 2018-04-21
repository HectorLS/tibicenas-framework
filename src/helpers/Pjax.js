import Barba from 'barba.js';

class Pjax {
  constructor() {
    Barba.Pjax.Dom.wrapperId      = 'pjax-wrapper';
    Barba.Pjax.Dom.containerClass = 'pjax-content';

    const self = this;

    this.oldContainerDimensions = {
      width: 0,
      height: 0
    };

    this.options = {
      start: function() {
        // Store oldContainerDimensions for the new elements those are based on position logic
        self.oldContainerDimensions = app.scroller.getElementPosition(this.oldContainer);


        Promise.all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },
      fadeOut: function() {
        const deferred = Barba.Utils.deferred();  // Promise to tell Barba that must to wait until we finish here

        // Close navbar
        app.navbar.closeNavbar();
        // This avoid the scrollbar to appears while both pages are in the DOM
        document.body.setAttribute('data-page-loading', true);
        // Smooth fade of the current content
        setTimeout(() => {
          this.oldContainer.classList.remove('visible');
          app.scroller.scrollToTop();
          this.oldContainer.classList.add('hidden');
        }, 250);
        //        Get page needed data        \\
        // ___________________________________//
        setCurrentPage();
        self.preShowNewPageActions();

        setTimeout(() => {
          deferred.resolve();
        }, 550);  // This have to match the opacity transition timing in the _common.scss file + the before timeout
        return deferred.promise;
      },
      fadeIn: function() {

        self.postShowNewPageActions(this.newContainer);

        //        Finish Transition           \\
        // ___________________________________//
        document.body.setAttribute('data-page-loading', false);

        this.newContainer.classList.add('fade-in'); // Show new Content
        self.updateDataUrl(this.newContainer);
        self.updateGoogleAnalytics();
        this.done();                                // Finish Page transition
        app.scroller.restart(this.newContainer);    // Reset Scroller
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


  preShowNewPageActions() {

  }

  postShowNewPageActions() {

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
    if(!!window.gtag && !!window.googleAnalyticsId) {
      const title = document.getElementsByTagName('title')[0].textContent;
      window.gtag('config', window.googleAnalyticsId, {'page_path': window.location.pathname, 'title': title});
    }
  }
}

export default Pjax;
