import Image from 'next/image';
import Link from 'next/link';

import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import { MENU } from '@/constants/menu';
import { getAccountInfo } from '@/services/accounts';

import MenuIcon from './MenuIcon';
import UserInformation from './UserInformation';
import modular1Icon from '../../../../public/images/modular1-icon.png';

const SideNav = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['account', 'info'],
		queryFn: getAccountInfo,
	});

	return (
		<nav className="fixed flex flex-col align-center justify-between w-[70px] h-full pt-6 pb-6 border-r-[0.2px] border-custom-gray-border/40 bg-transparent">
			<menu className="flex flex-col items-center justify-center gap-4 w-full">
				<li className="mb-2">
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
			<HydrationBoundary state={dehydrate(queryClient)}>
				<UserInformation />
			</HydrationBoundary>
		</nav>
	);
};

export default SideNav;
