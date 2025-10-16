'use client';

import CreateStrategyLayout from '@/components/layouts/CreateStrategyLayout/CreateStrategyLayout';
import { useCreateStrategyContext } from '@/hooks/contexts/useCreateStrategyContext';

import StockSelectClient from './StockSelect.client';
import StrategyConfigurationClient from './StrategyConfiguration.client';

const CreateStrategyClient = () => {
	const {
		currentStep,
		strategyType,
		strategyName,
		selectedStock,
		setSelectedStock,
		setStrategyType,
		setStrategyName,
		handleNext,
		handlePrev,
		handleCreateStrategy,
	} = useCreateStrategyContext();

	return (
		<CreateStrategyLayout
			currentStep={currentStep}
			strategyName={strategyName}
			onStrategyNameChange={setStrategyName}
			selectedStock={selectedStock}
			onNext={handleNext}
			onPrev={handlePrev}
			onCreateStrategy={handleCreateStrategy}
			canProceed={currentStep === 1 ? !!selectedStock.trim() : true}
		>
			{currentStep === 1 && (
				<StockSelectClient
					selectedStock={selectedStock}
					onSelectStock={setSelectedStock}
				/>
			)}
			{currentStep === 2 && (
				<StrategyConfigurationClient
					strategyType={strategyType}
					onStrategyTypeChange={setStrategyType}
				/>
			)}
		</CreateStrategyLayout>
	);
};

export default CreateStrategyClient;
