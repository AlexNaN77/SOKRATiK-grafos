/* ================= MOTOR DE LA PRESENTACIÓN ================= */
const SECN=['Intro','5.1 Básicos','5.2 Tipos','5.3 Formas','5.4 Recorridos','5.5 Árboles','5.6 Generador','5.7 DFS','5.8 Prim/Kruskal','5.9 Usos','Cierre'];
const SECT=['Teoría de Grafos','Elementos básicos','Tipos y propiedades','Representación','Recorrido y búsqueda','Árboles','Árboles generadores','DFS a detalle','Prim y Kruskal','Aplicaciones reales','Cierre y repaso'];
const SECW=['00','5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9','FIN'];
const stage=$('#stage'),slidesEl=$('#slides');let cur=0,step=0,busy=false,wipeOn=true,curEl=null,started=false,wm=0,TT=0;
$('#prog').innerHTML=SECN.map((n,i)=>`<div>${n}</div>`).join('');
function arm(root){requestAnimationFrame(()=>requestAnimationFrame(()=>$$('.a,.fd,.pop,.gr,.grx,.dr,.ahd,.cnt',root).forEach(e=>{const p=e.closest('[data-s]');if(p&&!p.classList.contains('on'))return;if(e.classList.contains('go'))return;e.classList.add('go');if(e.classList.contains('cnt'))tween(e,+e.dataset.to,v=>(e.dataset.f||'')+fN(v),1600)})))}
function setStep(n){step=n;$$('[data-s]',curEl).forEach(e=>e.classList.toggle('on',+e.dataset.s<=n));S[cur].onStep&&S[cur].onStep(curEl,n);arm(curEl);hud()}
function render(i,dir){const s=S[i],el=document.createElement('section');el.className='slide'+(dir<0?' back':'');el.innerHTML=s.html();if(s.lab)el.insertAdjacentHTML('beforeend','<div class="skip noadv"><span class="btn" data-act="skip">Saltar lab <kbd>S</kbd> ⏭</span></div>');slidesEl.appendChild(el);
 if(curEl){const o=curEl;o.classList.remove('in');o.classList.add('out');if(o._au){clearInterval(o._au);o._au=0}setTimeout(()=>o.remove(),650)}curEl=el;cur=i;step=dir<0?s.steps:0;
 requestAnimationFrame(()=>requestAnimationFrame(()=>{el.classList.remove('back');el.classList.add('in');try{s.init&&s.init(el)}catch(err){console.error('init',i+1,err)}setStep(step)}));morph();history.replaceState(null,'','#'+(i+1))}
function wipe(s,cb){const w=$('#wipe');w.dataset.m=(wm=wm?0:2);
 $('.wn',w).textContent=SECW[s.sec];$('.ws',w).innerHTML=SECT[s.sec];$('.ww',w).textContent=s.role;
 w.className='on';setTimeout(()=>{cb();w.className='off';setTimeout(()=>{w.className='';busy=false},800)},1100)}
function go(i,dir){if(busy||i<0||i>=S.length)return;if(S[i].sec!==S[cur].sec&&wipeOn&&dir>0){busy=true;wipe(S[i],()=>render(i,dir))}else render(i,dir)}
const next=skip=>{started=true;if(!skip&&step<S[cur].steps)setStep(step+1);else go(cur+1,1)},prev=()=>step>0?setStep(step-1):go(cur-1,-1);
/* auto-reproducción de los pasos de una diapositiva (botones data-act="play" / "reset") */
function autoToggle(btn){const el=curEl;if(el._au){clearInterval(el._au);el._au=0;btn.textContent='▶ Auto';return}
 if(step>=S[cur].steps)setStep(0);btn.textContent='❚❚ Pausa';const ms=+btn.dataset.ms||900;
 el._au=setInterval(()=>{if(!el.isConnected){clearInterval(el._au);return}if(step>=S[cur].steps){clearInterval(el._au);el._au=0;btn.textContent='▶ Auto';return}setStep(step+1)},ms)}
