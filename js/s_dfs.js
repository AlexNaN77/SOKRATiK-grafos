/* ============ 5.7 DFS A DETALLE ============ */
/* DFS recursivo con retroceso: devuelve cuadros + la caminata completa (incluye regresos) */
function dfsRec(g,s,stopAt){const A=adjOf(g,false),fr=[],seen={},done=[],te=[],path=[],walk=[];let found=false;
 const snap=(cur,msg,line,rule,bt)=>fr.push({cur,done:done.slice(),te:te.slice(),path:path.slice(),msg,line,rule,bt:!!bt});
 (function V(u,pe){seen[u]=1;done.push(u);path.push(u);if(pe>=0)te.push(pe);walk.push(u);
  if(u===stopAt){found=true;snap(u,`¡<b>${u}</b> es la <b>salida</b>!`,1,1);return}
  snap(u,pe<0?`Empiezo en <b>${u}</b> y lo marco visitado`:`Llego a <b>${u}</b> y lo marco visitado`,1,pe<0?0:1);
  for(const [v,i] of A[u]){if(seen[v]){snap(u,`<b>${u}</b> mira a <b>${v}</b>: ya visitado → lo ignora`,3,1);continue}
   snap(u,`<b>${u}</b> ve a <b>${v}</b> sin visitar → avanza`,4,1);V(v,i);if(found)return;walk.push(u)}
  snap(u,`<b>${u}</b> ya no tiene salida → <b>retrocede</b>${path.length>1?' a <b>'+path[path.length-2]+'</b>':''}`,5,2,true);path.pop()})(s,-1);
 return{fr,walk}}
function paintDfs(g,f){g.reset();g.bdClear();f.done.forEach(k=>g.n(k,'vis'));f.path.forEach(k=>{if(k!==f.cur)g.n(k,'c1')});f.te.forEach(i=>g.e(i,'on'));
 for(let j=0;j<f.path.length-1;j++){const x=g.idx(f.path[j],f.path[j+1]);if(x>=0)g.e(x,'cur')}if(f.cur){g.n(f.cur,'cur');if(f.bt)g.bd(f.cur,'↩ retroceso',0,-52)}}
const CODE=['DFS(u):','  visitado[u] = verdadero','  para cada vecino v de u:','    si no visitado[v]:','      DFS(v)   ← avanza','  // sin más vecinos: retrocede'];
const codeHtml=on=>CODE.map((l,i)=>`<span class="cl2${i===on?' on':''}">${l.replace(/(visitado|DFS)/g,'<span class="c">$1</span>').replace(/(para cada|si no)/g,'<span class="v">$1</span>').replace(/(←.*|\/\/.*)/g,'<span class="m">$1</span>')}</span>`).join('');

/* 1 · EL LABERINTO (hilo de Ariadna) */
add((()=>{let g,pl,R_;const MN={S:[80,260],a:[250,260],b:[250,100],c:[250,430],d:[430,100],e:[430,300],f:[430,460],g:[620,100],h:[620,380],X:[800,260]},ME=[['S','a'],['a','b'],['b','d'],['d','g'],['a','c'],['c','f'],['f','h'],['h','X'],['c','e'],['e','f']];
return{sec:7,steps:0,lab:true,role:'DFS = salir de un laberinto',
notes:'Imagina que estás perdido en un laberinto con un gis (marcas de tiza = nodos visitados) y un hilo atado a la entrada (el hilo = tu camino actual). REGLA: avanza por un pasillo que no hayas pisado; si llegas a un callejón o a puras marcas de tiza, REGRESA por el hilo hasta la última bifurcación con pasillos sin probar. Dale ▶ Auto y mira: llega a g (callejón), retrocede, prueba otra rama, se mete a e (otro callejón), retrocede y por fin encuentra X. Eso es DFS: profundidad primero, retroceso cuando no hay salida.',
html:()=>{g=new Gr('mz',{r:28,fs:22,vb:[900,540],dir:false,d0:.1,nodes:MN,edges:ME,lbl:{S:'⌂',X:'★'},sub:{S:'entrada',X:'salida'}});R_=dfsRec(g,'S','X');
 return`${hd('5.7','DFS · profundidad primero','Un laberinto, un *hilo* y un gis')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:0"><div>${g.html()}</div><div>
<div class="lst a" style="--d:.3s">${[['Marca de gis','nodo <b>visitado</b>'],['Hilo de Ariadna','tu <b>camino actual</b> (la pila)'],['Callejón sin salida','no hay vecinos nuevos → <b>retrocede</b>']].map((a,i)=>`<div><i>${i+1}</i><div><b style="font-size:26px">${a[0]}</b><div style="font-size:20px;color:var(--ink2)">${a[1]}</div></div></div>`).join('')}</div>
<div class="read" id="mzM" style="margin-top:18px;min-height:84px;font-size:23px"></div><div class="noadv" id="plH" style="margin-top:16px"></div></div></div>`},
init:el=>{pl=player($('#plH',el),R_.fr.length,i=>{const f=R_.fr[i];paintDfs(g,f);$('#mzM',el).innerHTML=f.msg;if(f.cur)rip(g,f.cur,f.bt?C.cor:C.yel)},{ms:850,auto:1200})}}})());

