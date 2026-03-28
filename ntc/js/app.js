
// PAGE SWITCHING
const pages=document.querySelectorAll('.page');
const navBtns=document.querySelectorAll('.nav-btn');
function showPage(id){
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  navBtns.forEach(b=>b.classList.toggle('active',b.dataset.page===id));
}
navBtns.forEach(btn=>btn.onclick=()=>showPage(btn.dataset.page));

// DROPDOWNS
document.querySelectorAll('[data-dropdown-for]').forEach(btn=>{
  btn.onclick=()=>btn.parentElement.classList.toggle('open');
});
document.addEventListener('click',e=>{
  if(!e.target.closest('.dropdown')){
    document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open'));
  }
});

// NOTICE SYSTEM
const noticeList=document.getElementById('notice-list');
const editNoticeBtn=document.getElementById('edit-notice-btn');
const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modal-title');
const modalForm=document.getElementById('modal-form');

function loadNotices(){
  const raw=localStorage.getItem('notices');
  const notices=raw?JSON.parse(raw):[];
  noticeList.innerHTML="";
  notices.forEach(n=>{
    const div=document.createElement('div');
    div.className='notice-item';
    div.innerHTML=`<strong>${n.title}</strong><p>${n.msg}</p>`;
    noticeList.appendChild(div);
  });
}

editNoticeBtn.onclick=()=>{
  if(!document.body.classList.contains("admin-mode")) return alert("Admin access required!");
  modal.classList.add('open');
  modalTitle.textContent="Add Notice";
};

document.getElementById('modal-cancel').onclick=()=>modal.classList.remove('open');

modalForm.onsubmit=e=>{
  e.preventDefault();
  const title=document.getElementById('m-title').value;
  const msg=document.getElementById('m-msg').value;
  const list=JSON.parse(localStorage.getItem('notices')||"[]");
  list.unshift({title,msg});
  localStorage.setItem('notices',JSON.stringify(list));
  loadNotices();
  modal.classList.remove('open');
  modalForm.reset();
};

loadNotices();

// ADMIN LOGIN SYSTEM
const ADMIN_PIN="8954";
const loginModal=document.getElementById("admin-login-modal");
document.getElementById("admin-login-btn").onclick=()=>loginModal.classList.add("open");
document.getElementById("admin-cancel").onclick=()=>loginModal.classList.remove("open");
document.getElementById("admin-login-form").onsubmit=e=>{
  e.preventDefault();
  const pin=document.getElementById("admin-pin").value.trim();
  if(pin===ADMIN_PIN){
    document.body.classList.add("admin-mode");
    loginModal.classList.remove("open");
    alert("Admin login successful");
  }else alert("Incorrect PIN!");
};

// TESTIMONIAL UPLOAD
document.getElementById('add-testimonial-btn').onclick=()=>{
  if(!document.body.classList.contains("admin-mode")) return alert("Admin access required!");
  modal.classList.add('open');
  modalTitle.textContent="Add Testimonial";
};

// UPLOAD PREVIEWS
function previewFile(input,target){
  input.onchange=e=>{
    const f=e.target.files[0];
    if(!f)return;
    const r=new FileReader();
    r.onload=()=>{
      target.innerHTML=f.type.startsWith('video')?
      `<video controls src='${r.result}' style='width:100%;height:220px;border-radius:12px'></video>`:
      `<img src='${r.result}' style='width:100%;height:220px;border-radius:12px'>`;
    };
    r.readAsDataURL(f);
  };
}
previewFile(document.getElementById('img-upload'),document.getElementById('img-box'));
previewFile(document.getElementById('video-upload'),document.getElementById('video-box'));

document.getElementById('year').textContent=new Date().getFullYear();

