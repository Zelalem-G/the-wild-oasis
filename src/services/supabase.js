import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zzagsihxuohcxdftiydc.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YWdzaWh4dW9oY3hkZnRpeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Mzc0ODgsImV4cCI6MjA3MTIxMzQ4OH0.sQk01kL93vOS2kiwOqc1YGsEk2UZxn1w6CkfjXrme7o`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
