(function(){let last=null,shown=false;
function toast(){if(shown)return;shown=true;const d=document.createElement('div');
d.style.cssText='position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:rgba(20,20,20,.95);color:#fff;border:2px solid #e50914;border-radius:12px;padding:10px 18px;font:bold 16px system-ui,sans-serif;z-index:50;box-shadow:0 0 20px rgba(229,9,20,.4)';
d.innerHTML='Update available &nbsp;<a href="#" style="color:#ffb300">Refresh</a>';
d.querySelector('a').onclick=e=>{e.preventDefault();location.reload()};document.body.appendChild(d)}
async function check(){if(shown)return;try{const r=await fetch(location.pathname+'?_='+Date.now(),{cache:'no-store'});const t=await r.text();if(last===null)last=t;else if(t!==last)toast();}catch(e){}}
check();setInterval(check,2000);})();
