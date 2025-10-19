'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
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
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@/hooks/api/auth/useSignUp';

const registerSchema = z.object({
	memberId: z.string().min(1, '아이디는 필수입니다.'),
	memberPassword: z.string().min(1, '비밀번호는 필수입니다.'),
	memberName: z.string().min(1, '이름은 필수입니다.'),
	memberAccountNumber: z.string().min(1, '계좌번호는 필수입니다.'),
	memberAppKey: z.string().min(1, 'App Key는 필수입니다.'),
	memberAppSecret: z.string().min(1, 'App Secret은 필수입니다.'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterStepForm = () => {
	const router = useRouter();
	const { mutate } = useSignUp({
		onSuccess: (data) => {
			toast.success(data.message);
			router.replace('/auth/login');
		},
		onError: (error) => toast.error(error.message),
	});

	const [step, setStep] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const [showAppSecret, setShowAppSecret] = useState(false);

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			memberId: '',
			memberPassword: '',
			memberName: '',
			memberAccountNumber: '',
			memberAppKey: '',
			memberAppSecret: '',
		},
	});

	const onSubmit = (data: RegisterFormValues) => mutate(data);

	const nextStep = async (fields: (keyof RegisterFormValues)[]) => {
		const valid = await form.trigger(fields);
		if (valid) setStep((s) => s + 1);
	};

	const prevStep = () => setStep((s) => s - 1);

	return (
		<div className="w-full h-full bg-[#F9FAFB] flex items-center justify-center p-4">
			<Card className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl">
				<div className="flex flex-col lg:flex-row min-h-[600px]">
					{/* 왼쪽: 회원가입 폼 */}
					<div className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-center border-r border-gray-100">
						<div className="mb-10">
							<div className="flex items-center gap-4 mb-6">
								<Image
									src="/icons/modular1-icon.png"
									alt="Modular1 Icon"
									width={50}
									height={50}
								/>
								<Image
									src="/icons/letter-icon.png"
									alt="Modular1 Letter Icon"
									width={160}
									height={40}
								/>
							</div>
							<p className="text-[#425968] text-lg font-medium leading-relaxed">
								간단한 3단계로{' '}
								<span className="font-semibold text-[#3182F6]">회원가입</span>을
								완료하세요!
							</p>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* STEP 1 */}
								{step === 1 && (
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="memberId"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder="아이디를 입력해주세요"
															className="pl-5 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="memberPassword"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="relative">
															<Input
																type={showPassword ? 'text' : 'password'}
																placeholder="비밀번호를 입력해주세요"
																className="pl-5 pr-12 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
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
										<Button
											type="button"
											className="w-full h-12 bg-[#3182F6] hover:bg-blue-700 text-white font-semibold rounded-lg"
											onClick={() => nextStep(['memberId', 'memberPassword'])}
										>
											다음
										</Button>
									</div>
								)}

								{/* STEP 2 */}
								{step === 2 && (
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="memberName"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder="이름을 입력해주세요"
															className="pl-5 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="memberAccountNumber"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder="계좌번호를 입력해주세요"
															className="pl-5 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex justify-between">
											<Button
												type="button"
												variant="outline"
												onClick={prevStep}
											>
												이전
											</Button>
											<Button
												type="button"
												className="bg-[#3182F6] hover:bg-blue-700 text-white font-semibold rounded-lg"
												onClick={() =>
													nextStep(['memberName', 'memberAccountNumber'])
												}
											>
												다음
											</Button>
										</div>
									</div>
								)}

								{/* STEP 3 */}
								{step === 3 && (
									<div className="space-y-4">
										<FormField
											control={form.control}
											name="memberAppKey"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder="App Key를 입력해주세요"
															className="pl-5 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="memberAppSecret"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="relative">
															<Input
																type={showAppSecret ? 'text' : 'password'}
																placeholder="App Secret을 입력해주세요"
																className="pl-5 pr-12 h-12 rounded-lg bg-[#F9FAFB] border-gray-150 focus:border-blue-500"
																{...field}
															/>
															<button
																type="button"
																onClick={() => setShowAppSecret(!showAppSecret)}
																className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
															>
																{showAppSecret ? (
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
										<div className="flex justify-between">
											<Button
												type="button"
												variant="outline"
												onClick={prevStep}
											>
												이전
											</Button>
											<Button
												type="submit"
												className="h-12 bg-[#3182F6] hover:bg-blue-700 text-white font-semibold rounded-lg"
											>
												회원가입
											</Button>
										</div>
									</div>
								)}
							</form>
						</Form>

						<div className="mt-8 text-center">
							<span className="text-[#6B7684] mr-2.5 font-medium">
								이미 계정이 있으신가요?
							</span>
							<Link
								href="/auth/login"
								className="text-[#3182F6] hover:text-blue-700 font-semibold"
							>
								로그인
							</Link>
						</div>
					</div>

					{/* 오른쪽: 로그인과 동일한 카드 */}
					<div className="flex-1 bg-[#F9FAFB] flex items-center justify-center p-10">
						<div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-lg p-10 flex flex-col justify-between">
							<div>
								<div className="text-[#333D4B] text-base font-semibold">
									볼린저 밴드 상단 밴드 터치 전략
								</div>
								<div className="flex items-center space-x-2 mt-4">
									<Image
										src="/images/shinhan.png"
										alt="shinhan Icon"
										width={20}
										height={20}
									/>
									<div className="text-[#425968] text-sm">신한지주</div>
								</div>
							</div>

							<div className="flex items-center justify-center gap-6 my-8">
								<Image
									src="/images/block.png"
									alt="block"
									width={110}
									height={110}
									className="floating"
								/>
								<Image
									src="/images/small-block-1.png"
									alt="small block 1"
									width={55}
									height={55}
									className="opacity-90 floating-x"
								/>
								<Image
									src="/images/small-block-2.png"
									alt="small block 2"
									width={55}
									height={55}
									className="opacity-80 floating-slow"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="bg-[#F9FAFB] rounded-xl p-4 text-[#333D4B] border border-gray-100 shadow-sm">
									<div className="text-[#425968] text-xs">보유 금액</div>
									<div className="font-bold text-lg">1,000,000 원</div>
								</div>
								<div className="bg-[#F9FAFB] rounded-xl p-4 text-[#333D4B] border border-gray-100 shadow-sm">
									<div className="text-[#425968] text-xs">누적 전략 수익률</div>
									<div className="text-[#F04452] font-bold text-lg">+15.2%</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Floating Animation */}
			<style jsx global>{`
				@keyframes floating {
					0% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-10px);
					}
					100% {
						transform: translateY(0);
					}
				}
				@keyframes floating-x {
					0% {
						transform: translateX(0);
					}
					50% {
						transform: translateX(8px);
					}
					100% {
						transform: translateX(0);
					}
				}
				.floating {
					animation: floating 3s ease-in-out infinite;
				}
				.floating-slow {
					animation: floating 5s ease-in-out infinite;
				}
				.floating-x {
					animation: floating-x 4s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
};

export default RegisterStepForm;
