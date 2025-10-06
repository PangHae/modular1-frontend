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
				source: '/api/v1/:path*',
				destination: `${process.env.API_SERVICE_URL}/api/v1/:path*`,
			},
		];
	},
};

export default nextConfig;
