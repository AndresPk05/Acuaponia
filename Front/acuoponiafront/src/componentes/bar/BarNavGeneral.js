import { Toolbar, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const BarNavGeneral = () => {
    
    let navigate = useNavigate();

    const goToRegistrarUser = () =>{
        navigate('/auth/RegistrarUsuario');
    }

    return (
        <Toolbar>
            <Grid container>
                <Grid item xs = {11}>
                    <Typography variant='h6' sx={{ flexGrow: 4 }} align='center'>Acuoponia</Typography>
                </Grid>
                <Grid item xs = {1}>
                    <Button color="inherit"><Typography variant='h6' align='right' onClick={goToRegistrarUser}>Registrarse</Typography></Button>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export default BarNavGeneral;