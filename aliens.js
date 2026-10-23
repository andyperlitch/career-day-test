// Alien types: walker, hopper, saucer, chaser, big. Each: init, move, draw.
window.ALIENS=(function(){
const T={
 walker:{w:40,h:40,hp:1,col:'#7CFC00',init(a){a.d=(1.6+Math.random())*a.s},
  move(a){a.x+=a.d;if(a.x<a.min||a.x>a.max-a.w)a.d*=-1;a.y=a.by+Math.sin(Date.now()/200+a.min)*3},
  draw(x,a){x.fillStyle='#7CFC00';x.beginPath();x.ellipse(a.x+20,a.y+24,20,16,0,0,7);x.fill();x.fillRect(a.x+8,a.y-4,4,12);x.fillRect(a.x+28,a.y-4,4,12);
   x.fillStyle='#000';x.beginPath();x.arc(a.x+13,a.y+20,5,0,7);x.arc(a.x+27,a.y+20,5,0,7);x.fill()}},
 hopper:{w:40,h:40,hp:1,col:'#c158ff',init(a){a.d=1.2*a.s;a.vy=0;a.hy=0;a.wait=Math.random()*60},
  move(a){a.x+=a.d;if(a.x<a.min||a.x>a.max-a.w)a.d*=-1;if(a.hy>=0&&a.vy>=0){a.hy=0;a.vy=0;if(--a.wait<0){a.vy=-9-a.s;a.wait=40}}else{a.vy+=0.5;a.hy+=a.vy;if(a.hy>0)a.hy=0}a.y=a.by+a.hy},
  draw(x,a){const sq=a.hy===0?4:-3;x.fillStyle='#c158ff';x.beginPath();x.ellipse(a.x+20,a.y+24+sq/2,20+sq,16-sq,0,0,7);x.fill();
   x.fillRect(a.x+6,a.y+34,8,8);x.fillRect(a.x+26,a.y+34,8,8);x.fillStyle='#fff';x.beginPath();x.arc(a.x+20,a.y+18,8,0,7);x.fill();x.fillStyle='#000';x.beginPath();x.arc(a.x+20,a.y+19,4,0,7);x.fill()}},
 saucer:{w:56,h:30,hp:1,col:'#40e0d0',init(a){a.d=1.8*a.s;a.ph=Math.random()*6;a.by-=130},
  move(a){a.x+=a.d;if(a.x<a.min||a.x>a.max-a.w)a.d*=-1;a.ph+=0.05*a.s;a.y=a.by+Math.sin(a.ph)*55},
  draw(x,a){x.fillStyle='rgba(160,255,240,.8)';x.beginPath();x.arc(a.x+28,a.y+12,13,Math.PI,0);x.fill();x.fillStyle='#7CFC00';x.beginPath();x.arc(a.x+28,a.y+10,5,0,7);x.fill();
   x.fillStyle='#9aa';x.beginPath();x.ellipse(a.x+28,a.y+18,28,9,0,0,7);x.fill();
   for(let i=0;i<4;i++){x.fillStyle=(Date.now()/150+i|0)%2?'#ffeb3b':'#ff5722';x.beginPath();x.arc(a.x+10+i*12,a.y+19,3,0,7);x.fill()}}},
 chaser:{w:40,h:36,hp:1,col:'#ff3b3b',init(a){a.d=1*a.s;a.v=a.d},
  move(a,p){const dx=p.x-a.x,near=Math.abs(dx)<320&&Math.abs(p.y-a.y)<160;a.mad=near;
   const target=near?Math.sign(dx)*(2.6+a.s*0.9):(a.d>0?1:-1)*a.s;a.v+=(target-a.v)*0.06;a.x+=a.v;
   if(a.x<a.min){a.x=a.min;a.v=Math.abs(a.v);a.d=1}if(a.x>a.max-a.w){a.x=a.max-a.w;a.v=-Math.abs(a.v);a.d=-1}a.y=a.by+4},
  draw(x,a){x.fillStyle=a.mad?'#ff1744':'#d32f2f';x.beginPath();x.moveTo(a.x,a.y+36);x.lineTo(a.x+20,a.y);x.lineTo(a.x+40,a.y+36);x.fill();
   x.fillStyle='#ff0';x.beginPath();x.arc(a.x+14,a.y+24,4,0,7);x.arc(a.x+26,a.y+24,4,0,7);x.fill();
   x.strokeStyle='#000';x.lineWidth=2;x.beginPath();x.moveTo(a.x+9,a.y+17);x.lineTo(a.x+18,a.y+21);x.moveTo(a.x+31,a.y+17);x.lineTo(a.x+22,a.y+21);x.stroke()}},
 big:{w:64,h:64,hp:3,col:'#ff9800',init(a){a.d=0.8*a.s},
  move(a){a.x+=a.d;if(a.x<a.min||a.x>a.max-a.w)a.d*=-1;a.y=a.by+Math.abs(Math.sin(Date.now()/300))*-4;if(a.flash)a.flash--},
  draw(x,a){x.fillStyle=a.flash?'#fff':'#ff9800';x.beginPath();x.ellipse(a.x+32,a.y+36,32,28,0,0,7);x.fill();x.fillRect(a.x+8,a.y+56,14,8);x.fillRect(a.x+42,a.y+56,14,8);
   x.fillStyle='#5d4037';x.fillRect(a.x+12,a.y+2,6,14);x.fillRect(a.x+46,a.y+2,6,14);x.fillStyle='#000';x.beginPath();x.arc(a.x+22,a.y+30,6,0,7);x.arc(a.x+42,a.y+30,6,0,7);x.fill();
   x.fillStyle='#fff';x.fillRect(a.x+20,a.y+46,6,6);x.fillRect(a.x+38,a.y+46,6,6);
   for(let i=0;i<3;i++){x.fillStyle=i<a.hp?'#e50914':'#444';x.fillRect(a.x+14+i*13,a.y-10,10,5)}}}
};
function make(d){const t=T[d.t],a={t:d.t,x:d.x,min:d.min,max:d.max,s:d.s||1,w:t.w,h:t.h,hp:t.hp,col:t.col};a.by=d.y-t.h;a.y=a.by;t.init(a);return a}
return{T,make,move(a,p){T[a.t].move(a,p)},draw(x,a){T[a.t].draw(x,a)}}})();
