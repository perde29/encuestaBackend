import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Customer } from '@/entities/customer.entity';
import { CustomerSurvey } from '@/entities/customer-survey.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerSurvey)
    private readonly customerSurveyRepository: Repository<CustomerSurvey>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const post = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(post);
  }

  async surveySection(categoryId: number) {
    /* 
     $sql = "SELECT DISTINCT qnary.id,qnary.orden
                FROM questionary qnary
                INNER JOIN questions qons  ON qnary.id = qons.questionary_id
                INNER JOIN category_questions cateques ON qons.id = cateques.questions_id
                WHERE qnary.status = 1 AND cateques.category_id = :category_id AND qons.status = '1'
                ORDER BY qnary.orden asc";

        $conn = $this->getEntityManager()->getConnection();
        $stmt = $conn->prepare($sql);
        $result = $stmt->executeQuery(['category_id' => $sector]);

        return $result->fetchAllAssociative();
    */
  }

  async viewsSurveysAction(data: any) {
    const { categoryId, orden } = data;

    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoin('category.questions', 'question')
      .innerJoin('question.questionary', 'questionary')
      .select('questionary.id', 'questionary_id')
      .addSelect('questionary.title', 'title')
      .addSelect('questionary.orden', 'orden')
      .addSelect('question.id', 'id_pregunta')
      .addSelect('question.title', 'pregunta')
      .addSelect('question.inputType', 'input_type')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('questionary.status = :status', { status: 1 })
      .andWhere('question.status = :questionStatus', { questionStatus: 1 })
      .andWhere('questionary.orden = :orden', { orden })
      .orderBy('questionary.orden', 'ASC')
      .getRawMany();
  }

  /*
   public function viewsSurvey2($sector, $orden) {

      $sql = "SELECT qnary.id AS questionary_id, qnary.title , qnary.orden , qons.id AS id_pregunta, qons.title AS pregunta , qons.input_type 
              FROM questionary qnary
              INNER JOIN questions qons  ON qnary.id = qons.questionary_id
              INNER JOIN category_questions cateques ON qons.id = cateques.questions_id
              WHERE qnary.status = 1 
                  AND qons.status = 1
                  AND cateques.category_id = :category_id 
                  AND qnary.orden = :orden
              ORDER BY orden;";

      $conn = $this->getEntityManager()->getConnection();
      $stmt = $conn->prepare($sql);
      $result = $stmt->executeQuery(['category_id' => $sector, 'orden' => $orden ]); // [ 'questions_id' => $id ]

      return $result->fetchAllAssociative();

   }
  */

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findAllActive(): Promise<Category[]> {
    return await this.categoryRepository.find({ where: { state: 1 } });
  }

  async findOne(id: number) {
    const post = this.categoryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Category does not exist');
    return await post;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const post = await this.categoryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Category does not exist');
    const editPost = Object.assign(post, updateCategoryDto);
    return await this.categoryRepository.save(editPost);
  }

  async questionnaireList() {
    const post = await this.categoryRepository
      .createQueryBuilder('c')
      .select('c.id', 'id')
      .addSelect('c.title', 'title')
      .addSelect(
        "case when c.state = 1 THEN 'Ativo' else 'Inativo' end",
        'state',
      )
      .getRawMany();
    return await post;
  }

  /*
  async viewsSurveys(id: number) {
    return await this.categoryRepository.manager.query(
      `SELECT qnary.id AS questionary_id, qnary.title, qons.id AS id_pregunta, qons.title AS pregunta, qons.input_type
       FROM questionary qnary
       INNER JOIN questions qons ON qnary.id = qons.questionary_id
       INNER JOIN category_questions cateques ON qons.id = cateques.questions_id
       WHERE qnary.status = 1 AND cateques.category_id = ? AND qons.status = '1'
       ORDER BY orden`,
      [id],
    );
  }
  */

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { category: { id } },
    });

    if (customer) {
      const customerSurveys = await this.customerSurveyRepository.find({
        where: { customer: { category: { id } } },
      });

      if (customerSurveys.length > 0) {
        throw new NotFoundException(
          'No se puede eliminar el Sector porque tiene encuestas asociadas.',
        );
      }

      await this.customerRepository.delete({ category: { id } });
    }

    return await this.categoryRepository.delete(id);
  }
}
