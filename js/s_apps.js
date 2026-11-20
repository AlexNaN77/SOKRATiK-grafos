/* ============ 5.9 APLICACIONES REALES ============ */
const mstIdx=g=>{const u=new UF(g.nodes),r=[];g.E.filter(e=>!e.x).slice().sort((a,b)=>a.w-b.w||a.i-b.i).forEach(e=>{if(u.union(e.a,e.b))r.push(e.i)});return r};
function edgeBetw(nodes,edges){const adj={},eb={};nodes.forEach(k=>adj[k]=[]);edges.forEach(e=>{eb[e.i]=0;adj[e.a].push([e.b,e.i]);adj[e.b].push([e.a,e.i])});
 nodes.forEach(s=>{const sg={},ds={},pr={},ord=[],q=[s];nodes.forEach(k=>{sg[k]=0;ds[k]=-1;pr[k]=[]});sg[s]=1;ds[s]=0;
  while(q.length){const u=q.shift();ord.push(u);adj[u].forEach(([v,i])=>{if(ds[v]<0){ds[v]=ds[u]+1;q.push(v)}if(ds[v]===ds[u]+1){sg[v]+=sg[u];pr[v].push([u,i])}})}
  const dl={};nodes.forEach(k=>dl[k]=0);ord.reverse().forEach(w=>pr[w].forEach(([v,i])=>{const c=sg[v]/sg[w]*(1+dl[w]);eb[i]+=c;dl[v]+=c}))});
 Object.keys(eb).forEach(i=>eb[i]=Math.round(eb[i])/2);return eb}

/* 1 · PANORAMA: CINCO DISFRACES */
add((()=>{let G=[],stop=[];const T=[['GPS y Mapas','<b>Cruces</b> = nodos · <b>calles</b> = aristas con minutos','Dijkstra · A*','c'],['Redes sociales','<b>Personas</b> = nodos · <b>amistades</b> = aristas','BFS · comunidades','v'],['Internet y telecom.','<b>Routers</b> = nodos · <b>cables</b> = aristas','MST · enrutamiento','m'],['Compiladores y proyectos','<b>Tareas</b> = nodos · <b>dependencias</b> = flechas','DAG · orden topológico','r'],['IA y videojuegos','<b>Casillas</b> = nodos · <b>pasos</b> = aristas','BFS · A* (pathfinding)','c']];
const O={r:14,fs:12,vb:[330,190],width:330,height:190,d0:.1};
return{sec:9,steps:6,role:'Cinco disfraces',
notes:'El capítulo final: dónde viven los grafos. Cada tarjeta es el mismo objeto G=(V,E) con distinto disfraz. [→] GPS: la ruta más rápida (Dijkstra). [→] Redes sociales: amigos de amigos. [→] Internet: cableado óptimo con MST y enrutamiento. [→] Compiladores y gestión de proyectos: dependencias en un DAG. [→] IA y videojuegos: pathfinding sobre una cuadrícula. [→] Idea final: aprendiste UNA estructura para resolver CINCO industrias.',
html:()=>{G=[];
 G.push(new Gr('p1',{...O,dir:false,nodes:{a:[40,95],b:[120,30],c:[120,160],d:[220,50],e:[220,150],f:[300,95]},edges:[['a','b',4],['a','c',6],['b','d',5],['c','e',3],['d','f',4],['e','f',5],['b','c',2]]}));
 G.push(new Gr('p2',{...O,dir:false,nodes:{a:[50,50],b:[130,110],c:[60,150],d:[190,40],e:[250,120],f:[300,50]},edges:[['a','b'],['b','c'],['a','c'],['b','d'],['d','e'],['e','f'],['d','f']]}));
 G.push(new Gr('p3',{...O,dir:false,nodes:{a:[40,60],b:[130,30],c:[230,70],d:[80,150],e:[200,150],f:[300,130]},edges:[['a','b',3],['b','c',4],['a','d',2],['b','e',6],['c','f',5],['d','e',3],['e','f',7],['c','e',8]]}));
 G.push(new Gr('p4',{...O,nodes:{a:[40,95],b:[125,35],c:[125,155],d:[220,95],e:[300,95]},edges:[['a','b'],['a','c'],['b','d'],['c','d'],['d','e']]}));
 const lat={};'abcdefghijkl'.split('').forEach((k,i)=>lat[k]=[40+(i%4)*84,40+Math.floor(i/4)*55]);
 G.push(new Gr('p5',{...O,r:11,fs:11,dir:false,nodes:lat,edges:[['a','b'],['b','c'],['c','d'],['e','f'],['f','g'],['g','h'],['i','j'],['j','k'],['k','l'],['a','e'],['b','f'],['c','g'],['d','h'],['e','i'],['f','j'],['g','k'],['h','l']]}));
 const card=(i)=>`<div class="card tc ${T[i][3]}" style="padding:16px 22px"><div class="ant" style="font-size:36px;line-height:1">${i+1}. ${T[i][0]}</div><div style="font-size:19px;color:var(--ink2);margin:6px 0 2px;min-height:48px;line-height:1.25">${T[i][1]}</div>${G[i].html()}<div style="margin-top:4px"><span class="chip t" style="font-size:17px;margin:0">${T[i][2]}</span></div></div>`;
 return`${hd('5.9','Aplicaciones reales de la teoría de grafos','Un objeto, *cinco* industrias')}
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px 30px;margin-top:24px">${[0,1,2,3,4].map(card).join('')}<div class="card y tc" data-s="6" style="padding:22px 26px;display:grid;align-content:center"><div class="tag">la idea</div><div class="ant" style="font-size:56px;line-height:1;margin-top:6px">G = (V, E)</div><div style="font-size:24px;margin-top:10px">Un mismo dibujo. <b>Cinco</b> disfraces. Si entiendes <b>la estructura</b>, entiendes <b>todas</b> las industrias.</div></div></div>`},
init:()=>{G[3].n(['a','b','c','d','e'],'c1');G[4].n(['a'],'cur')},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];$$('.tc',el).forEach((c,i)=>{c.classList.toggle('dm',s>0&&s<6&&i+1!==s);c.classList.toggle('ac',i+1===s)});G.forEach(g=>{g.reset();g.bdClear()});
 if(s===1){const d=dijkstra(G[0].nodes,G[0].E,'a',e=>e.w),p=pathTo(d.p,'f');p.es.forEach(i=>G[0].e(i,'on'));p.ns.forEach(k=>G[0].n(k,'vis'));G[0].bd('f',d.d.f+' min',0,-26);stop.push(walker(G[0],p.ns,{ms:600,r:9}))}
 if(s===2){const g=G[1];g.n('b','cur');['a','c','d'].forEach(k=>g.n(k,'c1'));['e','f'].forEach(k=>g.n(k,'c2'));g.bd('e','¿lo conoces?',0,-28);loopEvery(el,1800,()=>{['a','c','d'].forEach(k=>fly(g,g.P.b,g.P[k],{ms:500,r:6,color:C.cy}));setTimeout(()=>fly(g,g.P.d,g.P.e,{ms:500,r:6,color:C.pink}),520);rip(g,'e',C.pink)},stop)}
 if(s===3){const g=G[2];mstIdx(g).forEach((i,k)=>setTimeout(()=>{g.e(i,'on');g.n([g.E[i].a,g.E[i].b],'vis');fly(g,g.P[g.E[i].a],g.P[g.E[i].b],{ms:400,r:6})},k*350+150))}
 if(s===4){const g=G[3];['a','b','c','d','e'].forEach((k,i)=>setTimeout(()=>{g.n(k,'c3');g.bd(k,i+1,0,-24);rip(g,k,C.mnt)},i*320))}
 if(s===5){const g=G[4],path=['a','b','f','j','k','l'];g.n('a','cur');g.n('l','sel');path.forEach(k=>g.n(k,'vis'));for(let i=0;i<path.length-1;i++)g.e(g.idx(path[i],path[i+1]),'on');stop.push(walker(g,path,{ms:420,r:8}))}}}})());

