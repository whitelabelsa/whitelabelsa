import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dzwnhmmdeycwjnpycgkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d25obW1kZXljd2pucHljZ2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMTA4NjgsImV4cCI6MjA4NDc4Njg2OH0.qa9FxQJ-BF9B54OUuUpDypfsp1rH3AZ8mVCysvud2ZE';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
