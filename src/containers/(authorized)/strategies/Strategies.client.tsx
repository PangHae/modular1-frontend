'use client';

import { useState, useMemo } from 'react';

import Link from 'next/link';

import { CardLoading } from '@/components/common/Loading';
import SearchInput from '@/components/common/SearchInput';
import StrategyCard from '@/components/common/StrategyCard';
import StrategyStatusFilterMenu from '@/components/common/StrategyStatusFilterMenu';
import CardGridLayout from '@/components/layouts/CardGridLayout';
import { Button } from '@/components/ui/button';
import { useAllStrategies } from '@/hooks/api/strategy/useAllStrategies';

const EMPTY_STRATEGY_MESSAGE = {
	all: '전략이 존재하지 않습니다.',
	search: (keyword: string) => `"${keyword}"에 대한 검색 결과가 없습니다.`,
	ACTIVATED: '실행 중인 전략이 존재하지 않습니다.',
	PENDING: '대기 중인 전략이 존재하지 않습니다.',
};

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

	// 필터링된 전략 목록을 useMemo로 계산
	const filteredStrategies = useMemo(() => {
		if (!data?.data.items) return [];

		return data.data.items
			.filter((strategy) => {
				// 상태 필터링
				if (filterStatus === 'all') {
					return true;
				}
				return strategy.activatedStatus === filterStatus;
			})
			.filter((strategy) => {
				// 검색어 필터링
				return strategy.strategyName.includes(searchQuery);
			});
	}, [data?.data.items, filterStatus, searchQuery]);

	return (
		<div className="flex flex-col items-center gap-8 h-full overflow-y-auto relative px-10">
			<div className="flex align-center justify-center flex-shrink-0 sticky top-0 bg-custom-gray-bg px-10 pt-14 pb-8 xl:w-[1024px] 2xl:w-[1280px] lg:w-[960px]">
				<SearchInput
					searchQuery={searchQuery}
					onSearch={handleSearch}
					placeholder="전략 이름을 검색해주세요."
				/>
			</div>
			<div className="flex flex-col flex-1 min-h-0 mx-auto gap-4 xl:w-[1024px] 2xl:w-[1280px] lg:w-[960px]">
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
				{isLoading && (
					<div className="flex items-center justify-center w-full h-full">
						<CardLoading message="전략 불러오는 중..." showBackground={false} />
					</div>
				)}
				{!isLoading && !data && (
					<div className="flex items-center justify-center w-full h-full">
						<div className="text-sub2 text-gray-500">
							전략이 존재하지 않습니다.
						</div>
					</div>
				)}
				{!isLoading && filteredStrategies.length === 0 ? (
					<div className="flex items-center justify-center w-full h-full">
						<div className="text-sub2 text-gray-500">
							{searchQuery
								? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
								: EMPTY_STRATEGY_MESSAGE[filterStatus]}
						</div>
					</div>
				) : (
					<CardGridLayout>
						{filteredStrategies.map((strategy) => (
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
						))}
					</CardGridLayout>
				)}
			</div>
		</div>
	);
};

export default StrategiesClient;
