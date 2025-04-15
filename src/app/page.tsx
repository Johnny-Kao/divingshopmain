'use client';

import { useState, useEffect } from 'react';
import { DiveShop } from '@/lib/types';
import Navbar from '@/components/Navbar';
import SearchFilterBar from '@/components/SearchFilterBar';
import DiveShopList from '@/components/DiveShopList';

// 定義篩選狀態類型
type FilterState = {
  searchQuery: string;
  selectedCertifications: string[];
  selectedCountries: string[];
  ratingFilter: string;
  fiveStarOnly: boolean;
  sortBy: string;
};

export default function Home() {
  // 狀態管理
  const [diveShops, setDiveShops] = useState<DiveShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCertifications: [],
    selectedCountries: [],
    ratingFilter: 'all',
    fiveStarOnly: false,
    sortBy: 'a-z',
  });
  const [filteredShops, setFilteredShops] = useState<DiveShop[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 加載數據
  useEffect(() => {
    async function loadDiveShops() {
      try {
        setLoading(true);
        const response = await fetch('/data/dive_shops.json');
        if (!response.ok) {
          throw new Error('無法獲取潛水店數據');
        }
        const data = await response.json();
        setDiveShops(data.dive_shops || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '發生未知錯誤');
        setLoading(false);
      }
    }

    loadDiveShops();
  }, []);

  // 監控滾動事件，控制回到頂部按鈕的顯示
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 應用篩選器
  useEffect(() => {
    if (!diveShops.length) return;

    let results = [...diveShops];

    // 按搜索關鍵詞篩選
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      results = results.filter(shop => 
        shop.name.toLowerCase().includes(searchLower) || 
        shop.city.toLowerCase().includes(searchLower) ||
        shop.country.toLowerCase().includes(searchLower)
      );
    }

    // 按認證系統篩選
    if (filters.selectedCertifications.length) {
      results = results.filter(shop => 
        filters.selectedCertifications.some(cert => 
          shop.certifications.includes(cert)
        )
      );
    }

    // 按國家/地區篩選
    if (filters.selectedCountries.length) {
      results = results.filter(shop => 
        filters.selectedCountries.includes(shop.country)
      );
    }

    // 按五星店鋪篩選
    if (filters.fiveStarOnly) {
      results = results.filter(shop => shop.is_five_star);
    }

    // 按照選定的方式排序
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'a-z':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'z-a':
          results.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'highest-rated':
          // 這將在評分功能實現後添加
          break;
        case 'popular':
          // 這將在熱門度功能實現後添加
          break;
        case 'distance':
          // 這將在距離計算功能實現後添加
          break;
        default:
          results.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    // 贊助優先排序：ad_priority 值越高的排越前面
    results.sort((a, b) => (b.ad_priority || 0) - (a.ad_priority || 0));

    setFilteredShops(results);
  }, [diveShops, filters]);

  // 處理篩選變更
  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  // 回到頂部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 渲染加載中狀態
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // 渲染錯誤狀態
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 max-w-7xl mx-auto">
        {/* 標題資訊列 */}
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="text-xs text-gray-500 flex justify-between items-center">
            <span>Last updated: 2025-04-01</span>
            <span>Sources: PADI, SSI</span>
          </div>
        </div>
        
        <SearchFilterBar 
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <DiveShopList diveShops={filteredShops} />
      </main>
      
      {/* 回到頂部按鈕 */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="回到頂部"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
} 