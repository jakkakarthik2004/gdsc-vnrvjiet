import { Injectable } from '@nestjs/common';
import { Registrations } from './registrations.model';

@Injectable()
export class RegistrationsService {
  async updateRegistration(
    userId: number,
    eventId: number,
  ): Promise<Registrations> {
    try {
      const existingRegistration = await Registrations.findOne({
        where: { userId, eventId },
      });

      if (existingRegistration) {
        await existingRegistration.destroy();
      } else {
        await Registrations.create({ userId, eventId });
        const created = await Registrations.findOne({
          where: { userId, eventId },
        });
        return created;
      }
    } catch (error) {
      throw new Error(`Failed to update registration: ${error.message}`);
    }
  }

  async getAllRegistrationsByUserId(userId: number): Promise<Registrations[]> {
    try {
      return await Registrations.findAll({ where: { userId } });
    } catch (error) {
      throw new Error(
        `Failed to get registrations by user ID: ${error.message}`,
      );
    }
  }

  async getAllRegistrationsByEventId(
    eventId: number,
  ): Promise<Registrations[]> {
    try {
      return await Registrations.findAll({ where: { eventId } });
    } catch (error) {
      throw new Error(
        `Failed to get registrations by event ID: ${error.message}`,
      );
    }
  }
}
