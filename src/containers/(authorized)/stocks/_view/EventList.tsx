import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { events } from '@/mock/stockData';

const EventList = () => {
	return (
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
	);
};

export default EventList;
