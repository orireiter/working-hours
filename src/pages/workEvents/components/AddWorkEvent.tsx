import dayjs from 'dayjs';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Button, Center, Modal, Stack, TextInput, NumberInput, Flex, Space, Select, Textarea, Text } from '@mantine/core';

import { useIsMobile } from '../../../hooks/general.hooks';
import { Icon } from '../../../components/Icon';
import { IconEnum, zIndexEnum } from '../../../models/common.models';
import { SalaryFrequencyEnum, CurrencyTypeEnum, currencySymbolToTypeMapping } from '../../../models/jobs.models';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { useSaveNewWorkEvent } from '../../../hooks/workEvents.hooks';
import { NewWorkEvent } from '../../../models/workEvents.models';
import { Affix } from '../../../components/Affix';
import styles from '../../../index.module.css';

// import styles from './AddNewJob.module.css';


const addJobZIndex = zIndexEnum.BACK;

/* 
    jobId: string;
	startTimestamp: Date;
	endTimestamp: Date;
	note?: string;
	isPaid?: boolean;
	expectedPaidAmount?: number;
	actualPaidAmount?: number;
*/

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
        // name: (value: string) => value.length < 2 ? 'Please enter a valid name' : null,
        // salaryCurrency: (value: string) => !(value in CurrencyTypeEnum),
        // salaryAmount: (value: number) => {
        //     if (value < 0) {
        //         return 'Salary must be a positive number';
        //     }
        // },
    }
};


function NewWorkEventForm(props: { isFormOpen: boolean, closeForm: () => void, refreshExistingWorkEvents?: () => void }) {
    const isMobile = useIsMobile();
    const { saveWorkEvent, isLoading } = useSaveNewWorkEvent();

    const form = useForm<NewWorkEvent>(newWorkEventFormOptions);
    const currencies = Object.entries(currencySymbolToTypeMapping).map((currencyData) => {
        return {label: currencyData[0], value: currencyData[1]};
    });

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
        <Modal opened={props.isFormOpen} onClose={props.closeForm} title='Add New Job'>
            <LoadingOverlay isLoading={isLoading} zIndex={zIndexEnum.MIDDLE}/>
            <form onSubmit={onSubmit}>
                <Stack>
                    <TextInput
                        type='text'
                        label='Name'
                        placeholder='Job Name'
                        {...form.getInputProps('name')}
                    />
                    <Flex columnGap={'sm'} align={'center'} style={{justifyContent: 'space-between'}}>
                        <NumberInput 
                            w={isMobile ? '60%' : '70%'}
                            label='Salary'
                            min={0}
                            decimalSeparator='.'
                            thousandSeparator=','
                            {...form.getInputProps('salaryAmount')}
                        />
                        <Select 
                            w={isMobile ? '30%' : '20%'}
                            label='Currency'
                            data={currencies}
                            searchable
                            error={form.errors.salaryCurrency}
                            {...form.getInputProps('salaryCurrency')}
                        />
                    </Flex>
                    <Select 
                        label='My salary is'
                        data={Object.values(SalaryFrequencyEnum)}
                        {...form.getInputProps('salaryFrequency')}
                        searchable
                    />
                    <TextInput
                        type='text'
                        label='Address (optional)'
                        placeholder='address'
                        {...form.getInputProps('address')}
                    />
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


export function AddNewWorkEvent(props: {refreshExistingWorkEvents: () => void, isNoExistingWorkEvents: boolean}){
    const [isNewWorkEventFormOpened, { open: openWorkEventForm , close }] = useDisclosure(false);

    return (
        <Affix zIndex={addJobZIndex}>
            <AddWorkEventButton openWorkEventForm={openWorkEventForm} isNoExistingWorkEvents={props.isNoExistingWorkEvents}/>
            <NewWorkEventForm isFormOpen={isNewWorkEventFormOpened} closeForm={close} refreshExistingWorkEvents={props.refreshExistingWorkEvents}/>
        </Affix>
    );
}
