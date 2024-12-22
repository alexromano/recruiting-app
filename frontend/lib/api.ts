import axios from 'axios';

export type Job = {
    id: number;
    title: string;
    locations: string[] | null;
    yoe: string | null;
    salaryRange: string[] | null;
    image_url: string;
    slug: string;
    company: string;
    platform: string;
    url: string;
    posted: string;
};

const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get('http://localhost:8000/jobs');
    const data = await response.data;
    return data.map((job: Job, index: number) => ({...job, id: index}));
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
};

export { fetchJobs };