import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {GetMaximoValorByVariableDispostivo} from '../../actions/LecturaSensorAction'
import {getVariableByName} from '../../actions/VariableAction';
import { useEffect, useState } from 'react';

const TotalProfit = (props) => {
  const [variable, setvariable] = useState({
    id_Variable : '',
    nombre: ''
  });
  const [valorLumbral, setValorLumbral] = useState(0);
  useEffect(()=>{
    GetValorMostrar()
  },props.IdDispostivo);

  useEffect(()=> {
    GetVariableByName()
  },[]);

  function GetVariableByName(){
    getVariableByName("Humedad Relativa").then(result  =>{
      setvariable(result.data);
    })
  }

  function GetValorMostrar(){
    let request = {
      IdDispositivo : typeof(props.props.IdDispostivo) == "undefined" ? '' : props.props.IdDispostivo,
      IdVariable: variable.id_Variable
    }
    GetMaximoValorByVariableDispostivo(request).then(
      result => {
        setValorLumbral(result.data);
      }
    )
  }
  return(
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {variable.nombre}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {valorLumbral}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};

export default TotalProfit;
