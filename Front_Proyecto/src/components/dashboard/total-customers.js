import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {GetMaximoValorByVariableDispostivo} from '../../actions/LecturaSensorAction'
import {getVariableByName} from '../../actions/VariableAction';
import { useEffect, useState } from 'react';

const TotalCustomers = (props) =>{ 
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
    getVariableByName("PH").then(result  =>{
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
  <Card 
  sx={{ height: '100%' }} 
  {...props.props.Medida}>
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
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};

export default TotalCustomers;