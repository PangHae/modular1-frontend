'use client';

import Block from '@/components/common/Blocks';
import All from '@/components/common/Blocks/logical/All';
import Any from '@/components/common/Blocks/logical/Any';
import Buy from '@/components/common/Blocks/trade/Buy';
import Sell from '@/components/common/Blocks/trade/Sell';
import SidePalette from '@/components/common/SidePalette/SidePalette';

const CreateStrategyClient = () => {
	return (
		<div className="flex flex-1 gap-4 p-4">
			<SidePalette />
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

export default CreateStrategyClient;

// [
// 	{
// 		category: '원클릭 템플릿',
// 		options: [
// 			{ label: '원클릭 템플릿 1', value: '원클릭 템플릿 1' },
// 			{ label: '원클릭 템플릿 2', value: '원클릭 템플릿 2' },
// 			{ label: '원클릭 템플릿 3', value: '원클릭 템플릿 3' },
// 			{ label: '원클릭 템플릿 4', value: '원클릭 템플릿 4' },
// 			{ label: '원클릭 템플릿 5', value: '원클릭 템플릿 5' },
// 		],
// 	},
// 	{
// 		category: '지표 블록',
// 		options: [
// 			{ label: '지표 블록 1', value: '지표 블록 1' },
// 			{ label: '지표 블록 2', value: '지표 블록 2' },
// 		],
// 	},
// ]
