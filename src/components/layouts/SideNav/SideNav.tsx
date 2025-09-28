import { LayoutDashboard } from 'lucide-react';

import UserChip from '@/components/common/UserChip';
import { MENU } from '@/constants/menu';

import MenuIcon from './MenuIcon';

const SideNav = () => {
	return (
		<nav className="fixed flex flex-col align-center justify-between w-[70px] h-full pt-6 pb-6 border-r-[0.2px] border-custom-gray-border/40 bg-transparent">
			<menu className="flex flex-col items-center justify-center gap-4 w-full">
				<li className="mb-6">
					<MenuIcon
						icon={<LayoutDashboard width={32} height={32} strokeWidth={1.5} />}
						href="/dashboard"
					/>
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
