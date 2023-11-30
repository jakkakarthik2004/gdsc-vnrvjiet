import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './Questions.model';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { Users } from 'src/users/users.model';
import { UpdateQuestionDto } from './dto/UpdateQuestionDto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private QuestionsRepository: typeof Questions,
  ) {}

  async addQuestion(
    payload: CreateQuestionDto,
  ): Promise<Questions | undefined> {
    try {
      return await this.QuestionsRepository.create(payload);
    } catch (error) {
      console.error('Error while adding an Question:', error);
      throw error;
    }
  }

  async getAllQuestions(): Promise<Questions[] | undefined> {
    try {
      return await this.QuestionsRepository.findAll({
        include: [Users],
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.error('Error while getting an Question by ID:', error);
      throw error;
    }
  }

  async getQuestionById(questionId: number): Promise<Questions | undefined> {
    try {
      return await this.QuestionsRepository.findOne({
        where: { questionId },
        include: [Users],
      });
    } catch (error) {
      console.error('Error while getting an Question by ID:', error);
      throw error;
    }
  }

  async getUnAnsweredQuestions(): Promise<Questions[] | undefined> {
    try {
      return await this.QuestionsRepository.findAll({
        where: { answered: 0 },
        include: [Users],
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.error('Error while getting an Question by ID:', error);
      throw error;
    }
  }

  async getAnsweredQuestions(): Promise<Questions[] | undefined> {
    try {
      return await this.QuestionsRepository.findAll({
        where: { answered: 1 },
        include: [Users],
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.error('Error while getting an Question by ID:', error);
      throw error;
    }
  }

  async updateApproval(questionId: number): Promise<Questions | undefined> {
    try {
      const questionToUpdate = await this.QuestionsRepository.findByPk(
        questionId,
        { include: [Users] },
      );

      if (questionToUpdate) {
        questionToUpdate.answered = questionToUpdate.answered === 1 ? 0 : 1;
        await questionToUpdate.save();
        return questionToUpdate;
      }
      return undefined;
    } catch (error) {
      console.error('Error while updating a Question:', error);
      throw error;
    }
  }

  async update(
    questionId: number,
    payload: UpdateQuestionDto,
  ): Promise<Questions> {
    const data = payload['payload'];
    const question = await this.QuestionsRepository.findByPk(questionId);
    if (data.answer !== undefined) question.answer = data.answer;
    if (data.answered !== undefined) question.answered = data.answered;
    await question.save();
    return question;
  }

  async deleteQuestion(questionId: number): Promise<void> {
    try {
      await this.QuestionsRepository.destroy({ where: { questionId } });
    } catch (error) {
      console.error('Error while deleting an Question:', error);
      throw error;
    }
  }
}
