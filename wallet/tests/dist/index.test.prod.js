"use strict";var _index=_interopRequireDefault(require("../index")),_web3Utils=_interopRequireDefault(require("web3-utils"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}test("Creates an ethereum wallet",function(){return _index.default.createWallet().then(function(e){expect(_web3Utils.default.isAddress("0x".concat(e.getAddress().toString("hex")))).toBe(!0)})});