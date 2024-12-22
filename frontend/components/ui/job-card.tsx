import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton as ShadCNSkeleton } from "@/components/ui/skeleton";
import { Job } from '@/lib/api';

export default function JobCard({ job: { id, title, url, image_url, company, posted, locations, yoe, salaryRange } }: { job: Job }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Card key={id}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <img className="w-16 h-16 object-contain" src={image_url} alt={title} />
            <div className="ml-4">
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground ml-auto">{posted}</span>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <CardDescription>{company}</CardDescription>
          <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">{locations ? locations.join(', ') : ""}</span>
            <span className="text-sm text-muted-foreground">{yoe || ""}</span>
            <span className="text-sm text-muted-foreground">{salaryRange ? salaryRange.join('-') : ""}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
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
          {/* Add skeleton content here if needed */}
        </div>
      </CardContent>
    </Card>
  );
}