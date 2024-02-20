import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MainLayout from "../../layouts/MainLayout";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Index = () => {
    const {user, error} = useTypedSelector(state => state.user)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Track list for Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>{user.email}</h1>
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
