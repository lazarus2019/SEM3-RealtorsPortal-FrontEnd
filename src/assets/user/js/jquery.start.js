// const { $ } = require("protractor");

// stats number counter 
$('.counter').countUp();

//  script for blog post slider
$(document).ready(function () {
  $('.owl-blog').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsiveClass: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      480: {
        items: 1,
        nav: true
      },
      700: {
        items: 1,
        nav: true
      },
      1090: {
        items: 1,
        nav: true
      }
    }
  })
})

// script for tesimonials carousel slider
$(document).ready(function () {
  $("#owl-demo1").owlCarousel({
    loop: true,
    nav: false,
    margin: 50,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      736: {
        items: 1,
        nav: false
      }
    }
  })
})

$(document).ready(function () {
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });
});

// disable body scroll which navbar is in active
$(function () {
  $('.navbar-toggler').click(function () {
    $('body').toggleClass('noscroll');
  })
});

// MENU-JS

$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 80) {
    $("#site-header").addClass("nav-fixed");
    $(".text-ahref").addClass("change-color");
    $(".nav-item").removeClass("bg-before-80");
  } else {
    $("#site-header").removeClass("nav-fixed");
    $(".nav-item").addClass("bg-before-80");
    $(".text-ahref").removeClass("change-color");
  }
});


//Main navigation Active Class Add Remove
$(".navbar-toggler").on("click", function () {
  $("header").toggleClass("active");
});

$(".btn-contact").on("click",function(){
  $(".popup-contact-form").removeClass("hide");
})
$(".btn-close-contact").on("click",function(){
  $(".popup-contact-form").addClass("hide");
})

$("#btnContactProperty").on("click",function(){
  $(".popup-contact-form-property").removeClass("hide");
})
$(".btn-close-contact-property").on("click",function(){
  $(".popup-contact-form-property").addClass("hide");
})


$(document).on("ready", function () {
  if ($(window).width() > 991) {
    $("header").removeClass("active");
  }
  $(window).on("resize", function () {
    if ($(window).width() > 991) {
      $("header").removeClass("active");
    }
  });
});

