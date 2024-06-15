import React from "react";
import { Flex, Form, Select } from "antd";
import PriceItemLabel from "../PriceItemLabel";
import { formItemStyle, requiredMessage } from "../../lib/constants";
import { usePriceContext } from "../../store/usePriceContext";

interface DestinationAmountProps {
	exchangeContent: React.ReactNode;
	srcPrice: string;
}

const DestinationAmount: React.FC<DestinationAmountProps> = ({
	exchangeContent,
	srcPrice = "",
}) => {
	const priceList = usePriceContext((state) => state.priceList);
	const loading = usePriceContext((state) => state.loading);

	const priceOptions = React.useMemo(() => {
		return priceList.map(({ currency, price }, idx) => {
			const formattedValue = `${currency}-${price}`;

			return {
				value: formattedValue,
				label: <PriceItemLabel currency={currency} />,
				key: idx,
				disabled: srcPrice === formattedValue,
			};
		});
	}, [priceList, srcPrice]);

	return (
		<Flex vertical gap={16}>
			<Form.Item
				name="destinationPrice"
				label="Destination Currency"
				rules={[{ required: true, message: requiredMessage }]}
				style={formItemStyle}
			>
				<Select
					loading={loading}
					placeholder="Select a destination price"
					allowClear
					options={priceOptions}
					size="large"
					virtual={false}
				/>
			</Form.Item>

			{exchangeContent}
		</Flex>
	);
};

export default DestinationAmount;
