import { Button, Form, Space } from "antd";
import React from "react";
import { formItemStyle } from "../../lib/constants";

interface SubmitterProps {
	onReset: (fields?: any[] | undefined) => void;
}

const Submitter: React.FC<SubmitterProps> = ({ onReset }) => {
	const handleReset = () => onReset();

	return (
		<Form.Item
			style={{
				...formItemStyle,
				display: "flex",
				justifyContent: "end",
			}}
		>
			<Space>
				<Button htmlType="button" onClick={handleReset}>
					Reset
				</Button>

				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Space>
		</Form.Item>
	);
};

export default Submitter;
