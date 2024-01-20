import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Button, Center, Modal, Stack, TextInput, NumberInput, Flex, Space, Select, Textarea, Text } from '@mantine/core';

import { useIsMobile } from '../../../hooks/general.hooks';
import { Icon } from '../../../components/Icon';
import { IconEnum, zIndexEnum } from '../../../models/common.models';
import { NewJob, SalaryFrequencyEnum, CurrencyTypeEnum, currencySymbolToTypeMapping } from '../../../models/jobs.models';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { useSaveNewJob } from '../../../hooks/jobs.hooks';
import { Affix } from '../../../components/Affix';
import styles from '../../../index.module.css';


const addJobZIndex = zIndexEnum.BACK;


const newJobFormOptions = {
    initialValues: {
        name: '',
        salaryAmount: 0,
        salaryCurrency: CurrencyTypeEnum.NIS,
        salaryFrequency: SalaryFrequencyEnum.HOURLY,
        address: '',
        note: '',
    },
    validate: {
        name: (value: string) => value.length < 2 ? 'Please enter a valid name' : null,
        salaryCurrency: (value: string) => !(value in CurrencyTypeEnum),
        salaryAmount: (value: number) => {
            if (value < 0) {
                return 'Salary must be a positive number';
            }
        },
    }
};


function NewJobForm(props: { isFormOpen: boolean, closeForm: () => void, refreshExistingJobs?: () => void }) {
    const isMobile = useIsMobile();
    const { saveJob, isLoading } = useSaveNewJob();

    const form = useForm<NewJob>(newJobFormOptions);
    const currencies = Object.entries(currencySymbolToTypeMapping).map((currencyData) => {
        return {label: currencyData[0], value: currencyData[1]};
    });

    const onSubmit = form.onSubmit((values) => {
        saveJob(values)
            .then(() => {
                props.closeForm();
                if (props.refreshExistingJobs) {
                    props.refreshExistingJobs();
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


function AddJobButton(props: {openJobForm: () => void, isNoExistingJobs: boolean}) {
    const recommendAddingDisplay = props.isNoExistingJobs ? 'flex' : 'none';
    return (
        <Stack>
            <Stack display={recommendAddingDisplay} className={styles.hovering} justify='center' align='center' gap={0}>
                <Text>Click Me!</Text>
                <Icon iconEnum={IconEnum.ARROW_DOWN} />
            </Stack>

            <Button onClick={() => props.openJobForm()}>
                <Icon iconEnum={IconEnum.PLUS} />
            </Button>
        </Stack>
    );
}


export function AddNewJob(props: {refreshExistingJobs: () => void, isNoExistingJobs: boolean}){
    const [isNewJobFormOpened, { open: openJobForm , close }] = useDisclosure(false);

    return (
        <Affix zIndex={addJobZIndex}>
            <AddJobButton openJobForm={openJobForm} isNoExistingJobs={props.isNoExistingJobs}/>
            <NewJobForm isFormOpen={isNewJobFormOpened} closeForm={close} refreshExistingJobs={props.refreshExistingJobs}/>
        </Affix>
    );
}
