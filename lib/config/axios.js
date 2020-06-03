const axios = require("axios");

axios.interceptors.request.use(function(config ) {
    config.baseURL = process.env.DISCOVERY_REGISTER_URL || 'http://client-api:7070/api/v1/';
    return config;
});

module.exports = axios;