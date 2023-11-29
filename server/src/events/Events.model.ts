import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Events extends Model<Events> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  eventId: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  time: string;

  @Column({
    type: DataType.STRING,
  })
  startDate: string;

  @Column({
    type: DataType.STRING,
  })
  endDate: string;

  @Column({
    type: DataType.STRING,
  })
  venue: string;

  // @Column({
  //   type: DataType.STRING,
  // })
  // image: string;
}
