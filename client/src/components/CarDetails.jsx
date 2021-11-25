import React from 'react';
import { DetailsSkeletonComponent } from './SkeletonComponents';
import './carDetails.css';

const CarDetails = ({ car, isLoading }) => {
	return isLoading ?
		(<div className="carDetails-main">
			<DetailsSkeletonComponent />
		</div>)
		:
		(
			<div className="carDetails-main">
				{car.imageUrl && (
					<div className="card car-image">
						<img
							src={car.imageUrl}
							alt="Car"
							width="400"
						/>
					</div>
				)}
				<div className="card car-info">
					<div className="car-info-field">
						<h3>Name:</h3>
						<h4>{car.name}</h4>
					</div>
					<div className="car-info-field">
						<h3>Production period:</h3>
						{car.productionPeriod.map((value, i) => (
							<h4 key={i}>{value}</h4>
						))}
					</div>
					{car.bodyClass.length > 0 && (
						<div className="car-info-field">
							<h3>Body class:</h3>
							{car.bodyClass.map((value, i) => (
								<h4 key={i}>{value}</h4>
							))}
						</div>
					)}
				</div>
			</div>
		)
}

export default CarDetails
