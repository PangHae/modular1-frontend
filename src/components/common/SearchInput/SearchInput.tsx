'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { FC, useRef } from 'react';

interface Props {
	onSearch: (keyword: string) => void;
}

const SearchInput: FC<Props> = ({ onSearch }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch(inputRef.current?.value || '');
		}
	};

	const handleClickSearch = () => {
		onSearch(inputRef.current?.value || '');
	};

	return (
		<label className="flex gap-2 align-center justify-center w-[600px] border border-custom-gray-border rounded-full pl-1 pr-6 py-3 bg-white focus-within:border-custom-point">
			<input
				ref={inputRef}
				className="w-full h-full focus:outline-none pl-5"
				placeholder="검색어를 입력해주세요."
				onKeyUp={handleKeyUp}
			/>
			<button
				className="cursor-pointer"
				type="button"
				onClick={handleClickSearch}
			>
				<Search className="" strokeWidth={1} />
			</button>
		</label>
	);
};

export default SearchInput;
