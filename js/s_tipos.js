/* ============ 5.2 TIPOS DE GRAFOS Y PROPIEDADES ============ */
const stopper=(arr)=>()=>{arr.forEach(f=>f&&f());arr.length=0};
const loopEvery=(el,ms,fn,arr)=>{fn();const id=every(el,ms,fn);arr.push(()=>clearInterval(id))};

/* 1 · GALERÍA DE LOS 8 TIPOS (cada uno con su micro-animación) */
add((()=>{let G=[],stop=[];const O={r:15,fs:13,vb:[330,190],width:330,height:190,d0:.2};
const T=[['No dirigido','Las rayitas van <b>en ambos sentidos</b>: la amistad.'],['Dirigido (digrafo)','Cada arista tiene <b>flecha</b>: seguir en Instagram.'],['Ponderado','Cada arista trae un <b>peso</b>: km, minutos, $.'],['Simple vs Multigrafo','Multi = <b>lazos</b> o aristas repetidas.'],['Conexo','<b>Todos</b> llegan a todos por algún camino.'],['Completo Kₙ','<b>Todos</b> con todos: n(n−1)/2 aristas.'],['Bipartito','Dos equipos, <b>solo hay cruces</b> entre equipos.'],['DAG','Dirigido y <b>sin ciclos</b>: prerrequisitos.']];
return{sec:2,steps:8,role:'Los 8 tipos de un vistazo',
notes:'Panorama: ocho adjetivos para describir un grafo; no son excluyentes, un mismo grafo puede ser dirigido Y ponderado Y conexo. Ve con [→] uno por uno; en cada tarjeta hay una mini animación que muestra la idea. Pregunta: ¿cuál es la diferencia entre un grafo completo y uno conexo? (Completo es mucho más exigente.)',
html:()=>{const nb={a:[40,50],b:[160,30],c:[280,70],d:[100,150],e:[240,150]},ks=['a','b','c','d','e'];G=[];
 G.push(new Gr('t1',{...O,dir:false,nodes:nb,edges:[['a','b'],['b','c'],['a','d'],['b','d'],['c','e'],['d','e']]}));
 G.push(new Gr('t2',{...O,nodes:nb,edges:[['a','b'],['b','c'],['d','a'],['b','d'],['c','e'],['e','d']]}));
 G.push(new Gr('t3',{...O,dir:false,nodes:nb,edges:[['a','b',4],['b','c',7],['a','d',2],['b','d',5],['c','e',3],['d','e',6]]}));
 G.push(new Gr('t4',{...O,dir:false,ah:false,nodes:{a:[50,95],b:[170,45],c:[270,130],d:[130,160]},edges:[['a','b'],['a','b',null,{c:26}],['b','c'],['c','c',null,{ang:-20}],['c','d'],['d','a']]}));
 G.push(new Gr('t5',{...O,dir:false,nodes:nb,edges:[['a','b'],['b','c'],['a','d'],['c','e'],['d','e']]}));
 G.push(new Gr('t6',{...O,dir:false,nodes:circ(ks,165,100,78,72),edges:allPairs(ks)}));
 G.push(new Gr('t7',{...O,dir:false,nodes:{a:[80,35],b:[80,95],c:[80,155],d:[250,60],e:[250,130]},edges:[['a','d'],['a','e'],['b','d'],['c','e'],['c','d']]}));
 G.push(new Gr('t8',{...O,nodes:{a:[40,95],b:[130,35],c:[130,155],d:[225,95],e:[305,95]},edges:[['a','b'],['a','c'],['b','d'],['c','d'],['d','e']]}));
 return`${hd('5.2','Tipos de grafos y sus propiedades','Ocho *adjetivos*, un solo dibujo')}
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px 26px;margin-top:28px">${T.map((t,i)=>`<div class="card tc ${['c','v','m','r','c','','m','v'][i]}" style="padding:14px 18px"><div class="ant" style="font-size:30px;line-height:1">${i+1}. ${t[0]}</div><div style="font-size:18px;color:var(--ink2);margin:4px 0 0;min-height:48px;line-height:1.25">${t[1]}</div>${G[i].html()}</div>`).join('')}</div>`},
init:()=>{G[4].n(['a','b','c','d','e'],'vis');G[6].n(['a','b','c'],'c1');G[6].n(['d','e'],'c2');G[5].n(['a','b','c','d','e'],'c3');G[3].e(3,'cur')},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];$$('.tc',el).forEach((c,i)=>{c.classList.toggle('dm',s>0&&i+1!==s);c.classList.toggle('ac',i+1===s)});
 if(s===1)stop.push(walker(G[0],['a','b','c','b','a','d'],{ms:520,r:9}));
 if(s===2){stop.push(walker(G[1],['a','b','c','e','d','a'],{ms:520,r:9}));loopEvery(el,2600,()=>fly(G[1],G[1].P.b,G[1].P.a,{ms:600,txt:'✗',color:C.cor,lift:20}),stop)}
 if(s===3){const d=dijkstra(G[2].nodes,G[2].E,'a',e=>e.w),p=pathTo(d.p,'e');G[2].reset();p.es.forEach(i=>G[2].e(i,'on'));p.ns.forEach(k=>G[2].n(k,'vis'));G[2].bd('e','coste '+d.d.e,0,-30);stop.push(walker(G[2],p.ns,{ms:600,r:9}))}
 if(s===4)loopEvery(el,1500,()=>{G[3].e([1,3],'cur');setTimeout(()=>G[3].e([1,3],'cur',false),700);rip(G[3],'c',C.yel)},stop);
 if(s===5)loopEvery(el,2400,()=>['a','b','c','d','e'].forEach((k,i)=>setTimeout(()=>rip(G[4],k,C.mnt),i*130)),stop);
 if(s===6)loopEvery(el,2600,()=>allPairs(['a','b','c','d','e']).forEach((p,i)=>setTimeout(()=>fly(G[5],G[5].P[p[0]],G[5].P[p[1]],{ms:500,r:5}),i*70)),stop);
 if(s===7)loopEvery(el,2200,()=>{const f=[['a','d'],['b','e'],['c','d'],['a','e']][Math.floor(Math.random()*4)];fly(G[6],G[6].P[f[0]],G[6].P[f[1]],{ms:700,r:7,color:C.yel});},stop);
 if(s===8)stop.push(walker(G[7],['a','b','d','e'],{ms:500,r:9}))
 }}})());

