import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const Block = () => {
	return (
		<section className="flex-1 flex flex-col">
			<h3 className="text-heading3 font-semibold p-6 border-b border-custom-gray-border">
				전략 블록
			</h3>
			<Accordion type="single" collapsible>
				<AccordionItem value="1" className="px-3 py-2">
					<AccordionTrigger className="cursor-pointer hover:no-underline">
						원클릭 템플릿
					</AccordionTrigger>
					<AccordionContent></AccordionContent>
				</AccordionItem>
				<AccordionItem value="2" className="px-3 py-2">
					<AccordionTrigger className="cursor-pointer hover:no-underline">
						지표 블록
					</AccordionTrigger>
					<AccordionContent>dddd</AccordionContent>
				</AccordionItem>
				<AccordionItem value="3" className="px-3 py-2">
					<AccordionTrigger className="cursor-pointer hover:no-underline">
						보조 지표 블록
					</AccordionTrigger>
					<AccordionContent>컨텐츠입니다6</AccordionContent>
				</AccordionItem>
				<AccordionItem value="4" className="px-3 py-2">
					<AccordionTrigger className="cursor-pointer hover:no-underline">
						리스크 블록
					</AccordionTrigger>
					<AccordionContent>dddd</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
};

export default Block;
