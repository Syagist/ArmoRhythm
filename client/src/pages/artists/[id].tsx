import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { BASE_API } from "@/utils/api_constants";
import { host } from "@/api";
import { IArtist } from "@/types/artist";
import TrackList from "@/components/track/TrackList";

const ArtistPage = ({ serverArtist }) => {
  const router = useRouter();
  const [artist, setArtist] = useState<IArtist>(serverArtist);

  return (
    <MainLayout
      title={"Listening ArmoRhythm - " + artist.name + " - " + "artist.artist"}
      keywords={"Track, Artists, " + artist.name + ", " + "artist.artist"}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push("/artists")}
      >
        To Artistlist
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img src={`${BASE_API}/${artist.picture}`} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h1>Artist Name - {artist.name}</h1>
          <TrackList tracks={artist.tracks} />
        </div>
      </Grid>
    </MainLayout>
  );
};

export default ArtistPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await host.get(`/artists/` + params.id);
  return {
    props: {
      serverArtist: response.data,
    },
  };
};