/* 2 · PASO A PASO + CÓDIGO */
add((()=>{let g,pl,R_;return{sec:7,steps:0,lab:true,role:'DFS paso a paso + código',
notes:'LAB: es el mismo algoritmo con código en vivo. Los tres pasos del temario: 1) elegir nodo inicial y marcarlo; 2) avanzar a un vecino no visitado; 3) retroceder (backtracking) cuando no hay salida. Mira cómo se enciende la línea del código y la tarjeta de la regla que está pasando. Arrastra la barra para ir y venir en el tiempo. Pregunta: ¿cuántas veces se mira cada arista? (2, una desde cada extremo: por eso O(V+E)).',
html:()=>{g=new Gr('d2',{r:26,fs:20,vb:[720,500],width:600,height:417,dir:false,anim:false,nodes:TGN,edges:TGE});R_=dfsRec(g,'A');
 return`${hd('5.7','DFS · el algoritmo','Tres reglas y *nada* más')}
<div style="display:grid;grid-template-columns:600px 1fr;gap:40px;margin-top:6px"><div>${g.html()}<div class="read" id="d2M" style="margin-top:8px;font-size:22px;min-height:62px"></div></div><div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${[['1','Elegir inicio','Marca el nodo inicial'],['2','Avanzar','A un vecino <b>no visitado</b>'],['3','Retroceder','Si <b>no hay salida</b>']].map((a,i)=>`<div class="card tc rl" data-r="${i}" style="padding:12px 16px"><div class="tag">paso ${a[0]}</div><div class="ant" style="font-size:30px;line-height:1.05">${a[1]}</div><div style="font-size:18px;color:var(--ink2)">${a[2]}</div></div>`).join('')}</div>
<div class="term" id="d2C" style="margin-top:18px;font-size:22px"></div>
<div class="row" style="gap:14px;margin-top:14px"><span class="chip c">complejidad O(V + E)</span><span class="chip m">pila / recursión</span></div><div class="noadv" id="plH" style="margin-top:12px"></div></div></div>`},
init:el=>{pl=player($('#plH',el),R_.fr.length,i=>{const f=R_.fr[i];paintDfs(g,f);$('#d2M',el).innerHTML=f.msg;$('#d2C',el).innerHTML=codeHtml(f.line);$$('.rl',el).forEach(c=>{c.classList.toggle('ac',+c.dataset.r===f.rule);c.classList.toggle('dm',+c.dataset.r!==f.rule)});if(f.cur)rip(g,f.cur,f.bt?C.cor:C.yel)},{ms:900,auto:1000})}}})());

