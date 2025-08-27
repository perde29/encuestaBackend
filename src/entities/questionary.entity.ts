import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity('questionary')
export class Questionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, select: true })
  title: string;

  @Column({ type: 'int' })
  status: number;

  @Column({
    name: 'date_insert',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateInsert: Date;

  @Column({
    name: 'user_insert',
    type: 'int',
  })
  userInsert: number;

  @Column({
    name: 'date_update',
    type: 'timestamp',
  })
  dateUpdate: Date;

  @Column({
    name: 'user_update',
    type: 'int',
  })
  userUpdate: number;

  @Column({
    name: 'orden',
    type: 'int',
  })
  orden: number;

  @BeforeUpdate()
  async setUpdate() {
    this.dateUpdate = new Date();
  }

  @BeforeInsert()
  async setInsert() {
    this.dateInsert = new Date();
  }

  @OneToMany(() => Questions, (questions) => questions.questionary)
  questions: Questions[];
}
