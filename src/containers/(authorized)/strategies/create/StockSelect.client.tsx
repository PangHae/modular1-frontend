'use client';

import { FC } from 'react';

import Image from 'next/image';

import SidePalette from '@/components/common/SidePalette';
import StockSearch from '@/components/common/SidePalette/StockSearch';
import { Card, CardContent } from '@/components/ui/card';
import { useMyStocks } from '@/hooks/api/stocks/useMyStocks';
import { useStocks } from '@/hooks/api/stocks/useStocks';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

const StockSelectClient: FC = () => {
	const { data: stocks } = useStocks();
	const { data: myStocks } = useMyStocks();
	const { selectedStock, setSelectedStock } = useCreateStrategyContext();

	const handleSelectStock = (stock: { name: string; code: string }) => {
		setSelectedStock(stock);
	};

	return (
		<div className="flex gap-4 p-6 h-full max-h-full overflow-hidden">
			<div className="flex flex-1 gap-4">
				{/* 검색 입력 */}
				<SidePalette>
					<StockSearch
						onClick={handleSelectStock}
						stocks={stocks?.data.stocks || []}
						myStocks={myStocks?.data?.stocks || []}
					/>
				</SidePalette>
				<Card className="w-full">
					<CardContent className="flex  items-center justify-center p-8 h-full">
						<div className="flex flex-col items-center justify-center space-y-6">
							<div className="text-center space-y-2">
								<h3 className="text-2xl font-semibold text-gray-900">
									투자 전략을 시작하세요
								</h3>
								<p className="text-gray-600 max-w-md">
									왼쪽 패널에서 종목을 선택하면 전략 구성을 시작할 수 있습니다.
								</p>
							</div>
							{selectedStock && (
								<div className="flex items-center pl-4 w-[300px] h-[60px] bg-white rounded-lg border border-blue-200 shadow-lg">
									<div className="flex items-center space-x-3">
										{selectedStock.code && (
											<Image
												className="rounded-full"
												src={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${selectedStock.code}.png?width=64&height=64`}
												alt={selectedStock.name}
												width={40}
												height={40}
											/>
										)}
										<div>
											<h4 className="font-semibold text-gray-900">
												{selectedStock.name}
											</h4>
											<p className="text-sm text-gray-500">
												{selectedStock.code}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StockSelectClient;
