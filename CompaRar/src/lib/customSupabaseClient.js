import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbwlfhojlmayqxlveoiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZid2xmaG9qbG1heXF4bHZlb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NDYyMzcsImV4cCI6MjA3MTIyMjIzN30.YcFUp3g-LCjRuwE_P8vLHoASjfRYQNqkL-kqnkV3QX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);