import * as React from "react";
import {AppContext} from "../context/AppProvider";
import {useEffect} from "react";
import API from "../api/api";
import {Types} from "../types/DataTypes";
import {useNavigate} from "react-router-dom";
import {useFilters, useTable} from "react-table";
import { SpinnerCircular } from 'spinners-react';

type Props = {
	itemType: string;
	colTypes: string[];
}
const ItemTable: React.FC<Props> = ({itemType, colTypes}) => {
	const { state, dispatch } = React.useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		API.get(`${itemType}`).then(data => {
			dispatch({type: Types.Load, payload: data})
		})
	}, []);

	const data = React.useMemo(
		() => state.data.map(item => {
			let selectedTypes = {};
			colTypes.forEach(col => {
				// @ts-ignore
				selectedTypes[col] = item[col];
			});

			return selectedTypes
		}),
		[state.data]
	)

	type FilterColumn = {
		column: {
			filterValue: any;
			preFilteredRows: any;
			setFilter: any;
		}
	}
	const DefaultFilterForColumn: React.FC<FilterColumn> = ({
		column: {
			filterValue,
			preFilteredRows: { length },
			setFilter,
		},
	}) => {
		return (
			<input
				className="form-control"
				value={filterValue || ""}
				onChange={(e) => {
					setFilter(e.target.value || undefined);
				}}
				placeholder={`Search ${length} records..`}
				style={{ marginTop: "10px" }}
			/>
		);
	}

	const columns = React.useMemo(
		() => [
			{
				Header: 'Company',
				accessor: 'company',
				Filter: DefaultFilterForColumn
			},
			{
				Header: 'Country',
				accessor: 'country',
				Filter: DefaultFilterForColumn
			},
			{
				Header: 'Rocket Name',
				accessor: 'rocket_name',
				Filter: DefaultFilterForColumn
			},
			{
				Header: 'Rocket Type',
				accessor: 'rocket_type',
				Filter: DefaultFilterForColumn
			},
			{
				Header: 'Rocket ID',
				accessor: 'rocket_id',
				Filter: DefaultFilterForColumn
			},
		],
		[]
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		// @ts-ignore
		columns,
		data
	}, useFilters);

	return (
		<div className="container-fluid table-container">
			<div className="row">
				<div className="col-12">
					{data.length ?
						(<table className="table table-striped table-hover table-bordered" {...getTableProps()}>
						<thead className="thead-dark">
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th
										{...column.getHeaderProps()}
									>
										{column.render('Header')}
										<div>
											{column.canFilter ? column.render("Filter")
												:null}
										</div>
									</th>
								))}
							</tr>
						))}
						</thead>
						<tbody {...getTableBodyProps()}>
						{rows.map(row => {
							prepareRow(row)
							return (
								<tr title={`Click through for detailed information`} onClick={() => {
									navigate("/"+ row.values.rocket_id);
								}} {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td
												{...cell.getCellProps()}
											>
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
						</tbody>
						</table>) :  <div className="spinner-container"><SpinnerCircular size={300} /></div>}
				</div>
			</div>
		</div>
	)
}

export default ItemTable;