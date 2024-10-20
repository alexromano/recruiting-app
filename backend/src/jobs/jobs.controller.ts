import { Controller, Body, Post, Delete, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    getJobs() {
      return this.jobsService.getJobs();
    }
    
    @Post('board')
    addJobBoard(@Body() body: { url: string }) {
      return this.jobsService.addJobBoard(body.url);
    }

    @Get('board')
    getJobBoards() {
      return this.jobsService.getJobBoards();
    }

    @Delete('board')
    deleteJobBoard(@Body() body: { url: string }) {
      return this.jobsService.deleteJobBoard(body.url);
    }
}
