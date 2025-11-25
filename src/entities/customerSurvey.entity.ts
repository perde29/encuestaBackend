import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Questions } from './questions.entity';

@Entity('customer_survey')
export class CustomerSurvey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, name: 'type_alternative' })
  typeAlternative: string;

  @Column({ type: 'varchar', length: 255 })
  answer: string;

  @Column({ type: 'int', name: 'id_alternative' })
  idAlternative: number;

  @ManyToOne(() => Customer, (csur) => csur.customerSurvey, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Questions, (csur) => csur.customerSurvey, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questions_id' })
  questions: Questions;
}
