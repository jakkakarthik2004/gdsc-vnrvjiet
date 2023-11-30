import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty()
  question?: string;

  @ApiProperty()
  answer?: string;

  @ApiProperty()
  answered?: number;
}
