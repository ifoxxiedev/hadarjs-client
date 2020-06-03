require('dotenv').config({
    'path': '.env.dev'
})


const HadarClient = require('../build');

const start = async () => {
    try {


        
        HadarClient
        .signKeys('hadar.s.07c9df8818', '$2a$04$KCFeG5XR8iuNBVyybJKRrONiwiiiZ3MrDELrmx7UldAgTETTn4U92')
        .address({
            protocol: SuportedProtocols.HTTP,
            ip: '127.0.0.1',
            port: '3001'
        })
        .settings({
            check_service: true,
            check_time_limit: 120000,
            remove_on_error: true
        })
        

        const api = await await HadarClient.selfRegister();
        console.log(api)

        await api.info();

        // const replicas = await api.replicas();
        // console.log('REPLICAS', replicas)

        // const data = await api.services();
        // console.log(data)


        setTimeout(() => {
            api.selfUnregister().then(() => {
                console.log("Service has been unregistred!")
                // process.exit(0)

                // api.info().then(() => console.log("GET INFO AFTER UNREGISTER"))
                // .catch(err => console.log('ERROR TO GET INFO AFTER UNREGISTER'))
            })
        }, 5000)

    } catch(err) {
        console.log(err)
        throw err;
    }
}

start();
