import StrategyCard from '@/components/common/StrategyCard/StrategyCard';
import ContentWrapper from '@/components/layouts/ContentWrapper';

const Strategies = () => {
	return (
		<ContentWrapper>
			<div className="grid grid-cols-3 gap-4">
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
			</div>
		</ContentWrapper>
	);
};

export default Strategies;
