jQuery(window).scroll(function() {
    if (jQuery(window).width() > 768) {
        var height_header = $('.wrap_main-header').height();
        if (jQuery(window).scrollTop() >= height_header) {
            jQuery('.wrap_main-header').addClass('sticky');
        } else {
            jQuery('.wrap_main-header').removeClass('sticky');
        }
    }
})

$(document).ready(function() {

    $(".menu-sections").hover(
        function() {
            $(this).addClass('is-visible');
            $('body').addClass('scroll-y-hidden');
        },
        function() {
            $(this).removeClass('is-visible');
            $('.itemSubMenu3').removeClass('active');
            $('body').removeClass('scroll-y-hidden');
        }
    );

    $('.bar-tab-menu-left').click(function() {
        $('.menu-sections').addClass('is-visible');
    })

    $('.item-menu-2 a').click(function() {
        $('.itemSubMenu3').removeClass('active');
        $(this).parent().find('.itemSubMenu3').addClass('active');
    })

    if ($(window).width() < 768) {

        if ($(".pview-thumb-slide").length) {
            $('.pview-thumb-slide').addClass('owl-carousel owl-theme');
            $(".pview-thumb-slide.owl-carousel").owlCarousel({
                items: 5,
                nav: true,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                lazyLoad: true,
                touchDrag: true,

            });
        }
    }


    // load category home index


    // load category home index
    if ($(".explode_menu>.itemMenu.active").length) {
        $view = "loadMenuHome662";
        ajaxLoadView({
            view: $view,
            params: "&cateId=" + $(".explode_menu>.itemMenu.active").attr('data-id'),
            onSuccess: function(rs) {
                $(".itemSubMenu2").empty();
                $(".itemSubMenu2").append(rs);
            }
        });
    }

    $(".explode_menu>.itemMenu").click(function() {
        $(".explode_menu>.itemMenu").removeClass('active');
        $(this).addClass('active');
        var categoryID = $(this).attr('data-id');
        $view = "loadMenuHome662";
        ajaxLoadView({
            view: $view,
            params: "&cateId=" + categoryID,
            onSuccess: function(rs) {
                $(".itemSubMenu2").empty();
                $(".itemSubMenu2").append(rs);
            }
        });
    });


    if ($(".product-lists-home.owl-carousel").length) {
        $(".product-lists-home.owl-carousel").owlCarousel({
            items: 4,
            nav: true,
            dots: true,
            margin: 15,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            lazyLoad: true,
            touchDrag: true,
            responsive: {
                0: {
                    items: 2
                },
                767: {
                    items: 2,
                    margin: 15,
                },
                1024: {
                    items: 4
                }
            }
        });
    }

    if ($(window).width() < 768) {
        if ($(".list_category").length) {
            $('.list_category').addClass('owl-carousel owl-theme');
            $('.list_category').removeClass('row');
            $(".list_category.owl-carousel").owlCarousel({
                items: 1,
                nav: true,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                lazyLoad: true,
                touchDrag: true,

            });
        }
    }


})