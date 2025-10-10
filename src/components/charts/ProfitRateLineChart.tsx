import { FC } from 'react';

import {
	CartesianGrid,
	LineChart,
	XAxis,
	Line as RechartsLine,
	YAxis,
} from 'recharts';

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart';

interface Props {
	chartConfig: ChartConfig;
	chartLineData: any[];
	dataKey: string;
	id?: string;
}

const ProfitRateLineChart: FC<Props> = ({
	chartConfig,
	chartLineData,
	dataKey,
	id,
}) => {
	return (
		<ChartContainer id={id} config={chartConfig} className="w-full h-full">
			<LineChart
				accessibilityLayer
				data={chartLineData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					minTickGap={32}
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString('ko-KR', {
							month: 'short',
							day: 'numeric',
						});
					}}
				/>
				<YAxis dataKey={dataKey} tickLine={false} axisLine={false} />
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelFormatter={(value) => {
								const date = new Date(value);
								return date.toISOString().split('T')[0];
							}}
							formatter={(value) => (
								<div className="text-caption">
									수익률{' '}
									<span
										className={
											Number(value) > 0
												? 'text-red-500'
												: Number(value) < 0
													? 'text-blue-500'
													: 'text-gray-500'
										}
									>{`${value.toLocaleString('ko-KR')}%`}</span>
								</div>
							)}
						/>
					}
				/>
				<RechartsLine
					dataKey={dataKey}
					stroke={chartConfig[dataKey].color}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	);
};

export default ProfitRateLineChart;
