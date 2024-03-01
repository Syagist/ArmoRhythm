import React from "react";
import ArtistItem from "./ArtistItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TrackListProps } from "@/types/components/trackProps";
import { ArtistListProps } from "@/types/components/artistProps";

const ArtistsList: React.FC<ArtistListProps> = ({ artists }) => {
  console.log(artists);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {artists.map((artist) => (
          <ArtistItem key={artist._id} artist={artist} />
        ))}
      </Box>
    </Grid>
  );
};

export default ArtistsList;
