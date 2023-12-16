import { supabase } from '../thirdParties/supabase';
import { NewJob, ExistingJob } from '../models/jobs.models';


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
    `address: null
    created_at: "2023-12-16T22:53:47.924501+00:00"
    id: 3
    name: "test"
    note: null
    salary_amount: 1
    salary_currency: "NIS"
    salary_frequency: "hourly"
    user_id: "5694c6ef-edbf-4cbc-ac12-d79a31808c01"`;
    return savedJob;
}
