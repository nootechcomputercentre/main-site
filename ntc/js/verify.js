const SUPABASE_URL ="https://yzyupyrootanffzouker.supabase.co";
const SUPABASE_KEY ="sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function verifyCertificate() {

    const params = new URLSearchParams(window.location.search);
    const hash = params.get("id");

    console.log("Hash:", hash);

    if (!hash) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("error").style.display = "block";
        return;
    }

    const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_hash", hash)
        .single();

    console.log("Data:", data);
    console.log("Error:", error);

    document.getElementById("loading").style.display = "none";

    if (error || !data) {
        document.getElementById("error").style.display = "block";
        return;
    }

    document.getElementById("result").style.display = "block";

    document.getElementById("status").innerHTML = "✅ CERTIFICATE VERIFIED";

    document.getElementById("certificate_no").textContent = data.certificate_no || "";
    document.getElementById("student_name").textContent = data.student_name || "";
    document.getElementById("father_name").textContent = data.father_name || "";
    document.getElementById("course_name").textContent = data.course_name || "";
    document.getElementById("batch_name").textContent = data.batch_name || "";
    document.getElementById("percentage").textContent = data.percentage || "";
    document.getElementById("grade").textContent = data.grade || "";
    document.getElementById("result_status").textContent = data.result || "";
    document.getElementById("issue_date").textContent = data.issue_date || "";
    document.getElementById("verification_status").textContent = data.verification_status || "";
}

verifyCertificate();
