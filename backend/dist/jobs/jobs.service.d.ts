import { ExtractionService } from '../extraction/extraction.service';
export type JobBoard = {
    url: string;
    slug: string;
    company: string;
    platform: string;
};
export type Job = {
    title: string;
    url: string;
};
export type JobDescription = {
    locations: string[] | null;
    yoe: string | null;
    salaryRange: string[] | null;
};
export declare class JobsService {
    private readonly extractionService;
    private readonly logger;
    constructor(extractionService: ExtractionService);
    getJobs(): Promise<JobDescription[]>;
    addJobBoard(url: string): Promise<void>;
    getJobBoards(): Promise<import("mongodb").WithId<import("../db/model").JobBoard>[]>;
    deleteJobBoard(url: string): Promise<void>;
}
