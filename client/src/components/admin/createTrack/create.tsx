import React, {useState} from 'react';
import StepWrapper from "../../../components/StepWrapper";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import FileUpload from "../../../components/FileUpload";
import {useInput} from "../../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const CreateTrack = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/createTrack'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <Grid container direction={"column"} style={{padding: 20}}>
            <Card>
                <Box p={3}>
                    <h2>Upload Track</h2>

                    <StepWrapper activeStep={activeStep}>
                        {activeStep === 0 &&
                            <Grid container direction={"column"} style={{padding: 20}}>
                                <TextField
                                    {...name}
                                    style={{marginTop: 10}}
                                    label={"Track name"}
                                />
                                <TextField
                                    {...artist}
                                    style={{marginTop: 10}}
                                    label={"Artist name"}
                                />
                                <TextField
                                    {...text}
                                    style={{marginTop: 10}}
                                    label={"Lyrics"}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        }
                        {activeStep === 1 &&
                            <FileUpload setFile={setPicture} accept="image/*">
                                <Button>Upload cover</Button>
                            </FileUpload>
                        }
                        {activeStep === 2 &&
                            <FileUpload setFile={setAudio} accept="audio/*">
                                <Button>Upload music file</Button>
                            </FileUpload>
                        }
                    </StepWrapper>
                    <Grid container justifyContent='space-between'>
                        <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                        <Button onClick={next}>Next</Button>
                    </Grid>
                </Box>
            </Card>
        </Grid>
    );
};

export default CreateTrack;
