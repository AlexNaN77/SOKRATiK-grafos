/* ============ 5.3 REPRESENTACIÓN DE GRAFOS ============ */
const RN=['A','B','C','D'],RE=[['A','B'],['A','C'],['B','C'],['C','D']];
const RPOS={A:[110,110],B:[400,70],C:[330,300],D:[540,390]};
function mxHtml(ks,g,cls=''){let h=`<table class="mx sm ${cls}"><tr><th></th>${ks.map(k=>`<th>${k}</th>`).join('')}</tr>`;
 ks.forEach(a=>{h+=`<tr><th>${a}</th>${ks.map(b=>{const i=g.idx(a,b),on=i>=0;return`<td class="${on?'o':'z'}" data-a="${a}" data-b="${b}"${on?` data-e="${i}"`:''}>${on?1:0}</td>`}).join('')}</tr>`});return h+'</table>'}
function lsHtml(ks,g){const A=adjOf(g);return`<div class="ls">${ks.map(k=>`<div data-k="${k}"><b>${k}</b><span class="ar">→</span>${A[k].length?A[k].map((p,j)=>`<span class="nx" data-e="${p[1]}" data-v="${p[0]}">${p[0]}</span>${j<A[k].length-1?'<span class="ar">→</span>':''}`).join(''):'<span class="mute">∅</span>'}</div>`).join('')}</div>`}
function incHtml(ks,g,dir){const E=g.E.filter(e=>!e.x);let h=`<table class="mx sm"><tr><th></th>${E.map(e=>`<th data-e="${e.i}">e${e.i+1}</th>`).join('')}</tr>`;
 ks.forEach(k=>{h+=`<tr><th>${k}</th>${E.map(e=>{let v=0;if(e.a===e.b&&e.a===k)v=2;else if(dir){if(e.a===k)v=-1;else if(e.b===k)v=1}else if(e.a===k||e.b===k)v=1;
  return`<td class="${v?'o':'z'}" ${v?`data-e="${e.i}"`:''} style="${v<0?'color:var(--cor)':v>0&&dir?'color:var(--mnt)':''}">${v>0&&dir?'+':''}${v}</td>`}).join('')}</tr>`});
 const sum=E.map(e=>dir?0:2);return h+`<tr><th style="font-size:14px;color:var(--mute)">Σ</th>${sum.map(s=>`<td class="z" style="font-size:18px">${s}</td>`).join('')}</tr></table>`}
/* resalta en conjunto: aristas del grafo + celdas con el mismo data-e */
function wireHl(el,g){let hov=false;const set=i=>{$$('.hi',el).forEach(x=>x.classList.remove('hi'));g.E.forEach(e=>g.e(e.i,'hl',false));if(i==null)return;$$(`[data-e="${i}"]`,el).forEach(x=>x.classList.add('hi'));g.e(i,'hl')};
 el.addEventListener('mouseover',e=>{const t=e.target.closest('[data-e],.ge');if(!t){hov=false;set(null);return}hov=true;set(t.dataset.e!=null?+t.dataset.e:+t.dataset.i)});
 el.addEventListener('mouseleave',()=>{hov=false;set(null)});return{set,hov:()=>hov}}

