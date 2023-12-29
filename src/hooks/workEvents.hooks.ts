import { useState, useEffect } from 'react';

import { ExistingWorkEvent, NewWorkEvent } from '../models/workEvents.models';
import { WorkEventsService} from '../services/workEvents.service';
import { notifyError, notifySuccess } from '../utils/notifications.utils';


export function useGetUserWorkEvents() {
    const [workEvents, setWorkEvents] = useState<ExistingWorkEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshWorkEvents = async () => {
        setWorkEvents([]);
        setIsLoading(true);
        try {
            const workEventsOnService = await WorkEventsService.Get.getUserInSessionWorkEvents();
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


export function useSaveNewWorkEvent() {
    const [isLoading, setIsLoading] = useState(false);

    const saveWorkEvent = async (workEvent: NewWorkEvent) => {
        setIsLoading(true);
        try {
            await WorkEventsService.Create.saveNewWorkEvent(workEvent);
            notifySuccess('work-event-saved', 'Saved!', 'work added');
        } catch (error) {
            notifyError(error);
        } finally {
            setIsLoading(false);  
        }
    };

    return {
        saveWorkEvent,
        isLoading
    };
}


export function useUpdateWorkEventArchiveStatus() {
    const [isLoading, setIsLoading] = useState(false);

    const toggleWorkEventArchiveStatus = async (workEventId: string, isArchived: boolean) => {
        setIsLoading(true);
        try {
            await WorkEventsService.Update.updateArchiveStatus(workEventId, isArchived);
            notifySuccess('work-event-archived', 'Updated!', 'work archive status updated');
        } catch (error) { 
            notifyError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        toggleWorkEventArchiveStatus,
        isLoading
    };
}
