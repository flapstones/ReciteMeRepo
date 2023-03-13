import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import API from "../api/api";
import {DataType} from "../types/DataTypes";
import {SpinnerCircular} from "spinners-react";

const ItemView: React.FC = () => {
	const [itemData, setItemData] = useState({} as DataType);
	const [isLoading, setIsLoading] = useState(true);
	const routeParams = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		API.get<DataType>('rockets/'+ routeParams.id).then(item => {
			// @ts-ignore
			setItemData(item.data);
			setIsLoading(false);
		})
	}, []);

	return (
		<div className="container-fluid item-container">
			<div className="row">
				<div className="col-2"></div>
				{!isLoading ?
					(<div className="col-8">
						<header>
							<h1>{itemData.rocket_name}</h1>
						</header>
						<article>
							<div className="content">
								<div className="image-container">
									<img alt={`Image of ${itemData.rocket_name}`} src={itemData.flickr_images ? itemData.flickr_images[0] : ''} />
								</div>
								<div className="info-container">
									<p><b>Country: </b> {itemData.country}</p>
									<p>{itemData.description}</p>
									<button className="btn btn-primary" onClick={() => {
										navigate("/");
									}}>Back to main table</button>
								</div>

							</div>
						</article>
					</div>) : <div className="spinner-container"><SpinnerCircular size={300} /></div>}
			</div>
		</div>
	)
};

export default ItemView;