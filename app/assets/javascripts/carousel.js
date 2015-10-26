$(document).ready(function() {

  // Declare carousel attributes and fix initial state
  var carousel = {
    interval:             3000,
    previousSlide:        this.numberOfSlides,
    currentSlide:         1,
    nextSlide:            2,
    dotTransitionPoint:   3/10,
    $sliderMargin:        parseFloat($('.carousel__slider-container').css('width')) / 3,
    $carouselSlider:      $('.carousel__slider'),
    $carouselSlideLHS:    $('.carousel__slide--lhs'),
    $carouselSlideRHS:    $('.carousel__slide--rhs'),

    setSliderStartPosition: function() {
      this.$carouselSlider.css('float', 'right');
      this.$carouselSlideLHS.addClass('carousel__slide--1');
      this.$carouselSlideRHS.addClass('carousel__slide--2');
    },

    buildDotSelectors: function() {
      for (var i = 1; i <= this.numberOfSlides; i++) {
        $('.carousel__dot-selector-container').append($('<li class="carousel__dot-selector carousel__dot-selector--'+ i +'"></li>'));
      }
    },

    highlightInitialDotSelector: function() {
      $('.carousel__dot-selector--1').addClass('carousel__dot-selector--active');
    },

    setInitialParameters: function() {
      this.setSliderStartPosition();
      this.buildDotSelectors();
      this.highlightInitialDotSelector();
    },

//     play: function() {
//       var _this = this;

//       var playLoop = setInterval(function() {

//         _this.$carouselSlider.delay(_this.interval).animate(
//           {marginRight: _this.$sliderMargin},
//           _this.interval,

//           function() {
//             _this.resetSlider();
//           }
//         );
//       });
//     },

//     jumpForwardDuring: function() {
//       this.clearInterval(this.defaultLoop());
//     },

//     jumpBackBefore: function() {
//       this.clearInterval(this.defaultLoop());
//     },

//     jumpBackDuring: function() {
//       this.clearInterval(this.defaultLoop());
//     },

//   };

//   carousel.watchForDotTransitionPoint();
//   carousel.handleDotNavigation();
//   carousel.play();
  };

  // Set up carousel environment and add functionality
  carousel.numberOfSlides = 4;
  carousel.setInitialParameters();

  function updateDotSelectorStatus() {
    $('.carousel__dot-selector').removeClass("carousel__dot-selector--active");
    $('.carousel__dot-selector--' + carousel.nextSlide).addClass("carousel__dot-selector--active");
  }

  function bumpSlideIndeces() {
    if(carousel.currentSlide === carousel.numberOfSlides) {
      carousel.nextSlide = 1;
      carousel.previousSlide = carousel.currentSlide - 1;
    } else {
      carousel.nextSlide = carousel.currentSlide + 1;
      if(carousel.currentSlide === 1) {
        carousel.previousSlide = carousel.numberOfSlides;
      } else {
        carousel.previousSlide = carousel.currentSlide - 1;
      }
    }
  }

  function resetSlider() {
    carousel.$carouselSlideLHS.removeClass('carousel__slide--' + carousel.currentSlide);
    carousel.$carouselSlideLHS.addClass('carousel__slide--' + carousel.nextSlide);
    carousel.$carouselSlider.css('margin-right','0');
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.nextSlide);
    carousel.currentSlide = carousel.nextSlide;
    bumpSlideIndeces();
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.nextSlide);
    // console.log('just reset slider. Primary loop id is ' + primaryLoop + ' secondary loop id is ' + secondaryLoop + '');
  }

  function slideLeftWithoutDelay() {
    // console.log('slide starting now. Primary loop id is ' + primaryLoop + ' secondary loop id is ' + secondaryLoop + '');
    carousel.$carouselSlider.animate(
      {marginRight: carousel.$sliderMargin},
      carousel.interval,

      function() {
        resetSlider();
      }
    );
  }

  // Start running the carousel
  (function() {
    carousel.$carouselSlider.attrchange({
        callback: function () {
          var currentMargin = parseFloat($(this).css('margin-right'));
          if (currentMargin > carousel.$sliderMargin * carousel.dotTransitionPoint) {
            updateDotSelectorStatus();
          }
        }
    });
  })();

  var primaryLoop;
  var secondaryLoop;
  function play() {
    primaryLoop = window.setTimeout(slideLeftWithoutDelay, carousel.interval);
    secondaryLoop = window.setTimeout(play, carousel.interval * 2);
  }
  play();

  function pauseLoop() {
    window.clearTimeout(primaryLoop);
    window.clearTimeout(secondaryLoop);
  }

  function jumpForwardBefore() {
    pauseLoop();
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.nextSlide);
    carousel.nextSlide = carousel.selectedDot;
    updateDotSelectorStatus();
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.nextSlide);
    slideLeftWithoutDelay();
    setTimeout(play, carousel.interval);
  }

  (function handleDotNavigation() {
    $('.carousel__dot-selector').click(function(e) {
      // console.log('you just clicked me. Primary loop id is ' + primaryLoop + ' secondary loop id is ' + secondaryLoop + '');
      carousel.selectedDot = $('.carousel__dot-selector').index(e.target) + 1;
      if(carousel.selectedDot !== carousel.currentSlide) {
        if (parseFloat($('.carousel__slider').css('margin-right')) === 0) {
          jumpForwardBefore();
        }

        // if(carousel.currentSlide < carousel.selectedDot) {
        //   carousel.nextSlide = carousel.selectedDot;
        // } else {
        //   carousel.previousSlide = carousel.selectedDot;
        // }
      }
    });
  })();
});

