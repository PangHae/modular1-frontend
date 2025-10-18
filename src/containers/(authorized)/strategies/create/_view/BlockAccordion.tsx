import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import BlockItem from './BlockItem';

const BlockAccordion = () => {
	return (
		<Accordion type="multiple" className="w-full">
			<AccordionItem value="logical">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					논리
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="all"
							blockName="모든 조건"
							blockDescription="모든 조건에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="any"
							blockName="하나의 조건"
							blockDescription="하나의 조건에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="indicators">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					기본 지표
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="priceCompare"
							blockName="가격"
							blockDescription="가격에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="executionCompare"
							blockName="체결"
							blockDescription="체결에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="tradeMetricCompare"
							blockName="거래량/거래대금"
							blockDescription="거래량/거래대금에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="changeRateCompare"
							blockName="변화율"
							blockDescription="변화율에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="momentum">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					모멘텀
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="emaCompare"
							blockName="EMA 비교"
							blockDescription="EMA 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="emaCross"
							blockName="EMA 교차"
							blockDescription="EMA 교차에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="macdCompare"
							blockName="MACD 비교"
							blockDescription="MACD 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="macdCross"
							blockName="MACD 교차"
							blockDescription="MACD 교차에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="rsiCompare"
							blockName="RSI 비교"
							blockDescription="RSI 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="rsiCross"
							blockName="RSI 교차"
							blockDescription="RSI 교차에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="volume">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					거래량
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="rvolCompare"
							blockName="RVOL"
							blockDescription="RVOL에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="vwapCross"
							blockName="VWAP 교차"
							blockDescription="VWAP 교차에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="risk">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					밴드
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="bandAbsoluteCompare"
							blockName="밴드 절대 비교"
							blockDescription="밴드 절대 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="bandRelativeCompare"
							blockName="밴드 상대 비교"
							blockDescription="밴드 상대 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="bandCross"
							blockName="밴드 교차"
							blockDescription="밴드 교차에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="level">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					레벨
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="openingRangeCross"
							blockName="오픈 레인지"
							blockDescription="오픈 레인지에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="previousHighLowCompare"
							blockName="전일 고저 비교"
							blockDescription="전일 고저 비교에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="yearHighLowCompare"
							blockName="연간 고저 비교"
							blockDescription="연간 고저 비교에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="exit">
				<AccordionTrigger className="cursor-pointer hover:no-underline">
					종료
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-2">
						<BlockItem
							id="exitWithLoss"
							blockName="손실 종료"
							blockDescription="손실 종료에 대한 기준을 설정합니다."
						/>
						<BlockItem
							id="exitWithProfit"
							blockName="수익 종료"
							blockDescription="수익 종료에 대한 기준을 설정합니다."
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default BlockAccordion;
