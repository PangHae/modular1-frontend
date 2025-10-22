import Image from 'next/image';

interface Props {
	stockCode: string;
	stockName: string;
	onClick: (stock: { name: string; code: string }) => void;
}

const StockItem = ({ stockCode, stockName, onClick }: Props) => {
	return (
		<div
			className="flex items-center p-2 hover:bg-gray-50 cursor-pointer transition-colors gap-2"
			onClick={() => onClick({ name: stockName, code: stockCode })}
		>
			<div className="w-10 h-10 rounded-full flex items-center justify-center text-lg">
				<Image
					className="object-cover rounded-full"
					src={`https://images.tossinvest.com/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stockCode}.png?width=64&height=64`}
					alt={stockName}
					width={32}
					height={32}
				/>
			</div>
			<div className="font-medium text-gray-900 text-body2!">{stockName}</div>
		</div>
	);
};

export default StockItem;
