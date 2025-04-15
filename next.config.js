/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 啟用靜態導出
  images: {
    unoptimized: true, // Cloudflare Pages 需要此設置
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  // 確保應用可以作為靜態網站運行
  trailingSlash: true,
}

module.exports = nextConfig 