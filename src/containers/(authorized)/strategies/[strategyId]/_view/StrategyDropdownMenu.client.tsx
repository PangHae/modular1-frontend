'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { MoreVertical, Play, Square, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Response } from '@/@types/service';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteStrategy } from '@/hooks/api/strategy/useDeleteStrategy';
import { useRunStrategy } from '@/hooks/api/strategy/useRunStrategy';
import { useStopStrategy } from '@/hooks/api/strategy/useStopStrategy';

interface Props {
	strategyId: number;
}

const StrategyDropdownMenuClient: FC<Props> = ({ strategyId }) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate: stopStrategy } = useStopStrategy({
		onSuccess: (data: Response<{ strategyId: string; status: string }>) => {
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const { mutate: runStrategy } = useRunStrategy({
		onSuccess: (
			data: Response<{ strategyId: string; podName: string; status: string }>
		) => {
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const { mutate: deleteStrategy } = useDeleteStrategy({
		onSuccess: (data: Response<null>) => {
			toast.success(data.message);
			queryClient.invalidateQueries({
				queryKey: ['strategies'],
			});
			router.push('/strategies');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const handleDeleteStrategy = () => {
		deleteStrategy(strategyId);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer">
				<MoreVertical className="w-4 h-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" id="strategy-actions-menu">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => runStrategy(strategyId)}
				>
					<Play className="w-[16px] h-[16px]" />
					전략 실행
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => stopStrategy(strategyId)}
				>
					<Square className="w-[16px] h-[16px]" />
					전략 정지
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={handleDeleteStrategy}
				>
					<Trash className="w-[16px] h-[16px]" />
					전략 삭제
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StrategyDropdownMenuClient;
