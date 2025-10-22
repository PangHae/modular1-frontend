'use client';

import { useRouter } from 'next/navigation';

import { User } from 'lucide-react';
import { toast } from 'sonner';

import UserChip from '@/components/common/UserChip';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAccountInfo } from '@/hooks/api/accounts/useAccountInfo';
import { useLogout } from '@/hooks/api/auth/useLogout';

const UserInformation = () => {
	const router = useRouter();
	const { data } = useAccountInfo();
	const { mutate } = useLogout({
		onSuccess: (data) => {
			toast.success(data.message);
			router.replace('/');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Popover>
			<PopoverTrigger className="cursor-pointer">
				<UserChip />
			</PopoverTrigger>
			<PopoverContent className="w-64 p-4" side="right" align="end">
				<div className="space-y-4">
					{/* 사용자 정보 섹션 */}
					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<div className="flex items-center justify-center w-10 h-10 border rounded-full border-custom-point bg-gray-100">
								<User width={20} height={20} strokeWidth={1} />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">
									{data?.memberName}
								</h3>
								<p className="text-sm text-gray-500">고객님</p>
							</div>
						</div>

						{/* 계좌 정보 */}
						<div className="bg-gray-50 rounded-lg p-3 space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600">계좌번호</span>
								<span className="text-sm font-medium text-gray-900">
									{data?.accountNumber}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600">예수금</span>
								<span className="text-sm font-medium text-green-600">
									{`${data?.orderPossibleCash.toLocaleString()}원`}
								</span>
							</div>
						</div>
					</div>

					{/* 구분선 */}
					<hr className="border-gray-200" />

					{/* 로그아웃 버튼 */}

					<Button
						className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
						onClick={() => mutate()}
					>
						로그아웃
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default UserInformation;
