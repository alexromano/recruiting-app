import * as cheerio from 'cheerio';
import axios from 'axios';

import { Extractor } from './extraction.service';
import { JobBoard, Job, JobDescription } from 'src/jobs/jobs.service';
import { cityParse, cleanText } from './utils';

export class LeverExtractor implements Extractor {
    async getJobBoardDetails(url: string): Promise<JobBoard> {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('title').text();
        
        return {
            url,
            slug: url.split('/').pop() || '',
            company: title,
            platform: 'lever',
        };
    }

    async getMatchingJobsFromBoard(url: string, keywords: string[]): Promise<Job[]> { 
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const jobs:Job[] = [];
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
    
    };

    async getJobDetails(url: string): Promise<JobDescription> {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('div.posting-headline h2').text();

        const categoriesElement = $('div.posting-headline div.posting-categories');
        const categories:string[] = [];
        categoriesElement.children().each((_, element) => {
            categories.push(...cleanText($(element).text()));
        });

        const rawDescription = $('body > div.content-wrapper.posting-page > div > div:nth-child(2)');

        const salaryRegex = /\$\d{1,3}(?:,\d{3})\s*-\s*\$\d{1,3}(?:,\d{3})/;
        const salaryMatch = rawDescription.text().match(salaryRegex);
        const salaryRange = salaryMatch ? salaryMatch[0].split('-') : null;

        const liElements = rawDescription.find('li');
        const yoe = liElements.toArray().reduce((result, element) => {
            if (result) return result; // Return early if a match is already found
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
            title,
            locations: cityParse(categories),
            yoe,
            salaryRange,
        }
    }
}