
console.clear();

console.log("STARTED");

const SUPABASE_URL = "https://yzyupyrootanffzouker.supabase.co";
const SUPABASE_KEY = "sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";

const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("CLIENT CREATED");

(async () => {

    console.log("CHECKING DATABASE");

    const { data, error } = await client
        .from("certificates")
        .select("*");

    console.log(data);
    console.log(error);

})();
