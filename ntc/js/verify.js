//====================================================
// NOOTECH COMPUTER CENTRE
// CERTIFICATE VERIFICATION SYSTEM
//====================================================

//=============================
// SUPABASE CONFIGURATION
//=============================

const SUPABASE_URL =
"https://yzyupyrootanffzouker.supabase.co";

const SUPABASE_KEY =
"sb_publishable_FHztZiMDfLcDPaTnQqg51Q_p7K59PJ0";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

//=============================
// PAGE LOAD
//=============================

document.addEventListener(
    "DOMContentLoaded",
    verifyCertificate
);

//=============================
// VERIFY CERTIFICATE
//=============================

async function verifyCertificate(){

    try{

        //-------------------------
        // Read URL
        //-------------------------

        const params =
        new URLSearchParams(
            window.location.search
        );

        const certNo =
        params.get("cert");

        console.log(
            "Certificate Number:",
            certNo
        );

        if(!certNo){

            return showError(
                "Certificate Number Missing"
            );

        }

        //-------------------------
        // Query Supabase
        //-------------------------

        const {data,error} =
        await db

        .from("certificates")

        .select("*")

        .eq(
            "certificate_no",
            certNo
        )

        .single();

        console.log(data);
        console.log(error);

        if(error || !data){

            return showError(
                "Certificate Not Found"
            );

        }

        //-------------------------
        // Hide Loading
        //-------------------------

        hide("loading");

       console.log("Verification Successful");

        //-------------------------
        // Status
        //-------------------------

        setText(
            "status",
            "✅ CERTIFICATE VERIFIED"
        );

        //-------------------------
        // Details
        //-------------------------

        setText(
            "certificate_no",
            data.certificate_no
        );

        setText(
            "student_name",
            data.student_name
        );

        setText(
            "father_name",
            data.father_name
        );

        setText(
            "course_name",
            data.course_name
        );

        setText(
            "batch_name",
            data.batch_name
        );

        setText(
    "percentage",
    data.percentage
        ? data.percentage + "%"
        : ""
);
        setText(
            "grade",
            data.grade
        );

        setText(
            "result_status",
            data.result
        );

        setText(
            "issue_date",
            formatDate(
                data.issue_date
            )
        );

        setText(
            "verification_status",
            data.verification_status
        );

        //-------------------------
        // Photo
        //-------------------------

        const photo =
        document.getElementById(
            "student_photo"
        );

        if(photo){

            if(
                data.photo_url &&
                data.photo_url.trim()!==""
            ){

               photo.onerror = function(){

    this.src = "img/gallery/logo.png";

};

photo.src = data.photo_url;
            else{

                photo.src =
                "img/gallery/logo.png";

            }

        }

    }

    catch(ex){

        console.error(ex);

        showError(
            ex.message
        );

    }

}

//=============================
// SHOW ERROR
//=============================

function showError(msg){

    hide("loading");

    hide("result");

    show("error");

    console.error(msg);

const err = document.querySelector("#error p");

if(err){

    err.innerHTML = msg;

}

//=============================
// SHOW
//=============================

function show(id){

    document
    .getElementById(id)
    .style.display="block";

}

//=============================
// HIDE
//=============================

function hide(id){

    document
    .getElementById(id)
    .style.display="none";

}

//=============================
// SET TEXT
//=============================

function setText(id,value){

    const obj=
    document.getElementById(id);

    if(obj){

        obj.textContent=
        value ?? "";

    }

}

//=============================
// FORMAT DATE
//=============================

function formatDate(date){

    if(!date)
    return "";

    try{

        return new Date(date)
        .toLocaleDateString(
            "en-IN",
            {

                day:"2-digit",

                month:"long",

                year:"numeric"

            }
        );

    }

    catch{

        return date;

    }

}
