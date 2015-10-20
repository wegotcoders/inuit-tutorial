$(function() {
  $('.palm-lower-navbar__burger--show').click(function(e) {
    $('.palm-lower-navbar__dropdown').toggleClass('palm-lower-navbar__dropdown--open');
    e.preventDefault();
  });
});
