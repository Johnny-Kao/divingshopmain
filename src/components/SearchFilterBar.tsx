import React, { useState } from 'react';
import Image from 'next/image';
import { COUNTRY_MAPPING } from '@/lib/types';

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCertifications: string[];
  setSelectedCertifications: (certs: string[]) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  showFiveStarOnly: boolean;
  setShowFiveStarOnly: (show: boolean) => void;
  onClearFilters: () => void;
}

const CERTIFICATIONS = ['PADI', 'SSI', 'SDI', 'TDI'];
const SORT_OPTIONS = [
  { value: 'name_asc', label: '名稱 A-Z' },
  { value: 'name_desc', label: '名稱 Z-A' },
  { value: 'rating', label: '最高評分' },
  { value: 'reviews', label: '最多評論' },
];

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCertifications,
  setSelectedCertifications,
  selectedCountries,
  setSelectedCountries,
  sortOption,
  setSortOption,
  showFiveStarOnly,
  setShowFiveStarOnly,
  onClearFilters,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');

  const filteredCountries = Object.entries(COUNTRY_MAPPING)
    .filter(([name]) => 
      name.toLowerCase().includes(countrySearchTerm.toLowerCase())
    )
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="bg-blue-600 p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索潛水店..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* 認證系統下拉選單 */}
          <div className="relative">
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2"
            >
              認證系統
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
              {CERTIFICATIONS.map((cert) => (
                <label key={cert} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCertifications.includes(cert)}
                    onChange={() => {
                      if (selectedCertifications.includes(cert)) {
                        setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
                      } else {
                        setSelectedCertifications([...selectedCertifications, cert]);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 全部國家下拉選單 */}
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2"
            >
              全部國家
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCountryDropdownOpen && (
              <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg max-h-[300px] overflow-y-auto min-w-[200px]">
                <div className="p-2 border-b">
                  <input
                    type="text"
                    placeholder="搜索國家..."
                    value={countrySearchTerm}
                    onChange={(e) => setCountrySearchTerm(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border rounded"
                  />
                </div>
                <div className="p-2">
                  {filteredCountries.map(([country, { code }]) => (
                    <label key={country} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => {
                          if (selectedCountries.includes(country)) {
                            setSelectedCountries(selectedCountries.filter(c => c !== country));
                          } else {
                            setSelectedCountries([...selectedCountries, country]);
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 flex items-center">
                        <Image
                          src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                          alt={country}
                          width={20}
                          height={15}
                          className="mr-2 rounded-sm"
                        />
                        {country}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 名稱 A-Z 下拉選單 */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* 僅顯示五星店鋪 */}
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={showFiveStarOnly}
              onChange={(e) => setShowFiveStarOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            僅顯示五星店鋪
          </label>
        </div>

        {/* 已選擇的過濾標籤 */}
        <div className="flex flex-wrap gap-2">
          {selectedCertifications.map((cert) => (
            <div key={cert} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1">
              {cert}
              <button
                onClick={() => setSelectedCertifications(selectedCertifications.filter(c => c !== cert))}
                className="text-blue-400 hover:text-blue-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {selectedCountries.map((country) => (
            <div key={country} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1">
              <Image
                src={`https://flagcdn.com/w20/${COUNTRY_MAPPING[country].code.toLowerCase()}.png`}
                alt={country}
                width={20}
                height={15}
                className="rounded-sm"
              />
              {country}
              <button
                onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== country))}
                className="text-blue-400 hover:text-blue-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {(selectedCertifications.length > 0 || selectedCountries.length > 0 || showFiveStarOnly) && (
            <button
              onClick={onClearFilters}
              className="px-3 py-1 text-sm text-white hover:text-blue-100"
            >
              清除篩選
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar; 