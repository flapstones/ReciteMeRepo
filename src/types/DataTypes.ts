
//Extend this DataType to contain whichever properties are required for the itemType
export type DataType = {
	flickr_images?: string;
	id?: number;
	rocket_name?: string;
	rocket_type?: string;
	company?: string;
	country?: string;
	rocket_id?: string;
	description?: string;
};

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
			type: Key;
		}
		: {
			type: Key;
			payload: M[Key];
		}
};

export enum Types {
	Load = 'LOAD_DATA'
}

type ProductPayload = {
	[Types.Load]: { data: []};
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<
	ProductPayload
>];



