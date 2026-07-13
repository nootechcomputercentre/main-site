const SUPABASE_URL = "https://yzyupyrootanffzouker.supabase.co";
const SUPABASE_KEY = "sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
async function test() {
  const { data, error } = await window.sb
        .from("certificates")
        .select("*")
        .eq("certificate_hash","abc123xyz")
        .single();
    console.log(data);
    console.log(error);
}
test();

