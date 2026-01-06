import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { CategoryQuestions } from './category-questions.entity';
import { Customer } from './customer.entity';
import { Questions } from './questions.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  state: number;

  @ManyToMany(() => Questions, (question) => question.categories)
  @JoinTable({
    name: 'category_questions',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'questions_id',
      referencedColumnName: 'id',
    },
  })
  questions: Questions[];

  @OneToMany(() => Customer, (customer) => customer.category)
  customer: Customer[];
}
