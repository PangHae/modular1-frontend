'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/useLogin';

const loginSchema = z.object({
	memberId: z.string().min(1, 'Member Id is required.'),
	memberPassword: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
	const router = useRouter();

	const { mutate } = useLogin({
		onSuccess: (data) => {
			toast.success(data.message);
			router.replace('/dashboard');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const [showPassword, setShowPassword] = useState(false);

	// 폼 설정
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			memberId: '',
			memberPassword: '',
		},
	});

	// 폼 제출 핸들러
	const onSubmit = async (data: LoginFormValues) => {
		console.log('Login form data:', data);
		mutate(data);
	};

	return (
		<div className="w-full h-full bg-gray-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl">
				<div className="flex flex-col lg:flex-row min-h-[600px]">
					{/* 왼쪽 컬럼 - 로그인 폼 */}
					<div className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-center">
						{/* 로고 및 헤더 */}
						<div className="mb-8">
							<div className="flex items-center mb-6">
								<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
									<span className="text-white font-bold text-xl">F</span>
								</div>
								<span className="text-2xl font-bold text-black">
									Four Wheel Drive
								</span>
							</div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Log in to your account
							</h1>
							<p className="text-gray-600">
								Enter your email address and password to log in.
							</p>
						</div>

						{/* 로그인 폼 */}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="space-y-4">
									{/* 이메일 필드 */}
									<FormField
										control={form.control}
										name="memberId"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="sr-only">Email Address</FormLabel>
												<FormControl>
													<div className="relative">
														<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
														<Input
															type="string"
															placeholder="Member ID"
															className="pl-12 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* 비밀번호 필드 */}
									<FormField
										control={form.control}
										name="memberPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="sr-only">Password</FormLabel>
												<FormControl>
													<div className="relative">
														<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
														<Input
															type={showPassword ? 'text' : 'password'}
															placeholder="Password"
															className="pl-12 pr-12 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
															{...field}
														/>
														<button
															type="button"
															onClick={() => setShowPassword(!showPassword)}
															className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
														>
															{showPassword ? (
																<EyeOff className="w-5 h-5" />
															) : (
																<Eye className="w-5 h-5" />
															)}
														</button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Login Button */}
								<Button
									type="submit"
									className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? 'Logging in...' : 'Login'}
								</Button>
							</form>
						</Form>

						{/* Sign Up Link */}
						<div className="mt-8 text-center">
							<span className="text-gray-600">
								{"Don't you have an account?"}
							</span>
							<Link
								href="/auth/register"
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Sign Up
							</Link>
						</div>
					</div>

					{/* 오른쪽 컬럼 - 브랜딩/프로모션 */}
					<div className="flex-1 bg-blue-600 relative p-8 lg:p-12 flex flex-col justify-center">
						{/* 배경 로고 */}
						<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>

						{/* 메인 콘텐츠 */}
						<div className="relative z-10">
							{/* 대시보드 미리보기 카드 */}
							<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-6 lg:mb-8 transform rotate-3 shadow-2xl hidden md:block">
								<div className="space-y-4">
									{/* 차트 영역 */}
									<div className="h-32 bg-white/20 rounded-lg flex items-center justify-center">
										<div className="text-white text-sm font-medium">
											Portfolio Chart
										</div>
									</div>
									{/* 데이터 영역 */}
									<div className="grid grid-cols-2 gap-4">
										<div className="bg-white/10 rounded-lg p-3">
											<div className="text-white/80 text-xs">Total Value</div>
											<div className="text-white font-bold">$12,345</div>
										</div>
										<div className="bg-white/10 rounded-lg p-3">
											<div className="text-white/80 text-xs">
												{"Today's P&L"}
											</div>
											<div className="text-green-300 font-bold">+$234</div>
										</div>
									</div>
								</div>
							</div>

							{/* 메인 텍스트 */}
							<h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
								The easiest way to manage your portfolio.
							</h2>
							<p className="text-blue-100 text-base lg:text-lg">
								Join the Four Wheel Drive community now!
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Login;
