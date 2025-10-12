import { FC } from 'react';

import { stockData } from '@/mock/stockData';

import StockItem from './StockItem';

interface Props {
	onClick: (stock: { name: string; code: string }) => void;
}

const StockList: FC<Props> = ({ onClick }) => {
	return (
		<div className="flex flex-col gap-1">
			{stockData.map((stock) => (
				<StockItem key={stock.id} stock={stock} onClick={onClick} />
			))}
		</div>
	);
};

export default StockList;
