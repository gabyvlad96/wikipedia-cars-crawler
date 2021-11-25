import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ListSkeletonComponent } from './SkeletonComponents';
import './navigation.css';


const Item = ({ value, onItemClick, index, selected }) => {
	const onClick = () => {
		onItemClick(value, index);
	}
	return (
		<li className={`navigation-item ${selected? 'selected-item' : ''}`} onClick={onClick}>
			<span>{value.name}</span>
		</li>
	)
}

const Navigation = ({ data, onItemClick, isLoading }) => {
	const [searchInput, setSearchInput] = useState('');
	const [displayData, setDisplayData] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);

	useEffect(() => {
		setDisplayData(data);
	}, [data]);

	const handleSearchFieldChange = (e) => {
		const searchInput = e.target.value;
		setSearchInput(searchInput);
		const filteredList = data.filter(car => car.name.toLowerCase().includes(searchInput));
		setDisplayData(filteredList);
	}

	const onSelectItem = (value, index) => {
		setSelectedIndex(index)
		onItemClick(value)
	}

	return isLoading ? 
		(<div className="navigation-main">
				<ListSkeletonComponent />
		</div>)
		:		
		(
			<div className="navigation-main">
				<Box
					component="form"
					sx={{ '& > :not(style)': { m: 1, width: 'calc(100% - 1rem)' }}}
					noValidate
					autoComplete="off"
				>
					<TextField
						value={searchInput}
						onChange={handleSearchFieldChange}
						onKeyDown={e => { e.code === 'Enter' && e.preventDefault() }}
						label="Search"
						variant="outlined"
					/>
				</Box>
				<div className="list">
					<ul>
						{displayData && displayData.map((item, i) => (
							<Item
								onItemClick={onSelectItem}
								selected={selectedIndex === i}
								value={item}
								key={i}
								index={i}
							/>
							))}
					</ul>
				</div>
			</div>
		)
}

export default Navigation
