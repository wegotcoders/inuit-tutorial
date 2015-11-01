$(document).ready(function () {
  if ($(window).width() < 455) {
    $('#link-home-upper-nav').hide();
    $('#link-sign-up-upper-nav').hide();
    $('#link-sign-in-upper-nav').hide();
    $('.search-form').removeClass('three-tenths');
    $('.search-form').removeClass('ml-');
    $('.search-form').addClass('one-whole');
  }

  if ($(window).width() >= 455) {
    $('#link-home-lower-nav').hide();
    $('#link-sign-up-lower-nav').hide();
    $('#link-sign-in-lower-nav').hide();
  }
});