/* 2 · DIRIGIDO vs NO DIRIGIDO (toggle) */
add((()=>{let g,dirm=true,stop=[];const NM={A:'Ana',B:'Beto',C:'Cami',D:'Dani',E:'Eli'};return{sec:2,steps:0,lab:true,role:'Lab · dirigido o no',
notes:'LAB: alterna el botón. Instagram: yo te sigo y tú no a mí; la flecha importa y cada nodo tiene grado de entrada (seguidores) y de salida (a quién sigo). Facebook: la amistad es mutua, no hay flecha, solo un grado. Al cambiar, las flechas se transforman en rayitas con una animación. Dato: en un dirigido, suma de entradas = suma de salidas = |E|.',
html:()=>{g=new Gr('dd',{r:34,vb:[760,520],d0:.1,nodes:{A:[120,130],B:[400,60],C:[420,300],D:[160,420],E:[670,420]},lbl:NM,fs:19,edges:[['A','B'],['A','C'],['B','C'],['C','D'],['D','A'],['E','C']]});
 return`${hd('5.2','Lab · dirigido vs no dirigido','¿Importa el *sentido*?')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:60px;margin-top:10px"><div>${g.html()}</div><div>
<div class="row" style="gap:14px"><span class="btn p" id="ddA">📷 Instagram · seguir</span><span class="btn" id="ddB">👥 Facebook · amistad</span></div>
<div id="ddT" style="margin-top:26px"></div><div class="card y" id="ddC" style="margin-top:22px;font-size:25px"></div></div></div>`},
init:el=>{const draw=()=>{stop.forEach(f=>f());stop=[];g.root.classList.toggle('nodir',!dirm);$('#ddA',el).classList.toggle('p',dirm);$('#ddB',el).classList.toggle('p',!dirm);
  const d=degs(g);g.bdClear();g.nodes.forEach(k=>g.bd(k,dirm?`↓${d[k].i} ↑${d[k].o}`:`grado ${d[k].t}`,0,-52));
  const sI=g.nodes.reduce((a,k)=>a+d[k].i,0),sT=g.nodes.reduce((a,k)=>a+d[k].t,0);
  $('#ddT',el).innerHTML=`<table class="tb"><tr><th>Persona</th><th>${dirm?'Seguidores ↓ (entra)':'Grado'}</th>${dirm?'<th>Sigue a ↑ (sale)</th>':''}</tr>${g.nodes.map(k=>`<tr><td>${NM[k]}</td><td class="mono">${dirm?d[k].i:d[k].t}</td>${dirm?`<td class="mono">${d[k].o}</td>`:''}</tr>`).join('')}<tr><td style="color:var(--ink)">Suma</td><td class="mono"><b>${dirm?sI:sT}</b></td>${dirm?`<td class="mono"><b>${sI}</b></td>`:''}</tr></table>`;
  $('#ddC',el).innerHTML=dirm?`Aquí <b>importa el sentido</b>: Ana sigue a Beto, pero Beto no tiene por qué seguir a Ana. Suma de entradas = suma de salidas = <b>|E| = ${sI}</b>.`:`Aquí <b>no hay sentido</b>: una amistad une a los dos. Cada arista suma <b>2</b> al grado total: ${sT} = 2·${g.E.length}. <span class="hand" style="font-size:30px">(¡apretón de manos!)</span>`;
  loopEvery(el,1400,()=>{const e=g.E[Math.floor(Math.random()*g.E.length)];fly(g,g.P[e.a],g.P[e.b],{ms:800,r:7,color:dirm?C.yel:C.mnt});if(!dirm)fly(g,g.P[e.b],g.P[e.a],{ms:800,r:7,color:C.mnt})},stop)};
 $('#ddA',el).onclick=()=>{dirm=true;draw()};$('#ddB',el).onclick=()=>{dirm=false;draw()};dirm=true;draw()}}})());