/* 1 · IDIOMA MATEMÁTICO */
add((()=>{let g,tk=[];return{sec:3,steps:3,role:'Cómo se escribe',
notes:'Antes de la computadora, las matemáticas: G = (V, E). [→] V lista los vértices (los nodos pulsan). [→] E lista las aristas como parejas; mira cómo cada pareja enciende su rayita en el dibujo. [→] Problema: una computadora no ve dibujos. Necesita ESTRUCTURAS de datos. Ahí entran las tres formas.',
html:()=>{g=new Gr('r1',{r:34,vb:[640,470],dir:false,d0:.1,nodes:RPOS,edges:RE});
 return`${hd('5.3','Representación · en matemáticas','Primero se escribe, *luego* se programa')}
<div style="display:grid;grid-template-columns:640px 1fr;gap:70px;margin-top:20px;align-items:center"><div>${g.html()}</div><div>
<div class="a" style="--d:.3s"><span class="ant" style="font-size:130px;line-height:1">G = (<span class="cy">V</span>, <span class="mnt">E</span>)</span></div>
<div data-s="1" style="margin-top:16px"><div class="tag cy">V · conjunto de vértices</div><div class="mono" style="font-size:36px;margin-top:6px">V = { ${RN.map(k=>`<span class="cy">${k}</span>`).join(', ')} }</div></div>
<div data-s="2" style="margin-top:18px"><div class="tag mnt">E · conjunto de aristas (parejas)</div><div class="mono" style="font-size:36px;margin-top:6px">E = { ${RE.map((e,i)=>`<span class="mnt ee" data-i="${i}">{${e[0]},${e[1]}}</span>`).join(', ')} }</div></div>
<div class="card y" data-s="3" style="margin-top:28px;font-size:26px">Una computadora <b>no ve dibujos</b>. Necesita guardar eso en <b>estructuras</b>… y hay <b>tres</b> formas de hacerlo →</div></div></div>`},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];g.reset();$$('.ee',el).forEach(x=>x.style.filter='');
 if(s===1)RN.forEach((k,i)=>tk.push(setTimeout(()=>rip(g,k,C.cy),i*180)));
 if(s===2)RE.forEach((e,i)=>{tk.push(setTimeout(()=>{g.e(i,'hl');const x=$$('.ee',el)[i];x.style.filter='drop-shadow(0 0 10px #3DDC97)';fly(g,g.P[e[0]],g.P[e[1]],{ms:500,r:7,color:C.mnt})},300+i*520));tk.push(setTimeout(()=>{g.e(i,'hl',false);$$('.ee',el)[i].style.filter=''},300+i*520+480))})}}})());

/* 2 · UN GRAFO, TRES IDIOMAS */
add((()=>{let g,w,tk=[];return{sec:3,steps:3,role:'Un grafo, tres idiomas',
notes:'El MISMO grafo de 4 nodos escrito de tres formas. Pasa el mouse sobre cualquier arista del dibujo y se ilumina en las tres representaciones a la vez. [→] Matriz de adyacencia: tabla V×V, un 1 si hay arista. [→] Lista de adyacencia: cada nodo anota a sus vecinos. [→] Matriz de incidencia: filas = vértices, columnas = aristas, un 1 si el vértice toca esa arista.',
html:()=>{g=new Gr('r2',{r:30,vb:[500,440],dir:false,int:true,d0:.1,nodes:{A:[90,100],B:[360,60],C:[290,280],D:[440,390]},edges:RE});
 const P=(s,t,c,sub,chips,body)=>`<div class="card ${c}" data-s="${s}" style="padding:18px 20px"><div class="ant" style="font-size:34px;line-height:1">${t}</div><div style="font-size:18px;color:var(--ink2);margin:6px 0 10px;min-height:46px;line-height:1.25">${sub}</div>${body}<div style="margin-top:12px">${chips}</div></div>`;
 return`${hd('5.3','Tres formas · mismo grafo','Un grafo, *tres* idiomas')}
<div style="display:grid;grid-template-columns:500px repeat(3,1fr);gap:30px;margin-top:16px;align-items:start"><div>${g.html()}<div class="tag" style="margin-top:6px">pasa el mouse por una arista ☝</div></div>
${P(1,'Matriz de adyacencia','c','Tabla V×V: un <b>1</b> si hay arista entre fila y columna.','<span class="chip c">consulta O(1)</span><span class="chip r">memoria O(V²)</span>',mxHtml(RN,g))}
${P(2,'Lista de adyacencia','m','Cada nodo <b>anota a sus vecinos</b>. Nada más.','<span class="chip c">memoria O(V+E)</span><span class="chip m">ideal: dispersos</span>',lsHtml(RN,g))}
${P(3,'Matriz de incidencia','v','Filas = <b>vértices</b>, columnas = <b>aristas</b>. 1 si la toca.','<span class="chip c">memoria O(V·E)</span><span class="chip">cada columna: dos 1</span>',incHtml(RN,g,false))}</div>`},
init:el=>{w=wireHl(el,g)},
onStep:(el,s)=>{tk.forEach(clearTimeout);tk=[];if(!s)return;RE.forEach((e,i)=>{tk.push(setTimeout(()=>{if(!w.hov())w.set(i)},350+i*600))});tk.push(setTimeout(()=>{if(!w.hov())w.set(null)},350+RE.length*600))}}})());

