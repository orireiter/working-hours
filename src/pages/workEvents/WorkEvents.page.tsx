import { useGetUserWorkEvents } from '../../hooks/workEvents.hooks';
import { useGetUserJobs } from '../../hooks/jobs.hooks';

import { WorkTimeline } from './components/WorkTimeline';
import { AddNewWorkEvent } from './components/AddWorkEvent';


export function WorkEvents() {
    const { workEvents, isLoading, refreshWorkEvents } = useGetUserWorkEvents();
    const { jobs } = useGetUserJobs();

    return (
        <>
            <WorkTimeline workEvents={workEvents}/>
            <AddNewWorkEvent jobs={jobs} refreshExistingWorkEvents={() => void refreshWorkEvents()} isNoExistingWorkEvents={!isLoading && workEvents.length === 0}/>
        </>
    );
}
