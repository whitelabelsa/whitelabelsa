
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, Globe, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SEOSettingsManager = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('Home');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    page_name: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_card: 'summary_large_image',
    canonical_url: '',
    schema_markup: '{}',
    robots_directive: 'index, follow'
  });

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (pages.length > 0) {
      const pageData = pages.find(p => p.page_name === selectedPage);
      if (pageData) {
        setFormData({
          ...pageData,
          schema_markup: typeof pageData.schema_markup === 'object' ? JSON.stringify(pageData.schema_markup, null, 2) : pageData.schema_markup || '{}'
        });
      }
    }
  }, [selectedPage, pages]);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('seo_settings').select('*').order('page_name');
    if (error) {
      toast({ title: "خطأ", description: "فشل تحميل إعدادات SEO", variant: "destructive" });
    } else {
      setPages(data || []);
      if(data && data.length > 0) setSelectedPage(data[0].page_name);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate JSON
      let parsedSchema = {};
      try {
        parsedSchema = JSON.parse(formData.schema_markup);
      } catch (e) {
        throw new Error("تنسيق Schema Markup JSON غير صالح");
      }

      const { error } = await supabase.from('seo_settings').upsert({
        ...formData,
        schema_markup: parsedSchema,
        updated_at: new Date().toISOString()
      }, { onConflict: 'page_name' });

      if (error) throw error;
      
      toast({ title: "تم الحفظ", description: "تم تحديث إعدادات SEO بنجاح", className: "bg-green-50" });
      fetchPages(); // Refresh data
    } catch (error) {
      toast({ title: "خطأ", description: error.message || "فشل الحفظ", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>إدارة SEO</CardTitle>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الصفحة" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map(page => (
                    <SelectItem key={page.id} value={page.page_name}>{page.page_name}</SelectItem>
                  ))}
                  <SelectItem value="New Page">+ صفحة جديدة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>تحرير العلامات الوصفية وبيانات التواصل الاجتماعي لصفحة: <span className="font-bold text-teal-600">{selectedPage}</span></CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="basic">أساسي</TabsTrigger>
                <TabsTrigger value="social">تواصل اجتماعي</TabsTrigger>
                <TabsTrigger value="advanced">متقدم</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label>عنوان الصفحة (Meta Title)</Label>
                  <Input 
                    value={formData.meta_title || ''} 
                    onChange={e => handleChange('meta_title', e.target.value)} 
                    maxLength={60}
                  />
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>يظهر في نتائج البحث</span>
                    <span className={formData.meta_title?.length > 60 ? "text-red-500" : ""}>{formData.meta_title?.length || 0}/60</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>وصف الصفحة (Meta Description)</Label>
                  <Textarea 
                    value={formData.meta_description || ''} 
                    onChange={e => handleChange('meta_description', e.target.value)} 
                    maxLength={160}
                    className="h-24"
                  />
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>وصف مختصر يظهر تحت العنوان</span>
                    <span className={formData.meta_description?.length > 160 ? "text-red-500" : ""}>{formData.meta_description?.length || 0}/160</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الكلمات المفتاحية (Keywords)</Label>
                  <Input 
                    value={formData.meta_keywords || ''} 
                    onChange={e => handleChange('meta_keywords', e.target.value)} 
                    placeholder="تجارة, استيراد, تصدير..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-2">
                  <Label>عنوان OG (فيسبوك/لينكد إن)</Label>
                  <Input 
                    value={formData.og_title || ''} 
                    onChange={e => handleChange('og_title', e.target.value)} 
                    placeholder="نفس عنوان الصفحة عادةً"
                  />
                </div>
                <div className="space-y-2">
                  <Label>وصف OG</Label>
                  <Textarea 
                    value={formData.og_description || ''} 
                    onChange={e => handleChange('og_description', e.target.value)} 
                    className="h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>رابط صورة OG Image</Label>
                  <Input 
                    value={formData.og_image || ''} 
                    onChange={e => handleChange('og_image', e.target.value)} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Twitter Card Type</Label>
                  <Select value={formData.twitter_card} onValueChange={v => handleChange('twitter_card', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input 
                    value={formData.canonical_url || ''} 
                    onChange={e => handleChange('canonical_url', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Robots Directive</Label>
                  <Input 
                    value={formData.robots_directive || 'index, follow'} 
                    onChange={e => handleChange('robots_directive', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">Schema Markup (JSON) <Code size={14}/></Label>
                  <Textarea 
                    value={formData.schema_markup || '{}'} 
                    onChange={e => handleChange('schema_markup', e.target.value)} 
                    className="font-mono text-xs h-48"
                    dir="ltr"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" /> حفظ التغييرات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Preview Card */}
        <Card className="bg-gray-50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Globe size={16} /> معاينة نتيجة البحث (Google)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded shadow-sm border border-gray-100 font-sans text-left" dir="ltr">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                whitelabel.com.sa › {formData.page_name?.toLowerCase()}
              </div>
              <h3 className="text-[#1a0dab] text-xl font-normal hover:underline cursor-pointer truncate">
                {formData.meta_title || 'Page Title'}
              </h3>
              <p className="text-[#4d5156] text-sm mt-1 line-clamp-2">
                {formData.meta_description || 'Page description will appear here. It should be concise and relevant to the page content.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Preview */}
        <Card className="bg-gray-50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              معاينة المشاركة (Social)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-sm mx-auto">
              <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                {formData.og_image ? (
                  <img src={formData.og_image} alt="OG" className="w-full h-full object-cover" />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="p-3 bg-gray-50 border-t">
                <div className="text-gray-500 text-xs uppercase mb-1">whitelabel.com.sa</div>
                <div className="font-bold text-gray-900 truncate mb-1">{formData.og_title || formData.meta_title || 'Title'}</div>
                <div className="text-gray-600 text-sm line-clamp-2">{formData.og_description || formData.meta_description || 'Description'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOSettingsManager;
