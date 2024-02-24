import {host} from "@/api";
import {IArtist} from "@/types/artist";

export const fetchArtists = async () => {
    try {
        const response = await host.get(`/artists`);
        return response.data;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}

export const searchArtists = async (query: string) :Promise<IArtist[]> => {
    try {
        const response = await host.get(`/artists/search`, {
            params: {
                query: query,
            },
        });
        console.log(response)
        return response.data;
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}
