'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { Play, Square, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Response } from '@/@types/service';
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
	const { mutate: stopStrategy } = useStopStrategy({
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
	const { mutate: runStrategy } = useRunStrategy({
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
		<menu className="flex">
			<li>
				<Button
					variant="ghost"
					className="cursor-pointer p-0"
					onClick={() => runStrategy(strategyId)}
				>
					<Play className="size-4" />
				</Button>
			</li>
			<li className="cursor-pointer" onClick={() => stopStrategy(strategyId)}>
				<Button variant="ghost" className="cursor-pointer p-0">
					<Square className="size-4" />
				</Button>
			</li>
			<li className="cursor-pointer" onClick={handleDeleteStrategy}>
				<Button variant="ghost" className="cursor-pointer p-0">
					<Trash className="size-4" />
				</Button>
			</li>
		</menu>
	);
};

export default StrategyDropdownMenuClient;
