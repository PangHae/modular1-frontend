import { useMutation } from '@tanstack/react-query';

import { Response } from '@/@types/service';
import { logout } from '@/services/auth';

interface UseLogoutProps {
	onSuccess: (data: Response<null>) => void;
	onError: (error: Error) => void;
}

export const useLogout = ({ onSuccess, onError }: UseLogoutProps) => {
	return useMutation({
		mutationFn: logout,
		onSuccess,
		onError,
	});
};
