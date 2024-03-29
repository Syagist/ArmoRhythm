import React from "react";
import TrackItem from "./TrackItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TrackListProps } from "@/types/components/trackProps";

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  console.log(tracks);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
