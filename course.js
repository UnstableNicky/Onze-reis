const phases = [
  {id:0,name:"Fase 0 — Oriëntatie",count:3,icon:"✦"},
  {id:1,name:"Fase 1 — Foundation Reset",count:5,icon:"❀"},
  {id:2,name:"Fase 2 — Urban Kiz Core",count:5,icon:"↗"},
  {id:3,name:"Fase 3 — Douceur I",count:4,icon:"♡"},
  {id:4,name:"Fase 4 — Konpa I",count:5,icon:"♫"},
  {id:5,name:"Fase 5 — Urban Kiz Technical I",count:6,icon:"⚙"}
];

const L = (phase, code, title, tags, sourceLabel, sourceUrl, youtube, prep, practice, mastery) =>
 ({phase,code,title,tags,sourceLabel,sourceUrl,youtube,prep,practice,mastery});

const lessons = [
L(0,"0.1","Stijlen herkennen",["oriëntatie","samen"],"Kiz.Dance — stijlgids","https://kiz.dance/tpost/axy59zk651-kizomba-styles-know-the-difference",null,
`<p>Bekijk voorbeelden van Kizomba, Urban Kiz, Douceur, Tarraxo en Konpa. Schrijf per stijl drie kenmerken op: <b>frame/hold</b>, <b>bewegingslogica</b> en <b>muzikale feel</b>.</p>`,
`<ol><li>Kies drie nummers/stijlen.</li><li>Dans per stijl 2–3 minuten met simpele bewegingen.</li><li>Benoem na afloop wat lichamelijk anders voelde.</li></ol>`,
`Je kunt zonder titel in grote lijnen herkennen wat je ziet én uitleggen waarom.`),

L(0,"0.2","Urban Kiz begrijpen",["Urban Kiz","analyse"],"The Kiz Lab — History of Urban Kiz","https://www.thekizlab.com/history-of-urban-kiz",null,
`<p>Let op lineaire verplaatsing, position changes, stops, spins, syncopaties en ritmische variaties. Maak onderscheid tussen <i>figuur</i> en <i>technisch principe</i>.</p>`,
`<ol><li>Dans één nummer alleen met basic + direction changes.</li><li>Voeg daarna stops toe.</li><li>Voeg pas daarna één rotatie toe.</li></ol>`,
`De stijl voelt anders zonder dat je afhankelijk bent van ingewikkelde figuren.`),

L(0,"0.3","Douceur versus Konpa",["Douceur","Konpa","vergelijking"],"Douceur demo — Martin & Juliet","https://www.youtube.com/watch?v=YtIIenD7YkU","YtIIenD7YkU",
`<p>Analyseer vooral <b>grootte van beweging</b>, <b>connection</b>, <b>body isolation</b>, <b>pauzes</b> en groove. Vergelijk daarna met Konpa-video's uit fase 4.</p>`,
`<p>Dans twee korte nummers: één keer met Douceur-intentie (klein, zacht, ruimte), één keer met Konpa-intentie (groove, sway, continu ritme).</p>`,
`Jullie voelen dat het twee verschillende bewegingssystemen zijn, niet alleen andere muziek.`),

L(1,"1.1","Axis, balans & weight transfer",["foundation","solo + partner"],"Albir Rojas — Star Balance (gratis preview)","https://kiz.dance/freetrainingpreview1",null,
`<p>Bestudeer volledige gewichtsverplaatsing: voor/achter/zij. Controleer of je neutrale as behouden blijft en of je nooit “half” op twee voeten blijft hangen.</p>`,
`<ol><li>3×1 minuut solo.</li><li>Daarna Linda leiden zonder figuren.</li><li>Random richting, random timing.</li></ol>`,
`8 willekeurige weight changes achter elkaar zonder trekwerk, gokwerk of herstelstap.`),

L(1,"1.2","Houding, frame & startpositie",["foundation","frame"],"Jojo & Jenny — Position (gratis preview)","https://online.letsplaykizombaschool.com/courses/beginner-lpk-course",null,
`<p>Controleer as, borstkas, schouders, armen en hoeveel spanning werkelijk nodig is. Let op verschil tussen open en close position.</p>`,
`<p>Wissel elke 20–30 seconden tussen open en dichterbij zonder de kwaliteit van de lead te veranderen. Linda hoeft de volgende positie niet te kennen.</p>`,
`Je frame blijft stabiel maar niet stijf; Linda voelt richting zonder dat je met de armen duwt.`),

L(1,"1.3","Lead & Follow zonder ruis",["foundation","lead/follow"],"Paula & Ricardo — Leading & Following","https://paularicardoalc.com/kizomba-leading-following/",null,
`<p>Bestudeer hoe informatie door gewicht, torso en timing wordt gegeven. Focus op zo weinig mogelijk “handsturing”.</p>`,
`<p>Linda kent de oefening niet. Leid wandelen, stoppen, zijwaarts en draaien in willekeurige volgorde. Zij volgt alleen wat ze voelt.</p>`,
`Linda kan de richting en timing correct volgen zonder vooraf afgesproken patroon.`),

L(1,"1.4","Saída en openen/sluiten",["foundation","vocabulary"],"Jojo & Jenny — Open Saida (gratis preview)","https://online.letsplaykizombaschool.com/courses/beginner-lpk-course",null,
`<p>Ontleed de saída in entry → gewicht → positie → exit. Kijk vooral naar de damesmechanica, niet alleen jouw eigen stappen.</p>`,
`<p>Verwerk de saída in vrij dansen. Niet aankondigen. Gebruik minimaal drie verschillende momenten/entries.</p>`,
`Linda volgt de saída zonder dat de beweging vooraf zichtbaar of aangekondigd wordt.`),

L(1,"1.5","Pivots, balans & counterbalance",["foundation","technical"],"Ronie Saleh — samplemateriaal","https://roniesaleh.com/",null,
`<p>Bekijk materiaal rond pivots, counterbalance en side tap. Noteer waar de rotatie-as zit en wanneer het gewicht volledig staat.</p>`,
`<ol><li>Solo pivots links/rechts.</li><li>Partner: kleine rotaties.</li><li>Alleen daarna counterbalance toevoegen.</li></ol>`,
`Rotatie blijft gecontroleerd en Linda hoeft haar balans niet achteraf te herstellen.`),

L(2,"2.1","Diagonal Step",["Urban Kiz","intermediate"],"Jojo & Jenny — Diagonal Step preview","https://online.letsplaykizombaschool.com/courses/intermediate-lpk-course",null,
`<p>Leer zowel leader- als followerpad. Let op directionele intentie en frame, niet alleen voetplaatsing.</p>`,
`<p>Leid de stap zonder vooraf uitleg. Bouw daarna variaties in entry en exit.</p>`,
`Linda volgt de diagonale richting zonder dat je haar met de armen verplaatst.`),

L(2,"2.2","Around the World",["Urban Kiz","rotatie"],"Jojo & Jenny — Around the World preview","https://online.letsplaykizombaschool.com/courses/intermediate-lpk-course",null,
`<p>Ontleed de rotatie. Vraag jezelf bij iedere tel: waar staat Linda's gewicht en waar is haar as?</p>`,
`<p>Eerst langzaam, daarna op muziek. Varieer de snelheid pas wanneer de rotatie technisch stabiel is.</p>`,
`De rotatie blijft compact, gecontroleerd en eindigt zonder correctiestap.`),

L(2,"2.3","Position changes",["Urban Kiz","intermediate"],"Said DStreet — gratis Urban Kiz-les","https://kiz.dance/saidfreeclosed",null,
`<p>Focus op overgangen tussen face-to-face, perpendicular en shadow-achtige posities. Kijk naar de route van de follower.</p>`,
`<p>Dans 10 minuten waarin je bewust van positie wisselt, maar maximaal één technische figuur gebruikt.</p>`,
`Positiewissels voelen als één doorlopende beweging en niet als losse manoeuvres.`),

L(2,"2.4","Footwork & taps",["Urban Kiz","solo"],"Kiz.Dance — gratis workout","https://kiz.dance/freeclass_workout_form",null,
`<p>Train taps, precisie en voetenwerk solo. Hou torso en timing rustig terwijl de voeten actiever worden.</p>`,
`<p>Neem één footwork-element mee in partnerdans zonder de connection te verstoren.</p>`,
`Je kunt het footwork op tempo uitvoeren én terugkeren naar basic zonder timingverlies.`),

L(2,"2.5","Urban-Kiz Lab",["Urban Kiz","integratie"],"Geen nieuwe video — integratieles","#",null,
`<p>Gebruik alleen wat je al hebt: basic, diagonal, rotation, position change en tap. Doel is combineren.</p>`,
`<p>20–30 minuten vrij dansen. Maak steeds nieuwe overgangen. Geen vaste choreografie langer dan 8 tellen.</p>`,
`Je kunt minstens vijf verschillende reeksen improviseren zonder vooraf te plannen.`),

L(3,"3.1","Douceur: wat gebeurt er?",["Douceur","analyse"],"Martin & Juliet — Douceur","https://www.youtube.com/watch?v=YtIIenD7YkU","YtIIenD7YkU",
`<p>Kijk naar grootte van de passen, connection, rust, isolations en hoe weinig beweging soms nodig is.</p>`,
`<p>Dans één langzaam nummer met als enige doelen: gewicht, ademruimte, pauze, klein antwoord. Geen figuren najagen.</p>`,
`Jullie kunnen 2–3 minuten interessant blijven dansen zonder grote vocabulary nodig te hebben.`),

L(3,"3.2","Connection Energy",["Douceur","connection"],"Mode Zéro / Douceur referentie","https://hipsy.nl/event/198570-uncover-connection-expression-day",null,
`<p>Bestudeer het idee van softness, responsiveness en energy in close position. Bepaal drie intensiteitsniveaus van jouw lead.</p>`,
`<p>Leid dezelfde gewichtsactie zacht, middel en duidelijk. Linda benoemt pas achteraf welke intensiteit ze voelde.</p>`,
`Linda voelt verschil in intentie zonder dat de beweging groter hoeft te worden.`),

L(3,"3.3","Micro-movement & isolations",["Douceur","body control"],"S-Dance — Douceur referentie","https://www.sdances.com/douceur",null,
`<p>Let op micro-isolations, chest/upper-body en de relatie met Tarraxinha/Tarraxo-achtige body control.</p>`,
`<p>Linda experimenteert met kleine isolations terwijl jij een rustige basisconnection bewaakt. Daarna wisselen: jij verandert timing, zij behoudt body control.</p>`,
`Isolation blijft klein, gecontroleerd en breekt de connection niet.`),

L(3,"3.4","Pause, flow & niets hoeven doen",["Douceur","musicality"],"The Kiz Lab — Douceur Experience","https://www.thekizlab.com/the-douceur-experience",null,
`<p>Bestudeer flow, subtle movement en ruimte. Technische opdracht voor jou: niet automatisch een nieuwe figuur starten zodra er “niets” gebeurt.</p>`,
`<p>Dans één volledig langzaam nummer met maximaal een paar grote position changes. Laat stiltes en micro-bewegingen bestaan.</p>`,
`De dans blijft verbonden en muzikaal zonder dat je bewegingen stapelt uit verveling.`),

L(4,"4.1","Konpa basic & mechanica",["Konpa","foundation"],"KOTR — Konpa basics","https://www.youtube.com/watch?v=uiwEr9Cht8g","uiwEr9Cht8g",
`<p>Bestudeer basic weight changes en de kenmerkende body/hip groove. Voorkom dat je automatisch een Kizomba-basic gaat dansen.</p>`,
`<p>Eerst 5 minuten solo, daarna samen. Houd de vocabulary minimaal.</p>`,
`De Konpa-groove blijft aanwezig zonder dat jullie bewust tellen of corrigeren.`),

L(4,"4.2","Figure 8 & body groove",["Konpa","solo + partner"],"KOTR — Konpa University","https://wikotr.com/kotr-university/",null,
`<p>Analyseer figure-eight heupmechanica en waar de beweging werkelijk ontstaat. Hou knieën en gewicht actief, bovenlichaam ontspannen.</p>`,
`<p>Solo figure 8 → basic → partner. Wissel iedere minuut zonder te stoppen.</p>`,
`De figure 8 ontstaat uit gewicht en lichaam, niet uit geforceerd heupzwaaien.`),

L(4,"4.3","Partnerhold & connection",["Konpa","partner"],"KOTR — How to hold a partner","https://www.youtube.com/watch?v=ESwPCWUM6eY","ESwPCWUM6eY",
`<p>Vergelijk Konpa hold bewust met Kizomba close embrace en Urban-Kiz frame.</p>`,
`<p>Oefen alleen hold + basic + eenvoudige richting. Geen complexiteit toevoegen voordat de groove blijft staan.</p>`,
`Jullie kunnen van Kizomba/Urban Kiz naar Konpa-hold schakelen zonder dat het frame “meeverhuist”.`),

L(4,"4.4","Konpa footwork",["Konpa","footwork"],"KOTR — Free Konpa Footwork Lesson","https://www.youtube.com/watch?v=3VGJZqwHAh0","3VGJZqwHAh0",
`<p>Leer het footwork eerst solo. Let op groove boven precisie: de voeten mogen actief worden zonder dat het karakter verdwijnt.</p>`,
`<p>Gebruik één footworkpattern in partnerdans, daarna vrij improviseren.</p>`,
`Je kunt het footwork toevoegen zonder ritme of partnergevoel kwijt te raken.`),

L(4,"4.5","Intro Gouyad",["Konpa","Gouyad"],"KOTR — Haitian Konpa Gouyad Session","https://www.youtube.com/watch?v=2zr63lxfPVA","2zr63lxfPVA",
`<p>Bestudeer partnerpositie, benen, ruimte en circulaire/figure-eight heupactie. Techniek vóór sensualiteit.</p>`,
`<p>Eerst heel klein en traag. Pas vergroten wanneer ritme en ruimte tussen de benen betrouwbaar zijn.</p>`,
`De beweging blijft comfortabel, ritmisch en wederzijds zonder botsende knieën of geforceerde heupactie.`),

L(5,"5.1","Tempo begrijpen",["Urban Kiz","musicality"],"Laurent Yìshù — musicality previews","https://onlinekizombaschool.com/fr-formation-musicalite-par-laurent-yishu",null,
`<p>Bekijk de gratis preview rond tempo. Analyseer hoe timing verandert zonder dat de basisconnection instort.</p>`,
`<p>Dans 8 tellen normaal, 8 langzamer, 8 normaal. Daarna random.</p>`,
`Linda voelt tempoverandering door jouw beweging en timing, niet door plotselinge armspanning.`),

L(5,"5.2","Slow motion",["Urban Kiz","technical"],"Laurent Yìshù — slow motion preview","https://onlinekizombaschool.com/fr-formation-musicalite-par-laurent-yishu",null,
`<p>Bestudeer gecontroleerd vertragen. Let op continuïteit van gewicht en directionele intentie.</p>`,
`<p>Oefen dezelfde movement normaal → half tempo → extreem langzaam → normaal.</p>`,
`Slow motion blijft vloeiend; Linda wordt niet “tegengehouden” maar volgt de vertraagde energie.`),

L(5,"5.3","Stops & accents",["Urban Kiz","musicality"],"Laurent Yìshù — accents preview","https://onlinekizombaschool.com/fr-formation-musicalite-par-laurent-yishu",null,
`<p>Maak verschil tussen accent, stop en hervatting. Denk muzikaal: waarom stop je hier?</p>`,
`<p>Normaal → accent → stop → hervatten, allemaal random. Linda kent de timing niet.</p>`,
`Stops zijn schoon en comfortabel; hervatten voelt niet als een nieuwe start maar als vervolg van dezelfde dans.`),

L(5,"5.4","Azzedine Technical I",["Urban Kiz","technical step"],"Azzedine & Andrea — Tutorial I","https://www.youtube.com/watch?v=t_DlKiL-Bw0","t_DlKiL-Bw0",
`<p>Ontleed de tutorial in <b>entry → technische kern → follower weight transfer → lead → exit</b>. Leer dus niet alleen de combinatie.</p>`,
`<p>Leer de basisvorm. Maak daarna minstens twee andere entries en één andere exit.</p>`,
`Je kunt hetzelfde technische element vanuit meerdere contexten leiden.`),

L(5,"5.5","Azzedine Technical II",["Urban Kiz","technical step"],"Azzedine & Andrea — Tutorial II","https://www.youtube.com/watch?v=riYCpqFs3L4","riYCpqFs3L4",
`<p>Zelfde methode: mechanica eerst, volgorde daarna. Let extra op syncopatie en ritmische variatie.</p>`,
`<p>Voer langzaam uit, daarna op muziek. Voeg pas snelheid toe als Linda niet hoeft te voorspellen.</p>`,
`Het element werkt op verschillende tempo's en Linda kan het volgen zonder voorkennis.`),

L(5,"5.6","Phrasing & vrije technische dans",["Urban Kiz","integratie","musicality"],"Laurent Yìshù — phrasing preview","https://onlinekizombaschool.com/fr-formation-musicalite-par-laurent-yishu",null,
`<p>Bestudeer phrasing. Kies bewegingen op basis van de muziek in plaats van: “welke nieuwe move kan ik kwijt?”</p>`,
`<p>Dans 2 volledige nummers. Regel: technical steps alleen gebruiken wanneer je een muzikale reden kunt aanwijzen.</p>`,
`Je kunt na de dans uitleggen waarom je een technical, stop of slow motion op dat muzikale moment koos.`)
];

