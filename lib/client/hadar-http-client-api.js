const axios = require("../config/axios")
const HadarClientApi  = require("./interfaces/hadar-client-api");
const HadarHttpClientUtils = require("../utils/hadar-http-utils")

class HadarHttpClientApi extends HadarClientApi {

    constructor() {
        super(axios);
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
            HadarHttpClientUtils.showResponseErrors(err)
        }
    }
}
module.exports = HadarHttpClientApi;
