import { cn } from '@/lib/utils';

interface Props {
	stock: {
		id: number;
		company: string;
		companyKr: string;
		logo: string;
		price: string;
		changeRate: string;
		changeType: string;
		tradeVolume: string;
	};
	onClick: (stock: { name: string; code: string }) => void;
}

const StockItem = ({ stock, onClick }: Props) => {
	return (
		<div
			className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer transition-colors"
			onClick={() => onClick({ name: stock.companyKr, code: stock.company })}
		>
			<div className="flex items-center gap-2">
				<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
					{stock.logo}
				</div>
				<div className="font-medium text-gray-900">{stock.companyKr}</div>
			</div>
			<div className="text-right">
				<div className="font-semibold text-gray-900">{stock.price}원</div>
				<div
					className={cn('text-sm', {
						'text-red-500': stock.changeType === 'positive',
						'text-blue-500': stock.changeType === 'negative',
						'text-gray-500':
							stock.changeType !== 'positive' &&
							stock.changeType !== 'negative',
					})}
				>
					{stock.changeRate}
				</div>
			</div>
		</div>
	);
};

export default StockItem;
