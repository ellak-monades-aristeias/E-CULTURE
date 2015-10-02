"use strict";
window.DevExpress || (function(n, t) {
    t.DevExpress = t.DevExpress || {}, n.extend(t.DevExpress, {VERSION: "14.2.3", abstract: function() {
            throw t.DevExpress.Error("E0001");
        }, stringFormat: function() {
            for (var t = arguments[0], i, n = 0; n < arguments.length - 1; n++)
                i = new RegExp("\\{" + n + "\\}", "gm"), t = t.replace(i, arguments[n + 1]);
            return t
        }, parseUrl: function() {
            var t = document.createElement("a"), i = ["protocol", "hostname", "port", "pathname", "search", "hash"], r = function(n) {
                return n.charAt(0) !== "/" && (n = "/" + n), n
            };
            return function(u) {
                t.href = u;
                var f = {};
                return n.each(i, function() {
                    f[this] = t[this]
                }), f.pathname = r(f.pathname), f
            }
        }(), processHardwareBackButton: function() {
            this.hardwareBackButton.fire()
        }, hardwareBackButton: n.Callbacks(), viewPort: function() {
            var t;
            return function(i) {
                if (!arguments.length)
                    return t;
                var r = n(i), u = !!r.length, f = this.viewPort();
                t = u ? r : n("body"), this.viewPortChanged.fire(u ? this.viewPort() : n(), f)
            }
        }(), viewPortChanged: n.Callbacks(), hideTopOverlayCallback: function() {
            var t = [];
            return{add: function(i) {
                    var r = n.inArray(i, t);
                    r === -1 && t.push(i)
                }, remove: function(i) {
                    var r = n.inArray(i, t);
                    r !== -1 && t.splice(r, 1)
                }, fire: function() {
                    var n = t.pop(), i = !!n;
                    return i && n(), i
                }, hasCallback: function() {
                    return t.length > 0
                }}
        }(), rtlEnabled: !1}), n(function() {
        DevExpress.viewPort(".dx-viewport")
    })
}(jQuery, this), function(n, t) {
    var u = {E0001: "Method is not implemented", E0002: "Member name collision: {0}", E0003: "A class must be instantiated using the 'new' keyword", E0004: "The NAME property of the component is not specified", E0005: "Unknown device", E0006: "Unknown endpoint key is requested", E0007: "'Invalidate' method is called outside the update transaction", E0008: "Type of the option name is not appropriate to create an action", E0009: "Component '{0}' has not been initialized for an element", E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as an plain object", E0011: "Unknown animation type '{0}'", E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later", E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later", E0014: "The 'release' method shouldn't be called for an unlocked Lock object", E0015: "Queued task returned an unexpected result", E0017: "Event namespace is not defined", E0018: "DevExpress.ui.dxPopup widget is required", E0020: "Template engine '{0}' is not supported", E0021: "Unknown theme is set: {0}", E0022: "LINK[rel=dx-theme] tags must go before DevExpress included scripts", E0023: "Template name is not specified", E0100: "Unknown validation type is detected", E0101: "Misconfigured range validation rule is detected", E0102: "Misconfigured comparison validation rule is detected", E0110: "Unknown validation group is detected", E0120: "Adapter for a dxValidator component cannot be configured", W0000: "'{0}' is deprecated in {1}. {2}", W0001: "{0} - '{1}' option is deprecated in {2}. {3}", W0002: "{0} - '{1}' method is deprecated in {2}. {3}", W0003: "{0} - '{1}' property is deprecated in {2}. {3}", W0004: "Timeout for theme loading is over: {0}"}, f = "http://js.devexpress.com/error/" + t.VERSION.split(".").slice(0, 2).join("_") + "/", e = function(n) {
        var t = n[0];
        return n = n.slice(1), r(t, i(t, n))
    }, i = function(n, i) {
        return i = [t.ERROR_MESSAGES[n]].concat(i), t.stringFormat.apply(this, i).replace(/\.*\s*?$/, "")
    }, r = function(n, i) {
        return t.stringFormat.apply(this, ["{0} - {1}. See:\n{2}", n, i, f + n])
    }, o = function(t) {
        var u = t[0], t = t.slice(1), f = i(u, t), e = r(u, f);
        return n.extend(new Error(e), {details: f})
    };
    n.extend(t, {Error: function() {
            return o(n.makeArray(arguments))
        }, log: function(i) {
            var r = "log", u = t.utils.logger;
            /^E\d+$/.test(i) ? r = "error" : /^W\d+$/.test(i) && (r = "warn"), u[r](r === "log" ? i : e(n.makeArray(arguments)))
        }, ERROR_MESSAGES: u})
}($, DevExpress), function(n, t, i) {
    i.Class = function() {
        var u = function(n, t, i) {
            return function() {
                var r = this.callBase;
                this.callBase = n[t];
                try {
                    return i.apply(this, arguments)
                } finally {
                    this.callBase = r
                }
            }
        }, f = function(n) {
            var t = function() {
            };
            return t.prototype = n.prototype, new t
        }, r = function() {
        }, e = function(t) {
            var i = this, r;
            return t ? (r = n.map(t, function(n, t) {
                return t
            }), n.each(["toString", "toLocaleString", "valueOf"], function() {
                t[this] && r.push(this)
            }), n.each(r, function() {
                var r = n.isFunction(i.prototype[this]) && n.isFunction(t[this]);
                i.prototype[this] = r ? u(i.parent.prototype, this, t[this]) : t[this]
            }), i) : i
        }, o = function() {
            var t = this;
            return n.each(arguments, function() {
                this.ctor && t._includedCtors.push(this.ctor), this.postCtor && t._includedPostCtors.push(this.postCtor);
                for (var n in this)
                    if (n !== "ctor" && n !== "postCtor") {
                        if (n in t.prototype)
                            throw i.Error("E0002", n);
                        t.prototype[n] = this[n]
                    }
            }), t
        }, s = function(n) {
            return this.parent === n ? !0 : !this.parent || !this.parent.subclassOf ? !1 : this.parent.subclassOf(n)
        };
        return r.inherit = function(r) {
            var u = function() {
                if (!this || this === t || typeof this.constructor != "function")
                    throw i.Error("E0003");
                var r = this, u = r.ctor;
                n.each(r.constructor._includedCtors, function() {
                    this.call(r)
                }), u && u.apply(r, arguments), n.each(r.constructor._includedPostCtors, function() {
                    this.call(r)
                })
            };
            return u.prototype = f(this), u.inherit = this.inherit, u.redefine = e, u.include = o, u.subclassOf = s, u.parent = this, u._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [], u._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [], u.prototype.constructor = u, u.redefine(r), u
        }, r
    }()
}(jQuery, this, DevExpress), function(n, t, i) {
    function r(t) {
        function f() {
            while (r.length) {
                u = !0;
                var e = r.shift(), t = e();
                if (t !== i && t.then) {
                    n.when(t).always(f);
                    return
                }
            }
            u = !1
        }
        function e(n, i) {
            t ? (r[0] && i && i(r[0]), r = [n]) : r.push(n), u || f()
        }
        function o() {
            return u
        }
        var r = [], u = !1;
        return{add: e, busy: o}
    }
    var u = t.DevExpress;
    n.extend(t.DevExpress, {createQueue: r, enqueue: r().add})
}(jQuery, this), function(n, t, i) {
    var e = function(n) {
        return n === i || n === null ? "" : String(n)
    }, r = function(n) {
        return e(n).charAt(0).toUpperCase() + n.substr(1)
    }, u = function(n) {
        return e(n).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/)
    }, f = function(t) {
        return n.map(u(t), function(n) {
            return n.toLowerCase()
        }).join("-")
    }, o = function(n) {
        return f(n).replace(/-/g, "_")
    }, s = function(t, i) {
        return n.map(u(t), function(n, t) {
            return n = n.toLowerCase(), (i || t > 0) && (n = r(n)), n
        }).join("")
    }, h = function(n) {
        return r(f(n).replace(/-/g, " "))
    }, c = function(t) {
        return n.map(u(t), function(n) {
            return r(n.toLowerCase())
        }).join(" ")
    };
    t.inflector = {dasherize: f, camelize: s, humanize: h, titleize: c, underscore: o}
}(jQuery, DevExpress), function(n, t, i) {
    var r = {ctor: function() {
            this._events = {}
        }, fireEvent: function(n, t) {
            var i = this._events[n];
            return i && i.fireWith(this, t), this
        }, on: function(t, i) {
            if (n.isPlainObject(t))
                n.each(t, n.proxy(function(n, t) {
                    this.on(n, t)
                }, this));
            else {
                var r = this._events[t], u;
                r || (r = n.Callbacks(), this._events[t] = r), u = r.originalAdd || r.add, u.call(r, i)
            }
            return this
        }, off: function(t, i) {
            var r = this._events[t];
            return r && (n.isFunction(i) ? r.remove(i) : r.empty()), this
        }, _disposeEvents: function() {
            n.each(this._events, function() {
                this.empty()
            })
        }, _callbacksToEvents: function(r, u) {
            var f = this;
            n.each(u, function(n, u) {
                var e = f[u], o;
                e !== i && (o = e.add, e.originalAdd = o, e.add = function() {
                    return t.log("W0003", r, u, "14.2", "Use the '" + u + "' event instead"), o.apply(f, arguments)
                }, f._events[u] = e)
            })
        }};
    n.extend(t, {EventsMixin: r})
}(jQuery, DevExpress), function(n) {
    (function(n) {
        if (n = n.split("."), n[0] < 1 || n[0] == 1 && n[1] < 10)
            throw DX.Error("E0012");
    })(n.fn.jquery)
}(jQuery), function(n, t, i) {
    function g(t, i) {
        var r = !1;
        return n.each(n(t).contents(), function(n, t) {
            if (t.nodeType === 3 && (t.textContent || t.nodeValue || "").toLowerCase().indexOf((i || "").toLowerCase()) > -1)
                return r = !0, !1
        }), r
    }
    function f(t, r) {
        var o, u, e;
        for (e in r)
            (o = t[e], u = r[e], t !== u) && (!n.isPlainObject(u) || u instanceof n.Event ? u !== i && (t[e] = u) : t[e] = f(n.isPlainObject(o) ? o : {}, u));
        return t
    }
    function nt(n) {
        return t.support.hasKo ? ko.utils.unwrapObservable(n) : n
    }
    var e = function(n) {
        return n !== null && n !== i
    }, o = function(t) {
        return n.type(t) === "string"
    }, r = function(t) {
        return typeof t == "number" && isFinite(t) || n.isNumeric(t)
    }, s = function(t) {
        return n.type(t) === "object"
    }, h = function(t) {
        return n.type(t) === "array"
    }, c = function(t) {
        return n.type(t) === "date"
    }, l = function(t) {
        return n.type(t) === "function"
    }, a = function(n) {
        return r(n) && n.toString().indexOf("e") !== -1
    }, v = function(n, t, i) {
        var r, u;
        n = n || {};
        for (r in t)
            t.hasOwnProperty(r) && (u = t[r], r in n && !i || (n[r] = u));
        return n
    }, y = function() {
        function n() {
        }
        return function(t) {
            return n.prototype = t, new n
        }
    }(), p = function(t, i) {
        var r = n.Deferred(), u = i || this;
        return setTimeout(function() {
            var i = t.call(u);
            i && i.done && n.isFunction(i.done) ? i.done(function() {
                r.resolveWith(u)
            }) : r.resolveWith(u)
        }, 0), r.promise()
    }, w = function(t, r, u) {
        var f = [], e = 0;
        return n.each(r, function(r, o) {
            var s = 0, h = u ? u(o) : o;
            (n.each(t, function(n) {
                var r = h[n];
                if (r !== i) {
                    if (r === t[n]) {
                        s++;
                        return
                    }
                    return s = -1, !1
                }
            }), s < e) || (s > e && (f.length = 0, e = s), f.push(o))
        }), f
    }, b = function(n) {
        return(n + "").replace(/([\+\*\?\\\.\[\^\]\$\(\)\{\}\>\<\|\=\!\:])/g, "\\$1")
    }, k = function(n, t, i) {
        return n.replace(new RegExp("(" + b(t) + ")", "gi"), i)
    }, u = function(n) {
        switch (typeof n) {
            case"string":
                return n.split(/\s+/, 2);
            case"object":
                return[n.x || n.h, n.y || n.v];
            case"number":
                return[n];
            default:
                return n
            }
    }, d = function(n) {
        var t = u(n), i = parseInt(t && t[0], 10), r = parseInt(t && t[1], 10);
        return isFinite(i) || (i = 0), isFinite(r) || (r = i), {h: i, v: r}
    };
    n.expr[":"].dxicontains = n.expr.createPseudo(function(n) {
        return function(t) {
            return g(t, n)
        }
    }), t.utils = {isDefined: e, isString: o, isNumber: r, isObject: s, isArray: h, isDate: c, isFunction: l, isExponential: a, extendFromObject: v, clone: y, executeAsync: p, stringFormat: t.stringFormat, findBestMatches: w, replaceAll: k, deepExtendArraySafe: f, splitPair: u, stringPairToObject: d, unwrapObservable: nt}
}(jQuery, DevExpress), function(n, t, i) {
    var r = function() {
        function i(i) {
            t && n.isFunction(t.info) && t.info(i)
        }
        function r(i) {
            t && n.isFunction(t.warn) && t.warn(i)
        }
        function u(i) {
            t && n.isFunction(t.error) && t.error(i)
        }
        var t = window.console;
        return{info: i, warn: r, error: u}
    }(), u = function() {
        function n(n, t) {
            if (!n)
                throw new Error(t);
        }
        function t(t, r) {
            n(t !== null && t !== i, r)
        }
        return{assert: n, assertParam: t}
    }();
    n.extend(t.utils, {logger: r, debug: u})
}(jQuery, DevExpress), function(n, t) {
    var v = Math.PI, y = Math.LN10, p = Math.cos, w = Math.sin, u = Math.abs, b = Math.log, k = Math.floor, d = Math.ceil, g = Math.max, yt = Math.min, f = window.isNaN, h = window.Number, nt = window.NaN, c = t.utils.isNumber, e = t.utils.isExponential, l = function(n) {
        var u, f = n.toString(), o = f.indexOf("."), t, i;
        return e(n) ? (i = r(n), i < 0 ? Math.abs(i) : 0) : o !== -1 ? (t = o + 1, u = f.substring(t, t + 20), u.length) : 0
    }, tt = function(n, t) {
        return n ? Math.log(n) / Math.log(t) : 0
    }, it = function(n, t) {
        return Math.pow(t, n)
    }, rt = function(n) {
        return n === 0 ? 0 : n / u(n)
    }, ut = function(n) {
        return(n % 360 + 360) % 360
    }, ft = function(n) {
        return 90 - n
    }, a = function(n) {
        return v * n / 180
    }, et = function(n) {
        var t = a(n);
        return{cos: p(t), sin: w(t)}
    }, ot = 1e-14, st = function(n, t, i, r) {
        var u = i - n, f = r - t;
        return Math.sqrt(f * f + u * u)
    }, r = function(n) {
        var t = u(n), i;
        return f(t) ? nt : t > 0 ? (t = b(t) / y, i = d(t), i - t < ot ? i : k(t)) : 0
    }, ht = function(n, t, i) {
        var o = g(r(n), r(t)), e = -r(u(t - n) / i), s;
        return!f(o) && !f(e) ? (u(o) <= 4 ? (s = "fixedPoint", e < 0 && (e = 0), e > 4 && (e = 4)) : (s = "exponential", e += o - 1, e > 3 && (e = 3)), {format: s, precision: e}) : null
    }, o = function(n) {
        var t, i;
        return c(n) && (t = n.toString(), i = t.indexOf("."), i >= 0) ? e(n) ? t.substr(i + 1, t.indexOf("e") - i - 1) : (t = n.toFixed(20), t.substr(i + 1, t.length - i + 1)) : ""
    }, ct = function(n) {
        var i = o(n), t;
        if (i)
            for (t = 0; t < i.length; t++)
                if (i.charAt(t) !== "0")
                    return t + 1;
        return 0
    }, lt = function(n) {
        var i = o(n), r, t;
        if (i)
            for (t = 1; t <= i.length; t++)
                if (r = s(n, t), r !== 0 && i[t - 2] && i[t - 1] && i[t - 2] === i[t - 1])
                    return r;
        return n
    }, s = function(n, t) {
        return t > 20 && (t = 20), c(n) ? e(n) ? h(n.toExponential(t)) : h(n.toFixed(t)) : void 0
    }, at = function(n, t, i) {
        var r = l(n), u = l(t);
        return s(i, r < u ? u : r)
    }, vt = function(n, t, i) {
        return Math.min(Math.max(n, t), i)
    };
    n.extend(t.utils, {getLog: tt, raiseTo: it, sign: rt, normalizeAngle: ut, convertAngleToRendererSpace: ft, degreesToRadians: a, getCosAndSin: et, getDecimalOrder: r, getAppropriateFormat: ht, getDistance: st, getFraction: o, adjustValue: lt, roundValue: s, applyPrecisionByMinDelta: at, getSignificantDigitPosition: ct, fitIntoRange: vt})
}(jQuery, DevExpress), function(n, t) {
    function y(n) {
        var t = new Date(0), u = n.replace("Z", "").split("T"), r = String(u[0]).split("-"), i = String(u[1]).split(":"), f, e, o, s, h, c, l;
        return f = Number(r[0]), e = Number(r[1]) - 1, o = Number(r[2]), t.setDate(o), t.setMonth(e), t.setFullYear(f), i.length && (s = Number(i[0]), h = Number(i[1]), c = Number(String(i[2]).split(".")[0]), l = Number(String(i[2]).split(".")[1]) || 0, t.setHours(s), t.setMinutes(h), t.setSeconds(c), t.setMilliseconds(l)), t
    }
    function p(n) {
        function t(n) {
            return n < 10 ? "0".concat(n) : String(n)
        }
        return[n.getFullYear(), "-", t(n.getMonth() + 1), "-", t(n.getDate()), "T", t(n.getHours()), ":", t(n.getMinutes()), ":", t(n.getSeconds()), "Z"].join("")
    }
    var s = t.utils.isObject, o = t.utils.isString, v = t.utils.isDate, h = t.utils.isDefined, f = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"], r = function(n, t, i) {
        return n + (i ? -1 : 1) * t
    }, u = function(n) {
        switch (n) {
            case"millisecond":
                return 1;
            case"second":
                return u("millisecond") * 1e3;
            case"minute":
                return u("second") * 60;
            case"hour":
                return u("minute") * 60;
            case"day":
                return u("hour") * 24;
            case"week":
                return u("day") * 7;
            case"month":
                return u("day") * 30;
            case"quarter":
                return u("month") * 3;
            case"year":
                return u("day") * 365;
            default:
                return 0
            }
    }, w = function(n) {
        for (var t, i, f = ["millisecond", "second", "minute", "hour", "day", "month", "year"], o = {}, r = f.length - 1; r >= 0; r--)
            i = f[r], t = Math.floor(n / u(i)), t > 0 && (o[i + "s"] = t, n -= e(i, t));
        return o
    }, b = function(t) {
        var i = 0;
        return s(t) && n.each(t, function(n, t) {
            i += e(n.substr(0, n.length - 1), t)
        }), o(t) && (i = e(t, 1)), i
    }, e = function(n, t) {
        return u(n) * t
    }, c = function(t) {
        var r = -1, i;
        return o(t) ? t : s(t) ? (n.each(t, function(n, t) {
            for (i = 0; i < f.length; i++)
                t && (n === f[i] + "s" || n === f[i]) && r < i && (r = i)
        }), f[r]) : ""
    }, k = function(n, i) {
        var r, u, f = c(i);
        switch (f) {
            case"second":
                n.setMilliseconds(0);
                break;
            case"minute":
                n.setSeconds(0, 0);
                break;
            case"hour":
                n.setMinutes(0, 0, 0);
                break;
            case"year":
                n.setMonth(0);
            case"month":
                n.setDate(1);
            case"day":
                n.setHours(0, 0, 0, 0);
                break;
            case"week":
                r = n.getDate(), n.getDay() !== 0 && (r += 7 - n.getDay()), n.setDate(r), n.setHours(0, 0, 0, 0);
                break;
            case"quarter":
                u = t.formatHelper.getFirstQuarterMonth(n.getMonth()), n.getMonth() !== u && n.setMonth(u), n.setDate(1), n.setHours(0, 0, 0, 0)
            }
    }, d = function(t, i) {
        var r, u = 0;
        return r = {year: t.getFullYear() !== i.getFullYear(), month: t.getMonth() !== i.getMonth(), day: t.getDate() !== i.getDate(), hour: t.getHours() !== i.getHours(), minute: t.getMinutes() !== i.getMinutes(), second: t.getSeconds() !== i.getSeconds()}, n.each(r, function(n, t) {
            t && u++
        }), r.count = u, r
    }, g = function(n, t, i) {
        var u = null, f;
        return v(n) ? (f = o(t) ? l(t.toLowerCase()) : t, u = new Date(n.getTime()), f.years && u.setFullYear(r(u.getFullYear(), f.years, i)), f.quarters && u.setMonth(r(u.getMonth(), 3 * f.quarters, i)), f.months && u.setMonth(r(u.getMonth(), f.months, i)), f.weeks && u.setDate(r(u.getDate(), 7 * f.weeks, i)), f.days && u.setDate(r(u.getDate(), f.days, i)), f.hours && u.setHours(r(u.getHours(), f.hours, i)), f.minutes && u.setMinutes(r(u.getMinutes(), f.minutes, i)), f.seconds && u.setSeconds(r(u.getSeconds(), f.seconds, i)), f.milliseconds && u.setMilliseconds(r(n.getMilliseconds(), f.milliseconds, i))) : u = r(n, t, i), u
    }, l = function(n) {
        var t = {};
        switch (n) {
            case"year":
                t.years = 1;
                break;
            case"month":
                t.months = 1;
                break;
            case"quarter":
                t.months = 3;
                break;
            case"week":
                t.days = 7;
                break;
            case"day":
                t.days = 1;
                break;
            case"hour":
                t.hours = 1;
                break;
            case"minute":
                t.minutes = 1;
                break;
            case"second":
                t.seconds = 1;
                break;
            case"millisecond":
                t.milliseconds = 1
        }
        return t
    }, nt = function(n, t) {
        return n && t && n.getFullYear() === t.getFullYear() && n.getMonth() === t.getMonth()
    }, tt = function(n) {
        return new Date(n.getFullYear(), n.getMonth(), 1)
    }, it = function(n, t, i) {
        return a(n, t, i) === n
    }, a = function(n, t, i) {
        var r = n;
        return h(t) && n < t && (r = t), h(i) && n > i && (r = i), r
    }, rt = function(n) {
        return n.toExponential().split("e")[1]
    };
    n.extend(t.utils, {dateUnitIntervals: f, parseIso8601Date: y, formatIso8601Date: p, convertMillisecondsToDateUnits: w, convertDateTickIntervalToMilliseconds: b, convertDateUnitToMilliseconds: e, getDateUnitInterval: c, getDatesDifferences: d, correctDateWithUnitBeginning: k, addInterval: g, getDateIntervalByString: l, sameMonthAndYear: nt, getFirstMonthDate: tt, dateInRange: it, normalizeDate: a, getPower: rt})
}(jQuery, DevExpress), function(n, t) {
    var w = "20px", o = 100, s = function(t) {
        var i = n(window), r, u = function() {
            var n = i.width(), u = i.height();
            clearTimeout(r), r = setTimeout(function() {
                i.width() === n && i.height() === u && t()
            }, o)
        };
        return u.stop = function() {
            return clearTimeout(r), this
        }, u
    }, r = function() {
        var u, t = n.Callbacks(), i = n(window), r = !1, o = t.add, s = t.remove, f = function() {
            return[i.width(), i.height()].join()
        }, e = function() {
            var n = f();
            n !== u && (u = n, setTimeout(t.fire))
        };
        return u = f(), t.add = function() {
            var n = o.apply(t, arguments);
            if (!r && t.has()) {
                i.on("resize", e);
                r = !0
            }
            return n
        }, t.remove = function() {
            var n = s.apply(t, arguments);
            return!t.has() && r && (i.off("resize", e), r = !1), n
        }, t
    }(), h = function() {
        var n = document.activeElement;
        n && n !== document.body && n.blur && n.blur()
    }, c = function(t) {
        var i = n("<div />");
        return window.WinJS ? WinJS.Utilities.setInnerHTMLUnsafe(i.get(0), t) : i.append(t), i.contents()
    }, l = function(i) {
        var s, u, c;
        i = n.extend({}, i);
        var l = t.devices.current(), f = t.devices.real(), e = i.allowZoom, o = i.allowPan, a = "allowSelection"in i ? i.allowSelection : l.platform == "desktop", h = "meta[name=viewport]";
        if (n(h).length || n("<meta />").attr("name", "viewport").appendTo("head"), s = ["width=device-width"], u = [], e ? u.push("pinch-zoom") : s.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no"), o && u.push("pan-x", "pan-y"), o || e ? n("html").css("-ms-overflow-style", "-ms-autohiding-scrollbar") : n("html, body").css({"-ms-content-zooming": "none", "-ms-user-select": "none", overflow: "hidden"}), !a) {
            if (f.ios)
                n(document).on("selectstart", function() {
                    return!1
                });
            n(".dx-viewport").css("user-select", "none")
        }
        if (n(h).attr("content", s.join()), n("html").css("-ms-touch-action", u.join(" ") || "none"), t.support.touch)
            n(document).off(".dxInitMobileViewport").on("dxpointermove.dxInitMobileViewport", function(n) {
                var t = n.pointers.length, i = n.pointerType === "touch", r = !e && t > 1, u = !o && t === 1 && !n.isScrollingEvent;
                i && (r || u) && n.preventDefault()
            });
        f = t.devices.real(), f.ios && (c = document.location.protocol === "file:", c || r.add(function() {
            var t = n(window).width();
            n("body").width(t)
        }))
    }, u = function(t) {
        var i = ".dx-visibility-change-handler";
        return function(r) {
            var u = n(r || "body"), f = u.find(i).add(u.filter(i));
            f.each(function() {
                n(this).triggerHandler(t)
            })
        }
    };
    t.dataOptionsAttributeName = "data-options";
    var f = function(i) {
        var r = n(i).attr(t.dataOptionsAttributeName), u;
        n.trim(r).charAt(0) !== "{" && (r = "{" + r + "}");
        try {
            u = new Function("return " + r)()
        } catch (f) {
            throw t.Error("E3018", f, r);
        }
        return u
    }, a = function(i, r) {
        var o = this, u = [], e = "[" + t.dataOptionsAttributeName + "]";
        return i.find(e).addBack(e).each(function(t, i) {
            var o = n(i), s = f(i), e;
            for (e in s)
                (!r || n.inArray(e, r) > -1) && o[e] && (o[e](s[e]), u.push(o[e]("instance")))
        }), u
    }, e = function(t) {
        if (t = n.trim(t), t.length)
            return(t[0] !== "<" || t[t.length - 1] !== ">") && (t = "<div>" + t + "<\/div>"), n(t)
    }, v = function(t) {
        return t = n(t), t.length && t[0].nodeName.toLowerCase() === "script" && (t = e(t.html())), t
    }, y = function(t) {
        return(t == null && (t = ""), t.nodeType || t.jquery) ? t : t[0] == "<" ? n(t) : n("<span>" + t + "<\/span>")
    }, p = function() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    };
    n.extend(t.utils, {createResizeHandler: s, windowResizeCallbacks: r, resetActiveElement: h, createMarkupFromString: c, triggerShownEvent: u("dxshown"), triggerHidingEvent: u("dxhiding"), initMobileViewport: l, getElementOptions: f, createComponents: a, htmlToJQuery: e, normalizeTemplateElement: v, stringToJquery: y, clearSelection: p})
}(jQuery, DevExpress), function(n, t) {
    var u = t.utils.isFunction, r = n.inArray, f = /iphone|ipad/.test(navigator.userAgent.toLowerCase()), e = function(t, i) {
        for (var l = u(t.customizeSeries) ? t.customizeSeries : n.noop, e = t.nameField || "series", s = {}, h = [], f, r, o = 0, c = i.length; o < c; o++)
            r = i[o], e in r && (f = s[r[e]], f || (f = s[r[e]] = {name: r[e], data: []}, h.push(f.name)), f.data.push(r));
        return n.map(h, function(t) {
            var i = s[t], r = l.call(null, i.name);
            return n.extend(i, r)
        })
    }, o = function() {
        var n = 1;
        return function() {
            return"DevExpress_" + n++
        }
    }(), s = function(t) {
        var r, i = {left: 0, top: 0}, u, o = t.root, e;
        return o && (r = o.element, r.getScreenCTM && !f ? (e = r.getScreenCTM(), e ? (u = r.createSVGPoint().matrixTransform(e), i.left = u.x + (document.body.scrollLeft || document.documentElement.scrollLeft), i.top = u.y + (document.body.scrollTop || document.documentElement.scrollTop)) : (i.left = document.body.scrollLeft || document.documentElement.scrollLeft, i.top = document.body.scrollTop || document.documentElement.scrollTop)) : i = n(r).offset()), i
    }, h = function(n, t) {
        return(n.x <= t.x && t.x <= n.x + n.width || n.x >= t.x && n.x <= t.x + t.width) && (n.y <= t.y && t.y <= n.y + n.height || n.y >= t.y && n.y <= t.y + t.height)
    }, c = function(n, t, i) {
        if (!(n && n.length > 0 && t && i))
            return{};
        var e = [], u = r(t, n), f = r(i, n), c, l, o, s = !1, h;
        return u < 0 && (u = 0), f < 0 && (f = n.length - 1), f < u && (c = f, f = u, u = c, s = !0), e = n.slice(u, f + 1), h = e.length, o = h > 0, {categories: o ? e : null, start: o ? e[s ? h - 1 : 0] : null, end: o ? e[s ? 0 : h - 1] : null, inverted: s}
    };
    n.extend(t.utils, {processSeriesTemplate: e, getNextDefsSvgId: o, getRootOffset: s, getCategoriesInfo: c, checkOverlapping: h})
}(jQuery, DevExpress), function(n, t) {
    var r = function(t) {
        return n.isArray(t) ? t : [t]
    }, u = function(t, i) {
        if (!n.isArray(t) || t.length === 0)
            return[];
        if (!n.isArray(i) || i.length === 0)
            return t.slice();
        var r = [];
        return n.each(t, function(t, u) {
            var f = n.inArray(u, i);
            f === -1 && r.push(u)
        }), r
    };
    n.extend(t.utils, {wrapToArray: r, removeDublicates: u})
}(jQuery, DevExpress), function(n, t, i) {
    var u = {iPhone: "iPhone", iPhone5: "iPhone", iPhone6: "iPhone", iPhone6plus: "iPhone", iPad: "iPad", iPadMini: "iPad Mini", androidPhone: "Android Mobile", androidTablet: "Android", win8: "MSAppHost", win8Phone: "Windows Phone 8", msSurface: "MSIE ARM Tablet PC", desktop: "desktop", tizen: "Tizen Mobile"}, r = {deviceType: "", platform: "", version: [], phone: !1, tablet: !1, android: !1, ios: !1, win8: !1, tizen: !1, generic: !1, mac: !1}, e = n.extend(r, {platform: "generic", deviceType: "desktop", generic: !0}), f = {win8: function(n) {
            var t = /windows phone/i.test(n), r = !t && /arm(.*)trident/i.test(n), f = !t && !r && /msapphost/i.test(n), i, u;
            if (t || r || f)
                return i = n.match(/windows phone (\d+).(\d+)/i) || n.match(/windows nt (\d+).(\d+)/i), u = i ? [parseInt(i[1], 10), parseInt(i[2], 10)] : [], {deviceType: t ? "phone" : r ? "tablet" : "desktop", platform: "win8", version: u}
        }, ios: function(n) {
            if (/ip(hone|od|ad)/i.test(n)) {
                var i = /ip(hone|od)/i.test(n), t = n.match(/os (\d+)_(\d+)_?(\d+)?/i), r = t ? [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)] : [];
                return{deviceType: i ? "phone" : "tablet", platform: "ios", version: r}
            }
        }, android: function(n) {
            if (/android|htc_|silk/i.test(n)) {
                var i = /mobile/i.test(n), t = n.match(/android (\d+)\.(\d+)\.?(\d+)?/i), r = t ? [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)] : [];
                return{deviceType: i ? "phone" : "tablet", platform: "android", version: r}
            }
        }, tizen: function(n) {
            if (/tizen/i.test(n)) {
                var i = /mobile/i.test(n), t = n.match(/tizen (\d+)\.(\d+)/i), r = t ? [parseInt(t[1], 10), parseInt(t[2], 10)] : [];
                return{deviceType: i ? "phone" : "tablet", platform: "tizen", version: r}
            }
        }};
    t.Devices = t.Class.inherit({ctor: function(r) {
            this._window = r && r.window || window, this._realDevice = this._getDevice(), this._currentDevice = i, this._currentOrientation = i, this.orientationChanged = n.Callbacks(), this._callbacksToEvents("Devices", ["orientationChanged"]), this._recalculateOrientation(), t.utils.windowResizeCallbacks.add(n.proxy(this._recalculateOrientation, this))
        }, current: function(n) {
            if (n)
                this._currentDevice = this._getDevice(n), t.ui.themes.init({_autoInit: !0});
            else {
                if (!this._currentDevice) {
                    n = i;
                    try {
                        n = this._getDeviceOrNameFromWindowScope()
                    } catch (r) {
                        n = this._getDeviceNameFromSessionStorage()
                    } finally {
                        n || (n = this._getDeviceNameFromSessionStorage())
                    }
                    this._currentDevice = this._getDevice(n)
                }
                return this._currentDevice
            }
        }, real: function() {
            return n.extend({}, this._realDevice)
        }, orientation: function() {
            return this._currentOrientation
        }, isRippleEmulator: function() {
            return!!this._window.tinyHippos
        }, _getCssClasses: function(n) {
            var i = [], r = this._realDevice;
            return n = n || this.current(), n.deviceType && i.push("dx-device-" + n.deviceType), i.push("dx-device-" + r.platform), r.version && r.version.length && i.push("dx-device-" + r.platform + "-" + r.version[0]), t.devices.isSimulator() && i.push("dx-simulator"), t.rtlEnabled && i.push("dx-rtl"), i
        }, attachCssClasses: function(t, i) {
            n(t).addClass(this._getCssClasses(i).join(" "))
        }, detachCssClasses: function(t, i) {
            n(t).removeClass(this._getCssClasses(i).join(" "))
        }, isSimulator: function() {
            try {
                return this._isSimulator || this._window.top !== this._window.self && this._window.top["dx-force-device"] || this.isRippleEmulator()
            } catch (n) {
                return!1
            }
        }, forceSimulator: function() {
            this._isSimulator = !0
        }, _getDevice: function(i) {
            if (i === "genericPhone" && (i = {deviceType: "phone", platform: "generic", generic: !0}), n.isPlainObject(i))
                return this._fromConfig(i);
            var r;
            if (i) {
                if (r = u[i], !r)
                    throw t.Error("E0005");
            } else
                r = navigator.userAgent;
            return this._fromUA(r)
        }, _getDeviceOrNameFromWindowScope: function() {
            var n;
            return(this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"]) && (n = this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"]), n
        }, _getDeviceNameFromSessionStorage: function() {
            var i = this._window.sessionStorage, t, r;
            if (i) {
                t = i.getItem("dx-force-device");
                try {
                    r = n.parseJSON(t)
                } catch (u) {
                    return t
                }
                return r
            }
        }, _fromConfig: function(t) {
            var i = {phone: t.deviceType === "phone", tablet: t.deviceType === "tablet", android: t.platform === "android", ios: t.platform === "ios", win8: t.platform === "win8", tizen: t.platform === "tizen", generic: t.platform === "generic"};
            return n.extend({}, r, this._currentDevice, i, t)
        }, _fromUA: function(t) {
            var i, e, u;
            return(n.each(f, function(n, r) {
                return i = r(t), !i
            }), i) ? this._fromConfig(i) : (e = /(mac os)/.test(t.toLowerCase()), u = r, u.mac = e, u)
        }, _changeOrientation: function() {
            var i = n(this._window), t = i.height() > i.width() ? "portrait" : "landscape";
            this._currentOrientation !== t && (this._currentOrientation = t, this.orientationChanged.fire({orientation: t}))
        }, _recalculateOrientation: function() {
            var t = n(this._window).width();
            this._currentWidth !== t && (this._currentWidth = t, this._changeOrientation())
        }}).include(t.EventsMixin), t.devices = new t.Devices, t.viewPortChanged.add(function(n, i) {
        t.devices.detachCssClasses(i), t.devices.attachCssClasses(n)
    })
}(jQuery, DevExpress), function(n, t) {
    var f = /(webkit)[ \/]([\w.]+)/, e = /(opera)(?:.*version)?[ \/]([\w.]+)/, o = /(msie) (\d{1,2}\.\d)/, s = /(trident).*rv:(\d{1,2}\.\d)/, h = /(mozilla)(?:.*? rv:([\w.]+))?/, u = navigator.userAgent.toLowerCase(), c = function() {
        var t = {}, i = f.exec(u) || e.exec(u) || o.exec(u) || s.exec(u) || u.indexOf("compatible") < 0 && h.exec(u) || [], n = i[1], r = i[2];
        return n === "trident" && (n = "msie"), n && (t[n] = !0, t.version = r), t
    }();
    t.browser = c
}(jQuery, DevExpress, this), function(n, t, i) {
    var u = ["", "Webkit", "Moz", "O", "ms"], s = {Webkit: "-webkit-", Moz: "-moz-", O: "-o-", ms: "-ms-"}, e = document.createElement("dx").style, h = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MsTransitionEnd", transition: "transitionend"}, o = function(n, i) {
        var f, r, e;
        for (n = t.inflector.camelize(n, !0), r = 0, e = u.length; r < e; r++)
            if (f = i(u[r] + n, u[r]), f)
                return f
    }, f = function(n) {
        return o(n, function(n) {
            if (n in e)
                return n
        })
    }, c = function(n) {
        return o(n, function(n, t) {
            if (n in e)
                return s[t]
        }) || ""
    }, r = function(n) {
        return!!f(n)
    }, l = function() {
        var r = t.devices.real(), u = r.platform, f = r.version, e = f && f[0] < 4 && u === "android";
        return!e && n.inArray(u, ["ios", "android", "win8"]) > -1 || r.mac
    };
    t.support = {touchEvents: "ontouchstart"in i, touch: "ontouchstart"in i || !!i.navigator.msMaxTouchPoints, pointer: i.navigator.pointerEnabled || i.navigator.msPointerEnabled, transform: r("transform"), transition: r("transition"), transitionEndEventName: h[f("transition")], animation: r("animation"), nativeScrolling: l(), winJS: "WinJS"in i, styleProp: f, stylePropPrefix: c, supportProp: r, hasKo: !!i.ko, hasNg: !i.ko && !!i.angular, inputType: function(n) {
            if (n === "text")
                return!0;
            var t = document.createElement("input");
            try {
                return t.setAttribute("type", n), t.value = "wrongValue", !t.value
            } catch (i) {
                return!1
            }
        }}
}(jQuery, DevExpress, this), function(n, t, i) {
    var y = /left|right/, p = /top|bottom/, s = /fit|flip|none/, h = function(i) {
        var r = {h: "center", v: "center"}, u = t.utils.splitPair(i);
        return u && n.each(u, function() {
            var n = String(this).toLowerCase();
            y.test(n) ? r.h = n : p.test(n) && (r.v = n)
        }), r
    }, c = function(n) {
        return t.utils.stringPairToObject(n)
    }, w = function(n) {
        var i = t.utils.splitPair(n), r = String(i && i[0]).toLowerCase(), u = String(i && i[1]).toLowerCase();
        return s.test(r) || (r = "none"), s.test(u) || (u = r), {h: r, v: u}
    }, l = function(n) {
        switch (n) {
            case"center":
                return.5;
            case"right":
            case"bottom":
                return 1;
            default:
                return 0
            }
    }, f = function(n) {
        switch (n) {
            case"left":
                return"right";
            case"right":
                return"left";
            case"top":
                return"bottom";
            case"bottom":
                return"top";
            default:
                return n
            }
    }, e = function(n, t) {
        var i = 0;
        return n.myLocation < t.min && (i += t.min - n.myLocation), n.myLocation > t.max && (i += n.myLocation - t.max), i
    }, o = function(n) {
        n.myLocation = n.atLocation + l(n.atAlign) * n.atSize - l(n.myAlign) * n.mySize + n.offset
    }, r = {fit: function(n, t) {
            var i = !1;
            return n.myLocation > t.max && (n.myLocation = t.max, i = !0), n.myLocation < t.min && (n.myLocation = t.min, i = !0), i
        }, flip: function(t, i) {
            if (t.myAlign === "center" && t.atAlign === "center")
                return!1;
            if (t.myLocation < i.min || t.myLocation > i.max) {
                var r = n.extend({}, t, {myAlign: f(t.myAlign), atAlign: f(t.atAlign), offset: -t.offset});
                if (o(r), r.oversize = e(r, i), r.myLocation >= i.min && r.myLocation <= i.max || r.myLocation > t.myLocation || r.oversize < t.oversize)
                    return t.myLocation = r.myLocation, t.oversize = r.oversize, !0
            }
            return!1
        }}, u, b = {h: {location: 0, flip: !1, fit: !1, oversize: 0}, v: {location: 0, flip: !1, fit: !1, oversize: 0}}, a = function(f, s) {
        var d = n(f), nt = d.offset(), p = n.extend(!0, {}, b, {h: {location: nt.left}, v: {location: nt.top}}), g, k;
        if (!s)
            return p;
        var tt = h(s.my), it = h(s.at), y = s.of || window, rt = c(s.offset), ut = w(s.collision), ft = s.boundary, et = c(s.boundaryOffset), l = {mySize: d.outerWidth(), myAlign: tt.h, atAlign: it.h, offset: rt.h, collision: ut.h, boundaryOffset: et.h}, a = {mySize: d.outerHeight(), myAlign: tt.v, atAlign: it.v, offset: rt.v, collision: ut.v, boundaryOffset: et.v};
        return y.preventDefault ? (l.atLocation = y.pageX, a.atLocation = y.pageY, l.atSize = 0, a.atSize = 0) : (y = n(y), n.isWindow(y[0]) ? (l.atLocation = y.scrollLeft(), a.atLocation = y.scrollTop(), l.atSize = y.width(), a.atSize = y.height()) : y[0].nodeType === 9 ? (l.atLocation = 0, a.atLocation = 0, l.atSize = y.width(), a.atSize = y.height()) : (g = y.offset(), l.atLocation = g.left, a.atLocation = g.top, l.atSize = y.outerWidth(), a.atSize = y.outerHeight())), o(l), o(a), k = function() {
            var r = n(window), e = r.width(), o = r.height(), s = r.scrollLeft(), h = r.scrollTop(), w = document.width > document.documentElement.clientWidth, b = document.height > document.documentElement.clientHeight, k = t.support.touch ? document.documentElement.clientWidth / (b ? e - u : e) : 1, d = t.support.touch ? document.documentElement.clientHeight / (w ? o - u : o) : 1, c, y, f, p;
            return u === i && (u = v()), c = e, y = o, ft && (f = n(ft), p = f.offset(), s += p.left, h += p.top, c = f.width(), y = f.height()), {h: {min: s + l.boundaryOffset, max: s + c / k - l.mySize - l.boundaryOffset}, v: {min: h + a.boundaryOffset, max: h + y / d - a.mySize - a.boundaryOffset}}
        }(), l.oversize = e(l, k.h), a.oversize = e(a, k.v), r[l.collision] && (p.h[l.collision] = r[l.collision](l, k.h)), r[a.collision] && (p.v[a.collision] = r[a.collision](a, k.v)), n.extend(!0, p, {h: {location: Math.round(l.myLocation), oversize: Math.round(l.oversize)}, v: {location: Math.round(a.myLocation), oversize: Math.round(a.oversize)}}), p
    }, k = function(i, r) {
        var u = n(i), e, f;
        return r ? (t.translator.resetPosition(u), e = u.offset(), f = r.h && r.v ? r : a(u, r), t.translator.move(u, {left: Math.round(f.h.location - e.left), top: Math.round(f.v.location - e.top)}), f) : u.offset()
    }, v;
    n.extend(t, {calculatePosition: a, position: k, inverseAlign: f}), v = function() {
        var t = n("<div>").css({width: 100, height: 100, overflow: "scroll", position: "absolute", top: -9999}).appendTo(n("body")), i = t.get(0).offsetWidth - t.get(0).clientWidth;
        return t.remove(), i
    }
}(jQuery, DevExpress), function(n, t) {
    var r = {}, u = function(t, i) {
        if (n.isPlainObject(t)) {
            n.each(t, u);
            return
        }
        r[t] = i
    }, e = function() {
        var i = n.makeArray(arguments);
        n.each(i, function() {
            delete r[this]
        })
    }, f;
    u({func: {execute: function(t) {
                n.isFunction(t.action) && (t.result = t.action.apply(t.context, t.args), t.handled = !0)
            }}, url: {execute: function(n) {
                typeof n.action == "string" && n.action.charAt(0) !== "#" && (document.location = n.action)
            }}, hash: {execute: function(n) {
                typeof n.action == "string" && n.action.charAt(0) === "#" && (document.location.hash = n.action)
            }}}), f = t.Class.inherit({ctor: function(t, i) {
            i = i || {}, this._action = t || n.noop, this._context = i.context || window, this._beforeExecute = i.beforeExecute || n.noop, this._afterExecute = i.afterExecute || n.noop, this._component = i.component, this._excludeValidators = i.excludeValidators, this._validatingTargetName = i.validatingTargetName
        }, execute: function() {
            var n = {action: this._action, args: Array.prototype.slice.call(arguments), context: this._context, component: this._component, validatingTargetName: this._validatingTargetName, cancel: !1, handled: !1}, t;
            if (this._validateAction(n))
                return(this._beforeExecute.call(this._context, n), n.cancel) ? void 0 : (t = this._executeAction(n), this._afterExecute.call(this._context, n), t)
        }, _validateAction: function(t) {
            var i = this._excludeValidators;
            return n.each(r, function(r, u) {
                if (!i || !(n.inArray(r, i) > -1))
                    return u.validate && u.validate(t), t.cancel ? !1 : void 0
            }), !t.cancel
        }, _executeAction: function(t) {
            var i;
            return n.each(r, function(n, r) {
                return r.execute && r.execute(t), t.handled ? (i = t.result, !1) : void 0
            }), i
        }}), n.extend(t, {registerActionExecutor: u, unregisterActionExecutor: e, Action: f})
}(jQuery, DevExpress), function(n, t, i) {
    var s = t.support, f = "dxTranslator", h = /matrix(3d)?\((.+?)\)/, c = /translate(?:3d)?\((.+?)\)/, l = function(n) {
        var t = s.transform ? e(n) : v(n);
        return{left: t.x, top: t.y}
    }, a = function(n, t) {
        if (!s.transform) {
            n.css(t);
            return
        }
        var f = e(n), h = t.left, c = t.top;
        h !== i && (f.x = h || 0), c !== i && (f.y = c || 0), n.css({transform: o(f)}), (r(h) || r(c)) && u(n)
    }, r = function(t) {
        return n.type(t) === "string" && t[t.length - 1] === "%"
    }, v = function(n) {
        var t, i;
        try {
            var r = n.css("top"), f = n.css("left"), e = n.position();
            n.css({transform: "none", top: 0, left: 0}), u(n), i = n.position(), t = {x: e.left - i.left || parseInt(f) || 0, y: e.top - i.top || parseInt(r) || 0}, n.css({top: r, left: f})
        } catch (o) {
            t = {x: 0, y: 0}
        }
        return t
    }, e = function(n) {
        var i = n.data(f);
        if (!i) {
            var r = n.css("transform") || o({x: 0, y: 0}), t = r.match(h), u = t && t[1];
            t ? (t = t[2].split(","), u === "3d" ? t = t.slice(12, 15) : (t.push(0), t = t.slice(4, 7))) : t = [0, 0, 0], i = {x: parseFloat(t[0]), y: parseFloat(t[1]), z: parseFloat(t[2])}, y(n, i)
        }
        return i
    }, y = function(n, t) {
        n.data(f, t)
    }, u = function(n) {
        n.removeData(f)
    }, p = function(n) {
        n.css({left: 0, top: 0, transform: "none"}), u(n)
    }, w = function(n) {
        var t = n.match(c);
        if (t && t[1])
            return t = t[1].split(","), t = {x: parseFloat(t[0]), y: parseFloat(t[1]), z: parseFloat(t[2])}
    }, o = function(n) {
        n.x = n.x || 0, n.y = n.y || 0;
        var t = r(n.x) ? n.x : n.x + "px", i = r(n.y) ? n.y : n.y + "px";
        return"translate(" + t + ", " + i + ")"
    };
    t.translator = {move: a, locate: l, clearCache: u, parseTranslate: w, getTranslate: e, getTranslateCss: o, resetPosition: p}
}(jQuery, DevExpress), function(n, t) {
    var s = 1e3 / 60, r = function(n) {
        return this.setTimeout(n, s)
    }, u = function(n) {
        this.clearTimeout(n)
    }, f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, o = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame, e;
    f && o && (r = f, u = o), f && !o && (e = {}, r = function(n) {
        var t = f.call(window, function() {
            try {
                if (t in e)
                    return;
                n.apply(this, arguments)
            } finally {
                delete e[t]
            }
        });
        return t
    }, u = function(n) {
        e[n] = !0
    }), r = n.proxy(r, window), u = n.proxy(u, window), n.extend(t, {requestAnimationFrame: r, cancelAnimationFrame: u})
}(jQuery, DevExpress), function(n, t) {
    t.Animator = t.Class.inherit({ctor: function() {
            this._finished = !0, this._stopped = !1
        }, start: function() {
            this._stopped = !1, this._finished = !1, this._stepCore()
        }, stop: function() {
            this._stopped = !0
        }, _stepCore: function() {
            if (this._isStopped()) {
                this._stop();
                return
            }
            if (this._isFinished()) {
                this._finished = !0, this._complete();
                return
            }
            this._step(), t.requestAnimationFrame.call(window, n.proxy(this._stepCore, this))
        }, _step: t.abstract, _isFinished: n.noop, _stop: n.noop, _complete: n.noop, _isStopped: function() {
            return this._stopped
        }, inProgress: function() {
            return!(this._stopped || this._finished)
        }})
}(jQuery, DevExpress), function(n, t, i) {
    var u = t.translator, e = t.support, y = e.transitionEndEventName + ".dxFX", tt = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/, it = /^([+-])=(.*)/i, f = "dxAnimData", o = "dxAnimQueue", r = "transform", rt = {animate: function(t, i) {
            var u = this, r = n.Deferred();
            return i.transitionAnimation = {finish: function() {
                    u._cleanup(t, i), r.resolveWith(t, [i, t])
                }}, this._startAnimation(t, i), this._completeAnimationCallback(t, i).done(function() {
                i.transitionAnimation.finish()
            }), i.duration || i.transitionAnimation.finish(), r.promise()
        }, _completeAnimationCallback: function(t, i) {
            var e = n.now() + i.delay, r = n.Deferred(), u = n.Deferred(), f = n.Deferred();
            t.one(y, function() {
                n.now() - e >= i.duration && u.reject()
            });
            return i.transitionAnimation.simulatedEndEventTimer = setTimeout(function() {
                f.reject()
            }, i.duration + i.delay), n.when(u, f).fail(n.proxy(function() {
                r.resolve()
            }, this)), r.promise()
        }, _startAnimation: function(n, t) {
            n.css("transform"), n.css({transitionProperty: "all", transitionDelay: t.delay + "ms", transitionDuration: t.duration + "ms", transitionTimingFunction: t.easing}), nt(n, t.to)
        }, _cleanup: function(n, t) {
            n.css("transition", "none").off(y), clearTimeout(t.transitionAnimation.simulatedEndEventTimer)
        }, stop: function(t, i, r) {
            i && (r ? i.transitionAnimation.finish() : (n.each(i.to, function(n) {
                t.css(n, t.css(n))
            }), this._cleanup(t, i)))
        }}, p = {animate: function(t, f) {
            var o = n.Deferred(), e = this;
            return f ? (n.each(f.to, function(n) {
                f.from[n] === i && (f.from[n] = e._normalizeValue(t.css(n)))
            }), f.to[r] && (f.from[r] = e._parseTransform(f.from[r]), f.to[r] = e._parseTransform(f.to[r])), f.frameAnimation = {to: f.to, from: f.from, currentValue: f.from, easing: et(f.easing), duration: f.duration, startTime: (new Date).valueOf(), finish: function() {
                    this.currentValue = this.to, this.draw(), o.resolve()
                }, draw: function() {
                    var i = n.extend({}, this.currentValue);
                    i[r] && (i[r] = n.map(i[r], function(n, t) {
                        return t === "translate" ? u.getTranslateCss(n) : t === "scale" ? "scale(" + n + ")" : t.substr(0, t.length - 1) === "rotate" ? t + "(" + n + "deg)" : void 0
                    }).join(" ")), t.css(i)
                }}, f.delay ? (f.frameAnimation.startTime += f.delay, f.frameAnimation.delayTimeout = setTimeout(function() {
                e._animationStep(t, f)
            }, f.delay)) : e._animationStep(t, f), o.promise()) : o.reject().promise()
        }, _parseTransform: function(t) {
            var i = {};
            return n.each(t.match(/(\w|\d)+\([^\)]*\)\s*/g), function(n, t) {
                var e = u.parseTranslate(t), f = t.match(/scale\((.+?)\)/), r = t.match(/(rotate.)\((.+)deg\)/);
                e && (i.translate = e), f && f[1] && (i.scale = parseFloat(f[1])), r && r[1] && (i[r[1]] = parseFloat(r[2]))
            }), i
        }, stop: function(n, t, i) {
            var r = t && t.frameAnimation;
            r && (clearTimeout(r.delayTimeout), i && r.finish(), delete t.frameAnimation)
        }, _animationStep: function(i, r) {
            var u = r && r.frameAnimation, f;
            if (u) {
                if (f = (new Date).valueOf(), f >= u.startTime + u.duration) {
                    u.finish();
                    return
                }
                u.currentValue = this._calcStepValue(u, f - u.startTime), u.draw(), t.requestAnimationFrame(n.proxy(function() {
                    this._animationStep(i, r)
                }, this))
            }
        }, _calcStepValue: function(t, i) {
            var r = function(u, f) {
                var e = n.isArray(f) ? [] : {}, o = function(r) {
                    var e = i / t.duration, o = i, s = 1 * u[r], h = f[r] - u[r], c = t.duration;
                    return n.easing[t.easing](e, o, s, h, c)
                };
                return n.each(f, function(n, t) {
                    if (typeof t == "string" && parseFloat(t, 10) === !1)
                        return!0;
                    e[n] = typeof t == "object" ? r(u[n], t) : o(n)
                }), e
            };
            return r(t.from, t.to)
        }, _normalizeValue: function(n) {
            var t = parseFloat(n, 10);
            return t === !1 ? n : t
        }}, ut = {transition: e.transition ? rt : p, frame: p}, w = function(n) {
        return ut[n && n.strategy || "transition"]
    }, ft = {linear: "cubic-bezier(0, 0, 1, 1)", ease: "cubic-bezier(0.25, 0.1, 0.25, 1)", "ease-in": "cubic-bezier(0.42, 0, 1, 1)", "ease-out": "cubic-bezier(0, 0, 0.58, 1)", "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"}, et = function(t) {
        var i, r, u;
        return(t = ft[t] || t, i = t.match(tt), !i) ? "linear" : (i = i.slice(1, 5), n.each(i, function(n, t) {
            i[n] = parseFloat(t)
        }), r = "cubicbezier_" + i.join("_").replace(/\./g, "p"), n.isFunction(n.easing[r]) || (u = function(n, t, i, r) {
            var u = 3 * n, f = 3 * (i - n) - u, o = 1 - u - f, e = 3 * t, s = 3 * (r - t) - e, h = 1 - e - s, c = function(n) {
                return n * (u + n * (f + n * o))
            }, l = function(n) {
                return n * (e + n * (s + n * h))
            }, a = function(n) {
                for (var t = n, r = 0, i; r < 14; ) {
                    if (i = c(t) - n, Math.abs(i) < .001)
                        break;
                    t = t - i / v(t), r++
                }
                return t
            }, v = function(n) {
                return u + n * (2 * f + n * 3 * o)
            };
            return function(n) {
                return l(a(n))
            }
        }, n.easing[r] = function(n, t, r, f, e) {
            return f * u(i[0], i[1], i[2], i[3])(t / e) + r
        }), r)
    }, b = function(i, r) {
        n.each(["from", "to"], function() {
            if (!n.isPlainObject(i[this]))
                throw t.Error("E0010", r, this);
        })
    }, ot = {setup: function() {
        }}, st = {top: {my: "bottom center", at: "top center"}, bottom: {my: "top center", at: "bottom center"}, right: {my: "left center", at: "right center"}, left: {my: "right center", at: "left center"}}, s = {validateConfig: function(n) {
            b(n, "slide")
        }, setup: function(t, i) {
            var f = u.locate(t), r;
            i.type !== "slide" && (r = i.type === "slideIn" ? i.from : i.to, r.position = n.extend({of: window}, st[i.direction]), v(t, r)), this._setUpConfig(f, i.from), this._setUpConfig(f, i.to), u.clearCache(t), e.transform || t.css("position") !== "static" || t.css("position", "relative")
        }, _setUpConfig: function(n, t) {
            t.left = "left"in t ? t.left : "+=0", t.top = "top"in t ? t.top : "+=0", this._initNewPosition(n, t)
        }, _initNewPosition: function(n, t) {
            var f = {left: t.left, top: t.top}, o, s;
            delete t.left, delete t.top, o = this._getRelativeValue(f.left), o !== i ? f.left = o + n.left : t.left = 0, o = this._getRelativeValue(f.top), o !== i ? f.top = o + n.top : t.top = 0, s = {x: 0, y: 0}, e.transform ? s = {x: f.left, y: f.top} : (t.left = f.left, t.top = f.top), t[r] = u.getTranslateCss(s)
        }, _getRelativeValue: function(n) {
            var t;
            if (typeof n == "string" && (t = it.exec(n)))
                return parseInt(t[1] + "1") * t[2]
        }}, h = {setup: function(t, i) {
            var u = i.from, f = n.isPlainObject(u) ? t.css("opacity") : String(u), r;
            switch (i.type) {
                case"fadeIn":
                    r = 1;
                    break;
                case"fadeOut":
                    r = 0;
                    break;
                default:
                    r = String(i.to)
            }
            i.from = {visibility: "visible", opacity: f}, i.to = {opacity: r}
        }}, ht = {validateConfig: function(n) {
            b(n, "pop")
        }, setup: function(n, t) {
            var i = t.from, f = t.to, o = "opacity"in i ? i.opacity : n.css("opacity"), s = "opacity"in f ? f.opacity : 1, h = "scale"in i ? i.scale : 0, c = "scale"in f ? f.scale : 1, e;
            t.from = {opacity: o}, e = u.getTranslate(n), t.from[r] = this._getCssTransform(e, h), t.to = {opacity: s}, t.to[r] = this._getCssTransform(e, c)
        }, _getCssTransform: function(n, t) {
            return u.getTranslateCss(n) + "scale(" + t + ")"
        }}, k = {custom: ot, slide: s, slideIn: s, slideOut: s, fade: h, fadeIn: h, fadeOut: h, pop: ht}, d = function(n) {
        var i = k[n];
        if (!i)
            throw t.Error("E0011", n);
        return i
    }, ct = {type: "custom", from: {}, to: {}, duration: 400, start: n.noop, complete: n.noop, easing: "ease", delay: 0}, lt = function(t, i) {
        var u = n(t), r;
        return(i = n.extend(!0, {}, ct, i), !u.length) ? n.Deferred().resolve().promise() : (r = d(i.type), n.isFunction(r.validateConfig) && r.validateConfig(i), at(u, i))
    }, at = function(t, i) {
        i.deferred = i.deferred || n.Deferred();
        var r = c(t);
        return vt(t, r), r.push(i), l(t) || a(t, r), i.deferred.promise()
    }, c = function(n) {
        return n.data(o) || []
    }, vt = function(n, t) {
        n.data(o, t)
    }, g = function(n) {
        n.removeData(o)
    }, l = function(n) {
        return!!n.data(f)
    }, a = function(n, t) {
        var t = c(n), i;
        t.length && (i = t.shift(), t.length === 0 && g(n), yt(n, i).done(function() {
            a(n)
        }))
    }, yt = function(n, i) {
        v(n, i.from), v(n, i.to);
        var r = d(i.type);
        return r.setup(n, i), n.data(f, i), t.fx.off && (i.duration = 0), nt(n, i.from), i.start.apply(this, [n, i]), w(i).animate(n, i).done(function() {
            n.removeData(f), i.complete.apply(this, [n, i]), i.deferred.resolveWith(this, [n, i])
        })
    }, v = function(i, r) {
        if (r.position) {
            var u = t.calculatePosition(i, r.position), f = i.offset(), e = i.position();
            n.extend(r, {left: u.h.location - f.left + e.left, top: u.v.location - f.top + e.top}), delete r.position
        }
    }, nt = function(t, i) {
        n.each(i, function(n, i) {
            t.css(n, i)
        })
    }, pt = function(t, i) {
        var r = n(t), e = c(r), u;
        n.each(e, function(n, t) {
            t.duration = 0
        }), l(r) || a(r, e), u = r.data(f), w(u).stop(r, u, i), r.removeData(f), g(r)
    };
    t.fx = {off: !1, animationTypes: k, animate: lt, isAnimating: l, stop: pt}
}(jQuery, DevExpress), function(n, t) {
    function e(n) {
        return/^(localhost$|127\.)/i.test(n)
    }
    var r = window.location, u = "dxproxy.devexpress.com:8000", f = r.protocol === "ms-appx:", o = r.host === u, s = e(r.hostname), h = function() {
        return r.pathname.split("/")[1]
    }, c = function(n) {
        var i = t.parseUrl(n);
        return e(i.hostname) ? "http://" + u + "/" + h() + "_" + i.port + i.pathname + i.search : n
    }, l = t.EndpointSelector = function(n) {
        this.config = n
    };
    l.prototype = {urlFor: function(n) {
            var i = this.config[n];
            if (!i)
                throw t.Error("E0006");
            return o ? c(i.local) : i.production && (f && !Debug.debuggerEnabled || !f && !s) ? i.production : i.local
        }}
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.utils, f, u;
    t.NumericFormat = {currency: "C", fixedpoint: "N", exponential: "", percent: "P", decimal: "D"}, t.LargeNumberFormatPostfixes = {1: "K", 2: "M", 3: "B", 4: "T"}, f = 4, u = 10, t.LargeNumberFormatPowers = {largenumber: "auto", thousands: 1, millions: 2, billions: 3, trillions: 4}, t.DateTimeFormat = {longdate: "D", longtime: "T", monthandday: "M", monthandyear: "Y", quarterandyear: "qq", shortdate: "d", shorttime: "t", millisecond: "fff", second: "T", minute: "t", hour: "t", day: "dd", week: "dd", month: "MMMM", quarter: "qq", year: "yyyy", longdatelongtime: "D", shortdateshorttime: "d", shortyear: "yy"}, t.formatHelper = {defaultQuarterFormat: "Q{0}", romanDigits: ["I", "II", "III", "IV"], _addFormatSeparator: function(n, t) {
            var i = " ";
            return t ? n + i + t : n
        }, _getDateTimeFormatPattern: function(n) {
            return Globalize.findClosestCulture().calendar.patterns[t.DateTimeFormat[n.toLowerCase()]]
        }, _isDateFormatContains: function(i) {
            var r = !1;
            return n.each(t.DateTimeFormat, function(n) {
                return r = n === i.toLowerCase(), !r
            }), r
        }, getQuarter: function(n) {
            return Math.floor(n / 3)
        }, getFirstQuarterMonth: function(n) {
            return this.getQuarter(n) * 3
        }, _getQuarterString: function(n, t) {
            var i = this.getQuarter(n.getMonth());
            switch (t) {
                case"q":
                    return this.romanDigits[i];
                case"qq":
                    return r.stringFormat(this.defaultQuarterFormat, this.romanDigits[i]);
                case"Q":
                    return(i + 1).toString();
                case"QQ":
                    return r.stringFormat(this.defaultQuarterFormat, (i + 1).toString())
            }
            return""
        }, _formatCustomString: function(n, t) {
            var f = /qq|q|QQ|Q/g, i, u = "", r = 0;
            for (f.lastIndex = 0; r < t.length; )
                i = f.exec(t), (!i || i.index > r) && (u += Globalize.format(n, t.substring(r, i ? i.index : t.length))), i ? (u += this._getQuarterString(n, i[0]), r = i.index + i[0].length) : r = t.length;
            return u
        }, _parseNumberFormatString: function(i) {
            var u, r = {};
            if (i && typeof i == "string")
                return u = i.toLowerCase().split(" "), n.each(u, function(n, i) {
                    i in t.NumericFormat ? r.formatType = i : i in t.LargeNumberFormatPowers && (r.power = t.LargeNumberFormatPowers[i])
                }), r.power && !r.formatType && (r.formatType = "fixedpoint"), r.formatType ? r : void 0
        }, _calculateNumberPower: function(n, t, r, u) {
            var f = Math.abs(n), e = 0;
            if (f > 1)
                while (f && f >= t && (u === i || e < u))
                    e++, f = f / t;
            else if (f > 0 && f < 1)
                while (f < 1 && (r === i || e > r))
                    e--, f = f * t;
            return e
        }, _getNumberByPower: function(n, t, i) {
            for (var r = n; t > 0; )
                r = r / i, t--;
            while (t < 0)
                r = r * i, t++;
            return r
        }, _formatNumber: function(n, i, r) {
            var u;
            return i.power === "auto" && (i.power = this._calculateNumberPower(n, 1e3, 0, f)), i.power && (n = this._getNumberByPower(n, i.power, 1e3)), u = t.LargeNumberFormatPostfixes[i.power] || "", this._formatNumberCore(n, i.formatType, r) + u
        }, _formatNumberExponential: function(n, t) {
            var r = this._calculateNumberPower(n, u), f = this._getNumberByPower(n, r, u), e;
            return t = t === i ? 1 : t, f.toFixed(t || 0) >= u && (r++, f = f / u), e = (r >= 0 ? "+" : "") + r.toString(), this._formatNumberCore(f, "fixedpoint", t) + "E" + e
        }, _formatNumberCore: function(n, i, u) {
            return i === "exponential" ? this._formatNumberExponential(n, u) : Globalize.format(n, t.NumericFormat[i] + (r.isNumber(u) ? u : 0))
        }, _formatDate: function(n, i) {
            var u = t.DateTimeFormat[i.toLowerCase()];
            return(i = i.toLowerCase(), i === "quarterandyear" && (u = this._getQuarterString(n, u) + " yyyy"), i === "quarter") ? this._getQuarterString(n, u) : i === "longdatelongtime" ? this._formatDate(n, "longdate") + " " + this._formatDate(n, "longtime") : i === "shortdateshorttime" ? this._formatDate(n, "shortDate") + " " + this._formatDate(n, "shortTime") : Globalize.format(n, u)
        }, format: function(n, t, i) {
            if (t && t.format) {
                if (t.dateType)
                    return this._formatDateEx(n, t);
                if (r.isNumber(n) && isFinite(n))
                    return this._formatNumberEx(n, t)
            }
            return this._format(n, t, i)
        }, _format: function(n, t, i) {
            var u;
            return!r.isString(t) || t === "" || !r.isNumber(n) && !r.isDate(n) ? r.isDefined(n) ? n.toString() : "" : (u = this._parseNumberFormatString(t), r.isNumber(n) && u) ? this._formatNumber(n, u, i) : r.isDate(n) && this._isDateFormatContains(t) ? this._formatDate(n, t) : !u && !this._isDateFormatContains(t) ? this._formatCustomString(n, t) : void 0
        }, _formatNumberEx: function(n, i) {
            var l = this, p = t.NumericFormat[i.format.toLowerCase()], e = Globalize.culture().numberFormat, b = i.currencyCulture && Globalize.cultures[i.currencyCulture] ? Globalize.cultures[i.currencyCulture].numberFormat.currency : e.currency, k = e.percent, a = l._getUnitFormatSettings(n, i), d = a.unit, v = a.precision, tt = a.showTrailingZeros, it = a.includeGroupSeparator, rt = e[","], ut = e["."], u, y, s, f, g = /n|\$|-|%/g, o = "", h, w, nt, c;
            if (!r.isDefined(n))
                return"";
            n = l._applyUnitToValue(n, d), u = Math.abs(n), y = n < 0;
            switch (p) {
                case t.NumericFormat.decimal:
                    if (s = "n", u = Math[y ? "ceil" : "floor"](u), v > 0) {
                        for (h = "" + u, w = h.length; w < v; w += 1)
                            h = "0" + h;
                        u = h
                    }
                    y && (u = "-" + u);
                    break;
                case t.NumericFormat.fixedpoint:
                    f = e;
                case t.NumericFormat.currency:
                    f = f || b;
                case t.NumericFormat.percent:
                    f = f || k, s = y ? f.pattern[0] : f.pattern[1] || "n", u = Globalize.format(u * (p === t.NumericFormat.percent ? 100 : 1), "N" + v), tt || (u = l._excludeTrailingZeros(u, ut)), it || (u = u.replace(new RegExp("\\" + rt, "g"), ""));
                    break;
                case t.NumericFormat.exponential:
                    return l._formatNumberExponential(n, v);
                default:
                    throw"Illegal numeric format: '" + p + "'";
            }
            for (; ; )
                if (nt = g.lastIndex, c = g.exec(s), o += s.slice(nt, c ? c.index : s.length), c)
                    switch (c[0]) {
                        case"-":
                            /[1-9]/.test(u) && (o += e["-"]);
                            break;
                        case"$":
                            o += b.symbol;
                            break;
                        case"%":
                            o += k.symbol;
                            break;
                        case"n":
                            o += u + d
                    }
                else
                    break;
            return(i.plus && n > 0 ? "+" : "") + o
        }, _excludeTrailingZeros: function(n, t) {
            var u = n.indexOf(t), r, i;
            if (u < 0)
                return n;
            for (r = n.length, i = r - 1; i >= u && (n[i] === "0" || i === u); i--)
                r--;
            return n.substring(0, r)
        }, _getUnitFormatSettings: function(n, t) {
            var e = t.unit || "", u = t.precision || 0, h = t.includeGroupSeparator || !1, s = t.showTrailingZeros === i ? !0 : t.showTrailingZeros, f = t.significantDigits || 1, r, o;
            if (e.toLowerCase() === "auto")
                if (s = !1, r = Math.abs(n), f < 1 && (f = 1), r >= 1e9 ? (e = "B", r /= 1e9) : r >= 1e6 ? (e = "M", r /= 1e6) : r >= 1e3 ? (e = "K", r /= 1e3) : e = "", r == 0)
                    u = 0;
                else if (r < 1)
                    for (u = f, o = Math.pow(10, - f); r < o; )
                        o /= 10, u++;
                else
                    u = r >= 100 ? f - 3 : r >= 10 ? f - 2 : f - 1;
            return u < 0 && (u = 0), {unit: e, precision: u, showTrailingZeros: s, includeGroupSeparator: h}
        }, _applyUnitToValue: function(n, t) {
            return t == "B" ? n.toFixed(1) / 1e9 : t == "M" ? n / 1e6 : t == "K" ? n / 1e3 : n
        }, _formatDateEx: function(t, u) {
            var e = this, l = u.format, f = u.dateType, c = Globalize.culture().calendars.standard, s = i, h, o;
            if (l = l.toLowerCase(), !r.isDefined(t))
                return"";
            if (f !== "num" || l === "dayofweek")
                switch (l) {
                    case"monthyear":
                        return e._formatDate(t, "monthandyear");
                    case"quarteryear":
                        return e._getQuarterString(t, "QQ") + " " + t.getFullYear();
                    case"daymonthyear":
                        return e._formatDate(t, f + "Date");
                    case"datehour":
                        return s = new Date(t.getTime()), s.setMinutes(0), o = f === "timeOnly" ? "" : e._formatDate(t, f + "Date"), f === "timeOnly" ? e._formatDate(s, "shorttime") : o + " " + e._formatDate(s, "shorttime");
                    case"datehourminute":
                        return o = f === "timeOnly" ? "" : e._formatDate(t, f + "Date"), f === "timeOnly" ? e._formatDate(t, "shorttime") : o + " " + e._formatDate(t, "shorttime");
                    case"datehourminutesecond":
                        return o = f === "timeOnly" ? "" : e._formatDate(t, f + "Date"), f === "timeOnly" ? e._formatDate(t, "longtime") : o + " " + e._formatDate(t, "longtime");
                    case"year":
                        return o = t.toString(), f === "abbr" ? o.slice(2, 4) : o;
                    case"dateyear":
                        return f === "abbr" ? e._formatDate(t, "shortyear") : e._formatDate(t, "year");
                    case"quarter":
                        return r.stringFormat(e.defaultQuarterFormat, t.toString());
                    case"month":
                        return h = t - 1, f === "abbr" ? c.months.namesAbbr[h] : c.months.names[h];
                    case"hour":
                        return f === "long" ? (s = new Date, s.setHours(t), s.setMinutes(0), e._formatDate(s, "shorttime")) : t.toString();
                    case"dayofweek":
                        return h = r.isString(t) ? n.inArray(t, ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]) : t, f !== "num" ? f === "abbr" ? c.days.namesAbbr[h] : c.days.names[h] : ((h - c.firstDay + 1 + 7) % 8).toString();
                    default:
                        return t.toString()
                }
            else
                return t.toString()
        }, getTimeFormat: function(n) {
            return n ? this._getDateTimeFormatPattern("longtime") : this._getDateTimeFormatPattern("shorttime")
        }, getDateFormatByDifferences: function(n) {
            var i = "";
            return(n.millisecond && (i = t.DateTimeFormat.millisecond), (n.hour || n.minute || n.second) && (i = this._addFormatSeparator(this.getTimeFormat(n.second), i)), n.year && n.month && n.day) ? this._addFormatSeparator(this._getDateTimeFormatPattern("shortdate"), i) : n.year && n.month ? t.DateTimeFormat.monthandyear : n.year ? t.DateTimeFormat.year : n.month && n.day ? this._addFormatSeparator(this._getDateTimeFormatPattern("monthandday"), i) : n.month ? t.DateTimeFormat.month : n.day ? this._addFormatSeparator("dddd, dd", i) : i
        }, getDateFormatByTicks: function(n) {
            var f, t, u, i, e;
            if (n.length > 1)
                for (t = r.getDatesDifferences(n[0], n[1]), i = 1; i < n.length - 1; i++)
                    u = r.getDatesDifferences(n[i], n[i + 1]), t.count < u.count && (t = u);
            else
                t = {year: !0, month: !0, day: !0, hour: n[0].getHours() > 0, minute: n[0].getMinutes() > 0, second: n[0].getSeconds() > 0};
            return f = this.getDateFormatByDifferences(t)
        }, getDateFormatByTickInterval: function(n, t, i) {
            var e, u, f, s = {quarter: "month", week: "day"}, o = function(n, t, i) {
                switch (t) {
                    case"year":
                        n.month = i;
                    case"quarter":
                    case"month":
                        n.day = i;
                    case"week":
                    case"day":
                        n.hour = i;
                    case"hour":
                        n.minute = i;
                    case"minute":
                        n.second = i;
                    case"second":
                        n.millisecond = i
                    }
            }, h = function(n, t, i) {
                !i.getMilliseconds() && i.getSeconds() ? i.getSeconds() - t.getSeconds() == 1 && (n.millisecond = !0, n.second = !1) : !i.getSeconds() && i.getMinutes() ? i.getMinutes() - t.getMinutes() == 1 && (n.second = !0, n.minute = !1) : !i.getMinutes() && i.getHours() ? i.getHours() - t.getHours() == 1 && (n.minute = !0, n.hour = !1) : !i.getHours() && i.getDate() > 1 ? i.getDate() - t.getDate() == 1 && (n.hour = !0, n.day = !1) : i.getDate() === 1 && i.getMonth() ? i.getMonth() - t.getMonth() == 1 && (n.day = !0, n.month = !1) : !i.getMonth() && i.getFullYear() && i.getFullYear() - t.getFullYear() == 1 && (n.month = !0, n.year = !1)
            };
            return i = r.isString(i) ? i.toLowerCase() : i, u = r.getDatesDifferences(n, t), n !== t && h(u, n > t ? t : n, n > t ? n : t), f = r.getDateUnitInterval(u), o(u, f, !0), f = r.getDateUnitInterval(i || "second"), o(u, f, !1), u[s[f] || f] = !0, e = this.getDateFormatByDifferences(u)
        }}
}(jQuery, DevExpress), function(n) {
    function u(n) {
        this.baseColor = n;
        var t;
        n && (t = String(n).toLowerCase().replace(/ /g, ""), t = c[t] ? "#" + c[t] : t, t = a(t)), t || (this.colorIsInvalid = !0), t = t || {}, this.r = i(t[0]), this.g = i(t[1]), this.b = i(t[2]), this.a = i(t[3], 1, 1), this.hsv = t[4] ? {h: t[4][0], s: t[4][1], v: t[4][2]} : y(this.r, this.g, this.b), this.hsl = t[5] ? {h: t[5][0], s: t[5][1], l: t[5][2]} : w(this.r, this.g, this.b)
    }
    function a(n) {
        if (n === "transparent")
            return[0, 0, 0, 0];
        for (var u, t = 0, r = e.length, i; t < r; ++t)
            if (i = e[t].re.exec(n), i)
                return e[t].process(i);
        return null
    }
    function i(n, t, i) {
        return t = t || 0, i = i || 255, n < 0 || isNaN(n) ? t : n > i ? i : n
    }
    function v(n, t, i) {
        return"#" + (16777216 | n << 16 | t << 8 | i).toString(16).slice(1)
    }
    function y(n, t, i) {
        var u = Math.max(n, t, i), f = Math.min(n, t, i), e = u - f, r, o, s;
        if (s = u, o = u === 0 ? 0 : 1 - f / u, u === f)
            r = 0;
        else
            switch (u) {
                case n:
                    r = 60 * ((t - i) / e), t < i && (r = r + 360);
                    break;
                case t:
                    r = 60 * ((i - n) / e) + 120;
                    break;
                case i:
                    r = 60 * ((n - t) / e) + 240
            }
        return o *= 100, s *= 100 / 255, {h: Math.round(r), s: Math.round(o), v: Math.round(s)}
    }
    function l(n, t, i) {
        var o, s, r, c, h, u, f, e;
        c = Math.floor(n / 60), r = (100 - t) * i / 100, h = (i - r) * (n % 60 / 60), s = r + h, o = i - h;
        switch (c) {
            case 0:
                u = i, f = s, e = r;
                break;
            case 1:
                u = o, f = i, e = r;
                break;
            case 2:
                u = r, f = i, e = s;
                break;
            case 3:
                u = r, f = o, e = i;
                break;
            case 4:
                u = s, f = r, e = i;
                break;
            case 5:
                u = i, f = r, e = o
        }
        return[Math.round(u * 2.55), Math.round(f * 2.55), Math.round(e * 2.55)]
    }
    function p(n, t, i, r) {
        var u = Math.max(n, t, i);
        switch (u) {
            case n:
                return(t - i) / r + (t < i ? 6 : 0);
            case t:
                return(i - n) / r + 2;
            case i:
                return(n - t) / r + 4
            }
    }
    function w(n, t, i) {
        var o;
        n = f(n, 255), t = f(t, 255), i = f(i, 255);
        var s = Math.max(n, t, i), h = Math.min(n, t, i), c = s + h, u, e, l = c / 2;
        return s === h ? u = e = 0 : (o = s - h, e = l > .5 ? o / (2 - c) : o / c, u = p(n, t, i, o), u /= 6), {h: r(u * 360), s: r(e * 100), l: r(l * 100)}
    }
    function o(n, t) {
        var i = t;
        return n === "r" && (i = t + 1 / 3), n === "b" && (i = t - 1 / 3), i
    }
    function b(n) {
        return n < 0 && (n += 1), n > 1 && (n -= 1), n
    }
    function s(n, t, i) {
        return(i = b(i), i < 1 / 6) ? n + (t - n) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? n + (t - n) * (2 / 3 - i) * 6 : n
    }
    function k(n, t, i) {
        var h, c, l, n = f(n, 360), t = f(t, 100), i = f(i, 100), u, e;
        return t === 0 ? h = c = l = i : (u = i < .5 ? i * (1 + t) : i + t - i * t, e = 2 * i - u, h = s(e, u, o("r", n)), c = s(e, u, o("g", n)), l = s(e, u, o("b", n))), [r(h * 255), r(c * 255), r(l * 255)]
    }
    function f(n, t) {
        return(n = Math.min(t, Math.max(0, parseFloat(n))), Math.abs(n - t) < 1e-6) ? 1 : n % t / parseFloat(t)
    }
    function h(n, t, i) {
        return(t = t || 0, i = i || 255, n % 1 != 0 || n < t || n > i || typeof n != "number" || isNaN(n)) ? !1 : !0
    }
    var c = {aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslateblue: "8470ff", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32"}, e = [{re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, process: function(n) {
                return[parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)]
            }}, {re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*\.*\d+)\)$/, process: function(n) {
                return[parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), parseFloat(n[4])]
            }}, {re: /^#(\w{2})(\w{2})(\w{2})$/, process: function(n) {
                return[parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
            }}, {re: /^#(\w{1})(\w{1})(\w{1})$/, process: function(n) {
                return[parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
            }}, {re: /^hsv\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, process: function(n) {
                var i = parseInt(n[1], 10), r = parseInt(n[2], 10), u = parseInt(n[3], 10), t = l(i, r, u);
                return[t[0], t[1], t[2], 1, [i, r, u]]
            }}, {re: /^hsl\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, process: function(n) {
                var i = parseInt(n[1], 10), r = parseInt(n[2], 10), u = parseInt(n[3], 10), t = k(i, r, u);
                return[t[0], t[1], t[2], 1, null, [i, r, u]]
            }}], r = Math.round;
    u.prototype = {constructor: u, highlight: function(n) {
            return n = n || 10, this.alter(n).toHex()
        }, darken: function(n) {
            return n = n || 10, this.alter(-n).toHex()
        }, alter: function(n) {
            var t = new u;
            return t.r = i(this.r + n), t.g = i(this.g + n), t.b = i(this.b + n), t
        }, blend: function(n, t) {
            var e = n instanceof u ? n : new u(n), f = new u;
            return f.r = i(r(this.r * (1 - t) + e.r * t)), f.g = i(r(this.g * (1 - t) + e.g * t)), f.b = i(r(this.b * (1 - t) + e.b * t)), f
        }, toHex: function() {
            return v(this.r, this.g, this.b)
        }, getPureColor: function() {
            var n = l(this.hsv.h, 100, 100);
            return new u("rgb(" + n.join(",") + ")")
        }, isValidHex: function(n) {
            return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)
        }, isValidRGB: function(n, t, i) {
            return!h(n) || !h(t) || !h(i) ? !1 : !0
        }, isValidAlpha: function(n) {
            return isNaN(n) || n < 0 || n > 1 || typeof n != "number" ? !1 : !0
        }, colorIsInvalid: !1}, n.Color = u
}(DevExpress), function(n, t) {
    Globalize.localize = function(n, t) {
        var i = (t || this.cultureSelector || "").substring(0, 2);
        return this.findClosestCulture(t).messages[n] || this.findClosestCulture(i).messages[n] || this.cultures["default"].messages[n]
    };
    var r = function() {
        var i = {};
        return{setup: function(n) {
                this.localizeString = function(r) {
                    var u = new RegExp("(^|[^a-zA-Z_0-9" + n + "-]+)(" + n + "{1,2})([a-zA-Z_0-9-]+)", "g"), f = n + n;
                    return r.replace(u, function(r, u, e, o) {
                        var s = u + n + o;
                        return e !== f && (Globalize.cultures["default"].messages[o] ? s = u + Globalize.localize(o) : i[o] = t.inflector.humanize(o)), s
                    })
                }
            }, localizeNode: function(t) {
                var i = this;
                n(t).each(function(t, r) {
                    r.nodeType && (r.nodeType === 3 ? r.nodeValue = i.localizeString(r.nodeValue) : (n.each(r.attributes || [], function(n, t) {
                        if (typeof t.value == "string") {
                            var r = i.localizeString(t.value);
                            t.value !== r && (t.value = r)
                        }
                    }), n(r).contents().each(function(n, t) {
                        i.localizeNode(t)
                    })))
                })
            }, getDictionary: function(t) {
                return t ? i : n.extend({}, i, Globalize.cultures["default"].messages)
            }}
    }();
    r.setup("@"), t.localization = r
}(jQuery, DevExpress), Globalize.addCultureInfo("default", {messages: {Yes: "Yes", No: "No", Cancel: "Cancel", Clear: "Clear", Done: "Done", Loading: "Loading...", Select: "Select...", Search: "Search", Back: "Back", OK: "OK", "dxCollectionWidget-noDataText": "No data to display", "validation-required": "Required", "validation-required-formatted": "{0} is required", "validation-numeric": "Value should be a number", "validation-numeric-formatted": "{0} should be a number", "validation-range": "Value is out of range", "validation-range-formatted": "{0} is out of range", "validation-stringLength": "The length of the value is not correct", "validation-stringLength-formatted": "The length of {0} is not correct", "validation-custom": "Value is invalid", "validation-custom-formatted": "{0} is invalid", "validation-compare": "Values do not match", "validation-compare-formatted": "{0} does not match", "validation-pattern": "Value does not match pattern", "validation-pattern-formatted": "{0} does not match pattern", "validation-email": "Email is invalid", "validation-email-formatted": "{0} is invalid"}}), Globalize.addCultureInfo("default", {messages: {"dxLookup-searchPlaceholder": "Minimum character number: {0}", "dxList-pullingDownText": "Pull down to refresh...", "dxList-pulledDownText": "Release to refresh...", "dxList-refreshingText": "Refreshing...", "dxList-pageLoadingText": "Loading...", "dxList-nextButtonText": "More", "dxList-selectAll": "Select All", "dxListEditDecorator-delete": "Delete", "dxListEditDecorator-more": "More", "dxScrollView-pullingDownText": "Pull down to refresh...", "dxScrollView-pulledDownText": "Release to refresh...", "dxScrollView-refreshingText": "Refreshing...", "dxScrollView-reachBottomText": "Loading...", "dxDateBox-simulatedDataPickerTitleTime": "Select time", "dxDateBox-simulatedDataPickerTitleDate": "Select date", "dxDateBox-simulatedDataPickerTitleDateTime": "Select date and time", "dxFileUploader-selectFile": "Select file", "dxFileUploader-dropFile": "or Drop file here", "dxFileUploader-bytes": "bytes", "dxFileUploader-kb": "kb", "dxFileUploader-Mb": "Mb", "dxFileUploader-Gb": "Gb"}}), Globalize.addCultureInfo("default", {messages: {"dxSwitch-onText": "ON", "dxSwitch-offText": "OFF"}}), Globalize.addCultureInfo("default", {messages: {"dxDataGrid-columnChooserTitle": "Column Chooser", "dxDataGrid-columnChooserEmptyText": "Drag a column here to hide it", "dxDataGrid-groupContinuesMessage": "Continues on the next page", "dxDataGrid-groupContinuedMessage": "Continued from the previous page", "dxDataGrid-editingEditRow": "Edit", "dxDataGrid-editingSaveRowChanges": "Save", "dxDataGrid-editingCancelRowChanges": "Cancel", "dxDataGrid-editingDeleteRow": "Delete", "dxDataGrid-editingUndeleteRow": "Undelete", "dxDataGrid-editingConfirmDeleteMessage": "Are you sure you want to delete this record?", "dxDataGrid-editingConfirmDeleteTitle": "", "dxDataGrid-groupPanelEmptyText": "Drag a column header here to group by that column", "dxDataGrid-noDataText": "No data", "dxDataGrid-searchPanelPlaceholder": "Search...", "dxDataGrid-filterRowShowAllText": "(All)", "dxDataGrid-filterRowResetOperationText": "Reset", "dxDataGrid-filterRowOperationEquals": "Equals", "dxDataGrid-filterRowOperationNotEquals": "Does not equal", "dxDataGrid-filterRowOperationLess": "Less than", "dxDataGrid-filterRowOperationLessOrEquals": "Less than or equal to", "dxDataGrid-filterRowOperationGreater": "Greater than", "dxDataGrid-filterRowOperationGreaterOrEquals": "Greater than or equal to", "dxDataGrid-filterRowOperationStartsWith": "Starts with", "dxDataGrid-filterRowOperationContains": "Contains", "dxDataGrid-filterRowOperationNotContains": "Does not contain", "dxDataGrid-filterRowOperationEndsWith": "Ends with", "dxDataGrid-applyFilterText": "Apply filter", "dxDataGrid-trueText": "true", "dxDataGrid-falseText": "false", "dxDataGrid-sortingAscendingText": "Sort Ascending", "dxDataGrid-sortingDescendingText": "Sort Descending", "dxDataGrid-sortingClearText": "Clear Sorting", "dxDataGrid-editingSaveAllChanges": "Save changes", "dxDataGrid-editingCancelAllChanges": "Discard changes", "dxDataGrid-editingAddRow": "Add a row", "dxDataGrid-summaryMin": "Min: {0}", "dxDataGrid-summaryMinOtherColumn": "Min of {1} is {0}", "dxDataGrid-summaryMax": "Max: {0}", "dxDataGrid-summaryMaxOtherColumn": "Max of {1} is {0}", "dxDataGrid-summaryAvg": "Avg: {0}", "dxDataGrid-summaryAvgOtherColumn": "Avg of {1} is {0}", "dxDataGrid-summarySum": "Sum: {0}", "dxDataGrid-summarySumOtherColumn": "Sum of {1} is {0}", "dxDataGrid-summaryCount": "Count: {0}", "dxPager-infoText": "Page {0} of {1}"}}), function(n, t, i) {
    var r = t.utils, u = {required: {validate: function(t, i) {
                return r.isDefined(t) ? t === !1 ? !1 : (t = String(t), (i.trim || !r.isDefined(i.trim)) && (t = n.trim(t)), t !== "") : !1
            }, defaultMessage: Globalize.localize("validation-required"), defaultFormattedMessage: Globalize.localize("validation-required-formatted")}, numeric: {validate: function(t) {
                return n.isNumeric(t)
            }, defaultMessage: Globalize.localize("validation-numeric"), defaultFormattedMessage: Globalize.localize("validation-numeric-formatted")}, range: {validate: function(n, i) {
                var s = u.numeric.validate(n, i), h = r.isDefined(n), f = s ? parseFloat(n) : h && n.valueOf(), o = i.min, e = i.max;
                if (!(s || r.isDate(n)) && !h)
                    return!1;
                if (r.isDefined(o))
                    return r.isDefined(e) ? f >= o && f <= e : f >= o;
                if (r.isDefined(e))
                    return f <= e;
                throw t.Error("E0101");
                return!1
            }, defaultMessage: Globalize.localize("validation-range"), defaultFormattedMessage: Globalize.localize("validation-range-formatted")}, stringLength: {validate: function(t, i) {
                return t = String(t), (i.trim || !r.isDefined(i.trim)) && (t = n.trim(t)), u.range.validate(t.length, n.extend({}, i))
            }, defaultMessage: Globalize.localize("validation-stringLength"), defaultFormattedMessage: Globalize.localize("validation-stringLength-formatted")}, custom: {validate: function(n, t) {
                return t.validationCallback({value: n, validator: t.validator, rule: t})
            }, defaultMessage: Globalize.localize("validation-custom"), defaultFormattedMessage: Globalize.localize("validation-custom-formatted")}, compare: {validate: function(n, i) {
                if (!i.comparisonTarget)
                    throw t.Error("E0102");
                var r = i.comparisonTarget(), u = i.comparisonType || "==";
                switch (u) {
                    case"==":
                        return n == r;
                    case"===":
                        return n === r;
                    case">":
                        return n > r;
                    case">=":
                        return n >= r;
                    case"<":
                        return n < r;
                    case"<=":
                        return n <= r
                    }
            }, defaultMessage: Globalize.localize("validation-compare"), defaultFormattedMessage: Globalize.localize("validation-compare-formatted")}, pattern: {validate: function(n, t) {
                var i = t.pattern;
                return r.isString(i) && (i = new RegExp(i)), i.test(n)
            }, defaultMessage: Globalize.localize("validation-pattern"), defaultFormattedMessage: Globalize.localize("validation-pattern-formatted")}, email: {validate: function(t, i) {
                return u.pattern.validate(t, n.extend({}, i, {pattern: /^[\d\w\._\-]+@([\d\w\._\-]+\.)+[\w]+$/i}))
            }, defaultMessage: Globalize.localize("validation-email"), defaultFormattedMessage: Globalize.localize("validation-email-formatted")}}, f = t.Class.inherit({ctor: function(n) {
            this.group = n, this.validators = []
        }, validate: function() {
            var t = {isValid: !0, brokenRules: [], validators: []};
            return n.each(this.validators, function(n, i) {
                var r = i.validate();
                t.isValid = t.isValid && r.isValid, r.brokenRule && t.brokenRules.push(r.brokenRule), t.validators.push(i)
            }), this.fireEvent("validated", [{validators: t.validators, brokenRules: t.brokenRules, isValid: t.isValid}]), t
        }}).include(t.EventsMixin);
    t.validationEngine = {groups: [], getGroupConfig: function(t) {
            var i = n.grep(this.groups, function(n) {
                return n.group === t
            });
            if (i.length)
                return i[0]
        }, initGroups: function() {
            this.groups = [], this.addGroup()
        }, addGroup: function(n) {
            var t = this.getGroupConfig(n);
            return t || (t = new f(n), this.groups.push(t)), t
        }, removeGroup: function(t) {
            var i = this.getGroupConfig(t), r = n.inArray(i, this.groups);
            return r > -1 && this.groups.splice(r, 1), i
        }, _setDefaultMessage: function(n, t, i) {
            r.isDefined(n.message) || (n.message = t.defaultFormattedMessage && r.isDefined(i) ? t.defaultFormattedMessage.replace(/\{0\}/, i) : t.defaultMessage)
        }, validate: function(f, e, o) {
            var s = {name: o, value: f, brokenRule: i, isValid: !0, validationRules: e}, h = this;
            return n.each(e || [], function(n, i) {
                var e = u[i.type], c;
                if (e) {
                    if (r.isDefined(i.isValid) && i.value === f)
                        return i.isValid ? !0 : (s.isValid = !1, s.brokenRule = i, !1);
                    if (i.value = f, c = e.validate(f, i), i.isValid = c, c || (s.isValid = !1, h._setDefaultMessage(i, e, o), s.brokenRule = i), !i.isValid)
                        return!1
                } else
                    throw t.Error("E0100");
            }), s
        }, registerValidatorInGroup: function(i, r) {
            var u = t.validationEngine.addGroup(i);
            n.inArray(r, u.validators) < 0 && u.validators.push(r)
        }, removeRegistredValidator: function(i, r) {
            var u = t.validationEngine.getGroupConfig(i), f = u && u.validators, e = n.inArray(r, f);
            e > -1 && f.splice(e, 1)
        }, validateGroup: function(n) {
            var i = t.validationEngine.getGroupConfig(n);
            if (!i)
                throw t.Error("E0110");
            return i.validate()
        }}, t.validationEngine.initGroups()
}(jQuery, DevExpress), function(n, t) {
    n.extend(t.ERROR_MESSAGES, {E4000: "[DevExpress.data]: {0}", E4001: "Unknown aggregating function is detected: '{0}'", E4002: "Unsupported OData protocol version is used", E4003: "Unknown filter operation is used: {0}", E4004: "The thenby() method is called before the sortby() method", E4005: "Store requires a key expression for this operation", E4006: "ArrayStore 'data' option must be an array", E4007: "Compound keys cannot be auto-generated", E4008: "Attempt to insert an item with the a duplicated key", E4009: "Data item cannot be found by the parameters passed to the update(key,values) function", E4010: "CustomStore does not support creating queries", E4011: "Custom Store method is not implemented or is not a function: {0}", E4012: "Custom Store method returns an invalid value: {0}", E4013: "Local Store requires the 'name' configuration option is specified", E4014: "Unknown key type is detected: {0}", E4015: "Unknown entity name or alias is used: {0}", E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter"})
}(jQuery, DevExpress), function(n, t, i) {
    var o = function(n) {
        return n.replace(/\[/g, ".").replace(/\]/g, "")
    }, v = t.utils.unwrapObservable, s = function(n) {
        return t.support.hasKo && ko.isObservable(n)
    }, h = function(n, t) {
        return t === "this" ? n : n[t]
    }, c = function(n, i, r, u) {
        if (i === "this")
            throw new t.Error("E4016");
        var f = n[i];
        u.unwrapObservables && s(f) ? f(r) : n[i] = r
    }, l = function(n) {
        return n = n || {}, n.unwrapObservables = n.unwrapObservables !== i ? n.unwrapObservables : !0, n
    }, u = function(n, t) {
        return t.unwrapObservables ? v(n) : n
    }, f = function(t) {
        if (arguments.length > 1 && (t = n.makeArray(arguments)), !t || t === "this")
            return function(n) {
                return n
            };
        if (n.isFunction(t))
            return t;
        if (n.isArray(t))
            return y(t);
        t = o(t);
        var i = t.split(".");
        return function(t, r) {
            r = l(r);
            var f = u(t, r);
            return n.each(i, function() {
                if (!f)
                    return!1;
                var t = u(f[this], r);
                n.isFunction(t) && !r.functionsAsIs && (t = t.call(f)), f = t
            }), f
        }
    }, y = function(t) {
        var r = {};
        return n.each(t, function() {
            r[this] = f(this)
        }), function(t, u) {
            var f = {};
            return n.each(r, function(n) {
                var s = this(t, u), e, o, h, r;
                if (s !== i) {
                    for (e = f, o = n.split("."), h = o.length - 1, r = 0; r < h; r++)
                        e = e[o[r]] = {};
                    e[o[r]] = s
                }
            }), f
        }
    }, p = function(r) {
        r = r || "this", r = o(r);
        var a = r.lastIndexOf("."), v = f(r.substr(0, a)), e = r.substr(1 + a);
        return function(r, f, o) {
            o = l(o);
            var y = v(r, {functionsAsIs: o.functionsAsIs, unwrapObservables: o.unwrapObservables}), a = h(y, e);
            o.functionsAsIs || !n.isFunction(a) || s(a) ? (a = u(a, o), o.merge && n.isPlainObject(f) && (a === i || n.isPlainObject(a)) && !(f instanceof n.Event) ? (a || c(y, e, {}, o), t.utils.deepExtendArraySafe(u(h(y, e), o), f)) : c(y, e, f, o)) : y[e](f)
        }
    }, w = function(n) {
        return[n[0], n.length < 3 ? "=" : String(n[1]).toLowerCase(), n.length < 2 ? !0 : n[n.length - 1]]
    }, b = function(t) {
        return n.isArray(t) || (t = [t]), n.map(t, function(t) {
            return{selector: n.isFunction(t) || typeof t == "string" ? t : t.getter || t.field || t.selector, desc: !!(t.desc || String(t.dir).charAt(0).toLowerCase() === "d")}
        })
    }, a = t.Class.inherit({ctor: function(n) {
            n && (n = String(n)), this._value = this._normalize(n || this._generate())
        }, _normalize: function(n) {
            for (n = n.replace(/[^a-f0-9]/ig, "").toLowerCase(); n.length < 32; )
                n += "0";
            return[n.substr(0, 8), n.substr(8, 4), n.substr(12, 4), n.substr(16, 4), n.substr(20, 12)].join("-")
        }, _generate: function() {
            for (var t = "", n = 0; n < 32; n++)
                t += Math.round(Math.random() * 15).toString(16);
            return t
        }, toString: function() {
            return this._value
        }, valueOf: function() {
            return this._value
        }, toJSON: function() {
            return this._value
        }}), r = function(n, t) {
        return n instanceof Date ? n.getTime() : n instanceof a ? n.valueOf() : !t && typeof n == "string" ? n.toLowerCase() : n
    }, k = function(t, i, u) {
        var e, o, f;
        if (n.isArray(t)) {
            for (e = n.map(i, function(n, t) {
                return t
            }), f = 0; f < e.length; f++)
                if (o = e[f], r(i[o], !0) != r(u[o], !0))
                    return!1;
            return!0
        }
        return r(i, !0) == r(u, !0)
    }, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", g = function(t) {
        var r, i;
        for (n.isArray(t) || (t = nt(String(t))), r = "", i = 0; i < t.length; i += 3) {
            var e = t[i], u = t[i + 1], f = t[i + 2];
            r += n.map([e >> 2, (e & 3) << 4 | u >> 4, isNaN(u) ? 64 : (u & 15) << 2 | f >> 6, isNaN(f) ? 64 : f & 63], function(n) {
                return d.charAt(n)
            }).join("")
        }
        return r
    }, nt = function(n) {
        for (var i = [], t, r = 0; r < n.length; r++)
            t = n.charCodeAt(r), t < 128 ? i.push(t) : t < 2048 ? i.push(192 + (t >> 6), 128 + (t & 63)) : t < 65536 ? i.push(224 + (t >> 12), 128 + (t >> 6 & 63), 128 + (t & 63)) : t < 2097152 && i.push(240 + (t >> 18), 128 + (t >> 12 & 63), 128 + (t >> 6 & 63), 128 + (t & 63));
        return i
    }, tt = function() {
        var n = {timeout: "Network connection timeout", error: "Unspecified network error", parsererror: "Unexpected server response"}, t = function(t) {
            var i = n[t];
            return i ? i : t
        };
        return function(n, i) {
            return n.status < 400 ? t(i) : n.statusText
        }
    }(), it = {count: {seed: 0, step: function(n) {
                return 1 + n
            }}, sum: {seed: 0, step: function(n, t) {
                return n + t
            }}, min: {step: function(n, t) {
                return t < n ? t : n
            }}, max: {step: function(n, t) {
                return t > n ? t : n
            }}, avg: {seed: [0, 0], step: function(n, t) {
                return[n[0] + t, n[1] + 1]
            }, finalize: function(n) {
                return n[1] ? n[0] / n[1] : NaN
            }}}, e = t.data = {utils: {compileGetter: f, compileSetter: p, normalizeBinaryCriterion: w, normalizeSortingInfo: b, toComparable: r, keysEqual: k, errorMessageFromXhr: tt, aggregators: it}, Guid: a, base64_encode: g, queryImpl: {}, queryAdapters: {}, query: function() {
            var t = n.isArray(arguments[0]) ? "array" : "remote";
            return e.queryImpl[t].apply(this, arguments)
        }, errorHandler: null, _errorHandler: function(n) {
            e.errorHandler && e.errorHandler(n)
        }}
}(jQuery, DevExpress), function(n, t) {
    function e(n) {
        return n === u.aggregators.count
    }
    function f(n) {
        var f = u.compileGetter(n.selector), i = n.aggregator;
        if (typeof i == "string" && (i = r.utils.aggregators[i], !i))
            throw t.Error("E4001", n.aggregator);
        return{selector: f, aggregator: i}
    }
    var r = t.data, u = r.utils;
    r.AggregateCalculator = t.Class.inherit({ctor: function(t) {
            this._data = t.data, this._groupLevel = t.groupLevel || 0, this._totalAggregates = n.map(t.totalAggregates || [], f), this._groupAggregates = n.map(t.groupAggregates || [], f), this._totals = []
        }, calculate: function() {
            this._totalAggregates.length && this._calculateTotals(0, {items: this._data}), this._groupAggregates.length && this._groupLevel > 0 && this._calculateGroups(0, {items: this._data})
        }, _aggregate: function(n, t, i) {
            for (var u, r = 0; r < t.length; r++) {
                if (e(t[r].aggregator)) {
                    i[r] = (i[r] || 0) + n.items.length;
                    continue
                }
                for (u = 0; u < n.items.length; u++)
                    this._accumulate(r, t[r], i, n.items[u])
            }
        }, _calculateTotals: function(n, t) {
            var i, r;
            if (n === 0 && (this._totals = this._seed(this._totalAggregates)), n === this._groupLevel)
                this._aggregate(t, this._totalAggregates, this._totals);
            else
                for (i = 0; i < t.items.length; i++)
                    this._calculateTotals(n + 1, t.items[i]);
            n === 0 && (this._totals = this._finalize(this._totalAggregates, this._totals))
        }, _calculateGroups: function(n, t, i) {
            var r, f, u;
            if (n === this._groupLevel)
                this._aggregate(t, this._groupAggregates, i);
            else
                for (r = 0; r < t.items.length; r++)
                    u = this._seed(this._groupAggregates), this._calculateGroups(n + 1, t.items[r], u), t.items[r].aggregates = this._finalize(this._groupAggregates, u), n > 0 && (i = i || this._seed(this._groupAggregates), this._calculateGroups(n + 1, t.items[r], i))
        }, totalAggregates: function() {
            return this._totals
        }, _seed: function(t) {
            return n.map(t, function(t) {
                var u = t.aggregator, r = "seed"in u ? u.seed : NaN;
                return n.isArray(r) ? [r] : r
            })
        }, _accumulate: function(n, t, i, r) {
            var u = t.selector(r), f = t.aggregator;
            i[n] = i[n] !== i[n] ? u : f.step(i[n], u)
        }, _finalize: function(t, i) {
            return n.map(t, function(n, t) {
                var r = n.aggregator.finalize;
                return r ? r(i[t]) : i[t]
            })
        }})
}(jQuery, DevExpress), function(n, t, i) {
    var v = t.Class, u = t.data, l = u.queryImpl, f = u.utils.compileGetter, r = u.utils.toComparable, e = v.inherit({toArray: function() {
            var n = [];
            for (this.reset(); this.next(); )
                n.push(this.current());
            return n
        }, countable: function() {
            return!1
        }}), s = e.inherit({ctor: function(n) {
            this.array = n, this.index = -1
        }, next: function() {
            return this.index + 1 < this.array.length ? (this.index++, !0) : !1
        }, current: function() {
            return this.array[this.index]
        }, reset: function() {
            this.index = -1
        }, toArray: function() {
            return this.array.slice(0)
        }, countable: function() {
            return!0
        }, count: function() {
            return this.array.length
        }}), o = e.inherit({ctor: function(n) {
            this.iter = n
        }, next: function() {
            return this.iter.next()
        }, current: function() {
            return this.iter.current()
        }, reset: function() {
            return this.iter.reset()
        }}), h = o.inherit({ctor: function(n, t) {
            this.callBase(n), this.index = -1, this.mapper = t
        }, current: function() {
            return this.mapper(this.callBase(), this.index)
        }, next: function() {
            var n = this.callBase();
            return n && this.index++, n
        }}), c = e.inherit({ctor: function(n, t, i) {
            n instanceof h || (n = new h(n, this._wrap)), this.iter = n, this.rules = [{getter: t, desc: i}]
        }, thenBy: function(n, t) {
            var i = new c(this.sortedIter || this.iter, n, t);
            return this.sortedIter || (i.rules = this.rules.concat(i.rules)), i
        }, next: function() {
            return this._ensureSorted(), this.sortedIter.next()
        }, current: function() {
            return this._ensureSorted(), this.sortedIter.current()
        }, reset: function() {
            delete this.sortedIter
        }, countable: function() {
            return this.sortedIter || this.iter.countable()
        }, count: function() {
            return this.sortedIter ? this.sortedIter.count() : this.iter.count()
        }, _ensureSorted: function() {
            this.sortedIter || (n.each(this.rules, function() {
                this.getter = f(this.getter)
            }), this.sortedIter = new h(new s(this.iter.toArray().sort(n.proxy(this._compare, this))), this._unwrap))
        }, _wrap: function(n, t) {
            return{index: t, value: n}
        }, _unwrap: function(n) {
            return n.value
        }, _compare: function(n, t) {
            var s = n.index, h = t.index, i, c;
            if (n = n.value, t = t.value, n === t)
                return s - h;
            for (i = 0, c = this.rules.length; i < c; i++) {
                var e = this.rules[i], u = r(e.getter(n)), o = r(e.getter(t)), f = e.desc ? -1 : 1;
                if (u < o)
                    return-f;
                if (u > o)
                    return f;
                if (u !== o)
                    return u ? f : -f
            }
            return s - h
        }}), a = function() {
        function o(n, t, i) {
            return function(u) {
                u = r(n(u));
                var f = c(t) ? u === t : u == t;
                return i && (f = !f), f
            }
        }
        function c(n) {
            return n === "" || n === 0 || n === null || n === !1 || n === i
        }
        var s = function(t) {
            var u = [], i = ["return function(d) { return "], f = 0, r = !1;
            return n.each(t, function() {
                n.isArray(this) || n.isFunction(this) ? (r && i.push(" && "), u.push(a(this)), i.push("op[", f, "](d)"), f++, r = !0) : (i.push(/and|&/i.test(this) ? " && " : " || "), r = !1)
            }), i.push(" }"), new Function("op", i.join(""))(u)
        }, e = function(n) {
            return t.utils.isDefined(n) ? n.toString() : ""
        }, h = function(n) {
            n = u.utils.normalizeBinaryCriterion(n);
            var s = f(n[0]), h = n[1], i = n[2];
            i = r(i);
            switch (h.toLowerCase()) {
                case"=":
                    return o(s, i);
                case"<>":
                    return o(s, i, !0);
                case">":
                    return function(n) {
                        return r(s(n)) > i
                    };
                case"<":
                    return function(n) {
                        return r(s(n)) < i
                    };
                case">=":
                    return function(n) {
                        return r(s(n)) >= i
                    };
                case"<=":
                    return function(n) {
                        return r(s(n)) <= i
                    };
                case"startswith":
                    return function(n) {
                        return r(e(s(n))).indexOf(i) === 0
                    };
                case"endswith":
                    return function(n) {
                        var t = r(e(s(n)));
                        return t.lastIndexOf(i) === t.length - e(i).length
                    };
                case"contains":
                    return function(n) {
                        return r(e(s(n))).indexOf(i) > -1
                    };
                case"notcontains":
                    return function(n) {
                        return r(e(s(n))).indexOf(i) === -1
                    }
            }
            throw t.Error("E4003", h);
        };
        return function(t) {
            return n.isFunction(t) ? t : n.isArray(t[0]) ? s(t) : h(t)
        }
    }(), y = o.inherit({ctor: function(n, t) {
            this.callBase(n), this.criteria = a(t)
        }, next: function() {
            while (this.iter.next())
                if (this.criteria(this.current()))
                    return!0;
            return!1
        }}), p = e.inherit({ctor: function(n, t) {
            this.iter = n, this.getter = t
        }, next: function() {
            return this._ensureGrouped(), this.groupedIter.next()
        }, current: function() {
            return this._ensureGrouped(), this.groupedIter.current()
        }, reset: function() {
            delete this.groupedIter
        }, countable: function() {
            return!!this.groupedIter
        }, count: function() {
            return this.groupedIter.count()
        }, _ensureGrouped: function() {
            var r, t;
            if (!this.groupedIter) {
                var i = {}, e = [], u = this.iter, o = f(this.getter);
                for (u.reset(); u.next(); )
                    r = u.current(), t = o(r), t in i ? i[t].push(r) : (i[t] = [r], e.push(t));
                this.groupedIter = new s(n.map(e, function(n) {
                    return{key: n, items: i[n]}
                }))
            }
        }}), w = o.inherit({ctor: function(n, t) {
            this.callBase(n), this.getter = f(t)
        }, current: function() {
            return this.getter(this.callBase())
        }, countable: function() {
            return this.iter.countable()
        }, count: function() {
            return this.iter.count()
        }}), b = o.inherit({ctor: function(n, t, i) {
            this.callBase(n), this.skip = Math.max(0, t), this.take = Math.max(0, i), this.pos = 0
        }, next: function() {
            if (this.pos >= this.skip + this.take)
                return!1;
            while (this.pos < this.skip && this.iter.next())
                this.pos++;
            return this.pos++, this.iter.next()
        }, reset: function() {
            this.callBase(), this.pos = 0
        }, countable: function() {
            return this.iter.countable()
        }, count: function() {
            return Math.min(this.iter.count() - this.skip, this.take)
        }});
    l.array = function(r, o) {
        o = o || {}, r instanceof e || (r = new s(r));
        var k = function(n) {
            var t = o.errorHandler;
            t && t(n), u._errorHandler(n)
        }, d = function(t) {
            var u = n.Deferred().fail(k), f, o = t.step, e = t.finalize, i;
            try {
                for (r.reset(), f = ("seed"in t)?t.seed:r.next()?r.current():NaN, i = f; r.next(); )
                    i = o(i, r.current());
                u.resolve(e ? e(i) : i)
            } catch (s) {
                u.reject(s)
            }
            return u.promise()
        }, nt = function(n, t, i) {
            return arguments.length < 2 ? d({step: arguments[0]}) : d({seed: n, step: t, finalize: i})
        }, a = function(n) {
            return d(u.utils.aggregators[n])
        }, g = function(t) {
            return n.isFunction(t) || n.isArray(t) || (t = n.makeArray(arguments)), h(new w(r, t))
        }, v = function(n) {
            return g(f(n))
        }, h = function(n) {
            return l.array(n, o)
        };
        return{toArray: function() {
                return r.toArray()
            }, enumerate: function() {
                var t = n.Deferred().fail(k);
                try {
                    t.resolve(r.toArray())
                } catch (i) {
                    t.reject(i)
                }
                return t.promise()
            }, sortBy: function(n, t) {
                return h(new c(r, n, t))
            }, thenBy: function(n, i) {
                if (r instanceof c)
                    return h(r.thenBy(n, i));
                throw t.Error("E4004");
            }, filter: function(t) {
                return n.isArray(t) || (t = n.makeArray(arguments)), h(new y(r, t))
            }, slice: function(n, t) {
                return t === i && (t = Number.MAX_VALUE), h(new b(r, n, t))
            }, select: g, groupBy: function(n) {
                return h(new p(r, n))
            }, aggregate: nt, count: function() {
                if (r.countable()) {
                    var t = n.Deferred().fail(k);
                    try {
                        t.resolve(r.count())
                    } catch (i) {
                        t.reject(i)
                    }
                    return t.promise()
                }
                return a("count")
            }, sum: function(n) {
                return n ? v(n).sum() : a("sum")
            }, min: function(n) {
                return n ? v(n).min() : a("min")
            }, max: function(n) {
                return n ? v(n).max() : a("max")
            }, avg: function(n) {
                return n ? v(n).avg() : a("avg")
            }}
    }
}(jQuery, DevExpress), function(n, t) {
    var r = t.data, u = r.queryImpl;
    u.remote = function(i, f, e) {
        e = e || [], f = f || {};
        var o = function(n, t) {
            return{name: n, args: t}
        }, h = function(s) {
            function w(n) {
                switch (n.name) {
                    case"sortBy":
                        return l = [n.args], !0;
                    case"thenBy":
                        if (!l)
                            throw t.Error("E4004");
                        return l.push(n.args), !0
                }
                return!1
            }
            function b() {
                var t = h[0], i = [];
                t && t.name === "multiSort" && (h.shift(), n.each(t.args[0], function() {
                    i.push(o(i.length ? "thenBy" : "sortBy", this))
                })), h = i.concat(h)
            }
            var a = n.Deferred(), v, y, h, c, l, p = function(n) {
                var t = f.errorHandler;
                t && t(n), r._errorHandler(n), a.reject(n)
            };
            try {
                for (v = f.adapter || "odata", n.isFunction(v) || (v = r.queryAdapters[v]), y = v(f), h = [].concat(e).concat(s); h.length; ) {
                    if (c = h[0], !w(c)) {
                        if (l) {
                            h.unshift(o("multiSort", [l])), l = null;
                            continue
                        }
                        if (String(c.name) !== "enumerate" && (!y[c.name] || y[c.name].apply(y, c.args) === !1))
                            break
                    }
                    h.shift()
                }
                b(), y.exec(i).done(function(t, i) {
                    if (h.length) {
                        var r = u.array(t, {errorHandler: f.errorHandler});
                        n.each(h, function() {
                            r = r[this.name].apply(r, this.args)
                        }), r.done(a.resolve).fail(a.reject)
                    } else
                        a.resolve(t, i)
                }).fail(p)
            } catch (k) {
                p(k)
            }
            return a.promise()
        }, s = {};
        return n.each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
            var n = String(this);
            s[n] = function() {
                return u.remote(i, f, e.concat(o(n, arguments)))
            }
        }), n.each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
            var n = String(this);
            s[n] = function() {
                return h.call(this, o(n, arguments))
            }
        }), s
    }
}(jQuery, DevExpress), function(n, t, i) {
    function w(n) {
        function t(n, t) {
            return this[n]instanceof Date ? f.formatIso8601Date(this[n]) : t
        }
        return JSON.stringify(n, t)
    }
    function b(n) {
        return/^(?:[a-z]+:)?\/\//i.test(n)
    }
    function k(n, t) {
        var r, i = n.split("/"), u = t.split("/");
        for (i.pop(); u.length; )
            r = u.shift(), r === ".." ? i.pop() : i.push(r);
        return i.join("/")
    }
    var e = t.data, f = t.utils, o = e.Guid, v = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, y = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/, p = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/, c = "application/json;odata=verbose", d = function(t, i) {
        var u;
        t = n.extend({method: "get", url: "", params: {}, payload: null, headers: {}}, t), i = i || {}, u = i.beforeSend, u && u(t);
        var o = (t.method || "get").toLowerCase(), r = o === "get", f = r && i.jsonp, s = n.extend({}, t.params), h = r ? s : w(t.payload), l = !r && n.param(s), e = t.url, a = !r && c;
        return l && (e += (e.indexOf("?") > -1 ? "&" : "?") + l), f && (h.$format = "json"), {url: e, data: h, dataType: f ? "jsonp" : "json", jsonp: f && "$callback", type: o, timeout: 3e4, headers: t.headers, contentType: a, accepts: {json: [c, "text/plain"].join()}, xhrFields: {withCredentials: i.withCredentials}}
    }, h = function(t, i) {
        var r = n.Deferred(), u = d(t, i);
        return n.ajax(u).always(function(n, t) {
            var f = tt(n, t), o = f.error, s = f.data, e = f.nextUrl, c;
            o ? r.reject(o) : i.countOnly ? r.resolve(f.count) : e ? (b(e) || (e = k(u.url, e)), h({url: e}, i).fail(r.reject).done(function(n) {
                r.resolve(s.concat(n))
            })) : (isFinite(f.count) && (c = {totalCount: f.count}), r.resolve(s, c))
        }), r.promise()
    }, g = function(n) {
        var t, i = n;
        for (("message"in n) && (t = n.message.value?n.message.value:n.message); i = i.innererror || i.internalexception; )
            if (t = i.message, i.internalexception && t.indexOf("inner exception") === -1)
                break;
        return t
    }, nt = function(t, i) {
        var u;
        if (i === "nocontent")
            return null;
        var r = 200, f = "Unknown error", o = t;
        if (i !== "success") {
            r = t.status, f = e.utils.errorMessageFromXhr(t, i);
            try {
                o = n.parseJSON(t.responseText)
            } catch (s) {
            }
        }
        return(u = o && (o.error || o["@odata.error"]), u) ? (f = g(u) || f, r === 200 && (r = 500), u.code && (r = Number(u.code)), n.extend(Error(f), {httpStatus: r, errorDetails: u})) : r !== 200 ? n.extend(Error(f), {httpStatus: r}) : void 0
    }, tt = function(t, i) {
        var u = nt(t, i), r;
        return u ? {error: u} : n.isPlainObject(t) ? (r = "d"in t && (f.isArray(t.d) || f.isObject(t.d)) ? it(t, i) : rt(t, i), l(r), r) : {data: t}
    }, it = function(n) {
        var i = n.d;
        return i ? (i = i.results || i, {data: i, nextUrl: n.d.__next, count: parseInt(n.d.__count, 10)}) : {error: Error("Malformed or unsupported JSON response received")}
    }, rt = function(n) {
        var i = n.value || n;
        return i ? {data: i, nextUrl: n["@odata.nextLink"], count: parseInt(n["@odata.count"], 10)} : {error: Error("Malformed or unsupported JSON response received")}
    }, r = t.Class.inherit({ctor: function(n) {
            this._value = n
        }, valueOf: function() {
            return this._value
        }}), l = function(t) {
        n.each(t, function(n, i) {
            if (i !== null && typeof i == "object")
                l(i);
            else if (typeof i == "string")
                if (v.test(i))
                    t[n] = new o(i);
                else if (i.match(y)) {
                    var r = new Date(Number(RegExp.$1) + RegExp.$2 * 6e4);
                    t[n] = new Date(r.valueOf() + r.getTimezoneOffset() * 6e4)
                } else
                    p.test(i) && (t[n] = new Date(f.parseIso8601Date(t[n]).valueOf()))
        })
    }, ut = function() {
        var n = function(n) {
            return n = String(n), n.length < 2 && (n = "0" + n), n
        };
        return function(t) {
            var i = ["datetime'", t.getFullYear(), "-", n(t.getMonth() + 1), "-", n(t.getDate())];
            return(t.getHours() || t.getMinutes() || t.getSeconds() || t.getMilliseconds()) && (i.push("T", n(t.getHours()), ":", n(t.getMinutes()), ":", n(t.getSeconds())), t.getMilliseconds() && i.push(".", t.getMilliseconds())), i.push("'"), i.join("")
        }
    }(), ft = function(n) {
        return"'" + n.replace(/</g, "%26lt").replace(/'/g, "''") + "'"
    }, u = function(n) {
        return n instanceof r ? n.valueOf() : n.replace(/\./g, "/")
    }, et = function(n) {
        return n instanceof Date ? f.formatIso8601Date(n) : a(n)
    }, a = function(n) {
        return n instanceof Date ? ut(n) : n instanceof o ? "guid'" + n + "'" : n instanceof r ? n.valueOf() : typeof n == "string" ? ft(n) : String(n)
    }, ot = 2, s = function(n, i) {
        i = i || ot;
        switch (i) {
            case 2:
            case 3:
                return a(n);
            case 4:
                return et(n);
            default:
                throw t.Error("E4002");
            }
    }, st = function(t, i) {
        if (n.isPlainObject(t)) {
            var r = [];
            return n.each(t, function(n, t) {
                r.push(u(n) + "=" + s(t, i))
            }), r.join()
        }
        return s(t)
    }, ht = {String: function(n) {
            return n + ""
        }, Int32: function(n) {
            return Math.floor(n)
        }, Int64: function(n) {
            return n instanceof r ? n : new r(n + "L")
        }, Guid: function(n) {
            return n instanceof o ? n : new o(n)
        }, Boolean: function(n) {
            return!!n
        }, Single: function(n) {
            return n instanceof r ? n : new r(n + "f")
        }, Decimal: function(n) {
            return n instanceof r ? n : new r(n + "m")
        }}, ct = function() {
        var i = function(n) {
            return function(t, i, r) {
                r.push(t, " ", n, " ", i)
            }
        }, r = function(n, t) {
            return function(i, r, u) {
                t ? u.push(n, "(", r, ",", i, ")") : u.push(n, "(", i, ",", r, ")")
            }
        }, f = {"=": i("eq"), "<>": i("ne"), ">": i("gt"), ">=": i("ge"), "<": i("lt"), "<=": i("le"), startswith: r("startswith"), endswith: r("endswith")}, h = n.extend({}, f, {contains: r("substringof", !0), notcontains: r("not substringof", !0)}), c = n.extend({}, f, {contains: r("contains"), notcontains: r("not contains")}), l = function(n, i, r) {
            n = e.utils.normalizeBinaryCriterion(n);
            var f = n[1], l = r === 4 ? c : h, o = l[f.toLowerCase()];
            if (!o)
                throw t.Error("E4003", f);
            o(u(n[0]), s(n[2], r), i)
        }, a = function(t, i, r) {
            var u = !1;
            n.each(t, function() {
                n.isArray(this) ? (u && i.push(" and "), i.push("("), o(this, i, r), i.push(")"), u = !0) : (i.push(/and|&/i.test(this) ? " and " : " or "), u = !1)
            })
        }, o = function(t, i, r) {
            n.isArray(t[0]) ? a(t, i, r) : l(t, i, r)
        };
        return function(n, t) {
            var i = [];
            return o(n, i, t), i.join("")
        }
    }(), lt = function(t) {
        var c = [], r = [], f, o, s, e, l = function() {
            return o || s !== i
        }, a = function() {
            var r = {};
            return t.expand && n.each(n.makeArray(t.expand), function() {
                r[u(this)] = 1
            }), f && n.each(f, function() {
                var n = this.split(".");
                n.length < 2 || (n.pop(), r[u(n.join("."))] = 1)
            }), n.map(r, function(n, t) {
                return t
            }).join() || i
        }, v = function() {
            var n = {};
            return e || (c.length && (n.$orderby = c.join(",")), o && (n.$skip = o), s !== i && (n.$top = s), f && (n.$select = u(f.join())), n.$expand = a()), r.length && (n.$filter = ct(r.length < 2 ? r[0] : r, t.version)), e && (n.$top = 0), (t.requireTotalCount || e) && (t.version !== 4 ? n.$inlinecount = "allpages" : n.$count = "true"), n
        };
        return{exec: function(i) {
                return h({url: i, params: n.extend(v(), t && t.params)}, {beforeSend: t.beforeSend, jsonp: t.jsonp, withCredentials: t.withCredentials, countOnly: e})
            }, multiSort: function(n) {
                var i, t, r, e, f;
                if (l())
                    return!1;
                for (t = 0; t < n.length; t++) {
                    if (r = n[t][0], e = !!n[t][1], typeof r != "string")
                        return!1;
                    f = u(r), e && (f += " desc"), i = i || [], i.push(f)
                }
                c = i
            }, slice: function(n, t) {
                if (l())
                    return!1;
                o = n, s = t
            }, filter: function(t) {
                if (l() || n.isFunction(t))
                    return!1;
                n.isArray(t) || (t = n.makeArray(arguments)), r.length && r.push("and"), r.push(t)
            }, select: function(t) {
                if (f || n.isFunction(t))
                    return!1;
                n.isArray(t) || (t = n.makeArray(arguments)), f = t
            }, count: function() {
                e = !0
            }}
    };
    n.extend(!0, e, {EdmLiteral: r, utils: {odata: {sendRequest: h, serializePropName: u, serializeValue: s, serializeKey: st, keyConverters: ht}}, queryAdapters: {odata: lt}})
}(jQuery, DevExpress), function(n, t) {
    function f(t, i) {
        return t = t.groupBy(i[0].selector), i.length > 1 && (t = t.select(function(t) {
            return n.extend({}, t, {items: f(r.query(t.items), i.slice(1)).toArray()})
        })), t
    }
    function o(t, i) {
        var r = [];
        return n.each(t, function(t, u) {
            var f = n.grep(i, function(n) {
                return u.selector == n.selector
            });
            f.length < 1 && r.push(u)
        }), r.concat(i)
    }
    var s = t.Class, u = t.abstract, r = t.data, e = r.utils.normalizeSortingInfo, h = ["loading", "loaded", "modifying", "modified", "inserting", "inserted", "updating", "updated", "removing", "removed"];
    r.utils.multiLevelGroup = f, r.utils.arrangeSortingInfo = o, r.Store = s.inherit({ctor: function(i) {
            var r = this;
            i = i || {}, n.each(h, function() {
                var u = this, f = r[u] = n.Callbacks(), o = f.add, e;
                if (f.add = function() {
                    return t.log("W0003", "Store", u, "14.2", "Use the '" + u + "' event instead"), o.apply(u, arguments)
                }, u in i && f.add(i[u]), e = "on" + u.charAt(0).toUpperCase() + u.slice(1), e in i)
                    r.on(u, i[e])
            }), this._key = i.key, this._errorHandler = i.errorHandler, this._useDefaultSearch = !0
        }, _customLoadOptions: function() {
            return null
        }, key: function() {
            return this._key
        }, keyOf: function(n) {
            return this._keyGetter || (this._keyGetter = r.utils.compileGetter(this.key())), this._keyGetter(n)
        }, _requireKey: function() {
            if (!this.key())
                throw t.Error("E4005");
        }, load: function(n) {
            var t = this;
            return n = n || {}, this.fireEvent("loading", [n]), this.loading.fire(n), this._loadImpl(n).done(function(i, r) {
                t.fireEvent("loaded", [i, n]), t.loaded.fire(i, r)
            })
        }, _loadImpl: function(t) {
            var s = t.filter, u = t.sort, h = t.select, r = t.group, c = t.skip, l = t.take, i = this.createQuery(t);
            return s && (i = i.filter(s)), r && (r = e(r)), (u || r) && (u = e(u || []), r && (u = o(r, u)), n.each(u, function(n) {
                i = i[n ? "thenBy" : "sortBy"](this.selector, this.desc)
            })), h && (i = i.select(h)), r && (i = f(i, r)), (l || c) && (i = i.slice(c || 0, l)), i.enumerate()
        }, createQuery: u, totalCount: function(n) {
            return this._addFailHandlers(this._totalCountImpl(n))
        }, _totalCountImpl: function(n) {
            n = n || {};
            var t = this.createQuery(), i = n.group, r = n.filter;
            return r && (t = t.filter(r)), i && (i = e(i), t = f(t, i)), t.count()
        }, byKey: function(n, t) {
            return this._addFailHandlers(this._byKeyImpl(n, t))
        }, _byKeyImpl: u, insert: function(n) {
            var t = this;
            return t.fireEvent("modifying"), t.fireEvent("inserting", [n]), t.modifying.fire(), t.inserting.fire(n), t._addFailHandlers(t._insertImpl(n).done(function(n, i) {
                t.fireEvent("inserted", [n, i]), t.fireEvent("modified"), t.inserted.fire(n, i), t.modified.fire()
            }))
        }, _insertImpl: u, update: function(n, t) {
            var i = this;
            return i.fireEvent("modifying"), i.fireEvent("updating", [n, t]), i.modifying.fire(), i.updating.fire(n, t), i._addFailHandlers(i._updateImpl(n, t).done(function(n, t) {
                i.fireEvent("updated", [n, t]), i.fireEvent("modified"), i.updated.fire(n, t), i.modified.fire()
            }))
        }, _updateImpl: u, remove: function(n) {
            var t = this;
            return t.fireEvent("modifying"), t.fireEvent("removing", [n]), t.modifying.fire(), t.removing.fire(n), t._addFailHandlers(t._removeImpl(n).done(function(n) {
                t.fireEvent("removed", [n]), t.fireEvent("modified"), t.removed.fire(n), t.modified.fire()
            }))
        }, _removeImpl: u, _addFailHandlers: function(n) {
            return n.fail(this._errorHandler, r._errorHandler)
        }}).include(t.EventsMixin)
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.data, e = r.Guid, u = function() {
        var i = n.Deferred();
        return i.resolve.apply(i, arguments).promise()
    }, f = function() {
        var i = n.Deferred();
        return i.reject.apply(i, arguments).promise()
    };
    r.ArrayStore = r.Store.inherit({ctor: function(i) {
            i = n.isArray(i) ? {data: i} : i || {}, this.callBase(i);
            var r = i.data;
            if (r && !n.isArray(r))
                throw t.Error("E4006");
            this._array = r || []
        }, createQuery: function() {
            return r.query(this._array, {errorHandler: this._errorHandler})
        }, _byKeyImpl: function(n) {
            var t = this._indexByKey(n);
            return t === -1 ? f() : u(this._array[t])
        }, _insertImpl: function(r) {
            var h = this.key(), o, s;
            if (s = n.isPlainObject(r) ? n.extend({}, r) : r, h) {
                if (o = this.keyOf(s), o === i || typeof o == "object" && n.isEmptyObject(o)) {
                    if (n.isArray(h))
                        throw t.Error("E4007");
                    o = s[h] = String(new e)
                } else if (this._array[this._indexByKey(o)] !== i)
                    return f(t.Error("E4008"))
            } else
                o = s;
            return this._array.push(s), u(r, o)
        }, _updateImpl: function(n, i) {
            var r, e;
            if (this.key()) {
                if (e = this._indexByKey(n), e < 0)
                    return f(t.Error("E4009"));
                r = this._array[e]
            } else
                r = n;
            return t.utils.deepExtendArraySafe(r, i), u(n, i)
        }, _removeImpl: function(n) {
            var t = this._indexByKey(n);
            return t > -1 && this._array.splice(t, 1), u(n)
        }, _indexByKey: function(n) {
            for (var t = 0, i = this._array.length; t < i; t++)
                if (r.utils.keysEqual(this.key(), this.keyOf(this._array[t]), n))
                    return t;
            return-1
        }, clear: function() {
            this._array = []
        }})
}(jQuery, DevExpress), function(n, t) {
    var f = t.Class, r = t.abstract, u = t.data, e = f.inherit({ctor: function(t, i) {
            var u, f, r;
            if (this._store = t, this._dirty = !1, u = this._immediate = i.immediate, f = Math.max(100, i.flushInterval || 1e4), !u) {
                r = n.proxy(this.save, this), setInterval(r, f);
                n(window).on("beforeunload", r);
                window.cordova && document.addEventListener("pause", r, !1)
            }
        }, notifyChanged: function() {
            this._dirty = !0, this._immediate && this.save()
        }, load: function() {
            this._store._array = this._loadImpl(), this._dirty = !1
        }, save: function() {
            this._dirty && (this._saveImpl(this._store._array), this._dirty = !1)
        }, _loadImpl: r, _saveImpl: r}), o = e.inherit({ctor: function(n, i) {
            this.callBase(n, i);
            var r = i.name;
            if (!r)
                throw t.Error("E4013");
            this._key = "dx-data-localStore-" + r
        }, _loadImpl: function() {
            var n = localStorage.getItem(this._key);
            return n ? JSON.parse(n) : []
        }, _saveImpl: function(n) {
            n.length ? localStorage.setItem(this._key, JSON.stringify(n)) : localStorage.removeItem(this._key)
        }}), s = {dom: o};
    u.LocalStore = u.ArrayStore.inherit({ctor: function(n) {
            n = typeof n == "string" ? {name: n} : n || {}, this.callBase(n), this._backend = new s[n.backend || "dom"](this, n), this._backend.load()
        }, clear: function() {
            this.callBase(), this._backend.notifyChanged()
        }, _insertImpl: function(t) {
            var i = this._backend;
            return this.callBase(t).done(n.proxy(i.notifyChanged, i))
        }, _updateImpl: function(t, i) {
            var r = this._backend;
            return this.callBase(t, i).done(n.proxy(r.notifyChanged, r))
        }, _removeImpl: function(t) {
            var i = this._backend;
            return this.callBase(t).done(n.proxy(i.notifyChanged, i))
        }})
}(jQuery, DevExpress), function(n, t) {
    var h = t.Class, r = t.data, c = t.utils, u = r.utils.odata, f = function(t, i) {
        if (!t)
            return t;
        var r = {};
        return n.each(t, function(n, t) {
            r[n] = u.serializeValue(t, i)
        }), r
    }, e = function(n, i) {
        var r = u.keyConverters[n];
        if (!r)
            throw t.Error("E4014", n);
        return r(i)
    }, o = {_extractServiceOptions: function(n) {
            n = n || {}, this._url = String(n.url).replace(/\/+$/, ""), this._beforeSend = n.beforeSend, this._jsonp = n.jsonp, this._version = n.version, this._withCredentials = n.withCredentials
        }, _sendRequest: function(n, t, i, r) {
            return u.sendRequest({url: n, method: t, params: i || {}, payload: r}, {beforeSend: this._beforeSend, jsonp: this._jsonp, withCredentials: this._withCredentials})
        }, version: function() {
            return this._version
        }}, s = r.Store.inherit({ctor: function(n) {
            this.callBase(n), this._extractServiceOptions(n), this._keyType = n.keyType
        }, _customLoadOptions: function() {
            return["expand", "customQueryParams"]
        }, _byKeyImpl: function(t, i) {
            var r = {};
            return i && i.expand && (r.$expand = n.map(n.makeArray(i.expand), u.serializePropName).join()), this._sendRequest(this._byKeyUrl(t), "GET", r)
        }, createQuery: function(n) {
            return n = n || {}, r.query(this._url, {beforeSend: this._beforeSend, errorHandler: this._errorHandler, jsonp: this._jsonp, version: this._version, withCredentials: this._withCredentials, params: f(n.customQueryParams, this._version), expand: n.expand, requireTotalCount: n.requireTotalCount})
        }, _insertImpl: function(t) {
            this._requireKey();
            var r = this, i = n.Deferred();
            return n.when(this._sendRequest(this._url, "POST", null, t)).done(function(n) {
                i.resolve(t, r.keyOf(n))
            }).fail(i.reject, i), i.promise()
        }, _updateImpl: function(t, i) {
            var r = n.Deferred();
            return n.when(this._sendRequest(this._byKeyUrl(t), "MERGE", null, i)).done(function() {
                r.resolve(t, i)
            }).fail(r.reject, r), r.promise()
        }, _removeImpl: function(t) {
            var i = n.Deferred();
            return n.when(this._sendRequest(this._byKeyUrl(t), "DELETE")).done(function() {
                i.resolve(t)
            }).fail(i.reject, i), i.promise()
        }, _byKeyUrl: function(t) {
            var i = t, r = this._keyType;
            return n.isPlainObject(r) ? (i = {}, n.each(r, function(n, r) {
                i[n] = e(r, t[n])
            })) : r && (i = e(r, t)), this._url + "(" + encodeURIComponent(u.serializeKey(i, this._version)) + ")"
        }}).include(o), l = h.inherit({ctor: function(t) {
            var i = this;
            i._extractServiceOptions(t), i._errorHandler = t.errorHandler, n.each(t.entities || [], function(r, u) {
                i[r] = new s(n.extend({}, t, {url: i._url + "/" + encodeURIComponent(u.name || r)}, u))
            })
        }, get: function(n, t) {
            return this.invoke(n, t, "GET")
        }, invoke: function(t, i, u) {
            u = u || "POST";
            var e = n.Deferred();
            return n.when(this._sendRequest(this._url + "/" + encodeURIComponent(t), u, f(i, this._version))).done(function(n) {
                n && t in n && (n = n[t]), e.resolve(n)
            }).fail([this._errorHandler, r._errorHandler, e.reject]), e.promise()
        }, objectLink: function(n, i) {
            var r = this[n];
            if (!r)
                throw t.Error("E4015", n);
            return c.isDefined(i) ? {__metadata: {uri: r._byKeyUrl(i)}} : null
        }}).include(o);
    n.extend(r, {ODataStore: s, ODataContext: l})
}(jQuery, DevExpress), function(n, t, i) {
    function u(t) {
        return t && n.isFunction(t.then)
    }
    function r(t) {
        return n.Deferred().resolve(t).promise()
    }
    function f(i, r) {
        if (!n.isFunction(r))
            throw t.Error("E4011", i);
    }
    function y(n) {
        throw t.Error("E4012", n);
    }
    function e(n) {
        function t(n) {
            var t = n[0], i = n[1];
            return!t || !t.getResponseHeader ? null : o.utils.errorMessageFromXhr(t, i)
        }
        return function(i) {
            var r;
            r = i instanceof Error ? i : new Error(t(arguments) || i && String(i) || "Unknown error"), n.reject(r)
        }
    }
    var o = t.data, s = "totalCount", h = "load", c = "byKey", l = "insert", a = "update", v = "remove";
    o.CustomStore = o.Store.inherit({ctor: function(n) {
            n = n || {}, this.callBase(n), this._useDefaultSearch = !1, this._loadFunc = n[h], this._totalCountFunc = n[s], this._byKeyFunc = n[c] || n.lookup, this._insertFunc = n[l], this._updateFunc = n[a], this._removeFunc = n[v]
        }, createQuery: function() {
            throw t.Error("E4010");
        }, _totalCountImpl: function(t) {
            var h = this._totalCountFunc, i, o = n.Deferred();
            return f(s, h), i = h(t), u(i) || (i = Number(i), isFinite(i) || y(s), i = r(i)), i.then(function(n) {
                o.resolve(Number(n))
            }, e(o)), o.promise()
        }, _loadImpl: function(t) {
            var c = this._loadFunc, o, s = n.Deferred();
            return f(h, c), o = c(t), n.isArray(o) ? o = r(o) : o === null || o === i ? o = r([]) : u(o) || y(h), o.then(function(n, t) {
                s.resolve(n, t)
            }, e(s)), this._addFailHandlers(s.promise())
        }, _byKeyImpl: function(t) {
            var s = this._byKeyFunc, i, o = n.Deferred();
            return f(c, s), i = s(t), u(i) || (i = r(i)), i.then(function(n) {
                o.resolve(n)
            }, e(o)), o.promise()
        }, _insertImpl: function(t) {
            var s = this._insertFunc, i, o = n.Deferred();
            return f(l, s), i = s(t), u(i) || (i = r(i)), i.then(function(n) {
                o.resolve(t, n)
            }, e(o)), o.promise()
        }, _updateImpl: function(t, i) {
            var h = this._updateFunc, o, s = n.Deferred();
            return f(a, h), o = h(t, i), u(o) || (o = r()), o.then(function() {
                s.resolve(t, i)
            }, e(s)), s.promise()
        }, _removeImpl: function(t) {
            var s = this._removeFunc, i, o = n.Deferred();
            return f(v, s), i = s(t), u(i) || (i = r()), i.then(function() {
                o.resolve(t)
            }, e(o)), o.promise()
        }})
}(jQuery, DevExpress), function(n, t, i) {
    function h(t) {
        function f() {
            var i = {};
            return n.each(["key", "load", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
                i[this] = t[this], delete t[this]
            }), new o(i)
        }
        function e(n) {
            var t = r[s[n.type]];
            return delete n.type, new t(n)
        }
        function h(t) {
            return new o({load: function() {
                    return n.getJSON(t)
                }})
        }
        var u;
        return typeof t == "string" && (t = h(t)), t === i && (t = []), t = n.isArray(t) || t instanceof r.Store ? {store: t} : n.extend({}, t), t.store === i && (t.store = []), u = t.store, "load"in t ? u = f() : n.isArray(u) ? u = new r.ArrayStore(u) : n.isPlainObject(u) && (u = e(n.extend({}, u))), t.store = u, t
    }
    function c(t) {
        switch (t.length) {
            case 0:
                return i;
            case 1:
                return t[0]
        }
        return n.makeArray(t)
    }
    function e(n) {
        return function() {
            var t = c(arguments);
            return t !== i && (this._storeLoadOptions[n] = t), this._storeLoadOptions[n]
        }
    }
    function v(t, i, u) {
        function f(t, r) {
            return r ? e(t, r) : n.map(t, i)
        }
        function e(t, i) {
            return n.map(t, function(n) {
                return{key: n.key, items: f(n.items, i - 1)}
            })
        }
        return f(t, u ? r.utils.normalizeSortingInfo(u).length : 0)
    }
    var r = t.data, o = r.CustomStore, l = t.Class, s = {jaydata: "JayDataStore", breeze: "BreezeStore", odata: "ODataStore", local: "LocalStore", array: "ArrayStore"}, a = function() {
        var n = -1;
        return function() {
            return++n
        }
    }(), f = function() {
        var n = {};
        return{add: function(t) {
                n[t] = !0
            }, has: function(t) {
                return t in n
            }, remove: function(t) {
                delete n[t]
            }}
    }(), u = function(n, t) {
        return f.has(n) ? (f.remove(n), t.reject("canceled"), !1) : !0
    }, y = l.inherit({ctor: function(r) {
            r = h(r), this._store = r.store, this._storeLoadOptions = this._extractLoadOptions(r), this._mapFunc = r.map, this._postProcessFunc = r.postProcess, this._pageIndex = r.pageIndex !== i ? r.pageIndex : 0, this._pageSize = r.pageSize !== i ? r.pageSize : 20, this._items = [], this._totalCount = -1, this._isLoaded = !1, this._loadingCount = 0, this._preferSync = r._preferSync, this._loadQueue = this._createLoadQueue(), this._searchValue = "searchValue"in r ? r.searchValue : null, this._searchOperation = r.searchOperation || "contains", this._searchExpr = r.searchExpr, this._paginate = r.paginate, this._paginate === i && (this._paginate = !this.group()), this._isLastPage = !this._paginate, this._userData = {}, n.each(["changed", "loadError", "loadingChanged"], n.proxy(function(i, r) {
                var u = this[r] = n.Callbacks(), f = u.add;
                u.add = function() {
                    return t.log("W0003", "DataSource", r, "14.2", "Use the '" + r + "' event instead"), f.apply(r, arguments)
                }
            }, this)), n.each(["changed", "loadError", "loadingChanged", "customizeLoadResult", "customizeStoreLoadOptions"], n.proxy(function(n, t) {
                var i = "on" + t[0].toUpperCase() + t.slice(1);
                if (r.hasOwnProperty(i))
                    this.on(t, r[i])
            }, this))
        }, dispose: function() {
            this.changed.empty(), this.loadError.empty(), this.loadingChanged.empty(), this._disposeEvents(), delete this._store, this._disposed = !0
        }, _extractLoadOptions: function(t) {
            var r = {}, i = ["sort", "filter", "select", "group", "requireTotalCount"], u = this._store._customLoadOptions();
            return u && (i = i.concat(u)), n.each(i, function() {
                r[this] = t[this]
            }), r
        }, loadOptions: function() {
            return this._storeLoadOptions
        }, items: function() {
            return this._items
        }, pageIndex: function(n) {
            return n !== i && (this._pageIndex = n, this._isLastPage = !this._paginate), this._pageIndex
        }, paginate: function(n) {
            if (arguments.length < 1)
                return this._paginate;
            n = !!n, this._paginate !== n && (this._paginate = n, this.pageIndex(0))
        }, pageSize: function(n) {
            if (arguments.length < 1)
                return this._pageSize;
            this._pageSize = n
        }, isLastPage: function() {
            return this._isLastPage
        }, sort: e("sort"), filter: function() {
            var n = c(arguments);
            return n !== i && (this._storeLoadOptions.filter = n, this.pageIndex(0)), this._storeLoadOptions.filter
        }, group: e("group"), select: e("select"), searchValue: function(n) {
            return n !== i && (this.pageIndex(0), this._searchValue = n), this._searchValue
        }, searchOperation: function(n) {
            return n !== i && (this.pageIndex(0), this._searchOperation = n), this._searchOperation
        }, searchExpr: function(t) {
            var i = arguments.length;
            return i && (i > 1 && (t = n.makeArray(arguments)), this.pageIndex(0), this._searchExpr = t), this._searchExpr
        }, store: function() {
            return this._store
        }, key: function() {
            return this._store && this._store.key()
        }, totalCount: function() {
            return this._totalCount
        }, isLoaded: function() {
            return this._isLoaded
        }, isLoading: function() {
            return this._loadingCount > 0
        }, _createLoadQueue: function() {
            return t.createQueue()
        }, _changeLoadingCount: function(n) {
            var i = this.isLoading(), t;
            this._loadingCount += n, t = this.isLoading(), i ^ t && (this.fireEvent("loadingChanged", [t]), this.loadingChanged.fire(t))
        }, _scheduleLoadCallbacks: function(n) {
            var t = this;
            t._changeLoadingCount(1), n.always(function() {
                t._changeLoadingCount(-1)
            })
        }, _scheduleChangedCallbacks: function(n) {
            var t = this;
            n.done(function() {
                t.fireEvent("changed"), t.changed.fire()
            })
        }, loadSingle: function(t, i) {
            function h(t) {
                t === null || typeof t == "undefined" || n.isArray(t) && t.length < 1 ? f.reject() : f.resolve(e._transformLoadedData(t)[0])
            }
            var e = this, f = n.Deferred().fail(function() {
                e.fireEvent("loadError", arguments), e.loadError.fire.apply(e, arguments)
            }), s = this.key(), o = this._store, u = this._createStoreLoadOptions();
            return arguments.length < 2 && (i = t, t = s), delete u.skip, delete u.group, delete u.refresh, delete u.pageIndex, delete u.searchString, t === s || o instanceof r.CustomStore ? o.byKey(i, u).done(h).fail(f.reject) : (u.take = 1, u._preferSync = !0, u.filter = u.filter ? [u.filter, [t, i]] : [t, i], o.load(u).done(h).fail(f.reject)), f.promise()
        }, load: function() {
            function o() {
                arguments[0] !== "canceled" && (f.fireEvent("loadError", arguments), f.loadError.fire.apply(f.loadError, arguments))
            }
            function e() {
                return f._disposed ? i : f._loadFromStore(r, t)
            }
            var f = this, t = n.Deferred().fail(o), r;
            return(this._scheduleLoadCallbacks(t), this._scheduleChangedCallbacks(t), r = this._createLoadOptions(), this.fireEvent("customizeStoreLoadOptions", [r]), !u(r.operationId, t)) ? t.promise() : (this._loadQueue.add(function() {
                return typeof r.delay == "number" ? setTimeout(e, r.delay) : e(), t.promise()
            }, function() {
                f._changeLoadingCount(-1)
            }), t.promise({loadOperationId: r.operationId}))
        }, reload: function() {
            var n, t = this._userData;
            for (n in t)
                t.hasOwnProperty(n) && delete t[n];
            return this._totalCount = -1, this._isLoaded = !1, this.load()
        }, cancel: function(n) {
            f.add(n)
        }, _addSearchOptions: function(n) {
            this._disposed || (this.store()._useDefaultSearch ? this._addSearchFilter(n) : (n.searchValue = this._searchValue, n.searchExpr = this._searchExpr))
        }, _createStoreLoadOptions: function() {
            var t = n.extend({}, this._storeLoadOptions);
            return this._addSearchOptions(t), this._paginate && this._pageSize && (t.skip = this._pageIndex * this._pageSize, t.take = this._pageSize), t.userData = this._userData, t
        }, _createLoadOptions: function() {
            return{operationId: a(), storeLoadOptions: this._createStoreLoadOptions()}
        }, _addSearchFilter: function(t) {
            var u = this._searchValue, f = this._searchOperation, i = this._searchExpr, r = [];
            u && (i || (i = "this"), n.isArray(i) || (i = [i]), n.each(i, function(n, t) {
                r.length && r.push("or"), r.push([t, f, u])
            }), t.filter = t.filter ? [r, t.filter] : r)
        }, _loadFromStore: function(i, r) {
            function e(e, o) {
                function s() {
                    var t;
                    t = n.extend({data: e, extra: o}, i), f.fireEvent("customizeLoadResult", [t]), u(i.operationId, r) && f._processStoreLoadResult(t, r)
                }
                f._preferSync ? s() : t.utils.executeAsync(s)
            }
            var f = this;
            return u(i.operationId, r) ? this.store().load(i.storeLoadOptions).done(e).fail(r.reject) : r.promise()
        }, _processStoreLoadResult: function(t, i) {
            function s() {
                return u(t.operationId, i) ? (r._isLoaded = !0, r._totalCount = isFinite(f.totalCount) ? f.totalCount : -1, i.resolve(e, f)) : i
            }
            function h() {
                r.store().totalCount(o).done(function(n) {
                    f.totalCount = n, s()
                }).fail(function() {
                })
            }
            var r = this, e = t.data, f = t.extra, o = t.storeLoadOptions;
            r._disposed || (e = r._transformLoadedData(e), n.isPlainObject(f) || (f = {}), r._items = e, (!e.length || !r._paginate || r._pageSize && e.length < r._pageSize) && (r._isLastPage = !0), o.requireTotalCount && !isFinite(f.totalCount) ? h() : s())
        }, _transformLoadedData: function(t) {
            var i = n.makeArray(t);
            return this._mapFunc && (i = v(i, this._mapFunc, this.group())), this._postProcessFunc && (i = this._postProcessFunc(i)), i
        }}).include(t.EventsMixin);
    n.extend(!0, r, {DataSource: y, utils: {storeTypeRegistry: s, normalizeDataSourceOptions: h}})
}(jQuery, DevExpress), function(n, t) {
    if (t.support.hasKo) {
        var r = window.ko;
        (function(n) {
            if (n = n.split("."), n[0] < 2 || n[0] == 2 && n[1] < 3)
                throw t.Error("E0013");
        })(r.version)
    }
}(jQuery, DevExpress), function(n, t) {
    t.support.hasNg && (t.ng = {module: window.angular.module("dx", ["ngSanitize"])})
}(jQuery, DevExpress), function(n, t, i) {
    var o = t.ui, u = t.utils, r = t.data.utils, f = t.inflector, e = t.Class.inherit({NAME: "Component", _setDeprecatedOptions: function() {
            this._deprecatedOptions = {}
        }, _getDeprecatedOptions: function() {
            return this._deprecatedOptions
        }, _setOptionAliases: function() {
            var t = this._optionAliases = {};
            n.each(this._getDeprecatedOptions(), function(n, i) {
                var r = i.alias;
                r && (t[n] = r)
            })
        }, _getOptionAliases: function() {
            return this._optionAliases
        }, _getOptionAliasesByName: function(t) {
            return n.map(this._getOptionAliases(), function(n, r) {
                return t === n ? r : i
            })
        }, _setDefaultOptions: function() {
            this.option({onOptionChanged: null, onDisposing: null, defaultOptionsRules: null})
        }, _defaultOptionsRules: function() {
            return[]
        }, _setOptionsByDevice: function(i) {
            var r = this._defaultOptionsRules(), f = t.devices.current(), e = {}, o;
            this._customRules && (r = r.concat(this._customRules)), n.isArray(i) && (r = r.concat(i)), o = function(t, i) {
                return i = n.makeArray(i), i.length === 1 && n.isEmptyObject(i[0]) || u.findBestMatches(t, i).length > 0
            }, n.each(r, function(t, i) {
                var r = i.device || {}, u;
                u = n.isFunction(r) ? r(f) : o(f, r), u && n.extend(e, i.options)
            }), this.option(e)
        }, _setOptionsByReference: function() {
            this._optionsByReference = {}
        }, _getOptionsByReference: function() {
            return this._optionsByReference
        }, ctor: function(i) {
            i = i || {}, this._options = {}, this._updateLockCount = 0, this.optionChanged = n.Callbacks(), this.disposing = n.Callbacks(), n.each(["optionChanged", "disposing"], n.proxy(function(n, i) {
                var r = this, u = this[i].add;
                this[i].add = function() {
                    return t.log("W0003", r.NAME, i, "14.2", "Use the '" + i + "' event instead"), u.apply(this, arguments)
                }
            }, this)), this.beginUpdate();
            try {
                this._suppressDeprecatedWarnings(), this._setOptionsByReference(), this._setDeprecatedOptions(), this._setOptionAliases(), this._setDefaultOptions(), this._setOptionsByDevice(i.defaultOptionsRules), this._resumeDeprecatedWarnings(), this._initialOptions = n.extend({}, this.option()), this._initOptions(i)
            } finally {
                this.endUpdate()
            }
        }, _initOptions: function(n) {
            this.option(n)
        }, _optionValuesEqual: function(n, t, i) {
            return(t = r.toComparable(t, !0), i = r.toComparable(i, !0), t && i && t.jquery && i.jquery) ? i.is(t) : t === null || typeof t != "object" ? t === i : !1
        }, _init: function() {
            this._createOptionChangedAction(), this._createDisposingAction()
        }, _createOptionChangedAction: function() {
            this._optionChangedAction = this._createActionByOption("onOptionChanged")
        }, _createDisposingAction: function() {
            this._disposingAction = this._createActionByOption("onDisposing")
        }, _optionChanged: function(n) {
            switch (n.name) {
                case"onOptionChanged":
                    this._createOptionChangedAction();
                    break;
                case"onDisposing":
                    this._createDisposingAction()
                }
        }, _dispose: function() {
            this.optionChanged.empty(), this.disposing.fireWith(this).empty(), this._disposingAction(), this._disposeEvents()
        }, instance: function() {
            return this
        }, beginUpdate: function() {
            this._updateLockCount++
        }, endUpdate: function() {
            if (this._updateLockCount--, !this._updateLockCount && !this._initializing && !this._initialized) {
                this._initializing = !0;
                try {
                    this._init()
                } finally {
                    this._initializing = !1, this._initialized = !0
                }
            }
        }, _logWarningIfDeprecated: function() {
        }, _suppressDeprecatedWarnings: function() {
        }, _resumeDeprecatedWarnings: function() {
        }, _notifyOptionChanged: function(t, i, r) {
            var u = this;
            this._initialized && n.each(u._getOptionAliasesByName(t).concat([t]), function(t, f) {
                var e = {name: f.split(/[.\[]/)[0], fullName: f, value: i, previousValue: r};
                u.optionChanged.fireWith(u, [e.name, i, r]), u._optionChangedAction(n.extend({}, e)), u._optionChanged(e)
            })
        }, initialOption: function(n) {
            var t = this._initialOptions;
            return t[n]
        }, _defaultActionConfig: function() {
            return{context: this, component: this}
        }, _defaultActionArgs: function() {
            return{component: this}
        }, _createAction: function(i, r) {
            var u = this, f = new t.Action(i, n.extend(r, u._defaultActionConfig()));
            return function(t) {
                return arguments.length || (t = {}), n.isPlainObject(t) || (t = {actionValue: t}), f.execute.call(f, n.extend(t, u._defaultActionArgs()))
            }
        }, _createActionByOption: function(i, r) {
            var u, e;
            if (r = r || {}, typeof i != "string")
                throw t.Error("E0008");
            if (u = /^on(\w+)/.exec(i), u) {
                var o = f.camelize(u[1]), s = r.afterExecute || n.noop, h = this;
                r.afterExecute = function(n) {
                    return h.fireEvent(o, n.args), s.apply(this, arguments)
                }
            }
            return this._suppressDeprecatedWarnings(), e = this._createAction(this.option(i), r), this._resumeDeprecatedWarnings(), e
        }, option: function(t) {
            var i = this, u = t, s = arguments[1], f = this._getOptionAliases(), e = function(n) {
                return n && (i._logWarningIfDeprecated(n), f[n] && (n = f[n])), n
            }, o = function(n, t) {
                return r.compileGetter(n)(i._options, {functionsAsIs: !0, unwrapObservables: t})
            };
            if (arguments.length < 2 && n.type(u) !== "object")
                return u = e(u), o(u);
            typeof u == "string" && (t = {}, t[u] = s), i.beginUpdate();
            try {
                n.each(t, function(n, t) {
                    n = e(n);
                    var u = o(n, !1);
                    i._optionValuesEqual(n, u, t) || (r.compileSetter(n)(i._options, t, {functionsAsIs: !0, merge: !i._getOptionsByReference()[n], unwrapObservables: !1}), i._notifyOptionChanged(n, t, u))
                })
            } finally {
                i.endUpdate()
            }
        }}).include(t.EventsMixin);
    n.extend(t, {Component: e})
}(jQuery, DevExpress), function(n, t, i) {
    var f = t.utils.windowResizeCallbacks, o = "dx-rtl", r = "dxComponents", s = "dx-visibility-change-handler", u = "dxVisibilityChange", h = t.Component.inherit({NAME: "DOMComponent", _setDefaultOptions: function() {
            this.callBase(), this.option({rtlEnabled: t.rtlEnabled})
        }, ctor: function(t, i) {
            this._$element = n(t), this.element().data(this.NAME, this), this._attachInstanceToElement(this._$element), this.callBase(i)
        }, _attachInstanceToElement: n.noop, _visibilityChanged: t.abstract, _dimensionChanged: t.abstract, _init: function() {
            this.callBase(), this._attachWindowResizeCallback()
        }, _attachWindowResizeCallback: function() {
            if (this._isDimensionChangeSupported()) {
                var t = this._windowResizeCallBack = n.proxy(this._dimensionChanged, this);
                f.add(t)
            }
        }, _isDimensionChangeSupported: function() {
            return this._dimensionChanged !== t.abstract
        }, _render: function() {
            this._toggleRTLDirection(this.option("rtlEnabled")), this._renderVisibilityChange()
        }, _renderVisibilityChange: function() {
            this._isVisibilityChangeSupported() && (this.element().addClass(s), this._attachVisiblityChangeHandlers())
        }, _attachVisiblityChangeHandlers: function() {
            var n = this;
            n.element().off("." + u).on("dxhiding." + u, function() {
                n._visibilityChanged(!1)
            }).on("dxshown." + u, function() {
                n._visibilityChanged(!0)
            })
        }, _isVisibilityChangeSupported: function() {
            return this._visibilityChanged !== t.abstract
        }, _clean: n.noop, _modelByElement: n.noop, _invalidate: function() {
            this._requireRefresh = !0
        }, _refresh: function() {
            this._clean(), this._render()
        }, _dispose: function() {
            this.callBase(), this._clean(), this._detachWindowResizeCallback()
        }, _detachWindowResizeCallback: function() {
            this._isDimensionChangeSupported() && f.remove(this._windowResizeCallBack)
        }, _toggleRTLDirection: function(n) {
            this.element().toggleClass(o, n)
        }, _defaultActionConfig: function() {
            return n.extend(this.callBase(), {context: this._modelByElement(this.element())})
        }, _defaultActionArgs: function() {
            var t = this.element(), i = this._modelByElement(this.element());
            return n.extend(this.callBase(), {element: t, model: i})
        }, _optionChanged: function(n) {
            n.name === "rtlEnabled" ? this._invalidate() : this.callBase(n)
        }, endUpdate: function() {
            var n = !this._initializing && !this._initialized;
            this.callBase.apply(this, arguments), this._updateLockCount || (n ? this._render() : this._requireRefresh && (this._requireRefresh = !1, this._refresh()))
        }, element: function() {
            return this._$element
        }}), e = function(u, f, e) {
        e || (e = f, f = t), e.redefine({_attachInstanceToElement: function(n) {
                n.data(u, this), n.data(r) || n.data(r, []), n.data(r).push(u)
            }}), f[u] = e, e.prototype.NAME = u, e.defaultOptions = function(n) {
            e.prototype._customRules = e.prototype._customRules || [], e.prototype._customRules.push(n)
        }, n.fn[u] = function(r) {
            var h = typeof r == "string", f, o, s;
            return h ? (o = r, s = n.makeArray(arguments).slice(1), this.each(function() {
                var r = n(this).data(u), e, h;
                if (!r)
                    throw t.Error("E0009", u);
                e = r[o], h = e.apply(r, s), f === i && (f = h)
            })) : (this.each(function() {
                var t = n(this).data(u);
                t ? t.option(r) : new e(this, r)
            }), f = this), f
        }
    }, c = function(t) {
        t = n(t);
        var i = t.data(r);
        return i ? n.map(i, function(n) {
            return t.data(n)
        }) : []
    }, l = function() {
        n.each(c(this), function() {
            this._dispose()
        })
    }, a = n.cleanData;
    n.cleanData = function(t) {
        return n.each(t, l), a.apply(this, arguments)
    }, e("DOMComponent", h), t.registerComponent = e
}(jQuery, DevExpress), function(n, t) {
    var r = t.ui = {};
    t.registerActionExecutor({designMode: {validate: function(n) {
                t.designMode && (n.cancel = !0)
            }}, disabled: {validate: function(n) {
                if (n.args.length) {
                    var t = n.args[0], r = t.jQueryEvent, t = n.args[0], i = t[n.validatingTargetName] || t.element;
                    i && i.is(".dx-state-disabled, .dx-state-disabled *") && (n.cancel = !0)
                }
            }}, readOnly: {validate: function(n) {
                if (n.args.length) {
                    var t = n.args[0], r = t.jQueryEvent, t = n.args[0], i = t[n.validatingTargetName] || t.element;
                    i && i.is(".dx-state-readonly, .dx-state-readonly *") && (n.cancel = !0)
                }
            }}}), n.extend(r, {initViewport: function() {
            t.utils.initMobileViewport()
        }})
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.ui, u = t.utils.triggerShownEvent, f = t.Class.inherit({ctor: function() {
            this.widgetTemplatesCache = {}
        }, createTemplate: t.abstract, getTemplates: function(n) {
            var t = this.widgetTemplatesCache, i = n.NAME;
            return t[i] || (t[i] = this._getWidgetTemplates(n.constructor)), t[i]
        }, _getWidgetTemplates: function(t) {
            return t.prototype.NAME ? t.prototype.NAME === t.parent.prototype.NAME ? this._getWidgetTemplates(t.parent) : n.extend(this._getWidgetTemplates(t.parent), this._templatesForWidget(t.prototype.NAME)) : {}
        }, _templatesForWidget: t.abstract}), e = t.Class.inherit({ctor: function(t, i) {
            this._element = n(t), this._element.is("script") || this._element.detach(), this._owner = i
        }, owner: function() {
            return this._owner
        }, render: function(n, t, r) {
            n instanceof jQuery && (t = n, n = i), t && (n = this._prepareDataForContainer(n, t));
            var f = this._renderCore(n, r, t);
            return this._shouldAppend && t && (t.append(f), typeof f != "string" && t.is(":visible") && u(f)), f
        }, _prepareDataForContainer: function(n) {
            return n
        }, _renderCore: t.abstract, _shouldAppend: !0, dispose: function() {
            this._owner = null
        }});
    n.extend(r, {TemplateProviderBase: f, TemplateBase: e})
}(jQuery, DevExpress), function(n, t, i) {
    var o = t.ui, k = t.utils.isString, s, l = {}, a = o.TemplateBase.inherit({ctor: function(n, t) {
            this.callBase(n, t), this._compiledTemplate = s.compile(n)
        }, _renderCore: function(n) {
            return s.render(this._compiledTemplate, n)
        }}), v = function(n) {
        if (k(n)) {
            if (s = l[n], !s)
                throw t.Error("E0020", n);
        } else
            s = n
    }, u = function(n, t) {
        l[n] = t
    }, e = function(t) {
        return t = n(t), t.length && t[0].nodeName.toLowerCase() === "script" || (t = n("<div>").append(t)), t.html()
    }, h, p, w, b, c;
    u("default", {compile: function(n) {
            return t.utils.normalizeTemplateElement(n)
        }, render: function(n) {
            return n.clone()
        }}), u("jquery-tmpl", {compile: function(i) {
            return n("<div>").append(t.utils.normalizeTemplateElement(i))
        }, render: function(n, t) {
            return n.tmpl(t)
        }}), u("jsrender", {compile: function(t) {
            return n.templates(e(t))
        }, render: function(n, t) {
            return n.render(t)
        }}), u("mustache", {compile: function(n) {
            return Mustache.compile(e(n))
        }, render: function(n, t) {
            return n(t)
        }}), u("hogan", {compile: function(n) {
            return Hogan.compile(e(n))
        }, render: function(n, t) {
            return n.render(t)
        }}), u("underscore", {compile: function(n) {
            return _.template(e(n))
        }, render: function(n, t) {
            return n(t)
        }}), u("handlebars", {compile: function(n) {
            return Handlebars.compile(e(n))
        }, render: function(n, t) {
            return n(t)
        }}), u("doT", {compile: function(n) {
            return doT.template(e(n))
        }, render: function(n, t) {
            return n(t)
        }}), v("default");
    var d = o.TemplateProviderBase.inherit({createTemplate: function(n, t) {
            return new a(n, t)
        }, _templatesForWidget: function(n) {
            return nt(n)
        }}), g = o.TemplateBase.inherit({ctor: function(t, i) {
            this.callBase(n("<div>"), i), this._render = t
        }, _renderCore: function(n, i, r) {
            return t.utils.stringToJquery(this._render(n, i, r))
        }}), nt = function() {
        var t = {};
        return function(i) {
            if (!t[i]) {
                var f = r[i] || {}, u = {};
                n.each(f, function(n, t) {
                    u[n] = new o.DefaultTemplate(t)
                }), t[i] = u
            }
            return t[i]
        }
    }(), r = {}, tt = "dx-item-content-placeholder";
    r.CollectionWidget = {item: function(t) {
            var i = n("<div>");
            return n.isPlainObject(t) ? (t.text && i.text(t.text), t.html && i.html(t.html)) : i.html(String(t)), i
        }, itemFrame: function(t) {
            var r = n("<div>"), u;
            return r.toggleClass("dx-state-invisible", t.visible !== i && !t.visible), r.toggleClass("dx-state-disabled", !!t.disabled), u = n("<div>").addClass(tt), r.append(u), r
        }};
    var it = "dx-list-item-badge-container", rt = "dx-list-item-badge", y = "dx-badge", ut = "dx-list-item-chevron-container", ft = "dx-list-item-chevron";
    r.dxList = {item: function(t) {
            var i = r.CollectionWidget.item(t), u;
            return t.key && (u = n("<div>").text(t.key), u.appendTo(i)), i
        }, itemFrame: function(t) {
            var i = r.CollectionWidget.itemFrame(t), f, u, e, o;
            return t.badge && (f = n("<div>").addClass(it), u = n("<div>").addClass(rt).addClass(y), u.text(t.badge), f.append(u).appendTo(i)), t.showChevron && (e = n("<div>").addClass(ut), o = n("<div>").addClass(ft), e.append(o).appendTo(i)), i
        }, group: function(t) {
            var i = n("<div>");
            return n.isPlainObject(t) ? t.key && i.text(t.key) : i.html(String(t)), i
        }}, r.dxDropDownMenu = {item: r.dxList.item}, r.dxDropDownList = {item: r.dxList.item}, r.dxRadioGroup = {item: r.CollectionWidget.item}, r.dxSlideOut = {menuItem: r.dxList.item, menuGroup: r.dxList.group}, h = function(t) {
        var i = n("<div>");
        return n.isPlainObject(t) ? t.title && i.text(t.title) : i.html(String(t)), i
    }, r.dxAccordion = {title: h, item: r.CollectionWidget.item}, r.dxActionSheet = {item: function(t) {
            return n("<div>").dxButton(n.extend({onClick: t.click}, t))
        }}, r.dxGallery = {item: function(t) {
            var i = n("<div>");
            return t.imageSrc ? n("<img>").attr("src", t.imageSrc).appendTo(i) : n("<img>").attr("src", String(t)).appendTo(i), i
        }};
    var f = "dx-icon", et = "dx-menu-item-text", ot = "dx-menu-item-popout", st = "dx-menu-item-popout-container";
    r.dxMenuBase = {item: function(t) {
            var i = n("<div>"), r, u, o, e;
            return t.icon ? r = n("<span>").addClass(f + "-" + t.icon).appendTo(i) : t.iconSrc && (r = n("<img>").attr("src", t.iconSrc).appendTo(i)), r && r.addClass(f), u = n("<span>").addClass(et), n.isPlainObject(t) ? t.text && u.text(t.text) : u.html(String(t)), i.append(u), t.items && t.items.length > 0 && (e = n("<span>").addClass(st).appendTo(i), o = n("<div>").addClass(ot).appendTo(e)), i
        }}, p = "dx-panorama-item-title", r.dxPanorama = {itemFrame: function(t) {
            var i = r.CollectionWidget.itemFrame(t), u;
            return t.title && (u = n("<div>").addClass(p).text(t.title), i.prepend(u)), i
        }}, r.dxPivotTabs = {item: function(t) {
            var i = n("<div>"), r = n("<span>").text(t.title);
            return i.html(r), i
        }}, w = "dx-tab-text", r.dxTabs = {item: function(t) {
            var i = r.CollectionWidget.item(t);
            if (t.html)
                return i;
            var s = t.text, e = t.icon, o = t.iconSrc, u;
            return s && i.wrapInner(n("<span>").addClass(w)), e ? u = n("<span>").addClass(f + "-" + e) : o && (u = n("<img>").attr("src", o)), u && u.addClass(f).prependTo(i), i
        }}, r.dxTabPanel = {item: r.CollectionWidget.item, title: h}, b = "dx-navbar-item-badge", r.dxNavBar = {itemFrame: function(t) {
            var u = r.CollectionWidget.itemFrame(t), i;
            return t.badge && (i = n("<div>").addClass(b).addClass(y), i.text(t.badge), i.appendTo(u)), u
        }}, r.dxToolbar = {item: function(i) {
            var u = r.CollectionWidget.item(i), f = i.widget;
            if (f) {
                var e = n("<div>").appendTo(u), o = t.inflector.camelize("dx-" + f), s = i.options || {};
                e[o](s)
            } else
                i.text && u.wrapInner("<div>");
            return u
        }, menuItem: r.dxList.item, actionSheetItem: r.dxActionSheet.item}, r.dxTreeView = {item: function(t) {
            var i = n("<div>");
            return t.icon && n("<span>").addClass(f + "-" + t.icon).addClass(f).appendTo(i), t.iconSrc && n("<img>").attr("src", t.iconSrc).addClass(f).appendTo(i), n("<span>").text(t.text).appendTo(i), i
        }}, c = function(t) {
        return n("<div>").dxToolbar({items: t})
    }, r.dxPopup = {title: c, bottom: c}, r.dxLookup = {title: r.dxPopup.title, group: r.dxList.group}, n.extend(o, {TemplateProvider: d, Template: a, DefaultTemplate: g, setTemplateEngine: v})
}(jQuery, DevExpress), function(n, t) {
    var o, s, u, h, c, l;
    if (t.support.hasKo) {
        var r = window.ko, e = t.ui, f = "dxKoLocks", a = "dxKoCreation", v = function() {
            var n = {}, t = function(t) {
                return n[t] || 0
            };
            return{obtain: function(i) {
                    n[i] = t(i) + 1
                }, release: function(i) {
                    var r = t(i);
                    r === 1 ? delete n[i] : n[i] = r - 1
                }, locked: function(n) {
                    return t(n) > 0
                }}
        }, y = function(t, i) {
            r.bindingHandlers[t] = {init: function(u, o) {
                    var s = n(u), h = {templateProvider: new e.KoTemplateProvider}, c = {}, y = function(n, i) {
                        var e = s.data(t), u = s.data(f), o = r.unwrap(i);
                        if (r.isWriteableObservable(i) && (c[n] = i), e) {
                            if (u.locked(n))
                                return;
                            u.obtain(n);
                            try {
                                e.option(n, o)
                            } finally {
                                u.release(n)
                            }
                        } else
                            h[n] = o
                    }, p = function(n) {
                        var t = n.fullName, u = n.value, r, i;
                        if (t in c && (r = this._$element, i = r.data(f), !i.locked(t))) {
                            i.obtain(t);
                            try {
                                c[t](u)
                            } finally {
                                i.release(t)
                            }
                        }
                    }, w = function() {
                        s.data(a, !0).data(f, new v)[t](h)[t]("on", "optionChanged", p), h = null
                    }, l = function(t, i) {
                        var f;
                        r.computed(function() {
                            y(t, i), f = r.unwrap(i)
                        }, null, {disposeWhenNodeIsRemoved: u}), n.isPlainObject(f) && n.each(f, function(n, i) {
                            l(t + "." + n, i)
                        })
                    };
                    return r.computed(function() {
                        var i = s.data(t);
                        i && i.beginUpdate(), n.each(r.unwrap(o()), function(n, t) {
                            l(n, t)
                        }), i ? i.endUpdate() : w()
                    }, null, {disposeWhenNodeIsRemoved: u}), {controlsDescendantBindings: i.subclassOf(e.Widget)}
                }}
        };
        t.DOMComponent.redefine({_modelByElement: function(n) {
                if (n.length)
                    return r.dataFor(n.get(0))
            }}), o = t.registerComponent, s = function(n, t, i) {
            i = i || t, o.apply(this, arguments), y(n, i)
        }, t.registerComponent = s, u = function(n, t) {
            var i = function() {
                r.cleanNode(this)
            };
            t ? n.each(i) : n.find("*").each(i)
        }, h = n.fn.empty, n.fn.empty = function() {
            return u(this, !1), h.apply(this, arguments)
        }, c = n.fn.remove, n.fn.remove = function(n, t) {
            if (!t) {
                var i = this;
                n && (i = i.filter(n)), u(i, !0)
            }
            return c.call(this, n, t)
        }, l = n.fn.html, n.fn.html = function(n) {
            return typeof n == "string" && u(this, !1), l.apply(this, arguments)
        }, r.bindingHandlers.dxAction = {update: function(i, u, f, e) {
                var h = n(i), o = r.utils.unwrapObservable(u()), c = o, s = {context: i}, l;
                o.execute && (c = o.execute, n.extend(s, o)), l = new t.Action(c, s);
                h.off(".dxActionBinding").on("dxclick.dxActionBinding", function(n) {
                    l.execute({element: h, model: e, evaluate: function(n) {
                            var u = e, f;
                            return n.length > 0 && n[0] === "$" && (u = r.contextFor(i)), f = t.data.utils.compileGetter(n), f(u)
                        }, jQueryEvent: n}), s.bubbling || n.stopPropagation()
                })
            }}
    }
}(jQuery, DevExpress), function(n, t, i) {
    if (t.support.hasNg) {
        var r = t.ui, u = t.data.utils.compileSetter, f = t.data.utils.compileGetter, h = "dxNgCreation", e = "dxTemplates", c = "dxNgCompiler", l = "dxDefaultCompilerGetter", a = "template", v = t.ng.module, y = t.Class.inherit({ctor: function(t) {
                this._$element = t.$element.data(h, !0), this._$templates = t.$templates, this._componentClass = t.componentClass, this._scope = t.scope, this._compile = t.compile, this._ngOptions = t.ngOptions, this._componentDisposing = n.Callbacks(), t.ngOptions.data && this._initDataScope(t.ngOptions.data)
            }, initDefaultCompilerGetter: function() {
                this._$element.data(l, n.proxy(function(n) {
                    return this._compilerByTemplate(n)
                }, this))
            }, initTemplateCompilers: function() {
                var t = this;
                this._$templates && this._$templates.each(function(i, r) {
                    n(r).data(c, t._compilerByTemplate(r))
                })
            }, initComponentWithBindings: function() {
                this._initComponent(this._scope), this._initComponentBindings()
            }, _initDataScope: function(t) {
                if (typeof t == "string") {
                    var r = t, i = this._scope;
                    t = i.$eval(t), this._scope = i.$new(), this._synchronizeDataScopes(i, this._scope, t, r)
                }
                n.extend(this._scope, t)
            }, _synchronizeDataScopes: function(t, i, r, u) {
                var f = this;
                n.each(r, function(n) {
                    f._synchronizeScopeField({parentScope: t, childScope: i, fieldPath: n, parentPrefix: u})
                })
            }, _initComponent: function(n) {
                this._component = new this._componentClass(this._$element, this._evalOptions(n))
            }, _initComponentBindings: function() {
                var t = this, i = {};
                t._ngOptions.bindingOptions && n.each(t._ngOptions.bindingOptions, function(r, u) {
                    var s = r.search(/\[|\./), e = s > -1 ? r.substring(0, s) : r, h, f, c, o;
                    i[e] || (i[e] = {}), i[e][r] = u, c = function(n, i) {
                        n !== i && (t._component.option(r, n), o())
                    }, o = function() {
                        var i = n.isArray(t._scope.$eval(u)) ? "$watchCollection" : "$watch";
                        h !== i && (f && f(), f = t._scope[i](u, c, !0), h = i)
                    }, o();
                    t._component.on("disposing", function() {
                        f(), t._componentDisposing.fire()
                    })
                });
                t._component.on("optionChanged", function(r) {
                    var e = r.name, s = r.value;
                    t._scope.$root.$$phase !== "$digest" && i && i[e] && o(function(t) {
                        n.each(i[e], function(n, i) {
                            var o = u(i), h = f(n), r = {};
                            r[e] = s, o(t, h(r))
                        })
                    }, t._scope)
                })
            }, _compilerByTemplate: function(t) {
                var r = this, u = this._getScopeItemsPath();
                return function(f, e) {
                    var h = n(t).clone(), c, s;
                    if (f !== i) {
                        c = f.$id, s = c ? f : r._createScopeWithData(f);
                        h.on("$destroy", function() {
                            var n = !s.$parent;
                            n || s.$destroy()
                        })
                    } else
                        s = r._scope;
                    return u && r._synchronizeScopes(s, u, e), o(r._compile(h), s), h
                }
            }, _getScopeItemsPath: function() {
                if (this._componentClass.subclassOf(r.CollectionWidget) && this._ngOptions.bindingOptions)
                    return this._ngOptions.bindingOptions.items
            }, _createScopeWithData: function(t) {
                var i = this._scope.$new(!0);
                return n.isPlainObject(t) ? n.extend(i, t) : i.scopeValue = t, i
            }, _synchronizeScopes: function(t, i, r) {
                var e = this, u = f(i + "[" + r + "]")(this._scope);
                n.isPlainObject(u) || (u = {scopeValue: u}), n.each(u, function(n) {
                    e._synchronizeScopeField({parentScope: e._scope, childScope: t, fieldPath: n, parentPrefix: i, itemIndex: r})
                })
            }, _synchronizeScopeField: function(n) {
                var r = n.parentScope, c = n.childScope, t = n.fieldPath, l = n.parentPrefix, e = n.itemIndex, y = t === "scopeValue" ? "" : "." + t, a = e !== i, o = [l], s, v, h;
                a && o.push("[", e, "]"), o.push(y), s = o.join(""), v = r.$watch(s, function(n, i) {
                    n !== i && u(t)(c, n)
                }), h = c.$watch(t, function(n, t) {
                    if (n !== t) {
                        if (a && !f(l)(r)[e]) {
                            h();
                            return
                        }
                        u(s)(r, n)
                    }
                }), this._componentDisposing.add([v, h])
            }, _evalOptions: function(t) {
                var i = n.extend({}, this._ngOptions);
                return delete i.data, delete i.bindingOptions, this._ngOptions.bindingOptions && n.each(this._ngOptions.bindingOptions, function(n, r) {
                    i[n] = t.$eval(r)
                }), i.templateProvider = new r.NgTemplateProvider, i
            }}), o = function(n, t) {
            t.$root.$$phase ? n(t) : t.$apply(function() {
                n(t)
            })
        }, p = function(t, i) {
            var u, f;
            return t.data(e) ? t.data(e) : (i.subclassOf(r.Widget) && n.trim(t.html()) && (f = !t.children().first().attr("data-options"), u = f ? n("<div/>").attr("data-options", "dxTemplate: { name: '" + a + "' }").append(t.contents()) : t.children().detach(), t.data(e, u)), u)
        }, w = t.DOMComponent.inherit({_modelByElement: function(n) {
                if (n.length)
                    return n.scope()
            }, _createAction: function() {
                var n = this.callBase.apply(this, arguments), t = this;
                return function() {
                    var r = this, i = t._modelByElement(t.element()), u = arguments;
                    return!i || !i.$root || i.$root.$$phase ? n.apply(r, u) : i.$apply(function() {
                        return n.apply(r, u)
                    })
                }
            }}), b = t.registerComponent, s = function(n, t, i) {
            i = i || t, b.apply(this, arguments), v.directive(n, ["$compile", function(t) {
                    return{restrict: "A", compile: function(r) {
                            var u = p(r, i);
                            return function(r, f, e) {
                                var o = new y({componentClass: i, componentName: n, compile: t, $element: f, scope: r, ngOptions: e[n] ? r.$eval(e[n]) : {}, $templates: u});
                                o.initTemplateCompilers(), o.initDefaultCompilerGetter(), o.initComponentWithBindings()
                            }
                        }}
                }])
        };
        t.registerComponent = s, s("DOMComponent", w)
    }
}(jQuery, DevExpress), function(n, t, i) {
    var h, a, v, c;
    if (t.support.hasKo) {
        var f = window.ko, e = t.ui, g = "dxKoCreation", o = e.TemplateBase.inherit({ctor: function(i) {
                this.callBase.apply(this, arguments), this._template = n("<div>").append(t.utils.normalizeTemplateElement(i)), this._registerKoTemplate()
            }, _registerKoTemplate: function() {
                var n = this._template.get(0);
                new f.templateSources.anonymousTemplate(n).nodes(n)
            }, _prepareDataForContainer: function(n, i) {
                var u = n, e, r;
                return i.length && (e = i.get(0), n = t.utils.isDefined(n) ? n : f.dataFor(e) || {}, r = f.contextFor(e), u = r ? n === r.$data ? r : r.createChildContext(n) : n), u
            }, _renderCore: function(t) {
                var i = n("<div />"), r;
                return f.renderTemplate(this._template.get(0), t, null, i.get(0)), r = i.contents(), r.detach(), i.remove(), r
            }, dispose: function() {
                this.callBase(), this._template.remove()
            }}), y = e.TemplateProviderBase.inherit({createTemplate: function(n, t) {
                return new o(n, t)
            }, applyTemplate: function(n, t) {
                f.applyBindings(t, n)
            }, _templatesForWidget: function(n) {
                return p(n)
            }}), p = function() {
            var i = {};
            return function(u) {
                if (!i[u]) {
                    var e = r[u] || {}, f = {};
                    n.each(e, function(n, i) {
                        var r = t.utils.createMarkupFromString(i());
                        f[n] = new o(r)
                    }), i[u] = f
                }
                return i[u]
            }
        }(), u = function(t, r, u, f) {
            u = u === i ? !0 : u;
            var e = n.map(r, function(n, t) {
                return t + ":" + n
            }).join(",");
            return f = f || "", "<" + t + ' data-bind="' + e + '" ' + f + ">" + (u ? "<\/" + t + ">" : "")
        }, s = {css: "{ 'dx-state-disabled': $data.disabled, 'dx-state-invisible': !($data.visible === undefined || ko.unwrap($data.visible)) }"}, r = {};
        r.CollectionWidget = {itemFrame: function() {
                var n = [u("div", s, !1), "<div class='dx-item-content-placeholder'><\/div>", "<\/div>"];
                return n.join("")
            }, item: function() {
                var n = u("div", {html: "html"}), t = u("div", {text: "text"}), i = u("div", {text: "String($data)"}), r = ["<div>", "<!-- ko if: $data.html && !$data.text -->", n, "<!-- /ko -->", "<!-- ko if: !$data.html && $data.text -->", t, "<!-- /ko -->", "<!-- ko ifnot: $.isPlainObject($data) -->", i, "<!-- /ko -->", "<\/div>"];
                return r.join("")
            }};
        var w = "dx-list-item-badge-container", b = "dx-list-item-badge", l = "dx-badge", k = "dx-list-item-chevron-container", d = "dx-list-item-chevron";
        r.dxList = {item: function() {
                var n = r.CollectionWidget.item(), t = u("div", {text: "key"});
                return n = [n.substring(0, n.length - 6), "<!-- ko if: $data.key -->" + t + "<!-- /ko -->", "<\/div>"], n.join("")
            }, itemFrame: function() {
                var n = r.CollectionWidget.itemFrame(), t = u("div", {text: "badge"}, !0, 'class="' + b + " " + l + '"'), i = [n.substring(0, n.length - 6), "<!-- ko if: $data.badge -->", '<div class="' + w + '">', t, "<\/div>", "<!-- /ko -->", "<!-- ko if: $data.showChevron -->", '<div class="' + k + '">', '<div class="' + d + '"><\/div>', "<\/div>", "<!-- /ko -->", "<\/div>"];
                return i.join("")
            }, group: function() {
                var n = u("div", {text: "key"}), t = u("div", {text: "String($data)"}), i = ["<div>", "<!-- ko if: $data.key -->", n, "<!-- /ko -->", "<!-- ko ifnot: $.isPlainObject($data) -->", t, "<!-- /ko -->", "<\/div>"];
                return i.join("")
            }}, r.dxDropDownMenu = {item: r.dxList.item}, r.dxDropDownList = {item: r.dxList.item}, r.dxRadioGroup = {item: r.CollectionWidget.item}, r.dxSlideOut = {menuItem: r.dxList.item, menuGroup: r.dxList.group}, h = function() {
            var n = u("div", {text: "title"}), t = u("div", {text: "String($data)"}), i = ["<div>", "<!-- ko if: $data.title -->", n, "<!-- /ko -->", "<!-- ko ifnot: $.isPlainObject($data) -->", t, "<!-- /ko -->", "<\/div>"];
            return i.join("")
        }, r.dxAccordion = {title: h, item: r.CollectionWidget.item}, r.dxResponsiveBox = {item: r.CollectionWidget.item}, r.dxPivotTabs = {item: function() {
                var n = r.CollectionWidget.item(), t = u("span", {text: "title"}), i = n.indexOf(">") + 1, f = n.length - 6;
                return n = [n.substring(0, i), t, n.substring(f, n.length)], n.join("")
            }}, a = "dx-panorama-item-title", r.dxPanorama = {itemFrame: function() {
                var n = r.CollectionWidget.itemFrame(), i = u("div", {text: "title"}, !0, 'class="' + a + '"'), t = n.indexOf(">") + 1;
                return n = [n.substring(0, t), "<!-- ko if: $data.title -->", i, "<!-- /ko -->", n.substring(t, n.length)], n.join("")
            }}, r.dxActionSheet = {item: function() {
                return u("div", {dxButton: "{ text: $data.text, onClick: $data.clickAction || $data.onClick, type: $data.type, disabled: !!ko.unwrap($data.disabled) }"})
            }}, r.dxToolbar = {item: function() {
                var i = r.CollectionWidget.item();
                return i = [i.substring(0, i.length - 6), "<!-- ko if: $data.widget -->"], n.each(["button", "tabs", "dropDownMenu"], function() {
                    var r = t.inflector.camelize(["dx", "-", this].join("")), n = {};
                    n[r] = "$data.options", i.push("<!-- ko if: $data.widget === '", this, "' -->", u("div", n), "<!-- /ko -->")
                }), i.push("<!-- /ko -->"), i.join("")
            }, menuItem: r.dxList.item, actionSheetItem: r.dxActionSheet.item}, r.dxGallery = {item: function() {
                var n = r.CollectionWidget.item(), t = u("div", {text: "String($data)"}), i = u("img", {attr: "{ src: String($data) }"}, !1);
                return n = [n.substring(0, n.length - 6).replace(t, i), "<!-- ko if: $data.imageSrc -->", u("img", {attr: "{ src: $data.imageSrc }"}, !1), "<!-- /ko -->"].join("")
            }}, r.dxTabs = {item: function() {
                var n = r.CollectionWidget.item(), t = u("div", {text: "text"}), i = u("span", {attr: "{ 'class': 'dx-icon-' + $data.icon }", css: "{ 'dx-icon': true }"}), f = u("img", {attr: "{ src: $data.iconSrc }", css: "{ 'dx-icon': true }"}, !1), e = "<!-- ko if: $data.icon -->" + i + "<!-- /ko --><!-- ko if: !$data.icon && $data.iconSrc -->" + f + '<!-- /ko --><span class="dx-tab-text" data-bind="text: $data.text"><\/span>';
                return n = n.replace("<!-- ko if: !$data.html && $data.text -->", "<!-- ko if: !$data.html && ($data.text || $data.icon || $data.iconSrc) -->").replace(t, e)
            }}, r.dxTabPanel = {item: r.CollectionWidget.item, title: h}, v = "dx-navbar-item-badge", r.dxNavBar = {itemFrame: function() {
                var n = r.CollectionWidget.itemFrame(), t = u("div", {text: "badge"}, !0, 'class="' + v + " " + l + '"'), i = [n.substring(0, n.length - 6), "<!-- ko if: $data.badge -->", t, "<!-- /ko -->", "<\/div>"];
                return i.join("")
            }}, r.dxMenuBase = {item: function() {
                var n = [u("div", s, !1)], t = u("span", {attr: "{ 'class': 'dx-icon-' + $data.icon }", css: "{ 'dx-icon': true }"}), i = u("img", {attr: "{ src: $data.iconSrc }", css: "{ 'dx-icon': true }"}), r = u("span", {text: "text", css: "{ 'dx-menu-item-text': true }"}), f = u("span", {text: "String($data)", css: "{ 'dx-menu-item-text': true }"}), e = '<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"><\/div><\/span>';
                return n.push("<!-- ko if: $data.icon -->", t, "<!-- /ko -->", "<!-- ko if: !$data.icon && $data.iconSrc -->", i, "<!-- /ko -->", "<!-- ko if: $.isPlainObject($data) -->", r, "<!-- /ko -->", "<!-- ko ifnot: $.isPlainObject($data) -->", f, "<!-- /ko -->", "<!-- ko if: $data.items -->", e, "<!-- /ko -->", "<\/div>"), n.join("")
            }}, r.dxTreeView = {item: function() {
                var n = [u("div", s, !1)], t = u("span", {text: "text"}, !0), i = u("span", {attr: "{ 'class': 'dx-icon-' + $data.icon }", css: "{ 'dx-icon': true }"}), r = u("img", {attr: "{ src: $data.iconSrc }", css: "{ 'dx-icon': true }"}, !1);
                return n.push("<div>", "<!-- ko if: $data.icon -->", i, "<!-- /ko -->", "<!-- ko if: !$data.icon && $data.iconSrc -->", r, "<!-- /ko -->", "<!-- ko if: !$data.html && $data.text -->" + t + "<!-- /ko -->", "<\/div>"), n.join("")
            }}, c = function() {
            return u("div", {dxToolbar: "{ items: $data }"})
        }, r.dxPopup = {title: c, bottom: c}, r.dxLookup = {title: r.dxPopup.title, group: r.dxList.group}, n.extend(e, {KoTemplateProvider: y, KoTemplate: o})
    }
}(jQuery, DevExpress), function(n, t) {
    var o, c, l, s;
    if (t.support.hasNg) {
        var f = t.ui, g = "dxNgCreation", a = "dxNgCompiler", v = "dxDefaultCompilerGetter", e = f.TemplateBase.inherit({ctor: function() {
                this.callBase.apply(this, arguments), this._compiler = this._element.data(a)
            }, _renderCore: function(t, i) {
                var r = this._compiler;
                return n.isFunction(r) ? r(t, i) : r
            }, setCompiler: function(n) {
                this._compiler = n(this._element)
            }}), y = f.TemplateProviderBase.inherit({createTemplate: function(n, t) {
                return new e(n, t)
            }, getTemplates: function(t) {
                var r = t.element().data(v), i = this.callBase.apply(this, arguments);
                return n.each(i, function(n, t) {
                    t.setCompiler(r)
                }), i
            }, _templatesForWidget: function(n) {
                return p(n)
            }}), p = function() {
            var i = {};
            return function(u) {
                if (!i[u]) {
                    var o = r[u] || {}, f = {};
                    n.each(o, function(n, i) {
                        var r = t.utils.createMarkupFromString(i());
                        f[n] = new e(r)
                    }), i[u] = f
                }
                return i[u]
            }
        }(), u = {container: function() {
                return n("<div>")
            }, html: function() {
                return n("<div>").attr("ng-if", "html").attr("ng-bind-html", "html")
            }, text: function() {
                return n("<div>").attr("ng-if", "text").attr("ng-bind", "text")
            }, primitive: function() {
                return n("<div>").attr("ng-if", "scopeValue").attr("ng-bind-html", "'' + scopeValue")
            }}, r = {};
        r.CollectionWidget = {item: function() {
                return u.container().append(u.html()).append(u.text()).append(u.primitive())
            }, itemFrame: function() {
                var t = n("<div>").attr("ng-class", "{ 'dx-state-invisible': !visible && visible != undefined, 'dx-state-disabled': !!disabled }"), i = n("<div>").addClass("dx-item-content-placeholder");
                return t.append(i), t
            }};
        var w = "dx-list-item-badge-container", b = "dx-list-item-badge", h = "dx-badge", k = "dx-list-item-chevron-container", d = "dx-list-item-chevron";
        r.dxList = {item: function() {
                return r.CollectionWidget.item().append(n("<div>").attr("ng-if", "key").attr("ng-bind", "key"))
            }, itemFrame: function() {
                var t = n("<div>").addClass(w).attr("ng-if", "badge"), i = n("<div>").addClass(b).addClass(h).attr("ng-bind", "badge"), u = n("<div>").addClass(k).attr("ng-if", "showChevron"), f = n("<div>").addClass(d);
                return r.CollectionWidget.itemFrame().append(t.append(i)).append(u.append(f))
            }, group: function() {
                var t = n("<div>").attr("ng-if", "key").attr("ng-bind", "key");
                return u.container().append(t).append(u.primitive())
            }}, r.dxDropDownMenu = {item: r.dxList.item}, r.dxDropDownList = {item: r.dxList.item}, r.dxRadioGroup = {item: r.CollectionWidget.item}, r.dxSlideOut = {menuItem: r.dxList.item, menuGroup: r.dxList.group}, o = function() {
            var t = n("<div>").attr("ng-if", "title").attr("ng-bind", "title");
            return u.container().append(t).append(u.primitive())
        }, r.dxAccordion = {title: o, content: r.CollectionWidget.item}, r.dxPivotTabs = {item: function() {
                return u.container().append(n("<span>").attr("ng-bind", "title"))
            }}, c = "dx-panorama-item-title", r.dxPanorama = {itemFrame: function() {
                return r.CollectionWidget.itemFrame().prepend(n("<div>").addClass(c).attr("ng-if", "title").attr("ng-bind", "title"))
            }}, r.dxActionSheet = {item: function() {
                return n("<div>").attr("dx-button", "{ bindingOptions: { text: 'text', onClick: 'onClick', type: 'type', disabled: 'disabled' } }")
            }}, r.dxToolbar = {item: function() {
                var i = r.CollectionWidget.item();
                return n.each(["button", "tabs", "dropDownMenu"], function(r, u) {
                    var f = "dx-" + t.inflector.dasherize(this);
                    n("<div>").attr("ng-if", "widget === '" + u + "'").attr(f, "options").appendTo(i)
                }), i
            }, menuItem: r.dxList.item, actionSheetItem: r.dxActionSheet.item}, r.dxGallery = {item: function() {
                return u.container().append(u.html()).append(u.text()).append(n("<img>").attr("ng-if", "scopeValue").attr("ng-src", "{{'' + scopeValue}}")).append(n("<img>").attr("ng-if", "imageSrc").attr("ng-src", "{{imageSrc}}"))
            }}, r.dxTabs = {item: function() {
                var t = u.container(), i = n("<span>").addClass("dx-tab-text").attr("ng-bind", "text").attr("ng-if", "text"), r = n("<span>").attr("ng-if", "icon").addClass("dx-icon").attr("ng-class", "'dx-icon-' + icon"), f = n("<img>").attr("ng-if", "iconSrc").addClass("dx-icon").attr("ng-src", "{{iconSrc}}");
                return t.append(u.html()).append(r).append(f).append(i).append(u.primitive())
            }}, l = "dx-navbar-item-badge", r.dxNavBar = {itemFrame: function() {
                var t = n("<div>").addClass(l).addClass(h).attr("ng-if", "badge").attr("ng-bind", "badge");
                return r.CollectionWidget.itemFrame().append(t)
            }}, r.dxMenuBase = {item: function() {
                var t = u.container(), i = n("<span>").attr("ng-if", "text").addClass("dx-menu-item-text").attr("ng-bind", "text"), r = n("<span>").attr("ng-if", "icon").addClass("dx-icon").attr("ng-class", "'dx-icon-' + icon"), f = n("<img>").attr("ng-if", "iconSrc").addClass("dx-icon").attr("ng-src", "{{iconSrc}}"), e = n("<span>").addClass("dx-menu-item-popout-container").attr("ng-if", "items").append(n("<div>").addClass("dx-menu-item-popout"));
                return t.append(u.html()).append(r).append(f).append(i).append(e).append(u.primitive()).appendTo(t), t
            }}, r.dxTreeView = {item: function() {
                var t = u.container(), i = n("<div />"), r = n("<span/>").attr("ng-bind", "text"), f = n("<span>").attr("ng-if", "icon").addClass("dx-icon").attr("ng-class", "'dx-icon-' + icon"), e = n("<img>").attr("ng-if", "iconSrc").addClass("dx-icon").attr("ng-src", "{{iconSrc}}");
                return i.append(u.html()).append(f).append(e).append(r).append(u.primitive()).appendTo(t), t
            }}, r.dxTabPanel = {item: r.CollectionWidget.item, title: o}, s = function() {
            return n("<div>").attr("dx-toolbar", "{ bindingOptions: { items: 'scopeValue' } }")
        }, r.dxPopup = {title: s, bottom: s}, r.dxLookup = {title: r.dxPopup.title, group: r.dxList.group}, n.extend(f, {NgTemplate: e, NgTemplateProvider: y})
    }
}(jQuery, DevExpress), function(n, t) {
    if (t.support.hasKo) {
        var r = window.ko, u = t.Class.inherit({ctor: function(t, i) {
                var u = this;
                u.target = t, u.validationRules = i.validationRules, u.name = i.name, u.isValid = r.observable(!0), u.validationError = r.observable(), n.each(this.validationRules, function(n, t) {
                    t.validator = u
                })
            }, validate: function() {
                var n = DevExpress.validationEngine.validate(this.target(), this.validationRules, this.name);
                return this.target.dxValidator.isValid(n.isValid), this.target.dxValidator.validationError(n.brokenRule), this.fireEvent("validated", [n]), n
            }}).include(t.EventsMixin);
        r.extenders.dxValidator = function(t, i) {
            return t.dxValidator = new u(t, i), t.subscribe(n.proxy(t.dxValidator.validate, t.dxValidator)), t
        }, DevExpress.validationEngine.registerModelForValidation = function(t) {
            n.each(t, function(n, i) {
                r.isObservable(i) && i.dxValidator && DevExpress.validationEngine.registerValidatorInGroup(t, i.dxValidator)
            })
        }, DevExpress.validationEngine.validateModel = DevExpress.validationEngine.validateGroup
    }
}(jQuery, DevExpress), function(n, t, i) {
    function v() {
        var i = n("<div><\/div>", u).addClass("dx-theme-marker").appendTo(u.documentElement), t;
        try {
            return(t = i.css("font-family"), !t) ? null : (t = t.replace(/["']/g, ""), t.substr(0, s.length) !== s) ? null : t.substr(s.length)
        } finally {
            i.remove()
        }
    }
    function d(t, i) {
        function f() {
            e = null, i()
        }
        var r, u;
        e = t, y() ? f() : (u = n.now(), r = setInterval(function() {
            var t = y(), i = !t && n.now() - u > 15e3;
            (t || i) && (clearInterval(r), f())
        }, 10))
    }
    function y() {
        return!e || v() === e
    }
    function g() {
        var i = n(a, u);
        i.length && (f = {}, o = n(t.utils.createMarkupFromString("<link rel=stylesheet>"), u), i.each(function() {
            var t = n(this, u), i = t.attr(b), r = t.attr("href"), e = t.attr(k) === "true";
            f[i] = {url: r, isActive: e}
        }), i.last().after(o), i.remove())
    }
    function nt(t) {
        var i = t.split("."), r = null;
        return f && n.each(f, function(n, t) {
            var u = n.split(".");
            if (u[0] === i[0])
                return i[1] && i[1] !== u[1] ? void 0 : ((!r || t.isActive) && (r = n), t.isActive ? !1 : void 0)
        }), r
    }
    function tt(n) {
        try {
            n !== u && (f = null)
        } catch (t) {
            f = null
        }
        u = n
    }
    function p(n) {
        n = n || {}, tt(n.context || document), g(), r = i, h(n)
    }
    function h(n) {
        if (!arguments.length)
            return r || v();
        l(t.viewPort(), r), n = n || {}, typeof n == "string" && (n = {theme: n});
        var u = n._autoInit, i = n.loadCallback, s;
        if (r = n.theme || r, u && !r && (r = it(t.devices.current())), r = nt(r), r && (s = f[r]), s)
            o.removeAttr("href"), o.attr("href", f[r].url), i ? d(r, i) : e && (e = r);
        else if (u)
            i && i();
        else
            throw t.Error("E0021", r);
        c(t.viewPort(), r)
    }
    function it(n) {
        var t = n.platform, i = n.version && n.version[0];
        return t === "ios" && (!i || i > 6) && (t += "7"), t === "android" && (!i || i > 4) && (t += "5"), t
    }
    function w(n) {
        n = n || h();
        var i = [], t = n && n.split(".");
        return t && (i.push("dx-theme-" + t[0], "dx-theme-" + t[0] + "-typography"), t.length > 1 && i.push("dx-color-scheme-" + t[1])), i
    }
    function c(t, i) {
        n(t).addClass(w(i).join(" "))
    }
    function l(t, i) {
        n(t).removeClass(w(i).join(" "))
    }
    var a = "link[rel=dx-theme]", b = "data-theme", k = "data-active", u, o, f, r, e, s = "dx.";
    n.holdReady(!0), p({_autoInit: !0, loadCallback: function() {
            n.holdReady(!1)
        }}), n(function() {
        if (n(a, u).length)
            throw t.Error("E0022");
    }), t.viewPortChanged.add(function(n, t) {
        l(t), c(n)
    }), t.ui.themes = {init: p, current: h, attachCssClasses: c, detachCssClasses: l}
}(jQuery, DevExpress), function(n, t) {
    var v = t.ui, r = n.event, o = r.fixHooks, y = r.special, p = {dx: /^dx/i, mouse: /(mouse|wheel)/i, touch: /^touch/i, keyboard: /^key/i, pointer: /^(ms)?pointer/i}, u = function(t) {
        var i = "other";
        return n.each(p, function(n) {
            if (this.test(t.type))
                return i = n, !1
        }), i
    }, f = function(n) {
        return u(n) === "dx"
    }, w = function(n) {
        return u(n) === "mouse"
    }, s = function(n) {
        return u(n) === "touch"
    }, e = function(n) {
        return u(n) === "pointer"
    }, h = function(n) {
        return w(n) || (e(n) || f(n)) && n.pointerType === "mouse"
    }, c = function(n) {
        return s(n) || (e(n) || f(n)) && n.pointerType === "touch"
    }, b = function(n) {
        return u(n) === "keyboard"
    }, k = function(n) {
        return{x: n.pageX, y: n.pageY, time: n.timeStamp}
    }, d = function(n, t) {
        return{x: t.x - n.x, y: t.y - n.y, time: t.time - n.time || 1}
    }, g = function(n) {
        return s(n) ? (n.originalEvent.touches || []).length : f(n) ? (n.pointers || []).length : 0
    }, nt = function(t) {
        var i = n(t.target), r = i.is("input, textarea, select");
        return h(t) ? r || t.which > 1 : c(t) ? r && i.is(":focus") : void 0
    }, l = function(t, i) {
        for (var u = n.Event(t), f = o[t.type] || r.mouseHooks, s = f.props ? r.props.concat(f.props) : r.props, h = s.length, e; h--; )
            e = s[h], u[e] = t[e];
        return i && n.extend(u, i), f.filter ? f.filter(u, t) : u
    }, tt = function(n) {
        var t = l(n.originalEvent, n);
        return r.trigger(t, null, n.delegateTarget || t.target), t
    }, a = function(t, i) {
        return typeof t == "string" ? a(t.split(/\s+/g), i) : (n.each(t, function(n, r) {
            t[n] = r + "." + i
        }), t.join(" "))
    }, it = {props: r.mouseHooks.props.concat(["pointerType", "pointerId", "pointers"])}, rt = function(t, i) {
        var r = {};
        "noBubble"in i && (r.noBubble = i.noBubble), "bindType"in i && (r.bindType = i.bindType), "delegateType"in i && (r.delegateType = i.delegateType), n.each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], function(t, u) {
            i[u] && (r[u] = function() {
                var t = n.makeArray(arguments);
                return t.unshift(this), i[u].apply(i, t)
            })
        }), o[t] = it, y[t] = r
    };
    v.events = {eventSource: u, isPointerEvent: e, isMouseEvent: h, isTouchEvent: c, isKeyboardEvent: b, hasTouches: g, eventData: k, eventDelta: d, needSkipEvent: nt, createEvent: l, fireEvent: tt, addNamespace: a, registerEvent: rt}
}(jQuery, DevExpress), function(n, t) {
    if (t.support.hasKo) {
        var u = window.ko, r = t.ui.events, f = r.registerEvent, e = function(t, i) {
            f(t, i);
            var e = r.addNamespace(t, t + "Binding");
            u.bindingHandlers[t] = {update: function(t, i, r, f) {
                    var s = n(t), o = u.utils.unwrapObservable(i()), h = o.execute ? o.execute : o;
                    s.off(e).on(e, n.isPlainObject(o) ? o : {}, function(n) {
                        h.call(f, f, n)
                    })
                }}
        };
        n.extend(r, {registerEvent: e})
    }
}(jQuery, DevExpress), function(n, t) {
    if (t.support.hasNg) {
        var r = t.ui.events, u = r.registerEvent, f = function(i, r) {
            u(i, r);
            var f = i.slice(0, 2) + i.charAt(2).toUpperCase() + i.slice(3);
            t.ng.module.directive(f, ["$parse", function(t) {
                    return function(r, u, e) {
                        var h = n.trim(e[f]), o, s = {};
                        h.charAt(0) === "{" ? (s = r.$eval(h), o = t(s.execute)) : o = t(e[f]);
                        u.on(i, s, function(n) {
                            r.$apply(function() {
                                o(r, {$event: n})
                            })
                        })
                    }
                }])
        };
        n.extend(r, {registerEvent: f})
    }
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.ui, u = r.events;
    r.KeyboardProcessor = t.Class.inherit({_keydown: u.addNamespace("keydown", "KeyboardProcessor"), codes: {"8": "backspace", "9": "tab", "13": "enter", "27": "escape", "33": "pageUp", "34": "pageDown", "35": "end", "36": "home", "37": "leftArrow", "38": "upArrow", "39": "rightArrow", "40": "downArrow", "32": "space", "70": "F", "65": "A"}, ctor: function(t) {
            var i = this;
            if (t = t || {}, t.element && (this._element = n(t.element)), this._handler = t.handler, this._context = t.context, this._childProcessors = [], this._element)
                this._element.on(this._keydown, function(n) {
                    i.process(n)
                })
        }, dispose: function() {
            this._element && this._element.off(this._keydown), this._element = i, this._handler = i, this._context = i, this._childProcessors = i
        }, push: function(n) {
            return this._childProcessors || (this._childProcessors = []), this._childProcessors.push(n), n
        }, attachChildProcessor: function() {
            var n = new r.KeyboardProcessor;
            return this._childProcessors.push(n), n
        }, reinitialize: function(n, t) {
            return this._context = t, this._handler = n, this
        }, process: function(t) {
            var i = {key: this.codes[t.which], ctrl: t.ctrlKey, shift: t.shiftKey, alt: t.altKey, originalEvent: t};
            this.codes[t.which] && this._handler && this._handler.call(this._context, i) && this._childProcessors && n.each(this._childProcessors, function(n, i) {
                i.process(t)
            })
        }})
}(jQuery, DevExpress), function(n, t) {
    var f = t.ui, o = t.utils, s = {text: "OK", onClick: function() {
            return!0
        }}, r = "dx-dialog", h = r + "-wrapper", c = r + "-root", l = r + "-content", a = r + "-message", v = r + "-buttons", y = r + "-button", p = t.Component.inherit({NAME: "dxDialog", ctor: function(n, t) {
            this.callBase(t)
        }, _defaultOptionsRules: function() {
            return this.callBase().concat([{device: {platform: "ios"}, options: {width: 276}}, {device: {platform: "android"}, options: {lWidth: "60%", pWidth: "80%"}}, {device: {platform: "win8", phone: !1}, options: {width: function() {
                            return n(window).width()
                        }}}, {device: {platform: "win8", phone: !0}, options: {position: {my: "top center", at: "top center", of: window, offset: "0 0"}}}])
        }}), w = function(i) {
        function nt() {
            return u.show(), o.resetActiveElement(), e.promise()
        }
        function k(n) {
            u.hide().done(function() {
                u.element().remove()
            }), e.resolve(n)
        }
        var e, b;
        if (!f.dxPopup)
            throw t.Error("E0018");
        e = n.Deferred(), b = (new p).option(), i = n.extend(b, i);
        var d = n("<div>").addClass(r).appendTo(t.viewPort()), g = n("<div>").addClass(a).html(String(i.message)), w = n("<div>").addClass(v), u = d.dxPopup({title: i.title || this.title, height: "auto", width: function() {
                var u = n(window).height() > n(window).width(), r = (u ? "p" : "l") + "Width", t = i.hasOwnProperty(r) ? i[r] : i.width;
                return n.isFunction(t) ? t() : t
            }, focusStateEnabled: !1, onContentReady: function(n) {
                n.component.content().addClass(l).append(g).append(w)
            }, onShown: function() {
                w.children().first().focus()
            }, animation: {show: {type: "pop", duration: 400}, hide: {type: "pop", duration: 400, to: {opacity: 0, scale: 0}, from: {opacity: 1, scale: 1}}}, rtlEnabled: t.rtlEnabled}).dxPopup("instance");
        return u._wrapper().addClass(h), i.position && u.option("position", i.position), n.each(i.buttons || [n.extend({}, s)], function(i, r) {
            var e = n("<div>").addClass(y).appendTo(w), f;
            r.clickAction && (t.log("W0001", "Dialog", "clickAction", "14.2", "Use 'onClick' option instead"), r.onClick = r.clickAction), f = r.onClick, e.dxButton(n.extend(r, {onClick: function() {
                    var n = new t.Action(f, {context: u}), i = n.execute(arguments);
                    k(i)
                }}))
        }), u._wrapper().addClass(c), {show: nt, hide: k}
    }, e = function(t, i) {
        var r, u = n.isPlainObject(t) ? t : {title: i, message: t};
        return r = f.dialog.custom(u), r.show()
    }, b = function(t, i) {
        var r, u = n.isPlainObject(t) ? t : {title: i, message: t, buttons: [{text: Globalize.localize("Yes"), onClick: function() {
                        return!0
                    }}, {text: Globalize.localize("No"), onClick: function() {
                        return!1
                    }}]};
        return r = f.dialog.custom(u), r.show()
    }, u = null, k = function(i, r, o) {
        var s = n.isPlainObject(i) ? i : {message: i}, h;
        if (!f.dxToast) {
            e(s.message);
            return
        }
        s.hiddenAction && (t.log("W0001", "Dialog", "hiddenAction", "14.2", "Use 'onHidden' option instead"), s.onHidden = s.hiddenAction), h = s.onHidden, n.extend(s, {type: r, displayTime: o, onHidden: function(n) {
                n.element.remove(), u = null, new t.Action(h, {context: n.model}).execute(arguments)
            }}), u && (u.remove(), u = null), u = n("<div>").appendTo(t.viewPort()).dxToast(s), u.dxToast("instance").show()
    };
    n.extend(f, {notify: k, dialog: {custom: w, alert: e, confirm: b}})
}(jQuery, DevExpress), function(n, t) {
    var r = t.data, u = "_dataSourceOptions", f = "_dataSourceChangedHandler", e = "_dataSourceLoadErrorHandler", o = "_dataSourceLoadingChangedHandler";
    t.ui.DataHelperMixin = {postCtor: function() {
            this.on("disposing", function() {
                this._disposeDataSource()
            })
        }, _refreshDataSource: function() {
            this._initDataSource(), this._loadDataSource()
        }, _initDataSource: function() {
            var t = this.option("dataSource"), i, f;
            this._disposeDataSource(), t && (t instanceof r.DataSource ? (this._isSharedDataSource = !0, this._dataSource = t) : (i = u in this ? this[u]() : {}, f = this._dataSourceType ? this._dataSourceType() : r.DataSource, this._dataSource = new f(n.extend(!0, {}, i, r.utils.normalizeDataSourceOptions(t)))), this._addDataSourceHandlers())
        }, _addDataSourceHandlers: function() {
            f in this && this._addDataSourceChangeHandler(), e in this && this._addDataSourceLoadErrorHandler(), o in this && this._addDataSourceLoadingChangedHandler()
        }, _addDataSourceChangeHandler: function() {
            var t = this._dataSource;
            this._proxiedDataSourceChangedHandler = n.proxy(function() {
                this[f](t.items())
            }, this);
            t.on("changed", this._proxiedDataSourceChangedHandler)
        }, _addDataSourceLoadErrorHandler: function() {
            this._proxiedDataSourceLoadErrorHandler = n.proxy(this[e], this);
            this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler)
        }, _addDataSourceLoadingChangedHandler: function() {
            this._proxiedDataSourceLoadingChangedHandler = n.proxy(this[o], this);
            this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler)
        }, _loadDataSource: function() {
            if (this._dataSource) {
                var n = this._dataSource;
                n.isLoaded() ? this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler() : n.load()
            }
        }, _loadSingle: function(n, t) {
            return n = n === "this" ? this._dataSource.key() || "this" : n, this._dataSource.loadSingle(n, t)
        }, _disposeDataSource: function() {
            this._dataSource && (this._isSharedDataSource ? (delete this._isSharedDataSource, this._dataSource.off("changed", this._proxiedDataSourceChangedHandler), this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler), this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler)) : this._dataSource.dispose(), delete this._dataSource, delete this._proxiedDataSourceChangedHandler, delete this._proxiedDataSourceLoadErrorHandler, delete this._proxiedDataSourceLoadingChangedHandler)
        }}
}(jQuery, DevExpress), function(n, t, i) {
    var u = t.ui, r = t.utils;
    u.DataExpressionMixin = n.extend(u.DataHelperMixin, {_dataExpressionDeprecatedOptions: function() {
            return{itemRender: {since: "14.2", alias: "itemTemplate"}}
        }, _dataExpressionDefaultOptions: function() {
            return{items: [], dataSource: null, itemTemplate: "item", value: i, valueExpr: "this", displayExpr: i}
        }, _initDataExpressions: function() {
            this._compileValueGetter(), this._compileDisplayGetter(), this._initDynamicTemplates(), this._initDataSource(), this._itemsToDataSource()
        }, _itemsToDataSource: function() {
            this.option("dataSource") || (this._dataSource = new DevExpress.data.DataSource({store: new DevExpress.data.ArrayStore(this.option("items")), pageSize: 0}))
        }, _compileDisplayGetter: function() {
            this._displayGetter = t.data.utils.compileGetter(this.option("displayExpr"))
        }, _compileValueGetter: function() {
            this._valueGetter = t.data.utils.compileGetter(this._valueGetterExpr())
        }, _valueGetterExpr: function() {
            return this.option("valueExpr") || "this"
        }, _loadValue: function(t) {
            var i = n.Deferred();
            return(t = this._unwrappedValue(t), !r.isDefined(t)) ? i.reject().promise() : (this._loadSingle(this._valueGetterExpr(), t).done(n.proxy(function(n) {
                this._valueEquals(this._valueGetter(n), t) ? i.resolve(n) : i.reject()
            }, this)).fail(function() {
                i.reject()
            }), i.promise())
        }, _unwrappedValue: function(n) {
            if (n = t.utils.isDefined(n) ? n : this.option("value"), this._dataSource && this._valueGetterExpr() === "this") {
                var i = this._dataSource.key();
                i && typeof n == "object" && (n = n[i])
            }
            return r.unwrapObservable(n)
        }, _valueEquals: function(n, t) {
            var i = this._dataSource && this._dataSource.key(), u = n === t, f, e;
            return!u && n && t && i && (f = r.unwrapObservable(n[i]) || n, e = r.unwrapObservable(t[i]) || t, u = f === e), u
        }, _initDynamicTemplates: function() {
            this.option("displayExpr") ? this._dynamicTemplates.item = new u.DefaultTemplate(n.proxy(function(n) {
                return this._displayGetter(n)
            }, this)) : delete this._dynamicTemplates.item
        }, _setCollectionWidgetItemTemplate: function() {
            this._initDynamicTemplates(), this._setCollectionWidgetOption("itemTemplate", this._getTemplateByOption("itemTemplate"))
        }, _dataExpressionOptionChanged: function(n) {
            switch (n.name) {
                case"items":
                    this._itemsToDataSource(), this._setCollectionWidgetOption("items");
                    break;
                case"dataSource":
                    this._initDataSource();
                    break;
                case"itemTemplate":
                    this._setCollectionWidgetItemTemplate();
                    break;
                case"valueExpr":
                    this._compileValueGetter();
                    break;
                case"displayExpr":
                    this._compileDisplayGetter(), this._setCollectionWidgetItemTemplate()
                }
        }})
}(jQuery, DevExpress), function(n) {
    var r = {filter: function(t, i) {
            var r = i.touches.length ? i.touches : i.changedTouches;
            return n.each(["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"], function() {
                t[this] = r[0][this]
            }), t
        }, props: n.event.mouseHooks.props.concat(["touches", "changedTouches", "targetTouches", "detail", "result", "originalTarget", "charCode", "prevValue"])};
    n.each(["touchstart", "touchmove", "touchend", "touchcancel"], function() {
        n.event.fixHooks[this] = r
    })
}(jQuery, DevExpress), function(n) {
    var r = {2: "touch", 3: "pen", 4: "mouse"}, u = {filter: function(t, i) {
            var u = i.pointerType;
            return n.isNumeric(u) && (t.pointerType = r[u]), t
        }, props: n.event.mouseHooks.props.concat(["pointerId", "pointerType", "originalTarget", "width", "height", "pressure", "result", "tiltX", "charCode", "tiltY", "detail", "isPrimary", "prevValue"])};
    n.each(["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel", "MSPointerOver", "MSPointerOut", "mouseenter", "mouseleave", "pointerdown", "pointermove", "pointerup", "pointercancel", "pointerover", "pointerout", "pointerenter", "pointerleave"], function() {
        n.event.fixHooks[this] = u
    })
}(jQuery, DevExpress), function(n, t, i) {
    var u = t.ui, r = u.events, f = "dxPointerEvents", e = t.Class.inherit({ctor: function(n, t) {
            this._eventName = n, this._eventNamespace = [f, ".", this._eventName].join(""), this._originalEvents = t, this._handlerCount = 0, this.noBubble = this._isNoBubble()
        }, _isNoBubble: function() {
            var n = this._eventName;
            return n === "dxpointerenter" || n === "dxpointerleave"
        }, _handler: function(n) {
            var t = this._getDelegateTarget(n);
            return this._fireEvent({type: this._eventName, pointerType: n.pointerType || r.eventSource(n), originalEvent: n, delegateTarget: t})
        }, _getDelegateTarget: function(n) {
            var t = i;
            return this.noBubble && (t = n.delegateTarget), t
        }, _fireEvent: function(n) {
            return r.fireEvent(n)
        }, add: function(t, i) {
            if (this._handlerCount <= 0 || this.noBubble) {
                this._selector = i.selector, t = this.noBubble ? t : document;
                n(t).on(r.addNamespace(this._originalEvents, this._eventNamespace), this._selector, n.proxy(this._handler, this))
            }
            this.noBubble || this._handlerCount++
        }, remove: function() {
            this.noBubble || this._handlerCount--
        }, teardown: function(t) {
            (!this._handlerCount || this.noBubble) && (t = this.noBubble ? t : document, n(t).off("." + this._eventNamespace, this._selector))
        }, dispose: function(t) {
            t = this.noBubble ? t : document, n(t).off("." + this._eventNamespace)
        }});
    r.pointer = {}, r.pointer.BaseStrategy = e
}(jQuery, DevExpress), function(n, t) {
    var f = t.ui, e = f.events, r = e.pointer, o = {dxpointerdown: "mousedown", dxpointermove: "mousemove", dxpointerup: "mouseup", dxpointercancel: "", dxpointerover: "mouseover", dxpointerout: "mouseout", dxpointerenter: "mouseenter", dxpointerleave: "mouseleave"}, u = function(n) {
        var t = [];
        return n.pointerId = 1, n.type !== "mouseup" && t.push(n), {pointers: t, pointerId: 1}
    }, s = r.BaseStrategy.inherit({_fireEvent: function(t) {
            return this.callBase(n.extend(u(t.originalEvent), t))
        }});
    r.mouse = {strategy: s, map: o, normalize: u}
}(jQuery, DevExpress), function(n, t) {
    var f = t.ui, e = n.proxy(t.devices.real, t.devices), o = f.events, r = o.pointer, s = {dxpointerdown: "touchstart", dxpointermove: "touchmove", dxpointerup: "touchend", dxpointercancel: "touchcancel"}, u = function(t) {
        var i = [];
        return n.each(t.touches, function(t, r) {
            i.push(n.extend({pointerId: r.identifier}, r))
        }), {pointers: i, pointerId: t.changedTouches[0].identifier}
    }, h = function(n) {
        return e().platform === "ios" && (n === "dxpointerdown" || n === "dxpointerup")
    }, c = r.BaseStrategy.inherit({ctor: function() {
            this.callBase.apply(this, arguments), this._pointerId = 0
        }, _handler: function(n) {
            if (h(this._eventName)) {
                var t = n.changedTouches[0];
                if (this._pointerId === t.identifier && this._pointerId !== 0)
                    return;
                this._pointerId = t.identifier
            }
            return this.callBase.apply(this, arguments)
        }, _fireEvent: function(t) {
            return this.callBase(n.extend(u(t.originalEvent), t))
        }});
    r.touch = {strategy: c, map: s, normalize: u}
}(jQuery, DevExpress), function(n, t) {
    var f = t.ui, u = f.events, r = u.pointer, e = {dxpointerdown: "touchstart mousedown", dxpointermove: "touchmove mousemove", dxpointerup: "touchend mouseup", dxpointercancel: "touchcancel", dxpointerover: "mouseover", dxpointerout: "mouseout", dxpointerenter: "mouseenter", dxpointerleave: "mouseleave"}, o = r.BaseStrategy.inherit({EVENT_LOCK_TIMEOUT: 100, _handler: function(t) {
            var i = u.isMouseEvent(t);
            if (i || (this._skipNextEvents = !0), !i || !this._mouseLocked) {
                if (i && this._skipNextEvents) {
                    this._skipNextEvents = !1, this._mouseLocked = !0, clearTimeout(this._unlockMouseTimer), this._unlockMouseTimer = setTimeout(n.proxy(function() {
                        this._mouseLocked = !1
                    }, this), this.EVENT_LOCK_TIMEOUT);
                    return
                }
                return this.callBase(t)
            }
        }, _fireEvent: function(t) {
            var i = u.isMouseEvent(t.originalEvent), f = i ? r.mouse.normalize : r.touch.normalize;
            return this.callBase(n.extend(f(t.originalEvent), t))
        }, dispose: function() {
            this.callBase(), this._skipNextEvents = !1, this._mouseLocked = !1, clearTimeout(this._unlockMouseTimer)
        }});
    r.mouseAndTouch = {strategy: o, map: e}
}(jQuery, DevExpress), function(n, t) {
    var c = t.ui, p = t.support, l = c.events, e = l.pointer, o = {dxpointerdown: "MSPointerDown pointerdown", dxpointermove: "MSPointerMove pointermove", dxpointerup: "MSPointerUp pointerup", dxpointercancel: "MSPointerCancel pointercancel", dxpointerover: "MSPointerOver pointerover", dxpointerout: "MSPointerOut pointerout", dxpointerenter: "mouseenter pointerenter", dxpointerleave: "mouseleave pointerleave"}, r = [], f = function(t) {
        var i = -1;
        return n.each(r, function(n, r) {
            if (t.pointerId == r.pointerId)
                return i = n, !0
        }), i
    }, a = function(n) {
        f(n) === -1 && r.push(n)
    }, s = function(n) {
        r.splice(f(n), 1)
    }, v = function(n) {
        r[f(n)] = n
    }, u = function(t, i) {
        t = t.split(" "), n.each(t, function(n, t) {
            document.addEventListener(t, i, !0)
        })
    }, h = function() {
        var t = o;
        u(t.dxpointerdown, a), u(t.dxpointermove, v), u(t.dxpointerup, s), u(t.dxpointercancel, s), h = n.noop
    }, y = e.BaseStrategy.inherit({ctor: function() {
            this.callBase.apply(this, arguments), h()
        }, _fireEvent: function(t) {
            return this.callBase(n.extend({pointers: r, pointerId: t.originalEvent.pointerId}, t))
        }});
    e.msPointer = {strategy: y, map: o}
}(jQuery, DevExpress), function(n, t) {
    var s = t.ui, u = t.support, f = n.proxy(t.devices.real, t.devices), e = s.events, r = e.pointer, o = function() {
        return u.touch && !(f().tablet || f().phone) ? r.mouseAndTouch : u.pointer ? r.msPointer : u.touch ? r.touch : r.mouse
    }();
    n.each(o.map, function(n, t) {
        e.registerEvent(n, new o.strategy(n, t))
    })
}(jQuery, DevExpress), function(n, t, i) {
    var s = t.ui, u = s.events, f = "dxmousewheel", e = "dxWheel", h = 10, o, r;
    n.event.fixHooks.wheel = n.event.mouseHooks, o = document.onmousewheel !== i ? "mousewheel" : "wheel", r = {setup: function(t) {
            var f = n(t);
            f.on(u.addNamespace(o, e), n.proxy(r._wheelHandler, r))
        }, teardown: function(t) {
            var i = n(t);
            i.off("." + e)
        }, _wheelHandler: function(n) {
            var t = this._getWheelDelta(n.originalEvent);
            u.fireEvent({type: f, originalEvent: n, delta: t}), n.stopPropagation()
        }, _getWheelDelta: function(n) {
            return n.wheelDelta / 60 || -n.deltaY
        }}, u.registerEvent(f, r)
}(jQuery, DevExpress), function(n, t) {
    var h = t.ui, r = h.events, u = "dxHoverStart", f = "dxhoverstart", c = r.addNamespace("dxpointerenter", u), e = "dxHoverEnd", o = "dxhoverend", l = r.addNamespace("dxpointerleave", e), s = t.Class.inherit({noBubble: !0, add: function(t, i) {
            var r = n(t);
            r.off("." + this._namespace).on(this._originalEventName, i.selector, n.proxy(this._handler, this))
        }, _handler: function(n) {
            r.isTouchEvent(n) || r.fireEvent({type: this._eventName, originalEvent: n, delegateTarget: n.delegateTarget})
        }, teardown: function(t) {
            n(t).off("." + this._namespace)
        }}), a = s.inherit({ctor: function() {
            this._eventName = f, this._originalEventName = c, this._namespace = u
        }}), v = s.inherit({ctor: function() {
            this._eventName = o, this._originalEventName = l, this._namespace = e
        }});
    r.registerEvent(f, new a), r.registerEvent(o, new v)
}(jQuery, DevExpress), function(n, t) {
    var s = t.ui, r = s.events, l = t.utils, a = Math.abs, f = "dxEventManager", u = "dxEmitter", h = t.Class.inherit({ctor: function() {
            this._attachHandlers(), this.reset()
        }, _attachHandlers: function() {
            n(document).on(r.addNamespace("dxpointerdown", f), n.proxy(this._pointerDownHandler, this)).on(r.addNamespace("dxpointermove", f), n.proxy(this._pointerMoveHandler, this)).on(r.addNamespace("dxpointerup dxpointercancel", f), n.proxy(this._pointerUpHandler, this)).on(r.addNamespace("dxmousewheel", f), n.proxy(this._mouseWheelHandler, this))
        }, _eachEmitter: function(n) {
            for (var i = this._activeEmitters || [], t = 0, r; i.length > t; ) {
                if (r = i[t], n(r) === !1)
                    break;
                i[t] === r && t++
            }
        }, _applyToEmitters: function(t) {
            var i = n.makeArray(arguments).slice(1);
            this._eachEmitter(function(n) {
                n[t].apply(n, i)
            })
        }, reset: function() {
            this._eachEmitter(n.proxy(this._cancelEmitter, this)), this._activeEmitters = []
        }, _pointerDownHandler: function(n) {
            r.isMouseEvent(n) && n.which > 1 || this._updateEmitters(n)
        }, _updateEmitters: function(n) {
            this._isSetChanged(n) && (this._cleanEmitters(n), this._fetchEmitters(n))
        }, _isSetChanged: function(t) {
            var r = this._closestEmitter(t), u = this._emittersSet || [], i = r.length !== u.length;
            return n.each(r, function(n, t) {
                return i = i || u[n] !== t, !i
            }), this._emittersSet = r, i
        }, _closestEmitter: function(t) {
            for (var f = [], i = n(t.target), o = r.hasTouches(t), e; i.length; )
                e = i.data(u) || [], n.each(e, n.proxy(function(i, r) {
                    !!r && r.validatePointers(t) && r.validate(t) && (r.addCancelCallback(n.proxy(this._cancelHandler, this, r)), r.addAcceptCallback(n.proxy(this._acceptHandler, this, r)), f.push(r))
                }, this)), i = i.parent();
            return f
        }, _acceptHandler: function(n, t) {
            var i = this;
            this._eachEmitter(function(r) {
                r !== n && i._cancelEmitter(r, t)
            })
        }, _cancelHandler: function(n, t) {
            this._cancelEmitter(n, t)
        }, _cancelEmitter: function(t, i) {
            var r = this._activeEmitters;
            t.removeCancelCallback(), t.removeAcceptCallback(), i && t.cancel(i), r.splice(n.inArray(t, r), 1)
        }, _cleanEmitters: function(n) {
            this._applyToEmitters("end", n), this.reset(n)
        }, _fetchEmitters: function(n) {
            this._activeEmitters = this._emittersSet.slice(), this._applyToEmitters("start", n)
        }, _pointerMoveHandler: function(n) {
            this._applyToEmitters("move", n)
        }, _pointerUpHandler: function(n) {
            this._updateEmitters(n)
        }, _mouseWheelHandler: function(n) {
            n.pointers = [null], this._pointerDownHandler(n), this._eachEmitter(function(t) {
                var i = t.getDirection ? t.getDirection(n) : "", r = i !== "horizontal" ? "pageY" : "pageX";
                return i && (n[r] += n.delta), !i
            }), this._pointerMoveHandler(n), n.pointers = [], this._pointerUpHandler(n)
        }, isActive: function(n) {
            var t = !1;
            return this._eachEmitter(function(i) {
                t = t || i.getElement().is(n)
            }), t
        }}), e = "dxEmitterSubscription", o = new h, c = function(t) {
        var s = t.emitter, i = t.events[0], f = t.events;
        n.each(f, function(h, c) {
            r.registerEvent(c, {noBubble: !t.bubble, setup: function(t) {
                    var f = n(t), h = f.data(e) || {}, o = f.data(u) || {}, l = o[i] || new s(t);
                    h[c] = !0, o[i] = l, f.data(u, o), f.data(e, h)
                }, add: function(t, r) {
                    var f = n(t), e = f.data(u), o = e[i];
                    o.configurate(n.extend({delegateSelector: r.selector}, r.data), r.type)
                }, teardown: function(t) {
                    var s = n(t), h = s.data(e), l = s.data(u), a = l[i], r;
                    delete h[c], r = !0, n.each(f, function(n, t) {
                        return r = r && !h[t]
                    }), r && (o.isActive(t) && o.reset(), a && a.dispose(), delete l[i])
                }})
        })
    };
    n.extend(r, {registerEmitter: c})
}(jQuery, DevExpress), function(n, t) {
    var u = t.ui, r = u.events, f = t.Class.inherit({ctor: function(t) {
            this._$element = n(t), this._cancelCallback = n.Callbacks(), this._acceptCallback = n.Callbacks()
        }, getElement: function() {
            return this._$element
        }, validate: function(n) {
            return n.type !== "dxmousewheel"
        }, validatePointers: function(n) {
            return r.hasTouches(n) === 1
        }, configurate: function(t) {
            n.extend(this, t)
        }, addCancelCallback: function(n) {
            this._cancelCallback.add(n)
        }, removeCancelCallback: function() {
            this._cancelCallback.empty()
        }, _cancel: function(n) {
            this._cancelCallback.fire(n)
        }, addAcceptCallback: function(n) {
            this._acceptCallback.add(n)
        }, removeAcceptCallback: function() {
            this._acceptCallback.empty()
        }, _accept: function(n) {
            this._acceptCallback.fire(n)
        }, start: n.noop, move: n.noop, end: n.noop, cancel: n.noop, _fireEvent: function(t, i, u) {
            var f = n.extend({type: t, originalEvent: i, target: this._getEmitterTarget(i), delegateTarget: this.getElement().get(0)}, u);
            return i = r.fireEvent(f), i.cancel && this._cancel(i), i
        }, _getEmitterTarget: function(t) {
            return(this.delegateSelector ? n(t.target).closest(this.delegateSelector) : this.getElement()).get(0)
        }, dispose: n.noop});
    n.extend(r, {Emitter: f})
}(jQuery, DevExpress), function(n, t) {
    var o = t.ui, e = o.events, u = "dxactive", f = "dxinactive", s = 30, h = 400, r, c = e.Emitter.inherit({configurate: function(n, t) {
            switch (t) {
                case u:
                    n.activeTimeout = n.timeout;
                    break;
                case f:
                    n.inactiveTimeout = n.timeout
            }
            this.callBase(n)
        }, start: function(t) {
            var i = this.getElement().get(0), u = r && r.getElement().get(0);
            n.contains(i, u) ? this._cancel(t) : (r && r._forceInctiveTimer(), r = this, this._startActiveTimer(t)), this._eventTarget = this._getEmitterTarget(t)
        }, cancel: function(n) {
            this.end(n)
        }, end: function(n) {
            var t = n.type !== "dxpointerup";
            t ? this._stopActiveTimer() : this._forceActiveTimer(), this._startInactiveTimer(n), t && this._forceInctiveTimer()
        }, _startActiveTimer: function(t) {
            var i = "activeTimeout"in this ? this.activeTimeout : s;
            this._forceActiveTimer = n.proxy(this._fireActive, this, t), this._activeTimer = window.setTimeout(this._forceActiveTimer, i)
        }, _fireActive: function(n) {
            this._activeTimer && (this._stopActiveTimer(), this._fireEvent(u, n, {target: this._eventTarget}))
        }, _stopActiveTimer: function() {
            clearTimeout(this._activeTimer), delete this._activeTimer
        }, _forceActiveTimer: n.noop, _startInactiveTimer: function(t) {
            var i = "inactiveTimeout"in this ? this.inactiveTimeout : h;
            this._forceInctiveTimer = n.proxy(this._fireInctive, this, t), this._inactiveTimer = window.setTimeout(this._forceInctiveTimer, i)
        }, _fireInctive: function(n) {
            this._inactiveTimer && (this._stopInactiveTimer(), this._fireEvent(f, n, {target: this._eventTarget}))
        }, _stopInactiveTimer: function() {
            clearTimeout(this._inactiveTimer), delete this._inactiveTimer, r = null
        }, _forceInctiveTimer: n.noop});
    e.registerEmitter({emitter: c, events: [u, f]})
}(jQuery, DevExpress), function(n, t) {
    var l = t.ui, o = t.utils, u = l.events, s = Math.abs, e = "dxclick", h = 10, c = function(t) {
        return n(t).is("input, textarea, select, button, :focus, :focus *")
    }, f = u.Emitter.inherit({ctor: function(t) {
            this.callBase(t), this._makeElementClickable(n(t))
        }, _makeElementClickable: function(n) {
            n.attr("onclick") || n.attr("onclick", "void(0)")
        }, start: function(t) {
            this._$startTarget = n(t.target), this._startEventData = u.eventData(t)
        }, end: function(n) {
            if (this._eventOutOfElement(n, this.getElement().get(0)) || n.type === "dxpointercancel") {
                this._cancel(n);
                return
            }
            this._accept(n), this._fireClickEvent(n)
        }, _eventOutOfElement: function(t, i) {
            var r = t.target, e = !n.contains(i, r) && i !== r, f = u.eventDelta(u.eventData(t), this._startEventData), o = s(f.x) > h || s(f.y) > h;
            return e || o
        }, _fireClickEvent: function(t) {
            t = this._fireEvent(e, t, {target: this._getClickTarget(this._$startTarget, n(t.target))}), c(t.target) || t.dxPreventBlur || o.resetActiveElement()
        }, _getClickTarget: function(n, t) {
            for (var r = n.parents().addBack(), u = t.parents().addBack(), f = Math.min(r.length, u.length) - 1, i = f; i >= 0; i--)
                if (r.eq(i).is(u.eq(i)))
                    return r.get(i)
        }});
    (function() {
        var s = t.devices.real().generic, i, r, o;
        if (s) {
            i = null, r = null, f = f.inherit({start: function() {
                    i = null, r = null
                }, end: n.noop, _fireClickEvent: function() {
                    i = !0
                }, cancel: function() {
                    r = !0
                }}), o = function(n) {
                n.which && n.which != 1 || r && !i || u.fireEvent({type: e, originalEvent: n})
            };
            n(document).on(u.addNamespace("click", "NATIVE_DXCLICK_STRATEGY"), o)
        }
    })(), function() {
        var i = function() {
            var n = t.devices.real();
            return n.platform === "ios" && n.version[0] === 7
        }();
        i && (f = f.inherit({_fireClickEvent: function(i) {
                var r = n(i.target), u = this.callBase, f = arguments;
                t.requestAnimationFrame(n.proxy(function() {
                    while (r.length) {
                        if (r.data("dxGestureLock"))
                            return;
                        r = r.parent()
                    }
                    u.apply(this, f)
                }, this))
            }}))
    }(), function() {
        var t = null, r = function(n) {
            t = n.target
        }, f = function(i) {
            var r = n(i.target);
            t && !r.is(t) && !n(t).is("label") && c(r) && o.resetActiveElement(), t = null
        }, i = "NATIVE_CLICK_FIXER";
        n(document).on(u.addNamespace("dxpointerdown", i), r).on(u.addNamespace("click", i), f)
    }(), u.registerEmitter({emitter: f, bubble: !0, events: [e]})
}(jQuery, DevExpress, window), function(n, t) {
    var o = t.ui, r = o.events, u = Math.abs, f = "dxhold", s = 750, e = 5, h = r.Emitter.inherit({start: function(n) {
            this._startEventData = r.eventData(n), this._startTimer(n)
        }, _startTimer: function(t) {
            var i = "timeout"in this ? this.timeout : s;
            this._holdTimer = setTimeout(n.proxy(function() {
                this._accept(t), r.fireEvent({type: f, originalEvent: t})
            }, this), i)
        }, move: function(n) {
            this._touchWasMoved(n) && this._cancel(n)
        }, _touchWasMoved: function(n) {
            var t = r.eventDelta(this._startEventData, r.eventData(n));
            return u(t.x) > e || u(t.y) > e
        }, end: function() {
            this._stopTimer()
        }, _stopTimer: function() {
            clearTimeout(this._holdTimer)
        }, cancel: function() {
            this._stopTimer()
        }});
    r.registerEmitter({emitter: h, bubble: !0, events: [f]})
}(jQuery, DevExpress), function(n, t) {
    var c = t.ui, u = t.utils, r = c.events, o = t.devices, s = Math.abs, h = 0, f = 1, e = 2, l = 10, a = 0, v = 180, y = r.Emitter.inherit({getDirection: function() {
            return this.direction
        }, _cancel: function(n) {
            this.callBase(n), this._togglePointerEvents(!0), this._stage = h
        }, start: function(n) {
            if (r.needSkipEvent(n)) {
                this._cancel(n);
                return
            }
            this._startEvent = r.createEvent(n), this._startEventData = r.eventData(n), this._prevEventData = this._startEventData, this._stage = f, this._init(n), this._setupImmediateTimer()
        }, _setupImmediateTimer: function() {
            (clearTimeout(this._immediateTimer), this._immedeateAccepted = !1, this.immediate) && (this._immediateTimer = setTimeout(n.proxy(function() {
                this._immedeateAccepted = !0
            }, this), v))
        }, move: function(n) {
            this._stage === f && this._directionConfirmed(n) && (this._accept(n), this._resetActiveElement(), this._togglePointerEvents(!1), this._clearSelection(n), this._stage = e, this._adjustStartEvent(n), this._start(this._startEvent), this._prevEventData = r.eventData(this._startEvent)), this._stage === e && this._move(n), this._prevEventData = r.eventData(n)
        }, _directionConfirmed: function(n) {
            var i = this._getTouchBoundary(n), u = r.eventDelta(this._startEventData, r.eventData(n)), f = s(u.x), e = s(u.y), o = this._validateMove(i, f, e), h = this._validateMove(i, e, f), t = this.getDirection(n), c = t === "both" && (o || h), l = t === "horizontal" && o, a = t === "vertical" && h;
            return c || l || a || this._immedeateAccepted
        }, _validateMove: function(n, t, i) {
            return t && t >= n && (this.immediate ? t >= i : !0)
        }, _getTouchBoundary: function(n) {
            return this.immediate || n.type === "dxmousewheel" ? a : l
        }, _adjustStartEvent: function(n) {
            var t = this._getTouchBoundary(n), i = r.eventDelta(this._startEventData, r.eventData(n));
            this._startEvent.pageX += u.sign(i.x) * t, this._startEvent.pageY += u.sign(i.y) * t
        }, _resetActiveElement: function() {
            o.real().platform === "ios" && n(":focus", this.getElement()).length && u.resetActiveElement()
        }, _togglePointerEvents: function(t) {
            o.real().platform === "generic" && n("body").css("pointer-events", t ? "" : "none")
        }, _clearSelection: function(n) {
            n.type === "dxmousewheel" || r.isTouchEvent(n) || u.clearSelection()
        }, end: function(n) {
            this._togglePointerEvents(!0), this._stage === e ? this._end(n) : this._stage === f && this._stop(n), this._stage = h
        }, _init: n.noop, _start: n.noop, _move: n.noop, _stop: n.noop, _end: n.noop});
    n.extend(r, {GestureEmitter: y})
}(jQuery, DevExpress), function(n, t) {
    var a = t.ui, r = a.events, f = "dxscrollinit", e = "dxscrollstart", o = "dxscroll", s = "dxscrollend", h = "dxscrollstop", c = "dxscrollcancel", v = 100, y = 200, l = Math.round(1e3 / 60), u = "dxGestureLock", p = 200, w = r.GestureEmitter.inherit({ctor: function(t) {
            this.callBase(t), this.direction = "both";
            n(t).on("scroll", n.proxy(this._treatScroll, this))
        }, _treatScroll: function() {
            this._prepareGesture(), this._forgetGesture()
        }, _prepareGesture: function() {
            this._gestureEndTimer ? (clearTimeout(this._gestureEndTimer), this._gestureEndTimer = null) : this.getElement().data(u, !0)
        }, _forgetGesture: function() {
            this._gestureEndTimer = setTimeout(n.proxy(function() {
                this.getElement().data(u, !1), this._gestureEndTimer = null
            }, this), p)
        }, _init: function(n) {
            this.getElement().data(u) && this._accept(n), this._fireEvent(f, n)
        }, move: function(n) {
            this.callBase.apply(this, arguments), n.isScrollingEvent = this.isNative
        }, _start: function(n) {
            this._savedEventData = r.eventData(n), this._fireEvent(e, n, {delta: r.eventDelta(this._savedEventData, r.eventData(n))})
        }, _move: function(n) {
            var t = r.eventData(n), i;
            this._fireEvent(o, n, {delta: r.eventDelta(this._prevEventData, t)}), i = r.eventDelta(this._savedEventData, t), i.time > y && (this._savedEventData = this._prevEventData)
        }, _end: function(n) {
            var u = r.eventDelta(this._prevEventData, r.eventData(n)), i = {x: 0, y: 0}, t;
            u.time < v && (t = r.eventDelta(this._savedEventData, this._prevEventData), i = {x: t.x * l / t.time, y: t.y * l / t.time}), this._fireEvent(s, n, {velocity: i})
        }, _stop: function(n) {
            this._fireEvent(h, n)
        }, cancel: function(n) {
            this._fireEvent(c, n)
        }, dispose: function() {
            this.getElement().off("scroll")
        }});
    r.registerEmitter({emitter: w, events: [f, e, o, s, h, c]})
}(jQuery, DevExpress), function(n, t) {
    var o = t.ui, a = t.utils, r = o.events, u = "dxswipestart", f = "dxswipe", e = "dxswipeend", s = {defaultItemSizeFunc: function() {
            return this.getElement().width()
        }, getBounds: function() {
            return[this._maxLeftOffset, this._maxRightOffset]
        }, calcOffsetRatio: function(n) {
            var t = r.eventData(n);
            return(t.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, n)
        }, isFastSwipe: function(n) {
            var t = r.eventData(n);
            return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(t.x - this._tickData.x) >= t.time - this._tickData.time
        }}, h = {defaultItemSizeFunc: function() {
            return this.getElement().height()
        }, getBounds: function() {
            return[this._maxTopOffset, this._maxBottomOffset]
        }, calcOffsetRatio: function(n) {
            var t = r.eventData(n);
            return(t.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, n)
        }, isFastSwipe: function(n) {
            var t = r.eventData(n);
            return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(t.y - this._tickData.y) >= t.time - this._tickData.time
        }}, c = {horizontal: s, vertical: h}, l = r.GestureEmitter.inherit({TICK_INTERVAL: 300, FAST_SWIPE_SPEED_LIMIT: 5, ctor: function(n) {
            this.callBase(n), this.direction = "horizontal", this.elastic = !0
        }, _getStrategy: function() {
            return c[this.direction]
        }, _defaultItemSizeFunc: function() {
            return this._getStrategy().defaultItemSizeFunc.call(this)
        }, _itemSizeFunc: function() {
            return this.itemSizeFunc || this._defaultItemSizeFunc
        }, _start: function(n) {
            this._savedEventData = r.eventData(n), this._tickData = {time: 0}, n = this._fireEvent(u, n), n.cancel || (this._maxLeftOffset = n.maxLeftOffset, this._maxRightOffset = n.maxRightOffset, this._maxTopOffset = n.maxTopOffset, this._maxBottomOffset = n.maxBottomOffset)
        }, _move: function(n) {
            var u = this._getStrategy(), i = r.eventData(n), t = u.calcOffsetRatio.call(this, n);
            t = this._fitOffset(t, this.elastic), i.time - this._tickData.time > this.TICK_INTERVAL && (this._tickData = i), this._fireEvent(f, n, {offset: t}), n.preventDefault()
        }, _end: function(n) {
            var r = this._getStrategy(), u = r.calcOffsetRatio.call(this, n), f = r.isFastSwipe.call(this, n), t = u, i = this._calcTargetOffset(u, f);
            t = this._fitOffset(t, this.elastic), i = this._fitOffset(i, !1), this._fireEvent(e, n, {offset: t, targetOffset: i})
        }, _fitOffset: function(n, t) {
            var r = this._getStrategy(), i = r.getBounds.call(this);
            return n < -i[0] ? t ? (-2 * i[0] + n) / 3 : -i[0] : n > i[1] ? t ? (2 * i[1] + n) / 3 : i[1] : n
        }, _calcTargetOffset: function(n, t) {
            var i;
            return t ? (i = Math.ceil(Math.abs(n)), n < 0 && (i = -i)) : i = Math.round(n), i
        }});
    r.registerEmitter({emitter: l, events: [u, f, e]})
}(jQuery, DevExpress), function(n, t) {
    var y = t.ui, p = t.utils, r = y.events, w = p.wrapToArray, c = "dxdragstart", l = "dxdrag", a = "dxdragend", f = "dxdragenter", e = "dxdragleave", o = "dxdrop", u = [], s = [], h = {setup: function(t, i) {
            var r = n.inArray(t, u) !== -1;
            r || (u.push(t), s.push(i || {}))
        }, teardown: function(t) {
            var c = n._data(t, "events"), h = 0, r;
            n.each([f, e, o], function(n, t) {
                var i = c[t];
                i && (h += i.length)
            }), h || (r = n.inArray(t, u), u.splice(r, 1), s.splice(r, 1))
        }};
    r.registerEvent(f, h), r.registerEvent(e, h), r.registerEvent(o, h);
    var v = function(t) {
        var i = n.inArray(t.get(0), u);
        return s[i]
    }, b = function(n) {
        var t = v(n);
        return t.itemPositionFunc ? t.itemPositionFunc() : n.offset()
    }, k = function(n) {
        var t = v(n);
        return t.itemSizeFunc ? t.itemSizeFunc() : {width: n.width(), height: n.height()}
    }, d = r.GestureEmitter.inherit({ctor: function(n) {
            this.callBase(n), this.direction = "both"
        }, _init: function(n) {
            this._initEvent = n
        }, _start: function(t) {
            t = this._fireEvent(c, this._initEvent), this._maxLeftOffset = t.maxLeftOffset, this._maxRightOffset = t.maxRightOffset, this._maxTopOffset = t.maxTopOffset, this._maxBottomOffset = t.maxBottomOffset;
            var i = w(t.targetElements || u);
            this._$dropTargetElements = n.map(i, function(t) {
                return n(t)
            })
        }, _move: function(n) {
            var i = r.eventData(n), t = this._calculateOffset(i);
            this._fireEvent(l, n, {offset: t}), this._processDropTargets(n, t), n.preventDefault()
        }, _calculateOffset: function(n) {
            return{x: this._calculateXOffset(n), y: this._calculateYOffset(n)}
        }, _calculateXOffset: function(n) {
            if (this.direction !== "vertical") {
                var t = n.x - this._startEventData.x;
                return this._fitOffset(t, this._maxLeftOffset, this._maxRightOffset)
            }
            return 0
        }, _calculateYOffset: function(n) {
            if (this.direction !== "horizontal") {
                var t = n.y - this._startEventData.y;
                return this._fitOffset(t, this._maxTopOffset, this._maxBottomOffset)
            }
            return 0
        }, _fitOffset: function(n, t, i) {
            return t != null && (n = Math.max(n, -t)), i != null && (n = Math.min(n, i)), n
        }, _processDropTargets: function(n) {
            var i = this._findDropTarget(n), r = i === this._$currentDropTarget;
            r || (this._fireDropTargetEvent(n, e), this._$currentDropTarget = i, this._fireDropTargetEvent(n, f))
        }, _fireDropTargetEvent: function(n, t) {
            if (this._$currentDropTarget) {
                var i = {type: t, originalEvent: n, draggingElement: this._$element.get(0), target: this._$currentDropTarget.get(0)};
                r.fireEvent(i)
            }
        }, _findDropTarget: function(t) {
            var r = this, i;
            return n.each(this._$dropTargetElements, function(n, u) {
                if (r._checkDropTarget(u, t))
                    return i = u, !1
            }), i
        }, _checkDropTarget: function(n, t) {
            var u = n.get(0) === this._$element.get(0), i, r;
            return u ? !1 : (i = b(n), t.pageX < i.left) ? !1 : t.pageY < i.top ? !1 : (r = k(n), t.pageX > i.left + r.width) ? !1 : t.pageY > i.top + r.height ? !1 : n
        }, _end: function(n) {
            var t = r.eventData(n);
            this._fireEvent(a, n, {offset: this._calculateOffset(t)}), this._fireDropTargetEvent(n, o), delete this._$currentDropTarget
        }});
    r.registerEmitter({emitter: d, events: [c, l, a]})
}(jQuery, DevExpress), function(n, t) {
    var w = t.ui, o = t.utils, f = w.events, b = o.fitIntoRange, s = "dx", k = "transform", d = "translate", g = "zoom", nt = "rotate", h = "start", c = "", l = "end", e = [], r = function(n, t) {
        e.push({name: n, args: t})
    };
    r(k, {scale: !0, deltaScale: !0, rotation: !0, deltaRotation: !0, translation: !0, deltaTranslation: !0}), r(d, {translation: !0, deltaTranslation: !0}), r(g, {scale: !0, deltaScale: !0}), r(nt, {rotation: !0, deltaRotation: !0});
    var tt = function(n, t) {
        return{x: t.pageX - n.pageX, y: -t.pageY + n.pageY, centerX: (t.pageX + n.pageX) * .5, centerY: (t.pageY + n.pageY) * .5}
    }, a = function(n) {
        var t = n.pointers;
        return tt(t[0], t[1])
    }, u = function(n) {
        return Math.sqrt(n.x * n.x + n.y * n.y)
    }, v = function(n, t) {
        return u(n) / u(t)
    }, y = function(n, t) {
        var e = n.x * t.x + n.y * t.y, i = u(n) * u(t), r, f;
        return i === 0 ? 0 : (r = o.sign(n.x * t.y - t.x * n.y), f = Math.acos(b(e / i, -1, 1)), r * f)
    }, p = function(n, t) {
        return{x: n.centerX - t.centerX, y: n.centerY - t.centerY}
    }, it = f.Emitter.inherit({ctor: function(n) {
            this.callBase(n)
        }, validatePointers: function(n) {
            return f.hasTouches(n) > 1
        }, start: function(n) {
            this._accept();
            var t = a(n);
            this._startVector = t, this._prevVector = t, this._fireEventAliases(h, n)
        }, move: function(n) {
            var t = a(n), i = this._getEventArgs(t);
            this._fireEventAliases(c, n, i), this._prevVector = t
        }, end: function(n) {
            var t = this._getEventArgs(this._prevVector);
            this._fireEventAliases(l, n, t)
        }, _getEventArgs: function(n) {
            return{scale: v(n, this._startVector), deltaScale: v(n, this._prevVector), rotation: y(n, this._startVector), deltaRotation: y(n, this._prevVector), translation: p(n, this._startVector), deltaTranslation: p(n, this._prevVector)}
        }, _fireEventAliases: function(t, i, r) {
            r = r || {}, n.each(e, n.proxy(function(u, f) {
                var e = {};
                n.each(f.args, function(n) {
                    n in r && (e[n] = r[n])
                }), this._fireEvent(s + f.name + t, i, e)
            }, this))
        }});
    f.registerEmitter({emitter: it, events: n.map(e, function(t) {
            var i = [];
            return n.each([h, c, l], function(n, r) {
                i.push(s + t.name + r)
            }), i
        })})
}(jQuery, DevExpress), function(n, t) {
    var e = t.ui, r = e.events, o = t.support, u = "dxContexMenu", s = r.addNamespace("contextmenu", u), h = r.addNamespace("dxhold", u), f = "dxcontextmenu", c = t.Class.inherit({setup: function(i) {
            var u = n(i);
            u.on(s, n.proxy(this._contextMenuHandler, this));
            if (o.touch || t.devices.isSimulator())
                u.on(h, n.proxy(this._holdHandler, this))
        }, _holdHandler: function(n) {
            (!r.isMouseEvent(n) || t.devices.isSimulator()) && this._fireContextMenu(n)
        }, _contextMenuHandler: function(n) {
            n.preventDefault(), this._fireContextMenu(n)
        }, _fireContextMenu: function(n) {
            r.fireEvent({type: f, originalEvent: n})
        }, teardown: function(t) {
            n(t).off("." + u)
        }});
    r.registerEvent(f, new c)
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.ui, u = t.utils, f = r.events, e = "UIFeedback", h = "dx-widget", c = "dx-state-active", s = "dx-state-disabled", l = "dx-state-invisible", a = "dx-state-hover", o = "dx-state-focused", v = 30, y = 400, p = "dxhoverstart", w = "dxhoverend", b = "template", k = "[data-options*='dxTemplate']", d = "dxTemplates", g = r.TemplateBase.inherit({ctor: function(t, i) {
            this.callBase(n("<div>"), i), this._compile = t
        }, _renderCore: function(n, t, r) {
            n === i && t === i && (n = r, r = i);
            var u = t == i ? this._compile(n, r) : this._compile(n, t, r);
            return u.render(n, r, t)
        }, _shouldAppend: !1}), nt = r.TemplateBase.inherit({ctor: function() {
            this.callBase(n("<div>"))
        }, _renderCore: function() {
            return n()
        }});
    r.Widget = t.DOMComponent.inherit({NAME: "Widget", _supportedKeys: function() {
            return{}
        }, _setDeprecatedOptions: function() {
            this.callBase(), n.extend(this._deprecatedOptions, {contentReadyAction: {since: "14.2", alias: "onContentReady"}})
        }, _setDefaultOptions: function() {
            this.callBase(), this.option({disabled: !1, visible: !0, hint: i, activeStateEnabled: !1, width: i, height: i, onContentReady: null, hoverStateEnabled: !1, focusStateEnabled: !1, tabIndex: 0, _keyboardProcessor: i, _focusEventPropagation: !1})
        }, _init: function() {
            this.callBase(), this._feedbackShowTimeout = v, this._feedbackHideTimeout = y, this._templatesSupported() && (this._initTemplates(), this._dynamicTemplates = {}, this._initContentReadyAction())
        }, _eventBindingTarget: function() {
            return this.element()
        }, _templatesSupported: function() {
            return this._renderContentImpl !== t.abstract
        }, _initTemplates: function() {
            var f = {}, o = this.element().data(d), e = o || this.element().contents().filter(k), i;
            this._templateProvider = this.option("templateProvider") || new r.TemplateProvider, e.length ? (i = {}, e.each(function() {
                var n = u.getElementOptions(this).dxTemplate;
                if (n) {
                    if (!n.name)
                        throw t.Error("E0023");
                    i[n.name] = i[n.name] || [], i[n.name].push(this)
                }
            }), n.each(i, n.proxy(function(n, t) {
                var i = this._findTemplateByDevice(t);
                i && (f[n] = this._createTemplate(i))
            }, this))) : f[this._getAnonimousTemplateName()] = this._createTemplate(this.element().contents()), this.option("_templates", f)
        }, _getAnonimousTemplateName: function() {
            return b
        }, _getTemplateByOption: function(n) {
            return this._getTemplate(this.option(n))
        }, _getTemplate: function(t) {
            return n.isFunction(t) ? new g(n.proxy(function() {
                var n = t.apply(this, arguments);
                return u.isDefined(n) ? this._acquireTemplate(n) : new nt
            }, this)) : this._acquireTemplate(t)
        }, _acquireTemplate: function(t) {
            var i, f, e;
            return t == null ? this._createTemplate(u.stringToJquery(t)) : t instanceof r.TemplateBase ? t : t.nodeType || t.jquery ? (t = n(t), this._createTemplate(t)) : typeof t == "string" ? (i = this.option("_templates")[t], i) ? i : (f = this._dynamicTemplates[t], f) ? f : (e = this._templateProvider.getTemplates(this)[t], e) ? e : this._createTemplate(u.stringToJquery(t)) : this._acquireTemplate(t.toString())
        }, _createTemplate: function(n) {
            return this._templateProvider.createTemplate(n, this)
        }, _findTemplateByDevice: function(i) {
            var r = t.utils.findBestMatches(t.devices.current(), i, function(n) {
                return u.getElementOptions(n).dxTemplate
            })[0];
            return n.each(i, function(t, i) {
                i !== r && n(i).remove()
            }), r
        }, _cleanTemplates: function() {
            var t = this;
            n.each(this.option("_templates"), function(n, i) {
                t === i.owner() && i.dispose()
            })
        }, _initContentReadyAction: function() {
            this._contentReadyAction = this._createActionByOption("onContentReady", {excludeValidators: ["designMode", "disabled"]})
        }, _render: function() {
            this.callBase(), this.element().addClass(h), this._toggleDisabledState(this.option("disabled")), this._toggleVisibility(this.option("visible")), this._renderHint(), this._renderDimensions(), this._templatesSupported() && this._renderContent(), this._renderFocusState(), this._attachFeedbackEvents(), this._attachHoverEvents()
        }, _renderHint: function() {
            this.option("hint") ? this.element().attr("title", this.option("hint")) : this.element().removeAttr("title")
        }, _renderContent: function() {
            this._renderContentImpl(), this._fireContentReadyAction()
        }, _renderContentImpl: t.abstract, _fireContentReadyAction: function() {
            this._contentReadyAction({excludeValidators: ["disabled"]})
        }, _dispose: function() {
            this._templatesSupported() && this._cleanTemplates(), this._contentReadyAction = null, this.callBase()
        }, _clean: function() {
            this._cleanFocusState(), this.callBase(), this.element().empty()
        }, _toggleVisibility: function(n) {
            this.element().toggleClass(l, !n)
        }, _renderFocusState: function() {
            this.option("focusStateEnabled") && !this.option("disabled") && (this._renderFocusTarget(), this._attachFocusEvents(), this._attachKeyboardEvents())
        }, _focusTarget: function() {
            return this._getActiveElement()
        }, _getActiveElement: function() {
            var n = this._eventBindingTarget();
            return this._activeStateUnit && (n = n.find(this._activeStateUnit).not("." + s)), n
        }, _renderFocusTarget: function() {
            this._focusTarget().attr("tabindex", this.option("tabIndex"))
        }, _attachFocusEvents: function() {
            var u = this._focusTarget(), i = this, r = new t.Action(function(n) {
                var r = n.value, t = n.event;
                r ? i._focusInHandler(t) : i._focusOutHandler(t)
            });
            u.on("focusin", function(t) {
                r.execute({element: n(t.target), event: t, value: !0})
            }).on("focusout", function(t) {
                r.execute({element: n(t.target), event: t, value: !1})
            })
        }, _focusInHandler: function(t) {
            this.option("_focusEventPropagation") || t.stopPropagation(), n(t.currentTarget).addClass(o)
        }, _focusOutHandler: function(t) {
            this.option("_focusEventPropagation") || t.stopPropagation(), n(t.currentTarget).removeClass(o)
        }, _attachKeyboardEvents: function() {
            var n = this.option("_keyboardProcessor") || new r.KeyboardProcessor({element: this._eventBindingTarget()});
            this._keyboardProcessor = n.reinitialize(this._keyboardHandler, this)
        }, _keyboardHandler: function(t) {
            var f = t.originalEvent, e = t.key, o = this._supportedKeys(), r = o[e], u;
            return r !== i ? (u = n.proxy(r, this), u(f) || !1) : !0
        }, _refreshFocusState: function() {
            this._cleanFocusState(), this._renderFocusState()
        }, _cleanFocusState: function() {
            var n = this._focusTarget();
            n.off("focusin").off("focusout"), n.removeClass(o), n.removeAttr("tabindex"), this._keyboardProcessor && this._keyboardProcessor.dispose()
        }, _attachHoverEvents: function() {
            var i = this, r = i._activeStateUnit, u = f.addNamespace(p, e), o = f.addNamespace(w, e), s;
            if (i._eventBindingTarget().off(u, r).off(o, r), i.option("hoverStateEnabled")) {
                s = new t.Action(function(n) {
                    var t = n.element;
                    i._refreshHoveredElement(t)
                });
                i._eventBindingTarget().on(u, r, function(t) {
                    s.execute({element: n(t.target)})
                }).on(o, r, function() {
                    i._forgetHoveredElement()
                })
            } else
                i._toggleHoverClass(!1)
        }, _attachFeedbackEvents: function() {
            var i = this, r = i._activeStateUnit, u = f.addNamespace("dxactive", e), o = f.addNamespace("dxinactive", e);
            if (i._eventBindingTarget().off(u, r).off(o, r), i.option("activeStateEnabled")) {
                var s = function(n) {
                    var t = n.element, r = n.value;
                    i._toggleActiveState(t, r)
                }, h = new t.Action(function(n) {
                    s(n)
                }), c = new t.Action(function(n) {
                    s(n)
                }, {excludeValidators: ["disabled"]});
                i._eventBindingTarget().on(u, r, {timeout: i._feedbackShowTimeout}, function(t) {
                    h.execute({element: n(t.currentTarget), value: !0})
                }).on(o, r, {timeout: i._feedbackHideTimeout}, function(t) {
                    c.execute({element: n(t.currentTarget), value: !1})
                })
            }
        }, _toggleActiveState: function(n, t) {
            this._toggleHoverClass(!t), n.toggleClass(c, t)
        }, _refreshHoveredElement: function(n) {
            var t = this._activeStateUnit || this.element();
            this._forgetHoveredElement(), this._hoveredElement = n.closest(t), this._toggleHoverClass(!0)
        }, _forgetHoveredElement: function() {
            this._toggleHoverClass(!1), delete this._hoveredElement
        }, _toggleHoverClass: function(n) {
            this._hoveredElement && this._hoveredElement.toggleClass(a, n && this.option("hoverStateEnabled"))
        }, _renderDimensions: function() {
            var t = this.option("width"), i = this.option("height"), n = this.element();
            n.outerWidth(t), n.outerHeight(i)
        }, _toggleDisabledState: function(n) {
            this.element().toggleClass(s, Boolean(n)), this._toggleHoverClass(!n)
        }, _setWidgetOption: function(t, i) {
            var r, u, f;
            if (this[t]) {
                if (n.isPlainObject(i[0])) {
                    n.each(i[0], n.proxy(function(n, i) {
                        this._setWidgetOption(t, [n, i])
                    }, this));
                    return
                }
                r = i[0], u = i[1], i.length === 1 && (u = this.option(r)), f = this[t + "OptionMap"], this[t].option(f ? f(r) : r, u)
            }
        }, _optionChanged: function(n) {
            switch (n.name) {
                case"disabled":
                    this._toggleDisabledState(n.value), this._attachFeedbackEvents(), this._refreshFocusState();
                    break;
                case"hint":
                    this._renderHint();
                    break;
                case"activeStateEnabled":
                    this._attachFeedbackEvents();
                    break;
                case"hoverStateEnabled":
                    this._attachHoverEvents();
                    break;
                case"tabIndex":
                case"_keyboardProcessor":
                case"focusStateEnabled":
                    this._refreshFocusState();
                    break;
                case"visible":
                    this._toggleVisibility(n.value);
                    break;
                case"width":
                case"height":
                    this._renderDimensions();
                    break;
                case"onContentReady":
                    this._initContentReadyAction();
                    break;
                case"_templates":
                    this._refresh();
                    break;
                case"_focusEventPropagation":
                    break;
                default:
                    this.callBase(n)
                }
        }, repaint: function() {
            this._refresh()
        }, focus: function() {
            this._focusTarget().focus()
        }})
}(jQuery, DevExpress), function(n, t, i) {
    var r = t.ui, u = "dx-state-readonly", f = "dx-invalid", e = "dx-invalid-message", o = "dx-invalid-message-auto", s = "dx-invalid-message-always";
    r.validation = r.validation || {}, r.validation.findGroup = function() {
        var n = this.option("validationGroup"), t;
        return n || (t = this.element().parents(".dx-validation-group:first"), n = t.length ? t.dxValidationGroup("instance") : this._modelByElement(this.element())), n
    }, r.Editor = r.Widget.inherit({_init: function() {
            this.callBase(), this.validationRequest = n.Callbacks();
            var t = this.element();
            if (t) {
                t.data("dx-validation-target", this);
                this.on("disposing", function() {
                    t.data("dx-validation-target", null)
                })
            }
        }, _setDeprecatedOptions: function() {
            this.callBase(), n.extend(this._deprecatedOptions, {valueChangeAction: {since: "14.2", alias: "onValueChanged"}})
        }, _setDefaultOptions: function() {
            this.callBase(), this.option({value: i, onValueChanged: null, activeStateEnabled: !0, readOnly: !1, isValid: !0, validationError: i, validationMessageMode: "auto", validationTooltipOffset: {h: 9, v: -1}})
        }, _defaultOptionsRules: function() {
            return this.callBase().concat([{device: function(n) {
                        return n.platform === "android" && n.version[0] > 4
                    }, options: {invalidTooltipOffset: {h: 9, v: -7}}}, {device: {platform: "win8"}, options: {invalidTooltipOffset: {h: 9, v: -4}}}])
        }, _createValueChangeAction: function() {
            this._valueChangeAction = this._createActionByOption("onValueChanged")
        }, _suppressValueChangeAction: function() {
            this._valueChangeActionSuppressed = !0
        }, _resumeValueChangeAction: function() {
            this._valueChangeActionSuppressed = !1
        }, _render: function() {
            this._createValueChangeAction(), this._renderValidationState(), this._toggleReadOnlyState(), this.callBase()
        }, _raiseValueChangeAction: function(n, t) {
            this._valueChangeAction(this._valueChangeArgs(n, t))
        }, _valueChangeArgs: function(n, t) {
            return{value: n, previousValue: t, jQueryEvent: this._valueChangeEventInstance}
        }, _renderValidationState: function() {
            var i = this.option("isValid"), r = this.option("validationError"), u = this.option("validationMessageMode"), t = this.element();
            t.toggleClass(f, !i), this._$validationMessage && (this._$validationMessage.remove(), this._$validationMessage = null), !i && r && (this._$validationMessage = n("<div/>", {"class": e}).text(r.message).appendTo(t).dxTooltip({target: t, container: t, position: this._getValidationTooltipPosition("below"), closeOnOutsideClick: !1, closeOnTargetScroll: !1, animation: null, visible: !0, rtlEnabled: this.option("rtlEnabled")}), this._$validationMessage.toggleClass(o, u === "auto").toggleClass(s, u === "always"))
        }, _getValidationTooltipPosition: function(n) {
            var i = this.option("rtlEnabled"), r = i ? "right" : "left", u = this.option("validationTooltipOffset"), t = {h: u.h, v: u.v}, f = n === "below" ? [" top", " bottom"] : [" bottom", " top"];
            return i && (t.h = -t.h), n !== "below" && (t.v = -t.v), {offset: t, my: r + f[0], at: r + f[1]}
        }, _toggleReadOnlyState: function() {
            this.element().toggleClass(u, this.option("readOnly"))
        }, _optionChanged: function(n) {
            switch (n.name) {
                case"onValueChanged":
                    this._createValueChangeAction();
                    break;
                case"isValid":
                case"validationError":
                case"validationMessageMode":
                    this._renderValidationState();
                    break;
                case"readOnly":
                    this._toggleReadOnlyState();
                    break;
                case"value":
                    this._valueChangeActionSuppressed || this._raiseValueChangeAction(n.value, n.previousValue), this._valueChangeEventInstance = i, this.validationRequest && this.validationRequest.fire({value: n.value, editor: this});
                    break;
                default:
                    this.callBase(n)
                }
        }})
}(jQuery, DevExpress), function(n, t) {
    var r = t.ui, h = t.utils, f = r.events, w = "dx-collection", u = "dx-item", c = "-content", l = "dx-item-content-placeholder", b = "dxItemData", k = "tmpl-", d = "[data-options*='dxItem']", g = "dx-item-selected", e = "dx-state-focused", nt = "dx-item-response-wait", tt = "dx-empty-collection", o = "up", s = "down", a = "left", v = "right", it = "pageup", rt = "pagedown", y = "last", p = "first", ut = r.Widget.inherit({NAME: "CollectionWidget", _activeStateUnit: "." + u, _supportedKeys: function() {
            var i = function(n) {
                var t = this._$focusedItem;
                t && (n.target = t, n.currentTarget = t, this._itemClickHandler(n))
            }, t = function(n, t) {
                t.preventDefault(), t.stopPropagation(), this._moveFocus(n)
            };
            return n.extend(this.callBase(), {space: i, enter: i, leftArrow: n.proxy(t, this, a), rightArrow: n.proxy(t, this, v), upArrow: n.proxy(t, this, o), downArrow: n.proxy(t, this, s), pageUp: n.proxy(t, this, o), pageDown: n.proxy(t, this, s), home: n.proxy(t, this, p), end: n.proxy(t, this, y)})
        }, _setDeprecatedOptions: function() {
            this.callBase(), n.extend(this._deprecatedOptions, {itemClickAction: {since: "14.2", alias: "onItemClick"}, itemHoldAction: {since: "14.2", alias: "onItemHold"}, itemRenderedAction: {since: "14.2", alias: "onItemRendered"}, itemRender: {since: "14.2", alias: "itemTemplate"}})
        }, _setDefaultOptions: function() {
            this.callBase(), this.option({selectOnFocus: !1, loopItemFocus: !0, items: [], itemTemplate: "item", onItemRendered: null, onItemClick: null, onItemHold: null, itemHoldTimeout: 750, onItemContextMenu: null, noDataText: Globalize.localize("dxCollectionWidget-noDataText"), dataSource: null, itemTemplateProperty: "template"})
        }, _init: function() {
            this.callBase(), this._cleanRenderedItems(), this._refreshDataSource()
        }, _initTemplates: function() {
            this._initItemsFromMarkup(), this.callBase()
        }, _initItemsFromMarkup: function() {
            var t = this.element().contents().filter(d), i;
            t.length && !this.option("items").length && (i = n.map(t, n.proxy(function(t) {
                var i = n(t), r = h.getElementOptions(t).dxItem, u = n.trim(i.html()) && !r.template;
                return u ? r.template = this._prepareItemTemplate(i) : i.remove(), r
            }, this)), this.option("items", i))
        }, _prepareItemTemplate: function(n) {
            var i = k + new t.data.Guid, r = "dxTemplate: { name: '" + i + "' }";
            return n.attr("data-options", r).data("options", r), i
        }, _dataSourceOptions: function() {
            var t = {paginate: !1, _preferSync: !1};
            return n.isArray(this.option("dataSource")) && (t._preferSync = !0), t
        }, _cleanRenderedItems: function() {
            this._renderedItemsCount = 0
        }, _focusTarget: function() {
            return this.element()
        }, _focusElementClass: function() {
            return this._itemClass()
        }, _focusInHandler: function(t) {
            var i, r, u;
            if (this.callBase.apply(this, arguments), i = this._focusElementClass(), r = n(t.target).closest("." + i), r.hasClass(i)) {
                this._resetFocusedItem(r);
                return
            }
            u = this._getActiveItem(), this._setFocusedItem(u.closest("." + i))
        }, _focusOutHandler: function() {
            this.callBase.apply(this, arguments);
            var t = this._$focusedItem;
            t && t.removeClass(e)
        }, _getActiveItem: function(n) {
            var t = this.option("selectedIndex"), i = this._getActiveElement(), r = i.length - 1;
            return t < 0 && (t = n ? r : 0), this._$focusedItem || i.eq(t)
        }, _renderFocusTarget: function() {
            this.callBase.apply(this, arguments);
            var n = this._getActiveElement();
            n.attr("tabindex", -1), this.element().attr("aria-activedescendant", "active")
        }, _moveFocus: function(n) {
            var t = this._itemElements().filter(":visible").not(".dx-state-disabled"), i;
            switch (n) {
                case it:
                case o:
                    i = this._prevItem(t);
                    break;
                case rt:
                case s:
                    i = this._nextItem(t);
                    break;
                case v:
                    i = this.option("rtlEnabled") ? this._prevItem(t) : this._nextItem(t);
                    break;
                case a:
                    i = this.option("rtlEnabled") ? this._nextItem(t) : this._prevItem(t);
                    break;
                case p:
                    i = t.first();
                    break;
                case y:
                    i = t.last();
                    break;
                default:
                    return!1
            }
            this._resetFocusedItem(i, !0)
        }, _prevItem: function(t) {
            var r = this._getActiveItem(), u = t.index(r), f = t.last(), i = n(t[u - 1]), e = this.option("loopItemFocus");
            return i.length === 0 && e && (i = f), i
        }, _nextItem: function(t) {
            var r = this._getActiveItem(!0), u = t.index(r), f = t.first(), i = n(t[u + 1]), e = this.option("loopItemFocus");
            return i.length === 0 && e && (i = f), i
        }, _setFocusedItem: function(n, t) {
            n && n.length && (this._$focusedItem = n, n.attr("id", "active"), n.addClass(e), this.option("selectOnFocus") && t && this._selectFocusedItem(n))
        }, _selectFocusedItem: function(n) {
            this.selectItem(n)
        }, _removeFocusedItem: function() {
            var n = this._$focusedItem;
            n && (n.removeClass(e), n.removeAttr("id"))
        }, _resetFocusedItem: function(n, t) {
            n.length && (this._removeFocusedItem(), this._setFocusedItem(n, t))
        }, _optionChanged: function(n) {
            switch (n.name) {
                case"items":
                case"itemTemplateProperty":
                    this._cleanRenderedItems(), this._invalidate();
                    break;
                case"dataSource":
                    this._refreshDataSource(), this._dataSource || this.option("items", []), this._renderEmptyMessage();
                    break;
                case"noDataText":
                    this._renderEmptyMessage();
                    break;
                case"itemTemplate":
                    this._invalidate();
                    break;
                case"onItemRendered":
                    this._createItemRenderAction();
                    break;
                case"onItemClick":
                    break;
                case"onItemHold":
                case"itemHoldTimeout":
                    this._attachHoldEvent();
                    break;
                case"onItemContextMenu":
                    this._attachContextMenuEvent();
                    break;
                case"selectOnFocus":
                case"loopItemFocus":
                    break;
                default:
                    this.callBase(n)
                }
        }, _expectNextPageLoading: function() {
            this._startIndexForAppendedItems = 0
        }, _expectLastItemLoading: function() {
            this._startIndexForAppendedItems = -1
        }, _forgetNextPageLoading: function() {
            this._startIndexForAppendedItems = null
        }, _dataSourceChangedHandler: function(n) {
            var t = this.option("items");
            this._initialized && t && this._shouldAppendItems() ? (this._renderedItemsCount = t.length, this._dataSource.isLastPage() && this._startIndexForAppendedItems === -1 || (this.option().items = t.concat(n.slice(this._startIndexForAppendedItems))), this._renderContent(), this._renderFocusTarget()) : this.option("items", n)
        }, _dataSourceLoadErrorHandler: function() {
            this._forgetNextPageLoading()
        }, _shouldAppendItems: function() {
            return this._startIndexForAppendedItems != null && this._allowDinamicItemsAppend()
        }, _allowDinamicItemsAppend: function() {
            return!1
        }, _clean: function() {
            this._cleanFocusState(), this._itemContainer().empty()
        }, _refresh: function() {
            this._cleanRenderedItems(), this.callBase.apply(this, arguments)
        }, _itemContainer: function() {
            return this.element()
        }, _itemClass: function() {
            return u
        }, _selectedItemClass: function() {
            return g
        }, _itemResponseWaitClass: function() {
            return nt
        }, _itemSelector: function() {
            return"." + this._itemClass()
        }, _itemDataKey: function() {
            return b
        }, _itemElements: function() {
            return this._itemContainer().find(this._itemSelector())
        }, _render: function() {
            this.callBase(), this.element().addClass(w), this._attachClickEvent(), this._attachHoldEvent(), this._attachContextMenuEvent()
        }, _attachClickEvent: function() {
            var t = this._itemSelector(), i = f.addNamespace("dxclick", this.NAME);
            this._itemContainer().off(i, t).on(i, t, n.proxy(this._itemClickHandler, this))
        }, _itemClickHandler: function(n) {
            this._itemJQueryEventHandler(n, "onItemClick")
        }, _attachHoldEvent: function() {
            var t = this._itemContainer(), i = this._itemSelector(), r = f.addNamespace("dxhold", this.NAME);
            if (t.off(r, i), this._shouldAttachHoldEvent())
                t.on(r, i, {timeout: this._getHoldTimeout()}, n.proxy(this._itemHoldHandler, this))
        }, _getHoldTimeout: function() {
            return this.option("itemHoldTimeout")
        }, _shouldAttachHoldEvent: function() {
            return this.option("onItemHold")
        }, _itemHoldHandler: function(n) {
            this._itemJQueryEventHandler(n, "onItemHold")
        }, _attachContextMenuEvent: function() {
            var t = this._itemContainer(), i = this._itemSelector(), r = f.addNamespace("dxcontextmenu", this.NAME);
            if (t.off(r, i), this._shouldAttachContextMenuEvent())
                t.on(r, i, n.proxy(this._itemContextMenuHandler, this))
        }, _shouldAttachContextMenuEvent: function() {
            return this.option("onItemContextMenu")
        }, _itemContextMenuHandler: function(n) {
            this._itemJQueryEventHandler(n, "onItemContextMenu")
        }, _renderContentImpl: function() {
            var n = this.option("items") || [];
            this._renderedItemsCount ? this._renderItems(n.slice(this._renderedItemsCount)) : this._renderItems(n)
        }, _renderItems: function(t) {
            t.length && n.each(t, n.proxy(this._renderItem, this)), this._renderEmptyMessage()
        }, _renderItem: function(n, t, i) {
            var r, u;
            return i = i || this._itemContainer(), r = this._renderItemFrame(n, t, i), this._setElementData(r, t), u = r.find("." + l), u.removeClass(l), u = this._renderItemContent(n, t, u), this._postprocessRenderItem({itemElement: r, itemContent: u, itemData: t, itemIndex: n}), this._executeItemRenderAction(t, r), r
        }, _renderItemContent: function(n, t, i) {
            var u = t && t.node, f = this._getItemTemplateName(t), e = this._getTemplate(f, t, n, i), o = {index: n, item: t, container: i}, r;
            return u ? (i.replaceWith(u), i = u, this._addItemContentClasses(i, t)) : (this._addItemContentClasses(i, t), r = this._createItemByTemplate(e, o), r.length && (i.replaceWith(r), i = r, this._addItemContentClasses(i, t))), i
        }, _addItemContentClasses: function(n) {
            n.addClass(u + c), n.addClass(this._itemClass() + c)
        }, _renderItemFrame: function(n, t, i) {
            var u = this._templateProvider.getTemplates(this).itemFrame, r = u.render(h.isDefined(t) ? t : {}, i, n);
            return r.appendTo(i), r
        }, _postprocessRenderItem: n.noop, _executeItemRenderAction: function(n, t) {
            this._getItemRenderAction()({itemElement: t, itemData: n})
        }, _setElementData: function(n, t) {
            n.addClass(u).addClass(this._itemClass()).data(this._itemDataKey(), t)
        }, _createItemRenderAction: function() {
            return this._itemRenderAction = this._createActionByOption("onItemRendered", {element: this.element(), excludeValidators: ["designMode", "disabled"]})
        }, _getItemRenderAction: function() {
            return this._itemRenderAction || this._createItemRenderAction()
        }, _getItemTemplateName: function(n) {
            var t = this.option("itemTemplateProperty");
            return n && n[t] || this.option("itemTemplate")
        }, _createItemByTemplate: function(n, i) {
            var r = n.render(i.item, i.container, i.index, "ignoreTarget");
            return typeof r == "string" && (r = t.utils.htmlToJQuery(r)), r
        }, _renderEmptyMessage: function() {
            var i = this.option("noDataText"), r = this.option("items"), u = this._dataSource && this._dataSource.isLoading(), t = !i || r && r.length || u;
            t && this._$nodata && (this._$nodata.remove(), this._$nodata = null), t || (this._$nodata = this._$nodata || n("<div>").addClass("dx-empty-message"), this._$nodata.appendTo(this._itemContainer()).html(i)), this.element().toggleClass(tt, !t)
        }, _itemJQueryEventHandler: function(t, i, r, u) {
            this._itemEventHandler(t.target, i, n.extend(r, {jQueryEvent: t}), u)
        }, _itemEventHandler: function(t, i, r, u) {
            var f = this._createActionByOption(i, n.extend({validatingTargetName: "itemElement"}, u));
            return this._itemEventHandlerImpl(t, f, r)
        }, _itemEventHandlerByHandler: function(t, i, r, u) {
            var f = this._createAction(i, n.extend({validatingTargetName: "itemElement"}, u));
            return this._itemEventHandlerImpl(t, f, r)
        }, _itemEventHandlerImpl: function(t, i, r) {
            var u = this._closestItemElement(n(t));
            return i(n.extend(this._extendActionArgs(u), r))
        }, _extendActionArgs: function(n) {
            return{itemElement: n, itemIndex: n.index(this._itemSelector()), itemData: this._getItemData(n)}
        }, _closestItemElement: function(t) {
            return n(t).closest(this._itemSelector())
        }, _getItemData: function(t) {
            return n(t).data(this._itemDataKey())
        }, _isLastPage: function() {
            return!this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize
        }, itemElements: function() {
            return this._itemElements()
        }, itemsContainer: function() {
            return this._itemContainer()
        }}).include(r.DataHelperMixin);
    r.CollectionWidget = ut
}(jQuery, DevExpress), function(n, t, i) {
    var u = t.ui, r = t.utils, o = u.events, f = "dxItemDeleting", e = u.CollectionWidget.inherit({_setOptionsByReference: function() {
            this.callBase(), n.extend(this._optionsByReference, {selectedItem: !0})
        }, _setDeprecatedOptions: function() {
            this.callBase(), n.extend(this._deprecatedOptions, {itemSelectAction: {since: "14.2", message: "Use the 'onSelectionChanged' option instead"}})
        }, _setDefaultOptions: function() {
            this.callBase(), this.option({selectionMode: "none", selectionRequired: !1, selectionByClick: !0, selectedItems: [], selectedIndex: -1, selectedItem: null, onSelectionChanged: null, onItemReordered: null, onItemDeleting: null, onItemDeleted: null})
        }, _init: function() {
            this.callBase(), this._initEditStrategy(), this._selectedItemIndices = []
        }, _initEditStrategy: function() {
            var n = u.CollectionWidget.PlainEditStrategy;
            this._editStrategy = new n(this)
        }, _render: function() {
            this._syncSelectionOptions(), this._normalizeSelectedItems(), this._initSelectedItems(), this.callBase(), this._renderSelection(this._selectedItemIndices, [])
        }, _syncSelectionOptions: function(t) {
            var i = this.option("items") || [], e = this.option("selectedItems") || [], u = this.option("selectedItem"), f = this.option("selectedIndex");
            t = t || this._chooseSelectOption();
            switch (t) {
                case"selectedItems":
                    this._setOptionSilent("selectedItem", e[0]), this._setOptionSilent("selectedIndex", n.inArray(e[0], i));
                    break;
                case"selectedItem":
                    r.isDefined(u) ? (this._setOptionSilent("selectedItems", [u]), this._setOptionSilent("selectedIndex", n.inArray(u, i))) : (this._setOptionSilent("selectedItems", []), this._setOptionSilent("selectedIndex", -1));
                    break;
                case"selectedIndex":
                    r.isDefined(i[f]) ? (this._setOptionSilent("selectedItems", [i[f]]), this._setOptionSilent("selectedItem", i[f])) : (this._setOptionSilent("selectedItems", []), this._setOptionSilent("selectedItem", null))
                }
        }, _chooseSelectOption: function() {
            var n = "selectedIndex";
            return this.option("selectedItems").length ? n = "selectedItems" : r.isDefined(this.option("selectedItem")) && (n = "selectedItem"), n
        }, _normalizeSelectedItems: function() {
            var n, t;
            this.option("selectionMode") === "none" ? (this._setOptionSilent("selectedItems", []), this._syncSelectionOptions("selectedItems")) : this.option("selectionMode") === "single" && (n = this._editStrategy.selectedItemIndices(this.option("selectedItems")), (n.length > 1 || !n.length && this.option("selectionRequired") && this.option("items") && this.option("items").length) && (t = [n[0] || this._selectedItemIndices[0] || 0], this._setOptionSilent("selectedItems", this._editStrategy.fetchSelectedItems(t)), this._syncSelectionOptions("selectedItems")))
        }, _initSelectedItems: function() {
            this._selectedItemIndices = this._editStrategy.selectedItemIndices(this.option("selectedItems"))
        }, _renderSelection: n.noop, _itemClickHandler: function(t) {
            this._createAction(n.proxy(function(n) {
                this._itemSelectHandler(n.jQueryEvent)
            }, this), {validatingTargetName: "itemElement"})({itemElement: n(t.currentTarget), jQueryEvent: t}), this.callBase.apply(this, arguments)
        }, _itemSelectHandler: function(n) {
            if (this.option("selectionByClick")) {
                var t = n.currentTarget;
                this.isItemSelected(t) ? this.unselectItem(n.currentTarget) : this.selectItem(n.currentTarget)
            }
        }, _selectedItemElement: function(n) {
            return this._itemElements().eq(n)
        }, _postprocessRenderItem: function(t) {
            var i = n(t.itemElement);
            this._isItemSelected(this._editStrategy.getNormalizedIndex(i)) && i.addClass(this._selectedItemClass())
        }, _updateSelectedItems: function() {
            var u = this._selectedItemIndices.slice(), f = this._editStrategy.selectedItemIndices(), t = r.removeDublicates(f, u), i = r.removeDublicates(u, f), e;
            n.each(i, n.proxy(function(n, t) {
                this._removeSelection(t)
            }, this)), n.each(t, n.proxy(function(n, t) {
                this._addSelection(t)
            }, this)), (i.length || t.length) && (e = this._selectionChangePromise, this._updateSelection(t, i), n.when(e).done(n.proxy(function() {
                this._fireSelectItemEvent(t, i), this._fireSelectionChangeEvent(t, i)
            }, this)))
        }, _fireSelectionChangeEvent: function(n, t) {
            this._createActionByOption("onSelectionChanged", {excludeValidators: ["disabled"]})({addedItems: this._editStrategy.fetchSelectedItems(n), removedItems: this._editStrategy.fetchSelectedItems(t)})
        }, _fireSelectItemEvent: function(n, t) {
            (this.NAME !== "dxList" || this.option("selectionMode") === "single") && this._itemEventHandler(this._selectedItemElement(n[0]), "itemSelectAction", {selectedIndex: n[0], previousIndex: t[0]}, {excludeValidators: ["disabled"]})
        }, _updateSelection: function() {
            this._renderSelection.apply(this, arguments)
        }, _removeSelection: function(t) {
            var i = this._editStrategy.getItemElement(t), r = n.inArray(t, this._selectedItemIndices);
            r > -1 && (i.removeClass(this._selectedItemClass()), this._selectedItemIndices.splice(r, 1), i.triggerHandler("stateChanged"), this.NAME === "dxList" && this._itemEventHandler(i, "itemUnselectAction", {}, {excludeValidators: ["disabled"]}))
        }, _addSelection: function(n) {
            var t = this._editStrategy.getItemElement(n);
            n > -1 && !this._isItemSelected(n) && (t.addClass(this._selectedItemClass()), this._selectedItemIndices.push(n), t.triggerHandler("stateChanged"), this.NAME === "dxList" && this._itemEventHandler(t, "itemSelectAction", {}, {excludeValidators: ["disabled"]}))
        }, _isItemSelected: function(t) {
            return n.inArray(t, this._selectedItemIndices) > -1
        }, _selectAllItems: function() {
            this.option("selectedItems", this.option("items").slice())
        }, _unselectAllItems: function() {
            this.option("selectedItems", [])
        }, _optionChanged: function(n) {
            if (!this._cancelOptionChange)
                switch (n.name) {
                    case"items":
                        n.previousValue && n.previousValue.length > 0 && this._clearSelectedItems(), this.callBase(n);
                        break;
                    case"selectionMode":
                        this._invalidate();
                        break;
                    case"selectedIndex":
                    case"selectedItem":
                    case"selectedItems":
                        this._syncSelectionOptions(n.name), this._normalizeSelectedItems(), this._updateSelectedItems();
                        break;
                    case"selectionByClick":
                    case"selectionRequired":
                    case"onSelectionChanged":
                    case"onItemDeleting":
                    case"onItemDeleted":
                    case"onItemReordered":
                    case"itemSelectAction":
                    case"itemUnselectAction":
                        break;
                    default:
                        this.callBase(n)
                    }
        }, _clearSelectedItems: function() {
            this._selectedItemIndices = [], this.option("selectedItems", [])
        }, _setOptionSilent: function(n, t) {
            this._cancelOptionChange = !0, this.option(n, t), this._cancelOptionChange = !1
        }, _waitDeletingPrepare: function(t) {
            if (t.data(f))
                return n.Deferred().resolve().promise();
            t.data(f, !0);
            var i = n.Deferred(), r = this._itemEventHandler(t, "onItemDeleting", {}, {excludeValidators: ["disabled"]});
            return n.when(r).always(n.proxy(function(n) {
                var u = !r, e = !u && r.state() === "resolved", o = !!arguments.length, s = u || e && !o || e && n;
                t.data(f, !1), s ? i.resolve() : i.reject()
            }, this)), i.promise()
        }, _deleteItemFromDS: function(r) {
            if (!this._dataSource)
                return n.Deferred().resolve().promise();
            var o = this, u = n.Deferred(), e = this.option("disabled"), f = this._dataSource.store();
            if (this.option("disabled", !0), !f.remove)
                throw t.Error("E1011");
            return f.remove(f.keyOf(this._getItemData(r))).done(function(n) {
                n !== i ? u.resolve() : u.reject()
            }).fail(function() {
                u.reject()
            }), u.always(n.proxy(function() {
                this.option("disabled", e)
            }, this)), u
        }, _tryRefreshLastPage: function() {
            var t = n.Deferred();
            return this._isLastPage() || this.option("grouped") ? t.resolve() : this._refreshLastPage().done(function() {
                t.resolve()
            }), t.promise()
        }, _refreshLastPage: function() {
            return this._expectLastItemLoading(), this._dataSource.load()
        }, _updateSelectionAfterDelete: function(t) {
            var i = n.inArray(t, this._selectedItemIndices);
            i > -1 && this._selectedItemIndices.splice(i, 1), this._editStrategy.updateSelectionAfterDelete(t), this.option("selectedItems", this._editStrategy.fetchSelectedItems())
        }, _simulateOptionChange: function(n) {
            var i = this.option(n);
            i instanceof t.data.DataSource || this.fireEvent("optionChanged", [{name: n, fullName: n, value: i}])
        }, isItemSelected: function(n) {
            return this._isItemSelected(this._editStrategy.getNormalizedIndex(n))
        }, selectItem: function(t) {
            var i = this._editStrategy.getNormalizedIndex(t), u, r;
            i !== -1 && (u = n.inArray(i, this._selectedItemIndices), u === -1) && (this.option("selectionMode") === "single" ? this.option("selectedItems", this._editStrategy.fetchSelectedItems([i])) : (r = this._selectedItemIndices.slice(), r.push(i), this.option("selectedItems", this._editStrategy.fetchSelectedItems(r))))
        }, unselectItem: function(t) {
            var u = this._editStrategy.getNormalizedIndex(t), r, i;
            u !== -1 && (r = n.inArray(u, this._selectedItemIndices), r !== -1) && ((i = this._selectedItemIndices.slice(), i.splice(r, 1), this.option("selectionRequired") && i.length === 0) || this.option("selectedItems", this._editStrategy.fetchSelectedItems(i)))
        }, deleteItem: function(t) {
            var i = this, u = n.Deferred(), r = this._editStrategy.getItemElement(t), f = this._editStrategy.getNormalizedIndex(t), o = this._dataSource ? "dataSource" : "items", e = this._itemResponseWaitClass();
            return f > -1 ? this._waitDeletingPrepare(r).done(function() {
                r.addClass(e), i._deleteItemFromDS(r).done(function() {
                    r.detach(), i._editStrategy.deleteItemAtIndex(f), i._simulateOptionChange(o), i._updateSelectionAfterDelete(f), i._itemEventHandler(r, "onItemDeleted", {}, {excludeValidators: ["disabled"]}), i._renderEmptyMessage(), i._tryRefreshLastPage().done(function() {
                        u.resolveWith(i)
                    })
                }).fail(function() {
                    r.removeClass(e), u.rejectWith(i)
                })
            }).fail(function() {
                u.rejectWith(i)
            }) : u.rejectWith(i), u.promise()
        }, reorderItem: function(t, i) {
            var e = n.Deferred(), o = this, r = this._editStrategy, h = r.getItemElement(t), c = r.getItemElement(i), u = r.getNormalizedIndex(t), f = r.getNormalizedIndex(i), s, l = u > -1 && f > -1 && u !== f;
            return l ? this._dataSource ? (s = "dataSource", e.resolveWith(this)) : (s = "items", e.resolveWith(this)) : e.rejectWith(this), e.promise().done(function() {
                c[r.itemPlacementFunc(u, f)](h);
                var n = r.getSelectedItemsAfterReorderItem(u, f);
                r.moveItemAtIndexToIndex(u, f), o._selectedItemIndices = r.selectedItemIndices(n), o.option("selectedItems", r.fetchSelectedItems()), o._simulateOptionChange(s), o._itemEventHandler(h, "onItemReordered", {fromIndex: r.getIndex(u), toIndex: r.getIndex(f)}, {excludeValidators: ["disabled"]})
            })
        }});
    u.CollectionWidget = e
}(jQuery, DevExpress), function(n, t) {
    var r = t.ui;
    r.CollectionWidget.EditStrategy = t.Class.inherit({ctor: function(n) {
            this._collectionWidget = n
        }, getNormalizedIndex: function(n) {
            return this._isNormalisedItemIndex(n) ? n : this._isItemIndex(n) ? this._normalizeItemIndex(n) : this._getNormalizedItemIndex(n)
        }, getIndex: function(n) {
            return this._isNormalisedItemIndex(n) ? this._denormalizeItemIndex(n) : this._isItemIndex(n) ? n : this._denormalizeItemIndex(this._getNormalizedItemIndex(n))
        }, getItemElement: function(t) {
            return this._isNormalisedItemIndex(t) ? this._getItemByNormalizedIndex(t) : this._isItemIndex(t) ? this._getItemByNormalizedIndex(this._normalizeItemIndex(t)) : n(t)
        }, deleteItemAtIndex: t.abstract, updateSelectionAfterDelete: t.abstract, fetchSelectedItems: t.abstract, selectedItemIndices: t.abstract, itemPlacementFunc: function(n, t) {
            return this._itemsFromSameParent(n, t) && n < t ? "after" : "before"
        }, moveItemAtIndexToIndex: t.abstract, getSelectedItemsAfterReorderItem: function() {
            return this._collectionWidget.option("selectedItems")
        }, _isNormalisedItemIndex: function(t) {
            return n.isNumeric(t)
        }, _isItemIndex: t.abstract, _getNormalizedItemIndex: t.abstract, _normalizeItemIndex: t.abstract, _denormalizeItemIndex: t.abstract, _getItemByNormalizedIndex: t.abstract, _itemsFromSameParent: t.abstract})
}(jQuery, DevExpress), function(n, t) {
    var r = t.ui;
    r.CollectionWidget.PlainEditStrategy = r.CollectionWidget.EditStrategy.inherit({deleteItemAtIndex: function(n) {
            this._collectionWidget.option("items").splice(n, 1)
        }, updateSelectionAfterDelete: function(t) {
            var i = this._collectionWidget._selectedItemIndices;
            n.each(i, function(n, r) {
                r > t && (i[n] -= 1)
            })
        }, fetchSelectedItems: function(t) {
            t = t || this._collectionWidget._selectedItemIndices;
            var r = this._collectionWidget.option("items"), i = [];
            return n.each(t, function(n, t) {
                i.push(r[t])
            }), i
        }, selectedItemIndices: function() {
            var t = [], i = this._collectionWidget.option("items"), r = this._collectionWidget.option("selectedItems");
            return n.each(r, function(r, u) {
                var f = n.inArray(u, i);
                f !== -1 && t.push(f)
            }), t
        }, moveItemAtIndexToIndex: function(n, t) {
            var i = this._collectionWidget.option("items"), r = i[n];
            i.splice(n, 1), i.splice(t, 0, r)
        }, _isItemIndex: function(t) {
            return n.isNumeric(t)
        }, _getNormalizedItemIndex: function(n) {
            return this._collectionWidget._itemElements().index(n)
        }, _normalizeItemIndex: function(n) {
            return n
        }, _denormalizeItemIndex: function(n) {
            return n
        }, _getItemByNormalizedIndex: function(n) {
            return this._collectionWidget._itemElements().eq(n)
        }, _itemsFromSameParent: function() {
            return!0
        }})
}(jQuery, DevExpress), function(n, t) {
    var r = null, f = function(i) {
        i = n.extend({position: "top"}, i);
        var r = i.content;
        return delete i.content, n("<div />").html(r).appendTo(t.viewPort()).dxTooltip(i)
    }, u = function() {
        r && (r.remove(), r = null)
    }, e = {show: function(n) {
            return u(), r = f(n), r.dxTooltip("show")
        }, hide: function() {
            return r ? r.dxTooltip("hide").done(u).promise() : n.when()
        }};
    t.ui.tooltip = e
}(jQuery, DevExpress));
if (!DevExpress.MOD_WIDGETS_BASE) {
    if (!window.DevExpress)
        throw Error("Required module is not referenced: core");
    (function(n, t) {
        n.extend(t.ERROR_MESSAGES, {E1001: "Module '{0}'. Controller '{1}' is already registered", E1002: "Module '{0}'. Controller '{1}' must be inheritor of DevExpress.ui.dxDataGrid.Controller", E1003: "Module '{0}'. View '{1}' is already registered", E1004: "Module '{0}'. View '{1}' must be inheritor of DevExpress.ui.dxDataGrid.View", E1005: "Public method '{0}' is already registered", E1006: "Public method '{0}.{1}' is not exists", E1007: "State storing can not be provided due to the restrictions of your browser", E1010: "A template should contain dxTextBox widget", E1011: "You have to implement 'remove' method in dataStore used by dxList to be able to delete items", E1012: "Editing type '{0}' with name '{1}' not supported", E1016: "Unexpected type of data source is provided for a lookup column", E1018: "The 'collapseAll' method cannot be called when using a remote data source", E1019: "Search mode '{0}' is unavailable", E1020: "Type can not be changed after initialization", E1021: "{0} '{1}' you are trying to remove does not exist", E1022: "Markers option should be an array", E1023: "Routes option should be an array", E1024: "Google provider cannot be used in WinJS application", E1025: "This layout is too complex to render", E1026: "The 'custom' value is set to a summary item's summaryType option, but a function for calculating the custom summary is not assigned to the grid's calculateCustomSummary option", E1030: "Unknown dxScrollView refresh strategy: '{0}'", W1001: "Key option can not be modified after initialization", W1002: "Item '{0}' you are trying to select does not exist", W1003: "Group with key '{0}' in which you are trying to select items does not exist", W1004: "Item '{0}' you are trying to select in group '{1}' does not exist", W1005: "Due to column data types being unspecified, data has been loaded twice in order to apply initial filter settings. To resolve this issue, specify data types for all grid columns."})
    })($, DevExpress), function(n, t) {
        var o = t.ui, e = o.events, u = "dxScrollable", h = "dxScrollableStrategy", c = "dx-scrollable", l = "dx-scrollable-disabled", a = "dx-scrollable-container", v = "dx-scrollable-content", r = "vertical", f = "horizontal", s = "both";
        t.registerComponent(u, o, t.DOMComponent.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {updateAction: {since: "14.2", alias: "onUpdated"}, scrollAction: {since: "14.2", alias: "onScroll"}, startAction: {since: "14.2", alias: "onStart"}, stopAction: {since: "14.2", alias: "onStop"}, endAction: {since: "14.2", alias: "onEnd"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({disabled: !1, onScroll: null, direction: r, showScrollbar: "onScroll", useNative: !0, onUpdated: null, useSimulatedScrollbar: !1, useKeyboard: !0, inertiaEnabled: !0, bounceEnabled: !0, scrollByContent: !0, scrollByThumb: !1, onStart: null, onEnd: null, onBounce: null, onStop: null, pushBackValue: 0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return!t.support.nativeScrolling
                        }, options: {useNative: !1, useSimulatedScrollbar: !0}}, {device: function(n) {
                            return!t.support.nativeScrolling && !t.devices.isSimulator() && t.devices.real().platform === "generic" && n.platform === "generic"
                        }, options: {scrollByThumb: !0, scrollByContent: t.support.touch, showScrollbar: "onHover", bounceEnabled: !1}}, {device: function() {
                            return t.support.nativeScrolling && t.devices.real().platform === "android"
                        }, options: {useSimulatedScrollbar: !0}}, {device: function() {
                            return t.devices.real().platform === "ios"
                        }, options: {pushBackValue: 1}}])
            }, _init: function() {
                this.callBase(), this._initMarkup(), this._attachNativeScrollbarsCustomizationCss(), this._locked = !1
            }, _visibilityChanged: function(n) {
                n ? (this.update(), this._savedScrollOffset && this.scrollTo(this._savedScrollOffset)) : this._savedScrollOffset = this.scrollOffset()
            }, _initMarkup: function() {
                var t = this.element().addClass(c), i = this._$container = n("<div>").addClass(a), r = this._$content = n("<div>").addClass(v);
                r.append(t.contents()).appendTo(i), i.appendTo(t)
            }, _dimensionChanged: function() {
                this.update()
            }, _attachNativeScrollbarsCustomizationCss: function() {
                navigator.platform.indexOf("Mac") > -1 && DevExpress.browser.webkit || this.element().addClass("dx-scrollable-customizable-scrollbars")
            }, _render: function() {
                this._renderDirection(), this._renderStrategy(), this._attachEventHandlers(), this._renderDisabledState(), this._createActions(), this.update(), this.callBase()
            }, _toggleRTLDirection: function(n) {
                this.callBase(n), n && this.scrollTo({left: this.scrollWidth() - this.clientWidth()})
            }, _attachEventHandlers: function() {
                var t = this._strategy, i = {getDirection: n.proxy(t.getDirection, t), validate: n.proxy(this._validate, this), isNative: this.option("useNative")};
                this._$container.off("." + u).on(e.addNamespace("scroll", u), n.proxy(t.handleScroll, t)).on(e.addNamespace("dxscrollinit", u), i, n.proxy(this._initHandler, this)).on(e.addNamespace("dxscrollstart", u), n.proxy(t.handleStart, t)).on(e.addNamespace("dxscroll", u), n.proxy(t.handleMove, t)).on(e.addNamespace("dxscrollend", u), n.proxy(t.handleEnd, t)).on(e.addNamespace("dxscrollcancel", u), n.proxy(t.handleCancel, t)).on(e.addNamespace("dxscrollstop", u), n.proxy(t.handleStop, t))
            }, _validate: function(n) {
                return this.option("useNative") ? this._updateAllowedDirection() : this.update(), this._strategy.validate(n)
            }, _initHandler: function() {
                var n = this._strategy;
                n.handleInit.apply(n, arguments)
            }, _renderDisabledState: function() {
                this.element().toggleClass(l, this.option("disabled")), this.option("disabled") ? this._lock() : this._unlock()
            }, _renderDirection: function() {
                this.element().removeClass("dx-scrollable-" + f).removeClass("dx-scrollable-" + r).removeClass("dx-scrollable-" + s).addClass("dx-scrollable-" + this.option("direction"))
            }, _renderStrategy: function() {
                this._createStrategy(), this._strategy.render(), this.element().data(h, this._strategy)
            }, _createStrategy: function() {
                this._strategy = this.option("useNative") ? new o.dxScrollable.NativeStrategy(this) : new o.dxScrollable.SimulatedStrategy(this)
            }, _createActions: function() {
                this._strategy.createActions()
            }, _clean: function() {
                this._strategy.dispose()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"onStart":
                    case"onEnd":
                    case"onStop":
                    case"onUpdated":
                    case"onScroll":
                    case"onBounce":
                        this._createActions();
                        break;
                    case"direction":
                        this._resetInactiveDirection(), this._invalidate();
                        break;
                    case"inertiaEnabled":
                    case"bounceEnabled":
                    case"scrollByContent":
                    case"scrollByThumb":
                    case"bounceEnabled":
                    case"useNative":
                    case"useKeyboard":
                    case"showScrollbar":
                    case"useSimulatedScrollbar":
                    case"pushBackValue":
                        this._invalidate();
                        break;
                    case"disabled":
                        this._renderDisabledState();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _resetInactiveDirection: function() {
                var t = this._getInactiveProp(), n;
                t && (n = this.scrollOffset(), n[t] = 0, this.scrollTo(n))
            }, _getInactiveProp: function() {
                var n = this.option("direction");
                return n === r ? "left" : n === f ? "top" : void 0
            }, _location: function() {
                return this._strategy.location()
            }, _normalizeLocation: function(t) {
                var i = this.option("direction");
                return{left: n.isPlainObject(t) ? -(t.left || t.x || 0) : i !== r ? -t : 0, top: n.isPlainObject(t) ? -(t.top || t.y || 0) : i !== f ? -t : 0}
            }, _isLocked: function() {
                return this._locked
            }, _lock: function() {
                this._locked = !0
            }, _unlock: function() {
                this._locked = !1
            }, _isDirection: function(n) {
                var t = this.option("direction");
                return n === r ? t !== f : n === f ? t !== r : t === n
            }, _updateAllowedDirection: function() {
                var n = this._strategy._allowedDirections();
                this._allowedDirectionValue = this._isDirection(s) && n.vertical && n.horizontal ? s : this._isDirection(f) && n.horizontal ? f : this._isDirection(r) && n.vertical ? r : null
            }, _allowedDirection: function() {
                return this._allowedDirectionValue
            }, content: function() {
                return this._$content
            }, scrollOffset: function() {
                var n = this._location();
                return{top: -n.top, left: -n.left}
            }, scrollTop: function() {
                return this.scrollOffset().top
            }, scrollLeft: function() {
                return this.scrollOffset().left
            }, clientHeight: function() {
                return this._$container.height()
            }, scrollHeight: function() {
                return this.content().height()
            }, clientWidth: function() {
                return this._$container.width()
            }, scrollWidth: function() {
                return this.content().width()
            }, update: function() {
                return this._strategy.update(), this._updateAllowedDirection(), n.Deferred().resolve().promise()
            }, scrollBy: function(n) {
                (n = this._normalizeLocation(n), n.top || n.left) && this._strategy.scrollBy(n)
            }, scrollTo: function(n) {
                n = this._normalizeLocation(n);
                var t = this._location();
                this.scrollBy({left: t.left - n.left, top: t.top - n.top})
            }, scrollToElement: function(t) {
                var i = n(t), u, e;
                i.length && this.element().find(i).length && (u = {top: 0, left: 0}, e = this.option("direction"), e !== r && (u.left = this._elementPosition(i, f)), e !== f && (u.top = this._elementPosition(i, r)), this.scrollTo(u))
            }, _elementPosition: function(n, t) {
                var i = this._elementPositionRelativeToContent(n, t === r ? "top" : "left"), f = n[t === r ? "outerHeight" : "outerWidth"](), o = i + f, u = t === r ? this.scrollTop() : this.scrollLeft(), e = t === r ? this.clientHeight() : this.clientWidth(), s = u <= i && o <= u + e, h = u > i;
                return s ? u : i + (h ? 0 : f - e)
            }, _elementPositionRelativeToContent: function(n, t) {
                for (var i = 0; this._hasScrollContent(n); )
                    i += n.position()[t], n = n.offsetParent();
                return i
            }, _hasScrollContent: function(n) {
                var t = this.content();
                return n.closest(t).length && !n.is(t)
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var e = t.ui, o = e.events, f = "dxScrollbar", s = "dx-scrollable-scrollbar", h = s + "-active", l = "dx-scrollable-scroll", y = "dx-scrollable-scrollbars-hidden", a = "dx-scrollbar-hoverable", p = "vertical", c = "horizontal", v = 15, r = {onScroll: "onScroll", onHover: "onHover", always: "always", never: "never"}, u;
        t.registerComponent(f, e.dxScrollable, e.Widget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({direction: null, visible: !1, activeStateEnabled: !1, visibilityMode: r.onScroll, containerSize: 0, contentSize: 0})
            }, _init: function() {
                this.callBase(), this._isHovered = !1
            }, _render: function() {
                this._renderThumb(), this.callBase(), this._renderDirection(), this._update(), this._attachPointerDownHandler(), this.option("hoverStateEnabled", this._isHoverMode()), this.element().toggleClass(a, this.option("hoverStateEnabled"))
            }, _renderThumb: function() {
                this._$thumb = n("<div>").addClass(l), this.element().addClass(s).append(this._$thumb)
            }, isThumb: function(n) {
                return!!this.element().find(n).length
            }, _isHoverMode: function() {
                return this.option("visibilityMode") === r.onHover
            }, _renderDirection: function() {
                var n = this.option("direction");
                this.element().addClass("dx-scrollbar-" + n), this._dimension = n === c ? "width" : "height", this._prop = n === c ? "left" : "top"
            }, _attachPointerDownHandler: function() {
                this._$thumb.on(o.addNamespace("dxpointerdown", f), n.proxy(this.feedbackOn, this))
            }, feedbackOn: function() {
                this.element().addClass(h), u = this
            }, feedbackOff: function() {
                this.element().removeClass(h), u = null
            }, cursorEnter: function() {
                this._isHovered = !0, this.option("visible", !0)
            }, cursorLeave: function() {
                this._isHovered = !1, this.option("visible", !1)
            }, _renderDimensions: function() {
                this._$thumb.height(this.option("height")), this._$thumb.width(this.option("width"))
            }, _toggleVisibility: function(n) {
                n = this._adjustVisibility(n), this.option().visible = n, this._$thumb.toggleClass("dx-state-invisible", !n)
            }, _adjustVisibility: function(n) {
                if (this.containerToContentRatio() && !this._needScrollbar())
                    return!1;
                switch (this.option("visibilityMode")) {
                    case r.onHover:
                        n = n || !!this._isHovered;
                        break;
                    case r.never:
                        n = !1;
                        break;
                    case r.always:
                        n = !0
                }
                return n
            }, moveTo: function(i) {
                if (!this._isHidden()) {
                    n.isPlainObject(i) && (i = i[this._prop] || 0);
                    var r = {};
                    r[this._prop] = this._calculateScrollBarPosition(i), t.translator.move(this._$thumb, r)
                }
            }, _calculateScrollBarPosition: function(n) {
                return-n * this._thumbRatio
            }, _update: function() {
                var n = this.option("containerSize"), i = this.option("contentSize"), t;
                this._containerToContentRatio = n / i, t = Math.round(Math.max(Math.round(n * this._containerToContentRatio), v)), this._thumbRatio = (n - t) / (i - n), this.option(this._dimension, t), this.element().toggle(this._needScrollbar())
            }, _isHidden: function() {
                return this.option("visibilityMode") === r.never
            }, _needScrollbar: function() {
                return!this._isHidden() && this._containerToContentRatio < 1
            }, containerToContentRatio: function() {
                return this._containerToContentRatio
            }, _normalizeSize: function(t) {
                return n.isPlainObject(t) ? t[this._dimension] || 0 : t
            }, _clean: function() {
                this.callBase(), this === u && (u = null), this._$thumb.off("." + f)
            }, _optionChanged: function(n) {
                if (!this._isHidden())
                    switch (n.name) {
                        case"containerSize":
                        case"contentSize":
                            this.option()[n.name] = this._normalizeSize(n.value), this._update();
                            break;
                        case"visibilityMode":
                        case"direction":
                            this._invalidate();
                            break;
                        default:
                            this.callBase.apply(this, arguments)
                        }
            }})), u = null;
        n(document).on(o.addNamespace("dxpointerup", f), function() {
            u && u.feedbackOff()
        })
    }(jQuery, DevExpress), function(n, t, i) {
        var e = t.ui, a = e.events, v = t.utils, s = t.devices, y = Math.abs, o = "dxNativeScrollable", f = "dx-scrollable-native", h = "dx-scrollable-scrollbar-simulated", c = "dx-scrollable-scrollbars-hidden", r = "vertical", u = "horizontal", l = 500;
        e.dxScrollable.NativeStrategy = t.Class.inherit({ctor: function(n) {
                this._init(n)
            }, _init: function(t) {
                this._component = t, this._$element = t.element(), this._$container = t._$container, this._$content = t._$content, this._direction = t.option("direction"), this._useSimulatedScrollbar = t.option("useSimulatedScrollbar"), this._showScrollbar = t.option("showScrollbar"), this.option = n.proxy(t.option, t), this._createActionByOption = n.proxy(t._createActionByOption, t), this._isLocked = n.proxy(t._isLocked, t), this._isDirection = n.proxy(t._isDirection, t), this._allowedDirection = n.proxy(t._allowedDirection, t)
            }, render: function() {
                this._$element.addClass(f).addClass(f + "-" + s.real().platform).toggleClass(c, !this._showScrollbar), this._showScrollbar && this._useSimulatedScrollbar && this._renderScrollbars()
            }, _renderScrollbars: function() {
                this._scrollbars = {}, this._hideScrollbarTimeout = 0, this._$element.addClass(h), this._renderScrollbar(r), this._renderScrollbar(u)
            }, _renderScrollbar: function(t) {
                if (this._isDirection(t)) {
                    var i = n("<div>").dxScrollbar({direction: t}).appendTo(this._$element);
                    this._scrollbars[t] = i.dxScrollbar("instance")
                }
            }, handleInit: n.noop, handleStart: n.noop, handleMove: function(n) {
                if (this._isLocked()) {
                    n.cancel = !0;
                    return
                }
                this._allowedDirection() && (n.originalEvent.isScrollingEvent = !0)
            }, handleEnd: n.noop, handleStop: n.noop, _eachScrollbar: function(t) {
                t = n.proxy(t, this), n.each(this._scrollbars || {}, function(n, i) {
                    t(i, n)
                })
            }, createActions: function() {
                this._scrollAction = this._createActionByOption("onScroll"), this._updateAction = this._createActionByOption("onUpdated")
            }, _createActionArgs: function() {
                var n = this.location();
                return{jQueryEvent: this._eventForUserAction, scrollOffset: {top: -n.top, left: -n.left}, reachedLeft: this._isDirection(u) ? n.left >= 0 : i, reachedRight: this._isDirection(u) ? n.left <= this._containerSize.width - this._componentContentSize.width : i, reachedTop: this._isDirection(r) ? n.top >= 0 : i, reachedBottom: this._isDirection(r) ? n.top <= this._containerSize.height - this._componentContentSize.height : i}
            }, handleScroll: function(n) {
                if (!this._isScrollLocationChanged()) {
                    n.stopImmediatePropagation();
                    return
                }
                this._eventForUserAction = n, this._moveScrollbars(), this._scrollAction(this._createActionArgs()), this._lastLocation = this.location(), this._pushBackFromBoundary()
            }, _pushBackFromBoundary: function() {
                var n = this.option("pushBackValue");
                if (n) {
                    var t = this._containerSize.height - this._contentSize.height, i = this._$container.scrollTop(), r = t + i - n * 2;
                    i ? r || this._$container.scrollTop(n - t) : this._$container.scrollTop(n)
                }
            }, _isScrollLocationChanged: function() {
                var n = this.location(), t = this._lastLocation || {}, i = t.top !== n.top, r = t.left !== n.left;
                return i || r
            }, _moveScrollbars: function() {
                this._eachScrollbar(function(n) {
                    n.moveTo(this.location()), n.option("visible", !0)
                }), this._hideScrollbars()
            }, _hideScrollbars: function() {
                clearTimeout(this._hideScrollbarTimeout), this._hideScrollbarTimeout = setTimeout(n.proxy(function() {
                    this._eachScrollbar(function(n) {
                        n.option("visible", !1)
                    })
                }, this), l)
            }, location: function() {
                return{left: -this._$container.scrollLeft(), top: this.option("pushBackValue") - this._$container.scrollTop()}
            }, disabledChanged: n.noop, update: function() {
                this._update(), this._updateAction(this._createActionArgs())
            }, _update: function() {
                this._updateDimensions(), this._updateScrollbars()
            }, _updateDimensions: function() {
                this._containerSize = {height: this._$container.height(), width: this._$container.width()}, this._componentContentSize = {height: this._component.content().height(), width: this._component.content().width()}, this._contentSize = {height: this._$content.height(), width: this._$content.width()}, this._pushBackFromBoundary()
            }, _updateScrollbars: function() {
                this._eachScrollbar(function(n, t) {
                    var i = t === r ? "height" : "width";
                    n.option({containerSize: this._containerSize[i], contentSize: this._componentContentSize[i]})
                })
            }, _allowedDirections: function() {
                return{vertical: this._isDirection(r) && this._contentSize.height > this._containerSize.height, horizontal: this._isDirection(u) && this._contentSize.width > this._containerSize.width}
            }, dispose: function() {
                this._$element.removeClass(function(n, t) {
                    var i = new RegExp(f + "\\S*", "g");
                    if (i.test(t))
                        return t.match(i).join(" ")
                }), this._$element.off("." + o), this._$container.off("." + o), this._removeScrollbars(), clearTimeout(this._gestureEndTimer)
            }, _removeScrollbars: function() {
                this._eachScrollbar(function(n) {
                    n.element().remove()
                })
            }, scrollBy: function(n) {
                var t = this.location();
                this._$container.scrollTop(-t.top - n.top + this.option("pushBackValue")), this._$container.scrollLeft(-t.left - n.left)
            }, validate: function() {
                return!this.option("disabled") && this._allowedDirection()
            }, getDirection: function() {
                return this._allowedDirection()
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        var a = t.ui, v = a.events, o = Math, w = t.devices.real, b = w.platform === "win8" || w.platform === "android", k = "dxSimulatedScrollable", it = "dxScrollableStrategy", h = k + "Cursor", y = k + "Keyboard", p = "dx-scrollable-simulated", rt = "dx-scrollable-scrollbars-hidden", ut = "dx-scrollable-scrollbar", u = "vertical", r = "horizontal", c = b ? .95 : .92, d = .5, g = 1, ft = o.round(1e3 / 60), nt = 20, et = g / 5, ot = b ? 300 : 400, st = ot / ft, ht = (1 - o.pow(c, st)) / (1 - c), e = {PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40}, tt = t.Animator.inherit({ctor: function(n) {
                this.callBase(), this.scroller = n
            }, VELOCITY_LIMIT: g, _isFinished: function() {
                return o.abs(this.scroller._velocity) <= this.VELOCITY_LIMIT
            }, _step: function() {
                this.scroller._scrollStep(this.scroller._velocity), this.scroller._velocity *= this._acceleration()
            }, _acceleration: function() {
                return this.scroller._inBounds() ? c : d
            }, _complete: function() {
                this.scroller._scrollComplete()
            }, _stop: function() {
                this.scroller._stopComplete()
            }}), ct = tt.inherit({VELOCITY_LIMIT: et, _isFinished: function() {
                return this.scroller._crossBoundOnNextStep() || this.callBase()
            }, _acceleration: function() {
                return c
            }, _complete: function() {
                this.scroller._move(this.scroller._bounceLocation), this.callBase()
            }}), l = function(n) {
            return n.type === "dxmousewheel"
        }, lt = a.dxScrollable.Scroller = t.Class.inherit({ctor: function(n) {
                this._initOptions(n), this._initAnimators(), this._initScrollbar()
            }, _initOptions: function(t) {
                this._location = 0, this._topReached = !1, this._bottomReached = !1, this._axis = t.direction === r ? "x" : "y", this._prop = t.direction === r ? "left" : "top", this._dimension = t.direction === r ? "width" : "height", this._scrollProp = t.direction === r ? "scrollLeft" : "scrollTop", n.each(t, n.proxy(function(n, t) {
                    this["_" + n] = t
                }, this))
            }, _initAnimators: function() {
                this._inertiaAnimator = new tt(this), this._bounceAnimator = new ct(this)
            }, _initScrollbar: function() {
                this._$scrollbar = n("<div>").dxScrollbar({direction: this._direction, visible: this._scrollByThumb, visibilityMode: this._visibilityModeNormalize(this._scrollbarVisible), containerSize: this._containerSize(), contentSize: this._contentSize()}).appendTo(this._$container), this._scrollbar = this._$scrollbar.dxScrollbar("instance")
            }, _visibilityModeNormalize: function(n) {
                return n === !0 ? "onScroll" : n === !1 ? "never" : n
            }, _scrollStep: function(n) {
                var t = this._location;
                this._location += n, this._suppressBounce(), this._move(), t !== this._location && (this._scrollAction(), this._$container.triggerHandler("scroll"))
            }, _suppressBounce: function() {
                this._bounceEnabled || this._inBounds(this._location) || (this._velocity = 0, this._location = this._boundLocation())
            }, _boundLocation: function() {
                var n = o.min(this._location, this._maxOffset);
                return o.max(n, this._minOffset)
            }, _move: function(n) {
                this._location = n !== i ? n : this._location, this._moveContent(), this._moveScrollbar()
            }, _moveContent: function() {
                var n = {};
                n[this._prop] = this._location, t.translator.move(this._$content, n)
            }, _moveScrollbar: function() {
                this._scrollbar.moveTo(this._location)
            }, _scrollComplete: function() {
                this._inBounds() && (this._hideScrollbar(), this._correctLocation(), this._completeDeferred && this._completeDeferred.resolve()), this._scrollToBounds()
            }, _correctLocation: function() {
                this._location = o.round(this._location), this._move()
            }, _scrollToBounds: function() {
                this._inBounds() || (this._bounceAction(), this._setupBounce(), this._bounceAnimator.start())
            }, _setupBounce: function() {
                var n = this._bounceLocation = this._boundLocation(), t = n - this._location;
                this._velocity = t / ht
            }, _inBounds: function(n) {
                return n = n !== i ? n : this._location, n >= this._minOffset && n <= this._maxOffset
            }, _crossBoundOnNextStep: function() {
                var n = this._location, t = n + this._velocity;
                return n < this._minOffset && t >= this._minOffset || n > this._maxOffset && t <= this._maxOffset
            }, _initHandler: function(t) {
                return this._stopDeferred = n.Deferred(), this._stopScrolling(), this._prepareThumbScrolling(t), this._stopDeferred.promise()
            }, _stopScrolling: function() {
                this._hideScrollbar(), this._inertiaAnimator.stop(), this._bounceAnimator.stop()
            }, _prepareThumbScrolling: function(t) {
                if (!l(t.originalEvent)) {
                    var i = n(t.originalEvent.target), r = this._isScrollbar(i);
                    r && this._moveToMouseLocation(t), this._thumbScrolling = r || this._isThumb(i), this._thumbScrolling && this._scrollbar.feedbackOn()
                }
            }, _moveToMouseLocation: function(n) {
                var t = n["page" + this._axis.toUpperCase()] - this._$element.offset()[this._prop], i = this._location + t / this._containerToContentRatio() - this._$container.height() / 2;
                this._scrollStep(-i)
            }, _stopComplete: function() {
                this._stopDeferred && this._stopDeferred.resolve()
            }, _startHandler: function() {
                this._showScrollbar()
            }, _moveHandler: function(n) {
                n = n[this._axis], this._thumbScrolling && (n = -n / this._containerToContentRatio()), this._inBounds() || (n *= d), this._scrollStep(n)
            }, _containerToContentRatio: function() {
                return this._scrollbar.containerToContentRatio()
            }, _endHandler: function(t) {
                return this._completeDeferred = n.Deferred(), this._velocity = t[this._axis], this._inertiaHandler(), this._resetThumbScrolling(), this._completeDeferred.promise()
            }, _inertiaHandler: function() {
                this._suppressIntertia(), this._inertiaAnimator.start()
            }, _suppressIntertia: function() {
                (!this._inertiaEnabled || this._thumbScrolling) && (this._velocity = 0)
            }, _resetThumbScrolling: function() {
                this._thumbScrolling = !1
            }, _stopHandler: function() {
                this._resetThumbScrolling(), this._scrollToBounds()
            }, _disposeHandler: function() {
                this._stopScrolling(), this._$scrollbar.remove()
            }, _updateHandler: function() {
                this._update(), this._moveToBounds()
            }, _update: function() {
                this._stopScrolling(), this._updateLocation(), this._updateBounds(), this._updateScrollbar(), this._moveScrollbar(), this._updateScrollbarVisibility()
            }, _updateLocation: function() {
                this._location = t.translator.locate(this._$content)[this._prop]
            }, _updateBounds: function() {
                this._maxOffset = 0, this._minOffset = o.min(this._containerSize() - this._contentSize(), 0)
            }, _updateScrollbar: function() {
                this._scrollbar.option({containerSize: this._containerSize(), contentSize: this._contentSize()})
            }, _updateScrollbarVisibility: function() {
                this._showScrollbar(), this._hideScrollbar()
            }, _moveToBounds: function() {
                this._location = this._boundLocation(), this._move()
            }, _createActionsHandler: function(n) {
                this._scrollAction = n.scroll, this._bounceAction = n.bounce
            }, _showScrollbar: function() {
                this._scrollbar.option("visible", !0)
            }, _hideScrollbar: function() {
                this._scrollbar.option("visible", !1)
            }, _containerSize: function() {
                return this._$container[this._dimension]()
            }, _contentSize: function() {
                return this._$content[this._dimension]()
            }, _validateEvent: function(t) {
                var i = n(t.originalEvent.target);
                return this._isThumb(i) || this._isScrollbar(i) ? (t.preventDefault(), !0) : this._isContent(i)
            }, _isThumb: function(n) {
                return this._scrollByThumb && this._scrollbar.isThumb(n)
            }, _isScrollbar: function(n) {
                return this._scrollByThumb && n && n.is(this._$scrollbar)
            }, _isContent: function(n) {
                return this._scrollByContent && !!n.closest(this._$element).length
            }, _reachedMin: function() {
                return this._location <= this._minOffset
            }, _reachedMax: function() {
                return this._location >= this._maxOffset
            }, _cursorEnterHandler: function() {
                this._scrollbar.cursorEnter()
            }, _cursorLeaveHandler: function() {
                this._scrollbar.cursorLeave()
            }}), f, s;
        a.dxScrollable.SimulatedStrategy = t.Class.inherit({ctor: function(n) {
                this._init(n)
            }, _init: function(t) {
                this._component = t, this._$element = t.element(), this._$container = t._$container, this._$content = t._$content, this.option = n.proxy(t.option, t), this._createActionByOption = n.proxy(t._createActionByOption, t), this._isLocked = n.proxy(t._isLocked, t), this._isDirection = n.proxy(t._isDirection, t), this._allowedDirection = n.proxy(t._allowedDirection, t)
            }, render: function() {
                this._$element.addClass(p), this._createScrollers(), this.option("useKeyboard") && this._$container.prop("tabindex", 0), this._attachKeyboardHandler(), this._attachCursorHandlers()
            }, _createScrollers: function() {
                this._scrollers = {}, this._isDirection(r) && this._createScroller(r), this._isDirection(u) && this._createScroller(u), this._$element.toggleClass(rt, !this.option("showScrollbar"))
            }, _createScroller: function(n) {
                this._scrollers[n] = new lt(this._scrollerOptions(n))
            }, _scrollerOptions: function(n) {
                return{direction: n, $content: this._$content, $container: this._$container, $element: this._$element, scrollByContent: this.option("scrollByContent"), scrollByThumb: this.option("scrollByThumb"), scrollbarVisible: this.option("showScrollbar"), bounceEnabled: this.option("bounceEnabled"), inertiaEnabled: this.option("inertiaEnabled")}
            }, handleInit: function(n) {
                this._supressDirections(n), this._eventForUserAction = n, this._eventHandler("init", n).done(this._stopAction)
            }, _supressDirections: function(n) {
                if (l(n.originalEvent)) {
                    this._prepareDirections(!0);
                    return
                }
                this._prepareDirections(), this._eachScroller(function(t, i) {
                    var r = t._validateEvent(n);
                    this._validDirections[i] = r
                })
            }, _prepareDirections: function(n) {
                n = n || !1, this._validDirections = {}, this._validDirections[r] = n, this._validDirections[u] = n
            }, _eachScroller: function(t) {
                t = n.proxy(t, this), n.each(this._scrollers, function(n, i) {
                    t(i, n)
                })
            }, handleStart: function() {
                this._saveActive(), this._eventHandler("start").done(this._startAction)
            }, _saveActive: function() {
                s = this
            }, _resetActive: function() {
                s = null
            }, _validateDirection: function(n) {
                var t = !1;
                return this._eachScroller(function(i) {
                    t = t || i._validateDirection(n)
                }), t
            }, handleMove: function(n) {
                if (this._isLocked()) {
                    n.cancel = !0, this._resetActive();
                    return
                }
                n.preventDefault && n.preventDefault(), this._adjustDistance(n.delta), this._eventForUserAction = n, this._eventHandler("move", n.delta)
            }, _adjustDistance: function(n) {
                n.x *= this._validDirections[r], n.y *= this._validDirections[u]
            }, handleEnd: function(n) {
                return this._resetActive(), this._refreshCursorState(n.originalEvent && n.originalEvent.target), this._adjustDistance(n.velocity), this._eventForUserAction = n, this._eventHandler("end", n.velocity).done(this._endAction)
            }, handleCancel: function(n) {
                return this._resetActive(), this._eventForUserAction = n, this._eventHandler("end", {x: 0, y: 0})
            }, handleStop: function() {
                this._resetActive(), this._eventHandler("stop")
            }, handleScroll: function() {
                var n = {left: -this._$container.scrollLeft(), top: -this._$container.scrollTop()};
                this._$container.scrollLeft(0), this._$container.scrollTop(0), (n.left || n.top) && this.scrollBy(n)
            }, _attachKeyboardHandler: function() {
                if (this._$element.off("." + y), !this.option("disabled") && this.option("useKeyboard"))
                    this._$element.on(v.addNamespace("keydown", y), n.proxy(this._keyDownHandler, this))
            }, _keyDownHandler: function(n) {
                if (this._$container.is(document.activeElement)) {
                    var t = !0;
                    switch (n.keyCode) {
                        case e.DOWN:
                            this._scrollByLine({y: 1});
                            break;
                        case e.UP:
                            this._scrollByLine({y: -1});
                            break;
                        case e.RIGHT:
                            this._scrollByLine({x: 1});
                            break;
                        case e.LEFT:
                            this._scrollByLine({x: -1});
                            break;
                        case e.PAGE_DOWN:
                            this._scrollByPage(1);
                            break;
                        case e.PAGE_UP:
                            this._scrollByPage(-1);
                            break;
                        case e.HOME:
                            this._scrollToHome();
                            break;
                        case e.END:
                            this._scrollToEnd();
                            break;
                        default:
                            t = !1
                    }
                    t && (n.stopPropagation(), n.preventDefault())
                }
            }, _scrollByLine: function(n) {
                this.scrollBy({top: (n.y || 0) * -nt, left: (n.x || 0) * -nt})
            }, _scrollByPage: function(n) {
                var t = this._wheelProp(), r = this._dimensionByProp(t), i = {};
                i[t] = n * -this._$container[r](), this.scrollBy(i)
            }, _dimensionByProp: function(n) {
                return n === "left" ? "width" : "height"
            }, _scrollToHome: function() {
                var t = this._wheelProp(), n = {};
                n[t] = 0, this._component.scrollTo(n)
            }, _scrollToEnd: function() {
                var n = this._wheelProp(), t = this._dimensionByProp(n), i = {};
                i[n] = this._$content[t]() - this._$container[t](), this._component.scrollTo(i)
            }, createActions: function() {
                this._startAction = this._createActionHandler("onStart"), this._stopAction = this._createActionHandler("onStop"), this._endAction = this._createActionHandler("onEnd"), this._updateAction = this._createActionHandler("onUpdated"), this._createScrollerActions()
            }, _createScrollerActions: function() {
                this._eventHandler("createActions", {scroll: this._createActionHandler("onScroll"), bounce: this._createActionHandler("onBounce")})
            }, _createActionHandler: function(t) {
                var i = this, r = i._createActionByOption(t);
                return function() {
                    r(n.extend(i._createActionArgs(), arguments))
                }
            }, _createActionArgs: function() {
                var n = this._scrollers[r], t = this._scrollers[u];
                return{jQueryEvent: this._eventForUserAction, scrollOffset: {top: t && -t._location, left: n && -n._location}, reachedLeft: n && n._reachedMax(), reachedRight: n && n._reachedMin(), reachedTop: t && t._reachedMax(), reachedBottom: t && t._reachedMin()}
            }, _eventHandler: function(t) {
                var i = n.makeArray(arguments).slice(1), r = n.map(this._scrollers, function(n) {
                    return n["_" + t + "Handler"].apply(n, i)
                });
                return n.when.apply(n, r).promise()
            }, location: function() {
                return t.translator.locate(this._$content)
            }, disabledChanged: function() {
                this._attachCursorHandlers()
            }, _attachCursorHandlers: function() {
                if (this._$element.off("." + h), !this.option("disabled") && this._isHoverMode())
                    this._$element.on(v.addNamespace("mouseenter", h), n.proxy(this._cursorEnterHandler, this)).on(v.addNamespace("mouseleave", h), n.proxy(this._cursorLeaveHandler, this))
            }, _isHoverMode: function() {
                return this.option("showScrollbar") === "onHover"
            }, _cursorEnterHandler: function(n) {
                (n = n || {}, n.originalEvent = n.originalEvent || {}, s || n.originalEvent._hoverHandled) || (f && f._cursorLeaveHandler(), f = this, this._eventHandler("cursorEnter"), n.originalEvent._hoverHandled = !0)
            }, _cursorLeaveHandler: function(n) {
                f === this && s !== f && (this._eventHandler("cursorLeave"), f = null, this._refreshCursorState(n && n.relatedTarget))
            }, _refreshCursorState: function(t) {
                if (this._isHoverMode() || t && !s) {
                    var u = n(t), r = u.closest("." + p + ":not(.dx-state-disabled)"), i = r.length && r.data(it);
                    f && f !== i && f._cursorLeaveHandler(), i && i._cursorEnterHandler()
                }
            }, update: function() {
                return this._eventHandler("update").done(this._updateAction)
            }, _allowedDirections: function() {
                var n = this.option("bounceEnabled");
                return{vertical: this._isDirection(u) && (this._scrollers[u]._minOffset < 0 || n), horizontal: this._isDirection(r) && (this._scrollers[r]._minOffset < 0 || n)}
            }, scrollBy: function(n) {
                this._prepareDirections(!0), this._eventHandler("start").done(this._startAction), this._eventHandler("move", {x: n.left, y: n.top}), this._eventHandler("end", {x: 0, y: 0}).done(this._endAction)
            }, validate: function(n) {
                return this.option("disabled") ? !1 : this.option("bounceEnabled") ? !0 : l(n) ? this._validateWheel(n) : this._validateMove(n)
            }, _validateWheel: function(n) {
                var r = this._scrollers[this._wheelDirection()], t = r._reachedMin(), i = r._reachedMax(), u = !t || !i, f = !t && !i, e = t && n.delta > 0, o = i && n.delta < 0;
                return u && (f || e || o)
            }, _validateMove: function(t) {
                return!this.option("scrollByContent") && !n(t.target).closest("." + ut).length ? !1 : this._allowedDirection()
            }, getDirection: function(n) {
                return l(n) ? this._wheelDirection() : this._allowedDirection()
            }, _wheelProp: function() {
                return this._wheelDirection() === r ? "left" : "top"
            }, _wheelDirection: function() {
                switch (this.option("direction")) {
                    case r:
                        return r;
                    case u:
                        return u;
                    default:
                        return this._scrollers[u]._containerToContentRatio() >= 1 ? r : u
                    }
            }, dispose: function() {
                s === this && (s = null), f === this && (f = null), this._eventHandler("dispose"), this._detachEventHandlers(), this._$element.removeClass(p), this._eventForUserAction = null, clearTimeout(this._gestureEndTimer)
            }, _detachEventHandlers: function() {
                this._$element.off("." + h), this._$container.off("." + y)
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        var u = t.ui, r = "dx-scrollview", o = r + "-content", s = r + "-top-pocket", h = r + "-bottom-pocket", f = r + "-pull-down", v = f + "-image", y = f + "-indicator", p = f + "-text", e = r + "-scrollbottom", c = e + "-indicator", l = e + "-text", a = r + "-loadpanel";
        t.registerComponent("dxScrollView", u, u.dxScrollable.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {pullDownAction: {since: "14.2", alias: "onPullDown"}, reachBottomAction: {since: "14.2", alias: "onReachBottom"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({pullingDownText: Globalize.localize("dxScrollView-pullingDownText"), pulledDownText: Globalize.localize("dxScrollView-pulledDownText"), refreshingText: Globalize.localize("dxScrollView-refreshingText"), reachBottomText: Globalize.localize("dxScrollView-reachBottomText"), onPullDown: null, onReachBottom: null, refreshStrategy: "pullDown"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return DevExpress.devices.real().platform === "android"
                        }, options: {refreshStrategy: "swipeDown"}}, {device: function() {
                            return DevExpress.devices.real().platform === "win8"
                        }, options: {refreshStrategy: "slideDown"}}])
            }, _init: function() {
                this.callBase(), this._loadingIndicatorEnabled = !0
            }, _initMarkup: function() {
                this.callBase(), this.element().addClass(r), this._initContent(), this._initTopPocket(), this._initBottomPocket(), this._initLoadPanel()
            }, _initContent: function() {
                var t = n("<div>").addClass(o);
                this._$content.wrapInner(t)
            }, _initTopPocket: function() {
                var t = this._$topPocket = n("<div>").addClass(s), i = this._$pullDown = n("<div>").addClass(f);
                t.append(i), this._$content.prepend(t)
            }, _initBottomPocket: function() {
                var t = this._$bottomPocket = n("<div>").addClass(h), i = this._$reachBottom = n("<div>").addClass(e), r = n("<div>").addClass(c), u = n("<div>").dxLoadIndicator(), f = this._$reachBottomText = n("<div>").addClass(l);
                this._updateReachBottomText(), i.append(r.append(u)).append(f), t.append(i), this._$content.append(t)
            }, _initLoadPanel: function() {
                this._loadPanel = n("<div>").addClass(a).appendTo(this.element()).dxLoadPanel({shading: !1, delay: 400, position: {of: this.element()}}).dxLoadPanel("instance")
            }, _updateReachBottomText: function() {
                this._$reachBottomText.text(this.option("reachBottomText"))
            }, _createStrategy: function() {
                var i = this.option("useNative") ? this.option("refreshStrategy") : "simulated", t = u.dxScrollView.refreshStrategies[i];
                if (!t)
                    throw Error("E1030", this.option("refreshStrategy"));
                this._strategy = new t(this), this._strategy.pullDownCallbacks.add(n.proxy(this._pullDownHandler, this)), this._strategy.releaseCallbacks.add(n.proxy(this._releaseHandler, this)), this._strategy.reachBottomCallbacks.add(n.proxy(this._reachBottomHandler, this))
            }, _createActions: function() {
                this.callBase(), this._pullDownAction = this._createActionByOption("onPullDown"), this._reachBottomAction = this._createActionByOption("onReachBottom"), this._pullDownEnable(!!this.option("onPullDown") && !t.designMode), this._reachBottomEnable(!!this.option("onReachBottom") && !t.designMode)
            }, _pullDownEnable: function(n) {
                if (arguments.length === 0)
                    return this._pullDownEnabled;
                this._$pullDown.toggle(n), this._strategy.pullDownEnable(n), this._pullDownEnabled = n
            }, _reachBottomEnable: function(n) {
                if (arguments.length === 0)
                    return this._reachBottomEnabled;
                this._$reachBottom.toggle(n), this._strategy.reachBottomEnable(n), this._reachBottomEnabled = n
            }, _pullDownHandler: function() {
                this._loadingIndicator(!1), this._pullDownLoading()
            }, _loadingIndicator: function(n) {
                if (arguments.length < 1)
                    return this._loadingIndicatorEnabled;
                this._loadingIndicatorEnabled = n
            }, _pullDownLoading: function() {
                this.startLoading(), this._pullDownAction()
            }, _reachBottomHandler: function() {
                this._loadingIndicator(!1), this._reachBottomLoading()
            }, _reachBottomLoading: function() {
                this.startLoading(), this._reachBottomAction()
            }, _releaseHandler: function() {
                this.finishLoading(), this._loadingIndicator(!0)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"onPullDown":
                    case"onReachBottom":
                        this._createActions();
                        break;
                    case"pullingDownText":
                    case"pulledDownText":
                    case"refreshingText":
                    case"refreshStrategy":
                        this._invalidate();
                        break;
                    case"reachBottomText":
                        this._updateReachBottomText();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, content: function() {
                return this._$content.children().eq(1)
            }, release: function(n) {
                return n !== i && this.toggleLoading(!n), this._strategy.release()
            }, toggleLoading: function(n) {
                this._reachBottomEnable(n)
            }, isFull: function() {
                return this.content().height() >= this._$container.height()
            }, refresh: function() {
                this.option("onPullDown") && (this._strategy.pendingRelease(), this._pullDownLoading())
            }, startLoading: function() {
                this._loadingIndicator() && this.element().is(":visible") && this._loadPanel.show(), this.toggleLoading(this.isFull() && this._reachBottomEnable()), this._lock()
            }, finishLoading: function() {
                this._loadPanel.hide(), this.toggleLoading(this.isFull() && this._reachBottomEnable()), this._unlock()
            }, _dispose: function() {
                this.callBase(), this._loadPanel && this._loadPanel.element().remove()
            }})), u.dxScrollView.refreshStrategies = {}
    }(jQuery, DevExpress), function(n, t) {
        var o = t.ui, y = Math, s = "dx-scrollview-pull-down-loading", f = "dx-scrollview-pull-down-ready", c = "dx-scrollview-pull-down-image", l = "dx-scrollview-pull-down-indicator", a = "dx-scrollview-pull-down-text", e = 0, r = 1, u = 2, h = 3, v = o.dxScrollable.NativeStrategy.inherit({_init: function(n) {
                this.callBase(n), this._$topPocket = n._$topPocket, this._$pullDown = n._$pullDown, this._$bottomPocket = n._$bottomPocket, this._$refreshingText = n._$refreshingText, this._$scrollViewContent = n.content(), this._initCallbacks()
            }, _initCallbacks: function() {
                this.pullDownCallbacks = n.Callbacks(), this.releaseCallbacks = n.Callbacks(), this.reachBottomCallbacks = n.Callbacks()
            }, render: function() {
                this.callBase(), this._renderPullDown(), this._releaseState()
            }, _renderPullDown: function() {
                var i = n("<div>").addClass(c), r = n("<div>").addClass(l), u = n("<div>").dxLoadIndicator(), t = this._$pullDownText = n("<div>").addClass(a);
                this._$pullingDownText = n("<div>").text(this.option("pullingDownText")).appendTo(t), this._$pulledDownText = n("<div>").text(this.option("pulledDownText")).appendTo(t), this._$refreshingText = n("<div>").text(this.option("refreshingText")).appendTo(t), this._$pullDown.empty().append(i).append(r.append(u)).append(t)
            }, _releaseState: function() {
                this._state = e, this._refreshPullDownText()
            }, _refreshPullDownText: function() {
                this._$pullingDownText.css("opacity", this._state === e ? 1 : 0), this._$pulledDownText.css("opacity", this._state === r ? 1 : 0), this._$refreshingText.css("opacity", this._state === u ? 1 : 0)
            }, update: function() {
                this.callBase(), this._setTopPocketOffset()
            }, _updateDimensions: function() {
                this.callBase(), this._topPocketSize = this._$topPocket.height(), this._bottomPocketSize = this._$bottomPocket.height(), this._scrollOffset = this._$container.height() - this._$content.height()
            }, _allowedDirections: function() {
                var n = this.callBase();
                return n.vertical = n.vertical || this._pullDownEnabled, n
            }, _setTopPocketOffset: function() {
                this._$topPocket.css({top: -this._topPocketSize})
            }, handleEnd: function() {
                this._complete()
            }, handleStop: function() {
                this._complete()
            }, _complete: function() {
                this._state === r && (this._setPullDownOffset(this._topPocketSize), clearTimeout(this._pullDownRefreshTimeout), this._pullDownRefreshTimeout = setTimeout(n.proxy(function() {
                    this._pullDownRefreshing()
                }, this), 400))
            }, _setPullDownOffset: function(n) {
                t.translator.move(this._$topPocket, {top: n}), t.translator.move(this._$scrollViewContent, {top: n})
            }, handleScroll: function(n) {
                (this.callBase(n), this._state !== u) && (this._location = this.location().top, this._isPullDown() ? this._pullDownReady() : this._isReachBottom() ? this._reachBottom() : this._stateReleased())
            }, _isPullDown: function() {
                return this._pullDownEnabled && this._location >= this._topPocketSize
            }, _isReachBottom: function() {
                return this._reachBottomEnabled && this._location <= this._scrollOffset + this._bottomPocketSize
            }, _reachBottom: function() {
                this._state !== h && (this._state = h, this.reachBottomCallbacks.fire())
            }, _pullDownReady: function() {
                this._state !== r && (this._state = r, this._$pullDown.addClass(f), this._refreshPullDownText())
            }, _stateReleased: function() {
                this._state !== e && (this._$pullDown.removeClass(s).removeClass(f), this._releaseState())
            }, _pullDownRefreshing: function() {
                this._state !== u && (this._state = u, this._$pullDown.addClass(s).removeClass(f), this._refreshPullDownText(), this.pullDownCallbacks.fire())
            }, pullDownEnable: function(n) {
                this._pullDownEnabled = n
            }, reachBottomEnable: function(n) {
                this._reachBottomEnabled = n
            }, pendingRelease: function() {
                this._state = r
            }, release: function() {
                var t = n.Deferred();
                return this._updateDimensions(), clearTimeout(this._releaseTimeout), this._releaseTimeout = setTimeout(n.proxy(function() {
                    this._setPullDownOffset(0), this._stateReleased(), this.releaseCallbacks.fire(), this._updateAction(), t.resolve()
                }, this), 400), t.promise()
            }, dispose: function() {
                clearTimeout(this._pullDownRefreshTimeout), clearTimeout(this._releaseTimeout), this.callBase()
            }});
        o.dxScrollView.refreshStrategies.pullDown = v
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, s = r.events, h = Math, c = "dx-scrollview-pull-down-loading", y = "dx-scrollview-obsolete-android-browser", l = 160, u = 0, a = 1, f = 2, p = 3, e = 4, o = 5, v = r.dxScrollable.NativeStrategy.inherit({_init: function(n) {
                this.callBase(n), this._$topPocket = n._$topPocket, this._$bottomPocket = n._$bottomPocket, this._$pullDown = n._$pullDown, this._$scrollViewContent = n.content(), this._initCallbacks(), this._releaseState(), this._location = 0
            }, _initCallbacks: function() {
                this.pullDownCallbacks = n.Callbacks(), this.releaseCallbacks = n.Callbacks(), this.reachBottomCallbacks = n.Callbacks()
            }, render: function() {
                this.callBase(), this._renderPullDown()
            }, _renderPullDown: function() {
                this._$pullDown.empty().append(n("<div class='dx-scrollview-pulldown-pointer1'>")).append(n("<div class='dx-scrollview-pulldown-pointer2'>")).append(n("<div class='dx-scrollview-pulldown-pointer3'>")).append(n("<div class='dx-scrollview-pulldown-pointer4'>"))
            }, _releaseState: function() {
                this._state = u, this._$pullDown.css({width: "0%", opacity: 0}), this._updateDimensions()
            }, _updateDimensions: function() {
                this.callBase(), this._topPocketSize = this._$topPocket.height(), this._bottomPocketSize = this._$bottomPocket.height(), this._scrollOffset = this._$container.height() - this._$content.height()
            }, _allowedDirections: function() {
                var n = this.callBase();
                return n.vertical = n.vertical || this._pullDownEnabled, n
            }, handleInit: function(n) {
                this.callBase(n), this._state === u && this._location === 0 && (this._startClientY = s.eventData(n.originalEvent).y, this._state = e)
            }, handleMove: function(n) {
                if (this.callBase(n), this._deltaY = s.eventData(n.originalEvent).y - this._startClientY, this._state === e && (this._pullDownEnabled && this._deltaY > 0 ? (n.preventDefault(), this._state = o) : this._complete()), this._state === o) {
                    if (this._deltaY < 0) {
                        this._complete();
                        return
                    }
                    this._$pullDown.css({opacity: 1, width: h.min(h.abs(this._deltaY * 100 / l), 100) + "%"}), this._isPullDown() && this._pullDownRefreshing()
                }
            }, _isPullDown: function() {
                return this._pullDownEnabled && this._deltaY >= l
            }, handleEnd: function() {
                this._complete()
            }, handleStop: function() {
                this._complete()
            }, _complete: function() {
                (this._state === e || this._state === o) && this._releaseState()
            }, handleScroll: function(n) {
                if (this.callBase(n), this._state !== f) {
                    var t = this.location().top, i = this._location - t;
                    this._location = t, i > 0 && this._isReachBottom() ? this._reachBottom() : this._stateReleased()
                }
            }, _isReachBottom: function() {
                return this._reachBottomEnabled && this._location <= this._scrollOffset + this._bottomPocketSize
            }, _reachBottom: function() {
                this.reachBottomCallbacks.fire()
            }, _stateReleased: function() {
                this._state !== u && (this._$pullDown.removeClass(c), this._releaseState())
            }, _pullDownRefreshing: function() {
                this._state !== f && (this._state = f, clearTimeout(this._pullDownRefreshTimeout), this._pullDownRefreshTimeout = setTimeout(n.proxy(function() {
                    this._$pullDown.addClass(c), this.pullDownCallbacks.fire()
                }, this), 400))
            }, pullDownEnable: function(n) {
                this._$topPocket.toggle(n), this._pullDownEnabled = n
            }, reachBottomEnable: function(n) {
                this._reachBottomEnabled = n
            }, pendingRelease: function() {
                this._state = a
            }, release: function() {
                var t = n.Deferred();
                return this._updateDimensions(), clearTimeout(this._releaseTimeout), this._releaseTimeout = setTimeout(n.proxy(function() {
                    this._stateReleased(), this.releaseCallbacks.fire(), this._updateAction(), t.resolve()
                }, this), 800), t.promise()
            }, dispose: function() {
                clearTimeout(this._pullDownRefreshTimeout), clearTimeout(this._releaseTimeout), this.callBase()
            }});
        r.dxScrollView.refreshStrategies.swipeDown = v
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, h = "dxSlideDownNativeScrollViewStrategy", r = 0, e = 1, f = 2, o = 80, s = u.dxScrollable.NativeStrategy.inherit({_init: function(n) {
                this.callBase(n), this._$topPocket = n._$topPocket, this._$bottomPocket = n._$bottomPocket, this._initCallbacks()
            }, _initCallbacks: function() {
                this.pullDownCallbacks = n.Callbacks(), this.releaseCallbacks = n.Callbacks(), this.reachBottomCallbacks = n.Callbacks()
            }, render: function() {
                this.callBase(), this._renderPullDown(), this._renderBottom(), this._releaseState(), this._updateDimensions()
            }, _renderPullDown: function() {
                this._$topPocket.empty()
            }, _renderBottom: function() {
                this._$bottomPocket.empty().append("<progress>")
            }, _releaseState: function() {
                this._state !== r && (this._state = r)
            }, _updateDimensions: function() {
                this._scrollOffset = this._$container.prop("scrollHeight") - this._$container.prop("clientHeight"), this._containerSize = {height: this._$container.prop("clientHeight"), width: this._$container.prop("clientWidth")}, this._contentSize = this._componentContentSize = {height: this._$container.prop("scrollHeight"), width: this._$container.prop("scrollWidth")}
            }, handleScroll: function(n) {
                this.callBase(n), this._isReachBottom(this._lastLocation.top) && this._reachBottom()
            }, _isReachBottom: function(n) {
                return this._scrollContent = this._$container.prop("scrollHeight") - this._$container.prop("clientHeight"), this._reachBottomEnabled && n < -this._scrollContent + o
            }, _reachBottom: function() {
                this._state !== f && (this._state = f, this.reachBottomCallbacks.fire())
            }, pullDownEnable: function(n) {
                this._pullDownEnabled = n
            }, reachBottomEnable: function(n) {
                this._reachBottomEnabled = n, this._$bottomPocket.toggle(n)
            }, pendingRelease: function() {
                this._state = e
            }, release: function() {
                var t = n.Deferred();
                return this._state = r, this.releaseCallbacks.fire(), this.update(), t.resolve().promise()
            }});
        u.dxScrollView.refreshStrategies.slideDown = s
    }(jQuery, DevExpress), function(n, t) {
        var f = t.ui, h = Math, c = "dx-scrollview-pull-down-loading", e = "dx-scrollview-pull-down-ready", l = "dx-scrollview-pull-down-image", a = "dx-scrollview-pull-down-indicator", v = "dx-scrollview-pull-down-text", r = 0, u = 1, o = 2, s = 3, y = f.dxScrollView.Scroller = f.dxScrollable.Scroller.inherit({ctor: function() {
                this.callBase.apply(this, arguments), this._initCallbacks(), this._releaseState()
            }, _releaseState: function() {
                this._state = r, this._refreshPullDownText()
            }, _refreshPullDownText: function() {
                this._$pullingDownText.css("opacity", this._state === r ? 1 : 0), this._$pulledDownText.css("opacity", this._state === u ? 1 : 0), this._$refreshingText.css("opacity", this._state === o ? 1 : 0)
            }, _initCallbacks: function() {
                this.pullDownCallbacks = n.Callbacks(), this.releaseCallbacks = n.Callbacks(), this.reachBottomCallbacks = n.Callbacks()
            }, _updateBounds: function() {
                var n = this._direction !== "horizontal";
                this._topPocketSize = n ? this._$topPocket[this._dimension]() : 0, this._bottomPocketSize = n ? this._$bottomPocket[this._dimension]() : 0, this._updateOffsets()
            }, _updateOffsets: function() {
                this._minOffset = h.min(this._containerSize() - this._contentSize(), -this._topPocketSize), this._maxOffset = -this._topPocketSize, this._bottomBound = this._minOffset
            }, _updateScrollbar: function() {
                this._scrollbar.option({containerSize: this._containerSize(), contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize})
            }, _moveContent: function() {
                this.callBase(), this._isPullDown() ? this._pullDownReady() : this._isReachBottom() ? this._reachBottomReady() : this._state !== r && this._stateReleased()
            }, _moveScrollbar: function() {
                this._scrollbar.moveTo(this._topPocketSize + this._location)
            }, _isPullDown: function() {
                return this._pullDownEnabled && this._location >= 0
            }, _isReachBottom: function() {
                return this._reachBottomEnabled && this._location <= this._bottomBound
            }, _scrollComplete: function() {
                this._inBounds() && this._state === u ? this._pullDownRefreshing() : this._inBounds() && this._state === s ? this._reachBottomLoading() : this.callBase()
            }, _reachBottomReady: function() {
                this._state !== s && (this._state = s, this._minOffset = h.min(this._containerSize() - this._contentSize(), 0))
            }, _reachBottomLoading: function() {
                this.reachBottomCallbacks.fire()
            }, _pullDownReady: function() {
                this._state !== u && (this._state = u, this._maxOffset = 0, this._$pullDown.addClass(e), this._refreshPullDownText())
            }, _stateReleased: function() {
                this._state !== r && (this._releaseState(), this._updateOffsets(), this._$pullDown.removeClass(c).removeClass(e), this.releaseCallbacks.fire())
            }, _pullDownRefreshing: function() {
                this._state !== o && (this._state = o, this._$pullDown.addClass(c).removeClass(e), this._refreshPullDownText(), this.pullDownCallbacks.fire())
            }, _releaseHandler: function() {
                return this._state === r && this._moveToBounds(), this._update(), t.utils.executeAsync(n.proxy(this._release, this))
            }, _release: function() {
                this._stateReleased(), this._scrollComplete()
            }, _reachBottomEnablingHandler: function(n) {
                this._reachBottomEnabled !== n && (this._reachBottomEnabled = n, this._updateBounds())
            }, _pullDownEnablingHandler: function(n) {
                this._pullDownEnabled !== n && (this._pullDownEnabled = n, this._considerTopPocketChange(), this._updateHandler())
            }, _considerTopPocketChange: function() {
                this._location -= this._$topPocket.height() || -this._topPocketSize, this._move()
            }, _pendingReleaseHandler: function() {
                this._state = u
            }}), p = f.dxScrollable.SimulatedStrategy.inherit({_init: function(n) {
                this.callBase(n), this._$pullDown = n._$pullDown, this._$topPocket = n._$topPocket, this._$bottomPocket = n._$bottomPocket, this._initCallbacks()
            }, _initCallbacks: function() {
                this.pullDownCallbacks = n.Callbacks(), this.releaseCallbacks = n.Callbacks(), this.reachBottomCallbacks = n.Callbacks()
            }, render: function() {
                this._renderPullDown(), this.callBase()
            }, _renderPullDown: function() {
                var i = n("<div>").addClass(l), r = n("<div>").addClass(a), u = n("<div>").dxLoadIndicator(), t = this._$pullDownText = n("<div>").addClass(v);
                this._$pullingDownText = n("<div>").text(this.option("pullingDownText")).appendTo(t), this._$pulledDownText = n("<div>").text(this.option("pulledDownText")).appendTo(t), this._$refreshingText = n("<div>").text(this.option("refreshingText")).appendTo(t), this._$pullDown.empty().append(i).append(r.append(u)).append(t)
            }, pullDownEnable: function(n) {
                this._eventHandler("pullDownEnabling", n)
            }, reachBottomEnable: function(n) {
                this._eventHandler("reachBottomEnabling", n)
            }, _createScroller: function(n) {
                var t = this, i = t._scrollers[n] = new y(t._scrollerOptions(n));
                i.pullDownCallbacks.add(function() {
                    t.pullDownCallbacks.fire()
                }), i.releaseCallbacks.add(function() {
                    t.releaseCallbacks.fire()
                }), i.reachBottomCallbacks.add(function() {
                    t.reachBottomCallbacks.fire()
                })
            }, _scrollerOptions: function(t) {
                return n.extend(this.callBase(t), {$topPocket: this._$topPocket, $bottomPocket: this._$bottomPocket, $pullDown: this._$pullDown, $pullDownText: this._$pullDownText, $pullingDownText: this._$pullingDownText, $pulledDownText: this._$pulledDownText, $refreshingText: this._$refreshingText})
            }, pendingRelease: function() {
                this._eventHandler("pendingRelease")
            }, release: function() {
                return this._eventHandler("release").done(this._updateAction)
            }, location: function() {
                var n = this.callBase();
                return n.top += this._$topPocket.height(), n
            }});
        f.dxScrollView.refreshStrategies.simulated = p
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, h = r.events, e = t.utils, c = t.support.winJS, o = e.wrapToArray, u = e.removeDublicates, l = t.inflector.titleize, a = "dx-map", v = "dx-map-container", s = "dx-map-shield", f;
        t.registerComponent("dxMap", r, r.Widget.inherit({ctor: function() {
                this.callBase.apply(this, arguments), this.addMarker = n.proxy(this._addFunction, this, "markers"), this.removeMarker = n.proxy(this._removeFunction, this, "markers"), this.addRoute = n.proxy(this._addFunction, this, "routes"), this.removeRoute = n.proxy(this._removeFunction, this, "routes")
            }, _addFunction: function(t, i) {
                var u = n.Deferred(), e = this, f = n.Deferred(), r = this.option(t), s = o(i);
                return r.push.apply(r, s), this._notificationDeffered = f, this.option(t, r), f.done(function(n) {
                    u.resolveWith(e, n && n.length > 1 ? [n] : n)
                }), u.promise()
            }, _removeFunction: function(i, r) {
                var f = n.Deferred(), s = this, e = n.Deferred(), u = this.option(i), h = o(r);
                return n.each(h, function(r, f) {
                    var e = n.isNumeric(f) ? f : n.inArray(f, u);
                    if (e !== -1)
                        u.splice(e, 1);
                    else
                        throw t.log("E1021", l(i.substring(0, i.length - 1)), f);
                }), this._notificationDeffered = e, this.option(i, u), e.done(function() {
                    f.resolveWith(s)
                }), f.promise()
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {updateAction: {since: "14.1", alias: "onUpdated"}, location: {since: "14.1", alias: "center"}, markerAddedAction: {since: "14.2", alias: "onMarkerAdded"}, markerRemovedAction: {since: "14.2", alias: "onMarkerRemoved"}, readyAction: {since: "14.2", alias: "onReady"}, routeAddedAction: {since: "14.2", alias: "onRouteAdded"}, routeRemovedAction: {since: "14.2", alias: "onRouteRemoved"}, clickAction: {since: "14.2", alias: "onClick"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({bounds: {northEast: null, southWest: null}, center: {lat: 0, lng: 0}, zoom: 1, width: 300, height: 300, type: "roadmap", provider: "google", autoAdjust: !0, markers: [], markerIconSrc: null, onMarkerAdded: null, onMarkerRemoved: null, routes: [], onRouteAdded: null, onRouteRemoved: null, key: {bing: "", google: "", googleStatic: ""}, controls: !1, onReady: null, onUpdated: null, onClick: null})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this._asyncQueue = [], this._checkProvider(), this._checkMarkersOption(this.option("markers")), this._checkRoutesOption(this.option("routes")), this.callBase(), this._initContainer(), this._grabEvents(), this._cleanRenderedMarkers(), this._cleanRenderedRoutes()
            }, _checkProvider: function() {
                if (c && this.option("provider") === "google")
                    throw t.Error("E1024");
            }, _checkMarkersOption: function(i) {
                if (!n.isArray(i))
                    throw t.Error("E1022");
            }, _checkRoutesOption: function(i) {
                if (!n.isArray(i))
                    throw t.Error("E1023");
            }, _initContainer: function() {
                this._$container = n("<div />").addClass(v), this.element().append(this._$container)
            }, _grabEvents: function() {
                var t = h.addNamespace("dxpointerdown", this.NAME);
                this.element().on(t, n.proxy(this._cancelEvent, this))
            }, _cancelEvent: function(n) {
                var i = this._provider.cancelEvents && !this.option("disabled");
                !t.designMode && i && n.stopPropagation()
            }, _cleanRenderedMarkers: function() {
                this._renderedMarkers = []
            }, _cleanRenderedRoutes: function() {
                this._renderedRoutes = []
            }, _render: function() {
                this.callBase(), this.element().addClass(a), this._renderShield(), this._queueAsyncAction("render", this.option("markers"), this.option("routes")), this._saveRenderedMarkers(), this._saveRenderedRoutes()
            }, _saveRenderedMarkers: function(n) {
                n = n || this.option("markers"), this._renderedMarkers = n.slice()
            }, _saveRenderedRoutes: function(n) {
                n = n || this.option("routes"), this._renderedRoutes = n.slice()
            }, _renderShield: function() {
                var i;
                t.designMode || this.option("disabled") ? (i = n("<div/>").addClass(s), this.element().append(i)) : (i = this.element().find("." + s), i.remove())
            }, _clean: function() {
                (this._cleanFocusState(), this._provider) && (this._queueAsyncAction("clean"), this._cleanRenderedMarkers(), this._cleanRenderedRoutes())
            }, _optionChanged: function(i) {
                var f = i.value, e = i.previousValue, r;
                if (!this._cancelOptionChange) {
                    r = this._notificationDeffered, delete this._notificationDeffered;
                    switch (i.name) {
                        case"disabled":
                            this._renderShield(), this.callBase(i);
                            break;
                        case"width":
                        case"height":
                            this.callBase(i), this._dimensionChanged();
                            break;
                        case"provider":
                            this._invalidate();
                            break;
                        case"key":
                            t.log("W1001");
                            break;
                        case"bounds":
                            this._queueAsyncAction("updateBounds");
                            break;
                        case"center":
                            this._queueAsyncAction("updateCenter");
                            break;
                        case"zoom":
                            this._queueAsyncAction("updateZoom");
                            break;
                        case"type":
                            this._queueAsyncAction("updateMapType");
                            break;
                        case"controls":
                            this._queueAsyncAction("updateControls", this.option("markers"), this.option("routes"));
                            break;
                        case"autoAdjust":
                            this._queueAsyncAction("adjustViewport");
                            break;
                        case"markers":
                            this._checkMarkersOption(f), this._queueAsyncAction("updateMarkers", r ? u(this._renderedMarkers, f) : this._renderedMarkers, r ? u(f, this._renderedMarkers) : f).done(n.proxy(function() {
                                r && r.resolve.apply(r, arguments)
                            }, this)), this._saveRenderedMarkers(f);
                            break;
                        case"markerIconSrc":
                            this._queueAsyncAction("updateMarkers", this._renderedMarkers, this._renderedMarkers);
                            break;
                        case"routes":
                            this._checkRoutesOption(f), this._queueAsyncAction("updateRoutes", r ? u(this._renderedRoutes, f) : this._renderedRoutes, r ? u(f, this._renderedRoutes) : f).done(n.proxy(function() {
                                r && r.resolve.apply(r, arguments)
                            }, this)), this._saveRenderedRoutes(f);
                            break;
                        case"onReady":
                        case"onUpdated":
                        case"onMarkerAdded":
                        case"onMarkerRemoved":
                        case"onRouteAdded":
                        case"onRouteRemoved":
                        case"onClick":
                            break;
                        default:
                            this.callBase.apply(this, arguments)
                        }
                }
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _dimensionChanged: function() {
                this._queueAsyncAction("updateDimensions")
            }, _queueAsyncAction: function(t) {
                var i = n.Deferred(), r = !this._asyncQueue.length;
                return this._asyncQueue.push({name: t, options: n.makeArray(arguments).slice(1), deferred: i}), r && this._enqueueAsyncAction(), i.promise()
            }, _enqueueAsyncAction: function() {
                var t = !this._asyncQueue.length;
                t || this._execAsyncAction(this._asyncQueue[0]).done(n.proxy(function() {
                    this._asyncQueue.shift(), this._enqueueAsyncAction()
                }, this))
            }, _execAsyncAction: function(t) {
                var i = n.Deferred(), r = t.name, e = t.options, u = t.deferred, f = this._getProvider(r);
                return f[r].apply(f, e).done(n.proxy(function(t) {
                    u.resolve.apply(u, n.makeArray(arguments).slice(1)), t && this._triggerReadyAction(), i.resolve()
                }, this)), i.promise()
            }, _getProvider: function(n) {
                var t = this.option("provider");
                return n !== "clean" && this._usedProvider !== t && (this._provider = new f[t](this, this._$container), this._usedProvider = t), this._provider
            }, _triggerReadyAction: function() {
                this._createActionByOption("onReady")({originalMap: this._provider.map()})
            }, _triggerUpdateAction: function() {
                this._createActionByOption("onUpdated")()
            }, setOptionSilent: function(n, t) {
                this._cancelOptionChange = !0, this.option(n, t), this._cancelOptionChange = !1
            }})), f = {}, r.dxMap.registerProvider = function(n, t) {
            f[n] = t
        }
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, u = r.events;
        r.dxMap.Provider = t.Class.inherit({_defaultRouteWeight: function() {
                return 5
            }, _defaultRouteOpacity: function() {
                return.5
            }, _defaultRouteColor: function() {
                return"#0000FF"
            }, cancelEvents: !1, ctor: function(n, t) {
                this._mapWidget = n, this._$container = t
            }, render: function(t, i) {
                var r = n.Deferred();
                return this._renderImpl().done(n.proxy(function() {
                    var u = this.addMarkers(t), f = this.addRoutes(i);
                    n.when(u, f).done(function() {
                        r.resolve(!0)
                    })
                }, this)), r.promise()
            }, _renderImpl: t.abstract, updateDimensions: t.abstract, updateMapType: t.abstract, updateBounds: t.abstract, updateCenter: t.abstract, updateZoom: t.abstract, updateControls: t.abstract, updateMarkers: function(t, i) {
                var r = n.Deferred(), u = this;
                return this.removeMarkers(t).done(function() {
                    u.addMarkers(i).done(function() {
                        r.resolve.apply(r, arguments)
                    })
                }), r.promise()
            }, addMarkers: t.abstract, removeMarkers: t.abstract, adjustViewport: t.abstract, updateRoutes: function(t, i) {
                var r = n.Deferred(), u = this;
                return this.removeRoutes(t).done(function() {
                    u.addRoutes(i).done(function() {
                        r.resolve.apply(r, arguments)
                    })
                }), r.promise()
            }, addRoutes: t.abstract, removeRoutes: t.abstract, clean: t.abstract, map: function() {
                return this._map
            }, _option: function(n, t) {
                if (t === i)
                    return this._mapWidget.option(n);
                this._mapWidget.setOptionSilent(n, t)
            }, _keyOption: function(n) {
                var t = this._option("key");
                return t[n] === i ? t : t[n]
            }, _parseTooltipOptions: function(n) {
                return{text: n.text || n, visible: n.isShown || !1}
            }, _isBoundsSetted: function() {
                return this._option("bounds.northEast") && this._option("bounds.southWest")
            }, _addEventNamespace: function(n) {
                return u.addNamespace(n, this._mapWidget.NAME)
            }, _createAction: function() {
                var n = this._mapWidget;
                return n._createAction.apply(n, arguments)
            }, _fireAction: function(n, t) {
                var i = this._option(n);
                i && this._createAction(i)(t)
            }, _fireClickAction: function(n) {
                this._fireAction("onClick", n)
            }, _fireMarkerAddedAction: function(n) {
                this._fireAction("onMarkerAdded", n)
            }, _fireMarkerRemovedAction: function(n) {
                this._fireAction("onMarkerRemoved", n)
            }, _fireRouteAddedAction: function(n) {
                this._fireAction("onRouteAdded", n)
            }, _fireRouteRemovedAction: function(n) {
                this._fireAction("onRouteRemoved", n)
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = "https://maps.google.com/maps/api/staticmap?";
        r.dxMap.registerProvider("googleStatic", r.dxMap.Provider.inherit({_locationToString: function(t) {
                return n.isPlainObject(t) ? t.lat + "," + t.lng : t.toString().replace(/ /g, "+")
            }, _renderImpl: function() {
                return this._updateMap()
            }, updateDimensions: function() {
                return this._updateMap()
            }, updateMapType: function() {
                return this._updateMap()
            }, updateBounds: function() {
                return n.Deferred().resolve().promise()
            }, updateCenter: function() {
                return this._updateMap()
            }, updateZoom: function() {
                return this._updateMap()
            }, updateControls: function() {
                return n.Deferred().resolve().promise()
            }, addMarkers: function(t) {
                var i = this;
                return this._updateMap().done(function() {
                    n.each(t, function(n, t) {
                        i._fireMarkerAddedAction({options: t})
                    })
                })
            }, removeMarkers: function(t) {
                var i = this;
                return this._updateMap().done(function() {
                    n.each(t, function(n, t) {
                        i._fireMarkerRemovedAction({options: t})
                    })
                })
            }, adjustViewport: function() {
                return n.Deferred().resolve().promise()
            }, addRoutes: function(t) {
                var i = this;
                return this._updateMap().done(function() {
                    n.each(t, function(n, t) {
                        i._fireRouteAddedAction({options: t})
                    })
                })
            }, removeRoutes: function(t) {
                var i = this;
                return this._updateMap().done(function() {
                    n.each(t, function(n, t) {
                        i._fireRouteRemovedAction({options: t})
                    })
                })
            }, clean: function() {
                return this._$container.css("background-image", "none"), this._$container.off(this._addEventNamespace("dxclick")), n.Deferred().resolve().promise()
            }, mapRendered: function() {
                return!0
            }, _updateMap: function() {
                var i = this._keyOption("googleStatic"), r = this._$container, t = ["sensor=false", "size=" + r.width() + "x" + r.height(), "maptype=" + this._option("type"), "center=" + this._locationToString(this._option("center")), "zoom=" + this._option("zoom"), this._markersSubstring()], f;
                return t.push.apply(t, this._routeSubstrings()), i && t.push("key=" + i), f = u + t.join("&"), this._$container.css("background", 'url("' + f + '") no-repeat 0 0'), this._attachClickEvent(), n.Deferred().resolve(!0).promise()
            }, _markersSubstring: function() {
                var r = this, t = [], i = this._option("markerIconSrc");
                return i && t.push("icon:" + i), n.each(this._option("markers"), function(n, i) {
                    t.push(r._locationToString(i.location))
                }), "markers=" + t.join("|")
            }, _routeSubstrings: function() {
                var i = this, r = [];
                return n.each(this._option("routes"), function(u, f) {
                    var o = new t.Color(f.color || i._defaultRouteColor()).toHex().replace("#", "0x"), s = Math.round((f.opacity || i._defaultRouteOpacity()) * 255).toString(16), h = f.weight || i._defaultRouteWeight(), e = [];
                    n.each(f.locations, function(n, t) {
                        e.push(i._locationToString(t))
                    }), r.push("path=color:" + o + s + "|weight:" + h + "|" + e.join("|"))
                }), r
            }, _attachClickEvent: function() {
                var t = this, n = this._addEventNamespace("dxclick");
                this._$container.off(n).on(n, function(n) {
                    t._fireClickAction({jQueryEvent: n})
                })
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = r.events;
        r.dxMap.DynamicProvider = r.dxMap.Provider.inherit({cancelEvents: !0, _renderImpl: function() {
                var r = n.Deferred();
                return this._load().done(n.proxy(function() {
                    this._init().done(n.proxy(function() {
                        var t = this.updateMapType(), i = this._isBoundsSetted() ? this.updateBounds() : this.updateCenter();
                        n.when(t, i).done(n.proxy(function() {
                            this._attachHandlers(), setTimeout(function() {
                                r.resolve()
                            })
                        }, this))
                    }, this))
                }, this)), r.promise()
            }, _load: function() {
                return this._mapsLoader || (this._mapsLoader = n.Deferred(), this._loadImpl().done(n.proxy(function() {
                    this._mapsLoader.resolve()
                }, this))), this._markers = [], this._routes = [], this._mapsLoader.promise()
            }, _loadImpl: t.abstract, _init: t.abstract, _attachHandlers: t.abstract, addMarkers: function(t) {
                var i = n.Deferred(), r = this, u = n.map(t, function(n) {
                    return r._addMarker(n)
                });
                return n.when.apply(n, u).done(function() {
                    var t = n.map(n.makeArray(arguments), function(n) {
                        return n.marker
                    });
                    i.resolve(!1, t)
                }), i.promise()
            }, _addMarker: function(t) {
                var i = this;
                return this._renderMarker(t).done(function(r) {
                    i._markers.push(n.extend({options: t}, r)), i._fitBounds(), i._fireMarkerAddedAction({options: t, originalMarker: r.marker})
                })
            }, _renderMarker: t.abstract, removeMarkers: function(t) {
                var i = this;
                return n.each(t, function(n, t) {
                    i._removeMarker(t)
                }), n.Deferred().resolve().promise()
            }, _removeMarker: function(t) {
                var i = this;
                n.each(this._markers, function(n, r) {
                    return r.options !== t ? !0 : (i._destroyMarker(r), i._markers.splice(n, 1), i._fireMarkerRemovedAction({options: r.options}), !1)
                })
            }, _destroyMarker: t.abstract, _clearMarkers: function() {
                for (var n = 0; this._markers.length > 0; )
                    this._removeMarker(this._markers[0].options)
            }, addRoutes: function(t) {
                var i = n.Deferred(), r = this, u = n.map(t, function(n) {
                    return r._addRoute(n)
                });
                return n.when.apply(n, u).done(function() {
                    var t = n.map(n.makeArray(arguments), function(n) {
                        return n.instance
                    });
                    i.resolve(!1, t)
                }), i.promise()
            }, _addRoute: function(t) {
                var i = this;
                return this._renderRoute(t).done(function(r) {
                    i._routes.push(n.extend({options: t}, r)), i._fitBounds(), i._fireRouteAddedAction({options: t, originalRoute: r.instance})
                })
            }, _renderRoute: t.abstract, removeRoutes: function(t) {
                var i = this;
                return n.each(t, function(n, t) {
                    i._removeRoute(t)
                }), n.Deferred().resolve().promise()
            }, _removeRoute: function(t) {
                var i = this;
                n.each(this._routes, function(n, r) {
                    return r.options !== t ? !0 : (i._destroyRoute(r), i._routes.splice(n, 1), i._fireRouteRemovedAction({options: t}), !1)
                })
            }, _destroyRoute: t.abstract, _clearRoutes: function() {
                for (var n = 0; this._routes.length > 0; )
                    this._removeRoute(this._routes[0].options)
            }, adjustViewport: function() {
                return this._fitBounds()
            }, _fitBounds: t.abstract, _updateBounds: function() {
                var t = this;
                this._clearBounds(), n.each(this._markers, function(n, i) {
                    t._extendBounds(i.location)
                }), n.each(this._routes, function(n, i) {
                    t._extendBounds(i.northEast), t._extendBounds(i.southWest)
                })
            }, _clearBounds: function() {
                this._bounds = null
            }, _extendBounds: t.abstract})
    }(jQuery, DevExpress), function(n, t, i) {
        var f = t.ui, s = t.support.winJS, u = "_bingScriptReady", h = "https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1&onScriptLoad=" + u, c = "ms-appx:///Bing.Maps.JavaScript/js/veapicore.js", l = "ms-appx:///Bing.Maps.JavaScript/js/veapiModules.js", a = "AhuxC0dQ1DBTNo8L-H9ToVMQStmizZzBJdraTSgCzDSWPsA1Qd8uIvFSflzxdaLH", e = 1e-16, o = function() {
            return window.Microsoft && window.Microsoft.Maps
        }, r;
        f.dxMap.registerProvider("bing", f.dxMap.DynamicProvider.inherit({_mapType: function(n) {
                var t = {roadmap: Microsoft.Maps.MapTypeId.road, hybrid: Microsoft.Maps.MapTypeId.aerial, satellite: Microsoft.Maps.MapTypeId.aerial};
                return t[n] || t.road
            }, _movementMode: function(n) {
                var t = {driving: Microsoft.Maps.Directions.RouteMode.driving, walking: Microsoft.Maps.Directions.RouteMode.walking};
                return t[n] || t.driving
            }, _resolveLocation: function(t) {
                var i = n.Deferred(), r, u;
                return typeof t == "string" ? (r = new Microsoft.Maps.Search.SearchManager(this._map), u = {where: t, count: 1, callback: function(n) {
                        var t = n.results[0].location;
                        i.resolve(new Microsoft.Maps.Location(t.latitude, t.longitude))
                    }}, r.geocode(u)) : n.isPlainObject(t) && n.isNumeric(t.lat) && n.isNumeric(t.lng) ? i.resolve(new Microsoft.Maps.Location(t.lat, t.lng)) : n.isArray(t) && i.resolve(new Microsoft.Maps.Location(t[0], t[1])), i.promise()
            }, _normalizeLocation: function(n) {
                return{lat: n.latitude, lng: n.longitude}
            }, _normalizeLocationRect: function(n) {
                var t = this._normalizeLocation(n.getNorthwest()), i = this._normalizeLocation(n.getSoutheast());
                return{northEast: {lat: t.lat, lng: i.lng}, southWest: {lat: i.lat, lng: t.lng}}
            }, _loadImpl: function() {
                return this._msMapsLoader = n.Deferred(), o() ? this._mapReady() : (r && (r.state() != "resolved" || o()) || (r = n.Deferred(), window[u] = n.proxy(r.resolve, r), s ? n.when(n.getScript(c), n.getScript(l)).done(function() {
                    Microsoft.Maps.loadModule("Microsoft.Maps.Map", {callback: window[u]})
                }) : n.getScript(h)), r.done(n.proxy(this._mapReady, this))), this._msMapsLoader.promise()
            }, _mapReady: function() {
                try {
                    delete window[u]
                } catch (f) {
                    window[u] = i
                }
                var t = n.Deferred(), r = n.Deferred();
                Microsoft.Maps.loadModule("Microsoft.Maps.Search", {callback: n.proxy(t.resolve, t)}), Microsoft.Maps.loadModule("Microsoft.Maps.Directions", {callback: n.proxy(r.resolve, r)}), n.when(t, r).done(n.proxy(function() {
                    this._msMapsLoader.resolve()
                }, this))
            }, _init: function() {
                var r = n.Deferred(), t = n.Deferred(), i = this._option("controls"), u;
                return this._map = new Microsoft.Maps.Map(this._$container[0], {credentials: this._keyOption("bing") || a, zoom: this._option("zoom"), showDashboard: i, showMapTypeSelector: i, showScalebar: i}), u = Microsoft.Maps.Events.addHandler(this._map, "tiledownloadcomplete", n.proxy(t.resolve, t)), n.when(t).done(n.proxy(function() {
                    Microsoft.Maps.Events.removeHandler(u), r.resolve()
                }, this)), r.promise()
            }, _attachHandlers: function() {
                this._providerViewChangeHandler = Microsoft.Maps.Events.addHandler(this._map, "viewchange", n.proxy(this._viewChangeHandler, this)), this._providerClickHandler = Microsoft.Maps.Events.addHandler(this._map, "click", n.proxy(this._clickActionHandler, this))
            }, _viewChangeHandler: function() {
                var t = this._map.getBounds(), n;
                this._option("bounds", this._normalizeLocationRect(t)), n = this._map.getCenter(), this._option("center", this._normalizeLocation(n)), this._preventZoomChangeEvent || this._option("zoom", this._map.getZoom())
            }, _clickActionHandler: function(n) {
                if (n.targetType == "map") {
                    var t = new Microsoft.Maps.Point(n.getX(), n.getY()), i = n.target.tryPixelToLocation(t);
                    this._fireClickAction({location: this._normalizeLocation(i)})
                }
            }, updateDimensions: function() {
                var t = this._$container;
                return this._map.setOptions({width: t.width(), height: t.height()}), n.Deferred().resolve().promise()
            }, updateMapType: function() {
                var t = this._option("type"), i = Microsoft.Maps.LabelOverlay;
                return this._map.setView({animate: !1, mapTypeId: this._mapType(t), labelOverlay: t == "satellite" ? i.hidden : i.visible}), n.Deferred().resolve().promise()
            }, updateBounds: function() {
                var t = n.Deferred(), i = this, r = this._resolveLocation(this._option("bounds.northEast")), u = this._resolveLocation(this._option("bounds.southWest"));
                return n.when(r, u).done(function(n, r) {
                    var u = new Microsoft.Maps.LocationRect.fromLocations(n, r);
                    i._map.setView({animate: !1, bounds: u}), t.resolve()
                }), t.promise()
            }, updateCenter: function() {
                var t = n.Deferred(), i = this;
                return this._resolveLocation(this._option("center")).done(function(n) {
                    i._map.setView({animate: !1, center: n}), t.resolve()
                }), t.promise()
            }, updateZoom: function() {
                return this._map.setView({animate: !1, zoom: this._option("zoom")}), n.Deferred().resolve().promise()
            }, updateControls: function() {
                return this.clean(), this.render.apply(this, arguments)
            }, _renderMarker: function(i) {
                var u = n.Deferred(), r = this;
                return this._resolveLocation(i.location).done(function(f) {
                    var h = {icon: i.iconSrc || r._option("markerIconSrc")}, e, o, s, c, l, a;
                    i.html && (n.extend(h, {htmlContent: i.html, width: null, height: null}), e = i.htmlOffset, e && (h.anchor = new Microsoft.Maps.Point(-e.left, -e.top))), o = new Microsoft.Maps.Pushpin(f, h), r._map.entities.push(o), s = r._renderTooltip(f, i.tooltip), i.clickAction && (t.log("W0001", "dxMap", "marker.clickAction", "14.2", "Use 'onClick' option instead"), i.onClick = i.clickAction), (i.onClick || i.tooltip) && (l = r._createAction(i.onClick || n.noop), a = r._normalizeLocation(f), c = Microsoft.Maps.Events.addHandler(o, "click", function() {
                        l({location: a}), s && s.setOptions({visible: !0})
                    })), u.resolve({location: f, marker: o, infobox: s, handler: c})
                }), u.promise()
            }, _renderTooltip: function(n, t) {
                if (t) {
                    t = this._parseTooltipOptions(t);
                    var i = new Microsoft.Maps.Infobox(n, {description: t.text, offset: new Microsoft.Maps.Point(0, 33), visible: t.visible});
                    return this._map.entities.push(i, null), i
                }
            }, _destroyMarker: function(n) {
                this._map.entities.remove(n.marker), n.infobox && this._map.entities.remove(n.infobox), n.handler && Microsoft.Maps.Events.removeHandler(n.handler)
            }, _renderRoute: function(i) {
                var u = n.Deferred(), r = this, f = n.map(i.locations, function(n) {
                    return r._resolveLocation(n)
                });
                return n.when.apply(n, f).done(function() {
                    var s = n.makeArray(arguments), f = new Microsoft.Maps.Directions.DirectionsManager(r._map), h = new t.Color(i.color || r._defaultRouteColor()).toHex(), e = new Microsoft.Maps.Color.fromHex(h), o;
                    e.a = (i.opacity || r._defaultRouteOpacity()) * 255, f.setRenderOptions({autoUpdateMapView: !1, displayRouteSelector: !1, waypointPushpinOptions: {visible: !1}, drivingPolylineOptions: {strokeColor: e, strokeThickness: i.weight || r._defaultRouteWeight()}, walkingPolylineOptions: {strokeColor: e, strokeThickness: i.weight || r._defaultRouteWeight()}}), f.setRequestOptions({routeMode: r._movementMode(i.mode), routeDraggable: !1}), n.each(s, function(n, t) {
                        var i = new Microsoft.Maps.Directions.Waypoint({location: t});
                        f.addWaypoint(i)
                    }), o = Microsoft.Maps.Events.addHandler(f, "directionsUpdated", function(n) {
                        Microsoft.Maps.Events.removeHandler(o);
                        var t = n.routeSummary[0];
                        u.resolve({instance: f, northEast: t.northEast, southWest: t.southWest})
                    }), f.calculateDirections()
                }), u.promise()
            }, _destroyRoute: function(n) {
                n.instance.dispose()
            }, _fitBounds: function() {
                var i, t, r;
                return this._updateBounds(), this._bounds && this._option("autoAdjust") && (i = this._map.getZoom(), this._preventZoomChangeEvent = !0, t = this._bounds.clone(), t.height = t.height * 1.1, t.width = t.width * 1.1, this._map.setView({animate: !1, bounds: t, zoom: i}), r = this._map.getZoom(), i < r ? this._map.setView({animate: !1, zoom: i}) : this._option("zoom", r), delete this._preventZoomChangeEvent), n.Deferred().resolve().promise()
            }, _extendBounds: function(n) {
                this._bounds = this._bounds ? new Microsoft.Maps.LocationRect.fromLocations(this._bounds.getNorthwest(), this._bounds.getSoutheast(), n) : new Microsoft.Maps.LocationRect(n, e, e)
            }, clean: function() {
                return this._map && (Microsoft.Maps.Events.removeHandler(this._providerViewChangeHandler), Microsoft.Maps.Events.removeHandler(this._providerClickHandler), this._clearMarkers(), this._clearRoutes(), this._map.dispose()), n.Deferred().resolve().promise()
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var e = t.ui, f = "_googleScriptReady", s = "https://maps.google.com/maps/api/js?v=3.9&sensor=false&callback=" + f, r, h = function() {
            r = function(t) {
                this._position = t.position, this._offset = t.offset, this._$overlayContainer = n("<div>").css({position: "absolute", display: "none", cursor: "pointer"}).append(t.html), this.setMap(t.map)
            }, r.prototype = new google.maps.OverlayView, r.prototype.onAdd = function() {
                var t = n(this.getPanes().overlayMouseTarget);
                t.append(this._$overlayContainer), this._clickListner = google.maps.event.addDomListener(this._$overlayContainer.get(0), "click", n.proxy(function(n) {
                    google.maps.event.trigger(this, "click"), n.preventDefault()
                }, this)), this.draw()
            }, r.prototype.onRemove = function() {
                google.maps.event.removeListener(this._clickListner), this._$overlayContainer.remove()
            }, r.prototype.draw = function() {
                var n = this.getProjection().fromLatLngToDivPixel(this._position);
                this._$overlayContainer.css({left: n.x + this._offset.left, top: n.y + this._offset.top, display: "block"})
            }
        }, o = function() {
            return window.google && window.google.maps
        }, u;
        e.dxMap.registerProvider("google", e.dxMap.DynamicProvider.inherit({_mapType: function(n) {
                var t = {hybrid: google.maps.MapTypeId.HYBRID, roadmap: google.maps.MapTypeId.ROADMAP, satellite: google.maps.MapTypeId.SATELLITE};
                return t[n] || t.hybrid
            }, _movementMode: function(n) {
                var t = {driving: google.maps.TravelMode.DRIVING, walking: google.maps.TravelMode.WALKING};
                return t[n] || t.driving
            }, _resolveLocation: function(t) {
                var i = n.Deferred(), r;
                return typeof t == "string" ? (r = new google.maps.Geocoder, r.geocode({address: t}, function(n, t) {
                    t === google.maps.GeocoderStatus.OK && i.resolve(n[0].geometry.location)
                })) : n.isArray(t) ? i.resolve(new google.maps.LatLng(t[0], t[1])) : n.isPlainObject(t) && n.isNumeric(t.lat) && n.isNumeric(t.lng) && i.resolve(new google.maps.LatLng(t.lat, t.lng)), i.promise()
            }, _normalizeLocation: function(n) {
                return{lat: n.lat(), lng: n.lng()}
            }, _normalizeLocationRect: function(n) {
                return{northEast: this._normalizeLocation(n.getNorthEast()), southWest: this._normalizeLocation(n.getSouthWest())}
            }, _loadImpl: function() {
                if (this._googleMapsLoader = n.Deferred(), o())
                    this._mapReady();
                else {
                    if (!u || u.state() == "resolved" && !o()) {
                        u = n.Deferred();
                        var t = this._keyOption("google");
                        window[f] = n.proxy(u.resolve, u), n.getScript(s + (t ? "&key=" + t : ""))
                    }
                    u.done(n.proxy(this._mapReady, this))
                }
                return this._googleMapsLoader.promise()
            }, _mapReady: function() {
                try {
                    delete window[f]
                } catch (n) {
                    window[f] = i
                }
                h(), this._googleMapsLoader.resolve()
            }, _init: function() {
                var r = n.Deferred(), i = n.Deferred(), t = this._option("controls"), u;
                return this._map = new google.maps.Map(this._$container[0], {zoom: this._option("zoom"), panControl: t, zoomControl: t, mapTypeControl: t, streetViewControl: t}), u = google.maps.event.addListener(this._map, "idle", n.proxy(i.resolve, i)), n.when(i).done(n.proxy(function() {
                    google.maps.event.removeListener(u), r.resolve()
                }, this)), r.promise()
            }, _attachHandlers: function() {
                this._boundsChangeListener = google.maps.event.addListener(this._map, "bounds_changed", n.proxy(this._boundsChangeHandler, this)), this._clickListener = google.maps.event.addListener(this._map, "click", n.proxy(this._clickActionHandler, this))
            }, _boundsChangeHandler: function() {
                var t = this._map.getBounds(), n;
                this._option("bounds", this._normalizeLocationRect(t)), n = this._map.getCenter(), this._option("center", this._normalizeLocation(n)), this._preventZoomChangeEvent || this._option("zoom", this._map.getZoom())
            }, _clickActionHandler: function(n) {
                this._fireClickAction({location: this._normalizeLocation(n.latLng)})
            }, updateDimensions: function() {
                var n = this._option("center");
                return google.maps.event.trigger(this._map, "resize"), this._option("center", n), this.updateCenter()
            }, updateMapType: function() {
                return this._map.setMapTypeId(this._mapType(this._option("type"))), n.Deferred().resolve().promise()
            }, updateBounds: function() {
                var t = n.Deferred(), i = this, r = this._resolveLocation(this._option("bounds.northEast")), u = this._resolveLocation(this._option("bounds.southWest"));
                return n.when(r, u).done(function(n, r) {
                    var u = new google.maps.LatLngBounds;
                    u.extend(n), u.extend(r), i._map.fitBounds(u), t.resolve()
                }), t.promise()
            }, updateCenter: function() {
                var t = n.Deferred(), i = this;
                return this._resolveLocation(this._option("center")).done(function(n) {
                    i._map.setCenter(n), t.resolve()
                }), t.promise()
            }, updateZoom: function() {
                return this._map.setZoom(this._option("zoom")), n.Deferred().resolve().promise()
            }, updateControls: function() {
                var t = this._option("controls");
                return this._map.setOptions({panControl: t, zoomControl: t, mapTypeControl: t, streetViewControl: t}), n.Deferred().resolve().promise()
            }, _renderMarker: function(i) {
                var f = n.Deferred(), u = this;
                return this._resolveLocation(i.location).done(function(e) {
                    var o, s, h, c, l;
                    o = i.html ? new r({map: u._map, position: e, html: i.html, offset: n.extend({top: 0, left: 0}, i.htmlOffset)}) : new google.maps.Marker({position: e, map: u._map, icon: i.iconSrc || u._option("markerIconSrc")}), s = u._renderTooltip(o, i.tooltip), i.clickAction && (t.log("W0001", "dxMap", "marker.clickAction", "14.2", "Use 'onClick' option instead"), i.onClick = i.clickAction), (i.onClick || i.tooltip) && (c = u._createAction(i.onClick || n.noop), l = u._normalizeLocation(e), h = google.maps.event.addListener(o, "click", function() {
                        c({location: l}), s && s.open(u._map, o)
                    })), f.resolve({location: e, marker: o, listner: h})
                }), f.promise()
            }, _renderTooltip: function(n, t) {
                if (t) {
                    t = this._parseTooltipOptions(t);
                    var i = new google.maps.InfoWindow({content: t.text});
                    return t.visible && i.open(this._map, n), i
                }
            }, _destroyMarker: function(n) {
                n.marker.setMap(null), n.listner && google.maps.event.removeListener(n.listner)
            }, _renderRoute: function(i) {
                var u = n.Deferred(), r = this, f = new google.maps.DirectionsService, e = n.map(i.locations, function(n) {
                    return r._resolveLocation(n)
                });
                return n.when.apply(n, e).done(function() {
                    var e = n.makeArray(arguments), o = e.shift(), s = e.pop(), h = n.map(e, function(n) {
                        return{location: n, stopover: !0}
                    }), c = {origin: o, destination: s, waypoints: h, optimizeWaypoints: !0, travelMode: r._movementMode(i.mode)};
                    f.route(c, function(n, f) {
                        if (f === google.maps.DirectionsStatus.OK) {
                            var o = new t.Color(i.color || r._defaultRouteColor()).toHex(), s = {directions: n, map: r._map, suppressMarkers: !0, preserveViewport: !0, polylineOptions: {strokeWeight: i.weight || r._defaultRouteWeight(), strokeOpacity: i.opacity || r._defaultRouteOpacity(), strokeColor: o}}, h = new google.maps.DirectionsRenderer(s), e = n.routes[0].bounds;
                            u.resolve({instance: h, northEast: e.getNorthEast(), southWest: e.getSouthWest()})
                        }
                    })
                }), u.promise()
            }, _destroyRoute: function(n) {
                n.instance.setMap(null)
            }, _fitBounds: function() {
                var t, i;
                return this._updateBounds(), this._bounds && this._option("autoAdjust") && (t = this._map.getZoom(), this._preventZoomChangeEvent = !0, this._map.fitBounds(this._bounds), i = this._map.getZoom(), t < i ? this._map.setZoom(t) : this._option("zoom", i), delete this._preventZoomChangeEvent), n.Deferred().resolve().promise()
            }, _extendBounds: function(n) {
                this._bounds ? this._bounds.extend(n) : (this._bounds = new google.maps.LatLngBounds, this._bounds.extend(n))
            }, clean: function() {
                return this._map && (google.maps.event.removeListener(this._boundsChangeListener), google.maps.event.removeListener(this._clickListener), this._clearMarkers(), this._clearRoutes(), delete this._map, this._$container.empty()), n.Deferred().resolve().promise()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, f = r.events, u = "dxSwipeable", e = "dx-swipeable", o = {onStart: "dxswipestart", onUpdated: "dxswipe", onEnd: "dxswipeend", onCancel: "dxswipecancel"};
        t.registerComponent(u, r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({elastic: !0, immediate: !1, direction: "horizontal", itemSizeFunc: null, onStart: null, onUpdated: null, onEnd: null, onCancel: null})
            }, _render: function() {
                this.callBase(), this.element().addClass(e), this._attachEventHandlers()
            }, _attachEventHandlers: function() {
                if (this._detachEventHanlers(), !this.option("disabled")) {
                    var t = this.NAME;
                    this._createEventData(), n.each(o, n.proxy(function(n, i) {
                        var r = this._createActionByOption(n, {context: this});
                        i = f.addNamespace(i, t);
                        this.element().on(i, this._eventData, function(n) {
                            return r({jQueryEvent: n})
                        })
                    }, this))
                }
            }, _createEventData: function() {
                this._eventData = {elastic: this.option("elastic"), itemSizeFunc: this.option("itemSizeFunc"), direction: this.option("direction"), immediate: this.option("immediate")}
            }, _detachEventHanlers: function() {
                this.element().off("." + u)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"disabled":
                    case"onStart":
                    case"onUpdated":
                    case"onEnd":
                    case"onCancel":
                    case"elastic":
                    case"immediate":
                    case"itemSizeFunc":
                    case"direction":
                        this._detachEventHanlers(), this._attachEventHandlers();
                        break;
                    case"rtlEnabled":
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var f = t.ui, e = t.translator, o = t.inflector, u = f.events, r = "dxDraggable", s = u.addNamespace("dxdragstart", r), h = u.addNamespace("dxdrag", r), c = u.addNamespace("dxdragend", r), l = u.addNamespace("dxpointerdown", r), a = o.dasherize(r);
        t.registerComponent(r, f, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({onDragStart: n.noop, onDrag: n.noop, onDragEnd: n.noop, direction: "both", area: window, boundOffset: 0, allowMoveByClick: !1})
            }, _init: function() {
                this.callBase(), this._attachEventHandlers()
            }, _attachEventHandlers: function() {
                var i = this.element().css("position", "absolute"), t = {}, r = this.option("allowMoveByClick");
                t[s] = n.proxy(this._dragStartHandler, this), t[h] = n.proxy(this._dragHandler, this), t[c] = n.proxy(this._dragEndHandler, this), r && (t[l] = n.proxy(this._pointerDownHandler, this), i = this._getArea());
                i.on(t, {direction: this.option("direction")})
            }, _detachEventHandlers: function() {
                this.element().off("." + r), this._getArea().off("." + r)
            }, _move: function(n) {
                e.move(this.element(), n)
            }, _pointerDownHandler: function(t) {
                var u = n(t.currentTarget), f = n.isWindow(u.get(0)) ? {left: 0, top: 0} : u.offset(), i = this.option("direction"), r = {};
                (i === "horizontal" || i === "both") && (r.left = t.pageX - this.element().width() / 2 - f.left), (i === "vertical" || i === "both") && (r.top = t.pageY - this.element().height() / 2 - f.top), this._move(r), this._getAction("onDrag")({jQueryEvent: t})
            }, _dragStartHandler: function(n) {
                var i = this.element(), r = this._getArea(), t = this._getBoundOffset(), u = r.outerWidth(), f = r.outerHeight(), o = i.width(), s = i.height();
                this._startPosition = e.locate(i), n.maxLeftOffset = this._startPosition.left - t.h, n.maxRightOffset = u - this._startPosition.left - o - t.h, n.maxTopOffset = this._startPosition.top - t.v, n.maxBottomOffset = f - this._startPosition.top - s - t.v, this._getAction("onDragStart")({jQueryEvent: n})
            }, _getBoundOffset: function() {
                var i = this.option("boundOffset");
                return n.isFunction(i) && (i = i.call(this)), t.utils.stringPairToObject(i)
            }, _getArea: function() {
                var t = this.option("area");
                return n.isFunction(t) && (t = t.call(this)), n(t)
            }, _dragHandler: function(n) {
                var t = n.offset, i = this._startPosition;
                this._move({left: i.left + t.x, top: i.top + t.y}), this._getAction("onDrag")({jQueryEvent: n})
            }, _dragEndHandler: function(n) {
                this._getAction("onDragEnd")({jQueryEvent: n})
            }, _getAction: function(n) {
                return this["_" + n + "Action"] || this._createActionByOption(n)
            }, _render: function() {
                this.callBase(), this.element().addClass(a)
            }, _optionChanged: function(n) {
                var t = n.name;
                switch (t) {
                    case"onDragStart":
                    case"onDrag":
                    case"onDragEnd":
                        this["_" + t + "Action"] = this._createActionByOption(t);
                        break;
                    case"allowMoveByClick":
                    case"direction":
                        this._detachEventHandlers(), this._attachEventHandlers();
                        break;
                    case"boundOffset":
                    case"area":
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _dispose: function() {
                this.callBase(), this._detachEventHandlers()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var l = DevExpress.ui, a = "dx-box", v = ".dx-box", g = "dx-box-item", r = "dxBoxItemData", y = {row: "minWidth", col: "minHeight"}, p = {row: "maxWidth", col: "maxHeight"}, s = 1, w = {start: "flex-start", end: "flex-end", center: "center", "space-between": "space-between", "space-around": "space-around"}, b = {start: "flex-start", end: "flex-end", center: "center", stretch: "stretch"}, nt = {row: "row", col: "column"}, tt = t.Class.inherit({ctor: function(n, t) {
                this._$element = n, this._option = t
            }, renderBox: function() {
                this._$element.css({display: t.support.stylePropPrefix("flexDirection") + "flex", flexDirection: nt[this._option("direction")]})
            }, renderAlign: function() {
                this._$element.css({justifyContent: this._normalizedAlign()})
            }, _normalizedAlign: function() {
                var n = this._option("align");
                return n in w ? w[n] : n
            }, renderCrossAlign: function() {
                this._$element.css({alignItems: this._normalizedCrossAlign()})
            }, _normalizedCrossAlign: function() {
                var n = this._option("crossAlign");
                return n in b ? b[n] : n
            }, renderItems: function(i) {
                var u = this._option("direction");
                n.each(i, function() {
                    var f = n(this), i = f.data(r);
                    f.css({display: t.support.stylePropPrefix("flexDirection") + "flex", flexGrow: i.ratio, flexShrink: i.shrink || s, flexBasis: i.baseSize || 0}).css(p[u], i.maxSize || "none").css(y[u], i.minSize || "none"), f.children().css({width: "auto", height: "auto", display: t.support.stylePropPrefix("flexDirection") + "flex", flexGrow: "1", flexDirection: f.children().css("flexDirection") || "column"})
                })
            }, update: n.noop}), it = "dxBox", h = "dxupdate." + it, k = "dx-box-fallback-item", rt = {row: "nowrap", col: "normal"}, u = {row: "width", col: "height"}, e = {row: "height", col: "width"}, f = {row: "marginLeft", col: "marginTop"}, o = {row: "marginRight", col: "marginBottom"}, c = {row: "marginTop", col: "marginLeft"}, d = {row: "marginBottom", col: "marginRight"}, ut = t.Class.inherit({ctor: function(n, t) {
                this._$element = n, this._option = t
            }, renderBox: function() {
                this._$element.css({fontSize: 0, whiteSpace: rt[this._option("direction")], verticalAlign: "top"});
                this._$element.off(h).on(h, n.proxy(this.update, this))
            }, renderAlign: function() {
                var t = this._$items;
                if (t) {
                    var e = this._option("align"), n = 0, s = this.totalItemSize, i = this._option("direction"), h = this._$element[u[i]](), r = h - s;
                    switch (e) {
                        case"end":
                            n = r, t.first().css(f[i], n);
                            break;
                        case"center":
                            n = .5 * r, t.first().css(f[i], n), t.last().css(o[i], n);
                            break;
                        case"space-between":
                            n = .5 * r / (t.length - 1), t.css(f[i], n).css(o[i], n), t.first().css(f[i], 0), t.last().css(o[i], 0);
                            break;
                        case"space-around":
                            n = .5 * r / t.length, t.css(f[i], n).css(o[i], n)
                        }
                }
            }, renderCrossAlign: function() {
                var i = this._$items;
                if (i) {
                    var u = this._option("crossAlign"), t = this._option("direction"), r = this._$element[e[t]]();
                    switch (u) {
                        case"end":
                            n.each(i, function() {
                                var i = n(this), u = i[e[t]](), f = r - u;
                                i.css(c[t], f)
                            });
                            break;
                        case"center":
                            n.each(i, function() {
                                var i = n(this), f = i[e[t]](), u = .5 * (r - f);
                                i.css(c[t], u).css(d[t], u)
                            });
                            break;
                        case"stretch":
                            i.css(c[t], 0).css(d[t], 0).css(e[t], "100%")
                        }
                }
            }, renderItems: function(t) {
                this._$items = t;
                var i = this._option("direction"), o = 0, h = 0, c = 0, f = this._$element[u[i]](), v = function(n) {
                    return String(n).match(/.+%$/) ? .01 * parseFloat(n) * f : n
                }, w = function(n) {
                    return n[u[i]]()
                }, l = function(n) {
                    var t = n.data(r);
                    return t.baseSize == null ? 0 : t.baseSize === "auto" ? w(n) : v(t.baseSize)
                };
                n.each(t, function() {
                    var t = n(this);
                    t.css("display", "inline-block").css("vertical-align", "top"), t[u[i]]("auto"), t.removeClass(k);
                    var f = t.data(r), a = f.ratio || 0, e = l(t), v = f.shrink || s;
                    o += a, h += v * e, c += e
                }), f = this._$element[u[i]]();
                var e = f - c, b = function(n) {
                    var t = n.data(r), i = l(n), f = e >= 0 ? t.ratio || 0 : (t.shrink || s) * i, u = e >= 0 ? o : h, c = u ? Math.round(e * f / u) : 0;
                    return i + c
                }, a = 0;
                n.each(t, function() {
                    var t = n(this), f = t.data(r), e = b(t);
                    a += e, t.css(p[i], f.maxSize || "auto").css(y[i], f.minSize || "auto").css(u[i], e), t.addClass(k)
                }), this.totalItemSize = a
            }, update: function() {
                if (this._$items && !this._$element.is(":hidden")) {
                    this.renderItems(this._$items), this.renderAlign(), this.renderCrossAlign();
                    var t = this._$element.get(0);
                    this._$items.find(v).each(function() {
                        t === n(this).parent().closest(v).get(0) && n(this).triggerHandler(h)
                    })
                }
            }});
        t.registerComponent("dxBox", l, l.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({direction: "row", align: "start", crossAlign: "stretch", activeStateEnabled: !1, focusStateEnabled: !1, _layoutStrategy: "flex"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function(n) {
                            var i = n.platform === "android" && (n.version[0] < 4 || n.version[0] === 4 && n.version[1] < 4), r = n.platform === "ios" && n.version[0] < 7;
                            return t.browser.msie || i || r
                        }, options: {_layoutStrategy: "fallback"}}])
            }, _itemClass: function() {
                return g
            }, _itemDataKey: function() {
                return r
            }, _itemElements: function() {
                return this._itemContainer().children(this._itemSelector())
            }, _init: function() {
                this.callBase(), this.element().addClass(a + "-" + this.option("_layoutStrategy")), this._initLayout()
            }, _initLayout: function() {
                this._layout = this.option("_layoutStrategy") === "fallback" ? new ut(this.element(), n.proxy(this.option, this)) : new tt(this.element(), n.proxy(this.option, this))
            }, _render: function() {
                this.callBase(), this.element().addClass(a), this._renderBox()
            }, _renderBox: function() {
                this._layout.renderBox(), this._layout.renderAlign(), this._layout.renderCrossAlign()
            }, _renderItems: function(t) {
                this.callBase(t), this._layout.renderItems(this._itemElements()), this._updateTimer = setTimeout(n.proxy(function() {
                    this._isUpdated || this._layout.update(), this._isUpdated = !1
                }, this))
            }, _postprocessRenderItem: function(t) {
                var i = t.itemData.box;
                i && n(t.itemContent).dxBox(n.extend(i, {_templates: this.option("_templates")}))
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _dimensionChanged: function() {
                this._isUpdated = !0, this._layout.update()
            }, _dispose: function() {
                delete this._updateTimer, this.callBase.apply(this, arguments)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"_layoutStrategy":
                    case"direction":
                        this._invalidate();
                        break;
                    case"align":
                        this._layout.renderAlign();
                        break;
                    case"crossAlign":
                        this._layout.renderCrossAlign();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, f = "dx-responsive-box", e = "dx-box-item", u = "dxBoxItemData", o = function(n) {
            return n < 768 ? "xs" : n < 992 ? "sm" : n < 1200 ? "md" : "lg"
        };
        t.registerComponent("dxResponsiveBox", r, r.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({rows: [], cols: [], screenByWidth: o, singleColumnScreen: "xs", activeStateEnabled: !1, focusStateEnabled: !1})
            }, _initOptions: function(n) {
                n.screenByWidth && this.option("singleColumnScreen", n.screenByWidth(0)), this.callBase(n)
            }, _itemClass: function() {
                return e
            }, _itemDataKey: function() {
                return u
            }, _render: function() {
                this.callBase(), this.element().addClass(f), this._updateRootBox()
            }, _updateRootBox: function() {
                this._updateTimer = setTimeout(n.proxy(function() {
                    this._$root && this._$root.trigger("dxupdate")
                }, this))
            }, _renderItems: function() {
                this._screenItems = this._itemsByScreen(), this._prepareGrid(), this._spreadItems(), this._layoutItems(), this._linkNodeToItem()
            }, _prepareGrid: function() {
                var t = this._grid = [];
                this._prepareRowsAndCols(), n.each(this._rows, n.proxy(function() {
                    var i = [];
                    t.push(i), n.each(this._cols, n.proxy(function() {
                        i.push(this._createEmptyCell())
                    }, this))
                }, this))
            }, _prepareRowsAndCols: function() {
                this._isSingleColumnScreen() ? (this._prepareSingleColumnScreenItems(), this._rows = this._defaultSizeConfig(this._screenItems.length), this._cols = this._defaultSizeConfig(1)) : (this._rows = this._sizesByScreen(this.option("rows")), this._cols = this._sizesByScreen(this.option("cols")))
            }, _isSingleColumnScreen: function() {
                return this._screenRegExp().test(this.option("singleColumnScreen"))
            }, _prepareSingleColumnScreenItems: function() {
                this._screenItems.sort(function(n, t) {
                    return n.location.row - t.location.row || n.location.col - t.location.col
                }), n.each(this._screenItems, function(t, i) {
                    n.extend(i.location, {row: t, col: 0, rowspan: 1, colspan: 1})
                })
            }, _sizesByScreen: function(t) {
                return n.map(this._filterByScreen(t), n.proxy(function(t) {
                    return n.extend(this._defaultSizeConfig(), t)
                }, this))
            }, _defaultSizeConfig: function(n) {
                var r = {ratio: 1, baseSize: 0, minSize: 0, maxSize: 0}, t, i;
                if (!arguments.length)
                    return r;
                for (t = [], i = 0; i < n; i++)
                    t.push(r);
                return t
            }, _filterByScreen: function(t) {
                var i = this._screenRegExp();
                return n.grep(t, function(n) {
                    return!n.screen || i.test(n.screen)
                })
            }, _screenRegExp: function() {
                var n = this._screenWidth(), t = this.option("screenByWidth")(n);
                return new RegExp("(^|\\s)" + t + "($|\\s)", "i")
            }, _screenWidth: function() {
                return n(window).width()
            }, _createEmptyCell: function() {
                return{item: {}, location: {colspan: 1, rowspan: 1}}
            }, _spreadItems: function() {
                var t = this.option("cols");
                n.each(this._screenItems, n.proxy(function(n, t) {
                    var i = t.location || {}, u = i.col, f = i.row, r = this._grid[f], e = r && r[u];
                    this._occupyCells(e, t)
                }, this))
            }, _itemsByScreen: function() {
                return n.map(this.option("items"), n.proxy(function(t) {
                    var i = t.location || {};
                    return i = n.isPlainObject(i) ? [i] : i, n.map(this._filterByScreen(i), function(i) {
                        return{item: t, location: n.extend({rowspan: 1, colspan: 1}, i)}
                    })
                }, this))
            }, _occupyCells: function(t, i) {
                t && !this._isItemCellOccupied(t, i) && (n.extend(t, i), this._markSpanningCell(t))
            }, _isItemCellOccupied: function(t, i) {
                if (!n.isEmptyObject(t.item))
                    return!0;
                var r = !1;
                return this._loopOverSpanning(i.location, function(t) {
                    r = r || !n.isEmptyObject(t.item)
                }), r
            }, _loopOverSpanning: function(n, t) {
                var u = n.row + n.rowspan - 1, f = n.col + n.colspan - 1, e = Math.min(u, this._rows.length - 1), o = Math.min(f, this._cols.length - 1), i, r;
                for (n.rowspan -= u - e, n.colspan -= f - o, i = n.row; i <= e; i++)
                    for (r = n.col; r <= o; r++)
                        (i !== n.row || r !== n.col) && t(this._grid[i][r])
            }, _markSpanningCell: function(t) {
                this._loopOverSpanning(t.location, function(i) {
                    n.extend(i, {item: t.item, spanningCell: t})
                })
            }, _linkNodeToItem: function() {
                n.each(this._itemElements(), function(t, i) {
                    var r = n(i), f = r.data(u);
                    f.box || (f.node = r.children())
                })
            }, _layoutItems: function() {
                var t = this._grid.length, u = t && this._grid[0].length, i, r;
                (t || u) && (i = this._layoutBlock({direction: "col", row: {start: 0, end: t - 1}, col: {start: 0, end: u - 1}}), r = this._prepareBoxConfig(i.box || {direction: "col", items: [i]}), n.extend(r, {width: "100%", height: "100%", _templates: this.option("_templates")}), this._$root = n("<div>").appendTo(this._itemContainer()).dxBox(r))
            }, _prepareBoxConfig: function(t) {
                return n.extend(t || {}, {crossAlign: "stretch"})
            }, _layoutBlock: function(n) {
                return this._isSingleItem(n) ? this._itemByCell(n.row.start, n.col.start) : this._layoutDirection(n)
            }, _isSingleItem: function(n) {
                var t = this._grid[n.row.start][n.col.start].location, i = n.row.end - n.row.start == t.rowspan - 1, r = n.col.end - n.col.start == t.colspan - 1;
                return i && r
            }, _itemByCell: function(n, t) {
                var i = this._grid[n][t];
                return i.spanningCell ? null : i.item
            }, _layoutDirection: function(i) {
                for (var e = [], o = i.direction, u = this._crossDirection(o), r, f; r = this._nextBlock(i); ) {
                    if (this._isBlockIndivisible(i.prevBlockOptions, r))
                        throw t.Error("E1025");
                    f = this._layoutBlock({direction: u, row: r.row, col: r.col, prevBlockOptions: i}), f && (n.extend(f, this._blockSize(r, u)), e.push(f)), i[u].start = r[u].end + 1
                }
                return{box: this._prepareBoxConfig({direction: o, items: e})}
            }, _isBlockIndivisible: function(n, t) {
                return n && n.col.start === t.col.start && n.col.end === t.col.end && n.row.start === t.row.start && n.row.end === t.row.end
            }, _crossDirection: function(n) {
                return n === "col" ? "row" : "col"
            }, _nextBlock: function(n) {
                var i = n.direction, f = this._crossDirection(i), l = n[i].start, a = n[i].end, t = n[f].start, r, u, e, o, v, h, c, s;
                if (t > n[f].end)
                    return null;
                for (r = 1, u = t; u < t + r; u++) {
                    for (e = 1, o = l; o <= a; o++)
                        v = this._cellByDirection(i, o, u), e = Math.max(e, v.location[f + "span"]);
                    h = u + e, c = t + r, h > c && (r += h - c)
                }
                return s = {}, s[i] = {start: l, end: a}, s[f] = {start: t, end: t + r - 1}, s
            }, _cellByDirection: function(n, t, i) {
                return n === "col" ? this._grid[i][t] : this._grid[t][i]
            }, _blockSize: function(n, t) {
                for (var f = t === "row" ? this._rows : this._cols, i = {ratio: 0, baseSize: 0, minSize: 0, maxSize: 0}, r, u = n[t].start; u <= n[t].end; u++)
                    r = f[u], i.ratio += r.ratio, i.baseSize += r.baseSize, i.minSize += r.minSize, i.maxSize += r.maxSize;
                return i.minSize = i.minSize ? i.minSize : "auto", i.maxSize = i.maxSize ? i.maxSize : "auto", i
            }, _update: function() {
                var n = this._$root;
                this._renderItems(), n.remove()
            }, _dispose: function() {
                delete this._updateTimer, this.callBase.apply(this, arguments)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"rows":
                    case"cols":
                    case"screenByWidth":
                    case"singleColumnScreen":
                        this._invalidate();
                        break;
                    case"width":
                    case"height":
                        this.callBase(n), this._update();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _dimensionChanged: function() {
                this._update()
            }, update: function() {
                this._update()
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, f = r.events, e = "dx-button", o = "dx-button-content", u = ".dx-button-content", s = "dx-button-text", h = "dx-button-has-text", c = "dx-button-has-icon", l = ".dx-button-text", a = "dx-button-back-arrow", v = "dx-icon", y = ".dx-icon", p = 100;
        t.registerComponent("dxButton", r, r.Widget.inherit({_supportedKeys: function() {
                var i = this, t = function(n) {
                    i._executeClickAction(n)
                };
                return n.extend(this.callBase(), {space: t, enter: t})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {clickAction: {since: "14.2", alias: "onClick"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({onClick: null, type: "normal", text: "", icon: "", iconSrc: "", validationGroup: i, activeStateEnabled: !0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this._feedbackHideTimeout = p
            }, _render: function() {
                this.callBase(), this.element().addClass(e).append(n("<div>").addClass(o)), this._renderClick(), this._renderIcon(), this._renderType(), this._renderText()
            }, _renderClick: function() {
                var t = this, n = f.addNamespace("dxclick", this.NAME);
                this._clickAction = this._createActionByOption("onClick");
                this.element().off(n).on(n, function(n) {
                    t._executeClickAction(n)
                })
            }, _executeClickAction: function(n) {
                this._clickAction({jQueryEvent: n, validationGroup: t.validationEngine.getGroupConfig(this._findGroup())})
            }, _removeTypesCss: function() {
                var n = this.element().attr("class");
                n = n.replace(/\bdx-button-[-a-z0-9]+\b/gi, ""), this.element().attr("class", n)
            }, _renderIcon: function() {
                var f = this.element().find(u), i = f.find(y), t = this.option("icon"), r = this.option("iconSrc");
                (i.remove(), this.option("type") !== "back" || t || (t = "back"), t || r) && (t ? i = n("<span>").addClass("dx-icon-" + t) : r && (i = n("<img>").attr("src", r)), f.prepend(i.addClass(v)), this.element().addClass(c))
            }, _renderType: function() {
                var t = this.option("type"), i;
                t && this.element().addClass("dx-button-" + t), i = this.element().find(u), t === "back" && i.prepend(n("<span>").addClass(a))
            }, _renderText: function() {
                var r = this.option("text"), f = this.element().find(u), e = this.option("type") === "back", i = f.find(l);
                if (!r && !e) {
                    i.remove();
                    return
                }
                i.length || (i = n("<span>").addClass(s).appendTo(f)), i.text(r || t.localization.localizeString("@Back")), this.element().addClass(h)
            }, _clean: function() {
                this.callBase(), this._removeTypesCss()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"onClick":
                        this._renderClick();
                        break;
                    case"icon":
                    case"iconSrc":
                        this._renderIcon();
                        break;
                    case"text":
                        this._renderText();
                        break;
                    case"type":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _findGroup: t.ui.validation.findGroup}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, e = r.events, o = "dx-checkbox", s = "dx-checkbox-icon", h = "dx-checkbox-checked", c = "dx-checkbox-container", l = ".dx-checkbox-container", a = "dx-checkbox-text", v = ".dx-checkbox-text", u = "dx-checkbox-has-text", y = "dx-checkbox-indeterminate", p = 100, f = e.addNamespace("dxclick", "dxCheckBox");
        t.registerComponent("dxCheckBox", r, r.Editor.inherit({_supportedKeys: function() {
                var t = function(n) {
                    this._clickAction({jQueryEvent: n})
                };
                return n.extend(this.callBase(), {space: t, enter: t})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {checked: {since: "14.1", alias: "value"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({value: !1, text: ""})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this._feedbackHideTimeout = p
            }, _render: function() {
                this.callBase(), this.element().addClass(o).append(n("<div>").addClass(c)), this._$container = this.element().find(l), this._renderClick(), this._renderValue(), this._renderIcon(), this._renderText()
            }, _renderDimensions: function() {
                this.callBase()
            }, _renderIcon: function() {
                this._$icon = n("<span>").addClass(s).prependTo(this._$container)
            }, _renderText: function() {
                if (this._$text = this._$container.find(v), !this.option("text")) {
                    this._$text && (this._$text.remove(), this.element().removeClass(u));
                    return
                }
                this._$text.length || (this._$text = n("<span>").addClass(a)), this._$text.text(this.option("text")), this._$container.append(this._$text), this.element().addClass(u)
            }, _renderClick: function() {
                this._clickAction = this._createAction(this._clickHandler);
                this.element().off(f).on(f, n.proxy(function(n) {
                    this._clickAction({jQueryEvent: n})
                }, this))
            }, _clickHandler: function(n) {
                var t = n.component;
                t._valueChangeEventInstance = n.jQueryEvent, t.option("value", !t.option("value"))
            }, _renderValue: function() {
                var n = this.element(), t = this.option("value"), r = t === i;
                n.toggleClass(h, Boolean(t)), n.toggleClass(y, r)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"value":
                        this._renderValue(), this.callBase(n);
                        break;
                    case"text":
                        this._renderText(), this._renderDimensions();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = u.events, f = t.fx, r = "dx-switch", o = r + "-wrapper", s = r + "-container", h = r + "-inner", c = r + "-handle", l = r + "-on-value", a = r + "-on", v = r + "-off", y = 100;
        t.registerComponent("dxSwitch", u, u.Editor.inherit({_supportedKeys: function() {
                var t = function(n) {
                    this._clickAction({jQueryEvent: n})
                }, i = function(n, t) {
                    t.preventDefault(), t.stopPropagation(), this._animateValue(n)
                };
                return n.extend(this.callBase(), {space: t, enter: t, leftArrow: n.proxy(i, this, !1), rightArrow: n.proxy(i, this, !0)})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({onText: Globalize.localize("dxSwitch-onText"), offText: Globalize.localize("dxSwitch-offText"), value: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this._animating = !1, this._animationDuration = y
            }, _createValueChangeAction: function() {
                this._valueChangeAction = this._createActionByOption("onValueChanged")
            }, _render: function() {
                var t = this.element();
                this._$switchInner = n("<div>").addClass(h), this._$handle = n("<div>").addClass(c).appendTo(this._$switchInner), this._$labelOn = n("<div>").addClass(a).prependTo(this._$switchInner), this._$labelOff = n("<div>").addClass(v).appendTo(this._$switchInner), this._$switchContainer = n("<div>").addClass(s).append(this._$switchInner), this._$switchWrapper = n("<div>").addClass(o).append(this._$switchContainer), t.addClass(r).append(this._$switchWrapper), t.dxSwipeable({elastic: !1, immediate: !0, onStart: n.proxy(this._swipeStartHandler, this), onUpdated: n.proxy(this._swipeUpdateHandler, this), onEnd: n.proxy(this._swipeEndHandler, this)}), this._renderLabels(), this.callBase(), this._updateMarginBound(), this._renderValue(), this._renderClick()
            }, _updateMarginBound: function() {
                this._marginBound = this._$switchContainer.outerWidth(!0) - this._$handle.outerWidth()
            }, _marginDirection: function() {
                return this.option("rtlEnabled") ? "Right" : "Left"
            }, _offsetDirection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _renderPosition: function(n, t) {
                var r = n ? 1 : 0, i = this._marginDirection(), u = i === "Left" ? "Right" : "Left";
                this._$switchInner.css("margin" + i, this._marginBound * (r + t - 1)), this._$switchInner.css("margin" + u, 0)
            }, _validateValue: function() {
                var n = this.option("value");
                typeof n != "boolean" && (this._options.value = !!n)
            }, _renderClick: function() {
                var t = e.addNamespace("dxclick", this.NAME);
                this._clickAction = this._createAction(n.proxy(this._clickHandler, this));
                this.element().off(t).on(t, n.proxy(function(n) {
                    this._clickAction({jQueryEvent: n})
                }, this))
            }, _clickHandler: function(n) {
                var t = n.jQueryEvent;
                (this._valueChangeEventInstance = t, this._animating || this._swiping) || this._animateValue(!this.option("value"))
            }, _animateValue: function(n) {
                var r = this.option("value"), t = n;
                if (r != t) {
                    this._animating = !0;
                    var u = this, i = this._marginDirection(), s = i === "Left" ? "Right" : "Left", e = {}, o = {};
                    this._$switchInner.css("margin" + s, 0), e["margin" + i] = (Number(r) - 1) * this._marginBound, o["margin" + i] = (Number(t) - 1) * this._marginBound, f.animate(this._$switchInner, {from: e, to: o, duration: this._animationDuration, complete: function() {
                            u._animating = !1, u.option("value", t)
                        }})
                }
            }, _swipeStartHandler: function(n) {
                var t = this.option("value"), i = this.option("rtlEnabled"), r = i ? 0 : 1, u = i ? 1 : 0;
                n.jQueryEvent.maxLeftOffset = t ? r : u, n.jQueryEvent.maxRightOffset = t ? u : r, this._swiping = !0, this._toggleActiveState(this.element(), !0)
            }, _swipeUpdateHandler: function(n) {
                this._renderPosition(this.option("value"), this._offsetDirection() * n.jQueryEvent.offset)
            }, _swipeEndHandler: function(n) {
                var t = this, i = this._offsetDirection(), r = {};
                r["margin" + this._marginDirection()] = this._marginBound * (t.option("value") + i * n.jQueryEvent.targetOffset - 1), f.animate(this._$switchInner, {to: r, duration: t._animationDuration, complete: function() {
                        t._swiping = !1;
                        var r = t.option("value") + i * n.jQueryEvent.targetOffset;
                        t.option("value", Boolean(r)), t._toggleActiveState(t.element(), !1)
                    }})
            }, _renderValue: function() {
                this._validateValue();
                var n = this.option("value");
                this._renderPosition(n, 0), this.element().toggleClass(l, n)
            }, _renderLabels: function() {
                this._$labelOn.text(this.option("onText")), this._$labelOff.text(this.option("offText"))
            }, _visibilityChanged: function(n) {
                n && this.repaint()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"visible":
                    case"width":
                        this._refresh();
                        break;
                    case"onText":
                    case"offText":
                        this._renderLabels();
                        break;
                    case"value":
                        this._renderValue(), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var u = t.ui, r = u.events, f = t.inflector, c = "dx-texteditor", e = "dx-texteditor-input", l = "." + e, a = "dx-texteditor-container", o = "dx-texteditor-buttons-container", v = "dx-placeholder", y = "dx-show-clear-button", p = "dx-icon-clear", w = "dx-clear-button-area", b = "dx-texteditor-empty", s = "dx-state-focused", h = ["focusIn", "focusOut", "keyDown", "keyPress", "keyUp", "change", "cut", "copy", "paste", "input"], k = function() {
            return t.browser.msie && t.browser.version > 9 || !t.browser.msie
        }();
        t.registerComponent("dxTextEditor", u, u.Editor.inherit({_supportedKeys: function() {
                var n = function(n) {
                    n.stopPropagation()
                };
                return{leftArrow: n, rightArrow: n}
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {valueUpdateEvent: {since: "14.1", alias: "valueChangeEvent"}, valueUpdateAction: {since: "14.1", message: "'onValueChanged' option instead"}, valueChangeAction: {since: "14.2", alias: "onValueChanged"}, keyDownAction: {since: "14.2", alias: "onKeyDown"}, keyPressAction: {since: "14.2", alias: "onKeyPress"}, keyUpAction: {since: "14.2", alias: "onKeyUp"}, cutAction: {since: "14.2", alias: "onCut"}, copyAction: {since: "14.2", alias: "onCopy"}, pasteAction: {since: "14.2", alias: "onPaste"}, changeAction: {since: "14.2", alias: "onChange"}, inputAction: {since: "14.2", alias: "onInput"}, focusInAction: {since: "14.2", alias: "onFocusIn"}, focusOutAction: {since: "14.2", alias: "onFocusOut"}, enterKeyAction: {since: "14.2", alias: "onEnterKey"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({value: "", spellcheck: !1, showClearButton: !1, valueChangeEvent: "change", placeholder: "", onFocusIn: null, onFocusOut: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onChange: null, onInput: null, onCut: null, onCopy: null, onPaste: null, onEnterKey: null, mode: "text", activeStateEnabled: !1, hoverStateEnabled: !0, focusStateEnabled: !0})
            }, _input: function() {
                return this.element().find(l).first()
            }, _inputWrapper: function() {
                return this.element()
            }, _buttonsContainer: function() {
                return this._inputWrapper().find("." + o)
            }, _init: function() {
                this.callBase(), this._initValueUpdateAction()
            }, _initValueUpdateAction: function() {
                this._valueUpdateAction = this._createActionByOption("valueUpdateAction")
            }, _render: function() {
                this.element().addClass(c), this._renderInput(), this._renderInputType(), this._renderValue(), this._renderProps(), this._renderPlaceholder(), this._renderEvents(), this._renderEnterKeyAction(), this._renderEmptinessEvent(), this.callBase()
            }, _renderInput: function() {
                n("<div>").addClass(a).append(this._createInput()).append(n("<div>").addClass(o)).appendTo(this.element())
            }, _createInput: function() {
                return n("<input>").addClass(e)
            }, _renderValue: function(n) {
                var t = n || this.option("value");
                this._input().val() !== t && (this._input().val(t), this._toggleEmptinessEventHandler()), this._renderInputAddons()
            }, _isValueValid: function() {
                var n = this._input().get(0).validity;
                return n ? n.valid : !0
            }, _toggleEmptiness: function(n) {
                this.element().toggleClass(b, n), this._togglePlaceholder(n)
            }, _togglePlaceholder: function(n) {
                this._$placeholder && (t.browser.msie ? this._$placeholder.toggle(!this._input().is(":focus") && n) : this._$placeholder.toggle(n))
            }, _renderProps: function() {
                this._toggleDisabledState(this.option("disabled")), this._toggleReadOnlyState(this._readOnlyPropValue()), this._toggleSpellcheckState()
            }, _toggleDisabledState: function() {
                this.callBase.apply(this, arguments), this._input().prop("disabled", this.option("disabled"))
            }, _toggleReadOnlyState: function(n) {
                this._input().prop("readOnly", n), this.callBase()
            }, _readOnlyPropValue: function() {
                return this.option("readOnly")
            }, _toggleSpellcheckState: function() {
                this._input().prop("spellcheck", this.option("spellcheck"))
            }, _renderPlaceholder: function() {
                this._$placeholder && (this._$placeholder.remove(), this._$placeholder = null);
                var i = this, u = i._input(), f = i.option("placeholder"), t = this._$placeholder = n("<div>").attr("data-dx_placeholder", f), e = r.addNamespace("dxclick", this.NAME);
                t.on(e, function() {
                    u.focus()
                });
                t.insertAfter(u), t.addClass(v)
            }, _placeholder: function() {
                return this._$placeholder || n()
            }, _renderInputAddons: function() {
                this._renderClearButton()
            }, _renderClearButton: function() {
                if (k) {
                    var n = this.option("showClearButton") && !this.option("readOnly");
                    if (this.element().toggleClass(y, n), !n) {
                        this._$clearButton && this._$clearButton.remove(), this._$clearButton = null;
                        return
                    }
                    this._$clearButton || (this._$clearButton = this._createClearButton())
                }
            }, _createClearButton: function() {
                return n("<span>").addClass(w).append(n("<span>").addClass(p)).prependTo(this._buttonsContainer()).on(r.addNamespace("dxpointerup", this.NAME), n.proxy(this._clearValueHandler, this))
            }, _clearValueHandler: function() {
                var t = this._input();
                this.option("value", ""), t.is(":focus") ? (t.val(""), this._toggleEmptinessEventHandler()) : t.trigger("focus")
            }, _renderEvents: function() {
                var t = this, i = t._input();
                t._renderValueChangeEvent(), n.each(h, function(n, u) {
                    var e = r.addNamespace(u.toLowerCase(), t.NAME), o = t._createActionByOption("on" + f.camelize(u, !0));
                    i.off(e).on(e, function(n) {
                        o({jQueryEvent: n})
                    })
                })
            }, _renderValueChangeEvent: function() {
                var t = this.NAME + "ValueChange", i = r.addNamespace(this.option("valueChangeEvent"), t);
                this._input().off("." + t).on(i, n.proxy(this._valueChangeEventHandler, this))
            }, _focusTarget: function() {
                return this._input()
            }, _renderFocusTarget: n.noop, _focusInHandler: function(n) {
                n.stopPropagation(), this.element().addClass(s)
            }, _focusOutHandler: function(n) {
                n.stopPropagation(), this.element().removeClass(s)
            }, _renderEmptinessEvent: function() {
                var t = this._input();
                t.on("input blur", n.proxy(this._toggleEmptinessEventHandler, this));
                this._toggleEmptinessEventHandler()
            }, _toggleEmptinessEventHandler: function(n) {
                var n = this._input().val(), t = (n === "" || n === null) && this._isValueValid();
                this._toggleEmptiness(t)
            }, _valueChangeEventHandler: function(n, t) {
                this._valueChangeEventInstance = n, this._suppressValueUpdateAction = !0, this.option("value", arguments.length > 1 ? t : this._input().val()), this._suppressValueUpdateAction = !1, this._valueUpdateAction({value: this.option("value"), jQueryEvent: n})
            }, _renderEnterKeyAction: function() {
                if (this.option("onEnterKey")) {
                    this._enterKeyAction = this._createActionByOption("onEnterKey", {excludeValidators: ["readOnly"]});
                    this._input().on("keyup.onEnterKey.dxTextEditor", n.proxy(this._enterKeyHandlerUp, this))
                } else
                    this._input().off("keyup.onEnterKey.dxTextEditor"), this._enterKeyAction = i
            }, _enterKeyHandlerUp: function(n) {
                n.which === 13 && this._enterKeyAction({jQueryEvent: n})
            }, _updateValue: function() {
                this._renderValue(), this._suppressValueUpdateAction || this._valueUpdateAction({value: this.option("value")})
            }, _suppressUpdateValue: function() {
                this._valueUpdateSuppressed = !0
            }, _resumeUpdateValue: function() {
                this._valueUpdateSuppressed = !1
            }, _clean: function() {
                this._$placeholder && (this._$placeholder.remove(), delete this._$placeholder), delete this._$clearButton, this.callBase()
            }, _optionChanged: function(t) {
                var i = t.name;
                if (n.inArray(f.camelize(i.replace("on", "")), h) > -1) {
                    this._renderEvents();
                    return
                }
                switch (i) {
                    case"valueChangeEvent":
                        this._renderValueChangeEvent();
                        break;
                    case"valueUpdateAction":
                        this._initValueUpdateAction();
                        break;
                    case"readOnly":
                        this._toggleReadOnlyState(t.value), this._renderInputAddons();
                        break;
                    case"spellcheck":
                        this._toggleSpellcheckState();
                        break;
                    case"mode":
                        this._renderInputType();
                        break;
                    case"onEnterKey":
                        this._renderEnterKeyAction();
                        break;
                    case"placeholder":
                        this._invalidate();
                        break;
                    case"showClearButton":
                        this._renderInputAddons();
                        break;
                    case"value":
                        this._valueUpdateSuppressed || this._updateValue();
                    default:
                        this.callBase(t)
                    }
            }, _renderInputType: function() {
                this._setInputType(this.option("mode"))
            }, _setInputType: function(n) {
                var t = this._input();
                n === "search" && (n = "text");
                try {
                    t.prop("type", n)
                } catch (i) {
                    t.prop("type", "text")
                }
            }, focus: function() {
                this._input().focus()
            }, blur: function() {
                this._input().is(document.activeElement) && t.utils.resetActiveElement()
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, u = r.events, e = t.devices, o = window.navigator.userAgent, s = [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46], h = "dx-textbox", f = "dx-searchbox", c = "dx-icon-search";
        t.registerComponent("dxTextBox", r, r.dxTextEditor.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({mode: "text", maxLength: null})
            }, _render: function() {
                this.callBase(), this.element().addClass(h), this._renderMaxLengthHandlers(), this._renderSearchMode()
            }, _renderMaxLengthHandlers: function() {
                if (this._isAndroid())
                    this._input().on(u.addNamespace("keydown", this.NAME), n.proxy(this._onKeyDownAndroidHandler, this)).on(u.addNamespace("change", this.NAME), n.proxy(this._onChangeAndroidHandler, this))
            }, _renderProps: function() {
                this.callBase(), this._toggleMaxLengthProp()
            }, _toggleMaxLengthProp: function() {
                if (!this._isAndroid()) {
                    var n = this.option("maxLength");
                    n > 0 ? this._input().attr("maxLength", n) : this._input().removeAttr("maxLength")
                }
            }, _renderSearchMode: function() {
                var n = this._$element;
                this.option("mode") === "search" ? (this._renderSearchIcon(), n.addClass(f), this._showClearButton = this.option("showClearButton"), this.option("showClearButton", !0)) : (n.removeClass(f), this._$searchIcon && this._$searchIcon.remove(), this.option("showClearButton", this._showClearButton === i ? this.option("showClearButton") : this._showClearButton))
            }, _renderSearchIcon: function() {
                var t = n("<div>").addClass(c);
                t.prependTo(this._input().parent()), this._$searchIcon = t
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"maxLength":
                        this._toggleMaxLengthProp(), this._renderMaxLengthHandlers();
                        break;
                    case"mode":
                        this._invalidate();
                    default:
                        this.callBase(n)
                    }
            }, _onKeyDownAndroidHandler: function(t) {
                var r = this.option("maxLength"), i, u;
                return r ? (i = n(t.target), u = t.keyCode, this._cutOffExtraChar(i), i.val().length < r || n.inArray(u, s) !== -1 || window.getSelection().toString() !== "") : !0
            }, _onChangeAndroidHandler: function(t) {
                var i = n(t.target);
                this.option("maxLength") && this._cutOffExtraChar(i)
            }, _cutOffExtraChar: function(n) {
                var t = this.option("maxLength"), i = n.val();
                i.length > t && n.val(i.substr(0, t))
            }, _isAndroid: function() {
                var n = e.real(), t = n.version.join(".");
                return n.platform === "android" && t && /^(2\.|4\.1)/.test(t) && !/chrome/i.test(o)
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, f = u.events, s = "dx-dropdowneditor", p = "dx-dropdowneditor-readonly", e = "dx-dropdowneditor-input-wrapper", h = "dx-dropdowneditor-button", c = "dx-dropdowneditor-icon", l = "dx-dropdowneditor-overlay", a = "dx-dropdowneditor-active", v = "dx-dropdowneditor-button-visible", y = "dx-dropdowneditor-field-clickable", r = "dxDropDownEditor", o = f.addNamespace("dxclick", r), w = f.addNamespace("keydown", r), b = f.addNamespace("keyup", r), k = 40, d = 38;
        t.registerComponent(r, u, u.dxTextBox.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {escape: function() {
                        this.close()
                    }, space: function() {
                        this._validatedOpening()
                    }, upArrow: function(n) {
                        return(n.preventDefault(), n.stopPropagation(), n.altKey) ? (this.close(), !1) : !0
                    }, downArrow: function(n) {
                        return(n.preventDefault(), n.stopPropagation(), n.altKey) ? (this._validatedOpening(), !1) : !0
                    }})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {openAction: {since: "14.2", alias: "onOpened"}, closeAction: {since: "14.2", alias: "onClosed"}, shownAction: {since: "14.2", alias: "onOpened"}, hiddenAction: {since: "14.2", alias: "onClosed"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({onOpened: null, onClosed: null, opened: !1, fieldTemplate: null, contentTemplate: null, editEnabled: !0, openOnFieldClick: !1, deferRendering: !0, showDropButton: !0, dropPosition: {offset: {h: 0, v: -1}, my: "left top", at: "left bottom", collision: "flip flip"}, focusStateEnabled: !1})
            }, _inputWrapper: function() {
                return this.element().find("." + e)
            }, _init: function() {
                this.callBase(), this._initVisibilityActions()
            }, _initVisibilityActions: function() {
                this._openAction = this._createActionByOption("onOpened"), this._closeAction = this._createActionByOption("onClosed")
            }, _render: function() {
                this.callBase(), this._renderOpenHandler(), this.element().addClass(s), this._renderOpenedState()
            }, _renderContentImpl: function() {
                this.option("deferRendering") || this._createPopup()
            }, _renderInput: function() {
                this.callBase(), this.element().wrapInner(n("<div>").addClass(e)), this._$container = this.element().children().eq(0)
            }, _readOnlyPropValue: function() {
                return!this.option("editEnabled") || this.callBase()
            }, _renderField: function() {
                var i = this._getTemplateByOption("fieldTemplate"), n, r;
                if (i && this.option("fieldTemplate") && (n = this._$container, r = this._fieldRenderData(), n.empty(), this._$dropButton = null, this._$clearButton = null, i.render(r, n), !this._input().length))
                    throw t.Error("E1010");
            }, _fieldRenderData: function() {
                return this.option("value")
            }, _renderInputAddons: function() {
                this._renderField(), this.callBase(), this._renderDropButton()
            }, _renderDropButton: function() {
                var t = this.option("showDropButton");
                if (this.element().toggleClass(v, t), !t) {
                    this._$dropButton && this._$dropButton.remove(), this._$dropButton = null;
                    return
                }
                this._$dropButton || (this._$dropButton = this._createDropButton().addClass(h)), this._$dropButton.prependTo(this._buttonsContainer())
            }, _createDropButton: function() {
                var i = n("<div>").addClass(c), t = n("<div>").dxButton({focusStateEnabled: !1, disabled: this.option("readOnly")}).removeClass("dx-button");
                t.append(i), t.find(".dx-button-content").remove();
                t.on("dxpointerdown", function(n) {
                    n.preventDefault()
                });
                return t
            }, _renderOpenHandler: function() {
                var i = this.element().find(".dx-dropdowneditor-input-wrapper"), t;
                if (i.off(o), t = this.option("openOnFieldClick"), this.element().toggleClass(y, t), t) {
                    i.on(o, n.proxy(this._openHandler, this));
                    return
                }
                this.option("showDropButton") && this._$dropButton.dxButton("option", "onClick", n.proxy(this._openHandler, this))
            }, _openHandler: function() {
                this._toggleOpenState()
            }, _toggleOpenState: function(n) {
                (n = arguments.length ? n : !this.option("opened"), this.option("disabled") || this.option("readOnly")) || (this._input().focus(), this.option("opened", n))
            }, _renderOpenedState: function() {
                var n = this.option("opened");
                n && this._createPopup(), this.element().toggleClass(a, n), this._setPopupOption("visible", n)
            }, _createPopup: function() {
                this._$popup || (this._$popup = n("<div>").addClass(l).addClass(this.option("customOverlayCssClass")).appendTo(this.element()), this._renderPopup(), this._renderPopupContent())
            }, _renderPopup: function() {
                this._popup = this._$popup.dxPopup(this._popupConfig()).dxPopup("instance");
                this._popup.on({showing: n.proxy(this._popupShowingHandler, this), shown: n.proxy(this._popupShownHandler, this), hiding: n.proxy(this._popupHidingHandler, this), hidden: n.proxy(this._popupHiddenHandler, this)});
                this._popup.option("onContentReady", n.proxy(this._contentReadyHandler, this)), this._contentReadyHandler()
            }, _contentReadyHandler: n.noop, _popupConfig: function() {
                return{position: n.extend(this.option("dropPosition"), {of: this.element()}), showTitle: !1, width: "auto", height: "auto", shading: !1, rtlEnabled: this.option("rtlEnabled"), closeOnTargetScroll: !0, closeOnOutsideClick: n.proxy(this._closeOutsideDropDownHandler, this), animation: {show: {type: "fade", duration: 0, from: 0, to: 1}, hide: {type: "fade", duration: 400, from: 1, to: 0}}, deferRendering: !1, focusStateEnabled: !1}
            }, _popupShowingHandler: n.noop, _popupHidingHandler: function() {
                this.option("opened", !1)
            }, _popupShownHandler: function() {
                if (this._openAction(), this._$validationMessage) {
                    var n = t.position(this.element()).top, i = t.position(this._popup.content()).top;
                    this._$validationMessage.dxTooltip("option", "position", this._getValidationTooltipPosition(n + this.option("dropPosition").offset.v > i ? "below" : "above"))
                }
            }, _popupHiddenHandler: function() {
                this._closeAction(), this._$validationMessage && this._$validationMessage.dxTooltip("option", "position", this._getValidationTooltipPosition("below"))
            }, _renderPopupContent: function() {
                var t = this._getTemplateByOption("contentTemplate"), n;
                t && this.option("contentTemplate") && (n = this._popup.content(), n.empty(), t.render(n))
            }, _closeOutsideDropDownHandler: function(t) {
                var i = n(t.target), u = !!i.closest(this.element()).length, f = !!i.closest(this._$dropButton).length, r = !u && !f;
                return r && this._input().blur(), r
            }, _clean: function() {
                delete this._$dropButton, this._$popup && (this._$popup.remove(), delete this._$popup, delete this._popup), this.callBase()
            }, _setPopupOption: function() {
                this._setWidgetOption("_popup", arguments)
            }, _validatedOpening: function() {
                this.option("readOnly") || this._toggleOpenState(!0)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"opened":
                        this._renderOpenedState();
                        break;
                    case"onOpened":
                    case"onClosed":
                        this._initVisibilityActions();
                        break;
                    case"fieldTemplate":
                    case"fieldRender":
                        this._renderInputAddons();
                        break;
                    case"showDropButton":
                    case"contentTemplate":
                    case"contentRender":
                    case"editEnabled":
                    case"openOnFieldClick":
                        this._invalidate();
                        break;
                    case"dropPosition":
                    case"deferRendering":
                        break;
                    default:
                        this.callBase(n)
                    }
            }, open: function() {
                this.option("opened", !0)
            }, close: function() {
                this.option("opened", !1)
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, h = r.events, c = ".dx-list", f = ".dx-list-item", u = "dxListItemData", e = "dx-dropdownlist-selected", o = "dx-dropdownlist-popup-wrapper", s = ["startswith", "contains", "endwith", "notcontains"];
        t.registerComponent("dxDropDownList", r, r.dxDropDownEditor.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {tab: function() {
                        if (this.option("opened") === !0) {
                            var t = this._listSelectedItemElements();
                            t.length || (this._changeSelectedItem(t, this._listItemElements().first()), this.option("value", this._selectedItemValue())), this.close()
                        } else
                            this._focusTarget().focusout()
                    }, space: n.noop, home: n.noop, end: n.noop})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, this._dataExpressionDeprecatedOptions())
            }, _setDefaultOptions: function() {
                this.callBase(), this.option(n.extend(this._dataExpressionDefaultOptions(), {displayValue: i, searchEnabled: !1, searchMode: "contains", searchTimeout: 500, minSearchLength: 0, searchExpr: null, valueChangeEvent: "change keyup", selectedItem: null, pagingEnabled: !1, dropPosition: {my: "left top", at: "left bottom", offset: {h: 0, v: 0}, collision: "flip"}, focusStateEnabled: !0}))
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {dropPosition: {offset: {v: -6}}}}, {device: [{platform: "generic"}, {platform: "tizen"}], options: {dropPosition: {offset: {v: -1}}}}])
            }, _setOptionsByReference: function() {
                this.callBase(), n.extend(this._optionsByReference, {value: !0, displayValue: !0})
            }, _init: function() {
                this.callBase(), this._initDataExpressions(), this._initContentReadyAction(), this._setListDataSource(), this._validateSearchMode(), this._clearSelectedItem()
            }, _renderContentImpl: function() {
                this.callBase(), this.option("deferRendering") && this._loadDataSource()
            }, _renderField: function() {
                this.callBase();
                this._input().on("input", n.proxy(this._setFocusPolicy, this))
            }, _createPopup: function() {
                this.callBase(), this._popup._wrapper().addClass(this._popupWrapperClass())
            }, _popupWrapperClass: function() {
                return o
            }, _renderValue: function() {
                var t = n.proxy(this.callBase, this);
                return this._loadValue().always(n.proxy(function(n) {
                    this._setSelectedItem(n), this._refreshSelected(), t(this._displayValue(this.option("selectedItem")))
                }, this))
            }, _setSelectedItem: function(n) {
                var t = this._displayValue(n);
                this.option().selectedItem = n, this.option("displayValue", t || this.option("placeholder"))
            }, _displayValue: function(n) {
                return this._displayGetter(n)
            }, _refreshSelected: function() {
                this._listItemElements().each(n.proxy(function(t, i) {
                    var r = n(i), e = this._valueGetter(r.data(u)), f = this._isSelectedValue(e);
                    r.toggleClass(this._selectedItemClass(), f), f ? this._list.selectItem(r) : this._list.unselectItem(r)
                }, this))
            }, _popupShownHandler: function() {
                this.callBase(), this._setFocusPolicy()
            }, _setFocusPolicy: function() {
                this.option("focusStateEnabled") && this._list && (this._list._removeFocusedItem(), delete this._list._$focusedItem)
            }, _isSelectedValue: function(n) {
                return this._valueEquals(n, this.option("value"))
            }, _validateSearchMode: function() {
                var i = this.option("searchMode"), r = i.toLowerCase();
                if (n.inArray(r, s) == -1)
                    throw t.Error("E1019", i);
            }, _clearSelectedItem: function() {
                this.option().selectedItem = null
            }, _initContentReadyAction: function() {
                this._contentReadyAction = this._createActionByOption("onContentReady")
            }, _selectedItemClass: function() {
                return e
            }, _listItemElements: function() {
                return this._$list ? this._$list.find(f) : n()
            }, _listSelectedItemElements: function() {
                return this._$list ? this._$list.find("." + this._selectedItemClass()) : n()
            }, _popupConfig: function() {
                return n.extend(this.callBase(), {width: this.option("width")})
            }, _renderPopupContent: function() {
                this._renderList()
            }, _attachKeyboardEvents: function() {
                this.callBase.apply(this, arguments), this._attachChildKeyboardEvents()
            }, _attachChildKeyboardEvents: function() {
                var t = this._keyboardProcessor.attachChildProcessor(), i;
                if (this._list) {
                    this._list.option("_keyboardProcessor", t);
                    return
                }
                i = this._listConfig(), this._listConfig = function() {
                    return n.extend(i, {_keyboardProcessor: t})
                }
            }, _renderList: function() {
                this._$list = n("<div>").appendTo(this._popup.content()), this._list = this._$list.dxList(this._listConfig()).dxList("instance"), this._refreshList()
            }, _refreshList: function() {
                this._list && this._shouldRefreshDataSource() && this._setListDataSource()
            }, _shouldRefreshDataSource: function() {
                var n = !!this._list.option("dataSource");
                return n !== this._isMinFilterLengthExceeded()
            }, _listConfig: function() {
                return{_templates: this.option("_templates"), rtlEnabled: this.option("rtlEnabled"), autoPagingEnabled: this.option("pagingEnabled"), onContentReady: n.proxy(this._listContentReadyHandler, this), itemTemplate: this._getTemplateByOption("itemTemplate"), indicateLoading: !1, tabIndex: -1, onItemClick: n.proxy(this._listItemClickHandler, this), focusStateEnabled: this.option("focusStateEnabled")}
            }, _dataSourceOptions: function() {
                return{paginate: this.option("pagingEnabled")}
            }, _listContentReadyHandler: function() {
                this._list && (this.option().items = this._list.option("items")), this._refreshSelected(), this._dimensionChanged(), this._contentReadyAction()
            }, _setListOption: function() {
                this._setWidgetOption("_list", arguments)
            }, _listItemClickHandler: t.abstract, _setListDataSource: function() {
                if (this._list) {
                    var n = this._isMinFilterLengthExceeded();
                    this._setListOption("dataSource", n ? this._dataSource : null), n || this._setListOption("items", i)
                }
            }, _isMinFilterLengthExceeded: function() {
                return this._searchValue().toString().length >= this.option("minSearchLength")
            }, _searchValue: function() {
                return this._input().val() || ""
            }, _search: function() {
                if (!this._isMinFilterLengthExceeded()) {
                    this._searchCanceled();
                    return
                }
                var t = this.option("searchTimeout");
                t ? this._searchTimer || (this._searchTimer = setTimeout(n.proxy(this._searchDataSource, this), t)) : this._searchDataSource()
            }, _searchCanceled: function() {
                this._clearSearchTimer(), this._refreshList()
            }, _searchDataSource: function() {
                this._filterDataSource(this._searchValue())
            }, _filterDataSource: function(t) {
                var i = this._dataSource;
                return i.searchExpr(this.option("searchExpr") || this.option("displayExpr")), i.searchOperation(this.option("searchMode")), i.searchValue(t), i.pageIndex(0), i.load().done(n.proxy(this._dataSourceFiltered, this))
            }, _clearFilter: function() {
                this._dataSource.searchValue("")
            }, _dataSourceFiltered: function() {
                this._clearSearchTimer(), this._refreshList(), this._refreshPopupVisibility()
            }, _refreshPopupVisibility: function() {
                this.option("opened", this._hasItemsToShow()), this.option("opened") && this._dimensionChanged()
            }, _hasItemsToShow: function() {
                var n = this._dataSource && this._dataSource.items() || [], t = n.length, i = this.option("value"), r = this._isMinFilterLengthExceeded(), u = this._displayGetter(n[0]) || "", f = n.length === 1 && u === i;
                return r && t && !f
            }, _clearSearchTimer: function() {
                clearTimeout(this._searchTimer), delete this._searchTimer
            }, _popupShowingHandler: function() {
                this._dimensionChanged()
            }, _dimensionChanged: function() {
                this._popup && this._updatePopupDimensions()
            }, _updatePopupDimensions: function() {
                this._updatePopupWidth(), this._updatePopupHeight()
            }, _updatePopupWidth: function() {
                var n = t.devices.current(), i = n.android && n.version[0] >= 5 ? 16 : 0;
                this._setPopupOption("width", this.element().outerWidth() + i)
            }, _updatePopupHeight: function() {
                this._setPopupOption("height", "auto");
                var t = this._popup.overlayContent().outerHeight(), i = n(window).height() * .5;
                this._setPopupOption("height", Math.min(t, i)), this._list && this._list.updateDimensions()
            }, _changeSelectedItem: function(n, t) {
                var i = this._selectedItemClass();
                t.addClass(i), n.removeClass(i)
            }, _selectedItemValue: function() {
                var n = this._listSelectedItemElements();
                return this._valueGetter(n.data(u))
            }, _valueChangeArgs: function() {
                return n.extend(this.callBase.apply(this, arguments), {selectedItem: this.option("selectedItem"), itemData: this.option("selectedItem")})
            }, _clean: function() {
                this._list && delete this._list, this.callBase()
            }, _dispose: function() {
                this._clearSearchTimer(), this.callBase()
            }, _setCollectionWidgetOption: function() {
                this._setListOption.apply(this, arguments)
            }, _optionChanged: function(n) {
                this._dataExpressionOptionChanged(n);
                switch (n.name) {
                    case"items":
                        this.option("dataSource") || this._setListDataSource();
                        break;
                    case"dataSource":
                        this._setListDataSource();
                        break;
                    case"valueExpr":
                    case"displayExpr":
                    case"placeholder":
                        this._renderValue();
                        break;
                    case"searchMode":
                        this._validateSearchMode();
                        break;
                    case"minSearchLength":
                        this._refreshList();
                        break;
                    case"searchEnabled":
                    case"searchExpr":
                    case"pagingEnabled":
                        this._invalidate();
                        break;
                    case"onContentReady":
                        this._initContentReadyAction();
                        break;
                    case"itemTemplate":
                    case"displayValue":
                    case"selectedItem":
                    case"searchTimeout":
                        break;
                    default:
                        this.callBase(n)
                    }
            }}).include(r.DataExpressionMixin))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, r = u.events, f = "dx-textarea", e = "dx-texteditor-input", o = "dx-texteditor-container";
        t.registerComponent("dxTextArea", u, u.dxTextBox.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({spellcheck: !0})
            }, _render: function() {
                this.callBase(), this.element().addClass(f)
            }, _renderInput: function() {
                this.callBase(), this._renderScrollHandler()
            }, _createInput: function() {
                return n("<textarea>").addClass(e)
            }, _renderScrollHandler: function() {
                var n = this._input(), t = 0;
                n.on(r.addNamespace("dxpointerdown", this.NAME), function(n) {
                    t = r.eventData(n).y
                });
                n.on(r.addNamespace("dxpointermove", this.NAME), function(i) {
                    var u = n.scrollTop(), f = n.prop("scrollHeight") - n.prop("clientHeight") - u;
                    if (u !== 0 || f !== 0) {
                        var e = r.eventData(i).y, o = u === 0 && t >= e, s = f === 0 && t <= e, h = u > 0 && f > 0;
                        (o || s || h) && (i.isScrollingEvent = !0), t = e
                    }
                })
            }, _renderInputType: n.noop}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, f = Math, u = r.events, o = "dx-numberbox", e = "dx-numberbox-spin", s = "dx-numberbox-spin-container", h = "dx-numberbox-spin-up", c = "dx-numberbox-spin-down", l = "dx-numberbox-spin-button", a = "dx-numberbox-spin-touch-friendly", b = "." + h, k = "." + c, v = 150, y = ["Del", "Backspace", "Left", "Right", "Home", "End"], p = t.devices.real().android && navigator.userAgent.indexOf("Chrome") === -1, w = r.Widget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({direction: "up", onChange: null})
            }, _render: function() {
                this.callBase();
                var f = this, r = this.element(), t = u.addNamespace("dxpointerdown", this.NAME), i = e + "-" + this.option("direction");
                r.addClass(l).addClass(i).off(t).on(t, n.proxy(this._spinHoldHandler, this));
                this._spinIcon = n("<div>").addClass(i + "-icon").appendTo(this.element()), this._spinChangeHandler = this._createActionByOption("onChange")
            }, _spinHoldHandler: function(t) {
                t.preventDefault();
                var i = u.addNamespace("dxpointerup", this.NAME), r = u.addNamespace("dxpointercancel", this.NAME);
                this._clearTimer();
                n(document).off(i).off(r).on(i, n.proxy(this._clearTimer, this)).on(r, n.proxy(this._clearTimer, this));
                this._spinChangeHandler({jQueryEvent: t}), this._holdTimer = setInterval(this._spinChangeHandler, v, {jQueryEvent: t})
            }, _dispose: function() {
                this._clearTimer(), this.callBase()
            }, _clearTimer: function() {
                this._holdTimer && clearInterval(this._holdTimer)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"onChange":
                    case"direction":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }});
        t.registerComponent("dxNumberBox", r, r.dxTextEditor.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {upArrow: function(n) {
                        n.preventDefault(), n.stopPropagation(), this._spinUpChangeHandler()
                    }, downArrow: function(n) {
                        n.preventDefault(), n.stopPropagation(), this._spinDownChangeHandler()
                    }, enter: function() {
                        this._input().trigger(this.option("valueChangeEvent"))
                    }})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({value: 0, min: i, max: i, step: 1, showSpinButtons: !1, useTouchSpinButtons: !0, mode: "number"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic
                        }, options: {useTouchSpinButtons: !1}}])
            }, _render: function() {
                this.callBase(), this.element().addClass(o), this._keyPressHandlerEvent()
            }, _keyPressHandlerEvent: function() {
                var t = this;
                this._input().keypress(function(i) {
                    var r = String.fromCharCode(i.which), u = /[\d.,eE\-+]/, f = u.test(r);
                    if (!f && !(i.key && n.inArray(i.key, y) >= 0))
                        return i.preventDefault(), !1;
                    t._isIncompleteValue = !1, t._isValueIncomplete(t._input().val() + r) && (t._isIncompleteValue = !0)
                })
            }, _isValueIncomplete: function(n) {
                var t = /\d+e$/, i = /^-/;
                return t.test(n) || i.test(n)
            }, _renderInputAddons: function() {
                this.callBase(), this._renderSpinButtons()
            }, _renderSpinButtons: function() {
                var n = this.option("showSpinButtons");
                if (this.element().toggleClass(e, n), this._toggleTouchFriendlyClass(), !n) {
                    this._$spinContainer && this._$spinContainer.remove(), this._$spinContainer = null;
                    return
                }
                this._$spinContainer || (this._$spinContainer = this._createSpinButtons()), this._$spinContainer.prependTo(this._buttonsContainer())
            }, _toggleTouchFriendlyClass: function() {
                this.element().toggleClass(a, this.option("showSpinButtons") && this.option("useTouchSpinButtons"))
            }, _createSpinButtons: function() {
                var i = u.addNamespace("dxclick", this.NAME), r = u.addNamespace("dxpointerdown", this.NAME), t = n("<div>").addClass(s).off(r).off(i).on(r, n.proxy(this._spinButtonsPointerDownHandler, this)).on(i, n.proxy(this._spinButtonsClickHandler, this));
                return this._$spinUp = n("<div>").dxSpinButton({direction: "up", onChange: n.proxy(this._spinUpChangeHandler, this)}).appendTo(t), this._$spinDown = n("<div>").dxSpinButton({direction: "down", onChange: n.proxy(this._spinDownChangeHandler, this)}).appendTo(t), t
            }, _spinButtonsClickHandler: function(n) {
                n.dxPreventBlur = !0
            }, _spinButtonsPointerDownHandler: function() {
                var t = this._input();
                this.option("useTouchSpinButtons") || document.activeElement === t[0] || t.trigger("focus")
            }, _spinValueChange: function(n) {
                this._input().trigger(this.option("valueChangeEvent"));
                var t = parseFloat(this.option().value || 0), i = parseFloat(this.option().step);
                t = this._correctRounding(t, i * n), this.option("value", t)
            }, _spinUpChangeHandler: function() {
                this._spinValueChange(1)
            }, _spinDownChangeHandler: function() {
                this._spinValueChange(-1)
            }, _correctRounding: function(n, t) {
                var i = /[,|.](.*)/, r = i.test(n), u = i.test(t);
                if (r || u) {
                    var e = r ? i.exec(n)[0].length : 0, o = u ? i.exec(t)[0].length : 0, s = f.max(e, o);
                    return n = this._round(n + t, s)
                }
                return n + t
            }, _round: function(n, t) {
                t = t || 0;
                var i = Math.pow(10, t);
                return n *= i, n = Math.round(n) / i
            }, _renderValue: function() {
                var n = this.option("value") ? this.option("value").toString() : this.option("value");
                this._input().val() !== n && (this._forceValueRender(), this._toggleEmptinessEventHandler()), this._renderInputAddons()
            }, _forceValueRender: function() {
                var n = this._input(), t = this.option("value"), i;
                p ? (i = n.attr("type"), this._setInputType("text"), n.val(t), this._setInputType(i)) : n.val(t)
            }, _renderProps: function() {
                this.callBase(), this._input().prop({min: this.option("min"), max: this.option("max"), step: this.option("step")})
            }, _trimInputValue: function() {
                var i = this._input(), t = n.trim(i.val());
                t[t.length - 1] === "." && (t = t.slice(0, -1)), this._forceRefreshInputValue(t)
            }, _inputInvalidHandler: function() {
                var n = this._input(), t = n.val();
                this._oldValue ? (this.option("value", this._oldValue), n.val(this._oldValue), this._oldValue = null) : (this.option("value", ""), n.val(""))
            }, _forceRefreshInputValue: function(n) {
                var t = this._input();
                t.val("").val(n), t.val(this.option("value"))
            }, _renderValueChangeEvent: function() {
                this.callBase(), this._input().focusout(n.proxy(this._trimInputValue, this))
            }, _valueChangeEventHandler: function(t) {
                var r = this._input(), i = n.trim(r.val()), u = r.get(0);
                if (i = i.replace(",", "."), this._valueChangeEventInstance = t, !this._isIncompleteValue && !this._validateValue(i)) {
                    this._inputInvalidHandler();
                    return
                }
                if (i !== "") {
                    if (i = this._parseValue(i), !i && i !== 0)
                        return;
                    this.callBase(t, i), r.val() != i && r.val(this.option("value"))
                } else
                    this._isIncompleteValue || this.option("value") === "" || (this.option("value", this._oldValue), r.val(this._oldValue))
            }, _validateValue: function(n) {
                var t = this._isValueValid(), i, r;
                return!n && t ? (this.option("value", ""), !0) : (i = /^-?\d*\.?\d*$/.test(n), r = /^-?\d+e[-+]?\d+$/.test(n), this._oldValue = this.option("value"), !i && !r && !t) ? !1 : !0
            }, _parseValue: function(n) {
                var t = parseFloat(n);
                return this.option("min") !== i && (t = f.max(t, this.option("min"))), this.option("max") !== i && (t = f.min(t, this.option("max"))), t
            }, _setValue: function(t, i) {
                if (!t && t !== 0) {
                    this.option("value", ""), t !== "" && this._suppressValueChangeAction();
                    return
                }
                n.type(t) === "string" && (t = t.replace(",", "."));
                var r = this._parseValue(t);
                if (!r && r !== 0) {
                    this.option("value", i), this._suppressValueChangeAction();
                    return
                }
                t !== r && (this.option("value", r), this._suppressValueChangeAction())
            }, _clean: function() {
                delete this._$spinContainer, delete this._$spinUp, delete this._$spinDown, this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"value":
                        this._setValue(n.value, n.previousValue), this.callBase(n), this._resumeValueChangeAction();
                        break;
                    case"step":
                    case"min":
                    case"max":
                        this._renderProps();
                        break;
                    case"showSpinButtons":
                        this._renderInputAddons();
                        break;
                    case"useTouchSpinButtons":
                        this._toggleTouchFriendlyClass();
                        break;
                    default:
                        this.callBase(n)
                    }
            }})), t.registerComponent("dxSpinButton", r.dxNumberBox, w)
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, e = r.events, u = "dxRadioButton", o = "dx-radio-button", s = "dx-radio-button-icon", h = "dx-radio-button-checked", f = e.addNamespace("dxclick", u);
        t.registerComponent(u, r, r.Editor.inherit({_supportedKeys: function() {
                var t = function(n) {
                    this._clickAction({jQueryEvent: n})
                };
                return n.extend(this.callBase(), {space: t, enter: t})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({value: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0, hoverStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this.element().addClass(o)
            }, _render: function() {
                this.callBase(), this._renderIcon(), this._renderCheckedState(this.option("value")), this._renderClick()
            }, _renderIcon: function() {
                var t = n("<div>").addClass(s);
                this.element().append(t)
            }, _renderCheckedState: function(n) {
                this.element().toggleClass(h, n)
            }, _renderClick: function() {
                this._clickAction = this._createAction(n.proxy(function(n) {
                    this._clickHandler(n.jQueryEvent)
                }, this));
                this.element().off(f).on(f, n.proxy(function(n) {
                    this._clickAction({jQueryEvent: n})
                }, this))
            }, _clickHandler: function(n) {
                this._valueChangeEventInstance = n, this.option("value", !0)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"value":
                        this._renderCheckedState(n.value), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, v = r.events, f = "dx-radio-group", e = "dx-radio-group-vertical", o = "dx-radio-group-horizontal", u = "dx-radio-button", s = "dx-radio-button-icon", h = "dx-radio-value-container", c = "dx-radio-button-checked", l = "dxItemData", a = 100;
        t.registerComponent("dxRadioGroup", r, r.Editor.inherit({_activeStateUnit: "." + u, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, this._dataExpressionDeprecatedOptions())
            }, _setDefaultOptions: function() {
                this.callBase(), this.option(n.extend(this._dataExpressionDefaultOptions(), {layout: "vertical"}))
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {tablet: !0}, options: {layout: "horizontal"}}, {device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0, hoverStateEnabled: !0}}])
            }, _setOptionsByReference: function() {
                this.callBase(), n.extend(this._optionsByReference, {value: !0})
            }, _dataSourceOptions: function() {
                return{paginate: !1, _preferSync: !0}
            }, _init: function() {
                this.callBase(), this._initDataExpressions(), this._feedbackHideTimeout = a
            }, _render: function() {
                this.element().addClass(f), this._renderCollectionWidget(), this.callBase(), this._renderLayout(), this._updateItemsSize()
            }, _renderFocusTarget: n.noop, _renderContentImpl: n.noop, _renderCollectionWidget: function() {
                this._$collectionWidget = n("<div>").appendTo(this.element()), this._collectionWidget = new r.CollectionWidget(this._$collectionWidget, {_templates: this.option("_templates"), _focusEventPropagation: !0, dataSource: this._dataSource, onItemRendered: n.proxy(this._itemRenderedHandler, this), onItemClick: n.proxy(this._itemClickHandler, this), itemTemplate: this._getTemplateByOption("itemTemplate"), rtlEnabled: this.option("rtlEnabled"), autoPagingEnabled: !1, scrollingEnabled: !1, focusStateEnabled: this.option("focusStateEnabled"), noDataText: "", tabIndex: this.option("tabIndex")}), this._setCollectionWidgetOption("onContentReady", n.proxy(this._contentReadyHandler, this)), this._contentReadyHandler()
            }, _attachKeyboardEvents: function() {
                this.callBase.apply(this, arguments), this._collectionProcessor = this._keyboardProcessor.attachChildProcessor(), this._collectionWidget && this._collectionWidget.option("_keyboardProcessor", this._collectionProcessor)
            }, _cleanFocusState: function() {
                this.callBase.apply(this, arguments), delete this._collectionProcessor
            }, _focusTarget: function() {
                return this.element()
            }, _contentReadyHandler: function() {
                this.itemElements().addClass(u), this._refreshSelected()
            }, _itemRenderedHandler: function(t) {
                if (!t.itemData.html) {
                    var i = n("<div>").addClass(s), r = n("<div>").append(i).addClass(h);
                    t.itemElement.prepend(r)
                }
            }, _itemClickHandler: function(n) {
                this.option("value", this._getItemValue(n.itemData))
            }, _getItemValue: function(n) {
                return!this._valueGetter ? n.text : this._valueGetter(n)
            }, itemElements: function() {
                return this._collectionWidget.itemElements()
            }, _renderDimensions: function() {
                this.callBase(), this._updateItemsSize()
            }, _renderLayout: function() {
                var n = this.option("layout");
                this.element().toggleClass(e, n === "vertical"), this.element().toggleClass(o, n === "horizontal")
            }, _refreshSelected: function() {
                var t = this.option("value");
                this.itemElements().each(n.proxy(function(i, r) {
                    var u = n(r), f = this._valueGetter(u.data(l));
                    u.toggleClass(c, this._valueEquals(f, t))
                }, this))
            }, _updateItemsSize: function() {
                if (this.option("layout") === "horizontal")
                    this.itemElements().css("height", "auto");
                else {
                    var n = this.option("items").length;
                    this.itemElements().css("height", 100 / n + "%")
                }
            }, _setCollectionWidgetOption: function() {
                this._setWidgetOption("_collectionWidget", arguments)
            }, _optionChanged: function(n) {
                this._dataExpressionOptionChanged(n);
                switch (n.name) {
                    case"focusStateEnabled":
                        this._setCollectionWidgetOption(n.name, n.value);
                        break;
                    case"dataSource":
                        this._setCollectionWidgetOption("dataSource");
                        break;
                    case"valueExpr":
                        this._refreshSelected();
                        break;
                    case"value":
                        this._refreshSelected(), this.callBase(n);
                        break;
                    case"items":
                    case"itemTemplate":
                    case"displayExpr":
                        break;
                    case"layout":
                        this._renderLayout(), this._updateItemsSize();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}).include(r.DataExpressionMixin))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, d = r.events, g = t.fx, s = "dx-tabs", h = "dx-indent-wrapper", c = "dx-tabs-expanded", l = "dx-scrollable-wrapper", a = "dx-tabs-nav-buttons", nt = 25, v = "dx-tab", y = ".dx-tab", p = "dx-tab-selected", w = "dx-tabs-nav-button", u = "dx-tabs-nav-button-left", f = "dx-tabs-nav-button-right", b = "dxTabData", k = 100, e = "dx-state-active", tt = "dx-scrollable-content", o = 30;
        t.registerComponent("dxTabs", r, r.CollectionWidget.inherit({_activeStateUnit: y, _setDefaultOptions: function() {
                this.callBase(), this.option({showNavButtons: !1, scrollByContent: !0, scrollingEnabled: !0, wordWrap: !1, activeStateEnabled: !0, selectionMode: "single", selectionRequired: !0, selectOnFocus: !0, loopItemFocus: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {wordWrap: !0}}, {device: {platform: "generic"}, options: {showNavButtons: !0, scrollByContent: !1}}, {device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this.element().addClass(s), this._feedbackHideTimeout = k
            }, _itemClass: function() {
                return v
            }, _selectedItemClass: function() {
                return p
            }, _itemDataKey: function() {
                return b
            }, _render: function() {
                this.callBase(), this._renderWrapper(), this._allowScrolling() ? (this._renderScrollable(), this._renderNavButtons(), this._updateNavButtons()) : this.element().addClass(c), this.element().addClass(e).removeClass(e)
            }, _renderWrapper: function() {
                this.element().wrapInner(n("<div>").addClass(h))
            }, _renderScrollable: function() {
                var t = this.element().wrapInner(n("<div>").addClass(l)).children();
                this._scrollable = t.dxScrollable({direction: "horizontal", showScrollbar: !1, useKeyboard: !1, useNative: !1, scrollByContent: this.option("scrollByContent"), onScroll: n.proxy(this._updateNavButtonsVisibility, this)}).dxScrollable("instance"), this.element().append(this._scrollable.element())
            }, _allowScrolling: function() {
                if (!this.option("wordWrap")) {
                    if (!this.option("scrollingEnabled"))
                        return!1;
                    var t = 0;
                    return this.itemElements().each(function(i, r) {
                        t += n(r).outerWidth(!0)
                    }), t > this.element().width()
                }
            }, _renderNavButtons: function() {
                var n, t;
                this.element().toggleClass(a, this.option("showNavButtons")), this.option("showNavButtons") && (this._leftButton = this._createNavButton(-o), n = this._leftButton.element(), n.addClass(u), this.element().prepend(n), this._rightButton = this._createNavButton(o), t = this._rightButton.element(), t.addClass(f), this.element().append(t), this._updateNavButtonsVisibility(), this._scrollable.update())
            }, _updateNavButtonsVisibility: function() {
                this._leftButton && this._leftButton.option("disabled", this._scrollable.scrollLeft() <= 0), this._rightButton && this._rightButton.option("disabled", this._scrollable.scrollLeft() >= this._scrollable.scrollWidth() - this._scrollable.clientWidth())
            }, _createNavButton: function(t) {
                var i = n("<div>").addClass(w).dxButton({focusStateEnabled: !1, onClick: n.proxy(function() {
                        this._scrollable.update(), this._scrollable.scrollBy(t)
                    }, this)});
                return i.dxButton("instance")
            }, _updateNavButtons: function() {
                var n = this.element(), t = n.height();
                n.find("." + u).css({height: t}), n.find("." + f).css({height: t, "margin-top": -t})
            }, _renderSelection: function(n) {
                this._scrollable && this._scrollable.scrollToElement(this.itemElements().eq(n[0]))
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"wordWrap":
                    case"scrollingEnabled":
                    case"showNavButtons":
                        this._invalidate();
                        break;
                    case"scrollByContent":
                        this._scrollable && this._scrollable.option(n.name, n.value);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = "dx-navbar", f = "dx-item-content", e = "dx-nav-item", o = "dx-nav-item-content", s = "dx-navbar-item-badge", h = "dx-badge";
        t.registerComponent("dxNavBar", r, r.dxTabs.inherit({_defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "generic"}, options: {showNavButtons: !1, scrollByContent: !1, scrollingEnabled: !1}}])
            }, _render: function() {
                this.callBase(), this.element().addClass(u)
            }, _postprocessRenderItem: function(n) {
                this.callBase(n);
                var t = n.itemElement, i = n.itemData;
                t.addClass(e), t.find("." + f).addClass(o), i.icon || i.iconSrc || t.addClass("dx-navbar-text-item")
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, o = t.fx, nt = t.utils, s = t.translator, h = "dx-toolbar", c = "dx-toolbar-bottom", l = "dx-toolbar-mini", a = "dx-toolbar-item", f = "dx-toolbar-label", r = "dx-toolbar-button", v = "dx-toolbar-menu-container", y = "dx-toolbar-menu-button", p = "dx-toolbar-items-container", e = "." + f, w = "dxToolbarItemDataKey", b = "easeOutCubic", k = 200, d = 400, g = function(n, t, i) {
            var r = i ? d : k;
            o.animate(n, {type: "slide", to: {top: t}, easing: b, duration: r})
        };
        t.registerComponent("dxToolbar", u, u.CollectionWidget.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {menuItemRender: {since: "14.2", alias: "menuItemTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({menuItemTemplate: "menuItem", submenuType: "dxDropDownMenu", renderAs: "topToolbar"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "ios"}, options: {submenuType: "dxActionSheet"}}, {device: {platform: "android"}, options: {submenuType: "dxDropDownMenu"}}, {device: {platform: "win8"}, options: {submenuType: "dxList"}}])
            }, _itemContainer: function() {
                return this._$toolbarItemsContainer.find(".dx-toolbar-before,.dx-toolbar-center,.dx-toolbar-after")
            }, _itemClass: function() {
                return a
            }, _itemDataKey: function() {
                return w
            }, _dimensionChanged: function() {
                this._menu && this._toggleMenuVisibility(!1, !0), this._arrangeTitle()
            }, _render: function() {
                this._renderToolbar(), this._renderSections(), this.callBase(), this._renderMenu(), this._arrangeTitle()
            }, _renderToolbar: function() {
                this.element().addClass(h).toggleClass(c, this.option("renderAs") === "bottomToolbar"), this._$toolbarItemsContainer = n("<div>").appendTo(this.element()), this._$toolbarItemsContainer.addClass(p)
            }, _renderSections: function() {
                var t = this._$toolbarItemsContainer, i = this;
                n.each(["before", "center", "after"], function() {
                    var r = "dx-toolbar-" + this, u = t.find("." + r);
                    u.length || (i["_$" + this + "Section"] = u = n("<div>").addClass(r).appendTo(t))
                })
            }, _arrangeTitle: function() {
                var r, u;
                if (!this.element().is(":hidden")) {
                    var h = this._$toolbarItemsContainer, t = this._$centerSection, i = t.children(e).eq(0);
                    if (i.length) {
                        t.css({marginLeft: "auto", marginRight: "auto"}), i.css("max-width", "");
                        var c = h.width(), f = this._$beforeSection.outerWidth(), o = this._$afterSection.outerWidth(), s = 10;
                        t.children().not(e).each(function() {
                            s += n(this).outerWidth()
                        }), r = c - f - o - s, u = i.width() > r, t.css({marginLeft: u ? f : "", marginRight: u ? o : ""}), i.css("max-width", r)
                    }
                }
            }, _renderItem: function(n, i) {
                var u, o, e;
                return i.align && t.log("W0001", "dxToolbar.items.align", "14.1", "Use 'location' instead"), u = i.location || i.align || "center", u === "left" ? (u = "before", t.log("W0001", this.NAME, "items.location = 'left'", "14.1", "Use 'before' instead")) : u === "right" && (u = "after", t.log("W0001", this.NAME, "items.location = 'right'", "14.1", "Use 'after' instead")), o = this._$toolbarItemsContainer.find(".dx-toolbar-" + u), e = this.callBase(n, i, o), e.addClass(r), i.text && e.addClass(f).removeClass(r), e
            }, _hasVisibleMenuItems: function() {
                var i = this._getMenuItems(), t = !1, r = DevExpress.data.utils.compileGetter("visible");
                return n.each(i, function(n, i) {
                    var u = r(i, {functionsAsIs: !0});
                    u !== !1 && (t = !0)
                }), t
            }, _getToolbarItems: function() {
                return n.grep(this.option("items") || [], function(n) {
                    return n.location !== "menu"
                })
            }, _getMenuItems: function() {
                return n.grep(this.option("items") || [], function(n) {
                    return n.location === "menu"
                })
            }, _renderContentImpl: function() {
                var n = this._getToolbarItems();
                this.element().toggleClass(l, n.length === 0), this._renderedItemsCount ? this._renderItems(n.slice(this._renderedItemsCount)) : this._renderItems(n)
            }, _renderMenu: function() {
                var n = this, i = this._createActionByOption("onItemClick"), t = {itemTemplate: function() {
                        return n._menuType == "dxActionSheet" ? n._getTemplate("actionSheetItem") : n._getTemplateByOption("menuItemTemplate")
                    }, onItemClick: function(t) {
                        n._toggleMenuVisibility(!1, !0), i(t)
                    }, rtlEnabled: this.option("rtlEnabled")};
                this._menuType = this.option("submenuType"), this._menuType === "dxList" && this.option("renderAs") === "topToolbar" && (this._menuType = "dxDropDownMenu");
                switch (this._menuType) {
                    case"dxActionSheet":
                        this._renderActionSheet(t);
                        break;
                    case"dxDropDownMenu":
                        this._renderDropDown(t);
                        break;
                    case"dxList":
                        this._renderList(t)
                    }
            }, _renderMenuButton: function(t) {
                var i = n.extend({onClick: n.proxy(this._menuButtonClickHandler, this)}, t);
                this._renderMenuButtonContainer(), this._$button = n("<div>").appendTo(this._$menuButtonContainer).addClass(y).dxButton(i)
            }, _renderMenuButtonContainer: function() {
                var t = this._$afterSection;
                this._$menuButtonContainer = n("<div>").appendTo(t).addClass(r).addClass(v)
            }, _renderDropDown: function(t) {
                this._hasVisibleMenuItems() && (this._renderMenuButtonContainer(), this._menu = n("<div>").appendTo(this._$menuButtonContainer).dxDropDownMenu(t).dxDropDownMenu("instance"), this._renderMenuItems())
            }, _renderActionSheet: function(t) {
                if (this._hasVisibleMenuItems()) {
                    this._renderMenuButton({icon: "overflow"});
                    var i = n.extend({target: this._$button, showTitle: !1}, t);
                    this._menu = n("<div>").appendTo(this.element()).dxActionSheet(i).dxActionSheet("instance"), this._renderMenuItems()
                }
            }, _renderList: function(t) {
                this._renderMenuButton({activeStateEnabled: !1, text: "..."});
                var i = n.extend({width: "100%", indicateLoading: !1}, t);
                this._renderListOverlay(), this._renderContainerSwipe(), this._hasVisibleMenuItems() && (this._menu = n("<div>").appendTo(this._listOverlay.content()).dxList(i).dxList("instance"), this._renderMenuItems()), this._changeListVisible(this.option("visible"))
            }, _renderMenuItems: function() {
                this._menu.option("items", this._getMenuItems())
            }, _getListHeight: function() {
                var n = this._listOverlay.content().find(".dx-list").height(), t = this._$toolbarItemsContainer.height() - this.element().height();
                return n + t
            }, _renderListOverlay: function() {
                var t = this.element();
                this._listOverlay = n("<div>").appendTo(t).dxOverlay({container: !1, deferRendering: !1, shading: !1, height: "auto", width: "100%", showTitle: !1, closeOnOutsideClick: n.proxy(this._listOutsideClickHandler, this), position: null, animation: null, closeOnBackButton: !1}).dxOverlay("instance")
            }, _hideTopOverlayHandler: function() {
                this._toggleMenuVisibility(!1, !0)
            }, _toggleHideTopOverlayCallback: function() {
                this._closeCallback && t.hideTopOverlayCallback.remove(this._closeCallback), this._menuShown && (this._closeCallback = n.proxy(this._hideTopOverlayHandler, this), t.hideTopOverlayCallback.add(this._closeCallback))
            }, _renderContainerSwipe: function() {
                this._$toolbarItemsContainer.appendTo(this._listOverlay.content()).dxSwipeable({elastic: !1, onStart: n.proxy(this._swipeStartHandler, this), onUpdated: n.proxy(this._swipeUpdateHandler, this), onEnd: n.proxy(this._swipeEndHandler, this), itemSizeFunc: n.proxy(this._getListHeight, this), direction: "vertical"})
            }, _listOutsideClickHandler: function(t) {
                n(t.target).closest(this._listOverlay.content()).length || this._toggleMenuVisibility(!1, !0)
            }, _calculatePixelOffset: function(n) {
                n = (n || 0) - 1;
                var t = this._getListHeight();
                return n * t
            }, _swipeStartHandler: function(n) {
                n.jQueryEvent.maxTopOffset = this._menuShown ? 0 : 1, n.jQueryEvent.maxBottomOffset = this._menuShown ? 1 : 0
            }, _swipeUpdateHandler: function(n) {
                var t = this._menuShown ? n.jQueryEvent.offset : 1 + n.jQueryEvent.offset;
                this._renderMenuPosition(t, !1)
            }, _swipeEndHandler: function(n) {
                var t = n.jQueryEvent.targetOffset;
                t -= this._menuShown - 1, this._toggleMenuVisibility(t === 0, !0)
            }, _renderMenuPosition: function(n, t) {
                var i = this._calculatePixelOffset(n), r = this._listOverlay.content();
                t ? g(r, i, this._menuShown) : s.move(r, {top: i})
            }, _menuButtonClickHandler: function() {
                this._toggleMenuVisibility(!this._menuShown, !0)
            }, _toggleMenuVisibility: function(n, t) {
                this._menuShown = n;
                switch (this._menuType) {
                    case"dxList":
                        this._toggleHideTopOverlayCallback(), this._renderMenuPosition(this._menuShown ? 0 : 1, t);
                        break;
                    case"dxActionSheet":
                        this._menu.toggle(this._menuShown), this._menuShown = !1
                    }
            }, _renderEmptyMessage: n.noop, _clean: function() {
                this._$toolbarItemsContainer.children().empty(), this.element().empty()
            }, _changeMenuOption: function(n, t) {
                this._menu && this._menu.option(n, t)
            }, _changeListVisible: function(n) {
                this._listOverlay && (this._listOverlay.option("visible", n), this._toggleMenuVisibility(!1, !1))
            }, _visibilityChanged: function(n) {
                n && this._arrangeTitle()
            }, _optionChanged: function(n) {
                var i = n.name, t = n.value;
                switch (i) {
                    case"renderAs":
                    case"submenuType":
                        this._invalidate();
                        break;
                    case"visible":
                        this.callBase.apply(this, arguments), this._changeListVisible(t);
                        break;
                    case"menuItemTemplate":
                        this._changeMenuOption("itemTemplate", this._getTemplate(t));
                        break;
                    case"onItemClick":
                        this._changeMenuOption(i, t), this.callBase.apply(this, arguments);
                        break;
                    default:
                        this.callBase.apply(this, arguments)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = u.events, b = t.utils, h = "dx-list", f = "dx-list-item", c = "." + f, r = "dx-list-group", o = "dx-list-group-header", s = "dx-list-group-body", l = "dx-list-collapsible-groups", a = "dx-list-group-collapsed", v = "dx-has-next", y = "dx-list-next-button", k = "dx-list-item-badge-container", d = "dx-list-item-badge", g = "dx-badge", nt = "dx-list-item-chevron-container", tt = "dx-list-item-chevron", p = "dxListItemData", w = 70;
        t.registerComponent("dxList", u, u.CollectionWidget.inherit({_activeStateUnit: c, _supportedKeys: function() {
                return n.extend(this.callBase(), {leftArrow: n.noop, rightArrow: n.noop})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {itemSwipeAction: {since: "14.2", alias: "onItemSwipe"}, scrollAction: {since: "14.2", alias: "onScroll"}, pullRefreshAction: {since: "14.2", alias: "onPullRefresh"}, pageLoadingAction: {since: "14.2", alias: "onPageLoading"}, groupRender: {since: "14.2", alias: "groupTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({pullRefreshEnabled: !1, autoPagingEnabled: !0, scrollingEnabled: !0, showScrollbar: !0, useNativeScrolling: !0, pullingDownText: Globalize.localize("dxList-pullingDownText"), pulledDownText: Globalize.localize("dxList-pulledDownText"), refreshingText: Globalize.localize("dxList-refreshingText"), pageLoadingText: Globalize.localize("dxList-pageLoadingText"), onScroll: null, onPullRefresh: null, onPageLoading: null, showNextButton: !1, nextButtonText: Globalize.localize("dxList-nextButtonText"), onItemSwipe: null, grouped: !1, collapsibleGroups: !1, groupTemplate: "group", indicateLoading: !0, activeStateEnabled: !0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return!t.support.nativeScrolling
                        }, options: {useNativeScrolling: !1}}, {device: function(n) {
                            return!t.support.nativeScrolling && !t.devices.isSimulator() && t.devices.real().platform === "generic" && n.platform === "generic"
                        }, options: {showScrollbar: "onHover", showNextButton: !0, autoPagingEnabled: !1}}, {device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _itemClass: function() {
                return f
            }, _itemDataKey: function() {
                return p
            }, _itemContainer: function() {
                return this._$container
            }, _allowDinamicItemsAppend: function() {
                return!0
            }, _init: function() {
                this.callBase(), this._$container = this.element(), this._initScrollView(), this._feedbackShowTimeout = w
            }, _dataSourceOptions: function() {
                return n.extend(this.callBase(), {paginate: !0})
            }, _initScrollView: function() {
                var t = this.option("scrollingEnabled"), r = t && this.option("pullRefreshEnabled"), i = t && this.option("autoPagingEnabled") && !!this._dataSource, u = this.element().dxScrollView({rtlEnabled: this.option("rtlEnabled"), disabled: this.option("disabled") || !t, onScroll: n.proxy(this._scrollHandler, this), onPullDown: r ? n.proxy(this._pullDownHandler, this) : null, onReachBottom: i ? n.proxy(this._scrollBottomHandler, this) : null, showScrollbar: this.option("showScrollbar"), useNative: this.option("useNativeScrolling"), pullingDownText: this.option("pullingDownText"), pulledDownText: this.option("pulledDownText"), refreshingText: this.option("refreshingText"), reachBottomText: this.option("pageLoadingText"), useKeyboard: !1});
                this._scrollView = u.dxScrollView("instance"), this._scrollView.toggleLoading(i), this._$container = this._scrollView.content(), this._createScrollViewActions(), this._afterItemsRendered()
            }, _createScrollViewActions: function() {
                this._scrollAction = this._createActionByOption("onScroll"), this._pullRefreshAction = this._createActionByOption("onPullRefresh"), this._pageLoadingAction = this._createActionByOption("onPageLoading")
            }, _scrollHandler: function(n) {
                this._scrollAction(n)
            }, _afterItemsRendered: function(n) {
                var r = this._isLastPage(), t = !n || r, u = this.option("autoPagingEnabled"), i = !u || t, f = this._scrollViewIsFull();
                i || f ? (this._scrollView.release(i), this._loadIndicationSuppressed = !1, this._shouldRenderNextButton() && this._dataSource.isLoaded() && this._toggleNextButton(!t)) : this._infiniteDataLoading()
            }, _shouldRenderNextButton: function() {
                return this.option("showNextButton") && this._dataSource
            }, _dataSourceLoadingChangedHandler: function(t) {
                this._loadIndicationSuppressed || (t && this.option("indicateLoading") ? this._showLoadingIndicatorTimer = setTimeout(n.proxy(function() {
                    this._scrollView && this._scrollView.startLoading()
                }, this)) : (clearTimeout(this._showLoadingIndicatorTimer), this._scrollView && this._scrollView.finishLoading()))
            }, _hideLoadingIfLoadIndicationOff: function() {
                this.option("indicateLoading") || this._dataSourceLoadingChangedHandler(!1)
            }, _suppressLoadingIndication: function() {
                this._loadIndicationSuppressed = !0
            }, _scrollViewIsFull: function() {
                return!this._scrollView || this._scrollView.isFull()
            }, _pullDownHandler: function(n) {
                this._pullRefreshAction(n), this._dataSource && !this._dataSource.isLoading() ? (this._dataSource.pageIndex(0), this._dataSource.load()) : this._afterItemsRendered()
            }, _infiniteDataLoading: function() {
                var t = this._dataSource;
                this._scrollViewIsFull() || !t || t.isLoading() || this._isLastPage() || (clearTimeout(this._loadNextPageTimer), this._loadNextPageTimer = setTimeout(n.proxy(this._loadNextPage, this)))
            }, _scrollBottomHandler: function(n) {
                this._pageLoadingAction(n);
                var t = this._dataSource;
                t && !t.isLoading() ? this._loadNextPage() : this._afterItemsRendered()
            }, _loadNextPage: function() {
                var t = this._dataSource;
                return this._expectNextPageLoading(), t.pageIndex(1 + t.pageIndex()), t.load().done(n.proxy(this._forgetNextPageLoading, this))
            }, _renderItems: function(t) {
                this.option("grouped") ? (n.each(t, n.proxy(this._renderGroup, this)), this._attachGroupCollapseEvent(), this._renderEmptyMessage()) : this.callBase.apply(this, arguments), this._afterItemsRendered(!0)
            }, _attachGroupCollapseEvent: function() {
                var i = e.addNamespace("dxclick", this.NAME), r = "." + o, t = this.element(), u = this.option("collapsibleGroups");
                if (t.toggleClass(l, u), t.off(i, r), u)
                    t.on(i, r, n.proxy(function(t) {
                        this._createAction(n.proxy(function(t) {
                            this._collapseGroupHandler(n(t.jQueryEvent.currentTarget).parent())
                        }, this), {validatingTargetName: "element"})({jQueryEvent: t})
                    }, this))
            }, _collapseGroupHandler: function(t, i) {
                var u = n.Deferred(), f = t.children("." + s), r;
                return t.toggleClass(a, i), r = "slideToggle", i === !0 && (r = "slideUp"), i === !1 && (r = "slideDown"), f[r]({duration: 200, complete: function() {
                        u.resolve()
                    }}), u.promise()
            }, _dataSourceLoadErrorHandler: function() {
                this.callBase.apply(this, arguments), this._initialized && this._afterItemsRendered()
            }, _render: function() {
                this.element().addClass(h), this.callBase()
            }, _postprocessRenderItem: function(t) {
                this.callBase.apply(this, arguments), this.option("onItemSwipe") && this._attachSwipeEvent(n(t.itemElement))
            }, _attachSwipeEvent: function(t) {
                var i = e.addNamespace("dxswipeend", this.NAME);
                t.on(i, n.proxy(this._itemSwipeEndHandler, this))
            }, _itemSwipeEndHandler: function(n) {
                this._itemJQueryEventHandler(n, "onItemSwipe", {direction: n.offset < 0 ? "left" : "right"})
            }, _nextButtonHandler: function() {
                var n = this._dataSource;
                n && !n.isLoading() && (this._scrollView.toggleLoading(!0), this._$nextButton.detach(), this._suppressLoadingIndication(), this._loadNextPage())
            }, _renderGroup: function(t, i) {
                var u = n("<div>").addClass(r).appendTo(this._itemContainer()), e = this.option("groupTemplate"), h = this._getTemplate(i.template || e, i, t, u), c = {index: t, item: i, container: u}, l = this._createItemByTemplate(h, c), f;
                l.addClass(o), this._renderingGroupIndex = t, f = n("<div>").addClass(s).appendTo(u), n.each(i.items || [], n.proxy(function(n, t) {
                    this._renderItem(n, t, f)
                }, this))
            }, _clean: function() {
                this._$nextButton && (this._$nextButton.remove(), this._$nextButton = null), this.callBase.apply(this, arguments)
            }, _dispose: function() {
                clearTimeout(this._holdTimer), clearTimeout(this._loadNextPageTimer), clearTimeout(this._showLoadingIndicatorTimer), this.callBase()
            }, _toggleDisabledState: function(n) {
                this.callBase(n), this._scrollView.option("disabled", n || !this.option("scrollingEnabled"))
            }, _toggleNextButton: function(n) {
                var t = this._dataSource, i = this._getNextButton();
                this.element().toggleClass(v, n), n && t && t.isLoaded() && i.appendTo(this._itemContainer()), n || i.detach()
            }, _getNextButton: function() {
                return this._$nextButton || (this._$nextButton = this._createNextButton()), this._$nextButton
            }, _createNextButton: function() {
                var t = n("<div>").addClass(y);
                return t.append(n("<div>").dxButton({text: this.option("nextButtonText"), onClick: n.proxy(this._nextButtonHandler, this)})), t
            }, _resetFocusedItem: function(n) {
                this.callBase.apply(this, arguments), this.scrollToItem(n)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"showNextButton":
                        this._toggleNextButton(n.value);
                        break;
                    case"dataSource":
                        this.callBase(n), this._initScrollView();
                        break;
                    case"pullingDownText":
                    case"pulledDownText":
                    case"refreshingText":
                    case"pageLoadingText":
                    case"useNativeScrolling":
                    case"showScrollbar":
                    case"scrollingEnabled":
                    case"pullRefreshEnabled":
                    case"autoPagingEnabled":
                        this._initScrollView();
                        break;
                    case"nextButtonText":
                    case"onItemSwipe":
                        this._invalidate();
                        break;
                    case"onScroll":
                    case"onPullRefresh":
                    case"onPageLoading":
                        this._createScrollViewActions(), this._invalidate();
                        break;
                    case"grouped":
                    case"collapsibleGroups":
                    case"groupTemplate":
                        this._invalidate();
                        break;
                    case"items":
                        this._invalidate();
                        break;
                    case"width":
                    case"height":
                        this.callBase(n), this._scrollView.update();
                        break;
                    case"indicateLoading":
                        this._hideLoadingIfLoadIndicationOff();
                        break;
                    case"visible":
                        this.callBase(n), this._scrollView.update();
                        break;
                    case"rtlEnabled":
                        this._initScrollView(), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _extendActionArgs: function(t) {
                if (!this.option("grouped"))
                    return this.callBase(t);
                var i = t.closest("." + r), u = i.find("." + f);
                return n.extend(this.callBase(t), {itemIndex: {group: i.index(), item: u.index(t)}})
            }, expandGroup: function(t) {
                var i = n.Deferred(), u = this._itemContainer().find("." + r).eq(t);
                return this._collapseGroupHandler(u, !1).done(n.proxy(function() {
                    i.resolveWith(this)
                }, this)), i.promise()
            }, collapseGroup: function(t) {
                var i = n.Deferred(), u = this._itemContainer().find("." + r).eq(t);
                return this._collapseGroupHandler(u, !0).done(n.proxy(function() {
                    i.resolveWith(this)
                }, this)), i
            }, update: function() {
                return t.log("W0002", this.NAME, "update", "14.1", "Use the 'updateDimensions' method instead."), this.updateDimensions.apply(this, arguments)
            }, updateDimensions: function() {
                var t = this, i = n.Deferred();
                return t._scrollView ? t._scrollView.update().done(function() {
                    i.resolveWith(t)
                }) : i.resolveWith(t), i.promise()
            }, refresh: function() {
                return t.log("W0002", this.NAME, "refresh", "14.1", "Use the 'reload' method instead."), this.reload.apply(this, arguments)
            }, reload: function() {
                this.scrollTo(0), this._pullDownHandler()
            }, scrollTop: function() {
                return this._scrollView.scrollOffset().top
            }, clientHeight: function() {
                return this._scrollView.clientHeight()
            }, scrollHeight: function() {
                return this._scrollView.scrollHeight()
            }, scrollBy: function(n) {
                this._scrollView.scrollBy(n)
            }, scrollTo: function(n) {
                this._scrollView.scrollTo(n)
            }, scrollToItem: function(n) {
                var t = this._editStrategy.getItemElement(n);
                this._scrollView.scrollToElement(t)
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = t.utils, s = u.removeDublicates, f = "dx-list-editing", e = "dx-list-item-selected", o = "dx-list-item-response-wait";
        t.registerComponent("dxList", r, r.dxList.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {itemDeleteAction: {since: "14.2", alias: "onItemDeleted"}, itemReorderAction: {since: "14.2", alias: "onItemReordered"}, itemUnselectAction: {since: "14.2", message: "Use the 'onSelectionChanged' option instead"}, "editConfig.itemRender": {since: "14.2", alias: "editConfig.itemTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({editEnabled: !1, editConfig: {itemTemplate: null, menuType: "context", menuItems: [], deleteEnabled: !1, deleteMode: "toggle", deleteType: "toggle", selectionEnabled: !1, selectionMode: "item", selectionType: "item", reorderEnabled: !1}, selectionMode: "multi", selectAllText: Globalize.localize("dxList-selectAll"), selectionByClick: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: [{platform: "ios"}], options: {editConfig: {deleteType: "slideButton", deleteMode: "slideButton"}}}, {device: function(n) {
                            return n.platform === "ios" && n.version[0] > 6
                        }, options: {editConfig: {menuType: "slide", deleteType: "slideItem", deleteMode: "slideItem"}}}, {device: {platform: "android"}, options: {editConfig: {deleteType: "swipe", deleteMode: "swipe"}}}, {device: {platform: "win8"}, options: {editConfig: {deleteType: "context", deleteMode: "context"}}}, {device: {platform: "generic"}, options: {editConfig: {deleteType: "static", deleteMode: "static"}}}])
            }, _init: function() {
                this.callBase(), this._initEditProvider()
            }, _initEditProvider: function() {
                var n = this.initialOption("editConfig");
                this._editProvider = new r.dxList.EditProvider(this, this.option("editConfig"), n)
            }, _disposeEditProvider: function() {
                this._editProvider && this._editProvider.dispose()
            }, _refreshEditProvider: function() {
                this._disposeEditProvider(), this._initEditProvider()
            }, _initEditStrategy: function() {
                this.option("grouped") ? this._editStrategy = new r.dxList.GroupedEditStrategy(this) : this.callBase()
            }, _render: function() {
                this._renderEditing(), this._refreshEditProvider(), this.callBase()
            }, _renderItems: function() {
                this.callBase.apply(this, arguments), this.option("editEnabled") && this._editProvider.afterItemsRendered()
            }, _renderEditing: function() {
                this.element().toggleClass(f, this.option("editEnabled"))
            }, _selectedItemClass: function() {
                return e
            }, _itemResponseWaitClass: function() {
                return o
            }, _itemClickHandler: function(t) {
                var i = n(t.currentTarget), r;
                i.is(".dx-state-disabled, .dx-state-disabled *") || (r = this.option("editEnabled") && this._editProvider.handleClick(i, t), r) || this.callBase.apply(this, arguments)
            }, _shouldAttachContextMenuEvent: function() {
                return this.callBase.apply(this, arguments) || this._editProvider.contextMenuHandlerExists()
            }, _itemHoldHandler: function(t) {
                var i = n(t.currentTarget), u, f;
                if (!i.is(".dx-state-disabled, .dx-state-disabled *")) {
                    if (u = r.events.isTouchEvent(t), f = this.option("editEnabled") && u && this._editProvider.handleContextMenu(i, t), f) {
                        t.handledByEditProvider = !0;
                        return
                    }
                    this.callBase.apply(this, arguments)
                }
            }, _itemContextMenuHandler: function(t) {
                var i = n(t.currentTarget), r;
                i.is(".dx-state-disabled, .dx-state-disabled *") || (r = this.option("editEnabled") && !t.handledByEditProvider && this._editProvider.handleContextMenu(i, t), r) || this.callBase.apply(this, arguments)
            }, _getItemTemplateName: function(n) {
                return this.option("editEnabled") && this._editProvider.isRenderingByTemplate(n) ? this._editProvider.getItemTemplateName(n) : this.callBase.apply(this, arguments)
            }, _postprocessRenderItem: function(n) {
                this.callBase.apply(this, arguments), this.option("editEnabled") && this._editProvider.isModifyingByDecorators(n.itemData) && this._editProvider.modifyItemElement(n)
            }, _clean: function() {
                this._disposeEditProvider(), this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"items":
                        this._clearSelectedItems(), this.callBase(n);
                        break;
                    case"grouped":
                        this._clearSelectedItems(), delete this._renderingGroupIndex, this._initEditStrategy(n.value), this.callBase(n);
                        break;
                    case"editEnabled":
                        this._clearSelectedItems(), this._invalidate();
                        break;
                    case"editConfig":
                    case"selectionMode":
                    case"selectAllText":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, getFlatIndexByItemElement: function(n) {
                return this._itemElements().index(n)
            }, getItemElementByFlatIndex: function(t) {
                var i = this._itemElements();
                return t < 0 || t >= i.length ? n() : i.eq(t)
            }, getItemByIndex: function(n) {
                return this._getItemData(this._itemElements().eq(n))
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var f = t.ui, h = "dx-list-item", e = "dx-list-group", o = 20, c = 2303, u = function(n) {
            return(n.group << o) + n.item
        }, r = function(n) {
            return{group: n >> o, item: n & c}
        }, s = function(t, i) {
            var u = t.items, r = {key: t.key, items: []};
            return n.each(i, function(n, t) {
                r.items.push(u[t])
            }), r
        }, l = function(n, t) {
            for (var r = n.length, i = 0; i < r; i++)
                if (n[i].key === t)
                    return n[i]
        };
        f.dxList.GroupedEditStrategy = f.CollectionWidget.EditStrategy.inherit({_groupElements: function() {
                return this._collectionWidget._itemContainer().find("." + e)
            }, _groupItemElements: function(n) {
                return n.find("." + h)
            }, deleteItemAtIndex: function(n) {
                var t = r(n), i = this._collectionWidget.option("items")[t.group].items;
                i.splice(t.item, 1)
            }, updateSelectionAfterDelete: function(t) {
                var i = r(t), u = this._collectionWidget._selectedItemIndices;
                n.each(u, function(n, t) {
                    var f = r(t);
                    f.group === i.group && f.item > i.item && (u[n] -= 1)
                })
            }, fetchSelectedItems: function(t) {
                var e, f, u, i;
                return t = t || this._collectionWidget._selectedItemIndices, e = this._collectionWidget.option("items"), f = [], t.sort(function(n, t) {
                    return n - t
                }), u = 0, i = [], n.each(t, function(n, t) {
                    var o = r(t);
                    o.group !== u && i.length && (f.push(s(e[u], i)), i.length = 0), u = o.group, i.push(o.item)
                }), i.length && f.push(s(e[u], i)), f
            }, selectedItemIndices: function() {
                var t = [], i = this._collectionWidget.option("items"), r = this._collectionWidget.option("selectedItems");
                return n.each(r, function(r, f) {
                    var e = l(i, f.key), o = n.inArray(e, i);
                    n.each(f.items, function(i, r) {
                        var f = n.inArray(r, e.items);
                        f !== -1 && t.push(u({group: o, item: f}))
                    })
                }), t
            }, moveItemAtIndexToIndex: function(n, t) {
                var u = this._collectionWidget.option("items"), i = r(n), f = r(t), e = u[i.group].items, o = u[f.group].items, s = e[i.item];
                e.splice(i.item, 1), o.splice(f.item, 0, s)
            }, getSelectedItemsAfterReorderItem: function(t, i) {
                if (this._itemsFromSameParent(t, i) || n.inArray(t, this._collectionWidget._selectedItemIndices))
                    return this.callBase();
                var s = this._collectionWidget.option("items"), u = this._collectionWidget.option("selectedItems"), f = r(t), h = r(i), e = u[f.group].items, c = u[h.group].items, o = s[f.group].items[f.item], l = n.inArray(o, e);
                return e.splice(l, 1), c.push(o), u
            }, _isItemIndex: function(t) {
                return n.isNumeric(t.group) && n.isNumeric(t.item)
            }, _getNormalizedItemIndex: function(t) {
                var i = n(t), r = i.closest("." + e);
                return u({group: this._groupElements().index(r), item: this._groupItemElements(r).index(i)})
            }, _normalizeItemIndex: function(n) {
                return u(n)
            }, _denormalizeItemIndex: function(n) {
                return r(n)
            }, _getItemByNormalizedIndex: function(n) {
                var t = r(n), i = this._groupElements().eq(t.group);
                return this._groupItemElements(i).eq(t.item)
            }, _itemsFromSameParent: function(n, t) {
                return r(n).group === r(t).group
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = r.events;
        r.dxList.EditDecoratorsRegistry = {}, r.dxList.registerEditDecorator = function(t, i, u) {
            var f = r.dxList.EditDecoratorsRegistry, e = {};
            e[t] = f[t] ? f[t] : {}, e[t][i] = u, f = n.extend(f, e)
        };
        var f = "dxListEditDecorator", e = u.addNamespace("dxswipestart", f), o = u.addNamespace("dxswipe", f), s = u.addNamespace("dxswipeend", f);
        r.dxList.EditDecorator = t.Class.inherit({ctor: function(n) {
                this._list = n, this._init()
            }, _init: n.noop, _shouldHandleSwipe: !1, _attachSwipeEvent: function(t) {
                var i = {itemSizeFunc: n.proxy(function() {
                        return this._clearSwipeCache && (this._itemWidthCache = this._list.element().width(), this._clearSwipeCache = !1), this._itemWidthCache
                    }, this)};
                t.$itemElement.on(e, i, n.proxy(this._itemSwipeStartHandler, this)).on(o, n.proxy(this._itemSwipeUpdateHandler, this)).on(s, n.proxy(this._itemSwipeEndHandler, this))
            }, _itemSwipeStartHandler: function(t) {
                var i = n(t.currentTarget);
                if (i.is(".dx-state-disabled, .dx-state-disabled *")) {
                    t.cancel = !0;
                    return
                }
                this._swipeStartHandler(i, t)
            }, _itemSwipeUpdateHandler: function(t) {
                var i = n(t.currentTarget);
                this._swipeUpdateHandler(i, t)
            }, _itemSwipeEndHandler: function(t) {
                var i = n(t.currentTarget);
                this._swipeEndHandler(i, t), this._clearSwipeCache = !0
            }, beforeBag: n.noop, afterBag: n.noop, _commonOptions: function() {
                return{activeStateEnabled: this._list.option("activeStateEnabled"), hoverStateEnabled: this._list.option("hoverStateEnabled"), focusStateEnabled: this._list.option("focusStateEnabled")}
            }, modifyElement: function(n) {
                this._shouldHandleSwipe && (this._attachSwipeEvent(n), this._clearSwipeCache = !0)
            }, afterRender: n.noop, handleClick: n.noop, handleContextMenu: n.noop, _swipeStartHandler: n.noop, _swipeUpdateHandler: n.noop, _swipeEndHandler: n.noop, dispose: n.noop})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui;
        r.dxList.EditDecoratorMenuHelperMixin = {_menuEnabled: function() {
                return!!this._menuItems().length
            }, _menuItems: function() {
                return this._list.option("editConfig.menuItems")
            }, _deleteEnabled: function() {
                return this._list.option("editConfig.deleteEnabled")
            }, _fireMenuAction: function(n, t) {
                this._list._itemEventHandlerByHandler(n, t, {}, {excludeValidators: ["disabled"]})
            }}
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, f = "dx-list-static-delete-button-container", u = "dx-list-static-delete-button";
        r.dxList.registerEditDecorator("delete", "static", r.dxList.EditDecorator.inherit({afterBag: function(t) {
                var r = t.$itemElement, e = t.$container, i = n("<div>").addClass(u);
                i.dxButton({text: Globalize.localize("dxListEditDecorator-delete"), type: "danger", onClick: n.proxy(function() {
                        this._deleteItem(r)
                    }, this)}), e.addClass(f).append(i)
            }, modifyElement: function(n) {
                var i = n.$itemElement, t = i.find("." + u);
                this._buttonWidth || (t.css("position", "absolute"), this._buttonWidth = t.outerWidth(), t.css("position", "static")), t.parent().outerWidth(this._buttonWidth)
            }, _deleteItem: function(n) {
                n.is(".dx-state-disabled, .dx-state-disabled *") || this._list.deleteItem(n)
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, o = r.events, s = "dxListEditDecorator", f = o.addNamespace("dxpointerdown", s), h = "dx-list-item-content", e = "dx-list-menu-positioning", u = "dx-list-switchable-delete-ready", c = "dx-list-switchable-delete-top-shield", l = "dx-list-switchable-delete-bottom-shield", a = "dx-list-switchable-delete-item-content-shield";
        r.dxList.SwitchableEditDecorator = r.dxList.EditDecorator.inherit({_init: function() {
                this._$topShield = n("<div />").addClass(c), this._$bottomShield = n("<div />").addClass(l), this._$itemContentShield = n("<div />").addClass(a);
                this._$topShield.on(f, n.proxy(this._cancelDeleteReadyItem, this));
                this._$bottomShield.on(f, n.proxy(this._cancelDeleteReadyItem, this));
                this._list.element().append(this._$topShield.toggle(!1)).append(this._$bottomShield.toggle(!1))
            }, handleClick: function() {
                return this._cancelDeleteReadyItem()
            }, _cancelDeleteReadyItem: function() {
                return this._$readyToDeleteItem ? (this._cancelDelete(this._$readyToDeleteItem), !0) : !1
            }, _cancelDelete: function(n) {
                this._toggleDeleteReady(n, !1)
            }, _toggleDeleteReady: function(n, t) {
                t === i && (t = !this._isReadyToDelete(n)), this._toggleShields(n, t), this._toggleScrolling(t), this._cacheReadyToDeleteItem(n, t), this._animateToggleDelete(n, t)
            }, _isReadyToDelete: function(n) {
                return n.hasClass(u)
            }, _toggleShields: function(n, t) {
                this._$topShield.toggle(t), this._$bottomShield.toggle(t), t && this._updateShieldsHeight(n), this._toggleContentShield(n, t)
            }, _updateShieldsHeight: function(n) {
                var t = this._list.element(), r = t.offset().top, u = t.outerHeight(), f = n.offset().top, e = n.outerHeight(), i = f - r, o = u - e - i;
                this._$topShield.height(Math.max(i, 0)), this._$bottomShield.height(Math.max(o, 0))
            }, _toggleContentShield: function(n, t) {
                t ? n.find("." + h).append(this._$itemContentShield) : this._$itemContentShield.detach()
            }, _toggleScrolling: function(n) {
                var t = this._list.element().dxScrollView("instance");
                n ? (this._scrollViewDisabled = t.option("disabled"), t.option("disabled", !0)) : t.option("disabled", this._scrollViewDisabled)
            }, _cacheReadyToDeleteItem: function(n, t) {
                t ? this._$readyToDeleteItem = n : delete this._$readyToDeleteItem
            }, _animateToggleDelete: function(t, i) {
                i ? (this._enablePositioning(t), this._prepareDeleteReady(t), this._animatePrepareDeleteReady(t)) : (this._forgetDeleteReady(t), this._animateForgetDeleteReady(t).done(n.proxy(this._disablePositioning, this, t)))
            }, _enablePositioning: function(n) {
                n.addClass(e)
            }, _disablePositioning: function(n) {
                n.removeClass(e)
            }, _prepareDeleteReady: function(n) {
                n.addClass(u)
            }, _forgetDeleteReady: function(n) {
                n.removeClass(u)
            }, _animatePrepareDeleteReady: t.abstract, _animateForgetDeleteReady: t.abstract, _deleteItem: function(t) {
                (t = t || this._$readyToDeleteItem, t.is(".dx-state-disabled, .dx-state-disabled *")) || this._list.deleteItem(t).always(n.proxy(this._cancelDelete, this, t))
            }, _isRtlEnabled: function() {
                return this._list.option("rtlEnabled")
            }, dispose: function() {
                this._$topShield && this._$topShield.remove(), this._$bottomShield && this._$bottomShield.remove(), this.callBase.apply(this, arguments)
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = t.fx, s = "dx-list-switchable-delete-button-container", h = "dx-list-switchable-delete-button-wrapper", c = "dx-list-switchable-delete-button-inner-wrapper", l = "dx-list-switchable-delete-button", a = "dx-list-switchable-delete-menu", f = 200, e, o;
        r.dxList.SwitchableButtonEditDecorator = r.dxList.SwitchableEditDecorator.inherit({_init: function() {
                this.callBase.apply(this, arguments);
                var t = n("<div >").addClass(s), i = n("<div />").addClass(h), r = n("<div />").addClass(c), u = n("<div />").addClass(l);
                u.dxButton({text: Globalize.localize("dxListEditDecorator-delete"), type: "danger", onClick: n.proxy(function(n) {
                        this._deleteItem(), n.jQueryEvent.stopPropagation()
                    }, this)}), t.append(i), i.append(r), r.append(u), this._$buttonContainer = t
            }, _enablePositioning: function(n) {
                this.callBase.apply(this, arguments), u.stop(this._$buttonContainer, !0), this._$buttonContainer.appendTo(n)
            }, _disablePositioning: function() {
                this.callBase.apply(this, arguments), this._$buttonContainer.detach()
            }, _animatePrepareDeleteReady: function() {
                var n = this._isRtlEnabled(), t = this._list.element().width(), i = this._buttonWidth(), r = n ? t : -i, e = n ? t - i : 0;
                return u.animate(this._$buttonContainer, {type: "custom", duration: f, from: {right: r}, to: {right: e}})
            }, _animateForgetDeleteReady: function() {
                var n = this._isRtlEnabled(), t = this._list.element().width(), i = this._buttonWidth(), r = n ? t - i : 0, e = n ? t : -i;
                return u.animate(this._$buttonContainer, {type: "custom", duration: f, from: {right: r}, to: {right: e}})
            }, _buttonWidth: function() {
                return this._buttonContainerWidth || (this._buttonContainerWidth = this._$buttonContainer.outerWidth()), this._buttonContainerWidth
            }, dispose: function() {
                this._$buttonContainer && this._$buttonContainer.remove(), this.callBase.apply(this, arguments)
            }}), e = "dx-list-toggle-delete-switch-container", o = "dx-list-toggle-delete-switch", r.dxList.registerEditDecorator("delete", "toggle", r.dxList.SwitchableButtonEditDecorator.inherit({beforeBag: function(t) {
                var r = t.$itemElement, i = t.$container, u = n("<div />").dxButton({icon: "toggle-delete", onClick: n.proxy(function(n) {
                        this._toggleDeleteReady(r), n.jQueryEvent.stopPropagation()
                    }, this)}).addClass(o);
                i.addClass(e), i.append(u)
            }})), r.dxList.registerEditDecorator("delete", "slideButton", r.dxList.SwitchableButtonEditDecorator.inherit({_shouldHandleSwipe: !0, _swipeEndHandler: function(n, t) {
                return t.targetOffset !== 0 && this._toggleDeleteReady(n), !0
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, h = r.events, c = t.translator, u = t.fx, l = "dxListEditDecorator", e = h.addNamespace("dxclick", l), a = "dx-list-slide-menu", v = "dx-list-slide-menu-wrapper", f = "dx-list-slide-menu-content", y = "dx-list-slide-menu-buttons-container", o = "dx-list-slide-menu-buttons", s = "dx-list-slide-menu-button", p = "dx-list-slide-menu-button-menu", w = "dx-list-slide-menu-button-delete";
        r.dxList.registerEditDecorator("menu", "slide", r.dxList.SwitchableEditDecorator.inherit({_shouldHandleSwipe: !0, _init: function() {
                this.callBase.apply(this, arguments), this._$buttonsContainer = n("<div/>").addClass(y), this._$buttons = n("<div/>").addClass(o).appendTo(this._$buttonsContainer), this._renderMenu(), this._renderDeleteButton()
            }, _renderMenu: function() {
                var t, r, i, u;
                this._menuEnabled() && (t = this._menuItems(), t.length === 1 ? (r = t[0], this._renderMenuButton(r.text, n.proxy(function() {
                    this._fireAction(r)
                }, this))) : (i = n("<div />").addClass(a), i.dxActionSheet({showTitle: !1, items: t, onItemClick: n.proxy(function(n) {
                        this._fireAction(n.itemData)
                    }, this)}), i.appendTo(this._list.element()), this._menu = i.dxActionSheet("instance"), u = this._renderMenuButton(Globalize.localize("dxListEditDecorator-more"), n.proxy(this._menu.show, this._menu)), this._menu.option("target", u)))
            }, _renderMenuButton: function(t, i) {
                var r = n("<div/>").addClass(s).addClass(p).text(t);
                this._$buttons.append(r);
                r.on(e, i);
                return r
            }, _renderDeleteButton: function() {
                if (this._deleteEnabled()) {
                    var t = n("<div/>").addClass(s).addClass(w).text(Globalize.localize("dxListEditDecorator-delete"));
                    t.on(e, n.proxy(function() {
                        this._deleteItem()
                    }, this));
                    this._$buttons.append(t)
                }
            }, _fireAction: function(t) {
                this._fireMenuAction(n(this._cachedNode), t.action), this._cancelDeleteReadyItem()
            }, modifyElement: function(t) {
                var i, r;
                this.callBase.apply(this, arguments), i = t.$itemElement, i.addClass(v), r = n("<div/>").addClass(f), i.wrapInner(r)
            }, handleClick: function(t, i) {
                return n(i.target).closest("." + f).length ? this.callBase.apply(this, arguments) : !0
            }, _swipeStartHandler: function(n) {
                this._enablePositioning(n), this._cacheItemData(n)
            }, _swipeUpdateHandler: function(n, t) {
                var r = this._isRtlEnabled(), u = r ? -1 : 1, f = this._cachedItemWidth * t.offset, e = this._isReadyToDelete(n) ? -this._cachedButtonWidth * u : 0, i = (f + e) * u, o = i < 0 ? f + e : 0, s = i < 0 ? i : 0;
                return c.move(this._$cachedContent, {left: o}), this._$buttonsContainer.css(r ? "right" : "left", Math.max(this._cachedItemWidth + s, this._minButtonContainerLeftOffset())), !0
            }, _cacheItemData: function(n) {
                n[0] !== this._cachedNode && (this._$cachedContent = n.find("." + f), this._cachedItemWidth = n.outerWidth(), this._cachedButtonWidth = this._cachedButtonWidth || n.find("." + o).outerWidth(), this._$cachedContent.length && (this._cachedNode = n[0]))
            }, _minButtonContainerLeftOffset: function() {
                return this._cachedItemWidth - this._cachedButtonWidth
            }, _swipeEndHandler: function(n, t) {
                this._cacheItemData(n);
                var i = this._isRtlEnabled() ? 1 : -1, r = this._cachedItemWidth * t.offset, u = !this._isReadyToDelete(n) && r * i > this._cachedButtonWidth * .2, f = t.targetOffset === i || u;
                return this._toggleDeleteReady(n, f), !0
            }, _enablePositioning: function(n) {
                this.callBase.apply(this, arguments), this._$buttonsContainer.appendTo(n)
            }, _disablePositioning: function() {
                this.callBase.apply(this, arguments), this._$buttonsContainer.detach()
            }, _animatePrepareDeleteReady: function() {
                var t = this._isRtlEnabled(), f = t ? 1 : -1, r;
                this._$buttonsContainer.css(t ? "left" : "right", "0");
                var e = u.animate(this._$cachedContent, {to: {left: this._cachedButtonWidth * f}, type: "slide", duration: 200}), o = t ? "right" : "left", i = {};
                return i[o] = this._minButtonContainerLeftOffset(), r = u.animate(this._$buttonsContainer, {to: i, duration: 200}), n.when(e, r).promise()
            }, _animateForgetDeleteReady: function(t) {
                var i, e;
                this._cacheItemData(t), i = this._isRtlEnabled(), this._$buttonsContainer.css(i ? "left" : "right", "0");
                var o = u.animate(this._$cachedContent, {to: {left: 0}, type: "slide", duration: 200}), r = i ? "right" : "left", f = {};
                return f[r] = this._cachedItemWidth, e = u.animate(this._$buttonsContainer, {to: f, duration: 200, complete: n.proxy(function() {
                        this._$buttonsContainer.css(r, "100%")
                    }, this)}), n.when(o, e).promise()
            }, dispose: function() {
                this._menu && this._menu.element().remove(), this._$buttonsContainer && this._$buttonsContainer.remove(), this.callBase.apply(this, arguments)
            }}).include(r.dxList.EditDecoratorMenuHelperMixin))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = t.translator, f = t.fx;
        r.dxList.registerEditDecorator("delete", "swipe", r.dxList.EditDecorator.inherit({_shouldHandleSwipe: !0, _renderItemPosition: function(t, i, r) {
                var e = n.Deferred(), o = i * this._itemElementWidth;
                return r ? f.animate(t, {to: {left: o}, type: "slide", complete: function() {
                        e.resolve(t, i)
                    }}) : (u.move(t, {left: o}), e.resolve()), e.promise()
            }, _swipeStartHandler: function(n) {
                return this._itemElementWidth = n.width(), !0
            }, _swipeUpdateHandler: function(n, t) {
                return this._renderItemPosition(n, t.offset), !0
            }, _swipeEndHandler: function(t, i) {
                var r = i.targetOffset;
                return this._renderItemPosition(t, r, !0).done(n.proxy(function(t, i) {
                    Math.abs(i) && this._list.deleteItem(t).fail(n.proxy(function() {
                        this._renderItemPosition(t, 0, !0)
                    }, this))
                }, this)), !0
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = "dx-list-context-menu", f = "dx-list-context-menucontent";
        r.dxList.registerEditDecorator("menu", "context", r.dxList.EditDecorator.inherit({_init: function() {
                var t = n("<div/>").addClass(u);
                this._list.element().append(t), this._menu = this._renderOverlay(t)
            }, _renderOverlay: function(t) {
                return t.dxOverlay({shading: !1, deferRendering: !0, closeOnTargetScroll: !0, closeOnOutsideClick: function(t) {
                        return!n(t.target).closest("." + u).length
                    }, animation: {show: {type: "slide", duration: 300, from: {height: 0, opacity: 1}, to: {height: n.proxy(function() {
                                    return this._$menuList.outerHeight()
                                }, this), opacity: 1}}, hide: {type: "slide", duration: 0, from: {opacity: 1}, to: {opacity: 0}}}, height: n.proxy(function() {
                        return this._$menuList ? this._$menuList.outerHeight() : 0
                    }, this), width: n.proxy(function() {
                        return this._list.element().outerWidth()
                    }, this), onContentReady: n.proxy(this._renderMenuContent, this)}).dxOverlay("instance")
            }, _renderMenuContent: function(t) {
                var i = t.component.content(), r = this._menuItems().slice();
                this._deleteEnabled() && r.push({text: Globalize.localize("dxListEditDecorator-delete"), action: n.proxy(this._deleteItem, this)}), this._$menuList = n("<div>").dxList({items: r, onItemClick: n.proxy(this._menuItemClickHandler, this), height: "auto"}), i.addClass(f), i.append(this._$menuList)
            }, _menuItemClickHandler: function(n) {
                this._menu.hide(), this._fireMenuAction(this._$itemWithMenu, n.itemData.action)
            }, _deleteItem: function() {
                this._list.deleteItem(this._$itemWithMenu)
            }, handleContextMenu: function(n) {
                return this._$itemWithMenu = n, this._menu.option({position: {my: "top", at: "bottom", of: n, collision: "flip"}}), this._menu.show(), !0
            }, dispose: function() {
                this._menu && this._menu.element().remove(), this.callBase.apply(this, arguments)
            }}).include(r.dxList.EditDecoratorMenuHelperMixin))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, e = r.events, u = "dx-list-select-decorator-enabled", o = "dx-list-select-all", s = "dx-list-select-all-checkbox", h = "dx-list-select-all-label", c = "dx-list-select-checkbox-container", l = "dx-list-select-checkbox", a = "dx-list-select-radio-button-container", v = "dx-list-select-radio-button", f = e.addNamespace("dxclick", "dxListEditDecorator");
        r.dxList.registerEditDecorator("selection", "control", r.dxList.EditDecorator.inherit({_init: function() {
                this.callBase.apply(this, arguments);
                var n = this._list.option("selectionMode");
                this._singleStrategy = n === "single", this._containerClass = this._singleStrategy ? a : c, this._controlClass = this._singleStrategy ? v : l, this._controlWidget = this._singleStrategy ? "dxRadioButton" : "dxCheckBox", this._list.element().addClass(u)
            }, beforeBag: function(t) {
                var i = t.$itemElement, r = t.$container, u = n("<div />").addClass(this._controlClass);
                u[this._controlWidget](n.extend({value: this._isSelected(i), onValueChanged: n.proxy(function(n) {
                        this._processCheckedState(i, n.value), n.jQueryEvent && n.jQueryEvent.stopPropagation()
                    }, this)}, this._commonOptions())), r.addClass(this._containerClass), r.append(u)
            }, modifyElement: function(t) {
                this.callBase.apply(this, arguments);
                var i = t.$itemElement, r = i.find("." + this._controlClass)[this._controlWidget]("instance");
                i.on("stateChanged", n.proxy(function() {
                    r.option("value", this._isSelected(i)), this._updateSelectAllState()
                }, this))
            }, _updateSelectAllState: function() {
                if (this._$selectAll) {
                    var t = this._list.option("items"), n = this._list.option("selectedItems"), r = t.length === n.length ? !0 : n.length === 0 ? !1 : i;
                    this._selectAllCheckBox.option("value", r)
                }
            }, afterRender: function() {
                var t, i;
                this._list.option("selectionMode") !== "all" || this._$selectAll || (t = this._$selectAll = n("<div>").addClass(o), this._selectAllCheckBox = n("<div>").addClass(s).appendTo(t).dxCheckBox().dxCheckBox("instance"), i = n("<div>").addClass(h).text(this._list.option("selectAllText")).appendTo(t), this._list.itemsContainer().prepend(t), this._updateSelectAllState(), this._attachSelectAllHandler())
            }, _attachSelectAllHandler: function() {
                this._selectAllCheckBox.option("onValueChanged", n.proxy(this._selectAllHandler, this))
            }, _selectAllHandler: function(n) {
                var t = this._selectAllCheckBox.option("value");
                t === !0 ? this._list._selectAllItems() : t === !1 && this._list._unselectAllItems(), n.jQueryEvent && n.jQueryEvent.stopPropagation()
            }, _isSelected: function(n) {
                return this._list.isItemSelected(n)
            }, _processCheckedState: function(n, t) {
                t ? this._list.selectItem(n) : this._list.unselectItem(n)
            }, dispose: function() {
                this._disposeSelectAll(), this._list.element().removeClass(u), this.callBase.apply(this, arguments)
            }, _disposeSelectAll: function() {
                this._$selectAll && (this._$selectAll.remove(), this._$selectAll = null)
            }})), r.dxList.registerEditDecorator("selection", "item", r.dxList.EditDecoratorsRegistry.selection.control.inherit({handleClick: function(n) {
                var t = !this._isSelected(n) || this._singleStrategy;
                return this._processCheckedState(n, t), !0
            }, _attachSelectAllHandler: function() {
                this.callBase();
                this._$selectAll.off(f).on(f, n.proxy(this._selectAllClickHandler, this))
            }, _selectAllClickHandler: function() {
                this._selectAllCheckBox.option("value", !this._selectAllCheckBox.option("value"))
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, f = u.events, e = t.translator, r = t.fx, l = t.support, o = t.utils, h = o.fitIntoRange, a = t.Animator.inherit({ctor: function(n) {
                this.callBase(), this._strategy = n
            }, _isFinished: function() {
                return this._strategy.scrollFinished()
            }, _step: function() {
                this._strategy.scrollByStep()
            }}), s = "dxListEditDecorator", v = f.addNamespace("dxdragstart", s), y = f.addNamespace("dxdrag", s), p = f.addNamespace("dxdragend", s), w = "dx-list-reorder-handle-container", b = "dx-list-reorder-handle", c = "dx-list-item-reordering", k = "dx-list-item-ghost-reordering", d = "dx-list-reorder-compatibility-mode";
        u.dxList.registerEditDecorator("reorder", "default", u.dxList.EditDecorator.inherit({_init: function() {
                this._groupedEnabled = this._list.option("grouped"), this._initAnimator()
            }, _initAnimator: function() {
                this._scrollAnimator = new a(this)
            }, _startAnimator: function() {
                this._scrollAnimator.inProgress() || this._scrollAnimator.start()
            }, _stopAnimator: function() {
                this._scrollAnimator.stop()
            }, afterBag: function(t) {
                var r = t.$itemElement, u = t.$container, i = n("<div>").addClass(b);
                i.on(v, {direction: "vertical", immediate: !0}, n.proxy(this._dragStartHandler, this, r));
                i.on(y, n.proxy(this._dragHandler, this, r));
                i.on(p, n.proxy(this._dragEndHandler, this, r));
                u.addClass(w), u.append(i)
            }, _dragStartHandler: function(n, t) {
                if (n.is(".dx-state-disabled, .dx-state-disabled *")) {
                    t.cancel = !0;
                    return
                }
                this._stopPreviousAnimation(), t.targetElements = [], this._cacheItemsPositions(), this._startPointerOffset = t.pageY - n.offset().top, this._elementHeight = n.outerHeight();
                var i = this._list.getFlatIndexByItemElement(n);
                this._startIndex = i, this._lastIndex = i, this._cacheScrollData(), this._createGhost(n), n.addClass(c), this._toggleCompatibilityMode(!0)
            }, _stopPreviousAnimation: function() {
                r.stop(this._$ghostItem, !0)
            }, _toggleCompatibilityMode: function(n) {
                this._list.element().toggleClass(d, !l.transform && n)
            }, _cacheItemsPositions: function() {
                this._itemPositions = [], n.each(this._list.itemElements(), n.proxy(function(t, i) {
                    this._itemPositions.push(n(i).position().top)
                }, this))
            }, _getDraggingElementPosition: function() {
                return this._itemPositions[this._startIndex]
            }, _getLastElementPosition: function() {
                return this._itemPositions[this._lastIndex]
            }, _cacheScrollData: function() {
                this._list.updateDimensions(), this._startScrollTop = this._list.scrollTop(), this._scrollOffset = 0, this._scrollHeight = this._list.scrollHeight(), this._clientHeight = this._list.clientHeight()
            }, _scrollTop: function() {
                return this._startScrollTop + this._scrollOffset
            }, _createGhost: function(n) {
                this._$ghostItem = n.clone(), this._$ghostItem.addClass(k).appendTo(this._list.itemsContainer()), this._startGhostPosition = this._getDraggingElementPosition() - this._$ghostItem.position().top, e.move(this._$ghostItem, {top: this._startGhostPosition})
            }, _dragHandler: function(n, t) {
                this._topOffset = t.offset.y, this._updateItemPositions();
                var i = this._getPonterPosition();
                this._toggleScroll(i)
            }, _getPonterPosition: function() {
                return this._getDraggingElementPosition() + this._startPointerOffset + this._scrollOffset + this._topOffset
            }, _toggleScroll: function(n) {
                if (!(this._scrollHeight <= this._clientHeight)) {
                    var t = this._elementHeight * .7, u = this._clientHeight - (n - this._scrollTop()), i = u / t, f = n - this._scrollTop(), r = f / t;
                    i < 1 ? (this._stepSize = this._adjustRationIntoRange(i), this._startAnimator()) : r < 1 ? (this._stepSize = -this._adjustRationIntoRange(r), this._startAnimator()) : this._stopAnimator()
                }
            }, _adjustRationIntoRange: function(n) {
                return h(Math.round(Math.abs(n - 1) * 7), 1, 7)
            }, _updateItemPositions: function() {
                this._updateGhostPosition(), this._updateOthersPositions()
            }, _updateGhostPosition: function() {
                e.move(this._$ghostItem, {top: this._startGhostPosition + this._scrollOffset + this._topOffset})
            }, _updateOthersPositions: function() {
                var n = this._findItemIndexByPosition(this._getPonterPosition()), t;
                if (this._lastIndex !== n && (!this._groupedEnabled || this._sameParent(n))) {
                    var u = n - this._startIndex, f = o.sign(u), c = Math.min(n, this._lastIndex), l = Math.max(n, this._lastIndex);
                    for (t = c; t <= l; t++)
                        if (t !== this._startIndex) {
                            var i = this._list.getItemElementByFlatIndex(t), e = t - this._startIndex, a = o.sign(e), s = Math.abs(e) <= Math.abs(u), h = f === a, v = s && h, y = !s || !h;
                            r.stop(i), v && r.animate(i, {type: "slide", to: {top: this._elementHeight * -f}, duration: 300}), y && r.animate(i, {type: "slide", to: {top: 0}, duration: 300})
                        }
                    this._lastIndex = n
                }
            }, _sameParent: function(n) {
                var t = this._list.getItemElementByFlatIndex(this._startIndex), i = this._list.getItemElementByFlatIndex(n);
                return i.parent().get(0) === t.parent().get(0)
            }, scrollByStep: function() {
                this._scrollOffset += this._stepSize, this._list.scrollBy(this._stepSize), this._updateItemPositions()
            }, scrollFinished: function() {
                var n = this._scrollTop(), t = n <= 0 && this._stepSize < 0, i = n >= this._scrollHeight - this._clientHeight && this._stepSize > 0;
                return t || i
            }, _dragEndHandler: function(t) {
                this._scrollAnimator.stop(), r.animate(this._$ghostItem, {type: "slide", to: {top: this._startGhostPosition + this._getLastElementPosition() - this._getDraggingElementPosition()}, duration: 300}).done(n.proxy(function() {
                    t.removeClass(c), this._resetPositions(), this._list.reorderItem(t, this._list.getItemElementByFlatIndex(this._lastIndex)), this._deleteGhost(), this._toggleCompatibilityMode(!1)
                }, this))
            }, _deleteGhost: function() {
                this._$ghostItem.remove()
            }, _resetPositions: function() {
                for (var i = Math.min(this._startIndex, this._lastIndex), r = Math.max(this._startIndex, this._lastIndex), t, n = i; n <= r; n++)
                    t = this._list.getItemElementByFlatIndex(n), e.resetPosition(t)
            }, _findItemIndexByPosition: function(n) {
                for (var i = 0, r = this._itemPositions.length - 1, t, u; i <= r; )
                    if (t = (i + r) / 2 | 0, u = this._itemPositions[t], u < n)
                        i = t + 1;
                    else if (u > n)
                        r = t - 1;
                    else
                        return t;
                return h(i, 0, Math.max(r, 0))
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, a = u.events, v = t.utils, f = [], r = function(n, t, i) {
            f.push({enabled: n, decoratorType: t, decoratorSubType: i})
        };
        r(function(n) {
            return n.menuItems.length
        }, function() {
            return"menu"
        }, function(n) {
            return n.menuType === "hold" && (n.menuType = "context"), n.menuType
        }), r(function(n) {
            return!n.menuItems.length && n.deleteEnabled
        }, function(n, t) {
            var i = n.deleteMode !== t.deleteMode ? n.deleteMode : n.deleteType;
            return i === "toggle" || i === "slideButton" || i === "swipe" || i === "static" ? "delete" : "menu"
        }, function(n, t) {
            var i;
            return i = n.deleteMode !== t.deleteMode ? n.deleteMode : n.deleteType, i === "slideItem" && (i = "slide"), i === "hold" && (i = "context"), i
        }), r(function(n) {
            return n.selectionEnabled
        }, function() {
            return"selection"
        }, function(n, t) {
            var i;
            return i = n.selectionMode !== t.selectionMode ? n.selectionMode : n.selectionType
        }), r(function(n) {
            return n.reorderEnabled
        }, function() {
            return"reorder"
        }, function() {
            return"default"
        });
        var e = "dx-list-item-before-bag", o = "dx-list-item-after-bag", s = "beforeBag", h = "afterBag", c = "modifyElement", l = "afterRender";
        u.dxList.EditProvider = t.Class.inherit({ctor: function(n, t, i) {
                this._list = n, this._config = t, this._defaultConfig = i, this._fetchRequiredDecorators()
            }, dispose: function() {
                this._decorators && this._decorators.length && n.each(this._decorators, function(n, t) {
                    t.dispose()
                })
            }, isModifyingByDecorators: function(n) {
                return!this.isRenderingByTemplate(n)
            }, isRenderingByTemplate: function(n) {
                return!!this.getItemTemplateName(n)
            }, getItemTemplateName: function(n) {
                return n && n.editTemplate || this._config.itemTemplate || this._config.itemRender
            }, _fetchRequiredDecorators: function() {
                if (this._decorators = [], this.isModifyingByDecorators()) {
                    var t = this._config, i = this._defaultConfig;
                    n.each(f, n.proxy(function(n, r) {
                        var u = r.enabled(t, i);
                        if (u) {
                            var f = r.decoratorType(t, i), e = r.decoratorSubType(t, i), o = this._createDecorator(f, e);
                            this._decorators.push(o)
                        }
                    }, this))
                }
            }, _createDecorator: function(n, t) {
                var i = this._findDecorator(n, t);
                return new i(this._list)
            }, _findDecorator: function(n, i) {
                var r = u.dxList.EditDecoratorsRegistry[n][i];
                if (!r)
                    throw t.Error("E1012", n, i);
                return r
            }, modifyItemElement: function(t) {
                var i = n(t.itemElement), r = {$itemElement: i};
                this._prependBeforeBags(i, r), this._appendAfterBags(i, r), this._applyDecorators(c, r)
            }, afterItemsRendered: function() {
                this._applyDecorators(l)
            }, _prependBeforeBags: function(n, t) {
                var i = this._collectDecoratorsMarkup(s, t, e);
                n.prepend(i)
            }, _appendAfterBags: function(n, t) {
                var i = this._collectDecoratorsMarkup(h, t, o);
                n.append(i)
            }, _collectDecoratorsMarkup: function(t, i, r) {
                var u = n("<div />");
                return n.each(this._decorators, function() {
                    var f = n("<div />").addClass(r);
                    this[t](n.extend({$container: f}, i)), f.children().length && u.append(f)
                }), u.children()
            }, _applyDecorators: function(t, i) {
                n.each(this._decorators, function() {
                    this[t](i)
                })
            }, _handlerExists: function(t) {
                var r, u, i;
                if (!this._decorators)
                    return!1;
                for (r = this._decorators, u = r.length, i = 0; i < u; i++)
                    if (r[i][t] !== n.noop)
                        return!0;
                return!1
            }, _eventHandler: function(n, t, i) {
                var r;
                if (!this._decorators)
                    return!1;
                var u = !1, f = this._decorators, e = f.length;
                for (r = 0; r < e; r++)
                    if (u = f[r][n](t, i), u)
                        break;
                return u
            }, handleClick: function(n, t) {
                return this._eventHandler("handleClick", n, t)
            }, contextMenuHandlerExists: function() {
                return this._handlerExists("handleContextMenu")
            }, handleContextMenu: function(n, t) {
                return this._eventHandler("handleContextMenu", n, t)
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, h = t.utils, f = "dx-tileview", e = "dx-tileview-wrapper", u = "dx-tile", o = "." + u, s = "dxTileData";
        t.registerComponent("dxTileView", r, r.CollectionWidget.inherit({_activeStateUnit: o, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {listHeight: {since: "14.1", alias: "height"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({items: null, showScrollbar: !1, height: 500, baseItemWidth: 100, baseItemHeight: 100, itemMargin: 20, indicateLoading: !0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {hoverStateEnabled: !0, focusStateEnabled: !0}}])
            }, _itemClass: function() {
                return u
            }, _itemDataKey: function() {
                return s
            }, _itemContainer: function() {
                return this._$container
            }, _init: function() {
                this.callBase(), this._initScrollView()
            }, _dataSourceLoadingChangedHandler: function(n) {
                var t = this._scrollView;
                t && (n && this.option("indicateLoading") ? t.startLoading() : t.finishLoading())
            }, _hideLoadingIfLoadIndicationOff: function() {
                this.option("indicateLoading") || this._dataSourceLoadingChangedHandler(!1)
            }, _initScrollView: function() {
                this._scrollView = this.element().dxScrollView({direction: "horizontal", scrollByContent: !0}).dxScrollView("instance"), this._$container = this._scrollView.content(), this._$container.addClass(e), this._scrollView.option("onUpdated", n.proxy(this._renderGeometry, this))
            }, _render: function() {
                this.callBase(), this.element().addClass(f), this.cellsPerColumn = 1, this._updateScrollView(), this._fireContentReadyAction()
            }, _renderContent: function() {
                this._renderContentImpl()
            }, _updateScrollView: function() {
                this._scrollView.option({rtlEnabled: this.option("rtlEnabled"), showScrollbar: this.option("showScrollbar"), disabled: this.option("disabled")}), this._scrollView.update(), this._indicateLoadingIfAlreadyStarted()
            }, _indicateLoadingIfAlreadyStarted: function() {
                this._dataSource && this._dataSource.isLoading() && this._dataSourceLoadingChangedHandler(!0)
            }, _renderGeometry: function() {
                var t = this.option("items") || [], i = Math.max.apply(Math, n.map(t || [], function(n) {
                    return Math.round(n.heightRatio || 1)
                }));
                this.cellsPerColumn = Math.floor(this.element().height() / (this.option("baseItemHeight") + this.option("itemMargin"))), this.cellsPerColumn = Math.max(this.cellsPerColumn, i), this.cells = [], this.cells.push(new Array(this.cellsPerColumn)), this._arrangeItems(t), this._$container.width(this.cells.length * this.option("baseItemWidth") + (this.cells.length + 1) * this.option("itemMargin"))
            }, _arrangeItems: function(t) {
                var i = this;
                this._itemsPositions = [], n.each(t, function(n, t) {
                    var r = {}, u;
                    r.widthRatio = t.widthRatio || 1, r.heightRatio = t.heightRatio || 1, r.index = n, r.widthRatio = r.widthRatio <= 0 ? 0 : Math.round(r.widthRatio), r.heightRatio = r.heightRatio <= 0 ? 0 : Math.round(r.heightRatio), u = i._getItemPosition(r), u.x === -1 && (u.x = i.cells.push(new Array(i.cellsPerColumn)) - 1), i._occupyCells(r, u), i._arrangeItem(r, u), i._itemsPositions.push(u)
                })
            }, _getItemPosition: function(n) {
                for (var r = {x: -1, y: 0}, i, t = 0; t < this.cells.length; t++) {
                    for (i = 0; i < this.cellsPerColumn; i++)
                        if (this._itemFit(t, i, n)) {
                            r.x = t, r.y = i;
                            break
                        }
                    if (r.x > -1)
                        break
                }
                return r
            }, _itemFit: function(n, t, r) {
                var e = !0, u, f;
                if (t + r.heightRatio > this.cellsPerColumn)
                    return!1;
                for (u = n; u < n + r.widthRatio; u++)
                    for (f = t; f < t + r.heightRatio; f++)
                        if (this.cells.length - 1 < u)
                            this.cells.push(new Array(this.cellsPerColumn));
                        else if (this.cells[u][f] !== i) {
                            e = !1;
                            break
                        }
                return e
            }, _occupyCells: function(n, t) {
                for (var r, i = t.x; i < t.x + n.widthRatio; i++)
                    for (r = t.y; r < t.y + n.heightRatio; r++)
                        this.cells[i][r] = n.index
            }, _arrangeItem: function(n, t) {
                var f = this.option("baseItemHeight"), r = this.option("baseItemWidth"), i = this.option("itemMargin"), u, e = this.option("rtlEnabled") ? this._$container.width() : 0, o = this._itemElements().eq(n.index);
                if (e) {
                    var s = t.x * r, h = r + i, c = h * n.widthRatio, l = t.x * i;
                    u = e - (s + c + l)
                } else
                    u = t.x * r + (t.x + 1) * i;
                o.css({height: n.heightRatio * f + (n.heightRatio - 1) * i, width: n.widthRatio * r + (n.widthRatio - 1) * i, top: t.y * f + (t.y + 1) * i, left: u, display: n.widthRatio <= 0 || n.heightRatio <= 0 ? "none" : ""})
            }, _moveFocus: function(n) {
                var o = "up", s = "down", h = this.option("rtlEnabled") ? "right" : "left", c = this.option("rtlEnabled") ? "left" : "right", l = "pageup", a = "pagedown", r = this.cells, u = this._$focusedItem.index(), t = this._itemsPositions[u].x, i = this._itemsPositions[u].y, e, f;
                switch (n) {
                    case l:
                    case o:
                        while (i > 0 && u === r[t][i])
                            i--;
                        i < 0 && (i = 0);
                        break;
                    case a:
                    case s:
                        while (i < r[0].length && u === r[t][i])
                            i++;
                        i === r[0].length && (i = r[0].length - 1);
                        break;
                    case c:
                        while (t < r.length && u === r[t][i])
                            t++;
                        t === r.length && (t = r.length - 1);
                        break;
                    case h:
                        while (t >= 0 && u === r[t][i])
                            t--;
                        t < 0 && (t = 0);
                        break;
                    default:
                        this.callBase.apply(this, arguments);
                        return
                }
                e = r[t][i], f = this._itemElements().eq(e), this._resetFocusedItem(f), this._scrollToItem(f)
            }, _scrollToItem: function(n) {
                if (n.length) {
                    var t = n.position().left, r = n.outerWidth(), f = t + r, i = this._scrollView.scrollLeft(), u = this._scrollView.element().outerWidth();
                    i <= t && f <= i + u || (i > t ? this._scrollView.scrollTo(t - this.option("itemMargin")) : this._scrollView.scrollTo(t + r - u + this.option("itemMargin")))
                }
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"showScrollbar":
                        this._initScrollView();
                        break;
                    case"disabled":
                        this._scrollView.option("disabled", n.value);
                        break;
                    case"baseItemWidth":
                    case"baseItemHeight":
                    case"itemMargin":
                        this._renderGeometry();
                        break;
                    case"height":
                        this.callBase(n), this._renderGeometry(), this._scrollView.update();
                        break;
                    case"indicateLoading":
                        this._hideLoadingIfLoadIndicationOff();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, scrollPosition: function() {
                return this._scrollView.scrollOffset().left
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, r = t.fx, f = "dx-trackbar", e = "dx-trackbar-container", o = "dx-trackbar-range", s = "dx-trackbar-wrapper";
        t.registerComponent("dxTrackBar", u, u.Editor.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({min: 0, max: 100, value: 0})
            }, _render: function() {
                this.element().addClass(f), this._renderWrapper(), this._renderContainer(), this._renderRange(), this.callBase(), this._renderValue()
            }, _renderWrapper: function() {
                this._$wrapper = n("<div>").addClass(s).appendTo(this.element())
            }, _renderContainer: function() {
                this._$bar = n("<div>").addClass(e).appendTo(this._$wrapper)
            }, _renderRange: function() {
                this._$range = n("<div>").addClass(o).appendTo(this._$bar)
            }, _renderValue: function() {
                var i = this.option("value"), n = this.option("min"), t = this.option("max"), r;
                if (!(n > t)) {
                    if (i < n) {
                        this.option("value", n), this._currentRatio = 0;
                        return
                    }
                    if (i > t) {
                        this.option("value", t), this._currentRatio = 1;
                        return
                    }
                    r = n === t ? 0 : (i - n) / (t - n), this._animateRange({width: r * 100 + "%"}), this._currentRatio = r
                }
            }, _animateRange: function(t) {
                r.stop(this._$range), this._needPreventAnimation || r.animate(this._$range, {type: "custom", duration: 100, to: t, complete: n.proxy(this._rangeAnimationCompleteHandler, this)})
            }, _rangeAnimationCompleteHandler: n.noop, _optionChanged: function(n) {
                switch (n.name) {
                    case"value":
                        this._renderValue(), this.callBase(n);
                        break;
                    case"max":
                    case"min":
                        this._renderValue();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _dispose: function() {
                r.stop(this._$range), this.callBase()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, l = t.fx, f = "dx-progressbar", e = "dx-progressbar-container", o = "dx-progressbar-range", s = "dx-progressbar-wrapper", h = "dx-progressbar-status", c = "dx-progressbar-animating-container", u = "dx-progressbar-animating-segment";
        t.registerComponent("dxProgressBar", r, r.dxTrackBar.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({statusFormat: function(n) {
                        return"Progress: " + Math.round(n * 100) + "%"
                    }, showStatus: !0, onComplete: null, activeStateEnabled: !1, _animatingSegmentCount: 0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: [{platform: "win8"}], options: {_animatingSegmentCount: 5}}, {device: [{platform: "android"}], options: {_animatingSegmentCount: 3}}, {device: function(n) {
                            return n.platform === "android" && n.version[0] > 4
                        }, options: {_animatingSegmentCount: 2}}])
            }, _init: function() {
                this.callBase()
            }, _render: function() {
                this._createCompleteAction(), this._renderStatus(), this.callBase(), this.element().addClass(f), this._$wrapper.addClass(s), this._$bar.addClass(e), this._$range.addClass(o), this._toggleStatus(this.option("showStatus"))
            }, _createCompleteAction: function() {
                this._completeAction = this._createActionByOption("onComplete")
            }, _renderStatus: function() {
                this._$status = n("<div>").addClass(h)
            }, _renderIndeterminateState: function() {
                var i, t;
                for (this._$segmentContainer = n("<div>").addClass(c), i = this.option("_animatingSegmentCount"), t = 0; t < i; t++)
                    n("<div>").addClass(u).addClass(u + "-" + (t + 1)).appendTo(this._$segmentContainer);
                this._$segmentContainer.appendTo(this._$wrapper)
            }, _toggleStatus: function(n) {
                n ? this._$status.appendTo(this._$bar) : this._$status.detach()
            }, _toggleIndeterminateState: function(n) {
                n ? (this._renderIndeterminateState(), this._$bar.toggle(!1)) : (this._$bar.toggle(!0), this._$segmentContainer.remove(), delete this._$segmentContainer)
            }, _renderValue: function() {
                var n = this.option("value"), t = this.option("max");
                if (!n && n !== 0) {
                    this._toggleIndeterminateState(!0);
                    return
                }
                this._$segmentContainer && this._toggleIndeterminateState(!1), n == t && this._completeAction(), this.callBase(), this._setStatus()
            }, _setStatus: function() {
                var t = this.option("statusFormat"), i;
                t = n.isFunction(t) ? n.proxy(t, this) : function(n) {
                    return n
                }, i = t(this._currentRatio, this.option("value")), this._$status.text(i)
            }, _dispose: function() {
                this._$status.remove(), this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"statusFormat":
                        this._setStatus();
                        break;
                    case"showStatus":
                        this._toggleStatus(n.value);
                        break;
                    case"onComplete":
                        this._createCompleteAction();
                        break;
                    case"_animatingSegmentCount":
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var u = t.ui, f = u.events, d = t.fx, g = t.utils, a = t.translator, s = t.support.transitionEndEventName, r = "dx-slider", v = r + "-wrapper", h = r + "-handle", y = "." + h, p = r + "-bar", c = r + "-range", w = c + "-visible", e = r + "-label", o = e + "-position-", b = r + "-tooltip", l = b + "-position-", k = u.Widget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({hoverStateEnabled: !1, value: 50, tooltipEnabled: !1, tooltipFormat: function(n) {
                        return n
                    }, tooltipPosition: "top", tooltipShowMode: "onHover", tooltipFitIn: null})
            }, _render: function() {
                this.callBase(), this.element().addClass(h), this._renderTooltip()
            }, _renderTooltip: function() {
                this.option("tooltipEnabled") ? (this._$tooltip || (this._$tooltip = n("<div>").appendTo(this.element()).dxTooltip({visible: !0, height: i, target: this.element(), closeOnOutsideClick: !1, container: this.element(), closeOnBackButton: !1, closeOnTargetScroll: !1, animation: null}), this._tooltip = this._$tooltip.dxTooltip("instance")), this._renderTooltipPosition(), this._renderTooltipShowMode(), this._renderValue()) : this._removeTooltip()
            }, _visibilityChanged: function() {
                this._dimensionChanged()
            }, _dimensionChanged: function() {
                this._repaintTooltip()
            }, _removeTooltip: function() {
                this._$tooltip && (this._$tooltip.remove(), delete this._$tooltip, delete this._tooltip)
            }, _renderTooltipPosition: function() {
                if (this._tooltip) {
                    var t = this.option("tooltipPosition");
                    n.type(t) === "string" && (t = t + "None"), this._tooltip.option("position", t)
                }
            }, _repaintTooltip: function() {
                this._tooltip && this._tooltip.repaint()
            }, _renderValue: function() {
                if (this._tooltip) {
                    var n = this.option("tooltipFormat"), t = n(this.option("value"));
                    this._tooltip.content().html(t), this._fitTooltipPosition()
                }
            }, _renderTooltipShowMode: function() {
                this.element().toggleClass("dx-slider-tooltip-on-hover", /^onhover$/i.test(this.option("tooltipShowMode")))
            }, _fitTooltipPosition: function() {
                if (this._$tooltip) {
                    var n = this._tooltip.content().parent(), o = n.outerWidth(), t = this.option("tooltipFitIn"), s = t.outerWidth(), i = t.offset().left, h = i + s, r = this.element(), u = r.outerWidth(), f = r.offset().left, c = f + u, e = Math.round(u / 2 - o / 2), l = Math.ceil(i - f), v = Math.floor(h - c) + e * 2, y = Math.min(Math.max(l, e), v);
                    a.move(n, {left: y})
                }
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"tooltipFormat":
                        this._renderValue();
                        break;
                    case"value":
                        this._renderValue();
                        break;
                    case"tooltipEnabled":
                        this._renderTooltip();
                        break;
                    case"tooltipPosition":
                        this._renderTooltipPosition();
                        break;
                    case"tooltipShowMode":
                        this._renderTooltipShowMode();
                        break;
                    case"tooltipFitIn":
                        this._fitTooltipPosition();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, fitTooltipPosition: function() {
                this._fitTooltipPosition()
            }, repaint: function() {
                this._repaintTooltip(), this._renderTooltipPosition(), this._fitTooltipPosition()
            }});
        t.registerComponent("dxSlider", u, u.dxTrackBar.inherit({_activeStateUnit: y, _supportedKeys: function() {
                var t = this.option("rtlEnabled");
                return n.extend(this.callBase(), {leftArrow: function(n) {
                        n.preventDefault(), n.stopPropagation();
                        var i = this.option("value"), r = this._valueStep();
                        i = t ? i + r : i - r, this.option("value", i)
                    }, rightArrow: function(n) {
                        n.preventDefault(), n.stopPropagation();
                        var i = this.option("value"), r = this._valueStep();
                        i = t ? i - r : i + r, this.option("value", i)
                    }, home: function(n) {
                        n.preventDefault(), n.stopPropagation();
                        var t = this.option("min");
                        this.option("value", t)
                    }, end: function(n) {
                        n.preventDefault(), n.stopPropagation();
                        var t = this.option("max");
                        this.option("value", t)
                    }})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({step: 1, value: 50, showRange: !0, tooltip: {enabled: !1, format: function(n) {
                            return n
                        }, position: "top", showMode: "onHover"}, label: {visible: !1, position: "bottom", format: function(n) {
                            return n
                        }}})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0, hoverStateEnabled: !0}}])
            }, _render: function() {
                this.element().addClass(r), this.callBase(), this._renderLabels(), this._renderStartHandler()
            }, _visibilityChanged: function() {
                this.repaint()
            }, _renderWrapper: function() {
                this.callBase(), this._$wrapper.addClass(v), this._$wrapper.dxSwipeable({elastic: !1, immediate: !0, onStart: n.proxy(this._swipeStartHandler, this), onUpdated: n.proxy(this._swipeUpdateHandler, this), onEnd: n.proxy(this._swipeEndHandler, this), itemSizeFunc: n.proxy(this._itemWidthFunc, this)})
            }, _renderContainer: function() {
                this.callBase(), this._$bar.addClass(p);
                this._$bar.off(s + "." + this.NAME).on(s, n.proxy(this._fitHandleTooltipPosition, this))
            }, _renderRange: function() {
                this.callBase(), this._$range.addClass(c), this._renderHandle(), this._renderRangeVisibility()
            }, _renderRangeVisibility: function() {
                this._$range.toggleClass(w, Boolean(this.option("showRange")))
            }, _renderHandle: function() {
                this._$handle = this._renderHandleImpl(this.option("value"), this._$handle)
            }, _renderHandleImpl: function(t, i) {
                var f = i || n("<div>").appendTo(this._$range), e = this._normalizeFormat(this.option("tooltip.format")), r = this.option("tooltip.enabled"), u = this.option("tooltip.position");
                return this.element().toggleClass(l + "bottom", r && u === "bottom").toggleClass(l + "top", r && u === "top"), f.dxSliderHandle({value: t, tooltipEnabled: r, tooltipPosition: u, tooltipFormat: e, tooltipShowMode: this.option("tooltip.showMode"), tooltipFitIn: this.element()})
            }, _renderLabels: function() {
                if (this.element().removeClass(o + "bottom").removeClass(o + "top"), this.option("label.visible")) {
                    var i = this.option("min"), r = this.option("max"), u = this.option("label.position"), t = this._normalizeFormat(this.option("label.format"));
                    this._$minLabel || (this._$minLabel = n("<div>").addClass(e).appendTo(this._$wrapper)), this._$minLabel.html(t(i)), this._$maxLabel || (this._$maxLabel = n("<div>").addClass(e).appendTo(this._$wrapper)), this._$maxLabel.html(t(r)), this.element().addClass(o + u)
                } else
                    this._$minLabel && (this._$minLabel.remove(), delete this._$minLabel), this._$maxLabel && (this._$maxLabel.remove(), delete this._$maxLabel)
            }, _normalizeFormat: function(t) {
                var i = t;
                return i = typeof t == "string" ? function(n) {
                    return Globalize.format(n, t)
                } : n.isFunction(t) ? n.proxy(i, this) : function(n) {
                    return n
                }
            }, _renderDimensions: function() {
                if (this.callBase(), this._$bar) {
                    var n = this._$bar.outerWidth(!0) - this._$bar.outerWidth();
                    this._$bar.width(this.option("width") - n)
                }
            }, _renderStartHandler: function() {
                var t = f.addNamespace("dxpointerdown", this.NAME), i = f.addNamespace("dxclick", this.NAME), r = this._createAction(n.proxy(this._startHandler, this));
                this.element().off(t).on(t, function(n) {
                    f.isMouseEvent(n) && r({jQueryEvent: n})
                }).off(i).on(i, function(n) {
                    r({jQueryEvent: n})
                })
            }, _itemWidthFunc: function() {
                return this.element().width() / this._swipePixelRatio()
            }, _swipeStartHandler: function(t) {
                var u = this.option("rtlEnabled"), i, r;
                f.isTouchEvent(t.jQueryEvent) && this._createAction(n.proxy(this._startHandler, this))({jQueryEvent: t.jQueryEvent}), this._toggleActiveState(this._activeHandle(), !0), this._startOffset = this._currentRatio, i = this._startOffset * this._swipePixelRatio(), r = (1 - this._startOffset) * this._swipePixelRatio(), t.jQueryEvent.maxLeftOffset = u ? r : i, t.jQueryEvent.maxRightOffset = u ? i : r, this._needPreventAnimation = !0
            }, _swipeEndHandler: function(n) {
                var t = this.option("rtlEnabled") ? -1 : 1;
                delete this._needPreventAnimation, this._changeValueOnSwipe(this._startOffset + t * n.jQueryEvent.targetOffset / this._swipePixelRatio()), delete this._startOffset, this._renderValue(), this._toggleActiveState(this._activeHandle(), !1)
            }, _activeHandle: function() {
                return this._$handle
            }, _swipeUpdateHandler: function(n) {
                this._valueChangeEventInstance = n, this._updateHandlePosition(n)
            }, _updateHandlePosition: function(n) {
                var i = this.option("rtlEnabled") ? -1 : 1, t = this._startOffset + i * n.jQueryEvent.offset / this._swipePixelRatio();
                this._$range.width(t * 100 + "%"), this._changeValueOnSwipe(t)
            }, _swipePixelRatio: function() {
                var n = this.option("min"), t = this.option("max"), i = this._valueStep();
                return(t - n) / i
            }, _valueStep: function() {
                var n = this.option("step");
                return(!n || isNaN(n)) && (n = 1), n = parseFloat(n.toFixed(5)), n === 0 && (n = 1e-5), n
            }, _changeValueOnSwipe: function(n) {
                var t = this.option("min"), u = this.option("max"), r = this._valueStep(), o = n * (u - t), i = t + o, f, e;
                r < 0 || (i === u || i === t ? this.option("value", i) : (f = (r + "").split("."), e = f.length > 1 ? f[1].length : e, i = Number((Math.round(o / r) * r + t).toFixed(e)), this.option("value", Math.max(Math.min(i, u), t))))
            }, _startHandler: function(n) {
                var t = n.jQueryEvent;
                this._currentRatio = (u.events.eventData(t).x - this._$bar.offset().left) / this._$bar.width(), this.option("rtlEnabled") && (this._currentRatio = 1 - this._currentRatio), this._valueChangeEventInstance = t, this._changeValueOnSwipe(this._currentRatio)
            }, _renderValue: function() {
                this.callBase(), this._activeHandle().dxSliderHandle("option", "value", this.option("value"))
            }, _rangeAnimationCompleteHandler: function() {
                this._fitHandleTooltipPosition()
            }, _fitHandleTooltipPosition: function() {
                this._activeHandle() && this._activeHandle().dxSliderHandle("fitTooltipPosition")
            }, _repaintHandle: function() {
                this._$handle.dxSliderHandle("repaint")
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"visible":
                        this.callBase(n), this._renderHandle(), this._repaintHandle();
                        break;
                    case"min":
                    case"max":
                        this._renderLabels(), this.callBase(n);
                        break;
                    case"step":
                        this._renderValue();
                        break;
                    case"value":
                        this.callBase(n);
                        break;
                    case"showRange":
                        this._renderRangeVisibility();
                        break;
                    case"tooltip":
                        this._renderHandle();
                        break;
                    case"label":
                        this._renderLabels();
                        break;
                    case"rtlEnabled":
                        this._toggleRTLDirection(), this._renderValue();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _refresh: function() {
                this._renderDimensions(), this._renderValue(), this._renderHandle()
            }})), t.registerComponent("dxSliderHandle", u.dxSlider, k)
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = u.events, s = "dx-slider-handle", f = "dx-range-slider", r = f + "-start-handle", o = f + "-end-handle";
        t.registerComponent("dxRangeSlider", u, u.dxSlider.inherit({_supportedKeys: function() {
                var t = this.option("rtlEnabled");
                return n.extend(this.callBase(), {leftArrow: function(i) {
                        i.preventDefault(), i.stopPropagation();
                        var f = n(i.target).hasClass(r) ? "start" : "end", u = this.option(f), e = this._valueStep();
                        u = t ? u + e : u - e, this.option(f, u)
                    }, rightArrow: function(i) {
                        i.preventDefault(), i.stopPropagation();
                        var f = n(i.target).hasClass(r) ? "start" : "end", u = this.option(f), e = this._valueStep();
                        u = t ? u - e : u + e, this.option(f, u)
                    }, home: function(t) {
                        t.preventDefault(), t.stopPropagation();
                        var i = n(t.target).hasClass(r), u = i ? "start" : "end", f = i ? "min" : "start", e = this.option(f);
                        this.option(u, e)
                    }, end: function(t) {
                        t.preventDefault(), t.stopPropagation();
                        var i = n(t.target).hasClass(r), u = i ? "start" : "end", f = i ? "end" : "max", e = this.option(f);
                        this.option(u, e)
                    }})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({start: 40, end: 60})
            }, _render: function() {
                this.callBase(), this.element().addClass(f)
            }, _renderHandle: function() {
                this._$handleStart = this._renderHandleImpl(this.option("start"), this._$handleStart).addClass(r), this._$handleEnd = this._renderHandleImpl(this.option("end"), this._$handleEnd).addClass(o)
            }, _startHandler: function(n) {
                var i = n.jQueryEvent, t = this._$range, r = t.width(), u = e.eventData(i).x - this._$bar.offset().left, f = t.position().left, o = t.position().left + r, s = this.option("rtlEnabled"), h = (s ? -1 : 1) * ((f + o) / 2 - u) > 0;
                this._capturedHandle = h ? this._$handleStart : this._$handleEnd, this.callBase(n)
            }, _activeHandle: function() {
                return this._capturedHandle
            }, _updateHandlePosition: function(n) {
                var o = this.option("rtlEnabled"), s = o ? -1 : 1, f = this.option("max"), r = this.option("min"), t = this._startOffset + s * n.jQueryEvent.offset / this._swipePixelRatio(), t = t.toPrecision(12), h = t * (f - r) + r, u, e, i;
                this._updateSelectedRangePosition(t, t), this._changeValueOnSwipe(t), u = this.option("start"), e = this.option("end"), u === e && (i = h < u ? this._$handleStart : this._$handleEnd, i.focus(), i && i !== this._capturedHandle && (this._updateSelectedRangePosition((u - r) / (f - r), (e - r) / (f - r)), this._toggleActiveState(this._activeHandle(), !1), this._toggleActiveState(i, !0), this._capturedHandle = i), this._updateSelectedRangePosition(t, t), this._changeValueOnSwipe(t))
            }, _updateSelectedRangePosition: function(n, t) {
                var i = this.option("rtlEnabled"), r = this._capturedHandle === this._$handleStart && i || this._capturedHandle === this._$handleEnd && !i, u = r ? "right" : "left";
                i ^ r ? this._$range.css(u, 100 - t * 100 + "%") : this._$range.css(u, n * 100 + "%")
            }, _changeValueOnSwipe: function(n) {
                this._suppressValueChangeAction(), this.callBase(n), this._resumeValueChangeAction();
                var f = this._capturedHandle === this._$handleStart ? "start" : "end", t = this.option("start"), u = this.option("end"), r = this.option("value"), i = this.option("max"), e = this.option("min");
                t > i && (t = i, this.option("start", i)), t < e && (t = e, this.option("start", e)), u > i && (u = i, this.option("end", i)), r > u && f === "start" && (r = u), r < t && f === "end" && (r = t), this.option(f, r)
            }, _renderValue: function() {
                var i = this.option("start"), r = this.option("end"), n = this.option("min"), t = this.option("max"), u = this.option("rtlEnabled");
                i = Math.max(n, Math.min(i, t)), r = Math.max(i, Math.min(r, t)), this.option("start", i), this.option("end", r);
                var o = t === n ? 0 : (i - n) / (t - n), s = t === n ? 0 : (r - n) / (t - n), f = parseFloat((o * 100).toPrecision(12)) + "%", e = parseFloat(((1 - s) * 100).toPrecision(12)) + "%";
                this._animateRange({right: u ? f : e, left: u ? e : f}), this._renderHandle()
            }, _repaintHandle: function() {
                this._$handleStart.dxSliderHandle("repaint"), this._$handleEnd.dxSliderHandle("repaint")
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"start":
                    case"end":
                        this._renderValue(), this._createActionByOption("onValueChanged")({start: this.option("start"), end: this.option("end")});
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var f = t.ui, tt = t.utils, e = f.events, r = t.fx, a = t.translator, u = "dx-gallery", b = u + "-wrapper", v = "dx-gallery-loop", k = u + "-container", y = u + "-active", o = u + "-item", s = o + "-loop", d = "." + o, h = o + "-selected", p = u + "-indicator", c = p + "-item", l = "." + c, w = c + "-selected", g = "dxGalleryItemData", nt = f.Widget.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {pageUp: n.noop, pageDown: n.noop})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({direction: "next", onClick: null, hoverStateEnabled: !0, activeStateEnabled: !0})
            }, _render: function() {
                this.callBase();
                var t = this, i = this.element(), n = e.addNamespace("dxclick", this.NAME);
                i.addClass(u + "-nav-button-" + this.option("direction")).off(n).on(n, function(n) {
                    t._createActionByOption("onClick")({jQueryEvent: n})
                })
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"onClick":
                    case"direction":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }});
        t.registerComponent("dxGallery", f, f.CollectionWidget.inherit({_activeStateUnit: d, _setDefaultOptions: function() {
                this.callBase(), this.option({activeStateEnabled: !1, animationDuration: 400, loop: !1, swipeEnabled: !0, indicatorEnabled: !0, showIndicator: !0, selectedIndex: 0, slideshowDelay: 0, showNavButtons: !1, loopItemFocus: !1, selectOnFocus: !0, selectionMode: "single", selectionRequired: !0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _dataSourceOptions: function() {
                return{paginate: !1}
            }, _itemContainer: function() {
                return this._$container
            }, _itemClass: function() {
                return o
            }, _itemDataKey: function() {
                return g
            }, _itemWidth: function() {
                return this._itemWidthCache || (this._itemWidthCache = this._itemElements().first().outerWidth()), this._itemWidthCache
            }, _clearItemWidthCache: function() {
                delete this._itemWidthCache
            }, _itemsCount: function() {
                return(this.option("items") || []).length
            }, _offsetDirection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _render: function() {
                this.element().addClass(u), this.element().toggleClass(v, this.option("loop")), this._renderDragHandler(), this._renderWrapper(), this._renderItemsContainer(), this.callBase(), this._renderContainerPosition(), this._renderItemPositions(), this._renderNavButtons(), this._renderIndicator(), this._renderSelectedItem(), this._renderSelectedIndicatorItem(), this._renderUserInteraction(), this._setupSlideShow(), this._reviseDimensions()
            }, _dimensionChanged: function() {
                this._clearItemWidthCache(), this._renderDuplicateItems(), this._renderItemPositions(), this._renderContainerPosition()
            }, _renderDragHandler: function() {
                var n = e.addNamespace("dragstart", this.NAME);
                this.element().off(n).on(n, "img", function() {
                    return!1
                })
            }, _renderWrapper: function() {
                this._$wrapper || (this._$wrapper = n("<div />").addClass(b).appendTo(this.element()))
            }, _renderItems: function(n) {
                this.callBase(n), this._renderDuplicateItems()
            }, _renderItemsContainer: function() {
                this._$container || (this._$container = n("<div>").addClass(k).appendTo(this._$wrapper))
            }, _renderDuplicateItems: function() {
                var t = this.option("items") || [], i = t.length, r, u, n;
                if (i) {
                    for (this.element().find("." + s).remove(), r = this.element().width() / this._itemWidth(), u = Math.min(r, i), n = 0; n < u; n++)
                        this._renderItem(0, t[n]).addClass(s);
                    this._renderItem(0, t[this._itemsCount() - 1]).addClass(s)
                }
            }, _renderItemPositions: function() {
                var t = this._itemWidth(), i = this.element().find("." + s).length, r = this._itemsCount() + i - 1, u = this._offsetDirection();
                this._itemElements().each(function(i) {
                    var f = i;
                    i === r && (f = -1), a.move(n(this), {left: u * f * t})
                })
            }, _renderContainerPosition: function(t, i) {
                t = t || 0;
                var r = this, e = this._itemWidth(), o = this.option("selectedIndex"), s = t - o, f = this._offsetDirection() * s * e, u;
                return i ? (r._startSwipe(), u = r._animate(f).done(n.proxy(r._endSwipe, r))) : (a.move(this._$container, {left: f}), u = n.Deferred().resolveWith(r)), u.promise()
            }, _startSwipe: function() {
                this.element().addClass(y)
            }, _endSwipe: function() {
                this.element().removeClass(y)
            }, _animate: function(t, i) {
                var u = this, f = n.Deferred();
                return r.animate(this._$container, n.extend({type: "slide", to: {left: t}, duration: u.option("animationDuration"), complete: function() {
                        f.resolveWith(u), u._updateNavButtons()
                    }}, i || {})), this._updateNavButtons(), f
            }, _reviseDimensions: function() {
                var n = this, t = n._itemElements().first().find(".dx-item-content");
                t && !t.is(":hidden") && (n.option("height") || n.option("height", t.outerHeight()), n.option("width") || n.option("width", t.outerWidth()), this._dimensionChanged())
            }, _renderIndicator: function() {
                if (!this.option("showIndicator")) {
                    this._cleanIndicators();
                    return
                }
                var t = this._$indicator = n("<div>").addClass(p).appendTo(this._$wrapper);
                n.each(this.option("items") || [], function() {
                    n("<div>").addClass(c).appendTo(t)
                }), this._renderSelectedIndicatorItem()
            }, _cleanIndicators: function() {
                this._$indicator && this._$indicator.remove()
            }, _renderSelectedItem: function() {
                var n = this.option("selectedIndex");
                this._itemElements().removeClass(h).eq(n).addClass(h)
            }, _renderSelectedIndicatorItem: function() {
                this._$indicator && this._$indicator.find(l).removeClass(w).eq(this.option("selectedIndex")).addClass(w)
            }, _renderUserInteraction: function() {
                var t = this, i = t.element(), r = t.option("swipeEnabled") && this._itemsCount() > 1, f = r ? "pointer" : "default", u;
                i.dxSwipeable({disabled: this.option("disabled") || !r, onStart: n.proxy(t._swipeStartHandler, t), onUpdated: n.proxy(t._swipeUpdateHandler, t), onEnd: n.proxy(t._swipeEndHandler, t), itemSizeFunc: n.proxy(t._itemWidth, t)}), u = this._createAction(this._indicatorSelectHandler);
                i.off(e.addNamespace("dxclick", this.NAME), l).on(e.addNamespace("dxclick", this.NAME), l, function(n) {
                    u({jQueryEvent: n})
                })
            }, _indicatorSelectHandler: function(t) {
                var u = t.jQueryEvent, i = t.component, r;
                i.option("indicatorEnabled") && (r = n(u.target).index(), i._renderContainerPosition(i.option("selectedIndex") - r, !0).done(function() {
                    this._suppressRenderItemPositions = !0, this._setFocusOnSelect(), i.option("selectedIndex", r)
                }))
            }, _renderNavButtons: function() {
                var t = this;
                if (!t.option("showNavButtons")) {
                    t._cleanNavButtons();
                    return
                }
                t._prevNavButton = n("<div />").dxGalleryNavButton({direction: "prev", onClick: function() {
                        t.prevItem(!0).done(t._setFocusOnSelect)
                    }}).appendTo(this._$wrapper), t._nextNavButton = n("<div />").dxGalleryNavButton({direction: "next", onClick: function() {
                        t.nextItem(!0).done(t._setFocusOnSelect)
                    }}).appendTo(this._$wrapper), this._renderNavButtonsVisibility()
            }, _updateNavButtons: function() {
                this._prevNavButton && this._prevNavButton.dxGalleryNavButton("instance").option("disabled", r.isAnimating(this._$container)), this._nextNavButton && this._nextNavButton.dxGalleryNavButton("instance").option("disabled", r.isAnimating(this._$container))
            }, _cleanNavButtons: function() {
                this._prevNavButton && (this._prevNavButton.remove(), delete this._prevNavButton), this._nextNavButton && (this._nextNavButton.remove(), delete this._nextNavButton)
            }, _renderNavButtonsVisibility: function() {
                var i, r;
                if (this.option("showNavButtons")) {
                    var t = this.option("selectedIndex"), u = this.option("loop"), n = this._itemsCount();
                    (this._prevNavButton.show(), this._nextNavButton.show(), u) || (i = n < 2 || t === n - 1, r = n < 2 || t === 0, r && this._prevNavButton.hide(), i && this._nextNavButton.hide())
                }
            }, _setupSlideShow: function() {
                var n = this, t = n.option("slideshowDelay");
                t && (clearTimeout(n._slideshowTimer), n._slideshowTimer = setTimeout(function() {
                    if (n._userInteraction) {
                        n._setupSlideShow();
                        return
                    }
                    n.nextItem(!0).done(n._setupSlideShow)
                }, t))
            }, _swipeStartHandler: function(n) {
                var t = this._itemsCount();
                if (!t) {
                    n.jQueryEvent.cancel = !0;
                    return
                }
                if (this._stopItemAnimations(), this._startSwipe(), this._userInteraction = !0, !this.option("loop")) {
                    var i = this.option("selectedIndex"), r = t - i - 1, u = i, f = this.option("rtlEnabled");
                    n.jQueryEvent.maxLeftOffset = f ? u : r, n.jQueryEvent.maxRightOffset = f ? r : u
                }
            }, _stopItemAnimations: function() {
                r.isAnimating(this._$container) && r.stop(this._$container, !0)
            }, _swipeUpdateHandler: function(n) {
                this._renderContainerPosition(this._offsetDirection() * n.jQueryEvent.offset)
            }, _swipeEndHandler: function(n) {
                var t = n.jQueryEvent.targetOffset * this._offsetDirection();
                this._renderContainerPosition(t, !0).done(function() {
                    var n = this.option("selectedIndex"), i = this._fitIndex(n - t);
                    this._suppressRenderItemPositions = !0, this.option("selectedIndex", i), this._renderContainerPosition(), this._setFocusOnSelect(), this._userInteraction = !1, this._setupSlideShow()
                })
            }, _setFocusOnSelect: function() {
                this._userInteraction = !0;
                var n = this.itemElements().filter("." + h);
                this._resetFocusedItem(n), this._userInteraction = !1
            }, _flipIndex: function(n) {
                var t = this._itemsCount();
                return n = n % t, n > (t + 1) / 2 && (n -= t), n < -(t - 1) / 2 && (n += t), n
            }, _fitIndex: function(n) {
                if (!this.option("loop"))
                    return n;
                var t = this._itemsCount();
                return n = n % t, n < 0 && (n += t), n
            }, _clean: function() {
                this.callBase(), this._cleanIndicators(), this._cleanNavButtons()
            }, _dispose: function() {
                clearTimeout(this._slideshowTimer), this.callBase()
            }, _updateSelection: function() {
                this._suppressRenderItemPositions || this._renderContainerPosition(), this._suppressRenderItemPositions = !1, this._renderSelectedItem(), this._renderSelectedIndicatorItem(), this._renderNavButtonsVisibility()
            }, _focusInHandler: function() {
                r.isAnimating(this._$container) || this._userInteraction || this.callBase.apply(this, arguments)
            }, _focusOutHandler: function() {
                r.isAnimating(this._$container) || this._userInteraction || this.callBase.apply(this, arguments)
            }, _selectFocusedItem: function(n) {
                var t = this.itemElements().index(n);
                this.goToItem(t, !0)
            }, _visibilityChanged: function(n) {
                n && this._reviseDimensions()
            }, _optionChanged: function(n) {
                var t = n.value;
                switch (n.name) {
                    case"width":
                        this.callBase.apply(this, arguments), this._dimensionChanged();
                        break;
                    case"animationDuration":
                        this._renderNavButtonsVisibility();
                        break;
                    case"loop":
                        this.option("loopItemFocus", t), this.element().toggleClass(v, t), this._renderNavButtonsVisibility();
                        return;
                    case"showIndicator":
                        this._renderIndicator();
                        return;
                    case"showNavButtons":
                        this._renderNavButtons();
                        return;
                    case"slideshowDelay":
                        this._setupSlideShow();
                        return;
                    case"swipeEnabled":
                    case"indicatorEnabled":
                        this._renderUserInteraction();
                        return;
                    default:
                        this.callBase(n)
                    }
            }, goToItem: function(t, i) {
                var r = new n.Deferred, u = this.option("selectedIndex"), f = this._itemsCount();
                return(t = this._fitIndex(t), t > f - 1 || t < 0) ? r.resolveWith(this).promise() : (this._renderContainerPosition(u - t, i).done(function() {
                    this._suppressRenderItemPositions = !0, this.option("selectedIndex", t), r.resolveWith(this)
                }), r.promise())
            }, prevItem: function(n) {
                return this.goToItem(this.option("selectedIndex") - 1, n)
            }, nextItem: function(n) {
                return this.goToItem(this.option("selectedIndex") + 1, n)
            }})), t.registerComponent("dxGalleryNavButton", f.dxGallery, nt)
    }(jQuery, DevExpress), function(n, t, i) {
        var f = t.ui, e = t.utils, r = f.events, s = t.fx, u = t.translator, a = "dx-overlay", v = "dx-overlay-wrapper", y = "dx-overlay-content", p = "dx-overlay-shader", w = "dx-overlay-modal", b = "content", k = "dx-rtl", h = ["onShowing", "onShown", "onHiding", "onHidden", "onPositioning", "onPositioned"], d = 1e3, g = [], nt = "dx-state-disabled", o = 40, c = t.devices.real(), tt = c.platform === "android" && /^4\.0(\.\d)?/.test(c.version.join(".")) && navigator.userAgent.indexOf("Chrome") === -1, it = function(n) {
            if (n.width(), tt) {
                var t = n.parents(), i = t.is(".dx-scrollable-native");
                i || (t.css("backface-visibility", "hidden"), t.css("backface-visibility"), t.css("backface-visibility", "visible"))
            }
        }, l = function(t) {
            return n(t instanceof n.Event ? t.target : t)
        };
        t.registerComponent("dxOverlay", f, f.Widget.inherit({_supportedKeys: function() {
                var t = 5, r = this.callBase(), i = function(n, t, i) {
                    if (this.option("dragEnabled")) {
                        i.preventDefault(), i.stopPropagation();
                        var r = {top: n, left: t};
                        this._changePosition(r)
                    }
                };
                return n.extend(this.callBase(), {escape: function() {
                        this.hide()
                    }, downArrow: n.proxy(i, this, t, 0), upArrow: n.proxy(i, this, -t, 0), leftArrow: n.proxy(i, this, 0, -t), rightArrow: n.proxy(i, this, 0, t)})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {shownAction: {since: "14.2", alias: "onShown"}, showingAction: {since: "14.2", alias: "onShowing"}, hidingAction: {since: "14.2", alias: "onHiding"}, hiddenAction: {since: "14.2", alias: "onHidden"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({activeStateEnabled: !1, visible: !1, deferRendering: !0, shading: !0, shadingColor: "", position: {my: "center", at: "center", of: window}, width: function() {
                        return n(window).width() * .8
                    }, height: function() {
                        return n(window).height() * .8
                    }, animation: {show: {type: "pop", duration: 400}, hide: {type: "pop", duration: 400, to: {opacity: 0, scale: 0}, from: {opacity: 1, scale: 1}}}, closeOnOutsideClick: !1, closeOnBackButton: !0, onShowing: null, onShown: null, onHiding: null, onHidden: null, contentTemplate: "content", dragEnabled: !1, target: i, container: i, hideTopOverlayHandler: i, closeOnTargetScroll: !1, onPositioning: null, onPositioned: null})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            var r = t.devices.real(), u = r.platform, i = r.version;
                            return u === "android" && (i[0] < 4 || i[0] == 4 && i[1] <= 1)
                        }, options: {animation: {show: {type: "fade", duration: 400}, hide: {type: "fade", duration: 400, to: {opacity: 0}, from: {opacity: 1}}}}}])
            }, _setOptionsByReference: function() {
                this.callBase(), n.extend(this._optionsByReference, {animation: !0})
            }, _wrapper: function() {
                return this._$wrapper
            }, _container: function() {
                return this._$content
            }, _init: function() {
                this.callBase(), this._initActions(), this._initCloseOnOutsideClickHandler(), this._$wrapper = n("<div>").addClass(v), this._$content = n("<div>").addClass(y);
                var t = this.element();
                this._$wrapper.addClass(t.attr("class")), t.addClass(a);
                this._$wrapper.on("MSPointerDown", n.noop)
            }, _clean: function() {
                this._cleanFocusState()
            }, _initOptions: function(n) {
                this._initTarget(n.target), this._initContainer(n.container), this._initHideTopOverlayHandler(n.hideTopOverlayHandler), this.callBase(n)
            }, _initTarget: function(t) {
                if (e.isDefined(t)) {
                    var i = this.option();
                    n.each(["position.of", "animation.show.from.position.of", "animation.show.to.position.of", "animation.hide.from.position.of", "animation.hide.to.position.of"], function(r, u) {
                        for (var e = u.split("."), f = i; f; )
                            if (e.length == 1) {
                                n.isPlainObject(f) && (f[e.shift()] = t);
                                break
                            } else
                                f = f[e.shift()]
                    })
                }
            }, _initContainer: function(r) {
                r = r === i ? t.viewPort() : r;
                var f = this.element(), u = f.closest(r);
                u.length || (u = n(r).first()), this._$container = u.length ? u : f.parent()
            }, _initHideTopOverlayHandler: function(t) {
                this._hideTopOverlayHandler = t !== i ? t : n.proxy(this._defaultHideTopOverlayHandler, this)
            }, _defaultHideTopOverlayHandler: function() {
                this.hide()
            }, _initActions: function() {
                this._actions = {}, n.each(h, n.proxy(function(t, i) {
                    this._actions[i] = this._createActionByOption(i) || n.noop
                }, this))
            }, _getAnonimousTemplateName: function() {
                return b
            }, _visibilityChanged: function(n) {
                n ? (this.option("visible") && this._show(), this._dimensionChanged()) : this._hide()
            }, _dimensionChanged: function() {
                this._renderGeometry()
            }, _initCloseOnOutsideClickHandler: function() {
                this._proxiedDocumentDownHandler = n.proxy(function() {
                    this._documentDownHandler.apply(this, arguments)
                }, this)
            }, _documentDownHandler: function(t) {
                var i, r, u;
                this._isTopOverlay() && (i = this.option("closeOnOutsideClick"), n.isFunction(i) && (i = i(t)), i && (r = this._$content, u = !r.is(t.target) && !n.contains(r.get(0), t.target), u && (t.preventDefault(), this.hide())))
            }, _isTopOverlay: function() {
                var n = this._zIndexStack();
                return n[n.length - 1] === this._zIndex
            }, _zIndexStack: function() {
                return g
            }, _zIndexInitValue: function() {
                return d
            }, _renderVisibilityAnimate: function() {
                var n = this.option("visible");
                return this._stopAnimation(), n ? this._show() : this._hide()
            }, _updateRegistration: function(t) {
                var i = this._zIndexStack(), r, u;
                t ? this._zIndex || (r = i.length, this._zIndex = (r ? i[r - 1] : this._zIndexInitValue()) + 1, i.push(this._zIndex)) : this._zIndex && (u = n.inArray(this._zIndex, i), i.splice(u, 1), delete this._zIndex)
            }, _normalizePosition: function() {
                this._position = this.option("position")
            }, _show: function() {
                if (this.element().parent().is(":hidden"))
                    return n.Deferred().resolve();
                this._normalizePosition();
                var i = this, r = n.Deferred(), u = i.option("animation") || {}, t = u.show, f = t && t.complete || n.noop;
                return this._updateRegistration(!0), t && t.to && (t = n.extend({type: "slide"}, t), n.extend(t.to, {position: this._position})), this._isHidingActionCancelled ? (delete this._isHidingActionCancelled, r.resolve()) : (this._$wrapper.css("z-index", this._zIndex), this._$content.css("z-index", this._zIndex), this._toggleVisibility(!0), this._animate(t, function() {
                    i.option("focusStateEnabled") && i._focusTarget().focus(), f.apply(this, arguments), i._actions.onShown(), r.resolve()
                })), r.promise()
            }, _hide: function() {
                var t = this, i = n.Deferred(), f = this.option("animation") || {}, r = f.hide, e = r && r.complete || n.noop, u = {cancel: !1};
                this._actions.onHiding(u);
                return u.cancel ? (this._isHidingActionCancelled = !0, this.option("visible", !0), i.resolve()) : (this._toggleShading(!1), this._animate(r, function() {
                    t._toggleVisibility(!1), e.apply(this, arguments), t._updateRegistration(!1), t._actions.onHidden(), i.resolve()
                })), i.promise()
            }, _animate: function(t, i) {
                t ? s.animate(this._$content, n.extend({}, t, {complete: i})) : i()
            }, _stopAnimation: function() {
                s.stop(this._$content, !0)
            }, _toggleVisibility: function(n) {
                this._stopAnimation(), n || e.triggerHidingEvent(this._$content), this.callBase.apply(this, arguments), this._$content.toggle(n), n ? (this._actions.onShowing(), this._renderContent(), this._moveToContainer(), this._renderGeometry(), e.triggerShownEvent(this._$content)) : this._moveFromContainer(), this._toggleShading(n), this._toggleSubscriptions(n), this._updateRegistration(n)
            }, _toggleShading: function(n) {
                this._$wrapper.toggleClass(w, this.option("shading") && !this.option("container")), this._$wrapper.toggleClass(p, n && this.option("shading")), this._$wrapper.css("background-color", this.option("shading") ? this.option("shadingColor") : "")
            }, _toggleSubscriptions: function(n) {
                this._toggleHideTopOverlayCallback(n), this._toggleDocumentDownHandler(n), this._toggleParentsScrollSubscription(n)
            }, _toggleHideTopOverlayCallback: function(n) {
                this._hideTopOverlayHandler && (n && this.option("closeOnBackButton") ? t.hideTopOverlayCallback.add(this._hideTopOverlayHandler) : t.hideTopOverlayCallback.remove(this._hideTopOverlayHandler))
            }, _toggleDocumentDownHandler: function(t) {
                var u = this, i = r.addNamespace("dxpointerdown", u.NAME);
                if (t)
                    n(document).on(i, this._proxiedDocumentDownHandler);
                else
                    n(document).off(i, this._proxiedDocumentDownHandler)
            }, _toggleParentsScrollSubscription: function(i) {
                var f = this._position;
                if (f && f.of) {
                    var e = this, o = this.option("closeOnTargetScroll"), u = l(f.of).parents();
                    if (t.devices.real().platform == "generic" && (u = u.add(window)), u.off(r.addNamespace("scroll", e.NAME)), i && o)
                        u.on(r.addNamespace("scroll", e.NAME), function(t) {
                            if (!t.overlayProcessed) {
                                t.overlayProcessed = !0;
                                var i = !1;
                                n.isFunction(o) && (i = o(t)), i || e.hide()
                            }
                        })
                }
            }, _renderContent: function() {
                this._contentAlreadyRendered || !this.option("visible") && this.option("deferRendering") || (this._contentAlreadyRendered = !0, this.callBase())
            }, _renderContentImpl: function() {
                var t = this.element(), n;
                this._$content.append(t.contents()).appendTo(t), n = this._getTemplate(this.option("contentTemplate")), n && n.render(this.content()), this._renderDrag(), this._renderScrollTerminator()
            }, _renderDrag: function() {
                var t = this._getDragTarget(), i, u;
                if (t && (i = r.addNamespace("dxdragstart", this.NAME), u = r.addNamespace("dxdrag", this.NAME), t.off(i).off(u), this.option("dragEnabled")))
                    t.on(i, n.proxy(this._dragStartHandler, this)).on(u, n.proxy(this._dragUpdateHandler, this))
            }, _renderScrollTerminator: function() {
                var n = this._wrapper(), t = r.addNamespace("dxscroll", this.NAME);
                n.off(t).on("dxscroll", {validate: function() {
                        return!0
                    }, getDirection: function() {
                        return"both"
                    }}, function(n) {
                    n.preventDefault()
                })
            }, _getDragTarget: function() {
                return this.content()
            }, _dragStartHandler: function(n) {
                n.targetElements = [], this._prevOffset = {x: 0, y: 0}, this._dragHandled = !0;
                var t = u.locate(this._$content), i = this._allowedOffsets();
                n.maxLeftOffset = t.left + i.left, n.maxRightOffset = -t.left + i.right, n.maxTopOffset = t.top + i.top, n.maxBottomOffset = -t.top + i.bottom
            }, _dragUpdateHandler: function(n) {
                var t = n.offset, i = this._prevOffset, r = {top: t.y - i.y, left: t.x - i.x};
                this._changePosition(r), this._prevOffset = t
            }, _changePosition: function(n) {
                var t = u.locate(this._$content);
                u.move(this._$content, {left: t.left + n.left, top: t.top + n.top})
            }, _allowedOffsets: function() {
                var t = this._$content, n = this._$container, i = t.outerWidth(), r = n.width(), u = n.height();
                return{top: 0, bottom: u - o, left: i - o, right: r - o}
            }, _fireContentReadyAction: function() {
                this.option("visible") && this._moveToContainer(), this.callBase.apply(this, arguments)
            }, _moveFromContainer: function() {
                this._$content.appendTo(this.element()), this._detachWrapperToContainer()
            }, _detachWrapperToContainer: function() {
                this._$wrapper.detach()
            }, _moveToContainer: function() {
                this._attachWrapperToContainer(), this._$content.appendTo(this._$wrapper)
            }, _attachWrapperToContainer: function() {
                var n = this.element();
                !this._$container || this._$container[0] === n.parent()[0] ? this._$wrapper.appendTo(n) : this._$wrapper.appendTo(this._$container)
            }, _renderGeometry: function() {
                this.option("visible") && this._renderGeometryImpl()
            }, _renderGeometryImpl: function() {
                this._stopAnimation(), this._normalizePosition(), this._renderShading(), this._renderDimensions(), this._renderPosition()
            }, _renderShading: function() {
                var n = this._$wrapper, t = this._getContainer();
                n.css("position", t.get(0) === window ? "fixed" : "absolute"), this.option("shading") && n.show(), this._renderShadingDimensions(), this._renderShadingPosition()
            }, _renderShadingPosition: function() {
                if (this.option("shading")) {
                    var n = this._getContainer();
                    t.position(this._$wrapper, {my: "top left", at: "top left", of: n})
                }
            }, _renderShadingDimensions: function() {
                if (this.option("shading")) {
                    var n = this._getContainer();
                    this._$wrapper.css({width: n.outerWidth(), height: n.outerHeight()})
                }
            }, _getContainer: function() {
                var n = this._position, t = this.option("container"), i = n ? n.of : null;
                return l(t || i)
            }, _renderDimensions: function() {
                this._$content.outerWidth(this.option("width")).outerHeight(this.option("height"))
            }, _renderPosition: function() {
                var i, r, e;
                if (this._dragHandled) {
                    var f = this._$content, i = u.locate(f), n = this._allowedOffsets();
                    u.move(f, {top: Math.min(Math.max(-n.top, i.top), n.bottom), left: Math.min(Math.max(-n.left, i.left), n.right)})
                } else {
                    u.resetPosition(this._$content), i = this._position, r = t.calculatePosition(this._$content, i);
                    this._actions.onPositioning({position: r});
                    e = t.position(this._$content, r);
                    this._actions.onPositioned({position: e});
                    it(this._$content)
                }
            }, _focusTarget: function() {
                return this._$content
            }, _attachKeyboardEvents: function() {
                this._keyboardProcessor = new f.KeyboardProcessor({element: this._$content, handler: this._keyboardHandler, context: this})
            }, _keyboardHandler: function(t) {
                var i = t.originalEvent, r = n(i.target);
                r.is(this._$content) && this.callBase.apply(this, arguments)
            }, _dispose: function() {
                this._stopAnimation(), this._toggleSubscriptions(!1), this._updateRegistration(!1), this._actions = null, this.callBase(), this._$wrapper.remove(), this._$content.remove()
            }, _toggleDisabledState: function(n) {
                this.callBase.apply(this, arguments), this._$content.toggleClass(nt, n)
            }, _toggleRTLDirection: function(n) {
                this._$content.toggleClass(k, n)
            }, _optionChanged: function(t) {
                var i = t.value;
                if (n.inArray(t.name, h) > -1) {
                    this._initActions();
                    return
                }
                switch (t.name) {
                    case"dragEnabled":
                        this._renderDrag();
                        break;
                    case"shading":
                    case"shadingColor":
                        this._toggleShading(this.option("visible"));
                        break;
                    case"width":
                    case"height":
                    case"position":
                        this._renderGeometry();
                        break;
                    case"visible":
                        delete this._dragHandled, this._renderVisibilityAnimate().done(n.proxy(function() {
                            this._animateDeferred && this._animateDeferred.resolveWith(this)
                        }, this));
                        break;
                    case"target":
                        this._initTarget(i), this._invalidate();
                        break;
                    case"container":
                        this._initContainer(i), this._invalidate();
                        break;
                    case"deferRendering":
                    case"contentTemplate":
                        this._invalidate();
                        break;
                    case"closeOnBackButton":
                        this._toggleHideTopOverlayCallback(this.option("visible"));
                        break;
                    case"closeOnOutsideClick":
                        this._toggleDocumentDownHandler(this.option("visible"));
                        break;
                    case"closeOnTargetScroll":
                        this._toggleParentsScrollSubscription(this.option("visible"));
                        break;
                    case"animation":
                        break;
                    case"rtlEnabled":
                        this._toggleRTLDirection(i);
                        break;
                    default:
                        this.callBase(t)
                    }
            }, toggle: function(t) {
                if (t = t === i ? !this.option("visible") : t, t === this.option("visible"))
                    return n.Deferred().resolve().promise();
                var r = n.Deferred();
                return this._animateDeferred = r, this.option("visible", t), r.promise().done(n.proxy(function() {
                    delete this._animateDeferred
                }, this))
            }, show: function() {
                return this.toggle(!0)
            }, hide: function() {
                return this.toggle(!1)
            }, content: function() {
                return this._$content
            }, repaint: function() {
                this._renderGeometry()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, f = "dx-toast", r = f + "-", e = r + "wrapper", o = r + "content", s = r + "message", h = r + "icon", c = "dxToast", l = ["info", "warning", "error", "success"], a = [], v = 9e3, y = {top: {my: "top", at: "top", of: window, offset: "0 0"}, bottom: {my: "bottom", at: "bottom", of: window, offset: "0 -20"}, center: {my: "center", at: "center", of: window, offset: "0 0"}, right: {my: "center right", at: "center right", of: window, offset: "0 0"}, left: {my: "center left", at: "center left", of: window, offset: "0 0"}};
        t.registerComponent(c, u, u.dxOverlay.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({message: "", type: "info", displayTime: 2e3, position: "bottom center", animation: {show: {type: "fade", duration: 400, from: 0, to: 1}, hide: {type: "fade", duration: 400, to: 0}}, shading: !1, height: "auto"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {position: "top center", width: function() {
                                return n(window).width()
                            }}}])
            }, _init: function() {
                this.callBase(), this._posStringToObject()
            }, _renderContentImpl: function() {
                this.option("message") && (this._message = n("<div>").addClass(s).text(this.option("message")).appendTo(this.content())), n.inArray(this.option("type").toLowerCase(), l) > -1 && this.content().prepend(n("<div>").addClass(h)), this.callBase()
            }, _render: function() {
                this.callBase(), this.element().addClass(f), this._wrapper().addClass(e), this._$content.addClass(r + String(this.option("type")).toLowerCase()), this.content().addClass(o)
            }, _posStringToObject: function() {
                if (t.utils.isString(this.option("position"))) {
                    var r = this.option("position").split(" ")[0], i = this.option("position").split(" ")[1];
                    this.option("position", n.extend({}, y[r]));
                    switch (i) {
                        case"center":
                        case"left":
                        case"right":
                            this.option("position").at += " " + i, this.option("position").my += " " + i
                        }
                }
            }, _show: function() {
                return this.callBase.apply(this, arguments).done(n.proxy(function() {
                    clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(n.proxy(function() {
                        this.hide()
                    }, this), this.option("displayTime"))
                }, this))
            }, _zIndexStack: function() {
                return a
            }, _zIndexInitValue: function() {
                return v
            }, _dispose: function() {
                clearTimeout(this._hideTimeout), this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"type":
                        this._$content.removeClass(r + n.previousValue), this._$content.addClass(r + String(n.value).toLowerCase());
                        break;
                    case"message":
                        this._message && this._message.text(n.value);
                        break;
                    case"displayTime":
                    case"position":
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, p = r.events, h = t.translator, u = "dx-popup", c = "dx-popup-wrapper", f = "dx-popup-fullscreen", l = "dx-popup-content", a = "dx-popup-draggable", e = "dx-popup-title", v = "dx-closebutton", w = "dx-popup-title-has-button", o = "dx-popup-bottom", s = ["close", "cancel", "clear", "done"], y = function(n) {
            if (n === "close")
                return{toolbar: "top", location: "after"};
            var i = t.devices.current(), u = "bottom", r = "before";
            if (i.ios)
                switch (n) {
                    case"cancel":
                        u = "top";
                        break;
                    case"clear":
                        u = "top", r = "after";
                        break;
                    case"done":
                        r = "after"
                }
            else if (i.android && i.version && parseInt(i.version[0]) > 4)
                switch (n) {
                    case"cancel":
                        r = "after";
                        break;
                    case"done":
                        r = "after"
                }
            else
                (i.android || i.tizen) && (r = "center");
            return{toolbar: u, location: r}
        };
        t.registerComponent("dxPopup", r, r.dxOverlay.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({fullScreen: !1, title: "", showTitle: !0, titleTemplate: "title", onTitleRendered: null, dragEnabled: !1, buttons: [], bottomTemplate: "bottom"})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {width: function() {
                                return n(window).width()
                            }}}, {device: {platform: "win8", phone: !0}, options: {position: {my: "top center", at: "top center", of: window, offset: "0 0"}}}, {device: {platform: "ios"}, options: {animation: this._iosAnimation}}, {device: function(n) {
                            return t.devices.real().platform === "generic" && n.platform === "generic"
                        }, options: {dragEnabled: !0}}, {device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _iosAnimation: {show: {type: "slide", duration: 400, from: {position: {my: "top", at: "bottom", of: window}}, to: {position: {my: "center", at: "center", of: window}}}, hide: {type: "slide", duration: 400, from: {opacity: 1, position: {my: "center", at: "center", of: window}}, to: {opacity: 1, position: {my: "top", at: "bottom", of: window}}}}, _init: function() {
                this.callBase(), this._$popupContent = this._$content.wrapInner(n("<div>").addClass(l)).children().eq(0)
            }, _render: function() {
                this.element().addClass(u), this._wrapper().addClass(c), this._$content.toggleClass(a, this.option("dragEnabled")).toggleClass(f, this.option("fullScreen")), this.callBase()
            }, _renderContentImpl: function() {
                this._renderTitle(), this._renderBottom(), this.callBase()
            }, _renderTitle: function() {
                var r, i;
                this.option("showTitle") ? (r = this._getToolbarItems("top"), r.unshift({location: t.devices.current().ios ? "center" : "before", text: this.option("title")}), this._$title && this._$title.remove(), this._$title = n("<div>").addClass(e).prependTo(this._$content), i = this._getTemplateByOption("titleTemplate").render(r, this._$title), i.length && (this._$title.replaceWith(i.addClass(e)), this._$title = i), this._executeTitleRenderAction(this._$title)) : this._$title && this._$title.detach()
            }, _executeTitleRenderAction: function(n) {
                this._getTitleRenderAction()({titleElement: n})
            }, _getTitleRenderAction: function() {
                return this._titleRenderAction || this._createTitleRenderAction()
            }, _createTitleRenderAction: function() {
                return this._titleRenderAction = this._createActionByOption("onTitleRendered", {element: this.element(), excludeValidators: ["designMode", "disabled"]})
            }, _getToolbarItems: function(i) {
                var e = this.option("buttons"), r = [], u, f;
                return this._buttonsClasses = [], u = t.devices.current(), f = 0, n.each(e, n.proxy(function(e, o) {
                    var h = t.utils.isDefined(o.shortcut), s = h ? y(o.shortcut) : o, c;
                    h && u.ios && f < 2 && (s.toolbar = "top", f++), s && s.toolbar === i && (h && n.extend(s, {location: o.location}, this._getButtonByAlias(o)), c = u.win8, o.shortcut === "done" && c || o.shortcut === "cancel" && !c ? r.unshift(s) : r.push(s))
                }, this)), r
            }, _getButtonByAlias: function(i) {
                var r = i.shortcut, f, e, o;
                return n.inArray(r, s) < 0 ? !1 : (f = {}, r !== "close" ? (e = u + "-" + r, n.extend(f, {text: Globalize.localize(t.inflector.camelize(r, !0))}, t.utils.isDefined(i.options) ? i.options : {}), this._buttonsClasses.push(e)) : e = v, n.extend(f, {onClick: this._createButtonAction(i.onClick)}), o = n("<div>").addClass(e).dxButton(f), {template: function(n, t, i) {
                        i.append(o)
                    }})
            }, _createButtonAction: function(n) {
                return this._createAction(n, {afterExecute: function(n) {
                        n.component.hide()
                    }})
            }, _renderBottom: function() {
                var i = this._getToolbarItems("bottom"), t;
                i.length ? (this._$bottom && this._$bottom.remove(), this._$bottom = n("<div>").addClass(o).appendTo(this._$content), t = this._getTemplateByOption("bottomTemplate").render(i, this._$bottom), t.length && (this._$bottom.replaceWith(t.addClass(o)), this._$bottom = t), this._toggleClasses()) : this._$bottom && this._$bottom.detach()
            }, _toggleClasses: function() {
                var t = s.slice(1);
                n.each(t, n.proxy(function(t, i) {
                    var r = u + "-" + i;
                    n.inArray(r, this._buttonsClasses) >= 0 ? (this._wrapper().addClass(r + "-visible"), this._$bottom.addClass(r)) : (this._wrapper().removeClass(r + "-visible"), this._$bottom.removeClass(r))
                }, this))
            }, _getDragTarget: function() {
                return this._$title
            }, _renderGeometryImpl: function() {
                this.callBase.apply(this, arguments), this._setContentHeight()
            }, _renderDimensions: function() {
                this.option("fullScreen") ? this._$content.css({width: "100%", height: "100%"}) : this.callBase.apply(this, arguments)
            }, _renderShadingDimensions: function() {
                this.option("fullScreen") ? this._wrapper().css({width: "100%", height: "100%"}) : this.callBase.apply(this, arguments)
            }, _renderPosition: function() {
                this.option("fullScreen") ? h.move(this._$content, {top: 0, left: 0}) : this.callBase.apply(this, arguments)
            }, _setContentHeight: function() {
                var n, t;
                this._$popupContent && (n = this._$content.height(), this._$title && (n -= this._$title.outerHeight(!0) || 0), this._$bottom && (t = this._$bottom.outerHeight(!0) || 0, n -= t, this._$popupContent.css("margin-bottom", t)), this.option("height") === "auto" ? this._$popupContent.css("height", "auto") : n > 0 && this._$popupContent.css("height", n))
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"showTitle":
                    case"title":
                    case"titleTemplate":
                        this._renderTitle(), this._setContentHeight();
                        break;
                    case"bottomTemplate":
                        this._renderBottom(), this._setContentHeight();
                        break;
                    case"onTitleRendered":
                        this._createTitleRenderAction(n.value);
                        break;
                    case"buttons":
                        this._renderTitle(), this._renderBottom(), this._setContentHeight();
                        break;
                    case"dragEnabled":
                        this._renderDrag();
                        break;
                    case"height":
                        this.callBase(n), this._setContentHeight();
                        break;
                    case"fullScreen":
                        this._$content.toggleClass(f, n.value), this._refresh();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, content: function() {
                return this._$popupContent
            }, overlayContent: function() {
                return this._$content
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, f = t.fx, e = "dx-popover", o = "dx-popover-wrapper", s = "dx-popover-arrow", h = "dx-popover-without-title", c = {left: "right", top: "bottom", right: "left", bottom: "top"}, l = {top: {my: "bottom center", at: "top center"}, bottom: {my: "top center", at: "bottom center"}, right: {my: "left center", at: "right center"}, left: {my: "right center", at: "left center"}, topNone: {my: "bottom center", at: "top center", collision: "none"}, bottomNone: {my: "top center", at: "bottom center", collision: "none"}, rightNone: {my: "left center", at: "right center", collision: "none"}, leftNone: {my: "right center", at: "left center", collision: "none"}}, a = "10 10", u = {top: "0 -1", bottom: "0 1", left: "-1 0", right: "1 0"};
        t.registerComponent("dxPopover", r, r.dxPopup.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({target: window, shading: !1, position: "bottom", closeOnOutsideClick: !0, animation: {show: {type: "fade", from: 0, to: 1}, hide: {type: "fade", to: 0}}, showTitle: !1, width: "auto", height: "auto", dragEnabled: !1, fullScreen: !1, closeOnTargetScroll: !0, arrowPosition: null})
            }, _defaultOptionsRules: function() {
                return[]
            }, _render: function() {
                this.element().addClass(e), this._wrapper().addClass(o), this._renderArrow(), this.callBase()
            }, _renderArrow: function() {
                this._$arrow = n("<div>").addClass(s).appendTo(this._wrapper())
            }, _setContentHeight: function(n) {
                n && this.callBase()
            }, _updateContentSize: function(n) {
                var t, r, u, i;
                this._$popupContent && (t = this._position.at.split(" ")[0], n.h.oversize > 0 && (t === "left" || t === "right") && (r = this._$content.width() - n.h.oversize, this._$content.width(r)), n.v.oversize > 0 && (t === "top" || t === "bottom") && (u = this._$title ? this._$title.outerHeight() : 0, i = this._$content.height() - n.v.oversize, this._$content.height(i), this._$popupContent.outerHeight(i - u)))
            }, _documentDownHandler: function(n) {
                this._isOutsideClick(n) && this.callBase(n)
            }, _isOutsideClick: function(t) {
                return!n(t.target).closest(this.option("target")).length
            }, _animate: function(i) {
                i && t.fx.animate(this._$arrow, n.extend({}, i, {complete: n.noop})), i && i.to && n.extend(i.to, {position: this._contentPosition}), this.callBase.apply(this, arguments)
            }, _stopAnimation: function() {
                this.callBase.apply(this, arguments), f.stop(this._$arrow)
            }, _renderTitle: function() {
                this._wrapper().toggleClass(h, !this.option("showTitle")), this.callBase()
            }, _isPopoverLargerThanTarget: function() {
                var u = this._position.at.split(" ")[0], r = n(this._position.of), t, i;
                switch (u) {
                    case"top":
                    case"bottom":
                        t = this._$content.width(), i = r.outerWidth() + this._$arrow.width();
                        break;
                    case"left":
                    case"right":
                        t = this._$content.height(), i = r.outerHeight() + this._$arrow.height()
                }
                return t > i / 2
            }, _renderPosition: function() {
                this.callBase(), this._renderOverlayPosition(), this._renderArrowPosition()
            }, _renderOverlayPosition: function() {
                var e;
                this._setContentHeight(!0), this._togglePositionClass("dx-position-" + this._positionAlias), t.translator.move(this._$arrow, {left: 0, top: 0}), t.translator.move(this._$content, {left: 0, top: 0});
                var i = n.extend({}, this._position), o = n.extend({}, i, {offset: this._$arrow.width() + " " + this._$arrow.height()}), r = t.calculatePosition(this._$content, o), u = r.v.flip, f = r.h.flip;
                this._updateContentSize(r), this._position.collision === "flip" && (i.collision = "fit"), e = "dx-position-" + (u || f ? c[this._positionAlias] : this._positionAlias), this._togglePositionClass(e), (u || f) && n.extend(i, {my: i.at, at: i.my}), i.offset = this._updateContentOffset(u, f, i.offset), t.position(this._$content, i), this._contentPosition = i
            }, _renderArrowPosition: function() {
                var f = this._getDefaultArrowPosition(), i = this.option("arrowPosition"), o;
                if (i) {
                    var e = this._contentPosition.at.split(" ")[0], r = i.at, s = r && r.split(" ")[0] === e;
                    s && (i.at = i.my, i.my = r), o = this._mergeOffsets(u[e], i.offset), n.extend(f, i, {of: this._$content, offset: o})
                }
                t.position(this._$arrow, f)
            }, _getDefaultArrowPosition: function() {
                var f = this._isPopoverLargerThanTarget(), r = this._contentPosition.my.split(" ")[0], i = this._contentPosition.at.split(" ")[0], t;
                return t = f ? {my: r, at: i, of: n(this.option("target"))} : {my: i, at: r, of: this._$content, offset: u[i]}, t.my += " center", t.at += " center", t
            }, _mergeOffsets: function(n, t) {
                if (!t)
                    return n;
                var i = this._getOffsetObject(n), r = this._getOffsetObject(t);
                return i.h + r.h + " " + (i.v + r.v)
            }, _renderShadingPosition: function() {
                this.option("shading") && this._$wrapper.css({top: 0, left: 0})
            }, _renderShadingDimensions: function() {
                this.option("shading") && this._$wrapper.css({width: "100%", height: "100%"})
            }, _togglePositionClass: function(n) {
                this._$wrapper.removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom"), this._$wrapper.addClass(n)
            }, _normalizePosition: function() {
                var i = this.option("position");
                t.utils.isString(i) && (i = n.extend({}, l[i])), i.of || (i.of = this.option("target")), i.collision || (i.collision = "flip"), i.boundaryOffset || (i.boundaryOffset = a), this._positionAlias = i.at.split(" ")[0], this._position = i
            }, _getOffsetObject: function(n) {
                return t.utils.stringPairToObject(n)
            }, _updateContentOffset: function(n, t, i) {
                var r = this._positionAlias, u = this._getOffsetObject(i), f = t ? -1 : 1, e = n ? -1 : 1, o = r === "top" && !n || r === "bottom" && n, s = r === "bottom" && !n || r === "top" && n, h = r === "left" && !t || r === "right" && t, c = r === "right" && !t || r === "left" && t;
                return o ? u.h + " " + (u.v * e - (this._$arrow.height() - 1)) : s ? u.h + " " + (u.v * e + (this._$arrow.height() - 1)) : h ? u.h * f - (this._$arrow.width() - 1) + " " + u.v : c ? u.h * f + (this._$arrow.width() - 1) + " " + u.v : void 0
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"showTitle":
                    case"title":
                    case"titleTemplate":
                        this.callBase(n), this._normalizePosition(), this._renderPosition();
                        break;
                    case"target":
                        this._normalizePosition(), this._renderPosition();
                        break;
                    case"arrowPosition":
                        this._renderArrowPosition();
                        break;
                    case"fullScreen":
                        n.value && this.option("fullScreen", !1);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, u = "dx-tooltip", f = u + "-wrapper", e = [], o = 500;
        t.registerComponent("dxTooltip", r, r.dxPopover.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({showTitle: !1, title: i, titleTemplate: i, bottomTemplate: i})
            }, _render: function() {
                this.element().addClass(u), this._wrapper().addClass(f), this.callBase()
            }, _zIndexStack: function() {
                return e
            }, _zIndexInitValue: function() {
                return o
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var u = function() {
            return["year", "day", "month", "day"]
        }, r = t.ui.dateUtils = {SUPPORTED_FORMATS: ["date", "time", "datetime"], DEFAULT_FORMATTER: function(n) {
                return n
            }, DATE_COMPONENT_TEXT_FORMATTER: function(t, i) {
                var r = n("<div>").addClass("dx-dateview-formatter-container");
                return n("<span>").text(t).addClass("dx-dateview-value-formatter").appendTo(r), n("<span>").text(i).addClass("dx-dateview-name-formatter").appendTo(r), r
            }, ONE_MINUTE: 6e4, ONE_DAY: 864e5, TEN_YEARS: 31536e7, FORMATS_INFO: {date: {standardPattern: "yyyy-MM-dd", components: u()}, time: {standardPattern: "HH:mm", components: ["hours", "minutes"]}, datetime: {standardPattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss'Z'", components: u().concat(["hours", "minutes", "seconds", "milliseconds"])}, "datetime-local": {standardPattern: "yyyy'-'MM'-'dd'T'HH':'mm", components: u().concat(["hours", "minutes", "seconds"])}}, FORMATS_MAP: {date: "d", time: "t", datetime: "S", "datetime-local": "f"}, toStandardDateFormat: function(n, t, i) {
                i = i || r.FORMATS_INFO[t].standardPattern;
                var u = r.FORMATS_INFO[t].standardPattern;
                return Globalize.format(n, i)
            }, fromStandardDateFormat: function(n) {
                return Globalize.parseDate(n, r.FORMATS_INFO.datetime.standardPattern) || Globalize.parseDate(n, r.FORMATS_INFO["datetime-local"].standardPattern) || Globalize.parseDate(n, r.FORMATS_INFO.time.standardPattern) || Globalize.parseDate(n, r.FORMATS_INFO.date.standardPattern) || Date.parse && Date.parse(n) && new Date(Date.parse(n))
            }, getMaxMonthDay: function(n, t) {
                return new Date(n, t + 1, 0).getDate()
            }, mergeDates: function(t, u, f) {
                if (!u)
                    return i;
                isNaN(t.getTime()) && (t = new Date(0, 0, 0, 0, 0, 0));
                var e = r.FORMATS_INFO[f];
                return n.each(e.components, function() {
                    var n = r.DATE_COMPONENTS_INFO[this];
                    t[n.setter](u[n.getter]())
                }), t
            }, getLongestCaptionIndex: function(n) {
                for (var i = 0, r = 0, t = 0; t < n.length; ++t)
                    n[t].length > r && (i = t, r = n[t].length);
                return i
            }, expandPattern: function(n) {
                return n.length === 1 ? Globalize.culture().calendar.patterns[n] : n
            }, formatUsesMonthName: function(n) {
                return r.expandPattern(n).indexOf("MMMM") !== -1
            }, formatUsesDayName: function(n) {
                return r.expandPattern(n).indexOf("dddd") !== -1
            }, getLongestDate: function(n, t, i) {
                var u = new Date(1888, r.formatUsesMonthName(n) ? r.getLongestCaptionIndex(t) : 9, 21, 23, 59, 59, 999);
                return r.formatUsesDayName(n) && u.setDate(u.getDate() - u.getDay() + r.getLongestCaptionIndex(i)), u
            }, calculateMaximumDateFormatWidth: function(t, i, u) {
                if (!u || n(u).is(":visible")) {
                    var e, o = 2, f = n("<div>" + Globalize.format(r.getLongestDate(t, Globalize.culture().calendar.months.names, Globalize.culture().calendar.days.names), t) + "<\/div>").css({visibility: "hidden", "white-space": "nowrap", position: "absolute", float: "left"});
                    return i && f.css(i), f.appendTo(u ? n(u) : n("body")), e = f.width() + o, f.remove(), e
                }
            }};
        r.DATE_COMPONENTS_INFO = {year: {getter: "getFullYear", setter: "setFullYear", possibleFormats: ["yy", "yyyy"], formatter: r.DEFAULT_FORMATTER, startValue: i, endValue: i}, day: {getter: "getDate", setter: "setDate", possibleFormats: ["d", "dd"], formatter: function(n, t, i) {
                    if (!t)
                        return n;
                    var u = new Date(i.getTime());
                    return u.setDate(n), r.DATE_COMPONENT_TEXT_FORMATTER(n, Globalize.culture().calendar.days.names[u.getDay()])
                }, startValue: 1, endValue: i}, month: {getter: "getMonth", setter: "setMonth", possibleFormats: ["M", "MM", "MMM", "MMMM"], formatter: function(n, t) {
                    var i = Globalize.culture().calendar.months.names[n];
                    return t ? r.DATE_COMPONENT_TEXT_FORMATTER(n + 1, i) : i
                }, startValue: 0, endValue: 11}, hours: {getter: "getHours", setter: "setHours", possibleFormats: ["H", "HH", "h", "hh"], formatter: function(n) {
                    return Globalize.format(new Date(0, 0, 0, n), "HH")
                }, startValue: 0, endValue: 23}, minutes: {getter: "getMinutes", setter: "setMinutes", possibleFormats: ["m", "mm"], formatter: function(n) {
                    return Globalize.format(new Date(0, 0, 0, 0, n), "mm")
                }, startValue: 0, endValue: 59}, seconds: {getter: "getSeconds", setter: "setSeconds", possibleFormats: ["s", "ss"], formatter: function(n) {
                    return Globalize.format(new Date(0, 0, 0, 0, 0, n), "ss")
                }, startValue: 0, endValue: 59}, milliseconds: {getter: "getMilliseconds", setter: "setMilliseconds", possibleFormats: ["f", "ff", "fff"], formatter: function(n) {
                    return Globalize.format(new Date(0, 0, 0, 0, 0, 0, n), "fff")
                }, startValue: 0, endValue: 999}}, function() {
            var t = "yyyy'-'MM'-'dd'T'HH':'mm'Z'", i = n("<input>").attr("type", "datetime");
            i.val(r.toStandardDateFormat(new Date, "datetime", t)), i.val() || (r.FORMATS_INFO.datetime.standardPattern = t)
        }()
    }(jQuery, DevExpress), function(n, t, i) {
        var s = t.ui, f = t.fx, ot = t.support, l = s.events, r = t.utils, u = "dx-calendar", b = u + "-body", o = u + "-navigator", k = u + "-other-month", a = u + "-cell", d = u + "-empty-cell", v = u + "-disabled-navigator-link", g = u + "-today", y = u + "-selected-date", p = u + "-contoured-date", nt = o + "-previous-year", tt = o + "-previous-month", it = o + "-next-month", rt = o + "-next-year", h = "dxCalendar.MonthView.ValueChanged", c = "dxCalendar.MonthView.ContouredDateChanged", w = l.addNamespace("dxclick", "dxCalendar"), st = l.addNamespace("blur", "dxCalendar"), ut = 300, e = {LEFT: -1, RIGHT: 1}, ft = t.Class.inherit({ctor: function(n) {
                this.date = n.date || new Date, this.rtl = n.rtl
            }, render: function(t) {
                this.rootElement = n(t), this.renderCore()
            }, renderCore: n.noop}), et = {MonthView: ft.inherit({ctor: function(n) {
                    n = n || {}, this.callBase(n), this.firstDayOfWeek = n.firstDayOfWeek || 0, n.keyDownProcessor && !n.disabled && (this.keyDownProcessor = n.keyDownProcessor.reinitialize(this.keyDownHandler, this)), n.contouredDate && (this.contouredDate = this.calculateContouredDate(n.contouredDate, n.value)), this.weeks = 6, this.days = 7, this.initialValue = n.value, this.value = new Date(n.value), this.value.valueOf() || (this.value = new Date(0, 0, 0, 0, 0, 0)), this.keyboardNavigationUsed = n.keyboardNavigationUsed, this.min = n.min, this.max = n.max, this.disabled = n.disabled
                }, dispose: function() {
                    this.keyDownProcessor && this.keyDownProcessor.dispose(), this.table.remove()
                }, detachKeyDownProcessor: function() {
                    var n = this.keyDownProcessor;
                    return this.keyDownProcessor = i, n
                }, renderCore: function() {
                    var t = this;
                    if (this.table = n("<table>"), this.renderHeader(), this.renderBody(), this.setValue(this.initialValue), !this.disabled)
                        this.table.off(w).on(w, "td", function(n) {
                            t.cellClickHandler(n)
                        });
                    this.keyDownProcessor || this.disabled || (this.keyDownProcessor = new s.KeyboardProcessor({element: this.table, handler: this.keyDownHandler, context: this})), this.setContouredDate(this.contouredDate, !0), this.rootElement.append(this.table)
                }, renderHeader: function() {
                    var t = this, i = n("<thead>").appendTo(this.table), r = n("<tr>").appendTo(i);
                    this.iterateDays(function(i) {
                        n("<th>").text(t.getDayCaption(t.firstDayOfWeek + i)).appendTo(r)
                    })
                }, renderBody: function() {
                    for (var i = this, o = n("<tbody>").appendTo(this.table), f, t, e = new Date, u = 0; u < this.weeks; ++u)
                        f = n("<tr>").appendTo(o), this.iterateDays(function(o) {
                            t = i.getDate(u, o), n("<td>").appendTo(f).addClass(a).toggleClass(g, r.sameMonthAndYear(t, e) && t.getDate() === e.getDate()).toggleClass(d, !r.dateInRange(t, i.min, i.max)).toggleClass(k, t.getMonth() !== i.date.getMonth()).attr("data-value", i.getShortDate(t)).text(t.getDate())
                        })
                }, getDayCaption: function(n) {
                    return n = n < 7 ? n : Math.abs(n % 7), Globalize.culture().calendar.days.namesShort[n]
                }, getNavigatorCaption: function() {
                    var n = Globalize.culture().calendar.months.names[this.date.getMonth()], t = this.date.getFullYear();
                    return this.rtl ? t + " " + n : n + " " + t
                }, getDate: function(n, t) {
                    var i = r.getFirstMonthDate(this.date), f = i.getDay() - this.firstDayOfWeek, u = 7 * n - f;
                    return u = f < 0 ? u - 7 : u, i.setDate(i.getDate() + u + t), i
                }, getShortDate: function(n) {
                    return n.getFullYear() + "/" + n.getMonth() + "/" + n.getDate()
                }, getDateFromShortDate: function(n) {
                    var t = n.split("/");
                    return new Date(t[0], t[1], t[2])
                }, iterateDays: function(n) {
                    for (var t = this.rtl ? this.days - 1 : 0; this.rtl?t >= 0:t < this.days; )
                        n(t), this.rtl ? --t : ++t
                }, cellClickHandler: function(t) {
                    var i = this.getDateFromShortDate(n(t.target).attr("data-value"));
                    r.dateInRange(i, this.min, this.max) && this.setValue(i, t.target)
                }, keyDownHandler: function(n) {
                    var t, i;
                    switch (n.key) {
                        case"leftArrow":
                            this.keyboardNavigationUsed = !0, t = this.rtl ? 1 : -1;
                            break;
                        case"rightArrow":
                            this.keyboardNavigationUsed = !0, t = this.rtl ? -1 : 1;
                            break;
                        case"upArrow":
                            this.keyboardNavigationUsed = !0, t = -7;
                            break;
                        case"downArrow":
                            this.keyboardNavigationUsed = !0, t = 7;
                            break;
                        case"enter":
                            this.keyboardNavigationUsed = !0, this.contouredDate && this.setValue(this.contouredDate, this.tryGetCell(this.contouredDate));
                            return;
                        default:
                            return
                    }
                    n.originalEvent.stopPropagation(), n.originalEvent.stopImmediatePropagation(), n.originalEvent.preventDefault(), i = this.calculateContouredDate(this.contouredDate, this.value), this.setContouredDate(new Date(i.getFullYear(), i.getMonth(), i.getDate() + t))
                }, calculateContouredDate: function(n, t) {
                    var i;
                    return r.sameMonthAndYear(n, this.date) && (i = n), !i && r.sameMonthAndYear(t, this.date) && (i = t), i || r.getFirstMonthDate(this.date)
                }, setContouredDate: function(n, t) {
                    if (this.keyboardNavigationUsed) {
                        n = r.normalizeDate(n, this.min, this.max);
                        var i;
                        this.contouredDate && (i = this.tryGetCell(this.contouredDate), i && i.removeClass(p)), this.contouredDate = n, i = this.tryGetCell(this.contouredDate), i && i.addClass(p), t || this.table.trigger(c, n)
                    }
                }, setValue: function(n, t) {
                    if (n && this.value !== n) {
                        this.value.setYear(n.getFullYear()), this.value.setDate(n.getDate()), this.value.setMonth(n.getMonth()), this.value.setDate(n.getDate());
                        this.onValueChanged(new Date(this.value), t)
                    }
                }, tryGetCell: function(n) {
                    var t = n ? this.table.find("td[data-value='" + this.getShortDate(n) + "']") : [];
                    return t.length > 0 ? t : i
                }, onValueChanged: function(t, i) {
                    n(this.selectedCell).removeClass(y), this.selectedCell = i || this.tryGetCell(t), n(this.selectedCell).addClass(y), i && (this.setContouredDate(t), this.rootElement.trigger(h, t))
                }})};
        t.registerComponent("dxCalendar", s, s.Editor.inherit({_activeStateUnit: "." + a, _supportedKeys: function() {
                var t = this.option("rtlEnabled");
                return n.extend(this.callBase(), {rightArrow: function(n) {
                        if (n.ctrlKey)
                            this._navigate(t ? -1 : 1);
                        else
                            return!0
                    }, leftArrow: function(n) {
                        if (n.ctrlKey)
                            this._navigate(t ? 1 : -1);
                        else
                            return!0
                    }, pageUp: function() {
                        this._navigate(-1)
                    }, pageDown: function() {
                        this._navigate(1)
                    }, tab: n.noop})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({monthViewType: et.MonthView, firstDayOfWeek: 1, min: i, max: i})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0, hoverStateEnabled: !0}}])
            }, _initOptions: function(n) {
                n.currentDate = r.normalizeDate(n.currentDate || n.value || new Date, n.min, n.max), this.callBase(n)
            }, _clean: function() {
                this.callBase(), this._view && this._view.dispose()
            }, _refresh: function() {
                this._cleanFocusState(), this._render()
            }, _render: function() {
                this.callBase(), this._view && (this._view.detachKeyDownProcessor(), this._view.dispose()), this.element().addClass(u), this._initView()
            }, _initView: function() {
                this._view = this._initializeMonthView(), this._renderNavigator(), this._renderBody(), this._renderMonthView(), this._renderSwipeable()
            }, _renderBody: function() {
                this._body || (this._body = n("<div />").addClass(b), this.element().append(this._body))
            }, _renderSwipeable: function() {
                var n = this;
                this._swipeable || (this._swipeable = this.element().dxSwipeable({elastic: !1, onStart: function(t) {
                        n._swipeStartHandler(t)
                    }, onUpdated: function(t) {
                        n._swipeUpdateHandler(t)
                    }, onEnd: function(t) {
                        n._swipeEndHandler(t)
                    }, itemWidthFunc: function() {
                        return this.element().width()
                    }}).dxSwipeable("instance"))
            }, _focusTarget: function() {
                return this.element()
            }, _focusOutHandler: function() {
                this.callBase.apply(this, arguments), this._view.setContouredDate(i)
            }, _attachKeyboardEvents: function() {
                this.callBase.apply(this, arguments), this._oldView = this._view, this._viewKeyboardProcessor = this._oldView ? this._keyboardProcessor.push(this._oldView.detachKeyDownProcessor()) : this._keyboardProcessor.attachChildProcessor()
            }, _swipeStartHandler: function(n) {
                if (this._viewsAnimating) {
                    n.jQueryEvent.cancel = !0;
                    return
                }
                this._swipeInProgress = !0, this._viewsOnLeft = [this._view], this._viewsOnRight = [this._view]
            }, _swipeUpdateHandler: function(n) {
                n.jQueryEvent.offset - this._swipeOffset > 1 ? this._swipeOffset += 1 : this._swipeOffset = n.jQueryEvent.offset, this._swipeOffset >= 0 ? this._renderViews(this._viewsOnLeft, e.RIGHT) : this._renderViews(this._viewsOnRight, e.LEFT)
            }, _renderViews: function(n, t) {
                var i = Math.ceil(t * this._swipeOffset), r = -t * i;
                this._initalizeViewDimensions(), n[i] || (this._generateNewDate(r), this._initView(), n[i] = this._view), this._translateViews(n, t)
            }, _translateViews: function(n, i) {
                var r = n[Math.floor(i * this._swipeOffset)], f = n[Math.ceil(i * this._swipeOffset)], u = this._swipeOffset % 1;
                this._normalizeViewsPosition(), t.translator.move(r.table, {left: u * this._viewWidth}), i * u >= .05 && t.translator.move(f.table, {left: (u - i) * this._viewWidth}), this._view = this._isInView(r, this._viewWidth / 2) ? r : f, this._renderNavigator()
            }, _normalizeViewsPosition: function() {
                for (var n = 0; n < this._viewsOnLeft.length; n++)
                    t.translator.move(this._viewsOnLeft[n].table, {left: -this._viewWidth});
                for (n = 0; n < this._viewsOnRight.length; n++)
                    t.translator.move(this._viewsOnRight[n].table, {left: this._viewWidth})
            }, _generateNewDate: function(n) {
                this._newDate = new Date(this.option("currentDate")), this._newDate.setMonth(this.option("currentDate").getMonth() + n)
            }, _swipeEndHandler: function(n) {
                var u = this, i = n.jQueryEvent.targetOffset, t, r;
                this._viewsAnimating = !0, t = !1, Math.abs(n.jQueryEvent.offset) < .5 && (i == 1 || i == -1) && (t = !0), r = this._alignViews(t), r.done(function() {
                    u._disposeViews()
                }), this._swipeInProgress = !1
            }, _alignViews: function(t) {
                this._animation = n.Deferred();
                var i, r;
                return this._swipeOffset = this._swipeOffset || 0, this._swipeOffset > 0 ? (i = this._viewsOnLeft[Math.floor(Math.abs(this._swipeOffset))], r = this._viewsOnLeft[Math.ceil(Math.abs(this._swipeOffset))]) : this._swipeOffset <= 0 && (i = this._viewsOnRight[Math.ceil(Math.abs(this._swipeOffset))], r = this._viewsOnRight[Math.floor(Math.abs(this._swipeOffset))]), this._isInView(i, this._viewWidth / 2) ? t ? this._arrangeViews(r, i, e.RIGHT) : this._arrangeViews(i, r, e.LEFT) : t ? this._arrangeViews(i, r, e.LEFT) : this._arrangeViews(r, i, e.RIGHT), this._animation.promise()
            }, _arrangeViews: function(n, t, i) {
                this._centerView(n), this._animateView(t, i * this._viewWidth)
            }, _disposeViews: function() {
                for (var n = 0; n < this._viewsOnLeft.length; n++)
                    this._viewsOnLeft[n] != this._view && (this._viewsOnLeft[n].detachKeyDownProcessor(), this._viewsOnLeft[n].dispose());
                for (n = 0; n < this._viewsOnRight.length; n++)
                    this._viewsOnRight[n] != this._view && (this._viewsOnRight[n].detachKeyDownProcessor(), this._viewsOnRight[n].dispose());
                this._viewsOnLeft = [], this._viewsOnRight = [], this.option("currentDate", this._view.date), this._viewsAnimating = !1
            }, _animateView: function(t, i) {
                var r = this;
                f.animate(n(t.table), {type: "slide", from: {left: n(t.table).position("left")}, to: {left: i}, duration: ut, complete: function() {
                        r._animation.resolve()
                    }})
            }, _centerView: function(n) {
                this._animateView(n, 0), this._view = n
            }, _isInView: function(t, i) {
                var r = n(t.table);
                if (i > r.position().left && i <= r.position().left + r.width())
                    return!0
            }, _initializeMonthView: function() {
                var n = this.option("monthViewType");
                return new n({date: this._swipeInProgress ? this._newDate : this.option("currentDate"), min: this.option("min"), max: this.option("max"), firstDayOfWeek: this.option("firstDayOfWeek"), value: this.option("value"), rtl: this.option("rtlEnabled"), disabled: this.option("disabled") || DevExpress.designMode, keyDownProcessor: this._viewKeyboardProcessor, contouredDate: this._oldView ? this._oldView.contouredDate : i, keyboardNavigationUsed: this._oldView ? this._oldView.keyboardNavigationUsed : i})
            }, _renderNavigator: function() {
                var t = this, i = this.option("rtlEnabled") ? 12 : -12, r = this.option("rtlEnabled") ? 1 : -1, u = this.option("rtlEnabled") ? -1 : 1, f = this.option("rtlEnabled") ? -12 : 12;
                this._navigator ? this._navigatorCaption.html(this._view.getNavigatorCaption()) : (this._previousYearLink = n("<a>").dxButton({focusStateEnabled: !1, onClick: function() {
                        t._navigate(i)
                    }}).addClass(nt), this._previousMonthLink = n("<a>").dxButton({focusStateEnabled: !1, onClick: function() {
                        t._navigate(r)
                    }}).addClass(tt), this._navigatorCaption = n("<span />").html(this._view.getNavigatorCaption()), this._nextMonthLink = n("<a>").dxButton({focusStateEnabled: !1, onClick: function() {
                        t._navigate(u)
                    }}).addClass(it), this._nextYearLink = n("<a>").dxButton({focusStateEnabled: !1, onClick: function() {
                        t._navigate(f)
                    }}).addClass(rt), this._navigator = n("<div>").addClass(o).append(this._previousYearLink).append(this._previousMonthLink).append(this._navigatorCaption).append(this._nextMonthLink).append(this._nextYearLink), this.element().append(this._navigator)), this._applyNavigatorLinkVisibility(this._previousYearLink, i), this._applyNavigatorLinkVisibility(this._previousMonthLink, r), this._applyNavigatorLinkVisibility(this._nextMonthLink, u), this._applyNavigatorLinkVisibility(this._nextYearLink, f)
            }, _applyNavigatorLinkVisibility: function(n, t) {
                this._canNavigate(t) ? n.removeClass(v) : n.addClass(v)
            }, _renderMonthView: function() {
                var n = this, t;
                this._view.render(this._body[0]);
                this.element().off(h).on(h, function(t, i) {
                    n.option("value", i)
                });
                this.element().off(c).on(c, function(t, i) {
                    if (i && !r.sameMonthAndYear(n.option("currentDate"), i)) {
                        var u = r.getFirstMonthDate(i) - n.option("currentDate");
                        n._changeMonth(r.getFirstMonthDate(i), u)
                    }
                })
            }, _initalizeViewDimensions: function() {
                this._viewWidth = this._viewWidth || this._body.width(), this._viewHeight = this._viewHeight || this._body.height()
            }, _canNavigate: function(n) {
                var t = this.option("currentDate"), i = n < 0 ? new Date(t.getFullYear(), t.getMonth() + n + 1, 0) : new Date(t.getFullYear(), t.getMonth() + n, 1);
                return r.dateInRange(i, this.option("min"), this.option("max"))
            }, _navigate: function(n) {
                if (this._canNavigate(n)) {
                    var t = new Date(this.option("currentDate").getFullYear(), this.option("currentDate").getMonth() + n, 1);
                    this._changeMonth(t, n)
                }
            }, _changeMonth: function(n, t) {
                var i = this, r;
                f.isAnimating(this._view.table) && (this._stopCurrentAnimation(), this._prevView.detachKeyDownProcessor(), this._prevView.dispose()), this._prevView = this._view, this.option("currentDate", n), this._body.append(this._prevView.table), r = this._animateNavigation(t), r.done(function() {
                    i._prevView.detachKeyDownProcessor(), i._prevView.dispose()
                })
            }, _stopCurrentAnimation: function() {
                f.stop(n(this._prevView.table), !0), f.stop(n(this._view.table), !0)
            }, _animateNavigation: function(i) {
                this._animation = n.Deferred(), this._initalizeViewDimensions();
                var r = i < 0 ? -1 : 1;
                return t.translator.move(this._view.table, {left: r * this._viewWidth}), this._animateView(this._view, 0), this._animateView(this._prevView, -r * this._viewWidth), this._animation.promise()
            }, _stopAnimationCallback: function() {
                this._forceStopAnimation(), this._oldView.dispose(), this._oldView = i
            }, _forceStopAnimation: function() {
                this.animating && (f.stop(n(this._oldView.table), !0), f.stop(n(this._view.table), !0), this.animating = !1)
            }, _invalidate: function() {
                this._forceStopAnimation(), this.callBase()
            }, _optionChanged: function(n) {
                var t = n.value, i;
                switch (n.name) {
                    case"monthViewType":
                        break;
                    case"currentDate":
                        this._forceStopAnimation(), i = r.normalizeDate(t, this.option("min"), this.option("max")), this.option("currentDate", new Date(i.getFullYear(), i.getMonth(), 1));
                    case"min":
                    case"max":
                    case"firstDayOfWeek":
                        this._invalidate();
                        break;
                    case"value":
                        !t || r.sameMonthAndYear(this._view.date, t) ? (i = r.normalizeDate(t, this.option("min"), this.option("max")), this._view.setValue(i), this._view.value = new Date(t), this.option("value", i)) : this.option("currentDate", r.getFirstMonthDate(t));
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = t.browser, e = u.msie && u.version.split(".")[0] == 8, o = "dx-timeview", s = "dx-timeview-clock", h = "dx-timeview-field", c = "dx-timeview-hourarrow", l = "dx-timeview-minutearrow", f = function(n, t, i) {
            e ? a(n, t, i) : v(n, t, i)
        }, a = function(n, t, i) {
            var u, f, e, r;
            t = t / 180 * Math.PI, u = Math.sin(t), f = Math.cos(t), n.css("filter", "none"), e = n.width(), r = n.height(), n.css("filter", 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand", M11 = ' + f + ", M12 = " + -u + ", M21 = " + u + ", M22 = " + f + ")");
            var o = n.width(), s = n.height(), h = (o - e) / 2, c = (s - r) / 2;
            n.css("margin-left", -e / 2 + (r / 2 - i) * u - h), n.css("margin-top", r / 2 - (r / 2 - i) * f - c)
        }, v = function(n, t, i) {
            n.css("transform", "rotate(" + t + "deg) translate(0," + i + "px)")
        };
        t.registerComponent("dxTimeView", r, r.Editor.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({value: new Date(n.now()), _arrowOffset: 0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function(n) {
                            return n.platform === "ios" && n.version[0] < 7
                        }, options: {_arrowOffset: 30}}, {device: {platform: "android"}, options: {_arrowOffset: 15}}, {device: {platform: "generic"}, options: {_arrowOffset: 5}}])
            }, _getValue: function() {
                return this.option("value") || new Date
            }, _init: function() {
                this.callBase(), this.element().addClass(o)
            }, _render: function() {
                this.callBase(), this._renderBox(), this._updateTime()
            }, _renderBox: function() {
                n("<div>").appendTo(this.element()).dxBox({height: "100%", width: "100%", direction: "col", items: [{ratio: 1, name: "clock"}, {ratio: 0, baseSize: 50, name: "field"}], itemTemplate: n.proxy(this._boxItemTemplate, this)})
            }, _boxItemTemplate: function(n, t, i) {
                n.name === "clock" ? this._renderClock(i) : this._renderField(i)
            }, _renderClock: function(t) {
                return this._$hourArrow = n("<div>").addClass(c), this._$minuteArrow = n("<div>").addClass(l), t.addClass(s).append(this._$hourArrow).append(this._$minuteArrow)
            }, _updateClock: function() {
                var n = this._getValue(), t = n.getHours() * 30 + n.getMinutes() / 2, i = n.getMinutes() * 6;
                f(this._$hourArrow, t, this.option("_arrowOffset")), f(this._$minuteArrow, i, this.option("_arrowOffset"))
            }, _renderField: function(t) {
                t.addClass(h).dxBox({direction: "row", align: "center", crossAlign: "center", items: [{ratio: 0, baseSize: "auto", name: "hour"}, {ratio: 0, baseSize: "auto", name: "separator"}, {ratio: 0, baseSize: "auto", name: "minute"}], itemTemplate: n.proxy(this._fieldBoxItemTemplate, this)})
            }, _fieldBoxItemTemplate: function(n, t, i) {
                n.name === "hour" && (this._createHourBox(), i.append(this._hourBox.element())), n.name === "separator" && i.text(Globalize.culture().calendar[":"]), n.name === "minute" && (this._createMinuteBox(), i.append(this._minuteBox.element()))
            }, _createHourBox: function() {
                this._hourBox = n("<div>").dxNumberBox(n.extend({min: -1, max: 24, value: this._getValue().getHours(), onValueChanged: n.proxy(function(n) {
                        var i = (24 + n.value) % 24, t;
                        this._hourBox.option("value", i), t = new Date(this._getValue()), t.setHours(i), this.option("value", t)
                    }, this)}, this._getNumberBoxConfig())).dxNumberBox("instance")
            }, _createMinuteBox: function() {
                this._minuteBox = n("<div>").dxNumberBox(n.extend({min: -1, max: 60, value: this._getValue().getMinutes(), onValueChanged: n.proxy(function(n) {
                        var i = (60 + n.value) % 60, t;
                        this._minuteBox.option("value", i), t = new Date(this._getValue()), t.setMinutes(i), this.option("value", t)
                    }, this)}, this._getNumberBoxConfig())).dxNumberBox("instance")
            }, _getNumberBoxConfig: function() {
                return{width: 70, showSpinButtons: !0}
            }, _updateField: function() {
                this._hourBox.option("value", this._getValue().getHours()), this._minuteBox.option("value", this._getValue().getMinutes())
            }, _updateTime: function() {
                this._updateClock(), this._updateField()
            }, _visibilityChanged: function(n) {
                n && this._updateTime()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"value":
                        this._updateTime(), this.callBase(n);
                        break;
                    case"_arrowOffset":
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var i = t.ui, e = i.events, r = i.dateUtils, o = "dx-dateview", s = "dx-dateview-wrapper", h = "dx-dateview-rollers", f = "dx-dateview-roller", c = "dx-state-active", l = "dx-dateview-roller-current", u = "dx-dateview-item", a = "dx-dateview-item-selected", v = "dx-dateview-item-selected-frame", y = "dx-dateview-item-selected-border", p = "dx-dateview-button-up", w = "dx-dateview-button-down";
        t.registerComponent("dxDatePickerRoller", i, i.dxScrollable.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({clickableItems: !1, showScrollbar: !1, useNative: !1, selectedIndex: 0, bounceEnabled: !1, items: []})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {clickableItems: !0}}, {device: {platform: "generic"}, options: {scrollByContent: !0}}])
            }, _init: function() {
                this.callBase(), this._renderSelectedItemFrame(), this._renderControlButtons()
            }, _render: function() {
                this.callBase(), n.each(this._strategy._scrollers, function(t, i) {
                    i._correctLocation = n.noop
                }), this.element().addClass(f), this._renderItems(), this._renderSelectedValue(), this._renderItemsClick(), this._wrapAction("_endAction", n.proxy(this._endActionHandler, this))
            }, _wrapAction: function(n, t) {
                var i = this._strategy, r = i[n];
                i[n] = function() {
                    return t.apply(this, arguments), r.apply(this, arguments)
                }
            }, _renderItems: function() {
                var i = this.option("items") || [], t = n();
                this._$content.empty(), n.each(i, function() {
                    t = t.add(n("<div>").addClass(u).append(this))
                }), this._$content.append(t), this._$items = t, this.update()
            }, _renderSelectedItemFrame: function() {
                n("<div>").addClass(v).append(n("<div>").addClass(y)).appendTo(this._$container)
            }, _renderControlButtons: function() {
                n("<div>").addClass(p).insertAfter(this._$container).dxButton({onClick: n.proxy(this._upButtonClickHandler, this)}), n("<div>").addClass(w).insertAfter(this._$container).dxButton({onClick: n.proxy(this._downButtonClickHandler, this)})
            }, _renderSelectedValue: function(n) {
                n === undefined && (n = this.option("selectedIndex")), n = this._fitIndex(n);
                var t = this._getItemPosition(n);
                this.option().selectedIndex = n, this._moveTo({top: t}), this._renderActiveStateItem()
            }, _fitIndex: function(n) {
                var i = this.option("items") || [], t = i.length;
                return n >= t ? t - 1 : n < 0 ? 0 : n
            }, _renderItemsClick: function() {
                var t = "." + u, i = e.addNamespace("dxclick", this.NAME);
                if (this.element().off(i, t), this.option("clickableItems"))
                    this.element().on(i, t, n.proxy(this._itemClickHandler, this))
            }, _itemClickHandler: function(n) {
                this._renderSelectedValue(this._itemElementIndex(this._closestItemElement(n)))
            }, _itemElementIndex: function(n) {
                return this._itemElements().index(n)
            }, _closestItemElement: function(n) {
                return n.currentTarget
            }, _itemElements: function() {
                return this.element().find("." + u)
            }, _renderActiveStateItem: function() {
                var t = this.option("selectedIndex");
                n.each(this._$items, function(i) {
                    n(this).toggleClass(a, t === i)
                })
            }, _upButtonClickHandler: function() {
                this._animation = !0, this.option("selectedIndex", this.option("selectedIndex") - 1)
            }, _downButtonClickHandler: function() {
                this._animation = !0, this.option("selectedIndex", this.option("selectedIndex") + 1)
            }, _getItemPosition: function(n) {
                return Math.round(this._itemHeight() * n)
            }, _moveTo: function(n) {
                n = this._normalizeLocation(n);
                var r = this._location(), i = {x: -(r.left - n.left), y: -(r.top - n.top)};
                this._isVisible() && (i.x || i.y) && (this._strategy._prepareDirections(!0), this._animation ? (t.fx.stop(this._$content), t.fx.animate(this._$content, {duration: 200, type: "slide", to: {top: n.top}}), delete this._animation) : this._strategy.handleMove({delta: i}))
            }, _validate: function(n) {
                return this._strategy.validate(n)
            }, _endActionHandler: function() {
                if (this._changedByIndex) {
                    this._changedByIndex = !1, this._renderSelectedValue();
                    return
                }
                var n = -this._location().top / this._itemHeight(), t = Math.round(n);
                this._animation = !0, this._renderSelectedValue(t)
            }, _itemHeight: function() {
                var n = this._$items.first();
                return n.outerHeight() + parseFloat(n.css("margin-top") || 0)
            }, _toggleActive: function(n) {
                this.element().toggleClass(c, n)
            }, _isVisible: function() {
                return this._$container.is(":visible")
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"selectedIndex":
                        this._renderSelectedValue(), this._changedByIndex = !0, this._strategy.update(), this._strategy.handleEnd({velocity: {x: 0, y: 0}});
                        break;
                    case"items":
                        this._renderItems(), this._renderSelectedValue();
                        break;
                    case"clickableItems":
                        this._renderItemsClick();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}), i), t.registerComponent("dxDateView", i, i.Editor.inherit({_valueOption: function() {
                return new Date(this.option("value")) == "Invalid Date" ? new Date : new Date(this.option("value"))
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({minDate: new Date(1), maxDate: new Date(n.now() + r.TEN_YEARS), format: "date", value: new Date, culture: Globalize.culture().name, activeStateEnabled: !0, showNames: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {showNames: !0}}])
            }, _render: function() {
                this._value = this._valueOption(), this.callBase(), this.element().addClass(o)
            }, _wrapper: function() {
                return this._$wrapper
            }, _renderContentImpl: function() {
                this._$wrapper = n("<div />").appendTo(this.element()).addClass(s), this._renderRollers()
            }, _renderRollers: function() {
                var t = this;
                t._$rollersContainer || (t._$rollersContainer = n("<div>").appendTo(t._wrapper()).addClass(h)), t._$rollersContainer.empty(), t._createRollerConfigs(), t._rollers = {}, n.each(t._rollerConfigs, function(i) {
                    var r = n("<div>").appendTo(t._$rollersContainer).addClass(f + "-" + t._rollerConfigs[i].type).dxDatePickerRoller({items: t._rollerConfigs[i].displayItems, selectedIndex: t._rollerConfigs[i].selectedIndex, showScrollbar: !1, onStart: function(n) {
                            var r = n.component;
                            r._toggleActive(!0), t._setActiveRoller(t._rollerConfigs[i], r.option("selectedIndex"))
                        }, onEnd: function(n) {
                            var r = n.component;
                            t._setRollerState(t._rollerConfigs[i], r.option("selectedIndex")), r._toggleActive(!1)
                        }});
                    t._rollers[t._rollerConfigs[i].type] = r.dxDatePickerRoller("instance")
                })
            }, _setActiveRoller: function(t) {
                var i = t && this._rollers[t.type];
                n.each(this._rollers, function() {
                    this._$element.toggleClass(l, this === i)
                })
            }, _refreshRollers: function() {
                var t = this;
                n.each(this._rollers, function(n) {
                    var i = t._rollerConfigs[n].getIndex(t._value);
                    this.update(), this._renderSelectedValue(i)
                })
            }, _setRollerState: function(n, t) {
                if (t !== n.selectedIndex) {
                    var u = n.valueItems[t], f = n.setValue, i = this._value.getDate();
                    n.type === "month" ? (i = Math.min(i, r.getMaxMonthDay(this._value.getFullYear(), u)), this._value.setDate(i)) : n.type === "year" && (i = Math.min(i, r.getMaxMonthDay(u, this._value.getMonth())), this._value.setDate(i)), this._value[f](u), n.selectedIndex = t
                }
                n.type === "year" && (this._refreshMonthRoller(), this._refreshDayRoller()), n.type === "month" && this._refreshDayRoller()
            }, _refreshMonthRoller: function() {
                var t = this._rollers.month, n;
                t && (this._createRollerConfig("month"), n = this._rollerConfigs.month, this._deferredRenderMonthTimeout = window.setTimeout(function() {
                    n.displayItems.length !== t.option("items").length && t.option({items: n.displayItems, selectedIndex: n.selectedIndex})
                }, 100))
            }, _refreshDayRoller: function() {
                var t = this._rollers.day, n;
                t && (this._createRollerConfig("day"), n = this._rollerConfigs.day, this._deferredRenderDayTimeout = window.setTimeout(function() {
                    n.displayItems.length !== t.option("items").length && t.option({items: n.displayItems, selectedIndex: n.selectedIndex})
                }, 100))
            }, _createRollerConfigs: function(t) {
                var i = this;
                t = t || i.option("format"), i._rollerConfigs = {}, n.each(i._getFormatPattern(t).split(/\W+/), function(t, u) {
                    n.each(r.DATE_COMPONENTS_INFO, function(t, r) {
                        n.inArray(u, r.possibleFormats) > -1 && i._createRollerConfig(t)
                    })
                })
            }, _getFormatPattern: function(n) {
                var t = Globalize.culture(this.option("culture")), i = "";
                return n === "date" ? i = t.calendar.patterns.d : n === "time" ? i = t.calendar.patterns.t : n === "datetime" && (i = [t.calendar.patterns.d, t.calendar.patterns.t].join(" ")), i
            }, _createRollerConfig: function(n) {
                for (var u = r.DATE_COMPONENTS_INFO[n], f = this._calculateRollerConfigValueRange(n), e = f.startValue, o = f.endValue, s = u.formatter, h = this.option("showNames"), c = this._value, t = {type: n, setValue: u.setter, valueItems: [], displayItems: [], getIndex: function(n) {
                        return n[u.getter]() - e
                    }}, i = e; i <= o; i++)
                    t.valueItems.push(i), t.displayItems.push(s(i, h, c));
                t.selectedIndex = t.getIndex(this._value), this._rollerConfigs[n] = t
            }, _calculateRollerConfigValueRange: function(n) {
                var t = this._value, i = this.option("minDate"), u = this.option("maxDate"), s = t.getFullYear() === i.getFullYear(), c = s && t.getMonth() === i.getMonth(), o = t.getFullYear() === u.getFullYear(), l = o && t.getMonth() === u.getMonth(), h = r.DATE_COMPONENTS_INFO[n], e = h.startValue, f = h.endValue;
                return n === "year" && (e = i.getFullYear(), f = u.getFullYear()), n === "month" && (s && (e = i.getMonth()), o && (f = u.getMonth())), n === "day" && (f = r.getMaxMonthDay(t.getFullYear(), t.getMonth()), c && (e = i.getDate()), o && (f = u.getDate())), {startValue: e, endValue: f}
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"showNames":
                    case"minDate":
                    case"maxDate":
                    case"culture":
                    case"format":
                        this._renderRollers();
                        break;
                    case"visible":
                        this.callBase(n), n.value && (this._refreshRollers(), this._setActiveRoller());
                        break;
                    case"value":
                        this._value = this._valueOption(), this._renderRollers();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _clean: function() {
                this.callBase(), delete this._$rollersContainer
            }, _dispose: function() {
                clearTimeout(this._deferredRenderDayTimeout), clearTimeout(this._deferredRenderMonthTimeout), this.callBase()
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, f = t.support, u = t.devices, e = r.dateUtils, o = t.utils, s = "dx-datebox", h = "dx-datebox-overlay", c = 10, l = function(n) {
            var t = n[0].style.width;
            return t && t !== "auto" && t !== "inherit" ? !0 : !1
        }, a = function(t, i, r) {
            var u = n("<div>").text(t).css({"font-style": i.css("font-style"), "font-variant": i.css("font-variant"), "font-weight": i.css("font-weight"), "font-size": i.css("font-size"), "font-family": i.css("font-family"), "letter-spacing": i.css("letter-spacing"), "padding-left": i.css("padding-left"), "padding-right": i.css("padding-right"), border: i.css("border"), visibility: "hidden", "white-space": "nowrap", position: "absolute", float: "left"}), f;
            return u.appendTo(r), f = u.outerWidth() + c, u.remove(), f
        };
        t.registerComponent("dxDateBox", r, r.dxDropDownEditor.inherit({ctor: function(n, t) {
                var o, f, e;
                t = t || {}, o = u.current().platform === "generic", f = t && t.useCalendar, f === i && (f = o), e = f ? "Calendar" : "DateView", f && t.format === "datetime" && (e = "CalendarWithTime"), f && t.format === "time" && (e = "Time"), this._strategy = new r.dxDateBox.renderStrategies[e](this), this.callBase(n, t)
            }, _supportedKeys: function() {
                return this._strategy._supportedKeys()
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({format: "date", value: new Date, min: i, max: i, useCalendar: !1, useNative: !0, openOnFieldClick: !0}), this._strategy._setDefaultOptions()
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "generic"}, options: {useCalendar: !0}}].concat(this._strategy._defaultOptionsRules()))
            }, _init: function() {
                this.callBase(), this._strategy._initFormat()
            }, _attachKeyboardEvents: function() {
                this.callBase.apply(this, arguments), this._strategy._attachKeyboardEvents()
            }, _render: function() {
                this.element().addClass(s), this.callBase(), this._strategy._render(), this._updateSize()
            }, _popupShowingHandler: function() {
                this.callBase(), this._strategy._popupShowingHandler()
            }, _popupConfig: function() {
                return this._strategy._popupConfig()
            }, _renderPopup: function() {
                this._$popup.addClass(h), this.callBase()
            }, _renderPopupContent: function() {
                this._strategy._renderPopupContent()
            }, _popupHiddenHandler: function() {
                this.callBase(), this._strategy._popupHiddenHandler()
            }, _visibilityChanged: function(n) {
                n && this._updateSize()
            }, _updateSize: function() {
                var n = this.element(), r = this.option("width") || l(n), f = n.is(":visible"), o = this.option("useCalendar") && u.current().platform === "generic";
                if (!r && o && f) {
                    var s = this._input(), t = Globalize.culture().calendar, i = this.option("formatString"), h = Globalize.format(e.getLongestDate(i, t.months.names, t.days.names), i);
                    n.width(a(h, s, this.element()))
                }
            }, _usingNativeDatePicker: function() {
                return f.inputType(this.option("mode")) && this.option("useNative")
            }, _readOnlyPropValue: function() {
                return this._usingNativeDatePicker() ? this.callBase() : !0
            }, _valueChangeEventHandler: function() {
                this._strategy._valueChangeEventHandler.apply(this._strategy, arguments)
            }, _renderValue: function() {
                this._strategy._renderValue()
            }, _renderProps: function() {
                this.callBase(), this._input().attr("autocomplete", "off")
            }, _renderOpenedState: function() {
                this._isNativeView() || this.callBase(), this._strategy._renderOpenedState()
            }, _isNativeView: function() {
                return this.option("useNative") && !this.option("useCalendar")
            }, _renderPlaceholder: function() {
                this.callBase(), this._strategy._renderPlaceholder()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"format":
                        this._strategy._initFormat(), this._renderValue();
                        break;
                    case"placeholder":
                        this._renderPlaceholder();
                        break;
                    case"readOnly":
                    case"min":
                    case"max":
                    case"interval":
                    case"formatString":
                    case"calendarOptions":
                    case"useNative":
                        this._invalidate();
                        break;
                    case"type":
                        throw t.Error("E1020");
                        break;
                    case"useCalendar":
                    case"formatWidthCalculator":
                    case"closeOnValueChange":
                        break;
                    case"value":
                        var i = n.value;
                        i && this.option("useCalendar") && (i = o.normalizeDate(i, this.option("min"), this.option("max")), this.option("value", i)), this.callBase.apply(this, arguments);
                        break;
                    default:
                        this.callBase.apply(this, arguments)
                    }
            }})), r.dxDateBox.renderStrategies = {}
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, o = t.utils, s = r.events, h = r.dateUtils, u = "dx-calendar-picker", f = "dx-calendar-picker-calendar-container", e = "dx-calendar-picker-overlay", c = "dx-calendar-picker-input-wrapper", l = "dx-calendar-picker-input-wider-than-calendar-container";
        r.dxDateBox.renderStrategies.Calendar = t.Class.inherit({ctor: function(n) {
                this.dateBox = n
            }, _supportedKeys: function() {
                return n.extend(this.dateBox.callBase(), {tab: function() {
                        this.close()
                    }, rightArrow: function() {
                        if (this.option("opened"))
                            return!0
                    }, leftArrow: function() {
                        if (this.option("opened"))
                            return!0
                    }})
            }, _setDefaultOptions: function() {
                this.dateBox.option({formatString: Globalize.culture().calendar.patterns.d, closeOnValueChange: !0})
            }, _defaultOptionsRules: function() {
                return[{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}]
            }, _render: function() {
                this.dateBox.element().addClass(u)
            }, _attachKeyboardEvents: function() {
                this._calendarKeyboardProcessor = this.dateBox._keyboardProcessor.attachChildProcessor()
            }, _renderPopupContent: function() {
                this.dateBox.callBase(), this.dateBox._popup._wrapper().addClass(e), this.dateBox._calendarContainer = n("<div>").addClass(f), this.dateBox._calendar = this.dateBox._calendarContainer.dxCalendar(n.extend(this.dateBox.option("calendarOptions"), {value: this.dateBox.option("value"), rtlEnabled: this.dateBox.option("rtlEnabled"), _keyboardProcessor: this._calendarKeyboardProcessor, min: this.dateBox.option("min"), max: this.dateBox.option("max")})).dxCalendar("instance"), this.dateBox._calendarContainer.appendTo(this._calenderContainer())
            }, _calenderContainer: function() {
                return this.dateBox._popup.content()
            }, _popupConfig: function() {
                return this.dateBox.callBase()
            }, _popupShowingHandler: function() {
            }, _popupHiddenHandler: function() {
            }, _renderOpenedState: function() {
                if (this.dateBox.option("opened"))
                    this.dateBox._calendar.off("valueChanged").on("valueChanged", n.proxy(function(n) {
                        this.dateBox.option("value", n.value)
                    }, this))
            }, _initFormat: function() {
            }, _renderPlaceholder: function() {
            }, _renderValue: function(n) {
                var t = this, i = n || this.dateBox.option("value");
                this.dateBox._calendar && this.dateBox._calendar.option("value", i), this.dateBox.option("opened") && this.dateBox.option("closeOnValueChange") && setTimeout(function() {
                    t.dateBox.option("opened", !1)
                }, 50), this.dateBox.callBase(Globalize.format(this.dateBox.option("value"), this.dateBox.option("formatString")))
            }, _valueChangeEventHandler: function(n) {
                this.dateBox._suppressUpdateValue();
                var i = Globalize.parseDate(this.dateBox._input().val(), this.dateBox.option("formatString"));
                this.dateBox.callBase(n, i), this.dateBox._resumeUpdateValue()
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, e = t.utils, o = r.events, s = r.dateUtils, h = "dx-calendar-picker", c = "dx-calendar-picker-calendar-container", l = "dx-calendar-picker-overlay", a = "dx-calendar-picker-input-wrapper", v = "dx-calendar-picker-input-wider-than-calendar-container", u = "dx-calendar-with-time-picker", f = "dx-calendar-with-time-picker-container";
        r.dxDateBox.renderStrategies.CalendarWithTime = r.dxDateBox.renderStrategies.Calendar.inherit({_setDefaultOptions: function() {
                this.callBase(), this.dateBox.option({formatString: Globalize.culture().calendar.patterns.d + " " + Globalize.culture().calendar.patterns.t, closeOnValueChange: !1})
            }, _renderPopupContent: function() {
                this.dateBox.element().addClass(u), n("<div>").appendTo(this.dateBox._popup.content()).addClass(f).dxBox({direction: "row", crossAlign: "center", items: [{ratio: 0, baseSize: "auto", name: "calendar"}, {ratio: 0, baseSize: "auto", name: "time"}], itemTemplate: n.proxy(function(t, i, r) {
                        t.name === "calendar" && (this._$calendarContainer = r), t.name === "time" && (this._timeView = n("<div>").dxTimeView({value: this.dateBox.option("value"), onValueChanged: n.proxy(function(n) {
                                this.dateBox.option("value", n.value)
                            }, this)}).dxTimeView("instance"), r.append(this._timeView.element()))
                    }, this)}), this.callBase()
            }, _calenderContainer: function() {
                return this._$calendarContainer
            }, _renderValue: function(n) {
                this.callBase(n);
                var t = n || this.dateBox.option("value");
                this._timeView && this._timeView.option("value", t)
            }})
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = u.events, f = t.support, r = u.dateUtils;
        u.dxDateBox.renderStrategies.DateView = t.Class.inherit({ctor: function(n) {
                this.dateBox = n
            }, _popupShowingHandler: function() {
                this._renderDateView()
            }, _popupHiddenHandler: function() {
                this.dateBox.option("value", this.dateBox._dateView.option("value"))
            }, _setDefaultOptions: function() {
                this.dateBox.option({min: new Date(1), max: new Date(n.now() + r.TEN_YEARS)})
            }, _renderPopupContent: function() {
                this.dateBox.callBase()
            }, _popupConfig: function() {
                return{title: this._getDataPickerTitle(), buttons: [{shortcut: "done", onClick: n.proxy(function() {
                                this.dateBox.option("value", new Date(this.dateBox._dateView._value)), this.dateBox.close()
                            }, this)}, {shortcut: "cancel", onClick: n.proxy(function() {
                                this.dateBox._dateView._value = this.dateBox._dateView._valueOption(), this.dateBox.close()
                            }, this)}], defaultOptionsRules: [{device: {platform: "win8"}, options: {showNames: !0}}, {device: {platform: "win8", phone: !0}, options: {fullScreen: !0}}, {device: function(n) {
                                return n.platform !== "win8"
                            }, options: {width: 333, height: 331}}, {device: {platform: "generic"}, options: {width: "auto", height: "auto"}}, {device: {platform: "ios"}, options: {width: "auto", height: "auto"}}, {device: {platform: "ios", phone: !0}, options: {width: "100%", position: {my: "bottom", at: "bottom", of: window}}}]}
            }, _getDataPickerTitle: function() {
                var n = this.dateBox.option("placeholder"), t;
                return n || (t = this.dateBox.option("format"), t === "time" ? n = Globalize.localize("dxDateBox-simulatedDataPickerTitleTime") : t === "date" ? n = Globalize.localize("dxDateBox-simulatedDataPickerTitleDate") : t === "datetime" && (n = Globalize.localize("dxDateBox-simulatedDataPickerTitleDateTime"))), n
            }, _renderOpenedState: n.noop, _renderValue: function() {
                var n = this.dateBox.option("mode"), i = r.FORMATS_MAP[n], u = f.inputType(n) ? !1 : Globalize.culture().calendar.patterns[i], t = r.toStandardDateFormat(this.dateBox.option("value"), n, u);
                this.dateBox._input().val(t), this.dateBox._togglePlaceholder(t === "" || t === null), this._renderDateView()
            }, _renderDateView: function() {
                if (this.dateBox._usingNativeDatePicker() || this.dateBox.option("readOnly")) {
                    this.dateBox._dateView && (this.dateBox._dateView.element().remove(), this.dateBox._dateView = null);
                    return
                }
                var i = {value: this.dateBox.option("value"), format: this.dateBox.option("format"), minDate: this.dateBox.option("min"), maxDate: this.dateBox.option("max")}, t = this.dateBox._popup;
                t && (this.dateBox._dateView ? (this.dateBox._dateView.option(i), this.dateBox._dateView._renderRollers()) : this.dateBox._dateView = n("<div>").appendTo(t.content()).dxDateView(n.extend(i, {onHiding: n.proxy(function(n) {
                        this.dateBox.option("value", n.component.option("value"))
                    }, this)})).dxDateView("instance"), t.option("title", this._getDataPickerTitle()))
            }, _valueChangeEventHandler: function() {
                var i = r.fromStandardDateFormat(this.dateBox._input().val()), n = new Date(this.dateBox.option("value") && this.dateBox.option("value").valueOf()), t = r.mergeDates(n, i, this.dateBox.option("mode"));
                this.dateBox.option({value: t}), t !== n && this._renderValue()
            }, _defaultOptionsRules: function() {
                return[{device: function() {
                            var r = t.devices.real(), n = r.platform, i = r.version;
                            return n === "generic" || n === "win8" || n === "android" && !(i[0] > 4 || i[0] == 4 && i[1] >= 4)
                        }, options: {useNative: !1}}]
            }, _render: function() {
            }, _renderPlaceholder: function() {
                this.dateBox._popup && this.dateBox._popup.option("title", this._getDataPickerTitle())
            }, _initFormat: function() {
                var t = this.dateBox.option("format");
                n.inArray(t, r.SUPPORTED_FORMATS) === -1 ? (t = "date", this.dateBox.option("format", t)) : t !== "datetime" || f.inputType(t) || (t = "datetime-local"), this.dateBox.option({mode: t, formatString: r.FORMATS_MAP[t]})
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, s = t.utils, h = r.events, u = r.dateUtils, f = "dx-timebox", e = "dx-timebox-list", o = "dx-timebox-popup-wrapper";
        r.dxDateBox.renderStrategies.Time = t.Class.inherit({ctor: function(n) {
                this.dateBox = n
            }, _supportedKeys: function() {
                return n.extend(this.dateBox.callBase(), {tab: function() {
                        this.option("opened") && this.close()
                    }, space: n.noop})
            }, _setDefaultOptions: function() {
                this.dateBox.option({formatString: Globalize.culture().calendar.patterns.t, closeOnValueChange: !0, interval: 30})
            }, _defaultOptionsRules: function() {
                return[{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}]
            }, _render: function() {
                this.dateBox.element().addClass(f)
            }, _renderPopupContent: function() {
                this.dateBox._popup._wrapper().addClass(o), this._renderList()
            }, _popupConfig: function() {
                return n.extend(this.dateBox.callBase(), {width: this.dateBox.element().outerWidth()})
            }, _popupShowingHandler: function() {
                this._dimensionChanged()
            }, _popupHiddenHandler: n.noop, _renderList: function() {
                this.dateBox._$timeList = n("<div>").addClass(e), this.dateBox._timeList = this.dateBox._$timeList.dxList(this._listConfig()).dxList("instance"), this._refreshItems(), this.dateBox._$timeList.appendTo(this.dateBox._popup.content())
            }, _refreshItems: function() {
                var n = this._getTimeListItems();
                this.dateBox._timeList.option("items", n)
            }, _getTimeListItems: function() {
                var i = this.dateBox.option("min") || new Date(0, 0, 0, 0, 0), f = this.dateBox.option("max") || new Date(0, 0, 0, 23, 59), e = this.dateBox.option("interval"), r = [], n = new Date(i), t = f - i;
                if (t < 0)
                    return[];
                for (t > u.ONE_DAY && (t = u.ONE_DAY); n - i < t; )
                    r.push(new Date(n)), n.setMinutes(n.getMinutes() + e);
                return r
            }, _listConfig: function() {
                return{rtlEnabled: this.dateBox.option("rtlEnabled"), itemTemplate: n.proxy(this._timeListItemTemplate, this), onItemClick: n.proxy(this._listItemClickHandler, this), focusStateEnabled: this.dateBox.option("focusStateEnabled"), tabIndex: -1}
            }, _timeListItemTemplate: function(n) {
                return Globalize.format(n, this.dateBox.option("formatString"))
            }, _listItemClickHandler: function(n) {
                this.dateBox.option("opened", !1), this.dateBox.option("value", n.itemData)
            }, _attachKeyboardEvents: function() {
                var t = this.dateBox._keyboardProcessor.attachChildProcessor(), i;
                if (this.dateBox._timeList) {
                    this.dateBox._timeList.option("_keyboardProcessor", t);
                    return
                }
                i = this._listConfig(), this._listConfig = function() {
                    return n.extend(i, {_keyboardProcessor: t})
                }
            }, _dimensionChanged: function() {
                this.dateBox._popup && this._updatePopupDimensions()
            }, _updatePopupDimensions: function() {
                this._updatePopupWidth(), this._updatePopupHeight()
            }, _updatePopupWidth: function() {
                this.dateBox._setPopupOption("width", this.dateBox.element().outerWidth())
            }, _updatePopupHeight: function() {
                this.dateBox._setPopupOption("height", "auto");
                var t = this.dateBox._popup.overlayContent().outerHeight(), i = n(window).height() * .45;
                this.dateBox._setPopupOption("height", Math.min(t, i)), this.dateBox._timeList && this.dateBox._timeList.updateDimensions()
            }, _renderOpenedState: n.noop, _initFormat: n.noop, _renderPlaceholder: n.noop, _renderValue: function() {
                this.dateBox.callBase(Globalize.format(this.dateBox.option("value"), this.dateBox.option("formatString")))
            }, _valueChangeEventHandler: function(n) {
                this.dateBox._suppressUpdateValue();
                var i = Globalize.parseDate(this.dateBox._input().val(), this.dateBox.option("formatString"));
                this.dateBox.callBase(n, i), this.dateBox._resumeUpdateValue()
            }})
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = "dx-loadindicator", o = "dx-loadindicator-wrapper", s = "dx-loadindicator-icon", f = "dx-loadindicator-segment", r = "dx-loadindicator-segment", h = "dx-loadindicator-win8-segment", c = "dx-loadindicator-win8-segment", l = "dx-loadindicator-win8-inner-segment", a = "dx-loadindicator-image";
        t.registerComponent("dxLoadIndicator", u, u.Widget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({indicatorSrc: "", hoverStateEnabled: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            var n = DevExpress.devices.real(), t = n.platform === "android" && !/chrome/i.test(navigator.userAgent);
                            return DevExpress.browser.msie && DevExpress.browser.version < 10 || t
                        }, options: {viaImage: !0}}])
            }, _init: function() {
                this.callBase(), this.element().addClass(e)
            }, _render: function() {
                this._renderWrapper(), this._renderMarkup(), this.callBase()
            }, _renderWrapper: function() {
                this._$wrapper = n("<div>").addClass(o), this.element().append(this._$wrapper)
            }, _renderMarkup: function() {
                !t.support.animation || this.option("viaImage") || this.option("indicatorSrc") ? this._renderMarkupForImage() : this._renderMarkupForAnimation()
            }, _renderMarkupForAnimation: function() {
                var t, u, i;
                for (this._$indicator = n("<div>").addClass(s), t = 15; t >= 0; --t)
                    i = n("<div>").addClass(f).addClass(r + t), this._$indicator.append(i);
                for (t = 1; t <= 5; ++t)
                    u = n("<div>").addClass(l), i = n("<div>").addClass(h).addClass(c + t), i.append(u), this._$indicator.append(i);
                this._$wrapper.append(this._$indicator)
            }, _renderMarkupForImage: function() {
                var n = this.option("indicatorSrc");
                this._$wrapper.addClass(a), n && this._$wrapper.css("background-image", "url(" + n + ")")
            }, _renderDimensions: function() {
                this.callBase(), this._updateContentSize()
            }, _updateContentSize: function() {
                var s = this.element(), i = this.option("width"), u = this.option("height"), n, e, o;
                (i || u) && (i = this.element().width(), u = this.element().height(), n = Math.min(u, i), this._$wrapper.css({height: n, width: n, "margin-top": (u - n) / 2, "margin-left": (i - n) / 2}), this._$indicator && (t.ui.themes.current().split(".")[0] === "android5" ? (e = this._$indicator.find("." + r + "2"), o = this._$indicator.find("." + r + "3"), e.css("border-width", .13 * n), o.css("border-width", .17 * n)) : this._$indicator.find("." + f).css("border-width", .125 * n)))
            }, _clean: function() {
                this.callBase(), this._removeMarkupForAnimation(), this._removeMarkupForImage()
            }, _removeMarkupForAnimation: function() {
                this._$indicator && this._$indicator.remove()
            }, _removeMarkupForImage: function() {
                this._$wrapper.css("background-image", "none")
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"indicatorSrc":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, e = "dx-loadpanel", o = "dx-loadpanel-wrapper", u = "dx-loadpanel-indicator", f = "dx-loadpanel-message", s = "dx-loadpanel-content", h = "dx-loadpanel-content-wrapper", c = "dx-loadpanel-pane-hidden";
        t.registerComponent("dxLoadPanel", r, r.dxOverlay.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({message: Globalize.localize("Loading"), width: 222, height: 90, animation: null, showIndicator: !0, indicatorSrc: "", showPane: !0, delay: 0, closeOnBackButton: !1})
            }, _init: function() {
                this.callBase.apply(this, arguments), this._$contentWrapper = n("<div>").addClass(h), this._$contentWrapper.appendTo(this._$content)
            }, _render: function() {
                this.callBase(), this.element().addClass(e), this._wrapper().addClass(o)
            }, _renderContentImpl: function() {
                this.callBase(), this.content().addClass(s), this._togglePaneVisible(), this._cleanPreviousContent(), this._renderLoadIndicator(), this._renderMessage()
            }, _show: function() {
                var i = this.option("delay"), t, r;
                return i ? (t = n.Deferred(), r = n.proxy(this.callBase, this), this._clearShowTimeout(), this._showTimeout = setTimeout(function() {
                    r().done(function() {
                        t.resolve()
                    })
                }, i), t.promise()) : this.callBase()
            }, _hide: function() {
                return this._clearShowTimeout(), this.callBase()
            }, _clearShowTimeout: function() {
                clearTimeout(this._showTimeout)
            }, _renderMessage: function() {
                var t = this.option("message"), i;
                t && (i = n("<div>").addClass(f).text(t), this._$contentWrapper.append(i))
            }, _renderLoadIndicator: function() {
                this.option("showIndicator") && (this._$indicator = n("<div>").addClass(u).dxLoadIndicator({indicatorSrc: this.option("indicatorSrc")}).appendTo(this._$contentWrapper))
            }, _cleanPreviousContent: function() {
                this.content().find("." + f).remove(), this.content().find("." + u).remove()
            }, _togglePaneVisible: function() {
                this.content().toggleClass(c, !this.option("showPane"))
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"delay":
                        break;
                    case"message":
                    case"showIndicator":
                        this._cleanPreviousContent(), this._renderLoadIndicator(), this._renderMessage();
                        break;
                    case"showPane":
                        this._togglePaneVisible();
                        break;
                    case"indicatorSrc":
                        this._$indicator && this._$indicator.dxLoadIndicator({indicatorSrc: this.option("indicatorSrc")});
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _dispose: function() {
                this._clearShowTimeout(), this.callBase()
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, e = t.utils, o = r.events, s = "dx-lookup", u = "dx-lookup-selected", h = "dx-lookup-search", c = "dx-lookup-search-wrapper", l = "dx-lookup-field", f = "dx-lookup-field-wrapper", a = "dx-lookup-popup", v = "dx-lookup-popup-wrapper", y = "dx-lookup-popup-search", p = "dx-lookup-popover-mode", w = "dx-lookup-empty", b = ".dx-list-item", k = "dxListItemData", g = 200, d = {popupWidth: "width", popupHeight: "height"};
        t.registerComponent("dxLookup", r, r.dxDropDownList.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {space: function() {
                        this._validatedOpening()
                    }, enter: function() {
                        this._validatedOpening()
                    }})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {minFilterLength: {since: "14.2", alias: "minSearchLength"}, scrollAction: {since: "14.2", alias: "onScroll"}, autoPagingEnabled: {since: "14.2", alias: "pagingEnabled"}, pullRefreshAction: {since: "14.2", alias: "onPullRefresh"}, pageLoadingAction: {since: "14.2", alias: "onPageLoading"}, contentReadyAction: {since: "14.2", alias: "onContentReady"}, titleRender: {since: "14.2", alias: "titleTemplate"}, groupRender: {since: "14.2", alias: "groupTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({title: "", titleTemplate: "title", onTitleRendered: null, placeholder: Globalize.localize("Select"), searchPlaceholder: Globalize.localize("Search"), searchEnabled: !0, noDataText: Globalize.localize("dxCollectionWidget-noDataText"), fullScreen: !1, showCancelButton: !0, cancelButtonText: Globalize.localize("Cancel"), showClearButton: !1, clearButtonText: Globalize.localize("Clear"), showDoneButton: !1, doneButtonText: Globalize.localize("Done"), popupWidth: function() {
                        return n(window).width() * .8
                    }, popupHeight: function() {
                        return n(window).height() * .8
                    }, shading: !0, closeOnOutsideClick: !1, position: i, animation: i, pullRefreshEnabled: !1, pagingEnabled: !0, useNativeScrolling: !0, pullingDownText: Globalize.localize("dxList-pullingDownText"), pulledDownText: Globalize.localize("dxList-pulledDownText"), refreshingText: Globalize.localize("dxList-refreshingText"), pageLoadingText: Globalize.localize("dxList-pageLoadingText"), onScroll: null, onPullRefresh: null, onPageLoading: null, showNextButton: !1, nextButtonText: Globalize.localize("dxList-nextButtonText"), grouped: !1, groupTemplate: "group", usePopover: !1, activeStateEnabled: !0, showDropButton: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return!t.support.nativeScrolling
                        }, options: {useNativeScrolling: !1}}, {device: function(n) {
                            return!t.support.nativeScrolling && !t.devices.isSimulator() && t.devices.real().platform === "generic" && n.platform === "generic"
                        }, options: {showNextButton: !0, pagingEnabled: !1}}, {device: {platform: "win8", phone: !0}, options: {showCancelButton: !1, fullScreen: !0}}, {device: {platform: "win8", phone: !1}, options: {popupWidth: function() {
                                return n(window).width()
                            }}}, {device: {platform: "ios", phone: !0}, options: {fullScreen: !0}}, {device: {platform: "ios", tablet: !0}, options: {popupWidth: function() {
                                return Math.min(n(window).width(), n(window).height()) * .4
                            }, popupHeight: function() {
                                return Math.min(n(window).width(), n(window).height()) * .4
                            }, usePopover: !0}}])
            }, _dataSourceOptions: function() {
                return n.extend(this.callBase(), {paginate: this.option("pagingEnabled") || this.option("showNextButton")})
            }, _inputWrapper: function() {
                return this.element().find("." + f)
            }, _render: function() {
                this.callBase(), this.element().addClass(s).toggleClass(p, this.option("usePopover"))
            }, _fireContentReadyAction: n.noop, _popupWrapperClass: function() {
                return""
            }, _renderInput: function() {
                var t = this._createAction(n.proxy(function() {
                    this._validatedOpening()
                }, this));
                this._$field = n("<div>").addClass(l).on(o.addNamespace("dxclick", this.NAME), function(n) {
                    t({jQueryEvent: n})
                }), this._$fieldWrapper = n("<div>").addClass(f).append(this._$field).appendTo(this.element())
            }, _renderPopup: function() {
                this.option("usePopover") && !this.option("fullScreen") ? this._renderPopover() : this.callBase(), this._$popup.addClass(a), this._popup._wrapper().addClass(v)
            }, _popupOptionMap: function(n) {
                return d[n] || n
            }, _renderPopover: function() {
                this._popup = this._$popup.dxPopover(n.extend(this._popupConfig(), {target: this.element(), fullScreen: !1, shading: !1, closeOnTargetScroll: !0, closeOnOutsideClick: !0})).dxPopover("instance");
                this._popup.on({showing: n.proxy(this._popupShowingHandler, this), shown: n.proxy(this._popupShownHandler, this), hiding: n.proxy(this._popupHidingHandler, this), hidden: n.proxy(this._popupHiddenHandler, this)});
                this._popup.option("onContentReady", n.proxy(this._contentReadyHandler, this)), this._contentReadyHandler()
            }, _popupConfig: function() {
                var t = n.extend(this.callBase(), {onShowing: null, showTitle: !0, title: this.option("title"), titleTemplate: this._getTemplateByOption("titleTemplate"), onTitleRendered: this.option("onTitleRendered"), buttons: this._getPopupButtonsConfig(), fullScreen: this.option("fullScreen"), shading: this.option("shading"), closeOnTargetScroll: !1, closeOnOutsideClick: this.option("closeOnOutsideClick")});
                return delete t.animation, delete t.position, n.each(["position", "animation", "popupWidth", "popupHeight"], n.proxy(function(n, r) {
                    this.option(r) !== i && (t[this._popupOptionMap(r)] = this.option(r))
                }, this)), t
            }, _renderPopupButtons: function() {
                this._setPopupOption("buttons", this._getPopupButtonsConfig())
            }, _getPopupButtonsConfig: function() {
                var t = [];
                return n.each(["Cancel", "Clear", "Done"], n.proxy(function(n, i) {
                    var r = this["_get" + i + "ButtonConfig"]();
                    r && t.push(r)
                }, this)), t
            }, _getCancelButtonConfig: function() {
                return this.option("showCancelButton") ? {shortcut: "cancel", onClick: n.proxy(this._cancelValue, this), options: {text: this.option("cancelButtonText")}} : null
            }, _getDoneButtonConfig: function() {
                return this.option("showDoneButton") ? {shortcut: "done", onClick: n.proxy(this._submitValue, this), options: {text: this.option("doneButtonText")}} : null
            }, _getClearButtonConfig: function() {
                return this.option("showClearButton") ? {shortcut: "clear", onClick: n.proxy(this._resetValue, this), options: {text: this.option("clearButtonText")}} : null
            }, _refreshPopupVisibility: n.noop, _dimensionChanged: n.noop, _input: function() {
                return this._$searchBox || this.callBase()
            }, _renderPopupContent: function() {
                this._renderSearch(), this.callBase()
            }, _renderSearch: function() {
                var i = this._$searchWrapper = n("<div>").addClass(c), u = this._$searchBox = n("<div>").addClass(h).appendTo(i), r = t.devices.current(), f = r.android && r.version[0] >= 5 ? "text" : "search";
                this._searchBox = u.dxTextBox({focusStateEnabled: this.option("focusStateEnabled"), mode: f, showClearButton: !0, valueChangeEvent: this.option("valueChangeEvent"), onValueChanged: n.proxy(this._search, this), rtlEnabled: this.option("rtlEnabled")}).dxTextBox("instance"), i.appendTo(this._popup.content()), this._renderSearchVisibility(), this._setSearchPlaceholder()
            }, _renderSearchVisibility: function() {
                if (this._popup) {
                    var n = this.option("searchEnabled");
                    this._popup._wrapper().toggleClass(y, n), this._$searchWrapper.toggle(n)
                }
            }, _setSearchPlaceholder: function() {
                if (this._$searchBox) {
                    var t = this.option("minSearchLength"), n = this.option("searchPlaceholder");
                    t && n === Globalize.localize("Search") && (n = e.stringFormat(Globalize.localize("dxLookup-searchPlaceholder"), t)), this._searchBox.option("placeholder", n)
                }
            }, _listConfig: function() {
                return n.extend(this.callBase(), {tabIndex: 0, grouped: this.option("grouped"), groupTemplate: this._getTemplateByOption("groupTemplate"), noDataText: this.option("noDataText"), pullRefreshEnabled: this.option("pullRefreshEnabled"), useNativeScrolling: this.option("useNativeScrolling"), pullingDownText: this.option("pullingDownText"), pulledDownText: this.option("pulledDownText"), refreshingText: this.option("refreshingText"), pageLoadingText: this.option("pageLoadingText"), onScroll: this.option("onScroll"), onPullRefresh: this.option("onPullRefresh"), onPageLoading: this.option("onPageLoading"), showNextButton: this.option("showNextButton"), nextButtonText: this.option("nextButtonText")})
            }, _setFocusPolicy: function() {
                this._$searchBox ? this._searchBox.focus() : this._$list.focus()
            }, _attachChildKeyboardEvents: n.noop, _focusTarget: function() {
                return this._$field
            }, _renderFocusTarget: function() {
                this._focusTarget().attr("tabindex", this.option("tabIndex"))
            }, _selectedItemClass: function() {
                return u
            }, _listItemClickHandler: function(n) {
                this._currentSelectedItem() === n.itemData && this._submitValue(), this._setCurrentSelectedClass(n.jQueryEvent.target), this.option("showDoneButton") || this._submitValue()
            }, _currentSelectedItem: function() {
                return this._listSelectedItemElements().data(k)
            }, _setCurrentSelectedClass: function(t) {
                this._listSelectedItemElements().removeClass(u), n(t).closest(b).addClass(u)
            }, _submitValue: function() {
                this.option("value", this._valueGetter(this._currentSelectedItem())), this.option("opened", !1)
            }, _resetValue: function() {
                this.option("value", i), this.option("opened", !1)
            }, _cancelValue: function() {
                this._refreshSelected(), this.option("opened", !1)
            }, _searchValue: function() {
                return this.option("searchEnabled") ? this._searchBox.option("value") : ""
            }, _renderValue: function() {
                return this.callBase().always(n.proxy(function() {
                    this._refreshField()
                }, this))
            }, _refreshField: function() {
                this._$field.text(this.option("displayValue")), this.element().toggleClass(w, !this.option("selectedItem"))
            }, _clean: function() {
                this._$fieldWrapper.remove(), this._$searchBox = null, this.callBase()
            }, _optionChanged: function(n) {
                var i = n.name, t = n.value;
                switch (i) {
                    case"searchEnabled":
                        this._renderSearchVisibility();
                        break;
                    case"searchPlaceholder":
                        this._setSearchPlaceholder();
                        break;
                    case"minSearchLength":
                        this._setSearchPlaceholder(), this.callBase.apply(this, arguments);
                        break;
                    case"title":
                    case"titleTemplate":
                    case"onTitleRendered":
                    case"shading":
                    case"animation":
                    case"position":
                    case"closeOnOutsideClick":
                        this._setPopupOption(i);
                        break;
                    case"fullScreen":
                    case"usePopover":
                        this._invalidate();
                        break;
                    case"clearButtonText":
                    case"showClearButton":
                    case"cancelButtonText":
                    case"showCancelButton":
                    case"doneButtonText":
                    case"showDoneButton":
                        this._renderPopupButtons();
                        break;
                    case"popupWidth":
                        this._setPopupOption("popupWidth", t === "auto" ? this.initialOption("popupWidth") : t);
                        break;
                    case"popupHeight":
                        this._setPopupOption("popupHeight", t === "auto" ? this.initialOption("popupHeight") : t);
                        break;
                    case"pullRefreshEnabled":
                    case"useNativeScrolling":
                    case"pullingDownText":
                    case"pulledDownText":
                    case"refreshingText":
                    case"pageLoadingText":
                    case"onScroll":
                    case"onPullRefresh":
                    case"onPageLoading":
                    case"showNextButton":
                    case"nextButtonText":
                    case"noDataText":
                    case"grouped":
                    case"groupTemplate":
                        this._setListOption(i);
                        break;
                    default:
                        this.callBase.apply(this, arguments)
                    }
            }, focus: function() {
                this.option("opened") ? this._setFocusPolicy() : this._focusTarget().focus()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, o = r.events, s = t.utils, u = "dx-autocomplete", f = "dx-autocomplete-popup-wrapper", e = "dx-autocomplete-selected", h = "dxListItemData";
        t.registerComponent("dxAutocomplete", r, r.dxDropDownList.inherit({_supportedKeys: function() {
                var t = this._list ? this._list._$focusedItem : null;
                return n.extend(this.callBase(), {upArrow: function(n) {
                        return(n.preventDefault(), n.stopPropagation(), t && !t.prev().length) ? (this._clearFocusedItem(), !1) : !0
                    }, downArrow: function(n) {
                        return(n.preventDefault(), n.stopPropagation(), t && !t.next().length) ? (this._clearFocusedItem(), !1) : !0
                    }, enter: function() {
                        return t || this.close(), !0
                    }})
            }, _setOptionAliases: function() {
                this.callBase(), n.extend(this._optionAliases, {displayExpr: "valueExpr"})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({minSearchLength: 1, maxItemCount: 10, showDropButton: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function(n) {
                            return n.android && n.version[0] == 5
                        }, options: {dropPosition: {offset: {v: -9, h: -16}}}}])
            }, _render: function() {
                this.callBase(), this.element().addClass(u)
            }, _loadValue: function() {
                return n.Deferred().resolve(this.option("value"))
            }, _popupConfig: function() {
                return n.extend(this.callBase(), {closeOnOutsideClick: n.proxy(function(t) {
                        return!n(t.target).closest(this.element()).length
                    }, this)})
            }, _renderDimensions: function() {
                this.callBase(), this._setPopupOption("width")
            }, _selectedItemClass: function() {
                return e
            }, _hasItemsToShow: function() {
                var n = this._dataSource && this._dataSource.items() || [], t = this.option("value"), i = this._displayGetter(n[0]) || "", r = i.length < (t || "").length;
                return this.callBase() && !r
            }, _popupWrapperClass: function() {
                return this.callBase() + " " + f
            }, _listConfig: function() {
                return n.extend(this.callBase(), {noDataText: "", showNextButton: !1, indicateLoading: !1})
            }, _listItemClickHandler: function(n) {
                var t = this._displayGetter(n.itemData);
                this.option("value", t), this.close(), this._input().blur()
            }, _refreshSelected: n.noop, _searchCanceled: function() {
                this.callBase(), this.close()
            }, _dataSourceOptions: function() {
                return{paginate: !0}
            }, _searchDataSource: function() {
                this._dataSource.pageSize(this.option("maxItemCount")), this.callBase(), this._clearFocusedItem()
            }, _clearFocusedItem: function() {
                var n = this._list;
                n && (n._removeFocusedItem(), delete n._$focusedItem, n.option("selectedIndex", -1))
            }, _valueChangeEventHandler: function() {
                var n = this.option("value");
                this.callBase.apply(this, arguments), n !== this.option("value") && this._search()
            }, _optionChanged: function(n) {
                n.name === "maxItemCount" ? this._searchDataSource() : this.callBase(n)
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, f = r.events, u = "dxSelectBox", o = "dx-selectbox", s = "dx-selectbox-popup", h = "dx-selectbox-selected", c = "dx-selectbox-container", l = "dx-selectbox-popup-wrapper", e = f.addNamespace("blur", u), a = f.addNamespace("dxclick", u), v = {"9": "tab", "13": "enter", "16": "shift", "17": "ctrl", "18": "alt", "27": "escape", "33": "pageUp", "34": "pageDown", "35": "end", "36": "home", "37": "leftArrow", "38": "upArrow", "39": "rightArrow", "40": "downArrow"};
        t.registerComponent(u, r, r.dxDropDownList.inherit({_supportedKeys: function() {
                var t = this.callBase();
                return n.extend(t, {enter: function(n) {
                        this._keyboardProcessor._childProcessors[0].process(n)
                    }})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({placeholder: Globalize.localize("Select"), fieldTemplate: null, valueChangeEvent: "keypress keyup", showSelectionControls: !1, editEnabled: !1, tooltipEnabled: !1, openOnFieldClick: !0, showDropButton: !0, displayCustomValue: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "win8"}, options: {dropPosition: {at: "left top", offset: {h: 0, v: 0}}}}, {device: function(n) {
                            return n.platform === "android" && n.version[0] == 5
                        }, options: {dropPosition: {my: "top left", at: "top left", offset: {h: -16, v: -8}}}}])
            }, _selectedItemClass: function() {
                return h
            }, _render: function() {
                this.callBase(), this.element().addClass(o), this._renderTooltip()
            }, _createPopup: function() {
                this.callBase(), this._popup.element().addClass(s)
            }, _popupWrapperClass: function() {
                return this.callBase() + " " + l
            }, _renderOpenedState: function() {
                this.callBase(), this.option("opened") && (this._updatePopupHeight(), this._list.scrollToItem(this._$list.find("." + this._selectedItemClass())))
            }, _renderValue: function() {
                return this.callBase().always(n.proxy(function() {
                    this._renderTooltip(), this._renderInputAddons()
                }, this))
            }, _setSelectedItem: function(n) {
                var t = this._displayValue(n);
                this.option("editEnabled") || this.option("displayCustomValue") || n || (n = this.option("selectedItem")), this.callBase(n), (this.option("editEnabled") || this.option("displayCustomValue")) && !t && this.option("displayValue", this.option("value"))
            }, _displayValue: function(n) {
                return n === i && this.option("editEnabled") ? this.option("value") : this.callBase(n)
            }, _listConfig: function() {
                var t = n.extend(this.callBase(), {showNextButton: !1});
                return this.option("showSelectionControls") && n.extend(t, {editEnabled: !0, selectionMode: "single", editConfig: {selectionEnabled: !0, selectionType: "item"}, onSelectionChanged: n.proxy(this._selectionChangeHandler, this)}), t
            }, _selectionChangeHandler: function(t) {
                n.each(t.addedItems || [], n.proxy(function(n, t) {
                    this._setValue(this._valueGetter(t))
                }, this))
            }, _toggleOpenState: function() {
                this.callBase.apply(this, arguments), this.option("opened") && (this.option("searchEnabled") || this.option("editEnabled")) && this._filterDataSource("")
            }, _renderTooltip: function() {
                this.element().prop("title", this.option("tooltipEnabled") ? this.option("displayValue") : "")
            }, _renderDimensions: function() {
                this.callBase(), this._setPopupOption("width")
            }, _renderInput: function() {
                this.callBase(), this._$container.addClass(c);
                this._input().off(e).on(e, n.proxy(this._fieldBlurHandler, this))
            }, _fieldBlurHandler: function() {
                this.option("searchEnabled") && !this.option("editEnabled") && this._renderValue()
            }, _renderValueChangeEvent: function() {
                this._isEditable() && this.callBase()
            }, _isEditable: function() {
                return this.option("editEnabled") || this.option("searchEnabled")
            }, _fieldRenderData: function() {
                return this.option("selectedItem")
            }, _readOnlyPropValue: function() {
                return!this._isEditable() || this.option("readOnly")
            }, _isSelectedValue: function(n) {
                return this._valueEquals(n, this.option("value"))
            }, _listItemClickHandler: function(n) {
                this._completeSelection(this._valueGetter(n.itemData))
            }, _completeSelection: function(n) {
                n === i && (n = this.option("editEnabled") && this._searchValue() ? this._searchValue() : this.option("value")), this.option("opened", !1), this._clearFilter(), this._setValue(n)
            }, _setValue: function(n) {
                this.option("value", n)
            }, _clearValueHandler: function() {
                this._clearSelectedItem(), this.option("value", i)
            }, _valueChangeEventHandler: function(n) {
                v[n.which] || (this.option("editEnabled") && (this._valueUpdateSuppressed = !0, this.callBase.apply(this, arguments), this._valueUpdateSuppressed = !1), this.option("searchEnabled") && this._search())
            }, _createClearButton: function() {
                return this.callBase().on(a, function() {
                    return!1
                })
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"tooltipEnabled":
                        this._renderTooltip();
                        break;
                    case"displayCustomValue":
                    case"editEnabled":
                    case"showSelectionControls":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, h = r.events, f = "dxTagBox", u = "dxTagData", c = "dx-tagbox", l = "dx-tag-container", e = "dx-tag", a = "dx-tag-content", o = "dx-tag-remove-button", v = "dx-tagbox-only-select", y = "dx-texteditor-empty", s = h.addNamespace("dxclick", f + "TagRemove"), p = r.Widget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({activeStateEnabled: !0})
            }, _render: function() {
                this.callBase(), this.element().addClass(o)
            }});
        t.registerComponent(f, r, r.dxSelectBox.inherit({_supportedKeys: function() {
                var t = this.callBase();
                return n.extend(t, {backspace: function(n) {
                        if (!this._searchValue().length) {
                            n.preventDefault(), n.stopPropagation();
                            var t = this.option("values");
                            this._removeTag(t[t.length - 1]), this._renderMultiSelect()
                        }
                    }, enter: function(n) {
                        this.option("editEnabled") && !this._$list.find(".dx-state-focused").length ? this._completeSelection() : this._keyboardProcessor._childProcessors[0].process(n)
                    }})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({values: [], value: i, onValuesChanged: null, showDropButton: !1, selectAllText: Globalize.localize("dxList-selectAll")})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function(n) {
                            return n.platform === "android" && n.version[0] < 5
                        }, options: {showDropButton: !0}}])
            }, _init: function() {
                this.callBase(), this._initValuesChangedAction()
            }, _initValuesChangedAction: function() {
                this._valuesChangedAction = this._createActionByOption("onValuesChanged"), this._removeTagAction = this._createAction(this._removeTagHandler)
            }, _render: function() {
                this.callBase(), this.element().addClass(c), this.element().toggleClass(v, !(this.option("searchEnabled") || this.option("editEnabled")));
                this.element().find(".dx-texteditor-container").off(s).on(s, "." + o, n.proxy(function(n) {
                    this._removeTagAction({jQueryEvent: n})
                }, this))
            }, _renderValue: function() {
                return this.callBase().always(n.proxy(function() {
                    this._renderMultiSelect()
                }, this))
            }, _listContentReadyHandler: function() {
                this._suppressingSelectionChanged(function() {
                    this._setListOption("selectedItems", this._selectedItems)
                }), this.callBase()
            }, _suppressingSelectionChanged: function(t) {
                this._setListOption("onSelectionChanged", n.noop), t.call(this), this._setListOption("onSelectionChanged", n.proxy(this._selectionChangeHandler, this))
            }, _listConfig: function() {
                var t = this.callBase();
                return this.option("showSelectionControls") && n.extend(t, {selectionMode: "all", selectAllText: this.option("selectAllText")}), t
            }, _renderMultiSelect: function() {
                this._$tagsContainer = this.element().find(".dx-texteditor-container").addClass(l), this._renderInputSize(), this._clearFilter(), this._renderTags(), this._popup && this._popup.repaint()
            }, _renderInputSize: function() {
                var n = this._input();
                n.prop("size", n.val() ? n.val().length + 2 : 1)
            }, _renderTags: function() {
                var t, i;
                this._cleanTags(), t = n("<div>"), this._selectedItems = [], i = n.map(this._values(), n.proxy(function(n) {
                    return this._renderTag(n, t)
                }, this)), t.children().insertBefore(this._input()), n.when.apply(n, i).done(n.proxy(this._renderInputAddons, this)), this._renderEmptyState()
            }, _renderEmptyState: function() {
                var n = !this._values().length;
                this.element().toggleClass(y, n), this._input().val(""), this._renderInputSize(), this._placeholder().toggle(n)
            }, _cleanTags: function() {
                var t = this._tagElements(), i = this.option("values");
                n.each(t, function(t, r) {
                    var f = n(r);
                    n.inArray(f.data(u), i) < 0 && f.remove()
                })
            }, _tagElements: function() {
                return this.element().find("." + e)
            }, _renderTag: function(i, r) {
                if (this._isTagRendered(i))
                    return n.Deferred().resolve();
                var f = n("<div>").addClass(e).data(u, i).appendTo(r), o = n("<div>").addClass(a).appendTo(f), s = n("<div>").dxTagRemoveButton().appendTo(f);
                return this._loadValue(i).always(n.proxy(function(n) {
                    o.append(t.utils.isDefined(n) ? this._displayGetter(n) : i), this._selectedItems.push(t.utils.isDefined(n) ? n : i)
                }, this))
            }, _isTagRendered: function(t) {
                var r = this._tagElements(), i = !1;
                return n.each(r, function(r, f) {
                    var e = n(f);
                    if (t === e.data(u))
                        return i = !0, !1
                }), i
            }, _toggleEmptinessEventHandler: function() {
                this._toggleEmptiness(!this.option("values").length && !this._searchValue().length)
            }, _removeTagHandler: function(t) {
                var i = t.component, r = t.jQueryEvent, f, o;
                r.stopPropagation(), f = n(r.target).closest("." + e), o = f.data(u), i._removeTag(o), i._suppressingSelectionChanged(function() {
                    i._updateValues()
                }), i.option("values", i.option("values"))
            }, _selectionChangeHandler: function(t) {
                n.each(t.removedItems || [], n.proxy(function(n, t) {
                    this._removeTag(this._valueGetter(t))
                }, this)), n.each(t.addedItems || [], n.proxy(function(n, t) {
                    this._addTag(this._valueGetter(t))
                }, this)), this.callBase(t), this._updateValues(), this._valuesChangedAction(t)
            }, _removeTag: function(n) {
                this.option().value = n;
                var i = this.option("values"), t = this._valueIndex(n);
                t >= 0 && i.splice(t, 1)
            }, _addTag: function(n) {
                var t = this.option("values"), i = this._valueIndex(n);
                i < 0 && t.push(n)
            }, _fieldRenderData: function() {
                return this._selectedItems
            }, _setValue: function(n) {
                if (n !== i && !this._isSelectedValue(n)) {
                    var t = this.option("values");
                    t.push(n), this.option("values", t)
                }
            }, _isSelectedValue: function(n) {
                return this._valueIndex(n) > -1
            }, _valueIndex: function(t) {
                var i = -1;
                return n.each(this._values(), n.proxy(function(n, r) {
                    if (this._valueEquals(t, r))
                        return i = n, !1
                }, this)), i
            }, _values: function() {
                return this.option("values") || []
            }, _clearValueHandler: function() {
                this.option("values", []), this.callBase()
            }, _updateValues: function() {
                this.option("value", this._lastValue())
            }, _lastValue: function() {
                return this._values().slice(-1).pop()
            }, _valueChangeEventHandler: function(n) {
                (this._renderInputSize(), this.option("editEnabled")) || this.callBase(n)
            }, _valueChangeArgs: function() {
                var t = this.callBase.apply(this, arguments);
                return delete t.previousValue, n.extend(t, {values: this.option("values")})
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"values":
                        this._updateValues();
                        break;
                    case"onValuesChanged":
                        this._initValuesChangedAction();
                        break;
                    case"selectAllText":
                        this._setListOption("selectAllText", this.option("selectAllText"));
                        break;
                    default:
                        this.callBase(n)
                    }
            }})), t.registerComponent("dxTagRemoveButton", r[f], p)
    }(jQuery, DevExpress), function(n, t) {
        var f = t.ui, w = f.events, o = t.utils, s = t.fx, h = t.translator, c = "dx-multiview", l = "dx-multiview-wrapper", a = "dx-multiview-item-container", r = "dx-multiview-item", v = "dx-multiview-item-hidden", y = "dxMultiViewItemData", p = function(n) {
            return h.locate(n).left
        }, u = function(n, t) {
            h.move(n, {left: t})
        }, e = {moveTo: function(n, t, i) {
                s.animate(n, {type: "slide", to: {left: t}, duration: 200, complete: i})
            }, complete: function(n) {
                s.stop(n, !0)
            }};
        t.registerComponent("dxMultiView", f, f.CollectionWidget.inherit({_activeStateUnit: "." + r, _supportedKeys: function() {
                return n.extend(this.callBase(), {pageUp: n.noop, pageDown: n.noop})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({selectedIndex: 0, swipeEnabled: !0, animationEnabled: !0, loop: !1, loopItemFocus: !1, selectOnFocus: !0, selectionMode: "single", selectionRequired: !0, selectionByClick: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _itemClass: function() {
                return r
            }, _itemDataKey: function() {
                return y
            }, _itemContainer: function() {
                return this._$itemContainer
            }, _itemWidth: function() {
                return this._itemWidthValue || (this._itemWidthValue = this._$wrapper.width()), this._itemWidthValue
            }, _clearItemWidthCache: function() {
                delete this._itemWidthValue
            }, _itemsCount: function() {
                return this.option("items").length
            }, _normalizeIndex: function(n) {
                var t = this._itemsCount();
                return n < 0 && (n = n + t), n >= t && (n = n - t), n
            }, _init: function() {
                this.callBase.apply(this, arguments);
                var t = this.element();
                t.addClass(c), this._$wrapper = n("<div>").addClass(l), this._$wrapper.appendTo(t), this._$itemContainer = n("<div>").addClass(a), this._$itemContainer.appendTo(this._$wrapper), this._initSwipeable()
            }, _render: function() {
                this.callBase(), this._updateContainerDimensions()
            }, _renderDimensions: function() {
                this.callBase(), this._updateContainerDimensions()
            }, _updateContainerDimensions: function() {
                var t, i, u;
                if (this.option("height") !== "auto") {
                    this.element().find("." + r).css("height", "100%");
                    return
                }
                t = [], i = this.element(), i.css("height", "100%"), n.each(this.element().find("." + r), function(i, r) {
                    var u = n(r);
                    u.css("height", "auto"), t.push(u.outerHeight())
                }), u = t[this.option("selectedIndex")], i.height(u)
            }, _dimensionChanged: function() {
                this._clearItemWidthCache()
            }, _renderSelection: function(n) {
                this._updateItems(n[0])
            }, _updateItems: function(n, t) {
                this._updateItemsPosition(n, t), this._updateItemsVisibility(n, t)
            }, _updateItemsVisibility: function(t, i) {
                var r = this._itemElements();
                r.each(function(r, u) {
                    var f = n(u), e = r !== t && r !== i;
                    f.toggleClass(v, e)
                })
            }, _updateItemsPosition: function(n, t) {
                var i = this._itemElements(), r = -this._animationDirection(t, n);
                u(i.eq(n), 0), u(i.eq(t), r * 100 + "%")
            }, _updateSelection: function(t, i) {
                var r = t[0], f = i[0], o;
                e.complete(this._$itemContainter), this._updateItems(f, r), o = this._animationDirection(r, f), this._animateItemContainer(o * this._itemWidth(), n.proxy(function() {
                    u(this._$itemContainer, 0), this._updateItems(r), this._$itemContainer.width()
                }, this))
            }, _animateItemContainer: function(n, t) {
                this.option("animationEnabled") ? e.moveTo(this._$itemContainer, n, t) : t()
            }, _animationDirection: function(n, t) {
                var i = p(this._$itemContainer), r = (t - n) * this._getRTLSignCorrection(), u = i !== 0, f = u ? i : r;
                return o.sign(f)
            }, _initSwipeable: function() {
                this.element().dxSwipeable({disabled: !this.option("swipeEnabled"), elastic: !1, itemSizeFunc: n.proxy(this._itemWidth, this), onStart: n.proxy(function(n) {
                        this._swipeStartHandler(n.jQueryEvent)
                    }, this), onUpdated: n.proxy(function(n) {
                        this._swipeUpdateHandler(n.jQueryEvent)
                    }, this), onEnd: n.proxy(function(n) {
                        this._swipeEndHandler(n.jQueryEvent)
                    }, this)})
            }, _swipeStartHandler: function(n) {
                e.complete(this._$itemContainer);
                var t = this.option("selectedIndex"), i = this.option("loop"), r = this._itemsCount() - 1, u = this.option("rtlEnabled");
                n.maxLeftOffset = +(i || (u ? t > 0 : t < r)), n.maxRightOffset = +(i || (u ? t < r : t > 0))
            }, _swipeUpdateHandler: function(n) {
                var r = n.offset, t = o.sign(r) * this._getRTLSignCorrection(), i, f;
                u(this._$itemContainer, r * 100 + "%"), t !== this._swipeDirection && (this._swipeDirection = t, i = this.option("selectedIndex"), f = this._normalizeIndex(i - t), this._updateItems(i, f))
            }, _swipeEndHandler: function(t) {
                var i = t.targetOffset * this._getRTLSignCorrection();
                i ? this.option("selectedIndex", this._normalizeIndex(this.option("selectedIndex") - i)) : this._animateItemContainer(0, n.noop), delete this._swipeDirection
            }, _getRTLSignCorrection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _visibilityChanged: function(n) {
                n && this._clearItemWidthCache()
            }, _optionChanged: function(n) {
                var t = n.value;
                switch (n.name) {
                    case"selectedIndex":
                        this.callBase.apply(this, arguments), this._updateContainerDimensions();
                        break;
                    case"loop":
                        this.option("loopItemFocus", t);
                        break;
                    case"animationEnabled":
                        break;
                    case"swipeEnabled":
                        this.element().dxSwipeable("option", "disabled", !t);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, o = u.events, r = t.validationEngine, e = "dx-validator", f;
        DevExpress.ui.validation.defaultAdapter = t.Class.inherit({ctor: function(t, i) {
                var r = this, u;
                r.editor = t, r.validator = i, r.validationRequestsCallbacks = n.Callbacks(), u = function() {
                    r.validationRequestsCallbacks.fire()
                }, t.validationRequest.add(u);
                t.on("disposing", function() {
                    t.validationRequest.remove(u)
                })
            }, getValue: function() {
                return this.editor.option("value")
            }, applyValidationResults: function(n) {
                this.editor.option({isValid: n.isValid, validationError: n.brokenRule})
            }, focus: function() {
                this.editor.focus()
            }}), f = t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({validationRules: []})
            }, _init: function() {
                this.callBase();
                var t = this._findGroup();
                r.registerValidatorInGroup(t, this);
                this.on("disposing", function() {
                    r.removeRegistredValidator(t, this)
                });
                this.focused = n.Callbacks(), this._initAdapter()
            }, _setOptionsByReference: function() {
                this.callBase(), n.extend(this._optionsByReference, {validationGroup: !0})
            }, _initAdapter: function() {
                var i = this, r = i.element().data("dx-validation-target"), n = i.option("adapter");
                if (!n) {
                    if (r) {
                        n = new DevExpress.ui.validation.defaultAdapter(r, this), n.validationRequestsCallbacks.add(function() {
                            i.validate()
                        }), this.option("adapter", n);
                        return
                    }
                    throw t.Error("E0120");
                }
                n.validationRequestsCallbacks && n.validationRequestsCallbacks.add(function() {
                    i.validate()
                })
            }, _findGroup: t.ui.validation.findGroup, _render: function() {
                this.element().addClass(e), this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"validationRules":
                        return;
                    case"adapter":
                        this._initAdapter();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, validate: function() {
                var t = this, u = t.option("adapter"), f = t.option("name"), e = t._createActionByOption("onValidated"), o = u.getValue(), s = n.map(t.option("validationRules"), function(n) {
                    return n.validator = t, n
                }), i = r.validate(o, s, f);
                return u.applyValidationResults && u.applyValidationResults(i), e(i), this.option({isValid: i.isValid, validationError: i.brokenRule}), i
            }, focus: function() {
                var n = this.option("adapter");
                n.focus()
            }}), t.registerComponent("dxValidator", u, f)
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, f = r.events, u = "dx-validation-group";
        t.registerComponent("dxValidationGroup", r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({})
            }, _init: function() {
                this.callBase()
            }, _render: function() {
                this.element().addClass(u), this.callBase()
            }, validate: function() {
                return t.validationEngine.validateGroup(this)
            }, _optionChanged: function(n) {
                switch (n.name) {
                    default:
                        this.callBase(n)
                    }
            }, _dispose: function() {
                t.validationEngine.removeGroup(this), this.callBase()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, o = r.events, u = "dx-validation-summary", f = u + "-item", e = u + "-item-data";
        t.registerComponent("dxValidationSummary", r, r.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({focusStateEnabled: !1, noDataText: null})
            }, _findGroup: t.ui.validation.findGroup, _init: function() {
                this.callBase(), this._subscribeGroup()
            }, _subscribeGroup: function() {
                var r = this._findGroup(), i = t.validationEngine.getGroupConfig(r);
                if (i) {
                    this.groupSubscription = n.proxy(this._groupValidationHandler, this);
                    i.on("validated", this.groupSubscription)
                }
            }, _unsubscribeGroup: function() {
                var i = this._findGroup(), n = t.validationEngine.getGroupConfig(i);
                n && this.groupSubscription && n.off("validated", this.groupSubscription)
            }, _getOrderedItems: function(t, i) {
                var r = [];
                return n.each(t, function(t, u) {
                    var f = n.grep(i, function(n) {
                        if (n.validator === u)
                            return!0
                    })[0];
                    f && r.push(f)
                }), r
            }, _groupValidationHandler: function(t) {
                var i = this, r = i._getOrderedItems(t.validators, n.map(t.brokenRules, function(n) {
                    return{text: n.message, validator: n.validator}
                }));
                i.validators = t.validators, n.each(i.validators, function(t, r) {
                    var u = n.proxy(i._itemValidationHandler, i), f = function() {
                        r.off("validated", u), u = null
                    };
                    r.on("validated", u);
                    r.on("disposing", f)
                }), this.option("items", r)
            }, _itemValidationHandler: function(t) {
                var i = this.option("items"), o = t.isValid, f, r = !1, e = t.brokenRule && t.brokenRule.message, u = t.validationRules[0] && t.validationRules[0].validator;
                o ? (n.each(i, function(n, t) {
                    if (t.validator === u)
                        return f = n, r = !0, !1
                }), r && i.splice(f, 1)) : (n.each(i, function(n, t) {
                    if (t.validator === u)
                        return t.text = e, r = !0, !1
                }), r || i.push({text: e, validator: u})), i = this._getOrderedItems(this.validators, i), this.option("items", i)
            }, _render: function() {
                this.element().addClass(u), this.callBase()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    default:
                        this.callBase(n)
                    }
            }, _itemClass: function() {
                return f
            }, _itemDataKey: function() {
                return e
            }, _postprocessRenderItem: function(n) {
                n.itemElement.on("dxclick", function() {
                    n.itemData.validator.focus()
                })
            }, _dispose: function() {
                this.callBase(), this._unsubscribeGroup()
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var u = t.ui, e = t.utils, o = "dx-fileuploader", s = "dx-fileuploader-empty", r = "dx-fileuploader-dragover", h = "<input type='file'>", c = "dx-fileuploader-wrapper", l = "dx-fileuploader-container", a = "dx-fileuploader-content", v = "dx-fileuploader-input-wrapper", f = "dx-fileuploader-button", y = "dx-fileuploader-input-container", p = "dx-fileuploader-input-label", w = "dx-fileuploader-files-container", b = "dx-fileuploader-file", k = "dx-fileuploader-file-name", d = "dx-fileuploader-file-size";
        t.registerComponent("dxFileUploader", u, u.Editor.inherit({_supportedKeys: function() {
                var t = function() {
                    this._$button && this._$button.click()
                };
                return n.extend(this.callBase(), {space: t, enter: t})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({value: null, values: [], buttonText: Globalize.localize("dxFileUploader-selectFile"), labelText: Globalize.localize("dxFileUploader-dropFile"), name: "files[]", multiple: !1, accept: ""})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _init: function() {
                this.option("value", null), this.option("values", []), this.callBase.apply(this, arguments), this._initFileInput(), this._initLabel(), this._initDragEvents(), this.element().addClass(o)
            }, _initFileInput: function() {
                if (!this._$fileInput) {
                    this._$fileInput = n(h);
                    this._$fileInput.on("change", n.proxy(this._inputChangeHandler, this));
                    this._$fileInput.on("click", n.proxy(function() {
                        var t = this._isCustomEvent || !1;
                        return this._isCustomEvent = !1, t
                    }, this))
                }
                this._$fileInput.prop({multiple: this.option("multiple"), name: this.option("name"), accept: this.option("accept")})
            }, _inputChangeHandler: function() {
                var i = this._$fileInput.val().replace(/^.*\\/, ""), r = this._$fileInput.prop("files") || [{name: i}];
                this._shouldChangeValue = !0, this.option("values", n.map(r, function(t) {
                    return n.extend({}, {name: t.name, size: t.size, type: t.type, lastModifiedDate: t.lastModifiedDate})
                })), delete this._shouldChangeValue
            }, _initLabel: function() {
                this._$inputLabel || (this._$inputLabel = n("<div>")), this._$inputLabel.text(this.option("labelText"))
            }, _initDragEvents: function() {
                if (t.devices.current().platform === "generic") {
                    this._dragEventsCount = 0;
                    this.element().on("dragenter", n.proxy(this._dragEnterHandler, this)).on("dragleave", n.proxy(this._dragLeaveHandler, this)).on("drop", n.proxy(this._dropHandler, this))
                }
            }, _dragEnterHandler: function() {
                if (this.option("disabled"))
                    return!1;
                this._dragEventsCount++, this.element().addClass(r)
            }, _dragLeaveHandler: function() {
                this._dragEventsCount--, this._dragEventsCount <= 0 && this.element().removeClass(r)
            }, _dropHandler: function() {
                this._dragEventsCount = 0, this.element().removeClass(r)
            }, _focusTarget: function() {
                return this.element().find("." + f)
            }, _render: function() {
                this._renderFilesContainer(), this._renderButton(), this._renderInputContainer(), this._renderInputWrapper(), this._renderWrapper(), this.callBase.apply(this, arguments)
            }, _renderFilesContainer: function() {
                var t = this, i = this.option("values") || [];
                this._$filesContainer = this._$filesContainer || n("<div>").addClass(w), this._$filesContainer.empty(), n.each(i, function(i, r) {
                    var f = n("<div>").addClass(k).text(r.name), u = n("<div>").addClass(b).append(f), o;
                    e.isDefined(r.size) && (o = n("<div>").addClass(d).text(t._getFileSize(r.size)).appendTo(u)), t._$filesContainer.append(u)
                }), this.element().toggleClass(s, !i.length)
            }, _getFileSize: function(n) {
                for (var t = 0, i = [Globalize.localize("dxFileUploader-bytes"), Globalize.localize("dxFileUploader-kb"), Globalize.localize("dxFileUploader-Mb"), Globalize.localize("dxFileUploader-Gb")], r = i.length - 1; t < r && n >= 1024; )
                    n /= 1024, t++;
                return"(" + Math.round(n) + i[t] + ")"
            }, _renderButton: function() {
                this._$button = this._$button || n("<div>");
                this._$button.addClass(f).dxButton({text: this.option("buttonText"), focusStateEnabled: !1}).off("click").on("click", n.proxy(this._buttonClickHandler, this));
                this._button = this._$button.dxButton("instance")
            }, _buttonClickHandler: function() {
                if (this.option("disabled"))
                    return!1;
                this._isCustomEvent = !0, this._$fileInput.click()
            }, _renderInputContainer: function() {
                this._$inputContainer = n("<div>").addClass(y), t.browser.msie && this._$inputContainer.css("display", "none"), this._$fileInput.addClass("dx-fileuploader-input").appendTo(this._$inputContainer), this._$inputLabel.addClass(p).appendTo(this._$inputContainer)
            }, _renderInputWrapper: function() {
                this._$inputWrapper = n("<div>").addClass(v).append(this._$button).append(this._$inputContainer)
            }, _renderWrapper: function() {
                var t = n("<div>").addClass(c).appendTo(this.element()), i = n("<div>").addClass(l).appendTo(t), r = n("<div>").addClass(a).appendTo(i).append(this._$inputWrapper).append(this._$filesContainer)
            }, _clean: function() {
                this._$fileInput.detach(), this.callBase.apply(this, arguments)
            }, _optionChanged: function(n) {
                var t = n.value;
                switch (n.name) {
                    case"disabled":
                        this._button.option(n.name, n.value), this.callBase(n);
                        break;
                    case"value":
                        this._shouldChangeValue || (this._$fileInput.val(""), this.option("values", [])), this.callBase(n);
                        break;
                    case"values":
                        t.length && !this._shouldChangeValue ? this.option("values", []) : (this._renderFilesContainer(), this.option("value", t[0] || null));
                        break;
                    case"name":
                    case"accept":
                        this._initFileInput();
                        break;
                    case"multiple":
                        this._initFileInput(), n.value || this.option("values", []);
                        break;
                    case"buttonText":
                        this._button.option("text", t);
                        break;
                    case"labelText":
                        this._$inputLabel.text(t);
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _valueChangeArgs: function() {
                return n.extend(this.callBase.apply(this, arguments), {values: this.option("values")})
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = "dx-tabpanel";
        t.registerComponent("dxTabPanel", r, r.dxMultiView.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({titleTemplate: "title", onTitleClick: null, onTitleHold: null, onTitleRendered: null})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}, {device: function() {
                            return!t.support.touch
                        }, options: {swipeEnabled: !1}}])
            }, _init: function() {
                this.callBase(), this.element().addClass(u)
            }, _render: function() {
                this.callBase.apply(this, arguments), this._renderTabs(), this._resizeMultiView()
            }, _renderTabs: function() {
                this._$tabs || (this._$tabs = n("<div>").dxTabs(this._tabConfig()), this.element().prepend(this._$tabs))
            }, _resizeMultiView: function() {
                var n = this.element().height() - this._$tabs.outerHeight(!0);
                this._$wrapper.height(n)
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _dimensionChanged: function() {
                this._$tabs && this._resizeMultiView()
            }, _tabConfig: function() {
                return{_templates: this.option("_templates"), selectOnFocus: !0, focusStateEnabled: this.option("focusStateEnabled"), selectedIndex: this.option("selectedIndex"), onItemClick: this.option("onTitleClick"), onItemHold: this.option("onTitleHold"), itemHoldTimeout: this.option("itemHoldTimeout"), onSelectionChanged: n.proxy(function(n) {
                        this.option("selectedIndex", n.component.option("selectedIndex"))
                    }, this), onItemRendered: this.option("onTitleRendered"), itemTemplate: this._getTemplateByOption("titleTemplate"), dataSource: this.option("dataSource"), items: this.option("items"), scrollingEnabled: !1, itemTemplateProperty: "tabTemplate"}
            }, _setTabsOption: function(n, t) {
                this._$tabs && this._$tabs.dxTabs("option", n, t)
            }, _optionChanged: function(n) {
                var i = n.name, t = n.value;
                switch (i) {
                    case"dataSource":
                    case"items":
                    case"selectedIndex":
                    case"selectedItem":
                    case"itemHoldTimeout":
                    case"focusStateEnabled":
                        this._setTabsOption(i, t), this.callBase(n);
                        break;
                    case"titleTemplate":
                        this._setTabsOption("itemTemplate", this._getTemplateByOption("titleTemplate"));
                        break;
                    case"onTitleClick":
                        this._setTabsOption("onItemClick", t);
                        break;
                    case"onTitleHold":
                        this._setTabsOption("onItemHold", t);
                        break;
                    case"onTitleRendered":
                        this._setTabsOption("onItemRendered", t);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), DevExpress.MOD_WIDGETS_BASE = !0
}
if (!DevExpress.MOD_WIDGETS_MOBILE) {
    if (!DevExpress.MOD_WIDGETS_BASE)
        throw Error("Required module is not referenced: widgets-base");
    (function(n, t, i) {
        var e = t.ui, f = t.fx, p = t.utils, u = t.translator, o = e.events, v = "dx-pivottabs", l = "dx-pivottabs-tab", s = "dx-pivottabs-tab-selected", a = "dx-pivottabs-ghosttab", y = "dxPivotTabData", h = 200, c = "cubic-bezier(.40, .80, .60, 1)", r = {moveTo: function(n, t, i) {
                return f.animate(n, {type: "slide", to: {left: t}, duration: h, easing: c, complete: i})
            }, slideAppear: function(n, t) {
                return f.animate(n, {type: "slide", to: {left: t, opacity: 1}, duration: h, easing: c})
            }, slideDisappear: function(n, t) {
                return f.animate(n, {type: "slide", to: {left: t, opacity: 0}, duration: h, easing: c})
            }, complete: function(t) {
                t && n.each(t, function(n, t) {
                    f.stop(t, !0)
                })
            }, stop: function(t) {
                t && n.each(t, function(n, t) {
                    f.stop(t)
                })
            }};
        t.registerComponent("dxPivotTabs", e, e.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({selectedIndex: 0, onPrepare: null, onUpdatePosition: null, onRollback: null, focusStateEnabled: !1, selectionMode: "single", selectionRequired: !0})
            }, _itemClass: function() {
                return l
            }, _itemDataKey: function() {
                return y
            }, _itemContainer: function() {
                return this.element()
            }, _elementWidth: function() {
                return this._elementWidthCache || (this._elementWidthCache = this.element().width()), this._elementWidthCache
            }, _clearElementWidthCache: function() {
                delete this._elementWidthCache
            }, _itemWidths: function() {
                if (!this._itemWidthsCache) {
                    var i = this._itemElements(), t = [];
                    i.each(function() {
                        t.push(n(this).outerWidth())
                    }), this._itemWidthsCache = t
                }
                return this._itemWidthsCache
            }, _init: function() {
                this.callBase(), this._initGhostTab(), this._initSwipeHandlers(), this._initActions()
            }, _dimensionChanged: function() {
                this._clearElementWidthCache(), this._cleanPositionCache(), this._updateTabsPositions()
            }, _initGhostTab: function() {
                this._$ghostTab = n("<div>").addClass(a)
            }, _initActions: function() {
                this._updatePositionAction = this._createActionByOption("onUpdatePosition"), this._rollbackAction = this._createActionByOption("onRollback"), this._prepareAction = this._createActionByOption("onPrepare")
            }, _render: function() {
                this.element().addClass(v), this.callBase(), this._renderGhostTab()
            }, _renderGhostTab: function() {
                this._itemContainer().append(this._$ghostTab), this._toggleGhostTab(!1)
            }, _toggleGhostTab: function(n) {
                var t = this._$ghostTab;
                n ? (this._updateGhostTabContent(), t.css("opacity", 1)) : t.css("opacity", 0)
            }, _isGhostTabVisible: function() {
                return this._$ghostTab.css("opacity") == 1
            }, _updateGhostTabContent: function(n) {
                n = n === i ? this._previousIndex() : n;
                var t = this._$ghostTab, r = this._itemElements();
                t.html(r.eq(n).html())
            }, _updateTabsPositions: function(n) {
                var r = this._allTabElements(), n = this._applyOffsetBoundaries(n), t = this.option("rtlEnabled") ^ n > 0 && n !== 0, i = this._calculateTabPositions(t ? "replace" : "append");
                this._moveTabs(i, n), this._toggleGhostTab(t)
            }, _moveTabs: function(t, i) {
                i = i || 0;
                var r = this._allTabElements();
                r.each(function(r) {
                    u.move(n(this), {left: t[r] + i})
                })
            }, _applyOffsetBoundaries: function(n) {
                n = n || 0;
                var t = n > 0 ? this._maxRightOffset : this._maxLeftOffset;
                return n * t
            }, _animateRollback: function() {
                var u = this, t = this._itemElements(), i = this._calculateTabPositions("prepend");
                this._isGhostTabVisible() && (this._swapGhostWithTab(t.eq(this._previousIndex())), r.moveTo(this._$ghostTab, i[this._indexBoundary()], function() {
                    u._toggleGhostTab(!1)
                })), t.each(function(t) {
                    r.moveTo(n(this), i[t])
                })
            }, _animateComplete: function(n, t) {
                var f = this, i = this._itemElements(), r = this._isGhostTabVisible(), u;
                i.eq(t).removeClass(s), u = r ? this._animateIndexDecreasing(n) : this._animateIndexIncreasing(n), i.eq(n).addClass(s)
            }, _animateIndexDecreasing: function(t) {
                var f = this._itemElements(), u = this._calculateTabPositions("append", t), i = [];
                return f.each(function(t) {
                    i.push(r.moveTo(n(this), u[t]))
                }), i.push(r.slideDisappear(this._$ghostTab, u[this._indexBoundary()])), n.when.apply(n, i)
            }, _animateIndexIncreasing: function(t) {
                var s = this, f = this._itemElements(), o = this._calculateTabPositions("prepend", t), i = this._previousIndex(t), h = f.eq(i), c = u.locate(h).left, l = this.option("rtlEnabled"), a = l ? this._elementWidth() - this._itemWidths()[i] : 0, v = (c - a) * this._getRTLSignCorrection() < 0, e = [];
                return v || this._moveTabs(this._calculateTabPositions("append", i)), this._updateGhostTabContent(i), this._swapGhostWithTab(f.eq(i)), f.each(function(t) {
                    var u = n(this), f = o[t];
                    e.push(t === i ? r.slideAppear(u, f) : r.moveTo(u, f))
                }), e.push(r.moveTo(this._$ghostTab, o[this._indexBoundary()], function() {
                    s._toggleGhostTab(!1)
                })), n.when.apply(n, e)
            }, _swapGhostWithTab: function(n) {
                var t = this._$ghostTab, i = u.locate(n).left, r = n.css("opacity");
                u.move(n, {left: u.locate(t).left}), n.css("opacity", t.css("opacity")), u.move(t, {left: i}), t.css("opacity", r)
            }, _calculateTabPositions: function(n, t) {
                t = t === i ? this.option("selectedIndex") : t;
                var r = t + n;
                return this._calculetedPositionsMark !== r && (this._calculetedPositions = this._calculateTabPositionsImpl(t, n), this._calculetedPositionsMark = r), this._calculetedPositions
            }, _calculateTabPositionsImpl: function(t, i) {
                var e = this._normalizeIndex(t - 1), a = this._itemElements(), u = this._itemWidths(), f = this.option("rtlEnabled"), l = this._getRTLSignCorrection(), o = this._elementWidth(), s = f ? o : 0, r = [], h = function(n, t) {
                    var i = f * t;
                    r.splice(n, 0, s - i), s += t * l
                }, c;
                n.each(u.slice(t), h), n.each(u.slice(0, t), h);
                switch (i) {
                    case"replace":
                        c = r[e], r.splice(e, 1, f ? o : -u[e]), r.push(c);
                        break;
                    case"prepend":
                        r.push(f ? o : -u[e]);
                        break;
                    case"append":
                        r.push(s - u[t] * f)
                }
                return r
            }, _allTabElements: function() {
                return this._itemContainer().find("." + l + ", ." + a)
            }, _initSwipeHandlers: function() {
                this.element().on(o.addNamespace("dxswipestart", this.NAME), {itemSizeFunc: n.proxy(this._elementWidth, this)}, n.proxy(this._swipeStartHandler, this)).on(o.addNamespace("dxswipe", this.NAME), n.proxy(this._swipeUpdateHandler, this)).on(o.addNamespace("dxswipeend", this.NAME), n.proxy(this._swipeEndHandler, this))
            }, _swipeStartHandler: function(n) {
                this._prepareAnimation(), this._prepareAction(), n.maxLeftOffset = 1, n.maxRightOffset = 1, t.designMode || this.option("disabled") || this._indexBoundary() <= 1 ? n.cancel = !0 : this._swipeGestureRunning = !0
            }, _prepareAnimation: function() {
                this._stopAnimation()
            }, _stopAnimation: function() {
                r.complete(this._allTabElements())
            }, _swipeUpdateHandler: function(n) {
                var t = n.offset;
                this._updateTabsPositions(t), this._updatePositionAction({offset: t})
            }, _swipeEndHandler: function(n) {
                var t = n.targetOffset * this._getRTLSignCorrection(), i;
                t === 0 ? (this._animateRollback(), this._rollbackAction()) : (i = this._normalizeIndex(this.option("selectedIndex") - t), this.option("selectedIndex", i)), this._swipeGestureRunning = !1
            }, _previousIndex: function(n) {
                return n = n === i ? this.option("selectedIndex") : n, this._normalizeIndex(n - 1)
            }, _normalizeIndex: function(n) {
                var t = this._indexBoundary();
                return n < 0 && (n = t + n), n >= t && (n = n - t), n
            }, _indexBoundary: function() {
                return this.option("items").length
            }, _renderSelection: function(n) {
                this._calculateMaxOffsets(n), this._updateTabsPositions(), this._itemElements().eq(n).addClass(s)
            }, _updateSelection: function(n, t) {
                var i = n[0], r = t[0];
                this._calculateMaxOffsets(i), this._swipeGestureRunning || this._prepareAnimation(), this._itemElements().length && this._animateComplete(i, r)
            }, _calculateMaxOffsets: function(n) {
                var u = this._itemElements(), t = this._itemWidths()[n], i = this._itemWidths()[this._previousIndex(n)], r = this.option("rtlEnabled");
                this._maxLeftOffset = r ? i : t, this._maxRightOffset = r ? t : i
            }, _getRTLSignCorrection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _clean: function() {
                r.stop(this._allTabElements()), this._clearElementWidthCache(), this._cleanPositionCache(), this.callBase()
            }, _cleanPositionCache: function() {
                delete this._itemWidthsCache, delete this._calculetedPositionsMark
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"items":
                    case"rtlEnabled":
                        this._cleanPositionCache(), this.callBase(n);
                        break;
                    case"onPrepare":
                    case"onUpdatePosition":
                    case"onRollback":
                        this._initActions();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, prepare: function() {
                this._prepareAnimation()
            }, updatePosition: function(n) {
                this._updateTabsPositions(n)
            }, rollback: function() {
                this._animateRollback()
            }}))
    })(jQuery, DevExpress), function(n, t) {
        var f = t.ui, e = f.events, r = t.fx, o = t.translator, h = "dx-pivot", c = "dx-pivot-wrapper", l = "dx-pivottabs-container", a = "dx-pivot-itemcontainer", v = "dx-pivot-itemwrapper", y = "dx-pivot-item", s = "dx-pivot-item-hidden", p = "dxPivotItemData", w = 200, b = 50, k = 250, d = "cubic-bezier(.10, 1, 0, 1)", u = {returnBack: function(n) {
                r.animate(n, {type: "slide", to: {left: 0}, duration: w})
            }, slideAway: function(n, t, i) {
                r.animate(n, {type: "slide", to: {left: t}, duration: b, complete: i})
            }, slideBack: function(n) {
                r.animate(n, {type: "slide", to: {left: 0}, easing: d, duration: k})
            }, complete: function(n) {
                r.stop(n, !0)
            }, stop: function(n) {
                r.stop(n)
            }};
        t.registerComponent("dxPivot", f, f.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({selectedIndex: 0, focusStateEnabled: !1, selectionMode: "single", selectionRequired: !0, selectionByClick: !1})
            }, _itemClass: function() {
                return y
            }, _itemDataKey: function() {
                return p
            }, _itemContainer: function() {
                return this._$itemWrapper
            }, _elementWidth: function() {
                return this._elementWidthCache || (this._elementWidthCache = this.element().width()), this._elementWidthCache
            }, _clearElementWidthCache: function() {
                delete this._elementWidthCache
            }, _init: function() {
                this.callBase(), this._initWrapper(), this._initTabs(), this._initItemContainer(), this._clearItemsCache(), this._initSwipeHandlers()
            }, _dimensionChanged: function() {
                this._clearElementWidthCache()
            }, _initWrapper: function() {
                this._$wrapper = n("<div>").addClass(c).appendTo(this.element())
            }, _initItemContainer: function() {
                var t = n("<div>").addClass(a);
                this._$wrapper.append(t), this._$itemWrapper = n("<div>").addClass(v), t.append(this._$itemWrapper)
            }, _clearItemsCache: function() {
                this._itemsCache = []
            }, _initTabs: function() {
                var t = this, i = n("<div>").addClass(l);
                this._$wrapper.append(i), i.dxPivotTabs({items: this.option("items"), selectedIndex: this.option("selectedIndex"), onPrepare: function() {
                        t._prepareAnimation()
                    }, onUpdatePosition: function(n) {
                        t._updateContentPosition(n.offset)
                    }, onRollback: function() {
                        t._animateRollback()
                    }, onSelectionChanged: function(n) {
                        t.option("selectedItem", n.addedItems[0])
                    }}), this._tabs = i.dxPivotTabs("instance")
            }, _render: function() {
                this.element().addClass(h), this.callBase();
                var n = this.option("selectedIndex");
                this._renderCurrentContent(n, n)
            }, _renderCurrentContent: function(t, i) {
                var r = this._itemsCache;
                r[i] = this._selectedItemElement(), r[i].addClass(s), r[t] ? r[t].removeClass(s) : this._renderContent(), this._selectionChangePromise && this._selectionChangePromise.resolve(), this._selectionChangePromise = n.Deferred()
            }, _updateContentPosition: function(n) {
                o.move(this._$itemWrapper, {left: this._calculatePixelOffset(n)})
            }, _animateRollback: function() {
                u.returnBack(this._$itemWrapper)
            }, _animateComplete: function(t, i) {
                var r = this._$itemWrapper, e = this._getRTLSignCorrection(), f = this._elementWidth() * (this._isPrevSwipeHandled() ? 1 : -1) * e;
                u.slideAway(r, f, n.proxy(function() {
                    o.move(r, {left: -f}), this._renderCurrentContent(t, i)
                }, this)), u.slideBack(r)
            }, _calculatePixelOffset: function(n) {
                return n = n || 0, n * this._elementWidth()
            }, _isPrevSwipeHandled: function() {
                var n = o.locate(this._$itemWrapper).left, t = this.option("rtlEnabled");
                return t ^ n > 0 && n !== 0
            }, _initSwipeHandlers: function() {
                this.element().on(e.addNamespace("dxswipestart", this.NAME), {itemSizeFunc: n.proxy(this._elementWidth, this)}, n.proxy(this._swipeStartHandler, this)).on(e.addNamespace("dxswipe", this.NAME), n.proxy(this._swipeUpdateHandler, this)).on(e.addNamespace("dxswipeend", this.NAME), n.proxy(this._swipeEndHandler, this))
            }, _swipeStartHandler: function(n) {
                this._prepareAnimation(), this._tabs.prepare(), t.designMode || this.option("disabled") || this._indexBoundary() <= 1 ? n.cancel = !0 : this._swipeGestureRunning = !0, n.maxLeftOffset = 1, n.maxRightOffset = 1
            }, _prepareAnimation: function() {
                this._stopAnimation()
            }, _stopAnimation: function() {
                u.complete(this._$itemWrapper)
            }, _swipeUpdateHandler: function(n) {
                var t = n.offset;
                this._updateContentPosition(t), this._tabs.updatePosition(t)
            }, _swipeEndHandler: function(n) {
                var t = n.targetOffset * this._getRTLSignCorrection(), i;
                t === 0 ? (this._animateRollback(), this._tabs.rollback()) : (i = this._normalizeIndex(this.option("selectedIndex") - t), this.option("selectedIndex", i)), this._swipeGestureRunning = !1
            }, _normalizeIndex: function(n) {
                var t = this._indexBoundary();
                return n < 0 && (n = t + n), n >= t && (n = n - t), n
            }, _indexBoundary: function() {
                return this.option("items").length
            }, _renderContentImpl: function() {
                var n = this.option("items"), t = this.option("selectedIndex");
                n.length && this._renderItems([n[t]])
            }, _selectedItemElement: function() {
                return this._$itemWrapper.children(":not(." + s + ")")
            }, _getRTLSignCorrection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _clean: function() {
                u.stop(this._$itemWrapper), this.callBase()
            }, _refresh: function() {
                this._tabs._refresh(), this.callBase()
            }, _updateSelection: function(n, t) {
                var i = n[0], r = t[0];
                this._swipeGestureRunning || this._prepareAnimation(), this._animateComplete(i, r), this._tabs.option("selectedIndex", i)
            }, _optionChanged: function(n) {
                var t = n.value;
                switch (n.name) {
                    case"disabled":
                        this._tabs.option("disabled", t), this.callBase(n);
                        break;
                    case"items":
                        this._tabs.option("items", t), this._clearItemsCache(), this.callBase(n);
                        break;
                    case"rtlEnabled":
                        this._tabs.option("rtlEnabled", t), this._clearItemsCache(), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, u = "dx-action-sheet", f = "dx-action-sheet-container", e = "dx-action-sheet-popup-wrapper", o = "dx-action-sheet-popover-wrapper", s = "dx-action-sheet-cancel", h = "dx-action-sheet-item", c = "dxActionSheetItemData", l = "dx-action-sheet-without-title";
        t.registerComponent("dxActionSheet", r, r.CollectionWidget.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {cancelClickAction: {since: "14.2", alias: "onCancelClick"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({usePopover: !1, target: null, title: "", showTitle: !0, showCancelButton: !0, cancelText: Globalize.localize("Cancel"), onCancelClick: null, visible: !1, noDataText: "", focusStateEnabled: !1, selectionByClick: !1})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: {platform: "ios", tablet: !0}, options: {usePopover: !0}}])
            }, _itemContainer: function() {
                return this._$itemContainer
            }, _itemClass: function() {
                return h
            }, _itemDataKey: function() {
                return c
            }, _toggleVisibility: n.noop, _renderDimensions: n.noop, _render: function() {
                this.element().addClass(u), this._createItemContainer(), this._renderPopup()
            }, _createItemContainer: function() {
                this._$itemContainer = n("<div>").addClass(f), this._renderDisabled()
            }, _renderDisabled: function() {
                this._$itemContainer.toggleClass("dx-state-disabled", this.option("disabled"))
            }, _renderPopup: function() {
                this._$popup = n("<div>").appendTo(this.element()), this._popup = this._isPopoverMode() ? this._createPopover() : this._createPopup(), this._renderPopupTitle(), this._mapPopupOption("visible")
            }, _mapPopupOption: function(n) {
                this._popup.option(n, this.option(n))
            }, _isPopoverMode: function() {
                return this.option("usePopover") && this.option("target")
            }, _renderPopupTitle: function() {
                this._mapPopupOption("showTitle"), this._popup._wrapper().toggleClass(l, !this.option("showTitle"))
            }, _clean: function() {
                this._$popup && this._$popup.remove(), this.callBase()
            }, _createPopover: function() {
                var t = this._$popup.dxPopover({_templates: this.option("_templates"), rtlEnabled: this.option("rtlEnabled"), showTitle: !0, title: this.option("title"), width: this.option("width") || 200, height: this.option("height") || "auto", target: this.option("target"), onHidden: n.proxy(this.hide, this), onContentReady: n.proxy(this._popupContentReadyAction, this)}).dxPopover("instance");
                return t._wrapper().addClass(o), t
            }, _createPopup: function() {
                var t = this._$popup.dxPopup({_templates: this.option("_templates"), rtlEnabled: this.option("rtlEnabled"), dragEnabled: !1, title: this.option("title"), width: this.option("width") || "100%", height: this.option("height") || "auto", onContentReady: n.proxy(this._popupContentReadyAction, this), position: {my: "bottom", at: "bottom", of: window}, animation: {show: {type: "slide", duration: 400, from: {position: {my: "top", at: "bottom", of: window}}, to: {position: {my: "bottom", at: "bottom", of: window}}}, hide: {type: "slide", duration: 400, from: {position: {my: "bottom", at: "bottom", of: window}}, to: {position: {my: "top", at: "bottom", of: window}}}}}).dxPopup("instance");
                t.on("optionChanged", n.proxy(function(n) {
                    n.name === "visible" && this.option("visible", n.value)
                }, this));
                return t._wrapper().addClass(e), t
            }, _popupContentReadyAction: function() {
                this._popup.content().append(this._$itemContainer), this._attachClickEvent(), this._attachHoldEvent(), this._renderContent(), this._renderCancelButton()
            }, _renderCancelButton: function() {
                if (!this._isPopoverMode() && (this._$cancelButton && this._$cancelButton.remove(), this.option("showCancelButton"))) {
                    var t = this._createActionByOption("onCancelClick") || n.noop, i = this;
                    this._$cancelButton = n("<div>").addClass(s).appendTo(this._popup.content()).dxButton({text: this.option("cancelText"), onClick: function(n) {
                            var r = {jQueryEvent: n, cancel: !1};
                            t(r), r.cancel || i.hide()
                        }})
                }
            }, _itemClickHandler: function(t) {
                this.callBase(t), n(t.target).is(".dx-state-disabled, .dx-state-disabled *") || this.hide()
            }, _itemHoldHandler: function(t) {
                this.callBase(t), n(t.target).is(".dx-state-disabled, .dx-state-disabled *") || this.hide()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"width":
                    case"height":
                    case"visible":
                    case"title":
                        this._mapPopupOption(n.name);
                        break;
                    case"disabled":
                        this._renderDisabled();
                        break;
                    case"showTitle":
                        this._renderPopupTitle();
                        break;
                    case"showCancelButton":
                    case"onCancelClick":
                    case"cancelText":
                        this._renderCancelButton();
                        break;
                    case"target":
                    case"usePopover":
                    case"items":
                        this._invalidate();
                        break;
                    default:
                        this.callBase(n)
                    }
            }, toggle: function(t) {
                var i = this, r = n.Deferred();
                return i._popup.toggle(t).done(function() {
                    i.option("visible", t), r.resolveWith(i)
                }), r.promise()
            }, show: function() {
                return this.toggle(!0)
            }, hide: function() {
                return this.toggle(!1)
            }}))
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, l = r.events, f = "dx-dropdownmenu", u = "dx-dropdownmenu-popup", e = u + "-wrapper", o = "dx-dropdownmenu-list", s = "dx-dropdownmenu-button", h = {popupWidth: "width", popupHeight: "height"}, c = {buttonIcon: "icon", buttonIconSrc: "iconSrc", buttonText: "text"};
        t.registerComponent("dxDropDownMenu", r, r.Widget.inherit({_supportedKeys: function() {
                return n.extend(this.callBase(), {tab: function() {
                        this._popup.hide()
                    }})
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {itemClickAction: {since: "14.2", alias: "onItemClick"}, buttonClickAction: {since: "14.2", alias: "onButtonClick"}, itemRender: {since: "14.2", alias: "itemTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({items: [], onItemClick: null, dataSource: null, itemTemplate: "item", buttonText: "", buttonIcon: "overflow", buttonIconSrc: null, onButtonClick: null, usePopover: !1, popupWidth: "auto", popupHeight: "auto", hoverStateEnabled: !0})
            }, _defaultOptionsRules: function() {
                return this.callBase().concat([{device: [{platform: "ios"}], options: {usePopover: !0}}, {device: function() {
                            return t.devices.real().generic && !t.devices.isSimulator()
                        }, options: {focusStateEnabled: !0}}])
            }, _init: function() {
                this.callBase(), this._initDataSource(), this._initItemClickAction(), this._initButtonClickAction()
            }, _initItemClickAction: function() {
                this._itemClickAction = this._createActionByOption("onItemClick")
            }, _initButtonClickAction: function() {
                this._buttonClickAction = this._createActionByOption("onButtonClick")
            }, _render: function() {
                this.element().addClass(f), this._renderButton(), this.callBase()
            }, _clean: function() {
                this._cleanFocusState(), this._popup.element().remove()
            }, _renderContentImpl: function() {
                this._renderPopup()
            }, _renderButton: function() {
                var t = this, i, r;
                this._button = this.element().addClass(s).dxButton({text: this.option("buttonText"), icon: this.option("buttonIcon"), iconSrc: this.option("buttonIconSrc"), onClick: function(n) {
                        t._popup.toggle(), t._buttonClickAction(n)
                    }, focusStateEnabled: !1}).dxButton("instance"), i = this._supportedKeys(), r = this._button._supportedKeys(), this._supportedKeys = function() {
                    return n.extend(i, r)
                }
            }, _renderPopup: function() {
                var o = this._$popup = n("<div>").appendTo(this.element()), r = {onContentReady: n.proxy(this._popupContentReadyHandler, this), deferRendering: !1}, f = t.devices.current(), i;
                f.android && f.version[0] == 5 && (i = "top " + (this.option("rtlEnabled") ? "left" : "right"), n.extend(r, {position: {my: i, at: i}})), this._popup = this._createPopover(o, r), this._popup._wrapper().addClass(e), this._popup._wrapper().toggleClass(u, !this.option("usePopover"))
            }, _popupContentReadyHandler: function() {
                var n = this._$popup.dxPopover("instance");
                this._renderList(n)
            }, _createPopover: function(t, i) {
                return t.dxPopover(n.extend(i, {target: this.element(), rtlEnabled: this.option("rtlEnabled"), height: this.option("popupHeight"), width: this.option("popupWidth")})).dxPopover("instance")
            }, _renderList: function(t) {
                var r = t.content(), i = this, u;
                i._list = r.addClass(o).dxList({_keyboardProcessor: i._listProcessor, _templates: i.option("_templates"), autoPagingEnabled: !1, indicateLoading: !1, noDataText: "", itemTemplate: i._getTemplateByOption("itemTemplate"), onItemClick: function(n) {
                        i._popup.hide(), i._itemClickAction(n)
                    }, tabIndex: -1, focusStateEnabled: this.option("focusStateEnabled")}).data("dxList"), i._setListDataSource(), u = n(window).height() * .5, r.height() > u && r.height(u)
            }, _setListDataSource: function() {
                this._list && this._list.option("dataSource", this._dataSource || this.option("items"))
            }, _attachKeyboardEvents: function() {
                this.callBase.apply(this, arguments), this._listProcessor = this._keyboardProcessor.attachChildProcessor(), this._list && this._list.option("_keyboardProcessor", this._listProcessor)
            }, _cleanFocusState: function() {
                this.callBase.apply(this, arguments), delete this._listProcessor
            }, _toggleVisibility: function(n) {
                this.callBase(n), this._button.option("visible", n)
            }, _optionChanged: function(n) {
                var t = n.name, i = n.value;
                switch (t) {
                    case"items":
                    case"dataSource":
                        this._refreshDataSource(), this._setListDataSource();
                        break;
                    case"itemTemplate":
                        this._list && this._list.option(t, this._getTemplate(i));
                        break;
                    case"onItemClick":
                        this._initItemClickAction();
                        break;
                    case"onButtonClick":
                        this._buttonClickAction();
                        break;
                    case"buttonIcon":
                    case"buttonIconSrc":
                    case"buttonText":
                        this._button.option(c[t], i);
                        break;
                    case"popupWidth":
                    case"popupHeight":
                        this._popup.option(h[t], i);
                        break;
                    case"usePopover":
                        this._invalidate();
                        break;
                    case"focusStateEnabled":
                        this._list && this._list.option(t, i), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}).include(r.DataHelperMixin))
    }(jQuery, DevExpress), function(n, t) {
        var o = t.ui, s = o.events, e = t.fx, c = t.translator, lt = t.utils, p = "dx-panorama", w = "dx-panorama-wrapper", b = "dx-panorama-title", k = "dx-panorama-ghosttitle", d = "dx-panorama-itemscontainer", l = "dx-panorama-item", a = "dx-panorama-ghostitem", g = "dxPanoramaItemData", nt = .02, tt = .02, it = 300, rt = "cubic-bezier(.40, .80, .60, 1)", ut = 300, ft = "cubic-bezier(.40, .80, .60, 1)", et = 300, ot = "cubic-bezier(.40, .80, .60, 1)", v = function(n, t) {
            n.css("background-position", t + "px 0%")
        }, f = function(n) {
            return c.locate(n).left
        }, r = function(n, t) {
            c.move(n, {left: t})
        }, u = {backgroundMove: function(n, t, i) {
                return e.animate(n, {to: {"background-position": t + "px 0%"}, duration: it, easing: rt, complete: i})
            }, titleMove: function(n, t, i) {
                return e.animate(n, {type: "slide", to: {left: t}, duration: ut, easing: ft, complete: i})
            }, itemMove: function(n, t, i) {
                return e.animate(n, {type: "slide", to: {left: t}, duration: et, easing: ot, complete: i})
            }}, y = function(t) {
            t && n.each(t, function(n, t) {
                e.stop(t, !0)
            })
        }, h = t.Class.inherit({ctor: function(n) {
                this._panorama = n
            }, init: n.noop, render: n.noop, allItemElements: function() {
                return this._panorama._itemElements()
            }, updatePositions: t.abstract, animateRollback: t.abstract, detectBoundsTransition: t.abstract, animateComplete: t.abstract, _getRTLSignCorrection: function() {
                return this._panorama._getRTLSignCorrection()
            }, _isRTLEnabled: function() {
                return this._panorama.option("rtlEnabled")
            }, _itemMargin: function() {
                return this._containerWidth() * nt
            }, _containerWidth: function() {
                return this._panorama._elementWidth()
            }, _itemWidth: function() {
                return this._panorama._itemWidth()
            }, _indexBoundary: function() {
                return this._panorama._indexBoundary()
            }, _normalizeIndex: function(n) {
                return this._panorama._normalizeIndex(n)
            }, _startNextPosition: function() {
                return this._isRTLEnabled() ? this._containerWidth() - (this._itemMargin() + this._itemWidth()) : this._itemMargin()
            }, _startPrevPosition: function() {
                return this._isRTLEnabled() ? this._containerWidth() : -this._itemWidth()
            }}), st = h.inherit({updatePositions: function() {
                var t = this._panorama._itemElements(), i = this._startNextPosition();
                t.each(function() {
                    r(n(this), i)
                })
            }, animateRollback: n.noop, detectBoundsTransition: n.noop, animateComplete: n.noop}), ht = h.inherit({init: function() {
                this._initGhostItem()
            }, render: function() {
                this._renderGhostItem()
            }, _initGhostItem: function() {
                this._$ghostItem = n("<div>").addClass(a)
            }, _renderGhostItem: function() {
                this._panorama._itemContainer().append(this._$ghostItem), this._toggleGhostItem(!1)
            }, _toggleGhostItem: function(n) {
                var t = this._$ghostItem;
                n ? t.css("opacity", 1) : t.css("opacity", 0)
            }, _updateGhostItemContent: function(n) {
                n !== !1 && n !== this._prevGhostIndex && (this._$ghostItem.html(this._panorama._itemElements().eq(n).html()), this._prevGhostIndex = n)
            }, _isGhostItemVisible: function() {
                return this._$ghostItem.css("opacity") == 1
            }, _swapGhostWithItem: function(n) {
                var t = this._$ghostItem, i = f(n);
                r(n, f(t)), r(t, i)
            }, allItemElements: function() {
                return this._panorama._itemContainer().find("." + l + ", ." + a)
            }, updatePositions: function(t) {
                var o = this.allItemElements(), i = this._panorama.option("selectedIndex"), u = t * this._getRTLSignCorrection(), f = u > 0 && i === 0 || u < 0 && i === 1, e = u < 0 && i === 0 || u > 0 && i === 1, s = f && "replaceLast" || e && "replaceFirst", h = f && 1 || e && 0, c = this._calculateItemPositions(i, s);
                this._updateGhostItemContent(h), this._toggleGhostItem(f || e), o.each(function(i) {
                    r(n(this), c[i] + t)
                })
            }, animateRollback: function(t) {
                var h = this, i = this._panorama._itemElements(), e = this._startNextPosition(), o = this._getRTLSignCorrection(), c = (f(i.eq(t)) - e) * o, r = (f(this._$ghostItem) - e) * o, s = this._calculateItemPositions(t, r > 0 ? "prepend" : "append"), l = t === 0 && c > 0 && r > 0 || t === 1 && r < 0;
                l ? this._swapGhostWithItem(i.eq(1)) : this._swapGhostWithItem(i.eq(0)), i.each(function(t) {
                    u.itemMove(n(this), s[t])
                }), u.itemMove(this._$ghostItem, s[2], function() {
                    h._toggleGhostItem(!1)
                })
            }, detectBoundsTransition: function(n, t) {
                var i = f(this._$ghostItem), r = this._startNextPosition(), u = this._isRTLEnabled();
                return n === 0 && u ^ i < r ? "left" : t === 0 && u ^ i > r ? "right" : void 0
            }, animateComplete: function(t, i, r) {
                var o = this, s = !t ^ !(r === 0) ? "prepend" : "append", h = this._panorama._itemElements(), e = this._calculateItemPositions(i, s), f = [];
                return h.each(function(t) {
                    f.push(u.itemMove(n(this), e[t]))
                }), f.push(u.itemMove(this._$ghostItem, e[2], function() {
                    o._toggleGhostItem(!1)
                })), n.when.apply(n, f)
            }, _calculateItemPositions: function(n, t) {
                var i = [], h = this._panorama._itemElements(), o = this._itemMargin(), s = this._itemWidth(), e = (s + o) * this._getRTLSignCorrection(), u = n === 0, f = this._startPrevPosition(), r = this._startNextPosition();
                i.push(r), r += e, u ? i.push(r) : i.splice(0, 0, r), r += e;
                switch (t) {
                    case"replaceFirst":
                        i.push(i[0]), i[0] = u ? r : f;
                        break;
                    case"replaceLast":
                        u ? i.splice(1, 0, f) : i.splice(1, 0, r);
                        break;
                    case"prepend":
                        i.push(f);
                        break;
                    case"append":
                        i.push(r)
                }
                return i
            }}), ct = h.inherit({updatePositions: function(t) {
                var i = this._panorama._itemElements(), u = t * this._getRTLSignCorrection() < 0, f = this._calculateItemPositions(this._panorama.option("selectedIndex"), u);
                i.each(function(i) {
                    r(n(this), f[i] + t)
                })
            }, animateRollback: function(t) {
                var i = this._panorama._itemElements(), e = this._calculateItemPositions(t), o = [t, this._normalizeIndex(t + 1)];
                this._isRTLEnabled() ^ f(i.eq(t)) > this._startNextPosition() && o.push(this._normalizeIndex(t - 1)), i.each(function(t) {
                    var i = n(this);
                    n.inArray(t, o) !== -1 ? u.itemMove(i, e[t]) : r(i, e[t])
                })
            }, detectBoundsTransition: function(n, t) {
                var i = this._indexBoundary() - 1;
                return t === i && n === 0 ? "left" : t === 0 && n === i ? "right" : void 0
            }, animateComplete: function(t, i, f) {
                var s = [], h = this._panorama._itemElements(), e = this._calculateItemPositions(i), o = this._normalizeIndex(f - 1) === i, l = h.length === 3 && o ? this._normalizeIndex(f + 1) : null, a = e[this._indexBoundary()], c = [i, f], v = o ? f : i;
                return o || c.push(this._normalizeIndex(v + 1)), h.each(function(t) {
                    var i = n(this);
                    if (n.inArray(t, c) === -1) {
                        r(i, e[t]);
                        return
                    }
                    s.push(t !== l ? u.itemMove(i, e[t]) : u.itemMove(i, a, function() {
                        r(i, e[t])
                    }))
                }), n.when.apply(n, s)
            }, _calculateItemPositions: function(n, t) {
                for (var f = this._normalizeIndex(n - 1), c = this._panorama._itemElements(), o = this._itemMargin(), s = this._itemWidth(), e = (s + o) * this._getRTLSignCorrection(), i = [], h = this._startPrevPosition(), r = this._startNextPosition(), u = n; u !== f; u = this._normalizeIndex(u + 1))
                    i[u] = r, r += e;
                return t ? (i[f] = r, r += e) : i[f] = h, i.push(r), i
            }});
        t.registerComponent("dxPanorama", o, o.CollectionWidget.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({selectedIndex: 0, title: "panorama", backgroundImage: {url: null, width: 0, height: 0}, focusStateEnabled: !1, selectionMode: "single", selectionRequired: !0, selectionByClick: !1})
            }, _itemClass: function() {
                return l
            }, _itemDataKey: function() {
                return g
            }, _itemContainer: function() {
                return this._$itemsContainer
            }, _itemWidth: function() {
                return this._itemWidthCache || (this._itemWidthCache = this._itemElements().eq(0).outerWidth()), this._itemWidthCache
            }, _clearItemWidthCache: function() {
                delete this._itemWidthCache
            }, _elementWidth: function() {
                return this._elementWidthCache || (this._elementWidthCache = this.element().width()), this._elementWidthCache
            }, _clearElementWidthCache: function() {
                delete this._elementWidthCache
            }, _titleWidth: function() {
                return this._titleWidthCache || (this._titleWidthCache = this._$title.outerWidth()), this._titleWidthCache
            }, _clearTitleWidthCache: function() {
                delete this._titleWidthCache
            }, _init: function() {
                this.callBase(), this._initItemsRenderStrategy(), this._initWrapper(), this._initTitle(), this._initItemsContainer(), this._initSwipeHandlers()
            }, _dimensionChanged: function() {
                this._clearItemWidthCache(), this._clearElementWidthCache(), this._clearTitleWidthCache(), this._updatePositions()
            }, _initWrapper: function() {
                this._$wrapper = n("<div>").addClass(w).appendTo(this.element())
            }, _initItemsRenderStrategy: function() {
                var n;
                switch (this.option("items").length) {
                    case 0:
                    case 1:
                        n = st;
                        break;
                    case 2:
                        n = ht;
                        break;
                    default:
                        n = ct
                }
                this._itemsRenderStrategy = new n(this), this._itemsRenderStrategy.init()
            }, _initBackgroundImage: function() {
                var n = this.option("backgroundImage.url");
                n && this.element().css("background-image", "url(" + n + ")")
            }, _initTitle: function() {
                this._$title = n("<div>").addClass(b), this._$ghostTitle = n("<div>").addClass(k), this._$wrapper.append(this._$title), this._$wrapper.append(this._$ghostTitle), this._updateTitle()
            }, _updateTitle: function() {
                var n = this.option("title");
                this._$title.text(n), this._$ghostTitle.text(n), this._toggleGhostTitle(!1)
            }, _toggleGhostTitle: function(n) {
                var t = this._$ghostTitle;
                n ? t.css("opacity", 1) : t.css("opacity", 0)
            }, _getRTLSignCorrection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _initItemsContainer: function() {
                this._$itemsContainer = n("<div>").addClass(d), this._$wrapper.append(this._$itemsContainer)
            }, _render: function() {
                this.element().addClass(p), this.callBase(), this._initBackgroundImage(), this._itemsRenderStrategy.render()
            }, _updatePositions: function(n) {
                n = n || 0, this._updateBackgroundPosition(n * this._calculateBackgroundStep()), this._updateTitlePosition(n * this._calculateTitleStep()), this._itemsRenderStrategy.updatePositions(n * this._elementWidth())
            }, _updateBackgroundPosition: function(n) {
                v(this.element(), this._calculateBackgroundPosition(this.option("selectedIndex")) + n)
            }, _updateTitlePosition: function(n) {
                r(this._$title, this._calculateTitlePosition(this.option("selectedIndex")) + n)
            }, _animateRollback: function(n) {
                this._animateBackgroundMove(n), this._animateTitleMove(n), this._itemsRenderStrategy.animateRollback(n)
            }, _animateBackgroundMove: function(n) {
                return u.backgroundMove(this.element(), this._calculateBackgroundPosition(n))
            }, _animateTitleMove: function(n) {
                return u.titleMove(this._$title, this._calculateTitlePosition(n))
            }, _animateComplete: function(t, i) {
                var r = this, u = this._itemsRenderStrategy.detectBoundsTransition(t, i), f = this._performBackgroundAnimation(u, t), e = this._performTitleAnimation(u, t), o = this._itemsRenderStrategy.animateComplete(u, t, i);
                n.when(f, e, o).done(function() {
                    r._indexChangeOnAnimation = !0, r.option("selectedIndex", t), r._indexChangeOnAnimation = !1
                })
            }, _performBackgroundAnimation: function(n, t) {
                return n ? this._animateBackgroundBoundsTransition(n, t) : this._animateBackgroundMove(t)
            }, _animateBackgroundBoundsTransition: function(n, t) {
                var r = this, f = n === "left", i = this._calculateBackgroundPosition(t), e = f ^ this.option("rtlEnabled") ? -this._calculateBackgroundScaledWidth() : this._calculateBackgroundScaledWidth(), o = i + e;
                return u.backgroundMove(this.element(), o, function() {
                    v(r.element(), i)
                })
            }, _performTitleAnimation: function(n, t) {
                return n ? this._animateTitleBoundsTransition(n, t) : this._animateTitleMove(t)
            }, _animateTitleBoundsTransition: function(t, i) {
                var a = this, e = this._$ghostTitle, o = this._titleWidth(), f = this._elementWidth(), s = t === "left", h = this.option("rtlEnabled"), v = s ^ h ? f : -o, y = s ^ h ? -(f + o) : f, c, l;
                return r(e, v), this._toggleGhostTitle(!0), this._swapGhostWithTitle(), c = u.titleMove(e, y, function() {
                    a._toggleGhostTitle(!1)
                }), l = u.titleMove(this._$title, this._calculateTitlePosition(i)), n.when(c, l)
            }, _swapGhostWithTitle: function() {
                var n = this._$ghostTitle, t = this._$title, i = f(t);
                r(t, f(n)), r(n, i)
            }, _calculateTitlePosition: function(n) {
                var t = this._elementWidth(), r = this._titleWidth(), i = t * tt, u = this.option("rtlEnabled") ? t - i - r : i, f = n * this._calculateTitleStep() * this._getRTLSignCorrection();
                return u - f
            }, _calculateTitleStep: function() {
                var i = this._elementWidth(), n = this._titleWidth(), t = this._indexBoundary() || 1;
                return Math.max((n - i) / t, n / t)
            }, _calculateBackgroundPosition: function(n) {
                var t = this._elementWidth(), i = this._calculateBackgroundScaledWidth(), r = this.option("rtlEnabled") ? t - i : 0, u = n * this._calculateBackgroundStep() * this._getRTLSignCorrection();
                return r - u
            }, _calculateBackgroundStep: function() {
                var n = this._itemWidth(), t = this._calculateBackgroundScaledWidth();
                return Math.max((t - n) / (this._indexBoundary() || 1), 0)
            }, _calculateBackgroundScaledWidth: function() {
                return this.element().height() * this.option("backgroundImage.width") / (this.option("backgroundImage.height") || 1)
            }, _initSwipeHandlers: function() {
                this.element().on(s.addNamespace("dxswipestart", this.NAME), {itemSizeFunc: n.proxy(this._elementWidth, this)}, n.proxy(this._swipeStartHandler, this)).on(s.addNamespace("dxswipe", this.NAME), n.proxy(this._swipeUpdateHandler, this)).on(s.addNamespace("dxswipeend", this.NAME), n.proxy(this._swipeEndHandler, this))
            }, _swipeStartHandler: function(n) {
                this._stopAnimations(), n.maxLeftOffset = 1, n.maxRightOffset = 1, (t.designMode || this.option("disabled") || this._indexBoundary() <= 1) && (n.cancel = !0)
            }, _stopAnimations: function() {
                y([this.element(), this._$ghostTitle, this._$title]), y(this._itemsRenderStrategy.allItemElements())
            }, _swipeUpdateHandler: function(n) {
                this._updatePositions(n.offset)
            }, _swipeEndHandler: function(n) {
                var t = this.option("selectedIndex"), i = n.targetOffset * this._getRTLSignCorrection();
                i === 0 ? this._animateRollback(t) : this._animateComplete(this._normalizeIndex(t - i), t)
            }, _renderSelection: function() {
                this._indexChangeOnAnimation || this._updatePositions()
            }, _normalizeIndex: function(n) {
                var t = this._indexBoundary();
                return n < 0 && (n = t + n), n >= t && (n = n - t), n
            }, _indexBoundary: function() {
                return this.option("items").length
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _optionChanged: function(n) {
                switch (n.name) {
                    case"width":
                        this.callBase(n), this._dimensionChanged();
                        break;
                    case"backgroundImage":
                        this._invalidate();
                        break;
                    case"title":
                        this._updateTitle();
                        break;
                    case"items":
                        this._initItemsRenderStrategy(), this.callBase(n);
                        break;
                    default:
                        this.callBase(n)
                    }
            }}))
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.ui, w = r.events, f = t.fx, b = t.utils, o = t.translator, s = "dx-slideout", h = "dx-slideout-wrapper", c = "dx-slideout-item-container", l = "dx-slideout-menu", a = "dx-slideout-shield", e = "dx-slideout-item", v = "dxSlideoutItemData", u = "dx-state-invisible", y = 45, p = 400;
        t.registerComponent("dxSlideOut", r, r.CollectionWidget.inherit({_setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {menuItemRender: {since: "14.2", alias: "menuItemTemplate"}, menuGroupRender: {since: "14.2", alias: "menuGroupTemplate"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({activeStateEnabled: !1, menuItemTemplate: "menuItem", swipeEnabled: !0, menuVisible: !1, menuGrouped: !1, menuGroupTemplate: "menuGroup", selectionMode: "single", selectionRequired: !0})
            }, _itemClass: function() {
                return e
            }, _itemDataKey: function() {
                return v
            }, _init: function() {
                this.callBase(), this._deferredAnimate = i
            }, _render: function() {
                this._renderWrapper(), this._renderItemsContainer(), this._renderShield(), this._renderList(), this._initSwipeHandlers(), this.element().addClass(s), this.callBase(), this._renderPosition(this.option("menuVisible"), !1)
            }, _renderWrapper: function() {
                this._wrapper = n("<div>").addClass(h), this.element().append(this._wrapper)
            }, _renderShield: function() {
                this._$shield = n("<div>").addClass(a), this._$shield.appendTo(this._$container);
                this._$shield.on("dxclick", n.proxy(this.hideMenu, this));
                this._toggleShieldVisibility()
            }, _dimensionChanged: function() {
                this._renderPosition(this.option("menuVisible"), !1), this._clearListWidthCache()
            }, _renderItemsContainer: function() {
                this._$container = n("<div>").addClass(c).appendTo(this._wrapper);
                this._$container.on("MSPointerDown", function() {
                })
            }, _selectedItemElement: function() {
                return this._itemElements().eq(0)
            }, _renderContentImpl: function() {
                var r = this.option("items"), t = this.option("selectedIndex"), i;
                r.length && t > -1 && (i = this._$list.dxList("instance").getItemByIndex(t), this._renderItems([i]))
            }, _renderList: function() {
                this._$list = n("<div>").addClass(l).prependTo(this._wrapper), this._renderItemClickAction();
                var t = this._$list.dxList().dxList("instance");
                this._$list.dxList({_templates: this.option("_templates"), itemTemplateProperty: "menuTemplate", height: "100%", indicateLoading: !1, onItemClick: n.proxy(this._listItemClickHandler, this), items: this.option("items"), dataSource: this.option("dataSource"), itemTemplate: this._getTemplateByOption("menuItemTemplate"), grouped: this.option("menuGrouped"), groupTemplate: this.option("menuGroupTemplate")})
            }, _listItemClickHandler: function(n) {
                var t = this._$list.find(".dx-list-item").index(n.itemElement);
                this.option("selectedIndex", t), this._itemClickAction(n)
            }, _itemClickHandler: n.noop, _renderItemClickAction: function() {
                this._itemClickAction = this._createActionByOption("onItemClick")
            }, _renderItem: function(n, t) {
                this._$container.find("." + e).remove(), this.callBase(n, t, this._$container)
            }, _renderSelection: function() {
                this._renderContent()
            }, _initSwipeHandlers: function() {
                this._$container.dxSwipeable({elastic: !1, itemSizeFunc: n.proxy(this._getListWidth, this), onStart: n.proxy(this.option("swipeEnabled") ? this._swipeStartHandler : function(n) {
                        n.jQueryEvent.cancel = !0
                    }, this), onUpdated: n.proxy(this._swipeUpdateHandler, this), onEnd: n.proxy(this._swipeEndHandler, this)})
            }, _swipeStartHandler: function(n) {
                this._$shield.addClass(u), f.stop(this._$container);
                var t = this.option("menuVisible"), i = this.option("rtlEnabled");
                n.jQueryEvent.maxLeftOffset = +(i ? !t : t), n.jQueryEvent.maxRightOffset = +(i ? t : !t)
            }, _swipeUpdateHandler: function(n) {
                var t = this.option("menuVisible") ? n.jQueryEvent.offset + 1 * this._getRTLSignCorrection() : n.jQueryEvent.offset;
                t *= this._getRTLSignCorrection(), this._renderPosition(t, !1)
            }, _swipeEndHandler: function(n) {
                var t = n.jQueryEvent.targetOffset * this._getRTLSignCorrection() + this.option("menuVisible"), i = t !== 0;
                this.option("menuVisible") === i ? this._renderPosition(this.option("menuVisible"), !0) : this.option("menuVisible", t !== 0)
            }, _menuButtonClickHandler: function() {
                this.option("menuVisible", !this.option("menuVisible"))
            }, _toggleMenuVisibility: function(n) {
                this.option("menuVisible", n)
            }, _renderPosition: function(t, i) {
                var r = this._calculatePixelOffset(t) * this._getRTLSignCorrection();
                i ? (this._$shield.addClass(u), f.animate(this._$container, {type: "slide", to: {left: r}, duration: p, complete: n.proxy(this._animationCompleteHandler, this)})) : o.move(this._$container, {left: r})
            }, _calculatePixelOffset: function(n) {
                var n = n || 0, t = this._getListWidth();
                return n * t
            }, _getListWidth: function() {
                var n, t;
                return this._listWidth || (n = this.element().width() - y, this._$list.css("max-width", n), t = this._$list.width(), this._listWidth = Math.min(t, n)), this._listWidth
            }, _clearListWidthCache: function() {
                delete this._listWidth
            }, _getRTLSignCorrection: function() {
                return this.option("rtlEnabled") ? -1 : 1
            }, _changeMenuOption: function(n, t) {
                this._$list.dxList("instance").option(n, t), this._clearListWidthCache()
            }, _visibilityChanged: function(n) {
                n && this._dimensionChanged()
            }, _optionChanged: function(n) {
                var i = n.name, t = n.value;
                switch (i) {
                    case"menuVisible":
                        this._renderPosition(t, !0);
                        break;
                    case"swipeEnabled":
                        this._initSwipeHandlers();
                        break;
                    case"menuItemTemplate":
                        this._changeMenuOption("itemTemplate", this._getTemplate(t));
                        break;
                    case"items":
                    case"dataSource":
                        this._changeMenuOption(i, t);
                        break;
                    case"menuGrouped":
                        this._changeMenuOption("grouped", t);
                        break;
                    case"menuGroupTemplate":
                        this._changeMenuOption("groupTemplate", this._getTemplate(t));
                        break;
                    case"onItemClick":
                        this._renderItemClickAction();
                        break;
                    case"rtlEnabled":
                        this.callBase(n), this._renderPosition(this.option("menuVisible"), !1);
                        break;
                    default:
                        this.callBase(n)
                    }
            }, _toggleShieldVisibility: function() {
                this._$shield.toggleClass(u, !this.option("menuVisible"))
            }, _animationCompleteHandler: function() {
                this._toggleShieldVisibility(), this._deferredAnimate && this._deferredAnimate.resolveWith(this)
            }, showMenu: function() {
                return this.toggleMenuVisibility(!0)
            }, hideMenu: function() {
                return this.toggleMenuVisibility(!1)
            }, toggleMenuVisibility: function(t) {
                return t = t === i ? !this.option("menuVisible") : t, this._deferredAnimate = n.Deferred(), this.option("menuVisible", t), this._deferredAnimate.promise()
            }}))
    }(jQuery, DevExpress), DevExpress.MOD_WIDGETS_MOBILE = !0
}
if (!DevExpress.MOD_FRAMEWORK) {
    if (!window.DevExpress)
        throw Error("Required module is not referenced: core");
    (function(n, t, i) {
        var u = function(n, t, i) {
            for (var u = [], r = 0, f = n.length; r < f; r++)
                i(n[r], t) || u.push(n[r]);
            return u.push.apply(u, t), u
        }, f = function(t, i) {
            var r = !1;
            return n.each(i, function(n, i) {
                var f = t.option("id") === i.option("id") && i.option("id"), u = t.option("behavior") === i.option("behavior") && t.option("behavior");
                return r = f || u, u && i.option("onExecute") === null && i.option("onExecute", t.option("onExecute")), r ? (t.element().remove(), !1) : void 0
            }), r
        }, e = function(n, t) {
            return u(n, t, f)
        }, r = function(n, t, r, u) {
            var e = t ? t[r] : i, o = e === i ? u : e, f = n.option(r);
            return f === i || f === u ? o : f
        }, o = function(n, t) {
            var i = r(n, t, "showText"), u = !!n.option("icon") || n.option("iconSrc"), f = r(n, t, "title", "");
            return i || !u ? f : ""
        }, s = function(n, t, i) {
            var u = r(n, t, "showIcon"), f = !!n.option("title"), e = r(n, t, i, "");
            return u || !f ? e : ""
        }, h = function(n, t) {
            return r(n, t, "type")
        };
        t.framework = {utils: {mergeCommands: e, commandToContainer: {resolveTypeValue: h, resolveIconValue: s, resolveTextValue: o, resolvePropertyValue: r}}, templateProvider: t.ui.KoTemplateProvider ? new t.ui.KoTemplateProvider : i}
    })(jQuery, DevExpress), function(n, t) {
        n.extend(t.ERROR_MESSAGES, {E3001: "Routing rule is not found for the '{0}' URI.", E3002: "The passed object cannot be formatted into a URI string by the application's router. An appropriate route should be registered.", E3003: "Unable to navigate. Application is being initialized.", E3004: "Cannot execute the command: {0}.", E3005: "The '{0}' command {1} is not registered in the application's command mapping. Go to http://dxpr.es/1bTjfj1 for more details.", E3006: "Unknown navigation target: '{0}'. Use the 'current', 'back' or 'blank' values.", E3007: "Error while restoring the application state. The state has been cleared. Refresh the page.", E3008: "Unable to go back.", E3009: "Unable to go forward.", E3010: "The command's 'id' option should be specified.\r\nProcessed markup: {0}\n", E3011: "Layout controller cannot be resolved. There are no appropriate layout controllers for the current context. Check browser console for details.", E3012: "Layout controller cannot be resolved. Two or more layout controllers suit the current context. Check browser console for details.", E3013: "The '{0}' template with the '{1}' name is not found. Make sure the case is correct in the specified view name and the template fits the current context.", E3014: "All the children of the dxView element should be either of the dxCommand or dxContent type.\r\nProcessed markup: {0}", E3015: "The 'exec' method should be called before the 'finalize' method.", E3016: "Unknown transition type '{0}'.", E3018: "Unable to parse options.\nMessage: {0};\nOptions value: {1}.", E3019: "View templates should be updated according to the 13.1 changes. Go to http://dxpr.es/15ikrJA for more details.", E3020: "Concurrent templates are found:\r\n{0}Target device:\r\n{1}.", E3021: "Remote template cannot be loaded.\r\nUrl:{0}\r\nError:{1}.", E3022: "Cannot initialize the HtmlApplication component.", E3023: "Navigation item is not found", W3001: "A view with the '{0}' key doesn't exist.", W3002: "A view with the '{0}' key has already been released.", W3003: "Layout resolving context:\n{0}\nAvailable layout controller registrations:\n{1}\n", W3004: "Layout resolving context:\n{0}\nConcurent layout controller registrations for the context:\n{1}\n", W3005: 'Direct hash-based navigation is detected. Use data-bind="dxAction: url" instead of href="#url".\nFound markup:\n{0}\n'})
    }(jQuery, DevExpress), function(n, t) {
        var i = encodeURIComponent("json:"), r = t.Class;
        t.framework.Route = r.inherit({_trimSeparators: function(n) {
                return n.replace(/^[\/.]+|\/+$/g, "")
            }, _escapeRe: function(n) {
                return n.replace(/\W/g, "\\$1")
            }, _checkConstraint: function(n, t) {
                n = String(n), typeof t == "string" && (t = new RegExp(t));
                var i = t.exec(n);
                return!i || i[0] !== n ? !1 : !0
            }, _ensureReady: function() {
                var t = this;
                if (this._patternRe)
                    return!1;
                this._pattern = this._trimSeparators(this._pattern), this._patternRe = "", this._params = [], this._segments = [], this._separators = [], this._pattern.replace(/[^\/]+/g, function(n, i) {
                    t._segments.push(n), i && t._separators.push(t._pattern.substr(i - 1, 1))
                }), n.each(this._segments, function(n) {
                    var u = !0, i = this, r = n ? t._separators[n - 1] : "";
                    i.charAt(0) === ":" ? (u = !1, i = i.substr(1), t._params.push(i), t._patternRe += "(?:" + r + "([^/]*))", i in t._defaults && (t._patternRe += "?")) : t._patternRe += r + t._escapeRe(i)
                }), this._patternRe = new RegExp("^" + this._patternRe + "$")
            }, ctor: function(n, t, i) {
                this._pattern = n || "", this._defaults = t || {}, this._constraints = i || {}
            }, parse: function(t) {
                var u = this, i, r;
                return(this._ensureReady(), i = this._patternRe.exec(t), !i) ? !1 : (r = n.extend({}, this._defaults), n.each(this._params, function(n) {
                    var t = n + 1;
                    i.length >= t && i[t] && (r[this] = u.parseSegment(i[t]))
                }), n.each(this._constraints, function(n) {
                    if (!u._checkConstraint(r[n], u._constraints[n]))
                        return r = !1, !1
                }), r)
            }, format: function(t) {
                var r = this, u = "", c, o;
                this._ensureReady();
                var f = n.extend({}, this._defaults), s = 0, i = [], h = [], e = {};
                return(n.each(t, function(n, i) {
                    t[n] = r.formatSegment(i), n in f || (e[n] = !0)
                }), n.each(this._segments, function(n, u) {
                    if (i[n] = n ? r._separators[n - 1] : "", u.charAt(0) === ":") {
                        var o = u.substr(1);
                        if (!(o in t) && !(o in r._defaults) || o in r._constraints && !r._checkConstraint(t[o], r._constraints[o]))
                            return i = null, !1;
                        o in t ? (t[o] !== undefined && (f[o] = t[o], i[n] += t[o], s = n), delete e[o]) : o in f && (i[n] += f[o], h.push(n))
                    } else
                        i[n] += u, s = n
                }), n.each(f, function(u, f) {
                    if (!!f && n.inArray(":" + u, r._segments) === -1 && t[u] !== f)
                        return i = null, !1
                }), c = 0, n.isEmptyObject(e) || (u = "?", n.each(e, function(n) {
                    u += n + "=" + t[n] + "&", c++
                }), u = u.substr(0, u.length - 1)), i === null) ? !1 : (h.length && n.map(h, function(n) {
                    n >= s && (i[n] = "")
                }), o = i.join(""), o = o.replace(/\/+$/, ""), {uri: o + u, unusedCount: c})
            }, formatSegment: function(t) {
                return n.isArray(t) || n.isPlainObject(t) ? i + encodeURIComponent(JSON.stringify(t)) : encodeURIComponent(t)
            }, parseSegment: function(t) {
                if (t.substr(0, i.length) === i)
                    try {
                        return n.parseJSON(decodeURIComponent(t.substr(i.length)))
                    } catch (r) {
                    }
                return decodeURIComponent(t)
            }}), t.framework.Router = t.Class.inherit({ctor: function() {
                this._registry = []
            }, _trimSeparators: function(n) {
                return n.replace(/^[\/.]+|\/+$/g, "")
            }, _createRoute: function(n, i, r) {
                return new t.framework.Route(n, i, r)
            }, register: function(n, t, i) {
                this._registry.push(this._createRoute(n, t, i))
            }, _parseQuery: function(t) {
                var i = {}, r = t.split("&");
                return n.each(r, function(n, t) {
                    var r = t.split("=");
                    i[r[0]] = decodeURIComponent(r[1])
                }), i
            }, parse: function(t) {
                var f = this, i;
                t = this._trimSeparators(t);
                var r = t.split("?", 2), e = r[0], u = r[1];
                return n.each(this._registry, function() {
                    var t = this.parse(e);
                    if (t !== !1)
                        return i = t, u && (i = n.extend(i, f._parseQuery(u))), !1
                }), i ? i : !1
            }, format: function(t) {
                var i = !1, r = 99999;
                return t = t || {}, n.each(this._registry, function() {
                    var f = n.extend(!0, {}, t), u = this.format(f);
                    u !== !1 && r > u.unusedCount && (r = u.unusedCount, i = u.uri)
                }), i
            }})
    }(jQuery, DevExpress), function(n, t) {
        var r = t.ui, i = t.DOMComponent.inherit({ctor: function(t, i) {
                n.isPlainObject(t) && (i = t, t = n("<div />")), this.beforeExecute = n.Callbacks(), this.afterExecute = n.Callbacks(), this._callbacksToEvents("Command", ["beforeExecute", "afterExecute"]), this.callBase(t, i)
            }, _setDeprecatedOptions: function() {
                this.callBase(), n.extend(this._deprecatedOptions, {action: {since: "14.2", alias: "onExecute"}})
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({onExecute: null, id: null, title: "", icon: "", iconSrc: "", visible: !0, disabled: !1})
            }, execute: function() {
                var i = this._options.disabled;
                if (n.isFunction(i) && (i = !!i.apply(this, arguments)), i)
                    throw t.Error("E3004", this._options.id);
                this.fireEvent("beforeExecute", arguments), this._createActionByOption("onExecute").apply(this, arguments), this.fireEvent("afterExecute", arguments)
            }, _render: function() {
                this.callBase(), this.element().addClass("dx-command")
            }, _renderDisabledState: n.noop, _dispose: function() {
                this.callBase(), this.element().removeData(this.NAME), this.beforeExecute.empty(), this.afterExecute.empty()
            }});
        t.registerComponent("dxCommand", t.framework, i)
    }(jQuery, DevExpress), function(n, t) {
        t.framework.CommandMapping = t.Class.inherit({ctor: function() {
                this._commandMappings = {}, this._containerDefaults = {}
            }, setDefaults: function(n, t) {
                return this._containerDefaults[n] = t, this
            }, mapCommands: function(t, i) {
                var r = this;
                return n.each(i, function(i, u) {
                    typeof u == "string" && (u = {id: u});
                    var e = u.id, f = r._commandMappings[t] || {};
                    f[e] = n.extend({showIcon: !0, showText: !0}, r._containerDefaults[t] || {}, u), r._commandMappings[t] = f
                }), this._initExistingCommands(), this
            }, unmapCommands: function(t, i) {
                var r = this;
                n.each(i, function(n, i) {
                    var u = r._commandMappings[t] || {};
                    u && delete u[i]
                }), this._initExistingCommands()
            }, getCommandMappingForContainer: function(n, t) {
                return(this._commandMappings[t] || {})[n]
            }, checkCommandsExist: function(i) {
                var u = this, r = n.grep(i, function(t, r) {
                    return n.inArray(t, u._existingCommands) < 0 && n.inArray(t, i) === r
                });
                if (r.length !== 0)
                    throw t.Error("E3005", r.join("', '"), r.length === 1 ? " is" : "s are");
            }, load: function(t) {
                if (t) {
                    var i = this;
                    return n.each(t, function(n, t) {
                        i.setDefaults(n, t.defaults), i.mapCommands(n, t.commands)
                    }), this
                }
            }, _initExistingCommands: function() {
                var t = this;
                this._existingCommands = [], n.each(t._commandMappings, function(i, r) {
                    n.each(r, function(i, r) {
                        n.inArray(r.id, t._existingCommands) < 0 && t._existingCommands.push(r.id)
                    })
                })
            }}), t.framework.CommandMapping.defaultMapping = {"global-navigation": {defaults: {showIcon: !0, showText: !0}, commands: []}, "ios-header-toolbar": {defaults: {showIcon: !1, showText: !0, location: "after"}, commands: ["edit", "save", {id: "back", location: "before"}, {id: "cancel", location: "before"}, {id: "create", showIcon: !0, showText: !1}]}, "ios-action-sheet": {defaults: {showIcon: !1, showText: !0}, commands: []}, "ios-view-footer": {defaults: {showIcon: !1, showText: !0}, commands: [{id: "delete", type: "danger"}]}, "android-header-toolbar": {defaults: {showIcon: !0, showText: !1, location: "after"}, commands: [{id: "back", showIcon: !1, location: "before"}, "create", "edit", "save", {id: "cancel", showText: !0, location: "menu"}, {id: "delete", showText: !0, location: "menu"}]}, "android-simple-toolbar": {defaults: {showIcon: !0, showText: !1, location: "after"}, commands: [{id: "back", showIcon: !1, location: "before"}, {id: "create"}, {id: "save", showText: !0, location: "before"}, {id: "edit", showText: !0, location: "menu"}, {id: "cancel", showText: !0, location: "menu"}, {id: "delete", showText: !0, location: "menu"}]}, "android-footer-toolbar": {defaults: {location: "after"}, commands: [{id: "create", showText: !1, location: "center"}, {id: "edit", showText: !1, location: "before"}, {id: "delete", location: "menu"}, {id: "save", showIcon: !1, location: "before"}]}, "tizen-header-toolbar": {defaults: {showIcon: !0, showText: !1, location: "after"}, commands: [{id: "back", showIcon: !1, location: "before"}, "create", "edit", "save", {id: "cancel", showText: !0, location: "menu"}, {id: "delete", showText: !0, location: "menu"}]}, "tizen-footer-toolbar": {defaults: {location: "after"}, commands: [{id: "create", showText: !1}, {id: "edit", showText: !1, location: "before"}, {id: "delete", location: "menu"}, {id: "save", showIcon: !1, location: "before"}]}, "tizen-simple-toolbar": {defaults: {showIcon: !0, showText: !1, location: "after"}, commands: [{id: "back", showIcon: !1, location: "before"}, {id: "create"}, {id: "save", showText: !0, location: "before"}, {id: "edit", showText: !0, location: "menu"}, {id: "cancel", showText: !0, location: "menu"}, {id: "delete", showText: !0, location: "menu"}]}, "generic-header-toolbar": {defaults: {showIcon: !1, showText: !0, location: "after"}, commands: ["edit", "save", {id: "back", location: "before"}, {id: "cancel", location: "before"}, {id: "create", showIcon: !0, showText: !1}]}, "generic-view-footer": {defaults: {showIcon: !1, showText: !0}, commands: [{id: "delete", type: "danger"}]}, "win8-appbar": {defaults: {location: "after"}, commands: ["edit", "cancel", "save", "delete", {id: "create", location: "before"}, {id: "refresh", location: "before"}]}, "win8-toolbar": {defaults: {showText: !1, location: "before"}, commands: [{id: "previousPage"}]}, "win8-phone-appbar": {defaults: {location: "center"}, commands: ["create", "edit", "cancel", "save", "refresh", {id: "delete", location: "menu"}]}, "win8-split-toolbar": {defaults: {showIcon: !0, showText: !1, location: "after"}, commands: [{id: "back", showIcon: !1, location: "before"}, {id: "create"}, {id: "save", showText: !0, location: "before"}, {id: "edit", showText: !0, location: "menu"}, {id: "cancel", showText: !0, location: "menu"}, {id: "delete", showText: !0, location: "menu"}]}, "win8-master-detail-toolbar": {defaults: {showText: !1, location: "before"}, commands: ["back"]}, "desktop-toolbar": {defaults: {showIcon: !1, showText: !0, location: "after"}, commands: ["cancel", "create", "edit", "save", {id: "delete", type: "danger"}]}}
    }(jQuery, DevExpress), function(n, t) {
        var r = t.Class, u;
        t.framework.ViewCache = r.inherit({ctor: function() {
                this._cache = {}, this.viewRemoved = n.Callbacks(), this._callbacksToEvents("ViewCache", ["viewRemoved"])
            }, setView: function(n, t) {
                this._cache[n] = t
            }, getView: function(n) {
                return this._cache[n]
            }, removeView: function(n) {
                var t = this._cache[n];
                return t && (delete this._cache[n], this.fireEvent("viewRemoved", [{viewInfo: t}])), t
            }, clear: function() {
                var t = this;
                n.each(this._cache, function(n) {
                    t.removeView(n)
                })
            }, hasView: function(n) {
                return n in this._cache
            }}).include(t.EventsMixin), t.framework.NullViewCache = t.framework.ViewCache.inherit({setView: function(n, t) {
                this.callBase(n, t), this.removeView(n)
            }}), t.framework.ConditionalViewCacheDecorator = r.inherit({ctor: function(n) {
                this._filter = n.filter, this._viewCache = n.viewCache, this.viewRemoved = this._viewCache.viewRemoved, this._events = this._viewCache._events
            }, setView: function(n, t) {
                this._viewCache.setView(n, t), this._filter(n, t) || this._viewCache.removeView(n)
            }, getView: function(n) {
                return this._viewCache.getView(n)
            }, removeView: function(n) {
                return this._viewCache.removeView(n)
            }, clear: function() {
                return this._viewCache.clear()
            }, hasView: function(n) {
                return this._viewCache.hasView(n)
            }}).include(t.EventsMixin), u = 10, t.framework.CapacityViewCacheDecorator = r.inherit({ctor: function(n) {
                this._keys = [], this._size = n.size || u, this._viewCache = n.viewCache, this.viewRemoved = this._viewCache.viewRemoved, this._events = this._viewCache._events
            }, setView: function(n, t) {
                this.hasView(n) || (this._keys.length == this._size && this.removeView(this._keys[0]), this._keys.push(n)), this._viewCache.setView(n, t)
            }, getView: function(t) {
                var i = n.inArray(t, this._keys);
                return i < 0 ? null : (this._keys.push(t), this._keys.splice(i, 1), this._viewCache.getView(t))
            }, removeView: function(t) {
                var i = n.inArray(t, this._keys);
                return i > -1 && this._keys.splice(i, 1), this._viewCache.removeView(t)
            }, clear: function() {
                return this._keys = [], this._viewCache.clear()
            }, hasView: function(n) {
                return this._viewCache.hasView(n)
            }}).include(t.EventsMixin), t.framework.HistoryDependentViewCacheDecorator = r.inherit({ctor: function(i) {
                this._viewCache = i.viewCache || new t.framework.ViewCache, this._navigationManager = i.navigationManager;
                this._navigationManager.on("itemRemoved", n.proxy(this._onNavigationItemRemoved, this));
                this.viewRemoved = this._viewCache.viewRemoved, this._events = this._viewCache._events
            }, _onNavigationItemRemoved: function(n) {
                this.removeView(n.key)
            }, setView: function(n, t) {
                this._viewCache.setView(n, t)
            }, getView: function(n) {
                return this._viewCache.getView(n)
            }, removeView: function(n) {
                return this._viewCache.removeView(n)
            }, clear: function() {
                return this._viewCache.clear()
            }, hasView: function(n) {
                return this._viewCache.hasView(n)
            }}).include(t.EventsMixin)
    }(jQuery, DevExpress), function(n, t) {
        var r = t.Class;
        t.framework.MemoryKeyValueStorage = r.inherit({ctor: function() {
                this.storage = {}
            }, getItem: function(n) {
                return this.storage[n]
            }, setItem: function(n, t) {
                this.storage[n] = t
            }, removeItem: function(n) {
                delete this.storage[n]
            }}), t.framework.StateManager = r.inherit({ctor: function(n) {
                n = n || {}, this.storage = n.storage || new t.framework.MemoryKeyValueStorage, this.stateSources = n.stateSources || []
            }, addStateSource: function(n) {
                this.stateSources.push(n)
            }, removeStateSource: function(t) {
                var i = n.inArray(t, this.stateSources);
                i > -1 && (this.stateSources.splice(i, 1), t.removeState(this.storage))
            }, saveState: function() {
                var t = this;
                n.each(this.stateSources, function(n, i) {
                    i.saveState(t.storage)
                })
            }, restoreState: function() {
                var t = this;
                n.each(this.stateSources, function(n, i) {
                    i.restoreState(t.storage)
                })
            }, clearState: function() {
                var t = this;
                n.each(this.stateSources, function(n, i) {
                    i.removeState(t.storage)
                })
            }})
    }(jQuery, DevExpress), function(n, t) {
        var u = t.Class, r = "__root__", f = "__buffer__";
        t.framework.DefaultBrowserAdapter = u.inherit({ctor: function(i) {
                i = i || {}, this._window = i.window || window, this.popState = n.Callbacks();
                n(this._window).on("hashchange", n.proxy(this._onHashChange, this));
                this._tasks = t.createQueue(), this.canWorkInPureBrowser = !0
            }, replaceState: function(n) {
                var t = this;
                return this._addTask(function() {
                    n = t._normalizeUri(n), t._window.history.replaceState(null, null, "#" + n), t._currentTask.resolve()
                })
            }, pushState: function(n) {
                var t = this;
                return this._addTask(function() {
                    n = t._normalizeUri(n), t._window.history.pushState(null, null, "#" + n), t._currentTask.resolve()
                })
            }, createRootPage: function() {
                return this.replaceState(r)
            }, _onHashChange: function() {
                this._currentTask && this._currentTask.resolve(), this.popState.fire()
            }, back: function() {
                var n = this;
                return this._addTask(function() {
                    n._window.history.back()
                })
            }, getHash: function() {
                return this._normalizeUri(this._window.location.hash)
            }, isRootPage: function() {
                return this.getHash() === r
            }, _normalizeUri: function(n) {
                return(n || "").replace(/^#+/, "")
            }, _addTask: function(t) {
                var r = this, i = n.Deferred();
                return this._tasks.add(function() {
                    return r._currentTask = i, t(), i
                }), i.promise()
            }}), t.framework.OldBrowserAdapter = t.framework.DefaultBrowserAdapter.inherit({ctor: function() {
                this._innerEventCount = 0, this.callBase.apply(this, arguments), this._skipNextEvent = !1
            }, replaceState: function(t) {
                var i = this;
                return(t = i._normalizeUri(t), i.getHash() !== t) ? (i._addTask(function() {
                    i._skipNextEvent = !0, i._window.history.back()
                }), i._addTask(function() {
                    i._skipNextEvent = !0, i._window.location.hash = t
                })) : n.Deferred().resolve().promise()
            }, pushState: function(t) {
                var i = this;
                return(t = this._normalizeUri(t), this.getHash() !== t) ? i._addTask(function() {
                    i._skipNextEvent = !0, i._window.location.hash = t
                }) : n.Deferred().resolve().promise()
            }, createRootPage: function() {
                return this.pushState(r)
            }, _onHashChange: function() {
                var n = this._currentTask;
                this._currentTask = null, this._skipNextEvent ? this._skipNextEvent = !1 : this.popState.fire(), n && n.resolve()
            }}), t.framework.BuggyAndroidBrowserAdapter = t.framework.OldBrowserAdapter.inherit({createRootPage: function() {
                return this.pushState(f), this.callBase()
            }}), t.framework.HistorylessBrowserAdapter = t.framework.DefaultBrowserAdapter.inherit({ctor: function(t) {
                t = t || {}, this._window = t.window || window, this.popState = n.Callbacks();
                n(this._window).on("dxback", n.proxy(this._onHashChange, this));
                this._currentHash = this._window.location.hash
            }, replaceState: function(t) {
                return this._currentHash = this._normalizeUri(t), n.Deferred().resolve().promise()
            }, pushState: function(n) {
                return this.replaceState(n)
            }, createRootPage: function() {
                return this.replaceState(r)
            }, getHash: function() {
                return this._normalizeUri(this._currentHash)
            }, back: function() {
                return this.replaceState(r)
            }, _onHashChange: function() {
                var n = this.back();
                return this.popState.fire(), n
            }}), t.framework.BuggyCordovaWP81BrowserAdapter = t.framework.DefaultBrowserAdapter.inherit({ctor: function(n) {
                this.callBase(n), this.canWorkInPureBrowser = !1
            }})
    }(jQuery, DevExpress), function(n, t) {
        var u = t.Class, r = "dxPhoneJSApplication";
        t.framework.HistoryBasedNavigationDevice = u.inherit({ctor: function(t) {
                t = t || {}, this._browserAdapter = t.browserAdapter || this._createBrowserAdapter(t), this.uriChanged = n.Callbacks(), this._browserAdapter.popState.add(n.proxy(this._onPopState, this))
            }, init: n.noop, getUri: function() {
                return this._browserAdapter.getHash()
            }, setUri: function(t, i) {
                return i ? this._browserAdapter.replaceState(t) : t !== this.getUri() ? this._browserAdapter.pushState(t) : n.Deferred().resolve().promise()
            }, back: function() {
                return this._browserAdapter.back()
            }, _onPopState: function() {
                this.uriChanged.fire(this.getUri())
            }, _isBuggyAndroid2: function() {
                var i = t.devices.real(), n = i.version;
                return i.platform === "android" && n.length > 1 && (n[0] === 2 && n[1] < 4 || n[0] < 2)
            }, _isBuggyAndroid4: function() {
                var i = t.devices.real(), n = i.version;
                return i.platform === "android" && n.length > 1 && n[0] === 4 && n[1] === 0
            }, _isWindowsPhone8: function() {
                var n = t.devices.real();
                return n.platform === "win8" && n.phone
            }, _createBrowserAdapter: function(n) {
                var r = n.window || window, u = r.history.replaceState && r.history.pushState, i;
                return i = this._isWindowsPhone8() ? new t.framework.BuggyCordovaWP81BrowserAdapter(n) : r !== r.top ? new t.framework.HistorylessBrowserAdapter(n) : this._isBuggyAndroid4() ? new t.framework.BuggyAndroidBrowserAdapter(n) : this._isBuggyAndroid2() || !u ? new t.framework.OldBrowserAdapter(n) : new t.framework.DefaultBrowserAdapter(n)
            }}), t.framework.StackBasedNavigationDevice = t.framework.HistoryBasedNavigationDevice.inherit({ctor: function(t) {
                this.callBase(t), this.backInitiated = n.Callbacks(), this._deferredNavigate = null;
                n(window).on("unload", this._saveBrowserState)
            }, init: function() {
                var t = this;
                return t._browserAdapter.canWorkInPureBrowser ? t._initRootPage().done(function() {
                    t._browserAdapter.isRootPage() && t._browserAdapter.pushState("")
                }) : n.Deferred().resolve().promise()
            }, setUri: function(n) {
                return this.callBase(n, !this._browserAdapter.isRootPage())
            }, _saveBrowserState: function() {
                window.sessionStorage && sessionStorage.setItem(r, !0)
            }, _initRootPage: function() {
                var t = this.getUri();
                return!window.sessionStorage || sessionStorage.getItem(r) ? n.Deferred().resolve().promise() : (sessionStorage.removeItem(r), this._browserAdapter.createRootPage(), this._browserAdapter.pushState(t))
            }, _onPopState: function() {
                var t = this._deferredNavigate && this._deferredNavigate.state() === "pending";
                this._browserAdapter.isRootPage() ? t ? this._deferredNavigate.resolve() : this.backInitiated.fire() : (t || (this._deferredNavigate = n.Deferred().done(n.proxy(this.callBase, this))), this.back())
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        var u = t.Class, r = {current: "current", blank: "blank", back: "back"}, f = "__history";
        t.framework.HistoryBasedNavigationManager = u.inherit({ctor: function(t) {
                t = t || {}, this._currentItem = i, this._previousItem = i, this.navigating = n.Callbacks(), this.navigated = n.Callbacks(), this.navigationCanceled = n.Callbacks(), this.navigatingBack = n.Callbacks(), this.itemRemoved = n.Callbacks(), this._callbacksToEvents("DefaultLayoutController", ["navigating", "navigated", "navigationCanceled", "navigatingBack", "itemRemoved"]), this._createNavigationDevice(t)
            }, _createNavigationDevice: function(i) {
                this._navigationDevice = i.navigationDevice || new t.framework.HistoryBasedNavigationDevice, this._navigationDevice.uriChanged.add(n.proxy(this._uriChangedHandler, this))
            }, _uriChangedHandler: function(n) {
                while (t.hideTopOverlayCallback.fire())
                    ;
                this.navigate(n, {target: "none"})
            }, _cancelNavigation: function(n) {
                this.fireEvent("navigationCanceled", [n])
            }, _getDefaultOptions: function() {
                return{direction: "none", target: r.blank}
            }, _updateHistory: function(n, t) {
                this._previousItem = this._currentItem, this._currentItem = {uri: n, key: n}, t.target !== "none" && this._navigationDevice.setUri(n, t.target === "current")
            }, _setCurrentItem: function(n) {
                this._currentItem = n
            }, navigate: function(r, u) {
                u = u || {};
                var f = this, s = f._currentItem || {}, c = u.item || {}, o = s.uri, l = s.key, h = c.key, e;
                if (r === i && (r = f._navigationDevice.getUri()), /^_back$/.test(r)) {
                    f.back();
                    return
                }
                u = n.extend(f._getDefaultOptions(), u || {}), e = {currentUri: o, uri: r, cancel: !1, navigateWhen: [], options: u}, f.fireEvent("navigating", [e]), r = e.uri, e.cancel || o === r && (h === i || h === l) && !f._forceNavigate ? f._cancelNavigation(e) : (f._forceNavigate = !1, n.when.apply(n, e.navigateWhen).done(function() {
                    t.utils.executeAsync(function() {
                        f._updateHistory(r, u), f.fireEvent("navigated", [{uri: r, previousUri: o, options: u, item: f._currentItem}])
                    })
                }))
            }, back: function() {
                return this._navigationDevice.back()
            }, previousItem: function() {
                return this._previousItem
            }, currentItem: function(n) {
                if (arguments.length > 0) {
                    if (!n)
                        throw t.Error("E3023");
                    this._setCurrentItem(n)
                } else
                    return this._currentItem
            }, rootUri: function() {
                return this._currentItem && this._currentItem.uri
            }, canBack: function() {
                return!0
            }, saveState: n.noop, restoreState: n.noop, removeState: n.noop}).include(t.EventsMixin), t.framework.StackBasedNavigationManager = t.framework.HistoryBasedNavigationManager.inherit({ctor: function(i) {
                i = i || {}, this.callBase(i), this._createNavigationStacks(i), t.hardwareBackButton.add(n.proxy(this._deviceBackInitiated, this)), this._stateStorageKey = i.stateStorageKey || f
            }, init: function() {
                return this._navigationDevice.init()
            }, _createNavigationDevice: function(i) {
                i.navigationDevice || (i.navigationDevice = new t.framework.StackBasedNavigationDevice), this.callBase(i), this._navigationDevice.backInitiated.add(n.proxy(this._deviceBackInitiated, this))
            }, _uriChangedHandler: function(n) {
                this.navigate(n)
            }, _createNavigationStacks: function(n) {
                this.navigationStacks = {}, this._keepPositionInStack = n.keepPositionInStack, this.currentStack = new t.framework.NavigationStack
            }, _deviceBackInitiated: function() {
                t.hideTopOverlayCallback.fire() ? this._syncUriWithCurrentNavigationItem() : this.back({isHardwareButton: !0})
            }, _syncUriWithCurrentNavigationItem: function() {
                var n = this._currentItem && this._currentItem.uri;
                this._navigationDevice.setUri(n)
            }, _cancelNavigation: function(n) {
                this._syncUriWithCurrentNavigationItem(), this.callBase(n)
            }, _getDefaultOptions: function() {
                return{target: r.blank}
            }, _createNavigationStack: function() {
                var i = new t.framework.NavigationStack;
                return i.itemsRemoved.add(n.proxy(this._removeItems, this)), i
            }, _setCurrentItem: function(n) {
                this._setCurrentStack(n.stack), this.currentStack.currentItem(n), this.callBase(n), this._syncUriWithCurrentNavigationItem()
            }, _setCurrentStack: function(t) {
                var r, i;
                typeof t == "string" ? (i = t, i in this.navigationStacks || (this.navigationStacks[i] = this._createNavigationStack()), r = this.navigationStacks[i]) : (r = t, i = n.map(this.navigationStacks, function(n, i) {
                    return n === t ? i : null
                })[0]), this.currentStack = r, this.currentStackKey = i
            }, _updateHistory: function(n, u) {
                var f = u.root, o = f, s = !1, l = u.stack || (f ? n : this.currentStackKey || n), a = this.currentStack, v = u.keepPositionInStack !== i ? u.keepPositionInStack : this._keepPositionInStack, h, c, e;
                if (this._setCurrentStack(l), (f || !this.currentStack.items.length) && (s = this.currentStack === a, o = !0), f && this.currentStack.items.length)
                    (!v || s) && (this.currentStack.currentIndex = 0, this.currentItem().uri !== n && this.currentStack.navigate(n, !0));
                else {
                    h = this.currentStack.currentIndex, c = this.currentItem() || {};
                    switch (u.target) {
                        case r.blank:
                            this.currentStack.navigate(n);
                            break;
                        case r.current:
                            this.currentStack.navigate(n, !0);
                            break;
                        case r.back:
                            this.currentStack.currentIndex > 0 ? this.currentStack.back(n) : this.currentStack.navigate(n, !0);
                            break;
                        default:
                            throw t.Error("E3006", u.target);
                    }
                    u.direction === i && (e = this.currentStack.currentIndex - h, u.direction = e < 0 ? this.currentStack.currentItem().backDirection || "backward" : e > 0 && this.currentStack.currentIndex > 0 ? "forward" : "none"), c.backDirection = u.direction === "forward" ? "backward" : "none"
                }
                u.root = o, this._currentItem = this.currentStack.currentItem(), this._syncUriWithCurrentNavigationItem()
            }, _removeItems: function(t) {
                var i = this;
                n.each(t, function(n, t) {
                    i.fireEvent("itemRemoved", [t])
                })
            }, back: function(t) {
                var i, u;
                if (t = t || {}, i = n.extend({cancel: !1}, t), this.fireEvent("navigatingBack", [i]), i.cancel) {
                    this._syncUriWithCurrentNavigationItem();
                    return
                }
                u = this.previousItem(i.stack), u ? this.navigate(u.uri, {stack: i.stack, target: r.back, item: u}) : this.callBase()
            }, rootUri: function() {
                return this.currentStack.items.length ? this.currentStack.items[0].uri : this.callBase()
            }, canBack: function(n) {
                var t = n ? this.navigationStacks[n] : this.currentStack;
                return t.canBack()
            }, saveState: function(t) {
                if (this.currentStack.items.length) {
                    var i = {items: n.map(this.currentStack.items, function(n) {
                            return{key: n.key, uri: n.uri}
                        }), currentIndex: this.currentStack.currentIndex, currentStackKey: this.currentStack.items[0].uri}, r = JSON.stringify(i);
                    t.setItem(this._stateStorageKey, r)
                } else
                    this.removeState(t)
            }, restoreState: function(i) {
                var f, u, r;
                if (!this.disableRestoreState && (f = i.getItem(this._stateStorageKey), f))
                    try {
                        if (u = JSON.parse(f), r = this._createNavigationStack(), !u.items[0].uri)
                            throw t.Error("E3007");
                        r.items = n.map(u.items, function(n) {
                            return n.stack = r, n
                        }), r.currentIndex = u.currentIndex, this.navigationStacks[r.items[0].uri] = r, this.currentStackKey = u.currentStackKey, this.currentStack = this.navigationStacks[this.currentStackKey], this._currentItem = this.currentStack.currentItem(), this._navigationDevice.setUri(this.currentItem().uri), this._forceNavigate = !0
                    } catch (e) {
                        this.removeState(i);
                        throw e;
                    }
            }, removeState: function(n) {
                n.removeItem(this._stateStorageKey)
            }, currentIndex: function() {
                return this.currentStack.currentIndex
            }, previousItem: function(n) {
                var t = n ? this.navigationStacks[n] : this.currentStack;
                return t.previousItem()
            }, getItemByIndex: function(n) {
                return this.currentStack.items[n]
            }, clearHistory: function() {
                this.currentStack.clear()
            }, itemByKey: function(t) {
                var i;
                return n.each(this.navigationStacks, function(n, r) {
                    var u = r.itemByKey(t);
                    if (u)
                        return i = u, !1
                }), i
            }, currentItem: function(t) {
                var i;
                if (arguments.length > 0)
                    typeof t == "string" ? i = this.itemByKey(t) : n.isPlainObject(t) && (i = t), this.callBase(i);
                else
                    return this.callBase()
            }}), t.framework.NavigationStack = u.inherit({ctor: function(t) {
                t = t || {}, this.itemsRemoved = n.Callbacks(), this.clear()
            }, currentItem: function(n) {
                if (n) {
                    for (var t = 0; t < this.items.length; t++)
                        if (n === this.items[t]) {
                            this.currentIndex = t;
                            break
                        }
                } else
                    return this.items[this.currentIndex]
            }, previousItem: function() {
                return this.items.length > 1 ? this.items[this.currentIndex - 1] : i
            }, canBack: function() {
                return this.currentIndex > 0
            }, clear: function() {
                this._deleteItems(this.items), this.items = [], this.currentIndex = -1
            }, back: function(n) {
                if (this.currentIndex--, this.currentIndex < 0)
                    throw t.Error("E3008");
                var i = this.currentItem();
                i.uri !== n && this._updateItem(this.currentIndex, n)
            }, forward: function() {
                if (this.currentIndex++, this.currentIndex >= this.items.length)
                    throw t.Error("E3009");
            }, navigate: function(n, t) {
                if (!(this.currentIndex < this.items.length) || !(this.currentIndex > -1) || this.items[this.currentIndex].uri !== n) {
                    if (t && this.currentIndex > -1 && this.currentIndex--, this.currentIndex + 1 < this.items.length && this.items[this.currentIndex + 1].uri === n)
                        this.currentIndex++;
                    else {
                        var i = this.items.splice(this.currentIndex + 1, this.items.length - this.currentIndex - 1);
                        this.items.push({stack: this}), this.currentIndex++, this._updateItem(this.currentIndex, n), this._deleteItems(i)
                    }
                    return this.currentItem()
                }
            }, itemByKey: function(n) {
                for (var i, t = 0; t < this.items.length; t++)
                    if (i = this.items[t], i.key === n)
                        return i
            }, _updateItem: function(n, t) {
                var i = this.items[n];
                i.uri = t, i.key = this.items[0].uri + "_" + n + "_" + t
            }, _deleteItems: function(n) {
                n && this.itemsRemoved.fire(n)
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        function r(t, i) {
            if (i.args) {
                var r = i.args[0];
                t.jQueryEvent = r.jQueryEvent
            }
            (i.component || {}).NAME === "dxCommand" && n.extend(t, i.component.option())
        }
        t.framework.createActionExecutors = function(u) {
            return{routing: {execute: function(t) {
                        var f = t.action, e = {}, i, o;
                        n.isPlainObject(f) && (i = f.routeValues, i && n.isPlainObject(i) ? e = f.options : i = f, o = u.router.format(i), r(e, t), u.navigate(o, e), t.handled = !0)
                    }}, hash: {execute: function(f) {
                        var e;
                        if (typeof f.action == "string" && f.action.charAt(0) === "#") {
                            var o = f.action.substr(1), h = f.args[0], s = o, c = function(n) {
                                var i = t.data.utils.compileGetter(n), r = f.args[0].model;
                                return i(r)
                            }, l = h.evaluate || c;
                            s = o.replace(/\{([^}]+)\}/g, function(r, u) {
                                u = n.trim(u), u.indexOf(",") > -1 && (u = n.map(u.split(","), n.trim));
                                var f = l(u);
                                return f === i && (f = ""), f = t.framework.Route.prototype.formatSegment(f)
                            }), e = {}, r(e, f), u.navigate(s, e), f.handled = !0
                        }
                    }}}
        }
    }(jQuery, DevExpress), function(n, t) {
        var f = t.Class, i, e = "InProgress", r = "Inited", u = t.framework;
        t.framework.Application = f.inherit({ctor: function(r) {
                r = r || {}, this._options = r, this.namespace = r.namespace || r.ns || window, this._applicationMode = r.mode ? r.mode : "mobileApp", this.components = [], i = t.localization.localizeString("@Back"), this.router = r.router || new t.framework.Router;
                var u = {mobileApp: t.framework.StackBasedNavigationManager, webSite: t.framework.HistoryBasedNavigationManager};
                this.navigationManager = r.navigationManager || new u[this._applicationMode]({keepPositionInStack: r.navigateToRootViewMode === "keepHistory"});
                this.navigationManager.on("navigating", n.proxy(this._onNavigating, this));
                this.navigationManager.on("navigatingBack", n.proxy(this._onNavigatingBack, this));
                this.navigationManager.on("navigated", n.proxy(this._onNavigated, this));
                this.navigationManager.on("navigationCanceled", n.proxy(this._onNavigationCanceled, this));
                this.stateManager = r.stateManager || new t.framework.StateManager({storage: r.stateStorage || sessionStorage}), this.stateManager.addStateSource(this.navigationManager), this.viewCache = this._createViewCache(r), this.commandMapping = this._createCommandMapping(r.commandMapping), this.createNavigation(r.navigation), this.beforeViewSetup = n.Callbacks(), this.afterViewSetup = n.Callbacks(), this.viewShowing = n.Callbacks(), this.viewShown = n.Callbacks(), this.viewHidden = n.Callbacks(), this.viewDisposing = n.Callbacks(), this.viewDisposed = n.Callbacks(), this.navigating = n.Callbacks(), this.navigatingBack = n.Callbacks(), this.initialized = n.Callbacks(), this._callbacksToEvents("HtmlApplication", ["beforeViewSetup", "afterViewSetup", "viewShowing", "viewShown", "viewHidden", "viewDisposing", "viewDisposed", "navigating", "navigatingBack", "initialized"]), this._isNavigating = !1, this._viewLinksHash = {}, t.registerActionExecutor(t.framework.createActionExecutors(this)), this.components.push(this.router), this.components.push(this.navigationManager)
            }, _createViewCache: function(i) {
                var r;
                r = i.viewCache ? i.viewCache : i.disableViewCache ? new t.framework.NullViewCache : new t.framework.CapacityViewCacheDecorator({size: i.viewCacheSize, viewCache: new t.framework.ViewCache});
                r.on("viewRemoved", n.proxy(function(n) {
                    this._releaseViewLink(n.viewInfo)
                }, this));
                return r
            }, _createCommandMapping: function(n) {
                var i = n;
                return n instanceof t.framework.CommandMapping || (i = new t.framework.CommandMapping, i.load(t.framework.CommandMapping.defaultMapping || {}).load(n || {})), i
            }, createNavigation: function(n) {
                this.navigation = this._createNavigationCommands(n), this._mapNavigationCommands(this.navigation, this.commandMapping)
            }, _createNavigationCommands: function(t) {
                if (!t)
                    return[];
                var r = this, i = 0;
                return n.map(t, function(t) {
                    var r;
                    return r = t instanceof u.dxCommand ? t : new u.dxCommand(n.extend({root: !0}, t)), r.option("id") || r.option("id", "navigation_" + i++), r
                })
            }, _mapNavigationCommands: function(t, i) {
                var r = n.map(t, function(n) {
                    return n.option("id")
                });
                i.mapCommands("global-navigation", r)
            }, _callComponentMethod: function(t, i) {
                var r = [];
                return n.each(this.components, function(u, f) {
                    if (f[t] && n.isFunction(f[t])) {
                        var e = f[t](i);
                        e && e.done && r.push(e)
                    }
                }), n.when.apply(n, r)
            }, init: function() {
                var n = this;
                return n._initState = e, n._callComponentMethod("init").done(function() {
                    n._initState = r, n._processEvent("initialized")
                }).fail(function(n) {
                    throw n || t.Error("E3022");
                })
            }, _onNavigatingBack: function(n) {
                this._processEvent("navigatingBack", n)
            }, _onNavigating: function(n) {
                var i = this, u, r;
                if (i._isNavigating) {
                    i._pendingNavigationArgs = n, n.cancel = !0;
                    return
                }
                if (i._isNavigating = !0, delete i._pendingNavigationArgs, u = this.router.parse(n.uri), !u)
                    throw t.Error("E3001", n.uri);
                r = this.router.format(u), n.uri !== r && r ? (n.cancel = !0, t.utils.executeAsync(function() {
                    i.navigate(r, n.options)
                })) : i._processEvent("navigating", n)
            }, _onNavigated: function(i) {
                var r = this, e = i.options.direction, f = n.Deferred(), u = r._acquireViewInfo(i.item, i.options);
                r._isViewReadyToShow(u) ? f.resolve() : r._setViewLoadingState(u, e).done(function() {
                    t.utils.executeAsync(function() {
                        r._createViewModel(u), r._createViewCommands(u), f.resolve()
                    })
                }).fail(function() {
                    r._isNavigating = !1, f.reject()
                }), f.done(function() {
                    r._highlightCurrentNavigationCommand(u), r._showView(u, e).always(function() {
                        r._isNavigating = !1;
                        var n = r._pendingNavigationArgs;
                        n && t.utils.executeAsync(function() {
                            r.navigate(n.uri, n.options)
                        })
                    })
                })
            }, _isViewReadyToShow: function(n) {
                return!!n.model
            }, _onNavigationCanceled: function(n) {
                var i = this, r;
                i._pendingNavigationArgs && i._pendingNavigationArgs.uri === n.uri || (r = i.navigationManager.currentItem(), r && t.utils.executeAsync(function() {
                    var t = i._acquireViewInfo(r, n.options);
                    i._highlightCurrentNavigationCommand(t)
                }), i._isNavigating = !1)
            }, _disposeRemovedViews: function() {
                var t = this, i;
                n.each(t._viewLinksHash, function(n, r) {
                    r.linkCount || (i = {viewInfo: r.viewInfo}, t._processEvent("viewDisposing", i, i.viewInfo.model), t._disposeView(r.viewInfo), t._processEvent("viewDisposed", i, i.viewInfo.model), delete t._viewLinksHash[n])
                })
            }, _onViewHidden: function(n) {
                var t = {viewInfo: n};
                this._processEvent("viewHidden", t, t.viewInfo.model)
            }, _disposeView: function(t) {
                var i = t.commands || [];
                n.each(i, function(n, t) {
                    t._dispose()
                })
            }, _acquireViewInfo: function(n, t) {
                var i = this.viewCache.getView(n.key);
                return i || (i = this._createViewInfo(n, t), this._obtainViewLink(i), this.viewCache.setView(n.key, i)), i
            }, _processEvent: function(n, t, i) {
                this._callComponentMethod(n, t), this.fireEvent(n, [t]);
                var r = (i || {})[n];
                r && r.call(i, t)
            }, _createViewInfo: function(n, t) {
                var i = n.uri, r = this.router.parse(i);
                return{viewName: r.view, routeData: r, uri: i, key: n.key, canBack: this.canBack(), navigateOptions: t, previousViewInfo: this._getPreviousViewInfo(t)}
            }, _createViewModel: function(n) {
                this._processEvent("beforeViewSetup", {viewInfo: n}), n.model = n.model || this._callViewCodeBehind(n), this._processEvent("afterViewSetup", {viewInfo: n})
            }, _createViewCommands: function(n) {
                n.commands = n.model.commands || [], n.canBack && this._applicationMode !== "webSite" && this._appendBackCommand(n)
            }, _callViewCodeBehind: function(t) {
                var r = n.noop, i = t.routeData;
                return i.view in this.namespace && (r = this.namespace[i.view]), r.call(this.namespace, i, t) || {}
            }, _appendBackCommand: function(n) {
                var r = n.commands, f = this, s = this.navigationManager.currentStackKey, u = i, e, o;
                f._options.useViewTitleAsBackText && (u = ((n.previousViewInfo || {}).model || {}).title || u), e = [new t.framework.dxCommand({id: "back", title: u, behavior: "back", onExecute: function() {
                            f.back({stack: s})
                        }, icon: "arrowleft", type: "back"})], o = t.framework.utils.mergeCommands(e, r), r.length = 0, r.push.apply(r, o)
            }, _showView: function(n, i) {
                var r = this, u = {viewInfo: n, direction: i};
                return r._processEvent("viewShowing", u, n.model), r._showViewImpl(u.viewInfo, u.direction).done(function() {
                    t.utils.executeAsync(function() {
                        r._processEvent("viewShown", u, n.model), r._disposeRemovedViews()
                    })
                })
            }, _highlightCurrentNavigationCommand: function(i) {
                var f = this, r, e = i.uri, u = i.model && i.model.currentNavigationItemId;
                u !== undefined && n.each(this.navigation, function(n, t) {
                    if (t.option("id") === u)
                        return r = t, !1
                }), r || n.each(this.navigation, function(n, i) {
                    var u = i.option("onExecute");
                    if (t.utils.isString(u) && (u = u.replace(/^#+/, ""), u === f.navigationManager.rootUri()))
                        return r = i, !1
                }), n.each(this.navigation, function(n, t) {
                    t === r && t.option("highlighted") && t.fireEvent("optionChanged", [{name: "highlighted", value: !0, previousValue: !0}]), t.option("highlighted", t === r)
                })
            }, _setViewLoadingState: t.abstract, _showViewImpl: t.abstract, _obtainViewLink: function(n) {
                var t = n.key;
                this._viewLinksHash[t] ? this._viewLinksHash[t].linkCount++ : this._viewLinksHash[t] = {viewInfo: n, linkCount: 1}
            }, _releaseViewLink: function(n) {
                this._viewLinksHash[n.key].linkCount--
            }, navigate: function(i, u) {
                var f = this;
                if (n.isPlainObject(i) && (i = f.router.format(i), i === !1))
                    throw t.Error("E3002");
                if (f._initState)
                    if (f._initState === r)
                        f.navigationManager.navigate(i, u);
                    else
                        throw t.Error("E3003");
                else
                    f.init().done(function() {
                        f.restoreState(), f.navigate(i, u)
                    })
            }, canBack: function(n) {
                return this.navigationManager.canBack(n)
            }, _getPreviousViewInfo: function(n) {
                var t = this.navigationManager.previousItem(n.stack), i;
                return t && (i = this.viewCache.getView(t.key)), i
            }, back: function(n) {
                this.navigationManager.back(n)
            }, saveState: function() {
                this.stateManager.saveState()
            }, restoreState: function() {
                this.stateManager.restoreState()
            }, clearState: function() {
                this.stateManager.clearState()
            }}).include(t.EventsMixin)
    }(jQuery, DevExpress), function(n, t) {
        t.framework.html = {layoutControllers: [], layoutSets: {}}
    }(jQuery, DevExpress), function(n, t) {
        var i = t.framework.utils.commandToContainer, o = "dxCommandToWidgetAdapter", r = t.Class.inherit({ctor: function(t, i) {
                this.command = t, this.containerOptions = i, this._createWidgetItem(t, i), this._commandChangedHandler = n.proxy(this._onCommandChanged, this);
                t.on("optionChanged", this._commandChangedHandler)
            }, _createWidgetItem: function(t, i) {
                this.widgetItem = n.extend({command: t, containerOptions: i}, i, t.option()), this._updateItem()
            }, _onCommandChanged: function(n) {
                var t = n.name, i = n.value, r = n.previousValue;
                this.widgetItem[t] = i, this._updateItem(t, i, r)
            }, _updateItem: function() {
            }, dispose: function() {
                this.command && this.command.off("optionChanged", this._commandChangedHandler), delete this.command, delete this.containerOptions, delete this.widgetItem, delete this.updateItemHandler
            }}), u = t.Class.inherit({ctor: function(t) {
                this.$widgetElement = t, this.$widgetElement.data(o, this), this.widget = this._getWidgetByElement(t), this._widgetDisposingHandler = n.proxy(this._onWidgetDisposing, this);
                this.widget.on("disposing", this._widgetDisposingHandler);
                this.itemWrappers = []
            }, addCommand: function(t, i) {
                var r = this._createItemWrapper(t, i);
                this.itemWrappers.push(r), this._addItemToWidget(r), this.refresh(), this._commandChangedHandler = n.proxy(this._onCommandChanged, this);
                r.command.on("optionChanged", this._commandChangedHandler)
            }, beginUpdate: function() {
                this.widget.beginUpdate()
            }, endUpdate: function() {
                this.widget.endUpdate()
            }, _onWidgetDisposing: function() {
                this.dispose(!0)
            }, _onCommandChanged: function(n) {
                n.name !== "highlighted" && this.refresh()
            }, _addItemToWidget: function(n) {
                var t = this.widget.option("items");
                t.push(n.widgetItem)
            }, refresh: function() {
                var n = this.widget.option("items");
                this.widget.option("items", n)
            }, clear: function(t) {
                var i = this;
                n.each(i.itemWrappers, function(n, t) {
                    t.command.off("optionChanged", i._commandChangedHandler), t.dispose()
                }), this.itemWrappers.length = 0, t || this._clearWidgetItems()
            }, _clearWidgetItems: function() {
                this.widget.option("items", [])
            }, dispose: function(n) {
                this.clear(n), this.widget && (this.widget.off("disposing", this._widgetDisposingHandler), this.$widgetElement.removeData(o), delete this.widget, delete this.$widgetElement)
            }}), f = t.Class.inherit({ctor: function(n) {
                this.createAdapter = n
            }, _getWidgetAdapter: function(n) {
                var t = n.data(o);
                return t || (t = this.createAdapter(n)), t
            }, addCommand: function(n, t, i) {
                var r = this._getWidgetAdapter(n);
                r.addCommand(t, i)
            }, clearContainer: function(n) {
                var t = this._getWidgetAdapter(n);
                t.clear()
            }, beginUpdate: function(n) {
                var t = this._getWidgetAdapter(n);
                t.beginUpdate()
            }, endUpdate: function(n) {
                var t = this._getWidgetAdapter(n);
                t.endUpdate()
            }}), s = r.inherit({_updateItem: function() {
                var u = this.widgetItem, r = this.command, f = this.containerOptions, e = i.resolvePropertyValue(r, f, "location"), t;
                u.location = e, e === "menu" ? t = u : (t = n.extend({}, u), u.options = t, u.widget = "button"), t.text = i.resolveTextValue(r, f), t.disabled = r.option("disabled"), t.icon = i.resolveIconValue(r, f, "icon"), t.iconSrc = i.resolveIconValue(r, f, "iconSrc"), t.type = i.resolveTypeValue(r, f)
            }}), h = u.inherit({ctor: function(t) {
                this.callBase(t), this.widget.option("onItemClick", n.proxy(this._onToolbarItemClick, this))
            }, _onToolbarItemClick: function(n) {
                n.itemData.command && n.itemData.command.execute(n)
            }, _getWidgetByElement: function(n) {
                return n.dxToolbar("instance")
            }, _createItemWrapper: function(n, t) {
                return new s(n, t)
            }, addCommand: function(n, t) {
                this.callBase(n, t), this.widget.option("visible", !0)
            }}), c = r.inherit({_updateItem: function() {
                var n = this.widgetItem, t = this.command, r = this.containerOptions;
                n.text = i.resolveTextValue(t, r), n.icon = i.resolveIconValue(t, r, "icon"), n.iconSrc = i.resolveIconValue(t, r, "iconSrc")
            }}), l = u.inherit({_createItemWrapper: function(n, t) {
                return new c(n, t)
            }, _getWidgetByElement: function(n) {
                return n.dxActionSheet("instance")
            }}), a = r.inherit({_createWidgetItem: function(t, i) {
                this.callBase(t, i), this.widgetItem.click = n.proxy(this._itemClick, this)
            }, _updateItem: function() {
                var n = this.widgetItem, t = this.command, r = this.containerOptions;
                n.title = i.resolveTextValue(t, r), n.icon = i.resolveIconValue(t, r, "icon"), n.iconSrc = i.resolveIconValue(t, r, "iconSrc")
            }, _itemClick: function(n) {
                this.widgetItem.disabled || this.command.execute(n)
            }}), v = u.inherit({_createItemWrapper: function(n, t) {
                return new a(n, t)
            }, _getWidgetByElement: function(n) {
                return n.dxList("instance")
            }}), y = r.inherit({_updateItem: function(n) {
                var u = this.command, f = this.containerOptions;
                n !== "highlighted" && (this.widgetItem.text = i.resolveTextValue(u, f), this.widgetItem.icon = i.resolveIconValue(u, f, "icon"), this.widgetItem.iconSrc = i.resolveIconValue(u, f, "iconSrc"))
            }}), p = u.inherit({ctor: function(t) {
                this.callBase(t), this.widget.option("onItemClick", n.proxy(this._onNavBarItemClick, this))
            }, _onNavBarItemClick: function(n) {
                for (var i = this.widget.option("items"), t = i.length; --t; )
                    i[t].command.option("highlighted", !1);
                n.itemData.command.execute(n)
            }, _getWidgetByElement: function(n) {
                return n.dxNavBar("instance")
            }, _createItemWrapper: function(n, t) {
                return new y(n, t)
            }, addCommand: function(n, t) {
                this.callBase(n, t), this._updateSelectedIndex()
            }, _onCommandChanged: function(n) {
                var t = n.name, i = n.value, r = n.previousValue;
                (t !== "highlighted" || i) && this._updateSelectedIndex(), this.callBase(n)
            }, _updateSelectedIndex: function() {
                for (var t = this.widget.option("items"), n = 0, i = t.length; n < i; n++)
                    if (t[n].highlighted) {
                        this.widget.option("selectedIndex", n);
                        break
                    }
            }}), d = r.inherit({_updateItem: function(n) {
                n === "title" && (this.widgetItem.title = i.resolveTextValue(this.command, this.containerOptions))
            }}), w = u.inherit({ctor: function(t) {
                this.callBase(t), this._highlighting = !1, this.widget.option("onSelectionChanged", n.proxy(this._onPivotSelectionChange, this))
            }, _onPivotSelectionChange: function(n) {
                n.addedItems.length && n.removedItems.length && n.addedItems[0] && n.addedItems[0].command && n.addedItems[0].command.execute(n)
            }, _getWidgetByElement: function(n) {
                return n.dxPivot("instance")
            }, _createItemWrapper: function(n, t) {
                return new s(n, t)
            }, addCommand: function(n, t) {
                this.callBase(n, t), this._updateSelectedIndex()
            }, _onCommandChanged: function(n) {
                var t = n.name, i = n.value;
                t === "visible" ? this._rerenderPivot() : (t !== "highlighted" || i) && this._updateSelectedIndex()
            }, _addItemToWidget: function(n) {
                n.command.option("visible") && this.callBase(n)
            }, _updateSelectedIndex: function() {
                var i = this.widget, r = i.option("items") || [], n, u;
                for (t.fx.off = !0, n = 0, u = r.length; n < u; n++)
                    if (r[n].highlighted) {
                        this._highlighting && i.option("selectedIndex") === n && (this._highlighting = !1), i.option("selectedIndex", n);
                        break
                    }
                t.fx.off = !1
            }, _rerenderPivot: function() {
                var t = this;
                t.widget.option("items", []), n.each(t.itemWrappers, function(n, i) {
                    i.command.option("visible") && t._addItemToWidget(i)
                }), t.refresh(), t._updateSelectedIndex()
            }}), b = r.inherit({_updateItem: function() {
                var u = this.widgetItem, f = this.command, e = this.containerOptions;
                name !== "highlighted" && (u.title = i.resolveTextValue(f, e), u.icon = i.resolveIconValue(f, e, "icon"), u.iconSrc = i.resolveIconValue(f, e, "iconSrc"))
            }}), k = u.inherit({ctor: function(t) {
                this.callBase(t), this.widget.option("onItemClick", n.proxy(this._onSlideOutItemClick, this))
            }, _onSlideOutItemClick: function(n) {
                n.itemData.command.execute(n)
            }, _getWidgetByElement: function(n) {
                return n.dxSlideOut("instance")
            }, _createItemWrapper: function(n, t) {
                return new b(n, t)
            }, _updateSelectedIndex: function() {
                for (var t = this.widget.option("items") || [], n = 0, i = t.length; n < i; n++)
                    if (t[n].highlighted) {
                        this.widget.option("selectedIndex", n);
                        break
                    }
            }, addCommand: function(n, t) {
                this.callBase(n, t), this._updateSelectedIndex()
            }, _onCommandChanged: function(n) {
                var t = n.name, i = n.value, r = n.previousValue;
                (t !== "highlighted" || i) && this._updateSelectedIndex(), this.callBase(n)
            }}), e = t.framework.html.commandToDXWidgetAdapters = {};
        e.dxToolbar = new f(function(n) {
            return new h(n)
        }), e.dxActionSheet = new f(function(n) {
            return new l(n)
        }), e.dxList = new f(function(n) {
            return new v(n)
        }), e.dxNavBar = new f(function(n) {
            return new p(n)
        }), e.dxPivot = new f(function(n) {
            return new w(n)
        }), e.dxSlideOut = new f(function(n) {
            return new k(n)
        })
    }(jQuery, DevExpress), function(n, t) {
        var r = t.Class, f = DevExpress.ui, u = t.DOMComponent.inherit({ctor: function(t, i) {
                n.isPlainObject(t) && (i = t, t = n("<div />")), this.callBase(t, i)
            }, _setDefaultOptions: function() {
                this.callBase(), this.option({id: null})
            }, _render: function() {
                this.callBase(), this.element().addClass("dx-command-container")
            }});
        t.registerComponent("dxCommandContainer", t.framework, u), t.framework.html.CommandManager = r.inherit({ctor: function(n) {
                n = n || {}, this.defaultWidgetAdapter = n.defaultWidgetAdapter || this._getDefaultWidgetAdapter(), this.commandMapping = n.commandMapping || new t.framework.CommandMapping
            }, _getDefaultWidgetAdapter: function() {
                return{addCommand: this._defaultAddCommand, clearContainer: n.noop}
            }, _getContainerAdapter: function(n) {
                var i = n.data("dxComponents"), u = t.framework.html.commandToDXWidgetAdapters, f, r;
                if (i)
                    for (f in i)
                        if (r = i[f], r in u)
                            return u[r];
                return this.defaultWidgetAdapter
            }, findCommands: function(t) {
                return n.map(t.addBack().find(".dx-command"), function(t) {
                    return n(t).dxCommand("instance")
                })
            }, findCommandContainers: function(t) {
                return n.map(t.find(".dx-command-container"), function(t) {
                    return n(t).dxCommandContainer("instance")
                })
            }, _checkCommandId: function(n, i) {
                if (n === null)
                    throw t.Error("E3010", i.element().get(0).outerHTML);
            }, renderCommandsToContainers: function(t, i) {
                var r = this, u = {}, f = [];
                n.each(t, function(n, t) {
                    var i = t.option("id");
                    r._checkCommandId(i, t), f.push(i), u[i] = t
                }), r.commandMapping.checkCommandsExist(f), n.each(i, function(t, i) {
                    var f = [];
                    n.each(u, function(n, t) {
                        var e = n, u = r.commandMapping.getCommandMappingForContainer(e, i.option("id"));
                        u && f.push({command: t, options: u})
                    }), f.length && r._attachCommandsToContainer(i.element(), f)
                })
            }, clearContainer: function(n) {
                var t = n.element(), i = this._getContainerAdapter(t);
                i.clearContainer(t)
            }, _arrangeCommandsToContainers: function(n, i) {
                t.log("W0002", "CommandManager", "_arrangeCommandsToContainers", "14.1", "Use the 'renderCommandsToContainers' method instead."), this.renderCommandsToContainers(n, i)
            }, _attachCommandsToContainer: function(t, i) {
                var r = this._getContainerAdapter(t);
                return r.beginUpdate && r.beginUpdate(t), n.each(i, function(n, i) {
                    r.addCommand(t, i.command, i.options)
                }), r.endUpdate && r.endUpdate(t), !0
            }, _defaultAddCommand: function(n, t) {
                var r = t.element();
                if (r) {
                    n.append(r);
                    r.on("dxclick", function() {
                        t.execute()
                    })
                }
            }})
    }(jQuery, DevExpress), function(n, t) {
        var e = t.Class, r = "__hidden-bag", f = ".dx-transition:not(.dx-transition .dx-transition)", o = function(n) {
            return".dx-transition-" + n
        }, u;
        t.framework.html.DefaultLayoutController = e.inherit({ctor: function(t) {
                t = t || {}, this.name = t.layoutTemplateName || t.name || "", this._disableViewLoadingState = t.disableViewLoadingState, this._layoutModel = t.layoutModel || {}, this._defaultPaneName = t.defaultPaneName || "content", this.viewReleased = n.Callbacks(), this.viewRendered = n.Callbacks(), this._callbacksToEvents("DefaultLayoutController", ["viewReleased", "viewRendered"])
            }, init: function(i) {
            console.log("2");
                i = i || {}, this._visibleViews = {}, this._$viewPort = i.$viewPort || n("body"), this._commandManager = i.commandManager, this._viewEngine = i.viewEngine, this._prepareTemplates(), this._$viewPort.append(this._getRootElement()), this._hideElements(this._getRootElement()), this.DEFAULT_LOADING_TITLE = t.localization.localizeString("@Loading"), i.templateContext && (this._templateContext = i.templateContext, this._proxiedTemplateContextChangedHandler = n.proxy(this._templateContextChangedHandler, this))
            }, activate: function() {
                var t = this._getRootElement();
                return this._showElements(t), this._attachRefreshViewRequiredHandler(), n.Deferred().resolve().promise()
            }, deactivate: function() {
            console.log("3");
                return this._releaseVisibleViews(), this._hideElements(this._getRootElement()), this._detachRefreshViewRequiredHandler(), n.Deferred().resolve().promise()
            }, activeViewInfo: function() {
                return this._visibleViews[this._defaultPaneName]
            }, _applyTemplate: function(n, i) {
                n.each(function(n, r) {
                    t.framework.templateProvider.applyTemplate(r, i)
                })
            }, _releaseVisibleViews: function() {
                var t = this;
                n.each(this._visibleViews, function(n, i) {
                    t._hideView(i), t._releaseView(i)
                }), this._visibleViews = {}
            }, _templateContextChangedHandler: function() {
                n.each(this._visibleViews, n.proxy(function(n, t) {
                    this.showView(t)
                }, this))
            }, _attachRefreshViewRequiredHandler: function() {
                if (this._templateContext)
                    this._templateContext.on("optionChanged", this._proxiedTemplateContextChangedHandler)
            }, _detachRefreshViewRequiredHandler: function() {
                this._templateContextChanged && this._templateContext.off("optionChanged", this._proxiedTemplateContextChangedHandler)
            }, _getPreviousViewInfo: function(n) {
                return this._visibleViews[this._getViewPaneName(n.viewTemplateInfo)]
            }, _prepareTemplates: function() {
                console.log("4.1");
                var n = this, t = n._viewEngine.getLayoutTemplate(this._getLayoutTemplateName()).removeClass("dx-hidden");
                n._$layoutTemplate = t, n._$mainLayout = n._createEmptyLayout(), n._showElements(n._$mainLayout), n._applyTemplate(n._$mainLayout, n._layoutModel), n._$navigationWidget = n._createNavigationWidget(), n._loadingStateViewInfo = n._createLoadingStateViewInfo(t)
            }, renderNavigation: function(n) {
                this._clearNavigationWidget(), this._renderNavigationImpl(n)
            }, _renderNavigationImpl: function(n) {
                this._renderCommands(this._$mainLayout, n)
            }, _createNavigationWidget: function() {
                var t;
                return this._$mainLayout.find(".dx-command-container").each(function() {
                    var i = n(this).dxCommandContainer("instance");
                    i.option("id") === "global-navigation" && (t = n(this))
                }), t
            }, _clearNavigationWidget: function() {
                this._$navigationWidget && this._commandManager.clearContainer(this._$navigationWidget.dxCommandContainer("instance"))
            }, _getRootElement: function() {
                return this._$mainLayout
            }, _getViewFrame: function() {
                return this._$mainLayout
            }, _getLayoutTemplateName: function() {
                return this.name
            }, _applyModelToTransitionElements: function(t, i) {
                var r = this;
                this._getTransitionElements(t).each(function(t, u) {
                    r._applyTemplate(n(u).children(), i)
                })
            }, _createLoadingStateViewModel: function() {
                return{title: ko.observable()}
            }, _createLoadingStateViewInfo: function(i) {
             console.log("4");
                var r = i.clone().addClass("dx-loading-state-view"), f = this._createLoadingStateViewModel(), u;

                return this._hideElements(r), t.utils.createComponents(r), this._applyModelToTransitionElements(r, f), u = {model: f, renderResult: {$markup: r, $viewItems: n()}, isLoadingStateView: !0}, this._appendViewToLayout(u), u
            }, _createViewLayoutTemplate: function() {
             console.log("5");
                var i = this, n = i._$layoutTemplate.clone();

                return this._hideElements(n), t.utils.createComponents(n), n
            }, _createEmptyLayout: function() {
            console.log("6");
                var i = this, n = i._$layoutTemplate.clone();

                return this._hideElements(n), t.utils.createComponents(n), i._removeTransitionContent(n), n

            }, _removeTransitionContent: function(n) {
                var t = this._getTransitionElements(n);
                t.children().remove()
            }, _getTransitionElements: function(n) {
                return n.find(f).addBack(f)
            }, setViewLoadingState: function(t, i) {
                var r = this, u;
                return r._disableViewLoadingState ? n.Deferred().resolve().promise() : (u = n.extend({}, t, r._loadingStateViewInfo), r._loadingStateViewInfo.model.title((t.viewTemplateInfo || {}).title || this.DEFAULT_LOADING_TITLE), r._showViewImpl(u, i))
            }, showView: function(n, t) {
                var i = this, r = i._getPreviousViewInfo(n);
                return r && r.isLoadingStateView && (t = "none"), i._ensureViewRendered(n), this._showViewImpl(n, t).done(function() {
                    i._onViewShown(n)
                })
            }, disposeView: function(n) {
                this._clearRenderResult(n)
            }, _clearRenderResult: function(n) {
                n.renderResult && (n.renderResult.$markup.remove(), n.renderResult.$viewItems.remove(), delete n.renderResult)
            }, _prepareViewTemplate: function(n) {
                t.utils.createComponents(n)
            }, _renderViewImpl: function(i, r) {
                var h = this, o = ".dx-command,.dx-content,script", f = this._createViewLayoutTemplate(), e, s = !0, u = n();
                if (i.children(o).length === 0 && this._viewEngine._wrapViewDefaultContent(i), e = i.children(), this._applyModelToTransitionElements(f, r.model), this._viewEngine.applyLayout(i, f), e.each(function(t, i) {
                    var f = n(i);
                    h._applyTemplate(f, r.model), f.is(o) ? s = !1 : u = u.add(f)
                }), u.length && !s)
                    throw t.Error("E3014", u[0].outerHTML);
                r.renderResult = r.renderResult || {}, r.renderResult.$viewItems = e, r.renderResult.$markup = f
            }, _renderCommands: function(n, t) {
                var i = this._findCommandContainers(n);
                this._commandManager.renderCommandsToContainers(t, i)
            }, _applyViewCommands: function(n) {
                var i = n.renderResult.$viewItems, r = n.renderResult.$markup, u = this._commandManager.findCommands(i);
                n.commands = t.framework.utils.mergeCommands(n.commands || [], u), this._renderCommands(r, n.commands)
            }, _findCommandContainers: function(n) {
                return t.utils.createComponents(n, ["dxCommandContainer"])
            }, _ensureViewRendered: function(n) {
                var r = n.$viewTemplate ? n.$viewTemplate.dxView("instance") : this._viewEngine.getViewTemplateInfo(n.viewName), t = r.getId(), i = n.renderResult && n.renderResult.markupCache[t];
                i ? n.renderResult.$markup = i : (this._renderView(n), n.renderResult.markupCache = n.renderResult.markupCache || {}, n.renderResult.markupCache[t] = n.renderResult.$markup)
            }, _renderView: function(n) {
                var t = n.$viewTemplate || this._viewEngine.getViewTemplate(n.viewName);
                this._prepareViewTemplate(t, n), this._renderViewImpl(t, n), this._applyViewCommands(n), this._appendViewToLayout(n), t.remove(), this._onRenderComplete(n), this.fireEvent("viewRendered", [n])
            }, _appendViewToLayout: function(t) {
                var i = this, f = i._getViewFrame(t), r = t.renderResult.$markup, u = n();
                n.each(r.find(".dx-content-placeholder"), function(t, i) {
                    var r = n(i).dxContentPlaceholder("instance");
                    r.prepareTransition()
                }), n.each(i._getTransitionElements(f), function(t, f) {
                    var s = n(f), e = r.find(o(s.data("dx-transition-name"))).children();
                    i._hideViewElements(e), s.append(e), u = u.add(e)
                }), i._$mainLayout.append(t.renderResult.$viewItems.filter(".dx-command")), r.remove(), t.renderResult.$markup = u
            }, _onRenderComplete: function() {
            }, _onViewShown: function() {
                n(document).trigger("dx.viewchanged")
            }, _doTransition: function(t, i) {
                var r = this, u = n.Deferred(), f = n.map(t.renderResult.$markup, function(t) {
                    var u = n(t), f = u.parent(), e = r._disableTransitions ? "none" : f.data("dx-transition-type");
                    return{destination: f, source: u, type: e || "none", direction: i || "none"}
                });
                return r._executeTransitions(f).done(function() {
                    u.resolve()
                }), u.promise()
            }, _hideView: function(n) {
                n.renderResult && this._hideViewElements(n.renderResult.$markup)
            }, _showViewImpl: function(t, i) {
                var r = this, f = n.Deferred(), u = this._getPreviousViewInfo(t);
                return u && u !== t || (i = "none"), r._doTransition(t, i).done(function() {
                    r._changeView(t)
                })
            }, _releaseView: function(n) {
                this.viewReleased.fireWith(this, [n])
            }, _changeView: function(n) {
                var i = this, t = i._getPreviousViewInfo(n);
                t && t !== n && (i._hideView(t), t.isLoadingStateView || this._releaseView(t)), this._visibleViews[this._getViewPaneName(n.viewTemplateInfo)] = n
            }, _getViewPaneName: function() {
                return this._defaultPaneName
            }, _hideElements: function(n) {
                n.addClass("dx-hidden")
            }, _showElements: function(t) {
                t.removeClass("dx-hidden"), t.find(".dx-visibility-change-handler").each(function() {
                    n(this).triggerHandler("dxshown")
                })
            }, _hideViewElements: function(n) {
                t.utils.triggerHidingEvent(n.filter(".dx-active-view")), this._patchIDs(n), this._disableInputs(n), n.removeClass("dx-active-view").addClass("dx-inactive-view")
            }, _showViewElements: function(n) {
                this._unpatchIDs(n), this._enableInputs(n), n.removeClass("dx-inactive-view").addClass("dx-active-view"), t.utils.triggerShownEvent(n.filter(".dx-active-view"))
            }, _executeTransitions: function(i) {
                var r = this, u = n.map(i, function(n) {
                    return r._showViewElements(n.source), n.source.children().length ? t.framework.html.TransitionExecutor.create(n.destination, n) : void 0
                }), f = n.map(u, function(n) {
                    return n.options.source.addClass("dx-transition-source"), n.exec()
                });
                return n.when.apply(n, f).done(function() {
                    n.each(u, function(n, t) {
                        t.finalize(), r._hideViewElements(t.options.source.parent().find(".dx-active-view:not(.dx-transition-source)")), t.options.source.removeClass("dx-transition-source")
                    })
                })
            }, _patchIDs: function(n) {
                this._processIDs(n, function(n) {
                    var t = n;
                    return n.indexOf(r) === -1 && (t = r + "-" + n), t
                })
            }, _unpatchIDs: function(n) {
                this._processIDs(n, function(n) {
                    var t = n;
                    return n.indexOf(r) === 0 && (t = n.substr(r.length + 1)), t
                })
            }, _processIDs: function(t, i) {
                var r = t.find("[id]");
                n.each(r, function(t, r) {
                    var u = n(r), f = u.attr("id");
                    u.attr("id", i(f))
                })
            }, _enableInputs: function(t) {
                var i = t.find(":input[data-disabled=true]");
                n.each(i, function(t, i) {
                    n(i).removeAttr("disabled").removeAttr("data-disabled")
                })
            }, _disableInputs: function(t) {
                var i = t.find(":input:not([disabled], [disabled=true])");
                n.each(i, function(t, i) {
                    n(i).attr({disabled: !0, "data-disabled": !0})
                })
            }}).include(t.EventsMixin), u = t.framework.html.layoutSets, u["default"] = u["default"] || [], u["default"].push({controller: new t.framework.html.DefaultLayoutController})
    }(jQuery, DevExpress), function(n, t, i) {
        var s = t.Class, r = t.framework, u = "dxView", f = "dxLayout", h = 0, e, o;
        t.registerComponent(u, r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({name: null, title: null, layout: null})
            }, ctor: function() {
                this.callBase.apply(this, arguments), this._id = ++h
            }, _render: function() {
                this.callBase(), this.element().addClass("dx-view")
            }, getId: function() {
                return this._id
            }}), r), t.registerComponent(f, r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({name: null})
            }, _render: function() {
                this.callBase(), this.element().addClass("dx-layout")
            }})), t.registerComponent("dxViewPlaceholder", r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({viewName: null})
            }, _render: function() {
                this.callBase(), this.element().addClass("dx-view-placeholder")
            }})), e = function(n, t, i, r) {
            r === "absolute" ? n.addClass("dx-transition-absolute") : n.addClass("dx-transition-static"), n.addClass("dx-transition").addClass("dx-transition-" + i), n.data("dx-transition-type", t), n.data("dx-transition-name", i)
        }, o = function(n) {
            n.addClass("dx-transition-inner-wrapper")
        }, t.registerComponent("dxTransition", r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({name: null, type: "slide"})
            }, _render: function() {
                this.callBase();
                var n = this.element();
                e(n, this.option("type"), this.option("name"), "absolute"), n.wrapInner("<div/>"), o(n.children())
            }, _clean: function() {
                this.callBase(), this.element().empty()
            }})), t.registerComponent("dxContentPlaceholder", r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({name: null, transition: "none", contentCssPosition: "absolute"})
            }, _render: function() {
                this.callBase();
                var n = this.element();
                n.addClass("dx-content-placeholder").addClass("dx-content-placeholder-" + this.option("name")), e(n, this.option("transition"), this.option("name"), this.option("contentCssPosition"))
            }, prepareTransition: function() {
                var n = this.element();
                n.children(".dx-content").length === 0 && (n.wrapInner("<div>"), n.children().dxContent({targetPlaceholder: this.option("name")}))
            }})), t.registerComponent("dxContent", r, t.DOMComponent.inherit({_setDefaultOptions: function() {
                this.callBase(), this.option({targetPlaceholder: null})
            }, _optionChanged: function() {
                this._refresh()
            }, _clean: function() {
                this.callBase(), this.element().removeClass(this._currentClass)
            }, _render: function() {
                this.callBase();
                var n = this.element();
                n.addClass("dx-content"), this._currentClass = "dx-content-" + this.option("targetPlaceholder"), n.addClass(this._currentClass), o(n)
            }})), r.html.ViewEngine = s.inherit({ctor: function(t) {
                t = t || {}, this.$root = t.$root, this.device = t.device || {}, this.dataOptionsAttributeName = t.dataOptionsAttributeName || "data-options", this._templateMap = {}, this._pendingViewContainer = null, this.markupLoaded = n.Callbacks(), this._templateContext = t.templateContext
            }, _enumerateTemplates: function(t) {
                var i = this;
                n.each(i._templateMap, function(i, r) {
                    n.each(r, function(i, r) {
                        n.each(r, function(n, i) {
                            t(i)
                        })
                    })
                })
            }, _findComponent: function(n, t) {
                var i = (this._templateMap[n] || {})[t] || [], r = this._templateContext && this._templateContext.option() || {};
                return i = this._filterTemplates(r, i), this._checkMatchedTemplates(i), i[0]
            }, _findTemplate: function(n, i) {
                var u = this._findComponent(n, i), f, r;
                if (!u)
                    throw t.Error("E3013", i, n);
                return f = u.element(), r = f.clone(), t.utils.createComponents(r, [i]), r
            }, _extendModelFromViewData: function(n, i) {
                t.utils.extendFromObject(i, n.data(u).option())
            }, _loadTemplatesFromMarkupCore: function(i) {
                var r = this, e;
                if (i.find("[data-dx-role]").length)
                    throw t.Error("E3019");
                r.markupLoaded.fire({markup: i}), i.appendTo(r.$root), e = t.utils.createComponents(i, [u, f]), n.each(e, function(n, t) {
                    var i = t.element();
                    i.addClass("dx-hidden"), r._registerTemplateComponent(t), t.element().detach()
                })
            }, _registerTemplateComponent: function(n) {
                var i = n.NAME, u = n.option(), r = u.name, t = this._templateMap[r] || {};
                t[i] = t[i] || [], t[i].push(n), this._templateMap[r] = t
            }, _applyPartialViews: function(i) {
                var r = this;
                t.utils.createComponents(i, ["dxViewPlaceholder"]), n.each(i.find(".dx-view-placeholder"), function() {
                    var i = n(this), f, t;
                    i.children().length || (f = i.data("dxViewPlaceholder").option("viewName"), t = r._findTemplate(f, u), r._applyPartialViews(t), i.append(t), t.removeClass("dx-hidden"))
                })
            }, _ajaxImpl: function() {
                return n.ajax.apply(n, arguments)
            }, _loadTemplatesFromURL: function(i) {
                var f = this, u = this._getLoadOptions(), r = n.Deferred(), i = u.winPhonePrefix + i;
                return this._ajaxImpl({url: i, isLocal: u.isLocal, dataType: "html"}).done(function(n) {
                    f._loadTemplatesFromMarkupCore(t.utils.createMarkupFromString(n)), r.resolve()
                }).fail(function(n, u, f) {
                    var e = t.Error("E3021", i, f);
                    r.reject(e)
                }), r.promise()
            }, _getLoadOptions: function() {
                return location.protocol.indexOf("wmapp") >= 0 ? {winPhonePrefix: location.protocol + "www/", isLocal: !0} : {winPhonePrefix: "", isLocal: i}
            }, _loadExternalTemplates: function() {
                var t = [], i = this;
                return n("head").find("link[rel='dx-template']").each(function(r, u) {
                    var f = i._loadTemplatesFromURL(n(u).attr("href"));
                    t.push(f)
                }), n.when.apply(n, t)
            }, _processTemplates: function() {
                var t = this;
                n.each(t._templateMap, function(i, r) {
                    n.each(r, function(n, i) {
                        t._filterTemplatesByDevice(i)
                    })
                }), t._enumerateTemplates(function(n) {
                    t._applyPartialViews(n.element())
                })
            }, _filterTemplatesByDevice: function(t) {
                var i = this._filterTemplates(this.device, t);
                n.each(t, function(t, r) {
                    n.inArray(r, i) < 0 && (r._dispose(), r.element().remove())
                }), t.length = 0, t.push.apply(t, i)
            }, _filterTemplates: function(n, i) {
                return t.utils.findBestMatches(n, i, function(n) {
                    return n.option()
                })
            }, _checkMatchedTemplates: function(i) {
                if (i.length > 1) {
                    var r = "";
                    n.each(i, function(n, t) {
                        r += t.element().attr("data-options") + "\r\n"
                    });
                    throw t.Error("E3020", r, JSON.stringify(this.device));
                }
            }, _extendModelFormViewTemplate: function(n, t) {
                this._extendModelFromViewData(n, t)
            }, _ensureTemplates: function(n) {
                this._ensureViewTemplate(n)
            }, _ensureViewTemplate: function(n) {
                return n.$viewTemplate = n.$viewTemplate || this.getViewTemplate(n.viewName)
            }, _wrapViewDefaultContent: function(n) {
                n.wrapInner('<div class="dx-full-height"><\/div>'), n.children().eq(0).dxContent({targetPlaceholder: "content"})
            }, _initDefaultLayout: function() {
                this._$defaultLayoutTemplate = n('<div class="dx-full-height" data-options="dxLayout : { name: \'default\' } ">                 <div class="dx-full-height" data-options="dxContentPlaceholder : { name: \'content\' } " ><\/div>             <\/div>')
            }, _getDefaultLayoutTemplate: function() {
                var n = this._$defaultLayoutTemplate.clone();
                return t.utils.createComponents(n), n
            }, applyLayout: function(t, r) {
                (r === i || r.length === 0) && (r = this._getDefaultLayoutTemplate()), t.children(".dx-content").length === 0 && this._wrapViewDefaultContent(t);
                var u = n().add(r).add(t), f = u.find(".dx-content");
                return n.each(f, function() {
                    var t = n(this), r = t.data("dxContent").option("targetPlaceholder"), i = u.find(".dx-content-placeholder-" + r);
                    i.empty(), i.append(t)
                }), f.filter(":not(.dx-content-placeholder .dx-content)").remove(), r
            }, init: function() {
                var n = this;
                return this._initDefaultLayout(), this._loadExternalTemplates().done(function() {
                    n._loadTemplatesFromMarkupCore(n.$root.children()), n._processTemplates()
                })
            }, getViewTemplate: function(n) {
                return this._findTemplate(n, u)
            }, getViewTemplateInfo: function(n) {
                return this._findComponent(n, u)
            }, getLayoutTemplate: function(n) {
                return n ? this._findTemplate(n, f) : this._getDefaultLayoutTemplate()
            }, getLayoutTemplateInfo: function(n) {
                return this._findComponent(n, f)
            }, loadTemplates: function(t) {
                var i;
                return typeof t == "string" ? i = this._loadTemplatesFromURL(t) : (this._loadTemplatesFromMarkupCore(t), i = n.Deferred().resolve().promise()), i.done(n.proxy(this._processTemplates, this))
            }})
    }(jQuery, DevExpress), function(n, t, i) {
        var r = t.framework, u = r.html, f = "dx-viewport";
        u.HtmlApplication = r.Application.inherit({ctor: function(i) {
                var r, f;
                i = i || {}, this.callBase(i), this._$root = n(i.rootNode || document.body), this._initViewport(i.viewPort), this._applicationMode === "mobileApp" && t.utils.initMobileViewport(i.viewPort), this.device = i.device || t.devices.current(), r = t.framework.html.layoutSets, this.commandManager = i.commandManager || new t.framework.html.CommandManager({commandMapping: this.commandMapping}), n.each(i.layoutControllers || t.framework.html.layoutControllers, function(n, t) {
                    var i = t.navigationType;
                    r[i] = r[i] || [], r[i].push(t), delete t.navigationType
                }), f = i.navigationType || i.defaultLayout, f && (i.layoutSet = r[f]), this._initTemplateContext(), this.viewEngine = i.viewEngine || new u.ViewEngine({$root: this._$root, device: this.device, templateContext: this._templateContext}), this.components.push(this.viewEngine), this._initMarkupFilters(this.viewEngine), this.viewRendered = n.Callbacks(), this._layoutSet = i.layoutSet || (i.layoutControllers && i.layoutControllers.length ? i.layoutControllers : r["default"]), this._availableLayoutControllers = [], this._activeLayoutControllersStack = [], this.resolveLayoutController = n.Callbacks(), this._callbacksToEvents("HtmlApplication", ["viewRendered", "resolveLayoutController"])
            }, _localizeMarkup: function(n) {
                t.localization.localizeNode(n)
            }, _notifyIfBadMarkup: function(i) {
                i.each(function() {
                    var i = n(this).html();
                    /href="#/.test(i) && t.log("W3005", i)
                })
            }, _initMarkupFilters: function(t) {
                var i = [];
                i.push(this._localizeMarkup), t.markupLoaded && t.markupLoaded.add(function(t) {
                    n.each(i, function(n, i) {
                        i(t.markup)
                    })
                })
            }, _createViewCache: function(n) {
                var i = this.callBase(n);
                return n.viewCache || (i = new t.framework.ConditionalViewCacheDecorator({filter: function(n, t) {
                        return!t.viewTemplateInfo.disableCache
                    }, viewCache: i})), i
            }, _initViewport: function() {
                this._$viewPort = this._getViewPort(), t.viewPort(this._$viewPort)
            }, _getViewPort: function() {
                var t = n("." + f);
                return t.length || (t = n("<div>").addClass(f).appendTo(this._$root)), t
            }, _initTemplateContext: function() {
                this._templateContext = new t.Component({orientation: t.devices.orientation()});
                t.devices.on("orientationChanged", n.proxy(function(n) {
                    this._templateContext.option("orientation", n.orientation)
                }, this))
            }, _showViewImpl: function(t, i) {
                var r = this, u = n.Deferred(), f = t.layoutController;
                return r._obtainViewLink(t), f.showView(t, i).done(function() {
                    r._activateLayoutController(f, r._getTargetNode(t)).done(function() {
                        u.resolve()
                    })
                }), u.promise()
            }, _setViewLoadingState: function(t, i) {
                var r = this, u = n.Deferred(), f = t.layoutController;
                return f.setViewLoadingState(t, i).done(function() {
                    r._activateLayoutController(f, r._getTargetNode(t)).done(function() {
                        u.resolve()
                    })
                }), u.promise()
            }, _resolveLayoutController: function(n) {
                var t = {viewInfo: n, layoutController: null, availableLayoutControllers: this._availableLayoutControllers};
                return this._processEvent("resolveLayoutController", t, n.model), t.layoutController || this._resolveLayoutControllerImpl(n)
            }, _ensureOneLayoutControllerFound: function(n, i) {
                var r = function(n, t) {
                    return n === "controller" ? "[controller]: { name:" + t.name + " }" : t
                };
                if (!i.length) {
                    t.log("W3003", JSON.stringify(n, null, 4), JSON.stringify(this._availableLayoutControllers, r, 4));
                    throw t.Error("E3011");
                }
                if (i.length > 1) {
                    t.log("W3004", JSON.stringify(n, null, 4), JSON.stringify(i, r, 4));
                    throw t.Error("E3012");
                }
            }, _resolveLayoutControllerImpl: function(r) {
                var u = r.viewTemplateInfo || {}, f = r.navigateOptions || {}, e = n.extend({root: !r.canBack, customResolveRequired: !1, pane: u.pane, modal: f.modal !== i ? f.modal : u.modal || !1}, t.devices.current()), o = t.utils.findBestMatches(e, this._availableLayoutControllers);
                return this._ensureOneLayoutControllerFound(e, o), o[0].controller
            }, _onNavigatingBack: function(n) {
                if (this.callBase.apply(this, arguments), !n.cancel && !this.canBack() && this._activeLayoutControllersStack.length > 1) {
                    var t = this._activeLayoutControllersStack[this._activeLayoutControllersStack.length - 2], i = t.activeViewInfo();
                    n.cancel = !0, this._activateLayoutController(t), this.navigationManager.currentItem(i.key)
                }
            }, _activeLayoutController: function() {
                return this._activeLayoutControllersStack.length ? this._activeLayoutControllersStack[this._activeLayoutControllersStack.length - 1] : i
            }, _getTargetNode: function(t) {
                var r = (t.navigateOptions || {}).jQueryEvent;
                return r ? n(r.target) : i
            }, _activateLayoutController: function(t, i) {
                var r = this, u = n.Deferred(), f = r._activeLayoutController();
                return f !== t ? t.activate(i).done(function() {
                    f && !t.isOverlay ? f.deactivate().done(function() {
                        r._activeLayoutControllersStack.pop(), r._activeLayoutControllersStack.push(t), u.resolve()
                    }) : (r._activeLayoutControllersStack.push(t), u.resolve())
                }) : u.resolve(), u.promise()
            }, init: function() {
                var n = this, t = this.callBase();
                return t.done(function() {
                    n._initLayoutControllers(), n.renderNavigation()
                }), t
            }, _disposeView: function(n) {
                n.layoutController.disposeView && n.layoutController.disposeView(n), this.callBase(n)
            }, viewPort: function() {
                return this._$viewPort
            }, _createViewInfo: function() {
                var r = this.callBase.apply(this, arguments), u = this.getViewTemplateInfo(r.viewName);
                if (!u)
                    throw t.Error("E3013", "dxView", r.viewName);
                return r.viewTemplateInfo = u, r.layoutController = this._resolveLayoutController(r), r
            }, _createViewModel: function(n) {
                var i, r, t;
                this.callBase(n), i = n.viewTemplateInfo, r = n.model;
                for (t in i)
                    t in r || (r[t] = i[t])
            }, _initLayoutControllers: function() {
                var i = this;
                n.each(i._layoutSet, function(n, r) {
                    var u = r.controller, f = t.devices.current();
                    if (t.utils.findBestMatches(f, [r]).length && (i._availableLayoutControllers.push(r), u.init && u.init({app: i, $viewPort: i._$viewPort, navigationManager: i.navigationManager, viewEngine: i.viewEngine, templateContext: i._templateContext, commandManager: i.commandManager}), u.on)) {
                        u.on("viewReleased", function(n) {
                            i._onViewReleased(n)
                        });
                        u.on("viewRendered", function(n) {
                            i._processEvent("viewRendered", {viewInfo: n}, n.model)
                        })
                    }
                })
            }, _onViewReleased: function(n) {
                this._onViewHidden(n), this._releaseViewLink(n)
            }, renderNavigation: function() {
                var t = this;
                n.each(t._availableLayoutControllers, function(n, i) {
                    var r = i.controller;
                    r.renderNavigation && r.renderNavigation(t.navigation)
                })
            }, getViewTemplate: function(n) {
                return this.viewEngine.getViewTemplate(n)
            }, getViewTemplateInfo: function(n) {
                var t = this.viewEngine.getViewTemplateInfo(n);
                return t && t.option()
            }, loadTemplates: function(n) {
                return this.viewEngine.loadTemplates(n)
            }, templateContext: function() {
                return this._templateContext
            }})
    }(jQuery, DevExpress), function(n, t) {
        n.fn.extend({unwrapInner: function(t) {
                return this.each(function() {
                    var i = this, r = n(i).children(t);
                    r.each(function() {
                        var t = n(this);
                        t.contents().appendTo(i), t.remove()
                    })
                })
            }});
        var i = 400, r = t.Class.inherit({ctor: function(n, t) {
                this.container = n, this.options = t
            }, exec: function() {
                var t = this, i = t.options, u = i.source, r = i.destination, f = u, o = r, e = t._getTransitionInnerElement(r);
                return this._finalize = function() {
                }, t._animate(n.extend({}, i, {source: f, destination: e}))
            }, finalize: function() {
                if (!this._finalize)
                    throw t.Error("E3015");
                this._finalize()
            }, _getTransitionInnerElement: function(n) {
                return n.children(".dx-active-view:not(.dx-transition-source)")
            }, _animate: function() {
                return(new n.Deferred).resolve().promise()
            }}), u = r.inherit({_animate: function(i) {
                var u = i.source, f = i.destination, r = this.container.width();
                return t.fx.animate(u, {type: "slide", from: {left: 0}, to: {left: 0}, duration: 0}), t.fx.animate(f, {type: "slide", from: {left: -r}, to: {left: -r}, duration: 0}), n.Deferred().resolve().promise()
            }}), f = r.inherit({_animate: function(r) {
                if (r.direction === "none")
                    return n.Deferred().resolve().promise();
                var f = r.source, e = r.destination, o = r.direction === "backward" ? -1 : 1, s = t.rtlEnabled ? -1 : 1, u = this.container.width() * o * s, h = t.fx.animate(f, {type: "slide", from: {left: u}, to: {left: 0}, duration: i}), c = t.fx.animate(e, {type: "slide", from: {left: 0}, to: {left: -u}, duration: i});
                return n.when(c, h)
            }}), e = r.inherit({_animate: function(r) {
                var a, v;
                if (r.direction === "none")
                    return n.Deferred().resolve().promise();
                var u = r.source, f = r.destination, y = t.rtlEnabled ? -1 : 1, e = this.container.width() * y, l = e / 5, o, s, h, c, p = u.css("z-index"), w = f.css("z-index");
                return r.direction === "backward" ? (o = -l, s = 0, h = 0, c = e, u.css("z-index", 1), f.css("z-index", 2)) : (o = e, s = 0, h = 0, c = -l, u.css("z-index", 2), f.css("z-index", 1)), a = t.fx.animate(u, {type: "slide", from: {left: o}, to: {left: s}, duration: i}), v = t.fx.animate(f, {type: "slide", from: {left: h}, to: {left: c}, duration: i}), n.when(v, a).done(function() {
                    u.css("z-index", p), f.css("z-index", w)
                })
            }}), o = r.inherit({_animate: function(r) {
                var s = r.source, o = r.destination, h = o.position().top, u = o.position().left, e = this.container.width(), f;
                return r.direction === "backward" && (e = -e), f = [], r.direction === "forward" ? f.push(t.fx.animate(s, {type: "slide", from: {top: h, left: e + u, "z-index": 1}, to: {left: u}, duration: i})) : (f.push(t.fx.animate(s, {type: "slide", from: {left: u, "z-index": 1}, to: {left: u}, duration: i})), f.push(t.fx.animate(o, {type: "slide", from: {"z-index": 2}, to: {left: u - e}, duration: i}))), n.when.apply(n, f)
            }}), s = r.inherit({_animate: function(t) {
                var r = t.source, f = t.destination, u = new n.Deferred;
                return r.css({opacity: 0}), f.animate({opacity: 0}, i), r.animate({opacity: 1}, i, function() {
                    u.resolve()
                }), u.promise()
            }}), h = function(n) {
            return n.type === "fade" ? n.type : n.direction === "none" ? "none" : n.type
        };
        r.create = function(n, i) {
            var r = t.devices.current();
            switch (h(i)) {
                case"none":
                    return new u(n, i);
                case"slide":
                    return r.platform === "ios" && r.version[0] === 7 ? new e(n, i) : new f(n, i);
                case"fade":
                    return new s(n, i);
                case"overflow":
                    return new o(n, i);
                default:
                    throw t.Error("E3016", i.type);
                }
        }, t.framework.html.TransitionExecutor = r
    }(jQuery, DevExpress), DevExpress.MOD_FRAMEWORK = !0
}
