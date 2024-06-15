import { Card, Flex, Typography, notification, theme } from "antd";
import { ExchangeFormType } from "../common/types";
import { convertPriceItemValue } from "../lib/utils";
import ConfettiAnimation from "../components/ConfettiAnimation";
import { usePriceContext } from "../store/usePriceContext";

const { useToken } = theme;

export const useOpenSuccessNotification = () => {
	const { token } = useToken();
	const setHandling = usePriceContext((state) => state.setHandling);

	const onCloseNotification = () => {
		setHandling(false);
	};

	const openSuccessNotification = (
		{ destinationPrice, sourcePrice, sourceAmount }: ExchangeFormType,
		convertedValue: number
	) => {
		const { price: srcValue, currency: srcCurrency } =
			convertPriceItemValue(sourcePrice);
		const { price: destValue, currency: destCurrency } =
			convertPriceItemValue(destinationPrice);

		notification.open({
			placement: "top",
			key: "success-exchange",
			duration: null,
			onClose: onCloseNotification,
			style: {
				width: "auto",
				textAlign: "center",
			},
			message: (
				<Typography.Title
					level={4}
					type="success"
					style={{
						marginTop: 0,
					}}
				>
					Transaction Success
				</Typography.Title>
			),
			description: (
				<>
					<ConfettiAnimation fireAngle={180} />

					<Card
						title="Please check the transaction information below:"
						style={{ width: "100%" }}
					>
						<Flex vertical gap={8} align="start">
							<Typography.Text>
								Your Amount: <strong>{sourceAmount}</strong>
							</Typography.Text>
							<Typography.Text>
								Source Price: <strong>{srcValue}</strong> - {srcCurrency}
							</Typography.Text>
							<Typography.Text>
								Destination Price: <strong>{destValue}</strong> - {destCurrency}
							</Typography.Text>
							<Typography.Text>
								Converted Amount:{" "}
								<strong
									style={{
										color: token.colorPrimaryTextActive,
									}}
								>
									{convertedValue}
								</strong>
							</Typography.Text>
						</Flex>
					</Card>

					<ConfettiAnimation fireAngle={0} />
				</>
			),
		});
	};

	return {
		openSuccessNotification,
	};
};
