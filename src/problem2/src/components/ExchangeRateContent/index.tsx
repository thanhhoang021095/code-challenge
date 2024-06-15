import { Typography } from "antd";
import React from "react";

interface ExchangeRateContentProps {
	exchangeRate: number;
	srcCurrency: string;
	destCurrency: string;
}

const ExchangeRateContent: React.FC<ExchangeRateContentProps> = ({
	exchangeRate,
	srcCurrency,
	destCurrency,
}) => {
	if (exchangeRate === 0) return null;

	return (
		<Typography.Text>
			Exchange rate: 1 <strong>{srcCurrency}</strong> = {exchangeRate}{" "}
			<strong>{destCurrency}</strong>
		</Typography.Text>
	);
};

export default ExchangeRateContent;
