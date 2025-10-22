import { useMutation } from '@tanstack/react-query';

import { Response } from '@/@types/service';
import { stopStrategyPod } from '@/services/strategies';

interface UseStopStrategyProps {
	onSuccess: (data: Response<{ strategyId: string; status: string }>) => void;
	onError: (error: Error) => void;
}

export const useStopStrategy = ({
	onSuccess,
	onError,
}: UseStopStrategyProps) => {
	return useMutation({
		mutationFn: (strategyId: number) => stopStrategyPod(strategyId),
		onSuccess,
		onError,
	});
};
