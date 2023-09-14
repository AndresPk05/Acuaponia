import sesionUsuarioReducer from "./reducerInicioSesion";
import PopUpReducer from "./popupReducer";

export const mainReducer = ({sesionUsuario, openPopup}, action) => {
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
        openPopup: PopUpReducer(openPopup, action)
    }
}