var $storeId = $('#storeId').val();
! function(l) {
    function i(t) {
        y.hideFlash && l.each(["object", "embed"], function(e, n) {
            l(n).each(function() {
                t && (this._picbox = this.style.visibility), this.style.visibility = t ? "hidden" : this._picbox
            })
        }), O.style.display = "";
        var e = t ? "bind" : "unbind";
        l(document)[e]("keydown", n), l(document)[e]("mousewheel", h), l(document)[e]("mousemove", o), l(M)[e]("mouseover", function() {
            r(1)
        }), l(M)[e]("mouseout", r)
    }

    function n(e) {
        return e = e.keyCode, 0 <= l.inArray(e, y.closeKeys) ? f() : 0 <= l.inArray(e, y.nextKeys) ? u() : 0 <= l.inArray(e, y.previousKeys) && t()
    }

    function o() {
        s([M, F, zoomBtn, K])
    }

    function s(e, n) {
        clearTimeout(T), l(e).fadeIn(), e = n ? l.merge(e, n) : e, T = setTimeout(function() {
            l(e).fadeOut()
        }, y.controlsFadeDelay)
    }

    function r(e) {
        e = 1 == e ? "unbind" : "bind", l(document)[e]("mousemove", o), clearTimeout(T)
    }

    function t() {
        return a(b, !0)
    }

    function u() {
        return a(w, !0)
    }

    function a(e, n) {
        return 0 <= e && (g = v[S = e][0], b = (S || (y.loop ? v.length : 0)) - 1, w = (S + 1) % v.length || (y.loop ? 0 : -1), p(), O.className = "pbLoading", l(E).css("display", "none"), v[S][1] ? l(N).html(v[S][1]).show() : l(N).html("").hide(), l(j).html((1 < v.length && y.counterText || "").replace(/{x}/, S + 1).replace(/{y}/, v.length)), 0 <= b && (Y.src = v[b][0], l(F).removeClass(P)), 0 <= w && (_.src = v[w][0], l(K).removeClass(P)), (Q = new Image).onload = function() {
            ! function(e) {
                d();
                var n = X.width() - y.margins,
                    t = X.height() - y.margins,
                    i = 1;
                I = Q.width > n || Q.height > t ? (i = Math.min(n / Q.width, t / Q.height), l(zoomBtn).removeClass(P), !1) : (l(zoomBtn).addClass(P), !0);
                D = L = i, c(i, e), l(E).attr("src", g), l(E).css("display", ""), O.className = "", s([M], [F, zoomBtn, K])
            }(n)
        }, Q.src = g), !1
    }

    function c(e, n) {
        var t = e / D;
        k = z - (z - k) * t, C = B - (B - C) * t, D = e, t = Q.width * e;
        var i = Q.height * e,
            o = k - t / 2 >> 0,
            s = C - i / 2 >> 0;
        return n = n ? 0 : y.resizeDuration, e = 0 == e ? function() {
            l(E).hide()
        } : function() {}, l(E).animate({
            width: t,
            height: i,
            top: s,
            left: o
        }, {
            queue: !1,
            duration: n,
            easing: y.resizeEasing,
            complete: e
        }), !1
    }

    function d() {
        k = z, C = B
    }

    function h(e, n) {
        return l(zoomBtn).addClass(H), c(D + n * D / 10)
    }

    function e() {
        return D != L || k != z || C != B || I ? (l(zoomBtn).removeClass(H), d(), c(L)) : (l(zoomBtn).addClass(H), c(1))
    }

    function p() {
        Q.onload = function() {}, Q.src = Y.src = _.src = g, l(E).stop(), l([F, K]).addClass(P), l(zoomBtn).removeClass(H)
    }

    function f() {
        return 0 <= S && (p(), S = b = w = -1, c(0), i(), l(M).stop().hide(), l(O).stop().fadeOut()), !1
    }

    function m(e) {
        var n = [].slice.call(arguments, 1),
            t = 0;
        return (e = l.event.fix(e || window.event)).type = "mousewheel", e.wheelDelta && (t = e.wheelDelta / 120), e.detail && (t = -e.detail / 3), n.unshift(e, t), l.event.handle.apply(this, n)
    }
    var y, v, g, b, w, x, z, B, k, C, D, L, T, I, O, A, E, F, K, M, N, j, X = l(window),
        S = -1,
        q = null == window.XMLHttpRequest && null != ActiveXObject,
        Q = {},
        Y = new Image,
        _ = new Image,
        H = "pbzoomed",
        P = "pbgreyed";
    l(document).ready(function() {
        l(document.body).append(l([O = l('<div id="pbOverlay" />').click(f).append(A = l('<div id="pbCloseBtn" />')[0])[0], E = l('<img id="pbImage" />').dblclick(e)[0], M = l('<div id="pbBottom" />').append([N = l('<div id="pbCaption" />')[0], l('<div id="pbNav" />').append([F = l('<a id="pbPrevBtn" href="#" />').click(t)[0], zoomBtn = l('<a id="pbZoomBtn" href="#" />').click(e)[0], K = l('<a id="pbNextBtn" href="#" />').click(u)[0]])[0], j = l('<div id="pbNumber" />')[0]])[0]]).css("display", "none")), (x = q || O.currentStyle && "fixed" != O.currentStyle.position) && l([O, A, E, M]).css("position", "absolute"), l(E).tinyDrag(function() {
            var e = l(E),
                n = e.position();
            k = n.left - X.scrollLeft() + e.width() / 2, C = n.top - X.scrollTop() + e.height() / 2, l(zoomBtn).addClass(H)
        })
    }), l.picbox = function(e, n, t) {
        return y = l.extend({
                loop: !1,
                overlayOpacity: 1,
                overlayFadeDuration: 200,
                resizeDuration: 300,
                resizeEasing: "swing",
                controlsFadeDelay: 3e3,
                counterText: !1,
                hideFlash: !0,
                closeKeys: [27, 88, 67],
                previousKeys: [37, 80],
                nextKeys: [39, 78],
                margins: 0
            }, t || {}), "string" == typeof e && (e = [
                [e, n]
            ], n = 0), l(O).css("opacity", 0).fadeTo(y.overlayFadeDuration, y.overlayOpacity), l(M).css("display", ""), o(),
            function() {
                var e = {
                    x: X.scrollLeft(),
                    y: X.scrollTop()
                };
                z = X.width() / 2, B = X.height() / 2, x && (z += e.x, B += e.y, l(O).css({
                    left: e.x,
                    top: e.y,
                    width: X.width(),
                    height: X.height()
                })), l(E).css({
                    top: B,
                    left: z,
                    width: "1px",
                    height: "1px"
                })
            }(), i(1), v = e, y.loop = y.loop && 1 < v.length, a(n)
    }, l.fn.picbox = function(i, o, s) {
        o = o || function(e) {
            return [e.href, e.title]
        }, s = s || function() {
            return !0
        };
        var r = this;
        return l(r).unbind("click").click(function() {
            var n = this,
                e = [];
            if (in_array($storeId, [66554])) {
                showButton();
            }
            filteredLinks = l.grep(r, function(e) {
                return s.call(n, e)
            });
            for (var t = 0; t < filteredLinks.length; t++) e[t] = o(filteredLinks[t]);
            return l.picbox(e, l.inArray(this, filteredLinks), i)
        }), r
    }, l.fn.tinyDrag = function(e) {
        return l.tinyDrag(this, e)
    }, l.tinyDrag = function(t, e) {
        function n(e) {
            var n = e.pageX;
            return e = e.pageY, r ? t.css({
                left: s.x + (n - o.x),
                top: s.y + (e - o.y)
            }) : (1 < a(n - o.x) || 1 < a(e - o.y)) && (r = !0), !1
        }

        function i() {
            u.unbind("mousemove", n).unbind("mouseup"), r && e && e()
        }
        var o, s, r, u = l(document),
            a = Math.abs;
        return t.mousedown(function(e) {
            return r = !1, o = {
                x: e.pageX,
                y: e.pageY
            }, s = {
                x: parseInt(t.css("left")),
                y: parseInt(t.css("top"))
            }, u.mousemove(n).mouseup(i), !1
        }), t
    };
    var R = ["DOMMouseScroll", "mousewheel"];
    l.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = R.length; e;) this.addEventListener(R[--e], m, !1);
            else this.onmousewheel = m
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = R.length; e;) this.removeEventListener(R[--e], m, !1);
            else this.onmousewheel = null
        }
    }, l.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery), /android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent) || jQuery(function(e) {
    e("a[rel^='lightbox']").picbox({}, null, function(e) {
        return this == e || 8 < this.rel.length && this.rel == e.rel
    })
});

function showButton() {
    $('.btn-closePlugin').fadeIn();
}