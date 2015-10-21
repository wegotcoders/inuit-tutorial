// SLIDER
var slider = function() {

  // Set time delay of slider
  var delay = 4000;

  // Set variables
  var numImages = $('.carousel__image').length;
  var previousImage = numImages;
  var currentImage = 1;
  var nextImage = 2;

  // Find width of container div
  var sliderWidth = $("#slider").width();

  // Give images same width as slider
  var sizeImages = function() {
    $(".carousel__image").width(sliderWidth);
  };
  sizeImages();

  // Create as many navigation dots as there are pictures
  for (var i = 1; i <= numImages; i++) {
    $('#dots').find('ul').append($('<li class="carousel__dot ' + i + '"></li>'));
  }

  // Set initial position of images
  var resetImages = function() {
    $('.carousel__image').css({"left": sliderWidth+"px"});
    $('.carousel__image').first().css({"left": "0px"});
    $('.1').addClass("carousel__image--active");
  };
  resetImages();

  // Slide to next image
  var slideNextImageLeft = function() {
    $('.carousel__image--' + nextImage).css({"left": sliderWidth+"px"});
    $('.carousel__image--' + currentImage).animate({left: sliderWidth * -1}, 1000);
    $('.carousel__image--' + nextImage).animate({left: "0px"}, 1000);
    currentImage = nextImage;
    increaseImages();
  };

  // Slide to the previous image
  var slidePreviousImageRight = function() {
    $('.carousel__image--' + previousImage).css({"left": (sliderWidth * -1)+"px"});
    $('.carousel__image--' + currentImage).animate({left: sliderWidth}, 1000);
    $('.carousel__image--' + previousImage).animate({left: "0px"}, 1000);
    currentImage = previousImage;
    increaseImages();
  };

  // Shift which images are next and previous
  var increaseImages = function() {
    if(currentImage === numImages) {
      nextImage = 1;
      previousImage = currentImage - 1;
    } else {
      nextImage = currentImage + 1;
      if(currentImage === 1) {
        previousImage = numImages;
      } else {
        previousImage = currentImage - 1;
      }
    }
    // Change dots status
    $('#dots').find('li').removeClass("carousel__image--active");
    $('#dots').find('.' + currentImage).addClass("carousel__image--active");
  };

  // Set initial slider interval
  moveImages = setInterval(function() {
    slideNextImageLeft();
  }, delay);

  // When a navigation dot is clicked
  $('.carousel__dot').click(function(e) {
    buttonPressed = $('.carousel__dot').index(e.target) + 1;
    if(buttonPressed !== currentImage) {
      clearInterval(moveImages);
      moveImages = setInterval(function() {
        slideNextImageLeft();
      }, delay);
      if(currentImage < buttonPressed) {
        nextImage = buttonPressed;
        slideNextImageLeft();
      } else {
        previousImage = buttonPressed;
        slidePreviousImageRight();
      }
    }
  });
};

$(document).ready(function() {
  slider();
});
