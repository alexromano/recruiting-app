"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeverExtractor = void 0;
const cheerio_1 = require("cheerio");
const axios_1 = require("axios");
const utils_1 = require("./utils");
class LeverExtractor {
    async getJobBoardDetails(url) {
        const response = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(response.data);
        const title = $('title').text();
        return {
            url,
            slug: url.split('/').pop() || '',
            company: title,
            platform: 'lever',
        };
    }
    async getMatchingJobsFromBoard(url, keywords) {
        const response = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(response.data);
        const jobs = [];
        const postingTitleElements = $('div.postings-group div.posting a.posting-title');
        postingTitleElements.each((_, element) => {
            const postingName = $(element).find('h5[data-qa="posting-name"]').text().toLowerCase();
            if (keywords.some(keyword => postingName.includes(keyword))) {
                const postingURL = $(element).attr('href') || "";
                jobs.push({
                    title: postingName,
                    url: postingURL
                });
            }
        });
        return jobs;
    }
    ;
    async getJobDetails(url) {
        const response = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(response.data);
        const headline = $('div.posting-headline div.posting-categories');
        const categories = [];
        headline.children().each((_, element) => {
            categories.push(...(0, utils_1.cleanText)($(element).text()));
        });
        const rawDescription = $('body > div.content-wrapper.posting-page > div > div:nth-child(2)');
        const salaryRegex = /\$\d{1,3}(?:,\d{3})\s*-\s*\$\d{1,3}(?:,\d{3})/;
        const salaryMatch = rawDescription.text().match(salaryRegex);
        const salaryRange = salaryMatch ? salaryMatch[0].split('-') : null;
        const liElements = rawDescription.find('li');
        const yoe = liElements.toArray().reduce((result, element) => {
            if (result)
                return result;
            const text = $(element).text().toLowerCase();
            if (text.includes('years')) {
                const plusRegex = /\d{1,2}\+/;
                const intervalRegex = /\d{1,2}\s*-\s*\d{1,2}/;
                const atLeastRegex = /at least \d{1,2}/;
                const match = text.match(plusRegex) || text.match(intervalRegex) || text.match(atLeastRegex);
                return match ? match[0] : null;
            }
            return null;
        }, null);
        return {
            locations: (0, utils_1.cityParse)(categories),
            yoe,
            salaryRange,
        };
    }
}
exports.LeverExtractor = LeverExtractor;
//# sourceMappingURL=lever.js.map