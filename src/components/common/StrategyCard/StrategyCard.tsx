import Image from 'next/image';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';
import StrategyStatusChip from '../StrategyStatusChip';

interface Props {
	title: string;
	stock: string;
	status: 'running' | 'pending';
	imageUrl: string;
}

const StrategyCard: FC<Props> = ({ title, stock, imageUrl, status }) => {
	return (
		<Card className="w-[415px] h-[250px] flex flex-col justify-between">
			<CardHeader>
				<CardDescription className="flex justify-between text-sub2 text-custom-sub-text">
					<div className="flex items-center gap-1">
						<Image src={imageUrl} alt="주식아이콘" width={22} height={22} />
						{stock}
					</div>
					<StrategyStatusChip status={status} />
				</CardDescription>
				<CardTitle className="flex flex-col gap-1 text-heading3">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-end text-heading3 font-semibold text-red-500">
					+432,000(+14.7%)
				</p>
				<div className="flex justify-between w-full text-caption">
					<p className="text-custom-sub-text">현재 가격</p>
					<p>1,000,000원</p>
				</div>
				<div className="flex justify-between w-full text-caption">
					<p className="text-custom-sub-text">내 평균 매수 가격</p>
					<p>289,000원</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default StrategyCard;
