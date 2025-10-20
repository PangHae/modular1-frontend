'use client';

import CreateStrategyLayout from '@/components/layouts/CreateStrategyLayout/CreateStrategyLayout';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

import StockSelectClient from './StockSelect.client';
import StrategyConfigurationClient from './StrategyConfiguration.client';

const CreateStrategyClient = () => {
	const {
		strategyNameRef,
		currentStep,
		selectedStock,
		handleNext,
		handlePrev,
		handleCreateStrategy,
	} = useCreateStrategyContext();

	return (
		<CreateStrategyLayout
			strategyNameRef={strategyNameRef}
			currentStep={currentStep}
			selectedStock={selectedStock}
			onNext={handleNext}
			onPrev={handlePrev}
			onCreateStrategy={handleCreateStrategy}
		>
			{currentStep === 1 && <StockSelectClient />}
			{currentStep === 2 && <StrategyConfigurationClient />}
		</CreateStrategyLayout>
	);
};

export default CreateStrategyClient;