/* 3 · SIMPLE vs MULTIGRAFO */
add((()=>{let g,mg=false;return{sec:2,steps:0,lab:true,role:'Lab · simple o multigrafo',
notes:'LAB: pulsa el botón para agregar aristas repetidas y un lazo; verás que aparecen dibujándose y que el contador de "¿es simple?" cambia. Un grafo simple no tiene lazos ni aristas paralelas; con n nodos el máximo es n(n−1)/2. Multigrafo: dos vuelos distintos entre las mismas ciudades, o una estación que da la vuelta.',
html:()=>{g=new Gr('sm',{r:36,vb:[760,520],dir:false,ah:false,d0:.1,nodes:{M:[130,280],G:[390,100],C:[640,300],P:[350,450]},fs:20,lbl:{M:'MTY',G:'GDL',C:'CDMX',P:'PUE'},
 edges:[['M','G'],['G','C'],['M','P'],['P','C'],['M','G',null,{x:1,c:36}],['G','C',null,{x:1,c:36}],['C','C',null,{x:1,ang:20}]]});
 return`${hd('5.2','Lab · simple vs multigrafo','¿Se vale *repetir* aristas?')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:60px;margin-top:10px"><div>${g.html()}</div><div>
<span class="btn p" id="smB">➕ Agregar vuelos repetidos y lazo</span>
<div style="margin-top:28px" id="smR"></div><div class="card" style="margin-top:20px;font-size:23px"><div class="tag">en cristiano</div><b>Simple</b>: máximo <b>una</b> arista entre dos nodos y <b>nada</b> que salga y regrese al mismo nodo.<br><b>Multigrafo</b>: puedes repetir (dos vuelos MTY–GDL) o tener lazos.</div></div></div>`},
init:el=>{const draw=()=>{g.cls('mg',mg);$('#smB',el).textContent=mg?'➖ Quitar los extras':'➕ Agregar vuelos repetidos y lazo';
 const n=mg?7:4,loops=mg?1:0,par=mg?2:0;$('#smR',el).innerHTML=`<div class="rd"><span>Aristas |E|</span><b>${n}</b></div><div class="rd"><span>Lazos</span><b class="${loops?'no':'ok'}">${loops}</b></div><div class="rd"><span>Aristas repetidas (paralelas)</span><b class="${par?'no':'ok'}">${par}</b></div><div class="rd"><span>¿Es simple?</span><b class="${mg?'no':'ok'}">${mg?'No · multigrafo':'Sí · simple'}</b></div>`};
 $('#smB',el).onclick=()=>{mg=!mg;draw();if(mg){[4,5,6].forEach(i=>{const e=g.Ed(i);e.querySelectorAll('.dr').forEach(p=>{p.classList.remove('go');p.style.transition='none'});void e.getBoundingClientRect();e.querySelectorAll('.dr').forEach(p=>{p.style.transition='';p.classList.add('go')})});rip(g,'G',C.cor);rip(g,'C',C.cor)}};mg=false;draw()}}})());

