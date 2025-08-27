import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Questionary } from './questionary.entity';
import { Exclude } from '@nestjs/class-transformer';
import { Alternative } from './alternative.entity';
import { CategoryQuestions } from './categoryQuestions.entity';

@Entity('questions')
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Questionary, (que) => que.questions)
  @JoinColumn({ name: 'questionary_id' })
  questionary: Questionary;
  /**/

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'input_type', type: 'int', select: false })
  inputType: number;

  @CreateDateColumn({
    name: 'date_insert',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  dateInsert: Date;

  @Column({
    name: 'user_insert',
    type: 'int',
  })
  @Exclude()
  userInsert: number;

  @UpdateDateColumn({
    name: 'date_update',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  dateUpdate: Date;

  @Column({
    name: 'user_update',
    type: 'int',
  })
  @Exclude()
  userUpdate: number;

  @Column({
    type: 'int',
  })
  status: number;

  @Column({
    name: 'all_sectors',
    type: 'int',
  })
  allSectors: number;

  //questionnaire_response
  @Column({
    name: 'questionnaire_response',
    type: 'int',
  })
  questionnaireResponse: number;

  @BeforeInsert()
  async setInsert() {
    this.dateInsert = new Date();
  }

  @BeforeUpdate()
  async setUpdate() {
    this.dateUpdate = new Date();
  }

  @OneToMany(() => Alternative, (alternative) => alternative.questions)
  alternative: Alternative[];

  @OneToMany(
    () => CategoryQuestions,
    (categoryQuestions) => categoryQuestions.questions,
  )
  categoryQuestions: CategoryQuestions[];
}
