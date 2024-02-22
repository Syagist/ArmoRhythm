import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";
import {BASE_API} from "../../utils/api_constants";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post(`${BASE_API}/tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={"Listening ArmoRhythm - " + track.name + " - " + track.artist}
            keywords={'Track, Artists, ' + track.name + ", " + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push('/createTrack')}
            >
                To Tracklist
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={BASE_API + track.picture} width={200} height={200}/>
                <div style={{marginLeft: 30}}>
                    <h1>Trackname - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>

                <TextField
                    label="Your name"
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
                <Button onClick={addComment}>Submit</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(`${BASE_API}/tracks/` + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}
