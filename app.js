const sponsors = Array.from({length:20}, (_,i)=>({
  id:i+1,
  name:`Patrocinador ${String(i+1).padStart(2,'0')}`,
  instagram:'#',
  logo:`patrocinadores/patrocinador${String(i+1).padStart(2,'0')}.png`
}));

function sponsorLogo(s){
  const num=String(s.id).padStart(2,'0');
  return `<img class="sponsor-logo" src="${s.logo}" alt="${s.name}" loading="lazy" onerror="trySponsorImage(this, ${s.id}, 0)">`;
}

function trySponsorImage(img,id,attempt){
  const num=String(id).padStart(2,'0');
  const exts=['png','jpg','jpeg','webp'];
  if(attempt<exts.length){
    img.src=`patrocinadores/patrocinador${num}.${exts[attempt]}`;
    img.onerror=()=>trySponsorImage(img,id,attempt+1);
  }else{
    const box=document.createElement('div');
    box.className='placeholder-logo';
    box.textContent='SUA LOGO';
    img.replaceWith(box);
  }
}

const state = {done:new Set(JSON.parse(localStorage.getItem('sorteio_done')||'[]'))};

function goTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}

function renderSponsors(){
  const grid=document.getElementById('sponsorGrid');
  grid.innerHTML=sponsors.map(s=>{
    const done=state.done.has(s.id);
    return `<article class="sponsor ${done?'done':''}" id="sponsor-${s.id}">
      <span class="sponsor-num">${String(s.id).padStart(2,'0')}</span>
      ${sponsorLogo(s)}
      <h4>${s.name}</h4>
      <p>@${s.name.toLowerCase().replaceAll(' ','')}</p>
      <button class="follow" onclick="followSponsor(${s.id})">${done?'✓ SEGUIDO':'SEGUIR NO INSTAGRAM'}</button>
    </article>`;
  }).join('');
  updateProgress();
}
function followSponsor(id){
  const s=sponsors.find(x=>x.id===id);
  if(s && s.instagram && s.instagram!=='#') window.open(s.instagram,'_blank','noopener');
  state.done.add(id);
  localStorage.setItem('sorteio_done',JSON.stringify([...state.done]));
  renderSponsors();
}
function updateProgress(){
  const n=state.done.size,p=Math.round(n/20*100);
  document.getElementById('progressText').textContent=`${n} de 20 concluídos`;
  document.getElementById('progressPercent').textContent=`${p}%`;
  document.getElementById('progressBar').style.width=p+'%';
  const b=document.getElementById('finishBtn');
  b.disabled=n<20;b.style.opacity=n<20?.45:1;b.style.cursor=n<20?'not-allowed':'pointer';
}
function openModal(){
  if(state.done.size<20){alert('Conclua os 20 patrocinadores antes de finalizar.');return}
  document.getElementById('modal').classList.add('open');
  document.getElementById('participationForm').hidden=false;
  document.getElementById('successBox').hidden=true;
}
function closeModal(){document.getElementById('modal').classList.remove('open')}
function digits(v){return v.replace(/\D/g,'')}
document.getElementById('phone').addEventListener('input',e=>{
  let v=digits(e.target.value).slice(0,11);
  if(v.length>10)e.target.value=`(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  else if(v.length>6)e.target.value=`(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
  else if(v.length>2)e.target.value=`(${v.slice(0,2)}) ${v.slice(2)}`;
  else e.target.value=v;
});
document.getElementById('participationForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(document.getElementById('website').value){return}
  const ig=document.getElementById('instagram').value.trim().toLowerCase().replace(/^@/,'');
  const phone=digits(document.getElementById('phone').value);
  if(ig.length<3 || phone.length<10){alert('Confira seu Instagram e WhatsApp.');return}
  const key='sorteio_participation_'+ig;
  if(localStorage.getItem(key)){alert('Este perfil já possui uma participação neste navegador.');return}
  const ticket=Math.floor(100000+Math.random()*900000);
  localStorage.setItem(key,JSON.stringify({ticket,ig,phone,at:new Date().toISOString()}));
  document.getElementById('participationForm').hidden=true;
  document.getElementById('successBox').hidden=false;
  document.getElementById('ticketNumber').textContent=ticket;
});
renderSponsors();
