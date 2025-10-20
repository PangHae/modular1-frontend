import { useMutation } from '@tanstack/react-query';

import { Response } from '@/@types/service';
import { runStrategyPod } from '@/services/strategies';

interface UseRunStrategyProps {
	onSuccess: (
		data: Response<{ strategyId: string; podName: string; status: string }>
	) => void;
	onError: (error: Error) => void;
}

export const useRunStrategy = ({ onSuccess, onError }: UseRunStrategyProps) => {
	return useMutation({
		mutationFn: (strategyId: number) => runStrategyPod(strategyId),
		onSuccess,
		onError,
	});
};
