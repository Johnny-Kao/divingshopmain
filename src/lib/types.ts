export interface DiveShop {
  id: string;
  name: string;
  certifications: string[];
  country: string;
  region: string;
  city: string;
  description: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  featuredImage: string;
  images: string[];
  sponsored: boolean;
  coordinates?: [number, number];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  ad_priority?: number;
  is_five_star?: boolean;
  average_rating?: number;
  review_count?: number;
  last_review_date?: string | null;
}

export interface FilterState {
  searchQuery: string;
  selectedCertifications: string[];
  selectedCountries: string[];
  ratingFilter: string;
  fiveStarOnly: boolean;
  sortBy: string;
}

export type SortOption = 'a-z' | 'highest-rated' | 'distance' | 'popular';

export const CERTIFICATIONS = [
  'PADI',
  'SSI'
];

export const COUNTRIES: Record<string, string[]> = {
  '東南亞': ['泰國', '印尼', '馬來西亞', '菲律賓', '新加坡', '越南', '緬甸', '柬埔寨'],
  '東亞': ['中國', '日本', '韓國', '台灣', '香港'],
  '南亞': ['印度', '斯里蘭卡', '馬爾代夫'],
  '大洋洲': ['澳大利亞', '新西蘭', '斐濟', '帛琉'],
  '中東': ['埃及', '阿聯酋', '以色列', '約旦', '阿曼'],
  '歐洲': ['西班牙', '意大利', '希臘', '克羅地亞', '法國', '葡萄牙', '英國', '德國', '荷蘭', '挪威', '瑞典', '芬蘭', '冰島', '馬耳他'],
  '北美洲': ['美國', '加拿大', '墨西哥', '古巴', '巴拿馬', '牙買加', '巴哈馬', '開曼群島'],
  '南美洲': ['巴西', '哥倫比亞', '厄瓜多爾', '秘魯', '智利', '阿根廷'],
  '非洲': ['南非', '坦桑尼亞', '肯尼亞', '莫桑比克', '塞舌爾']
};

export const SORT_OPTIONS: Record<string, string> = {
  'a-z': '名稱 A-Z',
  'z-a': '名稱 Z-A',
  'highest-rated': '最高評分',
  'distance': '距離',
  'popular': '最多評論'
};

// 國家代碼映射
export const COUNTRY_MAPPING: Record<string, { code: string, english: string }> = {
  // 東南亞
  '泰國': { code: 'th', english: 'Thailand' },
  '印尼': { code: 'id', english: 'Indonesia' },
  '馬來西亞': { code: 'my', english: 'Malaysia' },
  '菲律賓': { code: 'ph', english: 'Philippines' },
  '新加坡': { code: 'sg', english: 'Singapore' },
  '越南': { code: 'vn', english: 'Vietnam' },
  '緬甸': { code: 'mm', english: 'Myanmar' },
  '柬埔寨': { code: 'kh', english: 'Cambodia' },
  
  // 東亞
  '中國': { code: 'cn', english: 'China' },
  '日本': { code: 'jp', english: 'Japan' },
  '韓國': { code: 'kr', english: 'South Korea' },
  '台灣': { code: 'tw', english: 'Taiwan' },
  '香港': { code: 'hk', english: 'Hong Kong' },
  
  // 南亞
  '印度': { code: 'in', english: 'India' },
  '斯里蘭卡': { code: 'lk', english: 'Sri Lanka' },
  '馬爾代夫': { code: 'mv', english: 'Maldives' },
  
  // 大洋洲
  '澳大利亞': { code: 'au', english: 'Australia' },
  '新西蘭': { code: 'nz', english: 'New Zealand' },
  '斐濟': { code: 'fj', english: 'Fiji' },
  '帛琉': { code: 'pw', english: 'Palau' },
  
  // 中東
  '埃及': { code: 'eg', english: 'Egypt' },
  '阿聯酋': { code: 'ae', english: 'UAE' },
  '以色列': { code: 'il', english: 'Israel' },
  '約旦': { code: 'jo', english: 'Jordan' },
  '阿曼': { code: 'om', english: 'Oman' },
  
  // 歐洲
  '西班牙': { code: 'es', english: 'Spain' },
  '意大利': { code: 'it', english: 'Italy' },
  '希臘': { code: 'gr', english: 'Greece' },
  '克羅地亞': { code: 'hr', english: 'Croatia' },
  '法國': { code: 'fr', english: 'France' },
  '葡萄牙': { code: 'pt', english: 'Portugal' },
  '英國': { code: 'gb', english: 'UK' },
  '德國': { code: 'de', english: 'Germany' },
  '荷蘭': { code: 'nl', english: 'Netherlands' },
  '挪威': { code: 'no', english: 'Norway' },
  '瑞典': { code: 'se', english: 'Sweden' },
  '芬蘭': { code: 'fi', english: 'Finland' },
  '冰島': { code: 'is', english: 'Iceland' },
  '馬耳他': { code: 'mt', english: 'Malta' },
  
  // 北美洲
  '美國': { code: 'us', english: 'USA' },
  '加拿大': { code: 'ca', english: 'Canada' },
  '墨西哥': { code: 'mx', english: 'Mexico' },
  '古巴': { code: 'cu', english: 'Cuba' },
  '巴拿馬': { code: 'pa', english: 'Panama' },
  '牙買加': { code: 'jm', english: 'Jamaica' },
  '巴哈馬': { code: 'bs', english: 'Bahamas' },
  '開曼群島': { code: 'ky', english: 'Cayman Islands' },
  
  // 南美洲
  '巴西': { code: 'br', english: 'Brazil' },
  '哥倫比亞': { code: 'co', english: 'Colombia' },
  '厄瓜多爾': { code: 'ec', english: 'Ecuador' },
  '秘魯': { code: 'pe', english: 'Peru' },
  '智利': { code: 'cl', english: 'Chile' },
  '阿根廷': { code: 'ar', english: 'Argentina' },
  
  // 非洲
  '南非': { code: 'za', english: 'South Africa' },
  '坦桑尼亞': { code: 'tz', english: 'Tanzania' },
  '肯尼亞': { code: 'ke', english: 'Kenya' },
  '莫桑比克': { code: 'mz', english: 'Mozambique' },
  '塞舌爾': { code: 'sc', english: 'Seychelles' }
};

// 标签类型定义
export interface Tag {
  name: string;
  color: string;
} 