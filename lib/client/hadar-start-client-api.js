"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _hadarhttpclientapi = require('./hadar-http-client-api'); var _hadarhttpclientapi2 = _interopRequireDefault(_hadarhttpclientapi);
var _hadarauthclientapi = require('./hadar-auth-client-api'); var _hadarauthclientapi2 = _interopRequireDefault(_hadarauthclientapi);

class HadarStartClientApi extends _hadarhttpclientapi2.default {

    signKeys(public_key, private_key) {
        this.keysConfig = {
            public_key,
            private_key
        };
        return this;
    }

    settings({ check_service, check_time_limit, remove_on_error }) {
        this.settingsConfig = {
            check_service, 
            check_time_limit, 
            remove_on_error
        }
        return this;
    }

    address({ protocol, ip, port, type }) {
        this.addressConfig = {
            protocol, 
            ip, 
            port, 
            type
        }
        return this;
    }


    async selfRegister() {
        const payload = Object.assign({}, 
            { ...this.keysConfig },
            { settings: this.settingsConfig },
            { address: this.addressConfig }
        );

        const { data } = await this.tryCatchRequest(await this.transporter.post('/service/replicas/register', payload))   
        const { service, replica } = data
        const { access_token, ...rest } = replica;

        return new (0, _hadarauthclientapi2.default)(access_token, service, rest)
    }
}


exports. default = HadarStartClientApi