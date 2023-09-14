
import Head from 'next/head';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { Container } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RegistrarVariable from 'src/components/variables/registrarVariable';
import Variabletitle from 'src/components/variables/variable-title';
const Variables = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <>
        <Head>
          <title>
            Varibles | Acuaponia
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
                  <Tab label="Registrar Variables" 
                  value="1" />
                  <Tab label="Variables Registradas" 
                  value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                  <RegistrarVariable></RegistrarVariable>
              </TabPanel>
              <TabPanel value="2"><Variabletitle></Variabletitle></TabPanel>
            </TabContext>
          </Container>
        </Box>
        </>
    );
};

Variables.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

export default Variables;