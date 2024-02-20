import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {wrapper} from "../../store";
import MainLayout from "../../layouts/MainLayout";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import registrationValidationSchema from "../../validationSchema/registrationValidationSchema";
import {useFormik} from "formik";
import {setTokensInCookies} from "../../utils/cookieUtils";
import {STATUS_CREATED} from "../../utils/api_constants";
import {host} from "../../api";
import {register} from "../../api/auth";

const Register = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
        },
        validationSchema: registrationValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await register({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password
                })
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        },
    });
//{
//     "access_token": {
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ0NjNkYWNmMzQyNjcwYjg5NjNiM2YiLCJ1c2VybmFtZSI6IjEzMjEzMSIsImlhdCI6MTcwODQxODAxMSwiZXhwIjoxNzA4NDE4OTExfQ._pzJU5AI7hgiIEp_tyM0HKRc9cY1vny-X8tKlmjwBtQ",
//         "expires": "15m"
//     },
//     "refresh_token": {
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ0NjNkYWNmMzQyNjcwYjg5NjNiM2YiLCJ1c2VybmFtZSI6IjEzMjEzMSIsImlhdCI6MTcwODQxODAxMSwiZXhwIjoxNzExMDEwMDExfQ.8WYVJdtJnk7zhC-125jdx5sE6OHMdY25orNqLlaiQxE",
//         "expires": "30d"
//     },
//     "user": {
//         "firstName": "132131",
//         "lastName": "12321323",
//         "email": "123123@12321.1232",
//         "password": "12321323",
//         "tracks": [],
//         "_id": "65d463dacf342670b8963b3f",
//         "__v": 0,
//         "sessionToken": "1sJJie6QiQO2GWtiKmnEYbweDMVjSlUFGzkj5cWcO1yJZnLF2cdd4ZvdmMhv"
//     }
// }

    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h1>Register</h1>
                        <form onSubmit={formik.handleSubmit}>

                            <TextField
                                style={{marginTop: 10, width: '100%'}}
                                label="First Name"
                                {...formik.getFieldProps('firstName')}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField
                                style={{marginTop: 10, width: '100%'}}
                                label="Enter your lastName"
                                {...formik.getFieldProps('lastName')}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
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
                            <TextField
                                style={{marginTop: 10, width: '100%'}}
                                label="Enter your reTypePassword"
                                {...formik.getFieldProps('reTypePassword')}
                                error={formik.touched.reTypePassword && Boolean(formik.errors.reTypePassword)}
                                helperText={formik.touched.reTypePassword && formik.errors.reTypePassword}
                            />
                            <Button type="submit">Register</Button>
                        </form>
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Register;
export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
})
