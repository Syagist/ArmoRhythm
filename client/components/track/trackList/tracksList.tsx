import React from 'react';
import {TrackListProps} from "@/types/track";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "@/components/track/trackItem/trackItem";

const TracksList:React.FC<TrackListProps> = ({tracks}) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {
                    tracks.map((track)=>
                    <TrackItem track={track}/>)
                }
            </Box>
        </Grid>
    );
};

export default TracksList;