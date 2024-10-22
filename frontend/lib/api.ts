import axios from 'axios';

export type Job = {
    id: number;
    title: string;
    company: string;
    yoe: string;
    salaryBand: string[];
    location: string;
    posted: string;
};

const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get('http://localhost:8000/jobs');
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
};

export { fetchJobs };