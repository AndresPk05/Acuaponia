import HttpCliente from '../servicios/HttpCliente'

export const registrarVariableBack = variable => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Variable/Crear', variable).then(result => {
            resolve(result);
        }).catch(error =>{
            eject(error);
        })
    })
}

export const obtenerVariablesRegistradas = () =>{
    return new Promise((resolve, eject) =>{
        HttpCliente.get('/Variable').then(result =>{
            resolve(result);
        }).catch(error => {
            eject(error)
        })
    })
}

export const getVariableByName = (name) =>{
    return new Promise((resolve, eject) =>{
        HttpCliente.get('/Variable/VariableName/' + name).then(result =>{
            resolve(result);
        }).catch(error => {
            eject(error)
        })
    })
}

export const GetVariableById = (idvariable) =>{
    return new Promise((resolve, eject) =>{
        HttpCliente.get('/Variable/GetVariableById/' + idvariable).then(result =>{
            resolve(result);
        }).catch(error => {
            eject(error)
        })
    })
}

