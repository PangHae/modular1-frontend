import InvestmentRankingItem from '@/components/common/InvestmentRankingItem';
import StockProfitRateItem from '@/components/common/StockProfitRateItem';
import TradeExecutionItem from '@/components/common/TradeExecutionItem';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import PortfolioChart from './_view/PortfolioChart';
import PortfolioProfitChartCard from './_view/PortfolioProfitChartCard';

const Dashboard = () => {
	return (
		<ContentWrapper>
			<div className="flex flex-col gap-4 h-[calc(100%-80px)] min-h-[calc(100vh-80px)]">
				<div className="flex gap-4 flex-[4] min-h-[400px]">
					<PortfolioProfitChartCard />
					<PortfolioChart />
				</div>
				<div className="flex gap-4 flex-[3] min-h-[300px]">
					<Card className="flex-1 flex flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>수익률 Top10</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
							<InvestmentRankingItem
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<InvestmentRankingItem
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<InvestmentRankingItem
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<InvestmentRankingItem
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<InvestmentRankingItem
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
						</CardContent>
					</Card>
					<Card className="flex-1 flex flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>종목별 수익률</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
							<StockProfitRateItem
								stockName="LG에너지솔루션"
								stockCode="373220"
								amount={30}
								profitRate={8.7}
							/>
							<StockProfitRateItem
								stockName="LG에너지솔루션"
								stockCode="373220"
								amount={14530}
								profitRate={8.7}
							/>
							<StockProfitRateItem
								stockName="LG에너지솔루션"
								stockCode="373220"
								amount={30}
								profitRate={8.7}
							/>
							<StockProfitRateItem
								stockName="LG에너지솔루션"
								stockCode="373220"
								amount={30}
								profitRate={8.7}
							/>
						</CardContent>
					</Card>
					<Card className="flex-1 flex flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>최근 체결 내역</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
							<TradeExecutionItem
								type="buy"
								stockName="삼성전자"
								strategyName="골든크로스"
								dateTime="2025.09.23 09:30"
								amount={720000}
							/>
							<TradeExecutionItem
								type="sell"
								stockName="SK 하이닉스"
								strategyName="어쩌구저쩌구전략"
								dateTime="2025.09.23 09:30"
								amount={456000}
							/>
							<TradeExecutionItem
								type="buy"
								stockName="삼성전자"
								strategyName="골든크로스"
								dateTime="2025.09.23 09:30"
								amount={720000}
							/>
							<TradeExecutionItem
								type="sell"
								stockName="SK 하이닉스"
								strategyName="어쩌구저쩌구전략"
								dateTime="2025.09.23 09:30"
								amount={456000}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Dashboard;
