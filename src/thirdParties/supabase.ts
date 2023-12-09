
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const url = 'https://tsglwcjcwadmlagrugrd.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ2x3Y2pjd2FkbWxhZ3J1Z3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxMzc2NjIsImV4cCI6MjAxNzcxMzY2Mn0.hkRLh0g-Ytb24EModpdndjInrYIsyu9W2NaiaJWPafU';

export const supabase = createClient(url, key);
