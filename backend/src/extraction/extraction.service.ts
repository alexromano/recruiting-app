import { JobBoard, Job, JobDescription } from 'src/jobs/jobs.service';
import { LeverExtractor } from './lever';

import { Injectable } from '@nestjs/common';

export interface Extractor {
    getJobBoardDetails(url: string): Promise<JobBoard>;
    getMatchingJobsFromBoard(url: string, keywords: string[]): Promise<Job[]>;
    getJobDetails(url: string): Promise<JobDescription>;
}

@Injectable()
export class ExtractionService {
    getExtractor(url: string): Extractor | null {
        const parsedURL = URL.parse(url);
        console.log(parsedURL);
        if (!parsedURL) throw new Error(`Failed to parse URL: ${url}`);

        const domain = parsedURL.hostname;
        console.log(domain);
        if (domain.includes('lever.co')) {
            return new LeverExtractor();
        }
        return null;
    }
}