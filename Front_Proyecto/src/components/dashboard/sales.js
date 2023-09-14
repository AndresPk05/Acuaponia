import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import React, {useEffect, useState} from "react";
import {GetLecturasByDispostivoFechaVariable} from '../../actions/LecturaSensorAction'
import moment from 'moment';
import {GetVariableById} from '../../actions/VariableAction';

export const Sales = (props) => {
  const theme = useTheme();
  const [labelsGraf, setLabelsGraf] = useState([]);
  const [dataGraf, setDataGraf] = useState({});
  const [variable, setVariable] = useState({
    nombre: ''
  });
  const setGrafica = (dataGrafica) =>{
    setLabelsGraf(dataGrafica.lecturas.map((item) =>{return moment(item.fechaLectura).format("DD-MM-YYYY hh:mm")}));
  }

  const setDataGrafica = (dataGrafica) =>{
    let dataGuardar = dataGrafica.lecturas.map((item) => {return item.valor_Leido});
    console.dir(dataGuardar);
    setDataGraf(dataGuardar);
  }

  useEffect(()=>{
    let idDispositivo = typeof(props.request) != "undefined" ? props.request.idDispositivo : '';
    let idVariable = typeof(props.request) != "undefined" ? props.request.idVariable : '';
    let fechaInicio = typeof(props.request) != "undefined" ? props.request.fechaInicio : new Date();
    let fechaFinal = typeof(props.request) != "undefined" ? props.request.fechaFinal : new Date();
    let request = {
      IdDispositivo: idDispositivo,
      IdVariable: idVariable,
      FechaInicio: fechaInicio,
      FechaFinal: fechaFinal,
      PageCount: 1, 
      PageSize: 1,
      RowCount: 1
    };
    GetLecturasByDispostivoFechaVariable(request)
      .then(result =>{
        loadRows(result.data);
      });
    if(idVariable != '')
      GetVariableById(idVariable).then(result => {
        setVariable(result.data);
      })
  }, props.request)

  function loadRows(data){
    console.dir(data);
    setDataGrafica(data)
    setGrafica(data)
  }

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: dataGraf,
        label: variable.nombre,
        maxBarThickness: 10
      }
    ],
    labels: labelsGraf
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title={variable.nombre}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
  );
};
