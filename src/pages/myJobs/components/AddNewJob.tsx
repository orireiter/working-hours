import { useDisclosure } from '@mantine/hooks';
import { Affix, Button, Modal } from '@mantine/core';

import { Icon } from '../../../components/Icon';
import { IconEnum } from '../../../models/common.models';


function NewJobForm(props: { isFormOpen: boolean, closeForm: () => void }) {

    return (
        <Modal opened={props.isFormOpen} onClose={props.closeForm} title='Add New Job'>
            {/* Modal content */}
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
