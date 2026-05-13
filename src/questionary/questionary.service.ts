import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionary } from '@/entities/questionary.entity';
import { CustomerSurvey } from '@/entities/customer-survey.entity';
import { Repository } from 'typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { AlternativeService } from 'src/alternative/alternative.service';

@Injectable()
export class QuestionaryService {
  constructor(
    @InjectRepository(Questionary)
    private readonly questionaryRepository: Repository<Questionary>,
    @InjectRepository(CustomerSurvey)
    private readonly customerSurveyRepository: Repository<CustomerSurvey>,
    private readonly questionsService: QuestionsService,
    private readonly alternativeService: AlternativeService,
  ) {}

  async create(createQuestionaryDto: CreateQuestionaryDto, userId) {
    const dat = await this.questionaryRepository.findOne({
      where: { title: createQuestionaryDto.title },
    });

    if (dat)
      throw new NotFoundException(
        'Ya existe un Cuestionario con el mismo nombre.',
      );

    const post = this.questionaryRepository.create({
      ...createQuestionaryDto,
      userInsert: userId,
    });
    const questionary = await this.questionaryRepository.save(post);
    delete questionary.userInsert;
    delete questionary.dateInsert;
    return questionary;
  }

  async findAll(): Promise<Questionary[]> {
    return await this.questionaryRepository.find({
      order: {
        orden: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const post = this.questionaryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Questionary does not exist');
    return await post;
  }

  async update(id: number, updateQuestionaryDto: UpdateQuestionaryDto) {
    const post = this.questionaryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Questionary does not exist');
    await this.questionaryRepository.update(id, updateQuestionaryDto);
    return this.questionaryRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const surveys = await this.customerSurveyRepository
      .createQueryBuilder('cs')
      .innerJoin('cs.questions', 'q')
      .innerJoin('q.questionary', 'qn')
      .where('qn.id = :id', { id })
      .getMany();

    if (surveys.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar el cuestionario porque tiene respuestas registradas.',
      );
    }

    await this.alternativeService.removeByQuestionaryId(id);
    await this.questionsService.removeByQuestionaryId(id);
    return this.questionaryRepository.delete(id);
  }

  async updateOrden(id: number, updateQuestionaryDto: UpdateQuestionaryDto) {
    console.log(id);

    const post = this.questionaryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Questionary does not exist');

    await this.questionaryRepository.update(id, {
      ...updateQuestionaryDto,
    });

    const valores2 = await this.questionaryRepository
      .createQueryBuilder('q')
      .select(['q.id', 'q.orden'])
      .orderBy('q.orden', 'ASC')
      .getMany();

    valores2.forEach((item, index) => {
      let indice = index + 1;
      if (item.id != id) {
        if (indice === updateQuestionaryDto.orden && indice == 1) {
          indice = indice + 1;
        }

        this.questionaryRepository.update(item.id, { orden: indice });
        /*
         const idItem = item.id;
         this.questionaryRepository.createQueryBuilder()
          .update('questionary').set({ indice })
          .where('id = :id', { idItem }).execute();
        */
      }
    });
  }

  async lastOrden() {
    return await this.questionaryRepository
      .createQueryBuilder('q')
      .select(['q.id', 'q.orden'])
      .orderBy('q.orden', 'DESC')
      .limit(1)
      .getOne();
  }
}
