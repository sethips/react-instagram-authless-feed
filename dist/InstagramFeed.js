"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InstagramFeed = /*#__PURE__*/function () {
  function InstagramFeed() {
    _classCallCheck(this, InstagramFeed);
  }

  _createClass(InstagramFeed, null, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {
        var mapMedia, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mapMedia = function mapMedia(json) {
                  var thumbnailIndex = function thumbnailIndex(node) {
                    node.thumbnail_resources.forEach(function (item, index) {
                      if (item.config_width === 640) {
                        return index;
                      }
                    });
                    return 4; // MAGIC
                  };

                  var url = function url(node) {
                    return "https://www.instagram.com/p/" + node.shortcode;
                  };

                  var src = function src(node) {
                    switch (node.__typename) {
                      case "GraphSidecar":
                        return node.thumbnail_resources[thumbnailIndex(node)].src;

                      case "GraphVideo":
                        return node.thumbnail_src;

                      default:
                        return node.thumbnail_resources[thumbnailIndex(node)].src;
                    }
                  };

                  var alt = function alt(node) {
                    if (node.edge_media_to_caption.edges[0] && node.edge_media_to_caption.edges[0].node) {
                      return node.edge_media_to_caption.edges[0].node.text;
                    } else if (node.accessibility_caption) {
                      return node.accessibility_caption;
                    } else {
                      return "";
                    }
                  };

                  var edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
                  return edges.map(function (edge) {
                    return {
                      alt: alt(edge.node),
                      url: url(edge.node),
                      src: src(edge.node)
                    };
                  });
                };

                url = "https://www.instagram.com/" + username + "/";
                _context.next = 4;
                return fetch(url).then(function (resp) {
                  return resp.text();
                }).then(function (body) {
                  return body.split("window._sharedData = ")[1].split("</script>")[0];
                }).then(function (data) {
                  return JSON.parse(data.substr(0, data.length - 1));
                }).then(function (json) {
                  return mapMedia(json);
                })["catch"](function (err) {
                  return console.log(err);
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return InstagramFeed;
}();

var _default = InstagramFeed;
exports["default"] = _default;