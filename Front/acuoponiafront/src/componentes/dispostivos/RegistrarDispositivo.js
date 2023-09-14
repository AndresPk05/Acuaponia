import { Box, Button, Container, Grid, TextField,  Typography} from "@material-ui/core";
import React, { useState } from "react";
import {registrarDispositivo} from '../../actions/DispositivoAction'
import PopUp from "../utiliies/PopUp";
import { useStateValue } from "../../contexto/store";

const RegistrarDispositivo = () =>{
    const [senDisRegister, setSenDisRegister] = useState(false);
    const [dispositivoRegistrar, setDataDispositivo] = useState({
        Nombre:''
    });
    const[{openPopup}, dispatch] = useStateValue();
    const [dataResult, setdataResult] = useState({});

    const ingresarDataDispositivo = (e) =>{
        const {name, value} = e.target;
        setDataDispositivo(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    const ManejoErroresPopup = (mensajeError, titulo) =>{
        dispatch({
            type: "Open",
            popup : {
                open : true,
                mensajeTitulo : titulo,
                mensaje : mensajeError
            }
        })       
    }

    const DispositivoRegistrado = () =>{
        setSenDisRegister(true);
    }

    const registrarDispositivoForm = e => {
        registrarDispositivo(dispositivoRegistrar).then(response =>{
            setdataResult(response.data);
            DispositivoRegistrado();
            ManejoErroresPopup('Equipo Regitrado Correctamente', 'Resultado')
        }).catch(error =>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }
    

    return(
        
        <Container component="main" maxWidth="md">
        <Box border={1} fullWidth color="primary.main" padding={6} borderRadius={6}>
            <React.Fragment>
                <Box sx={{borderColor:"primary", textAlign: 'center'}}>
                <Typography variant="h4" component="h4">
                        Registrar Dispositivo
                </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Nombre Dispositivo" value={dispositivoRegistrar.Nombre} onChange={ingresarDataDispositivo} name="Nombre" fullWidth variant="outlined" margin="normal"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color = "primary" variant="contained" onClick={registrarDispositivoForm}>Guardar Dispotivo</Button>
                    </Grid>
                    {(senDisRegister) ?
                        <Grid item xs>
                            <Typography>Nombre Dispositivo creado: {dataResult.nombre}</Typography>
                            <Typography>Id Dispositivo creado: {dataResult.idDispositivo}</Typography>
                            <Typography style={{ wordWrap: "break-word" }} >Token Dispositivo creado: {dataResult.token}</Typography>
                        </Grid> : null
                    }
                </Grid>
            </React.Fragment>
        </Box>
        </Container>
    );
}

export default RegistrarDispositivo;