(function(){let ctx,started=false;
window.soundOn=localStorage.getItem('ssSound')!=='off';
const mel=[72,76,79,84,79,76,74,77,81,77,74,71,72,76,79,83,84,83,79,76,77,81,79,74];
const bass=[48,48,55,55,53,53,55,55];
function n(f,t,d,type,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=440*Math.pow(2,(f-69)/12);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d)}
let master,next,step=0;const S=0.18;
function sched(){if(!soundOn||ctx.state!=='running'){next=ctx.currentTime+0.05;return}while(next<ctx.currentTime+0.3){n(mel[step%mel.length],next,S*0.9,'square',0.08);if(step%3===0)n(bass[(step/3|0)%bass.length],next,S*2.8,'triangle',0.25);if(step%6===0)n(96,next,0.05,'sine',0.05);next+=S;step++}}
function start(){if(started)return;started=true;ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0.35;master.connect(ctx.destination);next=ctx.currentTime+0.05;setInterval(sched,100)}
const btn=document.createElement('button');btn.id='soundBtn';btn.style.cssText='position:fixed;top:12px;right:12px;background:#e50914;color:#fff;border:0;padding:10px 16px;border-radius:10px;font:bold 18px system-ui;cursor:pointer;z-index:9';
function label(){btn.textContent=!soundOn?'🔇 Sound off (M)':(started&&ctx.state==='running')?'🔊 Sound on (M)':'🎵 Tap or press any key for sound'}
function set(on){soundOn=on;localStorage.setItem('ssSound',on?'on':'off');if(on){start();ctx.resume().then(label)}else if(ctx){ctx.suspend().then(label)}window.sfx&&sfx.setMuted&&sfx.setMuted(!on);label()}
btn.addEventListener('pointerdown',e=>{e.stopPropagation();set(!soundOn)});
addEventListener('keydown',e=>{if(e.key.toLowerCase()==='m'){set(!soundOn);return}if(soundOn){start();ctx.resume().then(label)}});
addEventListener('pointerdown',()=>{if(soundOn){start();ctx.resume().then(label)}});
addEventListener('DOMContentLoaded',()=>{document.body.appendChild(btn);label()});if(document.body){document.body.appendChild(btn);label()}
window.sfx&&sfx.setMuted&&sfx.setMuted(!soundOn)})();
