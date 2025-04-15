'use client';

import Navbar from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';

export default function ContactPage() {
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
            
            <FeedbackForm />
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