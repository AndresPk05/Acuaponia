import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { obtenerDispositivosRegistrados } from '../../actions/DispositivoAction';
import { Card, CardContent, Container, Grid } from '@mui/material';
import Moment from 'moment';

const VerDispositivos = () => {
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
          renderCell: (params) => {
            return Moment(params).format('DD-MM-YYYY');
          }
        }
      ];
    
    const [rows, setRows] = useState({});
    useEffect(()=>{
        obtenerDispositivosRegistrados().then(result => {
            setRows(result.data);
        }).catch(error =>{
        })
    }, []);

    return (
        <Container component="main" 
            maxWidth="xl">
            <Card>
                <CardContent>
                    <Grid container>
                        {rows.length > 0 ?
                            <Grid item 
                            xs ={12}>
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
                </CardContent>
            </Card>
        </Container>
    );
};

export default VerDispositivos;