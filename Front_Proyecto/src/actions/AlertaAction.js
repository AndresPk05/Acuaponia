import HttpCliente from '../servicios/HttpCliente'

export const registrarAlerta = alerta => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Alerta/Create', alerta).then(result => {
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}