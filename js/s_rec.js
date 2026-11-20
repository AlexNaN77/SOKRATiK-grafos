/* ============ 5.4 RECORRIDO Y BÚSQUEDA: BFS vs DFS ============ */
const TGN={A:[90,260],B:[250,100],C:[250,420],D:[430,100],E:[430,260],F:[430,420],G:[620,170],H:[620,360]};
const TGE=[['A','B'],['A','C'],['B','D'],['B','E'],['C','F'],['D','G'],['E','G'],['E','H'],['F','H'],['C','E']];
/* cuadros paso a paso de BFS (cola) o DFS (pila) */
function trav(g,s,kind){const A=adjOf(g,false),fr=[],seen={},done=[],te=[],dist={};let ds=[{n:s,pe:-1}],chk=0;
 const push=(c,msg,extra)=>fr.push(Object.assign({cur:c,done:done.slice(),fr:ds.map(x=>x.n),te:te.slice(),dist:{...dist},chk,msg},extra||{}));
 if(kind==='bfs'){seen[s]=1;dist[s]=0;push(null,`Meto <b>${s}</b> en la cola y lo marco`);
  while(ds.length){const it=ds.shift(),u=it.n;done.push(u);const add=[];chk+=A[u].length;A[u].forEach(([v,i])=>{if(!seen[v]){seen[v]=1;dist[v]=dist[u]+1;ds.push({n:v,pe:i});te.push(i);add.push(v)}});
   push(u,`Saco <b>${u}</b> del frente · ${add.length?'encolo a <b>'+add.join(', ')+'</b>':'sin vecinos nuevos'}`)}}
 else{push(null,`Meto <b>${s}</b> en la pila`);
  while(ds.length){const it=ds.pop(),u=it.n;if(seen[u]){push(null,`Saco <b>${u}</b>: ya estaba visitado → lo descarto`);continue}
   seen[u]=1;done.push(u);if(it.pe>=0)te.push(it.pe);chk+=A[u].length;const add=[];[...A[u]].reverse().forEach(([v,i])=>{if(!seen[v]){ds.push({n:v,pe:i});add.push(v)}});
   push(u,`Visito <b>${u}</b> · apilo ${add.length?'a <b>'+add.reverse().join(', ')+'</b>':'nada: callejón sin salida'}`)}}
 fr.push(Object.assign({},fr[fr.length-1],{cur:null,fr:[],msg:'<b>Listo</b>: la estructura quedó vacía'}));return fr}
function paintTrav(g,f,bfs){g.reset();g.bdClear();f.done.forEach(k=>g.n(k,'vis'));f.fr.forEach(k=>{if(!f.done.includes(k))g.n(k,'fr')});if(f.cur)g.n(f.cur,'cur');f.te.forEach(i=>g.e(i,'on'));if(bfs)Object.keys(f.dist).forEach(k=>{if(f.done.includes(k)||f.fr.includes(k))g.bd(k,f.dist[k],24,-26)})}
function stkHtml(f,bfs){const a=f.fr.map((n,i)=>`<div class="it${bfs?(i===0?' top':''):(i===f.fr.length-1?' top':'')}">${n}</div>`).join('');return a||'<span class="mute" style="font-size:20px">vacía</span>'}
function bfsPar(g,s){const A=adjOf(g,false),p={},seen={[s]:1},q=[s];while(q.length){const u=q.shift();A[u].forEach(([v,i])=>{if(!seen[v]){seen[v]=1;p[v]=[u,i];q.push(v)}})}return p}
function dfsPar(g,s){const A=adjOf(g,false),p={},seen={};(function r(u){seen[u]=1;A[u].forEach(([v,i])=>{if(!seen[v]){p[v]=[u,i];r(v)}})})(s);return p}

