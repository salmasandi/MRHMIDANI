import { BlogPost, FeedResponse } from '../types';

const BLOG_URL = 'https://mrhmidani.blogspot.com';
const FEED_URL = `${BLOG_URL}/feeds/posts/default?alt=json`;

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(FEED_URL);
    if (!response.ok) {
      throw new Error('فشل في جلب البيانات');
    }
    const data: FeedResponse = await response.json();

    if (!data.feed.entry) {
      return [];
    }

    return data.feed.entry.map((entry) => {
      // Find the alternate link which is the actual post URL
      const linkObj = entry.link.find((l) => l.rel === 'alternate');
      const url = linkObj ? linkObj.href : '#';

      // Attempt to find a thumbnail
      let thumbnail = 'https://picsum.photos/800/400'; // Default placeholder
      if (entry.media$thumbnail) {
        // High res trick: usually they are s72-c, change to w800 or s800
        thumbnail = entry.media$thumbnail.url.replace(/\/s[0-9]+-c\//, '/w800/'); 
      } else {
        // Try to extract first image from content
        const imgRegex = /<img.*?src="(.*?)"/;
        const match = imgRegex.exec(entry.content.$t);
        if (match && match[1]) {
          thumbnail = match[1];
        }
      }

      return {
        id: entry.id.$t,
        title: entry.title.$t,
        content: entry.content.$t,
        published: entry.published.$t,
        updated: entry.updated.$t,
        url: url,
        thumbnail: thumbnail,
        author: entry.author?.[0]?.name?.$t || 'Unknown',
        categories: entry.category ? entry.category.map((c) => c.term) : [],
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};