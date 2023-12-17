import { supabase } from '../thirdParties/supabase';
import { NewJob } from '../models/jobs.models';


const jobsTable = supabase.from('jobs');


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


    const { data, error } = await jobsTable.insert([remoteJob,]).select();

    if (error) { 
        throw new Error('failed to save job');
    }

    const savedJob = data[0];
    return savedJob;
}
