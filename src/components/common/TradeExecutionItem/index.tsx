import TradeExecutionComponent from './TradeExecution';

interface Props {
	type: 'buy' | 'sell';
	stockName: string;
	strategyName: string;
	dateTime: string;
	amount: number;
}

const TradeExecutionItem = ({
	type,
	stockName,
	strategyName,
	dateTime,
	amount,
}: Props) => {
	return (
		<TradeExecutionComponent>
			<div className="flex justify-between w-full">
				<div className="flex gap-2 justify-center">
					<TradeExecutionComponent.TypeChip type={type}>
						{type === 'buy' ? '매수' : '매도'}
					</TradeExecutionComponent.TypeChip>
					<div className="flex flex-col gap-1">
						<TradeExecutionComponent.StockName>
							{stockName}
						</TradeExecutionComponent.StockName>
						<TradeExecutionComponent.StrategyName>
							{strategyName}
						</TradeExecutionComponent.StrategyName>
					</div>
				</div>
				<div className="flex flex-col items-end gap-1">
					<TradeExecutionComponent.DateTime>
						{dateTime}
					</TradeExecutionComponent.DateTime>
					<TradeExecutionComponent.Amount type={type}>
						{amount.toLocaleString()}원
					</TradeExecutionComponent.Amount>
				</div>
			</div>
		</TradeExecutionComponent>
	);
};

export default TradeExecutionItem;
