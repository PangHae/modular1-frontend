'use client';

import { FC, useState } from 'react';

import { Stock } from '@/@types/stock';

import StockFilterChip from './StockFilterChip';
import StockList from './StockList';
import SearchInput from '../../SearchInput';

interface Props {
	onClick: (stock: { name: string; code: string }) => void;
	stocks: Stock[];
	myStocks: Stock[];
}

const StockSearch: FC<Props> = ({ onClick, stocks, myStocks }) => {
	const [filterType, setFilterType] = useState<string>('all');
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleFilterChange = (type: string) => {
		setFilterType(type);
		setSearchQuery('');
	};

	return (
		<div className="flex-1 flex flex-col gap-4 p-4 pr-0">
			<div className="pr-4">
				<SearchInput
					className="w-full h-[40px] py-1 px-3"
					searchQuery={searchQuery}
					onSearch={handleSearch}
				/>
			</div>
			<div className="flex gap-2">
				<StockFilterChip
					selected={filterType === 'all'}
					type="all"
					onChange={() => handleFilterChange('all')}
				/>
				<StockFilterChip
					selected={filterType === 'my'}
					type="my"
					onChange={() => handleFilterChange('my')}
				/>
			</div>
			{filterType === 'all' && (
				<StockList
					onClick={onClick}
					stocks={stocks.filter((stock) =>
						stock.stockName.includes(searchQuery)
					)}
				/>
			)}
			{filterType === 'my' && (
				<StockList
					onClick={onClick}
					stocks={myStocks.filter((stock) =>
						stock.stockName.includes(searchQuery)
					)}
				/>
			)}
		</div>
	);
};

export default StockSearch;
