'use client';

import { useState } from 'react';

import CreateStrategyLayout from '@/components/layouts/CreateStrategyLayout/CreateStrategyLayout';

import StockSelectClient from './StockSelect.client';
import StrategyConfigurationClient from './StrategyConfiguration.client';

type Step = 1 | 2;
type StrategyType = 'BUY' | 'SELL';

const CreateStrategyClient = () => {
	const [currentStep, setCurrentStep] = useState<Step>(1);
	const [strategyType, setStrategyType] = useState<StrategyType>('BUY');
	const [strategyName, setStrategyName] = useState('');
	const [selectedStock, setSelectedStock] = useState('');

	const handleNext = () => {
		if (currentStep < 2) {
			setCurrentStep((prev) => (prev + 1) as Step);
		}
	};

	const handlePrev = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => (prev - 1) as Step);
		}
	};

	const handleCreateStrategy = () => {
		console.log('전략 생성:', {
			strategyName,
			selectedStock,
			strategyType,
		});
		// TODO: 전략 생성 API 호출
	};

	return (
		<CreateStrategyLayout
			currentStep={currentStep}
			strategyType={strategyType}
			strategyName={strategyName}
			onStrategyTypeChange={setStrategyType}
			onStrategyNameChange={setStrategyName}
			onNext={handleNext}
			onPrev={handlePrev}
			onCreateStrategy={handleCreateStrategy}
			canProceed={currentStep === 1 ? !!selectedStock.trim() : true}
		>
			{currentStep === 1 && (
				<StockSelectClient
					selectedStock={selectedStock}
					onSelectStock={setSelectedStock}
					onNext={handleNext}
				/>
			)}
			{currentStep === 2 && (
				<StrategyConfigurationClient strategyType={strategyType} />
			)}
		</CreateStrategyLayout>
	);
};

export default CreateStrategyClient;
