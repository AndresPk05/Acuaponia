import HttpCliente from '../servicios/HttpCliente'

export const registrarDispositivo = dispositivo => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Dispositivo/Crear', dispositivo).then(result => {
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}

export const obtenerDispositivosRegistrados = () =>{
    return new Promise((resolve, eject) =>{
        HttpCliente.get('/Dispositivo').then(result =>{
            resolve(result);
        }).catch(error => {
            eject(error)
        })
    })
}

