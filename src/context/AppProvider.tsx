import React, { createContext, useReducer, Dispatch } from "react";
import {DataType, ProductActions} from "../types/DataTypes";
import {
	productReducer,
} from "../reducers/Reducer";


type InitialStateType = {
	data: DataType[];
};

const initialState = {
	data: []
};

const AppContext = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<ProductActions>;
}>({
	state: initialState,
	dispatch: () => null
});

const mainReducer = (
	{ data }: InitialStateType,
	action: ProductActions
) => ({
	data: productReducer(data, action)
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