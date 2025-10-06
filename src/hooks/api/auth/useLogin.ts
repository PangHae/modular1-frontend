import { useMutation } from '@tanstack/react-query';

import { LoginFormValues } from '@/containers/auth/login/Login';
import { login } from '@/services/auth';

interface UseLoginProps {
	onSuccess: (data: any) => void;
	onError: (error: any) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
	return useMutation({
		mutationFn: (data: LoginFormValues) => login(data),
		onSuccess,
		onError,
	});
};
