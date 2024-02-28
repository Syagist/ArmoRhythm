import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { debounce } from "@/utils/debounce";
import { AlbumsAutoCompleteProps, IAlbum } from "@/types/album";
import { searchAlbums } from "@/store/actions-creators/albums";

const AlbumSelection: React.FC<AlbumsAutoCompleteProps> = ({
  onAlbumChanged,
}) => {
  const [artists, setAlbums] = useState(null);

  const getAlbums = debounce(async (key: string) => {
    setAlbums(await searchAlbums(key));
  }, 1000);

  useEffect(() => {
    getAlbums("a");
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    getAlbums(event.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      {artists && (
        <Autocomplete
          id="tags-outlined"
          options={artists}
          getOptionLabel={(option: IAlbum) => option?.name}
          filterSelectedOptions
          onChange={(event, selectedOptions) => {
            if (onAlbumChanged) {
              onAlbumChanged(selectedOptions);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="filterSelectedOptions"
              placeholder="Select Album"
              onChange={handleInputChange}
            />
          )}
        />
      )}
    </Stack>
  );
};
export default AlbumSelection;