/* 1 · ¿PARA QUÉ? Y EL VISITADO */
add((()=>{let g,tk=[],stop=[],cnt=0;return{sec:4,steps:2,role:'Recorrer: ¿para qué? y «visitado»',
notes:'Recorrer un grafo = visitar todos los nodos alcanzables sin perderse. Sirve para buscar algo, medir distancias, ver qué está conectado. [→] Sin marcar nodos como visitados, en un grafo con un ciclo (A-B-C-A) el recorrido da vueltas para siempre: mira el contador subir. [→] Con una marca "visitado" cada nodo se visita UNA vez; al llegar a uno ya marcado, lo ignoramos y el recorrido termina.',
html:()=>{g=new Gr('v1',{r:36,vb:[780,520],dir:false,d0:.1,nodes:{A:[130,300],B:[380,110],C:[380,420],D:[650,260]},edges:[['A','B'],['B','C'],['A','C'],['C','D']]});
 return`${hd('5.4','Recorridos · para qué sirven','Sin *marcar* nodos, giras para siempre')}
<div style="display:grid;grid-template-columns:780px 1fr;gap:60px;margin-top:6px;align-items:center"><div>${g.html()}</div><div>
<div class="lst a" style="--d:.3s">${[['Buscar','¿existe un camino hasta el nodo X?'],['Medir','¿a cuántos pasos está cada nodo?'],['Descubrir','¿qué parte de la red está conectada?']].map((a,i)=>`<div><i>${i+1}</i><div><b style="font-size:28px">${a[0]}</b><div style="font-size:21px;color:var(--ink2)">${a[1]}</div></div></div>`).join('')}</div>
<div class="card" style="margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:20px"><div><div class="tag">pasos dados</div><div class="big" id="v1n" style="font-size:110px">0</div></div><div id="v1m" style="font-size:24px;align-self:center"></div></div>
<div class="card y" data-s="2" style="margin-top:20px;font-size:24px">Regla de oro: <b>marca cada nodo al visitarlo</b> y no vuelvas a los marcados. Así <b>nunca hay ciclos infinitos</b>.</div></div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];stop.forEach(f=>f());stop=[];g.reset();g.bdClear();cnt=0;const N=$('#v1n',el),M=$('#v1m',el);N.textContent=0;N.style.color='';
 if(s===0){M.innerHTML='Sin ninguna marca el recorrido <b>no sabe</b> que ya pasó por aquí…';const loop=[];for(let i=0;i<80;i++)loop.push(['A','B','C'][i%3]);stop.push(walker(g,loop,{ms:560,loop:false,color:C.cor,r:13}));
  loopEvery(el,560,()=>{cnt++;N.textContent=cnt;if(cnt>7){N.style.color=C.cor;M.innerHTML='<b class="no">¡Va en círculos!</b> A→B→C→A→B… ∞'}},stop)}
 if(s>=1){const seq=[['A',0],['B',1],['C',2],['x',3],['D',4]];M.innerHTML='Ahora cada nodo se <b>marca</b> al visitarlo.';
  const seqN=['A','B','C','D'];seqN.forEach((k,i)=>tk.push(setTimeout(()=>{g.n(k,'vis');g.n(seqN.map((q,j)=>j<i?q:null).filter(Boolean),'vis');rip(g,k,C.mnt);N.textContent=i+1;if(i)g.e(g.idx(i===3?'C':seqN[i-1],k),'on');
   if(i===2)tk.push(setTimeout(()=>{fly(g,g.P.C,g.P.A,{ms:600,txt:'✗',color:C.cor,lift:20});M.innerHTML='C ve a A… <b>¡ya está marcado!</b> No regreso.'},550));
   if(i===3)tk.push(setTimeout(()=>{M.innerHTML='<b class="ok">Terminó</b>: 4 nodos, 4 visitas. Ningún ciclo.';N.style.color=C.mnt},500))},i*1100+200)))}}}})());

/* 2 · BFS vs DFS FRENTE A FRENTE */
add((()=>{let gb,gd,fb,fd,pl;return{sec:4,steps:0,lab:true,role:'BFS vs DFS frente a frente',
notes:'LAB: dale ▶ Auto y compara. Mismo grafo, mismo inicio (A). BFS usa una COLA (FIFO: el primero que entra es el primero que sale) y avanza por niveles: todos los vecinos, luego los vecinos de los vecinos; las insignias muestran la distancia. DFS usa una PILA (LIFO: el último que entra es el primero que sale) y se mete lo más hondo que puede antes de regresar. Mueve la barra para ir hacia atrás.',
html:()=>{const O={r:26,fs:20,vb:[720,500],width:500,height:348,dir:false,anim:false,nodes:TGN,edges:TGE};gb=new Gr('bf',O);gd=new Gr('df',O);fb=trav(gb,'A','bfs');fd=trav(gd,'A','dfs');
 const card=(c,t,sub,g,id,fifo)=>`<div class="card ${c}" style="padding:16px 22px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div class="ant" style="font-size:44px;line-height:1">${t}</div><div class="chip ${c==='c'?'c':'m'}" style="margin:0">${fifo}</div></div><div style="font-size:19px;color:var(--ink2);margin:4px 0 6px">${sub}</div>
 <div style="display:grid;grid-template-columns:500px 1fr;gap:20px">${g.html()}<div><div class="tag">${id==='b'?'cola · sale por arriba':'pila · sale por arriba'}</div><div class="stk ${id==='b'?'qv':''}" id="${id}S" style="margin-top:8px"></div></div></div><div class="read" id="${id}M" style="font-size:21px;min-height:56px;margin-top:6px"></div></div>`;
 return`${hd('5.4','BFS vs DFS','Anchura contra *profundidad*')}<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:14px">${card('c','BFS · anchura','Por <b>niveles</b>: primero los cercanos.',gb,'b','COLA · FIFO')}${card('m','DFS · profundidad','<b>A fondo</b>: hasta el callejón, luego retrocede.',gd,'d','PILA · LIFO')}</div><div class="noadv" id="plH" style="margin-top:16px"></div>`},
init:el=>{const n=Math.max(fb.length,fd.length);pl=player($('#plH',el),n,i=>{const a=fb[Math.min(i,fb.length-1)],b=fd[Math.min(i,fd.length-1)];paintTrav(gb,a,true);paintTrav(gd,b,false);$('#bS',el).innerHTML=stkHtml(a,true);$('#dS',el).innerHTML=stkHtml(b,false);$('#bM',el).innerHTML=a.msg;$('#dM',el).innerHTML=b.msg;
  if(a.cur&&i<fb.length)rip(gb,a.cur,C.yel);if(b.cur&&i<fd.length)rip(gd,b.cur,C.yel)},{ms:1000,auto:900})}}})());

/* 3 · CAMINO MÁS CORTO (LAB) */
add((()=>{let g,mode='bfs',dest='G',stop=[];return{sec:4,steps:0,lab:true,role:'Lab · ¿quién da el camino más corto?',
notes:'LAB: haz clic en cualquier nodo como destino y cambia entre BFS y DFS. BFS llega siempre por el camino con MENOS aristas (en grafos no ponderados) porque revisa todo lo que está a 1 paso antes de lo que está a 2. DFS encuentra UN camino, pero puede ser larguísimo. Ojo: "más corto" aquí es contando aristas; con pesos (km, minutos) se necesita Dijkstra.',
html:()=>{g=new Gr('sp',{r:30,fs:22,vb:[720,500],int:true,dir:false,anim:false,nodes:TGN,edges:TGE});
 return`${hd('5.4','Lab · camino más corto','BFS lo *garantiza*, DFS no')}
<div style="display:grid;grid-template-columns:720px 1fr;gap:60px;margin-top:6px;align-items:center"><div>${g.html()}<div class="tag" style="text-align:center">clic en un nodo = destino · inicio fijo en A</div></div><div>
<div class="row" style="gap:12px"><span class="btn p" id="spB">BFS</span><span class="btn" id="spD">DFS</span></div>
<div id="spR" style="margin-top:22px"></div><div class="card y" id="spC" style="margin-top:20px;font-size:24px"></div></div></div>`},
init:el=>{const draw=()=>{stop.forEach(f=>f());stop=[];g.reset();g.bdClear();$('#spB',el).classList.toggle('p',mode==='bfs');$('#spD',el).classList.toggle('p',mode==='dfs');
  const pb=pathTo(bfsPar(g,'A'),dest),pd=pathTo(dfsPar(g,'A'),dest),p=mode==='bfs'?pb:pd;
  if(mode==='bfs'){const d=trav(g,'A','bfs').slice(-1)[0].dist;Object.keys(d).forEach(k=>g.bd(k,d[k],24,-28))}
  g.n('A','cur');p.ns.forEach((k,i)=>{if(i)g.n(k,mode==='bfs'?'vis':'c2')});g.n(dest,'sel');p.es.forEach(i=>g.e(i,mode==='bfs'?'on':'bad'));
  $('#spR',el).innerHTML=`<div class="rd"><span><span class="sw" style="background:var(--mnt)"></span>BFS → A…${dest}</span><b>${pb.es.length} aristas</b></div><div class="rd"><span><span class="sw" style="background:var(--cor)"></span>DFS → A…${dest}</span><b class="${pd.es.length>pb.es.length?'no':''}">${pd.es.length} aristas</b></div><div class="mono" style="font-size:21px;margin-top:14px;color:var(--ink2)">${p.ns.join(' → ')}</div>`;
  $('#spC',el).innerHTML=pd.es.length>pb.es.length?`DFS dio un rodeo de <b>${pd.es.length-pb.es.length} aristas de más</b>. BFS no se equivoca: avanza por niveles.`:`Aquí coinciden. Prueba otro destino (G, H…) para ver a DFS dar rodeos.`;
  if(p.ns.length>1)stop.push(walker(g,p.ns,{ms:600,r:11,color:mode==='bfs'?C.mnt:C.cor}))};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd');if(!nd||nd.dataset.n==='A')return;dest=nd.dataset.n;draw()});$('#spB',el).onclick=()=>{mode='bfs';draw()};$('#spD',el).onclick=()=>{mode='dfs';draw()};draw()}}})());

/* 4 · COMPLEJIDAD O(V+E) */
add((()=>{let g,fr;return{sec:4,steps:0,lab:true,role:'Lab · ¿por qué O(V + E)?',
notes:'LAB: dale ▶ Auto. Cada nodo se procesa UNA vez (V) y, al procesarlo, se revisa cada una de sus aristas: como en un no dirigido cada arista aparece en la lista de sus dos extremos, se revisan 2E en total. Total: V + 2E, que en notación O es O(V + E). Lo mismo para BFS y DFS, y por eso son tan rápidos: tocan cada cosa un número constante de veces.',
html:()=>{g=new Gr('cx',{r:26,fs:20,vb:[720,500],width:640,height:445,dir:false,anim:false,nodes:TGN,edges:TGE});fr=trav(g,'A','bfs');
 return`${hd('5.4','Complejidad de BFS y DFS','Cada nodo y cada arista, *una* vez')}
<div style="display:grid;grid-template-columns:640px 1fr;gap:60px;margin-top:6px;align-items:center"><div>${g.html()}</div><div>
<div class="rd"><span>Nodos procesados (V = 8)</span><b id="cxV">0</b></div><div class="bar" id="cxVb" style="width:0;background:var(--mnt)"></div>
<div class="rd" style="margin-top:12px"><span>Aristas revisadas (2E = 20)</span><b id="cxE">0</b></div><div class="bar" id="cxEb" style="width:0;background:var(--cy)"></div>
<div class="card y" style="margin-top:22px;text-align:center"><div class="tag">total de trabajo</div><div class="ant" style="font-size:72px;line-height:1.05" id="cxT">V + 2E = 0</div><div style="font-size:24px;margin-top:6px">→ <b>O(V + E)</b></div></div>
<div class="noadv" id="plH" style="margin-top:18px"></div></div></div>`},
init:el=>{player($('#plH',el),fr.length,i=>{const f=fr[i];paintTrav(g,f,true);const V=f.done.length;tween($('#cxV',el),V,v=>Math.round(v),300);tween($('#cxE',el),f.chk,v=>Math.round(v),300);$('#cxVb',el).style.width=V/8*100+'%';$('#cxEb',el).style.width=f.chk/20*100+'%';$('#cxT',el).textContent=`V + 2E = ${V+f.chk}`;if(f.cur)rip(g,f.cur,C.yel)},{ms:900})}}})());

/* 5 · BFS vs DFS · CUÁNDO USAR CADA UNO */
add({sec:4,steps:4,role:'Resumen BFS vs DFS',
notes:'Cierra la sección con una tabla. [→] filas una por una. Frase para memorizar: BFS = "círculos concéntricos como una piedra en el agua"; DFS = "metro-rata en un laberinto: hasta el fondo y regreso".',
html:()=>{const r=[['Estructura','Cola (FIFO)','Pila (LIFO) o recursión'],['Cómo avanza','Por <b>niveles</b>','<b>A fondo</b>, luego retrocede'],['Camino más corto (sin pesos)','<b class="ok">Sí</b>, garantizado','<b class="no">No</b>'],['Memoria típica','Ancho del grafo','Profundidad del grafo'],['Complejidad','O(V + E)','O(V + E)']];
 return`${hd('5.4','BFS vs DFS · resumen','Piedra en el agua *vs* rata en un laberinto')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:70px;margin-top:20px"><svg viewBox="0 0 560 330" width="800" class="boil" style="grid-column:1"><g>${[1,2,3,4].map(i=>`<circle class="dr go" pathLength="1" style="--d:${i*.35}s;--t:1.2s" cx="280" cy="165" r="${i*38}" stroke="${PALC[0]}" stroke-width="5" opacity="${1-i*.17}"/>`).join('')}<circle class="pop go" cx="280" cy="165" r="14" fill="${C.yel}"/><text x="280" y="320" text-anchor="middle" style="font:700 30px var(--hand);fill:var(--cy)">BFS · ondas del agua</text></g></svg>
<svg viewBox="0 0 560 330" width="800" class="boil"><path class="dr go" pathLength="1" style="--t:2.4s;--d:.3s" stroke="${C.mnt}" stroke-width="5" d="M40 260L130 260L130 150L230 150L230 240L340 240L340 90L440 90L440 180L520 180"/><path class="dr go" pathLength="1" style="--t:1.2s;--d:2.6s" stroke="${C.cor}" stroke-width="5" d="M520 180L440 180L440 90L340 90"/><circle class="pop go" cx="40" cy="260" r="12" fill="${C.yel}"/><text x="280" y="320" text-anchor="middle" style="font:700 30px var(--hand);fill:var(--mnt)">DFS · rata en laberinto</text></svg></div>
<table class="tb a" style="--d:.5s;margin-top:20px"><tr><th></th><th>BFS</th><th>DFS</th></tr>${r.map((a,i)=>`<tr data-s="${i}"><td>${a[0]}</td><td><span class="xin">${a[1]}</span></td><td><span class="xin">${a[2]}</span></td></tr>`).join('')}</table>`}});
