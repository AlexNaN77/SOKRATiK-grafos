# SOCRATiK · Unidad 5: Teoría de grafos

Presentación animada (60 diapositivas, 1920×1080 escalado) + guía de estudio socrática.

## Entradas
- `index.html` — hub: guía socrática (warm-up / ¿por qué? / transfer) por sección, con enlaces al deck.
- `grafos.html` — la presentación. Ir a una diapositiva: `grafos.html#N` (1–60).

## Controles del deck
→ / Espacio / clic: avanzar · ← / clic derecho: regresar · Shift+→ saltar pasos · **S saltar laboratorio** (también botón «Saltar lab») · N notas del expositor · H ayuda · F pantalla completa · B boil · G grano · W cortina · R cronómetro.

## Estructura
- `css/deck.css` — tema blueprint, componentes y estados de grafo.
- `js/lib.js` — clase `Gr` (grafos SVG con boil, morph `move()`), `fly`, `rip`, `walker`, `player`, algoritmos de apoyo.
- `js/engine.js` — motor de diapositivas, pasos, cortinas de sección, notas.
- `js/s_*.js` — contenido por sección: intro/5.1, tipos 5.2, representación 5.3, recorridos 5.4, árboles 5.5–5.6, DFS 5.7, Prim/Kruskal 5.8, aplicaciones 5.9, cierre.

## Contenido
Portada y gancho · 5.1 básicos · 5.2 tipos + apretón de manos · 5.3 matriz/lista/incidencia · 5.4 BFS vs DFS · 5.5 árboles · 5.6 árbol generador/MST · 5.7 DFS (ciclos, orden topológico, componentes, laberinto) · 5.8 Prim, Kruskal, Min-Heap, Union-Find · 5.9 aplicaciones · cierre (acordeón maestro, 3 preguntas, gracias). ~35 laboratorios interactivos.

## Estado
- Sin base de datos ni almacenamiento: todo es estático.
- Verificado: las 60 diapositivas y todos sus pasos se renderizan sin errores de JS.
- Sin desplegar: solo existe la vista previa; no hay URL pública.

## Pendiente / ideas
- Revisión visual diapositiva por diapositiva de las 60 (se revisaron las más cargadas).
- Versión móvil: el deck está pensado para proyector 16:9.
- Más morphs y animaciones explicativas (en curso).
