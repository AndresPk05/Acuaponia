import React from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import { DashboardLayout } from 'src/components/dashboard-layout';
import Alertas_Tabs from 'src/components/alertas/alertas-tabs';
const Alertas = () => {
    return (
        <>
        <Head>
        <title>
            Alertas | Acuaponia
        </title>
        </Head>
        <Box 
        component="main"
        sx={{
            flexGrow: 1,
            py: 3
        }}
        >
            <Alertas_Tabs/>
        </Box>
        </>
    );
};
Alertas.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
export default Alertas;