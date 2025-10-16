'use client';

import SidePalette from '@/components/common/SidePalette';
import StockSearch from '@/components/common/SidePalette/StockSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStocks } from '@/hooks/api/stocks/useStocks';

interface Props {
	selectedStock: string;
	onSelectStock: (stock: string) => void;
}

const StockSelectClient = ({ selectedStock, onSelectStock }: Props) => {
	const { data: stocks } = useStocks();

	const handleSelectStock = (stock: { name: string; code: string }) => {
		onSelectStock(`${stock.name} (${stock.code})`);
	};

	return (
		<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
			<div className="flex flex-1 gap-4">
				{/* 검색 입력 */}
				<SidePalette>
					<StockSearch
						onClick={handleSelectStock}
						stocks={stocks?.data.stocks || []}
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
