'use client';

import { FC } from 'react';

import { ChartColumn, TriangleAlert, Eye } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
	summaryOverview: string;
	summaryCondition: string;
	summaryRisk: string;
}

const StrategyAIDetail: FC<Props> = ({
	summaryOverview,
	summaryCondition,
	summaryRisk,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-rows-3 gap-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ChartColumn className="w-5 h-5" />
						전략 한 눈에 보기
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600 leading-relaxed">
						{summaryOverview}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TriangleAlert className="w-5 h-5" />
						리스크 관리
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600 leading-relaxed">{summaryRisk}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Eye />
						매매 조건 요약
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600 leading-relaxed">
						{summaryCondition}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default StrategyAIDetail;
