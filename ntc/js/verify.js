const SUPABASE_URL = "https://yzyupyrootanffzouker.supabase.co";
const SUPABASE_KEY = "sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";
console.log("verify.js started");
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase client created");

async function test() {

    console.log("Testing connection...");

    const { data, error } = await supabase
        .from("certificates")
        .select("*");

    console.log("DATA =", data);
    console.log("ERROR =", error);
}

test();
