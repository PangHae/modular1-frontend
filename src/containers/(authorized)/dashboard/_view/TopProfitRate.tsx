'use client';

import InvestmentRankingItem from '@/components/common/InvestmentRankingItem';
import { CardLoading } from '@/components/common/Loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccountProfitRateRanking } from '@/hooks/api/accounts/useAccountProfitRateRanking';

const TopProfitRate = () => {
	const { data, isLoading } = useAccountProfitRateRanking();

	return (
		<Card className="flex-1 flex flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>금주 수익률 Top 10</CardTitle>
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
							금주 수익률 데이터가 없습니다.
						</div>
					</div>
				)}
				{data?.data.items.map((item) => (
					<InvestmentRankingItem
						key={item.stockCode}
						imageUrl={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${item.stockCode}.png?width=64&height=64`}
						stockName={item.stockName}
						profit={item.pnl}
						count={item.qty}
						amount={item.costBasis}
						profitRate={item.profitRate}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default TopProfitRate;
