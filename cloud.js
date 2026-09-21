
(() => {
  const SUPABASE_URL = 'https://ycjpkvtjqwvexleauieh.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_XADuckQz9YhCCUh_yHn-mA_GtlzDdq_';
  const CACHE_KEY = 'nl-dansreis-lesson-state-v2';
  const REPERTOIRE_KEY = 'nl-dansreis-repertoire-v1';
  const COUPLE_KEY = 'nl-dansreis-couple-id';
  const LAST_LESSON_KEY = 'nl-dansreis-last-lesson';

  let db = null;
  let authMode = 'login';
  let currentUser = null;
  let currentCoupleId = localStorage.getItem(COUPLE_KEY) || null;
  let currentInviteCode = null;
  let lessonStateCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  let repertoireCache = JSON.parse(localStorage.getItem(REPERTOIRE_KEY) || '[]');
  let userSettings = {last_lesson_code: localStorage.getItem(LAST_LESSON_KEY) || null, welcome_seen:false};
  let realtimeChannel = null;
  let deferredInstallPrompt = null;

  // Migrate legacy mastered flags once.
  try {
    if (typeof completed !== 'undefined') {
      lessons.forEach((l,i) => {
        if (completed[i] && !lessonStateCache[l.code]) lessonStateCache[l.code] = {status:'mastered',favorite:false,note:'',updated_at:new Date().toISOString(),pending:true};
      });
      saveLessonCache();
    }
  } catch(e) { console.warn(e); }

  function saveLessonCache(){ localStorage.setItem(CACHE_KEY, JSON.stringify(lessonStateCache)); syncLegacyCompleted(); }
  function saveRepCache(){ localStorage.setItem(REPERTOIRE_KEY, JSON.stringify(repertoireCache)); }
  function stateForCode(code){ return lessonStateCache[code] || {status:'new',favorite:false,note:'',updated_at:null,pending:false}; }
  function stateForIndex(i){ return stateForCode(lessons[i].code); }
  function syncLegacyCompleted(){
    try {
      completed = {};
      lessons.forEach((l,i)=>{ if(stateForCode(l.code).status==='mastered') completed[i]=true; });
      localStorage.setItem(stateKey, JSON.stringify(completed));
    } catch(e) {}
  }
  function showEl(id, yes){ const el=document.getElementById(id); if(!el) return; el.classList.toggle('hidden-overlay', !yes); }
  function setMsg(id,msg,type=''){ const el=document.getElementById(id); if(!el) return; el.textContent=msg||''; el.className='form-message '+type; }
  function online(){ return navigator.onLine; }

  window.setAuthMode = (mode) => {
    authMode = mode;
    document.getElementById('loginTab').classList.toggle('active', mode==='login');
    document.getElementById('registerTab').classList.toggle('active', mode==='register');
    document.getElementById('authSubmit').textContent = mode==='login' ? 'Inloggen' : 'Account maken';
    document.getElementById('authPassword').autocomplete = mode==='login' ? 'current-password' : 'new-password';
    setMsg('authMessage','');
  };

  window.submitAuth = async (event) => {
    event.preventDefault();
    const email=document.getElementById('authEmail').value.trim();
    const password=document.getElementById('authPassword').value;
    const btn=document.getElementById('authSubmit');
    btn.disabled=true; setMsg('authMessage', authMode==='login'?'Inloggen…':'Account maken…');
    try{
      if(authMode==='login'){
        const {data,error}=await db.auth.signInWithPassword({email,password});
        if(error) throw error;
        await handleSignedIn(data.user);
      } else {
        const redirectTo = location.origin + location.pathname;
        const {data,error}=await db.auth.signUp({email,password,options:{emailRedirectTo:redirectTo}});
        if(error) throw error;
        if(data.session){ await handleSignedIn(data.user); }
        else setMsg('authMessage','Account aangemaakt. Controleer je e-mail om je account te bevestigen en log daarna in.','success');
      }
    }catch(err){ setMsg('authMessage', friendlyError(err), 'error'); }
    finally{ btn.disabled=false; }
  };

  function friendlyError(err){
    const m=(err && err.message)||String(err||'Onbekende fout');
    if(/invalid login/i.test(m)) return 'E-mailadres of wachtwoord klopt niet.';
    if(/already registered/i.test(m)) return 'Voor dit e-mailadres bestaat al een account.';
    return m;
  }

  async function handleSignedIn(user){
    currentUser=user;
    showEl('authScreen',false);
    document.getElementById('appShell').style.display='block';
    await loadMembership();
  }

  async function loadMembership(){
    setMsg('coupleMessage','');
    let membership=null;
    if(online()){
      const {data,error}=await db.from('couple_members').select('couple_id').eq('user_id',currentUser.id).maybeSingle();
      if(!error && data) membership=data;
    }
    if(membership && membership.couple_id){
      currentCoupleId=membership.couple_id; localStorage.setItem(COUPLE_KEY,currentCoupleId);
      showEl('coupleScreen',false);
      await startCloudSession();
    } else if(currentCoupleId && !online()){
      showEl('coupleScreen',false);
      await startCloudSession(true);
    } else {
      showEl('coupleScreen',true);
    }
  }

  window.createDanceCouple = async () => {
    setMsg('coupleMessage','Bezig…');
    const {data,error}=await db.rpc('create_couple');
    if(error){ setMsg('coupleMessage',friendlyError(error),'error'); return; }
    const row=Array.isArray(data)?data[0]:data;
    currentCoupleId=row.couple_id; currentInviteCode=row.invite_code;
    localStorage.setItem(COUPLE_KEY,currentCoupleId);
    document.getElementById('coupleCodeDisplay').textContent=currentInviteCode;
    document.getElementById('coupleCreated').hidden=false;
    setMsg('coupleMessage','Gelukt. Geef deze code aan de ander.','success');
  };

  window.joinDanceCouple = async () => {
    const code=document.getElementById('coupleCodeInput').value.trim().toUpperCase();
    if(!code){ setMsg('coupleMessage','Vul de koppelcode in.','error'); return; }
    setMsg('coupleMessage','Koppelen…');
    const {data,error}=await db.rpc('join_couple',{p_invite_code:code});
    if(error){ setMsg('coupleMessage',friendlyError(error),'error'); return; }
    const row=Array.isArray(data)?data[0]:data;
    currentCoupleId=row.couple_id; currentInviteCode=code;
    localStorage.setItem(COUPLE_KEY,currentCoupleId);
    showEl('coupleScreen',false);
    await startCloudSession();
  };

  window.copyCoupleCode = async () => {
    if(!currentInviteCode) return;
    try{ await navigator.clipboard.writeText(currentInviteCode); setMsg('coupleMessage','Koppelcode gekopieerd.','success'); }
    catch(e){ setMsg('coupleMessage','Code: '+currentInviteCode,'success'); }
  };
  window.finishCoupleOnboarding = async () => { showEl('coupleScreen',false); await startCloudSession(); };

  async function startCloudSession(offlineOnly=false){
    if(!offlineOnly){
      await Promise.all([loadLessonStates(),loadRepertoire(),loadUserSettings(),loadInviteCode()]);
      await flushPendingLessonStates();
      subscribeRealtime();
    }
    renderAllCloudAware();
    if(!userSettings.welcome_seen) showGiftWelcome(true);
  }

  async function loadInviteCode(){
    if(!currentCoupleId) return;
    const {data}=await db.from('couples').select('invite_code').eq('id',currentCoupleId).maybeSingle();
    if(data) currentInviteCode=data.invite_code;
  }

  async function loadLessonStates(){
    const {data,error}=await db.from('lesson_state').select('*').eq('couple_id',currentCoupleId);
    if(error) return;
    for(const row of (data||[])){
      const local=lessonStateCache[row.lesson_code];
      if(local && local.pending && local.updated_at && row.updated_at && local.updated_at>row.updated_at) continue;
      lessonStateCache[row.lesson_code]={status:row.status||'new',favorite:!!row.favorite,note:row.shared_note||'',updated_at:row.updated_at,pending:false};
    }
    saveLessonCache();
  }

  async function flushPendingLessonStates(){
    if(!online()||!currentCoupleId||!currentUser) return;
    for(const [code,s] of Object.entries(lessonStateCache)){
      if(!s.pending) continue;
      const {error}=await db.from('lesson_state').upsert({couple_id:currentCoupleId,lesson_code:code,status:s.status||'new',favorite:!!s.favorite,shared_note:s.note||'',updated_by:currentUser.id},{onConflict:'couple_id,lesson_code'});
      if(!error){ s.pending=false; }
    }
    saveLessonCache();
  }

  async function pushLessonState(code){
    const s=lessonStateCache[code];
    if(!s||!currentCoupleId||!currentUser||!online()) return;
    const {data,error}=await db.from('lesson_state').upsert({couple_id:currentCoupleId,lesson_code:code,status:s.status||'new',favorite:!!s.favorite,shared_note:s.note||'',updated_by:currentUser.id},{onConflict:'couple_id,lesson_code'}).select().maybeSingle();
    if(!error){ s.pending=false; if(data?.updated_at)s.updated_at=data.updated_at; saveLessonCache(); setSyncText('Gesynchroniseerd ✓'); }
    else setSyncText('Lokaal opgeslagen — sync volgt');
  }

  function updateLessonLocal(code,patch){
    lessonStateCache[code]={...stateForCode(code),...patch,updated_at:new Date().toISOString(),pending:true};
    saveLessonCache(); renderAllCloudAware(); pushLessonState(code);
  }

  window.setLessonStatus = (status) => { const l=lessons[current]; updateLessonLocal(l.code,{status}); };
  window.toggleLessonFavorite = () => { const l=lessons[current],s=stateForCode(l.code); updateLessonLocal(l.code,{favorite:!s.favorite}); };
  window.saveLessonNote = () => { const l=lessons[current],v=document.getElementById('lessonNote').value; updateLessonLocal(l.code,{note:v}); setSyncText(online()?'Synchroniseren…':'Lokaal opgeslagen — offline'); };
  function setSyncText(t){ const el=document.getElementById('noteSaveState'); if(el) el.textContent=t; }

  function renderLessonStateControls(){
    const l=lessons[current],s=stateForCode(l.code);
    document.querySelectorAll('#statusSwitch [data-status]').forEach(b=>b.classList.toggle('active',b.dataset.status===s.status));
    const fav=document.getElementById('favoriteBtn'); if(fav){fav.classList.toggle('active',s.favorite);fav.textContent=s.favorite?'♥ Favoriet':'♡ Favoriet';}
    const note=document.getElementById('lessonNote'); if(note && document.activeElement!==note) note.value=s.note||'';
  }

  async function loadUserSettings(){
    const {data,error}=await db.from('user_settings').select('*').eq('user_id',currentUser.id).maybeSingle();
    if(!error && data){ userSettings={...userSettings,...data}; if(data.last_lesson_code)localStorage.setItem(LAST_LESSON_KEY,data.last_lesson_code); }
    else if(!data && !error){ await db.from('user_settings').insert({user_id:currentUser.id,last_lesson_code:userSettings.last_lesson_code,welcome_seen:false}); }
    updateContinueButton();
  }

  async function saveUserSetting(patch){
    userSettings={...userSettings,...patch};
    if(patch.last_lesson_code) localStorage.setItem(LAST_LESSON_KEY,patch.last_lesson_code);
    if(!online()||!currentUser) return;
    await db.from('user_settings').upsert({user_id:currentUser.id,last_lesson_code:userSettings.last_lesson_code||null,welcome_seen:!!userSettings.welcome_seen},{onConflict:'user_id'});
  }

  function updateContinueButton(){
    const btn=document.getElementById('continueBtn'); if(!btn)return;
    if(userSettings.last_lesson_code){ const l=lessons.find(x=>x.code===userSettings.last_lesson_code); if(l) btn.textContent='▶ Ga verder met '+l.code+' · '+l.title; }
  }
  window.continueJourney = () => {
    const code=userSettings.last_lesson_code||localStorage.getItem(LAST_LESSON_KEY);
    const i=code?lessons.findIndex(l=>l.code===code):-1;
    goToLesson(i>=0?i:getNextIncomplete());
  };

  window.showGiftWelcome = (firstTime=false) => { showEl('giftWelcome',true); };
  window.closeGiftWelcome = () => { showEl('giftWelcome',false); };
  window.acceptGiftWelcome = async () => { showEl('giftWelcome',false); if(!userSettings.welcome_seen) await saveUserSetting({welcome_seen:true}); };

  async function loadRepertoire(){
    const {data,error}=await db.from('repertoire_items').select('*').eq('couple_id',currentCoupleId).order('created_at',{ascending:true});
    if(!error){ repertoireCache=data||[]; saveRepCache(); }
  }

  window.addRepertoireItem = async (event) => {
    event.preventDefault();
    const item={id:crypto.randomUUID(),couple_id:currentCoupleId,title:document.getElementById('repTitle').value.trim(),style:document.getElementById('repStyle').value,item_type:document.getElementById('repType').value,notes:document.getElementById('repNotes').value.trim(),created_by:currentUser?.id};
    if(!item.title)return;
    repertoireCache.push(item); saveRepCache(); renderRepertoire(); event.target.reset();
    if(online()){ const {data,error}=await db.from('repertoire_items').insert(item).select().single(); if(!error && data){ repertoireCache=repertoireCache.map(x=>x.id===item.id?data:x);saveRepCache();renderRepertoire(); } }
  };
  window.deleteRepertoireItem = async (id) => {
    repertoireCache=repertoireCache.filter(x=>x.id!==id);saveRepCache();renderRepertoire();
    if(online()) await db.from('repertoire_items').delete().eq('id',id);
  };

  function renderRepertoire(){
    const auto=document.getElementById('autoRepertoire'),manual=document.getElementById('manualRepertoire'); if(!auto||!manual)return;
    const autoItems=lessons.map((l,i)=>({l,s:stateForCode(l.code)})).filter(x=>x.s.status==='mastered'||x.s.favorite);
    auto.innerHTML=autoItems.length?autoItems.map(({l,s})=>`<div class="rep-item"><div><b>${s.favorite?'♥ ':''}${l.code} · ${l.title}</b><div class="rep-meta">${phases.find(p=>p.id===l.phase).name} · ${s.status==='mastered'?'Beheerst':'Favoriet'}</div>${s.note?`<div class="rep-note">${escapeHtml(s.note)}</div>`:''}</div></div>`).join(''):'<p class="small">Nog leeg. Markeer lessen als favoriet of beheerst.</p>';
    manual.innerHTML=repertoireCache.length?repertoireCache.map(x=>`<div class="rep-item"><div><b>${escapeHtml(x.title)}</b><div class="rep-meta">${escapeHtml(x.style||'')} · ${escapeHtml(x.item_type||'')}</div>${x.notes?`<div class="rep-note">${escapeHtml(x.notes)}</div>`:''}</div><button class="rep-delete" onclick="deleteRepertoireItem('${x.id}')" aria-label="Verwijderen">×</button></div>`).join(''):'<p class="small">Nog niets zelf toegevoegd.</p>';
  }
  function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function subscribeRealtime(){
    if(!db||!currentCoupleId)return;
    if(realtimeChannel) db.removeChannel(realtimeChannel);
    realtimeChannel=db.channel('dance-'+currentCoupleId)
      .on('postgres_changes',{event:'*',schema:'public',table:'lesson_state',filter:'couple_id=eq.'+currentCoupleId},payload=>{
        const row=payload.new||payload.old; if(!row?.lesson_code)return;
        if(payload.eventType==='DELETE') delete lessonStateCache[row.lesson_code];
        else lessonStateCache[row.lesson_code]={status:row.status||'new',favorite:!!row.favorite,note:row.shared_note||'',updated_at:row.updated_at,pending:false};
        saveLessonCache(); renderAllCloudAware();
      })
      .on('postgres_changes',{event:'*',schema:'public',table:'repertoire_items',filter:'couple_id=eq.'+currentCoupleId},async()=>{await loadRepertoire();renderRepertoire();})
      .subscribe();
  }

  // --- Override course rendering to use 3 statuses + hearts ---
  renderSidebar = function(){
    const s=document.getElementById('sidebar'); s.innerHTML='';
    phases.forEach(ph=>{
      const h=document.createElement('div');h.className='phase-title';h.textContent=ph.name;s.appendChild(h);
      lessons.forEach((l,i)=>{
        if(l.phase!==ph.id)return; const st=stateForCode(l.code);
        const b=document.createElement('button');
        b.className='lesson-link'+(i===current?' active':'')+(st.status==='mastered'?' done':''); b.onclick=()=>goToLesson(i);
        const dot=st.status==='mastered'?'✓':st.status==='practicing'?'•':'';
        b.innerHTML=`<span class="dot">${dot}</span><span><b>${l.code}</b> ${l.title}</span>${st.favorite?'<span class="heart-mini">♥</span>':''}`;s.appendChild(b);
      });
    });
  };
  renderOverview = function(){
    const o=document.getElementById('phaseOverview');o.innerHTML='';
    phases.forEach(ph=>{const subset=lessons.filter(l=>l.phase===ph.id);const done=subset.filter(l=>stateForCode(l.code).status==='mastered').length;const practicing=subset.filter(l=>stateForCode(l.code).status==='practicing').length;const d=document.createElement('div');d.className='dash-card';d.innerHTML=`<h3>${ph.icon} ${ph.name}</h3><p>${done} beheerst · ${practicing} oefenen · ${subset.length} totaal</p><button class="btn" onclick="jumpPhase(${ph.id})">Open fase</button>`;o.appendChild(d);});
  };
  updateProgress = function(){
    const n=lessons.filter(l=>stateForCode(l.code).status==='mastered').length;
    document.getElementById('progressText').textContent=`${n} / ${lessons.length} beheerst`;
    document.getElementById('progressFill').style.width=(100*n/lessons.length)+'%';renderOverview();renderRepertoire();
  };
  const baseRenderLesson=renderLesson;
  renderLesson=function(){baseRenderLesson();renderLessonStateControls();};

  const baseOpenLesson=openLesson;
  openLesson=function(i,recordHistory=true){
    baseOpenLesson(i,recordHistory);
    if(lessons[i]){ saveUserSetting({last_lesson_code:lessons[i].code}); updateContinueButton(); }
    renderLessonStateControls();
  };
  toggleComplete=function(){ setLessonStatus(stateForCode(lessons[current].code).status==='mastered'?'new':'mastered'); };
  getNextIncomplete=function(){const i=lessons.findIndex(l=>stateForCode(l.code).status!=='mastered');return i<0?0:i;};

  // --- Repertoire navigation & browser Back ---
  function openRepertoire(recordHistory=true){
    document.body.classList.remove('course-mode','social-mode'); document.body.classList.add('repertoire-mode');
    document.getElementById('dashboard').classList.remove('show'); document.getElementById('course').style.display='none';document.getElementById('social').style.display='none';document.getElementById('repertoire').style.display='block';renderRepertoire();window.scrollTo({top:0,behavior:'auto'});if(recordHistory)recordRoute({view:'repertoire'});
  }
  window.showRepertoire=()=>{ if(document.body.classList.contains('repertoire-mode'))return;withGiftTransition(()=>openRepertoire(true),2000); };
  const oldOpenDashboard=openDashboard; openDashboard=function(recordHistory=true){document.body.classList.remove('repertoire-mode');document.getElementById('repertoire').style.display='none';oldOpenDashboard(recordHistory);};
  const oldOpenSocial=openSocial; openSocial=function(recordHistory=true){document.body.classList.remove('repertoire-mode');document.getElementById('repertoire').style.display='none';oldOpenSocial(recordHistory);};
  const oldOpenLesson2=openLesson; openLesson=function(i,recordHistory=true){document.body.classList.remove('repertoire-mode');document.getElementById('repertoire').style.display='none';oldOpenLesson2(i,recordHistory);};
  routeHash=function(state){if(state.view==='lesson')return '#les-'+(state.lesson+1);if(state.view==='social')return '#social';if(state.view==='repertoire')return '#repertoire';if(state.view==='guard')return '#app';return '#home';};
  restoreRoute=function(state){restoringHistory=true;const action=()=>{if(state&&state.view==='lesson'&&Number.isInteger(state.lesson))openLesson(Math.max(0,Math.min(lessons.length-1,state.lesson)),false);else if(state&&state.view==='social')openSocial(false);else if(state&&state.view==='repertoire')openRepertoire(false);else openDashboard(false);restoringHistory=false;};withGiftTransition(action,2000);};

  function renderAllCloudAware(){syncLegacyCompleted();renderSidebar();updateProgress();renderLessonStateControls();renderRepertoire();updateContinueButton();}

  window.logoutDanceApp = async () => {
    if(db) await db.auth.signOut();
    currentUser=null;currentCoupleId=null;localStorage.removeItem(COUPLE_KEY);lessonStateCache={};repertoireCache=[];saveLessonCache();saveRepCache();
    if(realtimeChannel&&db)db.removeChannel(realtimeChannel);realtimeChannel=null;
    document.getElementById('appShell').style.display='none';showEl('giftWelcome',false);showEl('coupleScreen',false);showEl('authScreen',true);setMsg('authMessage','Je bent uitgelogd.','success');
  };

  window.addEventListener('online', async()=>{ await flushPendingLessonStates(); if(currentUser&&currentCoupleId){await loadLessonStates();await loadRepertoire();renderAllCloudAware();} });

  // Installable PWA button.
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;const b=document.getElementById('installPwaBtn');if(b)b.style.display='inline-flex';});
  window.installDancePwa=async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;const b=document.getElementById('installPwaBtn');if(b)b.style.display='none';};
  if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(console.warn));

  async function init(){
    if(!window.supabase){setMsg('authMessage','De loginmodule kon niet worden geladen. Controleer je internetverbinding.','error');return;}
    db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storage:window.localStorage}});
    db.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_OUT'){document.getElementById('appShell').style.display='none';showEl('authScreen',true);}else if(session?.user&&!currentUser){setTimeout(()=>handleSignedIn(session.user),0);}});
    const {data:{session}}=await db.auth.getSession();
    if(session?.user) await handleSignedIn(session.user); else {document.getElementById('appShell').style.display='none';showEl('authScreen',true);}
    renderAllCloudAware();
  }
  init();
})();