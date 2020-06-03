const { SuportedReplicaTypes, SuportedServices } = require('../support/types')
const HadarHttpClientApi = require('./hadar-http-client-api');

class HadarAuthenticateClientApi extends HadarHttpClientApi {

    constructor(access_token, serviceData, replicaData) {
        super();

        this.auth = true

        this.serviceData = serviceData;
        this.replicaData = replicaData

        this.init(access_token)
        // Object.setPrototypeOf(this, HadarAuthenticateClientApi.prototype)
    }

    init(access_token) {
        this.applyTransportInterceptors((config) => {
            if (access_token) {
                config.headers['x_access_token'] = access_token
            }

            return config;
        })
    }

    async up() {
        const { status } = await this.tryCatchRequest(this.transporter.post('/service-replica/up'))
        return status;
    }

    async down() {
        const { status } = await this.tryCatchRequest(this.transporter.post('/service-replica/down'))
        return status;
    }

    async info() {
        const { data } = await this.tryCatchRequest(this.transporter.get('/service-replica/info'))
        return data;
    }
    
    async services() {
        if (this.serviceData.type !== SuportedServices.GATEWAY) {
            throw new Error("You cannot access replicas because you not are gateway node!");
        }

        const  { data } = (await this.tryCatchRequest(this.transporter.get('/service-replica/services')))
        return data;
    }

    async replicas() {
        if (this.replicaData.type !== SuportedReplicaTypes.PRINCIPAL_NODE) {
            throw new Error("You cannot access replicas because you are replica of principal!");
        }

        const  { data } = (await this.tryCatchRequest(this.transporter.get('/service-replica')))
        return data;
    }

    
    async selfUnregister() {
        // if (!this.registred) throw new Error("You not registred, call 'selfRegister' first!")
        await this.tryCatchRequest(this.transporter.post('/service-replica/unregister'))
        this.auth = false;
    }
}


// Aplicar um Proxy,
// Verificar se this.auth = true, senão lança uma exeception

module.exports = HadarAuthenticateClientApi