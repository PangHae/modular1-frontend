import Image from 'next/image';
import Link from 'next/link';

import UserChip from '@/components/common/UserChip';
import { MENU } from '@/constants/menu';

import MenuIcon from './MenuIcon';
import modular1Icon from '../../../../public/images/modular1-icon.png';

const SideNav = () => {
	return (
		<nav className="fixed flex flex-col align-center justify-between w-[70px] h-full pt-6 pb-6 border-r-[0.2px] border-custom-gray-border/40 bg-transparent">
			<menu className="flex flex-col items-center justify-center gap-3 w-full">
				<li className="mb-6">
					<Link
						href="/dashboard"
						className="flex items-center justify-center hover:bg-custom-gray-border/40 rounded-md p-2"
					>
						<Image
							src={modular1Icon}
							alt="Modular1 Icon"
							width={32}
							height={32}
						/>
					</Link>
				</li>
				{MENU.map(({ title, icon, href }) => (
					<li key={href}>
						<MenuIcon title={title} icon={icon} href={href} />
					</li>
				))}
			</menu>
			<UserChip />
		</nav>
	);
};

export default SideNav;
