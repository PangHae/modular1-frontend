import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';
import PortfolioProfitChartCard from './_view/PortfolioProfitChartCard';
import PortfolioChart from './_view/PortfolioChart';

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex gap-4 flex-4">
				<PortfolioProfitChartCard />
				<div className="flex flex-col gap-4 flex-1">
					<PortfolioChart />
					<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				</div>
			</div>
			<div className="flex gap-4 flex-3">
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
			</div>
		</div>
	);
};

export default Dashboard;
