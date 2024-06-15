import { Flex, Typography } from "antd";
import React from "react";
import { IMAGE_URL } from "../../lib/constants";

interface PriceItemLabelProps {
	currency: string;
}

const PriceItemLabel: React.FC<PriceItemLabelProps> = ({ currency }) => {
	return (
		<Flex align="center" gap={8}>
			<img
				src={`${IMAGE_URL}/${currency}.svg`}
				alt="currency logo"
				height={20}
			/>
			<Typography.Text>{currency}</Typography.Text>
		</Flex>
	);
};

export default PriceItemLabel;
