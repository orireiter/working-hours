import { useState, useEffect } from 'react';

import { NewJob, ExistingJob } from '../models/jobs.models';
import { saveNewJob, getUserInSessionJobs } from '../services/jobs.service';
import { notifyError, notifySuccess } from '../utils/notifications.utils';


export function useGetUserJobs() {
    const [jobs, setJobs] = useState<ExistingJob[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshJobs = async () => {
        setJobs([]);
        setIsLoading(true);
        try {
            const jobs = await getUserInSessionJobs();
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
            await saveNewJob(job);
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
