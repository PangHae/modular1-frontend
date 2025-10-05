import { useMutation } from '@tanstack/react-query';

import { RegisterFormValues } from '@/containers/auth/register/Register';
import { signUp } from '@/services/auth';

interface UseSignUpProps {
	onSuccess: (data: any) => void;
	onError: (error: any) => void;
}

export const useSignUp = ({ onSuccess, onError }: UseSignUpProps) => {
	return useMutation({
		mutationFn: (data: RegisterFormValues) => signUp(data),
		onSuccess,
		onError,
	});
};
