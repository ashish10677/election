"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WalletUtils =
/*#__PURE__*/
function () {
  function WalletUtils() {
    _classCallCheck(this, WalletUtils);
  }

  _createClass(WalletUtils, null, [{
    key: "getPath",
    value: function getPath(walletType) {
      switch (walletType) {
        case "ethereum":
          return "m/44'/60'/0'/0/0";

        case "bitcoin":
          return "m/44'/0'/0/0";

        default:
          return "m/44'/60'/0'/0/0";
      }
    }
  }]);

  return WalletUtils;
}();

var _default = WalletUtils;
exports["default"] = _default;