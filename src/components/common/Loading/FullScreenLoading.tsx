import { FC } from 'react';

import { Spinner } from '@/components/ui/spinner';

interface FullScreenLoadingProps {
	message?: string;
	showBackground?: boolean;
}

export const FullScreenLoading: FC<FullScreenLoadingProps> = ({
	message = '로딩 중...',
	showBackground = true,
}) => {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center ${
				showBackground ? 'bg-white/60 backdrop-blur-sm' : 'bg-transparent'
			}`}
			role="status"
			aria-live="polite"
			aria-label="Loading"
			style={{
				pointerEvents: 'none',
				willChange: 'opacity',
			}}
		>
			<div
				className="flex flex-col items-center gap-4"
				style={{
					pointerEvents: 'auto',
				}}
			>
				{/* Spinner */}
				<Spinner className="w-8 h-8 text-blue-600" />

				{/* 메시지 */}
				<div className="text-center">
					<p className="text-lg font-medium text-gray-900">{message}</p>
					<p className="text-sm text-gray-600 mt-1">잠시만 기다려주세요...</p>
				</div>
			</div>
		</div>
	);
};
