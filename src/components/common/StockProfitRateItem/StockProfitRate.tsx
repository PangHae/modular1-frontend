import { cn } from '@/lib/utils';

interface StockProfitRateItemMainProps {
	children: React.ReactNode;
	className?: string;
}

const StockProfitRateItemMain = ({
	children,
	className,
}: StockProfitRateItemMainProps) => {
	return (
		<div
			className={cn(
				'flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-custom-gray-border/40',
				className
			)}
		>
			{children}
		</div>
	);
};

interface StockNameProps {
	children: React.ReactNode;
	className?: string;
}

const StockName = ({ children, className }: StockNameProps) => {
	return (
		<span className={cn('text-sub2 font-semibold', className)}>{children}</span>
	);
};

interface StockAmountChipProps {
	children: React.ReactNode;
	className?: string;
}

const StockAmountChip = ({ children, className }: StockAmountChipProps) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center px-1 py-0.5 border border-custom-gray-border/40 rounded-full min-w-[50px] h-[22px]',
				className
			)}
		>
			<span className="text-overline text-custom-sub-text!">{children}주</span>
		</div>
	);
};

interface StockCodeProps {
	children: React.ReactNode;
	className?: string;
}

const StockCode = ({ children, className }: StockCodeProps) => {
	return (
		<span className={cn('text-caption text-custom-sub-text!', className)}>
			{children}
		</span>
	);
};

interface StockProfitRateProps {
	children: React.ReactNode;
	className?: string;
	profitRate: number;
}

const StockProfitRate = ({
	children,
	className,
	profitRate,
}: StockProfitRateProps) => {
	return (
		<span
			className={cn(
				'text-caption! font-semibold',
				profitRate > 0
					? 'text-[#F04452]'
					: profitRate < 0
						? 'text-[#3182F6]'
						: 'text-gray-500',
				className
			)}
		>
			{children}
		</span>
	);
};

const StockProfitRateComponent = Object.assign(StockProfitRateItemMain, {
	Name: StockName,
	Code: StockCode,
	AmountChip: StockAmountChip,
	ProfitRate: StockProfitRate,
});

export default StockProfitRateComponent;
