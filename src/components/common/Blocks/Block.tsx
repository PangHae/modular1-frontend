import { ComponentProps, FC, PropsWithChildren } from 'react';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const BlockTitle: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children,
}) => {
	return (
		<span className={cn('text-heading3 font-semibold', className)}>
			{children}
		</span>
	);
};

interface InputProps extends ComponentProps<'input'> {
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const BlockInput: FC<InputProps> = ({
	placeholder,
	value,
	onChange,
	className,
}) => {
	return (
		<Input
			className={className}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

interface DropdownProps {
	placeholder: string;
	items: { category: string; options: { label: string; value: string }[] }[];
	value: string;
	onChange: (value: string) => void;
}

const BlockDropdown: FC<DropdownProps> = ({
	placeholder,
	items,
	onChange,
	value,
}) => {
	return (
		<Select value={value} onValueChange={(value) => onChange(value)}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectGroup key={item.category}>
						<SelectLabel>{item.category}</SelectLabel>
						{item.options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</Select>
	);
};

interface Props {
	className?: string;
}

const BlockContainer: FC<PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return <div className={cn('flex flex-col', className)}>{children}</div>;
};

const Block = Object.assign(BlockContainer, {
	dropdown: BlockDropdown,
	input: BlockInput,
	title: BlockTitle,
});

export default Block;
