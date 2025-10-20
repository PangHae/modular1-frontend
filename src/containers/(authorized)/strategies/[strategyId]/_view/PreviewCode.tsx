import { FC } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Card, CardContent } from '@/components/ui/card';

interface Props {
	code: string;
}

const PreviewCode: FC<Props> = ({ code }) => {
	return (
		<Card className="p-0">
			<CardContent>
				<SyntaxHighlighter language="python" className="bg-white! w-full">
					{code}
				</SyntaxHighlighter>
			</CardContent>
		</Card>
	);
};

export default PreviewCode;
