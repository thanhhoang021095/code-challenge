import React from "react";
import { Flex, Form, InputNumber, Select } from "antd";
import PriceItemLabel from "../PriceItemLabel";
import { formItemStyle, requiredMessage } from "../../lib/constants";
import { usePriceContext } from "../../store/usePriceContext";

interface SourceAmountProps {
	destPrice: string;
}

const SourceAmount: React.FC<SourceAmountProps> = ({ destPrice = "" }) => {
	const priceList = usePriceContext((state) => state.priceList);
	const loading = usePriceContext((state) => state.loading);

	const priceOptions = React.useMemo(() => {
		return priceList.map(({ currency, price }, idx) => {
			const formattedValue = `${currency}-${price}`;

			return {
				value: formattedValue,
				label: <PriceItemLabel currency={currency} />,
				key: idx,
				disabled: destPrice === formattedValue,
			};
		});
	}, [priceList, destPrice]);

	return (
		<Flex vertical gap={16}>
			<Form.Item
				name="sourceAmount"
				label="Source Amount"
				rules={[{ required: true, message: requiredMessage }]}
				style={formItemStyle}
			>
				<InputNumber
					min={0}
					max={100000}
					size="large"
					style={{
						width: "100%",
					}}
				/>
			</Form.Item>

			<Form.Item
				name="sourcePrice"
				label="Source Currency"
				rules={[{ required: true, message: requiredMessage }]}
				style={formItemStyle}
			>
				<Select
					loading={loading}
					placeholder="Select a source price"
					allowClear
					options={priceOptions}
					size="large"
					virtual={false}
				></Select>
			</Form.Item>
		</Flex>
	);
};

export default SourceAmount;
