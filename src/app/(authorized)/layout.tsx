import SideNav from '@/components/layouts/SideNav';

export default function AuthorizedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SideNav />
			<div className="pl-[70px] w-full h-full">{children}</div>;
		</>
	);
}