let current = 0;
const stateKey = "nl-dansreis-v1";
let completed = JSON.parse(localStorage.getItem(stateKey) || "{}");

function esc(s){return s}
function renderSidebar(){
  const s = document.getElementById("sidebar"); s.innerHTML="";
  phases.forEach(ph=>{
    const h=document.createElement("div"); h.className="phase-title"; h.textContent=ph.name; s.appendChild(h);
    lessons.forEach((l,i)=>{
      if(l.phase!==ph.id) return;
      const b=document.createElement("button");
      b.className="lesson-link"+(i===current?" active":"")+(completed[i]?" done":"");
      b.onclick=()=>goToLesson(i);
      b.innerHTML=`<span class="dot">${completed[i]?"✓":""}</span><span><b>${l.code}</b> ${l.title}</span>`;
      s.appendChild(b);
    });
  });
}
function renderOverview(){
  const o=document.getElementById("phaseOverview"); o.innerHTML="";
  phases.forEach(ph=>{
    const done=lessons.filter((l,i)=>l.phase===ph.id && completed[i]).length;
    const total=lessons.filter(l=>l.phase===ph.id).length;
    const d=document.createElement("div"); d.className="dash-card";
    d.innerHTML=`<h3>${ph.icon} ${ph.name}</h3><p>${done} / ${total} beheerst</p><button class="btn" onclick="jumpPhase(${ph.id})">Open fase</button>`;
    o.appendChild(d);
  });
}
function updateProgress(){
  const n=lessons.filter((_,i)=>completed[i]).length;
  document.getElementById("progressText").textContent=`${n} / ${lessons.length} lessen`;
  document.getElementById("progressFill").style.width=(100*n/lessons.length)+"%";
  renderOverview();
}

