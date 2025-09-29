import ContentWrapper from '@/components/layouts/ContentWrapper';

import EventCalendar from './_view/EventCalendar';
import EventList from './_view/EventList';
import StockTable from './_view/StockTable';

const Stocks = () => {
	return (
		<ContentWrapper>
			<div className="flex gap-4 h-[calc(100vh-8rem)]">
				<div className="flex flex-2 h-full">
					<StockTable />
				</div>
				<div className="flex flex-col flex-1 space-y-4 h-full min-w-[300px]">
					<EventCalendar />
					<EventList />
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Stocks;
