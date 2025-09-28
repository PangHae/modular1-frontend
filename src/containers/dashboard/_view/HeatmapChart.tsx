'use client';

import CalendarHeatmap from 'react-calendar-heatmap';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { heatmapData } from '@/mock/chartData';

import 'react-calendar-heatmap/dist/styles.css';

const HeatmapChart = () => {
	return (
		<Card className="min-h-0">
			<CardHeader>
				<CardTitle>거래 활동</CardTitle>
			</CardHeader>
			<CardContent>
				<CalendarHeatmap
					startDate={new Date('2025-01-01')}
					endDate={new Date('2025-08-31')}
					values={heatmapData}
					showMonthLabels
				/>
			</CardContent>
		</Card>
	);
};

export default HeatmapChart;
