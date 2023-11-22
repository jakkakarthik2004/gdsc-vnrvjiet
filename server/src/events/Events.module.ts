import { Module } from '@nestjs/common';
import { EventsController } from './Events.controller';
import { EventsService } from './Events.service';
import { Events } from './Events.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Events])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
