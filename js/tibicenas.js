$(document).ready(function() {

  $(document).on('click', '#js-btn--burguer', lightboxEffect);

  $(".js-over-lightbox").on('click', 'a, button, input[type=submit]', function(e){
    //add here animation to clicked element
    //use e.offsetX y e.offsetY to center the animation in the point clicked
    console.log(e);
  });

  /* -----------------------------
  /*                    LIGHTBOX
  /* -----------------------------
  /*
  /* The lightbox is used to put a shadow that puts in background some content. This feature has
  /* the option to add a class to the parent element to put over the lightbox and stay in foreground.
  /* Example to Toggle Lightbox Effect: <button onclick="toggleShadow()">Click me </button>
  /* Example element over lightbox: <nav class="js-over-lightbox">...</nav>
  /*
  /* ----------------------------- */

  // MAIN FUNCTION TO TOOGLE THE MENU AND THE LIGHTBOX
	function lightboxEffect(){
		$(this).toggleClass("js-active");
		var transitionTime = 700;
		lock(true);
		toggleShadow(transitionTime);
		toggleMenu(transitionTime);
		toggleBlockScroll();
	}

	function toggleMenu(transitionTime){
		$("#js-toggle-menu").css('transition', transitionTime+'ms')
												.toggleClass("js-toogle-menu");
	};

	function toggleBlockScroll(){
		$("body").toggleClass("js-block-scroll");
	}
	
	//this function is used to prevent rare comportaments when the lightbox is clicked very fast
	function lock(status){
		var lock = function(){ $(document).off('click', '#js-btn--burguer') }
		var unlock = function(){ $(document).on('click', '#js-btn--burguer', lightboxEffect) }
		
		status ? lock() : unlock();
	}

	function toggleShadow(transitionTime){
		$("#js-lightbox").length ? removeLightbox(transitionTime) : createLightbox(transitionTime);
	}

	function createLightbox(transitionTime){
		$(".js-over-lightbox").toggleClass("js-over-lightbox--active");
		$("body").append('<div id="js-lightbox" class="lightbox"></div>');
		$("#js-lightbox").fadeTo(transitionTime, .4).toggleClass("js-lightbox--active");
		lock(false);
	}

	function removeLightbox(transitionTime){
		setTimeout(function(){ 
			$(".js-over-lightbox").removeClass("js-over-lightbox--active");
			$("#js-lightbox").remove();
			lock(false);
		}, transitionTime);
		$("#js-lightbox").fadeTo(transitionTime,0);
	}


  //SUBMENU 
  $(document).on('click', '#js-dropdown__wrap', function(e) {
    e.preventDefault();
    var ul = $(this).children("ul");

    $(this).hasClass("js-submenu--toggle") ? ul.slideUp("fast") : ul.slideDown("fast");
    $(this).toggleClass("js-submenu--toggle");
  });
  
  $(document).on('hover', '#js-submenu--toggle li', function(){
    $(this).prevAll().css( {"background-color" : "rgb(0,47,67)"} );
  });



});
