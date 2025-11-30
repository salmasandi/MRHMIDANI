import React, { useState } from 'react';
import { Loader2, ExternalLink, RefreshCw } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // Used to force reload the iframe
  const SITE_URL = 'https://mrhmidani.blogspot.com/';

  const handleRefresh = () => {
    setLoading(true);
    setKey(prev => prev + 1);
  };

  return (
    <div className="w-full h-full relative bg-white flex flex-col">
      {/* Loading Indicator Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 transition-opacity duration-500">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-bold text-lg">جاري تحميل الموقع...</p>
        </div>
      )}

      {/* WebView / Iframe */}
      <iframe
        key={key}
        src={SITE_URL}
        className="flex-grow w-full h-full border-0"
        title="MRHMIDANI Website"
        onLoad={() => setLoading(false)}
        allowFullScreen
        // Permissions for standard website functionality
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-presentation"
      />
      
      {/* Floating Action Button Group */}
      <div className="fixed bottom-6 left-6 z-20 flex flex-col space-y-3">
        {/* Refresh Button */}
        <button 
          onClick={handleRefresh}
          className="bg-white/90 backdrop-blur hover:bg-gray-100 text-blue-600 p-3 rounded-full shadow-lg border border-gray-200 transition-all active:scale-95"
          title="تحديث الصفحة"
        >
          <RefreshCw className="w-6 h-6" />
        </button>

        {/* External Link Button (Fallback) */}
        <a 
          href={SITE_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all active:scale-95"
          title="فتح في المتصفح الخارجي"
        >
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}

export default App;