import { supabase } from '../thirdParties/supabase';
import { NewWorkEvent, ExistingWorkEvent, RemoteWorkEvent } from '../models/workEvents.models';


const tableName= 'work_events';


export class WorkEventsService {
    static Get = class {
        static async getUserInSessionWorkEvents(isArchivedArray?: boolean[]) {
            isArchivedArray = isArchivedArray ?? [false];
        
            const { data, error } = await supabase.from(tableName).select<string, RemoteWorkEvent>('*').in('is_archived', isArchivedArray);
        
            if (error) { 
                throw new Error('failed to save work');
            }
        
            const transformedWorkEvents: ExistingWorkEvent[] = data.map(workEvent => {
                return {
                    id: `${workEvent.id}`,
                    userId: workEvent.user_id,
                    jobId: workEvent.job_id,
                    startTimestamp: workEvent.start_timestamp,
                    endTimestamp: workEvent.end_timestamp,
                    note: workEvent.note,
                    isPaid: workEvent.is_paid,
                    expectedPaidAmount: workEvent.expected_paid_amount,
                    actualPaidAmount: workEvent.actual_paid_amount,
                };
            });
        
            return transformedWorkEvents;
        }
        
    };

    static Create = class {
        static async saveNewWorkEvent(workEvent: NewWorkEvent) {
            const remoteWorkEvent: Record<string, any> = {
                job_id: workEvent.jobId,
                start_timestamp: workEvent.startTimestamp,
                end_timestamp: workEvent.endTimestamp,
            };
        
            if (typeof workEvent.isPaid === 'boolean') {
                remoteWorkEvent.is_paid = workEvent.isPaid;
            }
        
            if (workEvent.note) {
                remoteWorkEvent.note = workEvent.note;
            }
            
            if (typeof workEvent.expectedPaidAmount === 'number') {
                remoteWorkEvent.expected_paid_amount = workEvent.expectedPaidAmount;
            }

            if (typeof workEvent.actualPaidAmount === 'number') {
                remoteWorkEvent.actual_paid_amount = workEvent.actualPaidAmount;
            }
        
        
            const { data, error } = await supabase.from(tableName).insert([remoteWorkEvent,]).select<string, RemoteWorkEvent>('id');
        
            if (error) { 
                throw new Error('failed to save work event');
            }
        
            const savedWorkEvent = data[0];
            return savedWorkEvent;
        }
        
    };

    static Update = class {
        static async updateArchiveStatus(workEventId: string, newArchiveStatus: boolean) {
            const { data, error } = await supabase.from(tableName).update({is_archived: newArchiveStatus})
                .eq('id', +workEventId).select<string, RemoteWorkEvent>();

            if (error) {
                throw new Error('failed to update archive status');
            }

            const updatedWorkEvent = data[0];
            return updatedWorkEvent;
        }
    };
}
