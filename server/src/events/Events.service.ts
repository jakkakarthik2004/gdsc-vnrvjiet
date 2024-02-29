import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './Events.model';
import { CreateEventDto } from './dto/CreateEventDto';
import { UpdateEventDto } from './dto/UpdateEventDto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private EventsRepository: typeof Events,
  ) {}

  async addEvent(payload: CreateEventDto): Promise<Events | undefined> {
    try {
      return await this.EventsRepository.create(payload);
    } catch (error) {
      console.error('Error while adding an Event:', error);
      throw error;
    }
  }

  async getAllEvents(): Promise<Events[] | undefined> {
    try {
      return await this.EventsRepository.findAll();
    } catch (error) {
      console.error('Error while getting an Event by ID:', error);
      throw error;
    }
  }

  async getUpcomingEvents(): Promise<Events[] | undefined> {
    try {
      const allEvents = await this.getAllEvents();
      const currentDate = new Date();
      const upcomingEvents = allEvents.filter(
        (event) => new Date(event.endDate) > currentDate,
      );
      upcomingEvents.reverse();
      return upcomingEvents;
    } catch (error) {
      console.error('Error while getting upcoming events:', error);
      throw error;
    }
  }

  async getPastEvents(): Promise<Events[] | undefined> {
    try {
      const allEvents = await this.getAllEvents();
      const currentDate = new Date();
      const pastEvents = allEvents.filter(
        (event) => new Date(event.endDate) < currentDate,
      );
      pastEvents.reverse();
      return pastEvents;
    } catch (error) {
      console.error('Error while getting past events:', error);
      throw error;
    }
  }

  async getEventById(eventId: number): Promise<Events | undefined> {
    try {
      return await this.EventsRepository.findOne({ where: { eventId } });
    } catch (error) {
      console.error('Error while getting an Event by ID:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: number): Promise<void> {
    try {
      await this.EventsRepository.destroy({ where: { eventId } });
    } catch (error) {
      console.error('Error while deleting an Event:', error);
      throw error;
    }
  }

  async updateEvent(payload: UpdateEventDto): Promise<Events | undefined> {
    try {
      const [numOfUpdatedRows] = await this.EventsRepository.update(payload, {
        where: { eventId: payload.eventId },
      });

      if (numOfUpdatedRows > 0) {
        const updatedEvent = await this.EventsRepository.findOne({
          where: { eventId: payload.eventId },
        });
        return updatedEvent || undefined;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error while updating an Event:', error);
      throw error;
    }
  }
}
