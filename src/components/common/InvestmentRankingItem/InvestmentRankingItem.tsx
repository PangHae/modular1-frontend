import Image from 'next/image';

interface Props {
	imageUrl: string;
	stock: string;
	profit: number;
	count: number;
	amount: number;
	profitRate: number;
}

const InvestmentRankingItem = ({
	imageUrl,
	stock,
	profit,
	count,
	amount,
	profitRate,
}: Props) => {
	return (
		<div className="flex justify-between px-4 py-2">
			<div className="flex items-center gap-4">
				<Image src={imageUrl} alt="주식 아이콘" width={32} height={32} />
				<div className="flex flex-col">
					<span className="text-sub2 font-semibold">{stock}</span>
					<span className="text-caption text-custom-sub-text">{`${count}주`}</span>
				</div>
			</div>
			<div className="flex flex-col">
				<span className="text-sub2 font-semibold text-end">{`${amount}원`}</span>
				<span className="text-caption text-end text-red-500">{`+${profit}원(${profitRate}%)`}</span>
			</div>
		</div>
	);
};

export default InvestmentRankingItem;
