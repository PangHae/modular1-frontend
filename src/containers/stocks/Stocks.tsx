import { ChevronLeft, ChevronRight } from 'lucide-react';

import ContentWrapper from '@/components/layouts/ContentWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { events, stockData } from '@/mock/stockData';

const Stocks = () => {
	return (
		<ContentWrapper>
			<div className="flex gap-4 h-[calc(100vh-8rem)]">
				<div className="flex flex-2 h-full">
					{/* 메인 콘텐츠 - 실시간 차트 */}
					<Card className="flex flex-1 flex-col">
						<CardHeader className="flex-shrink-0">
							<CardTitle className="text-xl font-semibold">
								실시간 차트
							</CardTitle>
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
												<TableCell className="font-medium">
													{index + 1}
												</TableCell>
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
												<TableCell className="font-medium">
													{stock.price}원
												</TableCell>
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
				</div>
				{/* 오른쪽 사이드바 - 캘린더 및 이벤트 */}
				<div className="flex flex-col flex-1 space-y-4 h-full min-w-[300px]">
					{/* 캘린더 */}
					<Card className="h-[350px] flex flex-col">
						<CardHeader className="flex-shrink-0">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg">2025년 9월</CardTitle>
								<div className="flex gap-1">
									<button className="p-1 hover:bg-gray-100 rounded">
										<ChevronLeft className="w-4 h-4" />
									</button>
									<button className="p-1 hover:bg-gray-100 rounded">
										<ChevronRight className="w-4 h-4" />
									</button>
								</div>
							</div>
						</CardHeader>
						<CardContent className="flex-1 overflow-hidden">
							<div className="grid grid-cols-7 gap-1 text-center text-sm">
								{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
									<div key={day} className="p-2 text-gray-500 font-medium">
										{day}
									</div>
								))}
								{/* 캘린더 날짜들 */}
								{Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
									<div
										key={day}
										className={`p-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
											day === 23 ? 'bg-blue-100 text-blue-800 font-medium' : ''
										} ${day === 25 || day === 26 ? 'bg-gray-100' : ''}`}
									>
										{day}
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* 이벤트 리스트 */}
					<Card className="flex-1 flex flex-col min-h-0">
						<CardHeader className="flex-shrink-0">
							<CardTitle className="text-lg">9월 4주차</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-auto">
							<div className="space-y-2">
								{(() => {
									let globalItemCounter = 0;
									return events.map((event, index) => (
										<div key={index}>
											{event.content ? (
												<div
													className={`flex items-center gap-3 text-sm p-3 rounded-lg ${
														globalItemCounter % 2 === 0 ? 'bg-gray-50' : ''
													}`}
												>
													<div className="font-medium text-gray-700 min-w-[3rem]">
														{event.date} {event.day}
													</div>
													<div className="flex items-center gap-2 text-gray-600">
														{event.icon}
														<span>{event.content}</span>
													</div>
												</div>
											) : (
												<div className="space-y-2">
													{event.items?.map((item, itemIndex) => {
														const isOdd = globalItemCounter % 2 === 0;
														globalItemCounter++;
														return (
															<div
																key={itemIndex}
																className={`flex items-center gap-3 text-sm p-3 rounded-lg ${
																	isOdd ? 'bg-gray-50' : ''
																}`}
															>
																{itemIndex === 0 && (
																	<div className="font-medium text-gray-700 min-w-[3rem]">
																		{event.date} {event.day}
																	</div>
																)}
																{itemIndex > 0 && (
																	<div className="min-w-[3rem]"></div>
																)}
																<div className="flex items-center gap-2 text-gray-600">
																	{item.icon}
																	<span>{item.title}</span>
																</div>
															</div>
														);
													})}
												</div>
											)}
											{/* {event.content && globalItemCounter++} */}
										</div>
									));
								})()}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Stocks;
