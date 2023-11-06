var FlipClock, Base = function() {};
Base.extend = function(t, i) {
        "use strict";
        var e = Base.prototype.extend;
        Base._prototyping = !0;
        var s = new this;
        e.call(s, t), s.base = function() {}, delete Base._prototyping;
        var n = s.constructor,
            o = s.constructor = function() {
                if (!Base._prototyping)
                    if (this._constructing || this.constructor == o) this._constructing = !0, n.apply(this, arguments), delete this._constructing;
                    else if (null !== arguments[0]) return (arguments[0].extend || e).call(arguments[0], s)
            };
        return o.ancestor = this, o.extend = this.extend, o.forEach = this.forEach, o.implement = this.implement, o.prototype = s, o.toString = this.toString, o.valueOf = function(t) {
            return "object" == t ? o : n.valueOf()
        }, e.call(o, i), "function" == typeof o.init && o.init(), o
    }, Base.prototype = {
        extend: function(t, i) {
            if (1 < arguments.length) {
                var e = this[t];
                if (e && "function" == typeof i && (!e.valueOf || e.valueOf() != i.valueOf()) && /\bbase\b/.test(i)) {
                    var s = i.valueOf();
                    (i = function() {
                        var t = this.base || Base.prototype.base;
                        this.base = e;
                        var i = s.apply(this, arguments);
                        return this.base = t, i
                    }).valueOf = function(t) {
                        return "object" == t ? i : s
                    }, i.toString = Base.toString
                }
                this[t] = i
            } else if (t) {
                var n = Base.prototype.extend;
                Base._prototyping || "function" == typeof this || (n = this.extend || n);
                for (var o = {
                        toSource: null
                    }, a = ["constructor", "toString", "valueOf"], c = Base._prototyping ? 0 : 1; r = a[c++];) t[r] != o[r] && n.call(this, r, t[r]);
                for (var r in t) o[r] || n.call(this, r, t[r])
            }
            return this
        }
    }, Base = Base.extend({
        constructor: function() {
            this.extend(arguments[0])
        }
    }, {
        ancestor: Object,
        version: "1.1",
        forEach: function(t, i, e) {
            for (var s in t) void 0 === this.prototype[s] && i.call(e, t[s], s, t)
        },
        implement: function() {
            for (var t = 0; t < arguments.length; t++) "function" == typeof arguments[t] ? arguments[t](this.prototype) : this.prototype.extend(arguments[t]);
            return this
        },
        toString: function() {
            return String(this.valueOf())
        }
    }),
    function(e) {
        "use strict";
        (FlipClock = function(t, i, e) {
            return i instanceof Object && i instanceof Date == !1 && (e = i, i = 0), new FlipClock.Factory(t, i, e)
        }).Lang = {}, FlipClock.Base = Base.extend({
            buildDate: "2014-12-12",
            version: "0.7.7",
            constructor: function(t, i) {
                "object" != typeof t && (t = {}), "object" != typeof i && (i = {}), this.setOptions(e.extend(!0, {}, t, i))
            },
            callback: function(t) {
                if ("function" == typeof t) {
                    for (var i = [], e = 1; e <= arguments.length; e++) arguments[e] && i.push(arguments[e]);
                    t.apply(this, i)
                }
            },
            log: function(t) {
                window.console && console.log && console.log(t)
            },
            getOption: function(t) {
                return !!this[t] && this[t]
            },
            getOptions: function() {
                return this
            },
            setOption: function(t, i) {
                this[t] = i
            },
            setOptions: function(t) {
                for (var i in t) void 0 !== t[i] && this.setOption(i, t[i])
            }
        })
    }(jQuery),
    function(a) {
        "use strict";
        FlipClock.Face = FlipClock.Base.extend({
            autoStart: !0,
            dividers: [],
            factory: !1,
            lists: [],
            constructor: function(t, i) {
                this.dividers = [], this.lists = [], this.base(i), this.factory = t
            },
            build: function() {
                this.autoStart && this.start()
            },
            createDivider: function(t, i, e) {
                "boolean" != typeof i && i || (e = i, i = t);
                var s = ['<span class="' + this.factory.classes.dot + ' top"></span>', '<span class="' + this.factory.classes.dot + ' bottom"></span>'].join("");
                e && (s = ""), t = this.factory.localize(t);
                var n = ['<span class="' + this.factory.classes.divider + " " + (i || "").toLowerCase() + '">', '<span class="' + this.factory.classes.label + '">' + (t || "") + "</span>", s, "</span>"],
                    o = a(n.join(""));
                return this.dividers.push(o), o
            },
            createList: function(t, i) {
                "object" == typeof t && (i = t, t = 0);
                var e = new FlipClock.List(this.factory, t, i);
                return this.lists.push(e), e
            },
            reset: function() {
                this.factory.time = new FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0, {
                    minimumDigits: this.factory.minimumDigits
                }), this.flip(this.factory.original, !1)
            },
            appendDigitToClock: function(t) {
                t.$el.append(!1)
            },
            addDigit: function(t) {
                var i = this.createList(t, {
                    classes: {
                        active: this.factory.classes.active,
                        before: this.factory.classes.before,
                        flip: this.factory.classes.flip
                    }
                });
                this.appendDigitToClock(i)
            },
            start: function() {},
            stop: function() {},
            autoIncrement: function() {
                this.factory.countdown ? this.decrement() : this.increment()
            },
            increment: function() {
                this.factory.time.addSecond()
            },
            decrement: function() {
                0 == this.factory.time.getTimeSeconds() ? this.factory.stop() : this.factory.time.subSecond()
            },
            flip: function(t, s) {
                var n = this;
                a.each(t, function(t, i) {
                    var e = n.lists[t];
                    e ? (s || i == e.digit || e.play(), e.select(i)) : n.addDigit(i)
                })
            }
        })
    }(jQuery),
    function(s) {
        "use strict";
        FlipClock.Factory = FlipClock.Base.extend({
            animationRate: 1e3,
            autoStart: !0,
            callbacks: {
                destroy: !1,
                create: !1,
                init: !1,
                interval: !1,
                start: !1,
                stop: !1,
                reset: !1
            },
            classes: {
                active: "flip-clock-active",
                before: "flip-clock-before",
                divider: "flip-clock-divider",
                dot: "flip-clock-dot",
                label: "flip-clock-label",
                flip: "flip",
                play: "play",
                wrapper: "flip-clock-wrapper"
            },
            clockFace: "HourlyCounter",
            countdown: !1,
            defaultClockFace: "HourlyCounter",
            defaultLanguage: "english",
            $el: !1,
            face: !0,
            lang: !1,
            language: "english",
            minimumDigits: 0,
            original: !1,
            running: !1,
            time: !1,
            timer: !1,
            $wrapper: !1,
            constructor: function(t, i, e) {
                e = e || {}, this.lists = [], this.running = !1, this.base(e), this.$el = s(t).addClass(this.classes.wrapper), this.$wrapper = this.$el, this.original = i instanceof Date ? i : i ? Math.round(i) : 0, this.time = new FlipClock.Time(this, this.original, {
                    minimumDigits: this.minimumDigits,
                    animationRate: this.animationRate
                }), this.timer = new FlipClock.Timer(this, e), this.loadLanguage(this.language), this.loadClockFace(this.clockFace, e), this.autoStart && this.start()
            },
            loadClockFace: function(t, i) {
                var e, s = !1;
                return t = t.ucfirst() + "Face", this.face.stop && (this.stop(), s = !0), this.$el.html(""), this.time.minimumDigits = this.minimumDigits, (e = FlipClock[t] ? new FlipClock[t](this, i) : new FlipClock[this.defaultClockFace + "Face"](this, i)).build(), this.face = e, s && this.start(), this.face
            },
            loadLanguage: function(t) {
                var i;
                return i = FlipClock.Lang[t.ucfirst()] ? FlipClock.Lang[t.ucfirst()] : FlipClock.Lang[t] ? FlipClock.Lang[t] : FlipClock.Lang[this.defaultLanguage], this.lang = i
            },
            localize: function(t, i) {
                var e = this.lang;
                if (!t) return null;
                var s = t.toLowerCase();
                return "object" == typeof i && (e = i), e && e[s] ? e[s] : t
            },
            start: function(t) {
                var i = this;
                i.running || i.countdown && !(i.countdown && 0 < i.time.time) ? i.log("Trying to start timer when countdown already at 0") : (i.face.start(i.time), i.timer.start(function() {
                    i.flip(), "function" == typeof t && t()
                }))
            },
            stop: function(t) {
                for (var i in this.face.stop(), this.timer.stop(t), this.lists) this.lists.hasOwnProperty(i) && this.lists[i].stop()
            },
            reset: function(t) {
                this.timer.reset(t), this.face.reset()
            },
            setTime: function(t) {
                this.time.time = t, this.flip(!0)
            },
            getTime: function(t) {
                return this.time
            },
            setCountdown: function(t) {
                var i = this.running;
                this.countdown = !!t, i && (this.stop(), this.start())
            },
            flip: function(t) {
                this.face.flip(!1, t)
            }
        })
    }(jQuery),
    function(i) {
        "use strict";
        FlipClock.List = FlipClock.Base.extend({
            digit: 0,
            classes: {
                active: "flip-clock-active",
                before: "flip-clock-before",
                flip: "flip"
            },
            factory: !1,
            $el: !1,
            $obj: !1,
            items: [],
            lastDigit: 0,
            constructor: function(t, i, e) {
                this.factory = t, this.digit = i, this.lastDigit = i, this.$el = this.createList(), this.$obj = this.$el, 0 < i && this.select(i), this.factory.$el.append(this.$el)
            },
            select: function(t) {
                if (void 0 === t ? t = this.digit : this.digit = t, this.digit != this.lastDigit) {
                    var i = this.$el.find("." + this.classes.before).removeClass(this.classes.before);
                    this.$el.find("." + this.classes.active).removeClass(this.classes.active).addClass(this.classes.before), this.appendListItem(this.classes.active, this.digit), i.remove(), this.lastDigit = this.digit
                }
            },
            play: function() {
                this.$el.addClass(this.factory.classes.play)
            },
            stop: function() {
                var t = this;
                setTimeout(function() {
                    t.$el.removeClass(t.factory.classes.play)
                }, this.factory.timer.interval)
            },
            createListItem: function(t, i) {
                return ['<li class="' + (t || "") + '">', '<a href="#">', '<div class="up">', '<div class="shadow"></div>', '<div class="inn">' + (i || "") + "</div>", "</div>", '<div class="down">', '<div class="shadow"></div>', '<div class="inn">' + (i || "") + "</div>", "</div>", "</a>", "</li>"].join("")
            },
            appendListItem: function(t, i) {
                var e = this.createListItem(t, i);
                this.$el.append(e)
            },
            createList: function() {
                var t = this.getPrevDigit() ? this.getPrevDigit() : this.digit;
                return i(['<ul class="' + this.classes.flip + " " + (this.factory.running ? this.factory.classes.play : "") + '">', this.createListItem(this.classes.before, t), this.createListItem(this.classes.active, this.digit), "</ul>"].join(""))
            },
            getNextDigit: function() {
                return 9 == this.digit ? 0 : this.digit + 1
            },
            getPrevDigit: function() {
                return 0 == this.digit ? 9 : this.digit - 1
            }
        })
    }(jQuery),
    function(e) {
        "use strict";
        String.prototype.ucfirst = function() {
            return this.substr(0, 1).toUpperCase() + this.substr(1)
        }, e.fn.FlipClock = function(t, i) {
            return new FlipClock(e(this), t, i)
        }, e.fn.flipClock = function(t, i) {
            return e.fn.FlipClock(t, i)
        }
    }(jQuery),
    function(a) {
        "use strict";
        FlipClock.Time = FlipClock.Base.extend({
            time: 0,
            factory: !1,
            minimumDigits: 0,
            constructor: function(t, i, e) {
                "object" != typeof e && (e = {}), e.minimumDigits || (e.minimumDigits = t.minimumDigits), this.base(e), this.factory = t, i && (this.time = i)
            },
            convertDigitsToArray: function(t) {
                var i = [];
                t = t.toString();
                for (var e = 0; e < t.length; e++) t[e].match(/^\d*$/g) && i.push(t[e]);
                return i
            },
            digit: function(t) {
                var i = this.toString(),
                    e = i.length;
                return !!i[e - t] && i[e - t]
            },
            digitize: function(t) {
                var s = [];
                if (a.each(t, function(t, i) {
                        1 == (i = i.toString()).length && (i = "0" + i);
                        for (var e = 0; e < i.length; e++) s.push(i.charAt(e))
                    }), s.length > this.minimumDigits && (this.minimumDigits = s.length), this.minimumDigits > s.length)
                    for (var i = s.length; i < this.minimumDigits; i++) s.unshift("0");
                return s
            },
            getDateObject: function() {
                return this.time instanceof Date ? this.time : new Date((new Date).getTime() + 1e3 * this.getTimeSeconds())
            },
            getDayCounter: function(t) {
                var i = [this.getDays(), this.getHours(!0), this.getMinutes(!0)];
                return t && i.push(this.getSeconds(!0)), this.digitize(i)
            },
            getDays: function(t) {
                var i = this.getTimeSeconds() / 60 / 60 / 24;
                return t && (i %= 7), Math.floor(i)
            },
            getHourCounter: function() {
                return this.digitize([this.getHours(), this.getMinutes(!0), this.getSeconds(!0)])
            },
            getHourly: function() {
                return this.getHourCounter()
            },
            getHours: function(t) {
                var i = this.getTimeSeconds() / 60 / 60;
                return t && (i %= 24), Math.floor(i)
            },
            getMilitaryTime: function(t, i) {
                void 0 === i && (i = !0);
                var e = [(t = t || this.getDateObject()).getHours(), t.getMinutes()];
                return !0 === i && e.push(t.getSeconds()), this.digitize(e)
            },
            getMinutes: function(t) {
                var i = this.getTimeSeconds() / 60;
                return t && (i %= 60), Math.floor(i)
            },
            getMinuteCounter: function() {
                return this.digitize([this.getMinutes(), this.getSeconds(!0)])
            },
            getTimeSeconds: function(t) {
                return t = t || new Date, this.time instanceof Date ? this.factory.countdown ? Math.max(this.time.getTime() / 1e3 - t.getTime() / 1e3, 0) : t.getTime() / 1e3 - this.time.getTime() / 1e3 : this.time
            },
            getTime: function(t, i) {
                void 0 === i && (i = !0), t = t || this.getDateObject(), console.log(t);
                var e = t.getHours(),
                    s = [12 < e ? e - 12 : 0 === e ? 12 : e, t.getMinutes()];
                return !0 === i && s.push(t.getSeconds()), this.digitize(s)
            },
            getSeconds: function(t) {
                var i = this.getTimeSeconds();
                return t && (60 == i ? i = 0 : i %= 60), Math.ceil(i)
            },
            getWeeks: function(t) {
                var i = this.getTimeSeconds() / 60 / 60 / 24 / 7;
                return t && (i %= 52), Math.floor(i)
            },
            removeLeadingZeros: function(e, s) {
                var n = 0,
                    o = [];
                return a.each(s, function(t, i) {
                    t < e ? n += parseInt(s[t], 10) : o.push(s[t])
                }), 0 === n ? o : s
            },
            addSeconds: function(t) {
                this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() + t) : this.time += t
            },
            addSecond: function() {
                this.addSeconds(1)
            },
            subSeconds: function(t) {
                this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() - t) : this.time -= t
            },
            subSecond: function() {
                this.subSeconds(1)
            },
            toString: function() {
                return this.getTimeSeconds().toString()
            }
        })
    }(jQuery),
    function() {
        "use strict";
        FlipClock.Timer = FlipClock.Base.extend({
            callbacks: {
                destroy: !1,
                create: !1,
                init: !1,
                interval: !1,
                start: !1,
                stop: !1,
                reset: !1
            },
            count: 0,
            factory: !1,
            interval: 1e3,
            animationRate: 1e3,
            constructor: function(t, i) {
                this.base(i), this.factory = t, this.callback(this.callbacks.init), this.callback(this.callbacks.create)
            },
            getElapsed: function() {
                return this.count * this.interval
            },
            getElapsedTime: function() {
                return new Date(this.time + this.getElapsed())
            },
            reset: function(t) {
                clearInterval(this.timer), this.count = 0, this._setInterval(t), this.callback(this.callbacks.reset)
            },
            start: function(t) {
                this.factory.running = !0, this._createTimer(t), this.callback(this.callbacks.start)
            },
            stop: function(t) {
                this.factory.running = !1, this._clearInterval(t), this.callback(this.callbacks.stop), this.callback(t)
            },
            _clearInterval: function() {
                clearInterval(this.timer)
            },
            _createTimer: function(t) {
                this._setInterval(t)
            },
            _destroyTimer: function(t) {
                this._clearInterval(), this.timer = !1, this.callback(t), this.callback(this.callbacks.destroy)
            },
            _interval: function(t) {
                this.callback(this.callbacks.interval), this.callback(t), this.count++
            },
            _setInterval: function(t) {
                var i = this;
                i._interval(t), i.timer = setInterval(function() {
                    i._interval(t)
                }, this.interval)
            }
        })
    }(jQuery),
    function(s) {
        FlipClock.TwentyFourHourClockFace = FlipClock.Face.extend({
            constructor: function(t, i) {
                this.base(t, i)
            },
            build: function(t) {
                var e = this,
                    i = this.factory.$el.find("ul");
                this.factory.time.time || (this.factory.original = new Date, this.factory.time = new FlipClock.Time(this.factory, this.factory.original)), (t = t || this.factory.time.getMilitaryTime(!1, this.showSeconds)).length > i.length && s.each(t, function(t, i) {
                    e.createList(i)
                }), this.createDivider(), this.createDivider(), s(this.dividers[0]).insertBefore(this.lists[this.lists.length - 2].$el), s(this.dividers[1]).insertBefore(this.lists[this.lists.length - 4].$el), this.base()
            },
            flip: function(t, i) {
                this.autoIncrement(), t = t || this.factory.time.getMilitaryTime(!1, this.showSeconds), this.base(t, i)
            }
        })
    }(jQuery),
    function(s) {
        FlipClock.CounterFace = FlipClock.Face.extend({
            shouldAutoIncrement: !1,
            constructor: function(i, t) {
                "object" != typeof t && (t = {}), i.autoStart = !!t.autoStart, t.autoStart && (this.shouldAutoIncrement = !0), i.increment = function() {
                    i.countdown = !1, i.setTime(i.getTime().getTimeSeconds() + 1)
                }, i.decrement = function() {
                    i.countdown = !0;
                    var t = i.getTime().getTimeSeconds();
                    0 < t && i.setTime(t - 1)
                }, i.setValue = function(t) {
                    i.setTime(t)
                }, i.setCounter = function(t) {
                    i.setTime(t)
                }, this.base(i, t)
            },
            build: function() {
                var e = this,
                    t = this.factory.$el.find("ul"),
                    i = this.factory.getTime().digitize([this.factory.getTime().time]);
                i.length > t.length && s.each(i, function(t, i) {
                    e.createList(i).select(i)
                }), s.each(this.lists, function(t, i) {
                    i.play()
                }), this.base()
            },
            flip: function(t, i) {
                this.shouldAutoIncrement && this.autoIncrement(), t = t || this.factory.getTime().digitize([this.factory.getTime().time]), this.base(t, i)
            },
            reset: function() {
                this.factory.time = new FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0), this.flip()
            }
        })
    }(jQuery),
    function(n) {
        FlipClock.DailyCounterFace = FlipClock.Face.extend({
            showSeconds: !0,
            constructor: function(t, i) {
                this.base(t, i)
            },
            build: function(t) {
                var e = this,
                    i = this.factory.$el.find("ul"),
                    s = 0;
                (t = t || this.factory.time.getDayCounter(this.showSeconds)).length > i.length && n.each(t, function(t, i) {
                    e.createList(i)
                }), this.showSeconds ? n(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el) : s = 2, n(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4 + s].$el), n(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length - 6 + s].$el), n(this.createDivider("Days", !0)).insertBefore(this.lists[0].$el), this.base()
            },
            flip: function(t, i) {
                t = t || this.factory.time.getDayCounter(this.showSeconds), this.autoIncrement(), this.base(t, i)
            }
        })
    }(jQuery),
    function(n) {
        FlipClock.HourlyCounterFace = FlipClock.Face.extend({
            constructor: function(t, i) {
                this.base(t, i)
            },
            build: function(t, i) {
                var e = this,
                    s = this.factory.$el.find("ul");
                (i = i || this.factory.time.getHourCounter()).length > s.length && n.each(i, function(t, i) {
                    e.createList(i)
                }), n(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el), n(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4].$el), t || n(this.createDivider("Hours", !0)).insertBefore(this.lists[0].$el), this.base()
            },
            flip: function(t, i) {
                t = t || this.factory.time.getHourCounter(), this.autoIncrement(), this.base(t, i)
            },
            appendDigitToClock: function(t) {
                this.base(t), this.dividers[0].insertAfter(this.dividers[0].next())
            }
        })
    }(jQuery), jQuery, FlipClock.MinuteCounterFace = FlipClock.HourlyCounterFace.extend({
        clearExcessDigits: !1,
        constructor: function(t, i) {
            this.base(t, i)
        },
        build: function() {
            this.base(!0, this.factory.time.getMinuteCounter())
        },
        flip: function(t, i) {
            t = t || this.factory.time.getMinuteCounter(), this.base(t, i)
        }
    }),
    function(i) {
        FlipClock.TwelveHourClockFace = FlipClock.TwentyFourHourClockFace.extend({
            meridium: !1,
            meridiumText: "AM",
            build: function() {
                var t = this.factory.time.getTime(!1, this.showSeconds);
                this.base(t), this.meridiumText = this.getMeridium(), this.meridium = i(['<ul class="flip-clock-meridium">', "<li>", '<a href="#">' + this.meridiumText + "</a>", "</li>", "</ul>"].join("")), this.meridium.insertAfter(this.lists[this.lists.length - 1].$el)
            },
            flip: function(t, i) {
                this.meridiumText != this.getMeridium() && (this.meridiumText = this.getMeridium(), this.meridium.find("a").html(this.meridiumText)), this.base(this.factory.time.getTime(!1, this.showSeconds), i)
            },
            getMeridium: function() {
                return 12 <= (new Date).getHours() ? "PM" : "AM"
            },
            isPM: function() {
                return "PM" == this.getMeridium()
            },
            isAM: function() {
                return "AM" == this.getMeridium()
            }
        })
    }(jQuery), jQuery, FlipClock.Lang.Arabic = {
        years: "سنوات",
        months: "شهور",
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثواني"
    }, FlipClock.Lang.ar = FlipClock.Lang.Arabic, FlipClock.Lang["ar-ar"] = FlipClock.Lang.Arabic, FlipClock.Lang.arabic = FlipClock.Lang.Arabic, jQuery, FlipClock.Lang.Danish = {
        years: "År",
        months: "Måneder",
        days: "Dage",
        hours: "Timer",
        minutes: "Minutter",
        seconds: "Sekunder"
    }, FlipClock.Lang.da = FlipClock.Lang.Danish, FlipClock.Lang["da-dk"] = FlipClock.Lang.Danish, FlipClock.Lang.danish = FlipClock.Lang.Danish, jQuery, FlipClock.Lang.German = {
        years: "Jahre",
        months: "Monate",
        days: "Tage",
        hours: "Stunden",
        minutes: "Minuten",
        seconds: "Sekunden"
    }, FlipClock.Lang.de = FlipClock.Lang.German, FlipClock.Lang["de-de"] = FlipClock.Lang.German, FlipClock.Lang.german = FlipClock.Lang.German, jQuery, FlipClock.Lang.English = {
        years: "Years",
        months: "Months",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
    }, FlipClock.Lang.en = FlipClock.Lang.English, FlipClock.Lang["en-us"] = FlipClock.Lang.English, FlipClock.Lang.english = FlipClock.Lang.English, jQuery, FlipClock.Lang.Spanish = {
        years: "Años",
        months: "Meses",
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos"
    }, FlipClock.Lang.es = FlipClock.Lang.Spanish, FlipClock.Lang["es-es"] = FlipClock.Lang.Spanish, FlipClock.Lang.spanish = FlipClock.Lang.Spanish, jQuery, FlipClock.Lang.Finnish = {
        years: "Vuotta",
        months: "Kuukautta",
        days: "Päivää",
        hours: "Tuntia",
        minutes: "Minuuttia",
        seconds: "Sekuntia"
    }, FlipClock.Lang.fi = FlipClock.Lang.Finnish, FlipClock.Lang["fi-fi"] = FlipClock.Lang.Finnish, FlipClock.Lang.finnish = FlipClock.Lang.Finnish, jQuery, FlipClock.Lang.French = {
        years: "Ans",
        months: "Mois",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes"
    }, FlipClock.Lang.fr = FlipClock.Lang.French, FlipClock.Lang["fr-ca"] = FlipClock.Lang.French, FlipClock.Lang.french = FlipClock.Lang.French, jQuery, FlipClock.Lang.Italian = {
        years: "Anni",
        months: "Mesi",
        days: "Giorni",
        hours: "Ore",
        minutes: "Minuti",
        seconds: "Secondi"
    }, FlipClock.Lang.it = FlipClock.Lang.Italian, FlipClock.Lang["it-it"] = FlipClock.Lang.Italian, FlipClock.Lang.italian = FlipClock.Lang.Italian, jQuery, FlipClock.Lang.Latvian = {
        years: "Gadi",
        months: "Mēneši",
        days: "Dienas",
        hours: "Stundas",
        minutes: "Minūtes",
        seconds: "Sekundes"
    }, FlipClock.Lang.lv = FlipClock.Lang.Latvian, FlipClock.Lang["lv-lv"] = FlipClock.Lang.Latvian, FlipClock.Lang.latvian = FlipClock.Lang.Latvian, jQuery, FlipClock.Lang.Dutch = {
        years: "Jaren",
        months: "Maanden",
        days: "Dagen",
        hours: "Uren",
        minutes: "Minuten",
        seconds: "Seconden"
    }, FlipClock.Lang.nl = FlipClock.Lang.Dutch, FlipClock.Lang["nl-be"] = FlipClock.Lang.Dutch, FlipClock.Lang.dutch = FlipClock.Lang.Dutch, jQuery, FlipClock.Lang.Norwegian = {
        years: "År",
        months: "Måneder",
        days: "Dager",
        hours: "Timer",
        minutes: "Minutter",
        seconds: "Sekunder"
    }, FlipClock.Lang.no = FlipClock.Lang.Norwegian, FlipClock.Lang.nb = FlipClock.Lang.Norwegian, FlipClock.Lang["no-nb"] = FlipClock.Lang.Norwegian, FlipClock.Lang.norwegian = FlipClock.Lang.Norwegian, jQuery, FlipClock.Lang.Portuguese = {
        years: "Anos",
        months: "Meses",
        days: "Dias",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos"
    }, FlipClock.Lang.pt = FlipClock.Lang.Portuguese, FlipClock.Lang["pt-br"] = FlipClock.Lang.Portuguese, FlipClock.Lang.portuguese = FlipClock.Lang.Portuguese, jQuery, FlipClock.Lang.Russian = {
        years: "лет",
        months: "месяцев",
        days: "дней",
        hours: "часов",
        minutes: "минут",
        seconds: "секунд"
    }, FlipClock.Lang.ru = FlipClock.Lang.Russian, FlipClock.Lang["ru-ru"] = FlipClock.Lang.Russian, FlipClock.Lang.russian = FlipClock.Lang.Russian, jQuery, FlipClock.Lang.Swedish = {
        years: "År",
        months: "Månader",
        days: "Dagar",
        hours: "Timmar",
        minutes: "Minuter",
        seconds: "Sekunder"
    }, FlipClock.Lang.sv = FlipClock.Lang.Swedish, FlipClock.Lang["sv-se"] = FlipClock.Lang.Swedish, FlipClock.Lang.swedish = FlipClock.Lang.Swedish, jQuery, FlipClock.Lang.Chinese = {
        years: "年",
        months: "月",
        days: "日",
        hours: "时",
        minutes: "分",
        seconds: "秒"
    }, FlipClock.Lang.zh = FlipClock.Lang.Chinese, FlipClock.Lang["zh-cn"] = FlipClock.Lang.Chinese, FlipClock.Lang.chinese = FlipClock.Lang.Chinese;