/* 3 · LAB MATRIZ DE ADYACENCIA */
add((()=>{let g,api;const ks=['A','B','C','D','E'];return{sec:3,steps:0,lab:true,role:'Lab · matriz de adyacencia',
notes:'LAB: haz clic en una CELDA de la matriz o en dos nodos del dibujo. Observa dos cosas: (1) la matriz es SIMÉTRICA en grafos no dirigidos: M[A][C] y M[C][A] se encienden juntas. (2) Casi todo son ceros: eso es el desperdicio de memoria que veremos en los grafos dispersos. Pasa el mouse por una celda: M[A][C] = 1 significa "A y C son vecinos" y se responde en UN solo vistazo, O(1).',
html:()=>{g=new Gr('r3',{r:32,fs:22,vb:[620,560],dir:false,int:true,anim:false,nodes:circ(ks,310,280,200,200),edges:allPairs(ks)});
 return`${hd('5.3','Lab · matriz de adyacencia','Cada *celda* es una pregunta: ¿son vecinos?')}
<div style="display:grid;grid-template-columns:620px 1fr;gap:60px;margin-top:-6px;align-items:center"><div>${g.html()}</div><div>
<div class="tag">clic en una celda (o en dos nodos) para conectar / desconectar</div><div id="mxT" style="margin:10px 0 14px"></div>
<div class="read" id="mxR" style="font:600 28px var(--mono)">pasa el mouse por una celda</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px"><div class="card c" style="padding:12px 16px"><div class="tag">unos (2·|E|)</div><div class="big" id="mxU" style="font-size:64px">0</div></div><div class="card" style="padding:12px 16px"><div class="tag">celdas (V²)</div><div class="big" id="mxV" style="font-size:64px;color:var(--ink2)">25</div></div><div class="card r" style="padding:12px 16px"><div class="tag">ceros (desperdicio)</div><div class="big" id="mxZ" style="font-size:64px;color:var(--cor)">0%</div></div></div></div></div>`},
init:el=>{let prev=new Set();const mxT=$('#mxT',el);
 const upd=()=>{const L=api.list(),on=new Set(L.map(e=>e.i));g.reset();
  let h=`<table class="mx int"><tr><th></th>${ks.map(k=>`<th>${k}</th>`).join('')}</tr>`;ks.forEach(a=>{h+=`<tr><th>${a}</th>${ks.map(b=>{const i=a===b?-1:g.idx(a,b),v=i>=0&&on.has(i);return`<td class="${a===b?'z':v?'o':'z'}" data-a="${a}" data-b="${b}" style="${a===b?'opacity:.35;cursor:not-allowed':''}">${v?1:0}</td>`}).join('')}</tr>`});mxT.innerHTML=h+'</table>';
  L.forEach(e=>{if(!prev.has(e.i)){rip(g,e.a,C.mnt);rip(g,e.b,C.mnt);fly(g,g.P[e.a],g.P[e.b],{ms:550,r:8,color:C.mnt});const t=mxT.querySelectorAll(`td[data-a="${e.a}"][data-b="${e.b}"],td[data-a="${e.b}"][data-b="${e.a}"]`);t.forEach(x=>replay(x,'shake'))}});prev=on;
  tween($('#mxU',el),2*L.length,v=>Math.round(v),350);$('#mxZ',el).textContent=Math.round((25-2*L.length)/25*100)+'%'};
 api=pg(g,{onChange:upd});
 mxT.addEventListener('click',e=>{const td=e.target.closest('td[data-a]');if(!td||td.dataset.a===td.dataset.b)return;api.toggle(g.idx(td.dataset.a,td.dataset.b))});
 mxT.addEventListener('mouseover',e=>{const td=e.target.closest('td[data-a]');g.E.forEach(x=>g.e(x.i,'hl',false));$$('.hi',mxT).forEach(x=>x.classList.remove('hi'));if(!td)return;const a=td.dataset.a,b=td.dataset.b;$$(`td[data-a="${a}"][data-b="${b}"],td[data-a="${b}"][data-b="${a}"]`,mxT).forEach(x=>x.classList.add('hi'));const i=a===b?-1:g.idx(a,b),v=i>=0&&api.on(i);if(v)g.e(i,'hl');
  $('#mxR',el).innerHTML=`M[${a}][${b}] = <b class="${v?'ok':'mute'}" style="font-size:34px">${v?1:0}</b> <span style="font-size:20px;color:var(--ink2);font-family:var(--txt)">${a===b?'(un nodo con él mismo: lazo)':v?`${a} y ${b} son vecinos · <b>1 vistazo</b>`:`${a} y ${b} no se conectan · <b>1 vistazo</b>`}</span>`});
 mxT.addEventListener('mouseleave',()=>{$$('.hi',mxT).forEach(x=>x.classList.remove('hi'));g.E.forEach(x=>g.e(x.i,'hl',false))});
 api.set([['A','B'],['B','C'],['C','D'],['D','E']])}}})());

