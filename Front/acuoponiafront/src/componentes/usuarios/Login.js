import { Container, Box, Typography, Grid, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { LoginUsuario } from "../../actions/UsuarioAction";
import {useStateValue} from '../../contexto/store';
import {useNavigate } from 'react-router-dom';

const Login = () =>{
    let history = useNavigate ();
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    })
    const [sesionUsuario, dispatch] = useStateValue();

    const ingresarDataUsuario = (e) =>{
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    const loginUsuario = () => {
        LoginUsuario(usuario).then(response => {
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('senUser', true);
            dispatch({
                type: "INICIOSESION"
            });
            history('/Index')
        }).catch(error => {
            console.log(error.response)
        })
    }

    return(
        <Container component="main" maxWidth="xs">
            <Box border={1} fullWidth color="primary.main" padding={6} borderRadius={6}>
                <div style={{textAlign: 'center'}}>
                    <Typography variant="h4" component="h4" margin="normal">
                        Login
                    </Typography>
                    <FaceOutlinedIcon sx={{ fontSize: 60, color:"#001970" }}></FaceOutlinedIcon>
                </div>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField required label="Email" name="email" value={usuario.email} type="email" fullWidth onChange={ingresarDataUsuario}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required label="Password" name="password" value={usuario.password} type="password" fullWidth onChange={ingresarDataUsuario}></TextField>
                    </Grid>
                    <Grid item xs>
                        <Button fullWidth variant="outlined" color="primary" onClick={loginUsuario}>Iniciar Sesion</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Login;