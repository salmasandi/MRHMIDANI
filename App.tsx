import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from './services/bloggerService';
import { BlogPost } from './types';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import { Loader2, AlertCircle, RefreshCw, BookOpen, WifiOff } from 'lucide-react';

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      setError('تعذر تحميل المقالات. يرجى التحقق من الاتصال بالإنترنت.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle back button on mobile to close post detail instead of exiting app
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (selectedPost) {
        event.preventDefault();
        setSelectedPost(null);
      }
    };

    if (selectedPost) {
      window.history.pushState({ view: 'detail' }, '');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedPost]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    window.history.back();
    // The popstate listener will handle the state update
  };

  // View: Single Post
  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={handleBack} />;
  }

  // View: Posts List
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* App Header */}
      <header className="bg-white sticky top-0 z-20 shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">MRHMIDANI</h1>
          </div>
          
          <button 
            onClick={loadPosts} 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
            title="تحديث"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full p-4">
        
        {loading && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">جاري جلب المقالات...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <WifiOff className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">خطأ في الاتصال</h3>
            <p className="text-gray-500 mb-6 max-w-xs">{error}</p>
            <button 
              onClick={loadPosts}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>لا توجد مقالات لعرضها حالياً</p>
          </div>
        )}
      </main>

      {/* Footer */}
      {!loading && !error && (
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} مدونة MRHMIDANI. جميع الحقوق محفوظة.</p>
        </footer>
      )}
    </div>
  );
}

export default App;