import React, {useEffect, useState} from 'react';
import StepWrapper from "@/components/ui/StepWrapper";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import FileUpload from "@/components/fileUpload/FileUpload";
import {useInput} from "@/hooks/useInput";
import {host} from "@/api";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {STATUS_CREATED} from "@/utils/api_constants";
import {useDispatch} from "react-redux";
import {fetchArtists} from "@/store/actions-creators/artists";

const CreateTrack = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const {artists,} = useTypedSelector(state => state.artists)

    const dispatch = useDispatch();

    useEffect(() => {
        const getArtists = async () => {
            // await dispatch(fetchArtists());
        };

        getArtists();
    }, [dispatch]);

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
            host.post(`/tracks`, formData)
                .then(resp => {
                    if (resp.status === STATUS_CREATED) {
                        alert("Track successfully uploaded")
                    }
                })
                .catch(e => console.log(e))
                .finally(() => {
                    console.log('close modal here')
                })
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
                                {/*<SearchWithSelection artists={artists} />*/}
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
