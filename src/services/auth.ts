import { Response } from '@/@types/service';
import { LoginFormValues } from '@/containers/auth/login/Login';
import { RegisterFormValues } from '@/containers/auth/register/Register';

const AUTH_API_URL = `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/auth`;

export const login = async (memberData: LoginFormValues) => {
	try {
		const response = await fetch(`${AUTH_API_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(memberData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<null> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw errorRes;
	}
};

export const signUp = async (memberData: RegisterFormValues) => {
	try {
		const response = await fetch(`${AUTH_API_URL}/signup`, {
			method: 'POST',
			body: JSON.stringify(memberData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw response;
		}

		const res: Response<null> = await response.json();

		return res;
	} catch (error) {
		const errorRes = await (error as globalThis.Response).json();
		console.log(errorRes);
		throw error;
	}
};