/* 4 · CARRERA: matriz vs lista */
add((()=>{let g,tok=0;const ks=[...'ABCDEF'],ED=[['A','B'],['A','C'],['A','D'],['B','E'],['C','D'],['D','E'],['E','F']];return{sec:3,steps:0,lab:true,role:'Lab · ¿existe la arista? matriz vs lista',
notes:'LAB: elige una pregunta, por ejemplo "¿existe A–F?". La MATRIZ mira UNA celda: O(1). La LISTA tiene que recorrer los vecinos de A uno por uno: O(grado). Con A–B la lista gana de casualidad (está primero); con A–F tiene que ver todo y descubrir que no está. Esa es la diferencia real: consulta rápida (matriz) contra memoria chica (lista).',
html:()=>{g=new Gr('r4',{r:28,fs:20,vb:[520,500],dir:false,d0:.1,nodes:{A:[80,110],B:[250,50],C:[110,300],D:[300,230],E:[430,120],F:[440,400]},edges:ED});
 return`${hd('5.3','Lab · carrera','¿Quién responde *más rápido*?')}
<div style="display:grid;grid-template-columns:520px 1fr;gap:50px;margin-top:0"><div>${g.html()}</div><div>
<div class="row" style="gap:10px;flex-wrap:wrap"><span class="tag" style="margin-right:6px">pregunta:</span>${[['A','B'],['A','D'],['A','F'],['D','E'],['C','E']].map(q=>`<span class="btn q" data-a="${q[0]}" data-b="${q[1]}" style="padding:8px 16px;font-size:20px">¿ ${q[0]}–${q[1]} ?</span>`).join('')}</div>
<div style="display:grid;grid-template-columns:auto 1fr;gap:34px;margin-top:20px;align-items:start"><div class="card c" style="padding:16px 18px"><div class="ant" style="font-size:28px">Matriz</div>${mxHtml(ks,g)}<div class="rd" style="margin-top:10px"><span>pasos</span><b id="rcM">0</b></div><div id="rcMr" style="font-size:20px;min-height:30px"></div></div>
<div class="card m" style="padding:16px 18px"><div class="ant" style="font-size:28px">Lista</div>${lsHtml(ks,g)}<div class="rd" style="margin-top:6px"><span>pasos</span><b id="rcL">0</b></div><div id="rcLr" style="font-size:20px;min-height:30px"></div></div></div></div></div>`},
init:el=>{const run=async(a,b)=>{const my=++tok;$$('.hi,.seen',el).forEach(x=>x.classList.remove('hi','seen'));g.reset();g.n([a,b],'sel');['rcMr','rcLr'].forEach(i=>$('#'+i,el).innerHTML='');$('#rcM',el).textContent=0;$('#rcL',el).textContent=0;
  const td=$(`.mx td[data-a="${a}"][data-b="${b}"]`,el);await sleep(300);if(my!==tok)return;td.classList.add('hi');$('#rcM',el).textContent=1;const has=g.idx(a,b)>=0;$('#rcMr',el).innerHTML=`<b class="${has?'ok':'no'}">${has?'✓ sí hay':'✗ no hay'}</b> · 1 vistazo`;
  const row=$(`.ls>div[data-k="${a}"]`,el),its=$$('.nx',row);let n=0,found=false;
  for(const it of its){await sleep(620);if(my!==tok)return;n++;$$('.hi',row).forEach(x=>{x.classList.remove('hi');x.classList.add('seen')});it.classList.add('hi');$('#rcL',el).textContent=n;if(it.dataset.v===b){found=true;break}}
  await sleep(300);if(my!==tok)return;$('#rcLr',el).innerHTML=found?`<b class="ok">✓ sí está</b> · ${n} paso${n>1?'s':''}`:`<b class="no">✗ no está</b> · revisé los ${n} vecinos de ${a}`;if(found)g.e(g.idx(a,b),'hl')};
 $$('.q',el).forEach(b=>b.onclick=()=>run(b.dataset.a,b.dataset.b));$$('.btn.q',el)[2].click()}}})());

