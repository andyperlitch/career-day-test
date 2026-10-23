(function(){let ctx,started=false;
const mel=[72,76,79,84,79,76,74,77,81,77,74,71,72,76,79,83,84,83,79,76,77,81,79,74];
const bass=[48,48,55,55,53,53,55,55];
function n(f,t,d,type,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=440*Math.pow(2,(f-69)/12);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d)}
let master,next,step=0;const S=0.18;
function sched(){while(next<ctx.currentTime+0.3){n(mel[step%mel.length],next,S*0.9,'square',0.08);if(step%3===0)n(bass[(step/3|0)%bass.length],next,S*2.8,'triangle',0.25);if(step%6===0)n(96,next,0.05,'sine',0.05);next+=S;step++}}
function start(){if(started)return;started=true;ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0.35;master.connect(ctx.destination);next=ctx.currentTime+0.05;setInterval(sched,100);const m=document.getElementById('musicPrompt');if(m)m.remove()}
try{start();if(ctx.state!=='running'){started=false;ctx.close()}}catch(e){started=false}
['keydown','pointerdown'].forEach(ev=>addEventListener(ev,()=>{start();ctx&&ctx.resume()},{once:false}));
if(!started){const d=document.createElement('div');d.id='musicPrompt';d.textContent='🎵 Tap or press any key to start music';d.style.cssText='position:fixed;top:12px;right:12px;background:#e50914;color:#fff;padding:10px 16px;border-radius:10px;font:bold 18px system-ui;cursor:pointer;z-index:9';document.body.appendChild(d)}})();
