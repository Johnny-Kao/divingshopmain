import React, { useState } from 'react';
import Image from 'next/image';
import { COUNTRY_MAPPING } from '@/lib/types';

interface DiveCenterCardProps {
  title: string;
  city: string;
  country: string;
  system: string;
  activities?: string[];
  languages?: string[];
  membershipLevel: string;
  url: string;
  email: string;
  tags: string[];
  is_five_star: boolean;
  review_count?: number;
}

const DiveCenterCard: React.FC<DiveCenterCardProps> = ({
  title,
  city,
  country,
  system,
  activities = [],
  languages = [],
  membershipLevel,
  url,
  email,
  tags = [],
  is_five_star,
  review_count = 0
}) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  // 獲取國家代碼
  const countryCode = COUNTRY_MAPPING[country]?.code?.toLowerCase() || '';

  // 格式化標籤文字
  const formatTag = (tag: string) => {
    return tag
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 合併並格式化所有標籤
  const allTags = [...activities, ...tags].map(formatTag);
  const displayTags = showAllTags ? allTags : allTags.slice(0, 6);
  const hasMoreTags = allTags.length > 6;

  // 國旗映射
  const countryFlags: { [key: string]: string } = {
    'can': 'ca',
    'chn': 'cn',
    'mys': 'my',
    'tha': 'th',
    'jpn': 'jp',
    'rus': 'ru',
    'aus': 'au',
    'usa': 'us',
    'gbr': 'gb',
  };

  const flagCode = countryFlags[countryCode] || countryCode;

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      {/* 五星標籤 */}
      <div className="absolute top-4 right-4">
        {is_five_star && (
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
            五星
          </span>
        )}
      </div>

      {/* 主要內容 */}
      <div className="p-6">
        {/* 標題和位置 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {flagCode && (
              <span className="mr-2">
                <Image 
                  src={`https://flagcdn.com/w20/${flagCode}.png`}
                  alt={country} 
                  width={20} 
                  height={15} 
                  className="inline-block rounded-sm" 
                />
              </span>
            )}
            <span>{city}, {country}</span>
          </div>
        </div>

        {/* 認證系統 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {system.split(',').map((cert) => (
            <span key={cert.trim()} className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
              {cert.trim()}
            </span>
          ))}
        </div>

        {/* 語言支援 */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <div className="flex flex-wrap gap-2">
              {languages && languages.length > 0 ? (
                languages.map((lang) => (
                  <span 
                    key={lang} 
                    className="bg-yellow-50 text-yellow-600 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {lang}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No Information</span>
              )}
            </div>
          </div>
        </div>

        {/* 活動和標籤 */}
        <div className="mb-4">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <div className="relative flex-1">
              {allTags.length > 0 ? (
                <div className="relative">
                  <div className="flex flex-wrap gap-2 line-clamp-2 max-h-[4.5rem] overflow-hidden">
                    {displayTags.map((item, index) => (
                      <span 
                        key={index}
                        className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {hasMoreTags && !showAllTags && (
                    <button
                      onClick={() => setShowAllTags(true)}
                      className="absolute right-0 bottom-0 bg-white pl-2 text-blue-600 text-xs font-medium hover:text-blue-700"
                    >
                      +{allTags.length - 6} 更多
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-500 text-sm">No Information</span>
              )}
              {showAllTags && hasMoreTags && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                  <div className="relative bg-white rounded-lg shadow-lg p-6 m-4 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((item, index) => (
                        <span 
                          key={index}
                          className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAllTags(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部操作欄 */}
        <div className="flex items-center justify-between py-2 px-4 bg-gray-50 -mx-6 -mb-6">
          {/* 評分和評論 */}
          <div className="flex items-center text-gray-400">
            <span>★★★★★</span>
            <span className="ml-2">({review_count} 則評論)</span>
          </div>
          
          {/* 操作按鈕 */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-red-500 transition-colors" title="收藏">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-500 transition-colors"
              title="訪問網站"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
            <a 
              href={`mailto:${email}`} 
              className="text-gray-400 hover:text-blue-500 transition-colors"
              title="發送郵件"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiveCenterCard; 