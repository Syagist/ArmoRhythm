import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {wrapper} from "../../store";
import MainLayout from "../../layouts/MainLayout";
import TextField from "@mui/material/TextField";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import Button from "@mui/material/Button";

const Register = () => {
    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const password = useInput('')
    const repassword = useInput('')
    const register = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3} component="form">
                        <h1>Register</h1>
                        <TextField
                            {...firstName}
                            style={{marginTop: 10, width: '100%'}}
                            label={"Enter your firstName"}
                        />
                        <TextField
                            {...lastName}
                            style={{marginTop: 10, width: '100%'}}
                            label={"Enter your lastName"}
                        />
                        <TextField
                            {...email}
                            style={{marginTop: 10, width: '100%'}}
                            label={"Enter your email"}
                        />
                        <TextField
                            {...password}
                            style={{marginTop: 10, width: '100%'}}
                            label={"Enter your password"}
                        />
                        <TextField
                            {...repassword}
                            style={{marginTop: 10, width: '100%'}}
                            label={"Enter your repassword"}
                        />
                        <Button onClick={register}>Register</Button>

                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Register;
export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
})
