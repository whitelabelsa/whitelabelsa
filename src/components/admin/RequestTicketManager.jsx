
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus } from 'lucide-react';

const RequestTicketManager = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('customer_requests').select('*').order('created_at', { ascending: false });
    if (!error) setRequests(data || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (status) => {
    if(!selectedRequest) return;
    const { error } = await supabase.from('customer_requests').update({ status }).eq('id', selectedRequest.id);
    if(error) toast({ title: "Error", variant: "destructive" });
    else {
      toast({ title: "Updated" });
      setSelectedRequest({...selectedRequest, status});
      fetchRequests();
    }
  };

  const getStatusColor = (s) => {
    switch(s) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة طلبات العملاء (Tickets)</h2>
        {/* Ability to manually add request if needed, but usually comes from customer */}
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الأولوية</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-center">إجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(req => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.title}</TableCell>
                <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                <TableCell>{req.priority}</TableCell>
                <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(req)}>عرض</Button>
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">لا توجد طلبات حالياً</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={(o) => !o && setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRequest?.title}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {selectedRequest.description || "No description provided."}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-bold block">تحديث الحالة</span>
                  <Select value={selectedRequest.status} onValueChange={handleUpdateStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                   <span className="text-sm font-bold block">الأولوية</span>
                   <div className="p-2 border rounded bg-gray-50 text-sm">{selectedRequest.priority}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestTicketManager;
