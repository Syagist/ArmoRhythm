import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import Container from '@mui/material/Container';
import Player from "@/components/player/Player";
import {AdminLayoutProps} from "@/types/layouts/adminLayoutProps";


const AdminLayout: React.FC<AdminLayoutProps>
    = ({
           children,
       }) => {
    return (
        <>
            <Navbar/>
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default AdminLayout;
