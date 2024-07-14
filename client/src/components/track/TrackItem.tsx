import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import styles from "../../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../../hooks/useActions";
import { TrackItemProps } from "../../types/components/trackProps";
import { BASE_API } from "../../utils/api_constants";
import ArtistAsInfo from "@/components/artist/ArtistAsInfo";

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  useEffect(() => {
    console.log(track);
  }, [track]);
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {!active ? <PlayArrow /> : <Pause />}
      </IconButton>
      <img width={70} height={70} src={`${BASE_API}/${track.album.picture}`} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <ArtistAsInfo artists={track.artists} />
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
