import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  const defaultImages = [
    "https://images.unsplash.com/photo-1661956602116-aa6865609028",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
  ];

  return (
    <div className="bg-white min-h-screen py-16 font-cairo" dir="rtl">
      <div className="container">
        {/* Blog Header Image */}
        <div className="w-full h-[300px] rounded-2xl overflow-hidden mb-16 relative shadow-lg">
             <img src="https://images.unsplash.com/photo-1605732562742-3023a888e56e" alt="Business Blog" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-teal-primary/70 flex flex-col items-center justify-center text-center px-4">
                 <h1 className="text-white text-4xl font-bold mb-4 drop-shadow-md">المدونة الاقتصادية</h1>
                 <p className="text-gold-accent text-xl font-medium max-w-2xl">أحدث التحليلات والأخبار حول التجارة والاستثمار بين السعودية ومصر</p>
             </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-teal-primary animate-spin mb-4" />
            <p className="text-gray-500 text-lg">جاري تحميل المقالات...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-800 mb-6 text-lg">{error}</p>
            <Button onClick={fetchPosts} variant="outline" className="flex items-center gap-2 px-6 py-3 h-auto text-base">
              <RefreshCw className="h-5 w-5" />
              إعادة المحاولة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden group border-gray-200 bg-beige-light flex flex-col h-full rounded-2xl">
                <div 
                  className="h-56 bg-gray-200 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image_url || defaultImages[index % defaultImages.length]})` }}
                />
                <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="bg-teal-primary/10 text-teal-primary px-3 py-1 rounded font-medium">
                      {post.category}
                    </span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  
                  <h3 className="mb-4 leading-tight text-teal-primary group-hover:text-teal-secondary transition-colors text-xl font-bold">
                    {post.title_ar}
                  </h3>
                  
                  <p className="text-[#666666] text-base mb-6 line-clamp-3 leading-relaxed">
                    {post.description_ar}
                  </p>
                  
                  <div className="mt-auto pt-2">
                    <Link to={`/blog/${post.id}`} className="w-full block">
                        <Button className="w-full bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-base py-3 h-auto">
                          اقرأ المزيد
                        </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;