import React from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowLeft } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const date = new Date(post.published).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Strip HTML for snippet
  const snippet = post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...';

  return (
    <div 
      onClick={() => onClick(post)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {post.categories.length > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
              {post.categories[0]}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2 space-x-reverse">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 ml-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="w-3 h-3 ml-1" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {snippet}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-50 flex justify-end">
          <button className="text-blue-600 text-sm font-semibold flex items-center hover:text-blue-800 transition-colors">
            اقرأ المزيد
            <ArrowLeft className="w-4 h-4 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;