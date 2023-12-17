import { supabase } from '../thirdParties/supabase';
import { NewJob, RemoteJob, ExistingJob } from '../models/jobs.models';


const jobsTable = supabase.from('jobs');


export async function getUserInSessionJobs() {
    const { data, error } = await jobsTable.select<string, RemoteJob>('*');

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


export async function saveNewJob(job: NewJob) {
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


    const { data, error } = await jobsTable.insert([remoteJob,]).select<string, RemoteJob>();

    if (error) { 
        throw new Error('failed to save job');
    }

    const savedJob = data[0];
    return savedJob;
}
