import { stockData } from '@/mock/stockData';

import StockItem from './StockItem';

const StockList = () => {
	return (
		<div className="flex flex-col gap-1">
			{stockData.map((stock) => (
				<StockItem key={stock.id} stock={stock} />
			))}
		</div>
	);
};

export default StockList;
