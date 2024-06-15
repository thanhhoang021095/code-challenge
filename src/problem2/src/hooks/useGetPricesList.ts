import { message } from "antd";
import React from "react";
import { apiService } from "../services";
import { usePriceContext } from "../store/usePriceContext";

export const useGetPriceList = () => {
	const setPriceList = usePriceContext((state) => state.setPriceList);

	const getPriceList = async () => {
		try {
			const res = await apiService("prices.json");

			if (res) setPriceList(res);
		} catch (error: any) {
			message.error(error?.message);
		}
	};

	React.useEffect(() => {
		getPriceList();
	}, []);
};
