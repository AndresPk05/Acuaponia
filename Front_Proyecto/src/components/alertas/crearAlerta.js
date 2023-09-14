import { Container, Grid, TextField, Select, MenuItem, IconButton, Card, CardContent, Button, Typography } from '@mui/material';
import React, {useEffect, useState} from "react";
import { obtenerVariablesRegistradas } from 'src/actions/VariableAction';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registrarAlerta} from '../../actions/AlertaAction'

const CrearAlerta = () => {
    const notify = (mensaje, type) => toast(mensaje, {
        type,
        theme:"dark"
      });

    const [variablesRegistradas, setVariablesRegistradas] = useState([]);
    let Contador=1;
    let idSelect = "";
    let idCondicion = "";
    let idValorCondicion = "";
    const GuardarVariablesRegistradas = (data) =>{
        setVariablesRegistradas(data);
    }
    useEffect(()=>{
        obtenerVariablesRegistradas().then(response => {
            GuardarVariablesRegistradas(response.data)
        }).catch(error=>{
           
        })
    }, [])

    const condicionalesValidos = [
        {condicionText:"IGUAL",condicionSimbolo: "="},
        {condicionText:"MAYOR",condicionSimbolo: ">"},
        {condicionText:"MAYORIGUAL",condicionSimbolo: ">="},
        {condicionText:"MENOR",condicionSimbolo: "<"},
        {condicionText:"MENORIGUAL",condicionSimbolo: "<="}
    ];
    const variablesConfiguracion = [];

    const changeSelect = (e)=>{
        const {name, value} = e.target;
        variablesConfiguracion.push(value);
    }

    const CrearNuevaFilaConfigurarAlerta = () =>{
        Contador++;
        idSelect = `SelectVariable${Contador}`;
        idCondicion = `ValorLumbral${Contador}`;
        idValorCondicion = `ValorCondicion${Contador}`;
        let IdNewDiv = `Fila${Contador}`;
        let divPrincipal = document.getElementById('DetallesAlertas');
        divPrincipal.insertAdjacentHTML("beforeend", `<div id='${IdNewDiv}'></div>`)
        ReactDOM.render(
            templateHtml,
            document.getElementById(`${IdNewDiv}`)
          );
    }

    let alertaGuardar = {};
    let configuracionAlerta = [];

    const ObtenerDataForm = () =>{

        for (let index = 1; index <= Contador; index++) {
            let idSelect = `SelectVariable${index}`;
            let idCondicion = `ValorLumbral${index}`;
            let idValorCondicion = `ValorCondicion${index}`;

            let elementSelect = document.getElementById(idSelect);
            let elementCondicion = document.getElementById(idCondicion);
            let elementValorCondicion = document.getElementById(idValorCondicion);
            let filaConfiguracion = {
                Variable: elementSelect.innerText.trim(),
                Condicion: elementCondicion.innerText.trim(),
                ValorCondicion: parseFloat(elementValorCondicion.value.trim())
            };

            let mensajeValidacion = ValidarData(filaConfiguracion);
            if(mensajeValidacion.length > 1){
                notify(mensajeValidacion, 'error')
                configuracionAlerta = []
                return;
            }
            
            configuracionAlerta.push(filaConfiguracion);
        }

        GuardarAlertaBackend();
    }

    const ValidarData = (filaData) =>{
        
        if(filaData.Variable.length == 1){
            return 'De seleccionar una variable de la lista';
        }

        if(filaData.Condicion.length == 1){
            return 'De seleccionar una condicion de la lista';
        }

        if(filaData.ValorCondicion == 0){
            return 'Generar indicar un valor para la fila';
        }
            
        return '';
    }

    const LimpiarDatosFormulario = () =>{
        let nombreAlerta = document.getElementById('NombreAlerta');
        nombreAlerta.value = '';

        let elementSelect = document.getElementById(idSelect);
        let elementCondicion = document.getElementById(idCondicion);
        let elementValorCondicion = document.getElementById(idValorCondicion);

        elementSelect.innerText = '';
        elementCondicion.innerText = '';
        elementValorCondicion.value = '';
    }

    const GuardarAlertaBackend = () =>{
        let nombreAlerta = document.getElementById('NombreAlerta');
        alertaGuardar.Nombre = nombreAlerta.value.trim();
        let correoAlert = document.getElementById('EmailNotificacion');
        alertaGuardar.EmailNotificacion = correoAlert.value.trim();
        alertaGuardar.configuraciones = configuracionAlerta;
        console.dir(alertaGuardar);
        registrarAlerta(alertaGuardar).then(response =>{
            notify("Alerta creada", 'success');
            alertaGuardar = {};
            configuracionAlerta = [];
            LimpiarDatosFormulario();
        }).catch(error =>{
            alertaGuardar = {};
            configuracionAlerta = [];
            if(typeof(error.response.data.errores) != undefined){
                notify(error.response.data.errores.Errores, 'error');
                return;
            }
            notify('Se ha presentado un error a guardar la alerta intente mas tarde', 'error');     
        })
    }

    const GuardarAlerta = () =>{
        ObtenerDataForm();
    }

    const templateHtml = (
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={5}>
          <Select
            id={idSelect}
            label="Variable"
            name="id_Variable"
            fullWidth
            onChange={changeSelect}
          >
            <MenuItem value="1">
              <em>Seleccione Variable</em>
            </MenuItem>
            {variablesRegistradas.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id_Variable}>
                  {item.nombre}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select label="Condicion" name="id_Condicion" onChange={changeSelect} id={idCondicion} fullWidth>
            <MenuItem value="1">
              <em>Seleccione Condicion</em>
            </MenuItem>
            {condicionalesValidos.map((item, index) => {
              return (
                <MenuItem key={index} value={item.condicionSimbolo}>
                  {item.condicionText}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField type="number" label="Valor Condicion" id={idValorCondicion} fullWidth></TextField>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={CrearNuevaFilaConfigurarAlerta}>
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    );

    return (
        <>
        <Container  maxWidth="xl">
            <ToastContainer 
            position="bottom-center"
            autoClose={5000}
            />
            <Card>
                <CardContent>
                    <Typography>Nombre Alerta</Typography>
                    <TextField
                    label="Nombre Alerta"
                    fullWidth 
                    variant="outlined" 
                    margin="normal"
                    id='NombreAlerta'
                    >
                    </TextField>
                    <Typography>Correo Alerta</Typography>
                    <TextField
                    label="Correo Alerta"
                    fullWidth 
                    variant="outlined" 
                    margin="normal"
                    id='EmailNotificacion'
                    >
                    </TextField>
                    <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'space-between' }}>
                        <Grid item xs={5}>
                            <Typography
                            align="left">Variable</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                            align="left">Condicion</Typography>
                        </Grid>
                        <Grid item xs={4} alignItems>
                            <Typography
                            align="left">Valor Condicion</Typography>
                        </Grid>
                    </Grid>
                    <div id='DetallesAlertas'>
                        <Grid
                            container
                            spacing={2}
                            sx={{ justifyContent: 'space-between' }}>
                            <>
                            <Grid item
                                xs={5}>
                                {variablesRegistradas.length > 0 ? 
                                    <Select id={`SelectVariable${Contador}`} label="Variable" name="id_Variable" onChange={changeSelect} fullWidth>
                                    <MenuItem value="1">
                                        <em>Seleccione Variable</em>
                                    </MenuItem>
                                    {variablesRegistradas.map((item, index) =>{
                                    return <MenuItem key={index} value={item.id_Variable}>{item.nombre}</MenuItem>
                                    })}</Select> : null
                                }
                            </Grid>
                            <Grid item
                                xs={3}>
                                    <Select label="Condicion" name="id_Condicion" id={`ValorLumbral${Contador}`}  onChange={changeSelect} fullWidth>
                                    <MenuItem value="1">
                                        <em>Seleccione Condicion</em>
                                    </MenuItem>
                                    {condicionalesValidos.map((item, index) =>{
                                    return <MenuItem key={index} value={item.condicionSimbolo}>{item.condicionText}</MenuItem>
                                    })}</Select> 
                            </Grid>
                            <Grid item
                                xs={3}>
                            <TextField type="number"
                            label="Valor Condicion"
                            id='ValorCondicion1'
                            fullWidth
                            >
                            </TextField>
                            </Grid>
                            <Grid item
                                xs={1}>
                            <IconButton onClick={CrearNuevaFilaConfigurarAlerta}>
                                <AddCircleOutlineRoundedIcon fontSize='large'/>
                            </IconButton>
                            </Grid>
                            </>
                        </Grid>
                    </div>
                    <div style={{
                        margin:"20px 0 0 0"
                    }}>
                        <Grid container>
                            <Grid item>
                                <Button
                                    color = "primary" 
                                    variant="contained"
                                    onClick={GuardarAlerta} 
                                >
                                    Crear Alerta
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div id='popUpControl'></div>
                </CardContent>
            </Card>
        </Container>
        </>
    );
};

export default CrearAlerta;