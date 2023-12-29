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
    user_id: string;
    job_id: string;
    start_timestamp: Date;
    end_timestamp: Date;
    note?: string;
    is_paid?: boolean;
    expected_paid_amount?: number;
    actual_paid_amount?: number;
    is_archived?: boolean;
}
