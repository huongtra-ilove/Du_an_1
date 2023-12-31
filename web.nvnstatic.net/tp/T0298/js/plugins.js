/* flickity */ ! function(e, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(h, s, c) {
        (c = c || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function(t) {
            c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t))
        }), c.fn[h] = function(t) {
            return "string" != typeof t ? (function(t, n) {
                t.each(function(t, e) {
                    var i = c.data(e, h);
                    i ? (i.option(n), i._init()) : (i = new s(e, n), c.data(e, h, i))
                })
            }(this, t), this) : function(t, o, r) {
                var a, l = "$()." + h + '("' + o + '")';
                return t.each(function(t, e) {
                    var i = c.data(e, h);
                    if (i) {
                        var n = i[o];
                        if (n && "_" != o.charAt(0)) {
                            var s = n.apply(i, r);
                            a = void 0 === a ? s : a
                        } else d(l + " is not a valid method")
                    } else d(h + " not initialized. Cannot call methods, i.e. " + l)
                }), void 0 !== a ? a : t
            }(this, t, o.call(arguments, 1))
        }, n(c))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        s = t.console,
        d = void 0 === s ? function() {} : function(t) {
            s.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s];
                n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function m(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }

    function y(t) {
        var e = getComputedStyle(t);
        return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function b(t) {
        if (function() {
                if (!C) {
                    C = !0;
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                    var e = document.body || document.documentElement;
                    e.appendChild(t);
                    var i = y(t);
                    b.isBoxSizeOuter = E = 200 == m(i.width), e.removeChild(t)
                }
            }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var e = y(t);
            if ("none" == e.display) return function() {
                for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < x; e++) {
                    t[S[e]] = 0
                }
                return t
            }();
            var i = {};
            i.width = t.offsetWidth, i.height = t.offsetHeight;
            for (var n = i.isBorderBox = "border-box" == e.boxSizing, s = 0; s < x; s++) {
                var o = S[s],
                    r = e[o],
                    a = parseFloat(r);
                i[o] = isNaN(a) ? 0 : a
            }
            var l = i.paddingLeft + i.paddingRight,
                h = i.paddingTop + i.paddingBottom,
                c = i.marginLeft + i.marginRight,
                d = i.marginTop + i.marginBottom,
                u = i.borderLeftWidth + i.borderRightWidth,
                f = i.borderTopWidth + i.borderBottomWidth,
                p = n && E,
                g = m(e.width);
            !1 !== g && (i.width = g + (p ? 0 : l + u));
            var v = m(e.height);
            return !1 !== v && (i.height = v + (p ? 0 : h + f)), i.innerWidth = i.width - (l + u), i.innerHeight = i.height - (h + f), i.outerWidth = i.width + c, i.outerHeight = i.height + d, i
        }
    }
    var E, i = "undefined" == typeof console ? function() {} : function(t) {
            console.error(t)
        },
        S = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        x = S.length,
        C = !1;
    return b
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var i = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(t, e) {
        return t[i](e)
    }
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector)
}(window, function(h, o) {
    var c = {
            extend: function(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            }
        },
        e = Array.prototype.slice;
    c.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t]
    }, c.removeFrom = function(t, e) {
        var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, c.getParent = function(t, e) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, o(t, e)) return t
    }, c.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, c.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, c.filterFindElements = function(t, n) {
        t = c.makeArray(t);
        var s = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void s.push(t);
                o(t, n) && s.push(t);
                for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++) s.push(e[i])
            }
        }), s
    }, c.debounceMethod = function(t, e, n) {
        n = n || 100;
        var s = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            clearTimeout(t);
            var e = arguments,
                i = this;
            this[o] = setTimeout(function() {
                s.apply(i, e), delete i[o]
            }, n)
        }
    }, c.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, c.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var d = h.console;
    return c.htmlInit = function(a, l) {
        c.docReady(function() {
            var t = c.toDashed(l),
                s = "data-" + t,
                e = document.querySelectorAll("[" + s + "]"),
                i = document.querySelectorAll(".js-" + t),
                n = c.makeArray(e).concat(c.makeArray(i)),
                o = s + "-options",
                r = h.jQuery;
            n.forEach(function(e) {
                var t, i = e.getAttribute(s) || e.getAttribute(o);
                try {
                    t = i && JSON.parse(i)
                } catch (t) {
                    return void(d && d.error("Error parsing " + s + " on " + e.className + ": " + t))
                }
                var n = new a(e, t);
                r && r.data(e, l, n)
            })
        })
    }, c
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = i(e, e.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute", this.element.setAttribute("aria-selected", "false"), this.x = 0, this.shift = 0
    }, n.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.removeAttribute("aria-selected"), this.element.style[t] = ""
    }, n.getSize = function() {
        this.size = e(this.element)
    }, n.setPosition = function(t) {
        this.x = t, this.updateTarget(), this.renderPosition(t)
    }, n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, n.wrapShift = function(t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, function() {
    "use strict";

    function t(t) {
        this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }, e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
            e = this.getLastCell(),
            i = e ? e.size[t] : 0,
            n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }, e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, e.select = function() {
        this.changeSelected(!0)
    }, e.unselect = function() {
        this.changeSelected(!1)
    }, e.changeSelected = function(e) {
        var i = e ? "add" : "remove";
        this.cells.forEach(function(t) {
            t.element.classList[i]("is-selected"), t.element.setAttribute("aria-selected", e.toString())
        })
    }, e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = i(e, e.fizzyUIUtils))
}(window, function(t, o) {
    var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
        s = 0;
    i = i || function(t) {
        var e = (new Date).getTime(),
            i = Math.max(0, 16 - (e - s)),
            n = setTimeout(t, i);
        return s = e + i, n
    };
    var e = {
            startAnimation: function() {
                this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
            },
            animate: function() {
                this.applyDragForce(), this.applySelectedAttraction();
                var t = this.x;
                if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
                    var e = this;
                    i(function() {
                        e.animate()
                    })
                }
            }
        },
        r = "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform";
    return e.positionSlider = function() {
        var t = this.x;
        this.options.wrapAround && 1 < this.cells.length && (t = o.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && r ? -t : t;
        var e = this.getPositionValue(t);
        this.slider.style[r] = this.isAnimating ? "translate3d(" + e + ",0,0)" : "translateX(" + e + ")";
        var i = this.slides[0];
        if (i) {
            var n = -this.x - i.target,
                s = n / this.slidesWidth;
            this.dispatchEvent("scroll", null, [s, n])
        }
    }, e.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
    }, e.getPositionValue = function(t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, e.settle = function(t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
    }, e.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }, e._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n],
                o = 0 < e ? i : 0;
            s.wrapShift(o), e -= s.size.outerWidth
        }
    }, e._unshiftCells = function(t) {
        if (t && t.length)
            for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
    }, e.integratePhysics = function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, e.applyForce = function(t) {
        this.velocity += t
    }, e.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, e.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, e.applyDragForce = function() {
        if (this.isDraggable && this.isPointerDown) {
            var t = this.dragX - this.x - this.velocity;
            this.applyForce(t)
        }
    }, e.applySelectedAttraction = function() {
        if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
            var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
            this.applyForce(t)
        }
    }, e
}),
function(r, a) {
    if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(t, e, i, n, s, o) {
        return a(r, t, e, i, n, s, o)
    });
    else if ("object" == typeof module && module.exports) module.exports = a(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var t = r.Flickity;
        r.Flickity = a(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype)
    }
}(window, function(n, t, e, a, i, r, s) {
    function o(t, e) {
        for (t = a.makeArray(t); t.length;) e.appendChild(t.shift())
    }

    function l(t, e) {
        var i = a.getQueryElement(t);
        if (i) {
            if (this.element = i, this.element.flickityGUID) {
                var n = f[this.element.flickityGUID];
                return n.option(e), n
            }
            h && (this.$element = h(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(e), this._create()
        } else d && d.error("Bad element for Flickity: " + (i || t))
    }
    var h = n.jQuery,
        c = n.getComputedStyle,
        d = n.console,
        u = 0,
        f = {};
    l.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, l.createMethods = [];
    var p = l.prototype;
    a.extend(p, t.prototype), p._create = function() {
        var t = this.guid = ++u;
        for (var e in this.element.flickityGUID = t, (f[t] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this), this.options.on) {
            var i = this.options.on[e];
            this.on(e, i)
        }
        l.createMethods.forEach(function(t) {
            this[t]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, p.option = function(t) {
        a.extend(this.options, t)
    }, p.activate = function() {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), o(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var t, e = this.options.initialIndex;
            t = this.isInitActivated ? this.selectedIndex : void 0 !== e && this.cells[e] ? e : 0, this.select(t, !1, !0), this.isInitActivated = !0, this.dispatchEvent("ready")
        }
    }, p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, p._filterFindCellElements = function(t) {
        return a.filterFindElements(t, this.options.cellSelector)
    }, p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, p._makeCells = function(t) {
        return this._filterFindCellElements(t).map(function(t) {
            return new i(t, this)
        }, this)
    }, p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }, p.positionCells = function() {
        this._sizeCells(this.cells), this._positionCells(0)
    }, p._positionCells = function(t) {
        t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;
        var e = 0;
        if (0 < t) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
            var o = this.cells[s];
            o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }, p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }, p.updateSlides = function() {
        if (this.slides = [], this.cells.length) {
            var n = new r(this);
            this.slides.push(n);
            var s = "left" == this.originSide ? "marginRight" : "marginLeft",
                o = this._getCanCellFit();
            this.cells.forEach(function(t, e) {
                if (n.cells.length) {
                    var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
                    o.call(this, e, i) || (n.updateTarget(), n = new r(this), this.slides.push(n)), n.addCell(t)
                } else n.addCell(t)
            }, this), n.updateTarget(), this.updateSelectedSlide()
        }
    }, p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t) return function() {
            return !1
        };
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e != 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
            n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }, p._init = p.reposition = function() {
        this.positionCells(), this.positionSliderAtSelected()
    }, p.getSize = function() {
        this.size = e(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var g = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }, p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition,
                e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, p._getGapCells = function(t, e, i) {
        for (var n = []; 0 < t;) {
            var s = this.cells[e];
            if (!s) break;
            n.push(s), e += i, t -= s.size.outerWidth
        }
        return n
    }, p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft,
                e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight",
                n = this.slideableWidth - this.getLastCell().size[i],
                s = n < this.size.innerWidth,
                o = this.cursorPosition + this.cells[0].size[e],
                r = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r))
            }, this)
        }
    }, p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), h && this.$element) {
            var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            if (e) {
                var o = h.Event(e);
                o.type = t, s = o
            }
            this.$element.trigger(s, i)
        }
    }, p.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = a.modulo(t, this.slides.length)), this.slides[t])) {
            var n = this.selectedIndex;
            this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != n && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect")
        }
    }, p._wrapSelect = function(t) {
        var e = this.slides.length;
        if (!(this.options.wrapAround && 1 < e)) return t;
        var i = a.modulo(t, e),
            n = Math.abs(i - this.selectedIndex),
            s = Math.abs(i + e - this.selectedIndex),
            o = Math.abs(i - e - this.selectedIndex);
        !this.isDragSelect && s < n ? t += e : !this.isDragSelect && o < n && (t -= e), t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth)
    }, p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }, p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }, p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(), (this.selectedSlide = t).select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
    }, p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }, p.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (n) {
            var s = this.getCellSlideIndex(n);
            this.select(s, e, i)
        }
    }, p.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            if (-1 != this.slides[e].cells.indexOf(t)) return e
        }
    }, p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) return i
        }
    }, p.getCells = function(t) {
        t = a.makeArray(t);
        var i = [];
        return t.forEach(function(t) {
            var e = this.getCell(t);
            e && i.push(e)
        }, this), i
    }, p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e || (t = a.getParent(t, ".flickity-slider > *"), this.getCell(t))
    }, p.getAdjacentCellElements = function(t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (i <= 1 + 2 * t) return this.getCellElements();
        for (var n = [], s = e - t; s <= e + t; s++) {
            var o = this.options.wrapAround ? a.modulo(s, i) : s,
                r = this.slides[o];
            r && (n = n.concat(r.getCellElements()))
        }
        return n
    }, p.queryCell = function(t) {
        return "number" == typeof t ? this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)), this.getCell(t))
    }, p.uiChange = function() {
        this.emitEvent("uiChange")
    }, p.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }, p.onresize = function() {
        this.watchCSS(), this.resize()
    }, a.debounceMethod(l, "onresize", 150), p.resize = function() {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }, p.watchCSS = function() {
        this.options.watchCSS && (-1 != c(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
    }, p.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = l.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }, l.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[t]()
        }
    }, p.focus = function() {
        var t = n.pageYOffset;
        this.element.focus(), n.pageYOffset != t && n.scrollTo(n.pageXOffset, t)
    }, p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function(t) {
            t.destroy()
        }), this.element.removeChild(this.viewport), o(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, p.destroy = function() {
        this.deactivate(), n.removeEventListener("resize", this), this.emitEvent("destroy"), h && this.$element && h.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
    }, a.extend(p, s), l.data = function(t) {
        var e = (t = a.getQueryElement(t)) && t.flickityGUID;
        return e && f[e]
    }, a.htmlInit(l, "flickity"), h && h.bridget && h.bridget("flickity", l), l.setJQuery = function(t) {
        h = t
    }, l.Cell = i, l
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter)
}(window, function(n, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }, i.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }, i._bindStartEvent = function(t, e) {
        var i = (e = void 0 === e || !!e) ? "addEventListener" : "removeEventListener";
        n.PointerEvent ? t[i]("pointerdown", this) : (t[i]("mousedown", this), t[i]("touchstart", this))
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) return i
        }
    }, i.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }, i.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }, i.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }, i._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
    }, i.pointerDown = function(t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    };
    var s = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return i._bindPostStartEvents = function(t) {
        if (t) {
            var e = s[t.type];
            e.forEach(function(t) {
                n.addEventListener(t, this)
            }, this), this._boundPointerEvents = e
        }
    }, i._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
            n.removeEventListener(t, this)
        }, this), delete this._boundPointerEvents)
    }, i.onmousemove = function(t) {
        this._pointerMove(t, t)
    }, i.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, i.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }, i._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }, i.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }, i.onmouseup = function(t) {
        this._pointerUp(t, t)
    }, i.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, i.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }, i._pointerUp = function(t, e) {
        this._pointerDone(), this.pointerUp(t, e)
    }, i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }, i._pointerDone = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
    }, i.pointerDone = function() {}, i.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, i.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }, i._pointerCancel = function(t, e) {
        this._pointerDone(), this.pointerCancel(t, e)
    }, i.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }, e.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }, e
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer)
}(window, function(s, o) {
    function t() {}
    var e = t.prototype = Object.create(o.prototype);
    return e.bindHandles = function() {
        this._bindHandles(!0)
    }, e.unbindHandles = function() {
        this._bindHandles(!1)
    }, e._bindHandles = function(t) {
        for (var e = (t = void 0 === t || !!t) ? "addEventListener" : "removeEventListener", i = 0; i < this.handles.length; i++) {
            var n = this.handles[i];
            this._bindStartEvent(n, t), n[e]("click", this), s.PointerEvent && (n.style.touchAction = t ? this._touchActionValue : "")
        }
    }, e._touchActionValue = "none", e.pointerDown = function(t, e) {
        if ("INPUT" == t.target.nodeName && "range" == t.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(t, e);
        var i = document.activeElement;
        i && i.blur && i.blur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    }, e._dragPointerDown = function(t, e) {
        this.pointerDownPoint = o.getPointerPoint(e), this.canPreventDefaultOnPointerDown(t, e) && t.preventDefault()
    }, e.canPreventDefaultOnPointerDown = function(t) {
        return "SELECT" != t.target.nodeName
    }, e.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
    }, e._dragPointerMove = function(t, e) {
        var i = o.getPointerPoint(e),
            n = {
                x: i.x - this.pointerDownPoint.x,
                y: i.y - this.pointerDownPoint.y
            };
        return !this.isDragging && this.hasDragStarted(n) && this._dragStart(t, e), n
    }, e.hasDragStarted = function(t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }, e.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
    }, e._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }, e._dragStart = function(t, e) {
        this.isDragging = !0, this.dragStartPoint = o.getPointerPoint(e), this.isPreventingClicks = !0, this.dragStart(t, e)
    }, e.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }, e._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }, e.dragMove = function(t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
    }, e._dragEnd = function(t, e) {
        this.isDragging = !1, setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, e)
    }, e.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }, e.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }, e._staticClick = function(t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = t.target.nodeName;
            "INPUT" != i && "TEXTAREA" != i || t.target.focus(), this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                delete this.isIgnoringMouseUp
            }.bind(this), 400))
        }
    }, e.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }, t.getPointerPoint = o.getPointerPoint, t
}),
function(n, s) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(t, e, i) {
        return s(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils)
}(window, function(n, t, e, a) {
    function i(t) {
        var e = "touchstart" == t.type,
            i = "touch" == t.pointerType,
            n = d[t.target.nodeName];
        return e || i || n
    }

    function s() {
        return {
            x: n.pageXOffset,
            y: n.pageYOffset
        }
    }
    a.extend(t.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }), t.createMethods.push("_createDrag");
    var o = t.prototype;
    a.extend(o, e.prototype), o._touchActionValue = "pan-y";
    var r = "createTouch" in document,
        l = !1;
    o._createDrag = function() {
        this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), this.on("cellChange", this.updateDraggable), r && !l && (n.addEventListener("touchmove", function() {}), l = !0)
    }, o.onActivateDrag = function() {
        this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
    }, o.onDeactivateDrag = function() {
        this.unbindHandles(), this.element.classList.remove("is-draggable")
    }, o.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }, o.bindDrag = function() {
        this.options.draggable = !0, this.updateDraggable()
    }, o.unbindDrag = function() {
        this.options.draggable = !1, this.updateDraggable()
    }, o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }, o._childUIPointerDownDrag = function(t) {
        this.isDraggable && (t.preventDefault(), this.pointerDownFocus(t))
    };
    var h = {
            TEXTAREA: !0,
            INPUT: !0,
            OPTION: !0
        },
        c = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
    o.pointerDown = function(t, e) {
        if (this.isDraggable) {
            if (h[t.target.nodeName] && !c[t.target.type]) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            var i = document.activeElement;
            i && i.blur && i != this.element && i != document.body && i.blur(), this.pointerDownFocus(t), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = s(), n.addEventListener("scroll", this), this._pointerDownDefault(t, e)
        } else this._pointerDownDefault(t, e)
    }, o._pointerDownDefault = function(t, e) {
        this._dragPointerDown(t, e), this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e])
    }, o.pointerDownFocus = function(t) {
        i(t) || this.focus()
    };
    var d = {
        INPUT: !0,
        SELECT: !0
    };
    return o.canPreventDefaultOnPointerDown = function(t) {
        var e = i(t);
        return this.isDraggable && !e
    }, o.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }, o.pointerUp = function(t, e) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
    }, o.pointerDone = function() {
        n.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, o.dragStart = function(t, e) {
        this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), n.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [e]))
    }, o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
    }, o.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(), this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var s = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                s = o < s ? .5 * (s + o) : s;
                var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                s = s < r ? .5 * (s + r) : s
            }
            this.dragX = s, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
        }
    }, o.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
        }
    }, o.dragEndRestingSelect = function() {
        var t = this.getRestingPosition(),
            e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
            i = this._getClosestResting(t, e, 1),
            n = this._getClosestResting(t, e, -1);
        return i.distance < n.distance ? i.index : n.index
    }, o._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
                return t <= e
            } : function(t, e) {
                return t < e
            }; o(e, s) && (n += i, s = e, null !== (e = this.getSlideDistance(-t, n)));) e = Math.abs(e);
        return {
            distance: s,
            index: n - i
        }
    }, o.getSlideDistance = function(t, e) {
        var i = this.slides.length,
            n = this.options.wrapAround && 1 < i,
            s = n ? a.modulo(e, i) : e,
            o = this.slides[s];
        if (!o) return null;
        var r = n ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (o.target + r)
    }, o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime) return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
            e = this.previousDragX - this.dragX;
        return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0
    }, o.staticClick = function(t, e) {
        var i = this.getParentCell(t.target),
            n = i && i.element,
            s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    }, o.onscroll = function() {
        var t = s(),
            e = this.pointerDownScroll.x - t.x,
            i = this.pointerDownScroll.y - t.y;
        (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone()
    }, t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.TapListener = i(e, e.Unipointer)
}(window, function(a, l) {
    function t(t) {
        this.bindTap(t)
    }
    var e = t.prototype = Object.create(l.prototype);
    return e.bindTap = function(t) {
        t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
    }, e.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, e.pointerUp = function(t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = l.getPointerPoint(e),
                n = this.tapElement.getBoundingClientRect(),
                s = a.pageXOffset,
                o = a.pageYOffset;
            if (i.x >= n.left + s && i.x <= n.right + s && i.y >= n.top + o && i.y <= n.bottom + o && this.emitEvent("tap", [t, e]), "mouseup" != t.type) {
                this.isIgnoringMouseUp = !0;
                var r = this;
                setTimeout(function() {
                    delete r.isIgnoringMouseUp
                }, 400)
            }
        }
    }, e.destroy = function() {
        this.pointerDone(), this.unbindTap()
    }, t
}),
function(n, s) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(t, e, i) {
        return s(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.TapListener, n.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";

    function s(t, e) {
        this.direction = t, this.parent = e, this._create()
    }
    var o = "http://www.w3.org/2000/svg";
    (s.prototype = Object.create(i.prototype))._create = function() {
        this.isEnabled = !0, this.isPrevious = -1 == this.direction;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, s.prototype.createSVG = function() {
        var t = document.createElementNS(o, "svg");
        t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(o, "path"),
            i = function(t) {
                return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
            }(this.parent.options.arrowShape);
        return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
    }, s.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, s.prototype.handleEvent = n.handleEvent, s.prototype.onclick = function() {
        var t = document.activeElement;
        t && t == this.element && this.onTap()
    }, s.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, s.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, s.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < t.length) this.enable();
        else {
            var e = t.length ? t.length - 1 : 0,
                i = this.isPrevious ? 0 : e;
            this[this.parent.selectedIndex == i ? "disable" : "enable"]()
        }
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }), e.createMethods.push("_createPrevNextButtons");
    var r = e.prototype;
    return r._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new s(-1, this), this.nextButton = new s(1, this), this.on("activate", this.activatePrevNextButtons))
    }, r.activatePrevNextButtons = function() {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, r.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, e.PrevNextButton = s, e
}),
function(n, s) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(t, e, i) {
        return s(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.TapListener, n.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s(t) {
        this.parent = t, this._create()
    }(s.prototype = new i)._create = function() {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
    }, s.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }, s.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
            var r = document.createElement("li");
            r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r)
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, s.prototype.removeDots = function(t) {
        this.dots.splice(this.dots.length - t, t).forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }, s.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
    }, s.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, e.PageDots = s, n.extend(e.defaults, {
        pageDots: !0
    }), e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return o._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, o.activatePageDots = function() {
        this.pageDots.activate()
    }, o.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }, o.updatePageDots = function() {
        this.pageDots.setDots()
    }, o.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }, e.PageDots = s, e
}),
function(t, n) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, e, i) {
        return n(t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t, this.state = "stopped", o && (this.onVisibilityChange = function() {
            this.visibilityChange()
        }.bind(this), this.onVisibilityPlay = function() {
            this.visibilityPlay()
        }.bind(this))
    }
    var s, o;
    "hidden" in document ? (s = "hidden", o = "visibilitychange") : "webkitHidden" in document && (s = "webkitHidden", o = "webkitvisibilitychange"), (n.prototype = Object.create(t.prototype)).play = function() {
        if ("playing" != this.state) {
            var t = document[s];
            if (o && t) return void document.addEventListener(o, this.onVisibilityPlay);
            this.state = "playing", o && document.addEventListener(o, this.onVisibilityChange), this.tick()
        }
    }, n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(), this.timeout = setTimeout(function() {
                e.parent.next(!0), e.tick()
            }, t)
        }
    }, n.prototype.stop = function() {
        this.state = "stopped", this.clear(), o && document.removeEventListener(o, this.onVisibilityChange)
    }, n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }, n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused", this.clear())
    }, n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }, n.prototype.visibilityChange = function() {
        this[document[s] ? "pause" : "unpause"]()
    }, n.prototype.visibilityPlay = function() {
        this.play(), document.removeEventListener(o, this.onVisibilityPlay)
    }, e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }), i.createMethods.push("_createPlayer");
    var r = i.prototype;
    return r._createPlayer = function() {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, r.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, r.playPlayer = function() {
        this.player.play()
    }, r.stopPlayer = function() {
        this.player.stop()
    }, r.pausePlayer = function() {
        this.player.pause()
    }, r.unpausePlayer = function() {
        this.player.unpause()
    }, r.deactivatePlayer = function() {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, r.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, r.onmouseleave = function() {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, i.Player = n, i
}),
function(i, n) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, n) {
    var i = e.prototype;
    return i.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var n = this.cells.length;
            e = void 0 === e ? n : e;
            var s = function(t) {
                    var e = document.createDocumentFragment();
                    return t.forEach(function(t) {
                        e.appendChild(t.element)
                    }), e
                }(i),
                o = e == n;
            if (o) this.slider.appendChild(s);
            else {
                var r = this.cells[e].element;
                this.slider.insertBefore(s, r)
            }
            if (0 === e) this.cells = i.concat(this.cells);
            else if (o) this.cells = this.cells.concat(i);
            else {
                var a = this.cells.splice(e, n - e);
                this.cells = this.cells.concat(i).concat(a)
            }
            this._sizeCells(i), this.cellChange(e, !0)
        }
    }, i.append = function(t) {
        this.insert(t, this.cells.length)
    }, i.prepend = function(t) {
        this.insert(t, 0)
    }, i.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var i = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                i = Math.min(e, i), n.removeFrom(this.cells, t)
            }, this), this.cellChange(i, !0)
        }
    }, i.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }, i.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected()
    }, e
}),
function(i, n) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, o) {
    "use strict";

    function s(t, e) {
        this.img = t, this.flickity = e, this.load()
    }
    e.createMethods.push("_createLazyload");
    var i = e.prototype;
    return i._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }, i.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0,
                i = this.getAdjacentCellElements(e),
                n = [];
            i.forEach(function(t) {
                var e = function(t) {
                    if ("IMG" == t.nodeName) {
                        var e = t.getAttribute("data-flickity-lazyload"),
                            i = t.getAttribute("data-flickity-lazyload-src"),
                            n = t.getAttribute("data-flickity-lazyload-srcset");
                        if (e || i || n) return [t]
                    }
                    var s = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                    return o.makeArray(s)
                }(t);
                n = n.concat(e)
            }), n.forEach(function(t) {
                new s(t, this)
            }, this)
        }
    }, s.prototype.handleEvent = o.handleEvent, s.prototype.load = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
            e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
    }, s.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }, s.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }, s.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
            n = i && i.element;
        this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
    }, e.LazyLoader = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(n, s) {
    n.createMethods.push("_createAsNavFor");
    var t = n.prototype;
    return t._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }, t.setNavCompanion = function(t) {
        t = s.getQueryElement(t);
        var e = n.data(t);
        if (e && e != this) {
            this.navCompanion = e;
            var i = this;
            this.onNavCompanionSelect = function() {
                i.navCompanionSelect()
            }, e.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, t.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0],
                i = this.navCompanion.cells.indexOf(e),
                n = i + this.navCompanion.selectedCells.length - 1,
                s = Math.floor(function(t, e, i) {
                    return (e - t) * i + t
                }(i, n, this.navCompanion.cellAlign));
            if (this.selectCell(s, !1, t), this.removeNavSelectedElements(), !(s >= this.cells.length)) {
                var o = this.cells.slice(i, 1 + n);
                this.navSelectedElements = o.map(function(t) {
                    return t.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, t.changeNavSelectedClass = function(e) {
        this.navSelectedElements.forEach(function(t) {
            t.classList[e]("is-nav-selected")
        })
    }, t.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }, t.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, t.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }, t.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }, t.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, n
}),
function(e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function s(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function o(t, e, i) {
        if (!(this instanceof o)) return new o(t, e, i);
        var n = t;
        return "string" == typeof t && (n = document.querySelectorAll(t)), n ? (this.elements = function(t) {
            return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? l.call(t) : [t]
        }(n), this.options = s({}, this.options), "function" == typeof e ? i = e : s(this.options, e), i && this.on("always", i), this.getImages(), r && (this.jqDeferred = new r.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (n || t))
    }

    function i(t) {
        this.img = t
    }

    function n(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var r = e.jQuery,
        a = e.console,
        l = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)).options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && h[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var s = i[n];
                this.addImage(s)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var r = o[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var h = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var s = n && n[2];
                s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new i(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new n(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(t, e, i) {
            setTimeout(function() {
                n.progress(t, e, i)
            })
        }
        var n = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, (i.prototype = Object.create(t.prototype)).check = function() {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, i.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, i.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, i.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, i.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, i.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, (n.prototype = Object.create(i.prototype)).check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, n.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, n.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(t) {
        (t = t || e.jQuery) && ((r = t).fn.imagesLoaded = function(t, e) {
            return new o(this, t, e).jqDeferred.promise(r(this))
        })
    }, o.makeJQueryPlugin(), o
}),
function(i, n) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("flickity"), require("imagesloaded")) : i.Flickity = n(i, i.Flickity, i.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }, n.imagesLoaded = function() {
        if (this.options.imagesLoaded) {
            var n = this;
            i(this.slider).on("progress", function(t, e) {
                var i = n.getParentCell(e.img);
                n.cellSizeChange(i && i.element), n.options.freeScroll || n.positionSliderAtSelected()
            })
        }
    }, e
});

/* Carousel */
! function(h, l, o, a) {
    function i(t, e) {
        this.settings = null, this.options = h.extend({}, i.Defaults, e), this.$element = h(t), this.drag = h.extend({}, s), this.state = h.extend({}, n), this.e = h.extend({}, r), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], h.each(i.Plugins, h.proxy(function(t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)), h.each(i.Pipe, h.proxy(function(t, e) {
            this._pipe.push({
                filter: e.filter,
                run: h.proxy(e.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function c(t) {
        if (t.touches !== a) return {
            x: t.touches[0].pageX,
            y: t.touches[0].pageY
        };
        if (t.touches === a) {
            if (t.pageX !== a) return {
                x: t.pageX,
                y: t.pageY
            };
            if (t.pageX === a) return {
                x: t.clientX,
                y: t.clientY
            }
        }
    }

    function t(t) {
        var e, i, s = o.createElement("div"),
            n = t;
        for (e in n)
            if (i = n[e], void 0 !== s.style[i]) return s = null, [i, e];
        return [!1]
    }
    var s, n, r;
    i.Defaults = {
        items: 3,
        loop: !(r = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null
        }),
        center: !(n = {
            isTouch: !(s = {
                start: 0,
                startX: 0,
                startY: 0,
                current: 0,
                currentX: 0,
                currentY: 0,
                offsetX: 0,
                offsetY: 0,
                distance: null,
                startTime: 0,
                endTime: 0,
                updatedX: 0,
                targetEl: null
            }),
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1
        }),
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: l,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, i.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, i.Plugins = {}, i.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = this._clones;
            (this.$stage.children(".cloned").length !== t.length || !this.settings.loop && 0 < t.length) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t, e, i = this._clones,
                s = this._items,
                n = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0, e = Math.abs(n / 2); t < e; t++) 0 < n ? (this.$stage.children().eq(s.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(s[i[i.length - 1]].clone().addClass("cloned")), i.push(s.length - 1 - (i.length - 1) / 2), this.$stage.prepend(s[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, e, i, s = this.settings.rtl ? 1 : -1,
                n = (this.width() / this.settings.items).toFixed(3),
                o = 0;
            for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; e < i; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : n * t) * s, this._coordinates.push(o)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, e, i = (this.width() / this.settings.items).toFixed(3),
                s = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(s), (s = {
                    width: this.settings.autoWidth ? "auto" : i - this.settings.margin
                })[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && 0 < h.grep(this._mergers, function(t) {
                    return 1 < t
                }).length)
                for (t = 0, e = this._coordinates.length; t < e; t++) s.width = Math.abs(this._coordinates[t]) - Math.abs(this._coordinates[t - 1] || 0) - this.settings.margin, this.$stage.children().eq(t).css(s);
            else this.$stage.children().css(s)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, s, n = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o,
                a = r + this.width() * n,
                h = [];
            for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], i.prototype.initialize = function() {
        var t, e, i;
        if ((this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && !0 !== this.state.imagesLoaded) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : a, i = this.$element.children(e).width(), t.length && i <= 0)) return this.preloadAutoWidthImages(t), !1;
        this.$element.addClass("owl-loading"), this.$stage = h("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, i.prototype.setup = function() {
        var e = this.viewport(),
            t = this.options.responsive,
            i = -1,
            s = null;
        t ? (h.each(t, function(t) {
            t <= e && i < t && (i = Number(t))
        }), delete(s = h.extend({}, this.options, t[i])).responsive, s.responsiveClass && this.$element.attr("class", function(t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + i)) : s = h.extend({}, this.options), null !== this.settings && this._breakpoint === i || (this.trigger("change", {
            property: {
                name: "settings",
                value: s
            }
        }), this._breakpoint = i, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, i.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, i.prototype.prepare = function(t) {
        var e = this.trigger("prepare", {
            content: t
        });
        return e.data || (e.data = h("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(t)), this.trigger("prepared", {
            content: e.data
        }), e.data
    }, i.prototype.update = function() {
        for (var t = 0, e = this._pipe.length, i = h.proxy(function(t) {
                return this[t]
            }, this._invalidated), s = {}; t < e;)(this._invalidated.all || 0 < h.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
        this._invalidated = {}
    }, i.prototype.width = function(t) {
        switch (t = t || i.Width.Default) {
            case i.Width.Inner:
            case i.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, i.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = l.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, i.prototype.eventsCall = function() {
        this.e._onDragStart = h.proxy(function(t) {
            this.onDragStart(t)
        }, this), this.e._onDragMove = h.proxy(function(t) {
            this.onDragMove(t)
        }, this), this.e._onDragEnd = h.proxy(function(t) {
            this.onDragEnd(t)
        }, this), this.e._onResize = h.proxy(function(t) {
            this.onResize(t)
        }, this), this.e._transitionEnd = h.proxy(function(t) {
            this.transitionEnd(t)
        }, this), this.e._preventClick = h.proxy(function(t) {
            this.preventClick(t)
        }, this)
    }, i.prototype.onThrottledResize = function() {
        l.clearTimeout(this.resizeTimer), this.resizeTimer = l.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, i.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!this.trigger("resize").isDefaultPrevented() && (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized"))))
    }, i.prototype.eventsRouter = function(t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }, i.prototype.internalEvents = function() {
        var t = ("ontouchstart" in l || navigator.msMaxTouchPoints, l.navigator.msPointerEnabled);
        this.settings.mouseDrag ? (this.$stage.on("mousedown", h.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !t && this.$stage.on("touchstart touchcancel", h.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), !1 !== this.settings.responsive && this.on(l, "resize", h.proxy(this.onThrottledResize, this))
    }, i.prototype.onDragStart = function(t) {
        var e, i, s, n;
        if (3 === (e = t.originalEvent || t || l.event).which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, i = c(e).x, s = c(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) n = this.getTransformProperty(), this.drag.offsetX = n, this.animate(n), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1;
        this.drag.startX = i - this.drag.offsetX, this.drag.startY = s - this.drag.offsetY, this.drag.start = i - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, "IMG" !== this.drag.targetEl.tagName && "A" !== this.drag.targetEl.tagName || (this.drag.targetEl.draggable = !1), h(o).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", h.proxy(function(t) {
            this.eventsRouter(t)
        }, this))
    }, i.prototype.onDragMove = function(t) {
        var e, i, s, n, o, r;
        this.state.isTouch && (this.state.isScrolling || (i = c(e = t.originalEvent || t || l.event).x, s = c(e).y, this.drag.currentX = i - this.drag.startX, this.drag.currentY = s - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : 0 < this.drag.distance && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (n = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), o = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), r = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, n + r), o + r)), (8 < this.drag.distance || this.drag.distance < -8) && (e.preventDefault !== a ? e.preventDefault() : e.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (16 < this.drag.currentY || this.drag.currentY < -16) && !1 === this.state.isSwiping && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, i.prototype.onDragEnd = function(t) {
        var e, i;
        if (this.state.isTouch) {
            if ("mouseup" === t.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && !0 !== this.state.inMotion) return this.state.inMotion = !1;
            this.drag.endTime = (new Date).getTime(), e = this.drag.endTime - this.drag.startTime, (3 < Math.abs(this.drag.distance) || 300 < e) && this.removeClick(this.drag.targetEl), i = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(i), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(i) || this.transitionEnd(), this.drag.distance = 0, h(o).off(".owl.dragEvents")
        }
    }, i.prototype.removeClick = function(t) {
        this.drag.targetEl = t, h(t).on("click.preventClick", this.e._preventClick), l.setTimeout(function() {
            h(t).off("click.preventClick")
        }, 300)
    }, i.prototype.preventClick = function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), h(t.target).off("click.preventClick")
    }, i.prototype.getTransformProperty = function() {
        var t;
        return !0 != (16 === (t = (t = l.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform")).replace(/matrix(3d)?\(|\)/g, "").split(",")).length) ? t[4] : t[12]
    }, i.prototype.closest = function(i) {
        var s = -1,
            n = this.width(),
            o = this.coordinates();
        return this.settings.freeDrag || h.each(o, h.proxy(function(t, e) {
            return e - 30 < i && i < e + 30 ? s = t : this.op(i, "<", e) && this.op(i, ">", o[t + 1] || e - n) && (s = "left" === this.state.direction ? t + 1 : t), -1 === s
        }, this)), this.settings.loop || (this.op(i, ">", o[this.minimum()]) ? s = i = this.minimum() : this.op(i, "<", o[this.maximum()]) && (s = i = this.maximum())), s
    }, i.prototype.animate = function(t) {
        this.trigger("translate"), this.state.inMotion = 0 < this.speed(), this.support3d ? this.$stage.css({
            transform: "translate3d(" + t + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: t + "px"
        }) : this.$stage.animate({
            left: t
        }, this.speed() / 1e3, this.settings.fallbackEasing, h.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, i.prototype.current = function(t) {
        if (t === a) return this._current;
        if (0 === this._items.length) return a;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== a && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, i.prototype.invalidate = function(t) {
        this._invalidated[t] = !0
    }, i.prototype.reset = function(t) {
        (t = this.normalize(t)) !== a && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, i.prototype.normalize = function(t, e) {
        var i = e ? this._items.length : this._items.length + this._clones.length;
        return !h.isNumeric(t) || i < 1 ? a : t = this._clones.length ? (t % i + i) % i : Math.max(this.minimum(e), Math.min(this.maximum(e), t))
    }, i.prototype.relative = function(t) {
        return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
    }, i.prototype.maximum = function(t) {
        var e, i, s, n = 0,
            o = this.settings;
        if (t) return this._items.length - 1;
        if (!o.loop && o.center) e = this._items.length - 1;
        else if (o.loop || o.center)
            if (o.loop || o.center) e = this._items.length + o.items;
            else {
                if (!o.autoWidth && !o.merge) throw "Can not detect maximum absolute position.";
                for (revert = o.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width();
                    (s = this.coordinates(n)) && !(s * revert >= i);) e = ++n
            }
        else e = this._items.length - o.items;
        return e
    }, i.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, i.prototype.items = function(t) {
        return t === a ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, i.prototype.mergers = function(t) {
        return t === a ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, i.prototype.clones = function(i) {
        function s(t) {
            return t % 2 == 0 ? n + t / 2 : e - (t + 1) / 2
        }
        var e = this._clones.length / 2,
            n = e + this._items.length;
        return i === a ? h.map(this._clones, function(t, e) {
            return s(e)
        }) : h.map(this._clones, function(t, e) {
            return t === i ? s(e) : null
        })
    }, i.prototype.speed = function(t) {
        return t !== a && (this._speed = t), this._speed
    }, i.prototype.coordinates = function(t) {
        var e = null;
        return t === a ? h.map(this._coordinates, h.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (e = this._coordinates[t], e += (this.width() - e + (this._coordinates[t - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : e = this._coordinates[t - 1] || 0, e)
    }, i.prototype.duration = function(t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, i.prototype.to = function(t, e) {
        if (this.settings.loop) {
            var i = t - this.relative(this.current()),
                s = this.current(),
                n = this.current(),
                o = this.current() + i,
                r = n - o < 0,
                a = this._clones.length + this._items.length;
            o < this.settings.items && !1 == r ? (s = n + this._items.length, this.reset(s)) : o >= a - this.settings.items && !0 == r && (s = n - this._items.length, this.reset(s)), l.clearTimeout(this.e._goToLoop), this.e._goToLoop = l.setTimeout(h.proxy(function() {
                this.speed(this.duration(this.current(), s + i, e)), this.current(s + i), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), t, e)), this.current(t), this.update()
    }, i.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, i.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, i.prototype.transitionEnd = function(t) {
        return (t === a || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.state.inMotion = !1, void this.trigger("translated"))
    }, i.prototype.viewport = function() {
        var t;
        if (this.options.responsiveBaseElement !== l) t = h(this.options.responsiveBaseElement).width();
        else if (l.innerWidth) t = l.innerWidth;
        else {
            if (!o.documentElement || !o.documentElement.clientWidth) throw "Can not detect viewport width.";
            t = o.documentElement.clientWidth
        }
        return t
    }, i.prototype.replace = function(t) {
        this.$stage.empty(), this._items = [], t = t && (t instanceof jQuery ? t : h(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function() {
            return 1 === this.nodeType
        }).each(h.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(h.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, i.prototype.add = function(t, e) {
        e = e === a ? this._items.length : this.normalize(e, !0), this.trigger("add", {
            content: t,
            position: e
        }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, i.prototype.remove = function(t) {
        (t = this.normalize(t, !0)) !== a && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, i.prototype.addTriggerableEvents = function() {
        var i = h.proxy(function(e, i) {
            return h.proxy(function(t) {
                t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
            }, this)
        }, this);
        h.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, h.proxy(function(t, e) {
            this.$element.on(t + ".owl.carousel", i(e, t + ".owl.carousel"))
        }, this))
    }, i.prototype.watchVisibility = function() {
        function t(t) {
            return 0 < t.offsetWidth && 0 < t.offsetHeight
        }
        t(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), l.clearInterval(this.e._checkVisibile), this.e._checkVisibile = l.setInterval(h.proxy(function() {
            t(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), l.clearInterval(this.e._checkVisibile))
        }, this), 500))
    }, i.prototype.preloadAutoWidthImages = function(i) {
        var s, n, o, r;
        s = 0, n = this, i.each(function(t, e) {
            o = h(e), (r = new Image).onload = function() {
                s++, o.attr("src", r.src), o.css("opacity", 1), s >= i.length && (n.state.imagesLoaded = !0, n.initialize())
            }, r.src = o.attr("src") || o.attr("data-src") || o.attr("data-src-retina")
        })
    }, i.prototype.destroy = function() {
        for (var t in this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), !1 !== this.settings.responsive && h(l).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd), this._plugins) this._plugins[t].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), h(o).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, i.prototype.op = function(t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
            case "<":
                return s ? i < t : t < i;
            case ">":
                return s ? t < i : i < t;
            case ">=":
                return s ? t <= i : i <= t;
            case "<=":
                return s ? i <= t : t <= i
        }
    }, i.prototype.on = function(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }, i.prototype.off = function(t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }, i.prototype.trigger = function(t, e, i) {
        var s = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            n = h.camelCase(h.grep(["on", t, i], function(t) {
                return t
            }).join("-").toLowerCase()),
            o = h.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), h.extend({
                relatedTarget: this
            }, s, e));
        return this._supress[t] || (h.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(o)
        }), this.$element.trigger(o), this.settings && "function" == typeof this.settings[n] && this.settings[n].apply(this, o)), o
    }, i.prototype.suppress = function(t) {
        h.each(t, h.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, i.prototype.release = function(t) {
        h.each(t, h.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, i.prototype.browserSupport = function() {
        if (this.support3d = t(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0], this.support3d) {
            this.transformVendor = t(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0];
            this.transitionEndVendor = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"][t(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = l.orientation
    }, h.fn.owlCarousel = function(t) {
        return this.each(function() {
            h(this).data("owlCarousel") || h(this).data("owlCarousel", new i(this, t))
        })
    }, h.fn.owlCarousel.Constructor = i
}(window.Zepto || window.jQuery, window, document),
function(a, o) {
    var e = function(t) {
        this._core = t, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(t) {
                if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type))
                    for (var e = this._core.settings, i = e.center && Math.ceil(e.items / 2) || e.items, s = e.center && -1 * i || 0, n = (t.property && t.property.value || this._core.current()) + s, o = this._core.clones().length, r = a.proxy(function(t, e) {
                            this.load(e)
                        }, this); s++ < i;) this.load(o / 2 + this._core.relative(n)), o && a.each(this._core.clones(this._core.relative(n++)), r)
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(t) {
        var e = this._core.$stage.children().eq(t),
            i = e && e.find(".owl-lazy");
        !i || -1 < a.inArray(e.get(0), this._loaded) || (i.each(a.proxy(function(t, e) {
            var i, s = a(e),
                n = 1 < o.devicePixelRatio && s.attr("data-src-retina") || s.attr("data-src");
            this._core.trigger("load", {
                element: s,
                url: n
            }, "lazy"), s.is("img") ? s.one("load.owl.lazy", a.proxy(function() {
                s.css("opacity", 1), this._core.trigger("loaded", {
                    element: s,
                    url: n
                }, "lazy")
            }, this)).attr("src", n) : ((i = new Image).onload = a.proxy(function() {
                s.css({
                    "background-image": "url(" + n + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: s,
                    url: n
                }, "lazy")
            }, this), i.src = n)
        }, this)), this._loaded.push(e.get(0)))
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(e) {
    var i = function(t) {
        this._core = t, this._handlers = {
            "initialized.owl.carousel": e.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": e.proxy(function(t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": e.proxy(function(t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = e.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    i.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, i.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, i.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, e.fn.owlCarousel.Constructor.Plugins.AutoHeight = i
}(window.Zepto || window.jQuery, window, document),
function(c, e, i) {
    var s = function(t) {
        this._core = t, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": c.proxy(function(t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": c.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": c.proxy(function(t) {
                var e = c(t.content).find(".owl-video");
                e.length && (e.css("display", "none"), this.fetch(e, c(t.content)))
            }, this)
        }, this._core.options = c.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", c.proxy(function(t) {
            this.play(t)
        }, this))
    };
    s.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, s.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
            s = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (-1 < (s = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
        else {
            if (!(-1 < s[3].indexOf("vimeo"))) throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        s = s[6], this._videos[r] = {
            type: i,
            id: s,
            width: n,
            height: o
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, s.prototype.thumbnail = function(e, t) {
        function i(t) {
            '<div class="owl-video-play-icon"></div>',
            s = l.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + a + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
            e.after(s),
            e.after('<div class="owl-video-play-icon"></div>')
        }
        var s, n, o = t.width && t.height ? 'style="width:' + t.width + "px;height:" + t.height + 'px;"' : "",
            r = e.find("img"),
            a = "src",
            h = "",
            l = this._core.settings;
        return e.wrap('<div class="owl-video-wrapper"' + o + "></div>"), this._core.settings.lazyLoad && (a = "data-src", h = "owl-lazy"), r.length ? (i(r.attr(a)), r.remove(), !1) : void("youtube" === t.type ? (n = "http://img.youtube.com/vi/" + t.id + "/hqdefault.jpg", i(n)) : "vimeo" === t.type && c.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + t.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                n = t[0].thumbnail_large, i(n)
            }
        }))
    }, s.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, s.prototype.play = function(t) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var e, i, s = c(t.target || t.srcElement),
            n = s.closest("." + this._core.settings.itemClass),
            o = this._videos[n.attr("data-video")],
            r = o.width || "100%",
            a = o.height || this._core.$stage.height();
        "youtube" === o.type ? e = '<iframe width="' + r + '" height="' + a + '" src="http://www.youtube.com/embed/' + o.id + "?autoplay=1&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === o.type && (e = '<iframe src="http://player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + r + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), n.addClass("owl-video-playing"), this._playing = n, i = c('<div style="height:' + a + "px; width:" + r + 'px" class="owl-video-frame">' + e + "</div>"), s.after(i)
    }, s.prototype.isInFullScreen = function() {
        var t = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return t && c(t).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), !(t && this._fullscreen && this._playing) && (this._fullscreen ? this._fullscreen = !1 : !this._playing || this._core.state.orientation === e.orientation || (this._core.state.orientation = e.orientation, !1))
    }, s.prototype.destroy = function() {
        var t, e;
        for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, c.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document),
function(r) {
    var e = function(t) {
        this.core = t, this.core.options = r.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": r.proxy(function(t) {
                "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function(t) {
                this.swapping = "translated" == t.type
            }, this),
            "translate.owl.carousel": r.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var t, e = r.proxy(this.clear, this),
                i = this.core.$stage.children().eq(this.previous),
                s = this.core.$stage.children().eq(this.next),
                n = this.core.settings.animateIn,
                o = this.core.settings.animateOut;
            this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.css({
                left: t + "px"
            }).addClass("animated owl-animated-out").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", e)), n && s.addClass("animated owl-animated-in").addClass(n).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", e))
        }
    }, e.prototype.clear = function(t) {
        r(t.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, r.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(e, i, t) {
    var s = function(t) {
        this.core = t, this.core.options = e.extend({}, s.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": e.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": e.proxy(function(t, e, i) {
                this.play(e, i)
            }, this),
            "stop.owl.autoplay": e.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": e.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": e.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    s.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, s.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (i.clearInterval(this.interval), this.interval = i.setInterval(e.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : i.clearInterval(this.interval)
    }, s.prototype.play = function() {
        return !0 === t.hidden || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : !1 === this.core.settings.autoplay ? void i.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, s.prototype.stop = function() {
        i.clearInterval(this.interval)
    }, s.prototype.pause = function() {
        i.clearInterval(this.interval)
    }, s.prototype.destroy = function() {
        var t, e;
        for (t in i.clearInterval(this.interval), this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, e.fn.owlCarousel.Constructor.Plugins.autoplay = s
}(window.Zepto || window.jQuery, window, document),
function(o) {
    "use strict";
    var e = function(t) {
        this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": o.proxy(function(t) {
                this._core.settings.dotsData && this._templates.push(o(t.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": o.proxy(function(t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 0, o(t.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": o.proxy(function(t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "change.owl.carousel": o.proxy(function(t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current(),
                        i = this._core.maximum(),
                        s = this._core.minimum();
                    t.data = t.property.value > i ? i <= e ? s : i : t.property.value < s ? i : t.property.value
                }
            }, this),
            "changed.owl.carousel": o.proxy(function(t) {
                "position" == t.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": o.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = o.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, e.prototype.initialize = function() {
        var t, e, i = this._core.settings;
        for (e in i.dotsData || (this._templates = [o("<div>").addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]), i.navContainer && i.dotsContainer || (this._controls.$container = o("<div>").addClass(i.controlsClass).appendTo(this.$element)), this._controls.$indicators = i.dotsContainer ? o(i.dotsContainer) : o("<div>").hide().addClass(i.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", o.proxy(function(t) {
                var e = o(t.target).parent().is(this._controls.$indicators) ? o(t.target).index() : o(t.target).parent().index();
                t.preventDefault(), this.to(e, i.dotsSpeed)
            }, this)), t = i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).prependTo(this._controls.$container), this._controls.$next = o("<" + i.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(i.navClass[0]).html(i.navText[0]).hide().prependTo(t).on("click", o.proxy(function() {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next.addClass(i.navClass[1]).html(i.navText[1]).hide().appendTo(t).on("click", o.proxy(function() {
                this.next(i.navSpeed)
            }, this)), this._overrides) this._core[e] = o.proxy(this[e], this)
    }, e.prototype.destroy = function() {
        var t, e, i, s;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (s in this.overides) this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function() {
        var t, e, i = this._core.settings,
            s = this._core.clones().length / 2,
            n = s + this._core.items().length,
            o = i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items;
        if ("page" !== i.slideBy && (i.slideBy = Math.min(i.slideBy, i.items)), i.dots || "page" == i.slideBy)
            for (this._pages = [], t = s, e = 0; t < n; t++)(o <= e || 0 === e) && (this._pages.push({
                start: t - s,
                end: t - s + o - 1
            }), e = 0, 0), e += this._core.mergers(this._core.relative(t))
    }, e.prototype.draw = function() {
        var t, e, i = "",
            s = this._core.settings,
            n = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!s.nav || s.loop || s.navRewind || (this._controls.$previous.toggleClass("disabled", n <= 0), this._controls.$next.toggleClass("disabled", n >= this._core.maximum())), this._controls.$previous.toggle(s.nav), this._controls.$next.toggle(s.nav), s.dots) {
            if (t = this._pages.length - this._controls.$indicators.children().length, s.dotData && 0 != t) {
                for (e = 0; e < this._controls.$indicators.children().length; e++) i += this._templates[this._core.relative(e)];
                this._controls.$indicators.html(i)
            } else 0 < t ? (i = new Array(1 + t).join(this._templates[0]), this._controls.$indicators.append(i)) : t < 0 && this._controls.$indicators.children().slice(t).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(o.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(s.dots)
    }, e.prototype.onTrigger = function(t) {
        var e = this._core.settings;
        t.page = {
            index: o.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: e && (e.center || e.autoWidth || e.dotData ? 1 : e.dotsEach || e.items)
        }
    }, e.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return o.grep(this._pages, function(t) {
            return t.start <= e && t.end >= e
        }).pop()
    }, e.prototype.getPosition = function(t) {
        var e, i, s = this._core.settings;
        return "page" == s.slideBy ? (e = o.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += s.slideBy : e -= s.slideBy), e
    }, e.prototype.next = function(t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
    }, e.prototype.prev = function(t) {
        o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
    }, e.prototype.to = function(t, e, i) {
        var s;
        i ? o.proxy(this._overrides.to, this._core)(t, e) : (s = this._pages.length, o.proxy(this._overrides.to, this._core)(this._pages[(t % s + s) % s].start, e))
    }, o.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(i, s) {
    "use strict";
    var e = function(t) {
        this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": i.proxy(function() {
                "URLHash" == this._core.settings.startPosition && i(s).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": i.proxy(function(t) {
                var e = i(t.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[e] = t.content
            }, this)
        }, this._core.options = i.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), i(s).on("hashchange.owl.navigation", i.proxy(function() {
            var t = s.location.hash.substring(1),
                e = this._core.$stage.children(),
                i = this._hashes[t] && e.index(this._hashes[t]) || 0;
            return !!t && void this._core.to(i, !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in i(s).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, i.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document);

/* js_main */
window.debounce = function(s, l, a) {
        var o;
        return function() {
            var e = this,
                i = arguments,
                t = a && !o;
            clearTimeout(o), o = setTimeout(function() {
                o = null, a || s.apply(e, i)
            }, l), t && s.apply(e, i)
        }
    }, window.blockStickyHeader = !1,
    function(o) {
        window.CUBER = {
            Nav: {
                $siteHeader: null,
                $siteNav: null,
                $siteOverlay: null,
                mount: function() {
                    this.$siteHeader = o("#site-header"), this.$siteNav = o("#site-nav--mobile"), this.$siteOverlay = o("#site-overlay"), o("#site-menu-handle").on("click focusin", function() {
                        this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"), this.$siteNav.removeClass("show-filters").removeClass("show-cart").removeClass("show-search"), this.$siteOverlay.addClass("active"), o(".main-body").addClass("sidebar-move"))
                    }.bind(this)), o("#site-cart-handle a").on("click", function(e) {
                        e.preventDefault(), getCartModal(), this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"), this.$siteNav.removeClass("show-filters").removeClass("show-search").addClass("show-cart"), this.$siteOverlay.addClass("active"), o(".main-body").addClass("sidebar-move"))
                    }.bind(this)), o("#site-search-handle a").on("click", function(e) {
                        e.preventDefault(), this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"), this.$siteNav.removeClass("show-filters").removeClass("show-cart").addClass("show-search"), this.$siteOverlay.addClass("active"), o(".main-body").addClass("sidebar-move"))
                    }.bind(this)), 0 < o("#site-filter-handle").length && o("#site-filter-handle").on("click", function() {
                        this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"), this.$siteNav.removeClass("show-cart").removeClass("show-search").addClass("show-filters"), this.$siteOverlay.addClass("active"), o(".main-body").addClass("sidebar-move"))
                    }.bind(this)), o(".site-close-handle, #site-overlay").on("click", function() {
                        this.$siteNav.hasClass("active") && (this.$siteNav.removeClass("active"), this.$siteOverlay.removeClass("active"), o(".main-body").removeClass("sidebar-move"))
                    }.bind(this))
                },
                unmount: function() {
                    o("#site-menu-handle").off("click"), o("#site-cart-handle a").off("click"), o("#site-filter-handle").off("click"), this.$siteNav.removeClass("active"), this.$siteOverlay.removeClass("active"), o(".main-body").removeClass("sidebar-move")
                }
            },
            Product: {
                $productGallery: null,
                $productGalleryButton: null,
                $productGalleryItem: null,
                $productGalleryIndex: null,
                $productCarousel: null,
                $productCarouselImgs: null,
                mount: function(e) {
                    var t = {};
                    e.data("po", t), t.$productGallery = e.find(".box__product-gallery"), t.$productGalleryButton = e.find(".box__product-gallery .product-image__button"), t.$productGalleryItem = e.find(".box__product-gallery .gallery-item"), t.$productGalleryButton.append('<div class="gallery-index icon-pr-fix"><span class="current">' + (null != window.CuberProductImageIndex ? window.CuberProductImageIndex + 1 : 1) + '</span> / <span class="total">' + t.$productGalleryItem.length + "</span></div>"), t.$productGalleryIndex = t.$productGallery.find(".gallery-index .current"), t.$productCarousel = t.$productGallery.children(".site-box-content"), t.$productGallery.hasClass("scroll") && o(window).on("scroll.product-gallery", function() {
                        t.$productCarousel.hasClass("flickity-enabled") || t.$productGalleryItem.each(function(e, i) {
                            o(window).scrollTop() + o(window).height() > o(i).offset().top + o(window).height() / 2 && !o(i).hasClass("current") ? (o(i).addClass("current"), t.$productGalleryIndex.html(o(i).index() + 1), $(".product-gallery__thumb").removeClass("active"), $('.product-gallery__thumb img[data-image="' + o(i).find("img").attr("src") + '"]').parents(".product-gallery__thumb").addClass("active")) : o(window).scrollTop() + o(window).height() < o(i).offset().top + o(window).height() / 2 && o(i).hasClass("current") && (o(i).removeClass("current"), t.$productGalleryIndex.html(o(i).index()), $(".product-gallery__thumb").removeClass("active"), $('.product-gallery__thumb img[data-image="' + o(i).find("img").attr("src") + '"]').parents(".product-gallery__thumb").prev().addClass("active"))
                        }.bind(t))
                    }.bind(t)).trigger("scroll.product-gallery"), window.CUBER.Main._mountScrollMovers({
                        parent: t.$productGallery,
                        items: o(".gallery-index, .product-sharing, .product-zoom")
                    }), t.$productCarousel.flickity({
                        cellSelector: ".gallery-item",
                        adaptiveHeight: !0,
                        initialIndex: null != window.CuberProductImageIndex ? window.CuberProductImageIndex : 0,
                        wrapAround: !0,
                        prevNextButtons: !1,
                        pageDots: !0,
                        watchCSS: !!t.$productGallery.hasClass("scroll"),
                        resize: !1
                    })
                },
                unmount: function(e) {
                    e = e.data("po"), o(window).off("scroll.product-gallery"), e.$productCarousel.off("scroll.flickity")
                }
            },
            Main: {
                _mountScrollMovers: function(e) {
                    var i = e.parent,
                        t = !1;
                    setTimeout(function() {
                        e.items.removeClass("out-with-you")
                    }, 1e3), e.items.addClass("icon-pr-fix"), i.length && o(window).on("scroll.scroll-movers", function() {
                        !t && o(window).scrollTop() + o(window).height() > i.offset().top + i.height() ? (e.items.addClass("out-with-you"), t = !0) : t && o(window).scrollTop() + o(window).height() <= i.offset().top + i.height() && (t = !1, e.items.removeClass("out-with-you"))
                    }.bind(this))
                }
            },
            SplitSlider: {
                _mountFlickity: function() {
                    o(".responsive-flickity").flickity({
                        cellSelector: ".slideshow-item",
                        wrapAround: !0,
                        prevNextButtons: !1,
                        pageDots: !1,
                        watchCSS: !0,
                        resize: !0
                    });
                    var e = o(".box__slideshow-split"),
                        i = o(".responsive-flickity").data("flickity");
                    e.find(".slideshow-item"), e.find(".slider-meta").length <= 0 && (e.find(".slider-meta").remove(), e.append('<div class="slider-meta hide lap--show"><div class="slider-index"><span class="current">1</span> / <span class="total">' + sliderT + '</span></div><div class="slider-nav"><span class="go-prev">' + o.themeAssets.arrowRight + '</span><span class="go-next">' + o.themeAssets.arrowRight + "</span></div>"), e.find(".go-prev").on("click", function() {
                        i.previous()
                    }.bind(this)), e.find(".go-next").on("click", function() {
                        i.next()
                    }.bind(this)), o(".responsive-flickity").on("select.flickity", function() {
                        e.find(".slider-index .current").html(i.selectedIndex + 1)
                    }), setTimeout(function() {
                        e.find(".slider-meta").addClass("active")
                    }, 1e3))
                },
                mount: function(i) {
                    var t = o(".box__slideshow-split"),
                        s = t.find(".slideshow-item"),
                        l = t.find(".site-box-background-container").children("div"),
                        a = [];
                    currentScroll = o(window).scrollTop(), sliderI = Math.min(Math.ceil(currentScroll / o(window).height()), s.length - 1), sliderJ = sliderI - 1, sliderT = s.length, i && this._mountFlickity(), o(".responsive-flickity").hasClass("flickity-enabled") ? (t.height(o(window).height() - o("#site-header").outerHeight()), t.addClass("remove-min-height")) : (t.css("height", "auto"), t.removeClass("remove-min-height")), l.each(function(e) {
                        0 < e ? e < sliderI ? o(this).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + o(window).height() + "px 0)") : e == sliderI ? o(this).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + Math.ceil(o(window).scrollTop() - o(window).height() * sliderJ) + "px 0)") : o(this).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px 0 0)") : 0 == e & i && (o(this).css({
                            clip: "rect(0 " + Math.ceil(o(window).width() / 2) + "px 0 0)",
                            opacity: 0
                        }), o(this).addClass("clip-transition"), setTimeout(function() {
                            o(this).css({
                                clip: "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + o(window).height() + "px 0)",
                                opacity: 1
                            })
                        }.bind(this), 10), setTimeout(function() {
                            o(this).removeClass("clip-transition")
                        }.bind(this), 650)), o(this).addClass("active"), o(this).find(".site-box-black-overlay").length <= 0 && o(this).append('<span class="site-box-black-overlay" />'), a.push(o(this).find(".site-box-black-overlay"))
                    }), o(window).on("scroll.split-slider", function(e) {
                        if (currentScroll < o(window).scrollTop()) 0 < s.eq(sliderI + 1).length && o(window).scrollTop() + o(window).height() >= s.eq(sliderI + 1).offset().top ? (0 != sliderI && (l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + o(window).height() + "px 0)"), a[sliderJ] && a[sliderJ].css("opacity", .5)), sliderJ = sliderI, sliderI++, down = !0) : o(window).scrollTop() + o(window).height() >= t.height() && !t.hasClass("back-to-normal") && (t.addClass("back-to-normal"), l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + o(window).height() + "px 0)"));
                        else if (0 < s.eq(sliderI).length && 0 < s.eq(sliderI - 1).length && o(window).scrollTop() + o(window).height() < s.eq(sliderI).offset().top) {
                            var i = l.eq(sliderI).hasClass("obs") ? 1 : 0;
                            l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + i + "px 0)"), a[sliderJ] && a[sliderJ].css("opacity", 0), sliderI--, sliderJ = sliderI - 1, down = !1
                        } else o(window).scrollTop() + o(window).height() <= t.height() && t.hasClass("back-to-normal") && t.removeClass("back-to-normal");
                        t.hasClass("back-to-normal") || (e = Math.ceil(o(window).scrollTop() - o(window).height() * sliderJ), i = l.eq(sliderI).hasClass("obs") ? 1 : 0, l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(o(window).width() / 2) + "px " + Math.max(i, e) + "px 0)"), a[sliderJ] && a[sliderJ].css("opacity", Math.ceil(50 * e / o(window).height()) / 100), i = Math.round(o(window).height() / 6), s.eq(sliderJ).find(".caption").css("transform", "translateY(" + (0 - Math.ceil(e * i / o(window).height())) + "px)"), s.eq(sliderJ).find(".title").css("transform", "translateY(" + (0 - Math.ceil(.75 * e * i / o(window).height())) + "px)"), s.eq(sliderJ).find(".subtitle").css("transform", "translateY(" + (0 - Math.ceil(.5 * e * i / o(window).height())) + "px)"), s.eq(sliderJ).find(".button").css("transform", "translateY(" + (0 - Math.ceil(.25 * e * i / o(window).height())) + "px)"), s.eq(sliderI).find(".caption").css("transform", "translateY(" + (Math.ceil(e * i / o(window).height()) - i) + "px)"), s.eq(sliderI).find(".title").css("transform", "translateY(" + (Math.ceil(.75 * e * i / o(window).height()) - .75 * i) + "px)"), s.eq(sliderI).find(".subtitle").css("transform", "translateY(" + (Math.ceil(.5 * e * i / o(window).height()) - .5 * i) + "px)"), s.eq(sliderI).find(".button").css("transform", "translateY(" + (Math.ceil(.25 * e * i / o(window).height()) - .25 * i) + "px)")), currentScroll = o(window).scrollTop()
                    }).trigger("scroll.split-slider"), o(window).on("resize.split-slider", window.debounce(function() {
                        this.unmount(), this.mount(!1)
                    }.bind(this), 250))
                },
                unmount: function() {
                    o(window).off("scroll.split-slider")
                }
            }
        }, o(document).on("ready", function() {
            window.CUBER.Nav.mount(), 0 < o(".productDetail-page").length && o(".productDetail-page").each(function() {
                window.CUBER.Product.mount(o(this))
            }), 0 < o(".box__slideshow-split").length && window.CUBER.SplitSlider.mount(!0), o(window).on("resize", function() {
                o(window).width()
            })
        })
    }(jQuery);

/*jQuery mmenu v5.7.2 @requires jQuery 1.7.0 or latermmenu.frebsite.nl Copyright (c) Fred Heusschen www.frebsite.nl License: CC-BY-NC-4.0 * http://creativecommons.org/licenses/by-nc/4.0/ */
! function(d) {
    var c, h, a, e, u = "mmenu",
        t = "5.7.2";
    d[u] && d[u].version > t || (d[u] = function(e, t, n) {
        this.$menu = e, this._api = ["bind", "initPanels", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
        var s = this.$pnls.children();
        return this._initAddons(), this.initPanels(s), "function" == typeof this.___debug && this.___debug(), this
    }, d[u].version = t, d[u].addons = {}, d[u].uniqueId = 0, d[u].defaults = {
        extensions: [],
        initMenu: function() {},
        initPanels: function() {},
        navbar: {
            add: !0,
            title: "Menu",
            titleLink: "panel"
        },
        onClick: {
            setSelected: !0
        },
        slidingSubmenus: !0
    }, d[u].configuration = {
        classNames: {
            divider: "Divider",
            inset: "Inset",
            panel: "Panel",
            selected: "Selected",
            spacer: "Spacer",
            vertical: "Vertical"
        },
        clone: !1,
        openingInterval: 25,
        panelNodetype: "ul, ol, div",
        transitionDuration: 400
    }, d[u].prototype = {
        init: function(e) {
            this.initPanels(e)
        },
        initPanels: function(e) {
            e = e.not("." + c.nopanel), e = this._initPanels(e), this.opts.initPanels.call(this, e), this.trigger("initPanels", e), this.trigger("update")
        },
        update: function() {
            this.trigger("update")
        },
        setSelected: function(e) {
            this.$menu.find("." + c.listview).children().removeClass(c.selected), e.addClass(c.selected), this.trigger("setSelected", e)
        },
        openPanel: function(e) {
            var t = e.parent(),
                n = this;
            if (t.hasClass(c.vertical)) {
                var s = t.parents("." + c.subopened);
                if (s.length) return void this.openPanel(s.first());
                t.addClass(c.opened), this.trigger("openPanel", e), this.trigger("openingPanel", e), this.trigger("openedPanel", e)
            } else {
                if (e.hasClass(c.current)) return;
                var i = this.$pnls.children("." + c.panel),
                    a = i.filter("." + c.current);
                i.removeClass(c.highest).removeClass(c.current).not(e).not(a).not("." + c.vertical).addClass(c.hidden), d[u].support.csstransitions || a.addClass(c.hidden), e.hasClass(c.opened) ? e.nextAll("." + c.opened).addClass(c.highest).removeClass(c.opened).removeClass(c.subopened) : (e.addClass(c.highest), a.addClass(c.subopened)), e.removeClass(c.hidden).addClass(c.current), n.trigger("openPanel", e), setTimeout(function() {
                    e.removeClass(c.subopened).addClass(c.opened), n.trigger("openingPanel", e), n.__transitionend(e, function() {
                        n.trigger("openedPanel", e)
                    }, n.conf.transitionDuration)
                }, this.conf.openingInterval)
            }
        },
        closePanel: function(e) {
            var t = e.parent();
            t.hasClass(c.vertical) && (t.removeClass(c.opened), this.trigger("closePanel", e), this.trigger("closingPanel", e), this.trigger("closedPanel", e))
        },
        closeAllPanels: function() {
            this.$menu.find("." + c.listview).children().removeClass(c.selected).filter("." + c.vertical).removeClass(c.opened);
            var e = this.$pnls.children("." + c.panel).first();
            this.$pnls.children("." + c.panel).not(e).removeClass(c.subopened).removeClass(c.opened).removeClass(c.current).removeClass(c.highest).addClass(c.hidden), this.openPanel(e)
        },
        togglePanel: function(e) {
            var t = e.parent();
            t.hasClass(c.vertical) && this[t.hasClass(c.opened) ? "closePanel" : "openPanel"](e)
        },
        getInstance: function() {
            return this
        },
        bind: function(e, t) {
            e = "init" == e ? "initPanels" : e, this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
        },
        trigger: function() {
            var e = Array.prototype.slice.call(arguments),
                t = e.shift();
            if (t = "init" == t ? "initPanels" : t, this.cbck[t])
                for (var n = 0, s = this.cbck[t].length; n < s; n++) this.cbck[t][n].apply(this, e)
        },
        _initMenu: function() {
            this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                d(this).attr("id", c.mm(d(this).attr("id")))
            })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = d('<div class="' + c.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(c.wrapper);
            var e = [c.menu];
            this.opts.slidingSubmenus || e.push(c.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && e.push(this.opts.extensions), this.$menu.addClass(e.join(" "))
        },
        _initPanels: function(e) {
            var l = this,
                t = this.__findAddBack(e, "ul, ol");
            this.__refactorClass(t, this.conf.classNames.inset, "inset").addClass(c.nolistview + " " + c.nopanel), t.not("." + c.nolistview).addClass(c.listview);
            var n = this.__findAddBack(e, "." + c.listview).children();
            this.__refactorClass(n, this.conf.classNames.selected, "selected"), this.__refactorClass(n, this.conf.classNames.divider, "divider"), this.__refactorClass(n, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(e, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
            var s = d(),
                i = e.add(e.find("." + c.panel)).add(this.__findAddBack(e, "." + c.listview).children().children(this.conf.panelNodetype)).not("." + c.nopanel);
            this.__refactorClass(i, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || i.addClass(c.vertical), i.each(function() {
                var e = d(this),
                    t = e;
                e.is("ul, ol") ? (e.wrap('<div class="' + c.panel + '" />'), t = e.parent()) : t.addClass(c.panel);
                var n = e.attr("id");
                e.removeAttr("id"), t.attr("id", n || l.__getUniqueId()), e.hasClass(c.vertical) && (e.removeClass(l.conf.classNames.vertical), t.add(t.parent()).addClass(c.vertical)), s = s.add(t)
            });
            var a = d("." + c.panel, this.$menu);
            s.each(function(e) {
                var t, n, s = d(this),
                    i = s.parent(),
                    a = i.children("a, span").first();
                if (i.is("." + c.panels) || (i.data(h.child, s), s.data(h.parent, i)), i.children("." + c.next).length || i.parent().is("." + c.listview) && (t = s.attr("id"), n = d('<a class="' + c.next + '" href="#' + t + '" data-target="#' + t + '" />').insertBefore(a), a.is("span") && n.addClass(c.fullsubopen)), !s.children("." + c.navbar).length && !i.hasClass(c.vertical)) {
                    i = i.parent().is("." + c.listview) ? i.closest("." + c.panel) : (a = i.closest("." + c.panel).find('a[href="#' + s.attr("id") + '"]').first()).closest("." + c.panel);
                    var o = !1,
                        r = d('<div class="' + c.navbar + '" />');
                    if (l.opts.navbar.add && s.addClass(c.hasnavbar), i.length) {
                        switch (t = i.attr("id"), l.opts.navbar.titleLink) {
                            case "anchor":
                                o = a.attr("href");
                                break;
                            case "panel":
                            case "parent":
                                o = "#" + t;
                                break;
                            default:
                                o = !1
                        }
                        r.append('<a class="' + c.btn + " " + c.prev + '" href="#' + t + '" data-target="#' + t + '" />').append(d('<a class="' + c.title + '"' + (o ? ' href="' + o + '"' : "") + " />").text(a.text())).prependTo(s)
                    } else l.opts.navbar.title && r.append('<a class="' + c.title + '">' + l.opts.navbar.title + "</a>").prependTo(s)
                }
            });
            var o = this.__findAddBack(e, "." + c.listview).children("." + c.selected).removeClass(c.selected).last().addClass(c.selected);
            o.add(o.parentsUntil("." + c.menu, "li")).filter("." + c.vertical).addClass(c.opened).end().each(function() {
                d(this).parentsUntil("." + c.menu, "." + c.panel).not("." + c.vertical).first().addClass(c.opened).parentsUntil("." + c.menu, "." + c.panel).not("." + c.vertical).first().addClass(c.opened).addClass(c.subopened)
            }), o.children("." + c.panel).not("." + c.vertical).addClass(c.opened).parentsUntil("." + c.menu, "." + c.panel).not("." + c.vertical).first().addClass(c.opened).addClass(c.subopened);
            var r = a.filter("." + c.opened);
            return r.length || (r = s.first()), r.addClass(c.opened).last().addClass(c.current), s.not("." + c.vertical).not(r.last()).addClass(c.hidden).end().filter(function() {
                return !d(this).parent().hasClass(c.panels)
            }).appendTo(this.$pnls), s
        },
        _initAnchors: function() {
            var l = this;
            e.$body.on(a.click + "-oncanvas", "a[href]", function(e) {
                var t = d(this),
                    n = !1,
                    s = l.$menu.find(t).length;
                for (var i in d[u].addons)
                    if (d[u].addons[i].clickAnchor.call(l, t, s)) {
                        n = !0;
                        break
                    }
                var a = t.attr("href");
                if (!n && s && 1 < a.length && "#" == a.slice(0, 1)) try {
                    var o = d(a, l.$menu);
                    o.is("." + c.panel) && (n = !0, l[t.parent().hasClass(c.vertical) ? "togglePanel" : "openPanel"](o))
                } catch (e) {}
                if (n && e.preventDefault(), !n && s && t.is("." + c.listview + " > li > a") && !t.is('[rel="external"]') && !t.is('[target="_blank"]')) {
                    l.__valueOrFn(l.opts.onClick.setSelected, t) && l.setSelected(d(e.target).parent());
                    var r = l.__valueOrFn(l.opts.onClick.preventDefault, t, "#" == a.slice(0, 1));
                    r && e.preventDefault(), l.__valueOrFn(l.opts.onClick.close, t, r) && l.close()
                }
            })
        },
        _initAddons: function() {
            var e;
            for (e in d[u].addons) d[u].addons[e].add.call(this), d[u].addons[e].add = function() {};
            for (e in d[u].addons) d[u].addons[e].setup.call(this)
        },
        _getOriginalMenuId: function() {
            var e = this.$menu.attr("id");
            return e && e.length && this.conf.clone && (e = c.umm(e)), e
        },
        __api: function() {
            var n = this,
                s = {};
            return d.each(this._api, function(e) {
                var t = this;
                s[t] = function() {
                    var e = n[t].apply(n, arguments);
                    return void 0 === e ? s : e
                }
            }), s
        },
        __valueOrFn: function(e, t, n) {
            return "function" == typeof e ? e.call(t[0]) : void 0 === e && void 0 !== n ? n : e
        },
        __refactorClass: function(e, t, n) {
            return e.filter("." + t).removeClass(t).addClass(c[n])
        },
        __findAddBack: function(e, t) {
            return e.find(t).add(e.filter(t))
        },
        __filterListItems: function(e) {
            return e.not("." + c.divider).not("." + c.hidden)
        },
        __transitionend: function(t, n, e) {
            function s(e) {
                if (void 0 !== e) {
                    if (!d(e.target).is(t)) return !1;
                    t.unbind(a.transitionend), t.unbind(a.webkitTransitionEnd)
                }
                i || n.call(t[0]), i = !0
            }
            var i = !1;
            t.on(a.transitionend, s), t.on(a.webkitTransitionEnd, s), setTimeout(s, 1.1 * e)
        },
        __getUniqueId: function() {
            return c.mm(d[u].uniqueId++)
        }
    }, d.fn[u] = function(n, s) {
        return d[u].glbl || (e = {
            $wndw: d(window),
            $docu: d(document),
            $html: d("html"),
            $body: d("body")
        }, c = {}, h = {}, a = {}, d.each([c, h, a], function(e, s) {
            s.add = function(e) {
                for (var t = 0, n = (e = e.split(" ")).length; t < n; t++) s[e[t]] = s.mm(e[t])
            }
        }), c.mm = function(e) {
            return "mm-" + e
        }, c.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), c.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, h.mm = function(e) {
            return "mm-" + e
        }, h.add("parent child"), a.mm = function(e) {
            return e + ".mm"
        }, a.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"), d[u]._c = c, d[u]._d = h, d[u]._e = a, d[u].glbl = e), n = d.extend(!0, {}, d[u].defaults, n), s = d.extend(!0, {}, d[u].configuration, s), this.each(function() {
            var e = d(this);
            if (!e.data(u)) {
                var t = new d[u](e, n, s);
                t.$menu.data(u, t.__api())
            }
        })
    }, d[u].support = {
        touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
        csstransitions: function() {
            if ("undefined" != typeof Modernizr && void 0 !== Modernizr.csstransitions) return Modernizr.csstransitions;
            var e = (document.body || document.documentElement).style,
                t = "transition";
            if ("string" == typeof e[t]) return !0;
            var n = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
            t = t.charAt(0).toUpperCase() + t.substr(1);
            for (var s = 0; s < n.length; s++)
                if ("string" == typeof e[n[s] + t]) return !0;
            return !1
        }(),
        csstransforms: "undefined" == typeof Modernizr || void 0 === Modernizr.csstransforms || Modernizr.csstransforms,
        csstransforms3d: "undefined" == typeof Modernizr || void 0 === Modernizr.csstransforms3d || Modernizr.csstransforms3d
    })
}(jQuery),
function(a) {
    var o, s, i, r, l = "mmenu",
        d = "offCanvas";
    a[l].addons[d] = {
        setup: function() {
            if (this.opts[d]) {
                var e = this.opts[d],
                    t = this.conf[d];
                r = a[l].glbl, this._api = a.merge(this._api, ["open", "close", "setPage"]), "top" != e.position && "bottom" != e.position || (e.zposition = "front"), "string" != typeof t.pageSelector && (t.pageSelector = "> " + t.pageNodetype), r.$allMenus = (r.$allMenus || a()).add(this.$menu), this.vars.opened = !1;
                var n = [o.offcanvas];
                "left" != e.position && n.push(o.mm(e.position)), "back" != e.zposition && n.push(o.mm(e.zposition)), this.$menu.addClass(n.join(" ")).parent().removeClass(o.wrapper), a[l].support.csstransforms || this.$menu.addClass(o["no-csstransforms"]), a[l].support.csstransforms3d || this.$menu.addClass(o["no-csstransforms3d"]), this.setPage(r.$page), this._initBlocker(), this["_initWindow_" + d](), this.$menu[t.menuInjectMethod + "To"](t.menuWrapperSelector);
                var s = window.location.hash;
                if (s) {
                    var i = this._getOriginalMenuId();
                    i && i == s.slice(1) && this.open()
                }
            }
        },
        add: function() {
            o = a[l]._c, s = a[l]._d, i = a[l]._e, o.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"), s.add("style"), i.add("resize")
        },
        clickAnchor: function(e, t) {
            if (!this.opts[d]) return !1;
            var n = this._getOriginalMenuId();
            return n && e.is('[href="#' + n + '"]') ? (this.open(), !0) : r.$page ? !(!(n = r.$page.first().attr("id")) || !e.is('[href="#' + n + '"]')) && (this.close(), !0) : void 0
        }
    }, a[l].defaults[d] = {
        position: "left",
        zposition: "back",
        blockUI: !0,
        moveBackground: !0
    }, a[l].configuration[d] = {
        pageNodetype: "div",
        pageSelector: null,
        noPageSelector: [],
        wrapPageIfNeeded: !0,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, a[l].prototype.open = function() {
        if (!this.vars.opened) {
            var e = this;
            this._openSetup(), setTimeout(function() {
                e._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, a[l].prototype._openSetup = function() {
        var e = this,
            t = this.opts[d];
        this.closeAllOthers(), r.$page.each(function() {
            a(this).data(s.style, a(this).attr("style") || "")
        }), r.$wndw.trigger(i.resize + "-" + d, [!0]);
        var n = [o.opened];
        t.blockUI && n.push(o.blocking), "modal" == t.blockUI && n.push(o.modal), t.moveBackground && n.push(o.background), "left" != t.position && n.push(o.mm(this.opts[d].position)), "back" != t.zposition && n.push(o.mm(this.opts[d].zposition)), this.opts.extensions && n.push(this.opts.extensions), r.$html.addClass(n.join(" ")), setTimeout(function() {
            e.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(o.current + " " + o.opened)
    }, a[l].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(r.$page.first(), function() {
            e.trigger("opened")
        }, this.conf.transitionDuration), r.$html.addClass(o.opening), this.trigger("opening")
    }, a[l].prototype.close = function() {
        if (this.vars.opened) {
            var e = this;
            this.__transitionend(r.$page.first(), function() {
                e.$menu.removeClass(o.current).removeClass(o.opened), r.$html.removeClass(o.opened).removeClass(o.blocking).removeClass(o.modal).removeClass(o.background).removeClass(o.mm(e.opts[d].position)).removeClass(o.mm(e.opts[d].zposition)), e.opts.extensions && r.$html.removeClass(e.opts.extensions), r.$page.each(function() {
                    a(this).attr("style", a(this).data(s.style))
                }), e.vars.opened = !1, e.trigger("closed")
            }, this.conf.transitionDuration), r.$html.removeClass(o.opening), this.trigger("close"), this.trigger("closing")
        }
    }, a[l].prototype.closeAllOthers = function() {
        r.$allMenus.not(this.$menu).each(function() {
            var e = a(this).data(l);
            e && e.close && e.close()
        })
    }, a[l].prototype.setPage = function(e) {
        var t = this,
            n = this.conf[d];
        e && e.length || (e = r.$body.find(n.pageSelector), n.noPageSelector.length && (e = e.not(n.noPageSelector.join(", "))), 1 < e.length && n.wrapPageIfNeeded && (e = e.wrapAll("<" + this.conf[d].pageNodetype + " />").parent())), e.each(function() {
            a(this).attr("id", a(this).attr("id") || t.__getUniqueId())
        }), e.addClass(o.page + " " + o.slideout), r.$page = e, this.trigger("setPage", e)
    }, a[l].prototype["_initWindow_" + d] = function() {
        r.$wndw.off(i.keydown + "-" + d).on(i.keydown + "-" + d, function(e) {
            return r.$html.hasClass(o.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var s = 0;
        r.$wndw.off(i.resize + "-" + d).on(i.resize + "-" + d, function(e, t) {
            if (1 == r.$page.length && (t || r.$html.hasClass(o.opened))) {
                var n = r.$wndw.height();
                !t && n == s || (s = n, r.$page.css("minHeight", n))
            }
        })
    }, a[l].prototype._initBlocker = function() {
        var t = this;
        this.opts[d].blockUI && (r.$blck || (r.$blck = a('<div id="' + o.blocker + '" class="' + o.slideout + '" />')), r.$blck.appendTo(r.$body).off(i.touchstart + "-" + d + " " + i.touchmove + "-" + d).on(i.touchstart + "-" + d + " " + i.touchmove + "-" + d, function(e) {
            e.preventDefault(), e.stopPropagation(), r.$blck.trigger(i.mousedown + "-" + d)
        }).off(i.mousedown + "-" + d).on(i.mousedown + "-" + d, function(e) {
            e.preventDefault(), r.$html.hasClass(o.modal) || (t.closeAllOthers(), t.close())
        }))
    }
}(jQuery),
function(i) {
    var a, o, r, l = "mmenu",
        d = "scrollBugFix";
    i[l].addons[d] = {
        setup: function() {
            var t = this,
                e = this.opts[d];
            if (this.conf[d], r = i[l].glbl, i[l].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof e && (e = {
                    fix: e
                }), "object" != typeof e && (e = {}), (e = this.opts[d] = i.extend(!0, {}, i[l].defaults[d], e)).fix)) {
                var n = this.$menu.attr("id"),
                    s = !1;
                this.bind("opening", function() {
                    this.$pnls.children("." + a.current).scrollTop(0)
                }), r.$docu.on(o.touchmove, function(e) {
                    t.vars.opened && e.preventDefault()
                }), r.$body.on(o.touchstart, "#" + n + "> ." + a.panels + "> ." + a.current, function(e) {
                    t.vars.opened && (s || (s = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), s = !1))
                }).on(o.touchmove, "#" + n + "> ." + a.panels + "> ." + a.current, function(e) {
                    t.vars.opened && i(this)[0].scrollHeight > i(this).innerHeight() && e.stopPropagation()
                }), r.$wndw.on(o.orientationchange, function() {
                    t.$pnls.children("." + a.current).scrollTop(0).css({
                        "-webkit-overflow-scrolling": "auto"
                    }).css({
                        "-webkit-overflow-scrolling": "touch"
                    })
                })
            }
        },
        add: function() {
            a = i[l]._c, i[l]._d, o = i[l]._e
        },
        clickAnchor: function(e, t) {}
    }, i[l].defaults[d] = {
        fix: !0
    }
}(jQuery),
function(a) {
    var o, e, t = "mmenu",
        n = "autoHeight";
    a[t].addons[n] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var i = this.opts[n];
                if (this.conf[n], a[t].glbl, "boolean" == typeof i && i && (i = {
                        height: "auto"
                    }), "string" == typeof i && (i = {
                        height: i
                    }), "object" != typeof i && (i = {}), "auto" == (i = this.opts[n] = a.extend(!0, {}, a[t].defaults[n], i)).height || "highest" == i.height) {
                    this.$menu.addClass(o.autoheight);

                    function e(e) {
                        if (this.vars.opened) {
                            var t = parseInt(this.$pnls.css("top"), 10) || 0,
                                n = parseInt(this.$pnls.css("bottom"), 10) || 0,
                                s = 0;
                            this.$menu.addClass(o.measureheight), "auto" == i.height ? ((e = e || this.$pnls.children("." + o.current)).is("." + o.vertical) && (e = e.parents("." + o.panel).not("." + o.vertical).first()), s = e.outerHeight()) : "highest" == i.height && this.$pnls.children().each(function() {
                                var e = a(this);
                                e.is("." + o.vertical) && (e = e.parents("." + o.panel).not("." + o.vertical).first()), s = Math.max(s, e.outerHeight())
                            }), this.$menu.height(s + t + n).removeClass(o.measureheight)
                        }
                    }
                    this.bind("opening", e), "highest" == i.height && this.bind("initPanels", e), "auto" == i.height && (this.bind("update", e), this.bind("openPanel", e), this.bind("closePanel", e))
                }
            }
        },
        add: function() {
            o = a[t]._c, a[t]._d, e = a[t]._e, o.add("autoheight measureheight"), e.add("resize")
        },
        clickAnchor: function(e, t) {}
    }, a[t].defaults[n] = {
        height: "default"
    }
}(jQuery),
function(s) {
    var i, a, o = "mmenu",
        r = "backButton";
    s[o].addons[r] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var t = this,
                    e = this.opts[r];
                if (this.conf[r], a = s[o].glbl, "boolean" == typeof e && (e = {
                        close: e
                    }), "object" != typeof e && (e = {}), (e = s.extend(!0, {}, s[o].defaults[r], e)).close) {
                    var n = "#" + t.$menu.attr("id");
                    this.bind("opened", function(e) {
                        location.hash != n && history.pushState(null, document.title, n)
                    }), s(window).on("popstate", function(e) {
                        a.$html.hasClass(i.opened) ? (e.stopPropagation(), t.close()) : location.hash == n && (e.stopPropagation(), t.open())
                    })
                }
            }
        },
        add: function() {
            return window.history && window.history.pushState ? (i = s[o]._c, s[o]._d, void s[o]._e) : void(s[o].addons[r].setup = function() {})
        },
        clickAnchor: function(e, t) {}
    }, s[o].defaults[r] = {
        close: !1
    }
}(jQuery),
function(o) {
    var r, l, d = "mmenu",
        c = "columns";
    o[d].addons[c] = {
        setup: function() {
            var t = this.opts[c];
            if (this.conf[c], l = o[d].glbl, "boolean" == typeof t && (t = {
                    add: t
                }), "number" == typeof t && (t = {
                    add: !0,
                    visible: t
                }), "object" != typeof t && (t = {}), "number" == typeof t.visible && (t.visible = {
                    min: t.visible,
                    max: t.visible
                }), (t = this.opts[c] = o.extend(!0, {}, o[d].defaults[c], t)).add) {
                t.visible.min = Math.max(1, Math.min(6, t.visible.min)), t.visible.max = Math.max(t.visible.min, Math.min(6, t.visible.max)), this.$menu.addClass(r.columns);
                for (var n = this.opts.offCanvas ? this.$menu.add(l.$html) : this.$menu, s = [], e = 0; e <= t.visible.max; e++) s.push(r.columns + "-" + e);
                s = s.join(" ");

                function i() {
                    var e = this.$pnls.children("." + r.panel).filter("." + r.opened).length;
                    e = Math.min(t.visible.max, Math.max(t.visible.min, e)), n.removeClass(s).addClass(r.columns + "-" + e)
                }
                var a = function(e) {
                    this.$pnls.children("." + r.panel).removeClass(s).filter("." + r.subopened).removeClass(r.hidden).add(e).slice(-t.visible.max).each(function(e) {
                        o(this).addClass(r.columns + "-" + e)
                    })
                };
                this.bind("open", i), this.bind("close", function() {
                    this.opts.offCanvas && l.$html.removeClass(s)
                }), this.bind("initPanels", function(e) {
                    a.call(this, this.$pnls.children("." + r.current))
                }), this.bind("openPanel", a), this.bind("openingPanel", i), this.bind("openedPanel", i), this.opts.offCanvas || i.call(this)
            }
        },
        add: function() {
            r = o[d]._c, o[d]._d, o[d]._e, r.add("columns")
        },
        clickAnchor: function(e, t) {
            if (!this.opts[c].add) return !1;
            if (t) {
                var n = e.attr("href");
                if (1 < n.length && "#" == n.slice(0, 1)) try {
                    if (o(n, this.$menu).is("." + r.panel))
                        for (var s = parseInt(e.closest("." + r.panel).attr("class").split(r.columns + "-")[1].split(" ")[0], 10) + 1; !1 !== s;) {
                            var i = this.$pnls.children("." + r.columns + "-" + s);
                            if (!i.length) {
                                s = !1;
                                break
                            }
                            s++, i.removeClass(r.subopened).removeClass(r.opened).removeClass(r.current).removeClass(r.highest).addClass(r.hidden)
                        }
                } catch (e) {}
            }
        }
    }, o[d].defaults[c] = {
        add: !1,
        visible: {
            min: 1,
            max: 3
        }
    }
}(jQuery),
function(i) {
    var a, o, e = "mmenu",
        t = "counters";
    i[e].addons[t] = {
        setup: function() {
            var s = this,
                n = this.opts[t];
            this.conf[t], i[e].glbl, "boolean" == typeof n && (n = {
                add: n,
                update: n
            }), "object" != typeof n && (n = {}), n = this.opts[t] = i.extend(!0, {}, i[e].defaults[t], n), this.bind("initPanels", function(e) {
                this.__refactorClass(i("em", e), this.conf.classNames[t].counter, "counter")
            }), n.add && this.bind("initPanels", function(e) {
                var t;
                switch (n.addTo) {
                    case "panels":
                        t = e;
                        break;
                    default:
                        t = e.filter(n.addTo)
                }
                t.each(function() {
                    var e = i(this).data(o.parent);
                    e && (e.children("em." + a.counter).length || e.prepend(i('<em class="' + a.counter + '" />')))
                })
            }), n.update && this.bind("update", function() {
                this.$pnls.find("." + a.panel).each(function() {
                    var e = i(this),
                        t = e.data(o.parent);
                    if (t) {
                        var n = t.children("em." + a.counter);
                        n.length && ((e = e.children("." + a.listview)).length && n.html(s.__filterListItems(e.children()).length))
                    }
                })
            })
        },
        add: function() {
            a = i[e]._c, o = i[e]._d, i[e]._e, a.add("counter search noresultsmsg")
        },
        clickAnchor: function(e, t) {}
    }, i[e].defaults[t] = {
        add: !1,
        addTo: "panels",
        update: !1
    }, i[e].configuration.classNames[t] = {
        counter: "Counter"
    }
}(jQuery),
function(i) {
    var a, o, e = "mmenu",
        r = "dividers";
    i[e].addons[r] = {
        setup: function() {
            var n = this,
                s = this.opts[r];
            if (this.conf[r], i[e].glbl, "boolean" == typeof s && (s = {
                    add: s,
                    fixed: s
                }), "object" != typeof s && (s = {}), s = this.opts[r] = i.extend(!0, {}, i[e].defaults[r], s), this.bind("initPanels", function(e) {
                    this.__refactorClass(i("li", this.$menu), this.conf.classNames[r].collapsed, "collapsed")
                }), s.add && this.bind("initPanels", function(e) {
                    var t;
                    switch (s.addTo) {
                        case "panels":
                            t = e;
                            break;
                        default:
                            t = e.filter(s.addTo)
                    }
                    i("." + a.divider, t).remove(), t.find("." + a.listview).not("." + a.vertical).each(function() {
                        var t = "";
                        n.__filterListItems(i(this).children()).each(function() {
                            var e = i.trim(i(this).children("a, span").text()).slice(0, 1).toLowerCase();
                            e != t && e.length && (t = e, i('<li class="' + a.divider + '">' + e + "</li>").insertBefore(this))
                        })
                    })
                }), s.collapse && this.bind("initPanels", function(e) {
                    i("." + a.divider, e).each(function() {
                        var e = i(this);
                        e.nextUntil("." + a.divider, "." + a.collapsed).length && (e.children("." + a.subopen).length || (e.wrapInner("<span />"), e.prepend('<a href="#" class="' + a.subopen + " " + a.fullsubopen + '" />')))
                    })
                }), s.fixed) {
                function t(e) {
                    if ((e = e || this.$pnls.children("." + a.current)).find("." + a.divider).not("." + a.hidden).length) {
                        this.$menu.addClass(a.hasdividers);
                        var t = e.scrollTop() || 0,
                            n = "";
                        e.is(":visible") && e.find("." + a.divider).not("." + a.hidden).each(function() {
                            i(this).position().top + t < t + 1 && (n = i(this).text())
                        }), this.$fixeddivider.text(n)
                    } else this.$menu.removeClass(a.hasdividers)
                }
                this.$fixeddivider = i('<ul class="' + a.listview + " " + a.fixeddivider + '"><li class="' + a.divider + '"></li></ul>').prependTo(this.$pnls).children(), this.bind("openPanel", t), this.bind("update", t), this.bind("initPanels", function(e) {
                    e.off(o.scroll + "-dividers " + o.touchmove + "-dividers").on(o.scroll + "-dividers " + o.touchmove + "-dividers", function(e) {
                        t.call(n, i(this))
                    })
                })
            }
        },
        add: function() {
            a = i[e]._c, i[e]._d, o = i[e]._e, a.add("collapsed uncollapsed fixeddivider hasdividers"), o.add("scroll")
        },
        clickAnchor: function(e, t) {
            if (this.opts[r].collapse && t) {
                var n = e.parent();
                if (n.is("." + a.divider)) {
                    var s = n.nextUntil("." + a.divider, "." + a.collapsed);
                    return n.toggleClass(a.opened), s[n.hasClass(a.opened) ? "addClass" : "removeClass"](a.uncollapsed), !0
                }
            }
            return !1
        }
    }, i[e].defaults[r] = {
        add: !1,
        addTo: "panels",
        fixed: !1,
        collapse: !1
    }, i[e].configuration.classNames[r] = {
        collapsed: "Collapsed"
    }
}(jQuery),
function(m) {
    function g(e, t, n) {
        return e < t && (e = t), n < e && (e = n), e
    }
    var b, a, s, e = "mmenu",
        _ = "drag";
    m[e].addons[_] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var t = this.opts[_],
                    n = this.conf[_];
                s = m[e].glbl, "boolean" == typeof t && (t = {
                    menu: t,
                    panels: t
                }), "object" != typeof t && (t = {}), "boolean" == typeof t.menu && (t.menu = {
                    open: t.menu
                }), "object" != typeof t.menu && (t.menu = {}), "boolean" == typeof t.panels && (t.panels = {
                    close: t.panels
                }), "object" != typeof t.panels && (t.panels = {}), (t = this.opts[_] = m.extend(!0, {}, m[e].defaults[_], t)).menu.open && function(t, n, s) {
                    var i, a, o, r, l, d = this,
                        c = {},
                        h = 0,
                        u = !1,
                        p = !1,
                        f = 0,
                        v = 0;
                    switch (this.opts.offCanvas.position) {
                        case "left":
                        case "right":
                            c.events = "panleft panright", c.typeLower = "x", c.typeUpper = "X", p = "width";
                            break;
                        case "top":
                        case "bottom":
                            c.events = "panup pandown", c.typeLower = "y", c.typeUpper = "Y", p = "height"
                    }
                    switch (this.opts.offCanvas.position) {
                        case "right":
                        case "bottom":
                            c.negative = !0, r = function(e) {
                                e >= s.$wndw[p]() - t.maxStartPos && (h = 1)
                            };
                            break;
                        default:
                            c.negative = !1, r = function(e) {
                                e <= t.maxStartPos && (h = 1)
                            }
                    }
                    switch (this.opts.offCanvas.position) {
                        case "left":
                            c.open_dir = "right", c.close_dir = "left";
                            break;
                        case "right":
                            c.open_dir = "left", c.close_dir = "right";
                            break;
                        case "top":
                            c.open_dir = "down", c.close_dir = "up";
                            break;
                        case "bottom":
                            c.open_dir = "up", c.close_dir = "down"
                    }
                    switch (this.opts.offCanvas.zposition) {
                        case "front":
                            l = function() {
                                return this.$menu
                            };
                            break;
                        default:
                            l = function() {
                                return m("." + b.slideout)
                            }
                    }
                    var e = this.__valueOrFn(t.node, this.$menu, s.$page);
                    "string" == typeof e && (e = m(e)), new Hammer(e[0], this.opts[_].vendors.hammer).on("panstart", function(e) {
                        r(e.center[c.typeLower]), s.$slideOutNodes = l(), u = c.open_dir
                    }).on(c.events + " panend", function(e) {
                        0 < h && e.preventDefault()
                    }).on(c.events, function(e) {
                        if (i = e["delta" + c.typeUpper], c.negative && (i = -i), i != f && (u = f <= i ? c.open_dir : c.close_dir), (f = i) > t.threshold && 1 == h) {
                            if (s.$html.hasClass(b.opened)) return;
                            h = 2, d._openSetup(), d.trigger("opening"), s.$html.addClass(b.dragging), v = g(s.$wndw[p]() * n[p].perc, n[p].min, n[p].max)
                        }
                        2 == h && (a = g(f, 10, v) - ("front" == d.opts.offCanvas.zposition ? v : 0), c.negative && (a = -a), o = "translate" + c.typeUpper + "(" + a + "px )", s.$slideOutNodes.css({
                            "-webkit-transform": "-webkit-" + o,
                            transform: o
                        }))
                    }).on("panend", function(e) {
                        2 == h && (s.$html.removeClass(b.dragging), s.$slideOutNodes.css("transform", ""), d[u == c.open_dir ? "_openFinish" : "close"]()), h = 0
                    })
                }.call(this, t.menu, n.menu, s), t.panels.close && this.bind("initPanels", function(e) {
                    (function(e, t, n, s) {
                        var i = this;
                        e.each(function() {
                            var e = m(this),
                                t = e.data(a.parent);
                            t && (t = t.closest("." + b.panel)).length && new Hammer(e[0], i.opts[_].vendors.hammer).on("panright", function(e) {
                                i.openPanel(t)
                            })
                        })
                    }).call(this, e, t.panels, n.panels, s)
                })
            }
        },
        add: function() {
            return "function" != typeof Hammer || Hammer.VERSION < 2 ? void(m[e].addons[_].setup = function() {}) : (b = m[e]._c, a = m[e]._d, m[e]._e, void b.add("dragging"))
        },
        clickAnchor: function(e, t) {}
    }, m[e].defaults[_] = {
        menu: {
            open: !1,
            maxStartPos: 100,
            threshold: 50
        },
        panels: {
            close: !1
        },
        vendors: {
            hammer: {}
        }
    }, m[e].configuration[_] = {
        menu: {
            width: {
                perc: .8,
                min: 140,
                max: 440
            },
            height: {
                perc: .8,
                min: 140,
                max: 880
            }
        },
        panels: {}
    }
}(jQuery),
function($) {
    var y, i, a, x, w = "mmenu",
        k = "dropdown";
    $[w].addons[k] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var t = this,
                    b = this.opts[k],
                    _ = this.conf[k];
                if (x = $[w].glbl, "boolean" == typeof b && b && (b = {
                        drop: b
                    }), "object" != typeof b && (b = {}), "string" == typeof b.position && (b.position = { of: b.position
                    }), (b = this.opts[k] = $.extend(!0, {}, $[w].defaults[k], b)).drop) {
                    if ("string" != typeof b.position.of) {
                        var e = this.$menu.attr("id");
                        e && e.length && (this.conf.clone && (e = y.umm(e)), b.position.of = '[href="#' + e + '"]')
                    }
                    if ("string" == typeof b.position.of) {
                        var C = $(b.position.of);
                        if (C.length) {
                            this.$menu.addClass(y.dropdown), b.tip && this.$menu.addClass(y.tip), b.event = b.event.split(" "), 1 == b.event.length && (b.event[1] = b.event[0]), "hover" == b.event[0] && C.on(a.mouseenter + "-dropdown", function() {
                                t.open()
                            }), "hover" == b.event[1] && this.$menu.on(a.mouseleave + "-dropdown", function() {
                                t.close()
                            }), this.bind("opening", function() {
                                this.$menu.data(i.style, this.$menu.attr("style") || ""), x.$html.addClass(y.dropdown)
                            }), this.bind("closed", function() {
                                this.$menu.attr("style", this.$menu.data(i.style)), x.$html.removeClass(y.dropdown)
                            });

                            function n(e, t) {
                                var n, s, i = t[0],
                                    a = t[1],
                                    o = "x" == e ? "scrollLeft" : "scrollTop",
                                    r = "x" == e ? "outerWidth" : "outerHeight",
                                    l = "x" == e ? "left" : "top",
                                    d = "x" == e ? "right" : "bottom",
                                    c = "x" == e ? "width" : "height",
                                    h = "x" == e ? "maxWidth" : "maxHeight",
                                    u = null,
                                    p = x.$wndw[o](),
                                    f = C.offset()[l] -= p,
                                    v = f + C[r](),
                                    m = x.$wndw[c](),
                                    g = _.offset.button[e] + _.offset.viewport[e];
                                if (b.position[e]) switch (b.position[e]) {
                                    case "left":
                                    case "bottom":
                                        u = "after";
                                        break;
                                    case "right":
                                    case "top":
                                        u = "before"
                                }
                                return null === u && (u = f + (v - f) / 2 < m / 2 ? "after" : "before"), "after" == u ? (s = m - ((n = "x" == e ? f : v) + g), i[l] = n + _.offset.button[e], i[d] = "auto", a.push(y["x" == e ? "tipleft" : "tiptop"])) : (s = (n = "x" == e ? v : f) - g, i[d] = "calc( 100% - " + (n - _.offset.button[e]) + "px )", i[l] = "auto", a.push(y["x" == e ? "tipright" : "tipbottom"])), i[h] = Math.min($[w].configuration[k][c].max, s), [i, a]
                            }

                            function s(e) {
                                if (this.vars.opened) {
                                    this.$menu.attr("style", this.$menu.data(i.style));
                                    var t = [{},
                                        []
                                    ];
                                    t = n.call(this, "y", t), t = n.call(this, "x", t), this.$menu.css(t[0]), b.tip && this.$menu.removeClass(y.tipleft + " " + y.tipright + " " + y.tiptop + " " + y.tipbottom).addClass(t[1].join(" "))
                                }
                            }
                            this.bind("opening", s), x.$wndw.on(a.resize + "-dropdown", function(e) {
                                s.call(t)
                            }), this.opts.offCanvas.blockUI || x.$wndw.on(a.scroll + "-dropdown", function(e) {
                                s.call(t)
                            })
                        }
                    }
                }
            }
        },
        add: function() {
            y = $[w]._c, i = $[w]._d, a = $[w]._e, y.add("dropdown tip tipleft tipright tiptop tipbottom"), a.add("mouseenter mouseleave resize scroll")
        },
        clickAnchor: function(e, t) {}
    }, $[w].defaults[k] = {
        drop: !1,
        event: "click",
        position: {},
        tip: !0
    }, $[w].configuration[k] = {
        offset: {
            button: {
                x: -10,
                y: 10
            },
            viewport: {
                x: 20,
                y: 20
            }
        },
        height: {
            max: 880
        },
        width: {
            max: 440
        }
    }
}(jQuery),
function(n) {
    var e, s, i = "mmenu",
        a = "fixedElements";
    n[i].addons[a] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var e = this.opts[a];
                this.conf[a], s = n[i].glbl, e = this.opts[a] = n.extend(!0, {}, n[i].defaults[a], e);

                function t(e) {
                    var t = this.conf.classNames[a].fixed;
                    this.__refactorClass(e.find("." + t), t, "slideout").appendTo(s.$body)
                }
                t.call(this, s.$page), this.bind("setPage", t)
            }
        },
        add: function() {
            e = n[i]._c, n[i]._d, n[i]._e, e.add("fixed")
        },
        clickAnchor: function(e, t) {}
    }, n[i].configuration.classNames[a] = {
        fixed: "Fixed"
    }
}(jQuery),
function(a) {
    var o, r = "mmenu",
        l = "iconPanels";
    a[r].addons[l] = {
        setup: function() {
            var t = this,
                n = this.opts[l];
            if (this.conf[l], a[r].glbl, "boolean" == typeof n && (n = {
                    add: n
                }), "number" == typeof n && (n = {
                    add: !0,
                    visible: n
                }), "object" != typeof n && (n = {}), (n = this.opts[l] = a.extend(!0, {}, a[r].defaults[l], n)).visible++, n.add) {
                this.$menu.addClass(o.iconpanel);
                for (var s = [], e = 0; e <= n.visible; e++) s.push(o.iconpanel + "-" + e);
                s = s.join(" ");

                function i(e) {
                    e.hasClass(o.vertical) || t.$pnls.children("." + o.panel).removeClass(s).filter("." + o.subopened).removeClass(o.hidden).add(e).not("." + o.vertical).slice(-n.visible).each(function(e) {
                        a(this).addClass(o.iconpanel + "-" + e)
                    })
                }
                this.bind("openPanel", i), this.bind("initPanels", function(e) {
                    i.call(t, t.$pnls.children("." + o.current)), e.not("." + o.vertical).each(function() {
                        a(this).children("." + o.subblocker).length || a(this).prepend('<a href="#' + a(this).closest("." + o.panel).attr("id") + '" class="' + o.subblocker + '" />')
                    })
                })
            }
        },
        add: function() {
            o = a[r]._c, a[r]._d, a[r]._e, o.add("iconpanel subblocker")
        },
        clickAnchor: function(e, t) {}
    }, a[r].defaults[l] = {
        add: !1,
        visible: 3
    }
}(jQuery),
function(p) {
    var f, v = "mmenu",
        m = "navbars";
    p[v].addons[m] = {
        setup: function() {
            var d = this,
                c = this.opts[m],
                h = this.conf[m];
            if (p[v].glbl, void 0 !== c) {
                c instanceof Array || (c = [c]);
                var u = {};
                for (var e in p.each(c, function(e) {
                        var t = c[e];
                        "boolean" == typeof t && t && (t = {}), "object" != typeof t && (t = {}), void 0 === t.content && (t.content = ["prev", "title"]), t.content instanceof Array || (t.content = [t.content]);
                        var n = (t = p.extend(!0, {}, d.opts.navbar, t)).position,
                            s = t.height;
                        "number" != typeof s && (s = 1), s = Math.min(4, Math.max(1, s)), "bottom" != n && (n = "top"), u[n] || (u[n] = 0), u[n]++;
                        var i = p("<div />").addClass(f.navbar + " " + f.navbar + "-" + n + " " + f.navbar + "-" + n + "-" + u[n] + " " + f.navbar + "-size-" + s);
                        u[n] += s - 1;
                        for (var a = 0, o = 0, r = t.content.length; o < r; o++) {
                            var l = p[v].addons[m][t.content[o]] || !1;
                            l ? a += l.call(d, i, t, h) : ((l = t.content[o]) instanceof p || (l = p(t.content[o])), i.append(l))
                        }
                        1 < (a += Math.ceil(i.children().not("." + f.btn).length / s)) && i.addClass(f.navbar + "-content-" + a), i.children("." + f.btn).length && i.addClass(f.hasbtns), i.prependTo(d.$menu)
                    }), u) d.$menu.addClass(f.hasnavbar + "-" + e + "-" + u[e])
            }
        },
        add: function() {
            f = p[v]._c, p[v]._d, p[v]._e, f.add("close hasbtns")
        },
        clickAnchor: function(e, t) {}
    }, p[v].configuration[m] = {
        breadcrumbSeparator: "/"
    }, p[v].configuration.classNames[m] = {}
}(jQuery),
function(d) {
    var i = "mmenu";
    d[i].addons.navbars.breadcrumbs = function(e, t, o) {
        var r = d[i]._c,
            l = d[i]._d;
        r.add("breadcrumbs separator");
        var n = d('<span class="' + r.breadcrumbs + '" />').appendTo(e);
        this.bind("initPanels", function(e) {
            e.removeClass(r.hasnavbar).each(function() {
                for (var e = [], t = d(this), n = d('<span class="' + r.breadcrumbs + '"></span>'), s = d(this).children().first(), i = !0; s && s.length;) {
                    s.is("." + r.panel) || (s = s.closest("." + r.panel));
                    var a = s.children("." + r.navbar).children("." + r.title).text();
                    e.unshift(i ? "<span>" + a + "</span>" : '<a href="#' + s.attr("id") + '">' + a + "</a>"), i = !1, s = s.data(l.parent)
                }
                n.append(e.join('<span class="' + r.separator + '">' + o.breadcrumbSeparator + "</span>")).appendTo(t.children("." + r.navbar))
            })
        });

        function s() {
            n.html(this.$pnls.children("." + r.current).children("." + r.navbar).children("." + r.breadcrumbs).html())
        }
        return this.bind("openPanel", s), this.bind("initPanels", s), 0
    }
}(jQuery),
function(o) {
    var r = "mmenu";
    o[r].addons.navbars.close = function(e, t) {
        function n(e) {
            a.attr("href", "#" + e.attr("id"))
        }
        var s = o[r]._c,
            i = o[r].glbl,
            a = o('<a class="' + s.close + " " + s.btn + '" href="#" />').appendTo(e);
        return n.call(this, i.$page), this.bind("setPage", n), -1
    }
}(jQuery),
function(r) {
    var l = "mmenu",
        d = "navbars";
    r[l].addons[d].next = function(e, t) {
        function n(e) {
            var t = (e = e || this.$pnls.children("." + a.current)).find("." + this.conf.classNames[d].panelNext);
            s = t.attr("href"), i = t.html(), o[s ? "attr" : "removeAttr"]("href", s), o[s || i ? "removeClass" : "addClass"](a.hidden), o.html(i)
        }
        var s, i, a = r[l]._c,
            o = r('<a class="' + a.next + " " + a.btn + '" href="#" />').appendTo(e);
        return this.bind("openPanel", n), this.bind("initPanels", function() {
            n.call(this)
        }), -1
    }, r[l].configuration.classNames[d].panelNext = "Next"
}(jQuery),
function(r) {
    var l = "mmenu",
        d = "navbars";
    r[l].addons[d].prev = function(e, t) {
        var n = r[l]._c,
            s = r('<a class="' + n.prev + " " + n.btn + '" href="#" />').appendTo(e);
        this.bind("initPanels", function(e) {
            e.removeClass(n.hasnavbar).children("." + n.navbar).addClass(n.hidden)
        });

        function i(e) {
            if (!(e = e || this.$pnls.children("." + n.current)).hasClass(n.vertical)) {
                var t = e.find("." + this.conf.classNames[d].panelPrev);
                t.length || (t = e.children("." + n.navbar).children("." + n.prev)), a = t.attr("href"), o = t.html(), s[a ? "attr" : "removeAttr"]("href", a), s[a || o ? "removeClass" : "addClass"](n.hidden), s.html(o)
            }
        }
        var a, o;
        return this.bind("openPanel", i), this.bind("initPanels", function() {
            i.call(this)
        }), -1
    }, r[l].configuration.classNames[d].panelPrev = "Prev"
}(jQuery),
function(i) {
    i.mmenu.addons.navbars.searchfield = function(e, t) {
        var n = i.mmenu._c,
            s = i('<div class="' + n.search + '" />').appendTo(e);
        return "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = s, 0
    }
}(jQuery),
function(r) {
    var l = "mmenu",
        d = "navbars";
    r[l].addons[d].title = function(e, n) {
        function t(e) {
            if (!(e = e || this.$pnls.children("." + a.current)).hasClass(a.vertical)) {
                var t = e.find("." + this.conf.classNames[d].panelTitle);
                t.length || (t = e.children("." + a.navbar).children("." + a.title)), s = t.attr("href"), i = t.html() || n.title, o[s ? "attr" : "removeAttr"]("href", s), o[s || i ? "removeClass" : "addClass"](a.hidden), o.html(i)
            }
        }
        var s, i, a = r[l]._c,
            o = r('<a class="' + a.title + '" />').appendTo(e);
        return this.bind("openPanel", t), this.bind("initPanels", function(e) {
            t.call(this)
        }), 0
    }, r[l].configuration.classNames[d].panelTitle = "Title"
}(jQuery),
function(t) {
    var n, s, i = "mmenu";
    t[i].addons.rtl = {
        setup: function() {
            var e = this.opts.rtl;
            this.conf.rtl, s = t[i].glbl, "object" != typeof e && (e = {
                use: e
            }), "boolean" != typeof(e = this.opts.rtl = t.extend(!0, {}, t[i].defaults.rtl, e)).use && (e.use = "rtl" == (s.$html.attr("dir") || "").toLowerCase()), e.use && this.$menu.addClass(n.rtl)
        },
        add: function() {
            n = t[i]._c, t[i]._d, t[i]._e, n.add("rtl")
        },
        clickAnchor: function(e, t) {}
    }, t[i].defaults.rtl = {
        use: "detect"
    }
}(jQuery),
function(o) {
    function r(e, t, n) {
        e.prop("aria-" + t, n)[n ? "attr" : "removeAttr"]("aria-" + t, "true")
    }

    function l(e) {
        return '<span class="' + d.sronly + '">' + e + "</span>"
    }
    var d, c = "mmenu",
        h = "screenReader";
    o[c].addons[h] = {
        setup: function() {
            var e = this.opts[h],
                t = this.conf[h];
            if (o[c].glbl, "boolean" == typeof e && (e = {
                    aria: e,
                    text: e
                }), "object" != typeof e && (e = {}), (e = this.opts[h] = o.extend(!0, {}, o[c].defaults[h], e)).aria) {
                if (this.opts.offCanvas) {
                    function n() {
                        r(this.$menu, "hidden", !0)
                    }
                    this.bind("open", function() {
                        r(this.$menu, "hidden", !1)
                    }), this.bind("close", n), n.call(this)
                }

                function s() {
                    r(this.$menu.find("." + d.hidden), "hidden", !0), r(this.$menu.find('[aria-hidden="true"]').not("." + d.hidden), "hidden", !1)
                }
                this.bind("update", s), this.bind("openPanel", s), this.bind("openPanel", function(e) {
                    r(this.$pnls.children("." + d.panel).not(e).not("." + d.hidden), "hidden", !0), r(e, "hidden", !1)
                });

                function i(e) {
                    r(e.find("." + d.prev + ", ." + d.next), "haspopup", !0)
                }
                this.bind("initPanels", i), i.call(this, this.$menu.children("." + d.navbar))
            }
            if (e.text) {
                function a(e) {
                    e.children("." + d.navbar).children("." + d.prev).html(l(t.text.closeSubmenu)).end().children("." + d.next).html(l(t.text.openSubmenu)).end().children("." + d.close).html(l(t.text.closeMenu)), e.is("." + d.panel) && e.find("." + d.listview).find("." + d.next).each(function() {
                        o(this).html(l(t.text[o(this).parent().is("." + d.vertical) ? "toggleSubmenu" : "openSubmenu"]))
                    })
                }
                this.bind("initPanels", a), a.call(this, this.$menu)
            }
        },
        add: function() {
            d = o[c]._c, o[c]._d, o[c]._e, d.add("sronly")
        },
        clickAnchor: function(e, t) {}
    }, o[c].defaults[h] = {
        aria: !1,
        text: !1
    }, o[c].configuration[h] = {
        text: {
            closeMenu: "Close menu",
            closeSubmenu: "Close submenu",
            openSubmenu: "Open submenu",
            toggleSubmenu: "Toggle submenu"
        }
    }
}(jQuery),
function(f) {
    var v, m, g, e = "mmenu",
        b = "searchfield";
    f[e].addons[b] = {
        setup: function() {
            var u = this,
                p = this.opts[b],
                d = this.conf[b];
            f[e].glbl, "boolean" == typeof p && (p = {
                add: p
            }), "object" != typeof p && (p = {}), "boolean" == typeof p.resultsPanel && (p.resultsPanel = {
                add: p.resultsPanel
            }), p = this.opts[b] = f.extend(!0, {}, f[e].defaults[b], p), d = this.conf[b] = f.extend(!0, {}, f[e].configuration[b], d), this.bind("close", function() {
                this.$menu.find("." + v.search).find("input").blur()
            }), this.bind("initPanels", function(e) {
                if (p.add) {
                    var t;
                    switch (p.addTo) {
                        case "panels":
                            t = e;
                            break;
                        default:
                            t = this.$menu.find(p.addTo)
                    }
                    if (t.each(function() {
                            var e = f(this);
                            if (!e.is("." + v.panel) || !e.is("." + v.vertical)) {
                                if (!e.children("." + v.search).length) {
                                    var t, n = u.__valueOrFn(d.clear, e),
                                        s = u.__valueOrFn(d.form, e),
                                        i = u.__valueOrFn(d.input, e),
                                        a = u.__valueOrFn(d.submit, e),
                                        o = f("<" + (s ? "form" : "div") + ' class="' + v.search + '" />'),
                                        r = f('<input placeholder="' + p.placeholder + '" type="text" autocomplete="off" />');
                                    if (o.append(r), i)
                                        for (t in i) r.attr(t, i[t]);
                                    if (n && f('<a class="' + v.btn + " " + v.clear + '" href="#" />').appendTo(o).on(g.click + "-searchfield", function(e) {
                                            e.preventDefault(), r.val("").trigger(g.keyup + "-searchfield")
                                        }), s) {
                                        for (t in s) o.attr(t, s[t]);
                                        a && !n && f('<a class="' + v.btn + " " + v.next + '" href="#" />').appendTo(o).on(g.click + "-searchfield", function(e) {
                                            e.preventDefault(), o.submit()
                                        })
                                    }
                                    e.hasClass(v.search) ? e.replaceWith(o) : e.prepend(o).addClass(v.hassearch)
                                }
                                if (p.noResults)
                                    if (e.closest("." + v.panel).length || (e = u.$pnls.children("." + v.panel).first()), !e.children("." + v.noresultsmsg).length) {
                                        var l = e.children("." + v.listview).first();
                                        f('<div class="' + v.noresultsmsg + " " + v.hidden + '" />').append(p.noResults)[l.length ? "insertAfter" : "prependTo"](l.length ? l : e)
                                    }
                            }
                        }), p.search) {
                        if (p.resultsPanel.add) {
                            p.showSubPanels = !1;
                            var h = this.$pnls.children("." + v.resultspanel);
                            h.length || (h = f('<div class="' + v.panel + " " + v.resultspanel + " " + v.hidden + '" />').appendTo(this.$pnls).append('<div class="' + v.navbar + " " + v.hidden + '"><a class="' + v.title + '">' + p.resultsPanel.title + "</a></div>").append('<ul class="' + v.listview + '" />').append(this.$pnls.find("." + v.noresultsmsg).first().clone()), this.initPanels(h))
                        }
                        this.$menu.find("." + v.search).each(function() {
                            var n, s, e = f(this),
                                i = e.closest("." + v.panel).length;
                            s = i ? n = e.closest("." + v.panel) : (n = f("." + v.panel, u.$menu), u.$menu), p.resultsPanel.add && (n = n.not(h));

                            function t() {
                                var e = a.val().toLowerCase();
                                if (e != d) {
                                    if (d = e, p.resultsPanel.add && h.children("." + v.listview).empty(), n.scrollTop(0), l.add(r).addClass(v.hidden).find("." + v.fullsubopensearch).removeClass(v.fullsubopen + " " + v.fullsubopensearch), l.each(function() {
                                            var e = f(this),
                                                t = "a";
                                            (p.showTextItems || p.showSubPanels && e.find("." + v.next)) && (t = "a, span"), -1 < (e.data(m.searchtext) || e.children(t).text()).toLowerCase().indexOf(d) && e.add(e.prevAll("." + v.divider).first()).removeClass(v.hidden)
                                        }), p.showSubPanels && n.each(function(e) {
                                            var t = f(this);
                                            u.__filterListItems(t.find("." + v.listview).children()).each(function() {
                                                var e = f(this),
                                                    t = e.data(m.child);
                                                e.removeClass(v.nosubresults), t && t.find("." + v.listview).children().removeClass(v.hidden)
                                            })
                                        }), p.resultsPanel.add)
                                        if ("" === d) this.closeAllPanels(), this.openPanel(this.$pnls.children("." + v.subopened).last());
                                        else {
                                            var t = f();
                                            n.each(function() {
                                                var e = u.__filterListItems(f(this).find("." + v.listview).children()).not("." + v.hidden).clone(!0);
                                                e.length && (p.resultsPanel.dividers && (t = t.add('<li class="' + v.divider + '">' + f(this).children("." + v.navbar).text() + "</li>")), t = t.add(e))
                                            }), t.find("." + v.next).remove(), h.children("." + v.listview).append(t), this.openPanel(h)
                                        }
                                    else f(n.get().reverse()).each(function(e) {
                                        var t = f(this),
                                            n = t.data(m.parent);
                                        n && (u.__filterListItems(t.find("." + v.listview).children()).length ? (n.hasClass(v.hidden) && n.children("." + v.next).not("." + v.fullsubopen).addClass(v.fullsubopen).addClass(v.fullsubopensearch), n.removeClass(v.hidden).removeClass(v.nosubresults).prevAll("." + v.divider).first().removeClass(v.hidden)) : i || (t.hasClass(v.opened) && setTimeout(function() {
                                            u.openPanel(n.closest("." + v.panel))
                                        }, (e + 1) * (1.5 * u.conf.openingInterval)), n.addClass(v.nosubresults)))
                                    });
                                    s.find("." + v.noresultsmsg)[l.not("." + v.hidden).length ? "addClass" : "removeClass"](v.hidden), this.update()
                                }
                            }
                            var a = e.children("input"),
                                o = u.__findAddBack(n, "." + v.listview).children("li"),
                                r = o.filter("." + v.divider),
                                l = u.__filterListItems(o),
                                d = "";
                            a.off(g.keyup + "-" + b + " " + g.change + "-" + b).on(g.keyup + "-" + b, function(e) {
                                ! function(e) {
                                    switch (e) {
                                        case 9:
                                        case 16:
                                        case 17:
                                        case 18:
                                        case 37:
                                        case 38:
                                        case 39:
                                        case 40:
                                            return !0
                                    }
                                    return !1
                                }(e.keyCode) && t.call(u)
                            }).on(g.change + "-" + b, function(e) {
                                t.call(u)
                            });
                            var c = e.children("." + v.btn);
                            c.length && a.on(g.keyup + "-" + b, function(e) {
                                c[a.val().length ? "removeClass" : "addClass"](v.hidden)
                            }), a.trigger(g.keyup + "-" + b)
                        })
                    }
                }
            })
        },
        add: function() {
            v = f[e]._c, m = f[e]._d, g = f[e]._e, v.add("clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"), m.add("searchtext"), g.add("change keyup")
        },
        clickAnchor: function(e, t) {}
    }, f[e].defaults[b] = {
        add: !1,
        addTo: "panels",
        placeholder: "Search",
        noResults: "No results found.",
        resultsPanel: {
            add: !1,
            dividers: !0,
            title: "Search results"
        },
        search: !0,
        showTextItems: !1,
        showSubPanels: !0
    }, f[e].configuration[b] = {
        clear: !1,
        form: !1,
        input: !1,
        submit: !1
    }
}(jQuery),
function(r) {
    var l, i, e = "mmenu",
        t = "sectionIndexer";
    r[e].addons[t] = {
        setup: function() {
            var o = this,
                s = this.opts[t];
            this.conf[t], r[e].glbl, "boolean" == typeof s && (s = {
                add: s
            }), "object" != typeof s && (s = {}), s = this.opts[t] = r.extend(!0, {}, r[e].defaults[t], s), this.bind("initPanels", function(e) {
                if (s.add) {
                    var t;
                    switch (s.addTo) {
                        case "panels":
                            t = e;
                            break;
                        default:
                            t = r(s.addTo, this.$menu).filter("." + l.panel)
                    }
                    t.find("." + l.divider).closest("." + l.panel).addClass(l.hasindexer)
                }
                if (!this.$indexer && this.$pnls.children("." + l.hasindexer).length) {
                    this.$indexer = r('<div class="' + l.indexer + '" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'), this.$indexer.children().on(i.mouseover + "-sectionindexer " + l.touchstart + "-sectionindexer", function(e) {
                        var t = r(this).attr("href").slice(1),
                            n = o.$pnls.children("." + l.current),
                            s = n.find("." + l.listview),
                            i = !1,
                            a = n.scrollTop();
                        n.scrollTop(0), s.children("." + l.divider).not("." + l.hidden).each(function() {
                            !1 === i && t == r(this).text().slice(0, 1).toLowerCase() && (i = r(this).position().top)
                        }), n.scrollTop(!1 !== i ? i : a)
                    });

                    function n(e) {
                        o.$menu[(e.hasClass(l.hasindexer) ? "add" : "remove") + "Class"](l.hasindexer)
                    }
                    this.bind("openPanel", n), n.call(this, this.$pnls.children("." + l.current))
                }
            })
        },
        add: function() {
            l = r[e]._c, r[e]._d, i = r[e]._e, l.add("indexer hasindexer"), i.add("mouseover touchstart")
        },
        clickAnchor: function(e, t) {
            return !!e.parent().is("." + l.indexer) || void 0
        }
    }, r[e].defaults[t] = {
        add: !1,
        addTo: "panels"
    }
}(jQuery),
function(i) {
    var a, o, r = "mmenu",
        l = "setSelected";
    i[r].addons[l] = {
        setup: function() {
            var n = this,
                e = this.opts[l];
            if (this.conf[l], i[r].glbl, "boolean" == typeof e && (e = {
                    hover: e,
                    parent: e
                }), "object" != typeof e && (e = {}), "detect" == (e = this.opts[l] = i.extend(!0, {}, i[r].defaults[l], e)).current) {
                var s = function(e) {
                    e = e.split("?")[0].split("#")[0];
                    var t = n.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
                    t.length ? n.setSelected(t.parent(), !0) : (e = e.split("/").slice(0, -1)).length && s(e.join("/"))
                };
                s(window.location.href)
            } else e.current || this.bind("initPanels", function(e) {
                e.find("." + a.listview).children("." + a.selected).removeClass(a.selected)
            });
            if (e.hover && this.$menu.addClass(a.hoverselected), e.parent) {
                this.$menu.addClass(a.parentselected);

                function t(e) {
                    this.$pnls.find("." + a.listview).find("." + a.next).removeClass(a.selected);
                    for (var t = e.data(o.parent); t && t.length;) t = t.not("." + a.vertical).children("." + a.next).addClass(a.selected).end().closest("." + a.panel).data(o.parent)
                }
                this.bind("openedPanel", t), this.bind("initPanels", function(e) {
                    t.call(this, this.$pnls.children("." + a.current))
                })
            }
        },
        add: function() {
            a = i[r]._c, o = i[r]._d, i[r]._e, a.add("hoverselected parentselected")
        },
        clickAnchor: function(e, t) {}
    }, i[r].defaults[l] = {
        current: !0,
        hover: !1,
        parent: !1
    }
}(jQuery),
function(a) {
    var o, e = "mmenu",
        t = "toggles";
    a[e].addons[t] = {
        setup: function() {
            var i = this;
            this.opts[t], this.conf[t], a[e].glbl, this.bind("initPanels", function(e) {
                this.__refactorClass(a("input", e), this.conf.classNames[t].toggle, "toggle"), this.__refactorClass(a("input", e), this.conf.classNames[t].check, "check"), a("input." + o.toggle + ", input." + o.check, e).each(function() {
                    var e = a(this),
                        t = e.closest("li"),
                        n = e.hasClass(o.toggle) ? "toggle" : "check",
                        s = e.attr("id") || i.__getUniqueId();
                    t.children('label[for="' + s + '"]').length || (e.attr("id", s), t.prepend(e), a('<label for="' + s + '" class="' + o[n] + '"></label>').insertBefore(t.children("a, span").last()))
                })
            })
        },
        add: function() {
            o = a[e]._c, a[e]._d, a[e]._e, o.add("toggle check")
        },
        clickAnchor: function(e, t) {}
    }, a[e].configuration.classNames[t] = {
        toggle: "Toggle",
        check: "Check"
    }
}(jQuery);