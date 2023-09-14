import { Button, Collapse, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import {useStateValue} from '../../contexto/store';

const BarNav = () => {
    let history = useNavigate ();
    const[openDrawer, setOpenDrawer] = useState(false);
    const[openListaMenu, setopenListaMenu] = useState(false);
    const[indexMenu, setIndexMenu] = useState(0);
    const itemsMenu = ['Dispositivos', 'Lecturas'];
    const routesMenu = ['Dispositivo', 'Lectura'];
    const routesDispositivos = ['Ver', 'Registrar'];
    const routesLectaras = ['Lecturas'];
    const routesDisponibles = [routesDispositivos, routesLectaras];
    const itemsDispositivos = ['Ver Dispositivos', 'Registrar Dispositivo'];
    const itemsLectura = ['Grid Data Sensores', 'Grafica Data Sensores'];
    const opcionesItems = [itemsDispositivos, itemsLectura];
    const [sesionUsuario, dispatch] = useStateValue();

    const obtenerIndex = (e) =>{
        setIndexMenu(e)
    }

    const openMenuDesplegable =  (e) =>{
        obtenerIndex(e);
        setopenListaMenu(!openListaMenu);
    }

    const cerrarMenu = () =>{
        setOpenDrawer(false);
    }

    const openMenu =  () =>{
        setOpenDrawer(true);
    }

    const cerrarSesion = () => {
        window.localStorage.clear();
        dispatch({
            type: "CERRARSESION"
        });
        history('/auth/Login');
    }
    return (
        <React.Fragment>
            <Drawer 
                open={openDrawer}
                onClose={cerrarMenu}>
                    <List>
                        {itemsMenu.map((item, index)=>(
                        <ListItem button key={index} onClick={openMenuDesplegable.bind(this, index)}>
                            <ListItemIcon>
                                <DataSaverOffOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item}></ListItemText>
                            <ExpandMore />
                            <Collapse in={openListaMenu && indexMenu == index} key={index} timeout="auto" unmountOnExit>
                            <List>
                                {opcionesItems[indexMenu].map((item, index)=>(
                                <ListItem button key={index} component={Link} 
                                    to={"/" + routesMenu[indexMenu] + "/" + routesDisponibles[indexMenu][index]}
                                    onClick={cerrarMenu}>
                                    <ListItemIcon>
                                        <DataSaverOffOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={item}></ListItemText>
                                </ListItem>                    
                                ))}
                            </List>
                            </Collapse>
                        </ListItem>
                        ))}

                    </List>
            </Drawer>
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton 
                        edge="start" 
                        aria-label="menu"
                        sx={{ mr: 2, color:"#FFFFFF"}}
                        onClick={openMenu}>
                        <MenuIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='h6' sx={{ flexGrow: 4 }} align='center'>Acuoponia</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button color="inherit"><Typography variant='h6' align='right' onClick={cerrarSesion}>Salir</Typography></Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </React.Fragment>

    );
};

export default BarNav;