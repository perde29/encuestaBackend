import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryQuestions } from './categoryQuestions.entity';
import { Customer } from './customer.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  state: number;

  @OneToMany(
    () => CategoryQuestions,
    (categoryQuestions) => categoryQuestions.category,
  )
  categoryQuestions: CategoryQuestions[];

  @OneToMany(() => Customer, (customer) => customer.category)
  customer: Customer[];
}
