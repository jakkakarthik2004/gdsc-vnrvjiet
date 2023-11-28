import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answered?: number;
}
