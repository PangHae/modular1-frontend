import StockProfitRateComponent from './StockProfitRate';

interface Props {
	stockName: string;
	stockCode: string;
	amount: number;
	profitRate: number;
}

const StockProfitRateItem = ({
	stockName,
	stockCode,
	amount,
	profitRate,
}: Props) => {
	return (
		<StockProfitRateComponent>
			<div className="flex flex-col gap-1">
				<StockProfitRateComponent.Name>
					{stockName}
				</StockProfitRateComponent.Name>
				<StockProfitRateComponent.Code>
					{stockCode}
				</StockProfitRateComponent.Code>
			</div>
			<div className="flex flex-col items-end gap-1">
				<StockProfitRateComponent.AmountChip>
					{amount}
				</StockProfitRateComponent.AmountChip>
				<StockProfitRateComponent.ProfitRate isPositive={true}>
					+ {profitRate}%
				</StockProfitRateComponent.ProfitRate>
			</div>
		</StockProfitRateComponent>
	);
};

export default StockProfitRateItem;
