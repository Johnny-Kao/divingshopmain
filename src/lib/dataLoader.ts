import { DiveShop, FilterState } from './types';

export async function loadDiveShops(): Promise<DiveShop[]> {
  try {
    const response = await fetch('/data/dive_shops.json');
    const data = await response.json();
    return Array.isArray(data.dive_shops) ? data.dive_shops : [];
  } catch (error) {
    console.error('Error loading dive shops:', error);
    return [];
  }
}

export function filterDiveShops(
  diveShops: DiveShop[],
  filters: FilterState
): DiveShop[] {
  if (!Array.isArray(diveShops)) {
    console.error('diveShops is not an array:', diveShops);
    return [];
  }

  return diveShops
    .filter((shop) => {
      // 搜索查询
      if (
        filters.searchQuery &&
        !shop.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 认证系统
      if (
        filters.selectedCertifications.length > 0 &&
        !filters.selectedCertifications.some((cert) =>
          shop.certifications.includes(cert)
        )
      ) {
        return false;
      }

      // 国家/地区
      if (
        filters.selectedCountries.length > 0 &&
        !filters.selectedCountries.includes(shop.country)
      ) {
        return false;
      }

      // 五星店铺
      if (filters.fiveStarOnly && !shop.is_five_star) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'highest-rated':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'distance':
          // 简单的按国家排序，实际项目中可能需要更复杂的距离计算
          return a.country.localeCompare(b.country);
        case 'popular':
          return b.review_count - a.review_count;
        case 'a-z':
        default:
          return a.name.localeCompare(b.name);
      }
    });
} 