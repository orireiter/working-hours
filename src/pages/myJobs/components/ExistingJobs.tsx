import { useEffect } from 'react';

import { useGetUserJobs } from '../../../hooks/jobs.hooks';


export function ExistingJobs() {
    const { getJobs, isLoading } = useGetUserJobs();

    useEffect(() => {
        getJobs()
            .then((jobs) => console.log(jobs))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>My Jobs</h1>
        </div>
    );
}
