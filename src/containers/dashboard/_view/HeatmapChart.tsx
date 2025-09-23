'use client';

import DashboardCard from '@/components/layouts/DashboardCard/DashboardCard';
import { heatmapData } from '@/mock/chartData';
import CalendarHeatmap from 'react-calendar-heatmap';

import 'react-calendar-heatmap/dist/styles.css';

const HeatmapChart = () => {
	return (
		<DashboardCard className="flex-1">
			<CalendarHeatmap
				startDate={new Date('2025-01-01')}
				endDate={new Date('2025-08-31')}
				values={heatmapData}
				showMonthLabels
			/>
		</DashboardCard>
	);
};

export default HeatmapChart;