const musicSets = {
  foundation: {
    slow:{name:"Langzaam — Kizomba basics",url:"https://open.spotify.com/search/kizomba%20slow"},
    normal:{name:"Normaal — Kizomba foundation",url:"https://open.spotify.com/playlist/1JzNg96xboBG1YVJp3YFee"},
    challenge:{name:"Uitdagend — Kizomba / Semba",url:"https://open.spotify.com/search/kizomba%20semba"}
  },
  urban: {
    slow:{name:"Langzaam — Urban Kiz",url:"https://open.spotify.com/search/urban%20kiz%20slow"},
    normal:{name:"Normaal — Urban Kiz technical & social",url:"https://open.spotify.com/playlist/3joGyTOgsGmJVAp8EKhGkZ"},
    challenge:{name:"Uitdagend — Urban Kiz / Tarraxo",url:"https://open.spotify.com/search/urban%20kiz%20tarraxo"}
  },
  douceur: {
    slow:{name:"Langzaam — Douceur / Microkiz",url:"https://open.spotify.com/search/douceur%20kizomba%20slow"},
    normal:{name:"Normaal — Douceur / Microkiz",url:"https://open.spotify.com/playlist/0Pt4aIqbq6lyvBu2ul13PR"},
    challenge:{name:"Uitdagend — Douceur / Tarraxo",url:"https://open.spotify.com/search/douceur%20tarraxo"}
  },
  konpa: {
    slow:{name:"Langzaam — Konpa",url:"https://open.spotify.com/search/konpa%20slow"},
    normal:{name:"Normaal — Konpa modern & Gouyad",url:"https://open.spotify.com/playlist/2KTRw8o3SVANOsnFsPSN8g"},
    challenge:{name:"Uitdagend — Konpa Gouyad",url:"https://open.spotify.com/search/konpa%20gouyad"}
  }
};

function musicForLesson(l){
  if(l.phase===1) return musicSets.foundation;
  if(l.phase===2 || l.phase===5) return musicSets.urban;
  if(l.phase===3) return musicSets.douceur;
  if(l.phase===4) return musicSets.konpa;
  if(l.code==="0.3") return null;
  return null;
}
function renderLessonMusic(l){
  const holder=document.getElementById("musicCard");
  const set=musicForLesson(l);
  if(!set){ holder.innerHTML=""; return; }
  const choices=[set.slow,set.normal,set.challenge];
  holder.innerHTML=`<section class="spotify-practice">
    <h3>♫ Oefenmuziek voor deze les</h3>
    <div class="small">Begin langzaam om de mechanica schoon te houden, ga daarna naar normaal. “Uitdagend” is pas zinvol als de beweging vanzelf gaat.</div>
    <div class="music-buttons">${choices.map((m,i)=>`<a class="spotify-btn" href="${m.url}" target="_blank" rel="noopener">${i===0?'◌':i===1?'●':'◆'} ${m.name} ↗</a>`).join("")}</div>
  </section>`;
}

function renderLesson(){
  const l=lessons[current];
  document.getElementById("lessonPhase").textContent=phases.find(p=>p.id===l.phase).name+" · Les "+l.code;
  document.getElementById("lessonTitle").textContent=l.title;
  document.getElementById("lessonTags").innerHTML=l.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  document.getElementById("prep").innerHTML=l.prep;
  document.getElementById("practice").innerHTML=l.practice;
  document.getElementById("masteryText").innerHTML=l.mastery;
  renderLessonMusic(l);
  const media=document.getElementById("media");
  media.innerHTML=l.youtube?`<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${l.youtube}" title="${l.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`:"";
  const sc=document.getElementById("sourceCard");
  if(l.sourceUrl==="#"){
    sc.innerHTML=`<div><b>${l.sourceLabel}</b><div class="small">Deze les gebruikt alleen eerder geleerde stof.</div></div>`;
  } else {
    sc.innerHTML=`<div><b>${l.sourceLabel}</b><div class="small">Bron / gratis lesmateriaal</div></div><a class="btn" href="${l.sourceUrl}" target="_blank" rel="noopener">Open bron ↗</a>`;
  }
  const btn=document.getElementById("completeBtn");
  btn.className="complete"+(completed[current]?" done":"");
  btn.textContent=completed[current]?"✓ Beheerst — klik om terug te zetten":"Markeer als beheerst";
  document.getElementById("prevBtn").disabled=current===0;
  document.getElementById("nextBtn").disabled=current===lessons.length-1;
  renderSidebar(); updateProgress();
}
let transitionBusy = false;
let initialSplashDone = false;
let tocOpen = false;

