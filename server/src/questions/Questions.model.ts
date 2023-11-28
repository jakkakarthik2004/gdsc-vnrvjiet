import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class Questions extends Model<Questions> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  questionId: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column({
    type: DataType.TEXT,
  })
  question: string;

  @Column({
    type: DataType.TEXT,
  })
  answer: string;

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
  })
  answered: number;
}
