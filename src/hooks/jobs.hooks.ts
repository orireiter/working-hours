import { useState } from 'react';

import { NewJob } from '../models/jobs.models';
import { saveNewJob, getUserInSessionJobs } from '../services/jobs.service';
import { notifyError } from '../utils/notifications.utils';


export function useGetUserJobs() {
    const [isLoading, setIsLoading] = useState(false);

    const getJobs = async () => {
        let jobs = [];
        setIsLoading(true);
        try {
            jobs = await getUserInSessionJobs();
        } catch (error) {
            notifyError(error);
        } finally {
            setIsLoading(false);  
        }

        return jobs;
    };

    return {
        getJobs,
        isLoading
    };
}


export function useSaveNewJob() {
    const [isLoading, setIsLoading] = useState(false);

    const saveJob = async (job: NewJob) => {
        setIsLoading(true);
        try {
            await saveNewJob(job);
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
