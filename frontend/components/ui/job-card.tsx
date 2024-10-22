
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton as ShadCNSkeleton } from "@/components/ui/skeleton";
import { Job } from '@/lib/api';

export default function JobCard({ job: { id, title, company, posted, locations, yoe, salaryRange } }: { job: Job }) {
  return (
    <Card key={id}>
        <CardHeader>
            <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{company}</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">{posted}</span>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">{locations ? locations.join(', ') : ""}</span>
            <span className="text-sm text-muted-foreground">{yoe || ""}</span>
            <span className="text-sm text-muted-foreground">{salaryRange ? salaryRange.join('-'): ""}</span>
            </div>
        </CardContent>
    </Card>
  )
}

export function Skeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <ShadCNSkeleton className="h-5 w-[250px]" />
            <ShadCNSkeleton className="h-4 w-[200px]" />
          </div>
          <ShadCNSkeleton className="h-4 w-[100px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <ShadCNSkeleton className="h-4 w-[150px]" />
          <ShadCNSkeleton className="h-4 w-[100px]" />
          <ShadCNSkeleton className="h-4 w-[120px]" />
        </div>
      </CardContent>
    </Card>
  )
}