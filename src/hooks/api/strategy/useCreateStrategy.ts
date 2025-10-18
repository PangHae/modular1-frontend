import { useMutation } from '@tanstack/react-query';

import { Response } from '@/@types/service';
import { CreateStrategyRequest, StrategyTemplate } from '@/@types/strategy';
import { createStrategy } from '@/services/strategies';

interface UseCreateStrategyProps {
	onSuccess: (data: Response<CreateStrategyRequest>) => void;
	onError: (error: Error) => void;
}

export const useCreateStrategy = ({
	onSuccess,
	onError,
}: UseCreateStrategyProps) => {
	return useMutation({
		mutationFn: (strategy: StrategyTemplate) => createStrategy(strategy),
		onSuccess,
		onError,
	});
};
