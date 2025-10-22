import Image from 'next/image';

import { cn } from '@/lib/utils';

interface Props {
	imageUrl: string;
	stockName: string;
	profit: number;
	count: number;
	amount: number;
	profitRate: number;
}

const InvestmentRankingItem = ({
	imageUrl,
	stockName,
	profit,
	count,
	amount,
	profitRate,
}: Props) => {
	return (
		<div className="flex justify-between py-2">
			<div className="flex items-center gap-4">
				<Image
					src={imageUrl}
					className="rounded-full"
					alt={stockName}
					width={32}
					height={32}
				/>
				<div className="flex flex-col">
					<span className="text-sub2 font-semibold">{stockName}</span>
					<span className="text-caption text-custom-sub-text">{`${count.toLocaleString('ko-KR')}주`}</span>
				</div>
			</div>
			<div className="flex flex-col">
				<span className="text-sub2 font-semibold text-end">{`${amount.toLocaleString('ko-KR')}원`}</span>
				<span
					className={cn(
						'text-caption! text-end',
						profit > 0
							? 'text-[#F04452]'
							: profit < 0
								? 'text-[#3182F6]'
								: 'text-gray-500'
					)}
				>{`${profit.toLocaleString('ko-KR')}원(${profitRate}%)`}</span>
			</div>
		</div>
	);
};

export default InvestmentRankingItem;
