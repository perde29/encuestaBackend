import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryQuestions } from './categoryQuestions.entity';

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
  /**/
}
