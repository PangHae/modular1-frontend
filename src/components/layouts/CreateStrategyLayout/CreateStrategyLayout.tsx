'use client';

import { FC, PropsWithChildren, useState } from 'react';

import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	ChevronLeft,
	ChevronRight,
	Search,
	X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

type StrategyType = 'buy' | 'sell';
type Step = 1 | 2;

const CreateStrategyLayout: FC<PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	const [currentStep, setCurrentStep] = useState<Step>(1);
	const [strategyType, setStrategyType] = useState<StrategyType>('buy');
	const [strategyName, setStrategyName] = useState('');
	const [selectedStock, setSelectedStock] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [showStockList, setShowStockList] = useState(false);

	// 모의 종목 데이터
	const stockList = [
		{ code: '005930', name: '삼성전자', price: 75000, change: '+2.5%' },
		{ code: '000660', name: 'SK하이닉스', price: 120000, change: '-1.2%' },
		{ code: '035420', name: 'NAVER', price: 180000, change: '+0.8%' },
		{
			code: '207940',
			name: '삼성바이오로직스',
			price: 850000,
			change: '+3.1%',
		},
		{ code: '006400', name: '삼성SDI', price: 450000, change: '-0.5%' },
		{ code: '035720', name: '카카오', price: 45000, change: '+1.8%' },
		{ code: '051910', name: 'LG화학', price: 420000, change: '+0.3%' },
		{ code: '068270', name: '셀트리온', price: 180000, change: '-2.1%' },
		{ code: '323410', name: '카카오뱅크', price: 45000, change: '+0.9%' },
		{ code: '000270', name: '기아', price: 95000, change: '+1.5%' },
	];

	// 검색 필터링된 종목 리스트
	const filteredStocks = stockList.filter(
		(stock) =>
			stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			stock.code.includes(searchQuery)
	);

	const handleNext = () => {
		if (currentStep < 2) {
			setCurrentStep((prev) => (prev + 1) as Step);
		}
	};

	const handlePrev = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => (prev - 1) as Step);
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="flex flex-col h-full p-6">
						<div className="text-center mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								종목을 선택해주세요
							</h2>
							<p className="text-gray-600">
								투자할 종목을 검색하고 선택해주세요.
							</p>
						</div>

						{/* 검색 입력 */}
						<div className="relative mb-6">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<Input
								placeholder="종목명 또는 종목코드를 검색하세요"
								className="w-full h-12 pl-10 pr-10"
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
									setShowStockList(true);
								}}
								onFocus={() => setShowStockList(true)}
							/>
							{searchQuery && (
								<button
									onClick={() => {
										setSearchQuery('');
										setShowStockList(false);
									}}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									<X className="w-4 h-4" />
								</button>
							)}
						</div>

						{/* 종목 리스트 */}
						{showStockList && (
							<div className="flex-1 overflow-hidden">
								<div className="h-full overflow-y-auto border border-gray-200 rounded-lg bg-white">
									{filteredStocks.length > 0 ? (
										<div className="divide-y divide-gray-100">
											{filteredStocks.map((stock) => (
												<button
													key={stock.code}
													onClick={() => {
														setSelectedStock(`${stock.name} (${stock.code})`);
														setShowStockList(false);
														setSearchQuery('');
													}}
													className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-150"
												>
													<div className="flex items-center justify-between">
														<div className="flex flex-col">
															<span className="font-medium text-gray-900">
																{stock.name}
															</span>
															<span className="text-sm text-gray-500">
																{stock.code}
															</span>
														</div>
														<div className="flex flex-col items-end">
															<span className="font-medium text-gray-900">
																{stock.price.toLocaleString()}원
															</span>
															<span
																className={cn(
																	'text-sm',
																	stock.change.startsWith('+')
																		? 'text-red-500'
																		: 'text-blue-500'
																)}
															>
																{stock.change}
															</span>
														</div>
													</div>
												</button>
											))}
										</div>
									) : (
										<div className="p-8 text-center text-gray-500">
											검색 결과가 없습니다.
										</div>
									)}
								</div>
							</div>
						)}

						{/* 선택된 종목 표시 */}
						{selectedStock && (
							<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="flex items-center justify-between">
									<div>
										<span className="text-sm text-blue-700 font-medium">
											선택된 종목:
										</span>
										<span className="ml-2 text-blue-900">{selectedStock}</span>
									</div>
									<button
										onClick={() => setSelectedStock('')}
										className="text-blue-500 hover:text-blue-700"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							</div>
						)}

						{/* 다음 버튼 */}
						<div className="mt-6 flex justify-center">
							<Button
								onClick={handleNext}
								className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8"
								disabled={!selectedStock.trim()}
							>
								다음
								<ChevronRight className="w-4 h-4" />
							</Button>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<div className="flex items-center gap-4">
								<Button
									variant="outline"
									onClick={handlePrev}
									className="flex items-center gap-2"
								>
									<ChevronLeft className="w-4 h-4" />
									이전
								</Button>
								<div>
									<h2 className="text-xl font-semibold text-gray-900">
										전략 구성
									</h2>
									<p className="text-sm text-gray-600">
										전략 타입을 선택하고 블록을 배치해주세요.
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Input
									placeholder="전략 이름을 입력해주세요"
									value={strategyName}
									onChange={(e) => setStrategyName(e.target.value)}
									className="w-64"
								/>
								<Button className="bg-blue-600 hover:bg-blue-700">
									전략 생성하기
								</Button>
							</div>
						</div>

						{/* 전략 타입 선택 버튼 */}
						<div className="p-6 border-b border-gray-200">
							<div className="flex items-center gap-6">
								<label className="text-sm font-medium text-gray-700">
									전략 타입:
								</label>
								<div className="flex items-center gap-4">
									<button
										type="button"
										onClick={() => setStrategyType('buy')}
										className={cn(
											'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200',
											strategyType === 'buy'
												? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
												: 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-25'
										)}
									>
										<input
											type="radio"
											name="strategyType"
											value="buy"
											checked={strategyType === 'buy'}
											onChange={() => setStrategyType('buy')}
											className="sr-only"
										/>
										<div className="flex items-center gap-2">
											<BanknoteArrowDown
												className={cn(
													'w-5 h-5 transition-colors duration-200',
													strategyType === 'buy'
														? 'text-blue-600'
														: 'text-gray-500'
												)}
											/>
											<span
												className={cn(
													'text-sm font-medium transition-colors duration-200',
													strategyType === 'buy'
														? 'text-blue-700'
														: 'text-gray-600'
												)}
											>
												매수 전략
											</span>
										</div>
									</button>
									<button
										type="button"
										onClick={() => setStrategyType('sell')}
										className={cn(
											'flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-200',
											strategyType === 'sell'
												? 'border-red-500 bg-red-50 shadow-lg shadow-red-200'
												: 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-25'
										)}
									>
										<input
											type="radio"
											name="strategyType"
											value="sell"
											checked={strategyType === 'sell'}
											onChange={() => setStrategyType('sell')}
											className="sr-only"
										/>
										<div className="flex items-center gap-2">
											<BanknoteArrowUp
												className={cn(
													'w-5 h-5 transition-colors duration-200',
													strategyType === 'sell'
														? 'text-red-600'
														: 'text-gray-500'
												)}
											/>
											<span
												className={cn(
													'text-sm font-medium transition-colors duration-200',
													strategyType === 'sell'
														? 'text-red-700'
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
	};

	return (
		<div className={cn('flex flex-col h-full bg-gray-50', className)}>
			{/* 상단 진행 표시바 */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-center">
						<div className="flex items-center gap-4">
							<div
								className={cn(
									'flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
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
									'flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
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
			</div>

			{/* 메인 콘텐츠 */}
			<div className="flex-1">{renderStepContent()}</div>
		</div>
	);
};

export default CreateStrategyLayout;
