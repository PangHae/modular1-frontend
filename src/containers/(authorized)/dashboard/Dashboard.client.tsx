import ContentWrapper from '@/components/layouts/ContentWrapper';

import PortfolioChart from './_view/PortfolioChart';
import PortfolioProfitChartCard from './_view/PortfolioProfitChartCard';
import ProfitRatePerStock from './_view/ProfitRatePerStock';
import RecentExecutions from './_view/RecentExecutions';
import TopProfitRate from './_view/TopProfitRate';

const DashboardClient = () => {
	return (
		<ContentWrapper>
			<div className="flex flex-col gap-4 h-full min-h-[calc(100%-64px)]">
				<div className="flex gap-4 flex-[4] min-h-0">
					<PortfolioProfitChartCard />
					<PortfolioChart />
				</div>
				<div className="flex gap-4 flex-[3] min-h-0">
					<TopProfitRate />
					<ProfitRatePerStock />
					<RecentExecutions />
				</div>
			</div>
		</ContentWrapper>
	);
};

export default DashboardClient;