function blob(cx,cy,r,sd){seed(sd);return cr([...Array(9)].map((_,k)=>{const a=k/9*6.283,q=r*(.75+R()*.5);return[cx+Math.cos(a)*q,cy+Math.sin(a)*q]}))}
function cr(p){const n=p.length;let d=`M${F(p[0][0])} ${F(p[0][1])}`;for(let i=0;i<n;i++){const a=p[(i-1+n)%n],b=p[i],c=p[(i+1)%n],e=p[(i+2)%n];d+=`C${F(b[0]+(c[0]-a[0])/6)} ${F(b[1]+(c[1]-a[1])/6)} ${F(c[0]-(e[0]-b[0])/6)} ${F(c[1]-(e[1]-b[1])/6)} ${F(c[0])} ${F(c[1])}`}return d+'Z'}
function morph(){const s=cur*37+5;$('#b1').setAttribute('d',blob(1500+(cur%3)*90,240+(cur%4)*40,330,s));$('#b2').setAttribute('d',blob(300+(cur%4)*60,860-(cur%3)*50,280,s+11));$('#bg').style.transform=`translateX(${(cur%5-2)*-12}px)`}
function hud(){const s=S[cur];$('#who .r').textContent=s.role;$('#who .p').textContent=SECN[s.sec];$('#num').textContent=String(cur+1).padStart(2,'0')+' / '+S.length;
 $$('#prog div').forEach((d,i)=>{const ss=S.map((x,j)=>[x.sec,j]).filter(a=>a[0]===i).map(a=>a[1]),f=ss.length?Math.max(0,Math.min(1,(cur-ss[0]+1)/ss.length)):0;d.style.setProperty('--f',(i<s.sec?100:i===s.sec?f*100:0)+'%');d.classList.toggle('on',i===s.sec)});
 $('#notes').innerHTML=`<div class="w2">🎤 ${SECN[s.sec]} · ${s.role} · paso ${step}/${s.steps}</div>${s.notes}`;updT()}
function updT(){$('#tm').textContent=mmss(TT)}
setInterval(()=>{if(started){TT++;updT()}},1000);
let bl=0;(function boil(t){if(t-bl>83){bl=t;stage.dataset.b=(+stage.dataset.b+1)%4}requestAnimationFrame(boil)})(0);
function burst(x,y){const r=stage.getBoundingClientRect(),k=r.width/1920,b=document.createElement('div');b.className='burst';b.style.left=(x-r.left)/k+'px';b.style.top=(y-r.top)/k+'px';
 b.innerHTML=`<svg viewBox="-60 -60 120 120">${[...Array(8)].map((_,i)=>{const a=i/8*6.283,c=[C.yel,C.cy,C.mnt,C.pink][i%4];return`<path pathLength="1" d="M${(Math.cos(a)*18).toFixed(1)} ${(Math.sin(a)*18).toFixed(1)}L${(Math.cos(a)*50).toFixed(1)} ${(Math.sin(a)*50).toFixed(1)}" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none"/>`}).join('')}</svg>`;stage.appendChild(b);setTimeout(()=>b.remove(),650)}
stage.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b){if(b.dataset.act==='play')autoToggle(b);else if(b.dataset.act==='reset')setStep(0);else if(b.dataset.act==='skip')next(true);return}
 if(e.target.closest('input,.btn,a,.ix,.fc,select,textarea,.noadv'))return;burst(e.clientX,e.clientY);next(e.shiftKey)});
stage.addEventListener('contextmenu',e=>{e.preventDefault();prev()});
addEventListener('keydown',e=>{const s=S[cur];if(e.target&&e.target.tagName==='INPUT'&&e.key.startsWith('Arrow'))return;if(s.keys&&s.keys(e,curEl)){e.preventDefault();return}const k=e.key;
 if(['ArrowRight',' ','PageDown','Enter'].includes(k)){e.preventDefault();next(e.shiftKey)}else if(['ArrowLeft','PageUp','Backspace'].includes(k)){e.preventDefault();prev()}
 else if(k==='Home')go(0,-1);else if(k==='End')go(S.length-1,-1);else if(k==='f'||k==='F')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
 else if(k==='n'||k==='N')$('#notes').classList.toggle('o');else if(k==='h'||k==='H')$('#help').classList.toggle('o');else if(k==='b'||k==='B')document.body.classList.toggle('nob');else if(k==='g'||k==='G')document.body.classList.toggle('nog');else if(k==='w'||k==='W')wipeOn=!wipeOn;
 else if(k==='r'||k==='R'){TT=0;updT()}else if((k==='s'||k==='S')&&s.lab)next(true)});
addEventListener('mousemove',e=>{const r=$('#masc').getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1;$('#eyes').setAttribute('transform',`translate(${F(dx/d*2.4)} ${F(dy/d*2)})`)});
const fit=()=>stage.style.setProperty('--k',Math.min(innerWidth/1920,innerHeight/1080));addEventListener('resize',fit);fit();
const t0=$('#toast');t0.textContent='Clic en el fondo o → para avanzar · ← regresar · H ayuda · los laboratorios se tocan con el mouse';t0.classList.add('o');setTimeout(()=>t0.classList.remove('o'),4500);
const h0=parseInt(location.hash.slice(1))||parseInt(new URLSearchParams(location.search).get('s'));render(h0>0&&h0<=S.length?h0-1:0,1);
