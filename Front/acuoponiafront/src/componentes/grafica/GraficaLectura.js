import React, {useEffect, useState} from "react";
import Chart from 'chart.js/auto';
import * as zoom from 'chartjs-plugin-zoom';
import { Container, Grid, InputLabel, TextField, Select, MenuItem, Button, Slider } from '@material-ui/core';
import { format, options } from "../utiliies/formatDate";
import { obtenerDispositivosRegistrados } from "../../actions/DispositivoAction";
import { useStateValue } from "../../contexto/store";
import { obtenerDataByDispositivo } from "../../actions/LecturaSensorAction";
import Chart2 from "./Char2";
Chart.register(zoom);
const GraficaLectura = () => {
    const [{openPopup}, dispatch] = useStateValue();
    const [dispositivosRegistrados, setDispositivosRegistrados] = useState([]);
    const [cargarGrap, setcargarGrap] = useState(false);
    const [char, setChar] = useState({});
    const [maxRange, setMaxRange] = useState(5);
    const [value, setValue] = React.useState(30);
    const [labelsGraf, setLabelsGraf] = useState([]);
    const [dataGraf, setDataGraf] = useState({});

    const [dispositivo, setdispotivo] = useState({
        idDispositivo : '',
        fechaInicio : '', 
        fechaFinal : '',
        pageCount : 1,
        pageSize : 10000,
        RowCount : 1
    });

    const guardarDispositivosRegistrados = (data) =>{
        setDispositivosRegistrados(data)
    }

    useEffect(()=>{
        obtenerDispositivosRegistrados().then(response => {
            guardarDispositivosRegistrados(response.data)
        }).catch(error=>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }, [])

    const changeSelect = (e)=>{
        const {name, value} = e.target;
        setdispotivo(anterior => ({
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

    const setGrafica = (dataGrafica) =>{
        setLabelsGraf(dataGrafica.lecturas.map((item) =>{return item.fechaLectura}));
    }

    useEffect(()=>{
        if(labelsGraf.length == 0) return;
        setMaxRange(labelsGraf.length);
        let dataFechaOrganizada = dataGraf.lecturas.map((item) => {
            let date = new Date(item.fechaLectura);
            item.fechaLectura = (format(date, 'es', options));
            return item;
        })

        let dataGrafica = dataGraf.lecturas.map((item) =>{return item.temperatura});
        let canva = document.getElementById('graficaprueba').getContext("2d");
        if(char instanceof Chart)
        {
            char.destroy();
        }
        setcargarGrap(true);
        setChar( new Chart(canva,{
            type : 'line',
            data : {
                labels : labelsGraf,
                datasets:[{
                    label: 'graficaPruebaTemperatura',
                    data : dataGrafica,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    scales:{
                        y:{
                            beginAtZero:true
                        }
                    },
                    zoom: {
                      zoom: {
                        wheel: {
                          enabled: true // SET SCROOL ZOOM TO TRUE
                        },
                        drag:{
                            enabled: true
                        },
                        mode: "x",
                        speed: 100
                      },
                      pan: {
                        enabled: true,
                        mode: "x",
                        speed: 100
                      }
                    }
                  }
             }
        }))
    }, [labelsGraf])

    const changeRangeChart = (event, newValue) =>{
        setValue(newValue);
        const rangeLabels = labelsGraf.slice(0, newValue);
        char.config.data.labels = rangeLabels;
        char.update();
    }

    function loadServerRows() {
        obtenerDataByDispositivo(dispositivo).then(result => {
            setDataGraf(result.data)
            setGrafica(result.data)
        }).catch(error =>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }

    const validateForm = () =>{
        if(dispositivo.fechaInicio == '' || dispositivo.fechaFinal == ''){
            ManejoErroresPopup('Se debe seleccionar la fecha final y la fecha inicial', 'Validacion')
            return;
        }
        loadServerRows();
    }

    const resetZoomGrafica = () =>{
        
        char.resetZoom()
    }
    return (
            <Container component="main">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <InputLabel>Fecha Inicial</InputLabel>
                        <TextField type="date" value={dispositivo.fechaInicio}  name="fechaInicio" id="fechainicial" fullWidth onChange={changeSelect}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel>Fecha Final</InputLabel>
                        <TextField type="date" value={dispositivo.fechaFinal}  name="fechaFinal" id="fechafinal" fullWidth onChange={changeSelect}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel>Dispositivo</InputLabel>
                            {dispositivosRegistrados.length > 0 ? 
                                <Select value={dispositivo.idDispositivo} label="Dispositivo" name="idDispositivo" fullWidth onChange={changeSelect}>
                                <MenuItem value="1">
                                    <em>Seleccione un Dispositivo</em>
                                </MenuItem>
                                {dispositivosRegistrados.map((item, index) =>{
                                return <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                })}</Select> : null
                            }
                    </Grid>
                    <Grid item xs={3}>
                        <Button color="primary" variant="outlined" fullWidth onClick={validateForm}>Buscar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <canvas id='graficaprueba' height="110">

                        </canvas>
                    </Grid>
                    {cargarGrap?
                    <div>
                        <Slider aria-label="Range" value={value} onChange={changeRangeChart} min={5} max={maxRange}></Slider>
                        <Button onClick={resetZoomGrafica} variant="outlined">Reset Zoom</Button>
                    </div>
                     : null}
                </Grid>

                
            </Container>
    );
};

export default GraficaLectura;