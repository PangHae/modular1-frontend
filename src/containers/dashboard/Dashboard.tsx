import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';
import PortfolioProfitChartCard from './_view/PortfolioProfitChartCard';
import PortfolioChart from './_view/PortfolioChart';
import HeatmapChart from './_view/HeatmapChart';

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-4 h-[calc(100%-80px)] min-h-[calc(100vh-80px)]">
			<div className="flex gap-4 flex-[4] min-h-[400px]">
				<PortfolioProfitChartCard />
				<div className="flex flex-col gap-4 flex-1 min-w-0">
					<PortfolioChart />
					<HeatmapChart />
				</div>
			</div>
			<div className="flex gap-4 flex-[3] min-h-[300px]">
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
			</div>
		</div>
	);
};

export default Dashboard;
