import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.tossinvest.com',
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/v1/auth/:path*',
				destination: `${process.env.AUTH_SERVICE_URL}/api/v1/auth/:path*`,
			},

			{
				source: '/api/v1/strategies/:path*',
				destination: `${process.env.STRATEGIES_SERVICE_URL}/api/v1/strategies/:path*`,
			},
			{
				source: '/api/v1/trade/:path*',
				destination: `${process.env.TRADING_SERVICE_URL}/api/v1/trade/:path*`,
			},
			{
				source: '/api/v1/accounts/:path*',
				destination: `${process.env.STRATEGIES_SERVICE_URL}/api/v1/accounts/:path*`,
			},
		];
	},
};

export default nextConfig;
