import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty()
  eventId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  venue: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
