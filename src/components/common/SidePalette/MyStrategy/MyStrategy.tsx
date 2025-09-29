import StrategyItem from './StrategyItem';

const MyStrategy = () => {
	return (
		<div className="flex-1 flex flex-col">
			<div className="text-heading3 font-semibold p-6 border-b border-custom-gray-border">
				내 전략
			</div>
			<div className="flex flex-col">
				<StrategyItem strategyName={'내 전략1'} />
				<StrategyItem strategyName={'내 전략2'} />
				<StrategyItem strategyName={'내 전략3'} />
				<StrategyItem strategyName={'내 전략4'} />
				<StrategyItem strategyName={'내 전략5'} />
				<StrategyItem strategyName={'내 전략6'} />
			</div>
		</div>
	);
};

export default MyStrategy;
