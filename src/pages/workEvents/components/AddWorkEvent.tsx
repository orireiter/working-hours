import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { Checkbox, Divider, Button, Center, Modal, Stack, NumberInput, Flex, Space, Textarea, 
    Text, Select } from '@mantine/core';

import { Icon } from '../../../components/Icon';
import { IconEnum, zIndexEnum } from '../../../models/common.models';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { useSaveNewWorkEvent } from '../../../hooks/workEvents.hooks';
import { NewWorkEvent } from '../../../models/workEvents.models';
import { Affix } from '../../../components/Affix';
import styles from '../../../index.module.css';
import { ExistingJob } from '../../../models/jobs.models';



const addJobZIndex = zIndexEnum.BACK;


const now = dayjs().toDate();


const newWorkEventFormOptions = {
    initialValues: {
        jobId: '',
        startTimestamp: now,
        endTimestamp: now,
        isPaid: false,
        expectedPaidAmount: 0,
        actualPaidAmount: 0,
        note: '',
    },
    validate: {
        expectedPaidAmount: (value?: number) => value && value < 0 ? 'cant be negative' : null,
        actualPaidAmount: (value?: number) => value && value< 0 ? 'cant be negative' : null,
    }
};


function NewWorkEventForm(props: { isFormOpen: boolean, closeForm: () => void, refreshExistingWorkEvents?: () => void, jobs: ExistingJob[]}) {
    const { saveWorkEvent, isLoading } = useSaveNewWorkEvent();
    const form = useForm<NewWorkEvent>(newWorkEventFormOptions);
    const [currentJob, setCurrentJob] = useState<ExistingJob>();

    useEffect(() => {
        if (!currentJob) {
            return;
        }

        form.setFieldValue('jobId', currentJob.id);
        form.setFieldValue('expectedPaidAmount', currentJob.salaryAmount);
        form.setFieldValue('actualPaidAmount', currentJob.salaryAmount);
    }, [currentJob]);

    const onSubmit = form.onSubmit((values) => {
        saveWorkEvent(values)
            .then(() => {
                props.closeForm();
                if (props.refreshExistingWorkEvents) {
                    props.refreshExistingWorkEvents();
                }
            })
            .catch(() => {});
    });

    return (
        <Modal opened={props.isFormOpen} onClose={props.closeForm} title='Add Work'>
            <LoadingOverlay isLoading={isLoading} zIndex={zIndexEnum.MIDDLE}/>
            <form onSubmit={onSubmit}>
                <Stack>
                    <Select 
                        label='Job'
                        placeholder='Job Name'
                        data={props.jobs.map(job => job.name)}
                        onChange={(value => setCurrentJob(props.jobs.find(job => job.name === value)))}
                        searchable
                    />
                    <Divider />
                    <Flex columnGap={'sm'} align={'center'} style={{justifyContent: 'space-between'}}>
                        <DateTimePicker 
                            required
                            w={'50%'}
                            label='Start Time' 
                            placeholder='Pick date and time' 
                            {...form.getInputProps('startTimestamp')}
                        />
                        <DateTimePicker 
                            required
                            w={'50%'}
                            label='End Time' 
                            placeholder='Pick date and time' 
                            {...form.getInputProps('endTimestamp')}
                        />
                    </Flex>
                    <Divider />
                    <Flex columnGap={'sm'} align={'center'} style={{justifyContent: 'space-between'}}>
                        <NumberInput
                            label='Expected Pay'
                            min={0}
                            decimalSeparator='.'
                            thousandSeparator=','
                            {...form.getInputProps('expectedPaidAmount')}
                        />
                        <NumberInput
                            label='Actual Pay'
                            min={0}
                            decimalSeparator='.'
                            thousandSeparator=','
                            {...form.getInputProps('actualPaidAmount')}
                        />
                    </Flex>
                    <Checkbox 
                        label='Was paid'
                        {...form.getInputProps('isPaid')}
                    />
                    <Divider />
                    <Textarea 
                        label='notes (optional)'
                        placeholder='...'
                        {...form.getInputProps('note')}
                    />
                </Stack>
                <Space h={'xl'}/>
                <Center>
                    <Button type='submit'>
                        Save
                    </Button>
                </Center>
            </form>
        </Modal>
    );
}


function AddWorkEventButton(props: {openWorkEventForm: () => void, isNoExistingWorkEvents: boolean}) {
    const recommendAddingDisplay = props.isNoExistingWorkEvents ? 'flex' : 'none';
    return (
        <Stack>
            <Stack display={recommendAddingDisplay} className={styles.hovering} justify='center' align='center' gap={0}>
                <Text>Click Me!</Text>
                <Icon iconEnum={IconEnum.ARROW_DOWN} />
            </Stack>

            <Button onClick={() => props.openWorkEventForm()}>
                <Icon iconEnum={IconEnum.PLUS} />
            </Button>
        </Stack>
    );
}


export function AddNewWorkEvent(props: {jobs: ExistingJob[], refreshExistingWorkEvents: () => void, isNoExistingWorkEvents: boolean}){
    const [isNewWorkEventFormOpened, { open: openWorkEventForm , close }] = useDisclosure(false);

    return (
        <Affix zIndex={addJobZIndex}>
            <AddWorkEventButton openWorkEventForm={openWorkEventForm} isNoExistingWorkEvents={props.isNoExistingWorkEvents}/>
            <NewWorkEventForm isFormOpen={isNewWorkEventFormOpened} closeForm={close} refreshExistingWorkEvents={props.refreshExistingWorkEvents} jobs={props.jobs}/>
        </Affix>
    );
}
