import { Timeline, Text } from '@mantine/core';

import { Icon } from '../../../components/Icon';
import { ExistingWorkEvent } from '../../../models/workEvents.models';
import { IconEnum } from '../../../models/common.models';
import { sortArrayOfObjectsByField } from '../../../utils/general.utils';




function TimelineEvent(props: {workEvent: ExistingWorkEvent}) {
    const iconEnum = (props.workEvent.isPaid) ? IconEnum.CASH : IconEnum.CASH_OFF;

    return (
        <Timeline.Item title={props.workEvent.id} bullet={<Icon iconEnum={iconEnum}/>}>
            
            <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
            <Text size="xs" mt={4}>{props.workEvent.startTimestamp}</Text>
        </Timeline.Item>
    );
}


export function WorkTimeline(props: {workEvents: ExistingWorkEvent[]}) {
    const sortedEvents = sortArrayOfObjectsByField(props.workEvents, 'startTimestamp').reverse();

    const timelineEvents = sortedEvents.map((workEvent) => {
        return (<TimelineEvent key={workEvent.id} workEvent={workEvent}/>);
    });

    return  (
        <Timeline active={1} bulletSize={36} lineWidth={2}>
            {timelineEvents}        
        </ Timeline>
    );
}
