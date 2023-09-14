import { Button, Container, Grid, TextField, Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { RegisterUser } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const RegistrarUsuario = () => {
    const[{openPopup}, dispatch] = useStateValue();
    const [usuarioRegister, setusuarioRegister] = useState({
        nombre:'',
        apellido:'',
        password:'',
        email:'', 
        nombreCompleto : ''
    })

    const changeDataUser = (e) => {
        const {name, value} = e.target;
        setusuarioRegister(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    const ValidateForm = () => {
        // Se valida que los parametros del se llenen
        if(usuarioRegister.nombre === '' ||
         usuarioRegister.apellido === '' ||
         usuarioRegister.email === '' ||
         usuarioRegister.password === '' ){

            ManejoErroresPopup("Se debe diligenciar todos los parametros del formulario");
            return;
         }
         //Se valida que la contraseña tenga una longitud superior a 8 caracteres
         if(usuarioRegister.password.length < 8){
            ManejoErroresPopup("La contraseña debe tener una longitud mayor o igual a 8 caracteres");
            return;
         }
         //Se valida que la contraseña tenga una minuscula y mayuscula
         if (!usuarioRegister.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
            ManejoErroresPopup("La contraseña debe tener una letra minuscula y una letra mayuscula");
            return;
         }
         if (!usuarioRegister.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){
            ManejoErroresPopup("La contraseña debe tener un caracter especial");
            return;
         }
         registrarUsuario();
    }

    const ManejoErroresPopup = (mensajeError) =>{
        dispatch({
            type: "Open",
            popup : {
                open : true,
                mensajeTitulo : 'Error',
                mensaje : mensajeError
            }
        })       
    }

    const registrarUsuario = () =>{
        RegisterUser(usuarioRegister).then(result=>{
            dispatch({
                type: "Open",
                popup : {
                    open : true,
                    mensajeTitulo : 'Resultado',
                    mensaje : "Usuario Registrado Correctamente"
                }
            })
        }).catch( obj =>{
            ManejoErroresPopup(obj.response.data.errores.mensaje)
        }
        )
    }

    return(
        <Container maxWidth="md" component="main">
            <Box sx={{borderColor:"primary", textAlign: 'center'}} margin="normal">
                
                <Typography variant="h4" component="h4">
                        Registrar Usuario
                </Typography>
                <AccountCircleOutlinedIcon sx={{ fontSize: 60, color:"#001970" }}></AccountCircleOutlinedIcon>
            </Box>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={6} md={6}>
                    <TextField required label="Nombres" value={usuarioRegister.nombre} name='nombre' fullWidth variant="outlined" onChange={changeDataUser}/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField required label ="Apellidos" value={usuarioRegister.apellido} name='apellido' fullWidth variant="outlined" onChange={changeDataUser}/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField required label="Email" value={usuarioRegister.email} name="email" type="email" fullWidth variant="outlined" onChange={changeDataUser}/>
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField required label ="Password" type="password" value={usuarioRegister.password} name="password" fullWidth variant="outlined" onChange={changeDataUser}/>
                </Grid>
                <Grid item xs md >
                    <Button color = "primary" variant="outlined" onClick={ValidateForm}>Registrar Usuario</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegistrarUsuario;