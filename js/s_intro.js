/* ============ 00 INTRO + 5.1 ELEMENTOS BÁSICOS ============ */

/* 1 · PORTADA */
add((()=>{let g;return{sec:0,steps:1,role:'Portada',
notes:'Saludo: "Hoy vamos a ver la idea más simple y más poderosa de la computación: puntos unidos por rayitas." Gancho: ¿cuántos usaron Maps o Instagram hoy? [→] El grafo se mueve: nodos y aristas, nada más. Todo lo demás del tema es contar, recorrer y optimizar ese dibujo.',
html:()=>{g=new Gr('cv',{r:26,vb:[760,640],dir:false,d0:.5,nodes:{A:[120,120],B:[360,70],C:[620,150],D:[250,300],E:[500,330],F:[110,470],G:[330,540],H:[620,500],I:[700,320]},
 edges:[['A','B'],['B','C'],['A','D'],['B','D'],['B','E'],['C','E'],['C','I'],['D','E'],['D','F'],['F','G'],['G','E'],['G','H'],['E','H'],['H','I']]});
 return`<div style="display:grid;grid-template-columns:1.2fr 1fr;align-items:center;height:100%;margin-top:-30px"><div>
<div class="kick a"><b>U5</b>Unidad 5 · Ciencias de la Computación</div>
<h1 class="ttl">${W('*Grafos*')}</h1>
<p class="sub a" style="--d:.7s;font-size:34px;max-width:900px">Teoría de grafos y su <span class="hl"><b>relevancia</b></span> en Ciencias de la Computación.</p>
<div class="a" style="--d:1.1s;margin-top:34px"><span class="chip t">punto + rayita = grafo</span><span class="chip c">animaciones boil</span><span class="chip m">labs que se tocan</span></div>
<div class="a" style="--d:1.4s;margin-top:8px;font-size:22px;color:var(--ink2);max-width:880px">Método: <b>Feynman</b> + preguntas iterativas. Si no lo puedes explicar con manzanitas, todavía no lo entiendes.</div></div>
<div style="justify-self:center;position:relative"><div class="fl">${g.html()}</div><div class="card y" data-s="1" style="position:absolute;top:-10px;right:-30px;font:700 44px/1 var(--hand);padding:14px 24px;rotate:6deg">¡esto es un grafo!</div></div></div>`},
init:el=>{every(el,2400,()=>{const P={};g.nodes.forEach(k=>{const b=g.o.nodes[k];P[k]=[b[0]+J(26),b[1]+J(26)]});g.move(P,2200)})},
onStep:(el,s)=>{if(s===1)replay($('#'+g.id,el),'shk')}}})());

/* 2 · GANCHO */
add((()=>{let m,so,it,stop=[];return{sec:0,steps:3,role:'El gancho',
notes:'Pregunta al público: ¿cómo sabe Maps el camino más rápido? ¿cómo sabe Instagram a quién sugerirte? [→] Maps: cruces = nodos, calles = aristas con minutos. [→] Instagram: personas = nodos, "seguir" = arista dirigida. [→] Internet: routers = nodos, cables = aristas. Es el MISMO objeto matemático en tres disfraces.',
html:()=>{
 m=new Gr('mp',{r:17,fs:15,vb:[520,330],dir:false,d0:.3,nodes:{a:[50,170],b:[160,60],c:[170,260],d:[300,150],e:[400,50],f:[470,240]},edges:[['a','b',4],['a','c',6],['b','d',5],['c','d',2],['b','e',9],['d','e',4],['d','f',7],['e','f',3],['c','f',12]]});
 so=new Gr('so',{r:19,fs:15,vb:[520,330],d0:.3,nodes:{a:[260,40],b:[80,130],c:[420,120],d:[150,270],e:[370,270]},lbl:{a:'Ana',b:'Beto',c:'Cami',d:'Dani',e:'Eli'},
  edges:[['a','b'],['b','d'],['a','c'],['c','e'],['d','e'],['b','a',null,{c:20}],['a','e',null,{x:1}]]});
 it=new Gr('it',{r:17,fs:14,vb:[520,330],dir:false,d0:.3,nodes:{pc:[40,170],r1:[150,90],r2:[150,250],r3:[280,170],r4:[390,70],r5:[390,270],sv:[490,170]},lbl:{pc:'PC',r1:'R1',r2:'R2',r3:'R3',r4:'R4',r5:'R5',sv:'WEB'},
  edges:[['pc','r1'],['pc','r2'],['r1','r3'],['r2','r3'],['r3','r4'],['r3','r5'],['r4','sv'],['r5','sv'],['r1','r4',null,{c:-30}]]});
 const card=(i,t,sub,g,col)=>`<div class="card ${col}" data-s="${i}" style="padding:20px 22px"><div class="ant" style="font-size:42px;line-height:1">${t}</div><div style="font-size:19px;color:var(--ink2);margin:6px 0 4px;min-height:54px">${sub}</div>${g.html()}</div>`;
 return`${hd('00','El gancho','¿Por qué funcionan *Maps*, *Instagram* e *Internet*?')}
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:44px;margin-top:40px">${card(1,'Google Maps','<b>Cruces</b> = nodos · <b>calles</b> = aristas con minutos',m,'c')}${card(2,'Instagram','<b>Personas</b> = nodos · <b>seguir</b> = flecha',so,'v')}${card(3,'Internet','<b>Routers</b> = nodos · <b>cables</b> = aristas',it,'m')}</div>
<div class="note fd" style="--d:1s;right:130px;top:134px;font-size:36px">el mismo dibujo, tres disfraces ↓</div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];
 if(s>=1){const d=dijkstra(m.nodes,m.E,'a',e=>e.w),p=pathTo(d.p,'f');m.reset();p.es.forEach(i=>m.e(i,'on'));p.ns.forEach(k=>m.n(k,'vis'));m.bd('f',d.d.f+' min',0,-34);stop.push(walker(m,p.ns,{ms:700}))}
 if(s>=2){so.cls('mg');so.e(6,'hl');so.n('e','hl');so.bd('e','¿conoces a Eli?',0,-40)}else{so.cls('mg',false);so.reset();so.bdClear()}
 if(s>=3){it.reset();['pc','r1','r3','r4','sv'].forEach(k=>it.n(k,'vis'));[0,2,4,6].forEach(i=>it.e(i,'on'));stop.push(walker(it,['pc','r1','r3','r4','sv'],{ms:600,color:C.cor}))}}}})());

/* 3 · EL TEMARIO ES UN GRAFO */
add((()=>{let g;return{sec:0,steps:3,role:'El mapa de la unidad',
notes:'Meta-chiste: el temario también es un grafo, y además un DAG: tiene un orden y no hay ciclos. [→] Ruta A: del básico a los recorridos y DFS. [→] Ruta B: de árboles a Prim/Kruskal. Las dos terminan en aplicaciones. [→] Si 5.9 apuntara a 5.1 habría un ciclo: nunca terminarías de estudiar. Por eso los prerrequisitos forman un DAG.',
html:()=>{g=new Gr('tm',{r:40,fs:22,vb:[1620,600],d0:.3,nodes:{1:[110,290],2:[390,290],3:[650,150],4:[910,150],7:[1170,150],5:[650,430],6:[910,430],8:[1170,430],9:[1480,290]},
 lbl:{1:'5.1',2:'5.2',3:'5.3',4:'5.4',5:'5.5',6:'5.6',7:'5.7',8:'5.8',9:'5.9'},
 sub:{1:'Básicos',2:'Tipos',3:'Formas',4:'Recorridos',5:'Árboles',6:'Generadores',7:'DFS',8:'Prim · Kruskal',9:'Usos reales'},
 edges:[[1,2],[2,3],[3,4],[4,7],[7,9],[2,5],[5,6],[6,8],[8,9],[9,1,null,{x:1,c:-230}]]});
 return`${hd('00','Mapa de la unidad','Este temario *también* es un grafo')}<div style="margin-top:30px">${g.html()}</div>
<div class="card y" data-s="3" style="position:absolute;right:120px;top:150px;max-width:520px;font-size:24px"><b>Si 5.9 apuntara a 5.1…</b> sería un <b>ciclo</b> y nunca terminarías de estudiar. Los prerrequisitos son un <b>DAG</b> (ya llegaremos).</div>`},
onStep:(el,s)=>{g.reset();g.cls('mg',s>=3);g.e(9,'bad',s>=3);if(s===1){[1,2,3,4,7,9].forEach(k=>g.n(k,'c1'));[0,1,2,3,4].forEach(i=>g.e(i,'c1'));g.bd(9,'ruta A',0,-62)}
 if(s===2){[1,2,5,6,8,9].forEach(k=>g.n(k,'c2'));[0,5,6,7,8].forEach(i=>g.e(i,'c2'));g.bd(9,'ruta B',0,-62)}if(s===0||s===3)g.bdClear();if(s===3)g.n(9,'bad')}}})());

/* 4 · ¿QUÉ ES UN GRAFO? G=(V,E) */
add((()=>{let g;const NM={A:'Ana',B:'Beto',C:'Cami',D:'Dani',E:'Eli'};return{sec:1,steps:3,role:'G = (V, E)',
notes:'Definición en una frase: un grafo es un conjunto de cosas (V) y un conjunto de relaciones entre ellas (E). [→] Primero solo los puntos: V. [→] Ahora las rayitas: E. Pasa el mouse por los elementos de las listas para ver a quién señalan. [→] Cierre: G = (V, E), nada más. Instagram, mapa o temario: siempre dos listas.',
html:()=>{g=new Gr('g1',{r:34,vb:[780,560],dir:false,d0:0,nodes:{A:[140,150],B:[420,70],C:[480,290],D:[220,420],E:[660,430]},sub:NM,
 edges:[['A','B'],['A','C'],['B','C'],['C','D'],['C','E'],['D','E']]});
 const vs=Object.keys(NM).map(k=>`<span class="chip c vh" data-n="${k}">${NM[k]}</span>`).join(''),es=g.E.map(e=>`<span class="chip m eh" data-i="${e.i}">${NM[e.a]}–${NM[e.b]}</span>`).join('');
 return`${hd('5.1','Elementos básicos · Definición formal','Un grafo son *cosas* y *relaciones*')}
<div style="display:grid;grid-template-columns:780px 1fr;gap:70px;margin-top:20px;align-items:center"><div>${g.html()}</div><div>
<div class="a" style="--d:.3s"><span class="ant" style="font-size:150px;line-height:1">G = (<span class="cy">V</span>, <span class="mnt">E</span>)</span></div>
<div class="a" style="--d:.5s;margin-top:6px;font-size:25px;color:var(--ink2)">Un grafo <b>G</b> es un par: una lista de <b class="cy">V</b>értices y una lista de <b class="mnt">E</b>dges (aristas).</div>
<div data-s="1" style="margin-top:28px"><div class="tag cy">V · vértices · "las cosas"</div><div style="margin-top:8px"><span class="mono" style="font-size:26px">V = {</span> ${vs} <span class="mono" style="font-size:26px">}</span></div></div>
<div data-s="2" style="margin-top:18px"><div class="tag mnt">E · aristas · "las relaciones"</div><div style="margin-top:8px"><span class="mono" style="font-size:26px">E = {</span> ${es} <span class="mono" style="font-size:26px">}</span></div></div>
<div class="card y" data-s="3" style="margin-top:26px;font-size:27px">Eso es todo: <b>|V| = 5</b> cosas y <b>|E| = 6</b> relaciones. Los grafos modelan <b>cualquier cosa que se conecte</b>.</div></div></div>`},
init:el=>{g.cls('hide-n');g.cls('hide-e');$$('.vh',el).forEach(c=>{c.onmouseenter=()=>g.n(c.dataset.n,'hl');c.onmouseleave=()=>g.n(c.dataset.n,'hl',false)});$$('.eh',el).forEach(c=>{c.onmouseenter=()=>g.e(+c.dataset.i,'hl');c.onmouseleave=()=>g.e(+c.dataset.i,'hl',false)})},
onStep:(el,s)=>{g.cls('hide-n',s<1);const was=g.root.classList.contains('hide-e');g.cls('hide-e',s<2);if(s>=2&&was)g.replayEdges()}}})());

/* 5 · GLOSARIO / TRADUCTOR */
add({sec:1,steps:7,role:'Traductor',
notes:'Rompe el miedo al vocabulario: cada palabra rara tiene un equivalente en cristiano. Ve fila por fila con [→]. Anécdota: "grafo" viene del griego graphein, dibujar/escribir; Sylvester lo usó en 1878. "Arista" es la misma palabra que el borde de un cubo.',
html:()=>{const r=[['Vertex / Node','vértice · nodo','el <b>punto</b>, la cosa','la esquina de un polígono'],['Edge','arista','la <b>rayita</b> que une dos puntos','el borde de un cubo'],['Arc','arco','arista <b>con flecha</b>','solo se cruza en un sentido'],['Degree','grado','cuántas rayitas <b>le tocan</b> al punto','como contar tus amigos'],['Path','camino','ir de punto en punto <b>por rayitas</b>','una ruta'],['Cycle','ciclo','camino que <b>regresa</b> a donde empezó','una vuelta a la manzana'],['Loop','lazo · bucle','arista que sale y <b>vuelve al mismo punto</b>','te sigues a ti mismo']];
return`${hd('5.1','Traductor inglés → español → cristiano','Cada palabra rara, en *cristiano*')}
<table class="tb a" style="--d:.3s;margin-top:40px"><tr><th>Se dice (EN)</th><th>En español</th><th>En cristiano</th><th>Truco para recordarlo</th></tr>${r.map((a,i)=>`<tr data-s="${i+1}"><td>${a[0]}</td><td class="mono" style="color:var(--cy);font-size:22px">${a[1]}</td><td>${a[2]}</td><td style="color:var(--ink2)">${a[3]}</td></tr>`).join('')}</table>
<div class="row a" style="--d:.8s;margin-top:34px;gap:28px;font-size:23px;color:var(--ink2)"><span class="card" style="padding:14px 22px;box-shadow:4px 4px 0 var(--cy)">¿Por qué <b>«grafo»</b>? Del griego <i>graphein</i>: <b>dibujar / escribir</b>. Se dibuja, pues.</span><span class="card" style="padding:14px 22px;box-shadow:4px 4px 0 var(--mnt)">¿Por qué <b>«vértice»</b>? Latín: <b>punta, cima</b>. Es la esquina del dibujo.</span></div>`}});

/* 6 · ANATOMÍA ETIQUETADA */
add((()=>{let g,stop=[];const T=[['Vértice / nodo','V','Cada <b>punto</b>. Aquí: A, B, C, D, E.'],['Arista / arco','E','La <b>rayita con flecha</b> entre dos vértices. Aquí A→B.'],['Grado','deg','Rayitas que <b>entran</b> (mnt) y que <b>salen</b> (rojo) de un nodo. C: entra 1, sale 2.'],['Camino','→→','Secuencia de aristas <b>una tras otra</b>. A→B→C→D tiene largo 3.'],['Ciclo','↻','Camino que <b>regresa al inicio</b>: A→B→C→A.'],['Lazo (bucle)','⟲','Arista de un nodo <b>hacia sí mismo</b>: el lazo en E.']];
return{sec:1,steps:6,role:'Anatomía de un grafo',
notes:'Un solo diagrama, seis conceptos. Ve con [→]: vértice (el punto), arista/arco (la flecha), grado (cuántas entran y cuántas salen, con colores), camino, ciclo y lazo. Pregunta: ¿cuál es el grado de salida de B? (2: va a C y a D).',
html:()=>{g=new Gr('an',{r:36,vb:[900,600],d0:.1,nodes:{A:[130,150],B:[420,80],C:[420,380],D:[720,230],E:[720,510]},
 edges:[['A','B'],['B','C'],['C','A'],['C','D'],['D','E'],['E','E',null,{ang:45}],['B','D']]});
 return`${hd('5.1','Anatomía · todo en un dibujo','Los *seis* conceptos, *etiquetados*')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:10px;align-items:center"><div style="position:relative">${g.html()}<div class="hand fd" id="anl" style="position:absolute;left:0;right:0;bottom:-6px;text-align:center;font-size:44px;opacity:0"></div></div>
<div class="lst focus" id="anp">${T.map((a,i)=>`<div data-k="${i+1}"><i>${i+1}</i><div><div style="font:700 28px var(--txt)">${a[0]} <span class="mono" style="color:var(--cy);font-size:20px">${a[1]}</span></div><div style="font-size:21px;color:var(--ink2)">${a[2]}</div></div></div>`).join('')}</div></div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];g.reset();g.bdClear();$$('#anp>div',el).forEach(d=>d.classList.toggle('act',+d.dataset.k===s));const L=$('#anl',el);
 if(s===1)['A','B','C','D','E'].forEach((k,i)=>setTimeout(()=>rip(g,k,C.cy),i*160));
 if(s===2){const a=g.P.A,b=g.P.B;const tk=()=>fly(g,[a[0],a[1]],[b[0],b[1]],{ms:900,r:9});tk();stop.push((id=>()=>clearInterval(id))(every(el,1500,tk)))}
 if(s===3){const ev=()=>{[['B','C'],['A','C']].forEach(([x,y],i)=>fly(g,g.P[x],g.P[y],{ms:800,r:8,color:C.mnt}));[['C','A'],['C','D']].forEach(([x,y])=>fly(g,g.P[x],g.P[y],{ms:800,r:8,color:C.cor}))};ev();stop.push((id=>()=>clearInterval(id))(every(el,1700,ev)))}
 if(s===4)stop.push(walker(g,['A','B','C','D'],{ms:800,color:C.yel,r:12}));
 if(s===5)stop.push(walker(g,['A','B','C','A'],{ms:800,color:C.pink,r:12}));
 if(s===6){const ev=()=>{rip(g,'E',C.yel);fly(g,[g.P.E[0]+36,g.P.E[1]+36],[g.P.E[0]+36,g.P.E[1]+36],{ms:900,txt:'⟲',lift:34})};ev();stop.push((id=>()=>clearInterval(id))(every(el,1600,ev)))}L.style.opacity=s?1:0;
 const lab=['','← cada punto es un vértice','← cada flecha es un arco (arista dirigida)','el nodo C: entra 1 · sale 2','camino A → B → C → D (largo 3)','ciclo: A → B → C → A','lazo: E apunta a E'][s];L.textContent=lab;
 if(s===1){['A','B','C','D','E'].forEach(k=>g.n(k,'hl'))}
 if(s===2){g.e(0,'cur');g.n('A','cur');g.n('B','cur')}
 if(s===3){g.n('C','cur');g.e(1,'on');g.e([2,3],'bad');g.bd('C','entra 1 · sale 2',0,-62)}
 if(s===4){g.n(['A','B','C','D'],'vis');g.e([0,1,3],'on')}
 if(s===5){g.n(['A','B','C'],'c2');g.e([0,1,2],'c2')}
 if(s===6){g.n('E','cur');g.e(5,'cur')}}}})());

/* 7 · LAB DEL CAMINO */
add((()=>{let g,path=[];return{sec:1,steps:0,lab:true,role:'Lab · camina el grafo',
notes:'LAB: pide a alguien del público que dicte un recorrido: haz clic en los nodos en orden. Solo avanza si existe la flecha en ese sentido. Reto: formar un ciclo; reto 2: ir de A a F sin repetir nodos; reto 3: ¿existe un camino de F a A? (no: las flechas no regresan).',
html:()=>{g=new Gr('lp',{r:34,vb:[980,560],int:true,d0:.1,nodes:{A:[110,280],B:[340,110],C:[340,450],D:[600,280],E:[830,110],F:[860,450]},
 edges:[['A','B'],['A','C'],['B','D'],['C','D'],['D','B'],['D','E'],['D','F'],['E','F'],['F','C'],['E','E',null,{ang:-90}]]});
 return`${hd('5.1','Laboratorio','Camina el grafo: *tú* armas el camino')}
<div style="display:grid;grid-template-columns:980px 1fr;gap:50px;margin-top:6px"><div class="ix">${g.html()}</div><div style="padding-top:20px"><div class="tag">tu recorrido</div><div id="lpP" class="read" style="font:700 34px var(--mono);margin-top:8px;display:flex;flex-wrap:wrap;gap:14px;align-items:center">Haz clic en un nodo para empezar</div>
<div class="rd" style="margin-top:20px"><span>Largo (aristas)</span><b id="lpL">0</b></div><div class="rd"><span>Tipo</span><b id="lpT" style="font-size:26px">—</b></div>
<div class="row" style="gap:14px;margin-top:22px"><span class="btn" id="lpU">↶ Deshacer</span><span class="btn" id="lpC">✕ Limpiar</span></div>
<div class="card" style="margin-top:26px;font-size:21px"><div class="tag">retos</div>① Forma un <b>ciclo</b> · ② Ve de A a F <b>sin repetir</b> nodos · ③ ¿Puedes llegar de F a A?</div></div></div>`},
init:el=>{path=[];const draw=msg=>{g.reset();const eds=[];for(let i=0;i<path.length-1;i++){const x=g.idx(path[i],path[i+1]);eds.push(x);g.e(x,'on')}
  path.forEach(k=>g.n(k,'vis'));if(path.length)g.n(path[0],'cur');
  $('#lpP',el).innerHTML=path.length?path.map((k,i)=>`<span style="color:${i===0?C.yel:C.ink}">${k}</span>`).join(' <span class="mute">→</span> '):(msg||'Haz clic en un nodo para empezar');
  $('#lpL',el).textContent=Math.max(0,path.length-1);const dist=new Set(path).size===path.length;let t='—';
  if(path.length>1){if(path[0]===path[path.length-1]&&new Set(path.slice(0,-1)).size===path.length-1)t='¡CICLO!';else if(dist)t='camino simple';else t='camino (repite nodos)'}else if(path.length===1)t='solo el inicio';
  const T=$('#lpT',el);T.textContent=t;T.style.color=t==='¡CICLO!'?C.mnt:C.yel};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd');if(!nd)return;const k=nd.dataset.n;if(!path.length){path=[k];draw();return}const last=path[path.length-1];
  if(g.idx(last,k)>=0){path.push(k);draw()}else{replay(nd,'shake');$('#lpP',el).innerHTML+=` <span class="no" style="font-size:22px">✗ no hay flecha ${last}→${k}</span>`}});
 $('#lpU',el).onclick=()=>{path.pop();draw()};$('#lpC',el).onclick=()=>{path=[];draw()};draw()}}})());
