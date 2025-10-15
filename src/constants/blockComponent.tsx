import {
	Execution,
	Price,
	TradingMetric,
	ChangeRate,
} from '@/components/Blocks/default';
import { ExitWithProfit, ExitWithLoss } from '@/components/Blocks/exit';
import {
	OpeningRange,
	PreviousHighLowCompare,
	YearHighLowCompare,
	EMACompare,
	MACDCompare,
	RSICompare,
	RSICross,
	BandAbsoluteCompare,
	BandRelativeCompare,
	BandCross,
	RVOL,
	VWAP,
	EMACross,
	MACDCross,
} from '@/components/Blocks/indicator';
import { All, Any } from '@/components/Blocks/logical';
import { Buy, Sell } from '@/components/Blocks/trade';

export const BlockComponent = {
	buy: Buy,
	sell: Sell,
	execution: Execution,
	price: Price,
	tradingMetric: TradingMetric,
	changeRate: ChangeRate,
	openingRangeCross: OpeningRange,
	previousHighLowCompare: PreviousHighLowCompare,
	yearHighLowCompare: YearHighLowCompare,
	emaCompare: EMACompare,
	emaCross: EMACross,
	macdCompare: MACDCompare,
	macdCross: MACDCross,
	rsiCompare: RSICompare,
	rsiCross: RSICross,
	bandAbsoluteCompare: BandAbsoluteCompare,
	bandRelativeCompare: BandRelativeCompare,
	bandCross: BandCross,
	rvolCompare: RVOL,
	vwapCross: VWAP,
	exitWithProfit: ExitWithProfit,
	exitWithLoss: ExitWithLoss,
	all: All,
	any: Any,
};
