import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container } from '@mui/material';
import CrearAlerta from './crearAlerta';

const Alertas_Tabs = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Container maxWidth="xl">
        <TabContext value={value}>
          <Box sx={{
                   alignItems: 'center',
                   display: 'flex',
                   justifyContent: 'space-between',
                   flexWrap: 'wrap',
                   m: -1
          }}>
            <TabList onChange={handleChange} 
            aria-label="lab API tabs example">
              <Tab label="Crear Alertas" 
              value="1" />
              <Tab label="Alertas Generadas" 
              value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><CrearAlerta/></TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Container>
    );
};

export default Alertas_Tabs;