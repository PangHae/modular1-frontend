import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex gap-4 flex-4">
				<DashboardCard className="flex-1">카드입니다.</DashboardCard>
				<div className="flex flex-col gap-4 flex-1">
					<DashboardCard className="flex-1">카드입니다.</DashboardCard>
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
