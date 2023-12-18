export enum CurrencyTypeEnum {
    NIS = 'NIS',
    USD = 'USD',
}


export enum CurrencySymbolEnum {
    NIS = '₪',
    USD = '$',
}


export const currencySymbolToTypeMapping: Record<string, CurrencyTypeEnum>= {
    [CurrencySymbolEnum.NIS]: CurrencyTypeEnum.NIS,
    [CurrencySymbolEnum.USD]: CurrencyTypeEnum.USD
};


export const currencyTypeToSymbolMapping: Record<CurrencyTypeEnum, CurrencySymbolEnum>= {
    [CurrencyTypeEnum.NIS]: CurrencySymbolEnum.NIS,
    [CurrencyTypeEnum.USD]: CurrencySymbolEnum.USD
};


export enum SalaryFrequencyEnum {
    HOURLY = 'hourly',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    FIXED = 'fixed'
}


export interface NewJob{
	name: string;
	salaryAmount: number;
	salaryCurrency: CurrencyTypeEnum;
	salaryFrequency: SalaryFrequencyEnum; // or just int and always be seconds?
	address?: string; //1. call it address? 2. is there a more specific object? 3. optional
	note?: string;
}


export interface ExistingJob extends NewJob {
    id: string;
	userId: string; // type not decided yet, will be auto generated
}


export interface RemoteJob {
    address?: string;
    created_at: string;
    id: number;
    name: string; 
    note?: string;
    salary_amount: number;
    salary_currency: CurrencyTypeEnum;
    salary_frequency: SalaryFrequencyEnum; 
    user_id: string;
}
