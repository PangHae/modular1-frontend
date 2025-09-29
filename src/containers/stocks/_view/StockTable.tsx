import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from '@/components/ui/table';
import { stockData } from '@/mock/stockData';

const StockTable = () => {
	return (
		<Card className="flex flex-1 flex-col">
			<CardHeader className="flex-shrink-0">
				<CardTitle className="text-xl font-semibold">실시간 차트</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 overflow-auto">
				<div className="max-h-full overflow-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12"></TableHead>
								<TableHead className="w-12">종목</TableHead>
								<TableHead>현재가</TableHead>
								<TableHead>등락률</TableHead>
								<TableHead>거래대금 많은 순</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{stockData.map((stock, index) => (
								<TableRow key={stock.id}>
									<TableCell className="font-medium">{index + 1}</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
												{stock.logo}
											</div>
											<div>
												<div className="font-medium">{stock.company}</div>
												<div className="text-sm text-gray-500">
													{stock.companyKr}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-medium">{stock.price}원</TableCell>
									<TableCell>
										<span
											className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium text-white ${
												stock.changeType === 'positive'
													? 'bg-red-100 text-red-800'
													: 'bg-blue-100 text-blue-800'
											}`}
										>
											{stock.changeRate}
										</span>
									</TableCell>
									<TableCell className="text-sm text-gray-600">
										{stock.tradeVolume}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default StockTable;
