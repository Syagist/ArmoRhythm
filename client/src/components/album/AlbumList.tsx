import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AlbumListProps } from "@/types/components/albumProps";
import AlbumItem from "@/components/album/AlbumItem";

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  console.log(albums);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {albums.map((album) => (
          <AlbumItem key={album._id} album={album} />
        ))}
      </Box>
    </Grid>
  );
};

export default AlbumList;
