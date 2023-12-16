import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Affix, Button, Center, Modal, Stack, TextInput, NumberInput, Flex, Space, Select, Textarea } from '@mantine/core';

import { useIsMobile } from '../../../hooks/general.hooks';
import { Icon } from '../../../components/Icon';
import { IconEnum } from '../../../models/common.models';
import { NewJob, SalaryFrequencyEnum, CurrencyTypeEnum, currencyTypeToSymbolMapping } from '../../../models/jobs.models';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { useSaveNewJob } from '../../../hooks/jobs.hooks';


function NewJobForm(props: { isFormOpen: boolean, closeForm: () => void }) {
    const isMobile = useIsMobile();
    const { saveJob, isLoading } = useSaveNewJob();

    const form = useForm<NewJob>({
        initialValues: {
            name: '',
            salaryAmount: 0,
            salaryCurrency: CurrencyTypeEnum.NIS,
            salaryFrequency: SalaryFrequencyEnum.HOURLY,
            address: '',
            note: '',
        },
        validate: {
            salaryAmount: (value: number) => {
                if (value < 0) {
                    return 'Salary must be a positive number';
                }
            },
        }
    });
    
    const onSubmit = form.onSubmit((values) => void saveJob(values));

    return (
        <Modal opened={props.isFormOpen} onClose={props.closeForm} title='Add New Job'>
            <LoadingOverlay isLoading={isLoading} />
            <form onSubmit={onSubmit}>
                <Stack>
                    <TextInput
                        required
                        type='text'
                        label='Name'
                        placeholder='Job Name'
                        error={form.errors.name && 'Invalid name'}
                        {...form.getInputProps('name')}
                    />
                    <Flex columnGap={'sm'} align={'center'} style={{justifyContent: 'space-between'}}>
                        <NumberInput 
                            required
                            w={isMobile ? '60%' : '70%'}
                            label='Salary'
                            min={0}
                            decimalSeparator='.'
                            thousandSeparator=','
                            {...form.getInputProps('salaryAmount')}
                            error={form.errors.salaryAmount}
                        />
                        <Select 
                            required
                            w={isMobile ? '30%' : '20%'}
                            label='Currency'
                            data={Object.keys(currencyTypeToSymbolMapping)}
                            onChange={(currencySymbol) => {
                                if (!currencySymbol) {
                                    return;
                                }

                                const currencyEnum = currencyTypeToSymbolMapping[currencySymbol];
                                form.setFieldValue('salaryCurrency', currencyEnum);
                            }}
                            searchable
                        />
                    </Flex>
                    <Select 
                        required
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


export function AddNewJob() {
    const [isNewJobFormOpened, { open: openJobForm , close }] = useDisclosure(false);

    return (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={0}>
            <Button onClick={() => openJobForm()}>
                <Icon iconEnum={IconEnum.PLUS} />
            </Button>
            <NewJobForm isFormOpen={isNewJobFormOpened} closeForm={close}/>
        </Affix>
    );
}
