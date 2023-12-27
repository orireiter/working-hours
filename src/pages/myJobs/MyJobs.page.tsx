import { useGetUserJobs } from '../../hooks/jobs.hooks';

import { ExistingJobs } from './components/ExistingJobs';
import { AddNewJob } from './components/AddNewJob';


export function MyJobs() {
    const { jobs: existingJobs, isLoading: isLoadingExistingJobs, refreshJobs: refreshExistingJobs } = useGetUserJobs();

    return (
        <>
            <ExistingJobs jobs={existingJobs} isLoading={isLoadingExistingJobs} refreshExistingJobs={() => void refreshExistingJobs()}/>
            <AddNewJob refreshExistingJobs={() => void refreshExistingJobs()} isNoExistingJobs={!isLoadingExistingJobs && existingJobs.length === 0}/>
        </>
    );
}
