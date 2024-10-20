import { Extractor } from './extraction.service';
import { JobBoard, Job, JobDescription } from 'src/jobs/jobs.service';
export declare class LeverExtractor implements Extractor {
    getJobBoardDetails(url: string): Promise<JobBoard>;
    getMatchingJobsFromBoard(url: string, keywords: string[]): Promise<Job[]>;
    getJobDetails(url: string): Promise<JobDescription>;
}
