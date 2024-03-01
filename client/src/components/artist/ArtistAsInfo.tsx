import React from "react";
import { ArtistsProps, IArtist } from "@/types/artist";
import { useRouter } from "next/router";

const ArtistAsInfo: React.FC<ArtistsProps & { count?: number }> = ({
  artists,
  count = 2,
}) => {
  const router = useRouter();

  const openArtistPage = (
    event: React.MouseEvent<HTMLDivElement>,
    artist: IArtist,
  ) => {
    event.stopPropagation();
    router.push("/artists/" + artist._id);
  };

  return (
    <div>
      {artists &&
        artists.map((artist, index) => {
          return index < count ? (
            <div
              onClick={(ev) => openArtistPage(ev, artist)}
              key={artist._id}
              style={{ fontSize: 12, color: "gray" }}
            >
              {artist.name} {index < count - 1 ? " / " : ""}
            </div>
          ) : (
            <></>
          );
        })}
    </div>
  );
};

export default ArtistAsInfo;
