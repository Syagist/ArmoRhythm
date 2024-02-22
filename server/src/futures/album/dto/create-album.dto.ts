import {Artist} from "../../artist/schemas/artist.schema";

export class CreateAlbumDto {
    readonly title: string;
    readonly artists?: Artist[];
    readonly releaseDate: string;
}
