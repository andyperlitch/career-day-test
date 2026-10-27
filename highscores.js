// Space Skater shared high scores (Supabase REST, anon/publishable key; RLS allows SELECT + INSERT only).
window.HS=(function(){
const URL='https://ebexgcdswplcqfgqdvex.supabase.co/rest/v1/scores',KEY='sb_publishable_nqDEHNUfgaEwfQ04xJFxuQ_HVrkQMIC';
const HDR={apikey:KEY,'Content-Type':'application/json'};
// Mirrors the server-side initials_ok() blocklist.
const BLOCK=new Set('ASS AZZ FUK FUC FCK FUX FKU FKN FKR FAG FGT SEX SXY DIK DIC DIX DCK COK COC KKK NIG NGR NGA CUM CUN CNT KNT TIT TIS GAY WTF WTH STD SHT PIS PSS BCH JIZ VAG PUS HOE HOR WHR SUK SCK NAD ANL ANU RAP RPE XXX SLT KYS DMN LSD THC WOP SPC SPK GOK CHK KIK FAP PRN PNS NZI NAZ HTL MOF MFR BJS BLO TWT TRD RTD FAT KIL DIE GUN PMS HAG JAP POO PEE BUT BUM HIV ORG GOD'.split(' '));
const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let top=null,err=false,lastId=null;
function ok(s){return /^[A-Z]{3}$/.test(s)&&!BLOCK.has(s)}
async function fetchTop(){try{const r=await fetch(URL+'?select=id,initials,score,level&order=score.desc,created_at.asc&limit=10',{headers:HDR});if(!r.ok)throw 0;top=await r.json();err=false}catch(e){err=true}render();return top}
async function submit(ini,score,level){const r=await fetch(URL,{method:'POST',headers:Object.assign({Prefer:'return=representation'},HDR),body:JSON.stringify({initials:ini,score,level})});if(!r.ok)throw new Error((await r.text())||r.status);const j=await r.json();lastId=j[0]&&j[0].id}
const css=document.createElement('style');css.textContent=`
#hsPanel{width:380px;max-width:92vw;margin:10px auto;background:rgba(20,20,20,.9);border:3px solid #e50914;border-radius:14px;padding:10px 16px;box-shadow:0 0 24px rgba(229,9,20,.35)}
#hsPanel h3{margin:4px 0 8px;color:#ffb300;font-size:1.5rem}#hsPanel ol{margin:0;padding:0;list-style:none;font:bold 1.15rem ui-monospace,monospace}
#hsPanel li{display:flex;justify-content:space-between;padding:3px 8px;border-radius:6px}#hsPanel li:nth-child(odd){background:rgba(255,255,255,.06)}#hsPanel li.me{background:#e50914}
#hsPanel .msg{opacity:.8;font-size:1rem;margin:6px 0}
#hsPick{position:fixed;inset:0;background:rgba(0,0,0,.75);display:none;align-items:center;justify-content:center;z-index:20}
#hsPick .box{background:#141414;border:4px solid #e50914;border-radius:18px;padding:20px 30px;box-shadow:0 0 40px rgba(229,9,20,.5)}
#hsPick h3{color:#ffb300;font-size:2rem;margin:0 0 4px}#hsPick .wheels{display:flex;gap:16px;justify-content:center;margin:14px 0}
#hsPick .w{display:flex;flex-direction:column;align-items:center}#hsPick .w button{background:#333;color:#fff;border:0;border-radius:10px;font-size:1.6rem;width:64px;height:44px;cursor:pointer}
#hsPick .L{font:bold 3.4rem ui-monospace,monospace;width:72px;height:80px;line-height:80px;background:#0b0b2a;border:3px solid #555;border-radius:12px;margin:6px 0}
#hsPick .w.on .L{border-color:#e50914;color:#ffeb3b;box-shadow:0 0 14px #e50914}
#hsPick .go{background:#e50914;color:#fff;border:0;border-radius:12px;font:bold 1.4rem system-ui;padding:10px 26px;cursor:pointer;margin:4px}
#hsPick .skip{background:#444}#hsPick .warn{color:#ffb300;min-height:1.4em;font-weight:bold}`;
document.head.appendChild(css);
let panel,pick,letters=[0,0,0],cur=0,pend=null,busy=false;
function el(h){const d=document.createElement('div');d.innerHTML=h;return d.firstElementChild}
function render(){if(!panel)return;const esc=s=>String(s).replace(/[^A-Z0-9]/g,'');let h='<h3>🏆 High Scores 🏆</h3>';
 if(err)h+='<div class="msg">High scores are offline right now. Keep skating!</div>';else if(!top)h+='<div class="msg">Loading…</div>';else if(!top.length)h+='<div class="msg">No scores yet. Be the first!</div>';
 else h+='<ol>'+top.map((r,i)=>`<li class="${r.id===lastId?'me':''}"><span>${i+1}. ${esc(r.initials)}</span><span>${(+r.score).toLocaleString()} <small>L${+r.level}</small></span></li>`).join('')+'</ol>';
 if(pend&&pend.note)h+='<div class="msg">'+pend.note+'</div>';panel.innerHTML=h}
function draw(){pick.querySelectorAll('.w').forEach((w,i)=>{w.classList.toggle('on',i===cur);w.querySelector('.L').textContent=A[letters[i]]})}
function spin(i,d){letters[i]=(letters[i]+d+26)%26;cur=i;warn('');draw()}
function warn(s){pick.querySelector('.warn').textContent=s}
async function go(){if(busy)return;const s=letters.map(i=>A[i]).join('');if(!ok(s)){warn('Oops! Try different initials 🙂');return}
 busy=true;warn('Sending…');try{await submit(s,pend.score,pend.level);try{localStorage.setItem('ssIni',s)}catch(e){}pend.note='';close();await fetchTop()}catch(e){warn('Could not save score (offline?). Try again or skip.')}busy=false}
function close(){pick.style.display='none';api.active=false;show(true)}
function show(v){if(panel)panel.style.display=v?'block':'none'}
function init(){panel=el('<div id="hsPanel"></div>');const cv=document.getElementById('c');const ctl=cv.nextElementSibling&&cv.nextElementSibling.tagName==='P'?cv.nextElementSibling:cv;ctl.insertAdjacentElement('afterend',panel);
 pick=el(`<div id="hsPick"><div class="box"><h3>NEW HIGH SCORE!</h3><div class="sc"></div><div class="wheels">${[0,1,2].map(i=>`<div class="w" data-i="${i}"><button class="up">▲</button><div class="L">A</div><button class="dn">▼</button></div>`).join('')}</div><div class="warn"></div><button class="go">Submit ✔</button><button class="go skip">Skip</button><div style="opacity:.7;margin-top:8px">⬆️⬇️ change letter • ⬅️➡️ move • Enter to submit</div></div></div>`);
 document.body.appendChild(pick);
 pick.querySelectorAll('.w').forEach((w,i)=>{w.querySelector('.up').onclick=()=>spin(i,-1);w.querySelector('.dn').onclick=()=>spin(i,1);w.querySelector('.L').onclick=()=>{cur=i;draw()}});
 pick.querySelector('.go:not(.skip)').onclick=go;pick.querySelector('.skip').onclick=()=>{pend.note='';close()};
 pick.addEventListener('pointerdown',e=>e.stopPropagation());
 addEventListener('keydown',e=>{if(!api.active)return;const k=e.key;e.preventDefault();e.stopImmediatePropagation();
  if(k==='ArrowUp'||k==='w'||k==='W')spin(cur,-1);else if(k==='ArrowDown'||k==='s'||k==='S')spin(cur,1);
  else if(k==='ArrowLeft'||k==='a'||k==='A'){cur=(cur+2)%3;draw()}else if(k==='ArrowRight'||k==='d'||k==='D'){cur=(cur+1)%3;draw()}
  else if(k==='Enter'||k===' ')go();else if(k==='Escape'){pend.note='';close()}},true);
 fetchTop()}
// Called when a run ends. Shows the initials picker if the score makes the top 10.
async function endRun(score,level){pend={score,level,note:''};lastId=null;show(true);await fetchTop();
 const q=score>0&&!err&&(!top||top.length<10||score>top[top.length-1].score);
 if(q){letters=[0,0,0];cur=0;try{const s=localStorage.getItem('ssIni');if(s&&/^[A-Z]{3}$/.test(s))letters=[...s].map(c=>A.indexOf(c))}catch(e){}
  pick.querySelector('.sc').textContent='Score: '+score.toLocaleString()+' • Pick your initials';warn('');draw();pick.style.display='flex';api.active=true}
 else{pend.note=err?'':score>0?'Your score: '+score.toLocaleString()+' — so close! Try again for the top 10!':'';render()}}
const api={active:false,ok,fetchTop,endRun,show,init};
if(document.readyState==='loading')addEventListener('DOMContentLoaded',init);else init();
return api})();
