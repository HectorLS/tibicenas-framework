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
    const filteredImagesList = this.removeNotDisplayedImages(rawImagesList);

    this.observer = new MutationObserver((mutations, observerInstance) => {
      // var i, mutation;
      // for(i = 0; i < mutations.length; i++) {
      //   mutation = mutations[i];
      //   console.log('inside loop');
      //   this.stopObservation(mutation, observerInstance);
      // }
      this.stopObservation(mutations[0], observerInstance);
    });

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
    if ( image.target.classList.contains('lazyloaded') ) {
      observerInstance.disconnect();
    }
  }
}

export default ImagesBlockObserver;
