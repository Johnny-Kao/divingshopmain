export interface DiveShop {
  id: string;
  name: string;
  country: string;
  city: string;
  certifications: string[];
  rating: number | null;
  is_five_star: boolean;
  tags: string[];
  website: string;
  instagram: string;
  email: string;
  ad_priority: number;
  recommended_tags: string[];
  review_count: number;
  average_rating: number | null;
  last_review_date: string | null;
  background?: {
    '800x800': string;
    origin?: string | null;
  };
  openHour?: string;
  languages?: string[];
  activities?: string[];
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
  'highest-rated': '最高評分',
  'distance': '距離',
  'popular': '最受歡迎'
};

// 國家代碼映射
export const COUNTRY_MAPPING: { [key: string]: { code: string; name: string } } = {
  'Thailand': { code: 'TH', name: '泰國' },
  'Philippines': { code: 'PH', name: '菲律賓' },
  'Malaysia': { code: 'MY', name: '馬來西亞' },
  'Indonesia': { code: 'ID', name: '印尼' },
  'Vietnam': { code: 'VN', name: '越南' },
  'Cambodia': { code: 'KH', name: '柬埔寨' },
  'Singapore': { code: 'SG', name: '新加坡' },
  'Japan': { code: 'JP', name: '日本' },
  'South Korea': { code: 'KR', name: '韓國' },
  'Taiwan': { code: 'TW', name: '台灣' },
  'Hong Kong': { code: 'HK', name: '香港' },
  'Macau': { code: 'MO', name: '澳門' },
  'China': { code: 'CN', name: '中國' },
  'Australia': { code: 'AU', name: '澳大利亞' },
  'New Zealand': { code: 'NZ', name: '紐西蘭' },
  'Fiji': { code: 'FJ', name: '斐濟' },
  'Maldives': { code: 'MV', name: '馬爾代夫' },
  'Sri Lanka': { code: 'LK', name: '斯里蘭卡' },
  'India': { code: 'IN', name: '印度' },
  'Nepal': { code: 'NP', name: '尼泊爾' },
  'Turkey': { code: 'TR', name: '土耳其' },
  'Egypt': { code: 'EG', name: '埃及' },
  'South Africa': { code: 'ZA', name: '南非' },
  'Kenya': { code: 'KE', name: '肯亞' },
  'Tanzania': { code: 'TZ', name: '坦桑尼亞' },
  'Morocco': { code: 'MA', name: '摩洛哥' },
  'Spain': { code: 'ES', name: '西班牙' },
  'France': { code: 'FR', name: '法國' },
  'Italy': { code: 'IT', name: '意大利' },
  'Greece': { code: 'GR', name: '希臘' },
  'Croatia': { code: 'HR', name: '克羅地亞' },
  'Portugal': { code: 'PT', name: '葡萄牙' },
  'Malta': { code: 'MT', name: '馬耳他' },
  'Cyprus': { code: 'CY', name: '塞浦路斯' },
  'United Kingdom': { code: 'GB', name: '英國' },
  'Ireland': { code: 'IE', name: '愛爾蘭' },
  'Iceland': { code: 'IS', name: '冰島' },
  'Norway': { code: 'NO', name: '挪威' },
  'Sweden': { code: 'SE', name: '瑞典' },
  'Finland': { code: 'FI', name: '芬蘭' },
  'Denmark': { code: 'DK', name: '丹麥' },
  'Germany': { code: 'DE', name: '德國' },
  'Netherlands': { code: 'NL', name: '荷蘭' },
  'Belgium': { code: 'BE', name: '比利時' },
  'Switzerland': { code: 'CH', name: '瑞士' },
  'Austria': { code: 'AT', name: '奧地利' },
  'Czech Republic': { code: 'CZ', name: '捷克' },
  'Poland': { code: 'PL', name: '波蘭' },
  'Hungary': { code: 'HU', name: '匈牙利' },
  'Romania': { code: 'RO', name: '羅馬尼亞' },
  'Bulgaria': { code: 'BG', name: '保加利亞' },
  'United States': { code: 'US', name: '美國' },
  'Canada': { code: 'CA', name: '加拿大' },
  'Mexico': { code: 'MX', name: '墨西哥' },
  'Brazil': { code: 'BR', name: '巴西' },
  'Argentina': { code: 'AR', name: '阿根廷' },
  'Chile': { code: 'CL', name: '智利' },
  'Peru': { code: 'PE', name: '秘魯' },
  'Colombia': { code: 'CO', name: '哥倫比亞' },
  'Venezuela': { code: 'VE', name: '委內瑞拉' },
  'Costa Rica': { code: 'CR', name: '哥斯達黎加' },
  'Panama': { code: 'PA', name: '巴拿馬' },
  'Cuba': { code: 'CU', name: '古巴' },
  'Jamaica': { code: 'JM', name: '牙買加' },
  'Bahamas': { code: 'BS', name: '巴哈馬' },
  'Dominican Republic': { code: 'DO', name: '多米尼加' },
  'Puerto Rico': { code: 'PR', name: '波多黎各' },
  'Cayman Islands': { code: 'KY', name: '開曼群島' },
  'Bermuda': { code: 'BM', name: '百慕大' },
  'Seychelles': { code: 'SC', name: '塞舌爾' },
  'Mauritius': { code: 'MU', name: '毛里求斯' },
  'Madagascar': { code: 'MG', name: '馬達加斯加' },
  'Mozambique': { code: 'MZ', name: '莫桑比克' },
  'Zanzibar': { code: 'TZ', name: '桑給巴爾' }
};

// 标签类型定义
export interface Tag {
  name: string;
  color: string;
} 