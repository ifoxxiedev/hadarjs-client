"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

const baseURL = process.env.DISCOVERY_REGISTER_URL;

_axios2.default.interceptors.request.use(function(config ) {
    config.baseURL = `${baseURL}/v1/`;
    return config;
});

exports. default = _axios2.default;