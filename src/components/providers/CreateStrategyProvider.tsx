'use client';

import { createContext, useRef, useState } from 'react';

import { Node } from '@/@types/StrategyTemplateNode';

type Step = 1 | 2;
type StrategyType = 'BUY' | 'SELL';

export const Context = createContext<{
	ref: React.RefObject<{ [key: string]: () => Node } | null>;
	currentStep: Step;
	strategyType: StrategyType;
	strategyName: string;
	selectedStock: string;
	setSelectedStock: (stock: string) => void;
	setStrategyType: (type: StrategyType) => void;
	setStrategyName: (name: string) => void;
	handleNext: () => void;
	handlePrev: () => void;
	handleCreateStrategy: () => void;
} | null>(null);

export const CreateStrategyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const childRef = useRef<{ [key: string]: () => Node }>(null);
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
		if (!childRef.current) {
			return;
		}
		console.log(childRef.current);
		Object.values(childRef.current).map((value) => console.log(value()));
		// TODO: 전략 생성 API 호출
	};

	return (
		<Context.Provider
			value={{
				ref: childRef,
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
			}}
		>
			{children}
		</Context.Provider>
	);
};
