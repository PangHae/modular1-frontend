'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface Props {
	icon: React.ReactNode;
	href: string;
	title?: string;
}

const MenuIcon: FC<Props> = ({ icon, title, href }) => {
	const pathname = usePathname();
	const isActive = pathname.startsWith(href);
	const colorClass = isActive ? 'text-custom-main' : 'text-custom-sub';

	return (
		<Link
			href={href}
			className={`flex flex-col items-center justify-center gap-2 w-full text-xs transition-colors duration-200 ${colorClass}`}
		>
			<div className={colorClass}>{icon}</div>
			{title}
		</Link>
	);
};

export default MenuIcon;
