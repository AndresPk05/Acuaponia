import HttpCliente from '../servicios/HttpCliente'

export const obtenerDataByDispositivo = (dispositivo) =>{
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Lectura/getByDispostivo', dispositivo).then(result=>{
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}