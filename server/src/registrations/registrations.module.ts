import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registrations } from './registrations.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from 'src/events/Events.model';

@Module({
  imports: [SequelizeModule.forFeature([Registrations, Events])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
