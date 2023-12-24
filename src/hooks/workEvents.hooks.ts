import { useState, useEffect } from 'react';

import { ExistingWorkEvent } from '../models/workEvents.models';
import { getUserInSessionWorkEvents } from '../services/workEvents.service';
import { notifyError, notifySuccess } from '../utils/notifications.utils';


export function useGetUserWorkEvents() {
    const [workEvents, setWorkEvents] = useState<ExistingWorkEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshWorkEvents = async () => {
        setWorkEvents([]);
        setIsLoading(true);
        try {
            const workEventsOnService = await getUserInSessionWorkEvents();
            setWorkEvents(workEventsOnService);
        } catch (error) { 
            notifyError(error);
        } finally { 
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refreshWorkEvents();
    }, []);
    
    return {
        workEvents,
        isLoading,
        refreshWorkEvents
    };
}
