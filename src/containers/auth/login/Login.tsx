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
import { useLogin } from '@/hooks/api/auth/useLogin';

import blockIcon from '../../../../public/images/block.png';
import modular1LetterIcon from '../../../../public/images/letter-icon.png';
import modular1Icon from '../../../../public/images/modular1-icon.png';
import shinhanIcon from '../../../../public/images/shinhan.png';
import smallBlock1Icon from '../../../../public/images/small-block-1.png';
import smallBlock2Icon from '../../../../public/images/small-block-2.png';

const loginSchema = z.object({
	memberId: z.string().min(1, '아이디는 필수입니다.'),
	memberPassword: z.string().min(1, '패스워드는 필수입니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
	const router = useRouter();
	const { mutate } = useLogin({
		onSuccess: (data) => {
			toast.success(data.message);
			router.replace('/dashboard');
		},
		onError: (error) => toast.error(error.message),
	});

	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { memberId: '', memberPassword: '' },
	});

	const onSubmit = async (data: LoginFormValues) => mutate(data);

	return (
		<div className="w-full h-full bg-[#F9FAFB] flex items-center justify-center p-4">
			<Card className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl">
				<div className="flex flex-col lg:flex-row min-h-[600px]">
					{/* 왼쪽: 로그인 폼 */}
					<div className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-center border-r border-gray-100">
						<div className="mb-10">
							<div className="flex items-center gap-4 mb-6">
								<Image
									src={modular1Icon}
									alt="Modular1 Icon"
									width={50}
									height={50}
								/>
								<Image
									src={modular1LetterIcon}
									alt="Modular1 Letter Icon"
									width={160}
									height={40}
								/>
							</div>
							<p className="text-[#425968] text-lg font-medium leading-relaxed">
								나만의{' '}
								<span className="font-semibold text-[#3182F6]">
									자동 매매 전략
								</span>
								을 생성하고 실행해보세요!
							</p>
						</div>

						{/* 로그인 폼 */}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="memberId"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="아이디를 입력해주세요"
														className="pl-5 h-12 rounded-lg bg-[#F9FAFB] border-gray-200 focus:border-blue-500"
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
															className="pl-5 pr-12 h-12 rounded-lg bg-[#F9FAFB] border-gray-200 focus:border-blue-500"
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

								<Button
									type="submit"
									className="w-full h-12 bg-[#3182F6] hover:bg-blue-700 text-white font-semibold rounded-lg"
								>
									{form.formState.isSubmitting ? '로그인 중...' : '로그인'}
								</Button>
							</form>
						</Form>

						{/* 회원가입 링크 */}
						<div className="mt-8 text-center">
							<span className="text-[#6B7684] mr-2.5 font-medium">
								아직 회원이 아니세요?
							</span>
							<Link
								href="/auth/register"
								className="text-[#3182F6] hover:text-blue-700 font-semibold"
							>
								회원가입
							</Link>
						</div>
					</div>

					{/* 오른쪽: 반 분할, 중앙 카드 */}
					<div className="flex-1 bg-[#F9FAFB] flex items-center justify-center p-10">
						<div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-lg p-10 flex flex-col justify-between">
							{/* 상단 텍스트 */}
							<div>
								<div className="text-[#333D4B] text-base font-semibold">
									EMA 골든크로스 전략
								</div>
								<div className="flex items-center space-x-2 mt-4">
									<Image
										src={shinhanIcon}
										alt="shinhan Icon"
										width={20}
										height={20}
									/>
									<div className="text-[#425968] text-sm">신한지주</div>
								</div>
							</div>

							{/* 블록 */}
							<div className="flex items-center justify-center gap-6 my-8">
								<Image
									src={blockIcon}
									alt="block"
									width={110}
									height={110}
									className="floating"
								/>
								<Image
									src={smallBlock1Icon}
									alt="small block 1"
									width={55}
									height={55}
									className="opacity-90 floating-x"
								/>
								<Image
									src={smallBlock2Icon}
									alt="small block 2"
									width={55}
									height={55}
									className="opacity-80 floating-slow"
								/>
							</div>

							{/* 데이터 */}
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-[#F9FAFB] rounded-xl p-4 text-[#333D4B] border border-gray-100 shadow-sm">
									<div className="text-[#425968] text-xs">보유 금액</div>
									<div className="font-bold text-lg">1,000,000 원</div>
								</div>
								<div className="bg-[#F9FAFB] rounded-xl p-4 text-[#333D4B] border border-gray-100 shadow-sm">
									<div className="text-[#425968] text-xs">
										오늘의 전략 수익률
									</div>
									<div className="text-[#F04452] font-bold text-lg">+100%</div>
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

export default Login;
