'use client';

import SearchInput from '@/components/common/SearchInput';
import StrategyCard from '@/components/common/StrategyCard';
import StrategyStatusFilterMenu from '@/components/common/StrategyStatusFilterMenu';
import CardGridLayout from '@/components/layouts/CardGridLayout';
import { Button } from '@/components/ui/button';

const StrategiesClient = () => {
	const handleSearch = (keyword: string) => {
		console.log(keyword);
	};

	return (
		<div className="flex flex-col gap-8 h-full overflow-y-auto relative px-10">
			<div className="flex align-center justify-center flex-shrink-0 sticky top-0 bg-custom-gray-bg px-10 pt-14 pb-8">
				<SearchInput onSearch={handleSearch} />
			</div>
			<div className="flex flex-col flex-1 min-h-0 w-full mx-auto gap-4">
				<div className="flex justify-between px-1">
					<StrategyStatusFilterMenu />
					<Button className="bg-shinhan-blue w-[100px] h-[40px] cursor-pointer hover:bg-shinhan-blue/80">
						+ 전략 생성
					</Button>
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
						status={'running'}
					/>
					<StrategyCard
						title="월마트는 무조건 이 전략이다."
						stock={'월마트(WMT)'}
						imageUrl={'/icons/WMT.png'}
						status={'pending'}
					/>
				</CardGridLayout>
			</div>
		</div>
	);
};

export default StrategiesClient;
