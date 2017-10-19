
class ImagesBlockObserver {
  constructor() {
    // this.observersList  = [];
    this.defaultOptions = {
      attributes      : true,
      attributeFilter : ['class'],
      characterData   : false,
      childList       : false,
      subtree         : true,
      attributeOldValue     : false,
      characterDataOldValue : false
    }
  }


// Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);

  createObserver(imagesContainer) {
    const rawImagesList      = this.getAllTheImagesInTheContainer(imagesContainer);
    const filteredImagesList = this.removeNotDisplayedImages(rawImagesList);

    this.observer = new MutationObserver((filteredImagesList, mutations, observerInstance) => {
      console.log('filteredImagesList', filteredImagesList);
      console.log('mutations', mutations);
      console.log('observerInstance', observerInstance);

      filteredImagesList.forEach(function(image, index) {
        // SI LA IMAGEN TIENE LA CLASE "LAZYLOADED"  -> DISCONNECT
        // OBSERVAR EL RESTO DE IMÁGENES
      });
    }); //.bind(null, filteredImagesList));
  }


  getAllTheImagesInTheContainer(imagesContainer) {
    return imagesContainer.getElementByClassName('lazyload');
  }


  removeNotDisplayedImages(rawImagesList) {
    var filteredImagesList = [];

    rawImagesList.forEach((image, index) => {
      image.style.display === 'none' ?  '' : filteredImagesList.push(image);
    });
    return filteredImagesList;
  }


  startObservation(image, customOptions, observerInstance) {
    customOptions ? this.options = customOptions : this.options = this.defaultOptions;
    observerInstance.observe(image, this.options);
    // lazysizes.loader.unveil(image);
  }


  stopObservation(image, observerInstance) {
    if ( image.classList.contains('lazyloaded') ) {
      observerInstance.disconnect();
    }
  }
}

export default ImagesBlockObserver;
