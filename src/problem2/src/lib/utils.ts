export const calcExchangeRate = (srcPrice: number, destPrice: number) => {
	/* we have a receipt follow this concept: 
    value of source price by currency  ->value of destination price by currency
    so 1 unit source price by currency  -> rate
  */

	return destPrice / srcPrice;
};

export const calcDestinationAmount = (srcAmount: number, rate: number) =>
	srcAmount * rate;

export const convertPriceItemValue = (val: string, separator = "-") => {
	const priceValue = val.split(separator);

	return {
		currency: priceValue[0] || "",
		price: Number(priceValue[1]) || 0,
	};
};

export const waitTime = async (cb?: () => void, time: number = 1000) => {
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			cb?.();
			resolve(true);
			clearTimeout(timer);
		}, time);
	});
};
