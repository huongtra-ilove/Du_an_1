var storeId = document.getElementById('storeId').value;
var inputQuantity = jQuery('input[name="quantity"]');
var plusQuantity = function() {
    if (inputQuantity.val() != undefined) {
        var currentVal = parseInt(inputQuantity.val());
        if (!isNaN(currentVal)) {
            inputQuantity.val(currentVal + 1);
        } else {
            inputQuantity.val(1);
        }
    } else {
        console.log('error: Not see elemnt ' + inputQuantity.val());
    }
};
var minusQuantity = function() {
    if (inputQuantity.val() != undefined) {
        var currentVal = parseInt(inputQuantity.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            inputQuantity.val(currentVal - 1);
        }
    } else {
        console.log('error: Not see elemnt ' + inputQuantity.val());
    }
};

function getCartModal() {
    var cart = null,
        siteNavMobile = $('#site-nav--mobile');
    jQuery('#cartform').hide();
    $('#site-overlay').addClass("active");
    $('.main-body').addClass("sidebar-move");
    siteNavMobile.addClass("active");
    siteNavMobile.removeClass("show-filters").removeClass("show-search").addClass("show-cart");
}


jQuery(document).ready(function() {

    let cookieName = 'COMPARE_STORE_PRODUCT',
        maxProductCount = 3;
    $('.compare').click(function() {
        let t = $(this);
        if (t.hasClass('active')) {
            $.post(
                'product/addcompare', {
                    'productId': t.attr('data-id'),
                    'type': 11
                },
                function(rs) {
                    if (rs.code == 1) {
                        t.removeClass('active');
                    }
                }
            )
        } else {
            // Lấy danh sách ID sản phẩm từ cookies
            let productIds = getCookie(cookieName) ? JSON.parse(getCookie(cookieName)) : {};
            if (Object.keys(productIds).length >= maxProductCount) {
                alert('Đã đạt tối đa ' + maxProductCount + ' sản phẩm.');
                return;
            } else {
                $.post(
                    '/product/addcompare', {
                        'productId': t.attr('data-id'),
                        'type': 10
                    },
                    function(rs) {
                        var mes = $('#dialogMessage');
                        if (rs.code == 1) {
                            t.addClass('active');
                        } else {
                            mes.html('<p><span class="ui-icon ui-icon-notice" style="float: left; margin: 0 10px 40px 0;"></span>' +
                                rs.messages + '</p>');
                        }
                    },
                    'json'
                );
            }
        }
    });
    // var ps = [];
    // $('.pro-loop').each(function () {
    //     var t = $(this);
    //     ps.push({id: t.attr('data-id')});
    // });
    // CompareProductLoad(ps);
    // function CompareProductLoad(ps) {
    //     if (ps.length) {
    //         if($('.checkCookies').val() != "") {
    //             var esult = JSON.parse($('.checkCookies').val());
    //             $.each(esult, function (key, vl) {
    //                 // console.log('.prd' + key + ' .wishlistItems');
    //                 if (vl <= 0) {
    //                     $('.prd' + key + ' .compare').removeClass('active');
    //                 } else {
    //                     $('.prd' + key + ' .compare').addClass('active');
    //                 }
    //             });
    //         }
    //     }
    // }
    if ($(".fancybox-album").length) {
        $(".fancybox-album").fancybox({
            fitToView: true,
            closeBtn: true,
            padding: 0
        });
    }

    if (in_array($storeId, [157317, 15113])) {
        $(".form-wrap a").click(function() {
            var t = $(this),
                target = $(this).attr('data-target');
            $(".form-wrap a").removeClass('active');
            t.addClass('active');
            $(".form-access").hide();
            $(target).show();
        });
        $(".form-access #btnsignin").click(function() {
            AppAjax.ajax({
                type: "POST",
                data: $(".form-signin").serialize(),
                cache: false,
                dataType: 'json',
                url: "/user/ajaxsignin",
                success: function(rs) {
                    if (rs.code) {
                        window.location.href = '/';
                    } else if (rs.message['username'] != undefined) {
                        alert(rs.message['username']);
                    } else if (rs.message['email'] != undefined) {
                        alert(rs.message['email']);
                    } else {
                        alert(rs.message);
                    }
                }
            });
        });
        $(".form-access #btnsingup").click(function() {
            AppAjax.ajax({
                type: "POST",
                data: $(".form-signup").serialize(),
                cache: false,
                dataType: 'json',
                url: "/user/ajaxsignup",
                success: function(rs) {
                    var $email = $('.form-signup #email').val();
                    if (rs.code || validateEmail($email)) {
                        $("#formAcount input[type='text'], #formAcount input[type='password']").val('');
                        alert('Bạn đã đăng ký thành công');
                        $(".signin-btn").addClass('active');
                        $(".form-access").hide();
                        $(".form-signin").show();
                    } else {
                        alert('mật khẩu không đúng định dạng hoặc email đã tồn tại. Vui lòng kiểm tra lại!');
                    }
                }
            });
        });
    }

    $('.cancelOrder').click(function(e) {
        e.preventDefault();
        var msg = $('#dMsg');
        msg.html('<p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>');
        msg.dialog({
            title: "Thông báo",
            modal: true,
            show: 'scale',
            buttons: [{
                    text: "OK",
                    click: function() {
                        AppAjax.post(
                            '/order/cancel', {
                                id: $('.cancelOrder').attr('data-id')
                            },
                            function(rs) {
                                window.location.reload();
                            },
                            'json'
                        );
                    }
                },
                {
                    text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    });



    if ($(window).width() < 768) {
        $('.footer-title').on('click', function() {
            $(this).toggleClass('active').parent().find('.footer-content').stop().slideToggle('medium');
        });
    } else {
        if (in_array(storeId, [90716])) {
            $('.footer-title').on('click', function() {
                $(this).next().stop().slideToggle('fast');
            });
        } else {
            $('.footer-title').on('click', function() {
                $('.footer-content').stop().slideToggle('fast');
            });
        }

    }

    var popupHomeCookie = $('#popupHome.cookie');
    if (popupHomeCookie.length) {
        let timeOut = 0;
        if (in_array(storeId, [92233])) {
            timeOut = 7000;
        }
        setTimeout(function() {
            popupHomeCookie.modal('show');
        }, timeOut)
    }

    $('body').on('click', '.cart_remove', function() {
        let t = $(this);
        if ((confirm(msgRemoveCartItem + ' ?') == true)) {
            $.post(
                '/cart/remove', {
                    'psId': $(this).attr('data-id')
                },
                function() {
                    if (t.hasClass('cart_remove_index') && in_array(storeId, [92233, 8206])) {
                        window.location.href = '/cart';
                    } else {
                        ajaxLoadView({
                            view: 'cartSidebar',
                            onSuccess: function(rs) {
                                $("#site-cart>.site-nav-container-last").empty();
                                $("#site-cart>.site-nav-container-last").html(rs);
                                $('#myCart').modal('show');
                                $('.modal-backdrop').css({
                                    'height': jQuery(document).height(),
                                    'z-index': '99'
                                });
                                getCartModal()
                            }
                        });
                    }
                }
            );
        }
    });
});

// Mainmenu sidebar
$(document).on("click", "span.icon-subnav", function() {
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).siblings('ul').slideUp();
    } else {
        if ($(this).parent().hasClass("level0") || $(this).parent().hasClass("level1")) {
            $(this).parent().siblings().find("ul").slideUp();
            $(this).parent().siblings().removeClass("active");
        }
        $(this).parent().addClass('active');
        $(this).siblings('ul').slideDown();
    }
});

//Click event to scroll to top
jQuery(document).on("click", ".back-to-top", function() {
    jQuery(this).removeClass('show');
    jQuery('html, body').animate({
        scrollTop: 0
    }, 800);
});

/* scroll */
jQuery(window).scroll(function() {
    /* scroll top */
    var backToTopBtn = jQuery('.back-to-top');
    if (backToTopBtn.length > 0 && jQuery(window).scrollTop() > 500) {
        backToTopBtn.addClass('show');
    } else {
        backToTopBtn.removeClass('show');
    }
    /* scroll header */
    if (jQuery(window).width() < 768) {
        var scroll = $(window).scrollTop();
        var height_header = $('.main-header').outerHeight();
        if (scroll < 320) {
            $(".main-header").removeClass("scroll-menu");
            if ($('.bottom-header').length && in_array(storeId, [92233, 8206])) {
                $('.bottom-header').removeClass('fixed').css('top', 0);
            }
        } else {
            $(".main-header").addClass("scroll-menu");
            if ($('.bottom-header').length && in_array(storeId, [92233, 8206])) {
                $('.bottom-header').addClass('fixed').css('top', height_header);
            }
        }
    } else {
        if (in_array(storeId, [70105, 146765, 92233])) {
            var height_header = $('.fixed_scroll').height();
            if (jQuery(window).scrollTop() >= height_header) {
                jQuery('.fixed_scroll').addClass('affix-mobile');
            } else {
                jQuery('.fixed_scroll').removeClass('affix-mobile');
            }
        } else {
            var height_header = $('.main-header').height();
            if (jQuery(window).scrollTop() >= height_header) {
                jQuery('.main-header').addClass('affix-mobile');
                if ($('.campaign-page').length && in_array(storeId, [79592, 157317])) {
                    $('.campaign-page .campaginTable thead').css('top', height_header);
                }
                if ($('.bottom-header').length && in_array(storeId, [92233, 8206])) {
                    $('.bottom-header').addClass('fixed').css('top', height_header);
                }
            } else {
                jQuery('.main-header').removeClass('affix-mobile');
                if ($('.campaign-page').length && in_array(storeId, [79592, 157317])) {
                    $('.campaign-page .campaginTable thead').css('top', 0);
                }
                if ($('.bottom-header').length && in_array(storeId, [92233, 8206])) {
                    $('.bottom-header').removeClass('fixed').css('top', 0);
                }
            }
        }
    }
});


// Menu sidebar
$(document).on('click', '.tree-menu .tree-menu-lv1', function() {
    $this = $(this).find('.tree-menu-sub');
    $('.tree-menu .has-child .tree-menu-sub').not($this).slideUp('fast');
    $(this).find('.tree-menu-sub').slideToggle('fast');
    $(this).toggleClass('menu-collapsed');
    $(this).toggleClass('menu-uncollapsed');
    var $this1 = $(this);
    $('.tree-menu .has-child').not($this1).removeClass('menu-uncollapsed');
});

// Dropdown Title
jQuery('.title_block').click(function() {
    $(this).next().slideToggle('medium');
});

$(document).on("click", ".dropdown-filter", function() {
    if ($(this).parent().attr('aria-expanded') == 'false') {
        $(this).parent().attr('aria-expanded', 'true');
    } else {
        $(this).parent().attr('aria-expanded', 'false');
    }
});

$(document).ready(function() {
    // nhanh.init();

    colorVariant();

    // this.quickview();
    $(document).on('click', '.quickView', function() {

        var proId = $(this).attr("data-id");
        if (in_array(storeId, [90716])) {
            var products = [];
            products = [{
                id: proId,
                quantity: 1
            }];
            addToCart(products, 1, function(rs) {
                if (rs.status == 1) {
                    AppAjax.post('/product/child?childId=' + proId, {},
                        function(rs) {
                            if (rs.code == 1) {
                                ajaxLoadView({
                                    view: 'cartSidebar',
                                    onSuccess: function(rs) {
                                        $("#site-cart>.site-nav-container-last").empty();
                                        $("#site-cart>.site-nav-container-last").html(rs);
                                        $('#myCart').modal('show');
                                        $('.modal-backdrop').css({
                                            'height': jQuery(document).height(),
                                            'z-index': '99'
                                        });
                                        getCartModal()
                                    }
                                });
                            }
                        },
                        'json'
                    );
                } else {
                    alert(rs.messages);
                }
            });
        } else {
            var url = 'product/q' + proId;
            if ((in_array(storeId, [2071])) && ($(window).width() < 991)) {
                $('#navigation--list--mobile').addClass('hidden--mobile');
                url = 'product/q' + proId + '?viewMobile=1';
            }
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'text',
                success: function(data) {
                    $("#quickview-cart-desktop").html(data);
                    $('#quickview-cart').modal('show');
                }
            });
        }
    });

    $(document).on('click', '.close-quick-view', function() {
        $('#quickview-cart').modal('hide');
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#bttop').fadeIn();
        } else {
            $('#bttop').fadeOut();
        }
    });

    $('#bttop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });

    // this.mmMenu();

    if ($(window).width() < 1200) {
        if (!in_array(storeId, [63398, 79592, 157317, 7888])) {
            let $options = {}
            if (in_array(storeId, [112918])) {
                $options = {
                    navbar: {
                        title: 'Home',
                    }
                }
            }
            if (in_array(storeId, [152328, 15113])) {
                $options = {
                    "slidingSubmenus": false,
                }
            }
            $('#menu-mobile').mmenu($options);

        }
        flagg = true;
        if (flagg) {
            $('.hamburger-menu').click(function() {
                $('#menu-mobile').removeClass('hidden');
                flagg = false;
            })
        }
    } else {
        $("#menu-mobile").remove();
    }


    $(".filterSmallScreen").click(function() {
        $("body").addClass("openFilter");
    });
    $(".btn_filter_cancel, .innerSidebarFilter .filterTitle .fa").click(function() {
        $("body").removeClass("openFilter");
    });

    // this.removeDiv();
    if ($(window).width() < 992) {
        $(".removeMobile").remove();
    } else {
        $(".removeDesktop").remove();
    }

    if (!in_array(storeId, [92233])) {
        setTimeout(function() {
            var height = $("#site-header").outerHeight() - 1;
            $(".outerHeightHeader").css("min-height", height);
        }, 100);
    }

    // Check Out Of Stock Script
    if ($('body .pro-loop').length) {
        var ps = [];
        $('.pro-loop').each(function() {
            ps.push({
                storeId: storeId,
                id: $(this).attr('data-Id')
            });
        });

        if (ps.length) {
            var $sold = 'Hết hàng';
            if (in_array(storeId, [2071])) {
                $sold = 'Hết hàng online'
            }
            if (in_array(storeId, [79592, 157317, 7888, 118144, 1549])) {
                $sold = 'Tạm hết';
            }
            checkInventory(ps, function(rs) {
                if (rs.inventories != "") {
                    $.each(rs.inventories, function(Id, ivt) {
                        if (ivt <= 0) {
                            if (in_array(storeId, [106510])) {
                                $('.pro-loop[data-Id="' + Id + '"]').find('.product-img.image-resize').append('<div class="out-of-stock">SOLD</div>');
                            } else {
                                $('.pro-loop[data-Id="' + Id + '"]').find('.product-img.image-resize').append('<div class="out-of-stock">' + $sold + '</div>');
                            }
                        } else {
                            if (in_array(storeId, [92233, 8206]) && ivt <= 20) {
                                $('.promo-products .pro-loop[data-Id="' + Id + '"]').find('.box-pro-detail').append('<div class="ivt-num">Chỉ còn duy nhất ' + ivt + ' sản phẩm</div>');
                            }
                        }
                    });
                }
            });
        }
    }

    // Disable download Image
    if (in_array(storeId, [126453, 15113])) {
        $('img, #slide-image').on({
            "contextmenu": function(e) {
                e.preventDefault();
            }
        });
    }

    if (in_array(storeId, [102954, 15113])) {
        setTimeout(function() {
            $('.purchase-content:first').addClass('showP');
        }, 3000);
        setInterval(function() {
            if ($('.purchase-content:last').hasClass('showP')) {
                iNext = $('.purchase-content:first')
            } else {
                iNext = $('.purchase-content.showP').next()
            }
            var iShow = $('.purchase-content.showP');
            iShow.removeClass('showP');
            setTimeout(function() {
                iNext.addClass('showP')
            }, 3000)
        }, 8000);

        $('.close-purchase').click(function() {
            $('.purchase-content.showP').removeClass('showP')
        })
    }
});

// this.colorVariant()
function colorVariant() {
    $(".variantColor li").hover(function(e) {
        e.preventDefault();
        $(this).parents(".variantColor").find("li").removeClass("active");
        $(this).addClass("active");
        var imgVariant1 = $(this).find("a").attr("data-img");
        var imgVariant2 = $(this).find("a").attr("data-img-hover");
        $(this).parents(".product-block").find(".product-img picture:nth-child(1) img").attr("src", imgVariant1);
        $(this).parents(".product-block").find(".product-img picture:nth-child(2) img").attr("src", imgVariant2);
    });
}