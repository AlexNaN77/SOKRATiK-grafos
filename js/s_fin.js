/* ============ 10 CIERRE: acordeón maestro · 3 preguntas · gracias ============ */

/* 1 · ACORDEÓN MAESTRO (mapa mental que al final se vuelve árbol) */
add((()=>{let g,P0,P1,stop=[];
const K=['1','2','3','4','5','6','7','8','9'];
const SUB={1:'Básicos',2:'Tipos',3:'Formas',4:'Recorridos',5:'Árboles',6:'Generador',7:'DFS',8:'Prim/Kru',9:'Usos'};
const L=[['5.1 Básicos','G = (V, E): puntos y rayitas. Grado, camino, ciclo, lazo.'],['5.2 Tipos','Dirigido, ponderado, conexo, Kₙ, bipartito, DAG. Σ grados = 2|E|.'],['5.3 Formas','Matriz O(V²) · lista O(V+E) · incidencia. Elige según densidad.'],['5.4 Recorridos','BFS (cola, nivel por nivel) · DFS (pila). Marca visitados. O(V+E).'],['5.5 Árboles','Conexo + sin ciclos. n nodos → n−1 aristas.'],['5.6 Generador','Spanning tree que cubre todo; el mínimo (MST) es el más barato.'],['5.7 DFS','Marcar · avanzar · backtracking. Ciclos, orden topológico, componentes.'],['5.8 Prim/Kruskal','Voraces. Prim: Min-Heap, denso. Kruskal: Union-Find, disperso.'],['5.9 Usos','GPS, redes sociales, Internet, compiladores, IA y videojuegos.']];
return{sec:10,steps:10,role:'Acordeón maestro',
notes:'Todo el curso en un dibujo. Ve con [→] rama por rama: cada una se dibuja desde el centro y suelta su frase clave. Pregunta al público antes de cada rama: ¿qué era lo más importante de 5.x? [→ final] Remate: el mapa mental es un grafo, de hecho un ÁRBOL (conexo, sin ciclos, 9 hojas + 1 raíz = 10 nodos, 9 aristas). El método Feynman es esto: comprimir todo en un dibujo que puedas explicar.',
html:()=>{const ks=['G',...K],pos=circ(K,550,300,400,215,-90);pos.G=[550,300];
 g=new Gr('mm',{r:40,fs:20,vb:[1100,600],dir:false,d0:.2,nodes:Object.assign({G:[550,300]},pos),lbl:{G:'G',1:'5.1',2:'5.2',3:'5.3',4:'5.4',5:'5.5',6:'5.6',7:'5.7',8:'5.8',9:'5.9'},sub:SUB,edges:K.map(k=>['G',k])});
 P0={};g.nodes.forEach(k=>P0[k]=g.P[k].slice());
 const adj=adjOf(g,false);P1=treeLayout(g.nodes,adj,'G',60,1040,70,300).P;
 return`${hd('FIN','Acordeón maestro','Toda la unidad en *un solo* dibujo')}
<div style="display:grid;grid-template-columns:1100px 1fr;gap:50px;margin-top:0;align-items:center"><div style="position:relative">${g.html()}<div class="hand fd" id="mmL" style="position:absolute;left:0;right:0;bottom:-18px;text-align:center;font-size:42px;opacity:0"></div></div>
<div class="lst focus" id="mmp" style="font-size:20px">${L.map((a,i)=>`<div data-k="${i+1}" style="padding:7px 0;grid-template-columns:56px 1fr"><i style="font-size:36px">${i+1}</i><div><div style="font:700 22px var(--txt)">${a[0]}</div><div style="font-size:17px;color:var(--ink2);line-height:1.25">${a[1]}</div></div></div>`).join('')}</div></div>`},
init:el=>{g.n('G','cur')},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];const R_=g.root;
 K.forEach((k,i)=>{const on=i+1<=s;g.n(k,'gone',!on);g.e(i,'gone',!on);g.n(k,PAL[i%7],on);g.e(i,PAL[i%4],on&&i<4)});
 $$('.nl',R_).forEach(t=>t.style.opacity=+t.dataset.n<=s?1:0);
 $$('#mmp>div',el).forEach(d=>d.classList.toggle('act',s>=10?true:+d.dataset.k===s));
 const lab=$('#mmL',el);lab.style.opacity=s?1:0;
 if(s>=1&&s<=9){const k=String(s);rip(g,k,PALC[(s-1)%7]);fly(g,g.P.G,g.P[k],{ms:650,r:10,color:PALC[(s-1)%7]});lab.textContent='← '+L[s-1][0]}
 if(s<10){g.move(P0,900)}
 if(s===10){g.move(P1,1400);lab.textContent='¡el mapa mental también es un ÁRBOL! 10 nodos · 9 aristas';K.forEach((k,i)=>setTimeout(()=>rip(g,k,PALC[i%7]),900+i*90))}
 if(s===0)lab.textContent='';
 g.n('G','cur')}}})());

/* 2 · TRES PREGUNTAS RÁPIDAS PARA LA AUDIENCIA */
add((()=>{let a,b,c,stop=[],tm=[];
const clr=()=>{stop.forEach(f=>f());stop=[];tm.forEach(clearTimeout);tm=[]};
return{sec:10,steps:6,role:'3 preguntas rápidas',
notes:'Interacción con el público: levanten la mano. [→] Pregunta 1 a mano alzada, deja 10 s. [→] Respuesta con animación. Repite con la 2 y la 3. Si fallan, no des la respuesta: pregunta "¿qué propiedad del árbol te falta comprobar?" y que lo expliquen con sus palabras (Feynman).',
html:()=>{
 a=new Gr('qa',{r:22,fs:17,vb:[480,300],dir:false,d0:.2,nodes:{1:[240,40],2:[110,130],3:[370,130],4:[50,250],5:[170,250],6:[400,250]},edges:[[1,2],[1,3],[2,4],[2,5],[3,6]]});
 b=new Gr('qb',{r:22,fs:17,vb:[480,300],dir:false,d0:.2,nodes:{S:[40,150],a:[140,50],b:[140,250],c:[250,150],d:[340,50],e:[340,250],T:[440,150]},edges:[['S','a'],['S','b'],['a','c'],['b','c'],['a','d'],['c','e'],['d','T'],['e','T']]});
 c=new Gr('qc',{r:22,fs:17,vb:[480,300],dir:false,d0:.2,nodes:{A:[60,60],B:[250,30],C:[430,90],D:[110,240],E:[360,240]},edges:[['A','B',4],['B','C',6],['A','D',3],['D','E',5],['B','D',2],['B','E',7],['C','E',1]]});
 const card=(n,col,q,gg,ans,s)=>`<div class="card ${col}" data-s="${s}" style="padding:22px 24px"><div class="tag">pregunta ${n}</div><div style="font:700 25px/1.25 var(--txt);margin:8px 0 6px;min-height:96px">${q}</div>${gg.html()}<div class="card y" data-s="${s+1}" style="margin-top:12px;font-size:22px;padding:14px 18px">${ans}</div></div>`;
 return`${hd('FIN','Para la audiencia','Tres preguntas *rápidas*','Levanten la mano: cada una cae de lo que acabamos de ver.')}
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:36px;margin-top:18px">
${card(1,'m','Este grafo tiene <b>6 nodos</b> y <b>5 aristas</b>, está conectado. ¿Hay ciclos? ¿Qué es?',a,'<b>Es un árbol.</b> Conexo + n−1 aristas ⇒ no puede haber ciclos.',1)}
${card(2,'c','Quiero ir de <b>S</b> a <b>T</b> con <b>menos paradas</b>. ¿BFS o DFS?',b,'<b>BFS</b>: va por niveles (cola), la primera vez que llega a T es el camino más corto.',3)}
${card(3,'v','Cablear estas 5 ciudades con <b>la menor fibra</b> posible. ¿Qué algoritmo?',c,'<b>Prim o Kruskal</b> (MST): 4 aristas, sin ciclos, costo mínimo.',5)}
</div>`},
onStep:(el,s)=>{clr();[a,b,c].forEach(x=>{x.reset();x.bdClear()});
 if(s>=2){a.n(['1','2','3','4','5','6'],'c3');a.e([0,1,2,3,4],'c3');a.bd('1','n−1 = 5',46,-4);['1','2','3','4','5','6'].forEach((k,i)=>tm.push(setTimeout(()=>rip(a,k,C.mnt),i*110)))}
 if(s>=4){const A=adjOf(b,false),lv={S:0},ord=['S'];for(let i=0;i<ord.length;i++)A[ord[i]].forEach(([v])=>{if(!(v in lv)){lv[v]=lv[ord[i]]+1;ord.push(v)}});
  ord.forEach((k,i)=>tm.push(setTimeout(()=>{b.n(k,k==='S'?'cur':'fr');rip(b,k,C.cy);if(k==='T'){b.n(['S','a','d','T'],'vis');b.e([0,2,4,6],'on');b.n('T','cur');b.bd('T','3 aristas',0,-40)}},i*330)))}
 if(s>=6){const u=new UF(c.nodes),es=[...c.E].sort((p,q)=>p.w-q.w);let t=0;es.forEach(e=>{if(u.union(e.a,e.b)){const i=e.i,tt=t++;tm.push(setTimeout(()=>{c.e(i,'on');c.n([e.a,e.b],'vis');rip(c,e.a,C.mnt)},tt*420))}else tm.push(setTimeout(()=>c.e(e.i,'rej'),t*420))});tm.push(setTimeout(()=>c.bd('A','costo 11',0,-48),4*420))}}}})());

