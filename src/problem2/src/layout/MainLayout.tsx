import React from "react";
import { Button, Flex, Typography } from "antd";
import ExchangeForm from "../feature/ExchangeForm";
import { usePriceContext } from "../store/usePriceContext";
import Loading from "../components/Loading/Loading";

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
	// states
	const [openForm, setOpenForm] = React.useState<boolean>(false);

	// hooks
	const handling = usePriceContext((state) => state.handling);
	const setHandling = usePriceContext((state) => state.setHandling);

	const handleOpenForm = () => {
		setOpenForm(true);
		setHandling(true);
	};

	const handleCloseForm = React.useCallback(() => {
		setOpenForm(false);
	}, []);

	return (
		<>
			<Flex
				justify="center"
				align="center"
				vertical
				gap={24}
				style={{
					height: "100vh",
				}}
			>
				<Typography.Title level={2}>Welcome to Quick Pay!</Typography.Title>
				<Button
					size="large"
					type="primary"
					onClick={handleOpenForm}
					disabled={handling}
				>
					{handling ? "Making exchange...." : "Let make an exchange"}
				</Button>
			</Flex>

			<ExchangeForm onCloseForm={handleCloseForm} openForm={openForm} />
			<Loading />
		</>
	);
};

export default MainLayout;
