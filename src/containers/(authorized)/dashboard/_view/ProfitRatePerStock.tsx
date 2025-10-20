'use client';

import { CardLoading } from '@/components/common/Loading';
import StockProfitRateItem from '@/components/common/StockProfitRateItem';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStockProfitRate } from '@/hooks/api/accounts/useStockProfitRate';

const ProfitRatePerStock = () => {
	const { data, isLoading } = useStockProfitRate();

	return (
		<Card className="flex-1 flex flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>종목별 수익률</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
				{isLoading && (
					<div className="flex items-center justify-center h-64">
						<CardLoading showBackground={false} />
					</div>
				)}
				{!isLoading && !data && (
					<div className="flex items-center justify-center h-64">
						<div className="text-sub2 text-gray-500">
							종목 별 수익률 데이터가 없습니다.
						</div>
					</div>
				)}
				{data?.data.stockData.map((stock) => (
					<StockProfitRateItem
						key={stock.stockCode}
						stockName={stock.stockName}
						stockCode={stock.stockCode}
						amount={stock.qty}
						profitRate={stock.profitRate}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default ProfitRatePerStock;
