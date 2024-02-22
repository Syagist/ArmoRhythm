import React from 'react';
import Navbar from "../components/Navbar";
import Container from '@mui/material/Container';
import Player from "../components/Player";
import Head from "next/head";
import {MainLayoutProps} from "../types/layouts/mainLayoutProps";
import {AdminLayoutProps} from "../types/layouts/adminLayoutProps";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, Pause, PlayArrow} from "@mui/icons-material";


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
