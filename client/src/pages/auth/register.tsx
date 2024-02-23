import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {useRouter} from "next/router";
import {wrapper} from "@/store";
import MainLayout from "@/layouts/MainLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import registrationValidationSchema from "@/validationSchema/registrationValidationSchema";
import {useFormik} from "formik";
import {register} from "@/api/auth";
import FileUpload from "@/components/fileUpload/FileUpload";

const Register = () => {
    const [picture, setPicture] = useState(null);
    const router = useRouter()

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
                        <h1>Register</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <FileUpload setFile={setPicture} accept="image/*">
                                <Button>Upload cover</Button>
                            </FileUpload>
                            <Card style={{width: 200}}>
                                <img src={picture} alt={'cover'}/>
                            </Card>
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
