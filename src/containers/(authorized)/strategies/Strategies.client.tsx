'use client';

import { useState } from 'react';

import Link from 'next/link';

import SearchInput from '@/components/common/SearchInput';
import StrategyCard from '@/components/common/StrategyCard';
import StrategyStatusFilterMenu from '@/components/common/StrategyStatusFilterMenu';
import CardGridLayout from '@/components/layouts/CardGridLayout';
import { Button } from '@/components/ui/button';
import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';

const StrategiesClient = () => {
	const { data, isLoading } = useAllStrategies();

	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState<
		'all' | 'ACTIVATED' | 'PENDING'
	>('all');

	const handleSearch = (keyword: string) => {
		setSearchQuery(keyword);
	};

	const handleChangeFilterStatus = (
		status: 'all' | 'ACTIVATED' | 'PENDING'
	) => {
		setFilterStatus(status);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	return (
		<div className="flex flex-col gap-8 h-full overflow-y-auto relative px-10">
			<div className="flex align-center justify-center flex-shrink-0 sticky top-0 bg-custom-gray-bg px-10 pt-14 pb-8 2xl:w-[1560px] w-[1280px]">
				<SearchInput searchQuery={searchQuery} onSearch={handleSearch} />
			</div>
			<div className="flex flex-col flex-1 min-h-0 mx-auto gap-4 2xl:w-[1560px] w-[1280px]">
				<div className="flex justify-between px-1">
					<StrategyStatusFilterMenu
						value={filterStatus}
						onChange={handleChangeFilterStatus}
					/>
					<Link href="/strategies/create">
						<Button className="bg-shinhan-blue w-[100px] h-[40px] cursor-pointer hover:bg-shinhan-blue/80">
							+ 전략 생성
						</Button>
					</Link>
				</div>
				<CardGridLayout>
					{data.data.items
						.filter((strategy) => {
							if (filterStatus === 'all') {
								return true;
							}
							return strategy.activatedStatus === filterStatus;
						})
						.map((strategy) => {
							if (!strategy.strategyName.includes(searchQuery)) {
								return null;
							}
							return (
								<StrategyCard
									key={strategy.id}
									id={strategy.id}
									title={strategy.strategyName}
									stock={strategy.stockInfo.stockName}
									imageUrl={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${strategy.stockInfo.stockCode}.png?width=64&height=64`}
									status={strategy.activatedStatus}
									profitAmount={strategy.profitAmount}
									profitRate={strategy.profitRate}
									avgPrice={strategy.avgPrice}
									currentPrice={strategy.currentPrice}
								/>
							);
						})}
				</CardGridLayout>
			</div>
		</div>
	);
};

export default StrategiesClient;
