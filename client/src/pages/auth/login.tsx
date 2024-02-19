import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {wrapper} from "../../store";
import MainLayout from "../../layouts/MainLayout";
import TextField from "@mui/material/TextField";
import {useInput} from "../../hooks/useInput";

const Login = () => {
    const email = useInput('')
    const password = useInput('')

    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Login</h1>
                            <TextField
                                {...email}
                                style={{marginTop: 10}}
                                label={"Enter your email"}
                            />
                            <TextField
                                {...password}
                                style={{marginTop: 10}}
                                label={"Enter your password"}
                            />
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Login;
export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
})
