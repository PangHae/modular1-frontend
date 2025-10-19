import Link from 'next/link';

import { Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const NotFound = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="max-w-md w-full mx-auto text-center px-6">
				{/* 404 아이콘 */}
				<div className="mb-8">
					<div className="text-8xl font-bold text-blue-600 mb-4">404</div>
					<div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
				</div>

				{/* 메시지 */}
				<h1 className="text-2xl font-bold text-gray-900 mb-4">
					페이지를 찾을 수 없습니다
				</h1>
				<p className="text-gray-600 mb-8 leading-relaxed">
					요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
					<br />
					주소를 다시 확인해주시거나 홈으로 돌아가주세요.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						asChild
						className="flex items-center gap-2 bg-shinhan-blue hover:bg-shinhan-blue/80!"
					>
						<Link href="/">
							<Home className="w-4 h-4" />
							홈으로 돌아가기
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
