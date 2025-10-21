'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { Play, Square, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Response } from '@/@types/service';
import { FullScreenLoading } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { useDeleteStrategy } from '@/hooks/api/strategy/useDeleteStrategy';
import { useRunStrategy } from '@/hooks/api/strategy/useRunStrategy';
import { useStopStrategy } from '@/hooks/api/strategy/useStopStrategy';

interface Props {
	strategyId: number;
}

const StrategyDropdownMenuClient: FC<Props> = ({ strategyId }) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate: stopStrategy, isPending: isStopStrategyPending } =
		useStopStrategy({
			onSuccess: (data: Response<{ strategyId: string; status: string }>) => {
				queryClient.invalidateQueries({
					queryKey: ['strategyDetail', strategyId],
				});
				toast.success(data.message);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	const { mutate: runStrategy, isPending: isRunStrategyPending } =
		useRunStrategy({
			onSuccess: (
				data: Response<{ strategyId: string; podName: string; status: string }>
			) => {
				queryClient.invalidateQueries({
					queryKey: ['strategyDetail', strategyId],
				});
				toast.success(data.message);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	const { mutate: deleteStrategy, isPending: isDeleteStrategyPending } =
		useDeleteStrategy({
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

	if (isDeleteStrategyPending) {
		return <FullScreenLoading message="전략을 삭제하고 있습니다..." />;
	}
	if (isRunStrategyPending) {
		return <FullScreenLoading message="전략을 실행하고 있습니다..." />;
	}
	if (isStopStrategyPending) {
		return <FullScreenLoading message="전략을 중지하고 있습니다..." />;
	}

	return (
		<menu className="flex">
			<li>
				<Button
					variant="ghost"
					className="cursor-pointer p-0 hover:text-green-600 transition-colors duration-200"
					onClick={() => runStrategy(strategyId)}
				>
					<Play className="size-4" strokeWidth={2.5} />
				</Button>
			</li>
			<li className="cursor-pointer" onClick={() => stopStrategy(strategyId)}>
				<Button
					variant="ghost"
					className="cursor-pointer p-0 hover:text-[#F04452] transition-colors duration-200"
				>
					<Square className="size-4" strokeWidth={2.5} />
				</Button>
			</li>
			<li className="cursor-pointer" onClick={handleDeleteStrategy}>
				<Button
					variant="ghost"
					className="cursor-pointer p-0 hover:text-gray-400 transition-colors duration-200"
				>
					<Trash className="size-4" strokeWidth={2.5} />
				</Button>
			</li>
		</menu>
	);
};

export default StrategyDropdownMenuClient;
