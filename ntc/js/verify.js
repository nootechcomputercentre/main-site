const SUPABASE_URL ="https://yzyupyrootanffzouker.supabase.co";
const SUPABASE_KEY ="sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function verifyCertificate() {

    const params = new URLSearchParams(window.location.search);

    const hash = params.get("id");

    console.log("Hash =", hash);

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

    console.log("Data =", data);
    console.log("Error =", error);

    document.getElementById("loading").style.display = "none";

    if (error) {

        console.error(error);

        document.getElementById("error").style.display = "block";
        return;

    }

    if (!data) {

        document.getElementById("error").style.display = "block";
        return;

    }

    document.getElementById("result").style.display = "block";

    document.getElementById("status").innerHTML = "✅ CERTIFICATE VERIFIED";

    document.getElementById("certificate_no").innerHTML = data.certificate_no;
    document.getElementById("student_name").innerHTML = data.student_name;
    document.getElementById("father_name").innerHTML = data.father_name;
    document.getElementById("course_name").innerHTML = data.course_name;
    document.getElementById("batch_name").innerHTML = data.batch_name;
    document.getElementById("percentage").innerHTML = data.percentage;
    document.getElementById("grade").innerHTML = data.grade;
    document.getElementById("result_status").innerHTML = data.result;
    document.getElementById("issue_date").innerHTML = data.issue_date;
    document.getElementById("verification_status").innerHTML = data.verification_status;

}

verifyCertificate();
