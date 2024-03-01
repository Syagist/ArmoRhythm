import React, { useState } from "react";
import StepWrapper from "@/components/ui/StepWrapper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import FileUpload from "@/components/fileUpload/FileUpload";
import { useInput } from "@/hooks/useInput";
import { host } from "@/api";
import { STATUS_CREATED } from "@/utils/api_constants";
import ArtistSelection from "@/components/admin/components/ArtistSelection";
import AlbumSelection from "@/components/admin/components/AlbumSelection";
import { IArtist } from "@/types/artist";
import { IAlbum } from "@/types/album";

const CreateTrack = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const text = useInput("");
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState(null);

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      artists.forEach((artist) => {
        formData.append("artistIds", artist._id);
      });

      formData.append("albumId", album._id);

      host
        .post(`/tracks`, formData)
        .then((resp) => {
          if (resp.status === STATUS_CREATED) {
            alert("Track successfully uploaded");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log("close modal here");
        });
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleArtists = (artists: IArtist[]) => {
    setArtists(artists);
  };

  const handleAlbum = (selectedAlbum: IAlbum) => {
    setAlbum(selectedAlbum);
  };

  return (
    <Grid container direction={"column"} style={{ padding: 20 }}>
      <Card>
        <Box p={3}>
          <h2>Upload Track</h2>

          <StepWrapper activeStep={activeStep}>
            {activeStep === 0 && (
              <Grid container direction={"column"} style={{ padding: 20 }}>
                <ArtistSelection onArtistChanged={handleArtists} />
                <AlbumSelection onAlbumChanged={handleAlbum} />
                <TextField
                  {...name}
                  style={{ marginTop: 10 }}
                  label={"Track name"}
                />

                <TextField
                  {...text}
                  style={{ marginTop: 10 }}
                  label={"Lyrics"}
                  multiline
                  rows={3}
                />
              </Grid>
            )}
            {activeStep === 1 && (
              <FileUpload setFile={setPicture} accept="image/*">
                <Button>Upload cover</Button>
              </FileUpload>
            )}
            {activeStep === 2 && (
              <FileUpload setFile={setAudio} accept="audio/*">
                <Button>Upload music file</Button>
              </FileUpload>
            )}
          </StepWrapper>
          <Grid container justifyContent="space-between">
            <Button disabled={activeStep === 0} onClick={back}>
              Back
            </Button>
            <Button onClick={next}>Next</Button>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default CreateTrack;
