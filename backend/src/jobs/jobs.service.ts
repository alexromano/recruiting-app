import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';

import { Injectable, Logger } from '@nestjs/common';
import { getDbCollections } from '../db/utils';
import { ExtractionService } from '../extraction/extraction.service';

export type JobBoard = {
    url: string;
    image_url: string;
    slug: string;
    company: string;
    platform: string;
}

export type Job = {
    title: string;
    url: string;
}

export type JobDescription = {
    title: string;
    locations: string[] | null;
    yoe: string | null;
    salaryRange: string[] | null;
    // team?: string,
}


@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);
  constructor(private readonly extractionService: ExtractionService) {}

  async getJobs() {
    const {user, jobBoard} = getDbCollections();
    const oneUser = await user.findOne({})
    const keywords = oneUser ? oneUser.keywords : [];
    const jobBoards = await jobBoard.find({}).toArray();

    const jobDetails = await Bluebird.map(jobBoards, async (board) => {
      const extractor = this.extractionService.getExtractor(board.url);
      if  (!extractor) return [];
      const jobs = await extractor.getMatchingJobsFromBoard(board.url, keywords);
      const details = await Bluebird.map(jobs, async (job) => {
        const extractor = this.extractionService.getExtractor(job.url);
        if  (!extractor) return null;
        return extractor.getJobDetails(job.url);
      })
      return details.filter(detail => detail !== null);
    });

    return jobDetails.flat();
  }

  async addJobBoard(url: string) {
    const extractor = this.extractionService.getExtractor(url);
    if  (!extractor) return;

    const jobBoardDetails = await extractor.getJobBoardDetails(url);

    this.logger.log(`Adding job board ${url} with details ${JSON.stringify(jobBoardDetails)}`);
    const { jobBoard} = getDbCollections();
    await jobBoard.insertOne({
        id: uuidv4(),
        ...jobBoardDetails,
        created_at: new Date(),
        updated_at: new Date(),
    });
  }

  async getJobBoards() {
    const { jobBoard} = getDbCollections();
    return jobBoard.find({}).toArray();
  }

  async deleteJobBoard(url: string) {
    const { jobBoard } = getDbCollections();
    await jobBoard.deleteOne({ url });
  }

  
}
