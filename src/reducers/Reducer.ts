import {DataType, ItemActions, Types} from "../types/DataTypes";

export const itemReducer = (
	state: DataType[],
	action: ItemActions
) => {
	switch (action.type) {
		case Types.Load:
			return action.payload.data;
		default:
			return state;
	}
};

