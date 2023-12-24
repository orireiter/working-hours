export interface NewWorkEvent {
	jobId: string;
	startTimestamp: Date;
	endTimestamp: Date;
	note?: string;
	isPaid?: boolean;
	expectedPaidAmount?: number;
	actualPaidAmount?: number;
}


export interface ExistingWorkEvent extends NewWorkEvent {
    id: string;
    userId: string;
}


export interface RemoteWorkEvent {
    id: number;
    created_at: Date;
}
