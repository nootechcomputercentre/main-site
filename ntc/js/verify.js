//=====================================================
// NOOTECH COMPUTER CENTRE
// Certificate Verification System
//=====================================================

//============================
// SUPABASE CONFIGURATION
//============================

const SUPABASE_URL =
"https://yzyupyrootanffzouker.supabase.co";

const SUPABASE_KEY =
"sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

//============================
// VERIFY CERTIFICATE
//============================

async function verifyCertificate() {

    try {

        //-------------------------------------------------
        // Read Certificate No from URL
        //-------------------------------------------------

        const params = new URLSearchParams(window.location.search);

        const certNo = params.get("cert");

        console.log("Certificate =", certNo);

        if (!certNo) {

            showError();

            return;

        }

        //-------------------------------------------------
        // Fetch Certificate
        //-------------------------------------------------

        const { data, error } = await db

            .from("certificates")

            .select("*")

            .eq("certificate_no", certNo)

            .single();

        console.log(data);
        console.log(error);

        if (error || !data) {

            showError();

            return;

        }

        //-------------------------------------------------
        // Hide Loading
        //-------------------------------------------------

        document.getElementById("loading").style.display = "none";

        document.getElementById("result").style.display = "block";

        //-------------------------------------------------
        // VERIFIED BADGE
        //-------------------------------------------------

        document.getElementById("status").innerHTML =
        "✅ CERTIFICATE VERIFIED";

        //-------------------------------------------------
        // Fill Details
        //-------------------------------------------------

        setText("certificate_no",data.certificate_no);

        setText("student_name",data.student_name);

        setText("father_name",data.father_name);

        setText("course_name",data.course_name);

        setText("batch_name",data.batch_name);

        setText("percentage",data.percentage + "%");

        setText("grade",data.grade);

        setText("result_status",data.result);

        setText("issue_date",formatDate(data.issue_date));

        setText("verification_status",data.verification_status);

        //-------------------------------------------------
        // PHOTO
        //-------------------------------------------------

        if(data.photo_url){

            document.getElementById("student_photo").src =
            data.photo_url;

        }

    }

    catch(ex){

        console.error(ex);

        showError();

    }

}

//============================
// SET TEXT
//============================

function setText(id,value){

    const obj=document.getElementById(id);

    if(obj){

        obj.textContent=value ?? "";

    }

}

//============================
// FORMAT DATE
//============================

function formatDate(dt){

    if(!dt) return "";

    try{

        return new Date(dt).toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"long",
                year:"numeric"
            }
        );

    }

    catch{

        return dt;

    }

}

//============================
// ERROR
//============================

function showError(){

    document.getElementById("loading").style.display="none";

    document.getElementById("result").style.display="none";

    document.getElementById("error").style.display="block";

}

//============================

verifyCertificate();
