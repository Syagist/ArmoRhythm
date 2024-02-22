import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import AdminLayout from "../../layouts/AdminLayout";
import {Modal} from "@mui/material";
import CreateTrack from "../../components/admin/createTrack/create";

const Index = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <AdminLayout>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h1>admin</h1>
                        <Button onClick={openModal}>
                            Create Track
                        </Button>
                            <Modal
                                open={isModalOpen}
                                onClose={closeModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                            <>
                                <CreateTrack/>
                            </>
                        </Modal>

                    </Box>
                </Card>
            </Grid>
        </AdminLayout>
    );
};

export default Index;

