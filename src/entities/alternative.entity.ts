import { Exclude } from '@nestjs/class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity('alternative')
export class Alternative {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Questions, (que) => que.alternative)
  @JoinColumn({ name: 'questions_id' })
  questions: Questions;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Exclude()
  @CreateDateColumn({
    name: 'date_insert',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateInsert: Date;

  @Exclude()
  @Column({ name: 'user_insert', type: 'int' })
  userInsert: number;

  @Exclude()
  @UpdateDateColumn({
    name: 'date_update',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdate;

  @Exclude()
  @Column({ name: 'user_update', type: 'int' })
  userUpdate: number;

  @BeforeInsert()
  async setInsert() {
    this.dateInsert = new Date();
  }

  @BeforeUpdate()
  async setUpdate() {
    this.dateUpdate = new Date();
  }
}
