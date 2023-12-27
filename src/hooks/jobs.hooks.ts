import { useState, useEffect } from 'react';

import { NewJob, ExistingJob } from '../models/jobs.models';
import { JobsService } from '../services/jobs.service';
import { notifyError, notifySuccess } from '../utils/notifications.utils';


export function useGetUserJobs() {
    const [jobs, setJobs] = useState<ExistingJob[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshJobs = async () => {
        setJobs([]);
        setIsLoading(true);
        try {
            const jobs = await JobsService.Get.getUserInSessionJobs();
            setJobs(jobs);
        } catch (error) { 
            notifyError(error);
        } finally { 
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refreshJobs();
    }, []);
    
    return {
        jobs,
        isLoading,
        refreshJobs
    };
}


export function useSaveNewJob() {
    const [isLoading, setIsLoading] = useState(false);

    const saveJob = async (job: NewJob) => {
        setIsLoading(true);
        try {
            await JobsService.Create.saveNewJob(job);
            notifySuccess('job-saved', 'Saved!', 'job added');
        } catch (error) {
            notifyError(error);
        } finally {
            setIsLoading(false);  
        }
    };

    return {
        saveJob,
        isLoading
    };
}


export function useUpdateJobArchiveStatus() {
    const [isLoading, setIsLoading] = useState(false);

    const togglejobArchiveStatus = async (jobId: string, isArchived: boolean) => {
        setIsLoading(true);
        try {
            await JobsService.Update.updateArchiveStatus(jobId, isArchived);
            notifySuccess('job-archived', 'Updated!', 'job archive status updated');
        } catch (error) { 
            notifyError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        togglejobArchiveStatus,
        isLoading
    };
}
