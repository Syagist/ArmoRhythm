import { ObjectId } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Hotel California', description: 'Track name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Welcome to the hotel California',
    description: 'Track lyrics',
  })
  @IsString()
  @ApiPropertyOptional()
  text: string;

  @ApiProperty({
    example: ['65e185b34e390c07443d36fa', '65e185b34e390c07443d36fa'],
    description: 'Enter Artist Id',
  })
  @ApiPropertyOptional()
  artistIds: ObjectId[];

  @ApiProperty({ example: '65e21266e827b14ba3f97a26', description: 'Album ID' })
  @ApiPropertyOptional()
  albumId: ObjectId;
}
