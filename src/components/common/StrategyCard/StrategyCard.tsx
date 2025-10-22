import { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import StrategyStatusChip from '../StrategyStatusChip';

interface Props {
	id: number;
	title: string;
	stock: string;
	status: 'ACTIVATED' | 'PENDING';
	imageUrl: string;
	profitAmount: number;
	profitRate: number;
	avgPrice: number;
	currentPrice: number;
}

const StrategyCard: FC<Props> = ({
	id,
	title,
	stock,
	imageUrl,
	status,
	profitAmount,
	profitRate,
	avgPrice,
	currentPrice,
}) => {
	const router = useRouter();
	return (
		<Card
			className="lg:w-[309px] lg:h-[180px] xl:w-[330px] xl:h-[210px] 2xl:w-[415px] 2xl:h-[270px] flex flex-col justify-between cursor-pointer"
			onClick={() => router.push(`/strategies/${id}`)}
		>
			<CardHeader className="gap-3">
				<CardDescription className="flex justify-between 2xl:text-sub2 xl:text-caption lg:text-overline text-custom-sub-text">
					<div className="flex items-center gap-1">
						<Image
							className="rounded-full"
							src={imageUrl}
							alt="주식아이콘"
							width={22}
							height={22}
						/>
						{stock}
					</div>
					<StrategyStatusChip status={status} />
				</CardDescription>
				<CardTitle className="flex flex-col gap-1 text-[#333d4b] 2xl:text-heading3! xl:text-body1! lg:text-body2!">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p
					className={cn(
						'text-end 2xl:text-heading3! xl:text-body1! lg:text-body2! font-semibold',
						profitAmount > 0
							? 'text-[#F04452]'
							: profitAmount < 0
								? 'text-[#3182F6]'
								: 'text-gray-500'
					)}
				>
					{`${profitAmount.toLocaleString()}원(${profitRate.toLocaleString()}%)`}
				</p>
				<div className="flex justify-between w-full 2xl:text-button! xl:text-caption! lg:text-overline!">
					<p className="text-custom-sub-text">현재 가격</p>
					<p>{`${currentPrice.toLocaleString()}원`}</p>
				</div>
				<div className="flex justify-between w-full 2xl:text-button! xl:text-caption! lg:text-overline!">
					<p className="text-custom-sub-text">내 평균 매수 가격</p>
					<p>{`${avgPrice.toLocaleString()}원`}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default StrategyCard;