/* 4 · COMPLETO Kn (slider) */
add((()=>{let g,ks=['1','2','3','4','5','6','7','8'],n0=5;return{sec:2,steps:0,lab:true,role:'Lab · el grafo completo Kₙ',
notes:'LAB: mueve el slider de n. Los nodos se reacomodan en círculo (morph) y las aristas nuevas nacen. Kₙ = todos con todos. Cada nodo tiene n−1 amigos; n·(n−1) cuenta cada arista dos veces, por eso se divide entre 2. 8 nodos ya son 28 aristas; 100 nodos, 4,950.',
html:()=>{g=new Gr('kn',{r:26,fs:20,vb:[760,600],dir:false,anim:false,nodes:Object.assign(Object.fromEntries(ks.map(k=>[k,[380,300]])),circ(ks.slice(0,n0),380,300,230,230)),edges:allPairs(ks)});
 return`${hd('5.2','Lab · completo Kₙ','Todos con *todos*: ¿cuántas aristas?')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:60px;margin-top:-20px"><div>${g.html()}</div><div style="padding-top:60px">
<div class="rng"><label>Número de nodos n<span id="knN">5</span></label><input type="range" id="knS" min="1" max="8" value="5"></div>
<div style="display:flex;align-items:baseline;gap:20px;margin-top:20px"><div class="big" id="knE" style="font-size:170px;color:var(--yel)">10</div><div style="font-size:26px;color:var(--ink2)">aristas<br>en <b>K<span id="knK">5</span></b></div></div>
<div class="card" style="margin-top:14px;font-size:25px"><div class="tag">fórmula · y por qué</div><div class="mono" style="font-size:30px;margin:6px 0"><span class="cy">n</span>·(<span class="cy">n</span>−1) ÷ 2 = <b id="knF"></b></div>Cada nodo tiene <b>n−1</b> amigos; contando así, cada arista se cuenta <b>2 veces</b>, por eso <b>÷2</b>.</div></div></div>`},
init:el=>{let last=n0;const up=()=>{const n=+$('#knS',el).value;$('#knN',el).textContent=n;$('#knK',el).textContent=n;const ps=circ(ks.slice(0,n),380,300,n===1?0:230,230);ks.forEach(k=>{if(!ps[k])ps[k]=g.P[k]});
  g.move(ps,700);ks.forEach((k,i)=>{g.N(k).classList.toggle('gone',i>=n)});g.E.forEach(e=>g.Ed(e.i).classList.toggle('gone',+e.a>n||+e.b>n));
  if(n>last)rip(g,String(n),C.mnt);last=n;
  const E=n*(n-1)/2;tween($('#knE',el),E,v=>Math.round(v),500);$('#knF',el).textContent=`${n}·${n-1}÷2 = ${E}`};
 $('#knS',el).oninput=up;up()}}})());

