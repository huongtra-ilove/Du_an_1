/* Slick slide */ ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(d) {
    "use strict";
    var n, r = window.Slick || {};
    (n = 0, r = function(e, t) {
        var i, o = this;
        o.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: d(e),
            appendDots: d(e),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e, t) {
                return d('<button type="button" />').text(t + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, o.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, d.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = d(e), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, i = d(e).data("slick") || {}, o.options = d.extend({}, o.defaults, t, i), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = d.proxy(o.autoPlay, o), o.autoPlayClear = d.proxy(o.autoPlayClear, o), o.autoPlayIterator = d.proxy(o.autoPlayIterator, o), o.changeSlide = d.proxy(o.changeSlide, o), o.clickHandler = d.proxy(o.clickHandler, o), o.selectHandler = d.proxy(o.selectHandler, o), o.setPosition = d.proxy(o.setPosition, o), o.swipeHandler = d.proxy(o.swipeHandler, o), o.dragHandler = d.proxy(o.dragHandler, o), o.keyHandler = d.proxy(o.keyHandler, o), o.instanceUid = n++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, r.prototype.addSlide = r.prototype.slickAdd = function(e, t, i) {
        var o = this;
        if ("boolean" == typeof t) i = t, t = null;
        else if (t < 0 || t >= o.slideCount) return !1;
        o.unload(), "number" == typeof t ? 0 === t && 0 === o.$slides.length ? d(e).appendTo(o.$slideTrack) : i ? d(e).insertBefore(o.$slides.eq(t)) : d(e).insertAfter(o.$slides.eq(t)) : !0 === i ? d(e).prependTo(o.$slideTrack) : d(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, r.prototype.animateSlide = function(e, t) {
        var i = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: e
        }, o.options.speed, o.options.easing, t) : o.$slideTrack.animate({
            top: e
        }, o.options.speed, o.options.easing, t) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), d({
            animStart: o.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate(" + e + "px, 0px)" : i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i)
            },
            complete: function() {
                t && t.call()
            }
        })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(i), t && setTimeout(function() {
            o.disableTransition(), t.call()
        }, o.options.speed))
    }, r.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = d(e).not(this.$slider)), e
    }, r.prototype.asNavFor = function(t) {
        var e = this.getNavTarget();
        null !== e && "object" == typeof e && e.each(function() {
            var e = d(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0)
        })
    }, r.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, r.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, r.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, r.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, r.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = d(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = d(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, r.prototype.buildDots = function() {
        var e, t, i = this;
        if (!0 === i.options.dots) {
            for (i.$slider.addClass("slick-dotted"), t = d("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(d("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
        }
    }, r.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            d(t).attr("data-slick-index", e).data("originalStyling", d(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? d('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), d("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, r.prototype.buildRows = function() {
        var e, t, i, o, n, s, r, a = this;
        if (o = document.createDocumentFragment(), s = a.$slider.children(), 1 < a.options.rows) {
            for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(s.length / r), e = 0; e < n; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = e * r + (t * a.options.slidesPerRow + i);
                        s.get(c) && d.appendChild(s.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            a.$slider.empty().append(o), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, r.prototype.checkResponsive = function(e, t) {
        var i, o, n, s = this,
            r = !1,
            a = s.$slider.width(),
            l = window.innerWidth || d(window).width();
        if ("window" === s.respondTo ? n = l : "slider" === s.respondTo ? n = a : "min" === s.respondTo && (n = Math.min(l, a)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? n < s.breakpoints[i] && (o = s.breakpoints[i]) : n > s.breakpoints[i] && (o = s.breakpoints[i]));
            null !== o ? null !== s.activeBreakpoint ? o === s.activeBreakpoint && !t || (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = d.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), r = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = d.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), r = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e), r = o), e || !1 === r || s.$slider.trigger("breakpoint", [s, r])
        }
    }, r.prototype.changeSlide = function(e, t) {
        var i, o, n = this,
            s = d(e.currentTarget);
        switch (s.is("a") && e.preventDefault(), s.is("li") || (s = s.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
            case "previous":
                o = 0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - o, !1, t);
                break;
            case "next":
                o = 0 == i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + o, !1, t);
                break;
            case "index":
                var r = 0 === e.data.index ? 0 : e.data.index || s.index() * n.options.slidesToScroll;
                n.slideHandler(n.checkNavigable(r), !1, t), s.children().trigger("focus");
                break;
            default:
                return
        }
    }, r.prototype.checkNavigable = function(e) {
        var t, i;
        if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
        else
            for (var o in t) {
                if (e < t[o]) {
                    e = i;
                    break
                }
                i = t[o]
            }
        return e
    }, r.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (d("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", d.proxy(e.interrupt, e, !0)).off("mouseleave.slick", d.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), d(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().off("click.slick", e.selectHandler), d(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), d(window).off("resize.slick.slick-" + e.instanceUid, e.resize), d("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), d(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, r.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }, r.prototype.cleanUpRows = function() {
        var e;
        1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
    }, r.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, r.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), d(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            d(this).attr("style", d(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, r.prototype.disableTransition = function(e) {
        var t = {};
        t[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t)
    }, r.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, r.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, r.prototype.filterSlides = r.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, r.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
            e.stopImmediatePropagation();
            var t = d(this);
            setTimeout(function() {
                i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
            }, 0)
        })
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, r.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            o = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++o;
            else
                for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) o = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return o - 1
    }, r.prototype.getLeft = function(e) {
        var t, i, o, n, s = this,
            r = 0;
        return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = -1, !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? n = -1.5 : 1 === s.options.slidesToShow && (n = -2)), r = i * s.options.slidesToShow * n), s.slideCount % s.options.slidesToScroll != 0 && e + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (r = e > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (e - s.slideCount)) * s.slideWidth * -1, (s.options.slidesToShow - (e - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, s.slideCount % s.options.slidesToScroll * i * -1))) : e + s.options.slidesToShow > s.slideCount && (s.slideOffset = (e + s.options.slidesToShow - s.slideCount) * s.slideWidth, r = (e + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (r = s.slideOffset = 0), !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), t = !1 === s.options.vertical ? e * s.slideWidth * -1 + s.slideOffset : e * i * -1 + r, !0 === s.options.variableWidth && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === s.options.centerMode && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow + 1), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (s.$list.width() - o.outerWidth()) / 2)), t
    }, r.prototype.getOption = r.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, r.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            o = 0,
            n = [];
        for (e = !1 === t.options.infinite ? t.slideCount : (i = -1 * t.options.slidesToScroll, o = -1 * t.options.slidesToScroll, 2 * t.slideCount); i < e;) n.push(i), i = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return n
    }, r.prototype.getSlick = function() {
        return this
    }, r.prototype.getSlideCount = function() {
        var i, o, n = this;
        return o = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) {
            if (t.offsetLeft - o + d(t).outerWidth() / 2 > -1 * n.swipeLeft) return i = t, !1
        }), Math.abs(d(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, r.prototype.goTo = r.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, r.prototype.init = function(e) {
        var t = this;
        d(t.$slider).hasClass("slick-initialized") || (d(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, r.prototype.initADA = function() {
        var i = this,
            o = Math.ceil(i.slideCount / i.options.slidesToShow),
            n = i.getNavigableIndexes().filter(function(e) {
                return 0 <= e && e < i.slideCount
            });
        i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
            var t = n.indexOf(e);
            d(this).attr({
                role: "tabpanel",
                id: "slick-slide" + i.instanceUid + e,
                tabindex: -1
            }), -1 !== t && d(this).attr({
                "aria-describedby": "slick-slide-control" + i.instanceUid + t
            })
        }), i.$dots.attr("role", "tablist").find("li").each(function(e) {
            var t = n[e];
            d(this).attr({
                role: "presentation"
            }), d(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + i.instanceUid + e,
                "aria-controls": "slick-slide" + i.instanceUid + t,
                "aria-label": e + 1 + " of " + o,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(i.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.$slides.eq(e).attr("tabindex", 0);
        i.activateADA()
    }, r.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, r.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (d("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && d("li", e.$dots).on("mouseenter.slick", d.proxy(e.interrupt, e, !0)).on("mouseleave.slick", d.proxy(e.interrupt, e, !1))
    }, r.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", d.proxy(e.interrupt, e, !1)))
    }, r.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), d(document).on(e.visibilityChange, d.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), d(window).on("orientationchange.slick.slick-" + e.instanceUid, d.proxy(e.orientationChange, e)), d(window).on("resize.slick.slick-" + e.instanceUid, d.proxy(e.resize, e)), d("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), d(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), d(e.setPosition)
    }, r.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, r.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, r.prototype.lazyLoad = function() {
        function e(e) {
            d("img[data-lazy]", e).each(function() {
                var e = d(this),
                    t = d(this).attr("data-lazy"),
                    i = d(this).attr("data-srcset"),
                    o = d(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                    n = document.createElement("img");
                n.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        i && (e.attr("srcset", i), o && e.attr("sizes", o)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), s.$slider.trigger("lazyLoaded", [s, e, t])
                    })
                }, n.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t])
                }, n.src = t
            })
        }
        var t, i, o, s = this;
        if (!0 === s.options.centerMode ? o = !0 === s.options.infinite ? (i = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (i = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (i = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, o = Math.ceil(i + s.options.slidesToShow), !0 === s.options.fade && (0 < i && i--, o <= s.slideCount && o++)), t = s.$slider.find(".slick-slide").slice(i, o), "anticipated" === s.options.lazyLoad)
            for (var n = i - 1, r = o, a = s.$slider.find(".slick-slide"), l = 0; l < s.options.slidesToScroll; l++) n < 0 && (n = s.slideCount - 1), t = (t = t.add(a.eq(n))).add(a.eq(r)), n--, r++;
        e(t), s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
    }, r.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, r.prototype.next = r.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, r.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, r.prototype.pause = r.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, r.prototype.play = r.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, r.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && d(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, r.prototype.prev = r.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, r.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, r.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, i, o, n, s, r = this,
            a = d("img[data-lazy]", r.$slider);
        a.length ? (t = a.first(), i = t.attr("data-lazy"), o = t.attr("data-srcset"), n = t.attr("data-sizes") || r.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
            o && (t.attr("srcset", o), n && t.attr("sizes", n)), t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, t, i]), r.progressiveLazyLoad()
        }, s.onerror = function() {
            e < 3 ? setTimeout(function() {
                r.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i]), r.progressiveLazyLoad())
        }, s.src = i) : r.$slider.trigger("allImagesLoaded", [r])
    }, r.prototype.refresh = function(e) {
        var t, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), t = o.currentSlide, o.destroy(!0), d.extend(o, o.initials, {
            currentSlide: t
        }), o.init(), e || o.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, r.prototype.registerBreakpoints = function() {
        var e, t, i, o = this,
            n = o.options.responsive || null;
        if ("array" === d.type(n) && n.length) {
            for (e in o.respondTo = o.options.respondTo || "window", n)
                if (i = o.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; 0 <= i;) o.breakpoints[i] && o.breakpoints[i] === t && o.breakpoints.splice(i, 1), i--;
                    o.breakpoints.push(t), o.breakpointSettings[t] = n[e].settings
                }
            o.breakpoints.sort(function(e, t) {
                return o.options.mobileFirst ? e - t : t - e
            })
        }
    }, r.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, r.prototype.resize = function() {
        var e = this;
        d(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = d(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, r.prototype.removeSlide = r.prototype.slickRemove = function(e, t, i) {
        var o = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : o.slideCount - 1 : !0 === t ? --e : e, o.slideCount < 1 || e < 0 || e > o.slideCount - 1) return !1;
        o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.setCSS = function(e) {
        var t, i, o = this,
            n = {};
        !0 === o.options.rtl && (e = -e), t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", n[o.positionProp] = e, !1 === o.transformsEnabled || (!(n = {}) === o.cssTransitions ? n[o.animType] = "translate(" + t + ", " + i + ")" : n[o.animType] = "translate3d(" + t + ", " + i + ", 0px)"), o.$slideTrack.css(n)
    }, r.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, r.prototype.setFade = function() {
        var i, o = this;
        o.$slides.each(function(e, t) {
            i = o.slideWidth * e * -1, !0 === o.options.rtl ? d(t).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : d(t).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            })
        }), o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        })
    }, r.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, r.prototype.setOption = r.prototype.slickSetOption = function() {
        var e, t, i, o, n, s = this,
            r = !1;
        if ("object" === d.type(arguments[0]) ? (i = arguments[0], r = arguments[1], n = "multiple") : "string" === d.type(arguments[0]) && (o = arguments[1], r = arguments[2], "responsive" === (i = arguments[0]) && "array" === d.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) s.options[i] = o;
        else if ("multiple" === n) d.each(i, function(e, t) {
            s.options[e] = t
        });
        else if ("responsive" === n)
            for (t in o)
                if ("array" !== d.type(s.options.responsive)) s.options.responsive = [o[t]];
                else {
                    for (e = s.options.responsive.length - 1; 0 <= e;) s.options.responsive[e].breakpoint === o[t].breakpoint && s.options.responsive.splice(e, 1), e--;
                    s.options.responsive.push(o[t])
                }
        r && (s.unload(), s.reinit())
    }, r.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, r.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, r.prototype.setSlideClasses = function(e) {
        var t, i, o, n, s = this;
        if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(e).addClass("slick-current"), !0 === s.options.centerMode) {
            var r = s.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (t <= e && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t + r, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + e, i.slice(o - t + 1 + r, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(e).addClass("slick-center")
        } else 0 <= e && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, o = !0 === s.options.infinite ? s.options.slidesToShow + e : e, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }, r.prototype.setupInfinite = function() {
        var e, t, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (t = null, o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - i; e -= 1) t = e - 1, d(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < i + o.slideCount; e += 1) t = e, d(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                d(this).attr("id", "")
            })
        }
    }, r.prototype.interrupt = function(e) {
        e || this.autoPlay(), this.interrupted = e
    }, r.prototype.selectHandler = function(e) {
        var t = d(e.target).is(".slick-slide") ? d(e.target) : d(e.target).parents(".slick-slide"),
            i = parseInt(t.attr("data-slick-index"));
        i = i || 0, this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
    }, r.prototype.slideHandler = function(e, t, i) {
        var o, n, s, r, a, l = null,
            d = this;
        if (t = t || !1, !(!0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e))
            if (!1 === t && d.asNavFor(e), o = e, l = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll)) !1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(o)
            }) : d.postSlide(o));
            else if (!1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll)) !1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o));
        else {
            if (d.options.autoplay && clearInterval(d.autoPlayTimer), n = o < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, n]), s = d.currentSlide, d.currentSlide = n, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide), d.updateDots(), d.updateArrows(), !0 === d.options.fade) return !0 !== i ? (d.fadeSlideOut(s), d.fadeSlide(n, function() {
                d.postSlide(n)
            })) : d.postSlide(n), void d.animateHeight();
            !0 !== i ? d.animateSlide(l, function() {
                d.postSlide(n)
            }) : d.postSlide(n)
        }
    }, r.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, r.prototype.swipeDirection = function() {
        var e, t, i, o, n = this;
        return e = n.touchObject.startX - n.touchObject.curX, t = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(t, e), (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && 0 <= o ? !1 === n.options.rtl ? "left" : "right" : o <= 360 && 315 <= o ? !1 === n.options.rtl ? "left" : "right" : 135 <= o && o <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? 35 <= o && o <= 135 ? "down" : "up" : "vertical"
    }, r.prototype.swipeEnd = function(e) {
        var t, i, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1;
        if (o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
                case "left":
                case "down":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(t), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, r.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, r.prototype.swipeMove = function(e) {
        var t, i, o, n, s, r, a = this;
        return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || s && 1 !== s.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && 4 < r ? !(a.scrolling = !0) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && (a.swiping = !0, e.preventDefault()), n = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), o = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (o = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + o * n : a.swipeLeft = t + o * (a.$list.height() / a.listWidth) * n, !0 === a.options.verticalSwiping && (a.swipeLeft = t + o * n), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, r.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
    }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, r.prototype.unload = function() {
        var e = this;
        d(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, r.prototype.unslick = function(e) {
        this.$slider.trigger("unslick", [this, e]), this.destroy()
    }, r.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, r.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, r.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }, d.fn.slick = function() {
        var e, t, i = this,
            o = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            s = i.length;
        for (e = 0; e < s; e++)
            if ("object" == typeof o || void 0 === o ? i[e].slick = new r(i[e], o) : t = i[e].slick[o].apply(i[e].slick, n), void 0 !== t) return t;
        return i
    }
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function() {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t, i) {
        null === e && (e = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(e, t);
        if (void 0 === o) {
            var n = Object.getPrototypeOf(e);
            return null === n ? void 0 : a(n, t, i)
        }
        if ("value" in o) return o.value;
        var s = o.get;
        return void 0 !== s ? s.call(i) : void 0
    }

    function e(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e) {
        return Array.prototype.slice.call(e)
    }

    function p(e) {
        console.warn(E + " " + e)
    }

    function j(e) {
        console.error(E + " " + e)
    }

    function i(e) {
        -1 === L.indexOf(e) && (L.push(e), p(e))
    }

    function M(e) {
        return "function" == typeof e ? e() : e
    }

    function z(e) {
        return "object" === (void 0 === e ? "undefined" : U(e)) && "function" == typeof e.then
    }

    function t(e) {
        var t = {};
        for (var i in e) t[e[i]] = "swal2-" + e[i];
        return t
    }

    function l(e, t) {
        return e.classList.contains(t)
    }

    function I(e) {
        if (e.focus(), "file" !== e.type) {
            var t = e.value;
            e.value = "", e.value = t
        }
    }

    function n(e, t, i) {
        e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)), t.forEach(function(t) {
            e.forEach ? e.forEach(function(e) {
                i ? e.classList.add(t) : e.classList.remove(t)
            }) : i ? e.classList.add(t) : e.classList.remove(t)
        }))
    }

    function D(e, t) {
        n(e, t, !0)
    }

    function q(e, t) {
        n(e, t, !1)
    }

    function W(e, t) {
        for (var i = 0; i < e.childNodes.length; i++)
            if (l(e.childNodes[i], t)) return e.childNodes[i]
    }

    function N(e) {
        e.style.opacity = "", e.style.display = e.id === X.content ? "block" : "flex"
    }

    function R(e) {
        e.style.opacity = "", e.style.display = "none"
    }

    function _(e) {
        return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }

    function h() {
        return document.body.querySelector("." + X.container)
    }

    function d(e) {
        var t = h();
        return t ? t.querySelector("." + e) : null
    }

    function v() {
        return d(X.popup)
    }

    function u() {
        var e = v();
        return s(e.querySelectorAll("." + X.icon))
    }

    function f() {
        return d(X.title)
    }

    function g() {
        return d(X.content)
    }

    function m() {
        return d(X.image)
    }

    function c() {
        return d(X.progresssteps)
    }

    function y() {
        return d(X.confirm)
    }

    function w() {
        return d(X.cancel)
    }

    function b() {
        return d(X.actions)
    }

    function k() {
        return d(X.footer)
    }

    function S() {
        return d(X.close)
    }

    function V() {
        var e = s(v().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e, t) {
                return e = parseInt(e.getAttribute("tabindex")), (t = parseInt(t.getAttribute("tabindex"))) < e ? 1 : e < t ? -1 : 0
            }),
            t = s(v().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function(e) {
                return "-1" !== e.getAttribute("tabindex")
            });
        return function(e) {
            for (var t = [], i = 0; i < e.length; i++) - 1 === t.indexOf(e[i]) && t.push(e[i]);
            return t
        }(e.concat(t)).filter(function(e) {
            return _(e)
        })
    }

    function T() {
        return !K() && !document.body.classList.contains(X["no-backdrop"])
    }

    function C() {
        return "undefined" == typeof window || "undefined" == typeof document
    }

    function x(e) {
        var t = h();
        if (t && (t.parentNode.removeChild(t), q([document.documentElement, document.body], [X["no-backdrop"], X["toast-shown"], X["has-column"]])), !C()) {
            var i = document.createElement("div");
            i.className = X.container, i.innerHTML = Q, ("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(i);
            var o = v(),
                n = g(),
                s = W(n, X.input),
                r = W(n, X.file),
                a = n.querySelector("." + X.range + " input"),
                l = n.querySelector("." + X.range + " output"),
                d = W(n, X.select),
                c = n.querySelector("." + X.checkbox + " input"),
                p = W(n, X.textarea);
            o.setAttribute("role", e.toast ? "alert" : "dialog"), o.setAttribute("aria-live", e.toast ? "polite" : "assertive"), e.toast || o.setAttribute("aria-modal", "true");
            var u = void 0,
                f = function(e) {
                    Oe.isVisible() && u !== e.target.value && Oe.resetValidationError(), u = e.target.value
                };
            return s.oninput = f, r.onchange = f, d.onchange = f, c.onchange = f, p.oninput = f, a.oninput = function(e) {
                f(e), l.value = a.value
            }, a.onchange = function(e) {
                f(e), a.nextSibling.value = a.value
            }, o
        }
        j("SweetAlert2 requires document to initialize")
    }

    function $(e, t) {
        if (!e) return R(t);
        if ("object" === (void 0 === e ? "undefined" : U(e)))
            if (t.innerHTML = "", 0 in e)
                for (var i = 0; i in e; i++) t.appendChild(e[i].cloneNode(!0));
            else t.appendChild(e.cloneNode(!0));
        else e && (t.innerHTML = e);
        N(t)
    }

    function A(n) {
        var s = c(),
            r = parseInt(null === n.currentProgressStep ? Oe.getQueueStep() : n.currentProgressStep, 10);
        n.progressSteps && n.progressSteps.length ? (N(s), s.innerHTML = "", r >= n.progressSteps.length && p("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), n.progressSteps.forEach(function(e, t) {
            var i = document.createElement("li");
            if (D(i, X.progresscircle), i.innerHTML = e, t === r && D(i, X.activeprogressstep), s.appendChild(i), t !== n.progressSteps.length - 1) {
                var o = document.createElement("li");
                D(o, X.progressline), n.progressStepsDistance && (o.style.width = n.progressStepsDistance), s.appendChild(o)
            }
        })) : R(s)
    }

    function P(e, i) {
        var o = h(),
            t = v();
        if (t) {
            null !== e && "function" == typeof e && e(t), q(t, X.show), D(t, X.hide);
            var n = function() {
                var e, t;
                K() || (e = window.scrollX, t = window.scrollY, G.restoreFocusTimeout = setTimeout(function() {
                    G.previousActiveElement && G.previousActiveElement.focus ? (G.previousActiveElement.focus(), G.previousActiveElement = null) : document.body && document.body.focus()
                }, 100), void 0 !== e && void 0 !== t && window.scrollTo(e, t), G.keydownTarget.removeEventListener("keydown", G.keydownHandler, {
                    capture: G.keydownListenerCapture
                }), G.keydownHandlerAdded = !1), o.parentNode && o.parentNode.removeChild(o), q([document.documentElement, document.body], [X.shown, X["height-auto"], X["no-backdrop"], X["toast-shown"], X["toast-column"]]), T() && (null !== H.previousBodyPadding && (document.body.style.paddingRight = H.previousBodyPadding, H.previousBodyPadding = null), function() {
                    if (l(document.body, X.iosfix)) {
                        var e = parseInt(document.body.style.top, 10);
                        q(document.body, X.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * e
                    }
                }(), s(document.body.children).forEach(function(e) {
                    e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden")), e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden")
                })), null !== i && "function" == typeof i && setTimeout(function() {
                    i()
                })
            };
            Z && !l(t, X.noanimation) ? t.addEventListener(Z, function e() {
                t.removeEventListener(Z, e), l(t, X.hide) && n()
            }) : n()
        }
    }
    var U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        O = function(e, t, i) {
            return t && J(e.prototype, t), i && J(e, i), e
        },
        F = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o])
            }
            return e
        },
        E = "SweetAlert2:",
        L = [],
        B = Object.freeze({
            cancel: "cancel",
            backdrop: "overlay",
            close: "close",
            esc: "esc",
            timer: "timer"
        }),
        X = t(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"]),
        Y = t(["success", "warning", "info", "question", "error"]),
        H = {
            previousBodyPadding: null
        },
        K = function() {
            return document.body.classList.contains(X["toast-shown"])
        },
        Q = ('\n <div aria-labelledby="' + X.title + '" aria-describedby="' + X.content + '" class="' + X.popup + '" tabindex="-1">\n   <div class="' + X.header + '">\n     <ul class="' + X.progresssteps + '"></ul>\n     <div class="' + X.icon + " " + Y.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + X.icon + " " + Y.question + '">\n       <span class="' + X["icon-text"] + '">?</span>\n      </div>\n     <div class="' + X.icon + " " + Y.warning + '">\n       <span class="' + X["icon-text"] + '">!</span>\n      </div>\n     <div class="' + X.icon + " " + Y.info + '">\n       <span class="' + X["icon-text"] + '">i</span>\n      </div>\n     <div class="' + X.icon + " " + Y.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + X.image + '" />\n     <h2 class="' + X.title + '" id="' + X.title + '"></h2>\n     <button type="button" class="' + X.close + '">×</button>\n   </div>\n   <div class="' + X.content + '">\n     <div id="' + X.content + '"></div>\n     <input class="' + X.input + '" />\n     <input type="file" class="' + X.file + '" />\n     <div class="' + X.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + X.select + '"></select>\n     <div class="' + X.radio + '"></div>\n     <label for="' + X.checkbox + '" class="' + X.checkbox + '">\n       <input type="checkbox" />\n       <span class="' + X.label + '"></span>\n     </label>\n     <textarea class="' + X.textarea + '"></textarea>\n     <div class="' + X.validationerror + '" id="' + X.validationerror + '"></div>\n   </div>\n   <div class="' + X.actions + '">\n     <button type="button" class="' + X.confirm + '">OK</button>\n     <button type="button" class="' + X.cancel + '">Cancel</button>\n   </div>\n   <div class="' + X.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
        Z = function() {
            if (C()) return !1;
            var e = document.createElement("div"),
                t = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd oanimationend",
                    animation: "animationend"
                };
            for (var i in t)
                if (t.hasOwnProperty(i) && void 0 !== e.style[i]) return t[i];
            return !1
        }(),
        G = {};

    function J(e, t) {
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }

    function ee(e) {
        function o() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            if (!(this instanceof o)) return new(Function.prototype.bind.apply(o, [null].concat(t)));
            Object.getPrototypeOf(o).apply(this, t)
        }
        return o.prototype = F(Object.create(e.prototype), {
            constructor: o
        }), "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf(o, e) : o.__proto__ = e, o
    }

    function te(e) {
        return de.hasOwnProperty(e) || "extraParams" === e
    }

    function ie(e) {
        return -1 !== ce.indexOf(e)
    }

    function oe(e) {
        for (var t in e) te(t) || p('Unknown parameter "' + t + '"'), e.toast && -1 !== ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"].indexOf(t) && p('The parameter "' + t + '" is incompatible with toasts'), ie(t) && i('The parameter "' + t + '" is deprecated and will be removed in the next major release.')
    }

    function ne() {
        var e = v();
        e || Oe(""), e = v();
        var t = b(),
            i = y(),
            o = w();
        N(t), N(i), D([e, t], X.loading), i.disabled = !0, o.disabled = !0, e.setAttribute("data-loading", !0), e.setAttribute("aria-busy", !0), e.focus()
    }
    var se, re, ae, le, de = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            type: null,
            toast: !1,
            customClass: "",
            target: "body",
            backdrop: !0,
            animation: !0,
            heightAuto: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            stopKeydownPropagation: !0,
            keydownListenerCapture: !1,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: null,
            confirmButtonClass: null,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: null,
            cancelButtonClass: null,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonAriaLabel: "Close this dialog",
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: "",
            imageClass: null,
            timer: null,
            width: null,
            padding: null,
            background: null,
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: null,
            inputAttributes: {},
            inputValidator: null,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: null,
            onBeforeOpen: null,
            onAfterClose: null,
            onOpen: null,
            onClose: null,
            useRejections: !1,
            expectRejections: !1
        },
        ce = ["useRejections", "expectRejections"],
        pe = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.',
        ue = {},
        fe = [],
        he = Object.freeze({
            isValidParameter: te,
            isDeprecatedParameter: ie,
            argsToParams: function(i) {
                var o = {};
                switch (U(i[0])) {
                    case "string":
                        ["title", "html", "type"].forEach(function(e, t) {
                            switch (U(i[t])) {
                                case "string":
                                    o[e] = i[t];
                                    break;
                                case "undefined":
                                    break;
                                default:
                                    j("Unexpected type of " + e + '! Expected "string", got ' + U(i[t]))
                            }
                        });
                        break;
                    case "object":
                        F(o, i[0]);
                        break;
                    default:
                        j('Unexpected type of argument! Expected "string" or "object", got "' + U(i[0]) + '"')
                }
                return o
            },
            adaptInputValidator: function(i) {
                return function(e, t) {
                    return i.call(this, e, t).then(function() {}, function(e) {
                        return e
                    })
                }
            },
            close: P,
            closePopup: P,
            closeModal: P,
            closeToast: P,
            isVisible: function() {
                return !!v()
            },
            clickConfirm: function() {
                return y().click()
            },
            clickCancel: function() {
                return w().click()
            },
            getContainer: h,
            getPopup: v,
            getTitle: f,
            getContent: g,
            getImage: m,
            getIcons: u,
            getCloseButton: S,
            getButtonsWrapper: function() {
                return i("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"), d(X.actions)
            },
            getActions: b,
            getConfirmButton: y,
            getCancelButton: w,
            getFooter: k,
            getFocusableElements: V,
            isLoading: function() {
                return v().hasAttribute("data-loading")
            },
            fire: function() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return new(Function.prototype.bind.apply(this, [null].concat(t)))
            },
            mixin: function(t) {
                return ee((e(i, this), O(i, [{
                    key: "_main",
                    value: function(e) {
                        return a(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_main", this).call(this, F({}, t, e))
                    }
                }]), i));

                function i() {
                    return r(this, i), o(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments))
                }
            },
            queue: function(e) {
                var s = this;
                fe = e;

                function r() {
                    fe = [], document.body.removeAttribute("data-swal2-queue-step")
                }
                var a = [];
                return new Promise(function(n) {
                    ! function t(i, o) {
                        i < fe.length ? (document.body.setAttribute("data-swal2-queue-step", i), s(fe[i]).then(function(e) {
                            void 0 !== e.value ? (a.push(e.value), t(i + 1, o)) : (r(), n({
                                dismiss: e.dismiss
                            }))
                        })) : (r(), n({
                            value: a
                        }))
                    }(0)
                })
            },
            getQueueStep: function() {
                return document.body.getAttribute("data-swal2-queue-step")
            },
            insertQueueStep: function(e, t) {
                return t && t < fe.length ? fe.splice(t, 0, e) : fe.push(e)
            },
            deleteQueueStep: function(e) {
                void 0 !== fe[e] && fe.splice(e, 1)
            },
            showLoading: ne,
            enableLoading: ne,
            getTimerLeft: function() {
                return G.timeout && G.timeout.getTimerLeft()
            }
        }),
        ve = "function" == typeof Symbol ? Symbol : (le = 0, we.iterator = we("Symbol.iterator"), we),
        ge = "function" == typeof WeakMap ? WeakMap : (se = ve("WeakMap"), re = Object.defineProperty, ae = {}.hasOwnProperty, ye.prototype = {
            delete: function(e) {
                delete e[this[se]]
            },
            get: function(e) {
                return e[this[se]]
            },
            has: function(e) {
                return ae.call(e, this[se])
            },
            set: function(e, t) {
                re(e, this[se], {
                    configurable: !0,
                    value: t
                })
            }
        }, ye),
        me = {
            promise: new ge,
            innerParams: new ge,
            domCache: new ge
        };

    function ye() {
        re(this, se, {
            value: ve("WeakMap")
        })
    }

    function we(e) {
        return "__" + e + "_" + Math.floor(1e9 * Math.random()) + "_" + ++le + "__"
    }

    function be() {
        var e = me.innerParams.get(this),
            t = me.domCache.get(this);
        e.showConfirmButton || (R(t.confirmButton), e.showCancelButton || R(t.actions)), q([t.popup, t.actions], X.loading), t.popup.removeAttribute("aria-busy"), t.popup.removeAttribute("data-loading"), t.confirmButton.disabled = !1, t.cancelButton.disabled = !1
    }

    function ke(e, t) {
        r(this, ke);
        var i = void 0,
            o = void 0,
            n = void 0,
            s = t;
        this.start = function() {
            n = !0, o = new Date, i = setTimeout(e, s)
        }, this.stop = function() {
            n = !1, clearTimeout(i), s -= new Date - o
        }, this.getTimerLeft = function() {
            return n && (this.stop(), this.start()), s
        }, this.start()
    }

    function Se(e) {
        var t = h(),
            i = v();
        null !== e.onBeforeOpen && "function" == typeof e.onBeforeOpen && e.onBeforeOpen(i), e.animation ? (D(i, X.show), D(t, X.fade), q(i, X.hide)) : q(i, X.fade), N(i), t.style.overflowY = "hidden", Z && !l(i, X.noanimation) ? i.addEventListener(Z, function e() {
            i.removeEventListener(Z, e), t.style.overflowY = "auto"
        }) : t.style.overflowY = "auto", D([document.documentElement, document.body, t], X.shown), e.heightAuto && e.backdrop && !e.toast && D([document.documentElement, document.body], X["height-auto"]), T() && (null === H.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (H.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = H.previousBodyPadding + function() {
            if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;
            var e = document.createElement("div");
            e.style.width = "50px", e.style.height = "50px", e.style.overflow = "scroll", document.body.appendChild(e);
            var t = e.offsetWidth - e.clientWidth;
            return document.body.removeChild(e), t
        }() + "px"), function() {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !l(document.body, X.iosfix)) {
                var e = document.body.scrollTop;
                document.body.style.top = -1 * e + "px", D(document.body, X.iosfix)
            }
        }(), s(document.body.children).forEach(function(e) {
            e === h() || e.contains(h()) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden")), e.setAttribute("aria-hidden", "true"))
        })), K() || G.previousActiveElement || (G.previousActiveElement = document.activeElement), null !== e.onOpen && "function" == typeof e.onOpen && setTimeout(function() {
            e.onOpen(i)
        })
    }
    var Te = {
            email: function(e, t) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid email address")
            },
            url: function(e, t) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid URL")
            }
        },
        Ce = Object.freeze({
            hideLoading: be,
            disableLoading: be,
            getInput: function(e) {
                var t = me.innerParams.get(this),
                    i = me.domCache.get(this);
                if (!(e = e || t.input)) return null;
                switch (e) {
                    case "select":
                    case "textarea":
                    case "file":
                        return W(i.content, X[e]);
                    case "checkbox":
                        return i.popup.querySelector("." + X.checkbox + " input");
                    case "radio":
                        return i.popup.querySelector("." + X.radio + " input:checked") || i.popup.querySelector("." + X.radio + " input:first-child");
                    case "range":
                        return i.popup.querySelector("." + X.range + " input");
                    default:
                        return W(i.content, X.input)
                }
            },
            enableButtons: function() {
                var e = me.domCache.get(this);
                e.confirmButton.disabled = !1, e.cancelButton.disabled = !1
            },
            disableButtons: function() {
                var e = me.domCache.get(this);
                e.confirmButton.disabled = !0, e.cancelButton.disabled = !0
            },
            enableConfirmButton: function() {
                me.domCache.get(this).confirmButton.disabled = !1
            },
            disableConfirmButton: function() {
                me.domCache.get(this).confirmButton.disabled = !0
            },
            enableInput: function() {
                var e = this.getInput();
                if (!e) return !1;
                if ("radio" === e.type)
                    for (var t = e.parentNode.parentNode.querySelectorAll("input"), i = 0; i < t.length; i++) t[i].disabled = !1;
                else e.disabled = !1
            },
            disableInput: function() {
                var e = this.getInput();
                if (!e) return !1;
                if (e && "radio" === e.type)
                    for (var t = e.parentNode.parentNode.querySelectorAll("input"), i = 0; i < t.length; i++) t[i].disabled = !0;
                else e.disabled = !0
            },
            showValidationError: function(e) {
                var t = me.domCache.get(this);
                t.validationError.innerHTML = e;
                var i = window.getComputedStyle(t.popup);
                t.validationError.style.marginLeft = "-" + i.getPropertyValue("padding-left"), t.validationError.style.marginRight = "-" + i.getPropertyValue("padding-right"), N(t.validationError);
                var o = this.getInput();
                o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", X.validationerror), I(o), D(o, X.inputerror))
            },
            resetValidationError: function() {
                var e = me.domCache.get(this);
                e.validationError && R(e.validationError);
                var t = this.getInput();
                t && (t.removeAttribute("aria-invalid"), t.removeAttribute("aria-describedBy"), q(t, X.inputerror))
            },
            getProgressSteps: function() {
                return me.innerParams.get(this).progressSteps
            },
            setProgressSteps: function(e) {
                var t = me.innerParams.get(this),
                    i = F({}, t, {
                        progressSteps: e
                    });
                me.innerParams.set(this, i), A(i)
            },
            showProgressSteps: function() {
                var e = me.domCache.get(this);
                N(e.progressSteps)
            },
            hideProgressSteps: function() {
                var e = me.domCache.get(this);
                R(e.progressSteps)
            },
            _main: function(e) {
                var E = this;
                oe(e);
                var L = F({}, de, e);
                ! function(t) {
                    t.inputValidator || Object.keys(Te).forEach(function(e) {
                        t.input === e && (t.inputValidator = t.expectRejections ? Te[e] : Oe.adaptInputValidator(Te[e]))
                    }), t.target && ("string" != typeof t.target || document.querySelector(t.target)) && ("string" == typeof t.target || t.target.appendChild) || (p('Target parameter is not valid, defaulting to "body"'), t.target = "body");
                    var e = void 0,
                        i = v(),
                        o = "string" == typeof t.target ? document.querySelector(t.target) : t.target;
                    e = i && o && i.parentNode !== o.parentNode ? x(t) : i || x(t), t.width && (e.style.width = "number" == typeof t.width ? t.width + "px" : t.width), t.padding && (e.style.padding = "number" == typeof t.padding ? t.padding + "px" : t.padding), t.background && (e.style.background = t.background);
                    for (var n = window.getComputedStyle(e).getPropertyValue("background-color"), s = e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), r = 0; r < s.length; r++) s[r].style.backgroundColor = n;
                    var a = h(),
                        l = S(),
                        d = k();
                    if (function(e) {
                            var t = f();
                            e.titleText ? t.innerText = e.titleText : e.title && ("string" == typeof e.title && (e.title = e.title.split("\n").join("<br />")), $(e.title, t))
                        }(t), function(e) {
                            var t = g().querySelector("#" + X.content);
                            e.html ? $(e.html, t) : e.text ? (t.textContent = e.text, N(t)) : R(t)
                        }(t), "string" == typeof t.backdrop ? h().style.background = t.backdrop : t.backdrop || D([document.documentElement, document.body], X["no-backdrop"]), !t.backdrop && t.allowOutsideClick && p('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), t.position in X ? D(a, X[t.position]) : (p('The "position" parameter is not valid, defaulting to "center"'), D(a, X.center)), t.grow && "string" == typeof t.grow) {
                        var c = "grow-" + t.grow;
                        c in X && D(a, X[c])
                    }
                    "function" == typeof t.animation && (t.animation = t.animation.call()), t.showCloseButton ? (l.setAttribute("aria-label", t.closeButtonAriaLabel), N(l)) : R(l), e.className = X.popup, t.toast ? (D([document.documentElement, document.body], X["toast-shown"]), D(e, X.toast)) : D(e, X.modal), t.customClass && D(e, t.customClass), A(t),
                        function(e) {
                            for (var t = u(), i = 0; i < t.length; i++) R(t[i]);
                            if (e.type)
                                if (-1 !== Object.keys(Y).indexOf(e.type)) {
                                    var o = Oe.getPopup().querySelector("." + X.icon + "." + Y[e.type]);
                                    N(o), e.animation && D(o, "swal2-animate-" + e.type + "-icon")
                                } else j('Unknown type! Expected "success", "error", "warning", "info" or "question", got "' + e.type + '"')
                        }(t),
                        function(e) {
                            var t = m();
                            e.imageUrl ? (t.setAttribute("src", e.imageUrl), t.setAttribute("alt", e.imageAlt), N(t), e.imageWidth ? t.setAttribute("width", e.imageWidth) : t.removeAttribute("width"), e.imageHeight ? t.setAttribute("height", e.imageHeight) : t.removeAttribute("height"), t.className = X.image, e.imageClass && D(t, e.imageClass)) : R(t)
                        }(t),
                        function(e) {
                            var t, i, o = b(),
                                n = y(),
                                s = w();
                            if (e.showConfirmButton || e.showCancelButton ? N(o) : R(o), e.showCancelButton ? s.style.display = "inline-block" : R(s), e.showConfirmButton ? (i = "display", (t = n).style.removeProperty ? t.style.removeProperty(i) : t.style.removeAttribute(i)) : R(n), n.innerHTML = e.confirmButtonText, s.innerHTML = e.cancelButtonText, n.setAttribute("aria-label", e.confirmButtonAriaLabel), s.setAttribute("aria-label", e.cancelButtonAriaLabel), n.className = X.confirm, D(n, e.confirmButtonClass), s.className = X.cancel, D(s, e.cancelButtonClass), e.buttonsStyling) {
                                D([n, s], X.styled), e.confirmButtonColor && (n.style.backgroundColor = e.confirmButtonColor), e.cancelButtonColor && (s.style.backgroundColor = e.cancelButtonColor);
                                var r = window.getComputedStyle(n).getPropertyValue("background-color");
                                n.style.borderLeftColor = r, n.style.borderRightColor = r
                            } else q([n, s], X.styled), n.style.backgroundColor = n.style.borderLeftColor = n.style.borderRightColor = "", s.style.backgroundColor = s.style.borderLeftColor = s.style.borderRightColor = ""
                        }(t), $(t.footer, d), !0 === t.animation ? q(e, X.noanimation) : D(e, X.noanimation), t.showLoaderOnConfirm && !t.preConfirm && p("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
                }(L), Object.freeze(L), me.innerParams.set(this, L), G.timeout && (G.timeout.stop(), delete G.timeout), clearTimeout(G.restoreFocusTimeout);
                var B = {
                    popup: v(),
                    container: h(),
                    content: g(),
                    actions: b(),
                    confirmButton: y(),
                    cancelButton: w(),
                    closeButton: S(),
                    validationError: d(X.validationerror),
                    progressSteps: c()
                };
                me.domCache.set(this, B);
                var H = this.constructor;
                return new Promise(function(t, i) {
                    function o(e) {
                        H.closePopup(L.onClose, L.onAfterClose), L.useRejections ? t(e) : t({
                            value: e
                        })
                    }

                    function l(e) {
                        H.closePopup(L.onClose, L.onAfterClose), L.useRejections ? i(e) : t({
                            dismiss: e
                        })
                    }

                    function d(e) {
                        H.closePopup(L.onClose, L.onAfterClose), i(e)
                    }
                    L.timer && (G.timeout = new ke(function() {
                        l("timer"), delete G.timeout
                    }, L.timer)), L.input && setTimeout(function() {
                        var e = E.getInput();
                        e && I(e)
                    }, 0);
                    for (var c = function(t) {
                            if (L.showLoaderOnConfirm && H.showLoading(), L.preConfirm) {
                                E.resetValidationError();
                                var e = Promise.resolve().then(function() {
                                    return L.preConfirm(t, L.extraParams)
                                });
                                L.expectRejections ? e.then(function(e) {
                                    return o(e || t)
                                }, function(e) {
                                    E.hideLoading(), e && E.showValidationError(e)
                                }) : e.then(function(e) {
                                    _(B.validationError) || !1 === e ? E.hideLoading() : o(e || t)
                                }, function(e) {
                                    return d(e)
                                })
                            } else o(t)
                        }, e = function(e) {
                            var t = e.target,
                                i = B.confirmButton,
                                o = B.cancelButton,
                                n = i && (i === t || i.contains(t)),
                                s = o && (o === t || o.contains(t));
                            switch (e.type) {
                                case "click":
                                    if (n && H.isVisible())
                                        if (E.disableButtons(), L.input) {
                                            var r = function() {
                                                var e = E.getInput();
                                                if (!e) return null;
                                                switch (L.input) {
                                                    case "checkbox":
                                                        return e.checked ? 1 : 0;
                                                    case "radio":
                                                        return e.checked ? e.value : null;
                                                    case "file":
                                                        return e.files.length ? e.files[0] : null;
                                                    default:
                                                        return L.inputAutoTrim ? e.value.trim() : e.value
                                                }
                                            }();
                                            if (L.inputValidator) {
                                                E.disableInput();
                                                var a = Promise.resolve().then(function() {
                                                    return L.inputValidator(r, L.extraParams)
                                                });
                                                L.expectRejections ? a.then(function() {
                                                    E.enableButtons(), E.enableInput(), c(r)
                                                }, function(e) {
                                                    E.enableButtons(), E.enableInput(), e && E.showValidationError(e)
                                                }) : a.then(function(e) {
                                                    E.enableButtons(), E.enableInput(), e ? E.showValidationError(e) : c(r)
                                                }, function(e) {
                                                    return d(e)
                                                })
                                            } else c(r)
                                        } else c(!0);
                                    else s && H.isVisible() && (E.disableButtons(), l(H.DismissReason.cancel))
                            }
                        }, n = B.popup.querySelectorAll("button"), s = 0; s < n.length; s++) n[s].onclick = e, n[s].onmouseover = e, n[s].onmouseout = e, n[s].onmousedown = e;
                    if (B.closeButton.onclick = function() {
                            l(H.DismissReason.close)
                        }, L.toast) B.popup.onclick = function() {
                        L.showConfirmButton || L.showCancelButton || L.showCloseButton || L.input || l(H.DismissReason.close)
                    };
                    else {
                        var r = !1;
                        B.popup.onmousedown = function() {
                            B.container.onmouseup = function(e) {
                                B.container.onmouseup = void 0, e.target === B.container && (r = !0)
                            }
                        }, B.container.onmousedown = function() {
                            B.popup.onmouseup = function(e) {
                                B.popup.onmouseup = void 0, e.target !== B.popup && !B.popup.contains(e.target) || (r = !0)
                            }
                        }, B.container.onclick = function(e) {
                            r ? r = !1 : e.target === B.container && M(L.allowOutsideClick) && l(H.DismissReason.backdrop)
                        }
                    }
                    L.reverseButtons ? B.confirmButton.parentNode.insertBefore(B.cancelButton, B.confirmButton) : B.confirmButton.parentNode.insertBefore(B.confirmButton, B.cancelButton);

                    function a(e, t) {
                        for (var i = V(L.focusCancel), o = 0; o < i.length; o++) return (e += t) === i.length ? e = 0 : -1 === e && (e = i.length - 1), i[e].focus();
                        B.popup.focus()
                    }
                    G.keydownHandlerAdded && (G.keydownTarget.removeEventListener("keydown", G.keydownHandler, {
                        capture: G.keydownListenerCapture
                    }), G.keydownHandlerAdded = !1), L.toast || (G.keydownHandler = function(e) {
                        return function(e, t) {
                            if (t.stopKeydownPropagation && e.stopPropagation(), "Enter" !== e.key || e.isComposing)
                                if ("Tab" === e.key) {
                                    for (var i = e.target, o = V(t.focusCancel), n = -1, s = 0; s < o.length; s++)
                                        if (i === o[s]) {
                                            n = s;
                                            break
                                        }
                                    e.shiftKey ? a(n, -1) : a(n, 1), e.stopPropagation(), e.preventDefault()
                                } else -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(e.key) ? document.activeElement === B.confirmButton && _(B.cancelButton) ? B.cancelButton.focus() : document.activeElement === B.cancelButton && _(B.confirmButton) && B.confirmButton.focus() : "Escape" !== e.key && "Esc" !== e.key || !0 !== M(t.allowEscapeKey) || l(H.DismissReason.esc);
                            else if (e.target && E.getInput() && e.target.outerHTML === E.getInput().outerHTML) {
                                if (-1 !== ["textarea", "file"].indexOf(t.input)) return;
                                H.clickConfirm(), e.preventDefault()
                            }
                        }(e, L)
                    }, G.keydownTarget = L.keydownListenerCapture ? window : B.popup, G.keydownListenerCapture = L.keydownListenerCapture, G.keydownTarget.addEventListener("keydown", G.keydownHandler, {
                        capture: G.keydownListenerCapture
                    }), G.keydownHandlerAdded = !0), E.enableButtons(), E.hideLoading(), E.resetValidationError(), L.toast && (L.input || L.footer || L.showCloseButton) ? D(document.body, X["toast-column"]) : q(document.body, X["toast-column"]);
                    for (var p = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], u = void 0, f = 0; f < p.length; f++) {
                        var h = X[p[f]],
                            v = W(B.content, h);
                        if (u = E.getInput(p[f])) {
                            for (var g in u.attributes)
                                if (u.attributes.hasOwnProperty(g)) {
                                    var m = u.attributes[g].name;
                                    "type" !== m && "value" !== m && u.removeAttribute(m)
                                }
                            for (var y in L.inputAttributes) u.setAttribute(y, L.inputAttributes[y])
                        }
                        v.className = h, L.inputClass && D(v, L.inputClass), R(v)
                    }
                    var w = void 0;
                    switch (L.input) {
                        case "text":
                        case "email":
                        case "password":
                        case "number":
                        case "tel":
                        case "url":
                            (u = W(B.content, X.input)).value = L.inputValue, u.placeholder = L.inputPlaceholder, u.type = L.input, N(u);
                            break;
                        case "file":
                            (u = W(B.content, X.file)).placeholder = L.inputPlaceholder, u.type = L.input, N(u);
                            break;
                        case "range":
                            var b = W(B.content, X.range),
                                k = b.querySelector("input"),
                                S = b.querySelector("output");
                            k.value = L.inputValue, k.type = L.input, S.value = L.inputValue, N(b);
                            break;
                        case "select":
                            var T = W(B.content, X.select);
                            if (T.innerHTML = "", L.inputPlaceholder) {
                                var C = document.createElement("option");
                                C.innerHTML = L.inputPlaceholder, C.value = "", C.disabled = !0, C.selected = !0, T.appendChild(C)
                            }
                            w = function(e) {
                                e.forEach(function(e) {
                                    var t = e[0],
                                        i = e[1],
                                        o = document.createElement("option");
                                    o.value = t, o.innerHTML = i, L.inputValue.toString() === t.toString() && (o.selected = !0), T.appendChild(o)
                                }), N(T), T.focus()
                            };
                            break;
                        case "radio":
                            var x = W(B.content, X.radio);
                            x.innerHTML = "", w = function(e) {
                                e.forEach(function(e) {
                                    var t = e[0],
                                        i = e[1],
                                        o = document.createElement("input"),
                                        n = document.createElement("label");
                                    o.type = "radio", o.name = X.radio, o.value = t, L.inputValue.toString() === t.toString() && (o.checked = !0);
                                    var s = document.createElement("span");
                                    s.innerHTML = i, s.className = X.label, n.appendChild(o), n.appendChild(s), x.appendChild(n)
                                }), N(x);
                                var t = x.querySelectorAll("input");
                                t.length && t[0].focus()
                            };
                            break;
                        case "checkbox":
                            var $ = W(B.content, X.checkbox),
                                A = E.getInput("checkbox");
                            A.type = "checkbox", A.value = 1, A.id = X.checkbox, A.checked = Boolean(L.inputValue), $.querySelector("span").innerHTML = L.inputPlaceholder, N($);
                            break;
                        case "textarea":
                            var P = W(B.content, X.textarea);
                            P.value = L.inputValue, P.placeholder = L.inputPlaceholder, N(P);
                            break;
                        case null:
                            break;
                        default:
                            j('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + L.input + '"')
                    }
                    if ("select" === L.input || "radio" === L.input) {
                        var O = function(e) {
                            return w((t = e, i = [], "undefined" != typeof Map && t instanceof Map ? t.forEach(function(e, t) {
                                i.push([t, e])
                            }) : Object.keys(t).forEach(function(e) {
                                i.push([e, t[e]])
                            }), i));
                            var t, i
                        };
                        z(L.inputOptions) ? (H.showLoading(), L.inputOptions.then(function(e) {
                            E.hideLoading(), O(e)
                        })) : "object" === U(L.inputOptions) ? O(L.inputOptions) : j("Unexpected type of inputOptions! Expected object, Map or Promise, got " + U(L.inputOptions))
                    } else -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(L.input) && z(L.inputValue) && (H.showLoading(), R(u), L.inputValue.then(function(e) {
                        u.value = "number" === L.input ? parseFloat(e) || 0 : e + "", N(u), u.focus(), E.hideLoading()
                    }).catch(function(e) {
                        j("Error in inputValue promise: " + e), u.value = "", N(u), u.focus(), E.hideLoading()
                    }));
                    Se(L), L.toast || (M(L.allowEnterKey) ? L.focusCancel && _(B.cancelButton) ? B.cancelButton.focus() : L.focusConfirm && _(B.confirmButton) ? B.confirmButton.focus() : a(-1, 1) : document.activeElement && document.activeElement.blur()), B.container.scrollTop = 0
                })
            }
        }),
        xe = void 0;

    function $e() {
        if ("undefined" != typeof window) {
            "undefined" == typeof Promise && j("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            if (void 0 === t[0]) return j("At least 1 argument is expected!"), !1;
            xe = this;
            var o = Object.freeze(this.constructor.argsToParams(t));
            Object.defineProperties(this, {
                params: {
                    value: o,
                    writable: !1,
                    enumerable: !0
                }
            });
            var n = this._main(this.params);
            me.promise.set(this, n)
        }
    }
    $e.prototype.then = function(e, t) {
        return me.promise.get(this).then(e, t)
    }, $e.prototype.catch = function(e) {
        return me.promise.get(this).catch(e)
    }, $e.prototype.finally = function(e) {
        return me.promise.get(this).finally(e)
    }, F($e.prototype, Ce), F($e, he), Object.keys(Ce).forEach(function(t) {
        $e[t] = function() {
            var e;
            if (xe) return (e = xe)[t].apply(e, arguments)
        }
    }), $e.DismissReason = B, $e.noop = function() {}, $e.version = "7.26.11";
    var Ae, Pe, Oe = ee((e(Ee, Ae = $e), O(Ee, [{
        key: "_main",
        value: function(e) {
            return a(Ee.prototype.__proto__ || Object.getPrototypeOf(Ee.prototype), "_main", this).call(this, F({}, ue, e))
        }
    }], [{
        key: "setDefaults",
        value: function(t) {
            if (i(pe), !t || "object" !== (void 0 === t ? "undefined" : U(t))) throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");
            oe(t), Object.keys(t).forEach(function(e) {
                Ae.isValidParameter(e) && (ue[e] = t[e])
            })
        }
    }, {
        key: "resetDefaults",
        value: function() {
            i(pe), ue = {}
        }
    }]), Pe = Ee, "undefined" != typeof window && "object" === U(window._swalDefaults) && Pe.setDefaults(window._swalDefaults), Pe));

    function Ee() {
        return r(this, Ee), o(this, (Ee.__proto__ || Object.getPrototypeOf(Ee)).apply(this, arguments))
    }
    return Oe.default = Oe
}), "undefined" != typeof window && window.Sweetalert2 && (window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2);