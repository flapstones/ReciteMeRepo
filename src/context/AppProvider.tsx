import React, { createContext, useReducer, Dispatch } from "react";
import {DataType, ItemActions} from "../types/DataTypes";
import {
	itemReducer,
} from "../reducers/Reducer";


type InitialStateType = {
	data: DataType[];
};

const initialState = {
	data: []
};

const AppContext = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<ItemActions>;
}>({
	state: initialState,
	dispatch: () => null
});

const mainReducer = (
	{ data }: InitialStateType,
	action: ItemActions
) => ({
	data: itemReducer(data, action)
});
interface Props {
	children: React.ReactNode;
}
const AppProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(mainReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppProvider, AppContext };