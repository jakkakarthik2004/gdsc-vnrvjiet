import { Controller, Post, Param, Get } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { ApiTags } from '@nestjs/swagger';
import { Registrations } from './registrations.model';

@Controller('registrations')
@ApiTags('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('/update/:userId/:eventId')
  async updateRegistration(
    @Param('userId') userId: number,
    @Param('eventId') eventId: number,
  ): Promise<Registrations> {
    return this.registrationsService.updateRegistration(userId, eventId);
  }

  @Get('/get-all-by-user/:userId')
  async getAllRegistrationsByUserId(@Param('userId') userId: number) {
    return this.registrationsService.getAllRegistrationsByUserId(userId);
  }

  @Get('/get-all-by-event/:eventId')
  async getAllRegistrationsByEventId(@Param('eventId') eventId: number) {
    return this.registrationsService.getAllRegistrationsByEventId(eventId);
  }
}
