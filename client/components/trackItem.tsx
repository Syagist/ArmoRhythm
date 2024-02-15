import React from 'react';
import {TrackProps} from "@/types/track";
import styles from '../styles/components/trackItem.module.scss'
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {Card, Container, Grid} from "@mui/material";
import {useRouter} from "next/navigation";

const TrackItem: React.FC<TrackProps> = ({track, active = false}) => {
    const router = useRouter();
    return (
        <Card className={styles.track} onClick={()=> router.push(`/tracks/${track._id}`)}>
            <IconButton>
                {
                    active ? <Pause/> : <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70}  src={'http://localhost:5000/' + track.picture} alt={track.name}/>
            <Container direction={"column"}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </Container>
            {active && <div>02:20 / 03:10</div>}
            <IconButton style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;