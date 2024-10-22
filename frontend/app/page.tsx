"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      posted: "1 week ago"
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 3,
      title: `Position ${i + 3}`,
      company: `Company ${i + 3}`,
      location: "Remote",
      type: "Full-time",
      posted: "3 days ago"
    }))
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted URL:', url);
    setUrl('');
    setIsDialogOpen(false);
  };
  return (
    <div className="p-8 h-screen flex flex-col items-center">
      {/* Container with max-width */}
      <div className="w-full min-w-[64rem] max-w-2xl">
        {/* Header with Add Company button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Company</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Company URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://company.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Add Company</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Scrollable job listings */}
        <ScrollArea className="flex-grow rounded-md border h-[calc(100vh-8rem)]">
          <div className="p-4 space-y-4">
            {jobs.map(job => (
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
                    <span className="text-sm text-muted-foreground">{job.type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
