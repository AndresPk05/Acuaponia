import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { obtenerDispositivosRegistrados } from '../../actions/DispositivoAction';
import { Container, Grid } from '@material-ui/core';
import { useStateValue } from '../../contexto/store';

const VerDispositivos = () => {
    const[{openPopup}, dispatch] = useStateValue();
    const columns = [
        { 
            field: 'id',
             headerName: 'ID',
              width: 400
        },
        {
          field: 'nombre',
          headerName: 'Nombre Dispositivo',
          width: 200,
          editable: false,
        },
        {
          field: 'fechaInscripcion',
          headerName: 'Fecha inscripcion',
          width: 150,
          editable: false,
        }
      ];
    
    const [rows, setRows] = useState({});
    useEffect(()=>{
        obtenerDispositivosRegistrados().then(result => {
            setRows(result.data);
        }).catch(error =>{
            ManejoErroresPopup(error.response.data.errores.mensaje, 'Error')
        })
    }, []);

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

    return (
        <Container component="main" maxWidth="md">
            <Grid container>
            {rows.length > 0 ?
                <Grid item xs ={12}>
                    <DataGrid
                    autoHeight 
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    />
                </Grid>
                :null
            }
            </Grid>
        </Container>
    );
};

export default VerDispositivos;