import { create } from "zustand";
import { PriceItemType } from "../common/types";

type PriceState = {
	priceList: PriceItemType[];
	loading: boolean;
	handling: boolean;
};

type PriceAction = {
	setPriceList: (payload: PriceItemType[]) => void;
	setLoading: (payload: boolean) => void;
	setHandling: (payload: boolean) => void;
};

export const usePriceContext = create<PriceState & PriceAction>((set) => ({
	priceList: [],
	loading: false,
	handling: false,
	setPriceList: (payload: PriceItemType[]) =>
		set(() => ({
			priceList: payload,
		})),
	setLoading: (payload: boolean) =>
		set(() => ({
			loading: payload,
		})),
	setHandling: (payload: boolean) =>
		set(() => ({
			handling: payload,
		})),
}));
