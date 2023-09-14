import HttpCliente from '../servicios/HttpCliente'

export const LoginUsuario = (usuario) =>{
    return new Promise((resolve, eject) =>{
        HttpCliente.post('/Usuario/login', usuario).then(result => {
            resolve(result);
        }).catch(error =>{
            eject(error)
        })
    })
}

export const RegisterUser = (usuario) => {
    return new Promise((resolve, reject) => {
        HttpCliente.post('/Usuario/registrar', usuario).then(result =>{
            resolve(result);
        }).catch( error =>{
            reject(error)
        }
        )
    })
}

export const GetUsuarioActual = () => {
    return new Promise((resolve, reject) => {
        HttpCliente.get('/Usuario/usuariologeado').then(result=>{
            resolve(result);
        }).catch(error=>{
            reject(null);
        })
    }) 
}


export const LogOutUsuarioActual = () => {
    return new Promise((resolve, reject) => {
        HttpCliente.get('/Usuario/logout').then(result=>{
            resolve(result);
        }).catch(error=>{
            reject(null);
        })
    }) 
}