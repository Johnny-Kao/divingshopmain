'use client';

import React from 'react';
import { DiveShop } from '@/lib/types';
import DiveCenterCard from './DiveCenterCard';

interface DiveShopListProps {
  diveShops: DiveShop[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const DiveShopList: React.FC<DiveShopListProps> = ({ diveShops, currentPage, onPageChange }) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(diveShops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDiveShops = diveShops.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!Array.isArray(diveShops) || !diveShops.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 text-lg">暫無符合條件的潛水店</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            重新加載
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* 結果數量顯示 */}
      <div className="mb-4 text-sm text-gray-600">
        顯示 {startIndex + 1}–{Math.min(endIndex, diveShops.length)} 條，共 {diveShops.length} 條結果
      </div>

      {/* 潛水店列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDiveShops.map((shop) => (
          <DiveCenterCard
            key={shop.id}
            title={shop.name}
            city={shop.city}
            country={shop.country}
            system={shop.certifications.join(', ')}
            activities={shop.activities || []}
            languages={shop.languages || []}
            membershipLevel={shop.is_five_star ? 'PADI 5 Star IDC Resort' : 'PADI Dive Center'}
            background={typeof shop.background === 'object' ? shop.background['800x800'] : undefined}
            openHour={shop.openHour || '09:00 - 18:00'}
            url={shop.website}
            email={shop.email}
            tags={shop.tags || []}
            is_five_star={shop.is_five_star}
            review_count={shop.review_count}
          />
        ))}
      </div>

      {/* 分頁控制 */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* 回到頂部按鈕 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default DiveShopList; 