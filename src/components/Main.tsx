import * as React from "react";
import ItemTable from "./ItemTable";

type Props = {
	itemType: string;
}
const Main: React.FC<Props> = ({itemType}) => {

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">David Johnson Tech Test</a>
				</div>
			</nav>
			<div className="container-fluid">
				{/*Pass in your itemType and colTypes here to be able to consume a different type eg. itemType="dragons" colTypes="['name', 'type', 'crew_capacity', 'first_flight'". note you will need to extend the DataType with any extra properties you require */}
				<ItemTable itemType={itemType} colTypes={['company', 'country', 'rocket_name', 'rocket_type', 'rocket_id']} />
			</div>
		</>
	);
};

export default Main;