/* 5 · BIPARTITO */
add((()=>{let a,b,stop=[];return{sec:2,steps:3,role:'Bipartito: dos equipos',
notes:'Definición: puedes pintar los nodos con DOS colores de modo que ninguna arista una dos del mismo color. [→] En un ciclo de 4 se puede: azul-rosa-azul-rosa (los colores se contagian de vecino a vecino). [→] En un ciclo de 3 no: al tercero lo tocan un azul y un rosa y no hay color que sirva. [→] Regla de oro: es bipartito si y solo si NO tiene ciclos de largo impar. Ejemplo real: alumnos y materias.',
html:()=>{a=new Gr('b4',{r:34,vb:[460,360],dir:false,d0:.2,nodes:{A:[110,90],B:[350,90],C:[350,290],D:[110,290]},edges:[['A','B'],['B','C'],['C','D'],['D','A']]});
 b=new Gr('b3',{r:34,vb:[460,360],dir:false,d0:.2,nodes:{A:[230,60],B:[360,290],C:[100,290]},edges:[['A','B'],['B','C'],['C','A']]});
 return`${hd('5.2','Bipartito','Dos *equipos*, sin peleas internas')}
<div style="display:grid;grid-template-columns:460px 460px 1fr;gap:50px;margin-top:20px;align-items:start"><div class="card c"><div class="tag">ciclo de 4 (par)</div>${a.html()}<div id="b4t" class="say" style="text-align:center;min-height:40px"></div></div>
<div class="card r"><div class="tag">ciclo de 3 (impar)</div>${b.html()}<div id="b3t" class="say" style="text-align:center;min-height:40px"></div></div>
<div><div class="card y" data-s="3" style="font-size:26px"><b>Regla de oro:</b> un grafo es bipartito ⇔ <b>no tiene ciclos de largo impar</b>.</div><div class="card" data-s="3" style="margin-top:26px;font-size:23px"><div class="tag">ejemplo real</div>🎓 <b>Alumnos</b> ↔ 📚 <b>materias</b>: un alumno se inscribe a una materia, nunca alumno con alumno.</div></div></div>
<div class="tag a" style="--d:.6s;margin-top:28px">pinta con dos colores: ninguna arista puede unir dos nodos del mismo color</div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];a.reset();b.reset();$('#b4t',el).textContent='';$('#b3t',el).textContent='';
 if(s>=1){const seq=['A','B','C','D'];seq.forEach((k,i)=>setTimeout(()=>{a.n(k,i%2?'c2':'c1');rip(a,k,i%2?C.pink:C.cy);if(i<3)fly(a,a.P[k],a.P[seq[i+1]],{ms:350,r:6})},i*380+100));setTimeout(()=>$('#b4t',el).textContent='✓ alternan perfecto',1700)}
 if(s>=2){const seq=['A','B','C'];seq.forEach((k,i)=>setTimeout(()=>{b.n(k,i===0?'c1':i===1?'c2':'bad');rip(b,k,i===2?C.cor:i?C.pink:C.cy)},i*420+100));setTimeout(()=>{b.e([1,2],'bad');$('#b3t',el).textContent='✗ C no tiene color válido';replay(b.N('C'),'shk')},1500)}}}})());

/* 6 · DAG */
add((()=>{let g,stop=[];const NMS={P:'Prog',M:'Mate',E:'Estr',A:'Algo',G:'Grafos',I:'IA'},LAY={P:[120,150],M:[120,400],E:[420,150],A:[700,275],G:[980,150],I:[1220,275]},LIN=(()=>{const o=['P','M','E','A','G','I'],p={};o.forEach((k,i)=>p[k]=[110+i*210,250]);return p})();
const SPAN=[2,1,2,1,2,1,5];
return{sec:2,steps:3,role:'DAG: dirigido sin ciclos',
notes:'DAG = Directed Acyclic Graph, grafo dirigido acíclico. Ejemplo: materias con prerrequisitos. [→] Los nodos sin flechas de entrada son por donde puedes empezar (pulsan). [→] Como no hay ciclos, puedes ACOMODAR todo en una línea con todas las flechas hacia la derecha: eso es un orden topológico (los nodos se mueven solos). [→] Si aparece una flecha que regresa, hay ciclo y ya NO existe orden posible.',
html:()=>{g=new Gr('dg',{r:46,fs:19,vb:[1320,520],d0:.2,nodes:{...LAY},lbl:NMS,sub:{},edges:[['P','E'],['E','A'],['M','A'],['A','G'],['A','I'],['G','I'],['I','P',null,{x:1}]]});
 return`${hd('5.2','DAG · Directed Acyclic Graph','Prerrequisitos *sin* círculos viciosos')}<div style="margin-top:-10px">${g.html()}</div>
<div class="row" style="gap:30px;margin-top:-6px"><div class="card" style="font-size:24px;flex:1" id="dgC">Cada flecha dice: <b>«esto va antes que esto»</b>.</div></div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];g.reset();g.bdClear();const line=s>=2;g.E.forEach(e=>{e.c=line?(e.i===6?-SPAN[6]*30:-SPAN[e.i]*(SPAN[e.i]>1?34:0)):0});g.cls('mg',s>=3);g.move(line?LIN:LAY,s===2?1100:700);
 const T=['Cada flecha dice: <b>«esto va antes que esto»</b>. Aquí: Prog → Estructuras → Algoritmos…','Los nodos <b>sin flechas de entrada</b> (verdes) son por donde puedes <b>empezar</b>: Prog y Mate.','<b>Orden topológico</b>: todo en una línea con <b>todas las flechas hacia la derecha</b>. Solo se puede si no hay ciclos.','Una flecha que <b>regresa</b> (IA → Prog) crea un <b>ciclo</b>: ya no hay orden posible. ¡Ya no es DAG!'];$('#dgC',el).innerHTML=T[s];
 if(s===1){g.n(['P','M'],'c3');loopEvery(el,1400,()=>{rip(g,'P',C.mnt);rip(g,'M',C.mnt)},stop)}
 if(s===2){g.n(['P','M'],'c3');setTimeout(()=>{const ord=['P','M','E','A','G','I'];ord.forEach((k,i)=>setTimeout(()=>{g.n(k,'c1');g.bd(k,i+1,0,-62)},i*320))},1150)}
 if(s>=3){g.n(['P','E','A','I'],'bad');g.e([0,1,4,6],'bad');loopEvery(el,1500,()=>fly(g,g.P.I,g.P.P,{ms:900,r:9,color:C.cor,lift:-80}),stop)}}}})());

