import { FC } from 'react';

interface Props {
	icon: React.ReactNode;
	title: string;
}

const PaletteMenu: FC<Props> = ({ icon, title }) => {
	const isActive = true;
	const colorClass = isActive ? 'text-custom-main' : 'text-custom-sub';
	return (
		<div
			className={`flex flex-col items-center justify-center gap-1 w-full text-xs transition-colors duration-200 ${colorClass}`}
		>
			<div className={colorClass}>{icon}</div>
			{title}
		</div>
	);
};

export default PaletteMenu;
