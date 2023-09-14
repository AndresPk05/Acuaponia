import React from 'react';
import { useEffect } from 'react';
import { obtenerVariablesRegistradas } from 'src/actions/VariableAction';
import { Card, CardContent, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../DataGridNotData'
import Moment from 'moment';

const VariablesRegistradas = () => {
    const columns = [
        { 
            field: 'id_Variable',
            headerName: 'ID',
            width: 400
        },
        {
          field: 'nombre',
          headerName: 'Nombre Variable',
          width: 200,
          editable: false,
        },
        {
          field: 'fecha_Registro',
          headerName: 'Fecha Registro',
          type: 'date',
          width: 150,
          editable: false,
          renderCell: (params) => {
            return Moment(params).format('DD-MM-YYYY');
          }
        }
      ];

      const [rows, setRows] = useState({});
      useEffect(()=>{
        obtenerVariablesRegistradas().then(result => {
              setRows(result.data);
          }).catch(error =>{
          })
      }, []);
    return (
        <>
            <Container component="main" 
            maxWidth="xl">
            <Card>
                <CardContent>
                    <Grid container >
                        {rows.length > 0 ?
                            <Grid item 
                            xs ={12}>
                                <DataGrid
                                getRowId={(row) => row.id_Variable} 
                                autoHeight 
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{
                                    NoRowsOverlay: CustomNoRowsOverlay,
                                  }}
                                />
                            </Grid>
                            :null
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
    );
};

export default VariablesRegistradas;