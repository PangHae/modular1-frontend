'use client';

import { FC, PropsWithChildren, useMemo } from 'react';

import Link from 'next/link';

import { BanknoteArrowDown, BanknoteArrowUp, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type StrategyType = 'BUY' | 'SELL';
type Step = 1 | 2;

interface Props {
	className?: string;
	currentStep: Step;
	strategyType: StrategyType;
	strategyName: string;
	onStrategyTypeChange: (type: StrategyType) => void;
	onStrategyNameChange: (name: string) => void;
	onNext: () => void;
	onPrev: () => void;
	onCreateStrategy: () => void;
	canProceed: boolean;
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
	className,
	children,
	currentStep,
	strategyType,
	strategyName,
	onStrategyTypeChange,
	onStrategyNameChange,
	onPrev,
	onCreateStrategy,
}) => {
	const renderStepContent = useMemo(() => {
		switch (currentStep) {
			case 1:
				return <div className="flex flex-col h-full">{children}</div>;
			case 2:
				return (
					<div className="flex flex-col h-full">
						{/* 전략 타입 선택 버튼 */}
						<div className="p-6 border-b border-gray-200">
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-4">
									<button
										type="button"
										onClick={() => onStrategyTypeChange('BUY')}
										className={cn(
											'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
											strategyType === 'BUY'
												? 'border-red-500 bg-red-50 shadow-lg shadow-red-200'
												: 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-25'
										)}
									>
										<input
											type="radio"
											name="strategyType"
											value="buy"
											checked={strategyType === 'BUY'}
											onChange={() => onStrategyTypeChange('BUY')}
											className="sr-only"
										/>
										<div className="flex items-center gap-2">
											<BanknoteArrowDown
												className={cn(
													'w-5 h-5 transition-colors duration-200',
													strategyType === 'BUY'
														? 'text-red-600'
														: 'text-gray-500'
												)}
											/>
											<span
												className={cn(
													'text-sm font-medium transition-colors duration-200',
													strategyType === 'BUY'
														? 'text-red-700'
														: 'text-gray-600'
												)}
											>
												매수 전략
											</span>
										</div>
									</button>
									<button
										type="button"
										onClick={() => onStrategyTypeChange('SELL')}
										className={cn(
											'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
											strategyType === 'SELL'
												? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
												: 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-25'
										)}
									>
										<input
											type="radio"
											name="strategyType"
											value="sell"
											checked={strategyType === 'SELL'}
											onChange={() => onStrategyTypeChange('SELL')}
											className="sr-only"
										/>
										<div className="flex items-center gap-2">
											<BanknoteArrowUp
												className={cn(
													'w-5 h-5 transition-colors duration-200',
													strategyType === 'SELL'
														? 'text-blue-600'
														: 'text-gray-500'
												)}
											/>
											<span
												className={cn(
													'text-sm font-medium transition-colors duration-200',
													strategyType === 'SELL'
														? 'text-blue-700'
														: 'text-gray-600'
												)}
											>
												매도 전략
											</span>
										</div>
									</button>
								</div>
							</div>
						</div>
						<div className="flex-1 p-6">{children}</div>
					</div>
				);
			default:
				return null;
		}
	}, [currentStep, children]);

	return (
		<div className={cn('flex flex-col h-full bg-custom-gray-bg', className)}>
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
				{currentStep === 2 && (
					<div className="flex items-center gap-4">
						<Input
							placeholder="전략 이름을 입력해주세요"
							value={strategyName}
							onChange={(e) => onStrategyNameChange(e.target.value)}
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
			<div className="flex-1">{renderStepContent}</div>
		</div>
	);
};

export default CreateStrategyLayout;
