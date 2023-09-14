import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
import { LoginUsuario } from 'src/actions/UsuarioAction';

const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    email:'',
    password:''
  })

  const ingresarDataUsuario = (e) =>{
    const {name, value} = e.target;
    setUsuario(anterior => ({
        ...anterior,
        [name] : value
    }));
}

const loginUsuario = () => {
    LoginUsuario(usuario).then(response => {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('senUser', true);
        router.push('/');
        dispatch({
            type: "INICIOSESION"
        });
    }).catch(error => {
        console.log(error.response)
    })
}

  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
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
          <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Sign in
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                </Box>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onChange={ingresarDataUsuario}
                  type="email"
                  value={usuario.email}
                  variant="outlined"
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={ingresarDataUsuario}
                  type="password"
                  value={usuario.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={loginUsuario}
                  >
                    Sign In Now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Don&apos;t have an account?
                  {' '}
                  <NextLink
                    href="/register"
                  >
                    <Link
                      to="/register"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      Sign Up
                    </Link>
                  </NextLink>
                </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
