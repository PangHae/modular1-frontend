import { FC, PropsWithChildren } from 'react';

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
	return <main className="w-full h-full p-10 bg-transparent">{children}</main>;
};

export default ContentWrapper;
