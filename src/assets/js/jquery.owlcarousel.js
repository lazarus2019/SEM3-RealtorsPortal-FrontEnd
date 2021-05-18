$(document).on('ready', function () {
    
    $('.owl-1').owlCarousel({
        loop: true,
        margin: 10,
        loop: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            }
        }
    });

    $('.owl-2').owlCarousel({
        items: 4,
        lazyLoad: true,
        loop: true,
        margin: 10
    });

    $('.owl-3').owlCarousel({
        items: 1,
        merge: true,
        loop: true,
        margin: 10,
        video: true,
        lazyLoad: true,
        center: true,
        responsive: {
            480: {
                items: 2
            },
            600: {
                items: 4
            }
        }
    });

    var owl4 = $('.owl-4');
    owl4.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true
    });

});