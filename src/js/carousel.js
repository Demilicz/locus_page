import  $ from 'jquery';

$(function() {

  $('.carosel').slick({
    draggable: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          draggable: true
        }
      }
    ]
  });
});