const HadarHttpClientApi =  require('./hadar-http-client-api')
const HadarAuthenticateClientApi = require('./hadar-auth-client-api')

class HadarStartClientApi extends HadarHttpClientApi {

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

        const { data } = await this.tryCatchRequest(await this.transporter.post('/service-replica/register', payload))   
        const { service, replica } = data
        const { access_token, ...rest } = replica;

        return new HadarAuthenticateClientApi(access_token, service, rest)
    }
}


module.exports = HadarStartClientApi