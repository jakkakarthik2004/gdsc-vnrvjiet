import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Events } from 'src/events/Events.model';

@Table
export class Registrations extends Model<Registrations> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  userId: number;

  @ForeignKey(() => Events)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  eventId: number;

  @BelongsTo(() => Events)
  event: Events;
}
