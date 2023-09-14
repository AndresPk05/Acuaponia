import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  Typography,
} from "@mui/material";
import Budget from "../components/dashboard/budget";
import { Sales } from "../components/dashboard/sales";
import  TasksProgress  from "../components/dashboard/tasks-progress";
import  TotalCustomers  from "../components/dashboard/total-customers";
import  TotalProfit  from "../components/dashboard/total-profit";
import { DashboardLayout } from "../components/dashboard-layout";
import React, { useEffect, useState } from "react";
import { obtenerDispositivosRegistrados } from "../actions/DispositivoAction";
import { ToastContainer, toast } from "react-toastify";
import {GetIdVariablesByDispositivo} from "../actions/LecturaSensorAction"

const Dashboard = () => {
  const [dispositivo, setdispotivo] = useState({
    idDispositivo: "",
    fechaInicio: "",
    fechaFinal: "",
    pageCount: 1,
    pageSize: 50,
    RowCount: 1,
  });
  const [cargarGrap, setcargarGrap] = useState(false);
  const [variablesDispositivos, setvariables] = useState([]);
  const notify = (mensaje, type) =>
    toast(mensaje, {
      type,
      theme: "dark",
    });

  const changeSelect = (e) => {
    const { name, value } = e.target;
    setdispotivo((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const [dispositivosRegistrados, setDispositivosRegistrados] = useState([]);

  const guardarDispositivosRegistrados = (data) => {
    setDispositivosRegistrados(data);
  };
  useEffect(() => {
    obtenerDispositivosRegistrados()
      .then((response) => {
        console.dir(response.data);
        guardarDispositivosRegistrados(response.data);
      })
      .catch((error) => {
        ManejoErroresPopup(error.response.data.errores.mensaje, "Error");
      });
  }, []);

  const validateForm = () => {
    if (dispositivo.fechaInicio == "" || dispositivo.fechaFinal == "") {
      notify("El nombre de la variable no puede estar vacio", "error");
      return;
    }

    setcargarGrap(false);
    obtenerVariableByDispositivo();
  };

  const obtenerVariableByDispositivo = () => {
    GetIdVariablesByDispositivo(dispositivo.idDispositivo)
    .then(result => {
      setcargarGrap(true);
      setvariables(result.data)
    })
  }
  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ToastContainer position="bottom-center" autoClose={5000} />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <Container>
                  <Grid container spacing={3}>
                    <Grid item xs={3} margin={"auto"}>
                      <Typography color="textSecondary" gutterBottom variant="overline">
                        Dispositivo
                      </Typography>
                      {dispositivosRegistrados.length > 0 ? (
                        <Select
                          value={dispositivo.id}
                          label="Dispositivo"
                          name="idDispositivo"
                          fullWidth
                          onChange={changeSelect}
                        >
                          <MenuItem value="1">
                            <em>Seleccione un Dispositivo</em>
                          </MenuItem>
                          {dispositivosRegistrados.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.nombre}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      ) : null}
                    </Grid>
                    <Grid item xs={3} margin={"auto"}>
                      <Typography color="textSecondary" gutterBottom variant="overline">
                        Fecha Inicial
                      </Typography>
                      <TextField
                        type="date"
                        value={dispositivo.fechaInicio}
                        name="fechaInicio"
                        id="fechainicial"
                        fullWidth
                        onChange={changeSelect}
                      ></TextField>
                    </Grid>
                    <Grid item xs={3} margin={"auto"}>
                      <Typography color="textSecondary" gutterBottom variant="overline">
                        Fecha Fin
                      </Typography>
                      <TextField
                        type="date"
                        value={dispositivo.fechaFinal}
                        name="fechaFinal"
                        id="fechafinal"
                        fullWidth
                        onChange={changeSelect}
                      ></TextField>
                    </Grid>
                    <Grid item xs={3} margin={"auto"}>
                      <Button color="primary" variant="outlined" fullWidth onClick={validateForm}>
                        Buscar
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Card>
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget props={{ IdDispostivo: dispositivo.idDispositivo }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers props={{ IdDispostivo: dispositivo.idDispositivo }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress props={{ IdDispostivo: dispositivo.idDispositivo }}/>
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit props={{ IdDispostivo: dispositivo.idDispositivo }} />
            </Grid>
            
              {cargarGrap ? 
                variablesDispositivos.map((item, index) => {
                  return (
                    <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Sales request ={{idDispositivo: dispositivo.idDispositivo,
                    idVariable : item,
                    fechaInicio: dispositivo.fechaInicio,
                    fechaFinal: dispositivo.fechaFinal }}/>
                    </Grid>);
                })
              : null}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
