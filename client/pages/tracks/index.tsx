import React from 'react';
import MainLayout from "@/layouts/mainLayout";
import {useRouter} from "next/navigation";
import {Card, Grid} from "@mui/material";
import {Button} from "@mui/base";
import Box from "@mui/material/Box";
import {ITrack} from "@/types/track";
import TrackList from "@/components/trackList";

const tracks: ITrack[] = [
    {
        "_id": 1,
        "name": "Bella Ciao",
        "artist": "Delia ",
        "text": "O bella ciao, bella ciao, bella ciao ciao ciao\nUna mattina mi sono alzato\nE ho trovato l'invasor\nO partigiano portami via\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano portami via\nChe mi sento di morir, ir, ir-\nO partigiano\nMorir, ir, ir\nMorir-ir\nMorir-ir\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nMorir, Morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano\nO bella ciao, bella ciao, bella ciao ciao ciao\nE se muoio da partigiano\nTu mi devi seppellir\nE seppellire lassù in montagna\nO bella ciao, bella ciao, bella ciao ciao ciao\nE seppellire lassù in montagna\nSotto l'ombra di un bel fior, fior, fior\nO partigiano\n-Ir, morir, morir, morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nBella ciao, bella ciao, bella ciao ciao ciao",
        "listens": 0,
        "picture": "image/6a6b1253-d1c2-4ccf-a862-145e160dd920.png",
        "audio": "audio/51f8877d-4374-41ba-89ae-6fea976890e4.mp3",
        "comments": [],
    },
    {
        "_id": 2,
        "name": "Carmen Goett",
        "artist": "La Llorona Carmen Goett",
        "text": "¡Ay! De mi Llorona\nLlorona de azul celeste\nAunque la vida me cueste, llorona\nNo dejaré de quererte\n\nNo sé que tienen las flores, llorona,\nlas flores del campo santo;\nque cuando las mueve el viento, llorona,\nparece que están llorando.\n\nA un santo Cristo de fierro, Llorona,\nMis penas le conté yo,\n¿Cuáles no serían mis penas, Llorona?\nQue el santo Cristo lloró.\n\nNo creas que porque canto, ay Llorona,\nTengo el corazón alegre,\nTambién de dolor se canta, ay Llorona,\nCuando llorar no se puede.",
        "listens": 0,
        "picture": "image/a956727f-43f3-4f4c-8ab7-571147341c73.jpg",
        "audio": "audio/30e85ec1-36ae-413e-8d6a-e140f6480c3b.mp3",
        "comments": [],
    }
]

const Index = () => {
    const router = useRouter();



    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card style={{width:900}}>
                    <Box p={3}>
                        <Grid justifyContent="spaceBetween">
                            <h1>Upload Track</h1>
                            <Button onClick={()=> router.push('/tracks/create')}>Upload</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;