import axios from "axios";
import { API_SERVICE } from "../lib/constants";
import { message } from "antd";

export const apiService = async (
	uri: string,
	headerParams?: Record<string, any>
) => {
	const baseUrl = API_SERVICE + `/${uri}`;

	try {
		const { data } = await axios({
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(headerParams || {}),
			},
			url: baseUrl,
		});

		if (data) return data;
	} catch (error: any) {
		message.error(error?.message);
	}
};
