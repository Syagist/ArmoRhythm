import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'California Vibes', description: 'Album name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Album cover picture',
  })
  @ApiPropertyOptional()
  picture: any;

  @ApiProperty({
    example: ['artistId1', 'artistId2'],
    description: 'Array of artist IDs',
  })
  @ApiPropertyOptional()
  artistIds: string[];
}
