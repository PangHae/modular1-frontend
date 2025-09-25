'use client';

import SearchInput from '@/components/common/SearchInput';
import StrategyCard from '@/components/common/StrategyCard';
import StrategyStatusFilterChip from '@/components/common/StrategyStatusFilterChip';
import CardGridLayout from '@/components/layouts/CardGridLayout';

const StrategiesClient = () => {
	const handleSearch = (keyword: string) => {
		console.log(keyword);
	};

	return (
		<div className="flex flex-col gap-8 h-full overflow-y-auto relative">
			<div className="flex align-center justify-center flex-shrink-0 sticky top-0 bg-custom-gray-bg px-10 pt-20 pb-8">
				<SearchInput onSearch={handleSearch} />
			</div>
			<div className="flex flex-col flex-1 min-h-0  mx-auto">
				<div>
					<menu className="flex gap-2">
						<li>
							<StrategyStatusFilterChip selected={true} type={'all'} />
						</li>
						<li>
							<StrategyStatusFilterChip selected={false} type={'running'} />
						</li>
						<li>
							<StrategyStatusFilterChip selected={false} type={'pending'} />
						</li>
					</menu>
				</div>
				<CardGridLayout>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'pending'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'running'}
					/>
				</CardGridLayout>
			</div>
		</div>
	);
};

export default StrategiesClient;
