"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const bluebird_1 = require("bluebird");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const utils_1 = require("../db/utils");
const extraction_service_1 = require("../extraction/extraction.service");
let JobsService = JobsService_1 = class JobsService {
    constructor(extractionService) {
        this.extractionService = extractionService;
        this.logger = new common_1.Logger(JobsService_1.name);
    }
    async getJobs() {
        const { user, jobBoard } = (0, utils_1.getDbCollections)();
        const oneUser = await user.findOne({});
        const keywords = oneUser ? oneUser.keywords : [];
        const jobBoards = await jobBoard.find({}).toArray();
        const jobDetails = await bluebird_1.Promise.map(jobBoards, async (board) => {
            const extractor = this.extractionService.getExtractor(board.url);
            if (!extractor)
                return [];
            const jobs = await extractor.getMatchingJobsFromBoard(board.url, keywords);
            const details = await bluebird_1.Promise.map(jobs, async (job) => {
                const extractor = this.extractionService.getExtractor(job.url);
                if (!extractor)
                    return null;
                return extractor.getJobDetails(job.url);
            });
            return details.filter(detail => detail !== null);
        });
        return jobDetails.flat();
    }
    async addJobBoard(url) {
        const extractor = this.extractionService.getExtractor(url);
        if (!extractor)
            return;
        console.log(extractor);
        const jobBoardDetails = await extractor.getJobBoardDetails(url);
        this.logger.log(`Adding job board ${url} with details ${JSON.stringify(jobBoardDetails)}`);
        const { jobBoard } = (0, utils_1.getDbCollections)();
        await jobBoard.insertOne({
            id: (0, uuid_1.v4)(),
            ...jobBoardDetails,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
    async getJobBoards() {
        const { jobBoard } = (0, utils_1.getDbCollections)();
        return jobBoard.find({}).toArray();
    }
    async deleteJobBoard(url) {
        const { jobBoard } = (0, utils_1.getDbCollections)();
        await jobBoard.deleteOne({ url });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = JobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [extraction_service_1.ExtractionService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map