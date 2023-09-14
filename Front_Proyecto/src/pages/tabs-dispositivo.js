import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Customers from './dispositivos';
import Head from 'next/head';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { Container } from '@mui/material';
import VerDispositivos from 'src/components/dispositivos/dispositivosregistrados';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Head>
      <title>
        Dispositivos | Acuaponia
      </title>
    </Head>
    <Box 
      component="main"
      sx={{
        flexGrow: 1,
        py: 3
      }}
    >
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
              <Tab label="Registrar Dispositivo" 
              value="1" />
              <Tab label="Dispositivos Registrados" 
              value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><Customers></Customers></TabPanel>
          <TabPanel value="2"><VerDispositivos/></TabPanel>
        </TabContext>
      </Container>
    </Box>
    </>
  );
}

LabTabs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);