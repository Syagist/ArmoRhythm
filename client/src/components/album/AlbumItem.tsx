import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import styles from "../../styles/TrackItem.module.scss";
import { useRouter } from "next/router";
import { BASE_API } from "@/utils/api_constants";
import { AlbumItemProps } from "@/types/components/albumProps";

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const router = useRouter();
  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/albums/" + album._id)}
    >
      <img width={70} height={70} src={`${BASE_API}/${album.picture}`} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{album.name}</div>
      </Grid>
    </Card>
  );
};

export default AlbumItem;
