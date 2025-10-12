'use client';

import { FC } from 'react';

import { Cuboid, Shapes } from 'lucide-react';

import Block from '@/components/common/Blocks';
import All from '@/components/common/Blocks/logical/All';
import Any from '@/components/common/Blocks/logical/Any';
import Buy from '@/components/common/Blocks/trade/Buy';
import Sell from '@/components/common/Blocks/trade/Sell';
import SidePalette from '@/components/common/SidePalette/SidePalette';

interface Props {
	strategyType: 'BUY' | 'SELL';
}

const StrategyConfigurationClient: FC<Props> = ({ strategyType }) => {
	console.log(strategyType);
	return (
		<div className="flex flex-1 gap-4">
			<SidePalette>
				<SidePalette.menuList
					menus={[
						{
							title: '전략',
							item: (
								<SidePalette.menuItem
									icon={<Cuboid strokeWidth={1} />}
									title="전략"
								/>
							),
						},
						{
							title: '블록',
							item: (
								<SidePalette.menuItem
									icon={<Shapes strokeWidth={1} />}
									title="블록"
								/>
							),
						},
					]}
				/>
				wow
			</SidePalette>
			<div className="flex gap-4 flex-1 bg-white rounded-[8px] border border-custom-gray-border/40 p-4">
				<Sell>
					<All>
						<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
							<div className="flex items-center gap-4">
								<Block.dropdown
									placeholder="단위"
									items={[
										{
											category: '',
											options: [
												{ label: '일봉', value: '일봉' },
												{ label: '주봉', value: '주봉' },
												{ label: '월봉', value: '월봉' },
												{ label: '년봉', value: '년봉' },
											],
										},
									]}
								/>
								RSI가
								<Block.dropdown
									placeholder="수치"
									items={[
										{
											category: '',
											options: [
												{ label: '100', value: '100' },
												{ label: '200', value: '200' },
												{ label: '300', value: '300' },
												{ label: '400', value: '400' },
												{ label: '500', value: '500' },
											],
										},
									]}
								/>
								이상일 때
							</div>
						</Block>
						<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
							<div className="flex items-center gap-4">
								<Block.dropdown
									placeholder="단위"
									items={[
										{
											category: '',
											options: [
												{ label: '일봉', value: '일봉' },
												{ label: '주봉', value: '주봉' },
												{ label: '월봉', value: '월봉' },
												{ label: '년봉', value: '년봉' },
											],
										},
									]}
								/>
								RSI가
								<Block.dropdown
									placeholder="수치"
									items={[
										{
											category: '',
											options: [
												{ label: '100', value: '100' },
												{ label: '200', value: '200' },
												{ label: '300', value: '300' },
												{ label: '400', value: '400' },
												{ label: '500', value: '500' },
											],
										},
									]}
								/>
								이상일 때
							</div>
						</Block>
					</All>
					<Any>
						<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
							<div className="flex items-center gap-4">
								<Block.dropdown
									placeholder="단위"
									items={[
										{
											category: '',
											options: [
												{ label: '일봉', value: '일봉' },
												{ label: '주봉', value: '주봉' },
												{ label: '월봉', value: '월봉' },
												{ label: '년봉', value: '년봉' },
											],
										},
									]}
								/>
								RSI가
								<Block.dropdown
									placeholder="수치"
									items={[
										{
											category: '',
											options: [
												{ label: '100', value: '100' },
												{ label: '200', value: '200' },
												{ label: '300', value: '300' },
												{ label: '400', value: '400' },
												{ label: '500', value: '500' },
											],
										},
									]}
								/>
								이상일 때
							</div>
						</Block>
						<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
							<div className="flex items-center gap-4">
								<Block.dropdown
									placeholder="단위"
									items={[
										{
											category: '',
											options: [
												{ label: '일봉', value: '일봉' },
												{ label: '주봉', value: '주봉' },
												{ label: '월봉', value: '월봉' },
												{ label: '년봉', value: '년봉' },
											],
										},
									]}
								/>
								RSI가
								<Block.dropdown
									placeholder="수치"
									items={[
										{
											category: '',
											options: [
												{ label: '100', value: '100' },
												{ label: '200', value: '200' },
												{ label: '300', value: '300' },
												{ label: '400', value: '400' },
												{ label: '500', value: '500' },
											],
										},
									]}
								/>
								이상일 때
							</div>
						</Block>
					</Any>
				</Sell>

				<Buy>
					<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
						<div className="flex items-center gap-4">
							<Block.dropdown
								placeholder="단위"
								items={[
									{
										category: '',
										options: [
											{ label: '일봉', value: '일봉' },
											{ label: '주봉', value: '주봉' },
											{ label: '월봉', value: '월봉' },
											{ label: '년봉', value: '년봉' },
										],
									},
								]}
							/>
							RSI가
							<Block.dropdown
								placeholder="수치"
								items={[
									{
										category: '',
										options: [
											{ label: '100', value: '100' },
											{ label: '200', value: '200' },
											{ label: '300', value: '300' },
											{ label: '400', value: '400' },
											{ label: '500', value: '500' },
										],
									},
								]}
							/>
							이상일 때
						</div>
					</Block>
					<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
						<div className="flex items-center gap-4">
							<Block.dropdown
								placeholder="단위"
								items={[
									{
										category: '',
										options: [
											{ label: '일봉', value: '일봉' },
											{ label: '주봉', value: '주봉' },
											{ label: '월봉', value: '월봉' },
											{ label: '년봉', value: '년봉' },
										],
									},
								]}
							/>
							RSI가
							<Block.dropdown
								placeholder="수치"
								items={[
									{
										category: '',
										options: [
											{ label: '100', value: '100' },
											{ label: '200', value: '200' },
											{ label: '300', value: '300' },
											{ label: '400', value: '400' },
											{ label: '500', value: '500' },
										],
									},
								]}
							/>
							이상일 때
						</div>
					</Block>
					<Block className="p-4 border-2 border-custom-gray-border rounded-lg bg-custom-gray-bg">
						<div className="flex items-center gap-4">
							<Block.dropdown
								placeholder="단위"
								items={[
									{
										category: '',
										options: [
											{ label: '일봉', value: '일봉' },
											{ label: '주봉', value: '주봉' },
											{ label: '월봉', value: '월봉' },
											{ label: '년봉', value: '년봉' },
										],
									},
								]}
							/>
							RSI가
							<Block.dropdown
								placeholder="수치"
								items={[
									{
										category: '',
										options: [
											{ label: '100', value: '100' },
											{ label: '200', value: '200' },
											{ label: '300', value: '300' },
											{ label: '400', value: '400' },
											{ label: '500', value: '500' },
										],
									},
								]}
							/>
							이상일 때
						</div>
					</Block>
				</Buy>
			</div>
		</div>
	);
};

export default StrategyConfigurationClient;
