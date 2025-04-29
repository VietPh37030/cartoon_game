import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tdoscmjqtaqeuslrxkoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkb3NjbWpxdGFxZXVzbHJ4a29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjUzNzMsImV4cCI6MjA2MTUwMTM3M30.bg9uRx6qTQkK8HNImDL5PzvN0OEx71U7uZT6XfQsXQA';
export const supabase = createClient(supabaseUrl, supabaseKey);