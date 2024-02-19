import {ITrack} from "../track";

export interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

export interface TrackListProps {
    tracks: ITrack[]
}
