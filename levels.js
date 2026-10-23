// Space Skater levels: 10 levels, each longer/harder. Jump: ~160px high, ~6.9px/frame top speed.
window.LEVELS=(function(){
function rng(s){return function(){s=(s*9301+49297)%233280;return s/233280}}
const TYPES=[[1,'walker'],[3,'hopper'],[5,'saucer'],[6,'chaser'],[8,'big']];
function build(n){
  if(n===1){ // classic level, same as the original game
    const plats=[[0,480,650],[760,480,450],[1300,400,200],[1560,480,2000],[1950,400,150],[2120,315,150],[2290,230,150],[2460,145,150],[2630,60,150],[2800,-25,150],[2970,-110,150],[3140,-195,150],[3310,-280,300]];
    return{n,plats,goal:{x:3420,y:-430},end:3700,mtn:[1900,3460,-280],aliens:[{t:'walker',x:900,y:480,min:780,max:1190,s:1},{t:'walker',x:1650,y:480,min:1580,max:1900,s:1}]};
  }
  const r=rng(n*7919),plats=[[0,480,650]],aliens=[],avail=TYPES.filter(t=>t[0]<=n).map(t=>t[1]);
  const spd=1+(n-1)*0.1;let cx=650,cy=480;const segs=Math.round(2+n*1.6);
  for(let i=0;i<segs;i++){
    const floating=n>=3&&r()<0.25+n*0.03;
    let ny=cy;
    if(floating||n>=4&&r()<0.4)ny=cy-Math.round(30+r()*Math.min(25+n*6,85)); // step up
    else if(r()<0.5)ny=cy+Math.round(r()*120);
    ny=Math.max(200,Math.min(480,ny));
    const rise=cy-ny;
    const gap=Math.round(rise>0?Math.min(70+n*5+r()*30,130):Math.min(100+n*10+r()*30,210));
    const w=floating?Math.round(150+r()*60):Math.round(380+r()*250+n*15);
    cx+=gap;plats.push([cx,ny,w]);
    if(w>=350){ // aliens live on wide platforms
      const cnt=Math.min(1+Math.floor(r()*(1+n/4)),3);
      for(let k=0;k<cnt;k++){const t=avail[Math.floor(r()*avail.length)];const seg=w/cnt;
        aliens.push({t,x:cx+seg*k+seg*0.5,y:ny,min:cx+seg*k+10,max:cx+seg*(k+1)-10,s:spd})}
    }else if(avail.includes('saucer')&&r()<0.5){aliens.push({t:'saucer',x:cx,y:ny,min:cx-gap,max:cx+w+60,s:spd})}
    cx+=w;cy=ny;
  }
  // run-up to the mountain
  cx+=Math.round(100+n*6);cy=480;const runW=500;plats.push([cx,cy,runW]);
  aliens.push({t:avail[Math.min(avail.length-1,Math.floor(r()*avail.length))],x:cx+250,y:cy,min:cx+120,max:cx+runW-40,s:spd});
  cx+=runW-110;
  const steps=8+n,rise=Math.min(85+n*2,104),sgap=Math.min(20+n*3,50),sw=Math.max(150-n*3,120);
  const mStart=cx-350;
  for(let i=0;i<steps;i++){cx+=(i?sw:110)+(i?sgap:0)-(i?0:110)+(i?0:sgap);cy-=rise;plats.push([cx,cy,i===steps-1?300:sw]);
    if(avail.includes('saucer')&&i%4===2&&i<steps-2)aliens.push({t:'saucer',x:cx,y:cy,min:cx-120,max:cx+260,s:spd*0.8});}
  const top=plats[plats.length-1];
  return{n,plats,goal:{x:top[0]+110,y:top[1]-150},end:top[0]+top[2]+300,mtn:[mStart,top[0]+150,top[1]],aliens};
}
const L=[];for(let i=1;i<=10;i++)L.push(build(i));return L})();
