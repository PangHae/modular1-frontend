import { CreateStrategyProvider } from '@/components/providers/CreateStrategyProvider';

import CreateStrategyClient from './CreateStrategy.client';

const CreateStrategy = () => {
	return (
		<CreateStrategyProvider>
			<CreateStrategyClient />
		</CreateStrategyProvider>
	);
};

export default CreateStrategy;
