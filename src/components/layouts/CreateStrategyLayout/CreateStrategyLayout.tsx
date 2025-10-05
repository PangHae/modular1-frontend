import { FC, PropsWithChildren } from 'react';

import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	ChartCandlestick,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const CreateStrategyLayout: FC<PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return (
		<div className={cn('flex flex-col h-full', className)}>
			<div className="flex flex-col w-full gap-4 h-[180px] border-b border-custom-gray-border/40 px-10 py-4 bg-white">
				<div className="flex justify-between gap-4 w-full">
					<Input
						className="w-1/2 focus:outline-shinhan-blue h-[48px] text-heading3! focus-visible:border-shinhan-blue"
						placeholder="전략 이름을 입력해주세요."
					/>
					<Button className="bg-shinhan-blue cursor-pointer hover:bg-shinhan-blue/80">
						전략 생성하기
					</Button>
				</div>
				<div className="flex flex-1 gap-4 justify-center h-full">
					<div className="flex items-center gap-4 w-[300px] h-[70px] bg-transparent border border-custom-gray-border text-black my-auto rounded-lg px-4 py-2">
						<div className="flex items-center justify-center rounded-full bg-custom-gray-border w-[40px] h-[40px]">
							<ChartCandlestick strokeWidth={1} />
						</div>
						<div className="flex flex-col gap-1">
							<span>종목 선택</span>
							<span className="text-caption">투자할 종목을 선택해보세요.</span>
						</div>
					</div>
					<div className="w-[100px] h-[1px] bg-custom-gray-border my-auto" />
					<div className="flex items-center gap-4 w-[300px] h-[70px] bg-transparent border border-custom-gray-border text-black my-auto rounded-lg px-4 py-2">
						<div className="flex items-center justify-center rounded-full bg-custom-gray-border w-[40px] h-[40px]">
							<BanknoteArrowDown strokeWidth={1} />
						</div>
						<div className="flex flex-col gap-1">
							<span>매수 전략 구성</span>
							<span className="text-caption">
								매수 전략 블록을 선택하고 배치하세요.
							</span>
						</div>
					</div>
					<div className="w-[100px] h-[1px] bg-custom-gray-border my-auto" />
					<div className="flex items-center gap-4 w-[300px] h-[70px] bg-transparent border border-custom-gray-border text-black my-auto rounded-lg px-4 py-2">
						<div className="flex items-center justify-center rounded-full bg-custom-gray-border w-[40px] h-[40px]">
							<BanknoteArrowUp strokeWidth={1} />
						</div>
						<div className="flex flex-col gap-1">
							<span>매도 전략 구성</span>
							<span className="text-caption">
								매도 전략 블록을 선택하고 배치하세요.
							</span>
						</div>
					</div>
				</div>
			</div>
			{children}
		</div>
	);
};

export default CreateStrategyLayout;
