/* ============ 5.5 ÁRBOLES · 5.6 ÁRBOLES GENERADORES ============ */
/* grafo ponderado compartido con Prim y Kruskal (7 ciudades, fibra óptica) */
const MGN={A:[90,150],B:[320,60],C:[600,90],D:[200,340],E:[470,300],F:[330,490],G:[780,430]};
const MGE=[['A','B',7],['A','D',5],['B','C',8],['B','D',9],['B','E',7],['C','E',5],['D','E',15],['D','F',6],['E','F',8],['E','G',9],['F','G',11]];
const MST_IDX=[1,5,7,0,4,9],NOMST_IDX=[0,2,3,4,7,9];
const mgGraph=(id,o={})=>new Gr(id,Object.assign({r:30,fs:22,vb:[900,560],dir:false,nodes:MGN,edges:MGE},o));
const offE=(g,i,on)=>g.Ed(i).classList.toggle('off',on);
function statusOf(g,ks){const L=g.E.filter(e=>!e.x&&!g.Ed(e.i).classList.contains('off')),cp=comps(ks,L.map(e=>[e.a,e.b])),m=L.length;return{L,cp,m,conn:cp.n===1,cyc:m>ks.length-cp.n,tree:cp.n===1&&m===ks.length-1}}

/* 1 · DEFINICIÓN: conexo + sin ciclos */
add((()=>{let g,tk=[];const ks=['A','B','C','D','E','F'];return{sec:5,steps:3,role:'Árbol = conexo + sin ciclos',
notes:'Definición en una frase: un árbol es un grafo conexo (todos llegan a todos) y sin ciclos. [→] Quitamos una arista del ciclo: la rayita se desvanece y todo sigue conectado. ¡Ya es árbol! [→] Si quitamos una más, se rompe en dos pedazos: ya no es conexo, es un BOSQUE (varios árboles). El árbol es el grafo conexo más "flaquito" posible: ni una arista de sobra.',
html:()=>{g=new Gr('t51',{r:34,vb:[760,520],dir:false,d0:.1,nodes:{A:[140,120],B:[380,60],C:[330,260],D:[560,330],E:[420,450],F:[690,200]},edges:[['A','B'],['B','C'],['C','A'],['C','D'],['D','E'],['D','F']]});
 return`${hd('5.5','Árboles y su caracterización','Un árbol es un grafo *conexo* y *sin ciclos*')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:60px;margin-top:4px;align-items:center"><div>${g.html()}</div><div>
<div class="chk"><span>¿Conexo? <span class="mute" style="font-size:18px">todos llegan a todos</span></span><b id="a1c"></b></div><div class="chk"><span>¿Sin ciclos? <span class="mute" style="font-size:18px">nadie regresa a donde empezó</span></span><b id="a1y"></b></div><div class="chk"><span>Aristas vs. V − 1 = 5</span><b id="a1m"></b></div>
<div class="card y" id="a1t" style="margin-top:26px;font-size:28px;min-height:120px"></div>
<div class="card" data-s="3" style="margin-top:20px;font-size:23px">🌲 Si hay <b>varios</b> árboles separados se llama <b>bosque</b>. ¡Un bosque es solo un grupo de árboles!</div></div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];offE(g,2,s>=1);offE(g,3,s>=3||s>=2&&false);offE(g,3,s>=3);const st=statusOf(g,ks);
 g.reset();g.bdClear();ks.forEach(k=>{if(s>=3||s>=2)g.n(k,'c'+(st.cp.m[k]+1));else if(s===1)g.n(k,'vis')});
 const put=(id,v,ok)=>{const e=$(id,el);e.textContent=v;e.className=ok?'ok':'no'};put('#a1c',st.conn?'Sí':'No',st.conn);put('#a1y',st.cyc?'No: hay ciclo':'Sí',!st.cyc);put('#a1m',`${st.m} ${st.m===5?'= 5 ✓':'≠ 5'}`,st.m===5);
 const T=['Hay un <b>ciclo</b> A–B–C–A: esto <b>todavía no</b> es un árbol.','Quitamos <b>C–A</b>: sigue conectado y ya no hay ciclo → <b class="ok" style="color:var(--bg)">¡es un ÁRBOL!</b> 🌳','Quitamos <b>C–D</b> también: se rompió en <b>2 pedazos</b>. Ya no es conexo.'];
 $('#a1t',el).innerHTML=T[Math.min(s,2)==2&&s>=2?2:s];
 if(s===0){const cyc=[['A','B'],['B','C'],['C','A']];cyc.forEach(([a,b],i)=>{g.e(g.idx(a,b),'bad');g.n(a,'bad')});tk.push(setTimeout(()=>replay(g.root,'shk'),300))}
 if(s===1){ks.forEach((k,i)=>tk.push(setTimeout(()=>rip(g,k,C.mnt),i*110)))}
 if(s>=2){offE(g,3,true);const st2=statusOf(g,ks);g.reset();ks.forEach(k=>g.n(k,'c'+(st2.cp.m[k]+1)));$('#a1c',el).textContent='No';$('#a1c',el).className='no';$('#a1m',el).textContent=`${st2.m} ≠ 5`;$('#a1m',el).className='no';rip(g,'C',C.cor);rip(g,'D',C.cor)}}}})());

/* 2 · LAS 4 PROPIEDADES EQUIVALENTES */
add((()=>{let g,tk=[],stop=[];const ks=[...'ABCDEFG'];const T=[['|E| = |V| − 1','Un árbol de <b>n</b> nodos tiene exactamente <b>n − 1</b> aristas.'],['Camino único','Entre dos nodos cualesquiera hay <b>un solo</b> camino.'],['Quitar = desconecta','Si quitas <b>cualquier</b> arista, se parte en dos.'],['Agregar = ciclo','Si agregas <b>una</b> arista nueva, aparece un ciclo.']];
return{sec:5,steps:4,role:'4 propiedades equivalentes',
notes:'Las cuatro son EQUIVALENTES: si un grafo cumple una, cumple las demás (y entonces es árbol). [→] Cuenta aristas: 6 = 7 − 1. [→] Camino único entre D y G: no hay alternativa. [→] Quita una arista (A–C): se parte en dos islas. [→] Agrega una arista nueva (E–F): se cierra un ciclo, la ruta de ida y vuelta da vueltas. Es el árbol "justo": ni le falta ni le sobra una arista.',
html:()=>{g=new Gr('t52',{r:32,fs:22,vb:[900,520],dir:false,d0:.1,nodes:{A:[450,60],B:[250,210],C:[650,210],D:[150,390],E:[350,390],F:[550,390],G:[750,390]},edges:[['A','B'],['A','C'],['B','D'],['B','E'],['C','F'],['C','G'],['E','F',null,{x:1}]]});
 return`${hd('5.5','Las 4 propiedades · todas dicen lo mismo','Cuatro formas de *reconocer* un árbol')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:0;align-items:center"><div style="position:relative">${g.html()}<div class="hand" id="a2l" style="position:absolute;left:0;right:0;bottom:-14px;text-align:center;font-size:40px"></div></div>
<div class="lst focus" id="a2p">${T.map((a,i)=>`<div data-k="${i+1}"><i>${i+1}</i><div><div style="font:700 28px var(--txt)">${a[0]}</div><div style="font-size:21px;color:var(--ink2)">${a[1]}</div></div></div>`).join('')}</div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];stop.forEach(f=>f());stop=[];offE(g,1,s===3);g.cls('mg',s>=4);g.reset();g.bdClear();$$('#a2p>div',el).forEach(d=>d.classList.toggle('act',+d.dataset.k===s));const L=$('#a2l',el);
 L.textContent=['','6 aristas = 7 nodos − 1','D → B → A → C → G · el único','sin A–C: dos islas desconectadas','con E–F: ¡ciclo!'][s];
 if(s===1){g.E.filter(e=>!e.x).forEach((e,i)=>tk.push(setTimeout(()=>{g.e(e.i,'on');rip(g,e.b,C.mnt);fly(g,[g.P[e.a][0],g.P[e.a][1]-50],[g.P[e.a][0],g.P[e.a][1]-50],{ms:800,txt:String(i+1),color:C.yel,lift:0})},i*420+200)))}
 if(s===2){const p=pathTo(bfsPar(g,'D'),'G');p.es.forEach(i=>g.e(i,'on'));p.ns.forEach(k=>g.n(k,'vis'));stop.push(walker(g,p.ns,{ms:650,r:11}));loopEvery(el,2600,()=>{fly(g,g.P.E,g.P.F,{ms:700,txt:'✗ no hay otra ruta',color:C.cor,lift:30})},stop)}
 if(s===3){const st=statusOf(g,ks);ks.forEach(k=>g.n(k,'c'+(st.cp.m[k]+1)));rip(g,'A',C.cor);rip(g,'C',C.cor);loopEvery(el,1800,()=>fly(g,g.P.A,g.P.C,{ms:800,txt:'✂',color:C.cor,lift:0}),stop)}
 if(s===4){const p=pathTo(bfsPar(g,'E'),'F'),cyc=[...p.ns];g.n(cyc,'bad');p.es.forEach(i=>g.e(i,'bad'));g.e(6,'bad');stop.push(walker(g,[...cyc,'E'],{ms:520,r:11,color:C.cor}))}}}})());

