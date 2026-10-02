import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { AppResources } from 'src/app.roles';

@ApiTags('Categoria')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.USER,
  })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Post('views-surveys')
  async viewsSurveysAction(@Body() data: any) {
    return await this.categoryService.viewsSurveysAction(data);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get('all-active')
  async findAllActive() {
    return await this.categoryService.findAllActive();
  }

  @Get('questionnaire-list')
  async questionnaireList() {
    return await this.categoryService.questionnaireList();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.USER,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResources.USER,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('id', id);

    return await this.categoryService.remove(+id);
  }
}