/* 3 · GRACIAS: el dibujo cambia, el grafo no */
add((()=>{let g,P=[],stop=[];
return{sec:10,steps:3,role:'Cierre',
notes:'Remate: tres dibujos distintos, el MISMO grafo. Lo que importa no es dónde están los puntos sino quién está conectado con quién. [→] Árbol. [→] Fila. [→] Círculo. Y despídete con el método: antes de irse, explíquenle esto a alguien con manzanitas. Si se traban, ahí está lo que hay que repasar.',
html:()=>{const ks=['A','B','C','D','E','F','G'];
 g=new Gr('fi',{r:34,fs:24,vb:[1000,640],dir:false,d0:.3,nodes:{A:[150,150],B:[400,90],C:[660,170],D:[820,380],E:[560,500],F:[290,470],G:[470,290]},edges:[['A','B'],['B','C'],['C','D'],['D','E'],['E','F'],['F','A'],['B','G'],['G','E']]});
 const adj=adjOf(g,false);
 P=[Object.fromEntries(g.nodes.map(k=>[k,g.P[k].slice()])),treeLayout(g.nodes,adj,'A',70,930,80,150).P,Object.fromEntries(g.nodes.map((k,i)=>[k,[70+i*143,320+(i%2?60:-60)]])),circ(g.nodes,500,320,260,260,-90)];
 return`<div style="display:grid;grid-template-columns:1fr 1000px;gap:30px;align-items:center;height:100%;margin-top:-40px"><div>
<div class="kick a"><b>FIN</b>Unidad 5 · Teoría de grafos</div>
<h1 class="ttl" style="font-size:190px">${W('*Gracias*')}</h1>
<p class="sub a" style="--d:.8s;font-size:32px">Todo esto es <span class="hl"><b>puntos y rayitas</b></span> con buen marketing.</p>
<div id="fiT" class="hand" style="margin-top:26px;font-size:48px;min-height:130px">El dibujo cambia… el grafo no.</div>
<div class="a" style="--d:1.2s;margin-top:18px"><span class="chip t">Feynman: explícaselo a alguien</span><span class="chip c">donde te trabes = repasa ahí</span></div></div>
<div class="fl">${g.html()}</div></div>`},
onStep:(el,s)=>{stop.forEach(f=>f());stop=[];g.reset();g.move(P[s],1500);const T=$('#fiT',el);
 T.textContent=['El dibujo cambia… el grafo no.','Como árbol desde A: mismas 8 aristas.','En fila: mismas conexiones, otra pinta.','En círculo: ¡el mismo grafo! Gracias por venir.'][s];replay(T,'flp');
 g.nodes.forEach((k,i)=>setTimeout(()=>rip(g,k,PALC[i%7]),600+i*90));
 if(s===3)stop.push(walker(g,['A','B','C','D','E','F','A'],{ms:520,color:C.yel,r:12}))}}})());
