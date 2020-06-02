"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('./config/axios'); var _axios2 = _interopRequireDefault(_axios);

class HadarStartClientApi {
    constructor() {
        this._data = {
            keys: { 
                public_key: '', 
                private_key: ''
            },
            node: { 
                ip: '', 
                protocol: '', 
                port: '', 
                type: ''
            },
            settings: {
                check_service: true,
                check_time_limit: 60 * 1000 * 5,
                remove_on_error: false
            },
        };
    }

    signKeys(public_key, private_key) {
        this._data.keys = {
            public_key,
            private_key
        };

        return this;
    }

    settings({ check_service, check_time_limit, remove_on_error }) {
        this._data.settings = {
            check_service, 
            check_time_limit, 
            remove_on_error
        }
        return this;
    }

    address({ protocol, ip, port, type }) {
        this._data.node = {
            protocol, 
            ip, 
            port, 
            type
        }
        return this;
    }

    _assignData({ node, ...rest}) {
        return {
            ...this._data,
            ...rest,
            node: Object.assign({}, this._data.node, node)
        }
    }

    _adpteMethods(payload) {
        HadarStartClientApi.prototype.unregister = function() {
            return this._reponseRequest(
                _axios2.default.post('/service/replicas/unregister')
            )
        }

        HadarStartClientApi.prototype.services = function(type='api', status='up') {
            return this._reponseRequest(
                _axios2.default.post(`/service?type=${type}&status=${status}`, {
                    keys: payload.keys
                })
            )
        } 
    }


    _configureInterceptor({ node }) {
        _axios2.default.interceptors.request.use(config => {
            const { access_token } = node
            if (access_token) config.headers = { 
                'X_ACCESS_TOKEN': access_token 
            }
            return config;
        });
    }


    _reponseRequest(prom) {
        return prom
        .then(response => response.data || response )
        .catch(err => {
            if (err.response && err.response.data) {
                throw new Error(err.response.data.errors.map(err => err.message).join(','))
            }
            throw err;
        });
    }

    async register() {
        const { keys, settings, node } = this._data;

        const payload = {
            keys,
            settings,
            address: node
        }

        const prom = _axios2.default.post('/service/replicas/register', payload)
        .then(({ data }) => this._assignData(data))
        .then(newData => {
            this._configureInterceptor(newData)
            this._adpteMethods(payload)
            
            return {
                info: () => this._reponseRequest(_axios2.default.get('/service/replicas/info')),
                replicas: () => this._reponseRequest(_axios2.default.get('/service/replicas/replicas')),
                down: (error) => this._reponseRequest(_axios2.default.patch('/service/replicas/down', { error })),
                up: () => this._reponseRequest(_axios2.default.patch('/service/replicas/up').then(response.data))
            }
        })

        return this._reponseRequest(prom)
    }

    unregister() {
        throw new Error("Register service first!")
    }


    services() {
        throw new Error("Register service first")
    }
}


exports. default = new HadarStartClientApi()