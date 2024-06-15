import {
	destPriceFieldName,
	srcAmountFieldName,
	srcPriceFieldName,
} from "../lib/constants";

export type PriceItemType = {
	currency: string;
	date: Date;
	price: number;
};

export type ExchangeFormType = {
	[srcAmountFieldName]: number;
	[srcPriceFieldName]: string;
	[destPriceFieldName]: string;
};
