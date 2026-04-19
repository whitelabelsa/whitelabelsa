
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { BarChart3, Search } from 'lucide-react';

// Using localStorage for simplicity in this demo environment, 
// normally this would go to a 'system_settings' table in DB
const AnalyticsSetup = () => {
  const { toast } = useToast();
  const [gaId, setGaId] = useState('');
  const [gscCode, setGscCode] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const storedGa = localStorage.getItem('ga_tracking_id');
    const storedGsc = localStorage.getItem('gsc_verification_code');
    const storedEnabled = localStorage.getItem('analytics_enabled') === 'true';
    if (storedGa) setGaId(storedGa);
    if (storedGsc) setGscCode(storedGsc);
    setEnabled(storedEnabled);
  }, []);

  const handleSave = () => {
    localStorage.setItem('ga_tracking_id', gaId);
    localStorage.setItem('gsc_verification_code', gscCode);
    localStorage.setItem('analytics_enabled', enabled);
    
    toast({ title: "Settings Saved", description: "Analytics configuration updated. Reload page to apply changes." });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="text-orange-500"/> Google Analytics (GA4)</CardTitle>
          <CardDescription>Configure tracking for visitor stats.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Measurement ID (G-XXXXXXXXXX)</Label>
            <Input value={gaId} onChange={e => setGaId(e.target.value)} placeholder="G-1234567890" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
             <Label>Enable Tracking</Label>
             <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search className="text-blue-500"/> Google Search Console</CardTitle>
          <CardDescription>Verify domain ownership for Google Search.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>HTML Verification Code</Label>
            <Input value={gscCode} onChange={e => setGscCode(e.target.value)} placeholder="content=..." />
            <p className="text-xs text-gray-500">Paste the content attribute from the meta tag provided by GSC.</p>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2 flex justify-end">
        <Button onClick={handleSave} className="bg-teal-600">Save Configuration</Button>
      </div>
    </div>
  );
};

export default AnalyticsSetup;
