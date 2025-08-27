import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
