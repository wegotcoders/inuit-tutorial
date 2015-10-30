$(document).ready(function() {
  $('.palm-lower-navbar__burger--show').click(function(e) {
    $('.palm-lower-navbar__dropdown').toggleClass('palm-lower-navbar__dropdown--open');
    e.preventDefault();
  });

  $('.palm-carousel__icon--show').click(function(e) {
    $('.palm-carousel__dropdown').toggleClass('palm-carousel__dropdown--open');
    e.preventDefault();
  });

  $('.palm-main-article__icon--show').click(function(e) {
    $('.palm-main-article__dropdown').toggleClass('palm-main-article__dropdown--open');
    $('.palm-main-article__dropdown').toggleClass('mt-');
    e.preventDefault();
  });
});
