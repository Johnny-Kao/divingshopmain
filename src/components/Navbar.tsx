'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { classNames } from '@/lib/utils';
import Image from 'next/image';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const pathname = usePathname();

  const menuItems = [
    { name: '潛水店列表', href: '/', disabled: false },
    { name: '我的收藏', href: '#', disabled: true },
    { name: '我的評論', href: '#', disabled: true },
    { name: '登入/註冊', href: '#', disabled: true },
  ];

  const scrollToFeedback = () => {
    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
      feedbackElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">DiveShopFinder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  pathname === item.href && !item.disabled
                    ? 'border-blue-500 text-gray-900' 
                    : item.disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                title={item.disabled ? '即將推出' : ''}
              >
                {item.name}
                {item.disabled && (
                  <span className="ml-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                    即將推出
                  </span>
                )}
              </a>
            ))}
          </div>
          
          {/* 右側選項 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/contact'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              聯繫我們
            </Link>
            <a
              href="https://github.com/sponsors/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
            >
              贊助支持
            </a>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}
              className="form-select text-sm rounded-md border-gray-200 text-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all cursor-pointer"
            >
              <option value="zh">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打開選單</span>
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white border-t border-gray-200 pt-2 pb-3">
            <div className="space-y-1 px-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href && !item.disabled
                      ? 'bg-blue-50 text-blue-700' 
                      : item.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                  title={item.disabled ? '即將推出' : ''}
                >
                  {item.name}
                  {item.disabled && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
                      即將推出
                    </span>
                  )}
                </a>
              ))}
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/contact'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                聯繫我們
              </Link>
              <a
                href="https://github.com/sponsors/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                贊助支持
              </a>
            </div>
            <div className="px-3 py-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}
                className="w-full form-select text-base rounded-md border-gray-200 text-gray-600"
              >
                <option value="zh">繁體中文</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 