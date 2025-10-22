'use client';

import { FC, useRef } from 'react';

import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
	searchQuery: string;
	onSearch: (keyword: string) => void;
	className?: string;
	placeholder?: string;
}

const SearchInput: FC<Props> = ({
	searchQuery,
	onSearch,
	className,
	placeholder = '검색어를 입력해주세요.',
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<label
			className={cn(
				'flex gap-2 align-center justify-center w-[600px] border border-custom-gray-border rounded-full pl-1 pr-6 py-3 bg-white focus-within:border-custom-point',
				className
			)}
		>
			<input
				ref={inputRef}
				className="w-full h-full focus:outline-none pl-5"
				placeholder={placeholder}
				value={searchQuery}
				onChange={(e) => onSearch(e.target.value)}
			/>
			<button className="cursor-pointer" type="button">
				<Search className="" strokeWidth={1} />
			</button>
		</label>
	);
};

export default SearchInput;
