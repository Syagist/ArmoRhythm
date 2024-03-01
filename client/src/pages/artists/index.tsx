import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { NextThunkDispatch, wrapper } from "@/store";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchArtists } from "@/store/actions-creators/artists";
import ArtistsList from "@/components/artist/ArtistsList";

const Index = () => {
  const { artists, error } = useTypedSelector((state) => state.artists);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Track list for Music Platform"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={4}>
            <Grid container justifyContent="space-between">
              <h1>Track List</h1>
            </Grid>
          </Box>
          <ArtistsList artists={artists} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchArtists());
  },
);
