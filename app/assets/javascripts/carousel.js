$(document).ready(function() {
  var carousel = {
    interval:             3000,
    previousSlide:        this.numberOfSlides,
    currentSlide:         1,
    nextSlide:            2,
    dotTransitionPoint:   3/10,
    $slideMargin:         parseFloat($('.carousel__slider-container').css('width')) / 3,
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

    updateDotSelectorStatus: function() {
      $('.carousel__dot-selector').removeClass("carousel__dot-selector--active");
      $('.carousel__dot-selector--' + this.nextSlide).addClass("carousel__dot-selector--active");
    },

    bumpSlideIndeces: function() {
      if(this.currentSlide === this.numberOfSlides) {
        this.nextSlide = 1;
        this.previousSlide = this.currentSlide - 1;
      } else {
        this.nextSlide = this.currentSlide + 1;
        if(this.currentSlide === 1) {
          this.previousSlide = this.numberOfSlides;
        } else {
          this.previousSlide = this.currentSlide - 1;
        }
      }
    },

    resetSlider: function() {
      this.$carouselSlideLHS.removeClass('carousel__slide--' + this.currentSlide);
      this.$carouselSlideLHS.addClass('carousel__slide--' + this.nextSlide);
      this.$carouselSlider.css('margin-right','0');
      this.$carouselSlideRHS.removeClass('carousel__slide--' + this.nextSlide);
      this.currentSlide = this.nextSlide;
      this.bumpSlideIndeces();
      this.$carouselSlideRHS.addClass('carousel__slide--' + this.nextSlide);
    },

    watchForDotTransitionPoint: function() {
      var _this = this;

      $('.carousel__slider').attrchange({
          callback: function () {
            var currentMargin = parseFloat($(this).css('margin-right'));
            if (currentMargin > _this.$slideMargin *  _this.dotTransitionPoint) {
              _this.updateDotSelectorStatus();
            }
          }
      });
    },

    slideLeftWithDelay: function() {
      var _this = this;

      this.$carouselSlider.delay(this.interval).animate(
        {marginRight: this.$slideMargin},
        this.interval,

        function() {
          _this.resetSlider();
        }
      );
    },

    slideLeftWithoutDelay: function() {
      var _this = this;

      this.$carouselSlider.animate(
        {marginRight: this.$slideMargin},
        this.interval,

        function() {
          _this.resetSlider();
        }
      );
    },

    play: function() {
      var _this = this;

      var playLoop = setInterval(function() {

        _this.$carouselSlider.delay(_this.interval).animate(
          {marginRight: _this.$slideMargin},
          _this.interval,

          function() {
            _this.resetSlider();
          }
        );
      });
    },

    jumpForwardBefore: function() {
      this.clearInterval(this.defaultLoop());
      this.$carouselSlideRHS.removeClass('carousel__slide--' + this.nextSlide);
      this.nextSlide = this.selectedDot;
      this.$carouselSlideRHS.addClass('carousel__slide--' + this.nextSlide);
      this.slideLeftWithoutDelay();
      this.defaultLoop();
    },

    jumpForwardDuring: function() {
      this.clearInterval(this.defaultLoop());
    },

    jumpBackBefore: function() {
      this.clearInterval(this.defaultLoop());
    },

    jumpBackDuring: function() {
      this.clearInterval(this.defaultLoop());
    },

    handleDotNavigation: function() {
      var _this = this;

      $('.carousel__dot-selector').click(function(e) {
        _this.selectedDot = $('.carousel__dot-selector').index(e.target) + 1;
        if(_this.selectedDot !== _this.currentSlide) {
          clearInterval(_this.defaultLoop());

          if(_this.currentSlide < _this.selectedDot) {
            _this.nextSlide = _this.selectedDot;
          } else {
            _this.previousSlide = _this.selectedDot;
          }
        }
      });
    },
  };

  carousel.numberOfSlides = 4;
  carousel.setInitialParameters();
  carousel.watchForDotTransitionPoint();
  carousel.handleDotNavigation();
  carousel.play();
});
