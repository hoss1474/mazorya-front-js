/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var om = Object.create;
  var Fr = Object.defineProperty;
  var am = Object.getOwnPropertyDescriptor;
  var sm = Object.getOwnPropertyNames;
  var um = Object.getPrototypeOf,
    cm = Object.prototype.hasOwnProperty;
  var me = (e, t) => () => (e && (t = e((e = 0))), t);
  var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    De = (e, t) => {
      for (var r in t) Fr(e, r, { get: t[r], enumerable: !0 });
    },
    ya = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of sm(t))
          !cm.call(e, i) &&
            i !== r &&
            Fr(e, i, {
              get: () => t[i],
              enumerable: !(n = am(t, i)) || n.enumerable,
            });
      return e;
    };
  var de = (e, t, r) => (
      (r = e != null ? om(um(e)) : {}),
      ya(
        t || !e || !e.__esModule
          ? Fr(r, "default", { value: e, enumerable: !0 })
          : r,
        e,
      )
    ),
    Qe = (e) => ya(Fr({}, "__esModule", { value: !0 }), e);
  var Zn = g(() => {
    "use strict";
    window.tram = (function (e) {
      function t(d, x) {
        var R = new p.Bare();
        return R.init(d, x);
      }
      function r(d) {
        return d.replace(/[A-Z]/g, function (x) {
          return "-" + x.toLowerCase();
        });
      }
      function n(d) {
        var x = parseInt(d.slice(1), 16),
          R = (x >> 16) & 255,
          M = (x >> 8) & 255,
          S = 255 & x;
        return [R, M, S];
      }
      function i(d, x, R) {
        return (
          "#" + ((1 << 24) | (d << 16) | (x << 8) | R).toString(16).slice(1)
        );
      }
      function o() {}
      function a(d, x) {
        l("Type warning: Expected: [" + d + "] Got: [" + typeof x + "] " + x);
      }
      function u(d, x, R) {
        l("Units do not match [" + d + "]: " + x + ", " + R);
      }
      function s(d, x, R) {
        if ((x !== void 0 && (R = x), d === void 0)) return R;
        var M = R;
        return (
          Ie.test(d) || !Ae.test(d)
            ? (M = parseInt(d, 10))
            : Ae.test(d) && (M = 1e3 * parseFloat(d)),
          0 > M && (M = 0),
          M === M ? M : R
        );
      }
      function l(d) {
        ie.debug && window && window.console.warn(d);
      }
      function b(d) {
        for (var x = -1, R = d ? d.length : 0, M = []; ++x < R; ) {
          var S = d[x];
          S && M.push(S);
        }
        return M;
      }
      var f = (function (d, x, R) {
          function M(ae) {
            return typeof ae == "object";
          }
          function S(ae) {
            return typeof ae == "function";
          }
          function X() {}
          function ne(ae, he) {
            function Z() {
              var Re = new ue();
              return (S(Re.init) && Re.init.apply(Re, arguments), Re);
            }
            function ue() {}
            (he === R && ((he = ae), (ae = Object)), (Z.Bare = ue));
            var ce,
              _e = (X[d] = ae[d]),
              Ye = (ue[d] = Z[d] = new X());
            return (
              (Ye.constructor = Z),
              (Z.mixin = function (Re) {
                return ((ue[d] = Z[d] = ne(Z, Re)[d]), Z);
              }),
              (Z.open = function (Re) {
                if (
                  ((ce = {}),
                  S(Re) ? (ce = Re.call(Z, Ye, _e, Z, ae)) : M(Re) && (ce = Re),
                  M(ce))
                )
                  for (var ir in ce) x.call(ce, ir) && (Ye[ir] = ce[ir]);
                return (S(Ye.init) || (Ye.init = ae), Z);
              }),
              Z.open(he)
            );
          }
          return ne;
        })("prototype", {}.hasOwnProperty),
        E = {
          ease: [
            "ease",
            function (d, x, R, M) {
              var S = (d /= M) * d,
                X = S * d;
              return (
                x +
                R * (-2.75 * X * S + 11 * S * S + -15.5 * X + 8 * S + 0.25 * d)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (d, x, R, M) {
              var S = (d /= M) * d,
                X = S * d;
              return x + R * (-1 * X * S + 3 * S * S + -3 * X + 2 * S);
            },
          ],
          "ease-out": [
            "ease-out",
            function (d, x, R, M) {
              var S = (d /= M) * d,
                X = S * d;
              return (
                x +
                R * (0.3 * X * S + -1.6 * S * S + 2.2 * X + -1.8 * S + 1.9 * d)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (d, x, R, M) {
              var S = (d /= M) * d,
                X = S * d;
              return x + R * (2 * X * S + -5 * S * S + 2 * X + 2 * S);
            },
          ],
          linear: [
            "linear",
            function (d, x, R, M) {
              return (R * d) / M + x;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (d, x, R, M) {
              return R * (d /= M) * d + x;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (d, x, R, M) {
              return -R * (d /= M) * (d - 2) + x;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (d, x, R, M) {
              return (d /= M / 2) < 1
                ? (R / 2) * d * d + x
                : (-R / 2) * (--d * (d - 2) - 1) + x;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (d, x, R, M) {
              return R * (d /= M) * d * d + x;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (d, x, R, M) {
              return R * ((d = d / M - 1) * d * d + 1) + x;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (d, x, R, M) {
              return (d /= M / 2) < 1
                ? (R / 2) * d * d * d + x
                : (R / 2) * ((d -= 2) * d * d + 2) + x;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (d, x, R, M) {
              return R * (d /= M) * d * d * d + x;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (d, x, R, M) {
              return -R * ((d = d / M - 1) * d * d * d - 1) + x;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (d, x, R, M) {
              return (d /= M / 2) < 1
                ? (R / 2) * d * d * d * d + x
                : (-R / 2) * ((d -= 2) * d * d * d - 2) + x;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (d, x, R, M) {
              return R * (d /= M) * d * d * d * d + x;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (d, x, R, M) {
              return R * ((d = d / M - 1) * d * d * d * d + 1) + x;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (d, x, R, M) {
              return (d /= M / 2) < 1
                ? (R / 2) * d * d * d * d * d + x
                : (R / 2) * ((d -= 2) * d * d * d * d + 2) + x;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (d, x, R, M) {
              return -R * Math.cos((d / M) * (Math.PI / 2)) + R + x;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (d, x, R, M) {
              return R * Math.sin((d / M) * (Math.PI / 2)) + x;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (d, x, R, M) {
              return (-R / 2) * (Math.cos((Math.PI * d) / M) - 1) + x;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (d, x, R, M) {
              return d === 0 ? x : R * Math.pow(2, 10 * (d / M - 1)) + x;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (d, x, R, M) {
              return d === M
                ? x + R
                : R * (-Math.pow(2, (-10 * d) / M) + 1) + x;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (d, x, R, M) {
              return d === 0
                ? x
                : d === M
                  ? x + R
                  : (d /= M / 2) < 1
                    ? (R / 2) * Math.pow(2, 10 * (d - 1)) + x
                    : (R / 2) * (-Math.pow(2, -10 * --d) + 2) + x;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (d, x, R, M) {
              return -R * (Math.sqrt(1 - (d /= M) * d) - 1) + x;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (d, x, R, M) {
              return R * Math.sqrt(1 - (d = d / M - 1) * d) + x;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (d, x, R, M) {
              return (d /= M / 2) < 1
                ? (-R / 2) * (Math.sqrt(1 - d * d) - 1) + x
                : (R / 2) * (Math.sqrt(1 - (d -= 2) * d) + 1) + x;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (d, x, R, M, S) {
              return (
                S === void 0 && (S = 1.70158),
                R * (d /= M) * d * ((S + 1) * d - S) + x
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (d, x, R, M, S) {
              return (
                S === void 0 && (S = 1.70158),
                R * ((d = d / M - 1) * d * ((S + 1) * d + S) + 1) + x
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (d, x, R, M, S) {
              return (
                S === void 0 && (S = 1.70158),
                (d /= M / 2) < 1
                  ? (R / 2) * d * d * (((S *= 1.525) + 1) * d - S) + x
                  : (R / 2) *
                      ((d -= 2) * d * (((S *= 1.525) + 1) * d + S) + 2) +
                    x
              );
            },
          ],
        },
        m = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        y = document,
        T = window,
        A = "bkwld-tram",
        w = /[\-\.0-9]/g,
        N = /[A-Z]/,
        L = "number",
        F = /^(rgb|#)/,
        k = /(em|cm|mm|in|pt|pc|px)$/,
        q = /(em|cm|mm|in|pt|pc|px|%)$/,
        j = /(deg|rad|turn)$/,
        K = "unitless",
        Q = /(all|none) 0s ease 0s/,
        te = /^(width|height)$/,
        z = " ",
        C = y.createElement("a"),
        I = ["Webkit", "Moz", "O", "ms"],
        P = ["-webkit-", "-moz-", "-o-", "-ms-"],
        G = function (d) {
          if (d in C.style) return { dom: d, css: d };
          var x,
            R,
            M = "",
            S = d.split("-");
          for (x = 0; x < S.length; x++)
            M += S[x].charAt(0).toUpperCase() + S[x].slice(1);
          for (x = 0; x < I.length; x++)
            if (((R = I[x] + M), R in C.style))
              return { dom: R, css: P[x] + d };
        },
        V = (t.support = {
          bind: Function.prototype.bind,
          transform: G("transform"),
          transition: G("transition"),
          backface: G("backface-visibility"),
          timing: G("transition-timing-function"),
        });
      if (V.transition) {
        var ee = V.timing.dom;
        if (((C.style[ee] = E["ease-in-back"][0]), !C.style[ee]))
          for (var re in m) E[re][0] = m[re];
      }
      var W = (t.frame = (function () {
          var d =
            T.requestAnimationFrame ||
            T.webkitRequestAnimationFrame ||
            T.mozRequestAnimationFrame ||
            T.oRequestAnimationFrame ||
            T.msRequestAnimationFrame;
          return d && V.bind
            ? d.bind(T)
            : function (x) {
                T.setTimeout(x, 16);
              };
        })()),
        H = (t.now = (function () {
          var d = T.performance,
            x = d && (d.now || d.webkitNow || d.msNow || d.mozNow);
          return x && V.bind
            ? x.bind(d)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        h = f(function (d) {
          function x(oe, fe) {
            var Ee = b(("" + oe).split(z)),
              pe = Ee[0];
            fe = fe || {};
            var Ce = Y[pe];
            if (!Ce) return l("Unsupported property: " + pe);
            if (!fe.weak || !this.props[pe]) {
              var Ue = Ce[0],
                Ne = this.props[pe];
              return (
                Ne || (Ne = this.props[pe] = new Ue.Bare()),
                Ne.init(this.$el, Ee, Ce, fe),
                Ne
              );
            }
          }
          function R(oe, fe, Ee) {
            if (oe) {
              var pe = typeof oe;
              if (
                (fe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                pe == "number" && fe)
              )
                return (
                  (this.timer = new $({
                    duration: oe,
                    context: this,
                    complete: X,
                  })),
                  void (this.active = !0)
                );
              if (pe == "string" && fe) {
                switch (oe) {
                  case "hide":
                    Z.call(this);
                    break;
                  case "stop":
                    ne.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    x.call(this, oe, Ee && Ee[1]);
                }
                return X.call(this);
              }
              if (pe == "function") return void oe.call(this, this);
              if (pe == "object") {
                var Ce = 0;
                (Ye.call(
                  this,
                  oe,
                  function (be, im) {
                    (be.span > Ce && (Ce = be.span), be.stop(), be.animate(im));
                  },
                  function (be) {
                    "wait" in be && (Ce = s(be.wait, 0));
                  },
                ),
                  _e.call(this),
                  Ce > 0 &&
                    ((this.timer = new $({ duration: Ce, context: this })),
                    (this.active = !0),
                    fe && (this.timer.complete = X)));
                var Ue = this,
                  Ne = !1,
                  Mr = {};
                W(function () {
                  (Ye.call(Ue, oe, function (be) {
                    be.active && ((Ne = !0), (Mr[be.name] = be.nextStyle));
                  }),
                    Ne && Ue.$el.css(Mr));
                });
              }
            }
          }
          function M(oe) {
            ((oe = s(oe, 0)),
              this.active
                ? this.queue.push({ options: oe })
                : ((this.timer = new $({
                    duration: oe,
                    context: this,
                    complete: X,
                  })),
                  (this.active = !0)));
          }
          function S(oe) {
            return this.active
              ? (this.queue.push({ options: oe, args: arguments }),
                void (this.timer.complete = X))
              : l(
                  "No active transition timer. Use start() or wait() before then().",
                );
          }
          function X() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var oe = this.queue.shift();
              R.call(this, oe.options, !0, oe.args);
            }
          }
          function ne(oe) {
            (this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1));
            var fe;
            (typeof oe == "string"
              ? ((fe = {}), (fe[oe] = 1))
              : (fe = typeof oe == "object" && oe != null ? oe : this.props),
              Ye.call(this, fe, Re),
              _e.call(this));
          }
          function ae(oe) {
            (ne.call(this, oe), Ye.call(this, oe, ir, rm));
          }
          function he(oe) {
            (typeof oe != "string" && (oe = "block"),
              (this.el.style.display = oe));
          }
          function Z() {
            (ne.call(this), (this.el.style.display = "none"));
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            (ne.call(this),
              e.removeData(this.el, A),
              (this.$el = this.el = null));
          }
          function _e() {
            var oe,
              fe,
              Ee = [];
            this.upstream && Ee.push(this.upstream);
            for (oe in this.props)
              ((fe = this.props[oe]), fe.active && Ee.push(fe.string));
            ((Ee = Ee.join(",")),
              this.style !== Ee &&
                ((this.style = Ee), (this.el.style[V.transition.dom] = Ee)));
          }
          function Ye(oe, fe, Ee) {
            var pe,
              Ce,
              Ue,
              Ne,
              Mr = fe !== Re,
              be = {};
            for (pe in oe)
              ((Ue = oe[pe]),
                pe in le
                  ? (be.transform || (be.transform = {}),
                    (be.transform[pe] = Ue))
                  : (N.test(pe) && (pe = r(pe)),
                    pe in Y
                      ? (be[pe] = Ue)
                      : (Ne || (Ne = {}), (Ne[pe] = Ue))));
            for (pe in be) {
              if (((Ue = be[pe]), (Ce = this.props[pe]), !Ce)) {
                if (!Mr) continue;
                Ce = x.call(this, pe);
              }
              fe.call(this, Ce, Ue);
            }
            Ee && Ne && Ee.call(this, Ne);
          }
          function Re(oe) {
            oe.stop();
          }
          function ir(oe, fe) {
            oe.set(fe);
          }
          function rm(oe) {
            this.$el.css(oe);
          }
          function Ge(oe, fe) {
            d[oe] = function () {
              return this.children
                ? nm.call(this, fe, arguments)
                : (this.el && fe.apply(this, arguments), this);
            };
          }
          function nm(oe, fe) {
            var Ee,
              pe = this.children.length;
            for (Ee = 0; pe > Ee; Ee++) oe.apply(this.children[Ee], fe);
            return this;
          }
          ((d.init = function (oe) {
            if (
              ((this.$el = e(oe)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ie.keepInherited && !ie.fallback)
            ) {
              var fe = B(this.el, "transition");
              fe && !Q.test(fe) && (this.upstream = fe);
            }
            V.backface &&
              ie.hideBackface &&
              _(this.el, V.backface.css, "hidden");
          }),
            Ge("add", x),
            Ge("start", R),
            Ge("wait", M),
            Ge("then", S),
            Ge("next", X),
            Ge("stop", ne),
            Ge("set", ae),
            Ge("show", he),
            Ge("hide", Z),
            Ge("redraw", ue),
            Ge("destroy", ce));
        }),
        p = f(h, function (d) {
          function x(R, M) {
            var S = e.data(R, A) || e.data(R, A, new h.Bare());
            return (S.el || S.init(R), M ? S.start(M) : S);
          }
          d.init = function (R, M) {
            var S = e(R);
            if (!S.length) return this;
            if (S.length === 1) return x(S[0], M);
            var X = [];
            return (
              S.each(function (ne, ae) {
                X.push(x(ae, M));
              }),
              (this.children = X),
              this
            );
          };
        }),
        v = f(function (d) {
          function x() {
            var X = this.get();
            this.update("auto");
            var ne = this.get();
            return (this.update(X), ne);
          }
          function R(X, ne, ae) {
            return (ne !== void 0 && (ae = ne), X in E ? X : ae);
          }
          function M(X) {
            var ne = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(X);
            return (ne ? i(ne[1], ne[2], ne[3]) : X).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3",
            );
          }
          var S = { duration: 500, ease: "ease", delay: 0 };
          ((d.init = function (X, ne, ae, he) {
            ((this.$el = X), (this.el = X[0]));
            var Z = ne[0];
            (ae[2] && (Z = ae[2]),
              J[Z] && (Z = J[Z]),
              (this.name = Z),
              (this.type = ae[1]),
              (this.duration = s(ne[1], this.duration, S.duration)),
              (this.ease = R(ne[2], this.ease, S.ease)),
              (this.delay = s(ne[3], this.delay, S.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = te.test(this.name)),
              (this.unit = he.unit || this.unit || ie.defaultUnit),
              (this.angle = he.angle || this.angle || ie.defaultAngle),
              ie.fallback || he.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    z +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? z + E[this.ease][0] : "") +
                    (this.delay ? z + this.delay + "ms" : ""))));
          }),
            (d.set = function (X) {
              ((X = this.convert(X, this.type)), this.update(X), this.redraw());
            }),
            (d.transition = function (X) {
              ((this.active = !0),
                (X = this.convert(X, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  X == "auto" && (X = x.call(this))),
                (this.nextStyle = X));
            }),
            (d.fallback = function (X) {
              var ne =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              ((X = this.convert(X, this.type)),
                this.auto &&
                  (ne == "auto" && (ne = this.convert(this.get(), this.type)),
                  X == "auto" && (X = x.call(this))),
                (this.tween = new O({
                  from: ne,
                  to: X,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                })));
            }),
            (d.get = function () {
              return B(this.el, this.name);
            }),
            (d.update = function (X) {
              _(this.el, this.name, X);
            }),
            (d.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                _(this.el, this.name, this.get()));
              var X = this.tween;
              X && X.context && X.destroy();
            }),
            (d.convert = function (X, ne) {
              if (X == "auto" && this.auto) return X;
              var ae,
                he = typeof X == "number",
                Z = typeof X == "string";
              switch (ne) {
                case L:
                  if (he) return X;
                  if (Z && X.replace(w, "") === "") return +X;
                  ae = "number(unitless)";
                  break;
                case F:
                  if (Z) {
                    if (X === "" && this.original) return this.original;
                    if (ne.test(X))
                      return X.charAt(0) == "#" && X.length == 7 ? X : M(X);
                  }
                  ae = "hex or rgb string";
                  break;
                case k:
                  if (he) return X + this.unit;
                  if (Z && ne.test(X)) return X;
                  ae = "number(px) or string(unit)";
                  break;
                case q:
                  if (he) return X + this.unit;
                  if (Z && ne.test(X)) return X;
                  ae = "number(px) or string(unit or %)";
                  break;
                case j:
                  if (he) return X + this.angle;
                  if (Z && ne.test(X)) return X;
                  ae = "number(deg) or string(angle)";
                  break;
                case K:
                  if (he || (Z && q.test(X))) return X;
                  ae = "number(unitless) or string(unit or %)";
              }
              return (a(ae, X), X);
            }),
            (d.redraw = function () {
              this.el.offsetHeight;
            }));
        }),
        c = f(v, function (d, x) {
          d.init = function () {
            (x.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), F)));
          };
        }),
        D = f(v, function (d, x) {
          ((d.init = function () {
            (x.init.apply(this, arguments), (this.animate = this.fallback));
          }),
            (d.get = function () {
              return this.$el[this.name]();
            }),
            (d.update = function (R) {
              this.$el[this.name](R);
            }));
        }),
        U = f(v, function (d, x) {
          function R(M, S) {
            var X, ne, ae, he, Z;
            for (X in M)
              ((he = le[X]),
                (ae = he[0]),
                (ne = he[1] || X),
                (Z = this.convert(M[X], ae)),
                S.call(this, ne, Z, ae));
          }
          ((d.init = function () {
            (x.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                le.perspective &&
                  ie.perspective &&
                  ((this.current.perspective = ie.perspective),
                  _(this.el, this.name, this.style(this.current)),
                  this.redraw())));
          }),
            (d.set = function (M) {
              (R.call(this, M, function (S, X) {
                this.current[S] = X;
              }),
                _(this.el, this.name, this.style(this.current)),
                this.redraw());
            }),
            (d.transition = function (M) {
              var S = this.values(M);
              this.tween = new se({
                current: this.current,
                values: S,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var X,
                ne = {};
              for (X in this.current) ne[X] = X in S ? S[X] : this.current[X];
              ((this.active = !0), (this.nextStyle = this.style(ne)));
            }),
            (d.fallback = function (M) {
              var S = this.values(M);
              this.tween = new se({
                current: this.current,
                values: S,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (d.update = function () {
              _(this.el, this.name, this.style(this.current));
            }),
            (d.style = function (M) {
              var S,
                X = "";
              for (S in M) X += S + "(" + M[S] + ") ";
              return X;
            }),
            (d.values = function (M) {
              var S,
                X = {};
              return (
                R.call(this, M, function (ne, ae, he) {
                  ((X[ne] = ae),
                    this.current[ne] === void 0 &&
                      ((S = 0),
                      ~ne.indexOf("scale") && (S = 1),
                      (this.current[ne] = this.convert(S, he))));
                }),
                X
              );
            }));
        }),
        O = f(function (d) {
          function x(Z) {
            ae.push(Z) === 1 && W(R);
          }
          function R() {
            var Z,
              ue,
              ce,
              _e = ae.length;
            if (_e)
              for (W(R), ue = H(), Z = _e; Z--; )
                ((ce = ae[Z]), ce && ce.render(ue));
          }
          function M(Z) {
            var ue,
              ce = e.inArray(Z, ae);
            ce >= 0 &&
              ((ue = ae.slice(ce + 1)),
              (ae.length = ce),
              ue.length && (ae = ae.concat(ue)));
          }
          function S(Z) {
            return Math.round(Z * he) / he;
          }
          function X(Z, ue, ce) {
            return i(
              Z[0] + ce * (ue[0] - Z[0]),
              Z[1] + ce * (ue[1] - Z[1]),
              Z[2] + ce * (ue[2] - Z[2]),
            );
          }
          var ne = { ease: E.ease[1], from: 0, to: 1 };
          ((d.init = function (Z) {
            ((this.duration = Z.duration || 0), (this.delay = Z.delay || 0));
            var ue = Z.ease || ne.ease;
            (E[ue] && (ue = E[ue][1]),
              typeof ue != "function" && (ue = ne.ease),
              (this.ease = ue),
              (this.update = Z.update || o),
              (this.complete = Z.complete || o),
              (this.context = Z.context || this),
              (this.name = Z.name));
            var ce = Z.from,
              _e = Z.to;
            (ce === void 0 && (ce = ne.from),
              _e === void 0 && (_e = ne.to),
              (this.unit = Z.unit || ""),
              typeof ce == "number" && typeof _e == "number"
                ? ((this.begin = ce), (this.change = _e - ce))
                : this.format(_e, ce),
              (this.value = this.begin + this.unit),
              (this.start = H()),
              Z.autoplay !== !1 && this.play());
          }),
            (d.play = function () {
              this.active ||
                (this.start || (this.start = H()), (this.active = !0), x(this));
            }),
            (d.stop = function () {
              this.active && ((this.active = !1), M(this));
            }),
            (d.render = function (Z) {
              var ue,
                ce = Z - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var _e = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? X(this.startRGB, this.endRGB, _e)
                    : S(this.begin + _e * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              ((ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy());
            }),
            (d.format = function (Z, ue) {
              if (((ue += ""), (Z += ""), Z.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ue)),
                  (this.endRGB = n(Z)),
                  (this.endHex = Z),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(w, ""),
                  _e = Z.replace(w, "");
                (ce !== _e && u("tween", ue, Z), (this.unit = ce));
              }
              ((ue = parseFloat(ue)),
                (Z = parseFloat(Z)),
                (this.begin = this.value = ue),
                (this.change = Z - ue));
            }),
            (d.destroy = function () {
              (this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o));
            }));
          var ae = [],
            he = 1e3;
        }),
        $ = f(O, function (d) {
          ((d.init = function (x) {
            ((this.duration = x.duration || 0),
              (this.complete = x.complete || o),
              (this.context = x.context),
              this.play());
          }),
            (d.render = function (x) {
              var R = x - this.start;
              R < this.duration ||
                (this.complete.call(this.context), this.destroy());
            }));
        }),
        se = f(O, function (d, x) {
          ((d.init = function (R) {
            ((this.context = R.context),
              (this.update = R.update),
              (this.tweens = []),
              (this.current = R.current));
            var M, S;
            for (M in R.values)
              ((S = R.values[M]),
                this.current[M] !== S &&
                  this.tweens.push(
                    new O({
                      name: M,
                      from: this.current[M],
                      to: S,
                      duration: R.duration,
                      delay: R.delay,
                      ease: R.ease,
                      autoplay: !1,
                    }),
                  ));
            this.play();
          }),
            (d.render = function (R) {
              var M,
                S,
                X = this.tweens.length,
                ne = !1;
              for (M = X; M--; )
                ((S = this.tweens[M]),
                  S.context &&
                    (S.render(R), (this.current[S.name] = S.value), (ne = !0)));
              return ne
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (d.destroy = function () {
              if ((x.destroy.call(this), this.tweens)) {
                var R,
                  M = this.tweens.length;
                for (R = M; R--; ) this.tweens[R].destroy();
                ((this.tweens = null), (this.current = null));
              }
            }));
        }),
        ie = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !V.transition,
          agentTests: [],
        });
      ((t.fallback = function (d) {
        if (!V.transition) return (ie.fallback = !0);
        ie.agentTests.push("(" + d + ")");
        var x = new RegExp(ie.agentTests.join("|"), "i");
        ie.fallback = x.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (d) {
          return new O(d);
        }),
        (t.delay = function (d, x, R) {
          return new $({ complete: x, duration: d, context: R });
        }),
        (e.fn.tram = function (d) {
          return t.call(null, this, d);
        }));
      var _ = e.style,
        B = e.css,
        J = { transform: V.transform && V.transform.css },
        Y = {
          color: [c, F],
          background: [c, F, "background-color"],
          "outline-color": [c, F],
          "border-color": [c, F],
          "border-top-color": [c, F],
          "border-right-color": [c, F],
          "border-bottom-color": [c, F],
          "border-left-color": [c, F],
          "border-width": [v, k],
          "border-top-width": [v, k],
          "border-right-width": [v, k],
          "border-bottom-width": [v, k],
          "border-left-width": [v, k],
          "border-spacing": [v, k],
          "letter-spacing": [v, k],
          margin: [v, k],
          "margin-top": [v, k],
          "margin-right": [v, k],
          "margin-bottom": [v, k],
          "margin-left": [v, k],
          padding: [v, k],
          "padding-top": [v, k],
          "padding-right": [v, k],
          "padding-bottom": [v, k],
          "padding-left": [v, k],
          "outline-width": [v, k],
          opacity: [v, L],
          top: [v, q],
          right: [v, q],
          bottom: [v, q],
          left: [v, q],
          "font-size": [v, q],
          "text-indent": [v, q],
          "word-spacing": [v, q],
          width: [v, q],
          "min-width": [v, q],
          "max-width": [v, q],
          height: [v, q],
          "min-height": [v, q],
          "max-height": [v, q],
          "line-height": [v, K],
          "scroll-top": [D, L, "scrollTop"],
          "scroll-left": [D, L, "scrollLeft"],
        },
        le = {};
      (V.transform &&
        ((Y.transform = [U]),
        (le = {
          x: [q, "translateX"],
          y: [q, "translateY"],
          rotate: [j],
          rotateX: [j],
          rotateY: [j],
          scale: [L],
          scaleX: [L],
          scaleY: [L],
          skew: [j],
          skewX: [j],
          skewY: [j],
        })),
        V.transform &&
          V.backface &&
          ((le.z = [q, "translateZ"]),
          (le.rotateZ = [j]),
          (le.scaleZ = [L]),
          (le.perspective = [k])));
      var Ie = /ms/,
        Ae = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var ba = g(($F, _a) => {
    "use strict";
    var lm = window.$,
      fm = Zn() && lm.tram;
    _a.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        a = r.slice,
        u = r.concat,
        s = n.toString,
        l = n.hasOwnProperty,
        b = r.forEach,
        f = r.map,
        E = r.reduce,
        m = r.reduceRight,
        y = r.filter,
        T = r.every,
        A = r.some,
        w = r.indexOf,
        N = r.lastIndexOf,
        L = Array.isArray,
        F = Object.keys,
        k = i.bind,
        q =
          (e.each =
          e.forEach =
            function (I, P, G) {
              if (I == null) return I;
              if (b && I.forEach === b) I.forEach(P, G);
              else if (I.length === +I.length) {
                for (var V = 0, ee = I.length; V < ee; V++)
                  if (P.call(G, I[V], V, I) === t) return;
              } else
                for (var re = e.keys(I), V = 0, ee = re.length; V < ee; V++)
                  if (P.call(G, I[re[V]], re[V], I) === t) return;
              return I;
            });
      ((e.map = e.collect =
        function (I, P, G) {
          var V = [];
          return I == null
            ? V
            : f && I.map === f
              ? I.map(P, G)
              : (q(I, function (ee, re, W) {
                  V.push(P.call(G, ee, re, W));
                }),
                V);
        }),
        (e.find = e.detect =
          function (I, P, G) {
            var V;
            return (
              j(I, function (ee, re, W) {
                if (P.call(G, ee, re, W)) return ((V = ee), !0);
              }),
              V
            );
          }),
        (e.filter = e.select =
          function (I, P, G) {
            var V = [];
            return I == null
              ? V
              : y && I.filter === y
                ? I.filter(P, G)
                : (q(I, function (ee, re, W) {
                    P.call(G, ee, re, W) && V.push(ee);
                  }),
                  V);
          }));
      var j =
        (e.some =
        e.any =
          function (I, P, G) {
            P || (P = e.identity);
            var V = !1;
            return I == null
              ? V
              : A && I.some === A
                ? I.some(P, G)
                : (q(I, function (ee, re, W) {
                    if (V || (V = P.call(G, ee, re, W))) return t;
                  }),
                  !!V);
          });
      ((e.contains = e.include =
        function (I, P) {
          return I == null
            ? !1
            : w && I.indexOf === w
              ? I.indexOf(P) != -1
              : j(I, function (G) {
                  return G === P;
                });
        }),
        (e.delay = function (I, P) {
          var G = a.call(arguments, 2);
          return setTimeout(function () {
            return I.apply(null, G);
          }, P);
        }),
        (e.defer = function (I) {
          return e.delay.apply(e, [I, 1].concat(a.call(arguments, 1)));
        }),
        (e.throttle = function (I) {
          var P, G, V;
          return function () {
            P ||
              ((P = !0),
              (G = arguments),
              (V = this),
              fm.frame(function () {
                ((P = !1), I.apply(V, G));
              }));
          };
        }),
        (e.debounce = function (I, P, G) {
          var V,
            ee,
            re,
            W,
            H,
            h = function () {
              var p = e.now() - W;
              p < P
                ? (V = setTimeout(h, P - p))
                : ((V = null), G || ((H = I.apply(re, ee)), (re = ee = null)));
            };
          return function () {
            ((re = this), (ee = arguments), (W = e.now()));
            var p = G && !V;
            return (
              V || (V = setTimeout(h, P)),
              p && ((H = I.apply(re, ee)), (re = ee = null)),
              H
            );
          };
        }),
        (e.defaults = function (I) {
          if (!e.isObject(I)) return I;
          for (var P = 1, G = arguments.length; P < G; P++) {
            var V = arguments[P];
            for (var ee in V) I[ee] === void 0 && (I[ee] = V[ee]);
          }
          return I;
        }),
        (e.keys = function (I) {
          if (!e.isObject(I)) return [];
          if (F) return F(I);
          var P = [];
          for (var G in I) e.has(I, G) && P.push(G);
          return P;
        }),
        (e.has = function (I, P) {
          return l.call(I, P);
        }),
        (e.isObject = function (I) {
          return I === Object(I);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }));
      var K = /(.)^/,
        Q = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        te = /\\|'|\r|\n|\u2028|\u2029/g,
        z = function (I) {
          return "\\" + Q[I];
        },
        C = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (I, P, G) {
          (!P && G && (P = G), (P = e.defaults({}, P, e.templateSettings)));
          var V = RegExp(
              [
                (P.escape || K).source,
                (P.interpolate || K).source,
                (P.evaluate || K).source,
              ].join("|") + "|$",
              "g",
            ),
            ee = 0,
            re = "__p+='";
          (I.replace(V, function (p, v, c, D, U) {
            return (
              (re += I.slice(ee, U).replace(te, z)),
              (ee = U + p.length),
              v
                ? (re +=
                    `'+
((__t=(` +
                    v +
                    `))==null?'':_.escape(__t))+
'`)
                : c
                  ? (re +=
                      `'+
((__t=(` +
                      c +
                      `))==null?'':__t)+
'`)
                  : D &&
                    (re +=
                      `';
` +
                      D +
                      `
__p+='`),
              p
            );
          }),
            (re += `';
`));
          var W = P.variable;
          if (W) {
            if (!C.test(W))
              throw new Error("variable is not a bare identifier: " + W);
          } else
            ((re =
              `with(obj||{}){
` +
              re +
              `}
`),
              (W = "obj"));
          re =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            re +
            `return __p;
`;
          var H;
          try {
            H = new Function(P.variable || "obj", "_", re);
          } catch (p) {
            throw ((p.source = re), p);
          }
          var h = function (p) {
            return H.call(this, p, e);
          };
          return (
            (h.source =
              "function(" +
              W +
              `){
` +
              re +
              "}"),
            h
          );
        }),
        e
      );
    })();
  });
  var Oe = g((ZF, Ra) => {
    "use strict";
    var ge = {},
      St = {},
      Rt = [],
      ei = window.Webflow || [],
      lt = window.jQuery,
      Ve = lt(window),
      dm = lt(document),
      $e = lt.isFunction,
      We = (ge._ = ba()),
      Ta = (ge.tram = Zn() && lt.tram),
      kr = !1,
      ti = !1;
    Ta.config.hideBackface = !1;
    Ta.config.keepInherited = !0;
    ge.define = function (e, t, r) {
      St[e] && xa(St[e]);
      var n = (St[e] = t(lt, We, r) || {});
      return (wa(n), n);
    };
    ge.require = function (e) {
      return St[e];
    };
    function wa(e) {
      (ge.env() &&
        ($e(e.design) && Ve.on("__wf_design", e.design),
        $e(e.preview) && Ve.on("__wf_preview", e.preview)),
        $e(e.destroy) && Ve.on("__wf_destroy", e.destroy),
        e.ready && $e(e.ready) && pm(e));
    }
    function pm(e) {
      if (kr) {
        e.ready();
        return;
      }
      We.contains(Rt, e.ready) || Rt.push(e.ready);
    }
    function xa(e) {
      ($e(e.design) && Ve.off("__wf_design", e.design),
        $e(e.preview) && Ve.off("__wf_preview", e.preview),
        $e(e.destroy) && Ve.off("__wf_destroy", e.destroy),
        e.ready && $e(e.ready) && gm(e));
    }
    function gm(e) {
      Rt = We.filter(Rt, function (t) {
        return t !== e.ready;
      });
    }
    ge.push = function (e) {
      if (kr) {
        $e(e) && e();
        return;
      }
      ei.push(e);
    };
    ge.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var qr = navigator.userAgent.toLowerCase(),
      Aa = (ge.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      hm = (ge.env.chrome =
        /chrome/.test(qr) &&
        /Google/.test(navigator.vendor) &&
        parseInt(qr.match(/chrome\/(\d+)\./)[1], 10)),
      vm = (ge.env.ios = /(ipod|iphone|ipad)/.test(qr));
    ge.env.safari = /safari/.test(qr) && !hm && !vm;
    var Jn;
    Aa &&
      dm.on("touchstart mousedown", function (e) {
        Jn = e.target;
      });
    ge.validClick = Aa
      ? function (e) {
          return e === Jn || lt.contains(e, Jn);
        }
      : function () {
          return !0;
        };
    var Oa = "resize.webflow orientationchange.webflow load.webflow",
      mm = "scroll.webflow " + Oa;
    ge.resize = ri(Ve, Oa);
    ge.scroll = ri(Ve, mm);
    ge.redraw = ri();
    function ri(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = We.throttle(function (i) {
          We.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (We.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = We.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    ge.location = function (e) {
      window.location = e;
    };
    ge.env() && (ge.location = function () {});
    ge.ready = function () {
      ((kr = !0), ti ? Em() : We.each(Rt, Ia), We.each(ei, Ia), ge.resize.up());
    };
    function Ia(e) {
      $e(e) && e();
    }
    function Em() {
      ((ti = !1), We.each(St, wa));
    }
    var yt;
    ge.load = function (e) {
      yt.then(e);
    };
    function Sa() {
      (yt && (yt.reject(), Ve.off("load", yt.resolve)),
        (yt = new lt.Deferred()),
        Ve.on("load", yt.resolve));
    }
    ge.destroy = function (e) {
      ((e = e || {}),
        (ti = !0),
        Ve.triggerHandler("__wf_destroy"),
        e.domready != null && (kr = e.domready),
        We.each(St, xa),
        ge.resize.off(),
        ge.scroll.off(),
        ge.redraw.off(),
        (Rt = []),
        (ei = []),
        yt.state() === "pending" && Sa());
    };
    lt(ge.ready);
    Sa();
    Ra.exports = window.Webflow = ge;
  });
  var Pa = g((JF, La) => {
    "use strict";
    var Ca = Oe();
    Ca.define(
      "brand",
      (La.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          a = window.location,
          u = /PhantomJS/i.test(navigator.userAgent),
          s =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          l;
        t.ready = function () {
          var m = n.attr("data-wf-status"),
            y = n.attr("data-wf-domain") || "";
          (/\.webflow\.io$/i.test(y) && a.hostname !== y && (m = !0),
            m &&
              !u &&
              ((l = l || f()),
              E(),
              setTimeout(E, 500),
              e(r).off(s, b).on(s, b)));
        };
        function b() {
          var m =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(l).attr("style", m ? "display: none !important;" : "");
        }
        function f() {
          var m = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs",
            ),
            y = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg",
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            T = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg",
              )
              .attr("alt", "Made in Webflow");
          return (m.append(y, T), m[0]);
        }
        function E() {
          var m = i.children(o),
            y = m.length && m.get(0) === l,
            T = Ca.env("editor");
          if (y) {
            T && m.remove();
            return;
          }
          (m.length && m.remove(), T || i.append(l));
        }
        return t;
      }),
    );
  });
  var Da = g((e1, Na) => {
    "use strict";
    var ni = Oe();
    ni.define(
      "edit",
      (Na.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (ni.env("test") || ni.env("frame")) && !r.fixture && !ym())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          a = document.location,
          u = "hashchange",
          s,
          l = r.load || E,
          b = !1;
        try {
          b =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        b
          ? l()
          : a.search
            ? (/[?&](edit)(?:[=&?]|$)/.test(a.search) ||
                /\?edit$/.test(a.href)) &&
              l()
            : i.on(u, f).triggerHandler(u);
        function f() {
          s || (/\?edit/.test(a.hash) && l());
        }
        function E() {
          ((s = !0),
            (window.WebflowEditor = !0),
            i.off(u, f),
            N(function (F) {
              e.ajax({
                url: w("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: m(F),
              });
            }));
        }
        function m(F) {
          return function (k) {
            if (!k) {
              console.error("Could not load editor data");
              return;
            }
            ((k.thirdPartyCookiesSupported = F),
              y(A(k.scriptPath), function () {
                window.WebflowEditor(k);
              }));
          };
        }
        function y(F, k) {
          e.ajax({ type: "GET", url: F, dataType: "script", cache: !0 }).then(
            k,
            T,
          );
        }
        function T(F, k, q) {
          throw (console.error("Could not load editor script: " + k), q);
        }
        function A(F) {
          return F.indexOf("//") >= 0
            ? F
            : w("https://editor-api.webflow.com" + F);
        }
        function w(F) {
          return F.replace(/([^:])\/\//g, "$1/");
        }
        function N(F) {
          var k = window.document.createElement("iframe");
          ((k.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (k.style.display = "none"),
            (k.sandbox = "allow-scripts allow-same-origin"));
          var q = function (j) {
            j.data === "WF_third_party_cookies_unsupported"
              ? (L(k, q), F(!1))
              : j.data === "WF_third_party_cookies_supported" &&
                (L(k, q), F(!0));
          };
          ((k.onerror = function () {
            (L(k, q), F(!1));
          }),
            window.addEventListener("message", q, !1),
            window.document.body.appendChild(k));
        }
        function L(F, k) {
          (window.removeEventListener("message", k, !1), F.remove());
        }
        return n;
      }),
    );
    function ym() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Fa = g((t1, Ma) => {
    "use strict";
    var _m = Oe();
    _m.define(
      "focus-visible",
      (Ma.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            a = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function u(L) {
            return !!(
              L &&
              L !== document &&
              L.nodeName !== "HTML" &&
              L.nodeName !== "BODY" &&
              "classList" in L &&
              "contains" in L.classList
            );
          }
          function s(L) {
            var F = L.type,
              k = L.tagName;
            return !!(
              (k === "INPUT" && a[F] && !L.readOnly) ||
              (k === "TEXTAREA" && !L.readOnly) ||
              L.isContentEditable
            );
          }
          function l(L) {
            L.getAttribute("data-wf-focus-visible") ||
              L.setAttribute("data-wf-focus-visible", "true");
          }
          function b(L) {
            L.getAttribute("data-wf-focus-visible") &&
              L.removeAttribute("data-wf-focus-visible");
          }
          function f(L) {
            L.metaKey ||
              L.altKey ||
              L.ctrlKey ||
              (u(r.activeElement) && l(r.activeElement), (n = !0));
          }
          function E() {
            n = !1;
          }
          function m(L) {
            u(L.target) && (n || s(L.target)) && l(L.target);
          }
          function y(L) {
            u(L.target) &&
              L.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              b(L.target));
          }
          function T() {
            document.visibilityState === "hidden" && (i && (n = !0), A());
          }
          function A() {
            (document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N));
          }
          function w() {
            (document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N));
          }
          function N(L) {
            (L.target.nodeName && L.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), w());
          }
          (document.addEventListener("keydown", f, !0),
            document.addEventListener("mousedown", E, !0),
            document.addEventListener("pointerdown", E, !0),
            document.addEventListener("touchstart", E, !0),
            document.addEventListener("visibilitychange", T, !0),
            A(),
            r.addEventListener("focus", m, !0),
            r.addEventListener("blur", y, !0));
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      }),
    );
  });
  var Xa = g((r1, ka) => {
    "use strict";
    var qa = Oe();
    qa.define(
      "focus",
      (ka.exports = function () {
        var e = [],
          t = !1;
        function r(a) {
          t &&
            (a.preventDefault(),
            a.stopPropagation(),
            a.stopImmediatePropagation(),
            e.unshift(a));
        }
        function n(a) {
          var u = a.target,
            s = u.tagName;
          return (
            (/^a$/i.test(s) && u.href != null) ||
            (/^(button|textarea)$/i.test(s) && u.disabled !== !0) ||
            (/^input$/i.test(s) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(u.type) &&
              !u.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(s) &&
              !Number.isNaN(Number.parseFloat(u.tabIndex))) ||
            /^audio$/i.test(s) ||
            (/^video$/i.test(s) && u.controls === !0)
          );
        }
        function i(a) {
          n(a) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, a.target.focus(); e.length > 0; ) {
                var u = e.pop();
                u.target.dispatchEvent(new MouseEvent(u.type, u));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            qa.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      }),
    );
  });
  var Wa = g((n1, Ua) => {
    "use strict";
    var ii = window.jQuery,
      Ze = {},
      Xr = [],
      Ga = ".w-ix",
      Gr = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ii(t).triggerHandler(Ze.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ii(t).triggerHandler(Ze.types.OUTRO));
        },
      };
    Ze.triggers = {};
    Ze.types = { INTRO: "w-ix-intro" + Ga, OUTRO: "w-ix-outro" + Ga };
    Ze.init = function () {
      for (var e = Xr.length, t = 0; t < e; t++) {
        var r = Xr[t];
        r[0](0, r[1]);
      }
      ((Xr = []), ii.extend(Ze.triggers, Gr));
    };
    Ze.async = function () {
      for (var e in Gr) {
        var t = Gr[e];
        Gr.hasOwnProperty(e) &&
          (Ze.triggers[e] = function (r, n) {
            Xr.push([t, n]);
          });
      }
    };
    Ze.async();
    Ua.exports = Ze;
  });
  var Ct = g((i1, Ba) => {
    "use strict";
    var oi = Wa();
    function Va(e, t) {
      var r = document.createEvent("CustomEvent");
      (r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r));
    }
    var bm = window.jQuery,
      Ur = {},
      Ha = ".w-ix",
      Im = {
        reset: function (e, t) {
          oi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          (oi.triggers.intro(e, t), Va(t, "COMPONENT_ACTIVE"));
        },
        outro: function (e, t) {
          (oi.triggers.outro(e, t), Va(t, "COMPONENT_INACTIVE"));
        },
      };
    Ur.triggers = {};
    Ur.types = { INTRO: "w-ix-intro" + Ha, OUTRO: "w-ix-outro" + Ha };
    bm.extend(Ur.triggers, Im);
    Ba.exports = Ur;
  });
  var ai = g((o1, za) => {
    var Tm =
      typeof global == "object" && global && global.Object === Object && global;
    za.exports = Tm;
  });
  var He = g((a1, Ka) => {
    var wm = ai(),
      xm = typeof self == "object" && self && self.Object === Object && self,
      Am = wm || xm || Function("return this")();
    Ka.exports = Am;
  });
  var Lt = g((s1, ja) => {
    var Om = He(),
      Sm = Om.Symbol;
    ja.exports = Sm;
  });
  var Za = g((u1, $a) => {
    var Ya = Lt(),
      Qa = Object.prototype,
      Rm = Qa.hasOwnProperty,
      Cm = Qa.toString,
      or = Ya ? Ya.toStringTag : void 0;
    function Lm(e) {
      var t = Rm.call(e, or),
        r = e[or];
      try {
        e[or] = void 0;
        var n = !0;
      } catch {}
      var i = Cm.call(e);
      return (n && (t ? (e[or] = r) : delete e[or]), i);
    }
    $a.exports = Lm;
  });
  var es = g((c1, Ja) => {
    var Pm = Object.prototype,
      Nm = Pm.toString;
    function Dm(e) {
      return Nm.call(e);
    }
    Ja.exports = Dm;
  });
  var ft = g((l1, ns) => {
    var ts = Lt(),
      Mm = Za(),
      Fm = es(),
      qm = "[object Null]",
      km = "[object Undefined]",
      rs = ts ? ts.toStringTag : void 0;
    function Xm(e) {
      return e == null
        ? e === void 0
          ? km
          : qm
        : rs && rs in Object(e)
          ? Mm(e)
          : Fm(e);
    }
    ns.exports = Xm;
  });
  var si = g((f1, is) => {
    function Gm(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    is.exports = Gm;
  });
  var ui = g((d1, os) => {
    var Um = si(),
      Wm = Um(Object.getPrototypeOf, Object);
    os.exports = Wm;
  });
  var ot = g((p1, as) => {
    function Vm(e) {
      return e != null && typeof e == "object";
    }
    as.exports = Vm;
  });
  var ci = g((g1, us) => {
    var Hm = ft(),
      Bm = ui(),
      zm = ot(),
      Km = "[object Object]",
      jm = Function.prototype,
      Ym = Object.prototype,
      ss = jm.toString,
      Qm = Ym.hasOwnProperty,
      $m = ss.call(Object);
    function Zm(e) {
      if (!zm(e) || Hm(e) != Km) return !1;
      var t = Bm(e);
      if (t === null) return !0;
      var r = Qm.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && ss.call(r) == $m;
    }
    us.exports = Zm;
  });
  var cs = g((li) => {
    "use strict";
    Object.defineProperty(li, "__esModule", { value: !0 });
    li.default = Jm;
    function Jm(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var ls = g((di, fi) => {
    "use strict";
    Object.defineProperty(di, "__esModule", { value: !0 });
    var eE = cs(),
      tE = rE(eE);
    function rE(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Pt;
    typeof self < "u"
      ? (Pt = self)
      : typeof window < "u"
        ? (Pt = window)
        : typeof global < "u"
          ? (Pt = global)
          : typeof fi < "u"
            ? (Pt = fi)
            : (Pt = Function("return this")());
    var nE = (0, tE.default)(Pt);
    di.default = nE;
  });
  var pi = g((ar) => {
    "use strict";
    ar.__esModule = !0;
    ar.ActionTypes = void 0;
    ar.default = gs;
    var iE = ci(),
      oE = ps(iE),
      aE = ls(),
      fs = ps(aE);
    function ps(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ds = (ar.ActionTypes = { INIT: "@@redux/INIT" });
    function gs(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(gs)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        a = [],
        u = a,
        s = !1;
      function l() {
        u === a && (u = a.slice());
      }
      function b() {
        return o;
      }
      function f(T) {
        if (typeof T != "function")
          throw new Error("Expected listener to be a function.");
        var A = !0;
        return (
          l(),
          u.push(T),
          function () {
            if (A) {
              ((A = !1), l());
              var N = u.indexOf(T);
              u.splice(N, 1);
            }
          }
        );
      }
      function E(T) {
        if (!(0, oE.default)(T))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions.",
          );
        if (typeof T.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?',
          );
        if (s) throw new Error("Reducers may not dispatch actions.");
        try {
          ((s = !0), (o = i(o, T)));
        } finally {
          s = !1;
        }
        for (var A = (a = u), w = 0; w < A.length; w++) A[w]();
        return T;
      }
      function m(T) {
        if (typeof T != "function")
          throw new Error("Expected the nextReducer to be a function.");
        ((i = T), E({ type: ds.INIT }));
      }
      function y() {
        var T,
          A = f;
        return (
          (T = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function L() {
                N.next && N.next(b());
              }
              L();
              var F = A(L);
              return { unsubscribe: F };
            },
          }),
          (T[fs.default] = function () {
            return this;
          }),
          T
        );
      }
      return (
        E({ type: ds.INIT }),
        (n = { dispatch: E, subscribe: f, getState: b, replaceReducer: m }),
        (n[fs.default] = y),
        n
      );
    }
  });
  var hi = g((gi) => {
    "use strict";
    gi.__esModule = !0;
    gi.default = sE;
    function sE(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var ms = g((vi) => {
    "use strict";
    vi.__esModule = !0;
    vi.default = dE;
    var hs = pi(),
      uE = ci(),
      E1 = vs(uE),
      cE = hi(),
      y1 = vs(cE);
    function vs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function lE(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function fE(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: hs.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.',
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                hs.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.",
          );
      });
    }
    function dE(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var a;
      var u;
      try {
        fE(r);
      } catch (s) {
        u = s;
      }
      return function () {
        var l =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          b = arguments[1];
        if (u) throw u;
        if (!1) var f;
        for (var E = !1, m = {}, y = 0; y < o.length; y++) {
          var T = o[y],
            A = r[T],
            w = l[T],
            N = A(w, b);
          if (typeof N > "u") {
            var L = lE(T, b);
            throw new Error(L);
          }
          ((m[T] = N), (E = E || N !== w));
        }
        return E ? m : l;
      };
    }
  });
  var ys = g((mi) => {
    "use strict";
    mi.__esModule = !0;
    mi.default = pE;
    function Es(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function pE(e, t) {
      if (typeof e == "function") return Es(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?',
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          a = e[o];
        typeof a == "function" && (n[o] = Es(a, t));
      }
      return n;
    }
  });
  var yi = g((Ei) => {
    "use strict";
    Ei.__esModule = !0;
    Ei.default = gE;
    function gE() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(
          function (o, a) {
            return a(o);
          },
          n.apply(void 0, arguments),
        );
      };
    }
  });
  var _s = g((_i) => {
    "use strict";
    _i.__esModule = !0;
    var hE =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    _i.default = yE;
    var vE = yi(),
      mE = EE(vE);
    function EE(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function yE() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, a) {
          var u = n(i, o, a),
            s = u.dispatch,
            l = [],
            b = {
              getState: u.getState,
              dispatch: function (E) {
                return s(E);
              },
            };
          return (
            (l = t.map(function (f) {
              return f(b);
            })),
            (s = mE.default.apply(void 0, l)(u.dispatch)),
            hE({}, u, { dispatch: s })
          );
        };
      };
    }
  });
  var bi = g((Xe) => {
    "use strict";
    Xe.__esModule = !0;
    Xe.compose =
      Xe.applyMiddleware =
      Xe.bindActionCreators =
      Xe.combineReducers =
      Xe.createStore =
        void 0;
    var _E = pi(),
      bE = Nt(_E),
      IE = ms(),
      TE = Nt(IE),
      wE = ys(),
      xE = Nt(wE),
      AE = _s(),
      OE = Nt(AE),
      SE = yi(),
      RE = Nt(SE),
      CE = hi(),
      w1 = Nt(CE);
    function Nt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Xe.createStore = bE.default;
    Xe.combineReducers = TE.default;
    Xe.bindActionCreators = xE.default;
    Xe.applyMiddleware = OE.default;
    Xe.compose = RE.default;
  });
  var Be,
    Ii,
    Je,
    LE,
    PE,
    Wr,
    NE,
    Ti = me(() => {
      "use strict";
      ((Be = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Ii = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (Je = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (LE = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (PE = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Wr = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (NE = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        }));
    });
  var Me,
    DE,
    Vr = me(() => {
      "use strict";
      ((Me = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (DE = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        }));
    });
  var ME,
    bs = me(() => {
      "use strict";
      ME = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var FE,
    qE,
    kE,
    XE,
    GE,
    UE,
    WE,
    wi,
    Is = me(() => {
      "use strict";
      Vr();
      (({
        TRANSFORM_MOVE: FE,
        TRANSFORM_SCALE: qE,
        TRANSFORM_ROTATE: kE,
        TRANSFORM_SKEW: XE,
        STYLE_SIZE: GE,
        STYLE_FILTER: UE,
        STYLE_FONT_VARIATION: WE,
      } = Me),
        (wi = {
          [FE]: !0,
          [qE]: !0,
          [kE]: !0,
          [XE]: !0,
          [GE]: !0,
          [UE]: !0,
          [WE]: !0,
        }));
    });
  var Te = {};
  De(Te, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => oy,
    IX2_ANIMATION_FRAME_CHANGED: () => JE,
    IX2_CLEAR_REQUESTED: () => QE,
    IX2_ELEMENT_STATE_CHANGED: () => iy,
    IX2_EVENT_LISTENER_ADDED: () => $E,
    IX2_EVENT_STATE_CHANGED: () => ZE,
    IX2_INSTANCE_ADDED: () => ty,
    IX2_INSTANCE_REMOVED: () => ny,
    IX2_INSTANCE_STARTED: () => ry,
    IX2_MEDIA_QUERIES_DEFINED: () => sy,
    IX2_PARAMETER_CHANGED: () => ey,
    IX2_PLAYBACK_REQUESTED: () => jE,
    IX2_PREVIEW_REQUESTED: () => KE,
    IX2_RAW_DATA_IMPORTED: () => VE,
    IX2_SESSION_INITIALIZED: () => HE,
    IX2_SESSION_STARTED: () => BE,
    IX2_SESSION_STOPPED: () => zE,
    IX2_STOP_REQUESTED: () => YE,
    IX2_TEST_FRAME_RENDERED: () => uy,
    IX2_VIEWPORT_WIDTH_CHANGED: () => ay,
  });
  var VE,
    HE,
    BE,
    zE,
    KE,
    jE,
    YE,
    QE,
    $E,
    ZE,
    JE,
    ey,
    ty,
    ry,
    ny,
    iy,
    oy,
    ay,
    sy,
    uy,
    Ts = me(() => {
      "use strict";
      ((VE = "IX2_RAW_DATA_IMPORTED"),
        (HE = "IX2_SESSION_INITIALIZED"),
        (BE = "IX2_SESSION_STARTED"),
        (zE = "IX2_SESSION_STOPPED"),
        (KE = "IX2_PREVIEW_REQUESTED"),
        (jE = "IX2_PLAYBACK_REQUESTED"),
        (YE = "IX2_STOP_REQUESTED"),
        (QE = "IX2_CLEAR_REQUESTED"),
        ($E = "IX2_EVENT_LISTENER_ADDED"),
        (ZE = "IX2_EVENT_STATE_CHANGED"),
        (JE = "IX2_ANIMATION_FRAME_CHANGED"),
        (ey = "IX2_PARAMETER_CHANGED"),
        (ty = "IX2_INSTANCE_ADDED"),
        (ry = "IX2_INSTANCE_STARTED"),
        (ny = "IX2_INSTANCE_REMOVED"),
        (iy = "IX2_ELEMENT_STATE_CHANGED"),
        (oy = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (ay = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (sy = "IX2_MEDIA_QUERIES_DEFINED"),
        (uy = "IX2_TEST_FRAME_RENDERED"));
    });
  var Se = {};
  De(Se, {
    ABSTRACT_NODE: () => a_,
    AUTO: () => Yy,
    BACKGROUND: () => Vy,
    BACKGROUND_COLOR: () => Wy,
    BAR_DELIMITER: () => Zy,
    BORDER_COLOR: () => Hy,
    BOUNDARY_SELECTOR: () => py,
    CHILDREN: () => Jy,
    COLON_DELIMITER: () => $y,
    COLOR: () => By,
    COMMA_DELIMITER: () => Qy,
    CONFIG_UNIT: () => by,
    CONFIG_VALUE: () => my,
    CONFIG_X_UNIT: () => Ey,
    CONFIG_X_VALUE: () => gy,
    CONFIG_Y_UNIT: () => yy,
    CONFIG_Y_VALUE: () => hy,
    CONFIG_Z_UNIT: () => _y,
    CONFIG_Z_VALUE: () => vy,
    DISPLAY: () => zy,
    FILTER: () => ky,
    FLEX: () => Ky,
    FONT_VARIATION_SETTINGS: () => Xy,
    HEIGHT: () => Uy,
    HTML_ELEMENT: () => i_,
    IMMEDIATE_CHILDREN: () => e_,
    IX2_ID_DELIMITER: () => cy,
    OPACITY: () => qy,
    PARENT: () => r_,
    PLAIN_OBJECT: () => o_,
    PRESERVE_3D: () => n_,
    RENDER_GENERAL: () => u_,
    RENDER_PLUGIN: () => l_,
    RENDER_STYLE: () => c_,
    RENDER_TRANSFORM: () => s_,
    ROTATE_X: () => Ly,
    ROTATE_Y: () => Py,
    ROTATE_Z: () => Ny,
    SCALE_3D: () => Cy,
    SCALE_X: () => Oy,
    SCALE_Y: () => Sy,
    SCALE_Z: () => Ry,
    SIBLINGS: () => t_,
    SKEW: () => Dy,
    SKEW_X: () => My,
    SKEW_Y: () => Fy,
    TRANSFORM: () => Iy,
    TRANSLATE_3D: () => Ay,
    TRANSLATE_X: () => Ty,
    TRANSLATE_Y: () => wy,
    TRANSLATE_Z: () => xy,
    WF_PAGE: () => ly,
    WIDTH: () => Gy,
    WILL_CHANGE: () => jy,
    W_MOD_IX: () => dy,
    W_MOD_JS: () => fy,
  });
  var cy,
    ly,
    fy,
    dy,
    py,
    gy,
    hy,
    vy,
    my,
    Ey,
    yy,
    _y,
    by,
    Iy,
    Ty,
    wy,
    xy,
    Ay,
    Oy,
    Sy,
    Ry,
    Cy,
    Ly,
    Py,
    Ny,
    Dy,
    My,
    Fy,
    qy,
    ky,
    Xy,
    Gy,
    Uy,
    Wy,
    Vy,
    Hy,
    By,
    zy,
    Ky,
    jy,
    Yy,
    Qy,
    $y,
    Zy,
    Jy,
    e_,
    t_,
    r_,
    n_,
    i_,
    o_,
    a_,
    s_,
    u_,
    c_,
    l_,
    ws = me(() => {
      "use strict";
      ((cy = "|"),
        (ly = "data-wf-page"),
        (fy = "w-mod-js"),
        (dy = "w-mod-ix"),
        (py = ".w-dyn-item"),
        (gy = "xValue"),
        (hy = "yValue"),
        (vy = "zValue"),
        (my = "value"),
        (Ey = "xUnit"),
        (yy = "yUnit"),
        (_y = "zUnit"),
        (by = "unit"),
        (Iy = "transform"),
        (Ty = "translateX"),
        (wy = "translateY"),
        (xy = "translateZ"),
        (Ay = "translate3d"),
        (Oy = "scaleX"),
        (Sy = "scaleY"),
        (Ry = "scaleZ"),
        (Cy = "scale3d"),
        (Ly = "rotateX"),
        (Py = "rotateY"),
        (Ny = "rotateZ"),
        (Dy = "skew"),
        (My = "skewX"),
        (Fy = "skewY"),
        (qy = "opacity"),
        (ky = "filter"),
        (Xy = "font-variation-settings"),
        (Gy = "width"),
        (Uy = "height"),
        (Wy = "backgroundColor"),
        (Vy = "background"),
        (Hy = "borderColor"),
        (By = "color"),
        (zy = "display"),
        (Ky = "flex"),
        (jy = "willChange"),
        (Yy = "AUTO"),
        (Qy = ","),
        ($y = ":"),
        (Zy = "|"),
        (Jy = "CHILDREN"),
        (e_ = "IMMEDIATE_CHILDREN"),
        (t_ = "SIBLINGS"),
        (r_ = "PARENT"),
        (n_ = "preserve-3d"),
        (i_ = "HTML_ELEMENT"),
        (o_ = "PLAIN_OBJECT"),
        (a_ = "ABSTRACT_NODE"),
        (s_ = "RENDER_TRANSFORM"),
        (u_ = "RENDER_GENERAL"),
        (c_ = "RENDER_STYLE"),
        (l_ = "RENDER_PLUGIN"));
    });
  var xs = {};
  De(xs, {
    ActionAppliesTo: () => DE,
    ActionTypeConsts: () => Me,
    EventAppliesTo: () => Ii,
    EventBasedOn: () => Je,
    EventContinuousMouseAxes: () => LE,
    EventLimitAffectedElements: () => PE,
    EventTypeConsts: () => Be,
    IX2EngineActionTypes: () => Te,
    IX2EngineConstants: () => Se,
    InteractionTypeConsts: () => ME,
    QuickEffectDirectionConsts: () => NE,
    QuickEffectIds: () => Wr,
    ReducedMotionTypes: () => wi,
  });
  var Fe = me(() => {
    "use strict";
    Ti();
    Vr();
    bs();
    Is();
    Ts();
    ws();
    Vr();
    Ti();
  });
  var f_,
    As,
    Os = me(() => {
      "use strict";
      Fe();
      (({ IX2_RAW_DATA_IMPORTED: f_ } = Te),
        (As = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case f_:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        }));
    });
  var Dt = g((ye) => {
    "use strict";
    Object.defineProperty(ye, "__esModule", { value: !0 });
    var d_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    ye.clone = Br;
    ye.addLast = Cs;
    ye.addFirst = Ls;
    ye.removeLast = Ps;
    ye.removeFirst = Ns;
    ye.insert = Ds;
    ye.removeAt = Ms;
    ye.replaceAt = Fs;
    ye.getIn = zr;
    ye.set = Kr;
    ye.setIn = jr;
    ye.update = ks;
    ye.updateIn = Xs;
    ye.merge = Gs;
    ye.mergeDeep = Us;
    ye.mergeIn = Ws;
    ye.omit = Vs;
    ye.addDefaults = Hs;
    var Ss = "INVALID_ARGS";
    function Rs(e) {
      throw new Error(e);
    }
    function xi(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var p_ = {}.hasOwnProperty;
    function Br(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = xi(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function qe(e, t, r) {
      var n = r;
      n == null && Rs(Ss);
      for (
        var i = !1, o = arguments.length, a = Array(o > 3 ? o - 3 : 0), u = 3;
        u < o;
        u++
      )
        a[u - 3] = arguments[u];
      for (var s = 0; s < a.length; s++) {
        var l = a[s];
        if (l != null) {
          var b = xi(l);
          if (b.length)
            for (var f = 0; f <= b.length; f++) {
              var E = b[f];
              if (!(e && n[E] !== void 0)) {
                var m = l[E];
                (t && Hr(n[E]) && Hr(m) && (m = qe(e, t, n[E], m)),
                  !(m === void 0 || m === n[E]) &&
                    (i || ((i = !0), (n = Br(n))), (n[E] = m)));
              }
            }
        }
      }
      return n;
    }
    function Hr(e) {
      var t = typeof e > "u" ? "undefined" : d_(e);
      return e != null && (t === "object" || t === "function");
    }
    function Cs(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Ls(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Ps(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Ns(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ds(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Ms(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Fs(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return ((i[t] = r), i);
    }
    function zr(e, t) {
      if ((!Array.isArray(t) && Rs(Ss), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Kr(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Br(i);
      return ((o[t] = r), o);
    }
    function qs(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var a =
          Hr(e) && Hr(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = qs(a, t, r, n + 1);
      }
      return Kr(e, o, i);
    }
    function jr(e, t, r) {
      return t.length ? qs(e, t, r, 0) : r;
    }
    function ks(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Kr(e, t, i);
    }
    function Xs(e, t, r) {
      var n = zr(e, t),
        i = r(n);
      return jr(e, t, i);
    }
    function Gs(e, t, r, n, i, o) {
      for (
        var a = arguments.length, u = Array(a > 6 ? a - 6 : 0), s = 6;
        s < a;
        s++
      )
        u[s - 6] = arguments[s];
      return u.length
        ? qe.call.apply(qe, [null, !1, !1, e, t, r, n, i, o].concat(u))
        : qe(!1, !1, e, t, r, n, i, o);
    }
    function Us(e, t, r, n, i, o) {
      for (
        var a = arguments.length, u = Array(a > 6 ? a - 6 : 0), s = 6;
        s < a;
        s++
      )
        u[s - 6] = arguments[s];
      return u.length
        ? qe.call.apply(qe, [null, !1, !0, e, t, r, n, i, o].concat(u))
        : qe(!1, !0, e, t, r, n, i, o);
    }
    function Ws(e, t, r, n, i, o, a) {
      var u = zr(e, t);
      u == null && (u = {});
      for (
        var s = void 0,
          l = arguments.length,
          b = Array(l > 7 ? l - 7 : 0),
          f = 7;
        f < l;
        f++
      )
        b[f - 7] = arguments[f];
      return (
        b.length
          ? (s = qe.call.apply(qe, [null, !1, !1, u, r, n, i, o, a].concat(b)))
          : (s = qe(!1, !1, u, r, n, i, o, a)),
        jr(e, t, s)
      );
    }
    function Vs(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (p_.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, a = xi(e), u = 0; u < a.length; u++) {
        var s = a[u];
        r.indexOf(s) >= 0 || (o[s] = e[s]);
      }
      return o;
    }
    function Hs(e, t, r, n, i, o) {
      for (
        var a = arguments.length, u = Array(a > 6 ? a - 6 : 0), s = 6;
        s < a;
        s++
      )
        u[s - 6] = arguments[s];
      return u.length
        ? qe.call.apply(qe, [null, !0, !1, e, t, r, n, i, o].concat(u))
        : qe(!0, !1, e, t, r, n, i, o);
    }
    var g_ = {
      clone: Br,
      addLast: Cs,
      addFirst: Ls,
      removeLast: Ps,
      removeFirst: Ns,
      insert: Ds,
      removeAt: Ms,
      replaceAt: Fs,
      getIn: zr,
      set: Kr,
      setIn: jr,
      update: ks,
      updateIn: Xs,
      merge: Gs,
      mergeDeep: Us,
      mergeIn: Ws,
      omit: Vs,
      addDefaults: Hs,
    };
    ye.default = g_;
  });
  var zs,
    h_,
    v_,
    m_,
    E_,
    y_,
    Bs,
    Ks,
    js = me(() => {
      "use strict";
      Fe();
      ((zs = de(Dt())),
        ({
          IX2_PREVIEW_REQUESTED: h_,
          IX2_PLAYBACK_REQUESTED: v_,
          IX2_STOP_REQUESTED: m_,
          IX2_CLEAR_REQUESTED: E_,
        } = Te),
        (y_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Bs = Object.create(null, {
          [h_]: { value: "preview" },
          [v_]: { value: "playback" },
          [m_]: { value: "stop" },
          [E_]: { value: "clear" },
        })),
        (Ks = (e = y_, t) => {
          if (t.type in Bs) {
            let r = [Bs[t.type]];
            return (0, zs.setIn)(e, [r], { ...t.payload });
          }
          return e;
        }));
    });
  var Le,
    __,
    b_,
    I_,
    T_,
    w_,
    x_,
    A_,
    O_,
    S_,
    R_,
    Ys,
    C_,
    Qs,
    $s = me(() => {
      "use strict";
      Fe();
      ((Le = de(Dt())),
        ({
          IX2_SESSION_INITIALIZED: __,
          IX2_SESSION_STARTED: b_,
          IX2_TEST_FRAME_RENDERED: I_,
          IX2_SESSION_STOPPED: T_,
          IX2_EVENT_LISTENER_ADDED: w_,
          IX2_EVENT_STATE_CHANGED: x_,
          IX2_ANIMATION_FRAME_CHANGED: A_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: O_,
          IX2_VIEWPORT_WIDTH_CHANGED: S_,
          IX2_MEDIA_QUERIES_DEFINED: R_,
        } = Te),
        (Ys = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (C_ = 20),
        (Qs = (e = Ys, t) => {
          switch (t.type) {
            case __: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Le.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case b_:
              return (0, Le.set)(e, "active", !0);
            case I_: {
              let {
                payload: { step: r = C_ },
              } = t;
              return (0, Le.set)(e, "tick", e.tick + r);
            }
            case T_:
              return Ys;
            case A_: {
              let {
                payload: { now: r },
              } = t;
              return (0, Le.set)(e, "tick", r);
            }
            case w_: {
              let r = (0, Le.addLast)(e.eventListeners, t.payload);
              return (0, Le.set)(e, "eventListeners", r);
            }
            case x_: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Le.setIn)(e, ["eventState", r], n);
            }
            case O_: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Le.setIn)(e, ["playbackState", r], n);
            }
            case S_: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let a = 0; a < i; a++) {
                let { key: u, min: s, max: l } = n[a];
                if (r >= s && r <= l) {
                  o = u;
                  break;
                }
              }
              return (0, Le.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case R_:
              return (0, Le.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        }));
    });
  var Js = g((H1, Zs) => {
    function L_() {
      ((this.__data__ = []), (this.size = 0));
    }
    Zs.exports = L_;
  });
  var Yr = g((B1, eu) => {
    function P_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    eu.exports = P_;
  });
  var sr = g((z1, tu) => {
    var N_ = Yr();
    function D_(e, t) {
      for (var r = e.length; r--; ) if (N_(e[r][0], t)) return r;
      return -1;
    }
    tu.exports = D_;
  });
  var nu = g((K1, ru) => {
    var M_ = sr(),
      F_ = Array.prototype,
      q_ = F_.splice;
    function k_(e) {
      var t = this.__data__,
        r = M_(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return (r == n ? t.pop() : q_.call(t, r, 1), --this.size, !0);
    }
    ru.exports = k_;
  });
  var ou = g((j1, iu) => {
    var X_ = sr();
    function G_(e) {
      var t = this.__data__,
        r = X_(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    iu.exports = G_;
  });
  var su = g((Y1, au) => {
    var U_ = sr();
    function W_(e) {
      return U_(this.__data__, e) > -1;
    }
    au.exports = W_;
  });
  var cu = g((Q1, uu) => {
    var V_ = sr();
    function H_(e, t) {
      var r = this.__data__,
        n = V_(r, e);
      return (n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this);
    }
    uu.exports = H_;
  });
  var ur = g(($1, lu) => {
    var B_ = Js(),
      z_ = nu(),
      K_ = ou(),
      j_ = su(),
      Y_ = cu();
    function Mt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Mt.prototype.clear = B_;
    Mt.prototype.delete = z_;
    Mt.prototype.get = K_;
    Mt.prototype.has = j_;
    Mt.prototype.set = Y_;
    lu.exports = Mt;
  });
  var du = g((Z1, fu) => {
    var Q_ = ur();
    function $_() {
      ((this.__data__ = new Q_()), (this.size = 0));
    }
    fu.exports = $_;
  });
  var gu = g((J1, pu) => {
    function Z_(e) {
      var t = this.__data__,
        r = t.delete(e);
      return ((this.size = t.size), r);
    }
    pu.exports = Z_;
  });
  var vu = g((e2, hu) => {
    function J_(e) {
      return this.__data__.get(e);
    }
    hu.exports = J_;
  });
  var Eu = g((t2, mu) => {
    function eb(e) {
      return this.__data__.has(e);
    }
    mu.exports = eb;
  });
  var et = g((r2, yu) => {
    function tb(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    yu.exports = tb;
  });
  var Ai = g((n2, _u) => {
    var rb = ft(),
      nb = et(),
      ib = "[object AsyncFunction]",
      ob = "[object Function]",
      ab = "[object GeneratorFunction]",
      sb = "[object Proxy]";
    function ub(e) {
      if (!nb(e)) return !1;
      var t = rb(e);
      return t == ob || t == ab || t == ib || t == sb;
    }
    _u.exports = ub;
  });
  var Iu = g((i2, bu) => {
    var cb = He(),
      lb = cb["__core-js_shared__"];
    bu.exports = lb;
  });
  var xu = g((o2, wu) => {
    var Oi = Iu(),
      Tu = (function () {
        var e = /[^.]+$/.exec((Oi && Oi.keys && Oi.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function fb(e) {
      return !!Tu && Tu in e;
    }
    wu.exports = fb;
  });
  var Si = g((a2, Au) => {
    var db = Function.prototype,
      pb = db.toString;
    function gb(e) {
      if (e != null) {
        try {
          return pb.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Au.exports = gb;
  });
  var Su = g((s2, Ou) => {
    var hb = Ai(),
      vb = xu(),
      mb = et(),
      Eb = Si(),
      yb = /[\\^$.*+?()[\]{}|]/g,
      _b = /^\[object .+?Constructor\]$/,
      bb = Function.prototype,
      Ib = Object.prototype,
      Tb = bb.toString,
      wb = Ib.hasOwnProperty,
      xb = RegExp(
        "^" +
          Tb.call(wb)
            .replace(yb, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      );
    function Ab(e) {
      if (!mb(e) || vb(e)) return !1;
      var t = hb(e) ? xb : _b;
      return t.test(Eb(e));
    }
    Ou.exports = Ab;
  });
  var Cu = g((u2, Ru) => {
    function Ob(e, t) {
      return e?.[t];
    }
    Ru.exports = Ob;
  });
  var dt = g((c2, Lu) => {
    var Sb = Su(),
      Rb = Cu();
    function Cb(e, t) {
      var r = Rb(e, t);
      return Sb(r) ? r : void 0;
    }
    Lu.exports = Cb;
  });
  var Qr = g((l2, Pu) => {
    var Lb = dt(),
      Pb = He(),
      Nb = Lb(Pb, "Map");
    Pu.exports = Nb;
  });
  var cr = g((f2, Nu) => {
    var Db = dt(),
      Mb = Db(Object, "create");
    Nu.exports = Mb;
  });
  var Fu = g((d2, Mu) => {
    var Du = cr();
    function Fb() {
      ((this.__data__ = Du ? Du(null) : {}), (this.size = 0));
    }
    Mu.exports = Fb;
  });
  var ku = g((p2, qu) => {
    function qb(e) {
      var t = this.has(e) && delete this.__data__[e];
      return ((this.size -= t ? 1 : 0), t);
    }
    qu.exports = qb;
  });
  var Gu = g((g2, Xu) => {
    var kb = cr(),
      Xb = "__lodash_hash_undefined__",
      Gb = Object.prototype,
      Ub = Gb.hasOwnProperty;
    function Wb(e) {
      var t = this.__data__;
      if (kb) {
        var r = t[e];
        return r === Xb ? void 0 : r;
      }
      return Ub.call(t, e) ? t[e] : void 0;
    }
    Xu.exports = Wb;
  });
  var Wu = g((h2, Uu) => {
    var Vb = cr(),
      Hb = Object.prototype,
      Bb = Hb.hasOwnProperty;
    function zb(e) {
      var t = this.__data__;
      return Vb ? t[e] !== void 0 : Bb.call(t, e);
    }
    Uu.exports = zb;
  });
  var Hu = g((v2, Vu) => {
    var Kb = cr(),
      jb = "__lodash_hash_undefined__";
    function Yb(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Kb && t === void 0 ? jb : t),
        this
      );
    }
    Vu.exports = Yb;
  });
  var zu = g((m2, Bu) => {
    var Qb = Fu(),
      $b = ku(),
      Zb = Gu(),
      Jb = Wu(),
      eI = Hu();
    function Ft(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Ft.prototype.clear = Qb;
    Ft.prototype.delete = $b;
    Ft.prototype.get = Zb;
    Ft.prototype.has = Jb;
    Ft.prototype.set = eI;
    Bu.exports = Ft;
  });
  var Yu = g((E2, ju) => {
    var Ku = zu(),
      tI = ur(),
      rI = Qr();
    function nI() {
      ((this.size = 0),
        (this.__data__ = {
          hash: new Ku(),
          map: new (rI || tI)(),
          string: new Ku(),
        }));
    }
    ju.exports = nI;
  });
  var $u = g((y2, Qu) => {
    function iI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Qu.exports = iI;
  });
  var lr = g((_2, Zu) => {
    var oI = $u();
    function aI(e, t) {
      var r = e.__data__;
      return oI(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Zu.exports = aI;
  });
  var ec = g((b2, Ju) => {
    var sI = lr();
    function uI(e) {
      var t = sI(this, e).delete(e);
      return ((this.size -= t ? 1 : 0), t);
    }
    Ju.exports = uI;
  });
  var rc = g((I2, tc) => {
    var cI = lr();
    function lI(e) {
      return cI(this, e).get(e);
    }
    tc.exports = lI;
  });
  var ic = g((T2, nc) => {
    var fI = lr();
    function dI(e) {
      return fI(this, e).has(e);
    }
    nc.exports = dI;
  });
  var ac = g((w2, oc) => {
    var pI = lr();
    function gI(e, t) {
      var r = pI(this, e),
        n = r.size;
      return (r.set(e, t), (this.size += r.size == n ? 0 : 1), this);
    }
    oc.exports = gI;
  });
  var $r = g((x2, sc) => {
    var hI = Yu(),
      vI = ec(),
      mI = rc(),
      EI = ic(),
      yI = ac();
    function qt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    qt.prototype.clear = hI;
    qt.prototype.delete = vI;
    qt.prototype.get = mI;
    qt.prototype.has = EI;
    qt.prototype.set = yI;
    sc.exports = qt;
  });
  var cc = g((A2, uc) => {
    var _I = ur(),
      bI = Qr(),
      II = $r(),
      TI = 200;
    function wI(e, t) {
      var r = this.__data__;
      if (r instanceof _I) {
        var n = r.__data__;
        if (!bI || n.length < TI - 1)
          return (n.push([e, t]), (this.size = ++r.size), this);
        r = this.__data__ = new II(n);
      }
      return (r.set(e, t), (this.size = r.size), this);
    }
    uc.exports = wI;
  });
  var Ri = g((O2, lc) => {
    var xI = ur(),
      AI = du(),
      OI = gu(),
      SI = vu(),
      RI = Eu(),
      CI = cc();
    function kt(e) {
      var t = (this.__data__ = new xI(e));
      this.size = t.size;
    }
    kt.prototype.clear = AI;
    kt.prototype.delete = OI;
    kt.prototype.get = SI;
    kt.prototype.has = RI;
    kt.prototype.set = CI;
    lc.exports = kt;
  });
  var dc = g((S2, fc) => {
    var LI = "__lodash_hash_undefined__";
    function PI(e) {
      return (this.__data__.set(e, LI), this);
    }
    fc.exports = PI;
  });
  var gc = g((R2, pc) => {
    function NI(e) {
      return this.__data__.has(e);
    }
    pc.exports = NI;
  });
  var vc = g((C2, hc) => {
    var DI = $r(),
      MI = dc(),
      FI = gc();
    function Zr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new DI(); ++t < r; ) this.add(e[t]);
    }
    Zr.prototype.add = Zr.prototype.push = MI;
    Zr.prototype.has = FI;
    hc.exports = Zr;
  });
  var Ec = g((L2, mc) => {
    function qI(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    mc.exports = qI;
  });
  var _c = g((P2, yc) => {
    function kI(e, t) {
      return e.has(t);
    }
    yc.exports = kI;
  });
  var Ci = g((N2, bc) => {
    var XI = vc(),
      GI = Ec(),
      UI = _c(),
      WI = 1,
      VI = 2;
    function HI(e, t, r, n, i, o) {
      var a = r & WI,
        u = e.length,
        s = t.length;
      if (u != s && !(a && s > u)) return !1;
      var l = o.get(e),
        b = o.get(t);
      if (l && b) return l == t && b == e;
      var f = -1,
        E = !0,
        m = r & VI ? new XI() : void 0;
      for (o.set(e, t), o.set(t, e); ++f < u; ) {
        var y = e[f],
          T = t[f];
        if (n) var A = a ? n(T, y, f, t, e, o) : n(y, T, f, e, t, o);
        if (A !== void 0) {
          if (A) continue;
          E = !1;
          break;
        }
        if (m) {
          if (
            !GI(t, function (w, N) {
              if (!UI(m, N) && (y === w || i(y, w, r, n, o))) return m.push(N);
            })
          ) {
            E = !1;
            break;
          }
        } else if (!(y === T || i(y, T, r, n, o))) {
          E = !1;
          break;
        }
      }
      return (o.delete(e), o.delete(t), E);
    }
    bc.exports = HI;
  });
  var Tc = g((D2, Ic) => {
    var BI = He(),
      zI = BI.Uint8Array;
    Ic.exports = zI;
  });
  var xc = g((M2, wc) => {
    function KI(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    wc.exports = KI;
  });
  var Oc = g((F2, Ac) => {
    function jI(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Ac.exports = jI;
  });
  var Pc = g((q2, Lc) => {
    var Sc = Lt(),
      Rc = Tc(),
      YI = Yr(),
      QI = Ci(),
      $I = xc(),
      ZI = Oc(),
      JI = 1,
      eT = 2,
      tT = "[object Boolean]",
      rT = "[object Date]",
      nT = "[object Error]",
      iT = "[object Map]",
      oT = "[object Number]",
      aT = "[object RegExp]",
      sT = "[object Set]",
      uT = "[object String]",
      cT = "[object Symbol]",
      lT = "[object ArrayBuffer]",
      fT = "[object DataView]",
      Cc = Sc ? Sc.prototype : void 0,
      Li = Cc ? Cc.valueOf : void 0;
    function dT(e, t, r, n, i, o, a) {
      switch (r) {
        case fT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          ((e = e.buffer), (t = t.buffer));
        case lT:
          return !(e.byteLength != t.byteLength || !o(new Rc(e), new Rc(t)));
        case tT:
        case rT:
        case oT:
          return YI(+e, +t);
        case nT:
          return e.name == t.name && e.message == t.message;
        case aT:
        case uT:
          return e == t + "";
        case iT:
          var u = $I;
        case sT:
          var s = n & JI;
          if ((u || (u = ZI), e.size != t.size && !s)) return !1;
          var l = a.get(e);
          if (l) return l == t;
          ((n |= eT), a.set(e, t));
          var b = QI(u(e), u(t), n, i, o, a);
          return (a.delete(e), b);
        case cT:
          if (Li) return Li.call(e) == Li.call(t);
      }
      return !1;
    }
    Lc.exports = dT;
  });
  var Jr = g((k2, Nc) => {
    function pT(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Nc.exports = pT;
  });
  var we = g((X2, Dc) => {
    var gT = Array.isArray;
    Dc.exports = gT;
  });
  var Pi = g((G2, Mc) => {
    var hT = Jr(),
      vT = we();
    function mT(e, t, r) {
      var n = t(e);
      return vT(e) ? n : hT(n, r(e));
    }
    Mc.exports = mT;
  });
  var qc = g((U2, Fc) => {
    function ET(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var a = e[r];
        t(a, r, e) && (o[i++] = a);
      }
      return o;
    }
    Fc.exports = ET;
  });
  var Ni = g((W2, kc) => {
    function yT() {
      return [];
    }
    kc.exports = yT;
  });
  var Di = g((V2, Gc) => {
    var _T = qc(),
      bT = Ni(),
      IT = Object.prototype,
      TT = IT.propertyIsEnumerable,
      Xc = Object.getOwnPropertySymbols,
      wT = Xc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                _T(Xc(e), function (t) {
                  return TT.call(e, t);
                }));
          }
        : bT;
    Gc.exports = wT;
  });
  var Wc = g((H2, Uc) => {
    function xT(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Uc.exports = xT;
  });
  var Hc = g((B2, Vc) => {
    var AT = ft(),
      OT = ot(),
      ST = "[object Arguments]";
    function RT(e) {
      return OT(e) && AT(e) == ST;
    }
    Vc.exports = RT;
  });
  var fr = g((z2, Kc) => {
    var Bc = Hc(),
      CT = ot(),
      zc = Object.prototype,
      LT = zc.hasOwnProperty,
      PT = zc.propertyIsEnumerable,
      NT = Bc(
        (function () {
          return arguments;
        })(),
      )
        ? Bc
        : function (e) {
            return CT(e) && LT.call(e, "callee") && !PT.call(e, "callee");
          };
    Kc.exports = NT;
  });
  var Yc = g((K2, jc) => {
    function DT() {
      return !1;
    }
    jc.exports = DT;
  });
  var en = g((dr, Xt) => {
    var MT = He(),
      FT = Yc(),
      Zc = typeof dr == "object" && dr && !dr.nodeType && dr,
      Qc = Zc && typeof Xt == "object" && Xt && !Xt.nodeType && Xt,
      qT = Qc && Qc.exports === Zc,
      $c = qT ? MT.Buffer : void 0,
      kT = $c ? $c.isBuffer : void 0,
      XT = kT || FT;
    Xt.exports = XT;
  });
  var tn = g((j2, Jc) => {
    var GT = 9007199254740991,
      UT = /^(?:0|[1-9]\d*)$/;
    function WT(e, t) {
      var r = typeof e;
      return (
        (t = t ?? GT),
        !!t &&
          (r == "number" || (r != "symbol" && UT.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Jc.exports = WT;
  });
  var rn = g((Y2, el) => {
    var VT = 9007199254740991;
    function HT(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= VT;
    }
    el.exports = HT;
  });
  var rl = g((Q2, tl) => {
    var BT = ft(),
      zT = rn(),
      KT = ot(),
      jT = "[object Arguments]",
      YT = "[object Array]",
      QT = "[object Boolean]",
      $T = "[object Date]",
      ZT = "[object Error]",
      JT = "[object Function]",
      ew = "[object Map]",
      tw = "[object Number]",
      rw = "[object Object]",
      nw = "[object RegExp]",
      iw = "[object Set]",
      ow = "[object String]",
      aw = "[object WeakMap]",
      sw = "[object ArrayBuffer]",
      uw = "[object DataView]",
      cw = "[object Float32Array]",
      lw = "[object Float64Array]",
      fw = "[object Int8Array]",
      dw = "[object Int16Array]",
      pw = "[object Int32Array]",
      gw = "[object Uint8Array]",
      hw = "[object Uint8ClampedArray]",
      vw = "[object Uint16Array]",
      mw = "[object Uint32Array]",
      ve = {};
    ve[cw] =
      ve[lw] =
      ve[fw] =
      ve[dw] =
      ve[pw] =
      ve[gw] =
      ve[hw] =
      ve[vw] =
      ve[mw] =
        !0;
    ve[jT] =
      ve[YT] =
      ve[sw] =
      ve[QT] =
      ve[uw] =
      ve[$T] =
      ve[ZT] =
      ve[JT] =
      ve[ew] =
      ve[tw] =
      ve[rw] =
      ve[nw] =
      ve[iw] =
      ve[ow] =
      ve[aw] =
        !1;
    function Ew(e) {
      return KT(e) && zT(e.length) && !!ve[BT(e)];
    }
    tl.exports = Ew;
  });
  var il = g(($2, nl) => {
    function yw(e) {
      return function (t) {
        return e(t);
      };
    }
    nl.exports = yw;
  });
  var al = g((pr, Gt) => {
    var _w = ai(),
      ol = typeof pr == "object" && pr && !pr.nodeType && pr,
      gr = ol && typeof Gt == "object" && Gt && !Gt.nodeType && Gt,
      bw = gr && gr.exports === ol,
      Mi = bw && _w.process,
      Iw = (function () {
        try {
          var e = gr && gr.require && gr.require("util").types;
          return e || (Mi && Mi.binding && Mi.binding("util"));
        } catch {}
      })();
    Gt.exports = Iw;
  });
  var nn = g((Z2, cl) => {
    var Tw = rl(),
      ww = il(),
      sl = al(),
      ul = sl && sl.isTypedArray,
      xw = ul ? ww(ul) : Tw;
    cl.exports = xw;
  });
  var Fi = g((J2, ll) => {
    var Aw = Wc(),
      Ow = fr(),
      Sw = we(),
      Rw = en(),
      Cw = tn(),
      Lw = nn(),
      Pw = Object.prototype,
      Nw = Pw.hasOwnProperty;
    function Dw(e, t) {
      var r = Sw(e),
        n = !r && Ow(e),
        i = !r && !n && Rw(e),
        o = !r && !n && !i && Lw(e),
        a = r || n || i || o,
        u = a ? Aw(e.length, String) : [],
        s = u.length;
      for (var l in e)
        (t || Nw.call(e, l)) &&
          !(
            a &&
            (l == "length" ||
              (i && (l == "offset" || l == "parent")) ||
              (o &&
                (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
              Cw(l, s))
          ) &&
          u.push(l);
      return u;
    }
    ll.exports = Dw;
  });
  var on = g((eq, fl) => {
    var Mw = Object.prototype;
    function Fw(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || Mw;
      return e === r;
    }
    fl.exports = Fw;
  });
  var pl = g((tq, dl) => {
    var qw = si(),
      kw = qw(Object.keys, Object);
    dl.exports = kw;
  });
  var an = g((rq, gl) => {
    var Xw = on(),
      Gw = pl(),
      Uw = Object.prototype,
      Ww = Uw.hasOwnProperty;
    function Vw(e) {
      if (!Xw(e)) return Gw(e);
      var t = [];
      for (var r in Object(e)) Ww.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    gl.exports = Vw;
  });
  var _t = g((nq, hl) => {
    var Hw = Ai(),
      Bw = rn();
    function zw(e) {
      return e != null && Bw(e.length) && !Hw(e);
    }
    hl.exports = zw;
  });
  var hr = g((iq, vl) => {
    var Kw = Fi(),
      jw = an(),
      Yw = _t();
    function Qw(e) {
      return Yw(e) ? Kw(e) : jw(e);
    }
    vl.exports = Qw;
  });
  var El = g((oq, ml) => {
    var $w = Pi(),
      Zw = Di(),
      Jw = hr();
    function ex(e) {
      return $w(e, Jw, Zw);
    }
    ml.exports = ex;
  });
  var bl = g((aq, _l) => {
    var yl = El(),
      tx = 1,
      rx = Object.prototype,
      nx = rx.hasOwnProperty;
    function ix(e, t, r, n, i, o) {
      var a = r & tx,
        u = yl(e),
        s = u.length,
        l = yl(t),
        b = l.length;
      if (s != b && !a) return !1;
      for (var f = s; f--; ) {
        var E = u[f];
        if (!(a ? E in t : nx.call(t, E))) return !1;
      }
      var m = o.get(e),
        y = o.get(t);
      if (m && y) return m == t && y == e;
      var T = !0;
      (o.set(e, t), o.set(t, e));
      for (var A = a; ++f < s; ) {
        E = u[f];
        var w = e[E],
          N = t[E];
        if (n) var L = a ? n(N, w, E, t, e, o) : n(w, N, E, e, t, o);
        if (!(L === void 0 ? w === N || i(w, N, r, n, o) : L)) {
          T = !1;
          break;
        }
        A || (A = E == "constructor");
      }
      if (T && !A) {
        var F = e.constructor,
          k = t.constructor;
        F != k &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof F == "function" &&
            F instanceof F &&
            typeof k == "function" &&
            k instanceof k
          ) &&
          (T = !1);
      }
      return (o.delete(e), o.delete(t), T);
    }
    _l.exports = ix;
  });
  var Tl = g((sq, Il) => {
    var ox = dt(),
      ax = He(),
      sx = ox(ax, "DataView");
    Il.exports = sx;
  });
  var xl = g((uq, wl) => {
    var ux = dt(),
      cx = He(),
      lx = ux(cx, "Promise");
    wl.exports = lx;
  });
  var Ol = g((cq, Al) => {
    var fx = dt(),
      dx = He(),
      px = fx(dx, "Set");
    Al.exports = px;
  });
  var qi = g((lq, Sl) => {
    var gx = dt(),
      hx = He(),
      vx = gx(hx, "WeakMap");
    Sl.exports = vx;
  });
  var sn = g((fq, Ml) => {
    var ki = Tl(),
      Xi = Qr(),
      Gi = xl(),
      Ui = Ol(),
      Wi = qi(),
      Dl = ft(),
      Ut = Si(),
      Rl = "[object Map]",
      mx = "[object Object]",
      Cl = "[object Promise]",
      Ll = "[object Set]",
      Pl = "[object WeakMap]",
      Nl = "[object DataView]",
      Ex = Ut(ki),
      yx = Ut(Xi),
      _x = Ut(Gi),
      bx = Ut(Ui),
      Ix = Ut(Wi),
      bt = Dl;
    ((ki && bt(new ki(new ArrayBuffer(1))) != Nl) ||
      (Xi && bt(new Xi()) != Rl) ||
      (Gi && bt(Gi.resolve()) != Cl) ||
      (Ui && bt(new Ui()) != Ll) ||
      (Wi && bt(new Wi()) != Pl)) &&
      (bt = function (e) {
        var t = Dl(e),
          r = t == mx ? e.constructor : void 0,
          n = r ? Ut(r) : "";
        if (n)
          switch (n) {
            case Ex:
              return Nl;
            case yx:
              return Rl;
            case _x:
              return Cl;
            case bx:
              return Ll;
            case Ix:
              return Pl;
          }
        return t;
      });
    Ml.exports = bt;
  });
  var Vl = g((dq, Wl) => {
    var Vi = Ri(),
      Tx = Ci(),
      wx = Pc(),
      xx = bl(),
      Fl = sn(),
      ql = we(),
      kl = en(),
      Ax = nn(),
      Ox = 1,
      Xl = "[object Arguments]",
      Gl = "[object Array]",
      un = "[object Object]",
      Sx = Object.prototype,
      Ul = Sx.hasOwnProperty;
    function Rx(e, t, r, n, i, o) {
      var a = ql(e),
        u = ql(t),
        s = a ? Gl : Fl(e),
        l = u ? Gl : Fl(t);
      ((s = s == Xl ? un : s), (l = l == Xl ? un : l));
      var b = s == un,
        f = l == un,
        E = s == l;
      if (E && kl(e)) {
        if (!kl(t)) return !1;
        ((a = !0), (b = !1));
      }
      if (E && !b)
        return (
          o || (o = new Vi()),
          a || Ax(e) ? Tx(e, t, r, n, i, o) : wx(e, t, s, r, n, i, o)
        );
      if (!(r & Ox)) {
        var m = b && Ul.call(e, "__wrapped__"),
          y = f && Ul.call(t, "__wrapped__");
        if (m || y) {
          var T = m ? e.value() : e,
            A = y ? t.value() : t;
          return (o || (o = new Vi()), i(T, A, r, n, o));
        }
      }
      return E ? (o || (o = new Vi()), xx(e, t, r, n, i, o)) : !1;
    }
    Wl.exports = Rx;
  });
  var Hi = g((pq, zl) => {
    var Cx = Vl(),
      Hl = ot();
    function Bl(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Hl(e) && !Hl(t))
          ? e !== e && t !== t
          : Cx(e, t, r, n, Bl, i);
    }
    zl.exports = Bl;
  });
  var jl = g((gq, Kl) => {
    var Lx = Ri(),
      Px = Hi(),
      Nx = 1,
      Dx = 2;
    function Mx(e, t, r, n) {
      var i = r.length,
        o = i,
        a = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var u = r[i];
        if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        u = r[i];
        var s = u[0],
          l = e[s],
          b = u[1];
        if (a && u[2]) {
          if (l === void 0 && !(s in e)) return !1;
        } else {
          var f = new Lx();
          if (n) var E = n(l, b, s, e, t, f);
          if (!(E === void 0 ? Px(b, l, Nx | Dx, n, f) : E)) return !1;
        }
      }
      return !0;
    }
    Kl.exports = Mx;
  });
  var Bi = g((hq, Yl) => {
    var Fx = et();
    function qx(e) {
      return e === e && !Fx(e);
    }
    Yl.exports = qx;
  });
  var $l = g((vq, Ql) => {
    var kx = Bi(),
      Xx = hr();
    function Gx(e) {
      for (var t = Xx(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, kx(i)];
      }
      return t;
    }
    Ql.exports = Gx;
  });
  var zi = g((mq, Zl) => {
    function Ux(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Zl.exports = Ux;
  });
  var ef = g((Eq, Jl) => {
    var Wx = jl(),
      Vx = $l(),
      Hx = zi();
    function Bx(e) {
      var t = Vx(e);
      return t.length == 1 && t[0][2]
        ? Hx(t[0][0], t[0][1])
        : function (r) {
            return r === e || Wx(r, e, t);
          };
    }
    Jl.exports = Bx;
  });
  var vr = g((yq, tf) => {
    var zx = ft(),
      Kx = ot(),
      jx = "[object Symbol]";
    function Yx(e) {
      return typeof e == "symbol" || (Kx(e) && zx(e) == jx);
    }
    tf.exports = Yx;
  });
  var cn = g((_q, rf) => {
    var Qx = we(),
      $x = vr(),
      Zx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Jx = /^\w*$/;
    function e0(e, t) {
      if (Qx(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        $x(e)
        ? !0
        : Jx.test(e) || !Zx.test(e) || (t != null && e in Object(t));
    }
    rf.exports = e0;
  });
  var af = g((bq, of) => {
    var nf = $r(),
      t0 = "Expected a function";
    function Ki(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(t0);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var a = e.apply(this, n);
        return ((r.cache = o.set(i, a) || o), a);
      };
      return ((r.cache = new (Ki.Cache || nf)()), r);
    }
    Ki.Cache = nf;
    of.exports = Ki;
  });
  var uf = g((Iq, sf) => {
    var r0 = af(),
      n0 = 500;
    function i0(e) {
      var t = r0(e, function (n) {
          return (r.size === n0 && r.clear(), n);
        }),
        r = t.cache;
      return t;
    }
    sf.exports = i0;
  });
  var lf = g((Tq, cf) => {
    var o0 = uf(),
      a0 =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      s0 = /\\(\\)?/g,
      u0 = o0(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(a0, function (r, n, i, o) {
            t.push(i ? o.replace(s0, "$1") : n || r);
          }),
          t
        );
      });
    cf.exports = u0;
  });
  var ji = g((wq, ff) => {
    function c0(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    ff.exports = c0;
  });
  var mf = g((xq, vf) => {
    var df = Lt(),
      l0 = ji(),
      f0 = we(),
      d0 = vr(),
      p0 = 1 / 0,
      pf = df ? df.prototype : void 0,
      gf = pf ? pf.toString : void 0;
    function hf(e) {
      if (typeof e == "string") return e;
      if (f0(e)) return l0(e, hf) + "";
      if (d0(e)) return gf ? gf.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -p0 ? "-0" : t;
    }
    vf.exports = hf;
  });
  var yf = g((Aq, Ef) => {
    var g0 = mf();
    function h0(e) {
      return e == null ? "" : g0(e);
    }
    Ef.exports = h0;
  });
  var mr = g((Oq, _f) => {
    var v0 = we(),
      m0 = cn(),
      E0 = lf(),
      y0 = yf();
    function _0(e, t) {
      return v0(e) ? e : m0(e, t) ? [e] : E0(y0(e));
    }
    _f.exports = _0;
  });
  var Wt = g((Sq, bf) => {
    var b0 = vr(),
      I0 = 1 / 0;
    function T0(e) {
      if (typeof e == "string" || b0(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -I0 ? "-0" : t;
    }
    bf.exports = T0;
  });
  var ln = g((Rq, If) => {
    var w0 = mr(),
      x0 = Wt();
    function A0(e, t) {
      t = w0(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[x0(t[r++])];
      return r && r == n ? e : void 0;
    }
    If.exports = A0;
  });
  var fn = g((Cq, Tf) => {
    var O0 = ln();
    function S0(e, t, r) {
      var n = e == null ? void 0 : O0(e, t);
      return n === void 0 ? r : n;
    }
    Tf.exports = S0;
  });
  var xf = g((Lq, wf) => {
    function R0(e, t) {
      return e != null && t in Object(e);
    }
    wf.exports = R0;
  });
  var Of = g((Pq, Af) => {
    var C0 = mr(),
      L0 = fr(),
      P0 = we(),
      N0 = tn(),
      D0 = rn(),
      M0 = Wt();
    function F0(e, t, r) {
      t = C0(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var a = M0(t[n]);
        if (!(o = e != null && r(e, a))) break;
        e = e[a];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && D0(i) && N0(a, i) && (P0(e) || L0(e)));
    }
    Af.exports = F0;
  });
  var Rf = g((Nq, Sf) => {
    var q0 = xf(),
      k0 = Of();
    function X0(e, t) {
      return e != null && k0(e, t, q0);
    }
    Sf.exports = X0;
  });
  var Lf = g((Dq, Cf) => {
    var G0 = Hi(),
      U0 = fn(),
      W0 = Rf(),
      V0 = cn(),
      H0 = Bi(),
      B0 = zi(),
      z0 = Wt(),
      K0 = 1,
      j0 = 2;
    function Y0(e, t) {
      return V0(e) && H0(t)
        ? B0(z0(e), t)
        : function (r) {
            var n = U0(r, e);
            return n === void 0 && n === t ? W0(r, e) : G0(t, n, K0 | j0);
          };
    }
    Cf.exports = Y0;
  });
  var dn = g((Mq, Pf) => {
    function Q0(e) {
      return e;
    }
    Pf.exports = Q0;
  });
  var Yi = g((Fq, Nf) => {
    function $0(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Nf.exports = $0;
  });
  var Mf = g((qq, Df) => {
    var Z0 = ln();
    function J0(e) {
      return function (t) {
        return Z0(t, e);
      };
    }
    Df.exports = J0;
  });
  var qf = g((kq, Ff) => {
    var eA = Yi(),
      tA = Mf(),
      rA = cn(),
      nA = Wt();
    function iA(e) {
      return rA(e) ? eA(nA(e)) : tA(e);
    }
    Ff.exports = iA;
  });
  var pt = g((Xq, kf) => {
    var oA = ef(),
      aA = Lf(),
      sA = dn(),
      uA = we(),
      cA = qf();
    function lA(e) {
      return typeof e == "function"
        ? e
        : e == null
          ? sA
          : typeof e == "object"
            ? uA(e)
              ? aA(e[0], e[1])
              : oA(e)
            : cA(e);
    }
    kf.exports = lA;
  });
  var Qi = g((Gq, Xf) => {
    var fA = pt(),
      dA = _t(),
      pA = hr();
    function gA(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!dA(t)) {
          var o = fA(r, 3);
          ((t = pA(t)),
            (r = function (u) {
              return o(i[u], u, i);
            }));
        }
        var a = e(t, r, n);
        return a > -1 ? i[o ? t[a] : a] : void 0;
      };
    }
    Xf.exports = gA;
  });
  var $i = g((Uq, Gf) => {
    function hA(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Gf.exports = hA;
  });
  var Wf = g((Wq, Uf) => {
    var vA = /\s/;
    function mA(e) {
      for (var t = e.length; t-- && vA.test(e.charAt(t)); );
      return t;
    }
    Uf.exports = mA;
  });
  var Hf = g((Vq, Vf) => {
    var EA = Wf(),
      yA = /^\s+/;
    function _A(e) {
      return e && e.slice(0, EA(e) + 1).replace(yA, "");
    }
    Vf.exports = _A;
  });
  var pn = g((Hq, Kf) => {
    var bA = Hf(),
      Bf = et(),
      IA = vr(),
      zf = 0 / 0,
      TA = /^[-+]0x[0-9a-f]+$/i,
      wA = /^0b[01]+$/i,
      xA = /^0o[0-7]+$/i,
      AA = parseInt;
    function OA(e) {
      if (typeof e == "number") return e;
      if (IA(e)) return zf;
      if (Bf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Bf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = bA(e);
      var r = wA.test(e);
      return r || xA.test(e) ? AA(e.slice(2), r ? 2 : 8) : TA.test(e) ? zf : +e;
    }
    Kf.exports = OA;
  });
  var Qf = g((Bq, Yf) => {
    var SA = pn(),
      jf = 1 / 0,
      RA = 17976931348623157e292;
    function CA(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = SA(e)), e === jf || e === -jf)) {
        var t = e < 0 ? -1 : 1;
        return t * RA;
      }
      return e === e ? e : 0;
    }
    Yf.exports = CA;
  });
  var Zi = g((zq, $f) => {
    var LA = Qf();
    function PA(e) {
      var t = LA(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    $f.exports = PA;
  });
  var Jf = g((Kq, Zf) => {
    var NA = $i(),
      DA = pt(),
      MA = Zi(),
      FA = Math.max;
    function qA(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : MA(r);
      return (i < 0 && (i = FA(n + i, 0)), NA(e, DA(t, 3), i));
    }
    Zf.exports = qA;
  });
  var Ji = g((jq, ed) => {
    var kA = Qi(),
      XA = Jf(),
      GA = kA(XA);
    ed.exports = GA;
  });
  var nd = {};
  De(nd, {
    ELEMENT_MATCHES: () => UA,
    FLEX_PREFIXED: () => eo,
    IS_BROWSER_ENV: () => ze,
    TRANSFORM_PREFIXED: () => gt,
    TRANSFORM_STYLE_PREFIXED: () => hn,
    withBrowser: () => gn,
  });
  var rd,
    ze,
    gn,
    UA,
    eo,
    gt,
    td,
    hn,
    vn = me(() => {
      "use strict";
      ((rd = de(Ji())),
        (ze = typeof window < "u"),
        (gn = (e, t) => (ze ? e() : t)),
        (UA = gn(() =>
          (0, rd.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype,
          ),
        )),
        (eo = gn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (gt = gn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (td = gt.split("transform")[0]),
        (hn = td ? td + "TransformStyle" : "transformStyle"));
    });
  var to = g((Yq, ud) => {
    var WA = 4,
      VA = 0.001,
      HA = 1e-7,
      BA = 10,
      Er = 11,
      mn = 1 / (Er - 1),
      zA = typeof Float32Array == "function";
    function id(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function od(e, t) {
      return 3 * t - 6 * e;
    }
    function ad(e) {
      return 3 * e;
    }
    function En(e, t, r) {
      return ((id(t, r) * e + od(t, r)) * e + ad(t)) * e;
    }
    function sd(e, t, r) {
      return 3 * id(t, r) * e * e + 2 * od(t, r) * e + ad(t);
    }
    function KA(e, t, r, n, i) {
      var o,
        a,
        u = 0;
      do
        ((a = t + (r - t) / 2),
          (o = En(a, n, i) - e),
          o > 0 ? (r = a) : (t = a));
      while (Math.abs(o) > HA && ++u < BA);
      return a;
    }
    function jA(e, t, r, n) {
      for (var i = 0; i < WA; ++i) {
        var o = sd(t, r, n);
        if (o === 0) return t;
        var a = En(t, r, n) - e;
        t -= a / o;
      }
      return t;
    }
    ud.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = zA ? new Float32Array(Er) : new Array(Er);
      if (t !== r || n !== i)
        for (var a = 0; a < Er; ++a) o[a] = En(a * mn, t, n);
      function u(s) {
        for (var l = 0, b = 1, f = Er - 1; b !== f && o[b] <= s; ++b) l += mn;
        --b;
        var E = (s - o[b]) / (o[b + 1] - o[b]),
          m = l + E * mn,
          y = sd(m, t, n);
        return y >= VA ? jA(s, m, t, n) : y === 0 ? m : KA(s, l, l + mn, t, n);
      }
      return function (l) {
        return t === r && n === i
          ? l
          : l === 0
            ? 0
            : l === 1
              ? 1
              : En(u(l), r, i);
      };
    };
  });
  var _r = {};
  De(_r, {
    bounce: () => CO,
    bouncePast: () => LO,
    ease: () => YA,
    easeIn: () => QA,
    easeInOut: () => ZA,
    easeOut: () => $A,
    inBack: () => bO,
    inCirc: () => mO,
    inCubic: () => rO,
    inElastic: () => wO,
    inExpo: () => gO,
    inOutBack: () => TO,
    inOutCirc: () => yO,
    inOutCubic: () => iO,
    inOutElastic: () => AO,
    inOutExpo: () => vO,
    inOutQuad: () => tO,
    inOutQuart: () => sO,
    inOutQuint: () => lO,
    inOutSine: () => pO,
    inQuad: () => JA,
    inQuart: () => oO,
    inQuint: () => uO,
    inSine: () => fO,
    outBack: () => IO,
    outBounce: () => _O,
    outCirc: () => EO,
    outCubic: () => nO,
    outElastic: () => xO,
    outExpo: () => hO,
    outQuad: () => eO,
    outQuart: () => aO,
    outQuint: () => cO,
    outSine: () => dO,
    swingFrom: () => SO,
    swingFromTo: () => OO,
    swingTo: () => RO,
  });
  function JA(e) {
    return Math.pow(e, 2);
  }
  function eO(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function tO(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function rO(e) {
    return Math.pow(e, 3);
  }
  function nO(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function iO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function oO(e) {
    return Math.pow(e, 4);
  }
  function aO(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function sO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function uO(e) {
    return Math.pow(e, 5);
  }
  function cO(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function lO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function fO(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function dO(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function pO(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function gO(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function hO(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function vO(e) {
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (e /= 0.5) < 1
          ? 0.5 * Math.pow(2, 10 * (e - 1))
          : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function mO(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function EO(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function yO(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function _O(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function bO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function IO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function TO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function wO(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
  }
  function xO(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
  }
  function AO(e) {
    let t = at,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
  }
  function OO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function SO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function RO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function CO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function LO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
          ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
          : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var yr,
    at,
    YA,
    QA,
    $A,
    ZA,
    ro = me(() => {
      "use strict";
      ((yr = de(to())),
        (at = 1.70158),
        (YA = (0, yr.default)(0.25, 0.1, 0.25, 1)),
        (QA = (0, yr.default)(0.42, 0, 1, 1)),
        ($A = (0, yr.default)(0, 0, 0.58, 1)),
        (ZA = (0, yr.default)(0.42, 0, 0.58, 1)));
    });
  var ld = {};
  De(ld, {
    applyEasing: () => NO,
    createBezierEasing: () => PO,
    optimizeFloat: () => br,
  });
  function br(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function PO(e) {
    return (0, cd.default)(...e);
  }
  function NO(e, t, r) {
    return t === 0
      ? 0
      : t === 1
        ? 1
        : br(r ? (t > 0 ? r(t) : t) : t > 0 && e && _r[e] ? _r[e](t) : t);
  }
  var cd,
    no = me(() => {
      "use strict";
      ro();
      cd = de(to());
    });
  var pd = {};
  De(pd, {
    createElementState: () => dd,
    ixElements: () => KO,
    mergeActionState: () => io,
  });
  function dd(e, t, r, n, i) {
    let o =
      r === DO ? (0, Vt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Vt.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function io(e, t, r, n, i) {
    let o = YO(i);
    return (0, Vt.mergeIn)(e, [t, zO, r], n, o);
  }
  function YO(e) {
    let { config: t } = e;
    return jO.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        a = t[i],
        u = t[o];
      return (a != null && u != null && (r[o] = u), r);
    }, {});
  }
  var Vt,
    $q,
    DO,
    Zq,
    MO,
    FO,
    qO,
    kO,
    XO,
    GO,
    UO,
    WO,
    VO,
    HO,
    BO,
    fd,
    zO,
    KO,
    jO,
    gd = me(() => {
      "use strict";
      Vt = de(Dt());
      Fe();
      (({
        HTML_ELEMENT: $q,
        PLAIN_OBJECT: DO,
        ABSTRACT_NODE: Zq,
        CONFIG_X_VALUE: MO,
        CONFIG_Y_VALUE: FO,
        CONFIG_Z_VALUE: qO,
        CONFIG_VALUE: kO,
        CONFIG_X_UNIT: XO,
        CONFIG_Y_UNIT: GO,
        CONFIG_Z_UNIT: UO,
        CONFIG_UNIT: WO,
      } = Se),
        ({
          IX2_SESSION_STOPPED: VO,
          IX2_INSTANCE_ADDED: HO,
          IX2_ELEMENT_STATE_CHANGED: BO,
        } = Te),
        (fd = {}),
        (zO = "refState"),
        (KO = (e = fd, t = {}) => {
          switch (t.type) {
            case VO:
              return fd;
            case HO: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: a,
                } = t.payload,
                { actionTypeId: u } = o,
                s = e;
              return (
                (0, Vt.getIn)(s, [r, n]) !== n && (s = dd(s, n, a, r, o)),
                io(s, r, u, i, o)
              );
            }
            case BO: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return io(e, r, n, i, o);
            }
            default:
              return e;
          }
        }));
      jO = [
        [MO, XO],
        [FO, GO],
        [qO, UO],
        [kO, WO],
      ];
    });
  var hd = g((oo) => {
    "use strict";
    Object.defineProperty(oo, "__esModule", { value: !0 });
    function QO(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    QO(oo, {
      clearPlugin: function () {
        return nS;
      },
      createPluginInstance: function () {
        return tS;
      },
      getPluginConfig: function () {
        return $O;
      },
      getPluginDestination: function () {
        return eS;
      },
      getPluginDuration: function () {
        return ZO;
      },
      getPluginOrigin: function () {
        return JO;
      },
      renderPlugin: function () {
        return rS;
      },
    });
    var $O = (e) => e.value,
      ZO = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let r = parseFloat(e.getAttribute("data-duration"));
        return r > 0
          ? r * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      JO = (e) => e || { value: 0 },
      eS = (e) => ({ value: e.value }),
      tS = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return (t.stop(), t.setSubframe(!0), t);
      },
      rS = (e, t, r) => {
        if (!e) return;
        let n = t[r.actionTypeId].value / 100;
        e.goToFrame(e.frames * n);
      },
      nS = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var md = g((ao) => {
    "use strict";
    Object.defineProperty(ao, "__esModule", { value: !0 });
    function iS(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    iS(ao, {
      clearPlugin: function () {
        return gS;
      },
      createPluginInstance: function () {
        return dS;
      },
      getPluginConfig: function () {
        return uS;
      },
      getPluginDestination: function () {
        return fS;
      },
      getPluginDuration: function () {
        return cS;
      },
      getPluginOrigin: function () {
        return lS;
      },
      renderPlugin: function () {
        return pS;
      },
    });
    var oS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      aS = () => window.Webflow.require("spline"),
      sS = (e, t) => e.filter((r) => !t.includes(r)),
      uS = (e, t) => e.value[t],
      cS = () => null,
      vd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      lS = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            a = sS(n, o);
          return a.length ? a.reduce((s, l) => ((s[l] = vd[l]), s), e) : e;
        }
        return n.reduce((o, a) => ((o[a] = vd[a]), o), {});
      },
      fS = (e) => e.value,
      dS = (e, t) => {
        let r = t?.config?.target?.pluginElement;
        return r ? oS(r) : null;
      },
      pS = (e, t, r) => {
        let n = aS(),
          i = n.getInstance(e),
          o = r.config.target.objectId,
          a = (u) => {
            if (!u)
              throw new Error("Invalid spline app passed to renderSpline");
            let s = o && u.findObjectById(o);
            if (!s) return;
            let { PLUGIN_SPLINE: l } = t;
            (l.positionX != null && (s.position.x = l.positionX),
              l.positionY != null && (s.position.y = l.positionY),
              l.positionZ != null && (s.position.z = l.positionZ),
              l.rotationX != null && (s.rotation.x = l.rotationX),
              l.rotationY != null && (s.rotation.y = l.rotationY),
              l.rotationZ != null && (s.rotation.z = l.rotationZ),
              l.scaleX != null && (s.scale.x = l.scaleX),
              l.scaleY != null && (s.scale.y = l.scaleY),
              l.scaleZ != null && (s.scale.z = l.scaleZ));
          };
        i ? a(i.spline) : n.setLoadHandler(e, a);
      },
      gS = () => null;
  });
  var Ed = g((co) => {
    "use strict";
    Object.defineProperty(co, "__esModule", { value: !0 });
    function hS(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    hS(co, {
      clearPlugin: function () {
        return wS;
      },
      createPluginInstance: function () {
        return IS;
      },
      getPluginConfig: function () {
        return ES;
      },
      getPluginDestination: function () {
        return bS;
      },
      getPluginDuration: function () {
        return yS;
      },
      getPluginOrigin: function () {
        return _S;
      },
      renderPlugin: function () {
        return TS;
      },
    });
    var so = "--wf-rive-fit",
      uo = "--wf-rive-alignment",
      vS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      mS = () => window.Webflow.require("rive"),
      ES = (e, t) => e.value.inputs[t],
      yS = () => null,
      _S = (e, t) => {
        if (e) return e;
        let r = {},
          { inputs: n = {} } = t.config.value;
        for (let i in n) n[i] == null && (r[i] = 0);
        return r;
      },
      bS = (e) => e.value.inputs ?? {},
      IS = (e, t) => {
        let r = t?.config?.target?.pluginElement;
        return r ? vS(r) : null;
      },
      TS = (e, { PLUGIN_RIVE: t }, r) => {
        let n = mS(),
          i = n.getInstance(e),
          o = n.rive.StateMachineInputType,
          { name: a, inputs: u = {} } = r.config.value || {};
        function s(l) {
          if (l.loaded) b();
          else {
            let f = () => {
              (b(), l?.off("load", f));
            };
            l?.on("load", f);
          }
          function b() {
            let f = l.stateMachineInputs(a);
            if (f != null) {
              if ((l.isPlaying || l.play(a, !1), so in u || uo in u)) {
                let E = l.layout,
                  m = u[so] ?? E.fit,
                  y = u[uo] ?? E.alignment;
                (m !== E.fit || y !== E.alignment) &&
                  (l.layout = E.copyWith({ fit: m, alignment: y }));
              }
              for (let E in u) {
                if (E === so || E === uo) continue;
                let m = f.find((y) => y.name === E);
                if (m != null)
                  switch (m.type) {
                    case o.Boolean: {
                      if (u[E] != null) {
                        let y = !!u[E];
                        m.value = y;
                      }
                      break;
                    }
                    case o.Number: {
                      let y = t[E];
                      y != null && (m.value = y);
                      break;
                    }
                    case o.Trigger: {
                      u[E] && m.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? s(i.rive) : n.setLoadHandler(e, s);
      },
      wS = (e, t) => null;
  });
  var fo = g((lo) => {
    "use strict";
    Object.defineProperty(lo, "__esModule", { value: !0 });
    Object.defineProperty(lo, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return xS;
      },
    });
    var yd = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function xS(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        u = (typeof yd[o] == "string" ? yd[o].toLowerCase() : null) || o;
      if (u.startsWith("#")) {
        let s = u.substring(1);
        s.length === 3 || s.length === 4
          ? ((t = parseInt(s[0] + s[0], 16)),
            (r = parseInt(s[1] + s[1], 16)),
            (n = parseInt(s[2] + s[2], 16)),
            s.length === 4 && (i = parseInt(s[3] + s[3], 16) / 255))
          : (s.length === 6 || s.length === 8) &&
            ((t = parseInt(s.substring(0, 2), 16)),
            (r = parseInt(s.substring(2, 4), 16)),
            (n = parseInt(s.substring(4, 6), 16)),
            s.length === 8 && (i = parseInt(s.substring(6, 8), 16) / 255));
      } else if (u.startsWith("rgba")) {
        let s = u.match(/rgba\(([^)]+)\)/)[1].split(",");
        ((t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)),
          (i = parseFloat(s[3])));
      } else if (u.startsWith("rgb")) {
        let s = u.match(/rgb\(([^)]+)\)/)[1].split(",");
        ((t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)));
      } else if (u.startsWith("hsla")) {
        let s = u.match(/hsla\(([^)]+)\)/)[1].split(","),
          l = parseFloat(s[0]),
          b = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100;
        i = parseFloat(s[3]);
        let E = (1 - Math.abs(2 * f - 1)) * b,
          m = E * (1 - Math.abs(((l / 60) % 2) - 1)),
          y = f - E / 2,
          T,
          A,
          w;
        (l >= 0 && l < 60
          ? ((T = E), (A = m), (w = 0))
          : l >= 60 && l < 120
            ? ((T = m), (A = E), (w = 0))
            : l >= 120 && l < 180
              ? ((T = 0), (A = E), (w = m))
              : l >= 180 && l < 240
                ? ((T = 0), (A = m), (w = E))
                : l >= 240 && l < 300
                  ? ((T = m), (A = 0), (w = E))
                  : ((T = E), (A = 0), (w = m)),
          (t = Math.round((T + y) * 255)),
          (r = Math.round((A + y) * 255)),
          (n = Math.round((w + y) * 255)));
      } else if (u.startsWith("hsl")) {
        let s = u.match(/hsl\(([^)]+)\)/)[1].split(","),
          l = parseFloat(s[0]),
          b = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100,
          E = (1 - Math.abs(2 * f - 1)) * b,
          m = E * (1 - Math.abs(((l / 60) % 2) - 1)),
          y = f - E / 2,
          T,
          A,
          w;
        (l >= 0 && l < 60
          ? ((T = E), (A = m), (w = 0))
          : l >= 60 && l < 120
            ? ((T = m), (A = E), (w = 0))
            : l >= 120 && l < 180
              ? ((T = 0), (A = E), (w = m))
              : l >= 180 && l < 240
                ? ((T = 0), (A = m), (w = E))
                : l >= 240 && l < 300
                  ? ((T = m), (A = 0), (w = E))
                  : ((T = E), (A = 0), (w = m)),
          (t = Math.round((T + y) * 255)),
          (r = Math.round((A + y) * 255)),
          (n = Math.round((w + y) * 255)));
      }
      if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`,
        );
      return { red: t, green: r, blue: n, alpha: i };
    }
  });
  var _d = g((po) => {
    "use strict";
    Object.defineProperty(po, "__esModule", { value: !0 });
    function AS(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    AS(po, {
      clearPlugin: function () {
        return DS;
      },
      createPluginInstance: function () {
        return PS;
      },
      getPluginConfig: function () {
        return SS;
      },
      getPluginDestination: function () {
        return LS;
      },
      getPluginDuration: function () {
        return RS;
      },
      getPluginOrigin: function () {
        return CS;
      },
      renderPlugin: function () {
        return NS;
      },
    });
    var OS = fo(),
      SS = (e, t) => e.value[t],
      RS = () => null,
      CS = (e, t) => {
        if (e) return e;
        let r = t.config.value,
          n = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(n);
        if (r.size != null) return { size: parseInt(i, 10) };
        if (r.red != null && r.green != null && r.blue != null)
          return (0, OS.normalizeColor)(i);
      },
      LS = (e) => e.value,
      PS = () => null,
      NS = (e, t, r) => {
        let n = r.config.target.objectId,
          i = r.config.value.unit,
          { PLUGIN_VARIABLE: o } = t,
          { size: a, red: u, green: s, blue: l, alpha: b } = o,
          f;
        (a != null && (f = a + i),
          u != null &&
            l != null &&
            s != null &&
            b != null &&
            (f = `rgba(${u}, ${s}, ${l}, ${b})`),
          f != null && document.documentElement.style.setProperty(n, f));
      },
      DS = (e, t) => {
        let r = t.config.target.objectId;
        document.documentElement.style.removeProperty(r);
      };
  });
  var Id = g((go) => {
    "use strict";
    Object.defineProperty(go, "__esModule", { value: !0 });
    Object.defineProperty(go, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return XS;
      },
    });
    var yn = (Fe(), Qe(xs)),
      MS = _n(hd()),
      FS = _n(md()),
      qS = _n(Ed()),
      kS = _n(_d());
    function bd(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (bd = function (n) {
        return n ? r : t;
      })(e);
    }
    function _n(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var r = bd(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, o, a)
            : (n[o] = e[o]);
        }
      return ((n.default = e), r && r.set(e, n), n);
    }
    var XS = new Map([
      [yn.ActionTypeConsts.PLUGIN_LOTTIE, { ...MS }],
      [yn.ActionTypeConsts.PLUGIN_SPLINE, { ...FS }],
      [yn.ActionTypeConsts.PLUGIN_RIVE, { ...qS }],
      [yn.ActionTypeConsts.PLUGIN_VARIABLE, { ...kS }],
    ]);
  });
  var Td = {};
  De(Td, {
    clearPlugin: () => _o,
    createPluginInstance: () => US,
    getPluginConfig: () => vo,
    getPluginDestination: () => Eo,
    getPluginDuration: () => GS,
    getPluginOrigin: () => mo,
    isPluginType: () => It,
    renderPlugin: () => yo,
  });
  function It(e) {
    return ho.pluginMethodMap.has(e);
  }
  var ho,
    Tt,
    vo,
    mo,
    GS,
    Eo,
    US,
    yo,
    _o,
    bo = me(() => {
      "use strict";
      vn();
      ho = de(Id());
      ((Tt = (e) => (t) => {
        if (!ze) return () => null;
        let r = ho.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (vo = Tt("getPluginConfig")),
        (mo = Tt("getPluginOrigin")),
        (GS = Tt("getPluginDuration")),
        (Eo = Tt("getPluginDestination")),
        (US = Tt("createPluginInstance")),
        (yo = Tt("renderPlugin")),
        (_o = Tt("clearPlugin")));
    });
  var xd = g((ak, wd) => {
    function WS(e, t) {
      return e == null || e !== e ? t : e;
    }
    wd.exports = WS;
  });
  var Od = g((sk, Ad) => {
    function VS(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Ad.exports = VS;
  });
  var Rd = g((uk, Sd) => {
    function HS(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), a = n(t), u = a.length; u--; ) {
          var s = a[e ? u : ++i];
          if (r(o[s], s, o) === !1) break;
        }
        return t;
      };
    }
    Sd.exports = HS;
  });
  var Ld = g((ck, Cd) => {
    var BS = Rd(),
      zS = BS();
    Cd.exports = zS;
  });
  var Io = g((lk, Pd) => {
    var KS = Ld(),
      jS = hr();
    function YS(e, t) {
      return e && KS(e, t, jS);
    }
    Pd.exports = YS;
  });
  var Dd = g((fk, Nd) => {
    var QS = _t();
    function $S(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!QS(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, a = Object(r);
          (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;
        );
        return r;
      };
    }
    Nd.exports = $S;
  });
  var To = g((dk, Md) => {
    var ZS = Io(),
      JS = Dd(),
      eR = JS(ZS);
    Md.exports = eR;
  });
  var qd = g((pk, Fd) => {
    function tR(e, t, r, n, i) {
      return (
        i(e, function (o, a, u) {
          r = n ? ((n = !1), o) : t(r, o, a, u);
        }),
        r
      );
    }
    Fd.exports = tR;
  });
  var Xd = g((gk, kd) => {
    var rR = Od(),
      nR = To(),
      iR = pt(),
      oR = qd(),
      aR = we();
    function sR(e, t, r) {
      var n = aR(e) ? rR : oR,
        i = arguments.length < 3;
      return n(e, iR(t, 4), r, i, nR);
    }
    kd.exports = sR;
  });
  var Ud = g((hk, Gd) => {
    var uR = $i(),
      cR = pt(),
      lR = Zi(),
      fR = Math.max,
      dR = Math.min;
    function pR(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = lR(r)), (i = r < 0 ? fR(n + i, 0) : dR(i, n - 1))),
        uR(e, cR(t, 3), i, !0)
      );
    }
    Gd.exports = pR;
  });
  var Vd = g((vk, Wd) => {
    var gR = Qi(),
      hR = Ud(),
      vR = gR(hR);
    Wd.exports = vR;
  });
  function Hd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function mR(e, t) {
    if (Hd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!Object.hasOwn(t, r[i]) || !Hd(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var wo,
    Bd = me(() => {
      "use strict";
      wo = mR;
    });
  var cp = {};
  De(cp, {
    cleanupHTMLElement: () => gC,
    clearAllStyles: () => pC,
    clearObjectCache: () => DR,
    getActionListProgress: () => vC,
    getAffectedElements: () => Ro,
    getComputedStyle: () => WR,
    getDestinationValues: () => YR,
    getElementId: () => kR,
    getInstanceId: () => FR,
    getInstanceOrigin: () => BR,
    getItemConfigByKey: () => jR,
    getMaxDurationItemIndex: () => up,
    getNamespacedParameterId: () => yC,
    getRenderType: () => op,
    getStyleProp: () => QR,
    mediaQueriesEqual: () => bC,
    observeStore: () => UR,
    reduceListToGroup: () => mC,
    reifyState: () => XR,
    renderHTMLElement: () => $R,
    shallowEqual: () => wo,
    shouldAllowMediaQuery: () => _C,
    shouldNamespaceEventParameter: () => EC,
    stringifyTarget: () => IC,
  });
  function DR() {
    bn.clear();
  }
  function FR() {
    return "i" + MR++;
  }
  function kR(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + qR++;
  }
  function XR({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, xn.default)(
        e,
        (a, u) => {
          let { eventTypeId: s } = u;
          return (a[s] || (a[s] = {}), (a[s][u.id] = u), a);
        },
        {},
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((a) => a.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function UR({ store: e, select: t, onChange: r, comparator: n = GR }) {
    let { getState: i, subscribe: o } = e,
      a = o(s),
      u = t(i());
    function s() {
      let l = t(i());
      if (l == null) {
        a();
        return;
      }
      n(l, u) || ((u = l), r(u, e));
    }
    return a;
  }
  function jd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: a,
        useEventTarget: u,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: a,
        useEventTarget: u,
      };
    }
    return {};
  }
  function Ro({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (C, I) =>
          C.concat(
            Ro({
              config: { target: I },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            }),
          ),
        [],
      );
    let {
        getValidDocument: a,
        getQuerySelector: u,
        queryDocument: s,
        getChildElements: l,
        getSiblingElements: b,
        matchSelector: f,
        elementContains: E,
        isSiblingNode: m,
      } = i,
      { target: y } = e;
    if (!y) return [];
    let {
      id: T,
      objectId: A,
      selector: w,
      selectorGuids: N,
      appliesTo: L,
      useEventTarget: F,
    } = jd(y);
    if (A) return [bn.has(A) ? bn.get(A) : bn.set(A, {}).get(A)];
    if (L === Ii.PAGE) {
      let C = a(T);
      return C ? [C] : [];
    }
    let q = (t?.action?.config?.affectedElements ?? {})[T || w] || {},
      j = !!(q.id || q.selector),
      K,
      Q,
      te,
      z = t && u(jd(t.target));
    if (
      (j
        ? ((K = q.limitAffectedElements), (Q = z), (te = u(q)))
        : (Q = te = u({ id: T, selector: w, selectorGuids: N })),
      t && F)
    ) {
      let C = r && (te || F === !0) ? [r] : s(z);
      if (te) {
        if (F === LR) return s(te).filter((I) => C.some((P) => E(I, P)));
        if (F === zd) return s(te).filter((I) => C.some((P) => E(P, I)));
        if (F === Kd) return s(te).filter((I) => C.some((P) => m(P, I)));
      }
      return C;
    }
    return Q == null || te == null
      ? []
      : ze && n
        ? s(te).filter((C) => n.contains(C))
        : K === zd
          ? s(Q, te)
          : K === CR
            ? l(s(Q)).filter(f(te))
            : K === Kd
              ? b(s(Q)).filter(f(te))
              : s(te);
  }
  function WR({ element: e, actionItem: t }) {
    if (!ze) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case jt:
      case Yt:
      case Qt:
      case $t:
      case On:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function BR(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: a } = n;
    if (It(a)) return mo(a)(t[a], n);
    switch (n.actionTypeId) {
      case Bt:
      case zt:
      case Kt:
      case xr:
        return t[n.actionTypeId] || Co[n.actionTypeId];
      case Ar:
        return VR(t[n.actionTypeId], n.config.filters);
      case Or:
        return HR(t[n.actionTypeId], n.config.fontVariations);
      case rp:
        return { value: (0, st.default)(parseFloat(o(e, Tn)), 1) };
      case jt: {
        let u = o(e, tt),
          s = o(e, rt),
          l,
          b;
        return (
          n.config.widthUnit === ht
            ? (l = Yd.test(u) ? parseFloat(u) : parseFloat(r.width))
            : (l = (0, st.default)(parseFloat(u), parseFloat(r.width))),
          n.config.heightUnit === ht
            ? (b = Yd.test(s) ? parseFloat(s) : parseFloat(r.height))
            : (b = (0, st.default)(parseFloat(s), parseFloat(r.height))),
          { widthValue: l, heightValue: b }
        );
      }
      case Yt:
      case Qt:
      case $t:
        return lC({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case On:
        return { value: (0, st.default)(o(e, wn), r.display) };
      case NR:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function YR({ element: e, actionItem: t, elementApi: r }) {
    if (It(t.actionTypeId)) return Eo(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Bt:
      case zt:
      case Kt:
      case xr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case jt: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: a, heightUnit: u } = t.config,
          { widthValue: s, heightValue: l } = t.config;
        if (!ze) return { widthValue: s, heightValue: l };
        if (a === ht) {
          let b = n(e, tt);
          (i(e, tt, ""), (s = o(e, "offsetWidth")), i(e, tt, b));
        }
        if (u === ht) {
          let b = n(e, rt);
          (i(e, rt, ""), (l = o(e, "offsetHeight")), i(e, rt, b));
        }
        return { widthValue: s, heightValue: l };
      }
      case Yt:
      case Qt:
      case $t: {
        let {
          rValue: n,
          gValue: i,
          bValue: o,
          aValue: a,
          globalSwatchId: u,
        } = t.config;
        if (u && u.startsWith("--")) {
          let { getStyle: s } = r,
            l = s(e, u),
            b = (0, Zd.normalizeColor)(l);
          return {
            rValue: b.red,
            gValue: b.green,
            bValue: b.blue,
            aValue: b.alpha,
          };
        }
        return { rValue: n, gValue: i, bValue: o, aValue: a };
      }
      case Ar:
        return t.config.filters.reduce(zR, {});
      case Or:
        return t.config.fontVariations.reduce(KR, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function op(e) {
    if (/^TRANSFORM_/.test(e)) return ep;
    if (/^STYLE_/.test(e)) return Oo;
    if (/^GENERAL_/.test(e)) return Ao;
    if (/^PLUGIN_/.test(e)) return tp;
  }
  function QR(e, t) {
    return e === Oo ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function $R(e, t, r, n, i, o, a, u, s) {
    switch (u) {
      case ep:
        return rC(e, t, r, i, a);
      case Oo:
        return fC(e, t, r, i, o, a);
      case Ao:
        return dC(e, i, a);
      case tp: {
        let { actionTypeId: l } = i;
        if (It(l)) return yo(l)(s, t, i);
      }
    }
  }
  function rC(e, t, r, n, i) {
    let o = tC
        .map((u) => {
          let s = Co[u],
            {
              xValue: l = s.xValue,
              yValue: b = s.yValue,
              zValue: f = s.zValue,
              xUnit: E = "",
              yUnit: m = "",
              zUnit: y = "",
            } = t[u] || {};
          switch (u) {
            case Bt:
              return `${_R}(${l}${E}, ${b}${m}, ${f}${y})`;
            case zt:
              return `${bR}(${l}${E}, ${b}${m}, ${f}${y})`;
            case Kt:
              return `${IR}(${l}${E}) ${TR}(${b}${m}) ${wR}(${f}${y})`;
            case xr:
              return `${xR}(${l}${E}, ${b}${m})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: a } = i;
    (wt(e, gt, i), a(e, gt, o), oC(n, r) && a(e, hn, AR));
  }
  function nC(e, t, r, n) {
    let i = (0, xn.default)(t, (a, u, s) => `${a} ${s}(${u}${eC(s, r)})`, ""),
      { setStyle: o } = n;
    (wt(e, Ir, n), o(e, Ir, i));
  }
  function iC(e, t, r, n) {
    let i = (0, xn.default)(
        t,
        (a, u, s) => (a.push(`"${s}" ${u}`), a),
        [],
      ).join(", "),
      { setStyle: o } = n;
    (wt(e, Tr, n), o(e, Tr, i));
  }
  function oC({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === Bt && n !== void 0) ||
      (e === zt && n !== void 0) ||
      (e === Kt && (t !== void 0 || r !== void 0))
    );
  }
  function cC(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function lC({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = So[t],
      o = n(e, i),
      a = sC.test(o) ? o : r[i],
      u = cC(uC, a).split(wr);
    return {
      rValue: (0, st.default)(parseInt(u[0], 10), 255),
      gValue: (0, st.default)(parseInt(u[1], 10), 255),
      bValue: (0, st.default)(parseInt(u[2], 10), 255),
      aValue: (0, st.default)(parseFloat(u[3]), 1),
    };
  }
  function fC(e, t, r, n, i, o) {
    let { setStyle: a } = o;
    switch (n.actionTypeId) {
      case jt: {
        let { widthUnit: u = "", heightUnit: s = "" } = n.config,
          { widthValue: l, heightValue: b } = r;
        (l !== void 0 &&
          (u === ht && (u = "px"), wt(e, tt, o), a(e, tt, l + u)),
          b !== void 0 &&
            (s === ht && (s = "px"), wt(e, rt, o), a(e, rt, b + s)));
        break;
      }
      case Ar: {
        nC(e, r, n.config, o);
        break;
      }
      case Or: {
        iC(e, r, n.config, o);
        break;
      }
      case Yt:
      case Qt:
      case $t: {
        let u = So[n.actionTypeId],
          s = Math.round(r.rValue),
          l = Math.round(r.gValue),
          b = Math.round(r.bValue),
          f = r.aValue;
        (wt(e, u, o),
          a(
            e,
            u,
            f >= 1 ? `rgb(${s},${l},${b})` : `rgba(${s},${l},${b},${f})`,
          ));
        break;
      }
      default: {
        let { unit: u = "" } = n.config;
        (wt(e, i, o), a(e, i, r.value + u));
        break;
      }
    }
  }
  function dC(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case On: {
        let { value: i } = t.config;
        i === OR && ze ? n(e, wn, eo) : n(e, wn, i);
        return;
      }
    }
  }
  function wt(e, t, r) {
    if (!ze) return;
    let n = ip[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      a = i(e, Ht);
    if (!a) {
      o(e, Ht, n);
      return;
    }
    let u = a.split(wr).map(np);
    u.indexOf(n) === -1 && o(e, Ht, u.concat(n).join(wr));
  }
  function ap(e, t, r) {
    if (!ze) return;
    let n = ip[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      a = i(e, Ht);
    !a ||
      a.indexOf(n) === -1 ||
      o(
        e,
        Ht,
        a
          .split(wr)
          .map(np)
          .filter((u) => u !== n)
          .join(wr),
      );
  }
  function pC({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    (Object.keys(n).forEach((o) => {
      let a = n[o],
        { config: u } = a.action,
        { actionListId: s } = u,
        l = i[s];
      l && Qd({ actionList: l, event: a, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Qd({ actionList: i[o], elementApi: t });
      }));
  }
  function Qd({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    (n &&
      n.forEach((o) => {
        $d({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: a } = o;
          a.forEach((u) => {
            $d({ actionGroup: u, event: t, elementApi: r });
          });
        }));
  }
  function $d({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: a } = i,
        u;
      (It(o)
        ? (u = (s) => _o(o)(s, i))
        : (u = sp({ effect: hC, actionTypeId: o, elementApi: r })),
        Ro({ config: a, event: t, elementApi: r }).forEach(u));
    });
  }
  function gC(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === jt) {
      let { config: a } = t;
      (a.widthUnit === ht && n(e, tt, ""), a.heightUnit === ht && n(e, rt, ""));
    }
    i(e, Ht) && sp({ effect: ap, actionTypeId: o, elementApi: r })(e);
  }
  function hC(e, t, r) {
    let { setStyle: n } = r;
    (ap(e, t, r), n(e, t, ""), t === gt && n(e, hn, ""));
  }
  function up(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          a = o.delay + o.duration;
        a >= t && ((t = a), (r = i));
      }),
      r
    );
  }
  function vC(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      a = 0,
      u = 0;
    return (
      r.forEach((s, l) => {
        if (n && l === 0) return;
        let { actionItems: b } = s,
          f = b[up(b)],
          { config: E, actionTypeId: m } = f;
        i.id === f.id && (u = a + o);
        let y = op(m) === Ao ? 0 : E.duration;
        a += E.delay + y;
      }),
      a > 0 ? br(u / a) : 0
    );
  }
  function mC({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      a = (u) => (
        o.push((0, An.mergeIn)(u, ["config"], { delay: 0, duration: 0 })),
        u.id === t
      );
    return (
      n && n.some(({ actionItems: u }) => u.some(a)),
      i &&
        i.some((u) => {
          let { continuousActionGroups: s } = u;
          return s.some(({ actionItems: l }) => l.some(a));
        }),
      (0, An.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function EC(e, { basedOn: t }) {
    return (
      (e === Be.SCROLLING_IN_VIEW && (t === Je.ELEMENT || t == null)) ||
      (e === Be.MOUSE_MOVE && t === Je.ELEMENT)
    );
  }
  function yC(e, t) {
    return e + PR + t;
  }
  function _C(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function bC(e, t) {
    return wo(e && e.sort(), t && t.sort());
  }
  function IC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + xo + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + xo + r + xo + n;
  }
  var st,
    xn,
    In,
    An,
    Zd,
    ER,
    yR,
    _R,
    bR,
    IR,
    TR,
    wR,
    xR,
    AR,
    OR,
    Tn,
    Ir,
    Tr,
    tt,
    rt,
    Jd,
    SR,
    RR,
    zd,
    CR,
    Kd,
    LR,
    wn,
    Ht,
    ht,
    wr,
    PR,
    xo,
    ep,
    Ao,
    Oo,
    tp,
    Bt,
    zt,
    Kt,
    xr,
    rp,
    Ar,
    Or,
    jt,
    Yt,
    Qt,
    $t,
    On,
    NR,
    np,
    So,
    ip,
    bn,
    MR,
    qR,
    GR,
    Yd,
    VR,
    HR,
    zR,
    KR,
    jR,
    Co,
    ZR,
    JR,
    eC,
    tC,
    aC,
    sC,
    uC,
    sp,
    lp = me(() => {
      "use strict";
      ((st = de(xd())), (xn = de(Xd())), (In = de(Vd())), (An = de(Dt())));
      Fe();
      Bd();
      no();
      Zd = de(fo());
      bo();
      vn();
      (({
        BACKGROUND: ER,
        TRANSFORM: yR,
        TRANSLATE_3D: _R,
        SCALE_3D: bR,
        ROTATE_X: IR,
        ROTATE_Y: TR,
        ROTATE_Z: wR,
        SKEW: xR,
        PRESERVE_3D: AR,
        FLEX: OR,
        OPACITY: Tn,
        FILTER: Ir,
        FONT_VARIATION_SETTINGS: Tr,
        WIDTH: tt,
        HEIGHT: rt,
        BACKGROUND_COLOR: Jd,
        BORDER_COLOR: SR,
        COLOR: RR,
        CHILDREN: zd,
        IMMEDIATE_CHILDREN: CR,
        SIBLINGS: Kd,
        PARENT: LR,
        DISPLAY: wn,
        WILL_CHANGE: Ht,
        AUTO: ht,
        COMMA_DELIMITER: wr,
        COLON_DELIMITER: PR,
        BAR_DELIMITER: xo,
        RENDER_TRANSFORM: ep,
        RENDER_GENERAL: Ao,
        RENDER_STYLE: Oo,
        RENDER_PLUGIN: tp,
      } = Se),
        ({
          TRANSFORM_MOVE: Bt,
          TRANSFORM_SCALE: zt,
          TRANSFORM_ROTATE: Kt,
          TRANSFORM_SKEW: xr,
          STYLE_OPACITY: rp,
          STYLE_FILTER: Ar,
          STYLE_FONT_VARIATION: Or,
          STYLE_SIZE: jt,
          STYLE_BACKGROUND_COLOR: Yt,
          STYLE_BORDER: Qt,
          STYLE_TEXT_COLOR: $t,
          GENERAL_DISPLAY: On,
          OBJECT_VALUE: NR,
        } = Me),
        (np = (e) => e.trim()),
        (So = Object.freeze({ [Yt]: Jd, [Qt]: SR, [$t]: RR })),
        (ip = Object.freeze({
          [gt]: yR,
          [Jd]: ER,
          [Tn]: Tn,
          [Ir]: Ir,
          [tt]: tt,
          [rt]: rt,
          [Tr]: Tr,
        })),
        (bn = new Map()));
      MR = 1;
      qR = 1;
      GR = (e, t) => e === t;
      ((Yd = /px/),
        (VR = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = ZR[n.type]), r),
            e || {},
          )),
        (HR = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = JR[n.type] || n.defaultValue || 0),
              r
            ),
            e || {},
          )));
      ((zR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (KR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (jR = (e, t, r) => {
          if (It(e)) return vo(e)(r, t);
          switch (e) {
            case Ar: {
              let n = (0, In.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Or: {
              let n = (0, In.default)(
                r.fontVariations,
                ({ type: i }) => i === t,
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        }));
      ((Co = {
        [Bt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [zt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Kt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [xr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (ZR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (JR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (eC = (e, t) => {
          let r = (0, In.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (tC = Object.keys(Co)));
      ((aC = "\\(([^)]+)\\)"), (sC = /^rgb/), (uC = RegExp(`rgba?${aC}`)));
      sp =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case Bt:
            case zt:
            case Kt:
            case xr:
              e(n, gt, r);
              break;
            case Ar:
              e(n, Ir, r);
              break;
            case Or:
              e(n, Tr, r);
              break;
            case rp:
              e(n, Tn, r);
              break;
            case jt:
              (e(n, tt, r), e(n, rt, r));
              break;
            case Yt:
            case Qt:
            case $t:
              e(n, So[t], r);
              break;
            case On:
              e(n, wn, r);
              break;
          }
        };
    });
  var xt = g((Lo) => {
    "use strict";
    Object.defineProperty(Lo, "__esModule", { value: !0 });
    function TC(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    TC(Lo, {
      IX2BrowserSupport: function () {
        return wC;
      },
      IX2EasingUtils: function () {
        return AC;
      },
      IX2Easings: function () {
        return xC;
      },
      IX2ElementsReducer: function () {
        return OC;
      },
      IX2VanillaPlugins: function () {
        return SC;
      },
      IX2VanillaUtils: function () {
        return RC;
      },
    });
    var wC = Zt((vn(), Qe(nd))),
      xC = Zt((ro(), Qe(_r))),
      AC = Zt((no(), Qe(ld))),
      OC = Zt((gd(), Qe(pd))),
      SC = Zt((bo(), Qe(Td))),
      RC = Zt((lp(), Qe(cp)));
    function fp(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (fp = function (n) {
        return n ? r : t;
      })(e);
    }
    function Zt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var r = fp(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, o, a)
            : (n[o] = e[o]);
        }
      return ((n.default = e), r && r.set(e, n), n);
    }
  });
  var Rn,
    ut,
    CC,
    LC,
    PC,
    NC,
    DC,
    MC,
    Sn,
    dp,
    FC,
    qC,
    Po,
    kC,
    XC,
    GC,
    UC,
    pp,
    gp = me(() => {
      "use strict";
      Fe();
      ((Rn = de(xt())),
        (ut = de(Dt())),
        ({
          IX2_RAW_DATA_IMPORTED: CC,
          IX2_SESSION_STOPPED: LC,
          IX2_INSTANCE_ADDED: PC,
          IX2_INSTANCE_STARTED: NC,
          IX2_INSTANCE_REMOVED: DC,
          IX2_ANIMATION_FRAME_CHANGED: MC,
        } = Te),
        ({
          optimizeFloat: Sn,
          applyEasing: dp,
          createBezierEasing: FC,
        } = Rn.IX2EasingUtils),
        ({ RENDER_GENERAL: qC } = Se),
        ({
          getItemConfigByKey: Po,
          getRenderType: kC,
          getStyleProp: XC,
        } = Rn.IX2VanillaUtils),
        (GC = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: a,
              restingValue: u,
              actionTypeId: s,
              customEasingFn: l,
              skipMotion: b,
              skipToValue: f,
            } = e,
            { parameters: E } = t.payload,
            m = Math.max(1 - a, 0.01),
            y = E[n];
          y == null && ((m = 1), (y = u));
          let T = Math.max(y, 0) || 0,
            A = Sn(T - r),
            w = b ? f : Sn(r + A * m),
            N = w * 100;
          if (w === r && e.current) return e;
          let L, F, k, q;
          for (let K = 0, { length: Q } = i; K < Q; K++) {
            let { keyframe: te, actionItems: z } = i[K];
            if ((K === 0 && (L = z[0]), N >= te)) {
              L = z[0];
              let C = i[K + 1],
                I = C && N !== te;
              ((F = I ? C.actionItems[0] : null),
                I && ((k = te / 100), (q = (C.keyframe - te) / 100)));
            }
          }
          let j = {};
          if (L && !F)
            for (let K = 0, { length: Q } = o; K < Q; K++) {
              let te = o[K];
              j[te] = Po(s, te, L.config);
            }
          else if (L && F && k !== void 0 && q !== void 0) {
            let K = (w - k) / q,
              Q = L.config.easing,
              te = dp(Q, K, l);
            for (let z = 0, { length: C } = o; z < C; z++) {
              let I = o[z],
                P = Po(s, I, L.config),
                ee = (Po(s, I, F.config) - P) * te + P;
              j[I] = ee;
            }
          }
          return (0, ut.merge)(e, { position: w, current: j });
        }),
        (UC = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: a,
              verbose: u,
              actionItem: s,
              destination: l,
              destinationKeys: b,
              pluginDuration: f,
              instanceDelay: E,
              customEasingFn: m,
              skipMotion: y,
            } = e,
            T = s.config.easing,
            { duration: A, delay: w } = s.config;
          (f != null && (A = f),
            (w = E ?? w),
            a === qC ? (A = 0) : (o || y) && (A = w = 0));
          let { now: N } = t.payload;
          if (r && n) {
            let L = N - (i + w);
            if (u) {
              let K = N - i,
                Q = A + w,
                te = Sn(Math.min(Math.max(0, K / Q), 1));
              e = (0, ut.set)(e, "verboseTimeElapsed", Q * te);
            }
            if (L < 0) return e;
            let F = Sn(Math.min(Math.max(0, L / A), 1)),
              k = dp(T, F, m),
              q = {},
              j = null;
            return (
              b.length &&
                (j = b.reduce((K, Q) => {
                  let te = l[Q],
                    z = parseFloat(n[Q]) || 0,
                    I = (parseFloat(te) - z) * k + z;
                  return ((K[Q] = I), K);
                }, {})),
              (q.current = j),
              (q.position = F),
              F === 1 && ((q.active = !1), (q.complete = !0)),
              (0, ut.merge)(e, q)
            );
          }
          return e;
        }),
        (pp = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case CC:
              return t.payload.ixInstances || Object.freeze({});
            case LC:
              return Object.freeze({});
            case PC: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: a,
                  eventStateKey: u,
                  actionListId: s,
                  groupIndex: l,
                  isCarrier: b,
                  origin: f,
                  destination: E,
                  immediate: m,
                  verbose: y,
                  continuous: T,
                  parameterId: A,
                  actionGroups: w,
                  smoothing: N,
                  restingValue: L,
                  pluginInstance: F,
                  pluginDuration: k,
                  instanceDelay: q,
                  skipMotion: j,
                  skipToValue: K,
                } = t.payload,
                { actionTypeId: Q } = i,
                te = kC(Q),
                z = XC(te, Q),
                C = Object.keys(E).filter(
                  (P) => E[P] != null && typeof E[P] != "string",
                ),
                { easing: I } = i.config;
              return (0, ut.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: f,
                destination: E,
                destinationKeys: C,
                immediate: m,
                verbose: y,
                current: null,
                actionItem: i,
                actionTypeId: Q,
                eventId: o,
                eventTarget: a,
                eventStateKey: u,
                actionListId: s,
                groupIndex: l,
                renderType: te,
                isCarrier: b,
                styleProp: z,
                continuous: T,
                parameterId: A,
                actionGroups: w,
                smoothing: N,
                restingValue: L,
                pluginInstance: F,
                pluginDuration: k,
                instanceDelay: q,
                skipMotion: j,
                skipToValue: K,
                customEasingFn:
                  Array.isArray(I) && I.length === 4 ? FC(I) : void 0,
              });
            }
            case NC: {
              let { instanceId: r, time: n } = t.payload;
              return (0, ut.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case DC: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let a = 0; a < o; a++) {
                let u = i[a];
                u !== r && (n[u] = e[u]);
              }
              return n;
            }
            case MC: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let a = n[o],
                  u = e[a],
                  s = u.continuous ? GC : UC;
                r = (0, ut.set)(r, a, s(u, t));
              }
              return r;
            }
            default:
              return e;
          }
        }));
    });
  var WC,
    VC,
    HC,
    hp,
    vp = me(() => {
      "use strict";
      Fe();
      (({
        IX2_RAW_DATA_IMPORTED: WC,
        IX2_SESSION_STOPPED: VC,
        IX2_PARAMETER_CHANGED: HC,
      } = Te),
        (hp = (e = {}, t) => {
          switch (t.type) {
            case WC:
              return t.payload.ixParameters || {};
            case VC:
              return {};
            case HC: {
              let { key: r, value: n } = t.payload;
              return ((e[r] = n), e);
            }
            default:
              return e;
          }
        }));
    });
  var yp = {};
  De(yp, { default: () => zC });
  var mp,
    Ep,
    BC,
    zC,
    _p = me(() => {
      "use strict";
      mp = de(bi());
      Os();
      js();
      $s();
      Ep = de(xt());
      gp();
      vp();
      (({ ixElements: BC } = Ep.IX2ElementsReducer),
        (zC = (0, mp.combineReducers)({
          ixData: As,
          ixRequest: Ks,
          ixSession: Qs,
          ixElements: BC,
          ixInstances: pp,
          ixParameters: hp,
        })));
    });
  var Ip = g((Dk, bp) => {
    var KC = ft(),
      jC = we(),
      YC = ot(),
      QC = "[object String]";
    function $C(e) {
      return typeof e == "string" || (!jC(e) && YC(e) && KC(e) == QC);
    }
    bp.exports = $C;
  });
  var wp = g((Mk, Tp) => {
    var ZC = Yi(),
      JC = ZC("length");
    Tp.exports = JC;
  });
  var Ap = g((Fk, xp) => {
    var eL = "\\ud800-\\udfff",
      tL = "\\u0300-\\u036f",
      rL = "\\ufe20-\\ufe2f",
      nL = "\\u20d0-\\u20ff",
      iL = tL + rL + nL,
      oL = "\\ufe0e\\ufe0f",
      aL = "\\u200d",
      sL = RegExp("[" + aL + eL + iL + oL + "]");
    function uL(e) {
      return sL.test(e);
    }
    xp.exports = uL;
  });
  var Mp = g((qk, Dp) => {
    var Sp = "\\ud800-\\udfff",
      cL = "\\u0300-\\u036f",
      lL = "\\ufe20-\\ufe2f",
      fL = "\\u20d0-\\u20ff",
      dL = cL + lL + fL,
      pL = "\\ufe0e\\ufe0f",
      gL = "[" + Sp + "]",
      No = "[" + dL + "]",
      Do = "\\ud83c[\\udffb-\\udfff]",
      hL = "(?:" + No + "|" + Do + ")",
      Rp = "[^" + Sp + "]",
      Cp = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Lp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      vL = "\\u200d",
      Pp = hL + "?",
      Np = "[" + pL + "]?",
      mL = "(?:" + vL + "(?:" + [Rp, Cp, Lp].join("|") + ")" + Np + Pp + ")*",
      EL = Np + Pp + mL,
      yL = "(?:" + [Rp + No + "?", No, Cp, Lp, gL].join("|") + ")",
      Op = RegExp(Do + "(?=" + Do + ")|" + yL + EL, "g");
    function _L(e) {
      for (var t = (Op.lastIndex = 0); Op.test(e); ) ++t;
      return t;
    }
    Dp.exports = _L;
  });
  var qp = g((kk, Fp) => {
    var bL = wp(),
      IL = Ap(),
      TL = Mp();
    function wL(e) {
      return IL(e) ? TL(e) : bL(e);
    }
    Fp.exports = wL;
  });
  var Xp = g((Xk, kp) => {
    var xL = an(),
      AL = sn(),
      OL = _t(),
      SL = Ip(),
      RL = qp(),
      CL = "[object Map]",
      LL = "[object Set]";
    function PL(e) {
      if (e == null) return 0;
      if (OL(e)) return SL(e) ? RL(e) : e.length;
      var t = AL(e);
      return t == CL || t == LL ? e.size : xL(e).length;
    }
    kp.exports = PL;
  });
  var Up = g((Gk, Gp) => {
    var NL = "Expected a function";
    function DL(e) {
      if (typeof e != "function") throw new TypeError(NL);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Gp.exports = DL;
  });
  var Mo = g((Uk, Wp) => {
    var ML = dt(),
      FL = (function () {
        try {
          var e = ML(Object, "defineProperty");
          return (e({}, "", {}), e);
        } catch {}
      })();
    Wp.exports = FL;
  });
  var Fo = g((Wk, Hp) => {
    var Vp = Mo();
    function qL(e, t, r) {
      t == "__proto__" && Vp
        ? Vp(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Hp.exports = qL;
  });
  var zp = g((Vk, Bp) => {
    var kL = Fo(),
      XL = Yr(),
      GL = Object.prototype,
      UL = GL.hasOwnProperty;
    function WL(e, t, r) {
      var n = e[t];
      (!(UL.call(e, t) && XL(n, r)) || (r === void 0 && !(t in e))) &&
        kL(e, t, r);
    }
    Bp.exports = WL;
  });
  var Yp = g((Hk, jp) => {
    var VL = zp(),
      HL = mr(),
      BL = tn(),
      Kp = et(),
      zL = Wt();
    function KL(e, t, r, n) {
      if (!Kp(e)) return e;
      t = HL(t, e);
      for (var i = -1, o = t.length, a = o - 1, u = e; u != null && ++i < o; ) {
        var s = zL(t[i]),
          l = r;
        if (s === "__proto__" || s === "constructor" || s === "prototype")
          return e;
        if (i != a) {
          var b = u[s];
          ((l = n ? n(b, s, u) : void 0),
            l === void 0 && (l = Kp(b) ? b : BL(t[i + 1]) ? [] : {}));
        }
        (VL(u, s, l), (u = u[s]));
      }
      return e;
    }
    jp.exports = KL;
  });
  var $p = g((Bk, Qp) => {
    var jL = ln(),
      YL = Yp(),
      QL = mr();
    function $L(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var a = t[n],
          u = jL(e, a);
        r(u, a) && YL(o, QL(a, e), u);
      }
      return o;
    }
    Qp.exports = $L;
  });
  var Jp = g((zk, Zp) => {
    var ZL = Jr(),
      JL = ui(),
      eP = Di(),
      tP = Ni(),
      rP = Object.getOwnPropertySymbols,
      nP = rP
        ? function (e) {
            for (var t = []; e; ) (ZL(t, eP(e)), (e = JL(e)));
            return t;
          }
        : tP;
    Zp.exports = nP;
  });
  var tg = g((Kk, eg) => {
    function iP(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    eg.exports = iP;
  });
  var ng = g((jk, rg) => {
    var oP = et(),
      aP = on(),
      sP = tg(),
      uP = Object.prototype,
      cP = uP.hasOwnProperty;
    function lP(e) {
      if (!oP(e)) return sP(e);
      var t = aP(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !cP.call(e, n))) || r.push(n);
      return r;
    }
    rg.exports = lP;
  });
  var og = g((Yk, ig) => {
    var fP = Fi(),
      dP = ng(),
      pP = _t();
    function gP(e) {
      return pP(e) ? fP(e, !0) : dP(e);
    }
    ig.exports = gP;
  });
  var sg = g((Qk, ag) => {
    var hP = Pi(),
      vP = Jp(),
      mP = og();
    function EP(e) {
      return hP(e, mP, vP);
    }
    ag.exports = EP;
  });
  var cg = g(($k, ug) => {
    var yP = ji(),
      _P = pt(),
      bP = $p(),
      IP = sg();
    function TP(e, t) {
      if (e == null) return {};
      var r = yP(IP(e), function (n) {
        return [n];
      });
      return (
        (t = _P(t)),
        bP(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    ug.exports = TP;
  });
  var fg = g((Zk, lg) => {
    var wP = pt(),
      xP = Up(),
      AP = cg();
    function OP(e, t) {
      return AP(e, xP(wP(t)));
    }
    lg.exports = OP;
  });
  var pg = g((Jk, dg) => {
    var SP = an(),
      RP = sn(),
      CP = fr(),
      LP = we(),
      PP = _t(),
      NP = en(),
      DP = on(),
      MP = nn(),
      FP = "[object Map]",
      qP = "[object Set]",
      kP = Object.prototype,
      XP = kP.hasOwnProperty;
    function GP(e) {
      if (e == null) return !0;
      if (
        PP(e) &&
        (LP(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          NP(e) ||
          MP(e) ||
          CP(e))
      )
        return !e.length;
      var t = RP(e);
      if (t == FP || t == qP) return !e.size;
      if (DP(e)) return !SP(e).length;
      for (var r in e) if (XP.call(e, r)) return !1;
      return !0;
    }
    dg.exports = GP;
  });
  var hg = g((eX, gg) => {
    var UP = Fo(),
      WP = Io(),
      VP = pt();
    function HP(e, t) {
      var r = {};
      return (
        (t = VP(t, 3)),
        WP(e, function (n, i, o) {
          UP(r, i, t(n, i, o));
        }),
        r
      );
    }
    gg.exports = HP;
  });
  var mg = g((tX, vg) => {
    function BP(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;
      );
      return e;
    }
    vg.exports = BP;
  });
  var yg = g((rX, Eg) => {
    var zP = dn();
    function KP(e) {
      return typeof e == "function" ? e : zP;
    }
    Eg.exports = KP;
  });
  var bg = g((nX, _g) => {
    var jP = mg(),
      YP = To(),
      QP = yg(),
      $P = we();
    function ZP(e, t) {
      var r = $P(e) ? jP : YP;
      return r(e, QP(t));
    }
    _g.exports = ZP;
  });
  var Tg = g((iX, Ig) => {
    var JP = He(),
      eN = function () {
        return JP.Date.now();
      };
    Ig.exports = eN;
  });
  var Ag = g((oX, xg) => {
    var tN = et(),
      qo = Tg(),
      wg = pn(),
      rN = "Expected a function",
      nN = Math.max,
      iN = Math.min;
    function oN(e, t, r) {
      var n,
        i,
        o,
        a,
        u,
        s,
        l = 0,
        b = !1,
        f = !1,
        E = !0;
      if (typeof e != "function") throw new TypeError(rN);
      ((t = wg(t) || 0),
        tN(r) &&
          ((b = !!r.leading),
          (f = "maxWait" in r),
          (o = f ? nN(wg(r.maxWait) || 0, t) : o),
          (E = "trailing" in r ? !!r.trailing : E)));
      function m(q) {
        var j = n,
          K = i;
        return ((n = i = void 0), (l = q), (a = e.apply(K, j)), a);
      }
      function y(q) {
        return ((l = q), (u = setTimeout(w, t)), b ? m(q) : a);
      }
      function T(q) {
        var j = q - s,
          K = q - l,
          Q = t - j;
        return f ? iN(Q, o - K) : Q;
      }
      function A(q) {
        var j = q - s,
          K = q - l;
        return s === void 0 || j >= t || j < 0 || (f && K >= o);
      }
      function w() {
        var q = qo();
        if (A(q)) return N(q);
        u = setTimeout(w, T(q));
      }
      function N(q) {
        return ((u = void 0), E && n ? m(q) : ((n = i = void 0), a));
      }
      function L() {
        (u !== void 0 && clearTimeout(u), (l = 0), (n = s = i = u = void 0));
      }
      function F() {
        return u === void 0 ? a : N(qo());
      }
      function k() {
        var q = qo(),
          j = A(q);
        if (((n = arguments), (i = this), (s = q), j)) {
          if (u === void 0) return y(s);
          if (f) return (clearTimeout(u), (u = setTimeout(w, t)), m(s));
        }
        return (u === void 0 && (u = setTimeout(w, t)), a);
      }
      return ((k.cancel = L), (k.flush = F), k);
    }
    xg.exports = oN;
  });
  var Sg = g((aX, Og) => {
    var aN = Ag(),
      sN = et(),
      uN = "Expected a function";
    function cN(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(uN);
      return (
        sN(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        aN(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    Og.exports = cN;
  });
  var Cg = {};
  De(Cg, {
    actionListPlaybackChanged: () => er,
    animationFrameChanged: () => Ln,
    clearRequested: () => DN,
    elementStateChanged: () => Bo,
    eventListenerAdded: () => Cn,
    eventStateChanged: () => Wo,
    instanceAdded: () => Vo,
    instanceRemoved: () => Ho,
    instanceStarted: () => Pn,
    mediaQueriesDefined: () => Ko,
    parameterChanged: () => Jt,
    playbackRequested: () => PN,
    previewRequested: () => LN,
    rawDataImported: () => ko,
    sessionInitialized: () => Xo,
    sessionStarted: () => Go,
    sessionStopped: () => Uo,
    stopRequested: () => NN,
    testFrameRendered: () => MN,
    viewportWidthChanged: () => zo,
  });
  var Rg,
    lN,
    fN,
    dN,
    pN,
    gN,
    hN,
    vN,
    mN,
    EN,
    yN,
    _N,
    bN,
    IN,
    TN,
    wN,
    xN,
    AN,
    ON,
    SN,
    RN,
    CN,
    ko,
    Xo,
    Go,
    Uo,
    LN,
    PN,
    NN,
    DN,
    Cn,
    MN,
    Wo,
    Ln,
    Jt,
    Vo,
    Pn,
    Ho,
    Bo,
    er,
    zo,
    Ko,
    Nn = me(() => {
      "use strict";
      Fe();
      ((Rg = de(xt())),
        ({
          IX2_RAW_DATA_IMPORTED: lN,
          IX2_SESSION_INITIALIZED: fN,
          IX2_SESSION_STARTED: dN,
          IX2_SESSION_STOPPED: pN,
          IX2_PREVIEW_REQUESTED: gN,
          IX2_PLAYBACK_REQUESTED: hN,
          IX2_STOP_REQUESTED: vN,
          IX2_CLEAR_REQUESTED: mN,
          IX2_EVENT_LISTENER_ADDED: EN,
          IX2_TEST_FRAME_RENDERED: yN,
          IX2_EVENT_STATE_CHANGED: _N,
          IX2_ANIMATION_FRAME_CHANGED: bN,
          IX2_PARAMETER_CHANGED: IN,
          IX2_INSTANCE_ADDED: TN,
          IX2_INSTANCE_STARTED: wN,
          IX2_INSTANCE_REMOVED: xN,
          IX2_ELEMENT_STATE_CHANGED: AN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: ON,
          IX2_VIEWPORT_WIDTH_CHANGED: SN,
          IX2_MEDIA_QUERIES_DEFINED: RN,
        } = Te),
        ({ reifyState: CN } = Rg.IX2VanillaUtils),
        (ko = (e) => ({ type: lN, payload: { ...CN(e) } })),
        (Xo = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: fN,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Go = () => ({ type: dN })),
        (Uo = () => ({ type: pN })),
        (LN = ({ rawData: e, defer: t }) => ({
          type: gN,
          payload: { defer: t, rawData: e },
        })),
        (PN = ({
          actionTypeId: e = Me.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: a,
          verbose: u,
          rawData: s,
        }) => ({
          type: hN,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: a,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: u,
            rawData: s,
          },
        })),
        (NN = (e) => ({ type: vN, payload: { actionListId: e } })),
        (DN = () => ({ type: mN })),
        (Cn = (e, t) => ({
          type: EN,
          payload: { target: e, listenerParams: t },
        })),
        (MN = (e = 1) => ({ type: yN, payload: { step: e } })),
        (Wo = (e, t) => ({ type: _N, payload: { stateKey: e, newState: t } })),
        (Ln = (e, t) => ({ type: bN, payload: { now: e, parameters: t } })),
        (Jt = (e, t) => ({ type: IN, payload: { key: e, value: t } })),
        (Vo = (e) => ({ type: TN, payload: { ...e } })),
        (Pn = (e, t) => ({ type: wN, payload: { instanceId: e, time: t } })),
        (Ho = (e) => ({ type: xN, payload: { instanceId: e } })),
        (Bo = (e, t, r, n) => ({
          type: AN,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (er = ({ actionListId: e, isPlaying: t }) => ({
          type: ON,
          payload: { actionListId: e, isPlaying: t },
        })),
        (zo = ({ width: e, mediaQueries: t }) => ({
          type: SN,
          payload: { width: e, mediaQueries: t },
        })),
        (Ko = () => ({ type: RN })));
    });
  var Pe = {};
  De(Pe, {
    elementContains: () => Qo,
    getChildElements: () => BN,
    getClosestElement: () => Sr,
    getProperty: () => GN,
    getQuerySelector: () => Yo,
    getRefType: () => $o,
    getSiblingElements: () => zN,
    getStyle: () => XN,
    getValidDocument: () => WN,
    isSiblingNode: () => HN,
    matchSelector: () => UN,
    queryDocument: () => VN,
    setStyle: () => kN,
  });
  function kN(e, t, r) {
    e.style[t] = r;
  }
  function XN(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function GN(e, t) {
    return e[t];
  }
  function UN(e) {
    return (t) => t[jo](e);
  }
  function Yo({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(Lg) !== -1) {
        let n = e.split(Lg),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(Ng)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function WN(e) {
    return e == null || e === document.documentElement.getAttribute(Ng)
      ? document
      : null;
  }
  function VN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e),
    );
  }
  function Qo(e, t) {
    return e.contains(t);
  }
  function HN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function BN(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let a = 0; a < o; a++) t.push(i[a]);
    }
    return t;
  }
  function zN(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let a = o.firstElementChild;
      for (; a != null; )
        (e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling));
    }
    return t;
  }
  function $o(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? FN
        : qN
      : null;
  }
  var Pg,
    jo,
    Lg,
    FN,
    qN,
    Ng,
    Sr,
    Dg = me(() => {
      "use strict";
      Pg = de(xt());
      Fe();
      (({ ELEMENT_MATCHES: jo } = Pg.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Lg,
          HTML_ELEMENT: FN,
          PLAIN_OBJECT: qN,
          WF_PAGE: Ng,
        } = Se));
      Sr = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[jo] && r[jo](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var Zo = g((cX, Fg) => {
    var KN = et(),
      Mg = Object.create,
      jN = (function () {
        function e() {}
        return function (t) {
          if (!KN(t)) return {};
          if (Mg) return Mg(t);
          e.prototype = t;
          var r = new e();
          return ((e.prototype = void 0), r);
        };
      })();
    Fg.exports = jN;
  });
  var Dn = g((lX, qg) => {
    function YN() {}
    qg.exports = YN;
  });
  var Fn = g((fX, kg) => {
    var QN = Zo(),
      $N = Dn();
    function Mn(e, t) {
      ((this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0));
    }
    Mn.prototype = QN($N.prototype);
    Mn.prototype.constructor = Mn;
    kg.exports = Mn;
  });
  var Wg = g((dX, Ug) => {
    var Xg = Lt(),
      ZN = fr(),
      JN = we(),
      Gg = Xg ? Xg.isConcatSpreadable : void 0;
    function eD(e) {
      return JN(e) || ZN(e) || !!(Gg && e && e[Gg]);
    }
    Ug.exports = eD;
  });
  var Bg = g((pX, Hg) => {
    var tD = Jr(),
      rD = Wg();
    function Vg(e, t, r, n, i) {
      var o = -1,
        a = e.length;
      for (r || (r = rD), i || (i = []); ++o < a; ) {
        var u = e[o];
        t > 0 && r(u)
          ? t > 1
            ? Vg(u, t - 1, r, n, i)
            : tD(i, u)
          : n || (i[i.length] = u);
      }
      return i;
    }
    Hg.exports = Vg;
  });
  var Kg = g((gX, zg) => {
    var nD = Bg();
    function iD(e) {
      var t = e == null ? 0 : e.length;
      return t ? nD(e, 1) : [];
    }
    zg.exports = iD;
  });
  var Yg = g((hX, jg) => {
    function oD(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    jg.exports = oD;
  });
  var Zg = g((vX, $g) => {
    var aD = Yg(),
      Qg = Math.max;
    function sD(e, t, r) {
      return (
        (t = Qg(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = Qg(n.length - t, 0), a = Array(o);
            ++i < o;
          )
            a[i] = n[t + i];
          i = -1;
          for (var u = Array(t + 1); ++i < t; ) u[i] = n[i];
          return ((u[t] = r(a)), aD(e, this, u));
        }
      );
    }
    $g.exports = sD;
  });
  var eh = g((mX, Jg) => {
    function uD(e) {
      return function () {
        return e;
      };
    }
    Jg.exports = uD;
  });
  var nh = g((EX, rh) => {
    var cD = eh(),
      th = Mo(),
      lD = dn(),
      fD = th
        ? function (e, t) {
            return th(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: cD(t),
              writable: !0,
            });
          }
        : lD;
    rh.exports = fD;
  });
  var oh = g((yX, ih) => {
    var dD = 800,
      pD = 16,
      gD = Date.now;
    function hD(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = gD(),
          i = pD - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= dD) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    ih.exports = hD;
  });
  var sh = g((_X, ah) => {
    var vD = nh(),
      mD = oh(),
      ED = mD(vD);
    ah.exports = ED;
  });
  var ch = g((bX, uh) => {
    var yD = Kg(),
      _D = Zg(),
      bD = sh();
    function ID(e) {
      return bD(_D(e, void 0, yD), e + "");
    }
    uh.exports = ID;
  });
  var dh = g((IX, fh) => {
    var lh = qi(),
      TD = lh && new lh();
    fh.exports = TD;
  });
  var gh = g((TX, ph) => {
    function wD() {}
    ph.exports = wD;
  });
  var Jo = g((wX, vh) => {
    var hh = dh(),
      xD = gh(),
      AD = hh
        ? function (e) {
            return hh.get(e);
          }
        : xD;
    vh.exports = AD;
  });
  var Eh = g((xX, mh) => {
    var OD = {};
    mh.exports = OD;
  });
  var ea = g((AX, _h) => {
    var yh = Eh(),
      SD = Object.prototype,
      RD = SD.hasOwnProperty;
    function CD(e) {
      for (
        var t = e.name + "", r = yh[t], n = RD.call(yh, t) ? r.length : 0;
        n--;
      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    _h.exports = CD;
  });
  var kn = g((OX, bh) => {
    var LD = Zo(),
      PD = Dn(),
      ND = 4294967295;
    function qn(e) {
      ((this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = ND),
        (this.__views__ = []));
    }
    qn.prototype = LD(PD.prototype);
    qn.prototype.constructor = qn;
    bh.exports = qn;
  });
  var Th = g((SX, Ih) => {
    function DD(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    Ih.exports = DD;
  });
  var xh = g((RX, wh) => {
    var MD = kn(),
      FD = Fn(),
      qD = Th();
    function kD(e) {
      if (e instanceof MD) return e.clone();
      var t = new FD(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = qD(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    wh.exports = kD;
  });
  var Sh = g((CX, Oh) => {
    var XD = kn(),
      Ah = Fn(),
      GD = Dn(),
      UD = we(),
      WD = ot(),
      VD = xh(),
      HD = Object.prototype,
      BD = HD.hasOwnProperty;
    function Xn(e) {
      if (WD(e) && !UD(e) && !(e instanceof XD)) {
        if (e instanceof Ah) return e;
        if (BD.call(e, "__wrapped__")) return VD(e);
      }
      return new Ah(e);
    }
    Xn.prototype = GD.prototype;
    Xn.prototype.constructor = Xn;
    Oh.exports = Xn;
  });
  var Ch = g((LX, Rh) => {
    var zD = kn(),
      KD = Jo(),
      jD = ea(),
      YD = Sh();
    function QD(e) {
      var t = jD(e),
        r = YD[t];
      if (typeof r != "function" || !(t in zD.prototype)) return !1;
      if (e === r) return !0;
      var n = KD(r);
      return !!n && e === n[0];
    }
    Rh.exports = QD;
  });
  var Dh = g((PX, Nh) => {
    var Lh = Fn(),
      $D = ch(),
      ZD = Jo(),
      ta = ea(),
      JD = we(),
      Ph = Ch(),
      eM = "Expected a function",
      tM = 8,
      rM = 32,
      nM = 128,
      iM = 256;
    function oM(e) {
      return $D(function (t) {
        var r = t.length,
          n = r,
          i = Lh.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(eM);
          if (i && !a && ta(o) == "wrapper") var a = new Lh([], !0);
        }
        for (n = a ? n : r; ++n < r; ) {
          o = t[n];
          var u = ta(o),
            s = u == "wrapper" ? ZD(o) : void 0;
          s &&
          Ph(s[0]) &&
          s[1] == (nM | tM | rM | iM) &&
          !s[4].length &&
          s[9] == 1
            ? (a = a[ta(s[0])].apply(a, s[3]))
            : (a = o.length == 1 && Ph(o) ? a[u]() : a.thru(o));
        }
        return function () {
          var l = arguments,
            b = l[0];
          if (a && l.length == 1 && JD(b)) return a.plant(b).value();
          for (var f = 0, E = r ? t[f].apply(this, l) : b; ++f < r; )
            E = t[f].call(this, E);
          return E;
        };
      });
    }
    Nh.exports = oM;
  });
  var Fh = g((NX, Mh) => {
    var aM = Dh(),
      sM = aM();
    Mh.exports = sM;
  });
  var kh = g((DX, qh) => {
    function uM(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    qh.exports = uM;
  });
  var Gh = g((MX, Xh) => {
    var cM = kh(),
      ra = pn();
    function lM(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ra(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ra(t)), (t = t === t ? t : 0)),
        cM(ra(e), t, r)
      );
    }
    Xh.exports = lM;
  });
  var Yh,
    Qh,
    $h,
    Zh,
    fM,
    dM,
    pM,
    gM,
    hM,
    vM,
    mM,
    EM,
    yM,
    _M,
    bM,
    IM,
    TM,
    wM,
    xM,
    Jh,
    ev,
    AM,
    OM,
    SM,
    tv,
    RM,
    CM,
    rv,
    LM,
    na,
    nv,
    Uh,
    Wh,
    iv,
    Cr,
    PM,
    nt,
    ov,
    NM,
    ke,
    Ke,
    Lr,
    av,
    ia,
    Vh,
    oa,
    DM,
    Rr,
    MM,
    FM,
    qM,
    sv,
    Hh,
    kM,
    Bh,
    XM,
    GM,
    UM,
    zh,
    Gn,
    Un,
    Kh,
    jh,
    uv,
    cv = me(() => {
      "use strict";
      ((Yh = de(Fh())), (Qh = de(fn())), ($h = de(Gh())));
      Fe();
      aa();
      Nn();
      ((Zh = de(xt())),
        ({
          MOUSE_CLICK: fM,
          MOUSE_SECOND_CLICK: dM,
          MOUSE_DOWN: pM,
          MOUSE_UP: gM,
          MOUSE_OVER: hM,
          MOUSE_OUT: vM,
          DROPDOWN_CLOSE: mM,
          DROPDOWN_OPEN: EM,
          SLIDER_ACTIVE: yM,
          SLIDER_INACTIVE: _M,
          TAB_ACTIVE: bM,
          TAB_INACTIVE: IM,
          NAVBAR_CLOSE: TM,
          NAVBAR_OPEN: wM,
          MOUSE_MOVE: xM,
          PAGE_SCROLL_DOWN: Jh,
          SCROLL_INTO_VIEW: ev,
          SCROLL_OUT_OF_VIEW: AM,
          PAGE_SCROLL_UP: OM,
          SCROLLING_IN_VIEW: SM,
          PAGE_FINISH: tv,
          ECOMMERCE_CART_CLOSE: RM,
          ECOMMERCE_CART_OPEN: CM,
          PAGE_START: rv,
          PAGE_SCROLL: LM,
        } = Be),
        (na = "COMPONENT_ACTIVE"),
        (nv = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Uh } = Se),
        ({ getNamespacedParameterId: Wh } = Zh.IX2VanillaUtils),
        (iv = (e) => (t) => (typeof t == "object" && e(t) ? !0 : t)),
        (Cr = iv(({ element: e, nativeEvent: t }) => e === t.target)),
        (PM = iv(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (nt = (0, Yh.default)([Cr, PM])),
        (ov = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !DM[i.eventTypeId]) return i;
          }
          return null;
        }),
        (NM = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!ov(e, n);
        }),
        (ke = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: a } = t,
            { actionListId: u, autoStopEventId: s } = o.config,
            l = ov(e, s);
          return (
            l &&
              tr({
                store: e,
                eventId: s,
                eventTarget: r,
                eventStateKey: s + Uh + n.split(Uh)[1],
                actionListId: (0, Qh.default)(l, "action.config.actionListId"),
              }),
            tr({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: u,
            }),
            Pr({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: u,
            }),
            i
          );
        }),
        (Ke = (e, t) => (r, n) => (e(r, n) === !0 ? t(r, n) : n)),
        (Lr = { handler: Ke(nt, ke) }),
        (av = { ...Lr, types: [na, nv].join(" ") }),
        (ia = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Vh = "mouseover mouseout"),
        (oa = { types: ia }),
        (DM = { PAGE_START: rv, PAGE_FINISH: tv }),
        (Rr = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, $h.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight,
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (MM = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (FM = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let a = e.contains(i);
          return !!(r === "mouseout" && o && a);
        }),
        (qM = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = Rr(),
            o = r.scrollOffsetValue,
            s = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return MM(t.getBoundingClientRect(), {
            left: 0,
            top: s,
            right: n,
            bottom: i - s,
          });
        }),
        (sv = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [na, nv].indexOf(n) !== -1 ? n === na : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (Hh = (e) => (t, r) => {
          let n = { elementHovered: FM(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (kM = (e) => (t, r) => {
          let n = { ...r, elementVisible: qM(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (Bh =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = Rr(),
              {
                event: { config: a, eventTypeId: u },
              } = t,
              { scrollOffsetValue: s, scrollOffsetUnit: l } = a,
              b = l === "PX",
              f = i - o,
              E = Number((n / f).toFixed(2));
            if (r && r.percentTop === E) return r;
            let m = (b ? s : (o * (s || 0)) / 100) / f,
              y,
              T,
              A = 0;
            r &&
              ((y = E > r.percentTop),
              (T = r.scrollingDown !== y),
              (A = T ? E : r.anchorTop));
            let w = u === Jh ? E >= A + m : E <= A - m,
              N = {
                ...r,
                percentTop: E,
                inBounds: w,
                anchorTop: A,
                scrollingDown: y,
              };
            return (r && w && (T || N.inBounds !== r.inBounds) && e(t, N)) || N;
          }),
        (XM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (GM = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return (n.finished && !(r && r.finshed) && e(t), n);
        }),
        (UM = (e) => (t, r) => {
          let n = { started: !0 };
          return (r || e(t), n);
        }),
        (zh =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (Gn = (e = !0) => ({
          ...av,
          handler: Ke(
            e ? nt : Cr,
            sv((t, r) => (r.isActive ? Lr.handler(t, r) : r)),
          ),
        })),
        (Un = (e = !0) => ({
          ...av,
          handler: Ke(
            e ? nt : Cr,
            sv((t, r) => (r.isActive ? r : Lr.handler(t, r))),
          ),
        })),
        (Kh = {
          ...oa,
          handler: kM((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: a } = o;
            return !a[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === ev) === r
                ? (ke(e), { ...t, triggered: !0 })
                : t;
          }),
        }),
        (jh = 0.05),
        (uv = {
          [yM]: Gn(),
          [_M]: Un(),
          [EM]: Gn(),
          [mM]: Un(),
          [wM]: Gn(!1),
          [TM]: Un(!1),
          [bM]: Gn(),
          [IM]: Un(),
          [CM]: { types: "ecommerce-cart-open", handler: Ke(nt, ke) },
          [RM]: { types: "ecommerce-cart-close", handler: Ke(nt, ke) },
          [fM]: {
            types: "click",
            handler: Ke(
              nt,
              zh((e, { clickCount: t }) => {
                NM(e) ? t === 1 && ke(e) : ke(e);
              }),
            ),
          },
          [dM]: {
            types: "click",
            handler: Ke(
              nt,
              zh((e, { clickCount: t }) => {
                t === 2 && ke(e);
              }),
            ),
          },
          [pM]: { ...Lr, types: "mousedown" },
          [gM]: { ...Lr, types: "mouseup" },
          [hM]: {
            types: Vh,
            handler: Ke(
              nt,
              Hh((e, t) => {
                t.elementHovered && ke(e);
              }),
            ),
          },
          [vM]: {
            types: Vh,
            handler: Ke(
              nt,
              Hh((e, t) => {
                t.elementHovered || ke(e);
              }),
            ),
          },
          [xM]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 },
            ) => {
              let {
                  basedOn: a,
                  selectedAxis: u,
                  continuousParameterGroupId: s,
                  reverse: l,
                  restingState: b = 0,
                } = r,
                {
                  clientX: f = o.clientX,
                  clientY: E = o.clientY,
                  pageX: m = o.pageX,
                  pageY: y = o.pageY,
                } = n,
                T = u === "X_AXIS",
                A = n.type === "mouseout",
                w = b / 100,
                N = s,
                L = !1;
              switch (a) {
                case Je.VIEWPORT: {
                  w = T
                    ? Math.min(f, window.innerWidth) / window.innerWidth
                    : Math.min(E, window.innerHeight) / window.innerHeight;
                  break;
                }
                case Je.PAGE: {
                  let {
                    scrollLeft: F,
                    scrollTop: k,
                    scrollWidth: q,
                    scrollHeight: j,
                  } = Rr();
                  w = T ? Math.min(F + m, q) / q : Math.min(k + y, j) / j;
                  break;
                }
                case Je.ELEMENT:
                default: {
                  N = Wh(i, s);
                  let F = n.type.indexOf("mouse") === 0;
                  if (F && nt({ element: t, nativeEvent: n }) !== !0) break;
                  let k = t.getBoundingClientRect(),
                    { left: q, top: j, width: K, height: Q } = k;
                  if (!F && !XM({ left: f, top: E }, k)) break;
                  ((L = !0), (w = T ? (f - q) / K : (E - j) / Q));
                  break;
                }
              }
              return (
                A && (w > 1 - jh || w < jh) && (w = Math.round(w)),
                (a !== Je.ELEMENT || L || L !== o.elementHovered) &&
                  ((w = l ? 1 - w : w), e.dispatch(Jt(N, w))),
                {
                  elementHovered: L,
                  clientX: f,
                  clientY: E,
                  pageX: m,
                  pageY: y,
                }
              );
            },
          },
          [LM]: {
            types: ia,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: a } = Rr(),
                u = i / (o - a);
              ((u = n ? 1 - u : u), e.dispatch(Jt(r, u)));
            },
          },
          [SM]: {
            types: ia,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 },
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: a,
                  scrollWidth: u,
                  scrollHeight: s,
                  clientHeight: l,
                } = Rr(),
                {
                  basedOn: b,
                  selectedAxis: f,
                  continuousParameterGroupId: E,
                  startsEntering: m,
                  startsExiting: y,
                  addEndOffset: T,
                  addStartOffset: A,
                  addOffsetValue: w = 0,
                  endOffsetValue: N = 0,
                } = r,
                L = f === "X_AXIS";
              if (b === Je.VIEWPORT) {
                let F = L ? o / u : a / s;
                return (
                  F !== i.scrollPercent && t.dispatch(Jt(E, F)),
                  { scrollPercent: F }
                );
              } else {
                let F = Wh(n, E),
                  k = e.getBoundingClientRect(),
                  q = (A ? w : 0) / 100,
                  j = (T ? N : 0) / 100;
                ((q = m ? q : 1 - q), (j = y ? j : 1 - j));
                let K = k.top + Math.min(k.height * q, l),
                  te = k.top + k.height * j - K,
                  z = Math.min(l + te, s),
                  I = Math.min(Math.max(0, l - K), z) / z;
                return (
                  I !== i.scrollPercent && t.dispatch(Jt(F, I)),
                  { scrollPercent: I }
                );
              }
            },
          },
          [ev]: Kh,
          [AM]: Kh,
          [Jh]: {
            ...oa,
            handler: Bh((e, t) => {
              t.scrollingDown && ke(e);
            }),
          },
          [OM]: {
            ...oa,
            handler: Bh((e, t) => {
              t.scrollingDown || ke(e);
            }),
          },
          [tv]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Cr, GM(ke)),
          },
          [rv]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Cr, UM(ke)),
          },
        }));
    });
  var Av = {};
  De(Av, {
    observeRequests: () => sF,
    startActionGroup: () => Pr,
    startEngine: () => Kn,
    stopActionGroup: () => tr,
    stopAllActionGroups: () => Tv,
    stopEngine: () => jn,
  });
  function sF(e) {
    (At({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: lF }),
      At({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: fF }),
      At({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: dF }),
      At({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: pF }));
  }
  function uF(e) {
    At({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        (jn(e),
          yv({ store: e, elementApi: Pe }),
          Kn({ store: e, allowEvents: !0 }),
          _v());
      },
    });
  }
  function cF(e, t) {
    let r = At({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        (t(n), r());
      },
    });
  }
  function lF({ rawData: e, defer: t }, r) {
    let n = () => {
      (Kn({ store: r, rawData: e, allowEvents: !0 }), _v());
    };
    t ? setTimeout(n, 0) : n();
  }
  function _v() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function fF(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: a,
        immediate: u,
        testManual: s,
        verbose: l = !0,
      } = e,
      { rawData: b } = e;
    if (n && i && b && u) {
      let f = b.actionLists[n];
      f && (b = QM({ actionList: f, actionItemId: i, rawData: b }));
    }
    if (
      (Kn({ store: t, rawData: b, allowEvents: a, testManual: s }),
      (n && r === Me.GENERAL_START_ACTION) || sa(r))
    ) {
      (tr({ store: t, actionListId: n }),
        Iv({ store: t, actionListId: n, eventId: o }));
      let f = Pr({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: u,
        verbose: l,
      });
      l && f && t.dispatch(er({ actionListId: n, isPlaying: !u }));
    }
  }
  function dF({ actionListId: e }, t) {
    (e ? tr({ store: t, actionListId: e }) : Tv({ store: t }), jn(t));
  }
  function pF(e, t) {
    (jn(t), yv({ store: t, elementApi: Pe }));
  }
  function Kn({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    (t && e.dispatch(ko(t)),
      i.active ||
        (e.dispatch(
          Xo({
            hasBoundaryNodes: !!document.querySelector(Vn),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          }),
        ),
        r &&
          (yF(e), gF(), e.getState().ixSession.hasDefinedMediaQueries && uF(e)),
        e.dispatch(Go()),
        hF(e, n)));
  }
  function gF() {
    let { documentElement: e } = document;
    e.className.indexOf(lv) === -1 && (e.className += ` ${lv}`);
  }
  function hF(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Ln(n, o)), t ? cF(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function jn(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      (r.forEach(vF), eF(), e.dispatch(Uo()));
    }
  }
  function vF({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function mF({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: a,
    smoothing: u,
    restingValue: s,
  }) {
    let { ixData: l, ixSession: b } = e.getState(),
      { events: f } = l,
      E = f[n],
      { eventTypeId: m } = E,
      y = {},
      T = {},
      A = [],
      { continuousActionGroups: w } = a,
      { id: N } = a;
    $M(m, i) && (N = ZM(t, N));
    let L = b.hasBoundaryNodes && r ? Sr(r, Vn) : null;
    (w.forEach((F) => {
      let { keyframe: k, actionItems: q } = F;
      q.forEach((j) => {
        let { actionTypeId: K } = j,
          { target: Q } = j.config;
        if (!Q) return;
        let te = Q.boundaryMode ? L : null,
          z = tF(Q) + ua + K;
        if (((T[z] = EF(T[z], k, j)), !y[z])) {
          y[z] = !0;
          let { config: C } = j;
          Hn({
            config: C,
            event: E,
            eventTarget: r,
            elementRoot: te,
            elementApi: Pe,
          }).forEach((I) => {
            A.push({ element: I, key: z });
          });
        }
      });
    }),
      A.forEach(({ element: F, key: k }) => {
        let q = T[k],
          j = (0, ct.default)(q, "[0].actionItems[0]", {}),
          { actionTypeId: K } = j,
          Q = zn(K) ? la(K)(F, j) : null,
          te = ca({ element: F, actionItem: j, elementApi: Pe }, Q);
        fa({
          store: e,
          element: F,
          eventId: n,
          actionListId: o,
          actionItem: j,
          destination: te,
          continuous: !0,
          parameterId: N,
          actionGroups: q,
          smoothing: u,
          restingValue: s,
          pluginInstance: Q,
        });
      }));
  }
  function EF(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, a) => (o.keyframe === t ? ((i = a), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function yF(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    (bv(e),
      (0, rr.default)(r, (i, o) => {
        let a = uv[o];
        if (!a) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        xF({ logic: a, store: e, events: i });
      }));
    let { ixSession: n } = e.getState();
    n.eventListeners.length && bF(e);
  }
  function bF(e) {
    let t = () => {
      bv(e);
    };
    (_F.forEach((r) => {
      (window.addEventListener(r, t), e.dispatch(Cn(window, [r, t])));
    }),
      t());
  }
  function bv(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(zo({ width: n, mediaQueries: i }));
    }
  }
  function xF({ logic: e, store: t, events: r }) {
    AF(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: a } = o,
      u = IF(r, wF);
    if (!(0, pv.default)(u)) return;
    (0, rr.default)(u, (f, E) => {
      let m = r[E],
        { action: y, id: T, mediaQueries: A = o.mediaQueryKeys } = m,
        { actionListId: w } = y.config;
      (rF(A, o.mediaQueryKeys) || t.dispatch(Ko()),
        y.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(m.config) ? m.config : [m.config]).forEach((L) => {
            let { continuousParameterGroupId: F } = L,
              k = (0, ct.default)(a, `${w}.continuousParameterGroups`, []),
              q = (0, dv.default)(k, ({ id: Q }) => Q === F),
              j = (L.smoothing || 0) / 100,
              K = (L.restingState || 0) / 100;
            q &&
              f.forEach((Q, te) => {
                let z = T + ua + te;
                mF({
                  store: t,
                  eventStateKey: z,
                  eventTarget: Q,
                  eventId: T,
                  eventConfig: L,
                  actionListId: w,
                  parameterGroup: q,
                  smoothing: j,
                  restingValue: K,
                });
              });
          }),
        (y.actionTypeId === Me.GENERAL_START_ACTION || sa(y.actionTypeId)) &&
          Iv({ store: t, actionListId: w, eventId: T }));
    });
    let s = (f) => {
        let { ixSession: E } = t.getState();
        TF(u, (m, y, T) => {
          let A = r[y],
            w = E.eventState[T],
            { action: N, mediaQueries: L = o.mediaQueryKeys } = A;
          if (!Bn(L, E.mediaQueryKey)) return;
          let F = (k = {}) => {
            let q = i(
              {
                store: t,
                element: m,
                event: A,
                eventConfig: k,
                nativeEvent: f,
                eventStateKey: T,
              },
              w,
            );
            nF(q, w) || t.dispatch(Wo(T, q));
          };
          N.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(A.config) ? A.config : [A.config]).forEach(F)
            : F();
        });
      },
      l = (0, mv.default)(s, aF),
      b = ({ target: f = document, types: E, throttle: m }) => {
        E.split(" ")
          .filter(Boolean)
          .forEach((y) => {
            let T = m ? l : s;
            (f.addEventListener(y, T), t.dispatch(Cn(f, [y, T])));
          });
      };
    Array.isArray(n) ? n.forEach(b) : typeof n == "string" && b(e);
  }
  function AF(e) {
    if (!oF) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        a = Yo(o);
      t[a] ||
        ((i === Be.MOUSE_CLICK || i === Be.MOUSE_SECOND_CLICK) &&
          ((t[a] = !0),
          (r += a + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      ((n.textContent = r), document.body.appendChild(n));
    }
  }
  function Iv({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: a } = n,
      u = a[r],
      s = o[t];
    if (s && s.useFirstGroupAsInitialState) {
      let l = (0, ct.default)(s, "actionItemGroups[0].actionItems", []),
        b = (0, ct.default)(u, "mediaQueries", n.mediaQueryKeys);
      if (!Bn(b, i.mediaQueryKey)) return;
      l.forEach((f) => {
        let { config: E, actionTypeId: m } = f,
          y =
            E?.target?.useEventTarget === !0 && E?.target?.objectId == null
              ? { target: u.target, targets: u.targets }
              : E,
          T = Hn({ config: y, event: u, elementApi: Pe }),
          A = zn(m);
        T.forEach((w) => {
          let N = A ? la(m)(w, f) : null;
          fa({
            destination: ca({ element: w, actionItem: f, elementApi: Pe }, N),
            immediate: !0,
            store: e,
            element: w,
            eventId: r,
            actionItem: f,
            actionListId: t,
            pluginInstance: N,
          });
        });
      });
    }
  }
  function Tv({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, rr.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        (da(r, e), i && e.dispatch(er({ actionListId: n, isPlaying: !1 })));
      }
    });
  }
  function tr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: a } = e.getState(),
      u = a.hasBoundaryNodes && r ? Sr(r, Vn) : null;
    (0, rr.default)(o, (s) => {
      let l = (0, ct.default)(s, "actionItem.config.target.boundaryMode"),
        b = n ? s.eventStateKey === n : !0;
      if (s.actionListId === i && s.eventId === t && b) {
        if (u && l && !Qo(u, s.element)) return;
        (da(s, e),
          s.verbose && e.dispatch(er({ actionListId: i, isPlaying: !1 })));
      }
    });
  }
  function Pr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: a,
    verbose: u,
  }) {
    let { ixData: s, ixSession: l } = e.getState(),
      { events: b } = s,
      f = b[t] || {},
      { mediaQueries: E = s.mediaQueryKeys } = f,
      m = (0, ct.default)(s, `actionLists.${i}`, {}),
      { actionItemGroups: y, useFirstGroupAsInitialState: T } = m;
    if (!y || !y.length) return !1;
    (o >= y.length && (0, ct.default)(f, "config.loop") && (o = 0),
      o === 0 && T && o++);
    let w =
        (o === 0 || (o === 1 && T)) && sa(f.action?.actionTypeId)
          ? f.config.delay
          : void 0,
      N = (0, ct.default)(y, [o, "actionItems"], []);
    if (!N.length || !Bn(E, l.mediaQueryKey)) return !1;
    let L = l.hasBoundaryNodes && r ? Sr(r, Vn) : null,
      F = KM(N),
      k = !1;
    return (
      N.forEach((q, j) => {
        let { config: K, actionTypeId: Q } = q,
          te = zn(Q),
          { target: z } = K;
        if (!z) return;
        let C = z.boundaryMode ? L : null;
        Hn({
          config: K,
          event: f,
          eventTarget: r,
          elementRoot: C,
          elementApi: Pe,
        }).forEach((P, G) => {
          let V = te ? la(Q)(P, q) : null,
            ee = te ? iF(Q)(P, q) : null;
          k = !0;
          let re = F === j && G === 0,
            W = jM({ element: P, actionItem: q }),
            H = ca({ element: P, actionItem: q, elementApi: Pe }, V);
          fa({
            store: e,
            element: P,
            actionItem: q,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: re,
            computedStyle: W,
            destination: H,
            immediate: a,
            verbose: u,
            pluginInstance: V,
            pluginDuration: ee,
            instanceDelay: w,
          });
        });
      }),
      k
    );
  }
  function fa(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: a,
        pluginInstance: u,
        continuous: s,
        restingValue: l,
        eventId: b,
      } = n,
      f = !s,
      E = BM(),
      { ixElements: m, ixSession: y, ixData: T } = t.getState(),
      A = HM(m, i),
      { refState: w } = m[A] || {},
      N = $o(i),
      L = y.reducedMotion && wi[o.actionTypeId],
      F;
    if (L && s)
      switch (T.events[b]?.eventTypeId) {
        case Be.MOUSE_MOVE:
        case Be.MOUSE_MOVE_IN_VIEWPORT:
          F = l;
          break;
        default:
          F = 0.5;
          break;
      }
    let k = YM(i, w, r, o, Pe, u);
    if (
      (t.dispatch(
        Vo({
          instanceId: E,
          elementId: A,
          origin: k,
          refType: N,
          skipMotion: L,
          skipToValue: F,
          ...n,
        }),
      ),
      wv(document.body, "ix2-animation-started", E),
      a)
    ) {
      OF(t, E);
      return;
    }
    (At({ store: t, select: ({ ixInstances: q }) => q[E], onChange: xv }),
      f && t.dispatch(Pn(E, y.tick)));
  }
  function da(e, t) {
    wv(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: a } = i[r] || {};
    (a === Ev && JM(o, n, Pe), t.dispatch(Ho(e.id)));
  }
  function wv(e, t, r) {
    let n = document.createEvent("CustomEvent");
    (n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n));
  }
  function OF(e, t) {
    let { ixParameters: r } = e.getState();
    (e.dispatch(Pn(t, 0)), e.dispatch(Ln(performance.now(), r)));
    let { ixInstances: n } = e.getState();
    xv(n[t], e);
  }
  function xv(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: a,
        actionTypeId: u,
        renderType: s,
        current: l,
        groupIndex: b,
        eventId: f,
        eventTarget: E,
        eventStateKey: m,
        actionListId: y,
        isCarrier: T,
        styleProp: A,
        verbose: w,
        pluginInstance: N,
      } = e,
      { ixData: L, ixSession: F } = t.getState(),
      { events: k } = L,
      q = k && k[f] ? k[f] : {},
      { mediaQueries: j = L.mediaQueryKeys } = q;
    if (Bn(j, F.mediaQueryKey) && (n || r || i)) {
      if (l || (s === VM && i)) {
        t.dispatch(Bo(o, u, l, a));
        let { ixElements: K } = t.getState(),
          { ref: Q, refType: te, refState: z } = K[o] || {},
          C = z && z[u];
        (te === Ev || zn(u)) && zM(Q, z, C, f, a, A, Pe, s, N);
      }
      if (i) {
        if (T) {
          let K = Pr({
            store: t,
            eventId: f,
            eventTarget: E,
            eventStateKey: m,
            actionListId: y,
            groupIndex: b + 1,
            verbose: w,
          });
          w && !K && t.dispatch(er({ actionListId: y, isPlaying: !1 }));
        }
        da(e, t);
      }
    }
  }
  var dv,
    ct,
    pv,
    gv,
    hv,
    vv,
    rr,
    mv,
    Wn,
    WM,
    sa,
    ua,
    Vn,
    Ev,
    VM,
    lv,
    Hn,
    HM,
    ca,
    At,
    BM,
    zM,
    yv,
    KM,
    jM,
    YM,
    QM,
    $M,
    ZM,
    Bn,
    JM,
    eF,
    tF,
    rF,
    nF,
    zn,
    la,
    iF,
    fv,
    oF,
    aF,
    _F,
    IF,
    TF,
    wF,
    aa = me(() => {
      "use strict";
      ((dv = de(Ji())),
        (ct = de(fn())),
        (pv = de(Xp())),
        (gv = de(fg())),
        (hv = de(pg())),
        (vv = de(hg())),
        (rr = de(bg())),
        (mv = de(Sg())));
      Fe();
      Wn = de(xt());
      Nn();
      Dg();
      cv();
      ((WM = Object.keys(Wr)),
        (sa = (e) => WM.includes(e)),
        ({
          COLON_DELIMITER: ua,
          BOUNDARY_SELECTOR: Vn,
          HTML_ELEMENT: Ev,
          RENDER_GENERAL: VM,
          W_MOD_IX: lv,
        } = Se),
        ({
          getAffectedElements: Hn,
          getElementId: HM,
          getDestinationValues: ca,
          observeStore: At,
          getInstanceId: BM,
          renderHTMLElement: zM,
          clearAllStyles: yv,
          getMaxDurationItemIndex: KM,
          getComputedStyle: jM,
          getInstanceOrigin: YM,
          reduceListToGroup: QM,
          shouldNamespaceEventParameter: $M,
          getNamespacedParameterId: ZM,
          shouldAllowMediaQuery: Bn,
          cleanupHTMLElement: JM,
          clearObjectCache: eF,
          stringifyTarget: tF,
          mediaQueriesEqual: rF,
          shallowEqual: nF,
        } = Wn.IX2VanillaUtils),
        ({
          isPluginType: zn,
          createPluginInstance: la,
          getPluginDuration: iF,
        } = Wn.IX2VanillaPlugins),
        (fv = navigator.userAgent),
        (oF = fv.match(/iPad/i) || fv.match(/iPhone/)),
        (aF = 12));
      _F = ["resize", "orientationchange"];
      ((IF = (e, t) => (0, gv.default)((0, vv.default)(e, t), hv.default)),
        (TF = (e, t) => {
          (0, rr.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let a = n + ua + o;
              t(i, n, a);
            });
          });
        }),
        (wF = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Hn({ config: t, elementApi: Pe });
        }));
    });
  var Rv = g((ga) => {
    "use strict";
    Object.defineProperty(ga, "__esModule", { value: !0 });
    function SF(e, t) {
      for (var r in t)
        Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }
    SF(ga, {
      actions: function () {
        return LF;
      },
      destroy: function () {
        return Sv;
      },
      init: function () {
        return MF;
      },
      setEnv: function () {
        return DF;
      },
      store: function () {
        return Yn;
      },
    });
    var RF = bi(),
      CF = PF((_p(), Qe(yp))),
      pa = (aa(), Qe(Av)),
      LF = NF((Nn(), Qe(Cg)));
    function PF(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Ov(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Ov = function (n) {
        return n ? r : t;
      })(e);
    }
    function NF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var r = Ov(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, o, a)
            : (n[o] = e[o]);
        }
      return ((n.default = e), r && r.set(e, n), n);
    }
    var Yn = (0, RF.createStore)(CF.default);
    function DF(e) {
      e() && (0, pa.observeRequests)(Yn);
    }
    function MF(e) {
      (Sv(), (0, pa.startEngine)({ store: Yn, rawData: e, allowEvents: !0 }));
    }
    function Sv() {
      (0, pa.stopEngine)(Yn);
    }
  });
  var Nv = g((BX, Pv) => {
    "use strict";
    var Cv = Oe(),
      Lv = Rv();
    Lv.setEnv(Cv.env);
    Cv.define(
      "ix2",
      (Pv.exports = function () {
        return Lv;
      }),
    );
  });
  var Mv = g((zX, Dv) => {
    "use strict";
    var nr = Oe();
    nr.define(
      "links",
      (Dv.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = nr.env(),
          a = window.location,
          u = document.createElement("a"),
          s = "w--current",
          l = /index\.(html|php)$/,
          b = /\/$/,
          f,
          E;
        r.ready = r.design = r.preview = m;
        function m() {
          ((i = o && nr.env("design")),
            (E = nr.env("slug") || a.pathname || ""),
            nr.scroll.off(T),
            (f = []));
          for (var w = document.links, N = 0; N < w.length; ++N) y(w[N]);
          f.length && (nr.scroll.on(T), T());
        }
        function y(w) {
          if (!w.getAttribute("hreflang")) {
            var N =
              (i && w.getAttribute("href-disabled")) || w.getAttribute("href");
            if (((u.href = N), !(N.indexOf(":") >= 0))) {
              var L = e(w);
              if (
                u.hash.length > 1 &&
                u.host + u.pathname === a.host + a.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(u.hash)) return;
                var F = e(u.hash);
                F.length && f.push({ link: L, sec: F, active: !1 });
                return;
              }
              if (!(N === "#" || N === "")) {
                var k =
                  u.href === a.href || N === E || (l.test(N) && b.test(E));
                A(L, s, k);
              }
            }
          }
        }
        function T() {
          var w = n.scrollTop(),
            N = n.height();
          t.each(f, function (L) {
            if (!L.link.attr("hreflang")) {
              var F = L.link,
                k = L.sec,
                q = k.offset().top,
                j = k.outerHeight(),
                K = N * 0.5,
                Q = k.is(":visible") && q + j - K >= w && q + K <= w + N;
              L.active !== Q && ((L.active = Q), A(F, s, Q));
            }
          });
        }
        function A(w, N, L) {
          var F = w.hasClass(N);
          (L && F) || (!L && !F) || (L ? w.addClass(N) : w.removeClass(N));
        }
        return r;
      }),
    );
  });
  var qv = g((KX, Fv) => {
    "use strict";
    var Qn = Oe();
    Qn.define(
      "scroll",
      (Fv.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = y() ? null : window.history,
          i = e(window),
          o = e(document),
          a = e(document.body),
          u =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (C) {
              window.setTimeout(C, 15);
            },
          s = Qn.env("editor") ? ".w-editor-body" : "body",
          l =
            "header, " +
            s +
            " > .header, " +
            s +
            " > .w-nav:not([data-no-scroll])",
          b = 'a[href="#"]',
          f = 'a[href*="#"]:not(.w-tab-link):not(' + b + ")",
          E = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          m = document.createElement("style");
        m.appendChild(document.createTextNode(E));
        function y() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var T = /^#[a-zA-Z0-9][\w:.-]*$/;
        function A(C) {
          return T.test(C.hash) && C.host + C.pathname === r.host + r.pathname;
        }
        let w =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            w.matches
          );
        }
        function L(C, I) {
          var P;
          switch (I) {
            case "add":
              ((P = C.attr("tabindex")),
                P
                  ? C.attr("data-wf-tabindex-swap", P)
                  : C.attr("tabindex", "-1"));
              break;
            case "remove":
              ((P = C.attr("data-wf-tabindex-swap")),
                P
                  ? (C.attr("tabindex", P),
                    C.removeAttr("data-wf-tabindex-swap"))
                  : C.removeAttr("tabindex"));
              break;
          }
          C.toggleClass("wf-force-outline-none", I === "add");
        }
        function F(C) {
          var I = C.currentTarget;
          if (
            !(
              Qn.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(I.className))
            )
          ) {
            var P = A(I) ? I.hash : "";
            if (P !== "") {
              var G = e(P);
              G.length &&
                (C && (C.preventDefault(), C.stopPropagation()),
                k(P, C),
                window.setTimeout(
                  function () {
                    q(G, function () {
                      (L(G, "add"),
                        G.get(0).focus({ preventScroll: !0 }),
                        L(G, "remove"));
                    });
                  },
                  C ? 0 : 300,
                ));
            }
          }
        }
        function k(C) {
          if (
            r.hash !== C &&
            n &&
            n.pushState &&
            !(Qn.env.chrome && r.protocol === "file:")
          ) {
            var I = n.state && n.state.hash;
            I !== C && n.pushState({ hash: C }, "", C);
          }
        }
        function q(C, I) {
          var P = i.scrollTop(),
            G = j(C);
          if (P !== G) {
            var V = K(C, P, G),
              ee = Date.now(),
              re = function () {
                var W = Date.now() - ee;
                (window.scroll(0, Q(P, G, W, V)),
                  W <= V ? u(re) : typeof I == "function" && I());
              };
            u(re);
          }
        }
        function j(C) {
          var I = e(l),
            P = I.css("position") === "fixed" ? I.outerHeight() : 0,
            G = C.offset().top - P;
          if (C.data("scroll") === "mid") {
            var V = i.height() - P,
              ee = C.outerHeight();
            ee < V && (G -= Math.round((V - ee) / 2));
          }
          return G;
        }
        function K(C, I, P) {
          if (N()) return 0;
          var G = 1;
          return (
            a.add(C).each(function (V, ee) {
              var re = parseFloat(ee.getAttribute("data-scroll-time"));
              !isNaN(re) && re >= 0 && (G = re);
            }),
            (472.143 * Math.log(Math.abs(I - P) + 125) - 2e3) * G
          );
        }
        function Q(C, I, P, G) {
          return P > G ? I : C + (I - C) * te(P / G);
        }
        function te(C) {
          return C < 0.5
            ? 4 * C * C * C
            : (C - 1) * (2 * C - 2) * (2 * C - 2) + 1;
        }
        function z() {
          var { WF_CLICK_EMPTY: C, WF_CLICK_SCROLL: I } = t;
          (o.on(I, f, F),
            o.on(C, b, function (P) {
              P.preventDefault();
            }),
            document.head.insertBefore(m, document.head.firstChild));
        }
        return { ready: z };
      }),
    );
  });
  var Xv = g((jX, kv) => {
    "use strict";
    var FF = Oe();
    FF.define(
      "touch",
      (kv.exports = function (e) {
        var t = {},
          r = window.getSelection;
        ((e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o),
              o ? new n(o) : null
            );
          }));
        function n(o) {
          var a = !1,
            u = !1,
            s = Math.min(Math.round(window.innerWidth * 0.04), 40),
            l,
            b;
          (o.addEventListener("touchstart", f, !1),
            o.addEventListener("touchmove", E, !1),
            o.addEventListener("touchend", m, !1),
            o.addEventListener("touchcancel", y, !1),
            o.addEventListener("mousedown", f, !1),
            o.addEventListener("mousemove", E, !1),
            o.addEventListener("mouseup", m, !1),
            o.addEventListener("mouseout", y, !1));
          function f(A) {
            var w = A.touches;
            (w && w.length > 1) ||
              ((a = !0),
              w ? ((u = !0), (l = w[0].clientX)) : (l = A.clientX),
              (b = l));
          }
          function E(A) {
            if (a) {
              if (u && A.type === "mousemove") {
                (A.preventDefault(), A.stopPropagation());
                return;
              }
              var w = A.touches,
                N = w ? w[0].clientX : A.clientX,
                L = N - b;
              ((b = N),
                Math.abs(L) > s &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", A, { direction: L > 0 ? "right" : "left" }),
                  y()));
            }
          }
          function m(A) {
            if (a && ((a = !1), u && A.type === "mouseup")) {
              (A.preventDefault(), A.stopPropagation(), (u = !1));
              return;
            }
          }
          function y() {
            a = !1;
          }
          function T() {
            (o.removeEventListener("touchstart", f, !1),
              o.removeEventListener("touchmove", E, !1),
              o.removeEventListener("touchend", m, !1),
              o.removeEventListener("touchcancel", y, !1),
              o.removeEventListener("mousedown", f, !1),
              o.removeEventListener("mousemove", E, !1),
              o.removeEventListener("mouseup", m, !1),
              o.removeEventListener("mouseout", y, !1),
              (o = null));
          }
          this.destroy = T;
        }
        function i(o, a, u) {
          var s = e.Event(o, { originalEvent: a });
          e(a.target).trigger(s, u);
        }
        return ((t.instance = t.init(document)), t);
      }),
    );
  });
  var Wv = g((YX, Uv) => {
    "use strict";
    var Ot = Oe(),
      qF = Ct(),
      je = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      Gv = !0,
      kF = /^#[a-zA-Z0-9\-_]+$/;
    Ot.define(
      "dropdown",
      (Uv.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = Ot.env(),
          o = !1,
          a,
          u = Ot.env.touch,
          s = ".w-dropdown",
          l = "w--open",
          b = qF.triggers,
          f = 900,
          E = "focusout" + s,
          m = "keydown" + s,
          y = "mouseenter" + s,
          T = "mousemove" + s,
          A = "mouseleave" + s,
          w = (u ? "click" : "mouseup") + s,
          N = "w-close" + s,
          L = "setting" + s,
          F = e(document),
          k;
        ((n.ready = q),
          (n.design = function () {
            (o && I(), (o = !1), q());
          }),
          (n.preview = function () {
            ((o = !0), q());
          }));
        function q() {
          ((a = i && Ot.env("design")), (k = F.find(s)), k.each(j));
        }
        function j(c, D) {
          var U = e(D),
            O = e.data(D, s);
          (O ||
            (O = e.data(D, s, {
              open: !1,
              el: U,
              config: {},
              selectedIdx: -1,
            })),
            (O.toggle = O.el.children(".w-dropdown-toggle")),
            (O.list = O.el.children(".w-dropdown-list")),
            (O.links = O.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (O.complete = V(O)),
            (O.mouseLeave = re(O)),
            (O.mouseUpOutside = G(O)),
            (O.mouseMoveOutside = W(O)),
            K(O));
          var $ = O.toggle.attr("id"),
            se = O.list.attr("id");
          ($ || ($ = "w-dropdown-toggle-" + c),
            se || (se = "w-dropdown-list-" + c),
            O.toggle.attr("id", $),
            O.toggle.attr("aria-controls", se),
            O.toggle.attr("aria-haspopup", "menu"),
            O.toggle.attr("aria-expanded", "false"),
            O.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            O.toggle.prop("tagName") !== "BUTTON" &&
              (O.toggle.attr("role", "button"),
              O.toggle.attr("tabindex") || O.toggle.attr("tabindex", "0")),
            O.list.attr("id", se),
            O.list.attr("aria-labelledby", $),
            O.links.each(function (_, B) {
              (B.hasAttribute("tabindex") || B.setAttribute("tabindex", "0"),
                kF.test(B.hash) &&
                  B.addEventListener("click", C.bind(null, O)));
            }),
            O.el.off(s),
            O.toggle.off(s),
            O.nav && O.nav.off(s));
          var ie = te(O, Gv);
          (a && O.el.on(L, Q(O)),
            a ||
              (i && ((O.hovering = !1), C(O)),
              O.config.hover && O.toggle.on(y, ee(O)),
              O.el.on(N, ie),
              O.el.on(m, H(O)),
              O.el.on(E, v(O)),
              O.toggle.on(w, ie),
              O.toggle.on(m, p(O)),
              (O.nav = O.el.closest(".w-nav")),
              O.nav.on(N, ie)));
        }
        function K(c) {
          var D = Number(c.el.css("z-index"));
          ((c.manageZ = D === f || D === f + 1),
            (c.config = {
              hover: c.el.attr("data-hover") === "true" && !u,
              delay: c.el.attr("data-delay"),
            }));
        }
        function Q(c) {
          return function (D, U) {
            ((U = U || {}),
              K(c),
              U.open === !0 && z(c, !0),
              U.open === !1 && C(c, { immediate: !0 }));
          };
        }
        function te(c, D) {
          return r(function (U) {
            if (c.open || (U && U.type === "w-close"))
              return C(c, { forceClose: D });
            z(c);
          });
        }
        function z(c) {
          if (!c.open) {
            (P(c),
              (c.open = !0),
              c.list.addClass(l),
              c.toggle.addClass(l),
              c.toggle.attr("aria-expanded", "true"),
              b.intro(0, c.el[0]),
              Ot.redraw.up(),
              c.manageZ && c.el.css("z-index", f + 1));
            var D = Ot.env("editor");
            (a || F.on(w, c.mouseUpOutside),
              c.hovering && !D && c.el.on(A, c.mouseLeave),
              c.hovering && D && F.on(T, c.mouseMoveOutside),
              window.clearTimeout(c.delayId));
          }
        }
        function C(c, { immediate: D, forceClose: U } = {}) {
          if (c.open && !(c.config.hover && c.hovering && !U)) {
            (c.toggle.attr("aria-expanded", "false"), (c.open = !1));
            var O = c.config;
            if (
              (b.outro(0, c.el[0]),
              F.off(w, c.mouseUpOutside),
              F.off(T, c.mouseMoveOutside),
              c.el.off(A, c.mouseLeave),
              window.clearTimeout(c.delayId),
              !O.delay || D)
            )
              return c.complete();
            c.delayId = window.setTimeout(c.complete, O.delay);
          }
        }
        function I() {
          F.find(s).each(function (c, D) {
            e(D).triggerHandler(N);
          });
        }
        function P(c) {
          var D = c.el[0];
          k.each(function (U, O) {
            var $ = e(O);
            $.is(D) || $.has(D).length || $.triggerHandler(N);
          });
        }
        function G(c) {
          return (
            c.mouseUpOutside && F.off(w, c.mouseUpOutside),
            r(function (D) {
              if (c.open) {
                var U = e(D.target);
                if (!U.closest(".w-dropdown-toggle").length) {
                  var O = e.inArray(c.el[0], U.parents(s)) === -1,
                    $ = Ot.env("editor");
                  if (O) {
                    if ($) {
                      var se =
                          U.parents().length === 1 &&
                          U.parents("svg").length === 1,
                        ie = U.parents(
                          ".w-editor-bem-EditorHoverControls",
                        ).length;
                      if (se || ie) return;
                    }
                    C(c);
                  }
                }
              }
            })
          );
        }
        function V(c) {
          return function () {
            (c.list.removeClass(l),
              c.toggle.removeClass(l),
              c.manageZ && c.el.css("z-index", ""));
          };
        }
        function ee(c) {
          return function () {
            ((c.hovering = !0), z(c));
          };
        }
        function re(c) {
          return function () {
            ((c.hovering = !1), c.links.is(":focus") || C(c));
          };
        }
        function W(c) {
          return r(function (D) {
            if (c.open) {
              var U = e(D.target),
                O = e.inArray(c.el[0], U.parents(s)) === -1;
              if (O) {
                var $ = U.parents(".w-editor-bem-EditorHoverControls").length,
                  se = U.parents(".w-editor-bem-RTToolbar").length,
                  ie = e(".w-editor-bem-EditorOverlay"),
                  _ =
                    ie.find(".w-editor-edit-outline").length ||
                    ie.find(".w-editor-bem-RTToolbar").length;
                if ($ || se || _) return;
                ((c.hovering = !1), C(c));
              }
            }
          });
        }
        function H(c) {
          return function (D) {
            if (!(a || !c.open))
              switch (
                ((c.selectedIdx = c.links.index(document.activeElement)),
                D.keyCode)
              ) {
                case je.HOME:
                  return c.open
                    ? ((c.selectedIdx = 0), h(c), D.preventDefault())
                    : void 0;
                case je.END:
                  return c.open
                    ? ((c.selectedIdx = c.links.length - 1),
                      h(c),
                      D.preventDefault())
                    : void 0;
                case je.ESCAPE:
                  return (C(c), c.toggle.focus(), D.stopPropagation());
                case je.ARROW_RIGHT:
                case je.ARROW_DOWN:
                  return (
                    (c.selectedIdx = Math.min(
                      c.links.length - 1,
                      c.selectedIdx + 1,
                    )),
                    h(c),
                    D.preventDefault()
                  );
                case je.ARROW_LEFT:
                case je.ARROW_UP:
                  return (
                    (c.selectedIdx = Math.max(-1, c.selectedIdx - 1)),
                    h(c),
                    D.preventDefault()
                  );
              }
          };
        }
        function h(c) {
          c.links[c.selectedIdx] && c.links[c.selectedIdx].focus();
        }
        function p(c) {
          var D = te(c, Gv);
          return function (U) {
            if (!a) {
              if (!c.open)
                switch (U.keyCode) {
                  case je.ARROW_UP:
                  case je.ARROW_DOWN:
                    return U.stopPropagation();
                }
              switch (U.keyCode) {
                case je.SPACE:
                case je.ENTER:
                  return (D(), U.stopPropagation(), U.preventDefault());
              }
            }
          };
        }
        function v(c) {
          return r(function (D) {
            var { relatedTarget: U, target: O } = D,
              $ = c.el[0],
              se = $.contains(U) || $.contains(O);
            return (se || C(c), D.stopPropagation());
          });
        }
        return n;
      }),
    );
  });
  var Vv = g((ha) => {
    "use strict";
    Object.defineProperty(ha, "__esModule", { value: !0 });
    Object.defineProperty(ha, "default", {
      enumerable: !0,
      get: function () {
        return XF;
      },
    });
    function XF(e, t, r, n, i, o, a, u, s, l, b, f, E) {
      return function (m) {
        e(m);
        var y = m.form,
          T = {
            name: y.attr("data-name") || y.attr("name") || "Untitled Form",
            pageId: y.attr("data-wf-page-id") || "",
            elementId: y.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              y.html(),
            ),
            trackingCookies: n(),
          };
        let A = y.attr("data-wf-flow");
        (A && (T.wfFlow = A), i(m));
        var w = o(y, T.fields);
        if (w) return a(w);
        if (((T.fileUploads = u(y)), s(m), !l)) {
          b(m);
          return;
        }
        f.ajax({
          url: E,
          type: "POST",
          data: T,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (N) {
            (N && N.code === 200 && (m.success = !0), b(m));
          })
          .fail(function () {
            b(m);
          });
      };
    }
  });
  var Bv = g(($X, Hv) => {
    "use strict";
    var $n = Oe();
    $n.define(
      "forms",
      (Hv.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          a = window.XDomainRequest && !window.atob,
          u = ".w-form",
          s,
          l = /e(-)?mail/i,
          b = /^\S+@\S+$/,
          f = window.alert,
          E = $n.env(),
          m,
          y,
          T,
          A = /list-manage[1-9]?.com/i,
          w = t.debounce(function () {
            f(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.",
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              (N(), !E && !m && F());
            };
        function N() {
          ((s = e("html").attr("data-wf-site")),
            (y = "https://webflow.com/api/v1/form/" + s),
            a &&
              y.indexOf("https://webflow.com") >= 0 &&
              (y = y.replace(
                "https://webflow.com",
                "https://formdata.webflow.com",
              )),
            (T = `${y}/signFile`),
            (i = e(u + " form")),
            i.length && i.each(L));
        }
        function L(W, H) {
          var h = e(H),
            p = e.data(H, u);
          (p || (p = e.data(H, u, { form: h })), k(p));
          var v = h.closest("div.w-form");
          ((p.done = v.find("> .w-form-done")),
            (p.fail = v.find("> .w-form-fail")),
            (p.fileUploads = v.find(".w-file-upload")),
            p.fileUploads.each(function (U) {
              V(U, p);
            }));
          var c =
            p.form.attr("aria-label") || p.form.attr("data-name") || "Form";
          (p.done.attr("aria-label") || p.form.attr("aria-label", c),
            p.done.attr("tabindex", "-1"),
            p.done.attr("role", "region"),
            p.done.attr("aria-label") ||
              p.done.attr("aria-label", c + " success"),
            p.fail.attr("tabindex", "-1"),
            p.fail.attr("role", "region"),
            p.fail.attr("aria-label") ||
              p.fail.attr("aria-label", c + " failure"));
          var D = (p.action = h.attr("action"));
          if (
            ((p.handler = null),
            (p.redirect = h.attr("data-redirect")),
            A.test(D))
          ) {
            p.handler = I;
            return;
          }
          if (!D) {
            if (s) {
              p.handler = (() => {
                let U = Vv().default;
                return U(k, o, $n, te, G, j, f, K, q, s, P, e, y);
              })();
              return;
            }
            w();
          }
        }
        function F() {
          ((m = !0),
            n.on("submit", u + " form", function (U) {
              var O = e.data(this, u);
              O.handler && ((O.evt = U), O.handler(O));
            }));
          let W = ".w-checkbox-input",
            H = ".w-radio-input",
            h = "w--redirected-checked",
            p = "w--redirected-focus",
            v = "w--redirected-focus-visible",
            c = ":focus-visible, [data-wf-focus-visible]",
            D = [
              ["checkbox", W],
              ["radio", H],
            ];
          (n.on(
            "change",
            u + ' form input[type="checkbox"]:not(' + W + ")",
            (U) => {
              e(U.target).siblings(W).toggleClass(h);
            },
          ),
            n.on("change", u + ' form input[type="radio"]', (U) => {
              e(`input[name="${U.target.name}"]:not(${W})`).map(($, se) =>
                e(se).siblings(H).removeClass(h),
              );
              let O = e(U.target);
              O.hasClass("w-radio-input") || O.siblings(H).addClass(h);
            }),
            D.forEach(([U, O]) => {
              (n.on(
                "focus",
                u + ` form input[type="${U}"]:not(` + O + ")",
                ($) => {
                  (e($.target).siblings(O).addClass(p),
                    e($.target).filter(c).siblings(O).addClass(v));
                },
              ),
                n.on(
                  "blur",
                  u + ` form input[type="${U}"]:not(` + O + ")",
                  ($) => {
                    e($.target).siblings(O).removeClass(`${p} ${v}`);
                  },
                ));
            }));
        }
        function k(W) {
          var H = (W.btn = W.form.find(':input[type="submit"]'));
          ((W.wait = W.btn.attr("data-wait") || null),
            (W.success = !1),
            H.prop("disabled", !1),
            W.label && H.val(W.label));
        }
        function q(W) {
          var H = W.btn,
            h = W.wait;
          (H.prop("disabled", !0), h && ((W.label = H.val()), H.val(h)));
        }
        function j(W, H) {
          var h = null;
          return (
            (H = H || {}),
            W.find(':input:not([type="submit"]):not([type="file"])').each(
              function (p, v) {
                var c = e(v),
                  D = c.attr("type"),
                  U =
                    c.attr("data-name") || c.attr("name") || "Field " + (p + 1);
                U = encodeURIComponent(U);
                var O = c.val();
                if (D === "checkbox") O = c.is(":checked");
                else if (D === "radio") {
                  if (H[U] === null || typeof H[U] == "string") return;
                  O =
                    W.find(
                      'input[name="' + c.attr("name") + '"]:checked',
                    ).val() || null;
                }
                (typeof O == "string" && (O = e.trim(O)),
                  (H[U] = O),
                  (h = h || z(c, D, U, O)));
              },
            ),
            h
          );
        }
        function K(W) {
          var H = {};
          return (
            W.find(':input[type="file"]').each(function (h, p) {
              var v = e(p),
                c = v.attr("data-name") || v.attr("name") || "File " + (h + 1),
                D = v.attr("data-value");
              (typeof D == "string" && (D = e.trim(D)), (H[c] = D));
            }),
            H
          );
        }
        let Q = { _mkto_trk: "marketo" };
        function te() {
          return document.cookie.split("; ").reduce(function (H, h) {
            let p = h.split("="),
              v = p[0];
            if (v in Q) {
              let c = Q[v],
                D = p.slice(1).join("=");
              H[c] = D;
            }
            return H;
          }, {});
        }
        function z(W, H, h, p) {
          var v = null;
          return (
            H === "password"
              ? (v = "Passwords cannot be submitted.")
              : W.attr("required")
                ? p
                  ? l.test(W.attr("type")) &&
                    (b.test(p) ||
                      (v = "Please enter a valid email address for: " + h))
                  : (v = "Please fill out the required field: " + h)
                : h === "g-recaptcha-response" &&
                  !p &&
                  (v = "Please confirm you\u2019re not a robot."),
            v
          );
        }
        function C(W) {
          (G(W), P(W));
        }
        function I(W) {
          k(W);
          var H = W.form,
            h = {};
          if (/^https/.test(o.href) && !/^https/.test(W.action)) {
            H.attr("method", "post");
            return;
          }
          G(W);
          var p = j(H, h);
          if (p) return f(p);
          q(W);
          var v;
          (t.each(h, function (O, $) {
            (l.test($) && (h.EMAIL = O),
              /^((full[ _-]?)?name)$/i.test($) && (v = O),
              /^(first[ _-]?name)$/i.test($) && (h.FNAME = O),
              /^(last[ _-]?name)$/i.test($) && (h.LNAME = O));
          }),
            v &&
              !h.FNAME &&
              ((v = v.split(" ")),
              (h.FNAME = v[0]),
              (h.LNAME = h.LNAME || v[1])));
          var c = W.action.replace("/post?", "/post-json?") + "&c=?",
            D = c.indexOf("u=") + 2;
          D = c.substring(D, c.indexOf("&", D));
          var U = c.indexOf("id=") + 3;
          ((U = c.substring(U, c.indexOf("&", U))),
            (h["b_" + D + "_" + U] = ""),
            e
              .ajax({ url: c, data: h, dataType: "jsonp" })
              .done(function (O) {
                ((W.success = O.result === "success" || /already/.test(O.msg)),
                  W.success || console.info("MailChimp error: " + O.msg),
                  P(W));
              })
              .fail(function () {
                P(W);
              }));
        }
        function P(W) {
          var H = W.form,
            h = W.redirect,
            p = W.success;
          if (p && h) {
            $n.location(h);
            return;
          }
          (W.done.toggle(p),
            W.fail.toggle(!p),
            p ? W.done.focus() : W.fail.focus(),
            H.toggle(!p),
            k(W));
        }
        function G(W) {
          (W.evt && W.evt.preventDefault(), (W.evt = null));
        }
        function V(W, H) {
          if (!H.fileUploads || !H.fileUploads[W]) return;
          var h,
            p = e(H.fileUploads[W]),
            v = p.find("> .w-file-upload-default"),
            c = p.find("> .w-file-upload-uploading"),
            D = p.find("> .w-file-upload-success"),
            U = p.find("> .w-file-upload-error"),
            O = v.find(".w-file-upload-input"),
            $ = v.find(".w-file-upload-label"),
            se = $.children(),
            ie = U.find(".w-file-upload-error-msg"),
            _ = D.find(".w-file-upload-file"),
            B = D.find(".w-file-remove-link"),
            J = _.find(".w-file-upload-file-name"),
            Y = ie.attr("data-w-size-error"),
            le = ie.attr("data-w-type-error"),
            Ie = ie.attr("data-w-generic-error");
          if (
            (E ||
              $.on("click keydown", function (S) {
                (S.type === "keydown" && S.which !== 13 && S.which !== 32) ||
                  (S.preventDefault(), O.click());
              }),
            $.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            B.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            E)
          )
            (O.on("click", function (S) {
              S.preventDefault();
            }),
              $.on("click", function (S) {
                S.preventDefault();
              }),
              se.on("click", function (S) {
                S.preventDefault();
              }));
          else {
            (B.on("click keydown", function (S) {
              if (S.type === "keydown") {
                if (S.which !== 13 && S.which !== 32) return;
                S.preventDefault();
              }
              (O.removeAttr("data-value"),
                O.val(""),
                J.html(""),
                v.toggle(!0),
                D.toggle(!1),
                $.focus());
            }),
              O.on("change", function (S) {
                ((h = S.target && S.target.files && S.target.files[0]),
                  h &&
                    (v.toggle(!1),
                    U.toggle(!1),
                    c.toggle(!0),
                    c.focus(),
                    J.text(h.name),
                    M() || q(H),
                    (H.fileUploads[W].uploading = !0),
                    ee(h, x)));
              }));
            var Ae = $.outerHeight();
            (O.height(Ae), O.width(1));
          }
          function d(S) {
            var X = S.responseJSON && S.responseJSON.msg,
              ne = Ie;
            (typeof X == "string" && X.indexOf("InvalidFileTypeError") === 0
              ? (ne = le)
              : typeof X == "string" &&
                X.indexOf("MaxFileSizeError") === 0 &&
                (ne = Y),
              ie.text(ne),
              O.removeAttr("data-value"),
              O.val(""),
              c.toggle(!1),
              v.toggle(!0),
              U.toggle(!0),
              U.focus(),
              (H.fileUploads[W].uploading = !1),
              M() || k(H));
          }
          function x(S, X) {
            if (S) return d(S);
            var ne = X.fileName,
              ae = X.postData,
              he = X.fileId,
              Z = X.s3Url;
            (O.attr("data-value", he), re(Z, ae, h, ne, R));
          }
          function R(S) {
            if (S) return d(S);
            (c.toggle(!1),
              D.css("display", "inline-block"),
              D.focus(),
              (H.fileUploads[W].uploading = !1),
              M() || k(H));
          }
          function M() {
            var S = (H.fileUploads && H.fileUploads.toArray()) || [];
            return S.some(function (X) {
              return X.uploading;
            });
          }
        }
        function ee(W, H) {
          var h = new URLSearchParams({ name: W.name, size: W.size });
          e.ajax({ type: "GET", url: `${T}?${h}`, crossDomain: !0 })
            .done(function (p) {
              H(null, p);
            })
            .fail(function (p) {
              H(p);
            });
        }
        function re(W, H, h, p, v) {
          var c = new FormData();
          for (var D in H) c.append(D, H[D]);
          (c.append("file", h, p),
            e
              .ajax({
                type: "POST",
                url: W,
                data: c,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                v(null);
              })
              .fail(function (U) {
                v(U);
              }));
        }
        return r;
      }),
    );
  });
  var jv = g((ZX, Kv) => {
    "use strict";
    var va = Oe(),
      zv = "w-condition-invisible",
      GF = "." + zv;
    function UF(e) {
      return e.filter(function (t) {
        return !Dr(t);
      });
    }
    function Dr(e) {
      return !!(e.$el && e.$el.closest(GF).length);
    }
    function ma(e, t) {
      for (var r = e; r >= 0; r--) if (!Dr(t[r])) return r;
      return -1;
    }
    function Ea(e, t) {
      for (var r = e; r <= t.length - 1; r++) if (!Dr(t[r])) return r;
      return -1;
    }
    function WF(e, t) {
      return ma(e - 1, t) === -1;
    }
    function VF(e, t) {
      return Ea(e + 1, t) === -1;
    }
    function Nr(e, t) {
      e.attr("aria-label") || e.attr("aria-label", t);
    }
    function HF(e, t, r, n) {
      var i = r.tram,
        o = Array.isArray,
        a = "w-lightbox",
        u = a + "-",
        s = /(^|\s+)/g,
        l = [],
        b,
        f,
        E,
        m = [];
      function y(p, v) {
        return (
          (l = o(p) ? p : [p]),
          f || y.build(),
          UF(l).length > 1 &&
            ((f.items = f.empty),
            l.forEach(function (c, D) {
              var U = H("thumbnail"),
                O = H("item")
                  .prop("tabIndex", 0)
                  .attr("aria-controls", "w-lightbox-view")
                  .attr("role", "tab")
                  .append(U);
              (Nr(O, `show item ${D + 1} of ${l.length}`),
                Dr(c) && O.addClass(zv),
                (f.items = f.items.add(O)),
                te(c.thumbnailUrl || c.url, function ($) {
                  ($.prop("width") > $.prop("height")
                    ? V($, "wide")
                    : V($, "tall"),
                    U.append(V($, "thumbnail-image")));
                }));
            }),
            f.strip.empty().append(f.items),
            V(f.content, "group")),
          i(ee(f.lightbox, "hide").trigger("focus"))
            .add("opacity .3s")
            .start({ opacity: 1 }),
          V(f.html, "noscroll"),
          y.show(v || 0)
        );
      }
      ((y.build = function () {
        return (
          y.destroy(),
          (f = { html: r(t.documentElement), empty: r() }),
          (f.arrowLeft = H("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.arrowRight = H("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.close = H("control close").attr("role", "button")),
          Nr(f.arrowLeft, "previous image"),
          Nr(f.arrowRight, "next image"),
          Nr(f.close, "close lightbox"),
          (f.spinner = H("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", !1)
            .attr("aria-busy", !0)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image")),
          (f.strip = H("strip").attr("role", "tablist")),
          (E = new I(f.spinner, P("hide"))),
          (f.content = H("content").append(
            f.spinner,
            f.arrowLeft,
            f.arrowRight,
            f.close,
          )),
          (f.container = H("container").append(f.content, f.strip)),
          (f.lightbox = H("backdrop hide").append(f.container)),
          f.strip.on("click", G("item"), L),
          f.content
            .on("swipe", F)
            .on("click", G("left"), A)
            .on("click", G("right"), w)
            .on("click", G("close"), N)
            .on("click", G("image, caption"), w),
          f.container.on("click", G("view"), N).on("dragstart", G("img"), q),
          f.lightbox.on("keydown", j).on("focusin", k),
          r(n).append(f.lightbox),
          y
        );
      }),
        (y.destroy = function () {
          f && (ee(f.html, "noscroll"), f.lightbox.remove(), (f = void 0));
        }),
        (y.show = function (p) {
          if (p !== b) {
            var v = l[p];
            if (!v) return y.hide();
            if (Dr(v)) {
              if (p < b) {
                var c = ma(p - 1, l);
                p = c > -1 ? c : p;
              } else {
                var D = Ea(p + 1, l);
                p = D > -1 ? D : p;
              }
              v = l[p];
            }
            var U = b;
            ((b = p),
              f.spinner
                .attr("aria-hidden", !1)
                .attr("aria-busy", !0)
                .attr("aria-valuenow", 0)
                .attr("aria-valuetext", "Loading image"),
              E.show());
            var O = (v.html && h(v.width, v.height)) || v.url;
            return (
              te(O, function ($) {
                if (p !== b) return;
                var se = H("figure", "figure").append(V($, "image")),
                  ie = H("frame").append(se),
                  _ = H("view")
                    .prop("tabIndex", 0)
                    .attr("id", "w-lightbox-view")
                    .append(ie),
                  B,
                  J;
                (v.html &&
                  ((B = r(v.html)),
                  (J = B.is("iframe")),
                  J && B.on("load", Y),
                  se.append(V(B, "embed"))),
                  v.caption &&
                    se.append(H("caption", "figcaption").text(v.caption)),
                  f.spinner.before(_),
                  J || Y());
                function Y() {
                  if (
                    (f.spinner
                      .attr("aria-hidden", !0)
                      .attr("aria-busy", !1)
                      .attr("aria-valuenow", 100)
                      .attr("aria-valuetext", "Loaded image"),
                    E.hide(),
                    p !== b)
                  ) {
                    _.remove();
                    return;
                  }
                  let le = WF(p, l);
                  (re(f.arrowLeft, "inactive", le),
                    W(f.arrowLeft, le),
                    le && f.arrowLeft.is(":focus") && f.arrowRight.focus());
                  let Ie = VF(p, l);
                  if (
                    (re(f.arrowRight, "inactive", Ie),
                    W(f.arrowRight, Ie),
                    Ie && f.arrowRight.is(":focus") && f.arrowLeft.focus(),
                    f.view
                      ? (i(f.view)
                          .add("opacity .3s")
                          .start({ opacity: 0 })
                          .then(z(f.view)),
                        i(_)
                          .add("opacity .3s")
                          .add("transform .3s")
                          .set({ x: p > U ? "80px" : "-80px" })
                          .start({ opacity: 1, x: 0 }))
                      : _.css("opacity", 1),
                    (f.view = _),
                    f.view.prop("tabIndex", 0),
                    f.items)
                  ) {
                    (ee(f.items, "active"),
                      f.items.removeAttr("aria-selected"));
                    var Ae = f.items.eq(p);
                    (V(Ae, "active"), Ae.attr("aria-selected", !0), C(Ae));
                  }
                }
              }),
              f.close.prop("tabIndex", 0),
              r(":focus").addClass("active-lightbox"),
              m.length === 0 &&
                (r("body")
                  .children()
                  .each(function () {
                    r(this).hasClass("w-lightbox-backdrop") ||
                      r(this).is("script") ||
                      (m.push({
                        node: r(this),
                        hidden: r(this).attr("aria-hidden"),
                        tabIndex: r(this).attr("tabIndex"),
                      }),
                      r(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                  }),
                f.close.focus()),
              y
            );
          }
        }),
        (y.hide = function () {
          return (
            i(f.lightbox).add("opacity .3s").start({ opacity: 0 }).then(Q),
            y
          );
        }),
        (y.prev = function () {
          var p = ma(b - 1, l);
          p > -1 && y.show(p);
        }),
        (y.next = function () {
          var p = Ea(b + 1, l);
          p > -1 && y.show(p);
        }));
      function T(p) {
        return function (v) {
          this === v.target && (v.stopPropagation(), v.preventDefault(), p());
        };
      }
      var A = T(y.prev),
        w = T(y.next),
        N = T(y.hide),
        L = function (p) {
          var v = r(this).index();
          (p.preventDefault(), y.show(v));
        },
        F = function (p, v) {
          (p.preventDefault(),
            v.direction === "left"
              ? y.next()
              : v.direction === "right" && y.prev());
        },
        k = function () {
          this.focus();
        };
      function q(p) {
        p.preventDefault();
      }
      function j(p) {
        var v = p.keyCode;
        v === 27 || K(v, "close")
          ? y.hide()
          : v === 37 || K(v, "left")
            ? y.prev()
            : v === 39 || K(v, "right")
              ? y.next()
              : K(v, "item") && r(":focus").click();
      }
      function K(p, v) {
        if (p !== 13 && p !== 32) return !1;
        var c = r(":focus").attr("class"),
          D = P(v).trim();
        return c.includes(D);
      }
      function Q() {
        f &&
          (f.strip.scrollLeft(0).empty(),
          ee(f.html, "noscroll"),
          V(f.lightbox, "hide"),
          f.view && f.view.remove(),
          ee(f.content, "group"),
          V(f.arrowLeft, "inactive"),
          V(f.arrowRight, "inactive"),
          (b = f.view = void 0),
          m.forEach(function (p) {
            var v = p.node;
            v &&
              (p.hidden
                ? v.attr("aria-hidden", p.hidden)
                : v.removeAttr("aria-hidden"),
              p.tabIndex
                ? v.attr("tabIndex", p.tabIndex)
                : v.removeAttr("tabIndex"));
          }),
          (m = []),
          r(".active-lightbox").removeClass("active-lightbox").focus());
      }
      function te(p, v) {
        var c = H("img", "img");
        return (
          c.one("load", function () {
            v(c);
          }),
          c.attr("src", p),
          c
        );
      }
      function z(p) {
        return function () {
          p.remove();
        };
      }
      function C(p) {
        var v = p.get(0),
          c = f.strip.get(0),
          D = v.offsetLeft,
          U = v.clientWidth,
          O = c.scrollLeft,
          $ = c.clientWidth,
          se = c.scrollWidth - $,
          ie;
        (D < O
          ? (ie = Math.max(0, D + U - $))
          : D + U > $ + O && (ie = Math.min(D, se)),
          ie != null &&
            i(f.strip).add("scroll-left 500ms").start({ "scroll-left": ie }));
      }
      function I(p, v, c) {
        ((this.$element = p),
          (this.className = v),
          (this.delay = c || 200),
          this.hide());
      }
      ((I.prototype.show = function () {
        var p = this;
        p.timeoutId ||
          (p.timeoutId = setTimeout(function () {
            (p.$element.removeClass(p.className), delete p.timeoutId);
          }, p.delay));
      }),
        (I.prototype.hide = function () {
          var p = this;
          if (p.timeoutId) {
            (clearTimeout(p.timeoutId), delete p.timeoutId);
            return;
          }
          p.$element.addClass(p.className);
        }));
      function P(p, v) {
        return p.replace(s, (v ? " ." : " ") + u);
      }
      function G(p) {
        return P(p, !0);
      }
      function V(p, v) {
        return p.addClass(P(v));
      }
      function ee(p, v) {
        return p.removeClass(P(v));
      }
      function re(p, v, c) {
        return p.toggleClass(P(v), c);
      }
      function W(p, v) {
        return p.attr("aria-hidden", v).attr("tabIndex", v ? -1 : 0);
      }
      function H(p, v) {
        return V(r(t.createElement(v || "div")), p);
      }
      function h(p, v) {
        var c =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          p +
          '" height="' +
          v +
          '"/>';
        return "data:image/svg+xml;charset=utf-8," + encodeURI(c);
      }
      return (
        (function () {
          var p = e.navigator.userAgent,
            v = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
            c = p.match(v),
            D = p.indexOf("Android ") > -1 && p.indexOf("Chrome") === -1;
          if (!D && (!c || c[2] > 7)) return;
          var U = t.createElement("style");
          (t.head.appendChild(U), e.addEventListener("resize", O, !0));
          function O() {
            var $ = e.innerHeight,
              se = e.innerWidth,
              ie =
                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                $ +
                "px}.w-lightbox-view {width:" +
                se +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.86 * $ +
                "px}.w-lightbox-image {max-width:" +
                se +
                "px;max-height:" +
                $ +
                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                0.86 * $ +
                "px}.w-lightbox-strip {padding: 0 " +
                0.01 * $ +
                "px}.w-lightbox-item {width:" +
                0.1 * $ +
                "px;padding:" +
                0.02 * $ +
                "px " +
                0.01 * $ +
                "px}.w-lightbox-thumbnail {height:" +
                0.1 * $ +
                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                0.96 * $ +
                "px}.w-lightbox-content {margin-top:" +
                0.02 * $ +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.84 * $ +
                "px}.w-lightbox-image {max-width:" +
                0.96 * se +
                "px;max-height:" +
                0.96 * $ +
                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                0.823 * se +
                "px;max-height:" +
                0.84 * $ +
                "px}}";
            U.textContent = ie;
          }
          O();
        })(),
        y
      );
    }
    va.define(
      "lightbox",
      (Kv.exports = function (e) {
        var t = {},
          r = va.env(),
          n = HF(window, document, e, r ? "#lightbox-mountpoint" : "body"),
          i = e(document),
          o,
          a,
          u = ".w-lightbox",
          s;
        t.ready = t.design = t.preview = l;
        function l() {
          ((a = r && va.env("design")),
            n.destroy(),
            (s = {}),
            (o = i.find(u)),
            o.webflowLightBox(),
            o.each(function () {
              (Nr(e(this), "open lightbox"),
                e(this).attr("aria-haspopup", "dialog"));
            }));
        }
        jQuery.fn.extend({
          webflowLightBox: function () {
            var m = this;
            e.each(m, function (y, T) {
              var A = e.data(T, u);
              (A ||
                (A = e.data(T, u, {
                  el: e(T),
                  mode: "images",
                  images: [],
                  embed: "",
                })),
                A.el.off(u),
                b(A),
                a
                  ? A.el.on("setting" + u, b.bind(null, A))
                  : A.el.on("click" + u, f(A)).on("click" + u, function (w) {
                      w.preventDefault();
                    }));
            });
          },
        });
        function b(m) {
          var y = m.el.children(".w-json").html(),
            T,
            A;
          if (!y) {
            m.items = [];
            return;
          }
          try {
            y = JSON.parse(y);
          } catch (w) {
            console.error("Malformed lightbox JSON configuration.", w);
          }
          (E(y),
            y.items.forEach(function (w) {
              w.$el = m.el;
            }),
            (T = y.group),
            T
              ? ((A = s[T]),
                A || (A = s[T] = []),
                (m.items = A),
                y.items.length &&
                  ((m.index = A.length), A.push.apply(A, y.items)))
              : ((m.items = y.items), (m.index = 0)));
        }
        function f(m) {
          return function () {
            m.items.length && n(m.items, m.index || 0);
          };
        }
        function E(m) {
          (m.images &&
            (m.images.forEach(function (y) {
              y.type = "image";
            }),
            (m.items = m.images)),
            m.embed && ((m.embed.type = "video"), (m.items = [m.embed])),
            m.groupId && (m.group = m.groupId));
        }
        return t;
      }),
    );
  });
  var Qv = g((JX, Yv) => {
    "use strict";
    var vt = Oe(),
      BF = Ct(),
      xe = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    vt.define(
      "navbar",
      (Yv.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          a = t.debounce,
          u,
          s,
          l,
          b,
          f = vt.env(),
          E = '<div class="w-nav-overlay" data-wf-ignore />',
          m = ".w-nav",
          y = "w--open",
          T = "w--nav-dropdown-open",
          A = "w--nav-dropdown-toggle-open",
          w = "w--nav-dropdown-list-open",
          N = "w--nav-link-open",
          L = BF.triggers,
          F = e();
        ((r.ready = r.design = r.preview = k),
          (r.destroy = function () {
            ((F = e()), q(), s && s.length && s.each(te));
          }));
        function k() {
          ((l = f && vt.env("design")),
            (b = vt.env("editor")),
            (u = e(document.body)),
            (s = o.find(m)),
            s.length && (s.each(Q), q(), j()));
        }
        function q() {
          vt.resize.off(K);
        }
        function j() {
          vt.resize.on(K);
        }
        function K() {
          s.each(v);
        }
        function Q(_, B) {
          var J = e(B),
            Y = e.data(B, m);
          (Y ||
            (Y = e.data(B, m, {
              open: !1,
              el: J,
              config: {},
              selectedIdx: -1,
            })),
            (Y.menu = J.find(".w-nav-menu")),
            (Y.links = Y.menu.find(".w-nav-link")),
            (Y.dropdowns = Y.menu.find(".w-dropdown")),
            (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
            (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
            (Y.button = J.find(".w-nav-button")),
            (Y.container = J.find(".w-container")),
            (Y.overlayContainerId = "w-nav-overlay-" + _),
            (Y.outside = h(Y)));
          var le = J.find(".w-nav-brand");
          (le &&
            le.attr("href") === "/" &&
            le.attr("aria-label") == null &&
            le.attr("aria-label", "home"),
            Y.button.attr("style", "-webkit-user-select: text;"),
            Y.button.attr("aria-label") == null &&
              Y.button.attr("aria-label", "menu"),
            Y.button.attr("role", "button"),
            Y.button.attr("tabindex", "0"),
            Y.button.attr("aria-controls", Y.overlayContainerId),
            Y.button.attr("aria-haspopup", "menu"),
            Y.button.attr("aria-expanded", "false"),
            Y.el.off(m),
            Y.button.off(m),
            Y.menu.off(m),
            I(Y),
            l
              ? (z(Y), Y.el.on("setting" + m, P(Y)))
              : (C(Y),
                Y.button.on("click" + m, W(Y)),
                Y.menu.on("click" + m, "a", H(Y)),
                Y.button.on("keydown" + m, G(Y)),
                Y.el.on("keydown" + m, V(Y))),
            v(_, B));
        }
        function te(_, B) {
          var J = e.data(B, m);
          J && (z(J), e.removeData(B, m));
        }
        function z(_) {
          _.overlay && (ie(_, !0), _.overlay.remove(), (_.overlay = null));
        }
        function C(_) {
          _.overlay ||
            ((_.overlay = e(E).appendTo(_.el)),
            _.overlay.attr("id", _.overlayContainerId),
            (_.parent = _.menu.parent()),
            ie(_, !0));
        }
        function I(_) {
          var B = {},
            J = _.config || {},
            Y = (B.animation = _.el.attr("data-animation") || "default");
          ((B.animOver = /^over/.test(Y)),
            (B.animDirect = /left$/.test(Y) ? -1 : 1),
            J.animation !== Y && _.open && t.defer(re, _),
            (B.easing = _.el.attr("data-easing") || "ease"),
            (B.easing2 = _.el.attr("data-easing2") || "ease"));
          var le = _.el.attr("data-duration");
          ((B.duration = le != null ? Number(le) : 400),
            (B.docHeight = _.el.attr("data-doc-height")),
            (_.config = B));
        }
        function P(_) {
          return function (B, J) {
            J = J || {};
            var Y = i.width();
            (I(_),
              J.open === !0 && $(_, !0),
              J.open === !1 && ie(_, !0),
              _.open &&
                t.defer(function () {
                  Y !== i.width() && re(_);
                }));
          };
        }
        function G(_) {
          return function (B) {
            switch (B.keyCode) {
              case xe.SPACE:
              case xe.ENTER:
                return (W(_)(), B.preventDefault(), B.stopPropagation());
              case xe.ESCAPE:
                return (ie(_), B.preventDefault(), B.stopPropagation());
              case xe.ARROW_RIGHT:
              case xe.ARROW_DOWN:
              case xe.HOME:
              case xe.END:
                return _.open
                  ? (B.keyCode === xe.END
                      ? (_.selectedIdx = _.links.length - 1)
                      : (_.selectedIdx = 0),
                    ee(_),
                    B.preventDefault(),
                    B.stopPropagation())
                  : (B.preventDefault(), B.stopPropagation());
            }
          };
        }
        function V(_) {
          return function (B) {
            if (_.open)
              switch (
                ((_.selectedIdx = _.links.index(document.activeElement)),
                B.keyCode)
              ) {
                case xe.HOME:
                case xe.END:
                  return (
                    B.keyCode === xe.END
                      ? (_.selectedIdx = _.links.length - 1)
                      : (_.selectedIdx = 0),
                    ee(_),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case xe.ESCAPE:
                  return (
                    ie(_),
                    _.button.focus(),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case xe.ARROW_LEFT:
                case xe.ARROW_UP:
                  return (
                    (_.selectedIdx = Math.max(-1, _.selectedIdx - 1)),
                    ee(_),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case xe.ARROW_RIGHT:
                case xe.ARROW_DOWN:
                  return (
                    (_.selectedIdx = Math.min(
                      _.links.length - 1,
                      _.selectedIdx + 1,
                    )),
                    ee(_),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
              }
          };
        }
        function ee(_) {
          if (_.links[_.selectedIdx]) {
            var B = _.links[_.selectedIdx];
            (B.focus(), H(B));
          }
        }
        function re(_) {
          _.open && (ie(_, !0), $(_, !0));
        }
        function W(_) {
          return a(function () {
            _.open ? ie(_) : $(_);
          });
        }
        function H(_) {
          return function (B) {
            var J = e(this),
              Y = J.attr("href");
            if (!vt.validClick(B.currentTarget)) {
              B.preventDefault();
              return;
            }
            Y && Y.indexOf("#") === 0 && _.open && ie(_);
          };
        }
        function h(_) {
          return (
            _.outside && o.off("click" + m, _.outside),
            function (B) {
              var J = e(B.target);
              (b && J.closest(".w-editor-bem-EditorOverlay").length) || p(_, J);
            }
          );
        }
        var p = a(function (_, B) {
          if (_.open) {
            var J = B.closest(".w-nav-menu");
            _.menu.is(J) || ie(_);
          }
        });
        function v(_, B) {
          var J = e.data(B, m),
            Y = (J.collapsed = J.button.css("display") !== "none");
          if ((J.open && !Y && !l && ie(J, !0), J.container.length)) {
            var le = D(J);
            (J.links.each(le), J.dropdowns.each(le));
          }
          J.open && se(J);
        }
        var c = "max-width";
        function D(_) {
          var B = _.container.css(c);
          return (
            B === "none" && (B = ""),
            function (J, Y) {
              ((Y = e(Y)), Y.css(c, ""), Y.css(c) === "none" && Y.css(c, B));
            }
          );
        }
        function U(_, B) {
          B.setAttribute("data-nav-menu-open", "");
        }
        function O(_, B) {
          B.removeAttribute("data-nav-menu-open");
        }
        function $(_, B) {
          if (_.open) return;
          ((_.open = !0),
            _.menu.each(U),
            _.links.addClass(N),
            _.dropdowns.addClass(T),
            _.dropdownToggle.addClass(A),
            _.dropdownList.addClass(w),
            _.button.addClass(y));
          var J = _.config,
            Y = J.animation;
          (Y === "none" || !n.support.transform || J.duration <= 0) && (B = !0);
          var le = se(_),
            Ie = _.menu.outerHeight(!0),
            Ae = _.menu.outerWidth(!0),
            d = _.el.height(),
            x = _.el[0];
          if (
            (v(0, x),
            L.intro(0, x),
            vt.redraw.up(),
            l || o.on("click" + m, _.outside),
            B)
          ) {
            S();
            return;
          }
          var R = "transform " + J.duration + "ms " + J.easing;
          if (
            (_.overlay &&
              ((F = _.menu.prev()), _.overlay.show().append(_.menu)),
            J.animOver)
          ) {
            (n(_.menu)
              .add(R)
              .set({ x: J.animDirect * Ae, height: le })
              .start({ x: 0 })
              .then(S),
              _.overlay && _.overlay.width(Ae));
            return;
          }
          var M = d + Ie;
          n(_.menu).add(R).set({ y: -M }).start({ y: 0 }).then(S);
          function S() {
            _.button.attr("aria-expanded", "true");
          }
        }
        function se(_) {
          var B = _.config,
            J = B.docHeight ? o.height() : u.height();
          return (
            B.animOver
              ? _.menu.height(J)
              : _.el.css("position") !== "fixed" && (J -= _.el.outerHeight(!0)),
            _.overlay && _.overlay.height(J),
            J
          );
        }
        function ie(_, B) {
          if (!_.open) return;
          ((_.open = !1), _.button.removeClass(y));
          var J = _.config;
          if (
            ((J.animation === "none" ||
              !n.support.transform ||
              J.duration <= 0) &&
              (B = !0),
            L.outro(0, _.el[0]),
            o.off("click" + m, _.outside),
            B)
          ) {
            (n(_.menu).stop(), x());
            return;
          }
          var Y = "transform " + J.duration + "ms " + J.easing2,
            le = _.menu.outerHeight(!0),
            Ie = _.menu.outerWidth(!0),
            Ae = _.el.height();
          if (J.animOver) {
            n(_.menu)
              .add(Y)
              .start({ x: Ie * J.animDirect })
              .then(x);
            return;
          }
          var d = Ae + le;
          n(_.menu).add(Y).start({ y: -d }).then(x);
          function x() {
            (_.menu.height(""),
              n(_.menu).set({ x: 0, y: 0 }),
              _.menu.each(O),
              _.links.removeClass(N),
              _.dropdowns.removeClass(T),
              _.dropdownToggle.removeClass(A),
              _.dropdownList.removeClass(w),
              _.overlay &&
                _.overlay.children().length &&
                (F.length ? _.menu.insertAfter(F) : _.menu.prependTo(_.parent),
                _.overlay.attr("style", "").hide()),
              _.el.triggerHandler("w-close"),
              _.button.attr("aria-expanded", "false"));
          }
        }
        return r;
      }),
    );
  });
  var Jv = g((eG, Zv) => {
    "use strict";
    var mt = Oe(),
      zF = Ct(),
      it = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      $v =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    mt.define(
      "slider",
      (Zv.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(document),
          o,
          a,
          u = mt.env(),
          s = ".w-slider",
          l = '<div class="w-slider-dot" data-wf-ignore />',
          b =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          f = "w-slider-force-show",
          E = zF.triggers,
          m,
          y = !1;
        ((r.ready = function () {
          ((a = mt.env("design")), T());
        }),
          (r.design = function () {
            ((a = !0), setTimeout(T, 1e3));
          }),
          (r.preview = function () {
            ((a = !1), T());
          }),
          (r.redraw = function () {
            ((y = !0), T(), (y = !1));
          }),
          (r.destroy = A));
        function T() {
          ((o = i.find(s)), o.length && (o.each(L), !m && (A(), w())));
        }
        function A() {
          (mt.resize.off(N), mt.redraw.off(r.redraw));
        }
        function w() {
          (mt.resize.on(N), mt.redraw.on(r.redraw));
        }
        function N() {
          o.filter(":visible").each(V);
        }
        function L(h, p) {
          var v = e(p),
            c = e.data(p, s);
          (c ||
            (c = e.data(p, s, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: v,
              config: {},
            })),
            (c.mask = v.children(".w-slider-mask")),
            (c.left = v.children(".w-slider-arrow-left")),
            (c.right = v.children(".w-slider-arrow-right")),
            (c.nav = v.children(".w-slider-nav")),
            (c.slides = c.mask.children(".w-slide")),
            c.slides.each(E.reset),
            y && (c.maskWidth = 0),
            v.attr("role") === void 0 && v.attr("role", "region"),
            v.attr("aria-label") === void 0 &&
              v.attr("aria-label", "carousel"));
          var D = c.mask.attr("id");
          if (
            (D || ((D = "w-slider-mask-" + h), c.mask.attr("id", D)),
            !a && !c.ariaLiveLabel && (c.ariaLiveLabel = e(b).appendTo(c.mask)),
            c.left.attr("role", "button"),
            c.left.attr("tabindex", "0"),
            c.left.attr("aria-controls", D),
            c.left.attr("aria-label") === void 0 &&
              c.left.attr("aria-label", "previous slide"),
            c.right.attr("role", "button"),
            c.right.attr("tabindex", "0"),
            c.right.attr("aria-controls", D),
            c.right.attr("aria-label") === void 0 &&
              c.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            (c.left.hide(), c.right.hide(), c.nav.hide(), (m = !0));
            return;
          }
          (c.el.off(s),
            c.left.off(s),
            c.right.off(s),
            c.nav.off(s),
            F(c),
            a
              ? (c.el.on("setting" + s, I(c)), C(c), (c.hasTimer = !1))
              : (c.el.on("swipe" + s, I(c)),
                c.left.on("click" + s, K(c)),
                c.right.on("click" + s, Q(c)),
                c.left.on("keydown" + s, j(c, K)),
                c.right.on("keydown" + s, j(c, Q)),
                c.nav.on("keydown" + s, "> div", I(c)),
                c.config.autoplay &&
                  !c.hasTimer &&
                  ((c.hasTimer = !0), (c.timerCount = 1), z(c)),
                c.el.on("mouseenter" + s, q(c, !0, "mouse")),
                c.el.on("focusin" + s, q(c, !0, "keyboard")),
                c.el.on("mouseleave" + s, q(c, !1, "mouse")),
                c.el.on("focusout" + s, q(c, !1, "keyboard"))),
            c.nav.on("click" + s, "> div", I(c)),
            u ||
              c.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove());
          var U = v.filter(":hidden");
          U.addClass(f);
          var O = v.parents(":hidden");
          (O.addClass(f), y || V(h, p), U.removeClass(f), O.removeClass(f));
        }
        function F(h) {
          var p = {};
          ((p.crossOver = 0),
            (p.animation = h.el.attr("data-animation") || "slide"),
            p.animation === "outin" &&
              ((p.animation = "cross"), (p.crossOver = 0.5)),
            (p.easing = h.el.attr("data-easing") || "ease"));
          var v = h.el.attr("data-duration");
          if (
            ((p.duration = v != null ? parseInt(v, 10) : 500),
            k(h.el.attr("data-infinite")) && (p.infinite = !0),
            k(h.el.attr("data-disable-swipe")) && (p.disableSwipe = !0),
            k(h.el.attr("data-hide-arrows"))
              ? (p.hideArrows = !0)
              : h.config.hideArrows && (h.left.show(), h.right.show()),
            k(h.el.attr("data-autoplay")))
          ) {
            ((p.autoplay = !0),
              (p.delay = parseInt(h.el.attr("data-delay"), 10) || 2e3),
              (p.timerMax = parseInt(h.el.attr("data-autoplay-limit"), 10)));
            var c = "mousedown" + s + " touchstart" + s;
            a ||
              h.el.off(c).one(c, function () {
                C(h);
              });
          }
          var D = h.right.width();
          ((p.edge = D ? D + 40 : 100), (h.config = p));
        }
        function k(h) {
          return h === "1" || h === "true";
        }
        function q(h, p, v) {
          return function (c) {
            if (p) h.hasFocus[v] = p;
            else if (
              e.contains(h.el.get(0), c.relatedTarget) ||
              ((h.hasFocus[v] = p),
              (h.hasFocus.mouse && v === "keyboard") ||
                (h.hasFocus.keyboard && v === "mouse"))
            )
              return;
            p
              ? (h.ariaLiveLabel.attr("aria-live", "polite"),
                h.hasTimer && C(h))
              : (h.ariaLiveLabel.attr("aria-live", "off"), h.hasTimer && z(h));
          };
        }
        function j(h, p) {
          return function (v) {
            switch (v.keyCode) {
              case it.SPACE:
              case it.ENTER:
                return (p(h)(), v.preventDefault(), v.stopPropagation());
            }
          };
        }
        function K(h) {
          return function () {
            G(h, { index: h.index - 1, vector: -1 });
          };
        }
        function Q(h) {
          return function () {
            G(h, { index: h.index + 1, vector: 1 });
          };
        }
        function te(h, p) {
          var v = null;
          (p === h.slides.length && (T(), ee(h)),
            t.each(h.anchors, function (c, D) {
              e(c.els).each(function (U, O) {
                e(O).index() === p && (v = D);
              });
            }),
            v != null && G(h, { index: v, immediate: !0 }));
        }
        function z(h) {
          C(h);
          var p = h.config,
            v = p.timerMax;
          (v && h.timerCount++ > v) ||
            (h.timerId = window.setTimeout(function () {
              h.timerId == null || a || (Q(h)(), z(h));
            }, p.delay));
        }
        function C(h) {
          (window.clearTimeout(h.timerId), (h.timerId = null));
        }
        function I(h) {
          return function (p, v) {
            v = v || {};
            var c = h.config;
            if (a && p.type === "setting") {
              if (v.select === "prev") return K(h)();
              if (v.select === "next") return Q(h)();
              if ((F(h), ee(h), v.select == null)) return;
              te(h, v.select);
              return;
            }
            if (p.type === "swipe")
              return c.disableSwipe || mt.env("editor")
                ? void 0
                : v.direction === "left"
                  ? Q(h)()
                  : v.direction === "right"
                    ? K(h)()
                    : void 0;
            if (h.nav.has(p.target).length) {
              var D = e(p.target).index();
              if (
                (p.type === "click" && G(h, { index: D }), p.type === "keydown")
              )
                switch (p.keyCode) {
                  case it.ENTER:
                  case it.SPACE: {
                    (G(h, { index: D }), p.preventDefault());
                    break;
                  }
                  case it.ARROW_LEFT:
                  case it.ARROW_UP: {
                    (P(h.nav, Math.max(D - 1, 0)), p.preventDefault());
                    break;
                  }
                  case it.ARROW_RIGHT:
                  case it.ARROW_DOWN: {
                    (P(h.nav, Math.min(D + 1, h.pages)), p.preventDefault());
                    break;
                  }
                  case it.HOME: {
                    (P(h.nav, 0), p.preventDefault());
                    break;
                  }
                  case it.END: {
                    (P(h.nav, h.pages), p.preventDefault());
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function P(h, p) {
          var v = h.children().eq(p).focus();
          h.children().not(v);
        }
        function G(h, p) {
          p = p || {};
          var v = h.config,
            c = h.anchors;
          h.previous = h.index;
          var D = p.index,
            U = {};
          (D < 0
            ? ((D = c.length - 1),
              v.infinite &&
                ((U.x = -h.endX), (U.from = 0), (U.to = c[0].width)))
            : D >= c.length &&
              ((D = 0),
              v.infinite &&
                ((U.x = c[c.length - 1].width),
                (U.from = -c[c.length - 1].x),
                (U.to = U.from - U.x))),
            (h.index = D));
          var O = h.nav
            .children()
            .eq(D)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          (h.nav
            .children()
            .not(O)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            v.hideArrows &&
              (h.index === c.length - 1 ? h.right.hide() : h.right.show(),
              h.index === 0 ? h.left.hide() : h.left.show()));
          var $ = h.offsetX || 0,
            se = (h.offsetX = -c[h.index].x),
            ie = { x: se, opacity: 1, visibility: "" },
            _ = e(c[h.index].els),
            B = e(c[h.previous] && c[h.previous].els),
            J = h.slides.not(_),
            Y = v.animation,
            le = v.easing,
            Ie = Math.round(v.duration),
            Ae = p.vector || (h.index > h.previous ? 1 : -1),
            d = "opacity " + Ie + "ms " + le,
            x = "transform " + Ie + "ms " + le;
          if (
            (_.find($v).removeAttr("tabindex"),
            _.removeAttr("aria-hidden"),
            _.find("*").removeAttr("aria-hidden"),
            J.find($v).attr("tabindex", "-1"),
            J.attr("aria-hidden", "true"),
            J.find("*").attr("aria-hidden", "true"),
            a || (_.each(E.intro), J.each(E.outro)),
            p.immediate && !y)
          ) {
            (n(_).set(ie), S());
            return;
          }
          if (h.index === h.previous) return;
          if (
            (a || h.ariaLiveLabel.text(`Slide ${D + 1} of ${c.length}.`),
            Y === "cross")
          ) {
            var R = Math.round(Ie - Ie * v.crossOver),
              M = Math.round(Ie - R);
            ((d = "opacity " + R + "ms " + le),
              n(B).set({ visibility: "" }).add(d).start({ opacity: 0 }),
              n(_)
                .set({ visibility: "", x: se, opacity: 0, zIndex: h.depth++ })
                .add(d)
                .wait(M)
                .then({ opacity: 1 })
                .then(S));
            return;
          }
          if (Y === "fade") {
            (n(B).set({ visibility: "" }).stop(),
              n(_)
                .set({ visibility: "", x: se, opacity: 0, zIndex: h.depth++ })
                .add(d)
                .start({ opacity: 1 })
                .then(S));
            return;
          }
          if (Y === "over") {
            ((ie = { x: h.endX }),
              n(B).set({ visibility: "" }).stop(),
              n(_)
                .set({
                  visibility: "",
                  zIndex: h.depth++,
                  x: se + c[h.index].width * Ae,
                })
                .add(x)
                .start({ x: se })
                .then(S));
            return;
          }
          v.infinite && U.x
            ? (n(h.slides.not(B))
                .set({ visibility: "", x: U.x })
                .add(x)
                .start({ x: se }),
              n(B).set({ visibility: "", x: U.from }).add(x).start({ x: U.to }),
              (h.shifted = B))
            : (v.infinite &&
                h.shifted &&
                (n(h.shifted).set({ visibility: "", x: $ }),
                (h.shifted = null)),
              n(h.slides).set({ visibility: "" }).add(x).start({ x: se }));
          function S() {
            ((_ = e(c[h.index].els)),
              (J = h.slides.not(_)),
              Y !== "slide" && (ie.visibility = "hidden"),
              n(J).set(ie));
          }
        }
        function V(h, p) {
          var v = e.data(p, s);
          if (v) {
            if (W(v)) return ee(v);
            a && H(v) && ee(v);
          }
        }
        function ee(h) {
          var p = 1,
            v = 0,
            c = 0,
            D = 0,
            U = h.maskWidth,
            O = U - h.config.edge;
          (O < 0 && (O = 0),
            (h.anchors = [{ els: [], x: 0, width: 0 }]),
            h.slides.each(function (se, ie) {
              (c - v > O &&
                (p++,
                (v += U),
                (h.anchors[p - 1] = { els: [], x: c, width: 0 })),
                (D = e(ie).outerWidth(!0)),
                (c += D),
                (h.anchors[p - 1].width += D),
                h.anchors[p - 1].els.push(ie));
              var _ = se + 1 + " of " + h.slides.length;
              (e(ie).attr("aria-label", _), e(ie).attr("role", "group"));
            }),
            (h.endX = c),
            a && (h.pages = null),
            h.nav.length && h.pages !== p && ((h.pages = p), re(h)));
          var $ = h.index;
          ($ >= p && ($ = p - 1), G(h, { immediate: !0, index: $ }));
        }
        function re(h) {
          var p = [],
            v,
            c = h.el.attr("data-nav-spacing");
          c && (c = parseFloat(c) + "px");
          for (var D = 0, U = h.pages; D < U; D++)
            ((v = e(l)),
              v
                .attr("aria-label", "Show slide " + (D + 1) + " of " + U)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              h.nav.hasClass("w-num") && v.text(D + 1),
              c != null && v.css({ "margin-left": c, "margin-right": c }),
              p.push(v));
          h.nav.empty().append(p);
        }
        function W(h) {
          var p = h.mask.width();
          return h.maskWidth !== p ? ((h.maskWidth = p), !0) : !1;
        }
        function H(h) {
          var p = 0;
          return (
            h.slides.each(function (v, c) {
              p += e(c).outerWidth(!0);
            }),
            h.slidesWidth !== p ? ((h.slidesWidth = p), !0) : !1
          );
        }
        return r;
      }),
    );
  });
  var tm = g((tG, em) => {
    "use strict";
    var Et = Oe(),
      KF = Ct();
    Et.define(
      "tabs",
      (em.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          a = Et.env,
          u = a.safari,
          s = a(),
          l = "data-w-tab",
          b = "data-w-pane",
          f = ".w-tabs",
          E = "w--current",
          m = "w--tab-active",
          y = KF.triggers,
          T = !1;
        ((t.ready = t.design = t.preview = A),
          (t.redraw = function () {
            ((T = !0), A(), (T = !1));
          }),
          (t.destroy = function () {
            ((i = n.find(f)), i.length && (i.each(L), w()));
          }));
        function A() {
          ((o = s && Et.env("design")),
            (i = n.find(f)),
            i.length &&
              (i.each(F), Et.env("preview") && !T && i.each(L), w(), N()));
        }
        function w() {
          Et.redraw.off(t.redraw);
        }
        function N() {
          Et.redraw.on(t.redraw);
        }
        function L(z, C) {
          var I = e.data(C, f);
          I &&
            (I.links && I.links.each(y.reset),
            I.panes && I.panes.each(y.reset));
        }
        function F(z, C) {
          var I = f.substr(1) + "-" + z,
            P = e(C),
            G = e.data(C, f);
          if (
            (G || (G = e.data(C, f, { el: P, config: {} })),
            (G.current = null),
            (G.tabIdentifier = I + "-" + l),
            (G.paneIdentifier = I + "-" + b),
            (G.menu = P.children(".w-tab-menu")),
            (G.links = G.menu.children(".w-tab-link")),
            (G.content = P.children(".w-tab-content")),
            (G.panes = G.content.children(".w-tab-pane")),
            G.el.off(f),
            G.links.off(f),
            G.menu.attr("role", "tablist"),
            G.links.attr("tabindex", "-1"),
            k(G),
            !o)
          ) {
            (G.links.on("click" + f, j(G)), G.links.on("keydown" + f, K(G)));
            var V = G.links.filter("." + E),
              ee = V.attr(l);
            ee && Q(G, { tab: ee, immediate: !0 });
          }
        }
        function k(z) {
          var C = {};
          C.easing = z.el.attr("data-easing") || "ease";
          var I = parseInt(z.el.attr("data-duration-in"), 10);
          I = C.intro = I === I ? I : 0;
          var P = parseInt(z.el.attr("data-duration-out"), 10);
          ((P = C.outro = P === P ? P : 0),
            (C.immediate = !I && !P),
            (z.config = C));
        }
        function q(z) {
          var C = z.current;
          return Array.prototype.findIndex.call(
            z.links,
            (I) => I.getAttribute(l) === C,
            null,
          );
        }
        function j(z) {
          return function (C) {
            C.preventDefault();
            var I = C.currentTarget.getAttribute(l);
            I && Q(z, { tab: I });
          };
        }
        function K(z) {
          return function (C) {
            var I = q(z),
              P = C.key,
              G = {
                ArrowLeft: I - 1,
                ArrowUp: I - 1,
                ArrowRight: I + 1,
                ArrowDown: I + 1,
                End: z.links.length - 1,
                Home: 0,
              };
            if (P in G) {
              C.preventDefault();
              var V = G[P];
              (V === -1 && (V = z.links.length - 1),
                V === z.links.length && (V = 0));
              var ee = z.links[V],
                re = ee.getAttribute(l);
              re && Q(z, { tab: re });
            }
          };
        }
        function Q(z, C) {
          C = C || {};
          var I = z.config,
            P = I.easing,
            G = C.tab;
          if (G !== z.current) {
            z.current = G;
            var V;
            z.links.each(function (v, c) {
              var D = e(c);
              if (C.immediate || I.immediate) {
                var U = z.panes[v];
                (c.id || (c.id = z.tabIdentifier + "-" + v),
                  U.id || (U.id = z.paneIdentifier + "-" + v),
                  (c.href = "#" + U.id),
                  c.setAttribute("role", "tab"),
                  c.setAttribute("aria-controls", U.id),
                  c.setAttribute("aria-selected", "false"),
                  U.setAttribute("role", "tabpanel"),
                  U.setAttribute("aria-labelledby", c.id));
              }
              c.getAttribute(l) === G
                ? ((V = c),
                  D.addClass(E)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(y.intro))
                : D.hasClass(E) &&
                  D.removeClass(E)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(y.outro);
            });
            var ee = [],
              re = [];
            z.panes.each(function (v, c) {
              var D = e(c);
              c.getAttribute(l) === G
                ? ee.push(c)
                : D.hasClass(m) && re.push(c);
            });
            var W = e(ee),
              H = e(re);
            if (C.immediate || I.immediate) {
              (W.addClass(m).each(y.intro),
                H.removeClass(m),
                T || Et.redraw.up());
              return;
            } else {
              var h = window.scrollX,
                p = window.scrollY;
              (V.focus(), window.scrollTo(h, p));
            }
            H.length && I.outro
              ? (H.each(y.outro),
                r(H)
                  .add("opacity " + I.outro + "ms " + P, { fallback: u })
                  .start({ opacity: 0 })
                  .then(() => te(I, H, W)))
              : te(I, H, W);
          }
        }
        function te(z, C, I) {
          if (
            (C.removeClass(m).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            I.addClass(m).each(y.intro),
            Et.redraw.up(),
            !z.intro)
          )
            return r(I).set({ opacity: 1 });
          r(I)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + z.intro + "ms " + z.easing, { fallback: u })
            .start({ opacity: 1 });
        }
        return t;
      }),
    );
  });
  Pa();
  Da();
  Fa();
  Xa();
  Ct();
  Nv();
  Mv();
  qv();
  Xv();
  Wv();
  Bv();
  jv();
  Qv();
  Jv();
  tm();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-582",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828690407,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-581",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828690407,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828884200,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-3",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828884200,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4e8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4e8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828884660,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4e8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4e8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710828884660,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842284768,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842284769,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|59d277ac-8025-0788-b016-9fce1a41f53e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|59d277ac-8025-0788-b016-9fce1a41f53e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842719972,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-17",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|59d277ac-8025-0788-b016-9fce1a41f53e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|59d277ac-8025-0788-b016-9fce1a41f53e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842719973,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-20",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|762935d2-cc2b-c352-5de3-5c9e3abf8a8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|762935d2-cc2b-c352-5de3-5c9e3abf8a8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842731137,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-19",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|762935d2-cc2b-c352-5de3-5c9e3abf8a8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|762935d2-cc2b-c352-5de3-5c9e3abf8a8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710842731137,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2aca4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2aca4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844149758,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2aca4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2aca4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844149759,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acc8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acc8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844472371,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acc8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acc8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844472371,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acbf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acbf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473044,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acbf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acbf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473044,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acb6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acb6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473241,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acb6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acb6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473241,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473921,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2acad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2acad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710844473921,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|a9276b47-a4dd-e954-f7b2-1c71199b47cc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|a9276b47-a4dd-e954-f7b2-1c71199b47cc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710846944105,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|a9276b47-a4dd-e954-f7b2-1c71199b47cc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|a9276b47-a4dd-e954-f7b2-1c71199b47cc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710846944105,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|30683b31-a41c-20a3-aefa-e572aaae2712",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|30683b31-a41c-20a3-aefa-e572aaae2712",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710851358031,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|30683b31-a41c-20a3-aefa-e572aaae2712",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|30683b31-a41c-20a3-aefa-e572aaae2712",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1710851358031,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-62",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711188446874,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711188446874,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-64",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|073c619e-e215-beed-49e6-55575a30f093",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|073c619e-e215-beed-49e6-55575a30f093",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713437794860,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|073c619e-e215-beed-49e6-55575a30f093",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|073c619e-e215-beed-49e6-55575a30f093",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713437794861,
    },
    "e-65": {
      id: "e-65",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-66",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|e5a89cd9-3b7a-4d03-5f5b-7be450c02733",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|e5a89cd9-3b7a-4d03-5f5b-7be450c02733",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713502990195,
    },
    "e-66": {
      id: "e-66",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-65",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|e5a89cd9-3b7a-4d03-5f5b-7be450c02733",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|e5a89cd9-3b7a-4d03-5f5b-7be450c02733",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713502990196,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|57a8ab7c-4c42-7962-46ad-f3d46b70940d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|57a8ab7c-4c42-7962-46ad-f3d46b70940d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713503106527,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-67",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|57a8ab7c-4c42-7962-46ad-f3d46b70940d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|57a8ab7c-4c42-7962-46ad-f3d46b70940d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713503106527,
    },
    "e-79": {
      id: "e-79",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|859d663e-358a-5dcc-d008-c94a1870ba0c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|859d663e-358a-5dcc-d008-c94a1870ba0c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522617338,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-79",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|859d663e-358a-5dcc-d008-c94a1870ba0c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|859d663e-358a-5dcc-d008-c94a1870ba0c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522617340,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-82",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|da5f8906-db3e-1d77-bfb6-9e29d7f9615f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|da5f8906-db3e-1d77-bfb6-9e29d7f9615f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522719822,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|da5f8906-db3e-1d77-bfb6-9e29d7f9615f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|da5f8906-db3e-1d77-bfb6-9e29d7f9615f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522719822,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-84",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|bac6b890-5148-b75e-0a66-f2b73f9b4699",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|bac6b890-5148-b75e-0a66-f2b73f9b4699",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522720168,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-83",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|bac6b890-5148-b75e-0a66-f2b73f9b4699",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|bac6b890-5148-b75e-0a66-f2b73f9b4699",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713522720168,
    },
    "e-85": {
      id: "e-85",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-86",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|e66a3b85-7aa1-79cd-56ee-62c106e4ba1c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|e66a3b85-7aa1-79cd-56ee-62c106e4ba1c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713523028490,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-85",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|e66a3b85-7aa1-79cd-56ee-62c106e4ba1c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|e66a3b85-7aa1-79cd-56ee-62c106e4ba1c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713523028491,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-96",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|bfc338d6-0d70-e834-e8ae-cef34cdefe35",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|bfc338d6-0d70-e834-e8ae-cef34cdefe35",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713527178575,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-98",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713530971353,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713530971354,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5b1bea9c-97a1-8bd9-3c6c-cfaf6ee6c51d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5b1bea9c-97a1-8bd9-3c6c-cfaf6ee6c51d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531122680,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-99",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5b1bea9c-97a1-8bd9-3c6c-cfaf6ee6c51d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5b1bea9c-97a1-8bd9-3c6c-cfaf6ee6c51d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531122680,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-102",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|a4e7da59-5a93-cbf4-0310-3a54161875fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|a4e7da59-5a93-cbf4-0310-3a54161875fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531122867,
    },
    "e-102": {
      id: "e-102",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-101",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|a4e7da59-5a93-cbf4-0310-3a54161875fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|a4e7da59-5a93-cbf4-0310-3a54161875fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531122867,
    },
    "e-103": {
      id: "e-103",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-104",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|e43ffedb-047f-477a-12fb-a78247dad8d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|e43ffedb-047f-477a-12fb-a78247dad8d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123113,
    },
    "e-104": {
      id: "e-104",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-103",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|e43ffedb-047f-477a-12fb-a78247dad8d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|e43ffedb-047f-477a-12fb-a78247dad8d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123113,
    },
    "e-105": {
      id: "e-105",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-106",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5ecca389-6f5e-7822-92cd-4b75157bbf5d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5ecca389-6f5e-7822-92cd-4b75157bbf5d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123498,
    },
    "e-106": {
      id: "e-106",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-105",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5ecca389-6f5e-7822-92cd-4b75157bbf5d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5ecca389-6f5e-7822-92cd-4b75157bbf5d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123498,
    },
    "e-107": {
      id: "e-107",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-108",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|ccbc06dc-f40b-11dc-9332-4ee9962a2472",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|ccbc06dc-f40b-11dc-9332-4ee9962a2472",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123824,
    },
    "e-108": {
      id: "e-108",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-107",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|ccbc06dc-f40b-11dc-9332-4ee9962a2472",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|ccbc06dc-f40b-11dc-9332-4ee9962a2472",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713531123824,
    },
    "e-109": {
      id: "e-109",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-110",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713930739633,
    },
    "e-110": {
      id: "e-110",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-109",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713930739634,
    },
    "e-111": {
      id: "e-111",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-112",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713931949638,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-111",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713931949638,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-122",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561658",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561658",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-121",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561658",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561658",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-124",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561682",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561682",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-123",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561682",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a561682",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-126",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a5616af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a5616af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-126": {
      id: "e-126",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-125",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a5616af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|26cec828-d924-e01a-509f-b8382a5616af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714448764552,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-146",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714456725440,
    },
    "e-146": {
      id: "e-146",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-145",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714456725441,
    },
    "e-147": {
      id: "e-147",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-148",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|4c19cae0-017c-5600-fe0a-be899e88980d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|4c19cae0-017c-5600-fe0a-be899e88980d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714464679113,
    },
    "e-148": {
      id: "e-148",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-147",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|4c19cae0-017c-5600-fe0a-be899e88980d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|4c19cae0-017c-5600-fe0a-be899e88980d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714464679113,
    },
    "e-149": {
      id: "e-149",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-150",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|270b8993-dfd1-8b4e-1df0-e56db1a8e57d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|270b8993-dfd1-8b4e-1df0-e56db1a8e57d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714464679530,
    },
    "e-150": {
      id: "e-150",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-149",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|270b8993-dfd1-8b4e-1df0-e56db1a8e57d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|270b8993-dfd1-8b4e-1df0-e56db1a8e57d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714464679530,
    },
    "e-187": {
      id: "e-187",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-188",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|aa8a5207-0bd3-8c57-f2e3-9d96ac44d3f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|aa8a5207-0bd3-8c57-f2e3-9d96ac44d3f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714542979475,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-190",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-190": {
      id: "e-190",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-189",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-191": {
      id: "e-191",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-192",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-192": {
      id: "e-192",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-191",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341e9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341e9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-193": {
      id: "e-193",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-194",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-194": {
      id: "e-194",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-193",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-195": {
      id: "e-195",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-196",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341ef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-196": {
      id: "e-196",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-195",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341ef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714543328063,
    },
    "e-197": {
      id: "e-197",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-198",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3965",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3965",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-198": {
      id: "e-198",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-197",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3965",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3965",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-199": {
      id: "e-199",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-200",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e398d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e398d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-200": {
      id: "e-200",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-199",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e398d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e398d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-202",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3983",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3983",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-202": {
      id: "e-202",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-201",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3983",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3983",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-203": {
      id: "e-203",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-204",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3979",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3979",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-204": {
      id: "e-204",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-203",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e3979",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e3979",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-205": {
      id: "e-205",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-206",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e396f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e396f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-206": {
      id: "e-206",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-205",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e396f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e396f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714544271950,
    },
    "e-209": {
      id: "e-209",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-210",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|eb7dbcff-34d1-b29f-1e7d-dd312d574484",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|eb7dbcff-34d1-b29f-1e7d-dd312d574484",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714546377331,
    },
    "e-210": {
      id: "e-210",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-209",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|eb7dbcff-34d1-b29f-1e7d-dd312d574484",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|eb7dbcff-34d1-b29f-1e7d-dd312d574484",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714546377331,
    },
    "e-211": {
      id: "e-211",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-212",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c57603b9-d682-fc86-a633-ff2ea34ba03b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c57603b9-d682-fc86-a633-ff2ea34ba03b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577745057,
    },
    "e-212": {
      id: "e-212",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-211",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c57603b9-d682-fc86-a633-ff2ea34ba03b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c57603b9-d682-fc86-a633-ff2ea34ba03b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577745058,
    },
    "e-213": {
      id: "e-213",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-214",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "81a27c48-106d-b4f4-bd48-20892b891044",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "81a27c48-106d-b4f4-bd48-20892b891044",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577825228,
    },
    "e-214": {
      id: "e-214",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-213",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "81a27c48-106d-b4f4-bd48-20892b891044",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "81a27c48-106d-b4f4-bd48-20892b891044",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577825228,
    },
    "e-215": {
      id: "e-215",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-216",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fb48e696-5b2f-5f35-a13c-aa31afe54ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fb48e696-5b2f-5f35-a13c-aa31afe54ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577838835,
    },
    "e-216": {
      id: "e-216",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-215",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fb48e696-5b2f-5f35-a13c-aa31afe54ee1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fb48e696-5b2f-5f35-a13c-aa31afe54ee1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577838835,
    },
    "e-217": {
      id: "e-217",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-218",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ad1cd6ac-a2de-8a9b-b477-9cb1621b8aa7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ad1cd6ac-a2de-8a9b-b477-9cb1621b8aa7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577856252,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-217",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ad1cd6ac-a2de-8a9b-b477-9cb1621b8aa7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ad1cd6ac-a2de-8a9b-b477-9cb1621b8aa7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577856252,
    },
    "e-219": {
      id: "e-219",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-220",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fbf36a76-807c-4fdf-2155-e9ddf1593594",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fbf36a76-807c-4fdf-2155-e9ddf1593594",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577869059,
    },
    "e-220": {
      id: "e-220",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-219",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fbf36a76-807c-4fdf-2155-e9ddf1593594",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fbf36a76-807c-4fdf-2155-e9ddf1593594",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577869059,
    },
    "e-221": {
      id: "e-221",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-222",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|69a17d82-7d19-c852-4ee6-19300891ee8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|69a17d82-7d19-c852-4ee6-19300891ee8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577894572,
    },
    "e-222": {
      id: "e-222",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-221",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|69a17d82-7d19-c852-4ee6-19300891ee8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|69a17d82-7d19-c852-4ee6-19300891ee8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715577894572,
    },
    "e-223": {
      id: "e-223",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-224",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578006054,
    },
    "e-224": {
      id: "e-224",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-223",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578006054,
    },
    "e-225": {
      id: "e-225",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-226",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|5488e526-004d-45ca-45d1-7343207fafe0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|5488e526-004d-45ca-45d1-7343207fafe0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578018492,
    },
    "e-226": {
      id: "e-226",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-225",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|5488e526-004d-45ca-45d1-7343207fafe0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|5488e526-004d-45ca-45d1-7343207fafe0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578018492,
    },
    "e-227": {
      id: "e-227",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-228",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|1400eb67-d429-a33a-ead7-e2afa9c35c70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|1400eb67-d429-a33a-ead7-e2afa9c35c70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578020455,
    },
    "e-228": {
      id: "e-228",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-227",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|1400eb67-d429-a33a-ead7-e2afa9c35c70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|1400eb67-d429-a33a-ead7-e2afa9c35c70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578020455,
    },
    "e-229": {
      id: "e-229",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-230",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|98407f3e-e5cd-e2a1-3294-9707fb08e94a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|98407f3e-e5cd-e2a1-3294-9707fb08e94a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578020984,
    },
    "e-230": {
      id: "e-230",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-229",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|98407f3e-e5cd-e2a1-3294-9707fb08e94a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|98407f3e-e5cd-e2a1-3294-9707fb08e94a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578020984,
    },
    "e-231": {
      id: "e-231",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-232",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|57c18e95-d530-d96c-c27b-3e00d856007d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|57c18e95-d530-d96c-c27b-3e00d856007d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578021743,
    },
    "e-232": {
      id: "e-232",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-231",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80e6e6e18691b6f205163|57c18e95-d530-d96c-c27b-3e00d856007d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80e6e6e18691b6f205163|57c18e95-d530-d96c-c27b-3e00d856007d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578021743,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-234",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "03b8dd5f-3f57-3fa9-fd9f-a16092cb7977",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "03b8dd5f-3f57-3fa9-fd9f-a16092cb7977",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578299710,
    },
    "e-234": {
      id: "e-234",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-233",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "03b8dd5f-3f57-3fa9-fd9f-a16092cb7977",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "03b8dd5f-3f57-3fa9-fd9f-a16092cb7977",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578299712,
    },
    "e-235": {
      id: "e-235",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-236",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fd13861b-f577-8356-fb2b-628c0a3652e8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fd13861b-f577-8356-fb2b-628c0a3652e8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578311478,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-235",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "fd13861b-f577-8356-fb2b-628c0a3652e8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fd13861b-f577-8356-fb2b-628c0a3652e8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578311479,
    },
    "e-237": {
      id: "e-237",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-238",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6b622e3f-2f95-9d64-71c2-3148e033e1fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6b622e3f-2f95-9d64-71c2-3148e033e1fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578323527,
    },
    "e-238": {
      id: "e-238",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-237",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6b622e3f-2f95-9d64-71c2-3148e033e1fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6b622e3f-2f95-9d64-71c2-3148e033e1fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715578323528,
    },
    "e-239": {
      id: "e-239",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-240",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584108398,
    },
    "e-240": {
      id: "e-240",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-239",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "16f5a915-c1fe-a3a1-71fd-ff002c7d9e53",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584108399,
    },
    "e-241": {
      id: "e-241",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-242",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5488e526-004d-45ca-45d1-7343207fafe0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5488e526-004d-45ca-45d1-7343207fafe0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584140844,
    },
    "e-242": {
      id: "e-242",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-241",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5488e526-004d-45ca-45d1-7343207fafe0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5488e526-004d-45ca-45d1-7343207fafe0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584140845,
    },
    "e-243": {
      id: "e-243",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-244",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "1400eb67-d429-a33a-ead7-e2afa9c35c70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1400eb67-d429-a33a-ead7-e2afa9c35c70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584152156,
    },
    "e-244": {
      id: "e-244",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-243",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "1400eb67-d429-a33a-ead7-e2afa9c35c70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1400eb67-d429-a33a-ead7-e2afa9c35c70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584152157,
    },
    "e-245": {
      id: "e-245",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-246",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "98407f3e-e5cd-e2a1-3294-9707fb08e94a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "98407f3e-e5cd-e2a1-3294-9707fb08e94a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584162236,
    },
    "e-246": {
      id: "e-246",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-245",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "98407f3e-e5cd-e2a1-3294-9707fb08e94a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "98407f3e-e5cd-e2a1-3294-9707fb08e94a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584162237,
    },
    "e-247": {
      id: "e-247",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-248",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "57c18e95-d530-d96c-c27b-3e00d856007d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "57c18e95-d530-d96c-c27b-3e00d856007d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584179815,
    },
    "e-248": {
      id: "e-248",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-247",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "57c18e95-d530-d96c-c27b-3e00d856007d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "57c18e95-d530-d96c-c27b-3e00d856007d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584179816,
    },
    "e-249": {
      id: "e-249",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-250",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "69a17d82-7d19-c852-4ee6-19300891ee8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "69a17d82-7d19-c852-4ee6-19300891ee8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584198085,
    },
    "e-250": {
      id: "e-250",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-249",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "69a17d82-7d19-c852-4ee6-19300891ee8f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "69a17d82-7d19-c852-4ee6-19300891ee8f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715584198086,
    },
    "e-251": {
      id: "e-251",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-252",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7df5142-42fc-b604-2a13-6981b811ecf8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7df5142-42fc-b604-2a13-6981b811ecf8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716868984946,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-251",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7df5142-42fc-b604-2a13-6981b811ecf8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7df5142-42fc-b604-2a13-6981b811ecf8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716868984946,
    },
    "e-287": {
      id: "e-287",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-288",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|080a892e-1b6d-028c-e4fb-837513119b16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|080a892e-1b6d-028c-e4fb-837513119b16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719474858561,
    },
    "e-288": {
      id: "e-288",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-287",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|080a892e-1b6d-028c-e4fb-837513119b16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|080a892e-1b6d-028c-e4fb-837513119b16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719474858562,
    },
    "e-299": {
      id: "e-299",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-300",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719836758366,
    },
    "e-300": {
      id: "e-300",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-299",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719836758368,
    },
    "e-301": {
      id: "e-301",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-302",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719837235605,
    },
    "e-302": {
      id: "e-302",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-301",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719837235606,
    },
    "e-303": {
      id: "e-303",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-304",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c429",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c429",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719992535856,
    },
    "e-304": {
      id: "e-304",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-303",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c429",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c429",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1719992535858,
    },
    "e-317": {
      id: "e-317",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-318",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720004248785,
    },
    "e-318": {
      id: "e-318",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-317",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720004248786,
    },
    "e-319": {
      id: "e-319",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-320",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720004487643,
    },
    "e-320": {
      id: "e-320",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-319",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d17",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720004487644,
    },
    "e-327": {
      id: "e-327",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-52",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-328",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d350e757-9231-1516-b4cc-1556824dfd4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d350e757-9231-1516-b4cc-1556824dfd4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720005084478,
    },
    "e-328": {
      id: "e-328",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-327",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d350e757-9231-1516-b4cc-1556824dfd4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d350e757-9231-1516-b4cc-1556824dfd4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720005084479,
    },
    "e-339": {
      id: "e-339",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-340",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "974e5fcb-d8b7-df9e-e0e7-09ae5b850a95",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "974e5fcb-d8b7-df9e-e0e7-09ae5b850a95",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720430731995,
    },
    "e-340": {
      id: "e-340",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-339",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "974e5fcb-d8b7-df9e-e0e7-09ae5b850a95",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "974e5fcb-d8b7-df9e-e0e7-09ae5b850a95",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720430731997,
    },
    "e-341": {
      id: "e-341",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-342",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|19a3a752-81f6-84ab-18f4-184a10ede40c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|19a3a752-81f6-84ab-18f4-184a10ede40c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720430982190,
    },
    "e-342": {
      id: "e-342",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-341",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|19a3a752-81f6-84ab-18f4-184a10ede40c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|19a3a752-81f6-84ab-18f4-184a10ede40c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720430982190,
    },
    "e-343": {
      id: "e-343",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-58",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-344",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5182da43-b51b-7ef1-9c32-ea265e030a38",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5182da43-b51b-7ef1-9c32-ea265e030a38",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721373966663,
    },
    "e-344": {
      id: "e-344",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-59",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-343",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|5182da43-b51b-7ef1-9c32-ea265e030a38",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|5182da43-b51b-7ef1-9c32-ea265e030a38",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721373966665,
    },
    "e-345": {
      id: "e-345",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-58",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-346",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|71946fe1-8aff-ee48-6ed2-4ce637f3d86c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|71946fe1-8aff-ee48-6ed2-4ce637f3d86c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721374313654,
    },
    "e-346": {
      id: "e-346",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-59",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-345",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|71946fe1-8aff-ee48-6ed2-4ce637f3d86c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|71946fe1-8aff-ee48-6ed2-4ce637f3d86c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721374313654,
    },
    "e-347": {
      id: "e-347",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-348",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b181",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b181",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721639666254,
    },
    "e-348": {
      id: "e-348",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-347",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b181",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b181",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721639666255,
    },
    "e-349": {
      id: "e-349",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-350",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "22f5a2b3-cc54-2a3c-00e4-a82b3f09f083",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "22f5a2b3-cc54-2a3c-00e4-a82b3f09f083",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721639892559,
    },
    "e-350": {
      id: "e-350",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-349",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "22f5a2b3-cc54-2a3c-00e4-a82b3f09f083",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "22f5a2b3-cc54-2a3c-00e4-a82b3f09f083",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721639892563,
    },
    "e-351": {
      id: "e-351",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-352",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|b1cc6bb8-092c-278d-3b06-464e075edd67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|b1cc6bb8-092c-278d-3b06-464e075edd67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723094849275,
    },
    "e-352": {
      id: "e-352",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-351",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|b1cc6bb8-092c-278d-3b06-464e075edd67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|b1cc6bb8-092c-278d-3b06-464e075edd67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723094849277,
    },
    "e-353": {
      id: "e-353",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-354",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-354": {
      id: "e-354",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-353",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-355": {
      id: "e-355",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-356",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-356": {
      id: "e-356",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-355",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-357": {
      id: "e-357",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-358",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-358": {
      id: "e-358",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-357",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095135793,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-362",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|d76b7f62-ed83-2637-dd3a-04628aacf39d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|d76b7f62-ed83-2637-dd3a-04628aacf39d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095270139,
    },
    "e-362": {
      id: "e-362",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-361",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|d76b7f62-ed83-2637-dd3a-04628aacf39d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|d76b7f62-ed83-2637-dd3a-04628aacf39d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095270140,
    },
    "e-363": {
      id: "e-363",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-364",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|f689d22f-afdb-fd5c-93b8-1213c9f3fb52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|f689d22f-afdb-fd5c-93b8-1213c9f3fb52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095336305,
    },
    "e-364": {
      id: "e-364",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-363",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|f689d22f-afdb-fd5c-93b8-1213c9f3fb52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|f689d22f-afdb-fd5c-93b8-1213c9f3fb52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723095336307,
    },
    "e-365": {
      id: "e-365",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-366",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|be5ea39d-cd73-4cba-968d-78a6adff25ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|be5ea39d-cd73-4cba-968d-78a6adff25ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723100738336,
    },
    "e-366": {
      id: "e-366",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-365",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|be5ea39d-cd73-4cba-968d-78a6adff25ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|be5ea39d-cd73-4cba-968d-78a6adff25ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723100738337,
    },
    "e-367": {
      id: "e-367",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-368",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|bbb0817d-d591-2ea0-3023-01411f66ac1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|bbb0817d-d591-2ea0-3023-01411f66ac1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723542141686,
    },
    "e-368": {
      id: "e-368",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-367",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|bbb0817d-d591-2ea0-3023-01411f66ac1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|bbb0817d-d591-2ea0-3023-01411f66ac1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1723542141687,
    },
    "e-369": {
      id: "e-369",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-370" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|10c5ed34-e741-1ec4-b688-a0e8442a8786",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|10c5ed34-e741-1ec4-b688-a0e8442a8786",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623210957,
    },
    "e-371": {
      id: "e-371",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-372" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|84bded0c-98db-9c6e-ac83-ed60d17a31e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|84bded0c-98db-9c6e-ac83-ed60d17a31e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623232569,
    },
    "e-373": {
      id: "e-373",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-374" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|c554370a-e5ea-8752-1a5d-e734153e67c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|c554370a-e5ea-8752-1a5d-e734153e67c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623241940,
    },
    "e-375": {
      id: "e-375",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-376" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|c19bd06e-7004-0e8e-f724-67bdc01233ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|c19bd06e-7004-0e8e-f724-67bdc01233ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623254724,
    },
    "e-377": {
      id: "e-377",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-378" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|b03838c8-3116-e7da-f61b-147b91445a11",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|b03838c8-3116-e7da-f61b-147b91445a11",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623268801,
    },
    "e-379": {
      id: "e-379",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-380" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".feature-card",
        originalId:
          "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".feature-card",
          originalId:
            "65f80ad3a206a75fd23cd164|9d2c257e-772f-3715-46c5-a7dd6ea770b5",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623285929,
    },
    "e-381": {
      id: "e-381",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-382" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|e52d9186-a4dc-a3b4-2196-94e79f044a9e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|e52d9186-a4dc-a3b4-2196-94e79f044a9e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623308300,
    },
    "e-383": {
      id: "e-383",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-384" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|e52d9186-a4dc-a3b4-2196-94e79f044a81",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|e52d9186-a4dc-a3b4-2196-94e79f044a81",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623318457,
    },
    "e-385": {
      id: "e-385",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-386" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|878b0a70-b915-21db-f1cc-5d818d09b205",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|878b0a70-b915-21db-f1cc-5d818d09b205",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623326224,
    },
    "e-387": {
      id: "e-387",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-388" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d350e757-9231-1516-b4cc-1556824dfd3f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d350e757-9231-1516-b4cc-1556824dfd3f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623344641,
    },
    "e-389": {
      id: "e-389",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-390" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "d350e757-9231-1516-b4cc-1556824dfd4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d350e757-9231-1516-b4cc-1556824dfd4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623354505,
    },
    "e-391": {
      id: "e-391",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-392" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|90e37b43-15a5-4c6e-0417-a7e7ac644910",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|90e37b43-15a5-4c6e-0417-a7e7ac644910",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623411906,
    },
    "e-393": {
      id: "e-393",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-394" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|acbead56-1ddd-acea-0b16-b858dced7d16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623424028,
    },
    "e-395": {
      id: "e-395",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-396" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|7ec07a58-e66d-5e09-6823-fa1e31c2b180",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623451641,
    },
    "e-397": {
      id: "e-397",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-398" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "4f830e31-97e4-533b-701b-168a5cc41932",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4f830e31-97e4-533b-701b-168a5cc41932",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623475276,
    },
    "e-399": {
      id: "e-399",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-400" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623491713,
    },
    "e-401": {
      id: "e-401",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-402" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "73f0c9de-8315-c31d-7c12-8d85dfc341e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "73f0c9de-8315-c31d-7c12-8d85dfc341e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623522985,
    },
    "e-403": {
      id: "e-403",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-404" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7b685637-8986-04a8-7f0a-ff02932e395e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7b685637-8986-04a8-7f0a-ff02932e395e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623539665,
    },
    "e-405": {
      id: "e-405",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-406" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".faq-wrap",
        originalId: "7b685637-8986-04a8-7f0a-ff02932e3965",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".faq-wrap",
          originalId: "7b685637-8986-04a8-7f0a-ff02932e3965",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623552020,
    },
    "e-407": {
      id: "e-407",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-408" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|593b6627-c35b-871b-8b93-d7bf66322afe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|593b6627-c35b-871b-8b93-d7bf66322afe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623566425,
    },
    "e-409": {
      id: "e-409",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-410" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|29c743b4-78fe-7db8-2eb4-6e5a579fa0d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|29c743b4-78fe-7db8-2eb4-6e5a579fa0d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723623580169,
    },
    "e-411": {
      id: "e-411",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-412" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f80ad3a206a75fd23cd164|d3f93cdf-fef1-edc6-4425-68ac415ec8b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f80ad3a206a75fd23cd164|d3f93cdf-fef1-edc6-4425-68ac415ec8b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 450,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723623590737,
    },
    "e-413": {
      id: "e-413",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-414" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "76931986-409c-a330-cc2f-dcff39ecb4d9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "76931986-409c-a330-cc2f-dcff39ecb4d9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623606228,
    },
    "e-415": {
      id: "e-415",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-416" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f48f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f48f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623626620,
    },
    "e-417": {
      id: "e-417",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-418" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623641745,
    },
    "e-419": {
      id: "e-419",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-420" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623787824,
    },
    "e-421": {
      id: "e-421",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-422" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4bf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623796680,
    },
    "e-423": {
      id: "e-423",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-424" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623806616,
    },
    "e-425": {
      id: "e-425",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-426" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 450,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723623830440,
    },
    "e-427": {
      id: "e-427",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-428" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c019042a-7957-05bb-9616-73105f35f4e4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c019042a-7957-05bb-9616-73105f35f4e4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 450,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723623842741,
    },
    "e-429": {
      id: "e-429",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-430" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".banner-title-wrap",
        originalId:
          "65f9398a4240a5c29222873f|2d60bfbc-d7f6-9d88-770c-cfd351973427",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".banner-title-wrap",
          originalId:
            "65f9398a4240a5c29222873f|2d60bfbc-d7f6-9d88-770c-cfd351973427",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623907329,
    },
    "e-431": {
      id: "e-431",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-432" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".banner-image-wrap",
        originalId:
          "65f9398a4240a5c29222873f|5c2b42b7-d7a2-8a07-d3f1-0e9f89a59374",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".banner-image-wrap",
          originalId:
            "65f9398a4240a5c29222873f|5c2b42b7-d7a2-8a07-d3f1-0e9f89a59374",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723623926721,
    },
    "e-433": {
      id: "e-433",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-434" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|34dc21a6-d544-decc-f98e-f7245a032a43",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|34dc21a6-d544-decc-f98e-f7245a032a43",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723623950345,
    },
    "e-435": {
      id: "e-435",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-436" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|e1df1550-7379-9d21-c836-605c4488bfcf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|e1df1550-7379-9d21-c836-605c4488bfcf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723623964689,
    },
    "e-437": {
      id: "e-437",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-438" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|6220d3f4-81bc-5c16-b232-0f84f6b9c9d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|6220d3f4-81bc-5c16-b232-0f84f6b9c9d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723623977881,
    },
    "e-439": {
      id: "e-439",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-440" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|6c8d43e9-0171-f986-7899-091a32816a12",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|6c8d43e9-0171-f986-7899-091a32816a12",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723623988833,
    },
    "e-441": {
      id: "e-441",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-442" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|6c8d43e9-0171-f986-7899-091a32816a10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|6c8d43e9-0171-f986-7899-091a32816a10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723623997817,
    },
    "e-443": {
      id: "e-443",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-444" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|373489fa-139a-d111-eb0c-a546f42c9c46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|373489fa-139a-d111-eb0c-a546f42c9c46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624009921,
    },
    "e-445": {
      id: "e-445",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-446" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".value-card-wrap",
        originalId:
          "65f9398a4240a5c29222873f|ecf22f10-6900-131d-5e5f-7590321ff11c",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".value-card-wrap",
          originalId:
            "65f9398a4240a5c29222873f|ecf22f10-6900-131d-5e5f-7590321ff11c",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624020184,
    },
    "e-447": {
      id: "e-447",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-448" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|fdfc4da8-c5fc-e21c-bd86-c5579a6c44fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|fdfc4da8-c5fc-e21c-bd86-c5579a6c44fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624038520,
    },
    "e-449": {
      id: "e-449",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-450" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|c618f010-1159-c014-4760-fcf89cfdbb38",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|c618f010-1159-c014-4760-fcf89cfdbb38",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723624056230,
    },
    "e-451": {
      id: "e-451",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-452" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|593ac499-5aa0-d12a-f655-3a8200adaf56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|593ac499-5aa0-d12a-f655-3a8200adaf56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723624072425,
    },
    "e-453": {
      id: "e-453",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-454" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|59757e14-0660-1865-9414-672844174e0d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|59757e14-0660-1865-9414-672844174e0d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723624094153,
    },
    "e-455": {
      id: "e-455",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-456" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|59757e14-0660-1865-9414-672844174e08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|59757e14-0660-1865-9414-672844174e08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723624102569,
    },
    "e-457": {
      id: "e-457",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-458" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|530b836b-60bf-781a-0240-d979a8137e44",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|530b836b-60bf-781a-0240-d979a8137e44",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723624112681,
    },
    "e-459": {
      id: "e-459",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-460" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|530b836b-60bf-781a-0240-d979a8137e49",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|530b836b-60bf-781a-0240-d979a8137e49",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723624120745,
    },
    "e-461": {
      id: "e-461",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-462" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|3e3a3571-564b-6c53-d030-3875ca23b46b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|3e3a3571-564b-6c53-d030-3875ca23b46b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723624129992,
    },
    "e-463": {
      id: "e-463",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-464" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|82f1da27-d599-90ff-88d0-20609be698bf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|82f1da27-d599-90ff-88d0-20609be698bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723624138516,
    },
    "e-465": {
      id: "e-465",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-466" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|79de490f-15dd-1999-c8fb-7dad70ac7b76",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|79de490f-15dd-1999-c8fb-7dad70ac7b76",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723624148097,
    },
    "e-467": {
      id: "e-467",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-468" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|79de490f-15dd-1999-c8fb-7dad70ac7b7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|79de490f-15dd-1999-c8fb-7dad70ac7b7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1723624156688,
    },
    "e-469": {
      id: "e-469",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-470" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f9398a4240a5c29222873f|6df9baff-a769-ad8e-26d2-f49d2c95fdb8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f9398a4240a5c29222873f|6df9baff-a769-ad8e-26d2-f49d2c95fdb8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624173153,
    },
    "e-471": {
      id: "e-471",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-472" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".pricing-card",
        originalId:
          "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".pricing-card",
          originalId:
            "65f9398a4240a5c29222873f|f0b4f5f4-1004-850b-3d8e-a24b6cf3db0e",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624185635,
    },
    "e-473": {
      id: "e-473",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-474" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|8e8e6da5-8cff-5ba3-7bf5-9bd68502ecf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624401548,
    },
    "e-475": {
      id: "e-475",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-476" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea05def634cea51c4ccdd|f3bf22cd-8489-5023-2a60-bff8775327ed",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea05def634cea51c4ccdd|f3bf22cd-8489-5023-2a60-bff8775327ed",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723624432989,
    },
    "e-477": {
      id: "e-477",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-478" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "84a8e54e-477c-391e-9245-a4a553a2ac9d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "84a8e54e-477c-391e-9245-a4a553a2ac9d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624451968,
    },
    "e-479": {
      id: "e-479",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-480" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f96ee75b9da43f91e3e4a3|27ee7224-ddab-f1d4-528a-921c8014237b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624508867,
    },
    "e-481": {
      id: "e-481",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-482" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6630697a9cd98233faecd2ff|15c853f3-d5b5-7f44-c82a-1fbba57ebadf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6630697a9cd98233faecd2ff|15c853f3-d5b5-7f44-c82a-1fbba57ebadf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624614511,
    },
    "e-483": {
      id: "e-483",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-484" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|67266ceb-4157-b491-efd2-ffbdb8d6da8d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|67266ceb-4157-b491-efd2-ffbdb8d6da8d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624670521,
    },
    "e-485": {
      id: "e-485",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-486" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223946e6130c50521a065a|b31119aa-c83b-97df-9b2c-c2b92a0df828",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223946e6130c50521a065a|b31119aa-c83b-97df-9b2c-c2b92a0df828",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723624696308,
    },
    "e-487": {
      id: "e-487",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-488" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|cc5e4350-9d0c-e49d-772f-e9a51850548b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|cc5e4350-9d0c-e49d-772f-e9a51850548b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624797433,
    },
    "e-489": {
      id: "e-489",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-490" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|de0fd886-9dee-2021-8934-3b8ffbfe9c3c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|de0fd886-9dee-2021-8934-3b8ffbfe9c3c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723624808816,
    },
    "e-491": {
      id: "e-491",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-492" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|389f5e4d-91c2-136f-eff5-c9266870ac34",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|389f5e4d-91c2-136f-eff5-c9266870ac34",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624891825,
    },
    "e-493": {
      id: "e-493",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-494" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".benefits-card",
        originalId:
          "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".benefits-card",
          originalId:
            "662256f3d8159409247f7a40|4135ee9c-4c8a-6858-761b-c553e6517450",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624903344,
    },
    "e-495": {
      id: "e-495",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-496" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|9dbbe749-6b09-003a-e5f5-a85c7a3428c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|9dbbe749-6b09-003a-e5f5-a85c7a3428c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723624996612,
    },
    "e-497": {
      id: "e-497",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-498" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662256f3d8159409247f7a40|1bdb17ab-877c-83d1-e0d9-cb6dfb6dfc3c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625010540,
    },
    "e-499": {
      id: "e-499",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-500" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|3028c9f4-4f94-dfe1-9b1e-1a47aff0b24f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|3028c9f4-4f94-dfe1-9b1e-1a47aff0b24f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625101860,
    },
    "e-501": {
      id: "e-501",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-502" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|fc55ec26-50c8-a8cb-06d4-78e6c9ac7d9c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|fc55ec26-50c8-a8cb-06d4-78e6c9ac7d9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723625146452,
    },
    "e-503": {
      id: "e-503",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-504" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|55edcf41-c353-ace7-496d-72f06e770a86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|55edcf41-c353-ace7-496d-72f06e770a86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1723625289240,
    },
    "e-505": {
      id: "e-505",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-506" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f2996dc44f3b9cc62226|55edcf41-c353-ace7-496d-72f06e770a90",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f2996dc44f3b9cc62226|55edcf41-c353-ace7-496d-72f06e770a90",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625309836,
    },
    "e-507": {
      id: "e-507",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-508" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|067a8b9d-5ba6-6f6b-f776-ea3c5d002215",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|067a8b9d-5ba6-6f6b-f776-ea3c5d002215",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625407233,
    },
    "e-509": {
      id: "e-509",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-510" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|e47a66f9-c967-2200-97ab-2ce77e98136a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|e47a66f9-c967-2200-97ab-2ce77e98136a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625422637,
    },
    "e-511": {
      id: "e-511",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-512" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|888d54a6-be53-2116-8ff3-be6a5cdf8a79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|888d54a6-be53-2116-8ff3-be6a5cdf8a79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625446965,
    },
    "e-513": {
      id: "e-513",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-514" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|40a08b93-f735-8d2e-7273-bfd8342dc890",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|40a08b93-f735-8d2e-7273-bfd8342dc890",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625461817,
    },
    "e-515": {
      id: "e-515",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-516" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f981c23c5207dd2640decc|6e3224f7-b0ce-04d7-55df-f996bf86cc03",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f981c23c5207dd2640decc|6e3224f7-b0ce-04d7-55df-f996bf86cc03",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625592204,
    },
    "e-517": {
      id: "e-517",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-518" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".location-card",
        originalId:
          "65f981c23c5207dd2640decc|e4794ece-2145-811f-b900-d15ef3d7609f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".location-card",
          originalId:
            "65f981c23c5207dd2640decc|e4794ece-2145-811f-b900-d15ef3d7609f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625631576,
    },
    "e-519": {
      id: "e-519",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-520" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".style-guide-grid",
        originalId:
          "65f80e6e6e18691b6f205163|0f0b70e6-014a-ab6c-47f3-eac57f778b46",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".style-guide-grid",
          originalId:
            "65f80e6e6e18691b6f205163|0f0b70e6-014a-ab6c-47f3-eac57f778b46",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625715552,
    },
    "e-521": {
      id: "e-521",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-522" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662205332f3a2345205ca32c|96077b5d-5fab-b91e-b9de-9142d11bfe29",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662205332f3a2345205ca32c|96077b5d-5fab-b91e-b9de-9142d11bfe29",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625825724,
    },
    "e-523": {
      id: "e-523",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-524" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".licenses-line-divider",
        originalId:
          "662205332f3a2345205ca32c|f9a60bc4-aa81-5688-acb3-d89577ff58e0",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".licenses-line-divider",
          originalId:
            "662205332f3a2345205ca32c|f9a60bc4-aa81-5688-acb3-d89577ff58e0",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723625843256,
    },
    "e-525": {
      id: "e-525",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-526" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662205332f3a2345205ca32c|97fd7de0-7fbf-bb38-b1ef-fc12014608d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662205332f3a2345205ca32c|97fd7de0-7fbf-bb38-b1ef-fc12014608d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625863288,
    },
    "e-527": {
      id: "e-527",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-528" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662205332f3a2345205ca32c|7df68fb3-c102-7afd-94b4-5375c4a6ccbb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662205332f3a2345205ca32c|7df68fb3-c102-7afd-94b4-5375c4a6ccbb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723625872971,
    },
    "e-529": {
      id: "e-529",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-530" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66222727c697c3183b81e741|61cc923f-dc94-59bc-66eb-bcfbf1ae7098",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66222727c697c3183b81e741|61cc923f-dc94-59bc-66eb-bcfbf1ae7098",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723626202680,
    },
    "e-531": {
      id: "e-531",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-532" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|bdc40feb-deca-c366-9b62-5c9e0a780c50",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|bdc40feb-deca-c366-9b62-5c9e0a780c50",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626242520,
    },
    "e-533": {
      id: "e-533",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-534" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|41db7c0e-816c-17f4-b46c-8d0260e860a1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|41db7c0e-816c-17f4-b46c-8d0260e860a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626251688,
    },
    "e-535": {
      id: "e-535",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-536" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|e60c3ba9-2923-5950-5796-2f820f3f9630",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|e60c3ba9-2923-5950-5796-2f820f3f9630",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626260256,
    },
    "e-537": {
      id: "e-537",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-538" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|5c9b142f-b27f-510b-d2ca-41b02bbbd057",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|5c9b142f-b27f-510b-d2ca-41b02bbbd057",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626270818,
    },
    "e-539": {
      id: "e-539",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-540" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|7670bc83-cc4c-8186-ca69-e32993e07a20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|7670bc83-cc4c-8186-ca69-e32993e07a20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626279472,
    },
    "e-541": {
      id: "e-541",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-542" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|09783c5e-763e-ece7-4cd8-7bb44e52694a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|09783c5e-763e-ece7-4cd8-7bb44e52694a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723626290295,
    },
    "e-543": {
      id: "e-543",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-544" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6625e3c8c9de8cf548286e07|b16184e1-0134-5e89-480f-d4711083c41d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723626299280,
    },
    "e-545": {
      id: "e-545",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-546" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223c56f3a4c9d6cbd1ef72|5a705bc5-c7cb-e2f5-ba9e-f4ddd600cfba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223c56f3a4c9d6cbd1ef72|5a705bc5-c7cb-e2f5-ba9e-f4ddd600cfba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627371018,
    },
    "e-547": {
      id: "e-547",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-548" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223c56f3a4c9d6cbd1ef72|fe78b04f-b908-598a-4d35-5f183ba6fae6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223c56f3a4c9d6cbd1ef72|fe78b04f-b908-598a-4d35-5f183ba6fae6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627383466,
    },
    "e-549": {
      id: "e-549",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-550" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66223c56f3a4c9d6cbd1ef72|0d71c916-b619-ebe4-be28-03f5927a7437",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66223c56f3a4c9d6cbd1ef72|0d71c916-b619-ebe4-be28-03f5927a7437",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627398719,
    },
    "e-551": {
      id: "e-551",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-552" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f562ebc888d77c271694|a1c125b2-9d98-3c84-b714-aab20df35803",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f562ebc888d77c271694|a1c125b2-9d98-3c84-b714-aab20df35803",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627425031,
    },
    "e-553": {
      id: "e-553",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-554" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f45ad31d3c11381445e4|6d724c2e-a14d-e6ac-284b-ffc0bd540d21",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f45ad31d3c11381445e4|6d724c2e-a14d-e6ac-284b-ffc0bd540d21",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627486943,
    },
    "e-555": {
      id: "e-555",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-556" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f45ad31d3c11381445e4|56523ca2-8d8b-5d40-58b2-f972310e39bf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f45ad31d3c11381445e4|56523ca2-8d8b-5d40-58b2-f972310e39bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627497958,
    },
    "e-557": {
      id: "e-557",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-558" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f45ad31d3c11381445e4|44669a52-c778-dd0b-076b-12021febfb79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f45ad31d3c11381445e4|44669a52-c778-dd0b-076b-12021febfb79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627511927,
    },
    "e-559": {
      id: "e-559",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-560" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f45ad31d3c11381445e4|3038e874-6a45-bb42-e2a8-a62e419c8226",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f45ad31d3c11381445e4|3038e874-6a45-bb42-e2a8-a62e419c8226",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723627568247,
    },
    "e-561": {
      id: "e-561",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-562" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6620f45ad31d3c11381445e4|9a6b712b-0775-7c17-4794-353396155292",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6620f45ad31d3c11381445e4|9a6b712b-0775-7c17-4794-353396155292",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 350,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627578831,
    },
    "e-563": {
      id: "e-563",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-564" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea4a040af9657c97d7ae0|90381638-db31-7127-2867-5fc51490481b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea4a040af9657c97d7ae0|90381638-db31-7127-2867-5fc51490481b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627600241,
    },
    "e-565": {
      id: "e-565",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-566" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65fea4a040af9657c97d7ae0|ab24ffd9-db96-361d-1856-6eb54afb1260",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65fea4a040af9657c97d7ae0|ab24ffd9-db96-361d-1856-6eb54afb1260",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627612274,
    },
    "e-567": {
      id: "e-567",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-568" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|e2c59935-2a37-f706-4823-48b809969e66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|e2c59935-2a37-f706-4823-48b809969e66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627664046,
    },
    "e-569": {
      id: "e-569",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-570" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|43b78fb7-8184-5eba-7cb8-ac0e54993e98",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|43b78fb7-8184-5eba-7cb8-ac0e54993e98",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627675026,
    },
    "e-571": {
      id: "e-571",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-572" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|5467427b-f9be-8aec-8677-ff27269de959",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|5467427b-f9be-8aec-8677-ff27269de959",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 250,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723627688777,
    },
    "e-573": {
      id: "e-573",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-574" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65f970a79b45759e332a0df1|3bff94cd-e5c3-ea48-5084-22a271535ea1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723627700863,
    },
    "e-575": {
      id: "e-575",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-576" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66222f068025543b11286803|66222f068025543b1128680600000000000b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66222f068025543b11286803|66222f068025543b1128680600000000000b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723627744535,
    },
    "e-577": {
      id: "e-577",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-578" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "662233d4816011323e732f51|662233d4816011323e732f5400000000000b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "662233d4816011323e732f51|662233d4816011323e732f5400000000000b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723627788096,
    },
    "e-579": {
      id: "e-579",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-580",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "fec59e47-78bb-29d8-9934-44736825ac1c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "fec59e47-78bb-29d8-9934-44736825ac1c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1724734059264,
    },
    "e-581": {
      id: "e-581",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-582",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6c9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6c9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1707555041460,
    },
    "e-583": {
      id: "e-583",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_BIG_EFFECT",
        config: { actionListId: "growBigIn", autoStopEventId: "e-584" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6bd",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1726123633024,
    },
    "e-585": {
      id: "e-585",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-586" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6c8",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123647661,
    },
    "e-587": {
      id: "e-587",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-588" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6fa",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123658859,
    },
    "e-589": {
      id: "e-589",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        config: { actionListId: "growIn", autoStopEventId: "e-590" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be6fe",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1726123668234,
    },
    "e-591": {
      id: "e-591",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-592" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be710",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123678347,
    },
    "e-593": {
      id: "e-593",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-594" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be722",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123689491,
    },
    "e-595": {
      id: "e-595",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-596" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".splash-main-page-card",
        originalId:
          "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be728",
        appliesTo: "CLASS",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123699748,
    },
    "e-597": {
      id: "e-597",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        config: { actionListId: "growIn", autoStopEventId: "e-598" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be755",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1726123717243,
    },
    "e-599": {
      id: "e-599",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-600" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be75a",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123728086,
    },
    "e-601": {
      id: "e-601",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        config: { actionListId: "growIn", autoStopEventId: "e-602" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be779",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1726123742039,
    },
    "e-603": {
      id: "e-603",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-604" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be77f",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123751519,
    },
    "e-605": {
      id: "e-605",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-606" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be786",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123767117,
    },
    "e-607": {
      id: "e-607",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInRight", autoStopEventId: "e-608" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be78e",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1726123775085,
    },
    "e-609": {
      id: "e-609",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-610" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be793",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123787793,
    },
    "e-611": {
      id: "e-611",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInRight", autoStopEventId: "e-612" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be798",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1726123795158,
    },
    "e-613": {
      id: "e-613",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-614" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7a2",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123805507,
    },
    "e-615": {
      id: "e-615",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-616" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7a7",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123816822,
    },
    "e-617": {
      id: "e-617",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInRight", autoStopEventId: "e-618" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7b7",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1726123824302,
    },
    "e-619": {
      id: "e-619",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-620" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7c3",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123834294,
    },
    "e-621": {
      id: "e-621",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInRight", autoStopEventId: "e-622" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7c8",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1726123842296,
    },
    "e-623": {
      id: "e-623",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-624" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7cc",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123853089,
    },
    "e-625": {
      id: "e-625",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_BIG_EFFECT",
        config: { actionListId: "growBigIn", autoStopEventId: "e-626" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7d1",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: null,
        effectIn: true,
      },
      createdOn: 1726123862879,
    },
    "e-627": {
      id: "e-627",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-628" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be7fe",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123873240,
    },
    "e-629": {
      id: "e-629",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-630" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be803",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123880439,
    },
    "e-631": {
      id: "e-631",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInBottom", autoStopEventId: "e-632" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be807",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1726123890456,
    },
    "e-633": {
      id: "e-633",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInLeft", autoStopEventId: "e-634" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be80d",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1726123901437,
    },
    "e-635": {
      id: "e-635",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        config: { actionListId: "slideInRight", autoStopEventId: "e-636" },
        instant: false,
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        appliesTo: "ELEMENT",
        styleBlockIds: [],
        id: "66e28728be74b03ad5520905|d3dbe304-c019-f517-47a1-3390526be81a",
      },
      targets: [],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 150,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1726123908992,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Footer Social Icon In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-dark-icon",
                  selectorGuids: ["4f55276d-34d7-080e-a609-b635a3246a83"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-n-5",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-social-link",
                  selectorGuids: ["3aeedc9e-27aa-a123-f9e3-f814a41074f6"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-lite-icon",
                  selectorGuids: ["eec67dae-df5a-d563-2c8c-1d03c7cf7f55"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-dark-icon",
                  selectorGuids: ["4f55276d-34d7-080e-a609-b635a3246a83"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-lite-icon",
                  selectorGuids: ["eec67dae-df5a-d563-2c8c-1d03c7cf7f55"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-n-6",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-social-link",
                  selectorGuids: ["3aeedc9e-27aa-a123-f9e3-f814a41074f6"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710828693440,
    },
    "a-2": {
      id: "a-2",
      title: "Footer Social Icon Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-dark-icon",
                  selectorGuids: ["4f55276d-34d7-080e-a609-b635a3246a83"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-social-link",
                  selectorGuids: ["3aeedc9e-27aa-a123-f9e3-f814a41074f6"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-2-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-lite-icon",
                  selectorGuids: ["eec67dae-df5a-d563-2c8c-1d03c7cf7f55"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710828693440,
    },
    "a-5": {
      id: "a-5",
      title: "Pricing Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 205,
                bValue: 205,
                gValue: 205,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-25",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-title",
                  selectorGuids: ["119e5e76-63f6-5f5c-4fe5-be0bff199b10"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-12",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-11",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-10",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-9",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-lite-icon",
                  selectorGuids: ["771e26de-fcf4-27eb-7de1-a03b03ced61e"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-month-text",
                  selectorGuids: ["0bca0745-914c-7164-aacb-3dadbddb374a"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-point",
                  selectorGuids: ["6f0592ca-6b93-a899-dcf9-687243382835"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-amount",
                  selectorGuids: ["0d4b5c81-0599-15fb-ab3e-2717f0d34286"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-dark-icon",
                  selectorGuids: ["d0cdf531-87ac-ab29-9927-9b233bfacfa3"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-13",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-24",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-dark-icon",
                  selectorGuids: ["d0cdf531-87ac-ab29-9927-9b233bfacfa3"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-5-n-23",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-22",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-21",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-amount",
                  selectorGuids: ["0d4b5c81-0599-15fb-ab3e-2717f0d34286"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-20",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-point",
                  selectorGuids: ["6f0592ca-6b93-a899-dcf9-687243382835"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-19",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-month-text",
                  selectorGuids: ["0bca0745-914c-7164-aacb-3dadbddb374a"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-18",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-lite-icon",
                  selectorGuids: ["771e26de-fcf4-27eb-7de1-a03b03ced61e"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-17",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-16",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-15",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-14",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-5-n-26",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-title",
                  selectorGuids: ["119e5e76-63f6-5f5c-4fe5-be0bff199b10"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710842288829,
    },
    "a-6": {
      id: "a-6",
      title: "Pricing Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 205,
                bValue: 205,
                gValue: 205,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-title",
                  selectorGuids: ["119e5e76-63f6-5f5c-4fe5-be0bff199b10"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-3",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".pricing-popular-wrap",
                  selectorGuids: ["42b11888-5a3d-eb29-25d6-9737e78b0d11"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-5",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-6",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-button",
                  selectorGuids: ["aad5f254-3eec-7f58-058b-478a2d6f635e"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-lite-icon",
                  selectorGuids: ["771e26de-fcf4-27eb-7de1-a03b03ced61e"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n-8",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-month-text",
                  selectorGuids: ["0bca0745-914c-7164-aacb-3dadbddb374a"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-9",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-point",
                  selectorGuids: ["6f0592ca-6b93-a899-dcf9-687243382835"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-10",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-amount",
                  selectorGuids: ["0d4b5c81-0599-15fb-ab3e-2717f0d34286"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-11",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-12",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-card",
                  selectorGuids: ["54e31168-cb63-a26b-915d-5832176956a4"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-6-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-dark-icon",
                  selectorGuids: ["d0cdf531-87ac-ab29-9927-9b233bfacfa3"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710842288829,
    },
    "a-7": {
      id: "a-7",
      title: "FAQ Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
            {
              id: "a-7-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-7-n-6",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-7-n-5",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-7-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-8",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-7-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-13",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-7-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: -25,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-7-n-11",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-7-n-10",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-7-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710844152809,
    },
    "a-8": {
      id: "a-8",
      title: "FAQ Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-8-n-3",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-8-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-8-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710844152809,
    },
    "a-9": {
      id: "a-9",
      title: "Project Image In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["cd2a864b-8973-d22c-53bb-e2e1f9d0c32c"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["cd2a864b-8973-d22c-53bb-e2e1f9d0c32c"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710846946910,
    },
    "a-10": {
      id: "a-10",
      title: "Project Image Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["cd2a864b-8973-d22c-53bb-e2e1f9d0c32c"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710846946910,
    },
    "a-13": {
      id: "a-13",
      title: "Contact Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link-wrap",
                  selectorGuids: ["4fa2b8d2-8fb3-2b79-2b98-32e94b1bfe5d"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-text",
                  selectorGuids: ["c98c7742-82ba-5f55-2ff7-6fd76cad20fe"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-title",
                  selectorGuids: ["52992c48-9789-0ba0-5b2a-8bd3e674bf10"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-icon-wrap",
                  selectorGuids: ["ad25a469-5c84-55d9-407c-0007bd89781a"],
                },
                globalSwatchId: "",
                rValue: 226,
                bValue: 226,
                gValue: 226,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-9",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link",
                  selectorGuids: ["cf89201a-4148-b664-1e57-889c1ae8253b"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-13-n-5",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link-wrap",
                  selectorGuids: ["4fa2b8d2-8fb3-2b79-2b98-32e94b1bfe5d"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-8",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-icon-wrap",
                  selectorGuids: ["ad25a469-5c84-55d9-407c-0007bd89781a"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-7",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-title",
                  selectorGuids: ["52992c48-9789-0ba0-5b2a-8bd3e674bf10"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-text",
                  selectorGuids: ["c98c7742-82ba-5f55-2ff7-6fd76cad20fe"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-13-n-10",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link",
                  selectorGuids: ["cf89201a-4148-b664-1e57-889c1ae8253b"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710851362022,
    },
    "a-14": {
      id: "a-14",
      title: "Contact Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link-wrap",
                  selectorGuids: ["4fa2b8d2-8fb3-2b79-2b98-32e94b1bfe5d"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-14-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-link",
                  selectorGuids: ["cf89201a-4148-b664-1e57-889c1ae8253b"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-14-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-text",
                  selectorGuids: ["c98c7742-82ba-5f55-2ff7-6fd76cad20fe"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-14-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-title",
                  selectorGuids: ["52992c48-9789-0ba0-5b2a-8bd3e674bf10"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-14-n-4",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".contact-icon-wrap",
                  selectorGuids: ["ad25a469-5c84-55d9-407c-0007bd89781a"],
                },
                globalSwatchId: "",
                rValue: 226,
                bValue: 226,
                gValue: 226,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710851362022,
    },
    "a-15": {
      id: "a-15",
      title: "Service Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-title",
                  selectorGuids: ["66796481-e78c-c629-a14e-5bda2bea7e06"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-15-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card",
                  selectorGuids: ["99f18950-c291-b996-f1db-943fc04b1598"],
                },
                globalSwatchId: "--color--white-smoke-color",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-15-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-icon-wrap",
                  selectorGuids: ["4665e53c-5384-a7b3-b173-57c8c5e1ddb6"],
                },
                globalSwatchId: "",
                rValue: 227,
                bValue: 227,
                gValue: 227,
                aValue: 1,
              },
            },
            {
              id: "a-15-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-content",
                  selectorGuids: ["797a354e-710e-06df-bb47-ee3d3d8d3b8b"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-title",
                  selectorGuids: ["66796481-e78c-c629-a14e-5bda2bea7e06"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-15-n-5",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card",
                  selectorGuids: ["99f18950-c291-b996-f1db-943fc04b1598"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-15-n-8",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-content",
                  selectorGuids: ["797a354e-710e-06df-bb47-ee3d3d8d3b8b"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-15-n-7",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-icon-wrap",
                  selectorGuids: ["4665e53c-5384-a7b3-b173-57c8c5e1ddb6"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1711188450818,
    },
    "a-16": {
      id: "a-16",
      title: "Service Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-title",
                  selectorGuids: ["66796481-e78c-c629-a14e-5bda2bea7e06"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-16-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card",
                  selectorGuids: ["99f18950-c291-b996-f1db-943fc04b1598"],
                },
                globalSwatchId: "--color--white-smoke-color",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-16-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-icon-wrap",
                  selectorGuids: ["4665e53c-5384-a7b3-b173-57c8c5e1ddb6"],
                },
                globalSwatchId: "",
                rValue: 227,
                bValue: 227,
                gValue: 227,
                aValue: 1,
              },
            },
            {
              id: "a-16-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-content",
                  selectorGuids: ["797a354e-710e-06df-bb47-ee3d3d8d3b8b"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1711188450818,
    },
    "a-17": {
      id: "a-17",
      title: "Read More Button In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-lite",
                  selectorGuids: ["59411917-236d-a179-5be1-75e913b3cd8b"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-dark",
                  selectorGuids: ["6a7f38c2-c46a-b3af-f304-cc4f775d3a17"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-lite",
                  selectorGuids: ["59411917-236d-a179-5be1-75e913b3cd8b"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-17-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-dark",
                  selectorGuids: ["6a7f38c2-c46a-b3af-f304-cc4f775d3a17"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713437797930,
    },
    "a-18": {
      id: "a-18",
      title: "Read More Button Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-lite",
                  selectorGuids: ["59411917-236d-a179-5be1-75e913b3cd8b"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-18-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-arrow-dark",
                  selectorGuids: ["6a7f38c2-c46a-b3af-f304-cc4f775d3a17"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713437797930,
    },
    "a-19": {
      id: "a-19",
      title: "Team Social Link In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-link-wrap",
                  selectorGuids: ["f4cb7ffc-f3eb-8373-482e-db6f121ba11a"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-19-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-lite",
                  selectorGuids: ["27ca072b-f5da-57f8-1d8c-0c649e2a756c"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-19-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-dark",
                  selectorGuids: ["ae4e5a3a-ffc1-4449-63ae-5f6c35450cdc"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-link-wrap",
                  selectorGuids: ["f4cb7ffc-f3eb-8373-482e-db6f121ba11a"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-19-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-dark",
                  selectorGuids: ["ae4e5a3a-ffc1-4449-63ae-5f6c35450cdc"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-19-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-lite",
                  selectorGuids: ["27ca072b-f5da-57f8-1d8c-0c649e2a756c"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713522620120,
    },
    "a-20": {
      id: "a-20",
      title: "Team Social Link Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-link-wrap",
                  selectorGuids: ["f4cb7ffc-f3eb-8373-482e-db6f121ba11a"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-20-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-lite",
                  selectorGuids: ["27ca072b-f5da-57f8-1d8c-0c649e2a756c"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-20-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-dark",
                  selectorGuids: ["ae4e5a3a-ffc1-4449-63ae-5f6c35450cdc"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713522620120,
    },
    "a-21": {
      id: "a-21",
      title: "Team Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-21-n-5",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-image",
                  selectorGuids: ["2e6a0166-9362-1ea8-c740-33304d900c97"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-21-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-image",
                  selectorGuids: ["2e6a0166-9362-1ea8-c740-33304d900c97"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713523031568,
    },
    "a-22": {
      id: "a-22",
      title: "Team Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-22-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-area",
                  selectorGuids: ["80a80f37-0427-9ac0-2c21-bd897ac1ddcd"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-22-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-image",
                  selectorGuids: ["2e6a0166-9362-1ea8-c740-33304d900c97"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713523031568,
    },
    "a-23": {
      id: "a-23",
      title: "Career Marquee In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-marquee-item",
                  selectorGuids: ["1b3b6e3b-dd31-7b8b-8312-0a5970592ee5"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 20000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-marquee-item",
                  selectorGuids: ["1b3b6e3b-dd31-7b8b-8312-0a5970592ee5"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-marquee-item",
                  selectorGuids: ["1b3b6e3b-dd31-7b8b-8312-0a5970592ee5"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713527181951,
    },
    "a-24": {
      id: "a-24",
      title: "Benefits Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-card",
                  selectorGuids: ["febbe3d1-7d4a-db09-92bb-18c887fa5e66"],
                },
                globalSwatchId: "",
                rValue: 45,
                bValue: 45,
                gValue: 45,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-wrap",
                  selectorGuids: ["64234162-4370-373f-8058-87a589f42633"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-lite",
                  selectorGuids: ["726f122c-096f-f17b-f793-65ef90508cc9"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-24-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-dark",
                  selectorGuids: ["17a3bf42-680e-62ea-3527-fe775ee33958"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-24-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-title",
                  selectorGuids: ["a1cfacd4-8ebf-f5bb-9e4e-29fdea2bf5df"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-content",
                  selectorGuids: ["abe2d2b4-a3e2-fc98-4606-15105b34e88a"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-7",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-card",
                  selectorGuids: ["febbe3d1-7d4a-db09-92bb-18c887fa5e66"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-12",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-content",
                  selectorGuids: ["abe2d2b4-a3e2-fc98-4606-15105b34e88a"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-11",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-title",
                  selectorGuids: ["a1cfacd4-8ebf-f5bb-9e4e-29fdea2bf5df"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-24-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-dark",
                  selectorGuids: ["17a3bf42-680e-62ea-3527-fe775ee33958"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-24-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-lite",
                  selectorGuids: ["726f122c-096f-f17b-f793-65ef90508cc9"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-24-n-8",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-wrap",
                  selectorGuids: ["64234162-4370-373f-8058-87a589f42633"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713530973939,
    },
    "a-25": {
      id: "a-25",
      title: "Benefits Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-card",
                  selectorGuids: ["febbe3d1-7d4a-db09-92bb-18c887fa5e66"],
                },
                globalSwatchId: "",
                rValue: 45,
                bValue: 45,
                gValue: 45,
                aValue: 1,
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-wrap",
                  selectorGuids: ["64234162-4370-373f-8058-87a589f42633"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-25-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-lite",
                  selectorGuids: ["726f122c-096f-f17b-f793-65ef90508cc9"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-25-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-icon-dark",
                  selectorGuids: ["17a3bf42-680e-62ea-3527-fe775ee33958"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-25-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-title",
                  selectorGuids: ["a1cfacd4-8ebf-f5bb-9e4e-29fdea2bf5df"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-25-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".benefits-content",
                  selectorGuids: ["abe2d2b4-a3e2-fc98-4606-15105b34e88a"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713530973939,
    },
    "a-26": {
      id: "a-26",
      title: "Career Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-title",
                  selectorGuids: ["9bec0344-c1fd-c300-15f6-c5522079e4b5"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-wrap",
                  selectorGuids: ["2d97687f-549a-b76a-0470-6416d472388f"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-subtitle",
                  selectorGuids: ["581a8b02-73ac-8c4a-7c0e-4aef9e830728"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-location",
                  selectorGuids: ["71b1938b-4c16-23c6-d527-4aa414d5966b"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-content",
                  selectorGuids: ["41c0de8a-4732-302a-58f4-a9d6c6dca4ae"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-7",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-8",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-9",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-10",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-15",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-title",
                  selectorGuids: ["9bec0344-c1fd-c300-15f6-c5522079e4b5"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-20",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-19",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-18",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-17",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-16",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-content",
                  selectorGuids: ["41c0de8a-4732-302a-58f4-a9d6c6dca4ae"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-14",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-location",
                  selectorGuids: ["71b1938b-4c16-23c6-d527-4aa414d5966b"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-13",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-subtitle",
                  selectorGuids: ["581a8b02-73ac-8c4a-7c0e-4aef9e830728"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-12",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-wrap",
                  selectorGuids: ["2d97687f-549a-b76a-0470-6416d472388f"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713930742812,
    },
    "a-27": {
      id: "a-27",
      title: "Career Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-title",
                  selectorGuids: ["9bec0344-c1fd-c300-15f6-c5522079e4b5"],
                },
                globalSwatchId: "",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-9",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-8",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-job-type-wrap",
                  selectorGuids: ["b3e0cfdf-3991-cc94-970b-c1eb65706e75"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-7",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-6",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button",
                  selectorGuids: ["2f8d3ea2-2129-3d60-c167-5d1cd38150b4"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-content",
                  selectorGuids: ["41c0de8a-4732-302a-58f4-a9d6c6dca4ae"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-location",
                  selectorGuids: ["71b1938b-4c16-23c6-d527-4aa414d5966b"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-subtitle",
                  selectorGuids: ["581a8b02-73ac-8c4a-7c0e-4aef9e830728"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-27-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-wrap",
                  selectorGuids: ["2d97687f-549a-b76a-0470-6416d472388f"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1713930742812,
    },
    "a-32": {
      id: "a-32",
      title: "Feature Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-32-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card",
                  selectorGuids: ["76dd142b-2a45-148b-69c2-36d1f33462c8"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-32-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-content",
                  selectorGuids: ["79fd9209-ce30-ea7c-5628-e28bb496ba0e"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-32-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-title",
                  selectorGuids: ["fd6a0414-5789-5b52-a28a-6186e0cc55b1"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card",
                  selectorGuids: ["76dd142b-2a45-148b-69c2-36d1f33462c8"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-32-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-title",
                  selectorGuids: ["fd6a0414-5789-5b52-a28a-6186e0cc55b1"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-32-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-content",
                  selectorGuids: ["79fd9209-ce30-ea7c-5628-e28bb496ba0e"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1714456731343,
    },
    "a-33": {
      id: "a-33",
      title: "Feature Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-33-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card",
                  selectorGuids: ["76dd142b-2a45-148b-69c2-36d1f33462c8"],
                },
                globalSwatchId: "",
                rValue: 245,
                bValue: 245,
                gValue: 245,
                aValue: 1,
              },
            },
            {
              id: "a-33-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-content",
                  selectorGuids: ["79fd9209-ce30-ea7c-5628-e28bb496ba0e"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-33-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".feature-card-title",
                  selectorGuids: ["fd6a0414-5789-5b52-a28a-6186e0cc55b1"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1714456731343,
    },
    "a-34": {
      id: "a-34",
      title: "Marquee Text",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-34-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".marquee-text-wrap",
                  selectorGuids: ["fdef33cb-6f0f-ec01-0c2f-4b03d22510f7"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-34-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 40000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".marquee-text-wrap",
                  selectorGuids: ["fdef33cb-6f0f-ec01-0c2f-4b03d22510f7"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-34-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".marquee-text-wrap",
                  selectorGuids: ["fdef33cb-6f0f-ec01-0c2f-4b03d22510f7"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1714542982689,
    },
    "a-35": {
      id: "a-35",
      title: "Home Page FAQ Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-35-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
            {
              id: "a-35-n-26",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-35-n-16",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-35-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-35-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-35-n-3",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-35-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-35-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-35-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-35-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-35-n-17",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-35-n-25",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-35-n-24",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-35-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: -25,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-35-n-22",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 198,
                bValue: 95,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-35-n-21",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-35-n-20",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-35-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-35-n-18",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-35-n-27",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1710844152809,
    },
    "a-36": {
      id: "a-36",
      title: "Home Page FAQ Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-36-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
            {
              id: "a-36-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-36-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-36-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-lite",
                  selectorGuids: ["5314db1b-56bd-f4a7-930e-64b7e49bc0f2"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-36-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-dark",
                  selectorGuids: ["22ac96e0-7d40-77f0-a3a4-bd6a96b24764"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-36-n-6",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-36-n-7",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-arrow-wrap",
                  selectorGuids: ["9cda0997-6f25-cb58-8974-0be70f0e01ae"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-36-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-36-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-36-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq-answer-wrap",
                  selectorGuids: ["f4c170bd-111a-8ecb-7d6f-5c6e306236f3"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1710844152809,
    },
    "a-37": {
      id: "a-37",
      title: "Footer Link In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-link-line",
                  selectorGuids: ["4d011ed3-6459-061c-c209-aa53a39636ff"],
                },
                widthValue: 0,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-link-line",
                  selectorGuids: ["4d011ed3-6459-061c-c209-aa53a39636ff"],
                },
                widthValue: 15,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1715577748065,
    },
    "a-38": {
      id: "a-38",
      title: "Footer Link Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".footer-link-line",
                  selectorGuids: ["4d011ed3-6459-061c-c209-aa53a39636ff"],
                },
                widthValue: 0,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1715577748065,
    },
    "a-44": {
      id: "a-44",
      title: "Career Button Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button-arrow",
                  selectorGuids: ["5a6132a8-4605-b4d7-f27e-961aa8c3c7e7"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button-arrow",
                  selectorGuids: ["5a6132a8-4605-b4d7-f27e-961aa8c3c7e7"],
                },
                xValue: 5,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1719474861814,
    },
    "a-45": {
      id: "a-45",
      title: "Career Button Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-button-arrow",
                  selectorGuids: ["5a6132a8-4605-b4d7-f27e-961aa8c3c7e7"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1719474861814,
    },
    "a-48": {
      id: "a-48",
      title: "Project Card Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-48-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-overlay-wrap",
                  selectorGuids: ["58f93630-92c6-11b5-e460-675ae80d1d35"],
                },
                xValue: 170,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-48-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-overlay-wrap",
                  selectorGuids: ["58f93630-92c6-11b5-e460-675ae80d1d35"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1719836778060,
    },
    "a-49": {
      id: "a-49",
      title: "Project Card Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-49-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-overlay-wrap",
                  selectorGuids: ["58f93630-92c6-11b5-e460-675ae80d1d35"],
                },
                xValue: 170,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1719836778060,
    },
    "a-52": {
      id: "a-52",
      title: "Service Post Card In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-52-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title",
                  selectorGuids: ["c71cf95b-7365-3cca-bfcb-bd482cee3b10"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-icon-wrap",
                  selectorGuids: ["31695d2d-fdf4-42c5-ceff-e27333c9c074"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-content",
                  selectorGuids: ["d0ad6a1a-abd0-e88b-37a0-6020df644890"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-52-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title",
                  selectorGuids: ["c71cf95b-7365-3cca-bfcb-bd482cee3b10"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-11",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-content",
                  selectorGuids: ["d0ad6a1a-abd0-e88b-37a0-6020df644890"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-14",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-13",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
            {
              id: "a-52-n-12",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-icon-wrap",
                  selectorGuids: ["31695d2d-fdf4-42c5-ceff-e27333c9c074"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1720005086990,
    },
    "a-53": {
      id: "a-53",
      title: "Service Post Card Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-53-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title",
                  selectorGuids: ["c71cf95b-7365-3cca-bfcb-bd482cee3b10"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-53-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-53-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-card",
                  selectorGuids: ["d263ba72-255c-d600-5e21-1ccbf1cad4b6"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
            {
              id: "a-53-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-post-icon-wrap",
                  selectorGuids: ["31695d2d-fdf4-42c5-ceff-e27333c9c074"],
                },
                globalSwatchId: "--color--content-color",
                rValue: 69,
                bValue: 69,
                gValue: 69,
                aValue: 1,
              },
            },
            {
              id: "a-53-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-content",
                  selectorGuids: ["d0ad6a1a-abd0-e88b-37a0-6020df644890"],
                },
                globalSwatchId: "--color--white",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1720005086990,
    },
    "a-56": {
      id: "a-56",
      title: "Service Card Title Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-56-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title-line-wrap",
                  selectorGuids: ["911179b0-b8c7-99ab-5933-e8c6f10f2b51"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-56-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title-line-wrap",
                  selectorGuids: ["911179b0-b8c7-99ab-5933-e8c6f10f2b51"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1720430737730,
    },
    "a-57": {
      id: "a-57",
      title: "Service Card Title Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-57-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-card-title-line-wrap",
                  selectorGuids: ["911179b0-b8c7-99ab-5933-e8c6f10f2b51"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1720430737730,
    },
    "a-58": {
      id: "a-58",
      title: "Career Card Title Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-58-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-58-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-58-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-58-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1721373978396,
    },
    "a-59": {
      id: "a-59",
      title: "Career Card Title Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-59-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-59-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".career-card-title-line-wrap",
                  selectorGuids: ["33b7ec77-4eb9-5c79-2d27-526bef9ac4c1"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721373978396,
    },
    "a-60": {
      id: "a-60",
      title: "Team Card Title Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-60-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-60-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-60-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-60-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1721639913862,
    },
    "a-61": {
      id: "a-61",
      title: "Team Card Title Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-61-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-61-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-card-title-line-wrap",
                  selectorGuids: ["e87c4867-5b60-32bf-cc10-49aae13f78ef"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721639913862,
    },
    "a-62": {
      id: "a-62",
      title: "Project Arrow Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-62-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-62-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-62-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-62-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-62-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-62-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                xValue: 5,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-62-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-62-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                xValue: 5,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1723094852616,
    },
    "a-63": {
      id: "a-63",
      title: "Project Arrow Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-63-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-63-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-lite",
                  selectorGuids: ["ddd3de15-fa14-93e9-3f41-1b70411faaa3"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-63-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-63-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-arrow-icon-dark",
                  selectorGuids: ["72068c07-a82e-13c7-6cba-4081f135a6ba"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1723094852616,
    },
    "a-28": {
      id: "a-28",
      title: "Pricing Plan In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-plan-wrap",
                  selectorGuids: ["4ab78d44-422a-9783-d380-a41dbadc513f"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-plan-wrap",
                  selectorGuids: ["4ab78d44-422a-9783-d380-a41dbadc513f"],
                },
                globalSwatchId: "--color--primary-color",
                rValue: 255,
                bValue: 196,
                gValue: 218,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1714454498387,
    },
    "a-29": {
      id: "a-29",
      title: "Pricing Plan Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "STYLE_BORDER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing-plan-wrap",
                  selectorGuids: ["4ab78d44-422a-9783-d380-a41dbadc513f"],
                },
                globalSwatchId: "--color--title-color",
                rValue: 28,
                bValue: 28,
                gValue: 28,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1714454498387,
    },
    "a-64": {
      id: "a-64",
      title: "Hireus Badge Close 4",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-64-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".hireus-badge",
                  selectorGuids: ["d91b54b3-33cf-6f09-ead6-218771466e6f"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-64-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".hireus-badge",
                  selectorGuids: ["d91b54b3-33cf-6f09-ead6-218771466e6f"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1713937054449,
    },
    "a-65": {
      id: "a-65",
      title: "Left Right Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-65-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area",
                  selectorGuids: ["398f2a19-7c89-88c4-6163-20c89713260e"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-65-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area.bottom",
                  selectorGuids: [
                    "398f2a19-7c89-88c4-6163-20c89713260e",
                    "398f2a19-7c89-88c4-6163-20c897132618",
                  ],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-65-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area",
                  selectorGuids: ["398f2a19-7c89-88c4-6163-20c89713260e"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-65-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area.bottom",
                  selectorGuids: [
                    "398f2a19-7c89-88c4-6163-20c89713260e",
                    "398f2a19-7c89-88c4-6163-20c897132618",
                  ],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-65-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area",
                  selectorGuids: ["398f2a19-7c89-88c4-6163-20c89713260e"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-65-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".splash-animation-image-area.bottom",
                  selectorGuids: [
                    "398f2a19-7c89-88c4-6163-20c89713260e",
                    "398f2a19-7c89-88c4-6163-20c897132618",
                  ],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1707555053882,
    },
    fadeIn: {
      id: "fadeIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    growIn: {
      id: "growIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0.7500000000000001,
                yValue: 0.7500000000000001,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInLeft: {
      id: "slideInLeft",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    slideInRight: {
      id: "slideInRight",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    growBigIn: {
      id: "growBigIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
