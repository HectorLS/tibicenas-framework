
class ImagesBlockObserver {
  constructor() {
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


  createObserver(imagesContainer) {
    const rawImagesList      = this.getAllTheImagesInTheContainer(imagesContainer);
    console.log('rawImagesList', rawImagesList);
    const filteredImagesList = this.removeNotDisplayedImages(rawImagesList);
    console.log('filteredImagesList', filteredImagesList);

    this.observer = new MutationObserver((mutations, observerInstance) => {

      console.log('mutations', mutations);
      console.log('observerInstance', observerInstance);

      var i, mutation;
      for(i = 0; i < mutations.length; i++) {
        mutation = mutations[i];
        this.stopObservation(mutation, observerInstance);
      }
    }); //.bind(null, filteredImagesList));

    var i, image;
    for(i = 0; i < filteredImagesList.length; i++) {
      image = filteredImagesList[i];
      this.startObservation(image);
    }
  }


  getAllTheImagesInTheContainer(imagesContainer) {
    return imagesContainer.getElementsByClassName('lazy--img');
  }


  removeNotDisplayedImages(rawImagesList) {
    var filteredImagesList = [];
    var i, image;
    for(i = 0; i < rawImagesList.length; i++) {
      image = rawImagesList[i];
      image.style.display === 'none' ? '' : filteredImagesList.push(image);
    }
    return filteredImagesList;
  }


  startObservation(image, customOptions) {
    console.log('START observation');
    customOptions ? this.options = customOptions : this.options = this.defaultOptions;
    this.observer.observe(image, this.options);
    // lazysizes.loader.unveil(image);
    // SI ESTOY EN EL VIEWPORT
  }


  stopObservation(image, observerInstance) {
    console.log('imgLOADED -> STOP observation');
    if ( image.target.classList.contains('lazyloaded') ) {
      observerInstance.disconnect();
    }
  }
}

export default ImagesBlockObserver;
