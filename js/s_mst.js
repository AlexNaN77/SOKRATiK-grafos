/* ============ 5.8 PRIM Y KRUSKAL ============ */
const MKS=Object.keys(MGN),eName=(g,i)=>`${g.E[i].a}–${g.E[i].b}`;
/* Prim: cuadros (elige → agrega) */
function primFr(g,s='A'){const fr=[],inT={[s]:1},tE=[];let total=0;const cand=()=>g.E.filter(e=>!e.x&&(!!inT[e.a]!==!!inT[e.b])).sort((p,q)=>p.w-q.w||p.i-q.i);
 const snap=o=>fr.push(Object.assign({inT:{...inT},tE:tE.slice(),total,cand:cand().map(e=>e.i),pick:null,new:null,heap:cand().map(e=>e.w)},o));
 snap({msg:`Empiezo en <b>${s}</b>: es mi árbol de un solo nodo. Las aristas que <b>salen</b> del árbol son la <b>frontera</b>.`});
 while(tE.length<MKS.length-1){const c=cand(),b=c[0];snap({pick:b.i,msg:`Frontera: ${c.map(e=>`${e.a}–${e.b}(${e.w})`).join(' · ')}. La más barata: <b>${b.a}–${b.b} (${b.w})</b>`});
  const nn=inT[b.a]?b.b:b.a;inT[nn]=1;tE.push(b.i);total+=b.w;snap({new:nn,msg:`Agrego <b>${nn}</b> al árbol con ${b.a}–${b.b}. Total: <b>${total}</b>`})}
 snap({msg:`<b class="ok">Listo</b>: ${MKS.length} nodos, ${tE.length} aristas, costo <b>${total}</b>.`});return fr}
function paintPrim(g,f){g.reset();g.bdClear();g.E.forEach(e=>{if(e.x)return;if(f.tE.includes(e.i))g.e(e.i,'on');else if(f.cand.includes(e.i))g.e(e.i,e.i===f.pick?'cur':'c1');else if(f.inT[e.a]&&f.inT[e.b])g.e(e.i,'rej');else g.e(e.i,'dim')});Object.keys(f.inT).forEach(k=>g.n(k,'vis'));if(f.new)g.n(f.new,'cur')}
/* Kruskal: ordena, mira, acepta o rechaza */
function kruFr(g){const fr=[],ord=g.E.filter(e=>!e.x).slice().sort((p,q)=>p.w-q.w||p.i-q.i),u=new UF(MKS),acc=[],rej=[];let total=0;
 const col=()=>{const c=comps(MKS,acc.map(i=>[g.E[i].a,g.E[i].b])),sz={};MKS.forEach(k=>sz[c.m[k]]=(sz[c.m[k]]||0)+1);const m={};MKS.forEach(k=>{if(sz[c.m[k]]>1)m[k]=c.m[k]});return m};
 const snap=o=>fr.push(Object.assign({acc:acc.slice(),rej:rej.slice(),now:null,total,col:col(),ord:ord.map(e=>e.i),pos:0,ok:null},o));
 snap({msg:`Ordeno <b>todas</b> las aristas de menor a mayor. Cada nodo empieza en su <b>propio conjunto</b>.`});
 for(let k=0;k<ord.length&&acc.length<MKS.length-1;k++){const e=ord[k];snap({now:e.i,pos:k,msg:`Miro <b>${e.a}–${e.b} (${e.w})</b>: ¿${e.a} y ${e.b} ya están en el mismo conjunto?`});
  if(u.find(e.a)===u.find(e.b)){rej.push(e.i);snap({now:e.i,pos:k,ok:false,msg:`<b class="no">Sí, ya están conectados</b> → esta arista cerraría un <b>ciclo</b>. La descarto.`})}
  else{u.union(e.a,e.b);acc.push(e.i);total+=e.w;snap({now:e.i,pos:k,ok:true,msg:`<b class="ok">No</b>, son conjuntos distintos → la <b>uno</b>. Total: <b>${total}</b>`})}}
 snap({pos:ord.length,msg:`<b class="ok">Listo</b>: con ${acc.length} aristas ya está todo conectado. Costo <b>${total}</b>. Las que faltan ni se miran.`});return fr}
