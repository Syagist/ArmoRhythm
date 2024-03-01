import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { NextThunkDispatch, wrapper } from "@/store";
import MainLayout from "@/layouts/MainLayout";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import AlbumList from "@/components/album/AlbumList";
import { fetchAlbums } from "@/store/actions-creators/albums";

const Index = () => {
  const { albums, error } = useTypedSelector((state) => state.albums);

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
              <h1>Albums List</h1>
            </Grid>
          </Box>
          <AlbumList albums={albums} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchAlbums());
  },
);
