import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Questions } from './questions.entity';
import { Category } from './category.entity';

@Entity('category_questions')
export class CategoryQuestions {
  @PrimaryColumn({ name: 'questions_id' })
  questionsId: number;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Questions, (que) => que.categoryQuestions, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questions_id' })
  questions: Questions;

  @ManyToOne(() => Category, (que) => que.categoryQuestions, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  /*
const catq = await categoryQuestionsRepository.findOne({ where: { questionsId: 1 } });
// catq.category ❌ NO estará disponible a menos que uses relations:
const catqWithRel = await categoryQuestionsRepository.findOne({
  where: { questionsId: 1 },
  relations: ['category'],
});
*/
}
