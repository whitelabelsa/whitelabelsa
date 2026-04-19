import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, Calendar, Tag, AlertCircle } from 'lucide-react';

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('لم يتم العثور على المقال أو حدث خطأ أثناء التحميل.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-teal-primary animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
        <AlertCircle className="h-16 w-16 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً</h2>
        <p className="text-gray-500 mb-8 text-lg">{error || 'المقال غير موجود'}</p>
        <Button onClick={() => navigate('/blog')} variant="outline" className="px-8 py-3 h-auto text-base">
          العودة للمدونة
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-cairo pb-24" dir="rtl">
      {/* Header Image */}
      <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image_url || "https://images.unsplash.com/photo-1605732562742-3023a888e56e"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 w-full p-8 md:p-16 text-white container">
           <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-6 mb-6 text-base text-gold-accent font-medium">
                <span className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <Tag className="w-4 h-4" /> {post.category}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(post.created_at)}
                </span>
              </div>
              <h1 className="mb-4 text-white drop-shadow-md leading-tight text-3xl md:text-5xl font-bold">{post.title_ar}</h1>
           </div>
        </div>
      </div>

      <div className="container mt-12 flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="mb-10">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="text-gray-500 hover:text-teal-primary p-0 hover:bg-transparent flex gap-3 items-center text-base"
            >
              <ArrowRight className="w-5 h-5" /> العودة للمدونة
            </Button>
          </div>

          <article className="prose prose-lg max-w-none text-gray-700">
            <div className="bg-beige-light p-8 rounded-xl border-r-8 border-gold-accent mb-10 italic text-xl text-gray-600 leading-[1.8] font-medium">
              {post.description_ar}
            </div>

            <div className="whitespace-pre-line mb-16 text-lg leading-[2] space-y-6 text-gray-800">
              {post.content_ar}
            </div>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-10">
           <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-xl sticky top-24">
              <h3 className="text-teal-primary mb-6 border-b pb-4">عن المدونة</h3>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                مدونة وايت ليبل هي وجهتك الأولى للمعرفة حول التجارة البينية، فرص الاستثمار، واللوائح التجارية بين السعودية ومصر.
              </p>
              <Button onClick={() => navigate('/contact')} className="w-full bg-teal-primary text-white text-base py-3 h-auto font-bold">
                تواصل معنا
              </Button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostDetail;