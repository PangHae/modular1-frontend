'use client';

import { Compass, Cuboid, Shapes } from 'lucide-react';

import MyStrategy from './MyStrategy/MyStrategy';
import PaletteMenu from './PaletteMenu';
// import StockSearch from './StockSearch';

const SidePalette = () => {
	return (
		<div className="flex w-[470px] h-full bg-custom-gray-bg border rounded-[8px] border-custom-gray-border">
			<menu className="flex flex-col gap-4 border-r border-custom-gray-border w-[70px] py-8">
				<li>
					<PaletteMenu icon={<Compass strokeWidth={1} />} title="탐색" />
				</li>
				<li>
					<PaletteMenu icon={<Cuboid strokeWidth={1} />} title="전략" />
				</li>
				<li>
					<PaletteMenu icon={<Shapes strokeWidth={1} />} title="블록" />
				</li>
			</menu>
			{/* <StockSearch /> */}
			<MyStrategy />
		</div>
	);
};

export default SidePalette;
