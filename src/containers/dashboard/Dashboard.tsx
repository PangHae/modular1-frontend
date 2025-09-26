import StockProfitInfo from '@/components/common/StockProfitInfo';
import ContentWrapper from '@/components/layouts/ContentWrapper';
import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';

import HeatmapChart from './_view/HeatmapChart';
import PortfolioChart from './_view/PortfolioChart';
import PortfolioProfitChartCard from './_view/PortfolioProfitChartCard';

const Dashboard = () => {
	return (
		<ContentWrapper>
			<div className="flex flex-col gap-4 h-[calc(100%-80px)] min-h-[calc(100vh-80px)]">
				<div className="flex gap-4 flex-[4] min-h-[400px]">
					<PortfolioProfitChartCard />
					<div className="flex flex-col gap-4 flex-1 min-w-0">
						<PortfolioChart />
						<HeatmapChart />
					</div>
				</div>
				<div className="flex gap-4 flex-[3] min-h-[300px]">
					<DashboardCard
						className="flex-1 flex flex-col overflow-hidden"
						title="수익률 Top10"
					>
						<div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
							<StockProfitInfo
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<StockProfitInfo
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<StockProfitInfo
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<StockProfitInfo
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
							<StockProfitInfo
								imageUrl="/icons/WMT.png"
								stock="WMT"
								profit={100000}
								count={100}
								amount={100000}
								profitRate={10}
							/>
						</div>
					</DashboardCard>
					<DashboardCard
						className="flex-1 flex flex-col overflow-hidden"
						title="종목별 수익률"
					></DashboardCard>
					<DashboardCard
						className="flex-1 flex flex-col overflow-hidden"
						title="최근 체결 내역"
					></DashboardCard>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Dashboard;
