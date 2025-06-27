import 'react-native-url-polyfill/auto'; // Required for Supabase in React Native
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aipdsorwmdusbieyzhjy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGRzb3J3bWR1c2JpZXl6aGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMjc1MzEsImV4cCI6MjA2NjYwMzUzMX0.8RH0wtXE34FI_ZEFW5TSAAZm2XktN6LPi42Q8ajCW6A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);