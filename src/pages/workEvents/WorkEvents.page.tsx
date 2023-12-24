import { useGetUserWorkEvents } from '../../hooks/workEvents.hooks';

import { WorkTimeline } from './components/WorkTimeline';


export function WorkEvents() {
    const { workEvents, isLoading, refreshWorkEvents } = useGetUserWorkEvents();

    return (
        <>
            <WorkTimeline />

        </>
    );
}
