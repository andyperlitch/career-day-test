window.drawSky=function(x,camX,camY){const px=-camX*0.15,py=-camY*0.1;
const C=[
{n:'Big Dipper',o:[150,90],s:[[0,0],[40,10],[75,25],[105,45],[110,85],[160,90],[165,50]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
{n:'Orion',o:[560,40],s:[[0,0],[70,10],[25,60],[35,62],[45,64],[5,120],[80,115],[35,-25]],l:[[7,0],[7,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]]},
{n:'Cassiopeia',o:[1000,70],s:[[0,0],[30,40],[60,15],[95,45],[125,5]],l:[[0,1],[1,2],[2,3],[3,4]]},
{n:'Little Dipper',o:[1450,60],s:[[0,0],[30,15],[55,35],[80,50],[85,85],[120,85],[115,50]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
{n:'Leo',o:[1900,90],s:[[0,0],[20,-25],[45,-35],[60,-15],[45,10],[30,40],[110,30],[120,60]],l:[[0,1],[1,2],[2,3],[0,4],[4,5],[5,7],[7,6],[6,4]]}];
x.save();x.translate(px,py);
for(const c of C){x.strokeStyle='rgba(150,190,255,.5)';x.lineWidth=1.5;x.beginPath();for(const[a,b]of c.l){x.moveTo(c.o[0]+c.s[a][0],c.o[1]+c.s[a][1]);x.lineTo(c.o[0]+c.s[b][0],c.o[1]+c.s[b][1])}x.stroke();
x.fillStyle='#fff8c0';for(const s of c.s){x.beginPath();x.arc(c.o[0]+s[0],c.o[1]+s[1],3.2,0,7);x.fill()}
x.fillStyle='rgba(200,220,255,.8)';x.font='14px system-ui';x.textAlign='left';x.fillText(c.n,c.o[0],c.o[1]+(c.n==='Orion'?150:120))}
function pl(X,Y,r,col,n){x.fillStyle=col;x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.fillStyle='rgba(255,255,255,.75)';x.font='14px system-ui';x.textAlign='center';x.fillText(n,X,Y+r+18)}
pl(380,200,28,'#2e7dd7','Earth');x.fillStyle='#3cb371';x.beginPath();x.arc(372,192,10,0,7);x.arc(390,210,7,0,7);x.fill();
pl(820,230,18,'#d2542d','Mars');
pl(1250,210,45,'#d9a066','Jupiter');x.strokeStyle='#a0522d';x.lineWidth=4;for(const d of[-15,0,14]){x.beginPath();x.moveTo(1208,210+d);x.lineTo(1292,210+d);x.stroke()}x.fillStyle='#b5442a';x.beginPath();x.ellipse(1265,222,8,5,0,0,7);x.fill();
pl(1700,220,30,'#e8d08a','Saturn');x.strokeStyle='#c9b27a';x.lineWidth=5;x.beginPath();x.ellipse(1700,220,55,13,-0.3,0,7);x.stroke();
x.restore()};
