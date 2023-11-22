import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Registrations extends Model<Registrations> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  userId: number;

  @Column({
    type: DataType.SMALLINT,
  })
  eventId: number;
}
