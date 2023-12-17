export enum CurrencyTypeEnum {
    NIS = 'NIS',
    USD = 'USD',
}


export enum CurrencySymbolEnum {
    NIS = '₪',
    USD = '$',
}


export const currencyTypeToSymbolMapping: Record<string, CurrencyTypeEnum>= {
    [CurrencySymbolEnum.NIS]: CurrencyTypeEnum.NIS,
    [CurrencySymbolEnum.USD]: CurrencyTypeEnum.USD
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