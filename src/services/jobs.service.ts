import { supabase } from '../thirdParties/supabase';
import { NewJob, ExistingJob, RemoteJob } from '../models/jobs.models';


const jobsTable = supabase.from('jobs');


export class JobsService {
    static Get = class {
        static async getUserInSessionJobs(isArchivedArray?: boolean[]) {
            isArchivedArray = isArchivedArray ?? [false];
        
            const { data, error } = await jobsTable.select<string, RemoteJob>('*').in('is_archived', isArchivedArray);
        
            if (error) { 
                throw new Error('failed to save job');
            }
        
            const transformedJobs: ExistingJob[] = data.map(job => {
                return {
                    id: `${job.id}`,
                    userId: job.user_id,
                    name: job.name,
                    salaryAmount: job.salary_amount,
                    salaryCurrency: job.salary_currency,
                    salaryFrequency: job.salary_frequency,
                    address: job.address,
                    note: job.note,
                };
            });
        
            return transformedJobs;
        }
        
    };

    static Create = class {
        static async saveNewJob(job: NewJob) {
            const remoteJob: Record<string, string | number> = {
                name: job.name,
                salary_amount: job.salaryAmount,
                salary_frequency: job.salaryFrequency,
                salary_currency: job.salaryCurrency,
            };
        
            if (job.address) {
                remoteJob.address = job.address;
            }
        
            if (job.note) {
                remoteJob.note = job.note;
            }
        
        
            const { data, error } = await jobsTable.insert([remoteJob,]).select<string, RemoteJob>('id');
        
            if (error) { 
                throw new Error('failed to save job');
            }
        
            const savedJob = data[0];
            return savedJob;
        }
        
    };

    static Update = class {
        static async updateArchiveStatus(jobId: string, newArchiveStatus: boolean) {
            const { data, error } = await jobsTable.update({is_archived: newArchiveStatus})
                .eq('id', +jobId).select<string, RemoteJob>('id');

            if (error) {
                throw new Error('failed to update archive status');
            }

            const updatedJob = data[0];
            return updatedJob;
        }
    };
}
