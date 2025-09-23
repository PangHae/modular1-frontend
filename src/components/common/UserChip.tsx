import { User } from 'lucide-react';

export default function UserChip() {
	return (
		<div className="flex items-center justify-center">
			<div className="flex items-center justify-center w-[40px] h-[40px] border rounded-full border-custom-point bg-gray-100">
				<User width={24} height={24} strokeWidth={1} />
			</div>
		</div>
	);
}