function dismissSplash(){
  setSplash(false);
  initialSplashDone = true;
}
function setToc(open){
  tocOpen = !!open;
  const course = document.getElementById("course");
  const button = document.getElementById("tocToggle");
  if(course) course.classList.toggle("toc-collapsed", !tocOpen);
  if(button){
    button.setAttribute("aria-expanded", tocOpen ? "true" : "false");
    button.textContent = tocOpen ? "✕ Inhoudsopgave" : "☰ Inhoudsopgave";
  }
}
function toggleToc(){
  setToc(!tocOpen);
}

function setSplash(visible){
  const splash=document.getElementById("giftSplash");
  if(visible){
    const vv=window.visualViewport;
    splash.style.width=(vv ? vv.width : window.innerWidth)+"px";
    splash.style.height=(vv ? vv.height : window.innerHeight)+"px";
    splash.style.left=(vv ? vv.offsetLeft : 0)+"px";
    splash.style.top=(vv ? vv.offsetTop : 0)+"px";
    splash.classList.remove("hidden");
  } else {
    splash.classList.add("hidden");
  }
}
function withGiftTransition(action, duration=2000){
  if(transitionBusy) return;
  transitionBusy=true;
  setSplash(true);
  // Wissel de inhoud vroeg terwijl de cadeau-afbeelding ervoor staat.
  setTimeout(()=>{ try{ action(); }catch(e){ console.error(e); } },180);
  setTimeout(()=>{ setSplash(false); transitionBusy=false; },duration);
}
function openLesson(i, recordHistory=true){
  current=i;
  document.body.classList.remove("social-mode");
  document.body.classList.add("course-mode");
  document.getElementById("dashboard").classList.remove("show");
  document.getElementById("social").style.display="none";
  document.getElementById("course").style.display="grid";
  setToc(false);
  renderLesson();
  window.scrollTo({top:0,behavior:"auto"});
  if(recordHistory) recordRoute({view:"lesson", lesson:i});
}
function openDashboard(recordHistory=true){
  document.body.classList.remove("course-mode","social-mode");
  document.getElementById("course").style.display="none";
  document.getElementById("social").style.display="none";
  document.getElementById("dashboard").classList.add("show");
  updateProgress();
  window.scrollTo({top:0,behavior:"auto"});
  if(recordHistory) recordRoute({view:"home"});
}
function openSocial(recordHistory=true){
  document.body.classList.remove("course-mode");
  document.body.classList.add("social-mode");
  document.getElementById("dashboard").classList.remove("show");
  document.getElementById("course").style.display="none";
  document.getElementById("social").style.display="block";
  window.scrollTo({top:0,behavior:"auto"});
  if(recordHistory) recordRoute({view:"social"});
}

