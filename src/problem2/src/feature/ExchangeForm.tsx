import React from "react";
import { Flex, Form, Modal, message } from "antd";
import Converter from "../components/Converter";
import SourceAmount from "../components/SourceAmount";
import Submitter from "../components/Submitter";
import DestinationAmount from "../components/DestinationAmount";
import { ExchangeFormType } from "../common/types";
import {
	destPriceFieldName,
	srcAmountFieldName,
	srcPriceFieldName,
} from "../lib/constants";
import {
	calcDestinationAmount,
	calcExchangeRate,
	convertPriceItemValue,
	waitTime,
} from "../lib/utils";
import ExchangeRateContent from "../components/ExchangeRateContent";
import { useGetPriceList } from "../hooks/useGetPricesList";
import { useOpenSuccessNotification } from "../hooks/useOpenSuccessNotification";
import { usePriceContext } from "../store/usePriceContext";
import ConvertResult from "../components/ConvertResult";

interface ExchangeFormProps {
	onCloseForm: () => void;
	openForm: boolean;
}

const ExchangeForm: React.FC<ExchangeFormProps> = ({
	openForm,
	onCloseForm,
}) => {
	// form state
	const [form] = Form.useForm<ExchangeFormType>();
	const srcAmount = Form.useWatch(srcAmountFieldName, form);
	const srcPrice = Form.useWatch(srcPriceFieldName, form);
	const destPrice = Form.useWatch(destPriceFieldName, form);

	//hooks
	useGetPriceList();
	const { openSuccessNotification } = useOpenSuccessNotification();
	const setHandling = usePriceContext((state) => state.setHandling);
	const setLoading = usePriceContext((state) => state.setLoading);

	// calculate values
	const { price: srcValue, currency: srcCurrency } = convertPriceItemValue(
		srcPrice || ""
	);
	const { price: destValue, currency: destCurrency } = convertPriceItemValue(
		destPrice || ""
	);

	const exchangeRate = React.useMemo(() => {
		return srcValue > 0 && destValue > 0
			? calcExchangeRate(srcValue, destValue)
			: 0;
	}, [srcPrice, destPrice]);

	const exchangeContent = (
		<ExchangeRateContent
			exchangeRate={exchangeRate}
			srcCurrency={srcCurrency}
			destCurrency={destCurrency}
		/>
	);

	const convertedValue = calcDestinationAmount(srcAmount, exchangeRate);

	// actions
	const onSubmit = (values: ExchangeFormType) => {
		setLoading(true);

		try {
			// call api submit this exchange

			waitTime(() => {
				setLoading(false);
				onCloseForm();
				openSuccessNotification(values, convertedValue);
			});
		} catch (err) {
			message.error("Make exchange fail!");
		}
	};

	const onCancelForm = () => {
		setHandling(false);
		onCloseForm();
	};

	return (
		<Modal
			title="Exchange Form"
			open={openForm}
			onCancel={onCancelForm}
			afterClose={form.resetFields}
			footer={null}
			style={{
				width: 450,
			}}
		>
			<Form<ExchangeFormType>
				form={form}
				layout="vertical"
				name="exchange-price-form"
				initialValues={{
					[srcAmountFieldName]: 1,
				}}
				style={{
					width: "100%",
				}}
				onFinish={onSubmit}
			>
				<Flex vertical gap={24}>
					<SourceAmount destPrice={destPrice} />

					<Converter />

					<Flex vertical gap={8}>
						<DestinationAmount
							exchangeContent={exchangeContent}
							srcPrice={srcPrice}
						/>

						<ConvertResult value={convertedValue} />
					</Flex>

					<Submitter onReset={form.resetFields} />
				</Flex>
			</Form>
		</Modal>
	);
};

export default React.memo(ExchangeForm);
