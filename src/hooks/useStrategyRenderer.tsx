import { FC, ReactNode, useMemo } from 'react';

import { Node, TradeNode } from '@/@types/StrategyTemplateNode';
import { BlockComponent } from '@/constants/blockComponent';

import { getComponentProps } from './useComponentPropsFactory';

interface UseStrategyRendererProps {
	ref: React.RefObject<{ [key: string]: () => Node } | null> | null;
	node: TradeNode | null;
	strategyType: 'buy' | 'sell';
	disabled?: boolean;
}

export const useStrategyRenderer = ({
	ref,
	node,
	strategyType,
	disabled = false,
}: UseStrategyRendererProps) => {
	const renderNode = useMemo(() => {
		// 실제 JSON을 생성하는 함수
		const createNodeJson = (node: Node): Node => {
			switch (node.type) {
				case 'GROUP': {
					const { logic, children } = node;
					return {
						type: 'GROUP',
						logic,
						label: logic === 'ANY' ? 'any' : 'all',
						children: children.map(createNodeJson),
					} as Node;
				}
				default: {
					// COMPARE, CROSS 등의 경우 원본 노드 반환
					return node;
				}
			}
		};

		const renderComponent = (node: Node): ReactNode => {
			switch (node.type) {
				case 'GROUP': {
					const { logic, children } = node;
					const LogicComponent =
						logic === 'ANY' ? BlockComponent.any : BlockComponent.all;

					// children을 실제 JSON으로 변환
					const childrenJson = children.map(createNodeJson);

					// props 팩토리에서 props 가져오기
					const label = logic === 'ANY' ? 'any' : 'all';
					const props = getComponentProps(node, label);

					return (
						<LogicComponent
							key={node.label}
							{...props}
							ref={ref}
							childrenNodes={childrenJson}
						>
							{children.map((child) => (
								<div key={`${child.type}-${child.label}`}>
									{renderComponent(child)}
								</div>
							))}
						</LogicComponent>
					);
				}

				default: {
					const { label } = node;

					// label을 기반으로 컴포넌트 매핑
					const getComponentByLabel = (label: string) => {
						switch (label) {
							// Exit 블록들 - 가장 우선순위
							case 'exitWithProfit':
								return BlockComponent.exitWithProfit;
							case 'exitWithLoss':
								return BlockComponent.exitWithLoss;

							// 기본 지표들 (Blocks/default)
							case 'executionCompare':
								return BlockComponent.executionCompare;
							case 'priceCompare':
								return BlockComponent.priceCompare;
							case 'tradeMetricCompare':
								return BlockComponent.tradeMetricCompare;
							case 'changeRateCompare':
								return BlockComponent.changeRateCompare;

							// 보조지표들 (Blocks/indicator)
							case 'emaCompare':
								return BlockComponent.emaCompare;
							case 'emaCross':
								return BlockComponent.emaCross;
							case 'macdCompare':
								return BlockComponent.macdCompare;
							case 'macdCross':
								return BlockComponent.macdCompare;
							case 'rsiCompare':
								return BlockComponent.rsiCompare;
							case 'rsiCross':
								return BlockComponent.rsiCross;
							case 'bandAbsoluteCompare':
								return BlockComponent.bandAbsoluteCompare;
							case 'bandRelativeCompare':
								return BlockComponent.bandRelativeCompare;
							case 'bandCross':
								return BlockComponent.bandCross;
							case 'openingRangeCross':
								return BlockComponent.openingRangeCross;
							case 'previousHighLowCompare':
								return BlockComponent.previousHighLowCompare;
							case 'yearHighLowCompare':
								return BlockComponent.yearHighLowCompare;
							case 'rvolCompare':
								return BlockComponent.rvolCompare;
							case 'vwapCross':
								return BlockComponent.vwapCross;

							default:
								// label이 매핑되지 않은 경우 기본 컴포넌트 반환
								return BlockComponent.priceCompare;
						}
					};

					const Component = getComponentByLabel(label || '');

					// ref를 전달하기 위한 래퍼 컴포넌트
					const WrappedComponent: FC = () => {
						const props = getComponentProps(node, label || '');
						return <Component ref={ref} {...props} disabled={disabled} />;
					};

					return <WrappedComponent key={label} />;
				}
			}
		};

		if (!node) {
			return null;
		}

		const renderedComponent = renderComponent(node.node);

		// strategyType에 따라 Buy/Sell 컴포넌트로 감싸기
		const nodeJson = createNodeJson(node.node);

		if (strategyType === 'buy') {
			return (
				<BlockComponent.buy
					key="buy-wrapper"
					initialValue={node.orderQuantity.toString()}
					ref={ref}
					childNode={nodeJson}
					disabled={disabled}
				>
					{renderedComponent}
				</BlockComponent.buy>
			);
		} else if (strategyType === 'sell') {
			return (
				<BlockComponent.sell
					key="sell-wrapper"
					initialValue={node.orderQuantity.toString()}
					ref={ref}
					childNode={nodeJson}
					disabled={disabled}
				>
					{renderedComponent}
				</BlockComponent.sell>
			);
		}

		return renderedComponent;
	}, [node, strategyType]);

	return renderNode;
};
