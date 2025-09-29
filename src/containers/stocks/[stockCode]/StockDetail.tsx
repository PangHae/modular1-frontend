import { FC } from 'react';

import StockDetailClient from './StockDetail.client';

interface Props {
	params: Promise<{ stockCode: string }>;
}

const StockDetail: FC<Props> = async ({ params }) => {
	const { stockCode } = await params;
	console.log(stockCode);
	// TODO: 종목 정보 조회
	return <StockDetailClient />;
};

export default StockDetail;
