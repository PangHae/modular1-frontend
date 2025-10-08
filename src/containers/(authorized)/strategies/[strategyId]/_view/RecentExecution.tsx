'use client';

import { FC } from 'react';

import { Execution } from '@/@types/execution';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Props {
	executions: Execution[];
}

const RecentExecution: FC<Props> = ({ executions }) => {
	if (!executions) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-gray-500">No data</div>
			</div>
		);
	}

	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>최근 체결 내역</CardTitle>
			</CardHeader>
			<CardContent className="h-full p-0">
				<div className="h-full overflow-y-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-left pl-6">시간</TableHead>
								<TableHead className="text-left pl-6">매매</TableHead>
								<TableHead className="text-left pl-6">수량</TableHead>
								<TableHead className="text-left pl-6">금액</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{executions.map((execution) => (
								<TableRow key={execution.id} className="hover:bg-gray-50">
									<TableCell className="text-left text-sm pl-6">
										{new Date(execution.executionTime).toLocaleString('ko-KR', {
											year: 'numeric',
											month: '2-digit',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										})}
									</TableCell>
									<TableCell className="text-left pl-6">
										<span
											className={cn(
												'px-2 py-1 text-xs rounded-full',
												execution.tradeExecutionType === 'BUY'
													? 'bg-blue-100 text-blue-700'
													: 'bg-red-100 text-red-700'
											)}
										>
											{execution.tradeExecutionType === 'BUY' ? '매수' : '매도'}
										</span>
									</TableCell>
									<TableCell className="text-left text-sm pl-6">
										{execution.tradeExecutionQuantity}주
									</TableCell>
									<TableCell className="text-left text-sm pl-6">
										{(
											execution.tradeExecutionPrice *
											execution.tradeExecutionQuantity
										).toLocaleString()}
										원
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default RecentExecution;
