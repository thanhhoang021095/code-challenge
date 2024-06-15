import { Flex } from "antd";
import React from "react";

interface ConverterProps {}

const Converter: React.FC<ConverterProps> = () => {
	return (
		<Flex align="center" justify="center" gap={8}>
			<div
				style={{
					height: 1,
					width: "100%",
					backgroundColor: "#000",
				}}
			></div>
			<Flex
				align="center"
				justify="center"
				style={{
					width: "2.25rem",
					height: "2.25rem",
					flexShrink: 0,
					borderRadius: "50%",
					border: "1px solid",
				}}
				gap={8}
			>
				<img src="/images/exchange.svg" alt="exchange icon" />
			</Flex>
			<div
				style={{
					height: 1,
					width: "100%",
					backgroundColor: "#000",
				}}
			></div>
		</Flex>
	);
};

export default Converter;
