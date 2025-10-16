'use client';

import { useState } from 'react';

import { ChevronRight } from 'lucide-react';

import SidePalette from '@/components/common/SidePalette';
import StockSearch from '@/components/common/SidePalette/StockSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	selectedStock: string;
	onSelectStock: (stock: string) => void;
	onNext: () => void;
}

const StockSelectClient = ({ selectedStock, onSelectStock, onNext }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [showStockList, setShowStockList] = useState(false);

	console.log(searchQuery);
	console.log(showStockList);

	const handleSelectStock = (stock: { name: string; code: string }) => {
		onSelectStock(`${stock.name} (${stock.code})`);
		setShowStockList(false);
		setSearchQuery('');
	};

	return (
		<div className="flex flex-col h-full p-6">
			<div className="flex flex-1 gap-4">
				{/* 검색 입력 */}
				<SidePalette>
					{/* <SidePalette.menuList
						menus={[
							{
								title: '종목 검색',
								item: (
									<SidePalette.menuItem
										title="종목 검색"
										icon={<Compass strokeWidth={1} />}
										isActive
									/>
								),
							},
						]}
					/> */}
					<StockSearch onClick={handleSelectStock} />
				</SidePalette>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>선택된 종목</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{selectedStock}</p>
					</CardContent>
				</Card>
			</div>

			{/* 다음 버튼 */}
			<div className="mt-6 flex justify-end">
				<Button
					className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8"
					onClick={onNext}
					disabled={!selectedStock.trim()}
				>
					다음
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default StockSelectClient;
