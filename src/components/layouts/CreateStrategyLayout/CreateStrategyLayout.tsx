'use client';

import { FC, PropsWithChildren, RefObject } from 'react';

import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Step = 1 | 2;

interface Props {
	strategyNameRef: RefObject<HTMLInputElement | null>;
	className?: string;
	currentStep: Step;
	selectedStock: { name: string; code: string };
	onNext: () => void;
	onPrev: () => void;
	onCreateStrategy: () => void;
}

const STEP_MAP = {
	1: {
		title: '종목 선택',
		description: '투자할 종목을 선택해주세요.',
	},
	2: {
		title: '전략 구성',
		description: '전략 타입을 선택하고 블록을 배치해주세요.',
	},
};

const CreateStrategyLayout: FC<PropsWithChildren<Props>> = ({
	strategyNameRef,
	className,
	children,
	currentStep,
	selectedStock,
	onNext,
	onPrev,
	onCreateStrategy,
}) => {
	return (
		<div
			className={cn(
				'flex flex-col h-full bg-custom-gray-bg max-h-full',
				className
			)}
		>
			{/* 상단 진행 표시바 */}
			<div className="relative flex items-center justify-between gap-4 px-6 py-8 bg-white">
				<div className="flex gap-4 items-center">
					{currentStep === 1 && (
						<Link href="/strategies">
							<Button variant="outline" className="flex items-center gap-2">
								<ChevronLeft className="w-4 h-4" />
								이전
							</Button>
						</Link>
					)}
					{currentStep === 2 && (
						<Button
							variant="outline"
							onClick={onPrev}
							className="flex items-center gap-2"
						>
							<ChevronLeft className="w-4 h-4" />
							이전
						</Button>
					)}
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							{STEP_MAP[currentStep].title}
						</h2>
						<p className="text-sm text-gray-600">
							{STEP_MAP[currentStep].description}
						</p>
					</div>
				</div>

				<div className="absolute max-w-4xl mx-auto left-1/2 -translate-x-1/2 top-[calc(50% + 32px)] -translate-y-[50% + 16px]">
					<div className="flex items-center justify-center">
						<div className="flex items-center gap-4">
							<div
								className={cn(
									'flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium',
									currentStep >= 1
										? 'bg-blue-100 text-blue-700'
										: 'bg-gray-100 text-gray-500'
								)}
							>
								<div
									className={cn(
										'w-6 h-6 rounded-full flex items-center justify-center text-xs',
										currentStep >= 1
											? 'bg-blue-600 text-white'
											: 'bg-gray-300 text-gray-600'
									)}
								>
									1
								</div>
								종목 선택
							</div>
							<div className="w-8 h-0.5 bg-gray-200" />
							<div
								className={cn(
									'flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium',
									currentStep >= 2
										? 'bg-blue-100 text-blue-700'
										: 'bg-gray-100 text-gray-500'
								)}
							>
								<div
									className={cn(
										'w-6 h-6 rounded-full flex items-center justify-center text-xs',
										currentStep >= 2
											? 'bg-blue-600 text-white'
											: 'bg-gray-300 text-gray-600'
									)}
								>
									2
								</div>
								전략 구성
							</div>
						</div>
					</div>
				</div>
				{currentStep === 1 && (
					<div className="flex items-center gap-4">
						<Button
							className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 cursor-pointer"
							onClick={onNext}
							disabled={!selectedStock.code}
						>
							다음
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				)}
				{currentStep === 2 && (
					<div className="flex items-center gap-4">
						<Input
							ref={strategyNameRef}
							placeholder="전략 이름을 입력해주세요"
							className="w-64"
						/>
						<Button
							className="bg-blue-600 hover:bg-blue-700"
							onClick={onCreateStrategy}
						>
							전략 생성하기
						</Button>
					</div>
				)}
			</div>
			{/* 메인 콘텐츠 */}
			<div className="flex-1 overflow-hidden">{children}</div>
		</div>
	);
};

export default CreateStrategyLayout;
