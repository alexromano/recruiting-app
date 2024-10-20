export interface JobBoard {
    id: string;
    url: string;
    company: string;
    slug: string;
    platform: string;
    created_at: Date;
    updated_at: Date;
}
export interface JobPosting {
    id: string;
    company_id: string;
    title: string;
    url: string;
    locations: string[];
    salary_range: string[];
    yoe: string;
    created_at: Date;
    updated_at: Date;
}
export interface User {
    keywords: string[];
}
