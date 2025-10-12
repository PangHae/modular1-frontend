import { FC } from 'react';

import StockFilterChip from './StockFilterChip';
import StockList from './StockList';
import SearchInput from '../../SearchInput';

interface Props {
	onClick: (stock: { name: string; code: string }) => void;
}

const StockSearch: FC<Props> = ({ onClick }) => {
	return (
		<div className="flex-1 flex flex-col gap-4 p-4">
			<SearchInput className="w-full h-[40px] py-1 px-3" onSearch={() => {}} />
			<div className="flex gap-2">
				<StockFilterChip selected={true} type="all" onChange={() => {}} />
				<StockFilterChip selected={false} type="my" onChange={() => {}} />
			</div>
			<StockList onClick={onClick} />
		</div>
	);
};

export default StockSearch;
