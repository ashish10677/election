"use strict";

var _index = _interopRequireDefault(require("../index"));

var _web3Utils = _interopRequireDefault(require("web3-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('Creates an ethereum wallet', function () {
  return _index["default"].createWallet().then(function (wallet) {
    expect(_web3Utils["default"].isAddress("0x".concat(wallet.getAddress().toString('hex')))).toBe(true);
  });
});