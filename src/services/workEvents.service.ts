import { supabase } from '../thirdParties/supabase';

import { RemoteWorkEvent, ExistingWorkEvent } from '../models/workEvents.models';


const workEventsTable = supabase.from('work_events');


export async function getUserInSessionWorkEvents() {
    const { data, error } = await workEventsTable.select<string, RemoteWorkEvent>('*');

    if (error) { 
        throw new Error('failed to save job');
    }

    const transformedWorkEvents: ExistingWorkEvent[] = data.map(workEvent => {
        return {
            id: `${workEvent.id}`,
            userId: workEvent.user_id,
            name: workEvent.name,
            salaryAmount: workEvent.salary_amount,
            salaryCurrency: workEvent.salary_currency,
            salaryFrequency: workEvent.salary_frequency,
            address: workEvent.address,
            note: workEvent.note,
        };
    });

    return transformedWorkEvents;
}