/* 7 · DETECTIVE DE GRAFOS */
add((()=>{let g,api,mode='comp';const ks=['A','B','C','D','E','F'];
const PRE={arbol:[['A','B'],['A','C'],['B','D'],['B','E'],['C','F']],ciclo:[['A','B'],['B','C'],['C','D'],['D','E'],['E','F'],['F','A']],k33:[['A','B'],['A','D'],['A','F'],['C','B'],['C','D'],['C','F'],['E','B'],['E','D'],['E','F']],k6:allPairs(ks).map(p=>[p[0],p[1]]),islas:[['A','B'],['B','C'],['A','C'],['D','E']]};
function bip(list){const adj={};ks.forEach(k=>adj[k]=[]);list.forEach(e=>{adj[e.a].push(e.b);adj[e.b].push(e.a)});const col={};for(const s of ks){if(s in col)continue;col[s]=0;const q=[s];while(q.length){const u=q.shift();for(const v of adj[u]){if(!(v in col)){col[v]=1-col[u];q.push(v)}else if(col[v]===col[u])return null}}}return col}
return{sec:2,steps:0,lab:true,role:'Lab · detective de grafos',
notes:'LAB estrella de la sección. Haz clic en DOS nodos para crear o borrar la arista que los une (o clic en una arista para quitarla). El panel dice al instante qué propiedades cumple. Retos: ① hazlo conexo con el mínimo de aristas (¡sale un árbol de 5!) ② haz un bipartito ③ agrega UNA arista a un árbol y observa que aparece un ciclo ④ sigue hasta lograr K₆ (15 aristas). Usa los presets.',
html:()=>{g=new Gr('dt',{r:32,fs:22,vb:[700,600],dir:false,int:true,anim:false,nodes:circ(ks,350,300,230,230),edges:allPairs(ks)});
 return`${hd('5.2','Lab · detective de grafos','Dibuja un grafo y *averigua* qué es')}
<div style="display:grid;grid-template-columns:700px 1fr;gap:50px;margin-top:-6px"><div>${g.html()}</div><div>
<div class="tag">clic en dos nodos = crear / borrar arista · presets:</div>
<div class="row" style="gap:10px;flex-wrap:wrap;margin:8px 0 4px">${[['arbol','🌳 Árbol'],['ciclo','🔁 Ciclo C₆'],['k33','🤝 K₃,₃'],['k6','🕸 K₆'],['islas','🏝 Islas'],['','🧹 Vacío']].map(a=>`<span class="btn pre" data-p="${a[0]}" style="padding:8px 14px;font-size:19px">${a[1]}</span>`).join('')}</div>
<div class="row" style="gap:10px;margin-bottom:8px"><span class="tag">colorear:</span><span class="btn on md" data-m="comp" style="padding:6px 14px;font-size:18px">componentes</span><span class="btn md" data-m="bip" style="padding:6px 14px;font-size:18px">bipartito</span></div>
<div id="dtR"></div></div></div>`},
init:el=>{let lastTree=false;const upd=()=>{const L=api.list(),n=ks.length,m=L.length,cp=comps(ks,L.map(e=>[e.a,e.b])),conn=cp.n===1,compl=m===n*(n-1)/2,cyc=m>n-cp.n,tree=conn&&m===n-1,bc=bip(L),deg=degs(g,L);
  g.reset();ks.forEach(k=>{if(mode==='comp')g.n(k,'c'+(cp.m[k]%4+1));else if(bc)g.n(k,'c'+(bc[k]+1))});
  if(tree&&!lastTree)ks.forEach((k,i)=>setTimeout(()=>rip(g,k,C.mnt),i*90));lastTree=tree;
  const row=(t,v,ok)=>`<div class="chk"><span>${t}</span><b class="${ok===true?'ok':ok===false?'no':''}">${v}</b></div>`;
  $('#dtR',el).innerHTML=row('Aristas |E|',m)+row('Suma de grados = 2|E|',`${ks.reduce((a,k)=>a+deg[k].t,0)} = ${2*m}`)+row('Componentes',cp.n)+row('¿Conexo?',conn?'Sí':'No',conn)+row('¿Completo?',compl?`Sí · K${n}`:'No',compl)+row('¿Bipartito?',bc?'Sí':'No',!!bc)+row('¿Tiene ciclo?',cyc?'Sí':'No (acíclico)',!cyc)+row('¿Es árbol? (conexo + sin ciclos)',tree?'¡SÍ! 🌳':'No',tree)};
 api=pg(g,{onChange:upd});$$('.pre',el).forEach(b=>b.onclick=()=>{b.dataset.p?api.set(PRE[b.dataset.p]):api.clear()});$$('.md',el).forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('.md',el).forEach(x=>x.classList.toggle('on',x===b));upd()});api.set(PRE.arbol)}}})());

