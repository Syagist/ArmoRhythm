import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "@/styles/components/player.module.scss"
import {ITrack} from "@/types/track";
import TrackProgress from "@/components/trackProgress";

const track: ITrack =
    {
        "_id": 1,
        "name": "Bella Ciao",
        "artist": "Delia ",
        "text": "O bella ciao, bella ciao, bella ciao ciao ciao\nUna mattina mi sono alzato\nE ho trovato l'invasor\nO partigiano portami via\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano portami via\nChe mi sento di morir, ir, ir-\nO partigiano\nMorir, ir, ir\nMorir-ir\nMorir-ir\nO bella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nMorir, Morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano\nO bella ciao, bella ciao, bella ciao ciao ciao\nE se muoio da partigiano\nTu mi devi seppellir\nE seppellire lassù in montagna\nO bella ciao, bella ciao, bella ciao ciao ciao\nE seppellire lassù in montagna\nSotto l'ombra di un bel fior, fior, fior\nO partigiano\n-Ir, morir, morir, morir\nBella ciao, bella ciao, bella ciao ciao ciao\nO partigiano, giano -ir\nO partigiano, giano -ir\nBella ciao, bella ciao, bella ciao ciao ciao",
        "listens": 0,
        "picture": "image/6a6b1253-d1c2-4ccf-a862-145e160dd920.png",
        "audio": "audio/51f8877d-4374-41ba-89ae-6fea976890e4.mp3",
        "comments": []
    };
const Player = () => {
    const active = false;
    return (
        <div className={styles.player}>
            <IconButton>
                {
                    active ? <Pause/> : <PlayArrow/>
                }
            </IconButton>
            <div style={{marginLeft: 30}}>
                <p> {track.name}</p>
                <p> {track.artist}</p>
            </div>
            <TrackProgress left={0} right={100} onChange={() => {
            }}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={0} right={100} onChange={() => {
            }}/>
        </div>
    );
};

export default Player;