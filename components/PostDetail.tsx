import React, { useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, User, Share2, Tag } from 'lucide-react';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const date = new Date(post.published).toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
          url: post.url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
        // Fallback or toast
        alert('نسخ الرابط: ' + post.url);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in">
      {/* Sticky Header for navigation */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <div className="font-semibold text-gray-800 truncate max-w-[60%] text-sm">
          {post.title}
        </div>
        <button 
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Featured Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 relative">
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
             {post.categories.map((cat, idx) => (
                <span key={idx} className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-md mb-2 ml-2">
                  {cat}
                </span>
             ))}
          </div>
        </div>

        <div className="px-5 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center ml-4">
              <img 
                src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} 
                alt={post.author}
                className="w-8 h-8 rounded-full ml-2"
              />
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 ml-1" />
              <span>{date}</span>
            </div>
          </div>

          {/* Blog Content */}
          <div 
            ref={contentRef}
            className="post-content text-gray-800 leading-8 text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags/Categories Footer */}
          {post.categories.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center">
                <Tag className="w-4 h-4 ml-1" />
                التصنيفات
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{cat}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
             <a 
               href={post.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
             >
               عرض المقال الأصلي
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;