import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
  Box,
  Card,
  Button,
  Typography,
  TextField,
  Container
} from '@mui/material';

import {registrarDispositivo} from '../../actions/DispositivoAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomerListResults = ({ customers, ...rest }) => {
  const notify = (mensaje, type) => toast(mensaje, {
    type,
    theme:"dark"
  });
  const [senDisRegister, setSenDisRegister] = useState(false);
  const [dispositivoRegistrar, setDataDispositivo] = useState({
      Nombre:''
  });
  const [dataResult, setdataResult] = useState({});

  const ingresarDataDispositivo = (e) =>{
      const {name, value} = e.target;
      setDataDispositivo(anterior => ({
          ...anterior,
          [name] : value
      }));
  }

  const DispositivoRegistrado = () =>{
      setSenDisRegister(true);
  }

  const registrarDispositivoForm = e => {
      if(dispositivoRegistrar.Nombre == ''){
          notify('El nombre del dispositivo no puede estar vacio', 'error');
          return;
      }
      
      registrarDispositivo(dispositivoRegistrar).then(response =>{
          debugger
          setdataResult(response.data);
          DispositivoRegistrado();
          notify("Equipo registrado", 'success');
          
      }).catch(error =>{
        notify(error.response.data.errores.Errores, 'error');
      })
  }

  return (
    <Card {...rest}>
      <ToastContainer 
      position="bottom-center"
      autoClose={5000}
      />
      <PerfectScrollbar>
        <Box 
          component="main"
          sx={{
          flexGrow: 1,
          py: 8
          }}>
            <Container maxWidth="xl">
              <Typography>Nombre Dispositivo:</Typography>
              <Grid 
                  container 
                  spacing={2}>
                      <Grid 
                      item 
                      xs={12}
                      >
                          <TextField 
                          label="Nombre Dispositivo" 
                          value={dispositivoRegistrar.Nombre} 
                          onChange={ingresarDataDispositivo} 
                          name="Nombre" 
                          fullWidth 
                          variant="outlined" 
                          margin="normal"></TextField>
                      </Grid>
                      <Grid 
                      item 
                      xs={12}
                      >
                          <Button 
                          color = "primary" 
                          variant="contained" 
                          onClick={registrarDispositivoForm}>Guardar Dispotivo</Button>
                      </Grid>
                      {(senDisRegister) ?
                          <Grid item 
                          xs>
                              <Typography>Nombre Dispositivo creado: {dataResult.nombre}</Typography>
                              <Typography>Id Dispositivo creado: {dataResult.idDispositivo}</Typography>
                              <Typography style={{ wordWrap: "break-word" }} >Token Dispositivo creado: {dataResult.token}</Typography>
                          </Grid> : null
                      }
              </Grid>
            </Container>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

