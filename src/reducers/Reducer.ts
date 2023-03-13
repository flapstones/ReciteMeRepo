import {DataType, ProductActions, Types} from "../types/DataTypes";

export const productReducer = (
	state: DataType[],
	action: ProductActions
) => {
	switch (action.type) {
		case Types.Load:
			return action.payload.data;
		default:
			return state;
	}
};

