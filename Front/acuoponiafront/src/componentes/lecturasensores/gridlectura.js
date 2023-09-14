import { Button, Container, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { obtenerDispositivosRegistrados } from "../../actions/DispositivoAction";
import { obtenerDataByDispositivo } from "../../actions/LecturaSensorAction";
import { useStateValue } from "../../contexto/store";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'id',
         headerName: 'ID',
          width: 300
    },
    {
      field: 'fechaLectura',
      headerName: 'Fecha Lectura',
      width: 200,
      editable: false,
    },
    {
      field: 'temperatura',
      headerName: 'Temperatura',
      width: 120,
      editable: false,
    },
    {
        field: 'luminosidad',
        headerName: 'Luminosidad',
        width: 120,
        editable: false,
    },
    {
        field: 'ph',
        headerName: 'Ph',
        width: 50,
        editable: false,
    },
    {
        field: 'humedadSuelo',
        headerName: 'Humedad Suelo',
        width: 140,
        editable: false,
    },
    {
        field: 'temperaturaAgua',
        headerName: 'Temperatura Agua',
        width: 150,
        editable: false,
    }
  ];

const GridLecturaSensores = () =>{
    const[{openPopup}, dispatch] = useStateValue();
    const [page, setPage] = React.useState(0);
    const [countRow, setCountRow] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const prevSelectionModel = React.useRef(selectionModel);
    const [dispositivo, setdispotivo] = useState({
        idDispositivo : '',
        fechaInicio : '', 
        fechaFinal : '',
        pageCount : 1,
        pageSize : 50,
        RowCount : 1
    });
    const [dispositivosRegistrados, setDispositivosRegistrados] = useState([]);

    const guardarDispositivosRegistrados = (data) =>{
        setDispositivosRegistrados(data)
    }

    const changeSelect = (e)=>{
        const {name, value} = e.target;
        setdispotivo(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    useEffect(()=>{
        obtenerDispositivosRegistrados().then(response => {
            guardarDispositivosRegistrados(response.data)
        }).catch(error=>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }, [])

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
    const validateForm = () =>{
        if(dispositivo.fechaInicio == '' || dispositivo.fechaFinal == ''){
            ManejoErroresPopup('Se debe seleccionar la fecha final y la fecha inicial', 'Validacion')
            return;
        }
        loadServerRows();
    }

    function loadServerRows() {
        obtenerDataByDispositivo(dispositivo).then(result => {
            console.log(result.data);
            setRows(result.data.lecturas);
            setCountRow(result.data.rowCount);
        }).catch(error =>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }

    const changePage = (page) => {
        console.log('PruebaData');
        console.log(page)
        setdispotivo(anterior => ({
            ...anterior,
            ['pageCount'] : page + 1
        }));
    }

    React.useEffect(() => {
        let active = true;
        
        (async () => {
          setLoading(true);
          const newRows = await loadServerRows();
    
          if (!active) {
            return;
          }
          
          setRows(newRows);
          setLoading(false);
          setSelectionModel(prevSelectionModel.current);
        })();
    
        return () => {
          active = false;
        };
      }, [page]);

    return(
        
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
                {rows?
                          <DataGrid
                          rows={rows}
                          columns={columns}
                          pagination
                          checkboxSelection
                          pageSize={dispositivo.pageSize}
                          rowCount={countRow}
                          rowsPerPageOptions={[dispositivo.pageSize]}
                          paginationMode="server"
                          onPageChange={(newPage) => {
                            prevSelectionModel.current = selectionModel;
                            changePage(newPage);
                            setPage(newPage);
                          }}
                          onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                          }}
                          selectionModel={selectionModel}
                          loading={loading}
                          autoHeight
                          autoPageSize
                        /> : null
                }
                </Grid>
               
            </Grid>
        </Container>
    );
};

export default GridLecturaSensores;