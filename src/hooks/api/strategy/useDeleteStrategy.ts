import { useMutation } from '@tanstack/react-query';

import { deleteStrategyById } from '@/services/strategies';

interface UseDeleteStrategyProps {
	onSuccess: (data: any) => void;
	onError: (error: any) => void;
}

export const useDeleteStrategy = ({
	onSuccess,
	onError,
}: UseDeleteStrategyProps) => {
	return useMutation({
		mutationFn: (strategyId: number) => deleteStrategyById(strategyId),
		onSuccess,
		onError,
	});
};
