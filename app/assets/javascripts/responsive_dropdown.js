$(document).ready(function() {
  $('.palm-lower-navbar__burger--show').click(function(e) {
    $('.palm-lower-navbar__dropdown').toggleClass('palm-lower-navbar__dropdown--open');
    e.preventDefault();
  });

  $('.palm-carousel__icon--show').click(function(e) {
    $('.palm-carousel__dropdown').toggleClass('palm-carousel__dropdown--open');
    e.preventDefault();
  });

  $('.main-article__icon--show').click(function(e) {
    $('.main-article__dropdown').toggleClass('main-article__dropdown--open');
    $('.main-article__dropdown').toggleClass('mt-');
    e.preventDefault();
  });

  $('.palm-forms__icon--show').click(function(e) {
    $('.palm-forms__dropdown').toggleClass('palm-forms__dropdown--open');
    e.preventDefault();
  });

  $('.palm-flyout__icon--show').click(function(e) {
    $('.palm-flyout__dropdown').toggleClass('palm-flyout__dropdown--open');
    $('.flyout').toggleClass('p-');
    e.preventDefault();
  });

  $('.palm-buttons__icon--show').click(function(e) {
    $('.palm-buttons__dropdown').toggleClass('palm-buttons__dropdown--open');
    e.preventDefault();
  });

  $('.palm-layout-eg-1__icon--show').click(function(e) {
    $('.palm-layout-eg-1__dropdown').toggleClass('palm-layout-eg-1__dropdown--open');
    $('.palm-layout-eg-1__dropdown').toggleClass('mb-');
    e.preventDefault();
  });

  $('.palm-layout-eg-2__icon--show').click(function(e) {
    $('.palm-layout-eg-2__dropdown').toggleClass('palm-layout-eg-2__dropdown--open');
    $('.palm-layout-eg-2__dropdown').toggleClass('mb-');
    e.preventDefault();
  });

  $('.palm-layout-eg-3__icon--show').click(function(e) {
    $('.palm-layout-eg-3__dropdown').toggleClass('palm-layout-eg-3__dropdown--open');
    $('.palm-layout-eg-3__dropdown').toggleClass('mb-');
    e.preventDefault();
  });
});
