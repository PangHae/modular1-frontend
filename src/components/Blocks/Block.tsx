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

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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

const BlockSubtitle: FC<PropsWithChildren<{ className?: string }>> = ({
	className,
	children,
}) => {
	return (
		<span className={cn('text-[18px] font-semibold', className)}>
			{children}
		</span>
	);
};

interface InputProps extends ComponentProps<'input'> {
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	showTooltip?: boolean;
}

const BlockInput: FC<PropsWithChildren<InputProps>> = ({
	placeholder,
	value,
	onChange,
	className,
	children,
	disabled = false,
	showTooltip = true,
	...props
}) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<Input
					className={cn('bg-white!', className)}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
					{...props}
				/>
			</TooltipTrigger>
			{disabled || !showTooltip ? null : (
				<TooltipContent>{children}</TooltipContent>
			)}
		</Tooltip>
	);
};

interface DropdownProps {
	placeholder: string;
	items: { category: string; options: { label: string; value: string }[] }[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

const BlockDropdown: FC<DropdownProps> = ({
	placeholder,
	items,
	onChange,
	value,
	disabled = false,
}) => {
	return (
		<Select
			value={value}
			onValueChange={(value) => onChange(value)}
			disabled={disabled}
		>
			<SelectTrigger className="bg-white!">
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
	subtitle: BlockSubtitle,
});

export default Block;
