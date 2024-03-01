import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ArtistsAutoCompleteProps, IArtist } from "@/types/artist";
import { searchArtists } from "@/store/actions-creators/artists";
import { debounce } from "@/utils/debounce";

const ArtistSelection: React.FC<ArtistsAutoCompleteProps> = ({
  onArtistChanged,
}) => {
  const [artists, setArtists] = useState(null);

  const getArtists = debounce(async (key: string) => {
    setArtists(await searchArtists(key));
  }, 1000);

  useEffect(() => {
    getArtists("a");
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    getArtists(event.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      {artists && (
        <Autocomplete
          multiple
          id="tags-outlined"
          options={artists}
          getOptionLabel={(option: IArtist) => option?.name}
          filterSelectedOptions
          onChange={(event, selectedOptions: IArtist[]) => {
            if (onArtistChanged) {
              onArtistChanged(selectedOptions);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="filterSelectedOptions"
              placeholder="Select Artist"
              onChange={handleInputChange}
            />
          )}
        />
      )}
    </Stack>
  );
};
export default ArtistSelection;
