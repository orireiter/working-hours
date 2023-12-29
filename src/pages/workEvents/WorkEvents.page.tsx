import { useGetUserWorkEvents } from '../../hooks/workEvents.hooks';

import { WorkTimeline } from './components/WorkTimeline';
import { AddNewWorkEvent } from './components/AddWorkEvent';


export function WorkEvents() {
    const { workEvents, isLoading, refreshWorkEvents } = useGetUserWorkEvents();

    return (
        <>
            <WorkTimeline />
            <AddNewWorkEvent refreshExistingWorkEvents={() => void refreshWorkEvents()} isNoExistingWorkEvents={!isLoading && workEvents.length === 0}/>
        </>
    );
}
