'use client';

import { FC, PropsWithChildren, ReactNode } from 'react';

interface MenuProps {
	menus: { title: string; item: ReactNode }[];
}

const Menu: FC<MenuProps> = ({ menus }) => {
	return (
		<menu className="flex flex-col gap-4 border-r border-custom-gray-border/40 w-[70px] py-8">
			{menus.map((menu) => (
				<li key={menu.title}>{menu.item}</li>
			))}
		</menu>
	);
};

interface MenuItemProps {
	icon: React.ReactNode;
	title: string;
	isActive?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ icon, title, isActive = false }) => {
	const colorClass = isActive ? 'text-custom-main' : 'text-custom-sub';
	return (
		<div
			className={`flex flex-col items-center justify-center gap-1 w-full text-xs transition-colors duration-200 cursor-pointer ${colorClass}`}
		>
			<div className={colorClass}>{icon}</div>
			{title}
		</div>
	);
};

const SidePaletteContainer: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex w-[400px] rounded-xl border shadow-sm shrink-0 bg-card">
			{children}
		</div>
	);
};

const SidePalette = Object.assign(SidePaletteContainer, {
	menuList: Menu,
	menuItem: MenuItem,
});

export default SidePalette;