/* 2 · LAB GPS */
add((()=>{let g,jam=new Set(),dest='U',stop=[];return{sec:9,steps:0,lab:true,role:'Lab · GPS con tráfico',
notes:'LAB: Google Maps/Waze es un grafo ponderado: nodos = cruces, aristas = calles, pesos = minutos. El algoritmo (Dijkstra) busca el camino con menor suma de pesos. Haz clic en una CALLE para meter tráfico (el tiempo se triplica): mira cómo el coche cambia de ruta al instante, igual que Waze. Haz clic en un cruce para cambiar el destino. Ojo: BFS no sirve aquí porque minimiza número de calles, no minutos.',
html:()=>{g=new Gr('gp',{r:34,fs:17,vb:[900,520],width:880,height:508,dir:false,int:true,d0:.1,nodes:{H:[90,260],A:[280,90],B:[280,430],C:[490,260],D:[690,90],E:[690,430],U:[820,260]},lbl:{H:'Casa',U:'Uni'},
  edges:[['H','A',6],['H','B',4],['A','C',5],['B','C',9],['A','D',8],['C','D',4],['C','E',5],['B','E',12],['D','U',6],['E','U',4],['C','U',11]]});
 return`${hd('5.9','Lab · GPS','Waze es un *grafo ponderado* que respira')}
<div style="display:grid;grid-template-columns:880px 1fr;gap:40px;margin-top:-6px"><div>${g.html()}</div><div><div class="tag">clic en una calle = tráfico · clic en un cruce = destino</div>
<div id="gpR" style="margin-top:14px"></div><div class="read" id="gpM" style="min-height:112px;font-size:22px;margin-top:14px"></div>
<div class="row" style="gap:10px;margin-top:14px;flex-wrap:wrap"><span class="btn" id="gpC">🧹 Sin tráfico</span><span class="btn p" id="gpX">🚧 Tráfico aleatorio</span></div></div></div>`},
init:el=>{let last='';const draw=()=>{stop.forEach(f=>f());stop=[];const eff=e=>e.w*(jam.has(e.i)?3:1);g.reset();g.bdClear();
  g.E.forEach(e=>{const t=g.Ed(e.i).querySelector('.we');if(t)t.textContent=eff(e);if(jam.has(e.i))g.e(e.i,'bad')});
  const d=dijkstra(g.nodes,g.E,'H',eff),free=dijkstra(g.nodes,g.E,'H',e=>e.w),p=pathTo(d.p,dest),pf=pathTo(free.p,dest);g.n('H','cur');g.n(dest,'sel');p.ns.forEach(k=>{if(k!=='H'&&k!==dest)g.n(k,'vis')});p.es.forEach(i=>{if(!jam.has(i))g.e(i,'on')});g.bd(dest,d.d[dest]+' min',0,-54);
  const sig=p.ns.join('');const changed=last&&sig!==last;last=sig;
  $('#gpR',el).innerHTML=`<div class="rd"><span>Ruta ahora</span><b style="font-size:26px">${p.ns.map(k=>k==='H'?'Casa':k==='U'?'Uni':k).join(' → ')}</b></div><div class="rd"><span>Tiempo con tráfico</span><b>${d.d[dest]} min</b></div><div class="rd"><span>Sin tráfico serían</span><b class="mute">${free.d[dest]} min</b></div>`;
  $('#gpM',el).innerHTML=changed?`🔀 <b>¡Recalculando!</b> El tráfico hizo que otra ruta sea más rápida. Dijkstra vuelve a sumar los minutos de cada camino.`:jam.size?`${jam.size} calle(s) con tráfico. Cada <b>peso</b> se triplicó; la ruta mínima se reevalúa.`:'Sin tráfico: el camino mínimo es <b>'+free.d[dest]+' min</b>. Mete tráfico en las calles de la ruta y observa.';
  if(changed)replay(g.root,'shk');if(p.ns.length>1)stop.push(walker(g,p.ns,{ms:650,r:12,color:C.yel}))};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd'),ed=e.target.closest('.ge');if(nd){if(nd.dataset.n!=='H'){dest=nd.dataset.n;draw()}}else if(ed){const i=+ed.dataset.i;jam.has(i)?jam.delete(i):jam.add(i);draw()}});
 $('#gpC',el).onclick=()=>{jam.clear();draw()};$('#gpX',el).onclick=()=>{jam.clear();const n=2+Math.floor(Math.random()*3);while(jam.size<n)jam.add(Math.floor(Math.random()*g.E.length));draw()};draw()}}})());

