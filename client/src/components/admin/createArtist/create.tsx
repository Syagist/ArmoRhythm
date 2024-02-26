import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import FileUpload from "@/components/fileUpload/FileUpload";
import {useInput} from "@/hooks/useInput";
import {host} from "@/api";
const CreateArtist = () => {
    const [picture, setPicture] = useState(null)
    const name = useInput('')

    const createArtist = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('picture', picture)
        host.post(`/artists`, formData)
            .then(resp => {
                console.log(resp)
            })
            .catch(e => console.log(e))
    }

    return (
        <Grid container direction={"column"} style={{padding: 20}}>
            <Card>
                <Box p={3}>
                    <h2>Create Artist</h2>

                    <TextField
                        {...name}
                        style={{marginTop: 10}}
                        label={"Artist name"}
                    />
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Upload cover</Button>
                    </FileUpload>
                    <Button onClick={createArtist}>create artist</Button>
                </Box>
            </Card>
        </Grid>
    );
};

export default CreateArtist;
