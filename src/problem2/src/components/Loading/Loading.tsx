import { Flex, Spin } from "antd";
import React from "react";
import { usePriceContext } from "../../store/usePriceContext";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
	const loading = usePriceContext((state) => state.loading);

	if (!loading) return null;

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				top: 0,
				bottom: 0,
				backgroundColor: "#fff",
				opacity: 0.8,
				zIndex: 9999,
			}}
		>
			<Flex
				align="center"
				justify="center"
				style={{
					height: "100%",
				}}
			>
				<Spin size="large" />
			</Flex>
		</div>
	);
};

export default Loading;
