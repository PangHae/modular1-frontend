import { cn } from '@/lib/utils';

interface TradeExecutionItemMainProps {
	children: React.ReactNode;
	className?: string;
}

const TradeExecutionItemMain = ({
	children,
	className,
}: TradeExecutionItemMainProps) => {
	return (
		<div
			className={cn(
				'flex justify-between items-center p-4 bg-white rounded-lg border border-custom-gray-border/40',
				className
			)}
		>
			{children}
		</div>
	);
};

interface TradeTypeChipProps {
	children: React.ReactNode;
	className?: string;
	type: 'BUY' | 'SELL';
}

const TradeTypeChip = ({ children, className, type }: TradeTypeChipProps) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center px-2 py-1 rounded-full text-overline! font-semibold w-[50px] h-[22px] my-auto',
				type === 'BUY'
					? 'bg-red-100 text-red-600'
					: 'bg-blue-100 text-blue-600',
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
		<span
			className={cn('text-caption! font-semibold text-custom-main', className)}
		>
			{children}
		</span>
	);
};

interface StrategyNameProps {
	children: React.ReactNode;
	className?: string;
}

const StrategyName = ({ children, className }: StrategyNameProps) => {
	return (
		<span className={cn('text-overline! text-custom-sub-text', className)}>
			{children}
		</span>
	);
};

interface DateTimeProps {
	children: React.ReactNode;
	className?: string;
}

const DateTime = ({ children, className }: DateTimeProps) => {
	return (
		<span
			className={cn(
				'text-overline! text-custom-sub-text text-right',
				className
			)}
		>
			{children}
		</span>
	);
};

interface AmountProps {
	children: React.ReactNode;
	className?: string;
	type: 'BUY' | 'SELL';
}

const Amount = ({ children, className, type }: AmountProps) => {
	return (
		<span
			className={cn(
				'text-caption! font-semibold',
				type === 'BUY' ? 'text-red-500' : 'text-blue-500',
				className
			)}
		>
			{children}
		</span>
	);
};

const TradeExecutionComponent = Object.assign(TradeExecutionItemMain, {
	TypeChip: TradeTypeChip,
	StockName: StockName,
	StrategyName: StrategyName,
	DateTime: DateTime,
	Amount: Amount,
});

export default TradeExecutionComponent;
