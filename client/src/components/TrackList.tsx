import React, {useEffect} from 'react';
import {ITrack} from "../types/track";
import TrackItem from "./TrackItem";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;
