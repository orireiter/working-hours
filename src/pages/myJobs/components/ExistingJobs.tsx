import { Title, Grid, Stack, Card } from '@mantine/core';

import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { ExistingJob } from '../../../models/jobs.models';
import { useIsMobile } from '../../../hooks/general.hooks';


function JobGrid(props: { jobs: ExistingJob[], isLoading: boolean }) {
    const isMobile = useIsMobile();

    const gridSpan = isMobile ? 3 : 1;
    const minimumHeight = isMobile ? '50vh': '20vh';

    let jobGrid;
    if (props.isLoading) {
        jobGrid = Array(5).fill({}).map((_, index) => {
            return (
                <Grid.Col key={index} pos={'relative'} span={gridSpan}>
                    <Card mih={minimumHeight}>
                        <LoadingOverlay isLoading={props.isLoading} />
                    </Card>
                </Grid.Col>);
        });
    } else {
        jobGrid = props.jobs.map(job => {
            return (
                <Grid.Col key={job.id} span={1}>
                    <Card mih={'20vh'}>
                        {JSON.stringify(job)}
                    </Card>
                </Grid.Col>
            );
        });
    }

    return (
        <Grid columns={3} gutter={{base: 'lg'}}>
            { jobGrid }
        </Grid>
    );
}


export function ExistingJobs(props: { jobs: ExistingJob[], isLoading: boolean }) {
    return (
        <Stack>
            <Title>My Jobs</Title>
            <JobGrid jobs={props.jobs} isLoading={props.isLoading}/>
        </Stack>
    );
}