let restoringHistory = false;
let historyInitialized = false;

function routeHash(state){
  if(state.view==="lesson") return "#les-"+(state.lesson+1);
  if(state.view==="social") return "#social";
  if(state.view==="guard") return "#app";
  return "#home";
}

function recordRoute(state){
  if(restoringHistory || !historyInitialized) return;
  const existing = history.state;
  if(existing && existing.danceApp && existing.view===state.view &&
     (state.view!=="lesson" || existing.lesson===state.lesson)) return;
  try{
    history.pushState({danceApp:true, ...state}, "", routeHash(state));
  }catch(e){
    // Fallback for restrictive local-file browsers.
    location.hash = routeHash(state);
  }
}

function restoreRoute(state){
  restoringHistory = true;
  const action = ()=>{
    if(state && state.view==="lesson" && Number.isInteger(state.lesson)){
      openLesson(Math.max(0,Math.min(lessons.length-1,state.lesson)), false);
    }else if(state && state.view==="social"){
      openSocial(false);
    }else{
      openDashboard(false);
    }
    restoringHistory = false;
  };
  withGiftTransition(action, 2000);
}

function initializeAppHistory(){
  try{
    // Keep one internal guard entry behind Home so Android Back does not
    // immediately terminate the standalone/file-based app.
    history.replaceState({danceApp:true,view:"guard"}, "", "#app");
    history.pushState({danceApp:true,view:"home"}, "", "#home");
    historyInitialized = true;
  }catch(e){
    historyInitialized = true;
  }
}

