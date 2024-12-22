"use client"

import React, { useState, useEffect } from 'react';
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as JobCard from "@/components/ui/job-card";
import { Job, fetchJobs } from "@/lib/api";


export default function Home() {
  const [url, setUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

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
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <JobCard.Skeleton key={index} />
              ))
            ): (
              jobs.map(job => (
                <JobCard.default key={job.id} job={job} />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
