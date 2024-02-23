import React from 'react';
import Navbar from "../components/navbar/Navbar";
import Container from '@mui/material/Container';
import Player from "../components/player/Player";
import Head from "next/head";
import {MainLayoutProps} from "../types/layouts/mainLayoutProps";


const MainLayout: React.FC<MainLayoutProps>
    = ({
           children,
           title,
            description,
            keywords
       }) => {
    return (
        <>
            <Head>
                <title>{title || 'Music platform'}</title>
                <meta name="description" content={`Music platform. Here everyone can leave their track and become famous.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Music, Tracks, Artists"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;
