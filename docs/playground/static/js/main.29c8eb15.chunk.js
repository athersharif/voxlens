(this.webpackJsonpexample = this.webpackJsonpexample || []).push([
  [0],
  {
    138: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = b),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = y),
          (t.__GetDependency__ = t.__get__ = d),
          (t.processCommand = t.default = t.commands = void 0);
        var _ = n(16);
        t.processCommand = function (e, t, n, r) {
          var _ = d('commands').filter(function (t) {
            return e.includes(t.name);
          });
          if (!d('isCommandDuplicate')(r, _)) {
            r = {
              command: _.map(function (e) {
                return e.name;
              }).join(','),
              time: Date.now(),
            };
            var o = '';
            if (_.length > 0) {
              var c = [];
              _.forEach(function (r) {
                var _ = r.name,
                  a = r.func,
                  i = r.alias;
                if (i) {
                  var u = d('commands').filter(function (e) {
                    return e.name === i;
                  })[0];
                  (a = u.func), (_ = u.name);
                }
                if (!c.includes(_)) {
                  var s = a(t, n, e);
                  (o += s + ' '), d('logCommand')(_, o);
                }
                c.push(_);
              }),
                (o = d('addFeedbackToResponse')(o, c));
            } else
              (o = 'I heard you say '.concat(
                e,
                '. Command not recognized. Please try again.'
              )),
                d('logCommand')(e, o);
            return (
              console.log('Response is ', o),
              d('createTemporaryElement')(o),
              { lastIssuedCommand: r }
            );
          }
        };
        var o = [
          { name: 'average', func: n(414).default },
          { name: 'mean', alias: 'average' },
          { name: 'median', func: n(416).default },
          { name: 'mode', func: n(417).default },
          { name: 'maximum', func: n(420).default },
          { name: 'highest', alias: 'maximum' },
          { name: 'minimum', func: n(422).default },
          { name: 'lowest', alias: 'minimum' },
          { name: 'variance', func: n(424).default },
          { name: 'standard deviation', func: n(425).default },
          { name: 'total', func: n(426).default },
          { name: 'instructions', func: n(427).default },
          { name: 'directions', alias: 'instructions' },
          { name: 'help', alias: 'instructions' },
          { name: 'summary', func: n(428).default },
          { name: 'value', func: n(429).default },
          { name: 'data', alias: 'value' },
          { name: 'commands', func: n(497).default },
        ];
        function c() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.commands = o;
        var a = null;
        function i() {
          if (null === a) {
            var e = c();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (a = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return a;
        }
        function u() {
          var e = c();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function s() {
          var e = i(),
            t = u(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = c();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var f = '__INTENTIONAL_UNDEFINED__',
          l = {};
        function d(e) {
          var t = s();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'commands':
                  return o;
                case 'isCommandDuplicate':
                  return _.isCommandDuplicate;
                case 'logCommand':
                  return _.logCommand;
                case 'addFeedbackToResponse':
                  return _.addFeedbackToResponse;
                case 'createTemporaryElement':
                  return _.createTemporaryElement;
              }
              return;
            })(e);
          var n = t[e];
          return n === f ? void 0 : n;
        }
        function y(e, t) {
          var n = s();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  b(e);
                });
              })
            : ((n[e] = void 0 === t ? f : t),
              function () {
                b(e);
              });
        }
        function b(e) {
          var t = s();
          delete t[e], 0 == Object.keys(t).length && delete u()[i];
        }
        function E(e) {
          var t = s(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = l),
          (function () {
            function e(e, t) {
              Object.defineProperty(l, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', d),
              e('__GetDependency__', d),
              e('__Rewire__', y),
              e('__set__', y),
              e('__reset__', b),
              e('__ResetDependency__', b),
              e('__with__', E);
          })();
        var p = l;
        t.default = p;
      }.call(this, n(13)));
    },
    16: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = G),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = D),
          (t.__GetDependency__ = t.__get__ = S),
          (t.verbalise =
            t.validate =
            t.logKeyPresses =
            t.logCommand =
            t.isCommandDuplicate =
            t.getSettings =
            t.getModifier =
            t.getKeyFromEvent =
            t.getKeyBinds =
            t.getInstructionsText =
            t.getDefaults =
            t.getArrayFromObject =
            t.generateInstructions =
            t.formatOptions =
            t.default =
            t.createTemporaryElement =
            t.addThousandsSeparators =
            t.addFeedbackToResponse =
              void 0);
        var _ = f(n(380)),
          o = f(n(381)),
          c = f(n(387)),
          a = f(n(391)),
          i = f(n(394)),
          u = f(n(411)),
          s = f(n(413));
        function f(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function l(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function d(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? l(Object(n), !0).forEach(function (t) {
                  y(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : l(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function y(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        var b = new (S('UAParser'))().getOS(),
          E = function () {
            var e = [
              "I understand you're looking for",
              'It seems like you asked about the',
            ];
            return e[S('random')(0, e.length - 1)];
          },
          p = function (e) {
            var t =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1],
              n =
                !(arguments.length > 2 && void 0 !== arguments[2]) ||
                arguments[2],
              r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : '+';
            t && (r = ' ' + r + ' ');
            var _ = e.multipleModifiers ? e.modifier.join(r) : e.modifier;
            return n ? _.toUpperCase() : _;
          };
        t.getModifier = p;
        t.getDefaults = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return {
            triggers: {
              mainKey: ['a', '1'],
              instructionsKey: ['i', '4'],
              trendKey: ['m', '3'],
              summaryKey: ['s', '2'],
              pause: ['p', '5'],
            },
            xLabel: e.x,
            yLabel: e.y,
          };
        };
        var v = function (e, t) {
          var n = {};
          return (
            Object.keys(e).forEach(function (r) {
              n[r] = e[r]
                .map(function (e) {
                  return t + ' + ' + e.toUpperCase();
                })
                .join(' or ');
            }),
            n
          );
        };
        t.getInstructionsText = function (e, t, n) {
          var r = S('getModifier')(n),
            _ = S('getMappedTriggers')(e, r, n);
          return 'Graph with title: '
            .concat(t, '. To interact with the graph, press ')
            .concat(
              _.mainKey,
              " all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press "
            )
            .concat(_.summaryKey, '. To hear the audio graph, press ')
            .concat(_.trendKey, '. To repeat these instructions, press ')
            .concat(
              _.instructionsKey,
              '. Key combinations must be pressed all together and in order.'
            );
        };
        t.generateInstructions = function (e, t, n, r) {
          var _ = S('getModifier')(r),
            o = S('getMappedTriggers')(t, _, r),
            c = 'Graph with title: '
              .concat(
                n,
                '. To listen to instructions on how to interact with the graph, press '
              )
              .concat(
                o.instructionsKey,
                '. Key combinations must be pressed all together and in order.'
              );
          e.setAttribute('aria-label', c);
          for (var a = 0, i = Array.from(e.children); a < i.length; a++) {
            i[a].setAttribute('aria-hidden', !0);
          }
        };
        t.createTemporaryElement = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1e3,
            n = document.createElement('div');
          (n.style.position = 'absolute'),
            (n.style.left = '-10000px'),
            (n.style.top = 'auto'),
            (n.style.width = '1px'),
            (n.style.height = '1px'),
            (n.style.overflow = 'hidden'),
            n.setAttribute('aria-live', 'assertive'),
            S('os').name.includes('Mac OS') || n.setAttribute('role', 'alert'),
            document.body.appendChild(n),
            (n.innerHTML = e),
            window.setTimeout(function () {
              return n.remove();
            }, t);
        };
        t.getArrayFromObject = function (e, t) {
          return e.map(function (e) {
            return e[t];
          });
        };
        t.validate = function (e, t) {
          if (S('isEmpty')(t.x))
            throw new TypeError('Independent variable not set.');
          if (S('isEmpty')(t.y))
            throw new TypeError('Dependent variable not set.');
          if (S('isEmpty')(e) || !e.every(S('isNumber')))
            throw new TypeError(
              'Dependent variable values are missing or not numeric.'
            );
          if (S('isEmpty')(t.title)) throw new TypeError('Title not set.');
        };
        t.addThousandsSeparators = function (e) {
          return (e = (e = (e = S('round')(e, 2).toString()).replace(
            ',',
            ''
          )).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        };
        t.formatOptions = function (e) {
          return d(
            d({}, e),
            {},
            {
              xLabel: S('startCase')(e.xLabel),
              yLabel: S('startCase')(e.yLabel),
            }
          );
        };
        t.getSettings = function () {
          return S('os').name.includes('Mac OS')
            ? S('settings').MacOS
            : S('os').name.includes('Windows')
            ? S('settings').Windows
            : S('settings').default;
        };
        t.addFeedbackToResponse = function (e, t) {
          return (
            (t = S('verbalise')(t)),
            (e = e.replace(/ +(?= )/g, '')),
            ''.concat(S('getFeedbackText')(), ' ').concat(t, '. ').concat(e)
          );
        };
        var R = function (e) {
          var t = e.length;
          return (
            e.length > 1
              ? ((e[t - 1] = 'and '.concat(e[t - 1])), (e = e.join(', ')))
              : (e = e[0]),
            e
          );
        };
        t.verbalise = R;
        t.getKeyBinds = function (e, t) {
          return t
            .map(function (t) {
              return e + '+' + t;
            })
            .join(',');
        };
        t.logKeyPresses = function (e, t) {
          var n = e + '+' + S('getKeyFromEvent')(t);
          console.log('[VoxLens] Key combination issued: ' + n);
          var r = window.localStorage.getItem('keyCombinationsPressed') || '[]';
          (r = JSON.parse(r)).push({ combination: n, time: Date.now() }),
            window.localStorage.setItem(
              'keyCombinationsPressed',
              JSON.stringify(r)
            );
        };
        t.logCommand = function (e, t) {
          console.log('[VoxLens] Command issued: ' + e);
          var n = window.localStorage.getItem('commandsIssued') || '[]';
          (n = JSON.parse(n)).push({
            command: e,
            response: t,
            time: Date.now(),
          }),
            window.localStorage.setItem('commandsIssued', JSON.stringify(n));
        };
        var h = function (e) {
          return e.code.toLowerCase().replace('key', '').replace('digit', '');
        };
        t.getKeyFromEvent = h;
        function m() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.isCommandDuplicate = function (e, t) {
          var n = Date.now();
          if (
            e.command &&
            1 === t.length &&
            e.command.includes(t[0].name) &&
            n - (e.time || 0) < 1e3
          )
            return !0;
          return !1;
        };
        var O = null;
        function I() {
          if (null === O) {
            var e = m();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (O = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return O;
        }
        function g() {
          var e = m();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function w() {
          var e = I(),
            t = g(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = m();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var L = '__INTENTIONAL_UNDEFINED__',
          j = {};
        function S(e) {
          var t = w();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'UAParser':
                  return u.default;
                case 'random':
                  return c.default;
                case 'getModifier':
                  return p;
                case 'getMappedTriggers':
                  return v;
                case 'os':
                  return b;
                case 'isEmpty':
                  return o.default;
                case 'isNumber':
                  return _.default;
                case 'round':
                  return a.default;
                case 'startCase':
                  return i.default;
                case 'settings':
                  return s.default;
                case 'verbalise':
                  return R;
                case 'getFeedbackText':
                  return E;
                case 'getKeyFromEvent':
                  return h;
              }
              return;
            })(e);
          var n = t[e];
          return n === L ? void 0 : n;
        }
        function D(e, t) {
          var n = w();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  G(e);
                });
              })
            : ((n[e] = void 0 === t ? L : t),
              function () {
                G(e);
              });
        }
        function G(e) {
          var t = w();
          delete t[e], 0 == Object.keys(t).length && delete g()[I];
        }
        function T(e) {
          var t = w(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = j),
          (function () {
            function e(e, t) {
              Object.defineProperty(j, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', S),
              e('__GetDependency__', S),
              e('__Rewire__', D),
              e('__set__', D),
              e('__reset__', G),
              e('__ResetDependency__', G),
              e('__with__', T);
          })();
        var $ = j;
        t.default = $;
      }.call(this, n(13)));
    },
    165: function (e) {
      e.exports = JSON.parse(
        '[{"state":"California","cases":8767944},{"state":"Texas","cases":6498687},{"state":"Florida","cases":5767014},{"state":"New York","cases":5020179},{"state":"Illinois","cases":2987502},{"state":"Pennsylvania","cases":2713459},{"state":"Ohio","cases":2625551},{"state":"North Carolina","cases":2518195},{"state":"Georgia","cases":2429839},{"state":"Michigan","cases":2316871},{"state":"New Jersey","cases":2139579},{"state":"Tennessee","cases":1954202},{"state":"Arizona","cases":1939021},{"state":"Indiana","cases":1661563},{"state":"Massachusetts","cases":1645809},{"state":"Virginia","cases":1598416},{"state":"Wisconsin","cases":1551117},{"state":"South Carolina","cases":1431047},{"state":"Washington","cases":1391026},{"state":"Minnesota","cases":1383555},{"state":"Missouri","cases":1373435},{"state":"Colorado","cases":1285987},{"state":"Alabama","cases":1256745},{"state":"Kentucky","cases":1227638},{"state":"Louisiana","cases":1207405},{"state":"Oklahoma","cases":1003158},{"state":"Maryland","cases":967917},{"state":"Utah","cases":909109},{"state":"Iowa","cases":815206},{"state":"Arkansas","cases":802198},{"state":"Mississippi","cases":774505},{"state":"Kansas","cases":752974},{"state":"Connecticut","cases":711695},{"state":"Nevada","cases":672296},{"state":"Oregon","cases":671923},{"state":"New Mexico","cases":499392},{"state":"West Virginia","cases":470807},{"state":"Nebraska","cases":450048},{"state":"Idaho","cases":400299},{"state":"Rhode Island","cases":351334},{"state":"New Hampshire","cases":287020},{"state":"Montana","cases":255411},{"state":"Delaware","cases":252567},{"state":"North Dakota","cases":233538},{"state":"South Dakota","cases":232400},{"state":"Hawaii","cases":229531},{"state":"Alaska","cases":222608},{"state":"Maine","cases":184614},{"state":"Wyoming","cases":152206},{"state":"District Of Columbia","cases":132628},{"state":"Vermont","cases":108577}]'
      );
    },
    245: function (e, t, n) {},
    26: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = b),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = y),
          (t.__GetDependency__ = t.__get__ = d),
          (t.getIndependentValues = t.generateSentence = t.default = void 0);
        var _ = n(16),
          o = function (e, t) {
            var n = [];
            return (
              e.forEach(function (e, r) {
                e === t && n.push(r);
              }),
              n
            );
          };
        t.getIndependentValues = function (e, t) {
          var n = t(e.y),
            r = d('getAllIndices')(e.y, n),
            _ = e.x.filter(function (e, t) {
              return r.includes(t);
            });
          return [n, (_ = d('verbalise')(_))];
        };
        function c() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.generateSentence = function (e, t, n) {
          return ''
            .concat(e, ' of ')
            .concat(n.yLabel, ' for ')
            .concat(n.xLabel, ' is ')
            .concat(t, '.');
        };
        var a = null;
        function i() {
          if (null === a) {
            var e = c();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (a = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return a;
        }
        function u() {
          var e = c();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function s() {
          var e = i(),
            t = u(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = c();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var f = '__INTENTIONAL_UNDEFINED__',
          l = {};
        function d(e) {
          var t = s();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getAllIndices':
                  return o;
                case 'verbalise':
                  return _.verbalise;
              }
              return;
            })(e);
          var n = t[e];
          return n === f ? void 0 : n;
        }
        function y(e, t) {
          var n = s();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  b(e);
                });
              })
            : ((n[e] = void 0 === t ? f : t),
              function () {
                b(e);
              });
        }
        function b(e) {
          var t = s();
          delete t[e], 0 == Object.keys(t).length && delete u()[i];
        }
        function E(e) {
          var t = s(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = l),
          (function () {
            function e(e, t) {
              Object.defineProperty(l, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', d),
              e('__GetDependency__', d),
              e('__Rewire__', y),
              e('__set__', y),
              e('__reset__', b),
              e('__ResetDependency__', b),
              e('__with__', E);
          })();
        var p = l;
        t.default = p;
      }.call(this, n(13)));
    },
    413: function (e, t, n) {
      'use strict';
      (function (e) {
        function n(e) {
          return (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        function r(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function _(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? r(Object(n), !0).forEach(function (t) {
                  o(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : r(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        function o(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = v),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = p),
          (t.__GetDependency__ = t.__get__ = E),
          (t.default = void 0);
        var c = {
            listeningText: ' ',
            processingText: ' ... ',
            multipleModifiers: !1,
            modifier: 'option',
          },
          a = {
            MacOS: _(
              _({}, E('defaultSettings')),
              {},
              { listeningText: 'graph listening...' }
            ),
            Windows: _(
              _({}, E('defaultSettings')),
              {},
              { modifier: ['ctrl', 'shift'], multipleModifiers: !0 }
            ),
            default: E('defaultSettings'),
          },
          i = a;
        function u() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = i;
        var s = null;
        function f() {
          if (null === s) {
            var e = u();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (s = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return s;
        }
        function l() {
          var e = u();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function d() {
          var e = f(),
            t = l(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = u();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var y = '__INTENTIONAL_UNDEFINED__',
          b = {};
        function E(e) {
          var t = d();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'defaultSettings':
                  return c;
              }
              return;
            })(e);
          var n = t[e];
          return n === y ? void 0 : n;
        }
        function p(e, t) {
          var r = d();
          return 'object' === n(e)
            ? (Object.keys(e).forEach(function (t) {
                r[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  v(e);
                });
              })
            : ((r[e] = void 0 === t ? y : t),
              function () {
                v(e);
              });
        }
        function v(e) {
          var t = d();
          delete t[e], 0 == Object.keys(t).length && delete l()[f];
        }
        function R(e) {
          var t = d(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = b),
          (function () {
            function e(e, t) {
              Object.defineProperty(b, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', E),
              e('__GetDependency__', E),
              e('__Rewire__', p),
              e('__set__', p),
              e('__reset__', v),
              e('__ResetDependency__', v),
              e('__with__', R);
          })();
        var h = n(a);
        function m(e, t) {
          Object.defineProperty(a, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== h && 'function' !== h) ||
          !Object.isExtensible(a) ||
          (m('__get__', E),
          m('__GetDependency__', E),
          m('__Rewire__', p),
          m('__set__', p),
          m('__reset__', v),
          m('__ResetDependency__', v),
          m('__with__', R),
          m('__RewireAPI__', b));
      }.call(this, n(13)));
    },
    414: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _,
          o = (_ = n(34)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        var i = function (e, t) {
            return p('generateSentence')(
              'Average',
              p('addThousandsSeparators')(p('stats').mean(e.y)),
              t
            );
          },
          u = p('resolver');
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'stats':
                  return o.default;
                case 'resolver':
                  return i;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    416: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _,
          o = (_ = n(34)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        var i = function (e, t) {
            return p('generateSentence')(
              'Median',
              p('addThousandsSeparators')(p('stats').median(e.y)),
              t
            );
          },
          u = p('resolver');
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'stats':
                  return o.default;
                case 'resolver':
                  return i;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    417: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = h),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = R),
          (t.__GetDependency__ = t.__get__ = v),
          (t.default = void 0);
        var _ = i(n(34)),
          o = i(n(418)),
          c = n(26),
          a = n(16);
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var u = function (e, t) {
            var n = v('stats').mode(e.y);
            return Array.isArray(n)
              ? 'There is no mode. No value appears more than any other.'
              : ((n = v('isSet')(n) ? Array.from(n) : [n]),
                v('generateSentence')('Mode', v('verbalise')(n), t));
          },
          s = v('resolver');
        function f() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = s;
        var l = null;
        function d() {
          if (null === l) {
            var e = f();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (l = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return l;
        }
        function y() {
          var e = f();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function b() {
          var e = d(),
            t = y(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = f();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var E = '__INTENTIONAL_UNDEFINED__',
          p = {};
        function v(e) {
          var t = b();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'stats':
                  return _.default;
                case 'isSet':
                  return o.default;
                case 'generateSentence':
                  return c.generateSentence;
                case 'verbalise':
                  return a.verbalise;
                case 'resolver':
                  return u;
              }
              return;
            })(e);
          var n = t[e];
          return n === E ? void 0 : n;
        }
        function R(e, t) {
          var n = b();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  h(e);
                });
              })
            : ((n[e] = void 0 === t ? E : t),
              function () {
                h(e);
              });
        }
        function h(e) {
          var t = b();
          delete t[e], 0 == Object.keys(t).length && delete y()[d];
        }
        function m(e) {
          var t = b(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = p),
          (function () {
            function e(e, t) {
              Object.defineProperty(p, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', v),
              e('__GetDependency__', v),
              e('__Rewire__', R),
              e('__set__', R),
              e('__reset__', h),
              e('__ResetDependency__', h),
              e('__with__', m);
          })();
        var O = r(u);
        function I(e, t) {
          Object.defineProperty(u, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== O && 'function' !== O) ||
          !Object.isExtensible(u) ||
          (I('__get__', v),
          I('__GetDependency__', v),
          I('__Rewire__', R),
          I('__set__', R),
          I('__reset__', h),
          I('__ResetDependency__', h),
          I('__with__', m),
          I('__RewireAPI__', p));
      }.call(this, n(13)));
    },
    420: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = m),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = h),
          (t.__GetDependency__ = t.__get__ = R),
          (t.default = void 0);
        var _,
          o = (_ = n(144)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        function i(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
                    e['@@iterator'];
              if (null == n) return;
              var r,
                _,
                o = [],
                c = !0,
                a = !1;
              try {
                for (
                  n = n.call(e);
                  !(c = (r = n.next()).done) &&
                  (o.push(r.value), !t || o.length !== t);
                  c = !0
                );
              } catch (i) {
                (a = !0), (_ = i);
              } finally {
                try {
                  c || null == n.return || n.return();
                } finally {
                  if (a) throw _;
                }
              }
              return o;
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ('string' === typeof e) return u(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              'Object' === n && e.constructor && (n = e.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(e);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return u(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        }
        function u(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var s = function (e, t) {
            var n = i(R('getIndependentValues')(e, R('max')), 2),
              r = n[0],
              _ = n[1];
            return R('generateSentence')(
              'Maximum value',
              ''
                .concat(R('addThousandsSeparators')(r), ' belonging to ')
                .concat(_),
              t
            );
          },
          f = R('resolver');
        function l() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = f;
        var d = null;
        function y() {
          if (null === d) {
            var e = l();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (d = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return d;
        }
        function b() {
          var e = l();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function E() {
          var e = y(),
            t = b(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = l();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var p = '__INTENTIONAL_UNDEFINED__',
          v = {};
        function R(e) {
          var t = E();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getIndependentValues':
                  return c.getIndependentValues;
                case 'max':
                  return o.default;
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'resolver':
                  return s;
              }
              return;
            })(e);
          var n = t[e];
          return n === p ? void 0 : n;
        }
        function h(e, t) {
          var n = E();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  m(e);
                });
              })
            : ((n[e] = void 0 === t ? p : t),
              function () {
                m(e);
              });
        }
        function m(e) {
          var t = E();
          delete t[e], 0 == Object.keys(t).length && delete b()[y];
        }
        function O(e) {
          var t = E(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = v),
          (function () {
            function e(e, t) {
              Object.defineProperty(v, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', R),
              e('__GetDependency__', R),
              e('__Rewire__', h),
              e('__set__', h),
              e('__reset__', m),
              e('__ResetDependency__', m),
              e('__with__', O);
          })();
        var I = r(s);
        function g(e, t) {
          Object.defineProperty(s, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== I && 'function' !== I) ||
          !Object.isExtensible(s) ||
          (g('__get__', R),
          g('__GetDependency__', R),
          g('__Rewire__', h),
          g('__set__', h),
          g('__reset__', m),
          g('__ResetDependency__', m),
          g('__with__', O),
          g('__RewireAPI__', v));
      }.call(this, n(13)));
    },
    422: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = m),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = h),
          (t.__GetDependency__ = t.__get__ = R),
          (t.default = void 0);
        var _,
          o = (_ = n(146)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        function i(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
                    e['@@iterator'];
              if (null == n) return;
              var r,
                _,
                o = [],
                c = !0,
                a = !1;
              try {
                for (
                  n = n.call(e);
                  !(c = (r = n.next()).done) &&
                  (o.push(r.value), !t || o.length !== t);
                  c = !0
                );
              } catch (i) {
                (a = !0), (_ = i);
              } finally {
                try {
                  c || null == n.return || n.return();
                } finally {
                  if (a) throw _;
                }
              }
              return o;
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ('string' === typeof e) return u(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              'Object' === n && e.constructor && (n = e.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(e);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return u(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        }
        function u(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var s = function (e, t) {
            var n = i(R('getIndependentValues')(e, R('min')), 2),
              r = n[0],
              _ = n[1];
            return R('generateSentence')(
              'Minimum value',
              ''
                .concat(R('addThousandsSeparators')(r), ' belonging to ')
                .concat(_),
              t
            );
          },
          f = R('resolver');
        function l() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = f;
        var d = null;
        function y() {
          if (null === d) {
            var e = l();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (d = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return d;
        }
        function b() {
          var e = l();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function E() {
          var e = y(),
            t = b(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = l();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var p = '__INTENTIONAL_UNDEFINED__',
          v = {};
        function R(e) {
          var t = E();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getIndependentValues':
                  return c.getIndependentValues;
                case 'min':
                  return o.default;
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'resolver':
                  return s;
              }
              return;
            })(e);
          var n = t[e];
          return n === p ? void 0 : n;
        }
        function h(e, t) {
          var n = E();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  m(e);
                });
              })
            : ((n[e] = void 0 === t ? p : t),
              function () {
                m(e);
              });
        }
        function m(e) {
          var t = E();
          delete t[e], 0 == Object.keys(t).length && delete b()[y];
        }
        function O(e) {
          var t = E(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = v),
          (function () {
            function e(e, t) {
              Object.defineProperty(v, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', R),
              e('__GetDependency__', R),
              e('__Rewire__', h),
              e('__set__', h),
              e('__reset__', m),
              e('__ResetDependency__', m),
              e('__with__', O);
          })();
        var I = r(s);
        function g(e, t) {
          Object.defineProperty(s, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== I && 'function' !== I) ||
          !Object.isExtensible(s) ||
          (g('__get__', R),
          g('__GetDependency__', R),
          g('__Rewire__', h),
          g('__set__', h),
          g('__reset__', m),
          g('__ResetDependency__', m),
          g('__with__', O),
          g('__RewireAPI__', v));
      }.call(this, n(13)));
    },
    424: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _,
          o = (_ = n(34)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        var i = function (e, t) {
            return p('generateSentence')(
              'Variance',
              p('addThousandsSeparators')(p('stats').variance(e.y)),
              t
            );
          },
          u = p('resolver');
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'stats':
                  return o.default;
                case 'resolver':
                  return i;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    425: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _,
          o = (_ = n(34)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        var i = function (e, t) {
            return p('generateSentence')(
              'Standard Deviation',
              p('addThousandsSeparators')(p('stats').stdev(e.y)),
              t
            );
          },
          u = p('resolver');
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'stats':
                  return o.default;
                case 'resolver':
                  return i;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    426: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _,
          o = (_ = n(34)) && _.__esModule ? _ : { default: _ },
          c = n(26),
          a = n(16);
        var i = function (e, t) {
            return p('generateSentence')(
              'Sum',
              p('addThousandsSeparators')(p('stats').sum(e.y)),
              t
            );
          },
          u = p('resolver');
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'generateSentence':
                  return c.generateSentence;
                case 'addThousandsSeparators':
                  return a.addThousandsSeparators;
                case 'stats':
                  return o.default;
                case 'resolver':
                  return i;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    427: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = E),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = b),
          (t.__GetDependency__ = t.__get__ = y),
          (t.default = void 0);
        var _ = n(16),
          o = function (e, t) {
            return y('getInstructionsText')(
              t.triggers,
              t.title,
              y('getSettings')()
            );
          },
          c = y('resolver');
        function a() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = c;
        var i = null;
        function u() {
          if (null === i) {
            var e = a();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (i = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return i;
        }
        function s() {
          var e = a();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function f() {
          var e = u(),
            t = s(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = a();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var l = '__INTENTIONAL_UNDEFINED__',
          d = {};
        function y(e) {
          var t = f();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getInstructionsText':
                  return _.getInstructionsText;
                case 'getSettings':
                  return _.getSettings;
                case 'resolver':
                  return o;
              }
              return;
            })(e);
          var n = t[e];
          return n === l ? void 0 : n;
        }
        function b(e, t) {
          var n = f();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  E(e);
                });
              })
            : ((n[e] = void 0 === t ? l : t),
              function () {
                E(e);
              });
        }
        function E(e) {
          var t = f();
          delete t[e], 0 == Object.keys(t).length && delete s()[u];
        }
        function p(e) {
          var t = f(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = d),
          (function () {
            function e(e, t) {
              Object.defineProperty(d, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', y),
              e('__GetDependency__', y),
              e('__Rewire__', b),
              e('__set__', b),
              e('__reset__', E),
              e('__ResetDependency__', E),
              e('__with__', p);
          })();
        var v = r(o);
        function R(e, t) {
          Object.defineProperty(o, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== v && 'function' !== v) ||
          !Object.isExtensible(o) ||
          (R('__get__', y),
          R('__GetDependency__', y),
          R('__Rewire__', b),
          R('__set__', b),
          R('__reset__', E),
          R('__ResetDependency__', E),
          R('__with__', p),
          R('__RewireAPI__', d));
      }.call(this, n(13)));
    },
    428: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = I),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = O),
          (t.__GetDependency__ = t.__get__ = m),
          (t.default = void 0);
        var _ = u(n(34)),
          o = u(n(144)),
          c = u(n(146)),
          a = n(26),
          i = n(16);
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function s(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
                    e['@@iterator'];
              if (null == n) return;
              var r,
                _,
                o = [],
                c = !0,
                a = !1;
              try {
                for (
                  n = n.call(e);
                  !(c = (r = n.next()).done) &&
                  (o.push(r.value), !t || o.length !== t);
                  c = !0
                );
              } catch (i) {
                (a = !0), (_ = i);
              } finally {
                try {
                  c || null == n.return || n.return();
                } finally {
                  if (a) throw _;
                }
              }
              return o;
            })(e, t) ||
            (function (e, t) {
              if (!e) return;
              if ('string' === typeof e) return f(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              'Object' === n && e.constructor && (n = e.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(e);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return f(e, t);
            })(e, t) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        }
        function f(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var l = function (e, t) {
            var n = s(m('getIndependentValues')(e, m('max')), 2),
              r = n[0],
              _ = n[1],
              o = s(m('getIndependentValues')(e, m('min')), 2),
              c = o[0],
              a = o[1],
              i = m('addThousandsSeparators')(r),
              u = m('addThousandsSeparators')(c),
              f = m('addThousandsSeparators')(m('stats').mean(e.y));
            return 'Graph with title: '
              .concat(t.title, '. The X-axis is ')
              .concat(t.xLabel, '. The Y-axis is ')
              .concat(t.yLabel, '. The maximum data point is ')
              .concat(i, ' belonging to ')
              .concat(_, ', and the minimum data point is ')
              .concat(u, ' belonging to ')
              .concat(a, '. The average is ')
              .concat(f, '.');
          },
          d = m('resolver');
        function y() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = d;
        var b = null;
        function E() {
          if (null === b) {
            var e = y();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (b = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return b;
        }
        function p() {
          var e = y();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function v() {
          var e = E(),
            t = p(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = y();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var R = '__INTENTIONAL_UNDEFINED__',
          h = {};
        function m(e) {
          var t = v();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getIndependentValues':
                  return a.getIndependentValues;
                case 'max':
                  return o.default;
                case 'min':
                  return c.default;
                case 'addThousandsSeparators':
                  return i.addThousandsSeparators;
                case 'stats':
                  return _.default;
                case 'resolver':
                  return l;
              }
              return;
            })(e);
          var n = t[e];
          return n === R ? void 0 : n;
        }
        function O(e, t) {
          var n = v();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  I(e);
                });
              })
            : ((n[e] = void 0 === t ? R : t),
              function () {
                I(e);
              });
        }
        function I(e) {
          var t = v();
          delete t[e], 0 == Object.keys(t).length && delete p()[E];
        }
        function g(e) {
          var t = v(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = h),
          (function () {
            function e(e, t) {
              Object.defineProperty(h, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', m),
              e('__GetDependency__', m),
              e('__Rewire__', O),
              e('__set__', O),
              e('__reset__', I),
              e('__ResetDependency__', I),
              e('__with__', g);
          })();
        var w = r(l);
        function L(e, t) {
          Object.defineProperty(l, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== w && 'function' !== w) ||
          !Object.isExtensible(l) ||
          (L('__get__', m),
          L('__GetDependency__', m),
          L('__Rewire__', O),
          L('__set__', O),
          L('__reset__', I),
          L('__ResetDependency__', I),
          L('__with__', g),
          L('__RewireAPI__', h));
      }.call(this, n(13)));
    },
    429: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = m),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = h),
          (t.__GetDependency__ = t.__get__ = R),
          (t.default = void 0);
        var _ = a(n(430)),
          o = a(n(483)),
          c = n(16);
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function i(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return u(e);
            })(e) ||
            (function (e) {
              if (
                ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
                null != e['@@iterator']
              )
                return Array.from(e);
            })(e) ||
            (function (e, t) {
              if (!e) return;
              if ('string' === typeof e) return u(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              'Object' === n && e.constructor && (n = e.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(e);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return u(e, t);
            })(e) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        }
        function u(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var s = function (e, t, n) {
            n = n ? n.replace(/(\d+)(st|nd|rd|th)/, '$1') : '';
            var r = [],
              _ =
                "Could not find the data you're looking for. Please try again.";
            return (
              n.length > 0 &&
                (n
                  .split(' ')
                  .map(function (t) {
                    return {
                      text: t,
                      matches: e.x.filter(function (e) {
                        return (
                          (e = e.toString().toLowerCase()),
                          (t = R('wordsToNumbers')(t.toString().toLowerCase())),
                          e.includes(t)
                        );
                      }),
                    };
                  })
                  .filter(function (e) {
                    return e.matches.length > 0;
                  })
                  .forEach(function (e) {
                    r = R('uniq')([].concat(i(r), i(e.matches)));
                  }),
                r.length > 0 &&
                  (_ = 'Found the following possible matches in the data.'),
                r.forEach(function (t) {
                  var n = e.x.findIndex(function (e) {
                      return e === t;
                    }),
                    r = e.y[n];
                  _ += ' The value for '
                    .concat(t, ' is ')
                    .concat(R('addThousandsSeparators')(r), '.');
                })),
              _
            );
          },
          f = R('resolver');
        function l() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = f;
        var d = null;
        function y() {
          if (null === d) {
            var e = l();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (d = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return d;
        }
        function b() {
          var e = l();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function E() {
          var e = y(),
            t = b(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = l();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var p = '__INTENTIONAL_UNDEFINED__',
          v = {};
        function R(e) {
          var t = E();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'wordsToNumbers':
                  return _.default;
                case 'uniq':
                  return o.default;
                case 'addThousandsSeparators':
                  return c.addThousandsSeparators;
                case 'resolver':
                  return s;
              }
              return;
            })(e);
          var n = t[e];
          return n === p ? void 0 : n;
        }
        function h(e, t) {
          var n = E();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  m(e);
                });
              })
            : ((n[e] = void 0 === t ? p : t),
              function () {
                m(e);
              });
        }
        function m(e) {
          var t = E();
          delete t[e], 0 == Object.keys(t).length && delete b()[y];
        }
        function O(e) {
          var t = E(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = v),
          (function () {
            function e(e, t) {
              Object.defineProperty(v, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', R),
              e('__GetDependency__', R),
              e('__Rewire__', h),
              e('__set__', h),
              e('__reset__', m),
              e('__ResetDependency__', m),
              e('__with__', O);
          })();
        var I = r(s);
        function g(e, t) {
          Object.defineProperty(s, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== I && 'function' !== I) ||
          !Object.isExtensible(s) ||
          (g('__get__', R),
          g('__GetDependency__', R),
          g('__Rewire__', h),
          g('__set__', h),
          g('__reset__', m),
          g('__ResetDependency__', m),
          g('__with__', O),
          g('__RewireAPI__', v));
      }.call(this, n(13)));
    },
    45: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = B),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = N),
          (t.__GetDependency__ = t.__get__ = $),
          (t.default = void 0);
        var _ = b(n(299)),
          o = b(n(120)),
          c = y(n(507));
        n(314);
        var a = b(n(315)),
          i = b(n(316)),
          u = y(n(321)),
          s = n(138),
          f = b(n(498)),
          l = n(16);
        function d(e) {
          if ('function' !== typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (d = function (e) {
            return e ? n : t;
          })(e);
        }
        function y(e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ('object' !== r(e) && 'function' !== typeof e))
            return { default: e };
          var n = d(t);
          if (n && n.has(e)) return n.get(e);
          var _ = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var c in e)
            if ('default' !== c && Object.prototype.hasOwnProperty.call(e, c)) {
              var a = o ? Object.getOwnPropertyDescriptor(e, c) : null;
              a && (a.get || a.set)
                ? Object.defineProperty(_, c, a)
                : (_[c] = e[c]);
            }
          return (_.default = e), n && n.set(e, _), _;
        }
        function b(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function E(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return p(e);
            })(e) ||
            (function (e) {
              if (
                ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
                null != e['@@iterator']
              )
                return Array.from(e);
            })(e) ||
            (function (e, t) {
              if (!e) return;
              if ('string' === typeof e) return p(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              'Object' === n && e.constructor && (n = e.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(e);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return p(e, t);
            })(e) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              );
            })()
          );
        }
        function p(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var v = { command: null, time: null },
          R = [],
          h = $('getSettings')(),
          m = function (e, t, n) {
            var r = $('getModifier')($('SETTINGS'), !1, !1);
            $('hotkeys').setScope(n),
              $('hotkeys')(
                $('getKeyBinds')(r, t.triggers.mainKey),
                n,
                function (n) {
                  $('logKeyPresses')(r, n),
                    n.preventDefault(),
                    $('resetSonifier')($('Tone'), $('oscillations')),
                    A('oscillations', []);
                  var _ = new ($('p5').SpeechRec)();
                  (_.onResult = function () {
                    var n = _.resultString.toLowerCase(),
                      r = $('processCommand')(n, e, t, $('lastIssuedCommand'));
                    r && A('lastIssuedCommand', r.lastIssuedCommand);
                  }),
                    (_.onError = function () {
                      var e = 'Command not recognized. Please try again.';
                      console.log('[VoxLens] ' + e),
                        $('createTemporaryElement')(e);
                    }),
                    _.start();
                  var o = new ($('Tone').OmniOscillator)(
                    'C4',
                    'sawtooth'
                  ).toDestination();
                  (o.frequency.value = 300),
                    (o.volume.value = -20),
                    (o.onstop = function () {
                      return o.dispose();
                    }),
                    o.sync().start(0).stop(0.5),
                    $('oscillations').push(o),
                    $('Tone').Transport.start();
                }
              ),
              $('hotkeys')(
                $('getKeyBinds')(r, t.triggers.instructionsKey),
                n,
                function (n) {
                  $('logKeyPresses')(r, n),
                    n.preventDefault(),
                    $('resetSonifier')($('Tone'), $('oscillations')),
                    A('oscillations', []);
                  var _ = $('processCommand')(
                    'instructions',
                    e,
                    t,
                    $('lastIssuedCommand')
                  );
                  _ && A('lastIssuedCommand', _.lastIssuedCommand);
                }
              ),
              $('hotkeys')(
                $('getKeyBinds')(r, t.triggers.trendKey),
                n,
                function (t) {
                  var n;
                  $('isCommandDuplicate')($('lastIssuedCommand'), [
                    { name: 'trend' },
                  ]) ||
                    (A('lastIssuedCommand', {
                      command: 'trend',
                      time: Date.now(),
                    }),
                    $('createTemporaryElement')($('SETTINGS').processingText),
                    $('logKeyPresses')(r, t),
                    t.preventDefault(),
                    $('resetSonifier')($('Tone'), $('oscillations')),
                    A('oscillations', []),
                    (n = $('oscillations')).push.apply(
                      n,
                      E($('sonifier')($('Tone'), e))
                    ));
                }
              ),
              $('hotkeys')(
                $('getKeyBinds')(r, t.triggers.summaryKey),
                n,
                function (n) {
                  $('logKeyPresses')(r, n),
                    n.preventDefault(),
                    $('resetSonifier')($('Tone'), $('oscillations')),
                    A('oscillations', []);
                  var _ = $('processCommand')(
                    'summary',
                    e,
                    t,
                    $('lastIssuedCommand')
                  );
                  _ && A('lastIssuedCommand', _.lastIssuedCommand);
                }
              ),
              $('hotkeys')(
                $('getKeyBinds')(r, t.triggers.pause),
                n,
                function (e) {
                  $('logKeyPresses')(r, e),
                    e.preventDefault(),
                    $('resetSonifier')($('Tone'), $('oscillations')),
                    A('oscillations', []),
                    $('createTemporaryElement')($('SETTINGS').processingText);
                }
              );
          },
          O = function (e, t, n) {
            var r = (n = $('formatOptions')(
                $('defaults')(n, $('getDefaults')(n))
              )),
              _ = r.title,
              o = r.triggers,
              c = r.x,
              a = r.y,
              i = $('uniqueId')();
            (t = {
              x: $('getArrayFromObject')(t, c),
              y: $('getArrayFromObject')(t, a),
            }),
              $('validate')(t.y, n),
              $('generateInstructions')(e, o, _, $('SETTINGS')),
              $('startApp')(t, n, i);
          },
          I = function (e, t, n) {
            var r =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {},
              _ = $('libraries')[e];
            if (!_)
              throw new TypeError(
                'Library not supported. Supported libraries are: ' +
                  Object.keys($('libraries')).join(', ') +
                  '.'
              );
            var o = _(t, n),
              c = o.data,
              a = o.viewportElement;
            $('run')(a, c, r);
          },
          g = $('voxlens');
        function w() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = g;
        var L = null;
        function j() {
          if (null === L) {
            var e = w();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (L = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return L;
        }
        function S() {
          var e = w();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function D() {
          var e = j(),
            t = S(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = w();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var G = '__INTENTIONAL_UNDEFINED__',
          T = {};
        function $(e) {
          var t = D();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'getSettings':
                  return l.getSettings;
                case 'getModifier':
                  return l.getModifier;
                case 'SETTINGS':
                  return h;
                case 'hotkeys':
                  return a.default;
                case 'getKeyBinds':
                  return l.getKeyBinds;
                case 'logKeyPresses':
                  return l.logKeyPresses;
                case 'resetSonifier':
                  return u.resetSonifier;
                case 'Tone':
                  return (function () {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {};
                    return Object.keys(e)
                      .filter(function (e) {
                        return (
                          '__get__' !== e &&
                          '__set__' !== e &&
                          '__reset__' !== e &&
                          '__with__' !== e &&
                          '__GetDependency__' !== e &&
                          '__Rewire__' !== e &&
                          '__ResetDependency__' !== e &&
                          '__RewireAPI__' !== e
                        );
                      })
                      .reduce(function (t, n) {
                        return (t[n] = e[n]), t;
                      }, {});
                  })(c);
                case 'oscillations':
                  return R;
                case 'p5':
                  return o.default;
                case 'processCommand':
                  return s.processCommand;
                case 'lastIssuedCommand':
                  return v;
                case 'createTemporaryElement':
                  return l.createTemporaryElement;
                case 'isCommandDuplicate':
                  return l.isCommandDuplicate;
                case 'sonifier':
                  return u.default;
                case 'formatOptions':
                  return l.formatOptions;
                case 'defaults':
                  return _.default;
                case 'getDefaults':
                  return l.getDefaults;
                case 'uniqueId':
                  return i.default;
                case 'getArrayFromObject':
                  return l.getArrayFromObject;
                case 'validate':
                  return l.validate;
                case 'generateInstructions':
                  return l.generateInstructions;
                case 'startApp':
                  return m;
                case 'libraries':
                  return f.default;
                case 'run':
                  return O;
                case 'voxlens':
                  return I;
              }
              return;
            })(e);
          var n = t[e];
          return n === G ? void 0 : n;
        }
        function A(e, t) {
          var n = D();
          return void 0 === n[e]
            ? (function (e, t) {
                switch (e) {
                  case 'oscillations':
                    return (R = t);
                  case 'lastIssuedCommand':
                    return (v = t);
                }
                return;
              })(e, t)
            : (n[e] = t);
        }
        function N(e, t) {
          var n = D();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  B(e);
                });
              })
            : ((n[e] = void 0 === t ? G : t),
              function () {
                B(e);
              });
        }
        function B(e) {
          var t = D();
          delete t[e], 0 == Object.keys(t).length && delete S()[j];
        }
        function P(e) {
          var t = D(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = T),
          (function () {
            function e(e, t) {
              Object.defineProperty(T, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', $),
              e('__GetDependency__', $),
              e('__Rewire__', N),
              e('__set__', N),
              e('__reset__', B),
              e('__ResetDependency__', B),
              e('__with__', P);
          })();
        var W = r(I);
        function M(e, t) {
          Object.defineProperty(I, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== W && 'function' !== W) ||
          !Object.isExtensible(I) ||
          (M('__get__', $),
          M('__GetDependency__', $),
          M('__Rewire__', N),
          M('__set__', N),
          M('__reset__', B),
          M('__ResetDependency__', B),
          M('__with__', P),
          M('__RewireAPI__', T));
      }.call(this, n(13)));
    },
    497: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = E),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = b),
          (t.__GetDependency__ = t.__get__ = y),
          (t.default = void 0);
        var _ = n(138),
          o = function () {
            var e = 'VoxLens supports the following commands.';
            return (
              y('commands').forEach(function (t) {
                return (e += ' ' + t.name + ',');
              }),
              e.replace(/.$/, '.')
            );
          },
          c = y('resolver');
        function a() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = c;
        var i = null;
        function u() {
          if (null === i) {
            var e = a();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (i = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return i;
        }
        function s() {
          var e = a();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function f() {
          var e = u(),
            t = s(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = a();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var l = '__INTENTIONAL_UNDEFINED__',
          d = {};
        function y(e) {
          var t = f();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'commands':
                  return _.commands;
                case 'resolver':
                  return o;
              }
              return;
            })(e);
          var n = t[e];
          return n === l ? void 0 : n;
        }
        function b(e, t) {
          var n = f();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  E(e);
                });
              })
            : ((n[e] = void 0 === t ? l : t),
              function () {
                E(e);
              });
        }
        function E(e) {
          var t = f();
          delete t[e], 0 == Object.keys(t).length && delete s()[u];
        }
        function p(e) {
          var t = f(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = d),
          (function () {
            function e(e, t) {
              Object.defineProperty(d, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', y),
              e('__GetDependency__', y),
              e('__Rewire__', b),
              e('__set__', b),
              e('__reset__', E),
              e('__ResetDependency__', E),
              e('__with__', p);
          })();
        var v = r(o);
        function R(e, t) {
          Object.defineProperty(o, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== v && 'function' !== v) ||
          !Object.isExtensible(o) ||
          (R('__get__', y),
          R('__GetDependency__', y),
          R('__Rewire__', b),
          R('__set__', b),
          R('__reset__', E),
          R('__ResetDependency__', E),
          R('__with__', p),
          R('__RewireAPI__', d));
      }.call(this, n(13)));
    },
    498: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = R),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = v),
          (t.__GetDependency__ = t.__get__ = p),
          (t.default = void 0);
        var _ = a(n(499)),
          o = a(n(500)),
          c = a(n(501));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var i = {
            chartjs: p('chartjs'),
            d3: p('d3'),
            googlecharts: p('googlecharts'),
          },
          u = i;
        function s() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = u;
        var f = null;
        function l() {
          if (null === f) {
            var e = s();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (f = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return f;
        }
        function d() {
          var e = s();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function y() {
          var e = l(),
            t = d(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = s();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var b = '__INTENTIONAL_UNDEFINED__',
          E = {};
        function p(e) {
          var t = y();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'chartjs':
                  return _.default;
                case 'd3':
                  return o.default;
                case 'googlecharts':
                  return c.default;
              }
              return;
            })(e);
          var n = t[e];
          return n === b ? void 0 : n;
        }
        function v(e, t) {
          var n = y();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  R(e);
                });
              })
            : ((n[e] = void 0 === t ? b : t),
              function () {
                R(e);
              });
        }
        function R(e) {
          var t = y();
          delete t[e], 0 == Object.keys(t).length && delete d()[l];
        }
        function h(e) {
          var t = y(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = E),
          (function () {
            function e(e, t) {
              Object.defineProperty(E, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', p),
              e('__GetDependency__', p),
              e('__Rewire__', v),
              e('__set__', v),
              e('__reset__', R),
              e('__ResetDependency__', R),
              e('__with__', h);
          })();
        var m = r(i);
        function O(e, t) {
          Object.defineProperty(i, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== m && 'function' !== m) ||
          !Object.isExtensible(i) ||
          (O('__get__', p),
          O('__GetDependency__', p),
          O('__Rewire__', v),
          O('__set__', v),
          O('__reset__', R),
          O('__ResetDependency__', R),
          O('__with__', h),
          O('__RewireAPI__', E));
      }.call(this, n(13)));
    },
    499: function (e, t, n) {
      'use strict';
      (function (e) {
        function n(e) {
          return (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = y),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = d),
          (t.__GetDependency__ = t.__get__ = l),
          (t.default = void 0);
        var r = function (e, t) {
            return { data: t, viewportElement: e };
          },
          _ = l('setup');
        function o() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = _;
        var c = null;
        function a() {
          if (null === c) {
            var e = o();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (c = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return c;
        }
        function i() {
          var e = o();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function u() {
          var e = a(),
            t = i(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = o();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var s = '__INTENTIONAL_UNDEFINED__',
          f = {};
        function l(e) {
          var t = u();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'setup':
                  return r;
              }
              return;
            })(e);
          var n = t[e];
          return n === s ? void 0 : n;
        }
        function d(e, t) {
          var r = u();
          return 'object' === n(e)
            ? (Object.keys(e).forEach(function (t) {
                r[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  y(e);
                });
              })
            : ((r[e] = void 0 === t ? s : t),
              function () {
                y(e);
              });
        }
        function y(e) {
          var t = u();
          delete t[e], 0 == Object.keys(t).length && delete i()[a];
        }
        function b(e) {
          var t = u(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = f),
          (function () {
            function e(e, t) {
              Object.defineProperty(f, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', l),
              e('__GetDependency__', l),
              e('__Rewire__', d),
              e('__set__', d),
              e('__reset__', y),
              e('__ResetDependency__', y),
              e('__with__', b);
          })();
        var E = n(r);
        function p(e, t) {
          Object.defineProperty(r, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== E && 'function' !== E) ||
          !Object.isExtensible(r) ||
          (p('__get__', l),
          p('__GetDependency__', l),
          p('__Rewire__', d),
          p('__set__', d),
          p('__reset__', y),
          p('__ResetDependency__', y),
          p('__with__', b),
          p('__RewireAPI__', f));
      }.call(this, n(13)));
    },
    500: function (e, t, n) {
      'use strict';
      (function (e) {
        function r(e) {
          return (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = p),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = E),
          (t.__GetDependency__ = t.__get__ = b),
          (t.default = void 0);
        var _,
          o = (_ = n(51)) && _.__esModule ? _ : { default: _ };
        var c = function (e) {
            var t = e.data();
            return (
              b('isArray')(t[0]) && (t = t[0]),
              {
                data: t,
                viewportElement: (e =
                  e.node().parentElement.parentElement.parentElement),
              }
            );
          },
          a = b('setup');
        function i() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = a;
        var u = null;
        function s() {
          if (null === u) {
            var e = i();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (u = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return u;
        }
        function f() {
          var e = i();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function l() {
          var e = s(),
            t = f(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = i();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var d = '__INTENTIONAL_UNDEFINED__',
          y = {};
        function b(e) {
          var t = l();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'isArray':
                  return o.default;
                case 'setup':
                  return c;
              }
              return;
            })(e);
          var n = t[e];
          return n === d ? void 0 : n;
        }
        function E(e, t) {
          var n = l();
          return 'object' === r(e)
            ? (Object.keys(e).forEach(function (t) {
                n[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  p(e);
                });
              })
            : ((n[e] = void 0 === t ? d : t),
              function () {
                p(e);
              });
        }
        function p(e) {
          var t = l();
          delete t[e], 0 == Object.keys(t).length && delete f()[s];
        }
        function v(e) {
          var t = l(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = y),
          (function () {
            function e(e, t) {
              Object.defineProperty(y, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', b),
              e('__GetDependency__', b),
              e('__Rewire__', E),
              e('__set__', E),
              e('__reset__', p),
              e('__ResetDependency__', p),
              e('__with__', v);
          })();
        var R = r(c);
        function h(e, t) {
          Object.defineProperty(c, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== R && 'function' !== R) ||
          !Object.isExtensible(c) ||
          (h('__get__', b),
          h('__GetDependency__', b),
          h('__Rewire__', E),
          h('__set__', E),
          h('__reset__', p),
          h('__ResetDependency__', p),
          h('__with__', v),
          h('__RewireAPI__', y));
      }.call(this, n(13)));
    },
    501: function (e, t, n) {
      'use strict';
      (function (e) {
        function n(e) {
          return (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.__ResetDependency__ = y),
          (t.__RewireAPI__ = void 0),
          (t.__set__ = t.__Rewire__ = d),
          (t.__GetDependency__ = t.__get__ = l),
          (t.default = void 0);
        var r = function (e, t) {
            return { data: t, viewportElement: e.container };
          },
          _ = l('setup');
        function o() {
          try {
            if (e) return e;
          } catch (t) {
            try {
              if (window) return window;
            } catch (t) {
              return this;
            }
          }
        }
        t.default = _;
        var c = null;
        function a() {
          if (null === c) {
            var e = o();
            e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ ||
              (e.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0),
              (c = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++);
          }
          return c;
        }
        function i() {
          var e = o();
          return (
            e.__$$GLOBAL_REWIRE_REGISTRY__ ||
              (e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null)),
            e.__$$GLOBAL_REWIRE_REGISTRY__
          );
        }
        function u() {
          var e = a(),
            t = i(),
            n = t[e];
          return n || ((t[e] = Object.create(null)), (n = t[e])), n;
        }
        !(function () {
          var e = o();
          e.__rewire_reset_all__ ||
            (e.__rewire_reset_all__ = function () {
              e.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
            });
        })();
        var s = '__INTENTIONAL_UNDEFINED__',
          f = {};
        function l(e) {
          var t = u();
          if (void 0 === t[e])
            return (function (e) {
              switch (e) {
                case 'setup':
                  return r;
              }
              return;
            })(e);
          var n = t[e];
          return n === s ? void 0 : n;
        }
        function d(e, t) {
          var r = u();
          return 'object' === n(e)
            ? (Object.keys(e).forEach(function (t) {
                r[t] = e[t];
              }),
              function () {
                Object.keys(e).forEach(function (t) {
                  y(e);
                });
              })
            : ((r[e] = void 0 === t ? s : t),
              function () {
                y(e);
              });
        }
        function y(e) {
          var t = u();
          delete t[e], 0 == Object.keys(t).length && delete i()[a];
        }
        function b(e) {
          var t = u(),
            n = Object.keys(e),
            r = {};
          function _() {
            n.forEach(function (e) {
              t[e] = r[e];
            });
          }
          return function (o) {
            n.forEach(function (n) {
              (r[n] = t[n]), (t[n] = e[n]);
            });
            var c = o();
            return (
              c && 'function' == typeof c.then ? c.then(_).catch(_) : _(), c
            );
          };
        }
        (t.__RewireAPI__ = f),
          (function () {
            function e(e, t) {
              Object.defineProperty(f, e, {
                value: t,
                enumerable: !1,
                configurable: !0,
              });
            }
            e('__get__', l),
              e('__GetDependency__', l),
              e('__Rewire__', d),
              e('__set__', d),
              e('__reset__', y),
              e('__ResetDependency__', y),
              e('__with__', b);
          })();
        var E = n(r);
        function p(e, t) {
          Object.defineProperty(r, e, {
            value: t,
            enumerable: !1,
            configurable: !0,
          });
        }
        ('object' !== E && 'function' !== E) ||
          !Object.isExtensible(r) ||
          (p('__get__', l),
          p('__GetDependency__', l),
          p('__Rewire__', d),
          p('__set__', d),
          p('__reset__', y),
          p('__ResetDependency__', y),
          p('__with__', b),
          p('__RewireAPI__', f));
      }.call(this, n(13)));
    },
    505: function (e, t, n) {},
    506: function (e, t, n) {},
    508: function (e, t, n) {
      'use strict';
      n.r(t);
      var r = n(10),
        _ = n.n(r),
        o = n(159),
        c = n.n(o),
        a = (n(245), n(47)),
        i = n(8),
        u = n(14),
        s = n(12),
        f = function () {
          return Object(s.jsxs)('div', {
            children: [
              Object(s.jsx)('h1', { children: 'Examples' }),
              Object(s.jsxs)('ul', {
                children: [
                  Object(s.jsx)('li', {
                    children: Object(s.jsx)(a.b, {
                      to: '/chartjs',
                      children: 'ChartJS',
                    }),
                  }),
                  Object(s.jsx)('li', {
                    children: Object(s.jsx)(a.b, { to: '/d3', children: 'D3' }),
                  }),
                  Object(s.jsx)('li', {
                    children: Object(s.jsx)(a.b, {
                      to: '/google-charts',
                      children: 'Google Charts',
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        l = n(0),
        d = n(1),
        y = n(2),
        b = n(3),
        E = n(162),
        p = n.n(E),
        v = n(163),
        R = n.n(v),
        h = n(21),
        m = n.n(h),
        O = n(45),
        I = n.n(O),
        g = function (e) {
          var t = e.data,
            n = e.fillColor,
            r = e.title,
            _ = e.xKey,
            o = e.yKey,
            c = document.getElementById('chart'),
            a = 20,
            i = 40,
            u = 40,
            s = 70,
            f = c.height - a - u,
            l = c.width - s - i,
            d = c.getContext('2d');
          (d.canvas.width = l), (d.canvas.height = f);
          var y = t.map(function (e) {
            return e[o];
          });
          new R.a(d, {
            type: 'bar',
            data: {
              labels: t.map(function (e) {
                return e[_];
              }),
              datasets: [
                {
                  label: m()(o),
                  data: y,
                  fill: !0,
                  backgroundColor: n,
                  borderColor: n,
                },
              ],
            },
            options: {
              maintainAspectRatio: !0,
              title: { display: !0, text: r },
              legend: !1,
              scales: {
                xAxes: [
                  {
                    scaleLabel: { display: !0, labelString: m()(_) },
                    gridLines: { display: !0 },
                  },
                ],
                yAxes: [
                  {
                    scaleLabel: { display: !0, labelString: m()(o) },
                    gridLines: { display: !0 },
                    ticks: { beginAtZero: !0 },
                  },
                ],
              },
            },
          });
          var b = { x: _, y: o, title: r };
          I()('chartjs', c, t, b);
        },
        w = n(39),
        L = n(164),
        j = n.n(L),
        S = function (e) {
          var t = e.data,
            n = e.fillColor,
            r = e.title,
            _ = e.xKey,
            o = e.yKey,
            c = document.getElementById('chart'),
            a = 20,
            i = 40,
            u =
              5 *
                j()(
                  t.map(function (e) {
                    return e[_].toString().length;
                  })
                ) +
              10,
            s = 70,
            f = 500 - a - 20,
            l = c.offsetWidth - s - i,
            d = s + ',' + a,
            y = w
              .f('#chart')
              .append('svg')
              .attr('width', l + s + i)
              .attr('height', f + 40 + a + u)
              .append('g')
              .attr('transform', 'translate(' + d + ')'),
            b = null,
            E = w.e().range([f, 0]),
            p = { x: _, y: o, title: r };
          (b = w.d().range([0, l]).padding(0.1)).domain(
            t.map(function (e) {
              return e[_];
            })
          ),
            E.domain([
              0,
              w.c(t, function (e) {
                return parseFloat(e[o]);
              }),
            ]),
            y
              .append('text')
              .attr('x', l / 2)
              .attr('y', -7)
              .style('text-anchor', 'middle')
              .text(r),
            y
              .selectAll('.bar')
              .data(t)
              .enter()
              .append('rect')
              .attr('class', 'bar')
              .style('fill', n)
              .style('margin', '10px')
              .attr('x', function (e) {
                return b(e[_]);
              })
              .attr('width', b.bandwidth())
              .attr('y', function (e) {
                return E(e[o]);
              })
              .attr('height', function (e) {
                return f - E(e[o]);
              })
              .call(function (e) {
                return I()('d3', e, t, p);
              }),
            y
              .append('text')
              .attr(
                'transform',
                'translate(' + l / 2 + ' ,' + (f + u + 20) + ')'
              )
              .style('text-anchor', 'middle')
              .text(m()(_)),
            y
              .append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 0 - s)
              .attr('x', 0 - f / 2)
              .attr('dy', '1em')
              .style('text-anchor', 'middle')
              .text(m()(o)),
            y
              .append('g')
              .attr('transform', 'translate(0, ' + f + ')')
              .call(w.a(b).ticks(t.length))
              .selectAll('text')
              .attr('y', 0)
              .attr('x', 9)
              .attr('dy', '.35em')
              .attr('transform', 'rotate(90)')
              .style('text-anchor', 'start')
              .style('opacity', 1),
            y.append('g').call(w.b(E));
        },
        D = function (e) {
          var t = e.data,
            n = e.fillColor,
            r = e.title,
            _ = e.xKey,
            o = e.yKey,
            c = document.getElementById('chart'),
            a = 40,
            i = 70,
            u = 700 - 20 - 20,
            s = c.offsetWidth - i - a,
            f = window.google;
          f.charts.load('current', { packages: ['corechart'] }),
            f.charts.setOnLoadCallback(function () {
              var e = new f.visualization.DataTable(),
                a = f.visualization.ColumnChart;
              e.addColumn('string', m()(_)),
                e.addColumn('number', m()(o)),
                e.addRows(
                  t.map(function (e) {
                    return [e[_].toString(), parseFloat(e[o])];
                  })
                );
              var i = {
                  legend: { position: 'none' },
                  bars: 'horizontal',
                  colors: [n],
                  title: r,
                  width: s,
                  height: u,
                  hAxis: { title: m()(_), slantedText: !1 },
                  vAxis: {
                    title: m()(o),
                    baseline: 0,
                    gridlines: { color: 'black' },
                  },
                },
                l = new a(c);
              l.draw(e, i);
              var d = { x: _, y: o, title: r };
              I()('googlecharts', l, t, d);
            });
        },
        G = n(165),
        T =
          (n(505),
          (function (e) {
            Object(y.a)(n, e);
            var t = Object(b.a)(n);
            function n() {
              var e;
              Object(l.a)(this, n);
              for (
                var r = arguments.length, _ = new Array(r), o = 0;
                o < r;
                o++
              )
                _[o] = arguments[o];
              return (
                ((e = t.call.apply(t, [this].concat(_))).settings = {
                  fillColor: 'steelblue',
                  title: 'COVID-19 Cases per US State',
                  xKey: 'state',
                  yKey: 'cases',
                }),
                (e.createChart = function () {
                  var t = e.props.library,
                    n = document.getElementById('chart');
                  if (n) {
                    n.innerHTML = '';
                    var r = Object(i.a)(
                        Object(i.a)({}, e.settings),
                        {},
                        { data: p()(G) }
                      ),
                      _ = null;
                    return (
                      'chartjs' === t
                        ? (_ = g)
                        : 'd3' === t
                        ? (_ = S)
                        : 'googlecharts' === t && (_ = D),
                      _ ? _(r) : null
                    );
                  }
                  e.createChart();
                }),
                e
              );
            }
            return (
              Object(d.a)(n, [
                {
                  key: 'componentDidMount',
                  value: function () {
                    this.createChart();
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var e = this.props.library;
                    return Object(s.jsxs)('div', {
                      id: 'graph',
                      children: [
                        Object(s.jsx)('h1', { children: this.settings.title }),
                        'chartjs' === e
                          ? Object(s.jsx)('canvas', {
                              id: 'chart',
                              tabIndex: '0',
                              role: 'img',
                            })
                          : Object(s.jsx)('div', { id: 'chart' }),
                      ],
                    });
                  },
                },
              ]),
              n
            );
          })(r.Component)),
        $ = function (e) {
          return Object(s.jsxs)(u.c, {
            children: [
              Object(s.jsx)(u.a, { path: '/', component: f }),
              e.supportedLibraries.map(function (t) {
                return Object(s.jsx)(
                  u.a,
                  {
                    path: '/' + t,
                    render: function (n) {
                      return (function (e, t, n) {
                        return e.supportedLibraries.includes(n)
                          ? Object(s.jsx)(
                              T,
                              Object(i.a)(
                                Object(i.a)(Object(i.a)({}, e), t),
                                {},
                                { library: n }
                              )
                            )
                          : Object(s.jsxs)('div', {
                              children: [
                                'Supported libraries: ',
                                e.supportedLibraries.join(', '),
                              ],
                            });
                      })(e, n, t);
                    },
                  },
                  t
                );
              }),
            ],
          });
        },
        A = (n(506), ['chartjs', 'd3', 'googlecharts']),
        N = function () {
          return Object(s.jsx)(a.a, {
            children: Object(s.jsx)($, { supportedLibraries: A }),
          });
        };
      c.a.render(
        Object(s.jsx)(_.a.StrictMode, { children: Object(s.jsx)(N, {}) }),
        document.getElementById('root')
      );
    },
  },
  [[508, 1, 2]],
]);
//# sourceMappingURL=main.29c8eb15.chunk.js.map
