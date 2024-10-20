import { JobBoard, Job, JobDescription } from 'src/jobs/jobs.service';
export interface Extractor {
    getJobBoardDetails(url: string): Promise<JobBoard>;
    getMatchingJobsFromBoard(url: string, keywords: string[]): Promise<Job[]>;
    getJobDetails(url: string): Promise<JobDescription>;
}
export declare class ExtractionService {
    getExtractor(url: string): Extractor | null;
}
