export const initialState = {
    popup : {
        open:false,
        mensajeTitulo:'',
        mensaje:''
    }
}

const PopUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Open":        
            return{
                ...state,
                popup : action.popup
            };
        case "Close":
            return{
                ...state,
                popup : action.popup
            }
        default:
            return{
                ...state                
            }
    }
}

export default PopUpReducer;