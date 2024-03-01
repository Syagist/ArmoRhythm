import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { BASE_API } from "@/utils/api_constants";
import { host } from "@/api";
import { IAlbum } from "@/types/album";
import TrackList from "@/components/track/TrackList";

const AlbumPage = ({ serverAlbum }) => {
  const router = useRouter();
  const [album, setAlbum] = useState<IAlbum>(serverAlbum);

  return (
    <MainLayout
      title={"Listening ArmoRhythm - " + album.name + " - " + "albums.albums"}
      keywords={"Track, Albums, " + album.name + ", " + "albums.albums"}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 32 }}
        onClick={() => router.push("/albums")}
      >
        To Albums
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img src={`${BASE_API}/${album.picture}`} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h1>Album Name - {album.name}</h1>
          <TrackList tracks={album.tracks} />
        </div>
      </Grid>
    </MainLayout>
  );
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await host.get(`/albums/` + params.id);
  return {
    props: {
      serverAlbum: response.data,
    },
  };
};
