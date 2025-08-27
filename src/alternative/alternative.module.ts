import { Module } from '@nestjs/common';
import { AlternativeService } from './alternative.service';
import { AlternativeController } from './alternative.controller';
import { EntitiesModule } from '@/entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [AlternativeController],
  providers: [AlternativeService],
})
export class AlternativeModule {}
