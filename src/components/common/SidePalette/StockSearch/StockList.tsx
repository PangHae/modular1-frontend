import { FC } from 'react';

import { Stock } from '@/@types/stock';

import StockItem from './StockItem';

interface Props {
	onClick: (stock: { name: string; code: string }) => void;
	stocks: Stock[];
}

const StockList: FC<Props> = ({ onClick, stocks }) => {
	return (
		<div className="flex flex-col gap-1 overflow-y-auto">
			{stocks.map((stock) => (
				<StockItem
					key={stock.stockCode}
					stockCode={stock.stockCode}
					stockName={stock.stockName}
					onClick={onClick}
				/>
			))}
		</div>
	);
};

export default StockList;
