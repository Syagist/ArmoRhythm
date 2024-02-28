import { host } from "@/api";
import { IAlbum } from "@/types/album";

export const fetchAlbums = async () => {
  try {
    const response = await host.get(`/albums`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

export const searchAlbums = async (query: string): Promise<IAlbum[]> => {
  try {
    const response = await host.get(`/albums/search`, {
      params: {
        query: query,
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
