import { AppBar, Box } from '@material-ui/core';
import React, { useState } from 'react';
import BarNav from './BarNav';
import BarNavGeneral from './BarNavGeneral';
import {useStateValue} from '../../contexto/store';
const AppNavBar = () => {
    const [{sesionUsuario}, dispatch] = useStateValue();
    return (
        <Box marginBottom={4} minWidth="100%" >
            <AppBar position='static'>
                {sesionUsuario? sesionUsuario.usuarioLogeado ? 
                <BarNav>
                </BarNav> : <BarNavGeneral>
                </BarNavGeneral> 
                : <BarNavGeneral></BarNavGeneral>
                }
            </AppBar>
        </Box>

    );
};

export default AppNavBar;