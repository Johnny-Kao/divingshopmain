'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DiveShop } from '@/lib/types';
import { loadDiveShops } from '@/lib/dataLoader';
import DiveShopList from '@/components/DiveShopList';
import SearchFilterBar from '@/components/SearchFilterBar';

export default function Home() {
  const [diveShops, setDiveShops] = useState<DiveShop[]>([]);
  const [filteredShops, setFilteredShops] = useState<DiveShop[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>(['PADI', 'SSI']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('name_asc');
  const [showFiveStarOnly, setShowFiveStarOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadDiveShops();
        setDiveShops(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dive shops:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...diveShops];

    // 搜索過濾
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(shop => 
        shop.name.toLowerCase().includes(searchLower) ||
        shop.city.toLowerCase().includes(searchLower) ||
        shop.country.toLowerCase().includes(searchLower)
      );
    }

    // 認證系統過濾
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter(shop => 
        selectedCertifications.some(cert => shop.certifications.includes(cert))
      );
    }

    // 國家過濾
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(shop => 
        selectedCountries.includes(shop.country)
      );
    }

    // 五星店鋪過濾
    if (showFiveStarOnly) {
      filtered = filtered.filter(shop => shop.tags.includes('five_star'));
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'reviews':
          return (b.review_count || 0) - (a.review_count || 0);
        default:
          return 0;
      }
    });

    setFilteredShops(filtered);
    setCurrentPage(1);
  }, [diveShops, searchTerm, selectedCertifications, selectedCountries, sortOption, showFiveStarOnly]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCertifications(['PADI', 'SSI']);
    setSelectedCountries([]);
    setSortOption('name_asc');
    setShowFiveStarOnly(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* 導航列 */}
      <header className="bg-white border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="DiveShopFinder" width={32} height={32} />
              <span className="text-xl font-bold">DiveShopFinder</span>
            </Link>

            {/* 主導航 */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-blue-600 border-b-2 border-blue-600 py-5">
                潛水店列表
              </Link>
              <Link href="/favorites" className="text-gray-600 hover:text-gray-900 py-5">
                我的收藏
              </Link>
              <Link href="/reviews" className="text-gray-600 hover:text-gray-900 py-5">
                我的評論
              </Link>
            </div>
          </div>

          {/* 右側按鈕 */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              聯繫我們
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              贊助支持
            </Link>
            <button className="text-gray-600 hover:text-gray-900">
              繁體中文
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">潛水中心列表</h1>
          <div className="text-sm text-gray-500">
            Last Update: 2025-04-18 | Sources: PADI, SSI, SDI, TDI
          </div>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCertifications={selectedCertifications}
          setSelectedCertifications={setSelectedCertifications}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          sortOption={sortOption}
          setSortOption={setSortOption}
          showFiveStarOnly={showFiveStarOnly}
          setShowFiveStarOnly={setShowFiveStarOnly}
          onClearFilters={handleClearFilters}
        />

        <DiveShopList
          diveShops={filteredShops}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
} 