/* 5 · MEMORIA: denso vs disperso */
add((()=>{let pv=0,pe=0;const shuf=V=>{seed(V*31+7);const pr=allPairs([...Array(V).keys()].map(String));for(let i=pr.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[pr[i],pr[j]]=[pr[j],pr[i]]}return pr};
return{sec:3,steps:0,lab:true,role:'Lab · memoria: denso vs disperso',
notes:'LAB: mueve V (nodos) y E (aristas). La cuadrícula ES la matriz de adyacencia: cada cuadrito encendido es una arista. Si hay pocas aristas, la matriz es un desierto de ceros y la lista guarda solo lo necesario. Con pocas aristas por nodo (disperso) la lista gana por goleada; cuando casi todos se conectan (denso), la matriz ya no desperdicia tanto. Dato real: Internet o una red social tienen millones de nodos y cada uno conoce a pocos: son dispersos.',
html:()=>`${hd('5.3','Lab · memoria','Una matriz *llena de ceros* es un desperdicio')}
<div style="display:grid;grid-template-columns:540px 1fr;gap:70px;margin-top:-4px;align-items:center"><svg id="mmG" viewBox="0 0 540 540" width="540" height="540" class="ch"></svg><div>
<div class="rng"><label>Nodos V<span id="mmVn">8</span></label><input type="range" id="mmV" min="4" max="16" value="8"></div>
<div class="rng" style="margin-top:14px"><label>Aristas E<span id="mmEn">9</span></label><input type="range" id="mmE" min="1" max="28" value="9"></div>
<div class="g2" style="grid-template-columns:1fr 1fr;gap:20px;margin-top:20px"><div class="card c" style="padding:14px 18px"><div class="tag">matriz · V² celdas</div><div class="big" id="mmM" style="font-size:76px">64</div></div><div class="card m" style="padding:14px 18px"><div class="tag">lista · V + 2E entradas</div><div class="big" id="mmL" style="font-size:76px;color:var(--mnt)">26</div></div></div>
<div style="margin-top:16px"><div class="bar" style="width:100%;background:var(--cy)"></div><div class="bar" id="mmB" style="margin-top:8px;background:var(--mnt)"></div></div>
<div class="rd" style="margin-top:14px"><span>Densidad (aristas que existen / posibles)</span><b id="mmD">0%</b></div>
<div class="card y" id="mmVd" style="margin-top:14px;font-size:24px"></div>
<div class="card r" style="margin-top:14px;font-size:21px"><div class="tag">en el mundo real</div>Internet: <b>10⁶ nodos</b> → matriz de <b>10¹² celdas</b> (¡terabytes!). La lista guarda solo ~<b>10⁷</b>.</div></div></div>`,
init:el=>{const grid=$('#mmG',el),sv=$('#mmV',el),se=$('#mmE',el);
 const up=()=>{const V=+sv.value,mx=V*(V-1)/2;se.max=mx;if(+se.value>mx)se.value=mx;const E=+se.value;$('#mmVn',el).textContent=V;$('#mmEn',el).textContent=E;
  const pr=shuf(V).slice(0,E),cs=520/V,same=V===pv;let h=`<rect x="10" y="10" width="520" height="520" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
  for(let i=1;i<V;i++)h+=`<path d="M${10+i*cs} 10V530M10 ${10+i*cs}H530" stroke="rgba(244,241,232,.08)"/>`;
  for(let i=0;i<V;i++)h+=`<rect x="${10+i*cs+1}" y="${10+i*cs+1}" width="${cs-2}" height="${cs-2}" fill="rgba(244,241,232,.07)"/>`;
  pr.forEach((p,k)=>{const a=+p[0],b=+p[1],nw=!same||k>=pe;[[a,b],[b,a]].forEach(([r,c],j)=>{h+=`<rect class="${nw?'cin':''}" style="animation-delay:${nw?(k*28+j*40)%420:0}ms;transform-box:fill-box;transform-origin:center" x="${10+c*cs+2}" y="${10+r*cs+2}" width="${cs-4}" height="${cs-4}" rx="${Math.min(6,cs/5)}" fill="${C.yel}" stroke="${C.bg}" stroke-width="1.5"/>`})});
  grid.innerHTML=`<g class="boil">${h}</g>`;pv=V;pe=E;
  const M=V*V,L=V+2*E;tween($('#mmM',el),M,v=>Math.round(v),400);tween($('#mmL',el),L,v=>Math.round(v),400);$('#mmB',el).style.width=Math.min(100,L/M*100)+'%';
  const d=2*E/(V*(V-1))*100;$('#mmD',el).textContent=d.toFixed(0)+'%';$('#mmVd',el).innerHTML=d<35?`<b>Disperso</b>: casi todo son ceros. <b>Lista</b> de adyacencia gana: ahorra ${Math.round((1-L/M)*100)}% de memoria.`:d<70?`Densidad media: <b>depende</b>. ¿Qué consultas haces más: preguntar «¿son vecinos?» o recorrer vecinos?`:`<b>Denso</b>: casi todos con todos. La <b>matriz</b> ya no desperdicia y responde en O(1).`};
 sv.oninput=up;se.oninput=up;up()}}})());

/* 6 · MATRIZ DE INCIDENCIA */
add((()=>{let g,w,dirm=false,cyc=0;const ks=['A','B','C','D'],ED=[['A','B'],['A','C'],['B','C'],['C','D'],['B','D']];return{sec:3,steps:0,lab:true,role:'Lab · matriz de incidencia',
notes:'LAB: la matriz de incidencia relaciona VÉRTICES con ARISTAS: filas son nodos, columnas son aristas. En no dirigido, cada columna tiene exactamente dos 1 (los dos extremos de esa arista): es el apretón de manos otra vez. En dirigido se usa −1 para el que SALE y +1 para el que ENTRA, y cada columna suma 0. Pasa el mouse por una columna o déjalo ciclar solo.',
html:()=>{g=new Gr('r6',{r:32,vb:[560,420],dir:true,int:true,d0:.1,nodes:{A:[100,110],B:[330,50],C:[250,290],D:[470,230]},edges:ED});
 return`${hd('5.3','Lab · matriz de incidencia','Vértices *contra* aristas')}
<div style="display:grid;grid-template-columns:560px 1fr;gap:70px;margin-top:10px;align-items:center"><div>${g.html()}</div><div>
<div class="row" style="gap:12px"><span class="btn p" id="icA">Sin flechas · 1 y 1</span><span class="btn" id="icB">Con flechas · −1 y +1</span></div>
<div id="icT" style="margin:22px 0 14px;font-size:30px"></div><div class="card y" id="icC" style="font-size:25px"></div></div></div>`},
init:el=>{const draw=()=>{g.root.classList.toggle('nodir',!dirm);$('#icA',el).classList.toggle('p',!dirm);$('#icB',el).classList.toggle('p',dirm);
  $('#icT',el).innerHTML=incHtml(ks,g,dirm).replace('class="mx sm"','class="mx"');
  $('#icC',el).innerHTML=dirm?'Cada arista <b class="no">sale</b> de un nodo (<b class="no">−1</b>) y <b class="ok">entra</b> a otro (<b class="ok">+1</b>): <b>cada columna suma 0</b>.':'Cada columna tiene <b>exactamente dos 1</b>: los dos extremos de la arista. Σ de la fila = <b>grado</b> del vértice.';
  w.set(null)};
 w=wireHl(el,g);$('#icA',el).onclick=()=>{dirm=false;draw()};$('#icB',el).onclick=()=>{dirm=true;draw()};draw();
 every(el,1500,()=>{if(w.hov())return;cyc=(cyc+1)%ED.length;w.set(cyc);const e=g.E[cyc];fly(g,g.P[e.a],g.P[e.b],{ms:900,r:8,color:C.yel})})}}})());

/* 7 · ¿CUÁL CONVIENE? */
add((()=>{let dl=0;return{sec:3,steps:4,role:'¿Cuál conviene y cuándo?',
notes:'Tabla de decisión. Ve fila por fila con [→]. Regla práctica: casi todo lo real es DISPERSO, por eso la lista de adyacencia es la opción por defecto. Matriz cuando el grafo es pequeño o denso y necesitas "¿existe la arista?" en O(1). Incidencia cuando las aristas tienen vida propia (flujos, circuitos). Abajo: mueve el medidor de densidad y mira cuál se recomienda.',
html:()=>{const r=[['¿Existe la arista u–v?','O(1) ⚡','O(grado)','O(E)'],['Memoria','O(V²)','O(V+E) 🪶','O(V·E)'],['Recorrer vecinos de u','O(V)','O(grado) ⚡','O(E)'],['Ideal para','Grafos <b>densos</b> o pequeños','Grafos <b>dispersos</b> (casi todos)','Cuando importan las <b>aristas</b>']];
 return`${hd('5.3','Mini tabla de decisión','¿Cuál uso y *cuándo*?')}
<table class="tb a" style="--d:.3s;margin-top:34px"><tr><th></th><th>Matriz de adyacencia</th><th>Lista de adyacencia</th><th>Matriz de incidencia</th></tr>${r.map((a,i)=>`<tr data-s="${i+1}"><td>${a[0]}</td>${a.slice(1).map(x=>`<td class="mono" style="font-size:22px"><span class="xin">${x}</span></td>`).join('')}</tr>`).join('')}</table>
<div class="card" data-s="4" style="margin-top:32px;display:grid;grid-template-columns:420px 1fr;gap:40px;align-items:center"><div><div class="tag">medidor de densidad</div><div class="rng" style="margin-top:8px"><label>Aristas que existen<span id="dsN">10%</span></label><input type="range" id="dsS" min="0" max="100" value="10"></div></div>
<div class="row" style="gap:20px" id="dsR"></div></div>`},
init:el=>{const up=()=>{const d=+$('#dsS',el).value;$('#dsN',el).textContent=d+'%';const W=d<40?1:d>=75?0:-1;
 $('#dsR',el).innerHTML=[['Matriz',W===0],['Lista',W===1],['Cualquiera (depende de tus consultas)',W===-1]].map(a=>`<span class="chip ${a[1]?'t':''}" style="font-size:24px;padding:10px 22px;${a[1]?'':'opacity:.4'}">${a[1]?'✔ ':''}${a[0]}</span>`).join('')};$('#dsS',el).oninput=up;up()}}})());
