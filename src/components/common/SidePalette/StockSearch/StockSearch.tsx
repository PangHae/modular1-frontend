import StockFilterChip from './StockFilterChip';
import StockList from './StockList';
import SearchInput from '../../SearchInput';

const StockSearch = () => {
	return (
		<div className="flex-1 flex flex-col gap-4 p-4">
			<SearchInput className="w-full" onSearch={() => {}} />
			<div className="flex gap-2">
				<StockFilterChip selected={true} type="all" onChange={() => {}} />
				<StockFilterChip selected={false} type="my" onChange={() => {}} />
			</div>
			<StockList />
		</div>
	);
};

export default StockSearch;
