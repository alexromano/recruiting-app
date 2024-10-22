
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Job } from '@/lib/api';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card key={job.id}>
        <CardHeader>
            <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">{job.posted}</span>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">{job.location}</span>
            <span className="text-sm text-muted-foreground">{job.yoe}</span>
            <span className="text-sm text-muted-foreground">{job.salaryBand.join(' - ')}</span>
            </div>
        </CardContent>
    </Card>
  )
}
