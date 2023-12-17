import { Title, Grid, Stack, Card } from '@mantine/core';

import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { ExistingJob } from '../../../models/jobs.models';
import { useIsMobile } from '../../../hooks/general.hooks';


function GridCell(props: {isLoading: boolean, gridSpan: number, minHeight: `${number}vh`, job: ExistingJob | object}) {
    const jobToRender = (Object.keys(props.job).length) ? props.job : null;
    
    return (
        <Grid.Col pos={'relative'} span={props.gridSpan}>
            <Card mih={props.minHeight}>
                <LoadingOverlay isLoading={props.isLoading} />
                {jobToRender ? JSON.stringify(jobToRender) : null}
            </Card>
        </Grid.Col>);
}


function JobGrid(props: { jobs: ExistingJob[], isLoading: boolean }) {
    const isMobile = useIsMobile();

    const gridSpan = isMobile ? 3 : 1;
    const minimumHeight = isMobile ? '50vh': '20vh';
    
    let jobGrid;
    if (props.isLoading) {
        jobGrid = Array(5).fill({}).map((_: object, index) => {
            return (
                <GridCell key={index} isLoading={props.isLoading} gridSpan={gridSpan} minHeight={minimumHeight} job={_} />    
            );
        });
    } else {
        jobGrid = props.jobs.map(job => {
            return (
                <GridCell key={job.id} isLoading={props.isLoading} gridSpan={gridSpan} minHeight={minimumHeight} job={job} />    
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
