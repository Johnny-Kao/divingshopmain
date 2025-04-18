import { DiveShop, FilterState } from './types';

export async function loadDiveShops(): Promise<DiveShop[]> {
  try {
    console.log('開始加載潛水店數據...');
    // 嘗試加載主數據文件
    const response = await fetch('/data/DiveShopFullList_2025-04-18.json');
    console.log('數據加載響應狀態:', response.status);
    
    if (!response.ok) {
      throw new Error('無法獲取潛水店數據');
    }
    
    const data = await response.json();
    console.log('成功解析數據，數據長度:', Array.isArray(data) ? data.length : 0);
    
    if (!Array.isArray(data)) {
      console.error('數據格式不正確，預期是數組:', data);
      return [];
    }
    
    // 將數據轉換為 DiveShop 格式
    const diveShops: DiveShop[] = data.map(item => {
      // 處理背景圖片 - 使用字符串而不是對象
      const defaultBackground = '/images/dive-shop-placeholder.jpg';
      const backgroundImage = item.background?.['800x800'] || defaultBackground;

      return {
        id: String(item.id),
        name: item.title,
        country: item.country,
        city: item.city,
        certifications: [item.system],
        rating: item.average_rating,
        is_five_star: item.membershipLevel?.toLowerCase().includes('5 star') || false,
        tags: item.tags || [],
        website: item.website || item.url || '#',
        instagram: '',  // 暫時沒有這個字段
        email: item.email || '',
        ad_priority: item.ad_priority || 0,
        recommended_tags: [],  // 暫時沒有這個字段
        review_count: item.review_count || 0,
        average_rating: item.average_rating,
        last_review_date: item.last_review_date,
        background: backgroundImage,  // 直接使用字符串
        openHour: item.openHour || '09:00 - 18:00',
        languages: item.languages || ['English'],
        activities: item.activities || []
      };
    });
    
    console.log('數據轉換完成，返回潛水店數量:', diveShops.length);
    return diveShops;
  } catch (error) {
    console.error('加載潛水店數據失敗:', error);
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
      // 搜索查詢
      if (
        filters.searchQuery &&
        !shop.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 認證系統
      if (
        filters.selectedCertifications.length > 0 &&
        !filters.selectedCertifications.some((cert) =>
          shop.certifications.includes(cert)
        )
      ) {
        return false;
      }

      // 國家/地區
      if (
        filters.selectedCountries.length > 0 &&
        !filters.selectedCountries.includes(shop.country)
      ) {
        return false;
      }

      // 五星店鋪
      if (filters.fiveStarOnly && !shop.is_five_star) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'highest-rated':
          return ((b.average_rating || 0) - (a.average_rating || 0));
        case 'distance':
          // 簡單的按國家排序，實際項目中可能需要更複雜的距離計算
          return a.country.localeCompare(b.country);
        case 'popular':
          return ((b.review_count || 0) - (a.review_count || 0));
        case 'a-z':
        default:
          return a.name.localeCompare(b.name);
      }
    });
} 