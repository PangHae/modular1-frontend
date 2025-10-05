import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EventCalendar = () => {
	return (
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
	);
};

export default EventCalendar;
