import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/theme';
import RegistrarDispositivo from './componentes/dispostivos/RegistrarDispositivo';
import RegistrarUsuario from './componentes/usuarios/RegistrarUsuario';
import Login from './componentes/usuarios/Login';
import GridLecturaSensores from './componentes/lecturasensores/gridlectura';
import { Grid } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AppNavBar from './componentes/bar/AppNavBar';
import VerDispositivos from './componentes/dispostivos/VerDispositivos';
import Index from './componentes';
import {useStateValue} from './contexto/store';
import PopUp from "./componentes/utiliies/PopUp";
import GraficaLectura from './componentes/grafica/GraficaLectura';

function App() {
  const[{sesionUsuario,openPopup}, dispatch] = useStateValue();

  return (
    <Router>
      <Grid container>
          <ThemeProvider theme={theme}>
            {!sesionUsuario ? 
                    window.localStorage.getItem("senUser") ?  
                    dispatch({
                      type: "INICIOSESION"
                    }) : null : null
            }
            {openPopup ? openPopup.popup.open ? <PopUp param={{
                open : true,
                textoTitulo : openPopup.popup.mensajeTitulo,
                textoMostrar : openPopup.popup.mensaje
                }}></PopUp> : null : null
            }
            <AppNavBar></AppNavBar>
            <Routes>
              <Route path="/auth/login" element={<Login/>}/>
              <Route path="/auth/RegistrarUsuario" element={<RegistrarUsuario/>}/>
              <Route path="/Dispositivo/Registrar" element={<RegistrarDispositivo/>}/>
              <Route path="/Lectura/Lecturas" element={<GridLecturaSensores/>}/>
              <Route path="/" element={<Login/>}/>
              <Route path="/Dispositivo/Ver" element={<VerDispositivos/>}></Route>
              <Route path="/Index" element={<Index></Index>}></Route>
              <Route path="/Lectura/Graficas" element={<GraficaLectura></GraficaLectura>}></Route>
            </Routes>
          </ThemeProvider>
      </Grid>
    </Router>

  );
}

export default App;
