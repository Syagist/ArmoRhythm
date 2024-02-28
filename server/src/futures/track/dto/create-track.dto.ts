import { ObjectId } from 'mongoose';

export class CreateTrackDto {
  readonly name: string;
  readonly text: string;
  readonly artistIds: ObjectId[];
  readonly albumId: ObjectId;
}