/* 3 · PILA vs RECURSIÓN */
add((()=>{let g,pl,R_,F_;return{sec:7,steps:0,lab:true,role:'Lab · pila explícita = recursión',
notes:'LAB: dos formas de escribir DFS y SON LA MISMA COSA. A la derecha, la pila explícita (LIFO: el último que entra es el primero que sale). A la izquierda de ella, la pila de llamadas de la recursión: cada DFS(v) pendiente es una "tarjeta" apilada; al terminar, se saca. La computadora ya trae una pila escondida para la recursión. Detalle: con pila explícita puedes apilar un nodo varias veces y descartarlo si ya estaba visitado (mira los "descartados").',
html:()=>{g=new Gr('d3',{r:26,fs:20,vb:[720,500],width:560,height:389,dir:false,anim:false,nodes:TGN,edges:TGE});R_=dfsRec(g,'A');F_=trav(g,'A','dfs');
 return`${hd('5.7','Estructura de datos de DFS','La pila *escondida* de la recursión')}
<div style="display:grid;grid-template-columns:560px 1fr 1fr;gap:34px;margin-top:6px"><div>${g.html()}</div>
<div class="card v" style="padding:16px 18px"><div class="ant" style="font-size:30px">Recursión</div><div style="font-size:18px;color:var(--ink2)">la <b>pila de llamadas</b> (la pone Python/Java solita)</div><div class="stk" id="d3R" style="margin-top:14px"></div><div class="tag" style="margin-top:10px">arriba = DFS que se está ejecutando</div></div>
<div class="card m" style="padding:16px 18px"><div class="ant" style="font-size:30px">Pila explícita</div><div style="font-size:18px;color:var(--ink2)">tú la declaras: <span class="mono">pila.push / pila.pop</span></div><div class="stk" id="d3E" style="margin-top:14px"></div><div class="tag" style="margin-top:10px">arriba = el próximo en salir</div><div class="read" id="d3M" style="margin-top:12px;font-size:19px;min-height:74px"></div></div></div>
<div class="noadv" id="plH" style="margin-top:14px"></div>`},
init:el=>{const n=Math.max(R_.fr.length,F_.length);pl=player($('#plH',el),n,i=>{const a=R_.fr[Math.min(i,R_.fr.length-1)],b=F_[Math.min(i,F_.length-1)];paintDfs(g,a);
  $('#d3R',el).innerHTML=a.path.map((k,j)=>`<div class="it${j===a.path.length-1?' top':''}" style="min-width:112px">DFS(${k})</div>`).join('')||'<span class="mute">vacía</span>';
  $('#d3E',el).innerHTML=stkHtml(b,false);$('#d3M',el).innerHTML=b.msg;if(a.cur)rip(g,a.cur,C.yel)},{ms:1000,auto:1000})}}})());