window.addEventListener("popstate", (event)=>{
  const state = event.state;
  if(state && state.danceApp){
    if(state.view==="guard"){
      // Stay inside the app at its home page rather than closing.
      openDashboard(false);
      try{ history.pushState({danceApp:true,view:"home"}, "", "#home"); }catch(e){}
      return;
    }
    restoreRoute(state);
  }
});

function goToLesson(i){
  if(i===current && document.body.classList.contains("course-mode")) return;
  withGiftTransition(()=>openLesson(i),2000);
}
function showDashboard(){
  const alreadyHome=!document.body.classList.contains("course-mode") && !document.body.classList.contains("social-mode");
  if(alreadyHome){ openDashboard(); return; }
  withGiftTransition(openDashboard,2000);
}
function showSocial(){
  if(document.body.classList.contains("social-mode")) return;
  withGiftTransition(openSocial,2000);
}
function toggleComplete(){
  completed[current]=!completed[current];
  localStorage.setItem(stateKey,JSON.stringify(completed));
  renderLesson();
}
function prevLesson(){ if(current>0) goToLesson(current-1) }
function nextLesson(){ if(current<lessons.length-1) goToLesson(current+1) }
function jumpPhase(p){ const i=lessons.findIndex(l=>l.phase===p); if(i>=0) goToLesson(i) }
function getNextIncomplete(){ const i=lessons.findIndex((_,idx)=>!completed[idx]); return i<0?0:i }

renderOverview();
updateProgress();
openDashboard(false);
initializeAppHistory();
// Bij iedere nieuwe opening van het HTML-bestand staat het cadeau 5 seconden vol in beeld.
setSplash(true);
setTimeout(()=>{ setSplash(false); initialSplashDone=true; },5000);