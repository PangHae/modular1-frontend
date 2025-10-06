import { useMutation } from '@tanstack/react-query';

import { Response } from '@/@types/service';
import { RegisterFormValues } from '@/containers/auth/register/Register';
import { signUp } from '@/services/auth';

interface UseSignUpProps {
	onSuccess: (data: Response<null>) => void;
	onError: (error: Error) => void;
}

export const useSignUp = ({ onSuccess, onError }: UseSignUpProps) => {
	return useMutation({
		mutationFn: (data: RegisterFormValues) => signUp(data),
		onSuccess,
		onError,
	});
};
