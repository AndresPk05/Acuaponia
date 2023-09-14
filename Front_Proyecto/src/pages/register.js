import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import ControlledPopup from '../components/ControlledPopup'
import { RegisterUser } from 'src/actions/UsuarioAction';

const Register = () => {
  const router = useRouter();
  const [senErrorForm, setErrorForm] = useState(false);
  const [senMensajeValidacion, setMensajeValidacion] = useState();

  const GuardarMensajeError = (mensaje) => {
    setMensajeValidacion(mensaje);
  }

  const MostrarPopup = () =>{
    setErrorForm(!senErrorForm)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      nombre: '',
      apellido: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .min(8)
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
        nombre: Yup
        .string()
        .min(4)
        .max(255)
        .required(
          'First name is required'),
        apellido: Yup
        .string()
        .min(4)
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .min(8)
        .matches(/([a-z].*[A-Z])|([A-Z].*[a-z])/, 'La contraseña debe tener una letra minuscula y una letra mayuscula')
        .matches(/([!,%,&,@,#,$,^,*,?,_,~])/, "La contraseña debe tener un caracter especial")
        .required(
          'Password is required')
    }),
    onSubmit: values => {
      RegistrarUsuarioNuevo();
    },
  });
  const RegistrarUsuarioNuevo = ()=>{
    let mensajeMostrar = '';
    if(formik.errors.nombre)
      mensajeMostrar += formik.errors.nombre + "\n";
    if(formik.errors.apellido)
      mensajeMostrar += formik.errors.apellido + "\n";
    if(formik.errors.email)
      mensajeMostrar += formik.errors.email + "\n";
    if(formik.errors.password)
      mensajeMostrar += formik.errors.password + "\n";
    if(mensajeMostrar.length > 1){
      GuardarMensajeError(mensajeMostrar);
      MostrarPopup();
      return;
    }
    console.log(formik.values);
    formik.values.nombreCompleto = ''
    RegisterUser(formik.values).then(result=>{
      router.push('/login');
    }).catch( obj =>{
      console.log(obj);
    })
  }
  return (
    <>
      <Head>
        <title>
          Register | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <NextLink
                href="/login"
                passHref
              >
                <Button
                  component="a"
                  startIcon={<ArrowBackIcon fontSize="small" />}
                >
                  Login
                </Button>
              </NextLink>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Create a new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create a new account
                  </Typography>
                  {senErrorForm ? <ControlledPopup mensaje={senMensajeValidacion}></ControlledPopup> : null}
                </Box>
                <TextField
                  error={Boolean(formik.touched.nombre && formik.errors.nombre)}
                  fullWidth
                  helperText={formik.touched.nombre && formik.errors.nombre}
                  label="First Name"
                  margin="normal"
                  name="nombre"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.apellido && formik.errors.apellido)}
                  fullWidth
                  helperText={formik.touched.apellido && formik.errors.apellido}
                  label="Last Name"
                  margin="normal"
                  name="apellido"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.apellido}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign Up Now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Have an account?
                  {' '}
                  <NextLink
                    href="/login"
                    passHref
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                    >
                      Sign In
                    </Link>
                  </NextLink>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;
