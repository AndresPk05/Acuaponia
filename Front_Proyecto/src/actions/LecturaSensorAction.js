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

export const GetLecturasByDispostivoFechaVariable = (dispositivo) =>{
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Lectura/GetLecturasByDispostivoFechaVariable', dispositivo).then(result=>{
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}

export const GetMaximoValorByVariableDispostivo = (request) =>{
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Lectura/getMaximoValor', request).then(result=>{
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}

export const GetIdVariablesByDispositivo = (idDispositivo) =>{
    return new Promise((resolve, eject) => {
        HttpCliente.get('/Lectura/GetIdVariablesByDispositivo/' + idDispositivo).then(result=>{
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}