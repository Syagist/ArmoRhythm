import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {wrapper} from "../../store";
import MainLayout from "../../layouts/MainLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import loginValidationSchema from "../../validationSchema/loginValidationSchema";
import {login} from "../../api/auth";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await login({
                    email: values.email,
                    password: values.password
                })
                await router.push('/profile/' + response._id);
            } catch (e) {
                console.log(e)
            }
        },
    });


    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h1>Login</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                style={{marginTop: 10, width: '100%'}}
                                label="Enter your email"
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                style={{marginTop: 10, width: '100%'}}
                                label="Enter your password"
                                {...formik.getFieldProps('password')}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button type="submit">Login</Button>
                        </form>
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Login;
export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
})