/* 3 · LAB: AMIGOS DE AMIGOS */
add((()=>{let g,sel='D',stop=[];const N={A:'Ana',B:'Beto',C:'Cami',D:'Dani',E:'Eli',F:'Fer',G:'Gus',H:'Hugo',I:'Ire',J:'Jose'};
return{sec:9,steps:0,lab:true,role:'Lab · «gente que quizá conozcas»',
notes:'LAB: así recomienda amigos Instagram/Facebook. Es un recorrido BFS de profundidad 2: tus amigos (nivel 1) y los amigos de tus amigos (nivel 2) que NO son tus amigos. A cada candidato le cuentas cuántos amigos EN COMÚN tienes; el que más tiene, se sugiere primero. Haz clic en cualquier persona y mira cómo cambia. Pregunta: ¿por qué Gus aparece alto para Dani aunque estén en distintos grupos? (Tienen amigos en común: es el puente.)',
html:()=>{g=new Gr('sc',{r:34,fs:16,vb:[940,470],width:880,height:440,dir:false,int:true,d0:.1,lbl:N,nodes:{A:[90,150],B:[230,60],C:[230,260],D:[390,160],E:[400,360],F:[520,390],G:[560,140],H:[690,270],I:[820,120],J:[850,380]},
  edges:[['A','B'],['A','C'],['B','C'],['B','D'],['C','D'],['C','E'],['D','E'],['E','F'],['D','G'],['F','G'],['F','H'],['G','H'],['G','I'],['H','I'],['H','J'],['I','J']]});
 return`${hd('5.9','Lab · redes sociales','¿A quién te *sugiere* Instagram?')}
<div style="display:grid;grid-template-columns:880px 1fr;gap:40px;margin-top:-6px"><div>${g.html()}</div><div><div class="tag">clic en una persona</div>
<div class="row" style="gap:14px;margin:10px 0;font-size:19px"><span><i class="sw" style="background:var(--yel)"></i>tú</span><span><i class="sw" style="background:var(--cy)"></i>amigos</span><span><i class="sw" style="background:var(--pink)"></i>amigos de amigos</span></div>
<div id="scR"></div><div class="read" id="scM" style="min-height:96px;font-size:22px;margin-top:12px"></div></div></div>`},
init:el=>{const draw=()=>{stop.forEach(f=>f());stop=[];g.reset();g.bdClear();const A=adjOf(g,false),fr=A[sel].map(p=>p[0]),cnt={};fr.forEach(f=>A[f].forEach(([v])=>{if(v!==sel&&!fr.includes(v))cnt[v]=(cnt[v]||0)+1}));
  g.n(sel,'cur');fr.forEach(k=>g.n(k,'c1'));Object.keys(cnt).forEach(k=>{g.n(k,'c2');g.bd(k,cnt[k]+' en común',0,-52)});g.E.forEach(e=>{if(e.a===sel||e.b===sel)g.e(e.i,'on')});
  const rk=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
  $('#scR',el).innerHTML=`<div class="tag">sugerencias para ${N[sel]}</div>`+(rk.length?rk.map((k,i)=>`<div class="rd" style="${i===0?'background:rgba(255,210,63,.12);padding-left:10px':''}"><span>${i===0?'⭐ ':''}${N[k]}</span><b>${cnt[k]} en común</b></div>`).join(''):'<div class="rd"><span>Nadie nuevo cerca</span></div>');
  $('#scM',el).innerHTML=`BFS nivel 1: <b>${fr.map(k=>N[k]).join(', ')}</b>. Nivel 2: <b>${rk.length}</b> candidato(s). Se ordenan por <b>amigos en común</b>.`;
  rip(g,sel,C.yel);fr.forEach((k,i)=>setTimeout(()=>{fly(g,g.P[sel],g.P[k],{ms:450,r:7,color:C.cy});rip(g,k,C.cy)},i*140));setTimeout(()=>rk.forEach(k=>{const via=fr.find(f=>A[f].some(p=>p[0]===k));fly(g,g.P[via],g.P[k],{ms:500,r:6,color:C.pink});rip(g,k,C.pink)}),fr.length*140+450)};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd');if(nd){sel=nd.dataset.n;draw()}});draw()}}})());

/* 4 · LAB: COMUNIDADES (Girvan–Newman) */
add((()=>{let g,pl,frs;const N={A:'Ana',B:'Beto',C:'Cami',D:'Dani',E:'Eli',F:'Fer',G:'Gus',H:'Hugo',I:'Ire',J:'Jose'};
function mk(g){const ks=g.nodes,alive=g.E.map(e=>e.i),fr=[];const cm=()=>{const L=g.E.filter(e=>alive.includes(e.i));return comps(ks,L.map(e=>[e.a,e.b]))};
 for(let it=0;it<8;it++){const L=g.E.filter(e=>alive.includes(e.i)),eb=edgeBetw(ks,L),top=+Object.keys(eb).sort((a,b)=>eb[b]-eb[a])[0],c=cm();fr.push({alive:alive.slice(),eb,top,c,msg:it===0?`Para cada arista cuento <b>cuántos caminos más cortos</b> pasan por ella. Las que más (<b>${eb[top]}</b>) son <b>puentes</b> entre grupos: ${g.E[top].a}–${g.E[top].b}.`:`Recalculo y ahora el puente más cargado es <b>${g.E[top].a}–${g.E[top].b}</b> (${eb[top]}).`});
  alive.splice(alive.indexOf(top),1);const c2=cm();if(c2.n>=2){fr.push({alive:alive.slice(),eb:null,top:null,c:c2,done:true,rm:top,msg:`Quito <b>${g.E[top].a}–${g.E[top].b}</b> y la red se parte: <b class="ok">${c2.n} comunidades</b>.`});break}else fr.push({alive:alive.slice(),eb:null,top:null,c,rm:top,msg:`Quito <b>${g.E[top].a}–${g.E[top].b}</b>. Todavía conectado, repito.`})}
 return fr}
return{sec:9,steps:0,lab:true,role:'Lab · comunidades en una red',
notes:'LAB: ¿cómo encuentra una red social sus "grupos"? Idea de Girvan–Newman: las aristas que unen comunidades distintas son PUENTES; por ellas pasan muchísimos caminos más cortos (betweenness). Si las quitas una por una, la red se parte en sus comunidades naturales. Dale ▶ Auto: el número sobre cada arista es cuántos caminos más cortos pasan por ahí; se tira la mayor. Aplicaciones: detectar grupos en redes sociales, proteínas, circuitos. Ojo: aquí usamos el mismo recorrido BFS que ya aprendimos para contar caminos.',
html:()=>{g=new Gr('cm',{r:30,fs:15,vb:[940,470],width:880,height:440,dir:false,anim:false,lbl:N,nodes:{A:[90,150],B:[230,60],C:[230,260],D:[390,160],E:[400,360],F:[520,390],G:[560,140],H:[690,270],I:[820,120],J:[850,380]},
  edges:[['A','B'],['A','C'],['B','C'],['B','D'],['C','D'],['C','E'],['D','E'],['E','F'],['D','G'],['F','G'],['F','H'],['G','H'],['G','I'],['H','I'],['H','J'],['I','J']].map(e=>[...e,undefined,{lbl:' '}])});frs=mk(g);
 return`${hd('5.9','Lab · comunidades','Corta los *puentes* y aparecen los grupos')}
<div style="display:grid;grid-template-columns:880px 1fr;gap:40px;margin-top:-6px"><div>${g.html()}</div><div><div class="tag">número en la arista = caminos más cortos que pasan por ella</div><div class="read" id="cmM" style="min-height:150px;font-size:23px;margin-top:12px"></div>
<div class="rd" style="margin-top:14px"><span>Comunidades</span><b id="cmN">1</b></div><div class="noadv" id="plH" style="margin-top:16px"></div></div></div>`},
init:el=>{pl=player($('#plH',el),frs.length,i=>{const f=frs[i];g.reset();g.bdClear();g.E.forEach(e=>{const ge=g.Ed(e.i),t=ge.querySelector('.el');if(!f.alive.includes(e.i)){ge.classList.add('rej');if(t)t.textContent=''}else{if(t)t.textContent=f.eb?f.eb[e.i]:'';if(f.eb&&e.i===f.top)g.e(e.i,'bad')}});
  g.nodes.forEach(k=>{if(f.c.n>1)g.n(k,'c'+(f.c.m[k]%4+1))});$('#cmM',el).innerHTML=f.msg;tween($('#cmN',el),f.c.n,v=>Math.round(v),300);if(f.top!=null)rip(g,g.E[f.top].a,C.cor);if(f.done)g.nodes.forEach((k,j)=>setTimeout(()=>rip(g,k,PALC[f.c.m[k]%4]),j*60))},{ms:1800,auto:900})}}})());

/* 5 · LAB: INTERNET (enrutamiento + cableado) */
add((()=>{let g,mode='route',cuts=new Set(),src='A',dst='G',setting='dst',stop=[],tk=[];const TOT=MGE.reduce((a,e)=>a+e[2],0);
return{sec:9,steps:0,lab:true,role:'Lab · Internet: enrutar y cablear',
notes:'LAB con dos mitades. ENRUTAR: los routers forman un grafo; un paquete va por el camino de menor latencia. Corta un cable con clic y mira cómo el paquete busca otra ruta (así Internet sobrevive a cables rotos). Si cortas demasiado y el grafo se parte en componentes, no hay ruta: ¡sin conexión! CABLEAR: si tuvieras que tender fibra entre las 7 ciudades, el árbol generador mínimo (Prim/Kruskal) te dice el mínimo de cable: 39 en vez de ' + '70 si pones todo. Por eso se usa MST en diseño de redes.',
html:()=>{g=mgGraph('in',{int:true,anim:false,width:760,height:471,d0:.1});
 return`${hd('5.9','Lab · internet y telecomunicaciones','Rutas que *esquivan* cables rotos')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:40px;margin-top:-4px"><div>${g.html()}</div><div>
<div class="row" style="gap:10px"><span class="btn p" id="inR">📦 Enrutar paquete</span><span class="btn" id="inM">🧵 Cableado óptimo (MST)</span></div>
<div id="inP" style="margin-top:12px"></div><div id="inS" style="margin-top:12px"></div><div class="read" id="inT" style="min-height:116px;font-size:22px;margin-top:12px"></div></div></div>`},
init:el=>{const draw=()=>{stop.forEach(f=>f());stop=[];tk.forEach(clearTimeout);tk=[];g.reset();g.bdClear();$('#inR',el).classList.toggle('p',mode==='route');$('#inM',el).classList.toggle('p',mode==='mst');
  g.E.forEach(e=>{const t=g.Ed(e.i).querySelector('.we');if(t)t.textContent=e.w});
  if(mode==='route'){$('#inP',el).innerHTML=`<div class="row" style="gap:10px"><span class="tag">estás eligiendo:</span><span class="btn ${setting==='src'?'p':''}" id="inA" style="padding:6px 14px;font-size:18px">origen ${src}</span><span class="btn ${setting==='dst'?'p':''}" id="inB" style="padding:6px 14px;font-size:18px">destino ${dst}</span></div><div class="tag" style="margin-top:8px">clic en un nodo = elegir · clic en un cable = cortar ✂</div>`;
   $('#inA',el).onclick=()=>{setting='src';draw()};$('#inB',el).onclick=()=>{setting='dst';draw()};
   g.E.forEach(e=>{if(cuts.has(e.i)){g.e(e.i,'rej');const t=g.Ed(e.i).querySelector('.we');if(t)t.textContent='✂'}});g.n(src,'cur');g.n(dst,'sel');
   const L=g.E.filter(e=>!cuts.has(e.i)),d=dijkstra(g.nodes,L,src),p=pathTo(d.p,dst),ok=d.d[dst]<Infinity;
   if(ok&&src!==dst){p.es.forEach(i=>g.e(i,'on'));p.ns.forEach(k=>{if(k!==src&&k!==dst)g.n(k,'vis')});g.bd(dst,d.d[dst]+' ms',0,-52);stop.push(walker(g,p.ns,{ms:600,r:10,color:C.yel}))}
   const cp=comps(g.nodes,L.map(e=>[e.a,e.b]));$('#inS',el).innerHTML=`<div class="rd"><span>Latencia total</span><b class="${ok?'':'no'}">${ok?d.d[dst]+' ms':'∞'}</b></div><div class="rd"><span>Cables cortados · islas</span><b>${cuts.size} · ${cp.n}</b></div>`;
   $('#inT',el).innerHTML=src===dst?'Origen y destino son el mismo router.':ok?`Ruta: <b>${p.ns.join(' → ')}</b>.${cuts.size?' Al cortar cables el paquete <b>se reenrutó</b>.':' Corta un cable de la ruta (clic) y observa.'}`:`<b class="no">Sin conexión</b>: cortaste tantos cables que ${src} y ${dst} quedaron en <b>islas distintas</b> (${cp.n} componentes).`}
  else{const m=MST_IDX;$('#inP',el).innerHTML='<div class="tag">mínimo cable que conecta las 7 ciudades</div>';let c=0;g.E.forEach(e=>{if(!m.includes(e.i))g.e(e.i,'rej')});
   m.forEach((i,k)=>tk.push(setTimeout(()=>{const e=g.E[i];g.e(i,'on');g.n([e.a,e.b],'vis');c+=e.w;rip(g,e.b,C.mnt);fly(g,g.P[e.a],g.P[e.b],{ms:420,r:7,color:C.mnt});tween($('#inC',el),c,v=>Math.round(v),300)},k*520+200)));
   $('#inS',el).innerHTML=`<div class="rd"><span>Tender <b>todo</b> el cable posible</span><b class="no">${TOT}</b></div><div class="rd"><span>Cableado MST (Prim / Kruskal)</span><b class="ok" id="inC">0</b></div><div class="rd"><span>Ahorro</span><b>${Math.round((1-39/TOT)*100)}%</b></div>`;
   $('#inT',el).innerHTML='Las <b>6 aristas</b> del MST conectan todo con <b>39</b>. Es exactamente el problema de la fibra óptica entre ciudades.'}};
 g.root.addEventListener('click',e=>{if(mode!=='route')return;const nd=e.target.closest('.nd'),ed=e.target.closest('.ge');if(nd){setting==='src'?src=nd.dataset.n:dst=nd.dataset.n;draw()}else if(ed){const i=+ed.dataset.i;cuts.has(i)?cuts.delete(i):cuts.add(i);draw()}});
 $('#inR',el).onclick=()=>{mode='route';draw()};$('#inM',el).onclick=()=>{mode='mst';draw()};draw()}}})());

/* 6 · LAB: PROYECTOS Y COMPILADORES (DAG + ruta crítica) */
add((()=>{let g,dur,cyc=false,stop=[];const T={Dis:'Diseño',BD:'Base datos',UI:'Interfaz',API:'API',Pru:'Pruebas',Dep:'Deploy'};
return{sec:9,steps:0,lab:true,role:'Lab · dependencias y ruta crítica',
notes:'LAB: un proyecto (o la compilación de un programa) es un DAG: las flechas dicen "esto antes que esto". Con un orden topológico sabes en qué orden hacer las cosas; y la RUTA CRÍTICA (el camino más largo del DAG) te dice cuánto tarda TODO el proyecto: si una tarea de esa ruta se retrasa, se retrasa el proyecto; si una fuera de ella se retrasa un poco, no pasa nada. Haz clic en una tarea para sumarle un día y mira cómo cambia la ruta crítica. Luego mete la dependencia circular: el compilador/gestor dice "ciclo detectado" y no existe orden posible.',
html:()=>{dur={Dis:3,BD:4,UI:4,API:5,Pru:3,Dep:1};cyc=false;g=new Gr('pj',{r:40,fs:19,vb:[1040,420],width:880,height:355,int:true,anim:false,d0:.1,lbl:T,nodes:{Dis:[90,210],BD:[340,80],UI:[340,340],API:[600,80],Pru:[820,210],Dep:[980,210]},sub:{},
  edges:[['Dis','BD'],['Dis','UI'],['BD','API'],['API','Pru'],['UI','Pru'],['Pru','Dep'],['Dep','Dis',null,{x:1,c:-210}]]});
 return`${hd('5.9','Lab · compiladores y gestión de proyectos','La *ruta crítica* manda en el calendario')}
<div style="display:grid;grid-template-columns:880px 1fr;gap:40px;margin-top:-6px"><div>${g.html()}</div><div><div class="tag">clic en una tarea = +1 día (1 → 8)</div><div id="pjR" style="margin-top:8px"></div><div class="row" style="gap:10px;margin:14px 0"><span class="btn" id="pjC">🔁 Dependencia circular</span><span class="btn" id="pjX">↺</span></div><div class="read" id="pjM" style="min-height:108px;font-size:22px"></div></div></div>
<div class="tag" style="margin-top:6px" id="pjO"></div>`},
init:el=>{const calc=()=>{const L=g.E.filter(e=>!e.x||cyc),indeg={},adj={};g.nodes.forEach(k=>{indeg[k]=0;adj[k]=[]});L.forEach(e=>{indeg[e.b]++;adj[e.a].push([e.b,e.i])});const q=g.nodes.filter(k=>!indeg[k]),ord=[],es={},pr={};g.nodes.forEach(k=>es[k]=0);
  while(q.length){const u=q.shift();ord.push(u);adj[u].forEach(([v,i])=>{const t=es[u]+dur[u];if(t>es[v]||!pr[v]){if(t>=es[v]){es[v]=t;pr[v]=[u,i]}}if(--indeg[v]===0)q.push(v)})}
  if(ord.length<g.nodes.length)return{cycle:true,ord};let end=ord[0];g.nodes.forEach(k=>{if(es[k]+dur[k]>es[end]+dur[end])end=k});const crit=[end],ce=[];while(pr[crit[0]]){ce.unshift(pr[crit[0]][1]);crit.unshift(pr[crit[0]][0])}return{ord,es,total:es[end]+dur[end],crit,ce}};
 const draw=()=>{stop.forEach(f=>f());stop=[];g.reset();g.bdClear();g.cls('mg',cyc);$('#pjC',el).classList.toggle('p',cyc);const r=calc();
  g.nodes.forEach(k=>g.bd(k,dur[k]+' d',0,-58));
  if(r.cycle){g.nodes.forEach(k=>g.n(k,'bad'));g.E.forEach(e=>{if(!e.x||cyc)g.e(e.i,'bad')});replay(g.root,'shk');$('#pjR',el).innerHTML='<div class="rd"><span>Duración total</span><b class="no">∞</b></div>';$('#pjM',el).innerHTML='⛔ <b class="no">Ciclo detectado</b>: Deploy depende de Diseño y Diseño de Deploy… ¡ninguna puede empezar! No existe orden topológico. (Un compilador diría: <i>circular dependency</i>.)';$('#pjO',el).textContent='orden topológico: ninguno';return}
  g.nodes.forEach(k=>{if(r.crit.includes(k))g.n(k,'bad')});r.ce.forEach(i=>g.e(i,'bad'));
  $('#pjR',el).innerHTML=`<div class="rd"><span>Duración del proyecto</span><b>${r.total} días</b></div><div class="rd"><span>Ruta crítica</span><b style="font-size:22px;color:var(--cor)">${r.crit.map(k=>T[k]).join(' → ')}</b></div>`;
  $('#pjM',el).innerHTML=`Las tareas <b class="no">rojas</b> forman el camino más largo: si <b>una</b> se atrasa, <b>todo</b> se atrasa. Las demás tienen <b>holgura</b>.`;$('#pjO',el).innerHTML='Orden topológico (por dónde empezar): <b class="yel">'+r.ord.map(k=>T[k]).join(' → ')+'</b>';
  stop.push(walker(g,r.crit,{ms:700,r:11,color:C.yel}))};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd');if(!nd)return;const k=nd.dataset.n;dur[k]=dur[k]>=8?1:dur[k]+1;rip(g,k,C.yel);draw()});
 $('#pjC',el).onclick=()=>{cyc=!cyc;draw()};$('#pjX',el).onclick=()=>{dur={Dis:3,BD:4,UI:4,API:5,Pru:3,Dep:1};cyc=false;draw()};draw()}}})());

/* 7 · LAB: PATHFINDING (IA / VIDEOJUEGOS) */
add((()=>{const GW=16,GH=9,CS=50,ST=[1,4],GO=[14,4];let walls=new Set(),res={},tok=0,algo='astar',el_,paint=null;
const key=(x,y)=>x+','+y,inb=(x,y)=>x>=0&&y>=0&&x<GW&&y<GH;
const preset=()=>{walls=new Set();for(let y=1;y<=7;y++)walls.add(key(8,y));walls.add(key(5,3));walls.add(key(5,4));walls.add(key(5,5));walls.add(key(11,0));walls.add(key(11,1))};
function solve(a){const s=key(...ST),t=key(...GO),par={[s]:null},order=[];const nb=(x,y)=>[[1,0],[-1,0],[0,1],[0,-1]].map(d=>[x+d[0],y+d[1]]).filter(p=>inb(...p)&&!walls.has(key(...p)));
 const h=(x,y)=>Math.abs(x-GO[0])+Math.abs(y-GO[1]);
 if(a==='bfs'){const q=[ST],seen=new Set([s]);while(q.length){const [x,y]=q.shift();order.push([x,y]);if(key(x,y)===t)break;nb(x,y).forEach(p=>{const k=key(...p);if(!seen.has(k)){seen.add(k);par[k]=key(x,y);q.push(p)}})}}
 else{const g={[s]:0},open=[{p:ST,f:h(...ST)}],closed=new Set();while(open.length){open.sort((u,v)=>u.f-v.f);const {p:[x,y]}=open.shift(),k=key(x,y);if(closed.has(k))continue;closed.add(k);order.push([x,y]);if(k===t)break;nb(x,y).forEach(p=>{const kk=key(...p),ng=g[k]+1;if(g[kk]===undefined||ng<g[kk]){g[kk]=ng;par[kk]=k;open.push({p,f:ng+h(...p)})}})}}
 const path=[];if(par[t]!==undefined){for(let k=t;k;k=par[k])path.unshift(k.split(',').map(Number))}return{order,path:path.length&&key(...path[0])===s?path:[]}}
function draw(){const g=$('#pfG',el_);let h='';for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){const w=walls.has(key(x,y));h+=`<rect data-c="${x},${y}" id="pc_${x}_${y}" x="${x*CS+2}" y="${y*CS+2}" width="${CS-4}" height="${CS-4}" rx="9" fill="${w?'#4A5C86':'rgba(244,241,232,.06)'}" stroke="${w?C.ink2:'transparent'}" stroke-width="2.5"/>`}
 g.innerHTML=h+`<text x="${ST[0]*CS+CS/2}" y="${ST[1]*CS+CS/2+2}" style="font:700 28px var(--disp);fill:${C.yel};text-anchor:middle;dominant-baseline:central;pointer-events:none">🏃</text><text x="${GO[0]*CS+CS/2}" y="${GO[1]*CS+CS/2+2}" style="font:700 28px var(--disp);fill:${C.yel};text-anchor:middle;dominant-baseline:central;pointer-events:none">🏁</text>`}
const stat=()=>{const r=(a)=>res[a]?`<b>${res[a].ex}</b> casillas · ruta <b>${res[a].len}</b>`:'<span class="mute">sin correr</span>';$('#pfS',el_).innerHTML=`<div class="rd"><span><i class="sw" style="background:var(--cy)"></i>BFS</span><span>${r('bfs')}</span></div><div class="rd"><span><i class="sw" style="background:var(--mnt)"></i>A*</span><span>${r('astar')}</span></div>`;
 $('#pfM',el_).innerHTML=res.bfs&&res.astar?`A* exploró <b class="ok">${Math.round((1-res.astar.ex/res.bfs.ex)*100)}% menos</b> casillas que BFS y encontró ${res.astar.len===res.bfs.len?'<b>la misma ruta corta</b>':'una ruta de largo '+res.astar.len+' (BFS: '+res.bfs.len+')'}. La <b>heurística</b> le da «olfato» hacia la meta.`:'Corre <b>BFS</b> y luego <b>A*</b> con los mismos muros y compara cuántas casillas exploran.'};
async function run(a){const my=++tok;algo=a;$('#pfA',el_).classList.toggle('p',a==='bfs');$('#pfB',el_).classList.toggle('p',a==='astar');draw();const s=solve(a),col=a==='bfs'?C.cy:C.mnt;
 for(let k=0;k<s.order.length;k++){if(my!==tok||!el_.isConnected)return;const [x,y]=s.order[k],r=$(`#pc_${x}_${y}`,el_);r.setAttribute('fill',col);r.style.opacity=.5;if(k%2===0)await sleep(18)}
 if(!s.path.length){res[a]={ex:s.order.length,len:'—'};$('#pfM',el_).innerHTML='⛔ <b class="no">No hay camino</b>: los muros bloquean todo.';$('#pfS',el_).innerHTML='';return}
 for(const [x,y] of s.path){if(my!==tok||!el_.isConnected)return;const r=$(`#pc_${x}_${y}`,el_);r.setAttribute('fill',C.yel);r.style.opacity=1;r.classList.add('cin');r.style.transformBox='fill-box';r.style.transformOrigin='center';await sleep(34)}
 res[a]={ex:s.order.length,len:s.path.length-1};stat()}
return{sec:9,steps:0,lab:true,role:'Lab · pathfinding de videojuegos',
notes:'LAB: así se mueven los enemigos y personajes en un videojuego. El mapa se vuelve un grafo: cada casilla es un nodo, cada paso a una casilla vecina libre es una arista. Pinta muros arrastrando el mouse (clic para poner/quitar). Corre BFS: se expande como una onda en todas direcciones. Corre A*: usa una HEURÍSTICA (distancia a la meta) y se va casi directo. Compara casillas exploradas: A* explora muchas menos para llegar a la misma ruta corta. Si encierras la meta, ningún algoritmo encuentra camino (grafo desconectado).',
html:()=>`${hd('5.9','Lab · inteligencia artificial y videojuegos','BFS explora como *onda*; A* huele la meta')}
<div style="display:grid;grid-template-columns:830px 1fr;gap:40px;margin-top:-4px"><div><svg id="pfG" viewBox="0 0 800 450" width="830" height="467" class="ch" style="touch-action:none;cursor:crosshair"></svg><div class="tag" style="margin-top:6px">clic o arrastra = pintar / borrar muros</div></div><div>
<div class="row" style="gap:10px;flex-wrap:wrap"><span class="btn" id="pfA">▶ BFS</span><span class="btn p" id="pfB">▶ A*</span></div><div class="row" style="gap:10px;margin-top:10px;flex-wrap:wrap"><span class="btn" id="pfC">🧹 Limpiar muros</span><span class="btn" id="pfP">🏛 Mapa base</span><span class="btn" id="pfR">🎲 Muros al azar</span></div>
<div style="margin-top:18px" id="pfS"></div><div class="read" id="pfM" style="margin-top:12px;min-height:116px;font-size:21px"></div>
<div class="card y" style="margin-top:12px;font-size:20px"><div class="tag">en cristiano</div>f(n) = g(n) + h(n): lo que <b>ya caminé</b> + lo que <b>creo que falta</b>. Siempre expande la casilla con menor f.</div></div></div>`,
init:el=>{el_=el;preset();res={};draw();stat();const g=$('#pfG',el),invalidate=()=>{res={};tok++;draw();stat()};
 const cell=e=>{const t=e.target.closest('[data-c]');return t?t.dataset.c:null},apply=(c)=>{const [x,y]=c.split(',').map(Number);if((x===ST[0]&&y===ST[1])||(x===GO[0]&&y===GO[1]))return;const w=walls.has(c);if(paint==='add'&&!w)walls.add(c);else if(paint==='del'&&w)walls.delete(c);else return;const r=$(`#pc_${x}_${y}`,el);r.setAttribute('fill',paint==='add'?'#4A5C86':'rgba(244,241,232,.06)');r.setAttribute('stroke',paint==='add'?C.ink2:'transparent');r.style.opacity=1};
 g.addEventListener('mousedown',e=>{const c=cell(e);if(!c)return;if(Object.keys(res).length||tok){res={};tok++;draw();stat()}paint=walls.has(c)?'del':'add';apply(c)});g.addEventListener('mouseover',e=>{if(paint&&e.buttons===1){const c=cell(e);if(c)apply(c)}});addEventListener('mouseup',()=>{if(paint){paint=null;res={};stat()}});
 $('#pfA',el).onclick=()=>run('bfs');$('#pfB',el).onclick=()=>run('astar');$('#pfC',el).onclick=()=>{walls=new Set();invalidate()};$('#pfP',el).onclick=()=>{preset();invalidate()};
 $('#pfR',el).onclick=()=>{walls=new Set();for(let y=0;y<GH;y++)for(let x=0;x<GW;x++){if(Math.random()<.26&&!(x===ST[0]&&y===ST[1])&&!(x===GO[0]&&y===GO[1]))walls.add(key(x,y))}invalidate()}}}})());

/* 8 · TABLA RESUMEN DE APLICACIONES */
add({sec:9,steps:5,role:'Aplicaciones · mapa de conceptos',
notes:'Cierre del bloque de aplicaciones: cada aplicación es una traducción. Pregunta tipo examen: "¿Qué son los nodos, qué son las aristas y qué algoritmo usarías?". Ve fila por fila con [→]. Truco para exponer: cuando te pregunten por una aplicación nueva, contesta siempre esas tres cosas.',
html:()=>{const r=[['GPS y mapas','Cruces','Calles (peso = minutos)','Dijkstra · A*','🗺'],['Redes sociales','Personas','Amistad / seguir','BFS · comunidades','👥'],['Internet','Routers','Cables (peso = latencia)','MST · camino mínimo','🌐'],['Compiladores y proyectos','Tareas / archivos','Dependencias (dirigidas)','DAG · orden topológico','⚙'],['IA y videojuegos','Casillas / estados','Movimientos posibles','BFS · A*','🎮']];
 return`${hd('5.9','Resumen de aplicaciones','Siempre las *tres* preguntas')}
<table class="tb a" style="--d:.3s;margin-top:30px"><tr><th></th><th>Aplicación</th><th>¿Qué son los nodos?</th><th>¿Y las aristas?</th><th>Algoritmo estrella</th></tr>${r.map((a,i)=>`<tr data-s="${i+1}"><td style="font-size:32px">${a[4]}</td><td>${a[0]}</td><td><span class="xin">${a[1]}</span></td><td><span class="xin">${a[2]}</span></td><td class="mono" style="color:var(--cy);font-size:21px"><span class="xin">${a[3]}</span></td></tr>`).join('')}</table>
<div class="note fd" style="--d:1s;right:130px;bottom:150px;font-size:34px">modelar bien = resolver a medias ↓</div>`}});