/* 4 · ¿DÓNDE SE USA? (resumen animado) */
add((()=>{let G=[],stop=[];const O={r:15,fs:13,vb:[330,190],width:330,height:190,dir:false,d0:.1};
const T=[['Detectar ciclos','Si ves un nodo <b>ya visitado</b> (que no es tu padre) → hay ciclo.'],['Orden topológico','Poner tareas en fila respetando <b>«esto antes que esto»</b>.'],['Componentes conexas','Contar las <b>islas</b> del grafo.'],['Laberintos','Encontrar <b>una</b> salida (no la más corta).']];
return{sec:7,steps:4,role:'Casos de uso de DFS',
notes:'Cuatro cosas que DFS resuelve de maravilla; en las siguientes diapositivas las vemos una por una con laboratorio. [→] Ciclos. [→] Orden topológico. [→] Componentes. [→] Laberintos. Idea fuerte: DFS no es solo "recorrer", es una herramienta para descubrir ESTRUCTURA del grafo.',
html:()=>{G=[];G.push(new Gr('u1',{...O,nodes:{a:[50,60],b:[140,30],c:[250,70],d:[200,150],e:[90,140]},edges:[['a','b'],['b','c'],['c','d'],['d','e'],['e','b']]}));
 G.push(new Gr('u2',{...O,dir:true,nodes:{a:[40,95],b:[130,35],c:[130,155],d:[230,95],e:[300,95]},edges:[['a','b'],['a','c'],['b','d'],['c','d'],['d','e']]}));
 G.push(new Gr('u3',{...O,nodes:{a:[40,50],b:[110,100],c:[50,150],d:[190,40],e:[250,110],f:[300,45],g:[280,160]},edges:[['a','b'],['b','c'],['d','e'],['e','f'],['f','d']]}));
 G.push(new Gr('u4',{...O,nodes:{a:[40,95],b:[120,40],c:[120,150],d:[220,40],e:[220,150],f:[300,95]},edges:[['a','b'],['a','c'],['b','d'],['c','e'],['d','f'],['e','f']]}));
 return`${hd('5.7','DFS · para qué sirve','Cuatro *superpoderes* de DFS')}
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:28px 40px;margin-top:26px">${T.map((t,i)=>`<div class="card tc ${['r','c','m','v'][i]}" data-s="${i+1}" style="padding:16px 22px;display:grid;grid-template-columns:330px 1fr;gap:22px;align-items:center"><div>${G[i].html()}</div><div><div class="ant" style="font-size:36px;line-height:1">${i+1}. ${t[0]}</div><div style="font-size:22px;color:var(--ink2);margin-top:8px">${t[1]}</div></div></div>`).join('')}</div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];G.forEach(g=>g.reset());
 if(s===1){G[0].n(['b','c','d','e'],'bad');G[0].e([1,2,3,4],'bad');stop.push(walker(G[0],['a','b','c','d','e','b'],{ms:520,color:C.cor,r:9}))}
 if(s===2){['a','b','c','d','e'].forEach((k,i)=>setTimeout(()=>{G[1].n(k,'c3');G[1].bd(k,i+1,0,-26)},i*340));}
 if(s===3){G[2].n(['a','b','c'],'c1');G[2].n(['d','e','f'],'c2');G[2].n('g','c3');loopEvery(el,2000,()=>['a','d','g'].forEach((k,i)=>setTimeout(()=>rip(G[2],k,[C.cy,C.pink,C.mnt][i]),i*220)),stop)}
 if(s===4)stop.push(walker(G[3],['a','b','d','f'],{ms:520,color:C.yel,r:9}))}}})());

/* 5 · DETECTAR CICLOS (LAB) */
function cycFrames(g,s){const A=adjOf(g,false,true),fr=[],seen={},done=[],path=[];let found=null;
 const off=i=>g.Ed(i).classList.contains('off');const nb={};g.nodes.forEach(k=>nb[k]=A[k].filter(p=>!off(p[1])));
 const snap=(cur,msg,cyc)=>fr.push({cur,done:done.slice(),path:path.slice(),msg,cyc});
 (function V(u,par){seen[u]=1;done.push(u);path.push(u);snap(u,`Visito <b>${u}</b>${par?` (vengo de ${par})`:''}`);
  for(const [v] of nb[u]){if(found)return;if(v===par)continue;if(seen[v]){const k=path.indexOf(v);found=path.slice(k);snap(u,`<b>${u}</b> ve a <b>${v}</b>: ¡ya visitado y <b>no es mi padre</b>! → <b class="no">CICLO</b>`,found);return}V(v,u);if(found)return}path.pop()})(s,null);
 if(!found)snap(null,'Recorrí todo y <b class="ok">nunca</b> vi un nodo visitado (que no fuera mi padre) → <b class="ok">sin ciclos</b>');return fr}
add((()=>{let g,pl,withC=true;const ks=[...'ABCDEF'];return{sec:7,steps:0,lab:true,role:'Lab · DFS detecta ciclos',
notes:'LAB: regla de oro: durante DFS, si desde un nodo ves a un vecino que YA fue visitado y NO es tu padre (de donde viniste), entonces hay un ciclo. Dale ▶ Auto con la arista E–B (hay ciclo B-C-D-E) y mira que al final se ilumina en rojo. Luego pulsa "quitar E–B": el grafo es un árbol y DFS termina sin alarma. Por eso un árbol = sin ciclos: DFS nunca ve un visitado que no sea el padre.',
html:()=>{g=new Gr('d5',{r:30,fs:22,vb:[760,500],dir:false,anim:false,nodes:{A:[90,250],B:[260,250],C:[390,90],D:[620,160],E:[560,400],F:[260,440]},edges:[['A','B'],['B','C'],['C','D'],['D','E'],['B','F'],['E','B']]});
 return`${hd('5.7','Uso 1 · ciclos','«Ya lo visité y *no es mi padre*» = ciclo')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:50px;margin-top:0"><div>${g.html()}</div><div>
<div class="row" style="gap:12px"><span class="btn p" id="d5A">Con E–B (hay ciclo)</span><span class="btn" id="d5B">Quitar E–B (árbol)</span></div>
<div class="read" id="d5M" style="margin-top:20px;min-height:100px;font-size:24px"></div><div class="card y" id="d5R" style="margin-top:16px;font-size:26px;text-align:center"></div><div class="noadv" id="plH" style="margin-top:18px"></div></div></div>`},
init:el=>{const mk=()=>{$('#d5A',el).classList.toggle('p',withC);$('#d5B',el).classList.toggle('p',!withC);offE(g,5,!withC);const F2=cycFrames(g,'A');
  pl=player($('#plH',el),F2.length,i=>{const f=F2[i];g.reset();g.bdClear();f.done.forEach(k=>g.n(k,'vis'));f.path.forEach(k=>g.n(k,'c1'));if(f.cur)g.n(f.cur,'cur');if(f.cyc){f.cyc.forEach(k=>g.n(k,'bad'));for(let j=0;j<f.cyc.length;j++){const x=g.idx(f.cyc[j],f.cyc[(j+1)%f.cyc.length]);if(x>=0)g.e(x,'bad')}replay(g.root,'shk')}
   $('#d5M',el).innerHTML=f.msg;$('#d5R',el).innerHTML=f.cyc?'⚠ ciclo: <b>'+f.cyc.join(' → ')+' → '+f.cyc[0]+'</b>':(i===F2.length-1&&!withC?'🌳 es un <b>árbol</b>':'buscando…');if(f.cur)rip(g,f.cur,f.cyc?C.cor:C.yel)},{ms:950,auto:700})};
 $('#d5A',el).onclick=()=>{withC=true;mk()};$('#d5B',el).onclick=()=>{withC=false;mk()};mk()}}})());

/* 6 · ORDEN TOPOLÓGICO (LAB) */
add((()=>{let g,pl,fr;const NMS={Int:[110,150],Pan:[330,100],Cal:[110,330],Zap:[560,330],Cam:[330,440],Cor:[560,460],Cin:[600,130],Sac:[860,260]},
LB={Int:'Int',Pan:'Pan',Cal:'Cal',Zap:'Zap',Cam:'Cam',Cor:'Cor',Cin:'Cin',Sac:'Sac'},
EDG=[['Int','Pan'],['Int','Zap'],['Pan','Zap'],['Pan','Cin'],['Cal','Zap'],['Cam','Cor'],['Cam','Cin'],['Cor','Sac'],['Cin','Sac']];
const NM2={Int:'ropa interior',Pan:'pantalón',Cal:'calcetines',Zap:'zapatos',Cam:'camisa',Cor:'corbata',Cin:'cinturón',Sac:'saco'};
function topo(g){const A=adjOf(g,true),fr=[],seen={},fin=[],path=[];const snap=(cur,msg,state)=>fr.push({cur,seen:Object.keys(seen),fin:fin.slice(),path:path.slice(),msg});
 snap(null,'Voy a hacer DFS desde cada nodo. Cuando un nodo <b>termina</b>, lo pongo <b>al frente</b> de la lista.');
 (function V(u){seen[u]=1;path.push(u);snap(u,`Entro a <b>${NM2[u]}</b>`);for(const [v] of A[u]){if(!seen[v]){snap(u,`${NM2[u]} → <b>${NM2[v]}</b> (va después): primero lo resuelvo`);V(v)}}fin.unshift(u);path.pop();snap(u,`<b>${NM2[u]}</b> terminó (ya puse todo lo que depende de él) → lo pongo <b>al frente</b>`)})('Int');
 g.nodes.forEach(k=>{if(!seen[k])(function V(u){seen[u]=1;path.push(u);snap(u,`Entro a <b>${NM2[u]}</b>`);for(const [v] of A[u])if(!seen[v])V(v);fin.unshift(u);path.pop();snap(u,`<b>${NM2[u]}</b> terminó → al frente`)})(k)});
 snap(null,'<b class="ok">Listo</b>: la lista, de izquierda a derecha, es un <b>orden válido</b> para vestirte.');return fr}
return{sec:7,steps:0,lab:true,role:'Lab · orden topológico con DFS',
notes:'LAB: vestirse es un DAG: no puedes ponerte zapatos antes que calcetines. Truco de DFS: cuando un nodo TERMINA (ya terminó todo lo que depende de él), lo pones al FRENTE de una lista. Al final la lista queda en orden topológico: todas las flechas apuntan a la derecha. Dale ▶ Auto; abajo se va armando la fila. Importante: solo funciona en DAGs; con un ciclo no existe tal orden.',
html:()=>{g=new Gr('d6',{r:30,fs:19,vb:[960,540],dir:true,anim:false,nodes:NMS,edges:EDG,lbl:LB,sub:NM2});fr=topo(g);
 return`${hd('5.7','Uso 2 · orden topológico','Vestirse *también* es un grafo')}
<div style="display:grid;grid-template-columns:960px 1fr;gap:40px;margin-top:-8px"><div>${g.html()}</div><div><div class="read" id="d6M" style="min-height:130px;font-size:22px"></div><div class="tag" style="margin-top:14px">fila resultante · izquierda → derecha</div><div class="sk2" id="d6L" style="margin-top:8px;min-height:50px"></div></div></div>
<div class="noadv" id="plH" style="margin-top:6px"></div>`},
init:el=>{pl=player($('#plH',el),fr.length,i=>{const f=fr[i];g.reset();f.seen.forEach(k=>g.n(k,'fr'));f.fin.forEach(k=>g.n(k,'c3'));f.path.forEach(k=>g.n(k,'c1'));if(f.cur)g.n(f.cur,'cur');
  $('#d6M',el).innerHTML=f.msg;$('#d6L',el).innerHTML=f.fin.map((k,j)=>`<span class="e ok" style="${j===0&&f.cur===k?'animation:itIn .5s var(--spring)':''}">${NM2[k]}</span>`).join('')||'<span class="mute">(vacía)</span>';if(f.cur)rip(g,f.cur,C.yel)},{ms:700,auto:1000})}}})());

/* 7 · COMPONENTES CONEXAS (LAB) */
add((()=>{let g,pl,fr;const ks=[...'ABCDEFGHIJK'],ED=[['A','B'],['B','C'],['A','C'],['D','E'],['E','F'],['F','G'],['E','H'],['I','J']];
function compFr(g){const A=adjOf(g,false),fr=[],col={};let n=0;const snap=(cur,msg)=>fr.push({cur,col:{...col},n,msg});snap(null,'Voy nodo por nodo: si no está pintado, <b>es una isla nueva</b> y lanzo un DFS.');
 g.nodes.forEach(k=>{if(col[k]!=null)return;n++;snap(k,`<b>${k}</b> sin pintar → ¡<b>isla #${n}</b>! Lanzo DFS desde aquí`);const st=[k];col[k]=n;while(st.length){const u=st.pop();snap(u,`DFS pinta <b>${u}</b> con el color de la isla ${n}`);A[u].forEach(([v])=>{if(col[v]==null){col[v]=n;st.push(v)}})}});
 snap(null,`<b class="ok">Total: ${n} componentes conexas</b> (islas). ${g.nodes.filter(k=>true).length} nodos revisados, cada uno una vez.`);return fr}
return{sec:7,steps:0,lab:true,role:'Lab · componentes conexas',
notes:'LAB: ¿cuántas "islas" tiene este grafo? Un DFS desde un nodo alcanza TODA su isla y nada más. El truco: recorre los nodos en orden; si uno está sin pintar, es una isla nueva, lanza DFS desde ahí y pinta toda la isla. El número de veces que lanzas DFS = número de componentes. Aplicación: redes sociales (grupos aislados), imagen (manchas conectadas), redes (¿hay pedazos sin internet?). Un grafo conexo tiene 1 sola componente.',
html:()=>{g=new Gr('d7',{r:28,fs:21,vb:[900,500],dir:false,anim:false,nodes:{A:[90,110],B:[250,60],C:[200,250],D:[430,110],E:[560,250],F:[700,140],G:[820,300],H:[470,400],I:[140,420],J:[330,440],K:[760,450]},edges:ED});fr=compFr(g);
 return`${hd('5.7','Uso 3 · componentes conexas','¿Cuántas *islas* hay?')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:0"><div>${g.html()}</div><div><div class="tag">islas encontradas</div><div class="big" id="d7N" style="font-size:200px;color:var(--yel)">0</div><div class="read" id="d7M" style="min-height:110px;font-size:22px;margin-top:6px"></div></div></div><div class="noadv" id="plH" style="margin-top:6px"></div>`},
init:el=>{pl=player($('#plH',el),fr.length,i=>{const f=fr[i];g.reset();Object.keys(f.col).forEach(k=>g.n(k,'c'+((f.col[k]-1)%7+1)));if(f.cur)g.n(f.cur,'cur');tween($('#d7N',el),f.n,v=>Math.round(v),300);$('#d7M',el).innerHTML=f.msg;if(f.cur)rip(g,f.cur,PALC[(Math.max(1,f.n)-1)%7])},{ms:650,auto:1000})}}})());

/* 8 · LABERINTO REAL (LAB) */
add((()=>{let W_=14,H_=8,CS=56,open=[],algo='dfs',tok=0,el_;
const D={N:[0,-1,'S'],E:[1,0,'W'],S:[0,1,'N'],W:[-1,0,'E']};
const nbs=c=>{const x=c%W_,y=(c/W_)|0,o=[];['N','E','S','W'].forEach(d=>{if(open[c][d])o.push((y+D[d][1])*W_+x+D[d][0])});return o};
function gen(){open=[...Array(W_*H_)].map(()=>({N:0,E:0,S:0,W:0}));const seen=new Set([0]),st=[0];
 while(st.length){const c=st[st.length-1],x=c%W_,y=(c/W_)|0,nb=Object.keys(D).filter(d=>{const nx=x+D[d][0],ny=y+D[d][1];return nx>=0&&ny>=0&&nx<W_&&ny<H_&&!seen.has(ny*W_+nx)});if(!nb.length){st.pop();continue}
  const d=nb[Math.floor(Math.random()*nb.length)],n=(y+D[d][1])*W_+x+D[d][0];open[c][d]=1;open[n][D[d][2]]=1;seen.add(n);st.push(n)}
 for(let k=0;k<12;k++){const x=Math.floor(Math.random()*(W_-1)),y=Math.floor(Math.random()*H_);open[y*W_+x].E=1;open[y*W_+x+1].W=1}}
function solve(a){const end=W_*H_-1,par={0:-1},order=[],seen=new Set();
 if(a==='bfs'){const q=[0];seen.add(0);while(q.length){const c=q.shift();order.push(c);if(c===end)break;nbs(c).forEach(n=>{if(!seen.has(n)){seen.add(n);par[n]=c;q.push(n)}})}}
 else{const st=[0];while(st.length){const c=st.pop();if(seen.has(c))continue;seen.add(c);order.push(c);if(c===end)break;[...nbs(c)].reverse().forEach(n=>{if(!seen.has(n)){par[n]=c;st.push(n)}})}}
 const path=[];for(let c=end;c!==-1&&c!==undefined;c=par[c])path.unshift(c);return{order,path}}
function draw(){const g=$('#mzG',el_);let w='';for(let c=0;c<W_*H_;c++){const x=(c%W_)*CS,y=((c/W_)|0)*CS,o=open[c];if(!o.N)w+=`M${x} ${y}H${x+CS}`;if(!o.W)w+=`M${x} ${y}V${y+CS}`;if(c%W_===W_-1)w+=`M${x+CS} ${y}V${y+CS}`;if((c/W_|0)===H_-1)w+=`M${x} ${y+CS}H${x+CS}`}
 let cells='';for(let c=0;c<W_*H_;c++)cells+=`<rect id="mc${c}" x="${(c%W_)*CS+3}" y="${((c/W_)|0)*CS+3}" width="${CS-6}" height="${CS-6}" rx="8" fill="transparent" style="transition:fill .25s"/>`;
 g.innerHTML=`${cells}<g class="boil"><path d="${w}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" fill="none"/></g><text x="${CS/2}" y="${CS/2+2}" style="font:700 30px var(--disp);fill:${C.yel};text-anchor:middle;dominant-baseline:central">⌂</text><text x="${(W_-.5)*CS}" y="${(H_-.5)*CS+2}" style="font:700 30px var(--disp);fill:${C.yel};text-anchor:middle;dominant-baseline:central">★</text>`}
async function run(){const my=++tok;draw();const s=solve(algo);$('#mzO',el_).textContent='0';$('#mzP',el_).textContent='—';const col=algo==='dfs'?C.mnt:C.cy;
 for(let k=0;k<s.order.length;k++){if(my!==tok||!el_.isConnected)return;const r=$('#mc'+s.order[k],el_);r.setAttribute('fill',col);r.style.opacity=.55;$('#mzO',el_).textContent=k+1;if(k%2===0)await sleep(26)}
 for(let k=0;k<s.path.length;k++){if(my!==tok||!el_.isConnected)return;const r=$('#mc'+s.path[k],el_);r.setAttribute('fill',C.yel);r.style.opacity=1;r.classList.add('cin');r.style.transformBox='fill-box';r.style.transformOrigin='center';$('#mzP',el_).textContent=k+1;await sleep(40)}
 $('#mzR',el_).innerHTML=`${algo==='dfs'?'<b>DFS</b>':'<b>BFS</b>'} exploró <b>${s.order.length}</b> casillas y la ruta mide <b>${s.path.length}</b>. ${algo==='dfs'?'DFS encuentra <b>una</b> salida (a veces con rodeos).':'BFS garantiza la ruta <b>más corta</b>.'}`}
return{sec:7,steps:0,lab:true,role:'Lab · resuelve un laberinto',
notes:'LAB final de DFS. El laberinto se genera con DFS (¡el "recursive backtracker"!) y luego lo resolvemos. Elige DFS o BFS y pulsa Resolver: en verde/azul ves las casillas EXPLORADAS y en amarillo la ruta final. DFS se mete a fondo y explora menos o más según la suerte, la ruta puede ser larga; BFS expande como onda y siempre da la ruta más corta. Pulsa "Nuevo laberinto" varias veces y compara cuántas casillas explora cada uno. Ojo: se añadieron algunos pasillos extra (ciclos) para que haya varias rutas.',
html:()=>`${hd('5.7','Uso 4 · laberintos','DFS lo *crea*… y BFS/DFS lo *resuelven*')}
<div style="display:grid;grid-template-columns:790px 1fr;gap:50px;margin-top:6px;align-items:center"><svg id="mzG" viewBox="-6 -6 ${14*56+12} ${8*56+12}" width="790" height="454" class="ch"></svg><div>
<div class="row" style="gap:10px;flex-wrap:wrap"><span class="btn p" id="mzA">DFS</span><span class="btn" id="mzB">BFS</span></div><div class="row" style="gap:10px;margin-top:12px"><span class="btn p" id="mzS">▶ Resolver</span><span class="btn" id="mzN">🎲 Nuevo laberinto</span></div>
<div style="margin-top:22px"><div class="rd"><span><span class="sw" style="background:var(--mnt)"></span>Casillas exploradas</span><b id="mzO">0</b></div><div class="rd"><span><span class="sw" style="background:var(--yel)"></span>Largo de la ruta</span><b id="mzP">—</b></div></div>
<div class="card y" id="mzR" style="margin-top:20px;font-size:22px;min-height:96px">Pulsa <b>Resolver</b> y compara DFS contra BFS en el mismo laberinto.</div></div></div>`,
init:el=>{el_=el;gen();draw();const sa=a=>{algo=a;$('#mzA',el).classList.toggle('p',a==='dfs');$('#mzB',el).classList.toggle('p',a==='bfs')};
 $('#mzA',el).onclick=()=>{sa('dfs');run()};$('#mzB',el).onclick=()=>{sa('bfs');run()};$('#mzS',el).onclick=run;$('#mzN',el).onclick=()=>{tok++;gen();draw();$('#mzO',el).textContent='0';$('#mzP',el).textContent='—'}}}})());
