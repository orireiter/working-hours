import { NewJob } from '../models/jobs.models';
import { NotImplementedError } from '../models/errors.models';


export async function saveNewJob(job: NewJob) {
    throw new NotImplementedError(`${saveNewJob.name}`);
}
