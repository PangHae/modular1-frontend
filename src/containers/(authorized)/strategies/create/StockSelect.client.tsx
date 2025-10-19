'use client';

import { FC } from 'react';

import SidePalette from '@/components/common/SidePalette';
import StockSearch from '@/components/common/SidePalette/StockSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMyStocks } from '@/hooks/api/stocks/useMyStocks';
import { useStocks } from '@/hooks/api/stocks/useStocks';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

const StockSelectClient: FC = () => {
	const { data: stocks } = useStocks();
	const { data: myStocks } = useMyStocks();
	const { selectedStock, setSelectedStock } = useCreateStrategyContext();

	const handleSelectStock = (stock: { name: string; code: string }) => {
		setSelectedStock(stock.code);
	};

	return (
		<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
			<div className="flex flex-1 gap-4">
				{/* 검색 입력 */}
				<SidePalette>
					<StockSearch
						onClick={handleSelectStock}
						stocks={stocks?.data.stocks || []}
						myStocks={myStocks?.data?.stocks || []}
					/>
				</SidePalette>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>선택된 종목</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{selectedStock}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StockSelectClient;
