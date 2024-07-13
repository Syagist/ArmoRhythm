import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: '2pac', description: 'Artist name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Artist cover picture',
  })
  @ApiPropertyOptional()
  picture: any;

  @ApiProperty({
    example: ['albumId1', 'albumId2'],
    description: 'Array of artist IDs',
  })
  @ApiPropertyOptional()
  albumIds?: string[];
}
