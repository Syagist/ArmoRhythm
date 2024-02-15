"use client"
import NavBar from "@/components/navBar";
import Player from "@/components/player";
import {Container} from "@mui/material";

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (

        <div className={'main-content'}>
            <NavBar/>
            <Container className={'content'}>
                {children}
            </Container>
            <Player/>
        </div>
    )
}