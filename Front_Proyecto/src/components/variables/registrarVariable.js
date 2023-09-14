import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
  Box,
  Card,
  Button,
  Typography,
  TextField,
  Container,
  Popover
} from '@mui/material';
import {registrarVariableBack} from '../../actions/VariableAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarVariable = ({ customers, ...rest }) => {
    const notify = (mensaje, type) => toast(mensaje, {
        type,
        theme:"dark"
      });

    
    const [senVarRegister, setSenVarRegister] = useState(false);
    const [variableRegistrar, setDataVariable] = useState({
        NombreVarible:'',
        MaximoValor: 0
    });
    const [dataResult, setdataResult] = useState({});
  
    const ingresarDataVariale = (e) =>{
        const {name, value} = e.target;
        setDataVariable(anterior => ({
            ...anterior,
            [name] : value
        }));
    }
  
    const VariableRegistrada = () =>{
        setSenVarRegister(true);
    }
    
    const registrarVariableForm = e => {
        if(variableRegistrar.NombreVarible == ''){
            notify('El nombre de la variable no puede estar vacio', 'error');
            return;
        }
        registrarVariableBack(variableRegistrar).then(response =>{
            setdataResult(response.data);
            VariableRegistrada();
            notify("Variable registrada", 'success');
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
                <Grid 
                    container 
                    spacing={2}>
                        <Grid
                        item
                        xs={9}>
                            <Typography alignContent="left">Nombre Variable</Typography>
                        </Grid>
                        <Grid
                        item
                        xs={3}>
                            <Typography alignContent="left">Valor Maximo</Typography>
                        </Grid>
                        <Grid 
                        item 
                        xs={9}
                        >
                            <TextField 
                            label="Nombre Variable" 
                            value={variableRegistrar.NombreVarible} 
                            onChange={ingresarDataVariale} 
                            name="NombreVarible" 
                            fullWidth 
                            variant="outlined" 
                            margin="normal"></TextField>
                        </Grid>
                        <Grid
                        item 
                        xs={3}
                        >
                            <TextField 
                            label="Valor Maximo" 
                            value={variableRegistrar.MaximoValor} 
                            onChange={ingresarDataVariale} 
                            name="MaximoValor" 
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
                            onClick={registrarVariableForm}>Guardar Variable</Button>
                        </Grid>
                        {(senVarRegister) ?
                            <Grid item 
                            xs>
                                <Typography>Nombre Variable creada: {dataResult.nombre}</Typography>
                                <Typography>Id Variable creada: {dataResult.id_Variable}</Typography>
                            </Grid> : null
                        }
                </Grid>
              </Container>
          </Box>
        </PerfectScrollbar>
      </Card>
    );
};

export default RegistrarVariable;