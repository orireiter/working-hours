import { NewJob } from '../models/jobs.models';
import { saveNewJob } from '../services/jobs.service';


export function useSaveNewJob() {
    return (job: NewJob) => saveNewJob(job);
}
