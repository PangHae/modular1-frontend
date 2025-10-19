export const TEMPLATE_CONDITION_MAP = {
	bollinger_band_breakout_buy: {
		name: '볼린저밴드 상단선 돌파 매수',
		description: '볼린저 밴드 상단선 돌파 시 매수합니다.',
	},
	bollinger_band_breakout_sell: {
		name: '볼린저밴드 하단선 돌파 매도',
		description: '볼린저 밴드 하단선 돌파 시 매도합니다.',
	},
	ema_golden_cross_buy: {
		name: 'EMA 골든 크로스 매수',
		description: 'EMA20과 EMA60이 데스 크로스일 시 매수합니다.',
	},
	ema_death_cross_sell: {
		name: 'EMA 데스 크로스 매도',
		description: 'EMA20과 EMA60이 데스 크로스일 시 매도합니다.',
	},
	ma_support_resistance_break_buy: {
		name: '이동평균선 돌파 매수',
		description: '일봉 기준 종가가 EMA50 상향 돌파 시 매수합니다.',
	},
	ma_support_resistance_break_sell: {
		name: '이동평균선 돌파 매도',
		description: '일봉 기준 종가가 EMA50 하향 이탈 시 매도합니다.',
	},
	rsi_overbought_reversal_sell: {
		name: 'RSI 과매수 회복 매도',
		description: 'RSI 70 하향 이탈 시 매도합니다.',
	},
	rsi_oversold_reversal_buy: {
		name: 'RSI 과매도 회복 매수',
		description: 'RSI 30 상향 돌파 시 매수합니다.',
	},
	vwap_breakdown_sell: {
		name: 'VWAP 돌파 매도',
		description: '15분봉 기준 종가가 VWAP 하향 이탈 시 매도합니다.',
	},
	vwap_breakout_buy: {
		name: 'VWAP 돌파 매수',
		description: '15분봉 기준 종가가 VWAP 상향 돌파 시 매수합니다.',
	},
};
