const axios = require("axios");
const baseURL = process.env.DISCOVERY_REGISTER_URL;

axios.interceptors.request.use(function(config ) {
    config.baseURL = `${baseURL}/v1/`;
    return config;
});

module.exports = axios;