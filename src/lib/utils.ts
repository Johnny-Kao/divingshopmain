/**
 * 連接多個CSS類名的工具函數
 * @param classes CSS類名數組，可以包含條件類名（過濾掉假值）
 * @returns 合併後的類名字符串
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
} 