
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Reply, CheckCircle, Loader2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmailManagementPanel = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Direct Email Sender State
  const [directEmailOpen, setDirectEmailOpen] = useState(false);
  const [directEmailData, setDirectEmailData] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (!error) setEmails(data || []);
    setLoading(false);
  };

  const handleSendDirectEmail = async (e) => {
    e.preventDefault();
    setSendingReply(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-direct-email', {
        body: directEmailData
      });

      if(error) throw error;
      if(data && !data.success) throw new Error(data.error);

      toast({ title: "تم الإرسال", description: "تم إرسال البريد الإلكتروني بنجاح" });
      setDirectEmailOpen(false);
      setDirectEmailData({ to: '', subject: '', body: '' });
      
      // Log this conversation
      await supabase.from('email_conversations').insert({
        sender_email: 'admin', 
        sender_name: 'Admin',
        subject: directEmailData.subject,
        message_body: directEmailData.body,
        status: 'sent',
        admin_reply: 'Direct Message'
      });
    } catch(err) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    } finally {
      setSendingReply(false);
    }
  };

  const handleReply = async () => {
    if(!selectedEmail || !replyText) return;
    setSendingReply(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-direct-email', {
        body: {
          to: selectedEmail.email,
          subject: `Re: Contact Form Submission`, // Or ask for subject
          body: replyText
        }
      });

      if(error) throw error;
      if(data && !data.success) throw new Error(data.error);

      toast({ title: "تم الرد", description: "تم إرسال الرد بنجاح" });
      setReplyText('');
      setSelectedEmail(null);
    } catch(err) {
      toast({ title: "خطأ", description: err.message, variant: "destructive" });
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة الرسائل والبريد</h2>
        <Button onClick={() => setDirectEmailOpen(true)} className="bg-teal-600">
          <Mail className="mr-2 h-4 w-4" /> إرسال بريد جديد
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">المرسل</TableHead>
              <TableHead className="text-right">البريد</TableHead>
              <TableHead className="text-right">مقتطف</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map(email => (
              <TableRow key={email.id}>
                <TableCell>{new Date(email.created_at).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell className="font-medium">{email.name}</TableCell>
                <TableCell className="text-blue-600">{email.email}</TableCell>
                <TableCell className="max-w-xs truncate text-gray-500">{email.message}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(email)}>
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View/Reply Modal */}
      <Dialog open={!!selectedEmail} onOpenChange={(o) => !o && setSelectedEmail(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الرسالة</DialogTitle>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
               <div className="bg-gray-50 p-4 rounded text-sm">
                 <p><strong>من:</strong> {selectedEmail.name} ({selectedEmail.email})</p>
                 <p><strong>الهاتف:</strong> {selectedEmail.phone || 'N/A'}</p>
                 <p className="mt-2 text-gray-700 whitespace-pre-wrap">{selectedEmail.message}</p>
               </div>
               
               <div className="space-y-2">
                 <Label className="font-bold">الرد السريع:</Label>
                 <Textarea 
                   value={replyText} 
                   onChange={e => setReplyText(e.target.value)} 
                   placeholder="اكتب ردك هنا..."
                   className="min-h-[100px]"
                 />
                 <div className="flex justify-end gap-2">
                   <Button variant="outline" onClick={() => setSelectedEmail(null)}>إغلاق</Button>
                   <Button onClick={handleReply} disabled={sendingReply || !replyText} className="bg-teal-600">
                     {sendingReply && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     <Reply className="mr-2 h-4 w-4" /> إرسال الرد
                   </Button>
                 </div>
               </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Direct Email Modal */}
      <Dialog open={directEmailOpen} onOpenChange={setDirectEmailOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>إرسال بريد إلكتروني مباشر</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendDirectEmail} className="space-y-4 pt-2">
            <div>
              <Label>المستلم (Email)</Label>
              <Input required type="email" value={directEmailData.to} onChange={e => setDirectEmailData({...directEmailData, to: e.target.value})} />
            </div>
            <div>
              <Label>الموضوع</Label>
              <Input required value={directEmailData.subject} onChange={e => setDirectEmailData({...directEmailData, subject: e.target.value})} />
            </div>
            <div>
              <Label>الرسالة</Label>
              <Textarea required value={directEmailData.body} onChange={e => setDirectEmailData({...directEmailData, body: e.target.value})} className="min-h-[150px]" />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDirectEmailOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={sendingReply} className="bg-teal-600">
                {sendingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : 'إرسال'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailManagementPanel;
