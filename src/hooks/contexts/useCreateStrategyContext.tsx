'use client';

import { useContext } from 'react';

import { Context } from '@/components/providers/CreateStrategyProvider';

export const useCreateStrategyContext = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error(
			'useCreateStrategyContext must be used within a CreateStrategyProvider'
		);
	}
	return context;
};
