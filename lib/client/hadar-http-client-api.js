"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('../config/axios'); var _axios2 = _interopRequireDefault(_axios);

var _hadarclientapi = require('./interfaces/hadar-client-api'); var _hadarclientapi2 = _interopRequireDefault(_hadarclientapi);
var _hadarhttputils = require('../utils/hadar-http-utils'); var _hadarhttputils2 = _interopRequireDefault(_hadarhttputils);

class HadarHttpClientApi extends _hadarclientapi2.default {

    constructor() {
        super(_axios2.default);
    }

    applyTransportInterceptors(fn) {
        this.transporter.interceptors.request.use(fn)
    }

    async tryCatchRequest(requestPromise) {
        try {
    
           const { headers, data, status } = await requestPromise;
           return {
               headers,
               data,
               status
           }
        } catch(err) {
            _hadarhttputils2.default.showResponseErrors(err)
        }
    }
}

exports. default = HadarHttpClientApi;
