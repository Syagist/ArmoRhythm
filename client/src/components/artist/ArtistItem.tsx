import React from "react";
import { ITrack } from "../../types/track";
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
import { ArtistItemProps } from "@/types/components/artistProps";

const ArtistItem: React.FC<ArtistItemProps> = ({ artist }) => {
  const router = useRouter();

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/artists/" + artist._id)}
    >
      {artist.name}
      {/*<img width={70} height={70} src={`${BASE_API}/${artist.picture}`} />*/}
    </Card>
  );
};

export default ArtistItem;