/* 8 · LEMA DEL APRETÓN DE MANOS */
add((()=>{let g,api;const ks=['A','B','C','D','E','F'];return{sec:2,steps:2,lab:true,role:'Lema del apretón de manos',
notes:'Pregunta: en una fiesta, ¿puede ser impar el total de manos estrechadas contando por persona? Cada apretón involucra DOS manos, una de cada persona. LAB: haz clic en dos nodos para crear/borrar aristas: cada vez que creas una, vuelan dos manitos, una a cada extremo, y la suma sube de 2 en 2. [→] Fórmula. [→] Consecuencia: la cantidad de nodos con grado impar siempre es par.',
html:()=>{g=new Gr('hs',{r:34,fs:22,vb:[700,580],dir:false,int:true,anim:false,nodes:circ(ks,350,290,220,220,-60),edges:allPairs(ks)});
 return`${hd('5.2','Lema del apretón de manos','Cada apretón cuenta *dos* manos')}
<div style="display:grid;grid-template-columns:700px 1fr;gap:50px;margin-top:-10px"><div>${g.html()}</div><div style="padding-top:10px">
<div class="tag">tú dibujas: clic en dos nodos = apretón de manos 🤝</div>
<div style="display:flex;gap:30px;margin-top:10px;align-items:flex-end"><div><div class="tag">suma de grados</div><div class="big" id="hsS" style="font-size:140px">0</div></div><div class="ant" style="font-size:80px;color:var(--mute)">=</div><div><div class="tag">2 · |E|</div><div class="big" id="hsE" style="font-size:140px;color:var(--yel)">0</div></div></div>
<div class="card y" data-s="1" style="margin-top:22px;font-size:30px;text-align:center"><span class="ant" style="font-size:56px">Σ grado(v) = 2·|E|</span></div>
<div class="card" data-s="2" style="margin-top:22px;font-size:24px"><div class="tag">consecuencia</div>Nodos con grado <b>impar</b>: <b class="mono" id="hsO" style="font-size:34px"></b> → <b>siempre es un número par</b>. Intenta lograr 1 solo… ¡no se puede!</div></div></div>`},
init:el=>{let prev=new Set();const upd=()=>{const L=api.list(),d=degs(g,L);g.bdClear();g.reset();let s=0,o=0;ks.forEach(k=>{s+=d[k].t;if(d[k].t%2){o++;g.n(k,'cur')}g.bd(k,'grado '+d[k].t,0,-52)});
  const now=new Set(L.map(e=>e.i));L.forEach(e=>{if(!prev.has(e.i)){fly(g,[(g.P[e.a][0]+g.P[e.b][0])/2,(g.P[e.a][1]+g.P[e.b][1])/2],g.P[e.a],{ms:650,txt:'🤝',lift:10});fly(g,[(g.P[e.a][0]+g.P[e.b][0])/2,(g.P[e.a][1]+g.P[e.b][1])/2],g.P[e.b],{ms:650,txt:'+1',color:C.mnt,lift:10});fly(g,g.P[e.b],g.P[e.b],{ms:650,txt:'+1',color:C.mnt,lift:30})}});prev=now;
  tween($('#hsS',el),s,v=>Math.round(v),400);tween($('#hsE',el),2*L.length,v=>Math.round(v),400);$('#hsO',el).textContent=o};
 api=pg(g,{onChange:upd});api.set([['A','B'],['B','C'],['C','A'],['C','D'],['D','E']])}}})());
