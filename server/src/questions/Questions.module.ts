import { Module } from '@nestjs/common';
import { QuestionsController } from './Questions.controller';
import { QuestionsService } from './Questions.service';
import { Questions } from './Questions.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Questions, Users])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
