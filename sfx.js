window.sfx=(function(){let ctx,roll,rollG;
function init(){if(ctx)return;ctx=new (window.AudioContext||window.webkitAudioContext)();
const b=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
roll=ctx.createBufferSource();roll.buffer=b;roll.loop=true;const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=500;rollG=ctx.createGain();rollG.gain.value=0;roll.connect(f);f.connect(rollG);rollG.connect(ctx.destination);roll.start()}
['keydown','pointerdown'].forEach(e=>addEventListener(e,()=>{init();ctx.resume()}));
function tone(f1,f2,d,type,v){if(!ctx)return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+d)}
return{laser(){tone(1500,200,0.15,'sawtooth',0.1)},squash(){tone(600,120,0.2,'sawtooth',0.15);setTimeout(()=>tone(900,1400,0.1,'square',0.1),120)},jump(){tone(300,900,0.18,'square',0.15)},land(){tone(180,60,0.12,'triangle',0.4)},rolling(speed,on){if(rollG)rollG.gain.setTargetAtTime(on?Math.min(Math.abs(speed)/8,1)*0.12:0,ctx.currentTime,0.05)}}})();
