
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Edit, Trash2, Eye } from 'lucide-react';

const BlogManagementPanel = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', title_ar: '',
    description: '', description_ar: '',
    content: '', content_ar: '',
    category: 'General',
    image_url: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      toast({ title: 'Deleted', description: 'Post removed successfully' });
      fetchPosts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      let error;
      if (currentPost) {
        ({ error } = await supabase.from('blog_posts').update(payload).eq('id', currentPost.id));
      } else {
        ({ error } = await supabase.from('blog_posts').insert(payload));
      }

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Blog post saved successfully', className: "bg-green-50" });
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const openModal = (post = null) => {
    setCurrentPost(post);
    if (post) {
      setFormData({
        title: post.title, title_ar: post.title_ar,
        description: post.description || '', description_ar: post.description_ar || '',
        content: post.content || '', content_ar: post.content_ar || '',
        category: post.category || 'General',
        image_url: post.image_url || ''
      });
    } else {
      setFormData({
        title: '', title_ar: '',
        description: '', description_ar: '',
        content: '', content_ar: '',
        category: 'General',
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة المدونة</h2>
        <Button onClick={() => openModal()} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> مقال جديد
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العنوان (عربي)</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">تاريخ النشر</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map(post => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title_ar}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{new Date(post.created_at).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openModal(post)}><Edit size={16} /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(post.id)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && !loading && (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">لا توجد مقالات بعد</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentPost ? 'تعديل مقال' : 'إضافة مقال جديد'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (English)</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>العنوان (عربي)</Label>
                <Input required value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} className="text-right" dir="rtl" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>الوصف المختصر</Label>
                <Textarea value={formData.description_ar} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="text-right" dir="rtl" />
              </div>
            </div>

            <div className="space-y-2">
               <Label>التصنيف</Label>
               <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                   <SelectItem value="General">General</SelectItem>
                   <SelectItem value="Trade">Trade</SelectItem>
                   <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                 </SelectContent>
               </Select>
            </div>

            <div className="space-y-2">
               <Label>رابط الصورة (Image URL)</Label>
               <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label>المحتوى (عربي)</Label>
              <Textarea 
                value={formData.content_ar} 
                onChange={e => setFormData({...formData, content_ar: e.target.value})} 
                className="min-h-[200px] text-right" 
                dir="rtl"
                placeholder="اكتب المحتوى هنا..."
              />
            </div>

            <div className="space-y-2">
              <Label>Content (English)</Label>
              <Textarea 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                className="min-h-[200px]" 
                placeholder="Write content here..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={loading} className="bg-teal-600">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} حفظ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagementPanel;
