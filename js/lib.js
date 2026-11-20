/* ================= SOCRATiK · lib ================= */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
let _s=1;const seed=n=>{_s=Math.abs(Math.round(n))%2147483646+1},R=()=>(_s=_s*16807%2147483647)/2147483647,J=a=>(R()-.5)*2*a,F=n=>(+n).toFixed(1);
const fN=n=>Math.round(n).toLocaleString('es-MX'),mmss=t=>`${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;
const C={ink:'#F4F1E8',ink2:'#B9C4DE',mute:'#7F92BA',bg:'#0E1B38',bg2:'#162B54',bg3:'#223F78',yel:'#FFD23F',cor:'#FF6B5B',mnt:'#3DDC97',vio:'#B79CFF',cy:'#5CC8FF',pink:'#FF8FC7'};
const PAL=['c1','c2','c3','c4','c5','c6','c7'],PALC=[C.cy,C.pink,C.mnt,C.vio,'#FF9F43','#2EC4B6','#C7F464'];
const S=[];const add=o=>S.push(Object.assign({steps:0,sec:0,role:'',notes:''},o));
/* título animado palabra por palabra: *énfasis* y "/" = salto de línea */
function W(t){let i=0;return t.split(' ').map(w=>{if(w==='/')return'<br>';const e=w[0]==='*';w=w.replace(/\*/g,'');return`<span class="w"><span style="--i:${i++}">${e?'<em>'+w+'</em>':w}</span></span>`}).join(' ')}
const hd=(n,k,t,sub)=>`<div class="kick a"><b>${n}</b>${k}</div><h1 class="h1">${W(t)}</h1>${sub?`<p class="sub a" style="--d:.45s">${sub}</p>`:''}`;
function tween(el,to,fmt,ms=800){if(!el)return;const from=+(el.dataset.v||0);el.dataset.v=to;const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-k,4);el.textContent=fmt(from+(to-from)*e);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const replay=(e,c)=>{if(!e)return;e.classList.remove(c);void e.getBoundingClientRect();e.classList.add(c)};
/* intervalo que se autodestruye cuando la diapositiva se va */
function every(el,ms,fn){const id=setInterval(()=>{if(!el.isConnected){clearInterval(id);return}fn()},ms);return id}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* punto del SVG a partir de un evento del mouse (funciona con el escalado del escenario) */
function svgPt(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
/* traducción rápida: chip punteado */
const tr=(en,es)=>`<span class="tr">${en} <b>= ${es}</b></span>`;

/* ================= Grafo SVG con boil ================= */
const AH=20,ST=['vis','cur','fr','c1','c2','c3','c4','c5','c6','c7','bad','hl','sel','dim','on','rej'];
class Gr{
 constructor(id,o){this.id=id+'_'+(Gr.u=(Gr.u||0)+1);this.o=Object.assign({r:30,vb:[1000,620],ah:true,dir:true,anim:true,int:false,d0:0,sub:{},lbl:{}},o);if(o.dir===false&&o.ah===undefined)this.o.ah=false;
  this.nodes=Object.keys(o.nodes);this.P={};this.nodes.forEach(k=>this.P[k]=[o.nodes[k][0],o.nodes[k][1]]);this.B={};
  this.E=o.edges.map((e,i)=>Object.assign({i,a:e[0],b:e[1],w:e[2]},e[3]||{}))}
 get root(){return document.getElementById(this.id)}
 fin(d,t,v,mid){const L=Math.hypot(v[0],v[1])||1,ux=v[0]/L,uy=v[1]/L,bx=t[0]-ux*AH,by=t[1]-uy*AH,nx=-uy*AH*.46,ny=ux*AH*.46;
  return{d,mid,ahd:`M${F(t[0])} ${F(t[1])}L${F(bx+nx)} ${F(by+ny)}L${F(bx-nx)} ${F(by-ny)}Z`}}
 geom(e){const r=this.o.r,P=this.P,[x1,y1]=P[e.a],[x2,y2]=P[e.b];
  if(e.a===e.b){const a=(e.ang==null?-90:e.ang)*Math.PI/180,a1=a-.62,a2=a+.62,k=r*1.6+44,s=[x1+r*Math.cos(a1),y1+r*Math.sin(a1)],t=[x1+r*Math.cos(a2),y1+r*Math.sin(a2)],c1=[x1+k*Math.cos(a-.4),y1+k*Math.sin(a-.4)],c2=[x1+k*Math.cos(a+.4),y1+k*Math.sin(a+.4)];
   return this.fin(`M${F(s[0])} ${F(s[1])}C${F(c1[0])} ${F(c1[1])} ${F(c2[0])} ${F(c2[1])} ${F(t[0])} ${F(t[1])}`,t,[t[0]-c2[0],t[1]-c2[1]],[x1+(k*.78+8)*Math.cos(a),y1+(k*.78+8)*Math.sin(a)])}
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,c=e.c||0;
  if(!c){const s=[x1+ux*r,y1+uy*r],t=[x2-ux*r,y2-uy*r];return this.fin(`M${F(s[0])} ${F(s[1])}L${F(t[0])} ${F(t[1])}`,t,[ux,uy],[(s[0]+t[0])/2,(s[1]+t[1])/2])}
  const m=[(x1+x2)/2-uy*c*2,(y1+y2)/2+ux*c*2],n1=Math.hypot(m[0]-x1,m[1]-y1)||1,n2=Math.hypot(m[0]-x2,m[1]-y2)||1,s=[x1+(m[0]-x1)/n1*r,y1+(m[1]-y1)/n1*r],t=[x2+(m[0]-x2)/n2*r,y2+(m[1]-y2)/n2*r];
  return this.fin(`M${F(s[0])} ${F(s[1])}Q${F(m[0])} ${F(m[1])} ${F(t[0])} ${F(t[1])}`,t,[t[0]-m[0],t[1]-m[1]],[.25*s[0]+.5*m[0]+.25*t[0],.25*s[1]+.5*m[1]+.25*t[1]])}
 eh(e){const g=this.geom(e),o=this.o,d=o.d0+e.i*.07;
  return`<g class="ge${e.x?' xtra':''}" data-i="${e.i}"><path class="hit" d="${g.d}"/><path class="ln${o.anim?' dr':''}" ${o.anim?`pathLength="1" `:''}style="--d:${d}s" d="${g.d}"/>${o.ah?`<path class="ah${o.anim?' ahd':''}" style="--d:${d}s" d="${g.ahd}"/>`:''}${e.w!=null?`<text class="we${o.anim?' fd':''}" style="--d:${d+.5}s" x="${F(g.mid[0])}" y="${F(g.mid[1])}">${e.w}</text>`:''}${e.lbl?`<text class="el${o.anim?' fd':''}" style="--d:${d+.5}s" x="${F(g.mid[0])}" y="${F(g.mid[1])}">${e.lbl}</text>`:''}</g>`}
 nh(k,i){const[x,y]=this.P[k],o=this.o,d=o.d0+.2+i*.08,l=o.lbl[k]!=null?o.lbl[k]:k;
  return`<g class="nd${o.anim?' pop':''}" data-n="${k}" style="--d:${d}s"><circle class="nc" cx="${F(x)}" cy="${F(y)}" r="${o.r}"/><text class="nt" x="${F(x)}" y="${F(y+1)}"${o.fs?` style="font-size:${o.fs}px"`:''}>${l}</text></g>`}
 html(){const o=this.o,[W_,H]=o.vb;
  return`<svg id="${this.id}" class="gsvg${o.int?' int ix':''}${o.dir?'':' nodir'}" viewBox="0 0 ${W_} ${H}" width="${o.width||W_}" height="${o.height||H}"><g class="boil">${this.E.map(e=>this.eh(e)).join('')}${this.nodes.map((k,i)=>this.nh(k,i)).join('')}</g><g class="gS">${this.nodes.filter(k=>o.sub[k]).map(k=>`<text class="nl${o.anim?' fd':''}" style="--d:${o.d0+.8}s" data-n="${k}" x="${F(this.P[k][0])}" y="${F(this.P[k][1]+o.r+26)}">${o.sub[k]}</text>`).join('')}</g><g class="gB"></g></svg>`}
 redraw(){const R_=this.root;if(!R_)return;
  this.E.forEach(e=>{const g=this.geom(e),el=R_.querySelector(`.ge[data-i="${e.i}"]`);if(!el)return;const ps=el.querySelectorAll('path');ps[0].setAttribute('d',g.d);ps[1].setAttribute('d',g.d);if(ps[2])ps[2].setAttribute('d',g.ahd);const t=el.querySelector('text');if(t){t.setAttribute('x',F(g.mid[0]));t.setAttribute('y',F(g.mid[1]))}});
  this.nodes.forEach(k=>{const[x,y]=this.P[k],n=R_.querySelector(`.nd[data-n="${k}"]`);if(!n)return;const c=n.firstChild,t=n.lastChild;c.setAttribute('cx',F(x));c.setAttribute('cy',F(y));t.setAttribute('x',F(x));t.setAttribute('y',F(y+1));const s=R_.querySelector(`.nl[data-n="${k}"]`);if(s){s.setAttribute('x',F(x));s.setAttribute('y',F(y+this.o.r+26))}});
  this.drawBd()}
 move(P2,ms=900,done){const P0={};this.nodes.forEach(k=>P0[k]=this.P[k].slice());const t0=performance.now();cancelAnimationFrame(this._m);
  const f=t=>{const k=Math.min(1,(t-t0)/ms),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;for(const n in P2){if(!P0[n]||!P2[n]){if(!this._w){this._w=1;console.warn('move: nodo sin posición',this.id,n,JSON.stringify(P2[n]))}continue}this.P[n]=[P0[n][0]+(P2[n][0]-P0[n][0])*e,P0[n][1]+(P2[n][1]-P0[n][1])*e]}this.redraw();if(k<1)this._m=requestAnimationFrame(f);else done&&done()};this._m=requestAnimationFrame(f)}
 N(k){const r=this.root;return r&&r.querySelector(`.nd[data-n="${k}"]`)}
 Ed(i){const r=this.root;return r&&r.querySelector(`.ge[data-i="${i}"]`)}
 reset(){const r=this.root;if(r)r.querySelectorAll('.nd,.ge').forEach(x=>x.classList.remove(...ST));return this}
 replayEdges(){const r=this.root;if(!r)return;const ps=[...r.querySelectorAll('.ln.dr,.ahd')];ps.forEach(p=>{p.style.transition='none';p.style.animation='none';p.classList.remove('go')});void r.getBoundingClientRect();ps.forEach(p=>{p.style.transition='';p.style.animation='';p.classList.add('go')})}
 cls(c,on=true){const r=this.root;r&&r.classList.toggle(c,on);return this}
 n(ids,c,on=true){[].concat(ids).forEach(k=>{const e=this.N(k);e&&e.classList.toggle(c,on)});return this}
 e(ids,c,on=true){[].concat(ids).forEach(i=>{const e=this.Ed(i);e&&e.classList.toggle(c,on)});return this}
 idx(a,b){const E=this.E.find(e=>!e.x&&((e.a===a&&e.b===b)||(!this.o.dir&&e.a===b&&e.b===a)));return E?E.i:-1}
 bd(k,t,dx=26,dy=-26){this.B[k]={t,dx,dy};this.drawBd();return this}
 bdClear(){this.B={};this.drawBd()}
 drawBd(){const r=this.root;if(!r)return;const g=r.querySelector('.gB');if(!g)return;g.innerHTML=Object.keys(this.B).map(k=>{const b=this.B[k],[x,y]=this.P[k],t=String(b.t),w=Math.max(30,t.length*12+18);return`<g class="bd" transform="translate(${F(x+b.dx)} ${F(y+b.dy)})"><rect x="${F(-w/2)}" y="-15" width="${w}" height="30" rx="15"/><text>${t}</text></g>`}).join('')}
}
/* ficha que camina por una ruta de nodos (paquete, coche, jugador…) */
function walker(g,path,o={}){const svg=g.root;if(!svg||path.length<2)return()=>{};const ns='http://www.w3.org/2000/svg',c=document.createElementNS(ns,'circle');c.setAttribute('r',o.r||11);c.setAttribute('fill',o.color||C.yel);c.setAttribute('stroke',C.bg);c.setAttribute('stroke-width',3);c.style.pointerEvents='none';svg.appendChild(c);
 let t0=performance.now(),dead=false;const seg=o.ms||800,n=path.length-1;
 const f=t=>{if(dead||!svg.isConnected){c.remove();return}let k=(t-t0)/seg;if(k>=n){if(o.loop===false){const p=g.P[path[n]];c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);o.done&&o.done();return}t0=t+(o.gap||250);k=0}if(k<0)k=0;
  const i=Math.floor(k),u=k-i,e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,a=g.P[path[i]],b=g.P[path[i+1]];c.setAttribute('cx',a[0]+(b[0]-a[0])*e);c.setAttribute('cy',a[1]+(b[1]-a[1])*e);requestAnimationFrame(f)};
 requestAnimationFrame(f);return()=>{dead=true;c.remove()}}
/* grados (entrada/salida) */
function degs(g,list){const d={};g.nodes.forEach(k=>d[k]={i:0,o:0,t:0});(list||g.E.filter(e=>!e.x)).forEach(e=>{d[e.a].o++;d[e.b].i++;if(e.a===e.b){d[e.a].t+=2}else{d[e.a].t++;d[e.b].t++}});return d}
/* ficha que vuela de un punto a otro y se desvanece (paquetes, +1, manos…) */
function fly(g,a,b,o={}){const svg=g.root;if(!svg)return;const ns='http://www.w3.org/2000/svg',c=document.createElementNS(ns,o.txt?'text':'circle');
 if(o.txt){c.textContent=o.txt;c.setAttribute('style',`font:800 26px var(--disp);fill:${o.color||C.yel};text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke:${C.bg};stroke-width:6px;pointer-events:none`)}else{c.setAttribute('r',o.r||8);c.setAttribute('fill',o.color||C.yel);c.setAttribute('stroke',C.bg);c.setAttribute('stroke-width',2.5);c.style.pointerEvents='none'}
 svg.appendChild(c);const t0=performance.now(),ms=o.ms||700,lift=o.lift||0;
 const f=t=>{if(!svg.isConnected){c.remove();return}const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,x=a[0]+(b[0]-a[0])*e,y=a[1]+(b[1]-a[1])*e-Math.sin(k*Math.PI)*lift;
  c.setAttribute(o.txt?'x':'cx',x);c.setAttribute(o.txt?'y':'cy',y);c.style.opacity=k>.82?(1-k)/.18:1;if(k<1)requestAnimationFrame(f);else{c.remove();o.done&&o.done()}};requestAnimationFrame(f)}
/* onda expansiva sobre un nodo */
function rip(g,k,color){const svg=g.root;if(!svg||!g.P[k])return;const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',g.P[k][0]);c.setAttribute('cy',g.P[k][1]);c.setAttribute('r',g.o.r);c.setAttribute('class','rip');if(color)c.style.stroke=color;svg.appendChild(c);setTimeout(()=>c.remove(),1000)}
/* reproductor paso a paso: ⏮ ◀ ▶Auto ▶| + barra. draw(i) dibuja el cuadro i */
function player(host,n,draw,o={}){let i=0,id=0;const ms=o.ms||950;
 host.classList.add('noadv');host.innerHTML=`<div class="pl"><span class="btn" data-a="rs" title="Inicio">⏮</span><span class="btn" data-a="pv" title="Paso atrás">◀</span><span class="btn p" data-a="pl">▶ Auto</span><span class="btn" data-a="nx" title="Paso adelante">▶|</span><input type="range" min="0" max="${n-1}" value="0"><span class="tag" data-r></span></div>`;
 const rg=$('input',host),pb=$('[data-a=pl]',host),lab=$('[data-r]',host);
 const go=k=>{i=Math.max(0,Math.min(n-1,k));rg.value=i;lab.textContent=`paso ${i}/${n-1}`;draw(i)};
 const stop=()=>{if(id){clearInterval(id);id=0}pb.textContent='▶ Auto'};
 const play=()=>{if(id){stop();return}if(i>=n-1)go(0);pb.textContent='❚❚ Pausa';id=setInterval(()=>{if(!host.isConnected){clearInterval(id);return}if(i>=n-1){stop();return}go(i+1)},ms)};
 host.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(a==='pl')play();else{stop();go(a==='rs'?0:a==='pv'?i-1:i+1)}};
 rg.oninput=()=>{stop();go(+rg.value)};go(0);if(o.auto)setTimeout(()=>{if(host.isConnected&&!id)play()},o.auto);return{go,play,stop,get i(){return i}}}
/* aplica una "foto" {n:{id:clase},e:{i:clase},b:{id:texto}} al grafo */
function snap(g,s){g.reset();g.bdClear();if(!s)return;for(const k in s.n||{})[].concat(s.n[k]).forEach(c=>g.n(k,c));for(const i in s.e||{})[].concat(s.e[i]).forEach(c=>g.e(+i,c));for(const k in s.b||{})g.bd(k,s.b[k])}
/* ====== laboratorio: clic en 2 nodos = alternar arista (el grafo debe traer TODAS las aristas posibles) ====== */
function pg(g,o={}){const root=g.root;let sel=null;
 const isOn=i=>!g.Ed(i).classList.contains('off');
 const api={on:isOn,list:()=>g.E.filter(e=>isOn(e.i)),
  toggle(i){if(i<0)return;g.Ed(i).classList.toggle('off');o.onChange&&o.onChange(api)},
  set(pairs){g.E.forEach(e=>g.Ed(e.i).classList.add('off'));pairs.forEach(p=>{const i=g.idx(p[0],p[1]);if(i>=0)g.Ed(i).classList.remove('off')});o.onChange&&o.onChange(api)},
  clear(){api.set([])}};
 root.addEventListener('click',ev=>{const nd=ev.target.closest('.nd'),ed=ev.target.closest('.ge');
  if(nd){const k=nd.dataset.n;if(sel===null){sel=k;g.n(k,'sel')}else if(sel===k){g.n(k,'sel',false);sel=null}else{g.n(sel,'sel',false);const a=sel;sel=null;api.toggle(g.idx(a,k))}}
  else if(ed&&isOn(+ed.dataset.i))api.toggle(+ed.dataset.i)});
 return api}
/* todas las aristas posibles entre n nodos (no dirigido) */
const allPairs=ks=>{const r=[];for(let i=0;i<ks.length;i++)for(let j=i+1;j<ks.length;j++)r.push([ks[i],ks[j],null]);return r};
/* posiciones en círculo */
const circ=(ks,cx,cy,rx,ry,a0=-90)=>{const P={};ks.forEach((k,i)=>{const a=(a0+i*360/ks.length)*Math.PI/180;P[k]=[cx+rx*Math.cos(a),cy+(ry||rx)*Math.sin(a)]});return P};
/* layout de árbol desde una raíz */
function treeLayout(nodes,adj,root,x0,x1,y0,dy){const kids={},depth={},par={};const order=[];depth[root]=0;par[root]=null;
 (function rec(u){order.push(u);kids[u]=[];adj[u].forEach(p=>{const v=p[0];if(!(v in depth)){depth[v]=depth[u]+1;par[v]=u;kids[u].push(v);rec(v)}})})(root);
 let leaf=0;const xs={},nl=order.filter(u=>!kids[u].length).length;
 (function pos(u){if(!kids[u].length){xs[u]=leaf++;return}kids[u].forEach(pos);xs[u]=(xs[kids[u][0]]+xs[kids[u][kids[u].length-1]])/2})(root);
 const P={};nodes.forEach(k=>{if(k in depth)P[k]=[x0+(nl>1?xs[k]/(nl-1):.5)*(x1-x0),y0+depth[k]*dy]});return{P,kids,par,depth}}
/* ====== algoritmos de apoyo ====== */
function adjOf(g,dir,all){if(dir==null)dir=g.o.dir;const A={};g.nodes.forEach(k=>A[k]=[]);g.E.forEach(e=>{if(e.x&&!all)return;A[e.a].push([e.b,e.i]);if(!dir&&e.a!==e.b)A[e.b].push([e.a,e.i])});g.nodes.forEach(k=>A[k].sort((p,q)=>g.nodes.indexOf(p[0])-g.nodes.indexOf(q[0])));return A}
class UF{constructor(n){this.p={};n.forEach(k=>this.p[k]=k)}find(x){while(this.p[x]!==x){this.p[x]=this.p[this.p[x]];x=this.p[x]}return x}union(a,b){a=this.find(a);b=this.find(b);if(a===b)return false;this.p[b]=a;return true}}
/* componentes conexas: devuelve {nodo:idx} y la cantidad */
function comps(nodes,pairs){const u=new UF(nodes);pairs.forEach(p=>u.union(p[0],p[1]));const m={},ix={};let n=0;nodes.forEach(k=>{const r=u.find(k);if(!(r in ix))ix[r]=n++;m[k]=ix[r]});return{m,n}}
function dijkstra(nodes,edges,s,wf){const d={},p={},v={};nodes.forEach(k=>d[k]=Infinity);d[s]=0;for(;;){let u=null;nodes.forEach(k=>{if(!v[k]&&d[k]<Infinity&&(u===null||d[k]<d[u]))u=k});if(u===null)break;v[u]=1;edges.forEach(e=>{const w=wf?wf(e):e.w;[[e.a,e.b],[e.b,e.a]].forEach(([a,b])=>{if(a===u&&d[u]+w<d[b]){d[b]=d[u]+w;p[b]=[u,e.i]}})})}return{d,p}}
function pathTo(p,t){const ns=[t],es=[];while(p[ns[0]]){es.unshift(p[ns[0]][1]);ns.unshift(p[ns[0]][0])}return{ns,es}}
