export const initialState = {
    usuarioSesion:{
        usuarioLogeado: false
    }
};

const sesionUsuarioReducer = (state = initialState, action) =>{
    switch(action.type){
        case "INICIOSESION":
            return{
                ...state, 
                usuarioLogeado : true
            };
        case "CERRARSESION":
            return{
                ...state,
                usuarioLogeado : false
            };
        default:
            return{
                ...state                
            };
    }
}

export default sesionUsuarioReducer;