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
  };

  // Set up carousel environment and add functionality
  carousel.numberOfSlides = 4;
  carousel.setInitialParameters();

  function updateDotSelectorStatus() {
    $('.carousel__dot-selector').removeClass("carousel__dot-selector--active");
    $('.carousel__dot-selector--' + carousel.nextSlide).addClass("carousel__dot-selector--active");
  }

  function bumpSlideIndecesSooner() {
    carousel.currentSlide = carousel.nextSlide;
    carousel.nextSlide = carousel.currentSlide + 1;
  }

  function bumpSlideIndecesLater() {
    if(carousel.currentSlide === carousel.numberOfSlides) {
      carousel.nextSlide = 1;
    } else {
      carousel.nextSlide = carousel.currentSlide + 1;
    }
  }

  function resetSooner() {
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.currentSlide);
    bumpSlideIndecesSooner();
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.nextSlide);
    bumpingSlideIndecesLaterBool = false;
    jumpedBackBool = false;
  }

  function resetLater() {
    carousel.$carouselSlideLHS.removeClass('carousel__slide--' + carousel.currentSlide);
    carousel.$carouselSlideLHS.addClass('carousel__slide--' + carousel.nextSlide);
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.nextSlide);
    carousel.currentSlide = carousel.nextSlide;
    bumpSlideIndecesLater();
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.nextSlide);
  }

  function resetCommon() {
    carousel.$carouselSlider.css('float','right');
    carousel.$carouselSlider.css('margin-right','0');
    carousel.$carouselSlider.css('margin-left','0');
    bumpingSlideIndecesLaterBool = true;
  }

  var bumpingSlideIndecesLaterBool = true;
  function resetSlider() {
    if (jumpedBackBool) {
      resetSooner();
    }

    if (bumpingSlideIndecesLaterBool) {
      resetLater();
    }
    resetCommon();
  }

  function slideLeftWithoutDelay() {
    carousel.$carouselSlider.animate(
      {marginRight: carousel.$sliderMargin},
      carousel.interval,

      function() {
        resetSlider();
      }
    );
  }

  function slideRightWithoutDelay() {
    carousel.$carouselSlider.animate(
      {marginLeft: carousel.$sliderMargin},
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

  function stopLoop() {
    window.clearTimeout(primaryLoop);
    window.clearTimeout(secondaryLoop);
  }

  function pauseLoop() {
    carousel.$carouselSlider.pause();
    window.clearTimeout(secondaryLoop);
  }

  function jumpForwardBefore() {
    stopLoop();
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.nextSlide);
    carousel.nextSlide = carousel.selectedDot;
    updateDotSelectorStatus();
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.nextSlide);
    slideLeftWithoutDelay();
    window.setTimeout(play, carousel.interval);
  }

  function jumpForwardDuring() {
  }

  var jumpedBackBool;
  function jumpBackBefore() {
    stopLoop();
    carousel.$carouselSlideRHS.removeClass('carousel__slide--' + carousel.nextSlide);
    carousel.$carouselSlideRHS.addClass('carousel__slide--' + carousel.currentSlide);
    carousel.$carouselSlider.css('float', 'left');
    carousel.nextSlide = carousel.selectedDot;
    updateDotSelectorStatus();
    carousel.$carouselSlideLHS.removeClass('carousel__slide--' + carousel.currentSlide);
    carousel.$carouselSlideLHS.addClass('carousel__slide--' + carousel.nextSlide);
    slideRightWithoutDelay();
    jumpedBackBool = true;
    window.setTimeout(play, carousel.interval);
  }

  function jumpBackDuring() {
    pauseLoop();
  }

  (function handleDotNavigation() {
    $('.carousel__dot-selector').click(function(e) {
      carousel.selectedDot = $('.carousel__dot-selector').index(e.target) + 1;
      if(carousel.selectedDot !== carousel.currentSlide) {
        if (parseFloat($('.carousel__slider').css('margin-right')) === 0) {
          if(carousel.currentSlide < carousel.selectedDot) {
            jumpForwardBefore();
          } else {
            jumpBackBefore();
          }
        } else {
          if (carousel.currentSlide < carousel.selectedDot) {
            jumpForwardDuring();
          } else {
            jumpBackDuring();
          }
        }
      }
    });
  })();
});
