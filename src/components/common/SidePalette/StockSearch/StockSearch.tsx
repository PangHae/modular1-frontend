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

const StockSearch: FC<Props> = ({ onClick, stocks }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterType, setFilterType] = useState<string>('all');

	const handleSearch = (query: string) => {
		setSearchQuery(query);
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
					onChange={() => setFilterType('all')}
				/>
				<StockFilterChip
					selected={filterType === 'my'}
					type="my"
					onChange={() => setFilterType('my')}
				/>
			</div>
			<StockList
				onClick={onClick}
				stocks={stocks.filter((stock) => stock.stockName.includes(searchQuery))}
			/>
		</div>
	);
};

export default StockSearch;
