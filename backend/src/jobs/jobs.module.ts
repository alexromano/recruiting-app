import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ExtractionService } from '../extraction/extraction.service';
import { JobsController } from './jobs.controller';

@Module({
    controllers: [JobsController],
    providers: [JobsService, ExtractionService],
})
export class JobsModule {}
