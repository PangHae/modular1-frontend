'use client';

import Block from '@/components/common/Block';
import SidePalette from '@/components/common/SidePalette/SidePalette';

const CreateStrategyClient = () => {
	return (
		<div className="flex flex-1 gap-4 p-4">
			<SidePalette />
			<div className="flex gap-4 flex-1 bg-white rounded-[8px] border border-custom-gray-border/40 p-4">
				<Block className="flex-1 gap-2 p-4 border-2 border-shinhan-blue rounded-lg bg-shinhan-blue/10">
					<div className="flex items-center gap-2">
						<Block.title className="text-shinhan-blue!">매도</Block.title>
						<Block.input
							className="w-[200px] bg-white! focus-visible:border-shinhan-blue"
							placeholder="몇 주를 매도할까요?"
							value=""
							onChange={() => {}}
						/>
					</div>

					<Block className="gap-2 border-2 border-purple-500 bg-purple-500/10 rounded-lg p-4">
						<Block.title className="text-purple-500!">
							만약 이 조건들을 모두 만족한다면
						</Block.title>
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
					</Block>
					<Block className="gap-2 border-2 border-purple-500 bg-purple-500/10 rounded-lg p-4">
						<Block.title className="text-purple-500!">
							만약 이 조건 중 하나라도 만족한다면
						</Block.title>

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
					</Block>
				</Block>
				<Block className="flex-1 gap-2 p-4 border-2 border-red-500 rounded-lg bg-red-500/10">
					<Block.title className="text-red-500!">매수</Block.title>
					<div className="flex w-full items-center gap-4">
						몇 주를 매수할까요?
						<Block.input placeholder="몇 주" value="" onChange={() => {}} />
					</div>
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
				</Block>
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
