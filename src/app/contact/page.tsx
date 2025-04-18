'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '建議',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 驗證所有必填欄位
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('請填寫所有必填欄位');
      setIsSubmitting(false);
      return;
    }

    // 驗證電子郵箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('請輸入有效的電子郵箱地址');
      setIsSubmitting(false);
      return;
    }

    // 驗證電話格式（允許數字、+、-和空格）
    const phoneRegex = /^[0-9+\-\s]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('請輸入有效的電話號碼');
      setIsSubmitting(false);
      return;
    }

    try {
      // 使用 URLSearchParams 來編碼數據
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('phone', formData.phone);
      params.append('type', formData.type);
      params.append('message', formData.message);

      const response = await fetch('https://script.google.com/macros/s/AKfycbw4fLveoSNk1eMiUwzwPplkLcqHg0N-OAZQzIwuEa7TBoxVmokj8O8n_AJ74jJmPHkm7Q/exec', {
        method: 'GET',
        mode: 'no-cors',
      });

      // 設置成功狀態
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: '建議',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">聯繫我們</h1>
          
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">我們很樂意收到您的反饋</h2>
            <p className="text-gray-600 mb-6">
              無論您有問題、建議或合作意向，請填寫以下表單與我們聯繫。我們將盡快回覆您。
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名（必填）
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  電子郵箱（必填）
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  電話（必填）
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  意見類型
                </label>
                <select
                  id="type"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="建議">建議</option>
                  <option value="問題">問題</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  內容
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? '提交中...' : '提交聯繫資訊'}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                  感謝您的聯繫！我們會盡快回覆您。
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                  提交失敗，請稍後再試或直接聯繫我們。
                </div>
              )}
            </form>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-4">其他聯繫方式</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">電子郵件</h3>
                <p className="text-gray-600">info@diveshopfinder.com</p>
              </div>
              <div>
                <h3 className="font-medium">社交媒體</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                </div>
              </div>
              <div>
                <h3 className="font-medium">營業時間</h3>
                <p className="text-gray-600">週一至週五: 9:00 - 18:00</p>
                <p className="text-gray-600">週末: 10:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 