function paintKru(g,f){g.reset();g.bdClear();g.E.forEach(e=>{if(e.x)return;if(f.acc.includes(e.i))g.e(e.i,'on');else if(f.rej.includes(e.i))g.e(e.i,'rej');else if(e.i===f.now)g.e(e.i,'cur')});Object.keys(f.col).forEach(k=>g.n(k,'c'+(f.col[k]%7+1)))}
const edgeChips=(g,list,now,acc,rej)=>list.map((i,k)=>`<span class="e ${acc&&acc.includes(i)?'ok':rej&&rej.includes(i)?'no':''} ${i===now?'now':''}">${eName(g,i)} <b style="font-weight:800">${g.E[i].w}</b></span>`).join('');

/* 1 · EL PROBLEMA Y LA IDEA VORAZ */
add((()=>{let g,tk=[],stop=[];return{sec:8,steps:3,role:'MST y estrategia voraz',
notes:'Prim y Kruskal resuelven el MISMO problema: hallar el árbol generador mínimo. Y lo hacen con la misma filosofía: ser VORAZ (greedy), o sea, en cada paso elegir lo que se ve mejor AHORA, sin arrepentirse nunca. [→] Analogía: te toca llenar una mochila con billetes y solo puedes llevar 3: agarras siempre el más grande que quede. [→] En un grafo: siempre la arista más barata que no cause problemas. Lo notable es que aquí la codicia NO falla: para MST se demuestra que da el óptimo. (En otros problemas, como la mochila 0/1 o el vendedor viajero, ser voraz sí puede fallar.)',
html:()=>{g=mgGraph('m1',{width:660,height:410,d0:.1});
 return`${hd('5.8','Prim y Kruskal','Dos caminos, *un* mismo problema, una misma *filosofía*')}
<div style="display:grid;grid-template-columns:660px 1fr;gap:50px;margin-top:0;align-items:center"><div>${g.html()}</div><div>
<div class="card" data-s="0" style="font-size:24px;margin-bottom:18px"><div class="tag">el problema</div>Dado un grafo <b>conexo y ponderado</b>: ¿qué aristas escojo para conectar <b>todo</b> con el <b>menor costo</b> total?</div>
<div class="card y" data-s="1" style="font-size:26px"><div class="tag">estrategia voraz (greedy)</div>En cada paso elijo <b>lo mejor ahora</b> y <b>nunca me arrepiento</b>.</div>
<div style="display:flex;gap:14px;margin-top:20px;align-items:flex-end;min-height:130px" data-s="1" id="m1B"></div>
<div class="card c" data-s="3" style="margin-top:16px;font-size:23px">Aquí la voracidad <b>sí funciona</b> (se puede demostrar). En otros problemas, ¡no siempre!</div></div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];g.reset();g.bdClear();const B=$('#m1B',el);
 if(s>=1&&!B.innerHTML){const v=[200,50,100,20,500];B.innerHTML=v.map((x,i)=>`<div class="flp" style="text-align:center;opacity:.9"><div style="width:84px;height:46px;border:3px solid var(--ink);border-radius:8px;background:${x>=100?'var(--mnt)':'var(--bg3)'};display:grid;place-items:center;font:800 24px var(--disp);color:${x>=100?'var(--bg)':'var(--ink)'};transition:all .5s var(--spring)" data-v="${x}">$${x}</div></div>`).join('')+`<div class="say" style="align-self:center">«llevo los 3 más grandes»</div>`}
 if(s===2){const sorted=g.E.filter(e=>!e.x).slice().sort((a,b)=>a.w-b.w).slice(0,3);sorted.forEach((e,k)=>tk.push(setTimeout(()=>{g.e(e.i,'cur');g.n([e.a,e.b],'vis');rip(g,e.a,C.yel);fly(g,g.P[e.a],g.P[e.b],{ms:450,r:8})},k*600+200)))}
 if(s>=3){MST_IDX.forEach(i=>g.e(i,'on'));g.n(MKS,'vis')}}}})());

/* 2 · PRIM PASO A PASO */
add((()=>{let g,pl,fr;return{sec:8,steps:0,lab:true,role:'Prim: el árbol que crece',
notes:'LAB: PRIM = "crece desde un nodo". Piensa en una mancha de aceite: empiezas en A y en cada paso miras TODAS las aristas que salen de la mancha (la frontera, en azul) y absorbes la más barata (amarilla). Las aristas que unirían dos nodos que ya están dentro se descartan (rojo tenue) porque harían un ciclo. Dale ▶ Auto. Fíjate cómo el árbol siempre es UN solo pedazo conectado. Estructura clave: un MIN-HEAP que te da la arista más barata de la frontera sin ordenar todo.',
html:()=>{g=mgGraph('m2',{anim:false,width:700,height:434});fr=primFr(g);
 return`${hd('5.8','Algoritmo de Prim','Una *mancha de aceite* que se expande')}
<div style="display:grid;grid-template-columns:700px 1fr;gap:40px;margin-top:0"><div>${g.html()}</div><div>
<div class="tag">frontera · aristas que salen del árbol</div><div class="sk2" id="m2F" style="margin:8px 0 14px;min-height:96px"></div>
<div class="read" id="m2M" style="min-height:104px;font-size:22px"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14px"><div class="card c" style="padding:10px 16px"><div class="tag">costo del árbol</div><div class="big" id="m2T" style="font-size:80px;color:var(--yel)">0</div></div><div class="card" style="padding:10px 16px"><div class="tag">nodos dentro</div><div class="big" id="m2N" style="font-size:80px">1</div><div class="tag">de 7</div></div></div>
<div class="noadv" id="plH" style="margin-top:14px"></div></div></div>`},
init:el=>{pl=player($('#plH',el),fr.length,i=>{const f=fr[i];paintPrim(g,f);$('#m2F',el).innerHTML=edgeChips(g,f.cand,f.pick)||'<span class="mute">(vacía)</span>';$('#m2M',el).innerHTML=f.msg;tween($('#m2T',el),f.total,v=>Math.round(v),350);$('#m2N',el).textContent=Object.keys(f.inT).length;
  if(f.new){rip(g,f.new,C.mnt);const e=g.E[f.tE[f.tE.length-1]];fly(g,g.P[e.a===f.new?e.b:e.a],g.P[f.new],{ms:450,r:8,color:C.mnt})}},{ms:1250,auto:1000})}}})());

/* 3 · KRUSKAL PASO A PASO */
add((()=>{let g,pl,fr;return{sec:8,steps:0,lab:true,role:'Kruskal: ordenar y unir',
notes:'LAB: KRUSKAL = "ordena todas las aristas y recógelas de barata a cara". Para cada una pregunta: ¿sus dos extremos ya están conectados entre sí? Si NO, la unes (los colores de los dos grupos se fusionan en uno). Si SÍ, la tiras porque cerraría un ciclo. Dale ▶ Auto: mira cómo aparecen varios bosquecitos de colores que van creciendo y se funden. A diferencia de Prim, el resultado intermedio NO es un solo pedazo; es un BOSQUE. Estructura clave: Union-Find para responder "¿mismo grupo?" casi al instante.',
html:()=>{g=mgGraph('m3',{anim:false,width:700,height:434});fr=kruFr(g);
 return`${hd('5.8','Algoritmo de Kruskal','Ordena, recoge y *evita* ciclos')}
<div style="display:grid;grid-template-columns:700px 1fr;gap:40px;margin-top:0"><div>${g.html()}</div><div>
<div class="tag">aristas ordenadas de menor a mayor</div><div class="sk2" id="m3F" style="margin:8px 0 14px;min-height:150px"></div>
<div class="read" id="m3M" style="min-height:90px;font-size:22px"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14px"><div class="card c" style="padding:10px 16px"><div class="tag">costo del bosque</div><div class="big" id="m3T" style="font-size:80px;color:var(--yel)">0</div></div><div class="card" style="padding:10px 16px"><div class="tag">grupos separados</div><div class="big" id="m3N" style="font-size:80px">7</div></div></div>
<div class="noadv" id="plH" style="margin-top:14px"></div></div></div>`},
init:el=>{pl=player($('#plH',el),fr.length,i=>{const f=fr[i];paintKru(g,f);$('#m3F',el).innerHTML=edgeChips(g,f.ord,f.now,f.acc,f.rej);$('#m3M',el).innerHTML=f.msg;tween($('#m3T',el),f.total,v=>Math.round(v),350);$('#m3N',el).textContent=MKS.length-f.acc.length;
  if(f.now!=null){const e=g.E[f.now];if(f.ok===true){rip(g,e.a,C.mnt);rip(g,e.b,C.mnt);fly(g,g.P[e.a],g.P[e.b],{ms:450,r:8,color:C.mnt})}else if(f.ok===false){replay(g.root,'shk');fly(g,[(g.P[e.a][0]+g.P[e.b][0])/2,(g.P[e.a][1]+g.P[e.b][1])/2],[(g.P[e.a][0]+g.P[e.b][0])/2,(g.P[e.a][1]+g.P[e.b][1])/2],{ms:900,txt:'✗ ciclo',color:C.cor,lift:30})}}},{ms:1250,auto:1000})}}})());

/* 4 · MIN-HEAP (LAB) */
add((()=>{let items=[],pos={},tok=0,el_,id=0,tw=null;const W_=760,Y0=50,DY=95;
const tgt=i=>{const l=Math.floor(Math.log2(i+1)),n=1<<l,k=i+1-n;return[(k+.5)/n*W_,Y0+l*DY]};
function draw(msg,hi=[]){const h=$('#hpS',el_);if(!h)return;let s='<g>';items.forEach((it,i)=>{if(i>0){const p=pos[items[(i-1)>>1].id],c=pos[it.id];if(p&&c)s+=`<path d="M${F(p[0])} ${F(p[1])}L${F(c[0])} ${F(c[1])}" stroke="${C.ink2}" stroke-width="3" opacity=".6"/>`}});
 items.forEach((it,i)=>{const p=pos[it.id];if(!p)return;const on=hi.includes(it.id),top=i===0;s+=`<g transform="translate(${F(p[0])} ${F(p[1])})"><circle r="${top?30:26}" fill="${on?C.yel:top?C.mnt:C.bg2}" stroke="${C.ink}" stroke-width="3.5"/><text style="font:800 24px var(--mono);fill:${on||top?C.bg:C.ink};text-anchor:middle;dominant-baseline:central">${it.v}</text><text y="${top?-44:-38}" style="font:600 14px var(--mono);fill:${C.mute};text-anchor:middle">${i}</text></g>`});
 h.innerHTML=s+'</g>';$('#hpA',el_).innerHTML=items.map((it,i)=>`<span class="e ${hi.includes(it.id)?'now':i===0?'ok':''}">${it.v}</span>`).join('')||'<span class="mute">(vacío)</span>';if(msg)$('#hpM',el_).innerHTML=msg}
function settle(ms=420){return new Promise(res=>{cancelAnimationFrame(tw);const from={};items.forEach(it=>from[it.id]=pos[it.id]?pos[it.id].slice():tgt(items.length>0?items.indexOf(it):0));const t0=performance.now();
 const f=t=>{const k=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-k,3);items.forEach((it,i)=>{const T=tgt(i),A=from[it.id];pos[it.id]=[A[0]+(T[0]-A[0])*e,A[1]+(T[1]-A[1])*e]});draw(null,cur_hi);if(k<1)tw=requestAnimationFrame(f);else res()};tw=requestAnimationFrame(f)})}
let cur_hi=[];
async function insert(v){const my=++tok;const it={id:++id,v};items.push(it);pos[it.id]=[W_/2,-10];cur_hi=[it.id];draw(`Inserto <b>${v}</b> al final (hueco libre más a la izquierda)`);await settle(450);let i=items.length-1;
 while(i>0){const p=(i-1)>>1;if(my!==tok)return;if(items[p].v>items[i].v){draw(`<b>${items[i].v}</b> es menor que su padre <b>${items[p].v}</b> → <b>sube</b> (intercambio)`);await sleep(350);[items[p],items[i]]=[items[i],items[p]];cur_hi=[it.id];await settle(380);i=p}else break}
 cur_hi=[];draw(`Heap listo: el <b>mínimo (${items[0].v}) siempre está en la raíz</b> · O(log n)`);await settle(1)}
async function extract(){const my=++tok;if(!items.length){draw('El heap está <b>vacío</b>. Inserta algo.');return}const top=items[0];cur_hi=[top.id];draw(`Saco el mínimo: <b>${top.v}</b> (¡O(1) para verlo!)`);await sleep(550);
 const last=items.pop();if(!items.length){cur_hi=[];delete pos[top.id];draw(`Saqué <b>${top.v}</b>. Heap vacío.`);return}items[0]=last;delete pos[top.id];cur_hi=[last.id];draw(`El último (<b>${last.v}</b>) ocupa la raíz y <b>baja</b> si algún hijo es menor`);await settle(450);
 let i=0;while(true){if(my!==tok)return;const l=2*i+1,r=l+1;let m=i;if(l<items.length&&items[l].v<items[m].v)m=l;if(r<items.length&&items[r].v<items[m].v)m=r;if(m===i)break;draw(`<b>${items[i].v}</b> baja: su hijo menor es <b>${items[m].v}</b>`);await sleep(350);[items[i],items[m]]=[items[m],items[i]];cur_hi=[last.id];await settle(380);i=m}
 cur_hi=[];draw(`Saqué <b>${top.v}</b> y el heap se reacomodó · O(log n). Nuevo mínimo: <b>${items[0].v}</b>`);await settle(1)}
return{sec:8,steps:0,lab:true,role:'Lab · Min-Heap (la «fila VIP»)',
notes:'LAB: un MIN-HEAP es un árbol casi completo donde cada padre es MENOR o igual que sus hijos; por eso el mínimo siempre está en la raíz y lo ves en O(1). Insertar: pones el nuevo al final y lo haces SUBIR mientras sea menor que su padre. Extraer: sacas la raíz, pones el último en su lugar y lo haces BAJAR. Ambos cuestan O(log n) porque el árbol es bajito. ¿Por qué lo usa Prim? Porque en cada paso necesita "la arista más barata de la frontera" y el heap la da sin ordenar todo. Prueba "Cargar pesos de Prim".',
html:()=>`${hd('5.8','Estructura clave de Prim','Min-Heap: la *fila VIP* del más barato')}
<div style="display:grid;grid-template-columns:790px 1fr;gap:40px;margin-top:0;align-items:start"><svg id="hpS" viewBox="-15 -10 790 400" width="790" height="400" class="ch"></svg><div>
<div class="row" style="gap:10px;flex-wrap:wrap"><span class="btn p" id="hpI">➕ Insertar número</span><span class="btn" id="hpX">⤴ Extraer mínimo</span><span class="btn" id="hpL">📦 Cargar pesos de Prim</span><span class="btn" id="hpC">🧹</span></div>
<div class="tag" style="margin-top:20px">así se guarda: un simple arreglo</div><div class="sk2" id="hpA" style="margin-top:8px;min-height:44px"></div>
<div class="read" id="hpM" style="margin-top:16px;min-height:100px;font-size:22px">Inserta números y mira cómo <b>el menor siempre sube a la raíz</b>.</div>
<div class="card y" style="margin-top:14px;font-size:21px"><div class="tag">costos</div>Ver el mínimo <b>O(1)</b> · insertar <b>O(log n)</b> · extraer <b>O(log n)</b></div></div></div>`,
init:el=>{el_=el;items=[];pos={};tok++;draw();$('#hpI',el).onclick=()=>insert(1+Math.floor(Math.random()*30));$('#hpX',el).onclick=extract;
 $('#hpC',el).onclick=()=>{tok++;items=[];pos={};cur_hi=[];draw('Heap vacío.')};
 $('#hpL',el).onclick=async()=>{tok++;items=[];pos={};cur_hi=[];draw();const my=tok;for(const w of [7,5,8,9,7,5,15]){if(my!==tok||!el.isConnected)return;await insert(w);await sleep(150)}}}}})());

/* 5 · UNION-FIND (LAB) */
add((()=>{let g,u,k8=[...'12345678'],sel=null;return{sec:8,steps:0,lab:true,role:'Lab · Union-Find',
notes:'LAB: Union-Find responde "¿estos dos nodos ya están en el mismo grupo?" casi al instante. Cada grupo tiene un REPRESENTANTE (su raíz, en dorado). FIND(x) sube por los "padres" hasta la raíz; UNION une dos grupos colgando una raíz de la otra. Haz clic en dos nodos: si ya tienen la misma raíz → "¡mismo grupo!" = Kruskal descartaría esa arista (ciclo). Si no → se fusionan y cambian de color. El arreglo de abajo es la estructura real: parent[i]. Con "compresión de caminos" el árbol se aplana y el costo es casi constante.',
html:()=>{g=new Gr('uf',{r:34,fs:24,vb:[760,500],dir:false,int:true,anim:false,nodes:circ(k8,380,250,200,200),edges:allPairs(k8)});u=new UF(k8);
 return`${hd('5.8','Estructura clave de Kruskal','Union-Find: *¿mismo grupo?* en un parpadeo')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:40px;margin-top:-6px"><div>${g.html()}</div><div><div class="tag">clic en dos nodos para unirlos</div>
<div class="tag" style="margin-top:16px">parent[ ] · quién es el «jefe» de cada nodo</div><div class="sk2" id="ufP" style="margin-top:8px"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px"><div class="card c" style="padding:10px 16px"><div class="tag">grupos</div><div class="big" id="ufN" style="font-size:90px">8</div></div><div class="card" style="padding:10px 16px"><div class="tag">uniones</div><div class="big" id="ufU" style="font-size:90px;color:var(--mnt)">0</div></div></div>
<div class="read" id="ufM" style="margin-top:16px;min-height:100px;font-size:22px">Elige dos nodos.</div><div class="row" style="gap:12px;margin-top:14px"><span class="btn" id="ufR">🔄 Reiniciar</span><span class="btn p" id="ufD">🎬 Demo</span></div></div></div>`},
init:el=>{g.E.forEach(e=>g.Ed(e.i).classList.add('off'));let cnt=0;
 const draw=(msg)=>{const c=comps(k8,k8.map(k=>[k,u.find(k)])),rts={};k8.forEach(k=>rts[u.find(k)]=1);g.reset();k8.forEach(k=>{const sz=k8.filter(q=>u.find(q)===u.find(k)).length;if(sz>1)g.n(k,'c'+(c.m[k]%7+1));if(u.find(k)===k&&sz>1)g.bd(k,'jefe',0,-52)});
  $('#ufP',el).innerHTML=k8.map(k=>`<span class="e ${u.find(k)===k?'ok':''}" title="parent[${k}]">${k}→${u.p[k]}</span>`).join('');tween($('#ufN',el),Object.keys(rts).length,v=>Math.round(v),300);$('#ufU',el).textContent=cnt;if(msg)$('#ufM',el).innerHTML=msg;if(sel)g.n(sel,'sel')};
 const act=(a,b)=>{const ra=u.find(a),rb=u.find(b);if(ra===rb){replay(g.root,'shk');rip(g,a,C.cor);rip(g,b,C.cor);draw(`find(${a}) = <b>${ra}</b> y find(${b}) = <b>${rb}</b>: <b class="no">¡mismo grupo!</b> Unirlos cerraría un <b>ciclo</b> → Kruskal la descartaría.`);return}
  u.union(a,b);cnt++;const i=g.idx(a,b);g.Ed(i).classList.remove('off');fly(g,g.P[a],g.P[b],{ms:450,r:8,color:C.mnt});rip(g,a,C.mnt);rip(g,b,C.mnt);draw(`find(${a}) = ${ra}, find(${b}) = ${rb}: <b class="ok">distintos</b> → <b>union</b>: la raíz ${rb} cuelga de ${ra}. ¡Un grupo menos!`)};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd');if(!nd)return;const k=nd.dataset.n;if(!sel){sel=k;g.n(k,'sel');return}if(sel===k){g.n(k,'sel',false);sel=null;return}const a=sel;sel=null;g.n(a,'sel',false);act(a,k)});
 $('#ufR',el).onclick=()=>{u=new UF(k8);cnt=0;sel=null;g.E.forEach(e=>g.Ed(e.i).classList.add('off'));draw('Todos son su propio jefe. Elige dos nodos.')};
 $('#ufD',el).onclick=async()=>{$('#ufR',el).click();for(const [a,b] of [['1','2'],['3','4'],['1','3'],['5','6'],['2','4'],['7','8'],['6','7'],['4','5']]){await sleep(900);if(!el.isConnected)return;act(a,b)}};draw()}}})());

/* 6 · CARRERA PRIM vs KRUSKAL */
add((()=>{let ga,gb,fa,fb,pl;return{sec:8,steps:0,lab:true,role:'Lab · Prim vs Kruskal',
notes:'LAB: mismo grafo, dos estrategias, MISMO resultado: costo 39. Compara cómo piensan: Prim crece UN árbol desde A, siempre conectado; Kruskal junta aristas baratas en cualquier parte del grafo y arma varios grupos que se fusionan al final. Aunque el orden de aristas es distinto, ambos terminan con 6 aristas y costo 39 (si hay empates puede cambiar el árbol, no el costo). Dale ▶ Auto y fíjate en los colores.',
html:()=>{const O={anim:false,width:600,height:372};ga=mgGraph('pk1',O);gb=mgGraph('pk2',O);fa=primFr(ga);fb=kruFr(gb);
 const card=(c,t,sub,g,id)=>`<div class="card ${c}" style="padding:14px 20px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div class="ant" style="font-size:42px;line-height:1">${t}</div><div class="big" id="${id}T" style="font-size:56px;color:var(--yel)">0</div></div><div style="font-size:18px;color:var(--ink2);margin:2px 0 4px">${sub}</div>${g.html()}<div class="read" id="${id}M" style="min-height:76px;font-size:19px;margin-top:4px"></div></div>`;
 return`${hd('5.8','Carrera','Mismo grafo, *mismo* costo')}<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:10px">${card('c','Prim','Crece <b>un</b> árbol desde A',ga,'k1')}${card('m','Kruskal','Ordena y une <b>en todo</b> el grafo',gb,'k2')}</div><div class="noadv" id="plH" style="margin-top:12px"></div>`},
init:el=>{const n=Math.max(fa.length,fb.length);pl=player($('#plH',el),n,i=>{const a=fa[Math.min(i,fa.length-1)],b=fb[Math.min(i,fb.length-1)];paintPrim(ga,a);paintKru(gb,b);tween($('#k1T',el),a.total,v=>Math.round(v),300);tween($('#k2T',el),b.total,v=>Math.round(v),300);$('#k1M',el).innerHTML=a.msg;$('#k2M',el).innerHTML=b.msg;if(a.new)rip(ga,a.new,C.mnt);if(b.ok)rip(gb,gb.E[b.now].b,C.mnt)},{ms:1300,auto:900})}}})());

/* 7 · TU ERES PRIM (LAB) */
add((()=>{let g,tE=[],inT={},started=false;return{sec:8,steps:0,lab:true,role:'Lab · tú eres Prim',
notes:'LAB: ahora tú ejecutas Prim. 1) Haz clic en un nodo inicial. 2) Cada turno haz clic en la arista MÁS BARATA que sale de tu árbol. Si eliges una que no toca el árbol, o que no es la más barata, el sistema te explica el error y la sacude. Botón "Pista" ilumina la frontera. Al terminar verás tu costo (debe ser 39, sin importar el nodo inicial). Ese es el truco de Prim: la codicia no se equivoca.',
html:()=>{g=mgGraph('pt',{int:true,anim:false,width:760,height:471});
 return`${hd('5.8','Lab · tú eres Prim','Haz clic en la arista *más barata* de la frontera')}
<div style="display:grid;grid-template-columns:760px 1fr;gap:40px;margin-top:-4px"><div>${g.html()}</div><div><div class="rd"><span>Aristas (necesitas 6)</span><b id="ptN">0</b></div><div class="rd"><span>Costo</span><b id="ptT">0</b></div><div class="bar" id="ptB" style="width:0;background:var(--cy)"></div>
<div class="read" id="ptM" style="min-height:130px;font-size:23px;margin-top:20px">Primero: haz clic en un <b>nodo inicial</b>.</div><div class="row" style="gap:12px;margin-top:16px"><span class="btn" id="ptH">💡 Pista</span><span class="btn" id="ptR">🔄 Reiniciar</span></div></div></div>`},
init:el=>{tE=[];inT={};started=false;const cand=()=>g.E.filter(e=>!e.x&&(!!inT[e.a]!==!!inT[e.b])).sort((p,q)=>p.w-q.w||p.i-q.i);
 const draw=(msg)=>{g.reset();g.E.forEach(e=>{if(tE.includes(e.i))g.e(e.i,'on')});Object.keys(inT).forEach(k=>g.n(k,'vis'));const t=tE.reduce((a,i)=>a+g.E[i].w,0);$('#ptN',el).textContent=tE.length;tween($('#ptT',el),t,v=>Math.round(v),300);$('#ptB',el).style.width=t/60*100+'%';if(msg)$('#ptM',el).innerHTML=msg;
  if(tE.length===6)$('#ptM',el).innerHTML=`🏆 <b>¡Listo!</b> Costo <b>${t}</b>${t===39?' = el mínimo. ¡La voracidad no falla!':''}`};
 g.root.addEventListener('click',e=>{const nd=e.target.closest('.nd'),ed=e.target.closest('.ge');
  if(!started){if(nd){started=true;inT[nd.dataset.n]=1;rip(g,nd.dataset.n,C.mnt);draw(`Empiezas en <b>${nd.dataset.n}</b>. Ahora elige la arista <b>más barata</b> que salga de tu árbol.`)}return}
  if(!ed||tE.length===6)return;const i=+ed.dataset.i,E=g.E[i];if(tE.includes(i))return;const c=cand();
  if(!c.find(x=>x.i===i)){replay(g.root,'shk');const both=inT[E.a]&&inT[E.b];draw(both?`✗ <b>${E.a}–${E.b}</b> une dos nodos que ya están dentro: cerraría un <b>ciclo</b>.`:`✗ <b>${E.a}–${E.b}</b> no sale de tu árbol. Debe tocar <b>un nodo de dentro y uno de fuera</b>.`);return}
  if(E.w>c[0].w){replay(g.root,'shk');g.e(i,'bad');setTimeout(()=>g.e(i,'bad',false),600);draw(`✗ Hay una frontera más barata: <b>${c[0].a}–${c[0].b} (${c[0].w})</b>. Prim siempre toma la <b>mínima</b>.`);return}
  const nn=inT[E.a]?E.b:E.a;inT[nn]=1;tE.push(i);fly(g,g.P[E.a===nn?E.b:E.a],g.P[nn],{ms:450,r:8,color:C.mnt});rip(g,nn,C.mnt);draw(`✓ Agregas <b>${nn}</b> con ${E.a}–${E.b} (${E.w}). ${tE.length<6?'Sigue.':''}`)});
 $('#ptH',el).onclick=()=>{if(!started)return;cand().forEach((e,k)=>{g.e(e.i,k?'hl':'cur');setTimeout(()=>g.e(e.i,k?'hl':'cur',false),1600)})};
 $('#ptR',el).onclick=()=>{tE=[];inT={};started=false;draw('Haz clic en un <b>nodo inicial</b>.')};draw()}}})());

/* 8 · TABLA COMPARATIVA + DENSIDAD */
add((()=>{return{sec:8,steps:5,role:'Tabla comparativa',
notes:'Cierre de la sección. [→] filas una por una. Estrategia: Prim hace crecer un árbol; Kruskal une aristas globalmente. Estructura: Prim usa Min-Heap; Kruskal ordena y usa Union-Find. Complejidad: Prim O(E log V); Kruskal O(E log E) pero como E ≤ V², log E ≈ 2 log V, así que son iguales en orden de magnitud (el log solo cambia una constante). La diferencia práctica: en grafos DENSOS Prim (con matriz o heap) se porta mejor; en DISPERSOS Kruskal es muy natural (ordenar pocas aristas). Mueve el slider para ver la recomendación.',
html:()=>{const r=[['Estrategia','Crece <b>un</b> árbol desde un nodo','Ordena <b>todas</b> las aristas y las une'],['Estructura clave','<b>Min-Heap</b> (cola de prioridad)','<b>Union-Find</b> (conjuntos disjuntos)'],['¿Qué elige?','La arista más barata <b>de la frontera</b>','La arista más barata <b>del grafo</b> que no haga ciclo'],['Resultado parcial','Siempre <b>un</b> árbol conectado','Un <b>bosque</b> que se va fusionando'],['Complejidad','O(E log V)','O(E log E)'],['Conviene cuando…','Grafo <b>denso</b> (muchas aristas)','Grafo <b>disperso</b> (pocas aristas)']];
 return`${hd('5.8','Prim vs Kruskal','La tabla que *vale* un examen')}
<table class="tb a" style="--d:.3s;margin-top:26px"><tr><th></th><th>🟦 Prim</th><th>🟩 Kruskal</th></tr>${r.map((a,i)=>`<tr data-s="${i}"><td>${a[0]}</td><td><span class="xin">${a[1]}</span></td><td><span class="xin">${a[2]}</span></td></tr>`).join('')}</table>
<div class="card y" data-s="5" style="margin-top:22px;display:grid;grid-template-columns:420px 1fr;gap:34px;align-items:center"><div><div class="tag">¿qué tan denso es tu grafo?</div><div class="rng" style="margin-top:8px"><label>Aristas existentes<span id="pkN">20%</span></label><input type="range" id="pkS" min="1" max="100" value="20"></div></div><div style="font-size:25px" id="pkR"></div></div>`},
init:el=>{const up=()=>{const d=+$('#pkS',el).value;$('#pkN',el).textContent=d+'%';$('#pkR',el).innerHTML=d<40?'Pocas aristas: <b>Kruskal</b> ordena poco y es muy natural. Ambos son O(E log V).':d>70?'Casi todo conectado: <b>Prim</b> con heap (o matriz) evita ordenar un montón de aristas.':'Zona gris: <b>ambos sirven</b>. Elige el que sea más fácil de programar.'};$('#pkS',el).oninput=up;up()}}})());
