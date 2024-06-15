import { InputNumber, theme } from "antd";
import React from "react";

const { useToken } = theme;

interface ConvertResultProps {
	value: number;
}

const ConvertResult: React.FC<ConvertResultProps> = ({ value }) => {
	const { token } = useToken();

	return (
		<InputNumber
			readOnly
			value={value}
			size="large"
			style={{
				width: "100%",
				borderStyle: "dashed",
				borderColor: token.colorPrimary,
				backgroundColor: token.colorBgContainerDisabled,
			}}
		/>
	);
};

export default ConvertResult;
