// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zhuievsmjdcpsdfffwvf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodWlldnNtamRjcHNkZmZmd3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTMwNzEsImV4cCI6MjA1MTA2OTA3MX0.8n0WUDotvdbOdzdPjlnnAYax5vrE1aA51gUhZN4YkW4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);