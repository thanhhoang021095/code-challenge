import React from "react";
import { App as AntdWrapper } from "antd";
import MainLayout from "./layout/MainLayout";

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<AntdWrapper>
			<MainLayout />
		</AntdWrapper>
	);
};

export default App;
