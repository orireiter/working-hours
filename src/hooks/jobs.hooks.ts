import { useState } from 'react';

import { notifyError } from '../utils/notifications.utils';
import { NewJob } from '../models/jobs.models';
import { saveNewJob } from '../services/jobs.service';


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
