import { Title, Grid, Stack, Card, Text, Group, Spoiler, Button, useMantineColorScheme } from '@mantine/core';
import { modals } from '@mantine/modals';

import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { ExistingJob, currencyTypeToSymbolMapping } from '../../../models/jobs.models';
import { useIsMobile } from '../../../hooks/general.hooks';
import { useUpdateJobArchiveStatus } from '../../../hooks/jobs.hooks';
import { Icon } from '../../../components/Icon';
import { IconEnum, ColorEnum } from '../../../models/common.models';


function GridCell(props: {isLoading: boolean, gridSpan: number, minHeight: `${number}vh`, job?: ExistingJob, refreshExistingJobs: () => void}) {
    const { togglejobArchiveStatus, isLoading } = useUpdateJobArchiveStatus();
    const { colorScheme } = useMantineColorScheme();
    const cardBackground = colorScheme === 'light' ? '#eee' : undefined;

    let jobToRender = null;
    if (props.job) {
        const jobId = props.job.id;
        const showLabel = (props.job.address ?? props.job.note) ? <Icon iconEnum={IconEnum.CHEVRON_DOWN} sizeScale={1.5}/> : null;
        const openModal = () => modals.openConfirmModal({
            title: 'Please confirm your action',
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => {
                togglejobArchiveStatus(jobId, true)
                    .then(() => props.refreshExistingJobs())
                    .catch(() => {});
            },
        });


        jobToRender = (
            <>
                <LoadingOverlay isLoading={isLoading} />
                <Group justify='space-between'>
                    <Text fs={'2em'} fw={600} mb={10}>{props.job.name}</Text>
                    <Button bg='transparent' p={0} mb={10} onClick={openModal}>
                        <Icon iconEnum={IconEnum.X} color={ColorEnum.RED}/>
                    </Button>
                </Group>
                
                <Text fw={400} mb={5} tt='capitalize'>
                    {props.job.salaryAmount}{currencyTypeToSymbolMapping[props.job.salaryCurrency]} - {props.job.salaryFrequency}
                </Text>
                <Spoiler maxHeight={0} showLabel={showLabel} 
                    hideLabel={<Icon iconEnum={IconEnum.CHEVRON_UP} sizeScale={1.5}/>}
                    styles={{control: {width: '100%'}}}>
                    <Group tt={'capitalize'} gap={'xs'}>
                        <Text fw={400}>
                            address:
                        </Text>
                        <Text fw={300}>
                            {props.job.address}
                        </Text>
                    </Group>
                    <Text fw={400} tt='capitalize'>
                        note:
                    </Text>
                    <Text fw={300}>
                        {props.job.note}
                    </Text>
                </Spoiler>
            </>
        );
    }
    
    return (
        <Grid.Col pos={'relative'} span={props.gridSpan}>
            <Card mih={props.minHeight} padding={'lg'} bg={cardBackground}>
                <LoadingOverlay isLoading={props.isLoading} />
                { jobToRender }
            </Card>
        </Grid.Col>);
}


function JobGrid(props: { jobs: ExistingJob[], isLoading: boolean, refreshExistingJobs: () => void }) {
    const isMobile = useIsMobile();

    const gridSpan = isMobile ? 3 : 1;
    const minimumHeight = '20vh';
    
    let jobGrid;
    if (props.isLoading) {
        jobGrid = Array(5).fill({}).map((_: object, index) => {
            return (
                <GridCell key={index} isLoading={props.isLoading} gridSpan={gridSpan} minHeight={minimumHeight} refreshExistingJobs={props.refreshExistingJobs} />    
            );
        });
    } else {
        jobGrid = props.jobs.map(job => {
            return (
                <GridCell key={job.id} isLoading={props.isLoading} gridSpan={gridSpan} minHeight={minimumHeight} refreshExistingJobs={props.refreshExistingJobs} job={job} />    
            );
        });
    }

    return (
        <Grid columns={3} gutter={{base: 'lg'}}>
            { jobGrid }
        </Grid>
    );
}


export function ExistingJobs(props: { jobs: ExistingJob[], isLoading: boolean, refreshExistingJobs: () => void }) {
    return (
        <Stack>
            <Title>My Jobs</Title>
            <JobGrid jobs={props.jobs} isLoading={props.isLoading} refreshExistingJobs={props.refreshExistingJobs}/>
        </Stack>
    );
}
