import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {wrapper} from "../../store";
import MainLayout from "../../layouts/MainLayout";
import TextField from "@mui/material/TextField";
import {useInput} from "../../hooks/useInput";

const Register = () => {
    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const password = useInput('')
    const repassword = useInput('')

    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h1>Register</h1>
                            <TextField
                                {...firstName}
                                style={{marginTop: 10, width:'100%'}}
                                label={"Enter your firstName"}
                            />
                            <TextField
                                {...lastName}
                                style={{marginTop: 10, width:'100%'}}
                                label={"Enter your lastName"}
                            />
                            <TextField
                                {...email}
                                style={{marginTop: 10, width:'100%'}}
                                label={"Enter your email"}
                            />
                            <TextField
                                {...password}
                                style={{marginTop: 10, width:'100%'}}
                                label={"Enter your password"}
                            />
                            <TextField
                                {...repassword}
                                style={{marginTop: 10, width:'100%'}}
                                label={"Enter your repassword"}
                            />
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Register;
export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
})
