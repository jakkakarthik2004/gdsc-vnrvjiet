import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { QuestionsService } from './Questions.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { Questions } from './Questions.model';

@Controller('Questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly QuestionsService: QuestionsService) {}

  @Post('create')
  async addQuestion(
    @Body() payload: CreateQuestionDto,
  ): Promise<Questions | undefined> {
    return this.QuestionsService.addQuestion(payload);
  }

  @Get('/get-Questions')
  async getAllQuestions() {
    return this.QuestionsService.getAllQuestions();
  }

  @Get('/get-unanswered-questions')
  async getUnAnsweredQuestions() {
    return this.QuestionsService.getUnAnsweredQuestions();
  }

  @Get('/get-answered-questions')
  async getAnsweredQuestions() {
    return this.QuestionsService.getAnsweredQuestions();
  }

  @Get('/get-QuestionId/:id')
  async getQuestionById(@Param('id') questionId: number) {
    return this.QuestionsService.getQuestionById(questionId);
  }

  @Put('/update-answer/:id')
  async updateAnswer(
    @Param('id') questionId: number,
    @Body() payload: { answer: string },
  ) {
    return this.QuestionsService.updateAnswer(questionId, payload.answer);
  }

  @Put('/update-approval/:id')
  async update(@Param('id') questionId: number) {
    return this.QuestionsService.updateApproval(questionId);
  }

  @Delete('/delete-by-id/:id')
  async deleteQuestion(@Param('id') questionId: number) {
    return this.QuestionsService.deleteQuestion(questionId);
  }
}
