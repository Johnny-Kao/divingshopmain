import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DiveShopFinder - 全球潜水店推荐平台',
  description: '发现全球最佳潜水店，查看认证信息，浏览用户评价，开启您的潜水之旅。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 