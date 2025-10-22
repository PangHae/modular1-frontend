import { FC } from 'react';

import dynamic from 'next/dynamic';

import { StrategyAiSummary, StrategyTemplate } from '@/@types/strategy';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import PreviewStrategy from './PreviewStrategy';

const StrategyAIDetail = dynamic(() => import('./StrategyAIDetail'), {
	ssr: true,
});

const PreviewCode = dynamic(() => import('./PreviewCode'), {
	ssr: true,
});

interface Props {
	strategyTemplate: StrategyTemplate;
	strategySummary: StrategyAiSummary;
	code: string;
}

const StrategyDetailTab: FC<Props> = ({
	strategyTemplate,
	strategySummary,
	code,
}) => {
	return (
		<Tabs defaultValue="preview" className="flex flex-col">
			<TabsList className="bg-transparent p-0 h-auto gap-2 flex-shrink-0">
				<TabsTrigger
					className="cursor-pointer data-[state=active]:bg-shinhan-blue! data-[state=active]:text-white! data-[state=active]:border-shinhan-blue data-[state=inactive]:bg-shinhan-blue/8 data-[state=inactive]:text-black data-[state=inactive]:border-shinhan-blue/20 border rounded-full px-4 py-2 h-[36px] text-button transition-all duration-200 w-[100px]"
					value="preview"
				>
					미리보기
				</TabsTrigger>
				<TabsTrigger
					className="cursor-pointer data-[state=active]:bg-shinhan-blue! data-[state=active]:text-white! data-[state=active]:border-shinhan-blue data-[state=inactive]:bg-shinhan-blue/8 data-[state=inactive]:text-black data-[state=inactive]:border-shinhan-blue/20 border rounded-full px-4 py-2 h-[36px] text-button transition-all duration-200 w-[100px]"
					value="summary"
				>
					AI 전략 요약
				</TabsTrigger>
				<TabsTrigger
					className="cursor-pointer data-[state=active]:bg-shinhan-blue! data-[state=active]:text-white! data-[state=active]:border-shinhan-blue data-[state=inactive]:bg-shinhan-blue/8 data-[state=inactive]:text-black data-[state=inactive]:border-shinhan-blue/20 border rounded-full px-4 py-2 h-[36px] text-button transition-all duration-200 w-[100px]"
					value="code"
				>
					코드 도우미
				</TabsTrigger>
			</TabsList>
			<TabsContent value="preview">
				<PreviewStrategy
					sell={strategyTemplate?.sell || null}
					buy={strategyTemplate?.buy || null}
				/>
			</TabsContent>
			<TabsContent value="summary">
				<StrategyAIDetail
					summaryOverview={strategySummary.summaryOverview}
					summaryCondition={strategySummary.summaryCondition}
					summaryRisk={strategySummary.summaryRisk}
				/>
			</TabsContent>
			<TabsContent value="code">
				<PreviewCode code={code || '코드가 생성되지 않았습니다.'} />
			</TabsContent>
		</Tabs>
	);
};

export default StrategyDetailTab;
