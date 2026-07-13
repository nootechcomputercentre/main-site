const SUPABASE_URL = "https://yzyupyrootanffzouker.supabase.co";

const SUPABASE_KEY = "sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Verify.js Loaded");
console.log("Supabase Client Created");

const params = new URLSearchParams(window.location.search);

console.log("Full URL:", window.location.href);

console.log("Certificate ID:", params.get("id"));