/* 3 · ANATOMÍA DEL ÁRBOL (morph del grafo al árbol con raíz) */
const TAK=['1','2','3','4','5','6','7','8','9'],TAE=[['1','2'],['1','3'],['2','4'],['2','5'],['3','6'],['5','7'],['5','8'],['6','9']];
const TAFREE={1:[420,260],2:[200,120],3:[700,110],4:[110,330],5:[330,430],6:[780,300],7:[560,470],8:[470,350],9:[820,420]};
const taRoot=(g,r,dy=125)=>treeLayout(TAK,adjOf(g,false),r,80,820,70,dy);
add((()=>{let g,tk=[],stop=[],lay='';const T=[['Raíz','El nodo de <b>arriba</b>: sin padre. Aquí el <b>1</b>.'],['Padre e hijo','El de arriba es <b>padre</b>, los que cuelgan son <b>hijos</b>.'],['Hoja','Nodo <b>sin hijos</b>: la punta de la rama.'],['Profundidad','<b>Pasos</b> que hay desde la raíz hasta el nodo.'],['Altura','La <b>profundidad máxima</b> del árbol: la rama más larga.']];
return{sec:5,steps:5,role:'Anatomía del árbol',
notes:'Truco visual: es el MISMO grafo; solo lo "colgamos" de un nodo que llamamos raíz y todo cae por gravedad (el dibujo se reacomoda solo). [→] Raíz. [→] Padre e hijo: como un árbol genealógico. [→] Hojas: las puntas. [→] Profundidad: cuántos saltos desde la raíz (cada nodo muestra su número). [→] Altura: la rama más larga, aquí 3. Dato: un árbol no tiene raíz "natural"; tú eliges cuál.',
html:()=>{g=new Gr('t53',{r:30,fs:22,vb:[900,520],dir:false,d0:.1,nodes:TAFREE,edges:TAE});lay='free';
 return`${hd('5.5','Anatomía básica','Raíz, padre, hijo, hoja, *altura*')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:0;align-items:center"><div>${g.html()}</div>
<div class="lst focus" id="a3p">${T.map((a,i)=>`<div data-k="${i+1}"><i>${i+1}</i><div><div style="font:700 28px var(--txt)">${a[0]}</div><div style="font-size:21px;color:var(--ink2)">${a[1]}</div></div></div>`).join('')}</div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];stop.forEach(f=>f());stop=[];g.reset();g.bdClear();$$('#a3p>div',el).forEach(d=>d.classList.toggle('act',+d.dataset.k===s));
 const want=s===0?'free':'tree';if(want!==lay){lay=want;g.move(want==='free'?TAFREE:taRoot(g,'1').P,1100)}
 const T=taRoot(g,'1'),kids=T.kids,dep=T.depth;
 if(s>=1){g.n('1','cur');g.bd('1','RAÍZ',0,-52)}
 if(s===1){g.n('2','c1');g.bd('2','padre',0,-50);['4','5'].forEach(k=>{g.n(k,'c2');g.bd(k,'hijo',0,-50)});g.e([g.idx('2','4'),g.idx('2','5')],'hl');tk.push(setTimeout(()=>{rip(g,'2',C.cy);['4','5'].forEach(k=>rip(g,k,C.pink))},1300))}
 if(s===2){TAK.filter(k=>!kids[k].length).forEach((k,i)=>{g.n(k,'c3');g.bd(k,'hoja',0,-48);tk.push(setTimeout(()=>rip(g,k,C.mnt),1300+i*140))})}
 if(s===3){TAK.forEach(k=>g.bd(k,'prof. '+dep[k],0,-50));g.n(TAK.filter(k=>dep[k]===3),'c4')}
 if(s===4){const p=pathTo({7:['5',g.idx('5','7')],5:['2',g.idx('2','5')],2:['1',g.idx('1','2')]},'7');p.ns.forEach(k=>g.n(k,'vis'));g.n('1','cur');p.es.forEach(i=>g.e(i,'on'));g.bd('7','altura = 3',0,-52);tk.push(setTimeout(()=>stop.push(walker(g,p.ns,{ms:650,r:11})),1200))}}}})());

/* 4 · LAB: ELIGE LA RAÍZ */
add((()=>{let g,root='1';return{sec:5,steps:0,lab:true,role:'Lab · elige la raíz',
notes:'LAB: haz clic en cualquier nodo y se vuelve la RAÍZ: todo el árbol se reacomoda con una animación. El grafo no cambió ni una arista; solo cambia cómo lo colgamos. Observa la altura: si escoges una raíz en el centro, el árbol queda bajito; si escoges una punta, queda alto y flaco. Por eso los árboles de búsqueda y de decisión eligen la raíz con cuidado.',
html:()=>{g=new Gr('t54',{r:30,fs:22,vb:[900,520],dir:false,int:true,anim:false,nodes:taRoot({o:{dir:false},nodes:TAK,E:TAE.map((e,i)=>({a:e[0],b:e[1],i}))},'1').P,edges:TAE});
 return`${hd('5.5','Lab · re-enraizar','¿Quién *manda*? Tú eliges la raíz')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:0;align-items:center"><div>${g.html()}</div><div><div class="tag">clic en un nodo = nueva raíz</div>
<div class="rd" style="margin-top:14px"><span>Raíz</span><b id="a4r">1</b></div><div class="rd"><span>Altura</span><b id="a4h">3</b></div><div class="rd"><span>Hojas</span><b id="a4l">4</b></div><div class="bar" id="a4b" style="margin-top:14px;background:var(--mnt)"></div><div class="card y" id="a4c" style="margin-top:20px;font-size:23px"></div></div></div>`},
init:el=>{const set=r=>{root=r;const T=taRoot(g,r);g.move(T.P,1000);g.reset();g.bdClear();g.n(r,'cur');TAK.forEach(k=>g.bd(k,'p'+T.depth[k],0,-48));g.bd(r,'RAÍZ',0,-48);rip(g,r,C.yel);
  const h=Math.max(...TAK.map(k=>T.depth[k])),lv=TAK.filter(k=>!T.kids[k].length&&k!==r).length+((T.kids[r]||[]).length===1?1:0);$('#a4r',el).textContent=r;tween($('#a4h',el),h,v=>Math.round(v),500);$('#a4l',el).textContent=lv;$('#a4b',el).style.width=h/6*100+'%';
  $('#a4c',el).innerHTML=h<=2?'¡Árbol <b>bajito y ancho</b>! Raíz en el centro: llegas a todo rápido.':h>=4?'Árbol <b>alto y flaquito</b>: raíz en una punta, para llegar al fondo cruzas muchos nodos.':'Altura <b>media</b>. Prueba otras raíces y compara.'};
 g.root.addEventListener('click',e=>{const n=e.target.closest('.nd');if(n)set(n.dataset.n)});set('1')}}})());

/* 5 · ÁRBOL GENERADOR (SPANNING TREE) */
add((()=>{let g,tk=[];return{sec:6,steps:3,role:'Árbol generador y mínimo',
notes:'Situación: 7 ciudades y 11 posibles tendidos de fibra óptica; cada arista tiene un costo. Queremos conectarlas a todas gastando lo menos posible. [→] Un ÁRBOL GENERADOR (spanning tree) toca TODOS los vértices, sin ciclos, con exactamente V−1 = 6 aristas. Hay muchísimos; este cuesta 46. [→] El ÁRBOL GENERADOR MÍNIMO (MST) es el de menor costo total: 39. Mismas 7 ciudades, 7 unidades menos de gasto.',
html:()=>{g=mgGraph('t56',{d0:.1});
 return`${hd('5.6','Árboles generadores','Conectar todo gastando *lo mínimo*')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:-4px;align-items:center"><div>${g.html()}</div><div>
<div class="card" style="font-size:22px"><div class="tag">el problema</div>⚡ 7 ciudades · tender <b>fibra óptica</b> o <b>electricidad</b> · cada tramo tiene un costo. ¿Cómo conectar a todas pagando lo menos posible?</div>
<div style="margin-top:20px" id="a5r"></div><div class="card y" id="a5c" style="margin-top:16px;font-size:24px"></div></div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];g.reset();g.bdClear();const R=$('#a5r',el),Cc=$('#a5c',el);
 const rows=(a,b)=>`<div class="rd"><span>Aristas usadas</span><b id="a5n">${a}</b></div><div class="rd"><span>Costo total</span><b id="a5t" style="color:${b?C.mnt:C.yel}">0</b></div><div class="bar" id="a5b" style="width:0;background:${b?'var(--mnt)':'var(--cy)'}"></div>`;
 const build=(idx,col,total)=>{R.innerHTML=rows(0,col===C.mnt);let c=0;g.E.forEach(e=>{if(!idx.includes(e.i))g.e(e.i,'rej')});idx.forEach((i,k)=>tk.push(setTimeout(()=>{const e=g.E[i];g.e(i,col===C.mnt?'on':'c1');c+=e.w;g.n([e.a,e.b],col===C.mnt?'vis':'c1');rip(g,e.b,col);fly(g,g.P[e.a],g.P[e.b],{ms:450,r:7,color:col});$('#a5n',el).textContent=k+1;tween($('#a5t',el),c,v=>Math.round(v),400);$('#a5b',el).style.width=c/60*100+'%'},k*620+250)))};
 if(s===0){R.innerHTML=`<div class="rd"><span>Ciudades (V)</span><b>7</b></div><div class="rd"><span>Tendidos posibles (E)</span><b>11</b></div>`;Cc.innerHTML='Un grafo <b>conexo y ponderado</b>: hay <b>muchas</b> formas de conectar todo.'}
 if(s===1){Cc.innerHTML='<b>Árbol generador</b>: toca los <b>7</b> vértices, <b>sin ciclos</b>, con <b>V − 1 = 6</b> aristas. Funciona… pero cuesta <b>46</b>.';build(NOMST_IDX,C.cy)}
 if(s===2){Cc.innerHTML='<b>Árbol generador mínimo (MST)</b>: el mismo trabajo por solo <b>39</b>. ¡Ahorraste 7!';build(MST_IDX,C.mnt)}}}})());

/* 6 · LAB: ARMA TU ÁRBOL GENERADOR */
add((()=>{let g,sel=[];return{sec:6,steps:0,lab:true,role:'Lab · arma tu árbol generador',
notes:'LAB: haz clic en aristas para construir tu propio árbol generador. Si la arista cierra un ciclo, el sistema la rechaza (tiembla en rojo): ¡no se permiten ciclos! Cuando llegues a 6 aristas conectas todo. Reto: lograr costo 39 (el mínimo). Pista voraz: empieza por las más baratas. Botón "mostrar el MST" revela la respuesta.',
html:()=>{g=mgGraph('t57',{int:true,anim:false});
 return`${hd('5.6','Lab · árbol generador','Conecta las 7 ciudades. ¿Puedes pagar *39*?')}
<div style="display:grid;grid-template-columns:900px 1fr;gap:50px;margin-top:-4px;align-items:center"><div>${g.html()}</div><div><div class="tag">clic en una arista = construir ahí</div>
<div class="rd" style="margin-top:12px"><span>Aristas (necesitas 6)</span><b id="a6n">0</b></div><div class="rd"><span>Costo total</span><b id="a6t">0</b></div><div class="rd"><span>Costo mínimo posible</span><b class="ok">39</b></div><div class="bar" id="a6b" style="width:0;background:var(--cy)"></div>
<div class="card y" id="a6c" style="margin-top:20px;font-size:24px;min-height:112px"></div><div class="row" style="gap:12px;margin-top:20px"><span class="btn" id="a6u">↶ Deshacer</span><span class="btn" id="a6r">✕ Limpiar</span><span class="btn p" id="a6m">💡 Mostrar el MST</span></div></div></div>`},
init:el=>{sel=[];const draw=msg=>{g.reset();const cost=sel.reduce((a,i)=>a+g.E[i].w,0);sel.forEach(i=>{g.e(i,'on');g.n([g.E[i].a,g.E[i].b],'vis')});const st=comps(Object.keys(MGN),sel.map(i=>[g.E[i].a,g.E[i].b])),done=sel.length===6&&st.n===1;
  $('#a6n',el).textContent=sel.length;tween($('#a6t',el),cost,v=>Math.round(v),300);$('#a6b',el).style.width=cost/60*100+'%';
  $('#a6c',el).innerHTML=msg||(done?(cost===39?'🏆 <b>¡MÍNIMO!</b> Costo 39: es un <b>MST</b>.':`Conectaste todo con ${cost}. Es un árbol generador, pero <b>no el mínimo</b> (te pasas por ${cost-39}). Cambia aristas caras por baratas.`):sel.length?'Sigue: cada arista nueva debe unir <b>algo nuevo</b>.':'Elige una arista. Pista: las baratas primero.');
  if(done&&cost===39)Object.keys(MGN).forEach((k,i)=>setTimeout(()=>rip(g,k,C.mnt),i*90))};
 g.root.addEventListener('click',e=>{const ed=e.target.closest('.ge');if(!ed)return;const i=+ed.dataset.i;if(sel.includes(i)){sel=sel.filter(x=>x!==i);draw();return}
  const u=new UF(Object.keys(MGN));sel.forEach(j=>u.union(g.E[j].a,g.E[j].b));if(!u.union(g.E[i].a,g.E[i].b)){g.e(i,'bad');setTimeout(()=>g.e(i,'bad',false),700);replay(g.root,'shk');draw('✗ <b>Eso cierra un ciclo</b>: las ciudades ya estaban conectadas. ¡Un árbol no tiene ciclos!');g.e(i,'bad');setTimeout(()=>g.e(i,'bad',false),700);return}
  sel.push(i);const E=g.E[i];fly(g,g.P[E.a],g.P[E.b],{ms:400,r:7});draw()});
 $('#a6u',el).onclick=()=>{sel.pop();draw()};$('#a6r',el).onclick=()=>{sel=[];draw()};$('#a6m',el).onclick=()=>{sel=[];MST_IDX.forEach((i,k)=>setTimeout(()=>{sel.push(i);draw()},k*420))};draw()}}})());
