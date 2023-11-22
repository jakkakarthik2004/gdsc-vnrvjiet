import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @Column({
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
  })
  isAdmin: number;
}
