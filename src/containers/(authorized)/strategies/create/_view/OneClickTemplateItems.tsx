import { TEMPLATE_CONDITION_MAP } from '@/constants/template';
import useOneClickTemplate from '@/hooks/api/strategy/useOneClickTemplate';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

const OneClickTemplateItems = () => {
	const { data: templates, isLoading: isTemplatesLoading } =
		useOneClickTemplate();
	const { handleSelectTemplate } = useCreateStrategyContext();

	return (
		<>
			{isTemplatesLoading ? (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-gray-500">
						템플릿 목록을 불러오는 중...
					</div>
				</div>
			) : templates?.data?.length ? (
				<div className="space-y-2">
					{templates.data.map((template) => {
						const templateName =
							template.strategyName as keyof typeof TEMPLATE_CONDITION_MAP;
						return (
							<div
								key={template.id}
								className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
								onClick={() => handleSelectTemplate(template)}
							>
								<div className="text-button font-semibold">
									{TEMPLATE_CONDITION_MAP[templateName].name}
								</div>
								<div className="text-caption! text-gray-600 mt-1">
									{TEMPLATE_CONDITION_MAP[templateName].description}
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-gray-500">
						사용 가능한 템플릿이 없습니다.
					</div>
				</div>
			)}
		</>
	);
};

export default OneClickTemplateItems;
