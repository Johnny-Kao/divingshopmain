'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FilterState, CERTIFICATIONS, COUNTRIES, SORT_OPTIONS, COUNTRY_MAPPING } from '@/lib/types';
import { ChevronDownIcon, XCircleIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Option {
  value: string;
  label: string;
  englishName?: string; // 英文國家名稱
}

interface SearchFilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ filters, onFiltersChange }) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    certifications: false,
    countries: false,
    rating: false,
  });
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  // 添加狀態控制篩選欄在手機上的顯示
  const [showMobileFilters, setShowMobileFilters] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchBarRef = useRef<HTMLDivElement>(null);

  // 添加檢測視窗大小的狀態
  const [isMobile, setIsMobile] = useState(false);
  
  // 在客戶端設置視窗大小狀態
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 初始狀態設置
    setSearchQuery(filters.searchQuery);
    
    // 設置預設的認證系統
    if (filters.selectedCertifications.length === 0) {
      onFiltersChange({
        ...filters,
        selectedCertifications: ['PADI', 'SSI'],
      });
    }
  }, [filters.searchQuery]);

  useEffect(() => {
    // 清理所有的超時
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // 添加滾動事件監聽
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.innerWidth < 768) { // 只有在手機尺寸下才處理
        const currentScrollY = window.scrollY;
        
        // 當從頂部開始向下滾動時
        if (lastScrollY <= 0 && currentScrollY > 0) {
          setShowMobileFilters(false);
        }
        
        // 當滾動到頂部時
        if (currentScrollY === 0) {
          setShowMobileFilters(true);
        }
        
        if (currentScrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchBarClick = () => {
    if (isMobile) {
      setShowMobileFilters(true);
    }
  };

  const handleMouseEnter = (filterType: string) => {
    if (timeoutRefs.current[filterType]) {
      clearTimeout(timeoutRefs.current[filterType]);
    }
  };

  const handleMouseLeave = (filterType: string) => {
    timeoutRefs.current[filterType] = setTimeout(() => {
      setIsOpen(prev => ({
        ...prev,
        [filterType]: false
      }));
    }, 500);
  };

  const handleOpenToggle = (filterType: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFiltersChange({
      ...filters,
      searchQuery: value,
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'certifications') {
      const updatedCertifications = filters.selectedCertifications.includes(value)
        ? filters.selectedCertifications.filter((cert) => cert !== value)
        : [...filters.selectedCertifications, value];

      onFiltersChange({
        ...filters,
        selectedCertifications: updatedCertifications,
      });
    } else if (filterType === 'countries') {
      const updatedCountries = filters.selectedCountries.includes(value)
        ? filters.selectedCountries.filter((country) => country !== value)
        : [...filters.selectedCountries, value];

      onFiltersChange({
        ...filters,
        selectedCountries: updatedCountries,
      });
    } else if (filterType === 'sortBy') {
      onFiltersChange({
        ...filters,
        sortBy: value,
      });
    } else if (filterType === 'ratingFilter') {
      onFiltersChange({
        ...filters,
        ratingFilter: value,
      });
    }
  };

  const handleFiveStarOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      fiveStarOnly: e.target.checked,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      selectedCertifications: [],
      selectedCountries: [],
      ratingFilter: '',
      fiveStarOnly: false,
      sortBy: 'a-z',
    });
    setSearchQuery('');
  };

  // 生成認證系統選項
  const certificationOptions: Option[] = CERTIFICATIONS.map((cert) => ({
    value: cert,
    label: cert,
  }));

  // 過濾國家列表
  const getFilteredCountries = () => {
    if (!countrySearchQuery.trim()) {
      return COUNTRIES;
    }
    
    const searchLower = countrySearchQuery.toLowerCase();
    const filteredCountries: Record<string, string[]> = {};
    
    Object.entries(COUNTRIES).forEach(([region, countries]) => {
      const filteredRegionCountries = countries.filter(country => {
        // 檢查中文名稱
        if (country.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // 檢查英文名稱
        const englishName = COUNTRY_MAPPING[country]?.english || '';
        return englishName.toLowerCase().includes(searchLower);
      });
      
      if (filteredRegionCountries.length > 0) {
        filteredCountries[region] = filteredRegionCountries;
      }
    });
    
    return filteredCountries;
  };

  // 取得已選篩選條件
  const getSelectedFilters = () => {
    const selectedFilters: JSX.Element[] = [];
    
    // 加入認證系統
    filters.selectedCertifications.forEach(cert => {
      selectedFilters.push(
        <span key={`cert-${cert}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-700 text-white mr-1 mb-1">
          {cert}
          <XMarkIcon 
            className="ml-1 h-3 w-3 cursor-pointer" 
            onClick={() => handleFilterChange('certifications', cert)}
          />
        </span>
      );
    });
    
    // 加入國家
    filters.selectedCountries.forEach(country => {
      selectedFilters.push(
        <span key={`country-${country}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-700 text-white mr-1 mb-1">
          {country}
          <XMarkIcon 
            className="ml-1 h-3 w-3 cursor-pointer" 
            onClick={() => handleFilterChange('countries', country)}
          />
        </span>
      );
    });
    
    return selectedFilters;
  };

  const toggleMobileFilters = () => {
    // 直接切換篩選選項顯示狀態，無論在什麼位置
    setShowMobileFilters(prev => !prev);
  };

  // 修復頁面中間點擊篩選下拉按鈕時的問題
  useEffect(() => {
    // 確保按鈕點擊後，始終能正確切換篩選項目顯示狀態
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('[data-filter-toggle]');
      if (button) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileFilters();
      }
    };

    document.addEventListener('click', handleButtonClick, true);
    return () => document.removeEventListener('click', handleButtonClick, true);
  }, []);

  return (
    <div ref={searchBarRef} className={`${isMobile ? 'sticky top-16' : ''} z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-lg shadow-md mb-6 max-w-7xl mx-auto transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* 搜索輸入框 */}
        <div className="relative flex-grow" onClick={handleSearchBarClick}>
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="搜索潛水店..."
            className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 已選篩選條件顯示區，僅在手機版且已滾動時顯示 */}
        <div className={`md:hidden flex flex-wrap ${showMobileFilters ? 'hidden' : 'flex'}`}>
          {getSelectedFilters()}
        </div>

        {/* 手機版下拉按鈕 */}
        <div className="md:hidden flex justify-center mt-2 relative">
          <div className="absolute w-full border-t border-white/20 top-1/2 transform -translate-y-1/2"></div>
          <button 
            onClick={toggleMobileFilters}
            data-filter-toggle="true"
            className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
            aria-label={showMobileFilters ? "收起篩選選項" : "展開篩選選項"}
          >
            <ChevronDownIcon 
              className={`h-5 w-5 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* 僅在手機版和未滾動或點擊搜索欄時顯示 */}
        <div className={`flex flex-col md:flex-row gap-4 ${isMobile && !showMobileFilters ? 'hidden' : 'flex'}`}>
          {/* 認證系統篩選 */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('certifications')}
            onMouseLeave={() => handleMouseLeave('certifications')}
            ref={(el) => { dropdownRefs.current['certifications'] = el; }}
          >
            <button
              onClick={() => handleOpenToggle('certifications')}
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
              aria-label="選擇認證系統"
            >
              <span>認證系統</span>
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {isOpen.certifications && (
              <div className="absolute mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                {certificationOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterChange('certifications', option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={filters.selectedCertifications.includes(option.value)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 國家/地區篩選 */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('countries')}
            onMouseLeave={() => handleMouseLeave('countries')}
            ref={(el) => { dropdownRefs.current['countries'] = el; }}
          >
            <button
              onClick={() => handleOpenToggle('countries')}
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
              aria-label="選擇國家/地區"
            >
              <span className="truncate mr-2">
                {filters.selectedCountries.length > 0 
                  ? (filters.selectedCountries.length > 1 
                      ? `${filters.selectedCountries[0]} +${filters.selectedCountries.length - 1}` 
                      : filters.selectedCountries[0]) 
                  : '全部國家'}
              </span>
              <ChevronDownIcon className="h-5 w-5 flex-shrink-0" />
            </button>
            {isOpen.countries && (
              <div className="absolute mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-30 max-h-96 overflow-y-auto">
                {/* 搜索國家輸入框 */}
                <div className="sticky top-0 bg-white p-2 border-b">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="搜索國家..."
                      className="w-full pl-8 pr-2 py-1 text-sm border rounded"
                      value={countrySearchQuery}
                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* 國家選項 */}
                <div>
                  {Object.entries(getFilteredCountries()).map(([region, countries]) => (
                    <div key={region}>
                      <div className="px-4 py-2 font-medium bg-gray-50">{region}</div>
                      {countries.map((country) => (
                        <div
                          key={country}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleFilterChange('countries', country)}
                        >
                          {COUNTRY_MAPPING[country] && COUNTRY_MAPPING[country].code && (
                            <div className="mr-2 w-5 h-4 relative flex-shrink-0">
                              <Image
                                src={`/flags/${COUNTRY_MAPPING[country].code}.svg`}
                                alt={country}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-sm border border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <input
                            type="checkbox"
                            checked={filters.selectedCountries.includes(country)}
                            onChange={() => {}}
                            className="mr-2"
                          />
                          <span>{country}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 評分篩選 */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('rating')}
            onMouseLeave={() => handleMouseLeave('rating')}
            ref={(el) => { dropdownRefs.current['rating'] = el; }}
          >
            <button
              onClick={() => handleOpenToggle('rating')}
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
              aria-label="選擇排序方式"
            >
              <span>
                {filters.sortBy === 'a-z' 
                  ? `${SORT_OPTIONS['a-z']}` 
                  : (filters.sortBy === 'z-a' 
                    ? `${SORT_OPTIONS['z-a']}` 
                    : '評分')}
              </span>
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {isOpen.rating && (
              <div className="absolute mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                <div
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterChange('sortBy', 'a-z')}
                >
                  <input
                    type="radio"
                    checked={filters.sortBy === 'a-z'}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{SORT_OPTIONS['a-z']}</span>
                </div>
                <div
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterChange('sortBy', 'z-a')}
                >
                  <input
                    type="radio"
                    checked={filters.sortBy === 'z-a'}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span>{SORT_OPTIONS['z-a']}</span>
                </div>
                <div
                  className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
                  title="評分功能即將推出"
                >
                  <input
                    type="radio"
                    disabled
                    checked={filters.sortBy === 'highest-rated'}
                    onChange={() => {}}
                    className="mr-2 cursor-not-allowed"
                  />
                  <span>最高評分</span>
                </div>
                <div
                  className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
                  title="評分功能即將推出"
                >
                  <input
                    type="radio"
                    disabled
                    checked={filters.sortBy === 'popular'}
                    onChange={() => {}}
                    className="mr-2 cursor-not-allowed"
                  />
                  <span>最多評論</span>
                </div>
              </div>
            )}
          </div>

          {/* 僅顯示五星店鋪 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fiveStarOnly"
              checked={filters.fiveStarOnly}
              onChange={handleFiveStarOnlyChange}
              className="mr-2"
            />
            <label htmlFor="fiveStarOnly" className="text-sm">僅顯示五星店鋪</label>
          </div>
        </div>
      </div>

      {/* 已選條件顯示和清除按鈕，在手機版滾動時隱藏 */}
      <div className={`mt-4 ${isMobile && !showMobileFilters ? 'hidden' : 'block'}`}>
        {/* 顯示已選的認證系統 */}
        <div className="flex flex-wrap mb-2">
          {filters.selectedCertifications.map((cert) => (
            <span key={cert} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-700 text-white mr-1 mb-1">
              {cert}
              <XMarkIcon 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('certifications', cert)}
              />
            </span>
          ))}
        </div>

        {/* 顯示已選的國家/地區 */}
        <div className="flex flex-wrap">
          {filters.selectedCountries && filters.selectedCountries.length > 0 && filters.selectedCountries.map((country) => (
            <span key={country} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-700 text-white mr-1 mb-1">
              {COUNTRY_MAPPING[country] && COUNTRY_MAPPING[country].code && (
                <Image 
                  src={`/flags/${COUNTRY_MAPPING[country].code}.svg`} 
                  alt={country} 
                  width={16} 
                  height={12} 
                  className="mr-1 rounded-sm border border-gray-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              {country}
              <XMarkIcon 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('countries', country)}
              />
            </span>
          ))}
        </div>

        {/* 清除篩選按鈕 */}
        <button
          onClick={handleClearFilters}
          className="flex items-center mt-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
        >
          <XCircleIcon className="h-4 w-4 mr-1" />
          清除篩選
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar; 