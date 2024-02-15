import React from 'react';
import {ITrack} from "@/types/track";
import {Button, useInput} from "@mui/base";
import {Grid, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import MainLayout from "@/layouts/mainLayout";

const track: ITrack =
    {
        "_id": 1,
        "name": "Bella Ciao",
        "artist": "Delia ",
        "text": "O bella ciao, bella ciao, bella ciao ciao ciao\nUna mattina mi sono alzato\nE ho trovato l'invasor\nO partigiano portami via\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano portami via\nChe mi sento di morir, ir, ir-\nO partigiano\nMorir, ir, ir\nMorir-ir\nMorir-ir\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nMorir, Morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano\nO bella ciao, bella ciao, bella ciao ciao ciao\nE se muoio da partigiano\nTu mi devi seppellir\nE seppellire lassù in montagna\nO bella ciao, bella ciao, bella ciao ciao ciao\nE seppellire lassù in montagna\nSotto l'ombra di un bel fior, fior, fior\nO partigiano\n-Ir, morir, morir, morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nBella ciao, bella ciao, bella ciao ciao ciao",
        "listens": 0,
        "picture": "image/6a6b1253-d1c2-4ccf-a862-145e160dd920.png",
        "audio": "audio/51f8877d-4374-41ba-89ae-6fea976890e4.mp3",
        "comments": []
    };
const TrackPage = () => {
    const router = useRouter();
    const username = useInput('')
    const text = useInput('')


    const addComment = () => {

    }

    return (
        <MainLayout>
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}
            />
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt={track.name}/>
                <div style={{marginLeft: 30}}>
                    <h1> {track.name}</h1>
                    <h1> {track.artist}</h1>
                    <h1>Listen Count {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>

                <TextField
                    label="Your Name"
                    fullWidth
                    {...username}
                />
                <TextField
                    label="Comment"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author - {comment.username}</div>
                        <div>Comments - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;