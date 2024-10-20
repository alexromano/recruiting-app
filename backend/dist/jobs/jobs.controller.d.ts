import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(): Promise<import("./jobs.service").JobDescription[]>;
    addJobBoard(body: {
        url: string;
    }): Promise<void>;
    getJobBoards(): Promise<import("mongodb").WithId<import("../db/model").JobBoard>[]>;
    deleteJobBoard(body: {
        url: string;
    }): Promise<void>;
}
