(function(){
'use strict';
var KEY='kinora-v2';
function iso(d){return d.toISOString().slice(0,10)}
var TODAY=iso(new Date());
const Images={
 meera:'meera.jpg',
 oats:'oats.jpg',
 arun:'arun.jpg',
 family:'family.jpg',
 fried:'fried.jpg',
 greens:'greens.jpg',
 almonds:'almonds.jpg',
 butter:'butter.jpg',
 yoga1:'yoga1.jpg',
 yoga2:'yoga2.jpg',
 yoga3:'yoga3.jpg',
 ramesh:'ramesh.jpg',
 savitri:'savitri.jpg'
};

/* ---------- icons ---------- */
var IC={
 heart:'<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
 drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 pulse:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
 wind:'<path d="M3 9h10a3 3 0 1 0-3-3M3 14h14a3 3 0 1 1-3 3M3 19h6"/>',
 upload:'<path d="M12 16V4M7 9l5-5 5 5M5 14v5h14v-5"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 ne:'<path d="M7 17L17 7M8 7h9v9"/>',
 up:'<path d="M12 19V5M6 11l6-6 6 6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>'
};
function ic(n,c){return '<svg class="i'+(c?' '+c:'')+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>'}
var LOGO='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 4h5.5v24H5z" fill="#3F6FB0"/><path d="M27 4 14 16.5 27 28h-7.5L9.5 17.5v-3L19.5 4z" fill="#4C84C8"/><path d="M27 12c-3 .2-6 2-7.6 5 3 .3 6-1.4 7.6-5z" fill="#6AA67F"/></svg>';

/* ---------- Language ---------- */
var T={
 en:{care:'Care hub',reports:'Reports',diet:'Diet & yoga',meds:'Medicines',clinic:'Clinic & SOS',
  h_care:'A little care. A better day.',s_care:'A clear view of {n}’s health, and the next small steps.',
  h_reports:'Every report has a story.',s_reports:'Turn medical numbers into something your family understands.',
  h_diet:'Feel better, one habit at a time.',s_diet:'Food, everyday precautions and gentle movement, together.',
  h_meds:'The right care, at the right time.',s_meds:'Understand each tablet. Keep the whole family in the loop.',
  h_clinic:'Prepared for every appointment.',s_clinic:'Your family’s health essentials, ready when they matter most.',
  team:'Care is a team effort.',yourfam:'YOUR FAMILY',add:'Add family member',privacy:'Privacy & consent',
  better:'Better, together.',manage:'Manage your family',
  numbers:'The numbers, in everyday words.',notwell:'Not feeling quite yourself?',notwell2:'Tell us how you feel, in your own words.',
  speak:'Speak a health update',send:'Send',
  disc:'Informational support, not a diagnosis. For medical advice, speak with your clinician.'},
 hi:{care:'केयर हब',reports:'रिपोर्ट',diet:'आहार और योग',meds:'दवाइयाँ',clinic:'क्लिनिक और SOS',
  h_care:'थोड़ी देखभाल, एक बेहतर दिन।',s_care:'{n} की सेहत की साफ़ तस्वीर और अगले छोटे कदम।',
  h_reports:'हर रिपोर्ट की एक कहानी होती है।',s_reports:'मेडिकल आंकड़ों को ऐसी भाषा में समझें जिसे पूरा परिवार समझे।',
  h_diet:'हर दिन एक आदत, बेहतर सेहत।',s_diet:'खाना, रोज़ की सावधानियाँ और हल्की कसरत, साथ में।',
  h_meds:'सही देखभाल, सही समय पर।',s_meds:'हर गोली को समझें। पूरे परिवार को साथ रखें।',
  h_clinic:'हर अपॉइंटमेंट के लिए तैयार।',s_clinic:'आपके परिवार की ज़रूरी स्वास्थ्य जानकारी, जब ज़रूरत हो।',
  team:'देखभाल एक टीम का काम है।',yourfam:'आपका परिवार',add:'सदस्य जोड़ें',privacy:'गोपनीयता और सहमति',
  better:'साथ में बेहतर।',manage:'परिवार संभालें',
  numbers:'आंकड़े, रोज़मर्रा की भाषा में।',notwell:'तबीयत ठीक नहीं लग रही?',notwell2:'अपने शब्दों में बताइए कि आप कैसा महसूस कर रहे हैं।',
  speak:'स्वास्थ्य अपडेट बोलें',send:'भेजें',
  disc:'यह केवल जानकारी है, निदान नहीं। चिकित्सीय सलाह के लिए अपने डॉक्टर से मिलें।'}
};
function t(k,v){var s=(T[S.lang]&&T[S.lang][k])||T.en[k]||k;if(v)for(var x in v)s=s.replace('{'+x+'}',v[x]);return s}

/* ---------- Reference data ---------- */
var DRUGS={
 amlodipine:{name:'Amlodipine 5 mg',what:'Helps lower blood pressure.',time:'Once daily, after breakfast',clock:'08:00',doses:1,know:'Don’t change or stop a dose without medical advice.'},
 metformin:{name:'Metformin 500 mg',what:'Helps control blood sugar in type 2 diabetes.',time:'Twice daily, with meals',clock:'08:30',doses:2,know:'Take with food to reduce stomach upset.'},
 atorvastatin:{name:'Atorvastatin 10 mg',what:'Helps lower cholesterol.',time:'Once daily, at night',clock:'21:00',doses:1,know:'Tell your doctor about unexplained muscle pain.'},
 levothyroxine:{name:'Levothyroxine 50 mcg',what:'Replaces thyroid hormone.',time:'Once daily, early morning on an empty stomach',clock:'06:30',doses:1,know:'Wait about 45 minutes before tea, coffee or food.'},
 salbutamol:{name:'Salbutamol inhaler',what:'Quickly relaxes the airways during wheeze or breathlessness.',time:'As prescribed',clock:'',doses:0,know:'If it doesn’t help or you need it more often, call your doctor.'},
 paracetamol:{name:'Paracetamol 500 mg',what:'Eases pain and brings down fever.',time:'As prescribed, with gaps between doses',clock:'',doses:0,know:'Don’t take other medicines that also contain paracetamol at the same time.'},
 pantoprazole:{name:'Pantoprazole 40 mg',what:'Reduces stomach acid.',time:'Once daily, before breakfast',clock:'07:30',doses:1,know:'Usually taken on an empty stomach, 30 minutes before food.'}
};
var PLANS={
 chol:{label:'Cholesterol-friendly ideas',more:['Oats & whole grains','Unsalted almonds','Leafy greens'],less:['Fried snacks','Butter & ghee']},
 bp:{label:'Low-salt, heart-friendly ideas',more:['Leafy greens','Unsalted almonds','Oats & whole grains'],less:['Fried snacks','Butter & ghee']},
 sugar:{label:'Steady-sugar ideas',more:['Oats & whole grains','Leafy greens','Unsalted almonds'],less:['Fried snacks','Butter & ghee']},
 gen:{label:'Everyday balanced plate',more:['Oats & whole grains','Unsalted almonds','Leafy greens'],less:['Fried snacks','Butter & ghee']}
};
var FOODIMG={'Oats & whole grains':Images.oats,'Unsalted almonds':Images.almonds,'Leafy greens':Images.greens,'Fried snacks':Images.fried,'Butter & ghee':Images.butter};
var YOGA=[
 {t:'Seated mountain',d:'Sit tall. Feet flat. Take 5 slow breaths.',img:Images.yoga1},
 {t:'Supported side bend',d:'Lift one arm. Lean gently. Repeat each side.',img:Images.yoga2},
 {t:'Seated knee extension',d:'Extend one leg slowly, then lower.',img:Images.yoga3}
];

/* ---------- State ---------- */
function seed(){var w={};w['ramesh'+TODAY]=6;return{
 lang:'en',signed:false,family:'Sharma',sel:'ramesh',tab:'care',
 members:[
  {id:'ramesh',name:'Ramesh',rel:'Grandfather',age:72,sex:'Male',img:Images.ramesh,blood:'O+',conds:['Asthma','High blood pressure'],allergies:['Penicillin'],bp:'138/86',hr:76,spo2:96,goal:8,contact:'',
   meds:[{name:'Amlodipine 5 mg',what:'Helps lower blood pressure.',time:'Once daily, after breakfast',clock:'08:00',doses:1,left:3,expiry:'28 Feb 2027'},{name:'Salbutamol inhaler',what:'Quickly relaxes the airways during wheeze or breathlessness.',time:'As prescribed',clock:'',doses:0,left:null,expiry:''}]},
  {id:'savitri',name:'Savitri',rel:'Grandmother',age:68,sex:'Female',img:Images.savitri,blood:'B+',conds:['Thyroid condition'],allergies:[],bp:'126/80',hr:72,spo2:98,goal:8,contact:'',
   meds:[{name:'Levothyroxine 50 mcg',what:'Replaces thyroid hormone.',time:'Once daily, early morning on an empty stomach',clock:'06:30',doses:1,left:20,expiry:'30 Jun 2027'},{name:'Amlodipine 5 mg',what:'Helps lower blood pressure.',time:'Once daily, after breakfast',clock:'08:00',doses:1,left:12,expiry:'31 Mar 2027'}]},
  {id:'arun',name:'Arun',rel:'Father',age:48,sex:'Male',img:Images.arun,blood:'A+',conds:['High cholesterol'],allergies:[],bp:'122/78',hr:70,spo2:98,goal:8,contact:'',
   meds:[{name:'Atorvastatin 10 mg',what:'Helps lower cholesterol.',time:'Once daily, at night',clock:'21:00',doses:1,left:15,expiry:'15 Jan 2027'}]},
  {id:'meera',name:'Meera',rel:'Mother',age:45,sex:'Female',img:Images.meera,blood:'O+',conds:[],allergies:[],bp:'118/76',hr:68,spo2:99,goal:8,contact:'',meds:[]}
 ],
 reports:[
  {id:'r1',member:'ramesh',name:'Vitamin D panel.pdf',date:'2026-11-02',readings:[{label:'Vitamin D',value:18,unit:'ng/mL'}]},
  {id:'r2',member:'ramesh',name:'Vitamin D panel.pdf',date:'2026-11-12',readings:[{label:'Vitamin D',value:26,unit:'ng/mL'}]}
 ],
 water:w,taken:{},refill:{},consent:{},series:'Vitamin D',medIdx:0
}}
var S=load();
function load(){try{var r=localStorage.getItem(KEY);if(r){var o=JSON.parse(r);if(o&&o.members){o.members.forEach(function(m){m.img=imageSrc(m.img,m.id)});return o}}}catch(e){}return seed()}
/* ---------- Backend (Flask API) ---------- */
var BACKEND_ON=false,dbState='off',pushTimer=null,skipPush=false;
var SYNC_KEYS=['family','members','reports','water','taken','refill','consent','series','medIdx'];
function snapshot(){var o={};SYNC_KEYS.forEach(function(k){o[k]=S[k]});return o}
function dbLabel(){
 if(S._demo)return 'Demo mode · saved on this device';
 if(!BACKEND_ON)return 'Saved on this device';
 return {idle:'Connected to server',saving:'Saving…',ok:'Saved to server',error:'Server save failed · kept on this device'}[dbState]||'';
}
function setDb(st){dbState=st;var e=document.getElementById('dbstat');if(e){e.textContent=dbLabel();e.dataset.state=st}}
function api(method,path,body){
 var h={'Content-Type':'application/json'};if(S._token)h.Authorization='Bearer '+S._token;
 return fetch(path,{method:method,headers:h,body:body?JSON.stringify(body):undefined}).then(function(r){
  return r.json().catch(function(){return {}}).then(function(j){
   if(!r.ok){var e=new Error(j.error||('Something went wrong ('+r.status+')'));e.status=r.status;throw e}
   return j;
  });
 });
}
function dbActive(){return BACKEND_ON&&S.signed&&!S._demo&&!!S._token}
function expire(){S._token='';S.signed=false;render();toast('Session expired. Sign in again.')}
function queuePush(){if(!dbActive())return;clearTimeout(pushTimer);setDb('saving');pushTimer=setTimeout(pushNow,800)}
function pushNow(){
 if(!dbActive())return Promise.resolve();
 return api('PUT','/api/state',{state:snapshot()}).then(function(){setDb('ok')}).catch(function(e){if(e.status===401)expire();else setDb('error')});
}
function applyRemote(st){
 if(!st||!st.members)return false;
 SYNC_KEYS.forEach(function(k){if(st[k]!==undefined)S[k]=st[k]});
 S.members.forEach(function(m){m.img=imageSrc(m.img,m.id)});
 return true;
}
function pullNow(done){
 if(!dbActive()){done&&done();return}
 setDb('saving');
 api('GET','/api/state').then(function(r){
  if(r.state&&applyRemote(r.state)){skipPush=true;setDb('ok')}else{pushNow()}
  done&&done();
 }).catch(function(e){if(e.status===401)expire();else{setDb('error');done&&done()}});
}
function checkBackend(cb){
 fetch('/api/health',{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){
  BACKEND_ON=!!(j&&j.ok);dbState=BACKEND_ON?'idle':'off';
 }).catch(function(){BACKEND_ON=false}).then(function(){cb&&cb()});
}
function save(){
 try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
 if(skipPush){skipPush=false;return}
 queuePush();
}
function cur(){return S.members.filter(function(m){return m.id===S.sel})[0]||S.members[0]}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function $(s,r){return (r||document).querySelector(s)}
function toast(msg){var d=document.createElement('div');d.className='toast';d.setAttribute('role','status');d.textContent=msg;document.body.appendChild(d);setTimeout(function(){d.remove()},2800)}
function copy(text,ok){
 function fb(){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast(ok)}catch(e){toast('Select the text and copy it')}ta.remove()}
 try{navigator.clipboard.writeText(text).then(function(){toast(ok)},fb)}catch(e){fb()}
}
function fmtDate(d,o){return new Date(d+(String(d).length===10?'T00:00:00':'')).toLocaleDateString('en-GB',o||{day:'numeric',month:'short',year:'numeric'})}
function dayHead(){var d=new Date();return (d.toLocaleDateString('en-GB',{weekday:'long'})+', '+d.getDate()+' '+d.toLocaleDateString('en-GB',{month:'long'})).toUpperCase()}
function shortDay(off){var d=new Date();d.setDate(d.getDate()+off);return d.toLocaleDateString('en-GB',{weekday:'long'})+', '+d.getDate()+' '+d.toLocaleDateString('en-GB',{month:'short'})}

/* ---------- Health logic ---------- */
function bpParts(m){var p=String(m.bp).split('/');return{s:+p[0],d:+p[1]}}
function story(m){
 var out=[],b=bpParts(m),hrOk=m.hr>=60&&m.hr<=100,o2=m.spo2;
 if(hrOk&&o2>=95)out.push(['ok','Your pulse and oxygen are close to your usual readings.']);
 else{
  out.push(hrOk?['ok','Your pulse is in a usual resting range.']:['warn','Your pulse is outside the usual resting range of 60 to 100. Rest, then check again.']);
  out.push(o2>=95?['ok','Your oxygen level looks healthy.']:o2>=92?['warn','Your oxygen level is a little low. Sit upright, rest and check again.']:['bad','Your oxygen level is low. If you feel breathless, call 112 or your doctor now.']);
 }
 if(b.s>=140||b.d>=90)out.push(['bad','Your blood pressure is high. Rest for 5 minutes, log a rested reading and tell your doctor.']);
 else if(b.s>=130||b.d>=80)out.push(['warn','Your blood pressure is worth watching. Log a rested reading.']);
 else out.push(['ok','Your blood pressure is in a healthy range.']);
 if(m.meds.length)out.push(['ok','Keep taking medicines as prescribed. Share changes with your doctor.']);
 return out;
}
function hasBreath(m){return /asthma|copd|breath|lung/i.test(m.conds.join(' '))}
function planFor(m){var c=m.conds.join(' ').toLowerCase();return /cholest|lipid/.test(c)?PLANS.chol:/pressure|hypert/.test(c)?PLANS.bp:/diabet|sugar/.test(c)?PLANS.sugar:PLANS.gen}
function glasses(m){return S.water[m.id+TODAY]||0}
function reply(text,m){
 var x=text.toLowerCase();
 if(/chest|सीने|unconscious|faint|blue lips|can.?t breathe|cannot breathe|severe breath/.test(x))return{lvl:'bad',msg:'This could be urgent. Call 112 now or go to the nearest emergency room. Do not wait for an app reply.'};
 if(/breath|wheez|cough|सांस|साँस|खांसी/.test(x))return{lvl:'warn',msg:'Sit upright and rest. '+(hasBreath(m)?'Use '+m.name+'’s prescribed inhaler as advised. ':'')+'If it does not ease in 15 minutes or gets worse, call your doctor or 112. Delhi air is poor today, so stay indoors.'};
 if(/dizz|giddy|चक्कर/.test(x))return{lvl:'warn',msg:'Sit or lie down and sip water. Check blood pressure once you are rested. If dizziness continues or comes with weakness, call your doctor.'};
 if(/fever|temperature|बुखार|बुख़ार/.test(x))return{lvl:'warn',msg:'Rest, drink fluids and note the temperature every few hours. Call your doctor if fever lasts more than 2 days, or sooner for older adults.'};
 if(/pain|ache|दर्द/.test(x))return{lvl:'warn',msg:'Note where it hurts and for how long. Rest and tell your doctor if it is severe, new or does not settle.'};
 return{lvl:'ok',msg:'Thanks for telling us. Add it to your next clinic visit questions, and call your doctor if you feel worse.'};
}
function imageSrc(path,id){var value=String(path||''),name=value.split('/').pop().split('?')[0].replace(/\.jpg$/i,'');return Images[id]||Images[name]||path}
function avatar(m){var src=imageSrc(m.img,m.id);return src?'<img class="avatar" src="'+esc(src)+'" alt="">':'<span class="avatar" aria-hidden="true">'+esc(m.name[0])+'</span>'}
function memberChips(m){return S.members.map(function(x){return '<button class="chip" data-act="sel" data-id="'+x.id+'" aria-pressed="'+(x.id===m.id)+'">'+esc(x.name)+'</button>'}).join('')}

/* ---------- Login ---------- */
function codeNote(){
 if(BACKEND_ON)return S._demoCode?'Demo mode: no SMS is sent. Your code is <b>'+esc(S._demoCode)+'</b>.':'We sent you a 6-digit code. It is valid for 5 minutes.';
 return 'Demo version: no message is sent. Use 123456.';
}
function loginView(){
 var step=S._step||'form',mode=S._mode||'phone',form;
 if(step==='form'){
  form='<div class="seg" role="tablist"><button role="tab" aria-selected="'+(mode==='phone')+'" data-act="mode" data-v="phone">Phone number</button><button role="tab" aria-selected="'+(mode==='email')+'" data-act="mode" data-v="email">Email address</button></div>'+
  (mode==='phone'?'<div class="field"><label class="l" for="ph">Phone number</label><div class="phone"><span>+91</span><input id="ph" type="tel" inputmode="numeric" maxlength="10" placeholder="Enter your mobile number" autocomplete="tel-national"></div></div>':
   '<div class="field"><label class="l" for="em">Email address</label><input id="em" type="email" placeholder="you@example.com" autocomplete="email"></div>')+
  '<div class="field"><label class="l" for="fn">Family name</label><input id="fn" type="text" placeholder="e.g. Sharma family"></div><p id="err" class="err" role="alert"></p>'+
  '<button class="btn" data-act="sendcode">Send my sign-in code '+ic('arrow')+'</button><p class="note">No password to remember. We’ll send a one-time code.</p>';
 }else{
  form='<div class="field"><label class="l" for="code">Enter the 6-digit code</label><input id="code" type="text" inputmode="numeric" maxlength="6" placeholder="123456"></div><p class="note" style="text-align:left;margin:0 0 14px">'+codeNote()+'</p><p id="err" class="err" role="alert"></p><button class="btn" data-act="verify">Open my circle of care '+ic('arrow')+'</button><p style="height:12px"></p><button class="btn soft" data-act="back">Back</button><p style="height:18px"></p>';
 }
 return '<div class="login"><section class="lhero"><div class="brand">'+LOGO+'kinora</div><div class="eyebrow">HEALTHCARE, WITH A HUMAN SIDE</div><h1>Every generation.<br>One circle of care.</h1><p class="tag">Less medical confusion. More moments together.</p><img src="'+Images.family+'" alt="Three generations of a family looking at a tablet together on a sofa"><div class="cardw"><h3>A calmer chapter in your family’s health.</h3><p>Reports you understand. Medicines you remember.<br>Little daily habits that make care feel manageable.</p></div><div class="made">MADE FOR FAMILIES. DESIGNED FOR EVERY GENERATION.</div></section>'+
 '<section class="lform"><div class="eyebrow">FAMILY HEALTH, SIMPLIFIED</div><h2>Welcome to your circle of care.</h2><p class="sub">One home for the people who mean everything.</p>'+form+(step==='form'?'<button class="btn soft" data-act="demo">Explore the family demo</button>':'')+'<p class="legal">By continuing, you agree to our Terms & Privacy Policy.<br>Your family decides what to share, and with whom.</p></section></div>';
}

/* ---------- Shell ---------- */
function rail(){
 return '<aside class="rail"><div class="hd"><div class="eyebrow">'+t('yourfam')+'</div><p>'+t('team')+'</p></div><div class="members">'+
 S.members.map(function(m){return '<button class="mem" data-act="sel" data-id="'+m.id+'" aria-pressed="'+(m.id===S.sel)+'">'+avatar(m)+'<span><b>'+esc(m.name)+'</b><span class="s">'+esc(m.rel)+' · '+m.age+'</span></span></button>'}).join('')+
 '</div><button class="addm" data-act="addmem">'+ic('plus')+t('add')+'</button><div class="spacer"></div>'+
 '<div class="together"><b>'+t('better')+'</b><p>'+S.members.length+' people. One safe place for your family’s care.</p><button data-act="privacy">'+t('manage')+ic('arrow')+'</button></div>'+
 '<div class="railfoot"><button data-act="privacy">'+t('privacy')+'</button><small>Demo family • Sample data</small></div></aside>';
}

/* ---------- Care hub ---------- */
function careView(m){
 var g=glasses(m),goal=m.goal,pct=Math.min(100,Math.round(g/goal*100)),b=bpParts(m);
 var st=story(m).map(function(x,i){return '<li class="'+(x[0]==='bad'?'bad':'')+'"><b>'+('0'+(i+1))+'</b><span>'+esc(x[1])+'</span></li>'}).join('');
 var br=m.conds.filter(function(c){return /asthma|copd|lung|breath/i.test(c)})[0];
 var air=br?'With '+br.toLowerCase()+', limit outdoor exertion.<br>Check local air before your next walk.':'Fine for short walks, but take it easy outdoors.<br>Check local air before your next walk.';
 var nextm=S.members.filter(function(x){return x.id==='savitri'})[0]||m;
 var rp=S._reply?'<div class="reply '+S._reply.lvl+'" role="status">'+esc(S._reply.msg)+'</div>':'';
 var box=S._speak?'<div class="r" style="margin-top:14px;flex-wrap:nowrap"><input id="say" type="text" placeholder="e.g. I feel dizzy / मुझे चक्कर आ रहे हैं" aria-label="How do you feel?"><button class="btn" style="border-radius:10px" data-act="say">'+t('send')+'</button></div><p class="small" style="margin-top:8px">The microphone is not available in this preview, so type your update.</p>':'';
 return '<div class="plan"><h3>'+esc(m.name)+'’s care plan</h3><div class="meta"><span>'+m.age+' years</span>'+m.conds.map(function(c){return '<i>/</i><span>'+esc(c)+'</span>'}).join('')+'</div><button class="link" data-act="edit">Edit profile '+ic('ne')+'</button></div>'+
 '<div class="care"><div class="stack">'+
 '<div class="vitals"><div class="vital"><div class="top"><span>Heart rate</span>'+ic('heart')+'</div><div class="num">'+m.hr+'</div><div class="u">bpm</div><div class="n">'+(m.hr>=60&&m.hr<=100?'In your usual range':'Outside the usual range')+'</div></div>'+
 '<div class="vital"><div class="top"><span>Oxygen level</span>'+ic('drop')+'</div><div class="num">'+m.spo2+'</div><div class="u">%</div><div class="n">Last checked at 8:30 AM</div></div>'+
 '<div class="vital"><div class="top"><span>Blood pressure</span>'+ic('pulse')+'</div><div class="num">'+esc(m.bp)+'</div><div class="u">mmHg</div><div class="n">'+(b.s>=130||b.d>=80?'Keep tracking your readings':'Looks healthy')+'</div></div></div>'+
 '<div class="story"><div class="eyebrow">YOUR DAILY HEALTH STORY</div><h2>'+t('numbers')+'</h2><ol>'+st+'</ol></div>'+
 '<div class="speak"><h2>'+t('notwell')+'</h2><p>'+t('notwell2')+'</p><div class="r"><button class="btn" data-act="speak">'+ic('mic')+t('speak')+'</button><span class="langs"><button data-act="setlang" data-v="hi">हिन्दी</button>/<button data-act="setlang" data-v="en">English</button></span></div>'+box+rp+'</div></div>'+
 '<div class="stack"><div class="water"><h3>A little sip goes a long way.</h3><div class="row2"><div><div class="big">'+g+' of '+goal+'</div><div class="cap">glasses today</div></div>'+ic('drop')+'</div><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="'+goal+'" aria-valuenow="'+g+'"><div class="fill" style="width:'+pct+'%"></div></div><div class="acts"><button class="link" data-act="glass">'+ic('plus')+'Log a glass</button>'+(g?'<button class="link" style="color:var(--muted)" data-act="unglass">Undo</button>':'')+'<span>Your saved daily goal</span></div></div>'+
 '<div class="card air"><div class="t"><h3>Delhi air & your breathing</h3>'+ic('wind')+'</div><span class="pill">AQI 160 · Moderate (India)</span><p>'+air+'</p><p class="s">Updated 9:00 AM • Demo reading</p></div>'+
 '<div class="card next"><div class="eyebrow">NEXT FOR YOUR FAMILY</div><h3>11:00 AM · Dr. Verma</h3><p>'+esc(nextm.name)+'’s clinic visit • '+shortDay(1)+'</p><button class="link" data-act="go" data-v="meds">See family reminders '+ic('arrow')+'</button></div></div></div>';
}

/* ---------- Reports ---------- */
function seriesFor(m){
 var map={};
 S.reports.filter(function(r){return r.member===m.id}).sort(function(a,b){return a.date<b.date?-1:1}).forEach(function(r){r.readings.forEach(function(x){(map[x.label]=map[x.label]||[]).push({date:r.date,v:x.value,u:x.unit})})});
 return map;
}
function vdStatus(label,v){if(label.toLowerCase()!=='vitamin d')return null;return v<20?'Low level':v<30?'Below target':'In range'}
function dayDiff(a,b){return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5)}
function reportsView(m){
 var map=seriesFor(m),names=Object.keys(map),sel=map[S.series]?S.series:names[0],pts=sel?map[sel]:[];
 var cmp='<div class="card" style="color:var(--muted)">No readings saved for '+esc(m.name)+' yet. Upload a report to see how a reading changes.</div>';
 if(pts.length){
  var a=pts.length>1?pts[pts.length-2]:null,l=pts[pts.length-1],d=a?l.v-a.v:0,days=a?dayDiff(a.date,l.date):0;
  var sA=a?vdStatus(sel,a.v):null,sL=vdStatus(sel,l.v);
  var meaning=a?(esc(sel)+' is '+(d>0?'higher':d<0?'lower':'the same')+' than '+(days?days+' days ago':'before')+'.'+(sL&&l.v<30?' It may still be below your lab’s target range.':'')):'This is the first reading saved for '+esc(sel)+'. Add another report to see the change.';
  cmp='<div class="cmp">'+(a?'<div class="card"><div class="eyebrow">'+fmtDate(a.date,{day:'2-digit',month:'long'}).toUpperCase()+'</div><div class="big">'+a.v+'</div><div class="un">'+esc(a.u)+' · '+esc(sel)+'</div>'+(sA?'<span class="pill">'+sA+'</span>':'')+'</div>':'')+
  '<div class="card now"><div class="eyebrow">'+fmtDate(l.date,{day:'2-digit',month:'long'}).toUpperCase()+(l.date===TODAY?' · TODAY':'')+'</div><div class="big">'+l.v+'</div><div class="un">'+esc(l.u)+' · '+esc(sel)+'</div>'+(a?'<span class="pill white">'+(d>0?'↑ '+d+' · Improving':d<0?'↓ '+Math.abs(d)+' · Lower':'No change')+'</span>':(sL?'<span class="pill white">'+sL+'</span>':''))+'</div>'+
  '<div class="card mean"><h3>What this means</h3><p style="color:var(--ink);font-size:17px;line-height:1.5">'+meaning+'</p><p class="fine">Keep your follow-up. Your clinician<br>can advise on the next steps.</p></div></div>';
 }
 var vault=S.reports.filter(function(r){return r.member===m.id}).slice().reverse().map(function(r){return '<tr><td class="big">'+esc(r.name)+'<small>Extracted readings checked • Original document saved</small></td><td class="big" style="font-weight:400">'+esc(m.name)+' '+esc(S.family)+'</td><td class="big" style="font-weight:400">'+fmtDate(r.date)+'</td><td><button class="link" data-act="viewrep" data-id="'+r.id+'">View '+ic('ne')+'</button></td></tr>'}).join('');
 var review=S._pending?reviewForm(m):'';
 return '<div class="drop">'+ic('upload','up')+'<h2>From lab language to family language.</h2><p class="sub">Snap a clear photo or upload a PDF. We’ll help explain the key readings.</p><div class="chipsrow"><span class="lab">Save report to</span>'+memberChips(m)+'</div>'+
  '<div class="acts"><label class="btn" for="upl" style="cursor:pointer">Upload lab report</label><input id="upl" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*" hidden><label class="btn soft" for="cam" style="cursor:pointer">Take a photo</label><input id="cam" type="file" accept="image/*" capture="environment" hidden><span class="hint">PDF, JPG or PNG • Up to 10 MB • Review extracted values before saving</span></div><p id="uerr" class="err" role="alert" style="margin:10px 0 0"></p>'+review+'</div>'+
  '<div><h2 class="sech" style="margin-top:12px">Small changes. A clearer picture.</h2><p class="secs">'+(pts.length>1?dayDiff(pts[pts.length-2].date,pts[pts.length-1].date)+'-day comparison':'Latest reading')+' · '+esc(m.name)+' '+esc(S.family)+(sel?' · '+(names.length>1?'<select id="series" style="display:inline;width:auto;height:30px;padding:0 10px;border-radius:8px;font-size:14px" aria-label="Choose a test">'+names.map(function(n){return '<option'+(n===sel?' selected':'')+'>'+esc(n)+'</option>'}).join('')+'</select>':esc(sel)):'')+'</p></div>'+cmp+
  '<div class="card vault"><h3>Your report vault</h3>'+(vault?'<div class="scroll"><table class="tbl"><thead><tr><th>REPORT</th><th>MEMBER</th><th>UPLOADED</th><th></th></tr></thead><tbody>'+vault+'</tbody></table></div>':'<p class="muted">Nothing saved for '+esc(m.name)+' yet.</p>')+'</div>';
}
function reviewForm(m){var p=S._pending;
 return '<div class="review"><b style="color:var(--ink)">'+esc(p.name)+'</b> <span class="small muted">('+p.kb+' KB)</span><p class="small muted" style="margin:6px 0 14px">Type the key reading from the report so it can be tracked. Automatic reading of scanned files is not part of this version.</p>'+
 '<div class="g3"><div class="field"><label class="l" for="rl">Test name</label><input id="rl" type="text" value="'+esc(p.guess)+'" placeholder="e.g. Vitamin D"></div><div class="field"><label class="l" for="rv">Value</label><input id="rv" type="number" step="any" placeholder="e.g. 26"></div><div class="field"><label class="l" for="ru">Unit</label><input id="ru" type="text" value="'+(/vitamin d/i.test(p.guess)?'ng/mL':'')+'" placeholder="e.g. ng/mL"></div></div>'+
 '<div class="field" style="max-width:240px"><label class="l" for="rd">Report date</label><input id="rd" type="text" value="'+TODAY+'" placeholder="YYYY-MM-DD"></div><div class="row"><button class="btn" data-act="savereport">Save report to '+esc(m.name)+'</button><button class="btn soft" data-act="cancelrep">Cancel</button></div></div>'}

/* ---------- Diet & yoga ---------- */
function dietView(m){
 var p=planFor(m);
 var tiles=p.more.map(function(x){return foodCard(x,'more')}).concat(p.less.map(function(x){return foodCard(x,'less')})).join('');
 var thy=S.members.filter(function(x){return x.meds.some(function(d){return /levothyroxine/i.test(d.name)})})[0];
 return '<div><h2 class="sech">Your everyday plate</h2><p class="secs">'+esc(p.label)+' • Choose a family profile for their plan</p></div><div class="chipsrow">'+memberChips(m)+'</div><div class="foods">'+tiles+'</div>'+
 (thy?'<div class="guard"><h3>A small pause can protect your routine.</h3><p class="k">Kitchen & medicine guard · '+esc(thy.name)+'’s saved thyroid prescription</p><p>Wait 45 minutes after '+(thy.sex==='Female'?'her':'their')+' morning tablet before tea. Confirm milk/calcium spacing with '+(thy.sex==='Female'?'her':'their')+' pharmacist.</p></div>':'')+
 '<div><h2 class="sech">Gentle movement, at your pace.</h2></div><div class="yogas">'+YOGA.map(function(y,i){return '<div class="yoga"><img src="'+y.img+'" alt="'+y.t+'"><h3><span>0'+(i+1)+'</span>'+y.t+'</h3><p>'+y.d+'</p></div>'}).join('')+'</div><p class="small muted">Move gently; stop if you feel pain or dizziness. Check with your clinician before starting a new routine.</p>';
}
function foodCard(n,k){var im=FOODIMG[n];return '<div class="food">'+(im?'<img src="'+im+'" alt="'+esc(n)+'">':'<div class="ph '+k+'">'+esc(n)+'</div>')+'<div class="tag '+k+'">'+(k==='more'?'More often':'Less often')+'</div><b>'+esc(n)+'</b></div>'}

/* ---------- Medicines ---------- */
function clock12(c){var p=c.split(':'),h=+p[0],ap=h>=12?'PM':'AM';h=h%12||12;return h+':'+p[1]+' '+ap}
function medsView(m){
 var idx=Math.min(S.medIdx||0,Math.max(0,m.meds.length-1)),md=m.meds[idx],found=S._drug,q=S._drugq,shown=null,note='';
 if(q!=null){
  if(found){shown={d:found,saved:false};note='Medicine information • Check the pack name with your pharmacist'}
  else note='No match for “'+esc(q)+'”. Check the spelling on the pack, or ask your pharmacist.'
 }else if(md){shown={d:md,saved:true};note='From '+esc(m.name)+'’s saved prescription • Check the pack name with your pharmacist'}
 var drug='';
 if(shown){var d=shown.d;
  drug='<div class="card drug"><h2>'+esc(d.name)+'</h2><p class="by">'+note+'</p>'+(shown.saved&&m.meds.length>1?'<div class="medchips">'+m.meds.map(function(x,i){return '<button class="chip" data-act="medpick" data-i="'+i+'" aria-pressed="'+(i===idx)+'">'+esc(x.name)+'</button>'}).join('')+'</div>':'')+
  '<div class="three"><div class="box"><div class="eyebrow">WHAT IT DOES</div><p>'+esc(d.what)+'</p></div><div class="box"><div class="eyebrow">'+(shown.saved?'YOUR SAVED TIMING':'USUAL TIMING')+'</div><p>'+esc(d.time)+'.</p></div><div class="box g"><div class="eyebrow">GOOD TO KNOW</div><p>'+esc(d.know||'Don’t change or stop a dose without medical advice.')+'</p></div></div>'+
  (shown.saved?'':'<button class="btn" style="margin-top:18px" data-act="savedrug">Save to '+esc(m.name)+'’s medicines</button>')+'</div>';
 }else if(q!=null){drug='<div class="card"><p style="color:var(--ink)">'+note+' Try amlodipine, metformin, atorvastatin, levothyroxine, salbutamol, paracetamol or pantoprazole.</p></div>'}
 else drug='<div class="card"><p class="muted">No medicines saved for '+esc(m.name)+'. Search a tablet name above to add one.</p></div>';

 var rhythm=[];S.members.forEach(function(x){x.meds.forEach(function(d,i){if(d.clock)rhythm.push({m:x,d:d,i:i})})});
 rhythm.sort(function(a,b){return a.d.clock<b.d.clock?-1:1});
 var rh=rhythm.map(function(r){var k=TODAY+'|'+r.m.id+'|'+r.i,done=S.taken[k];
  return '<div class="dose'+(done?' done':'')+'"><b>'+clock12(r.d.clock)+' · '+esc(r.m.name)+'’s '+esc(r.d.name.replace(/ \d.*$/,''))+(/amlodipine/i.test(r.d.name)?' BP tablet':'')+'</b><p>'+esc(r.d.name)+' • Saved prescription</p><div class="a"><button class="btn green sm" data-act="take" data-k="'+k+'" data-mid="'+r.m.id+'" data-i="'+r.i+'" aria-pressed="'+!!done+'" style="height:36px;border-radius:8px">'+(done?'Taken ✓':'Mark as taken')+'</button><span>'+(done?'Marked as taken':'Not marked yet')+'</span></div></div>'}).join('')||'<p class="muted">No timed medicines yet.</p>';

 var refillCard='';
 if(md&&md.left!=null){
  var per=md.doses||1,days=Math.floor(md.left/per),low=md.left<=5,filled=Math.min(10,md.left),key=m.id+'|'+idx,pl='';
  for(var i=0;i<10;i++)pl+='<span class="'+(i<filled?'on':'')+'"></span>';
  refillCard='<div class="card refill"><h2>A refill before you run out.</h2><p class="sub">'+esc(m.name)+' • '+esc(md.name)+'</p><div class="pills" aria-hidden="true">'+pl+'</div><div class="low'+(low?'':' ok')+'"><b>'+(low?'Only '+md.left+' tablets left':md.left+' tablets left')+'</b><p>About '+days+' day'+(days===1?'':'s')+' at the saved daily schedule.</p></div>'+(md.expiry?'<p class="exp">Pack expiry: '+esc(md.expiry)+'</p>':'<p class="exp"></p>')+'<button class="link" data-act="refill" data-k="'+key+'">'+(S.refill[key]?'Refill reminder sent ✓':'Plan a refill '+ic('arrow'))+'</button></div>';
 }else refillCard='<div class="card refill"><h2>A refill before you run out.</h2><p class="sub">'+esc(m.name)+(md?' • '+esc(md.name):'')+'</p><p class="muted">'+(md?'No tablet count is saved for this medicine. Check the dose counter or pack and refill before it runs out.':'Save a medicine to track how many tablets are left.')+'</p></div>';

 return '<div class="search">'+ic('search')+'<input id="dq" type="text" placeholder="Search a tablet name, e.g. Amlodipine 5 mg" value="'+esc(q||'')+'" aria-label="Search a tablet name"><button class="link" data-act="drugsearch">Search '+ic('arrow')+'</button></div>'+
 '<div class="chipsrow">'+memberChips(m)+'</div>'+drug+
 '<div class="two"><div class="card rhythm"><h2>Your family’s daily rhythm</h2><p class="sub">Shared reminders • '+new Date().toLocaleDateString('en-GB',{weekday:'long'})+', '+new Date().getDate()+' '+new Date().toLocaleDateString('en-GB',{month:'short'})+'</p>'+rh+
 '<div class="visit"><div class="eyebrow">UPCOMING VISIT</div><h3>Dr. Verma · '+shortDay(1).split(',')[0]+', 11:00 AM</h3><p>Savitri’s follow-up • '+shortDay(1).split(', ')[1]+'<br>Family reminder: Meera & Arun</p></div></div>'+refillCard+'</div>';
}

/* ---------- Clinic & SOS ---------- */
function summaryText(m){return ['KINORA CLINIC SUMMARY','Name: '+m.name+' '+S.family,'Age/Sex: '+m.age+' years, '+m.sex,'Prepared: '+fmtDate(TODAY),'Blood pressure: '+m.bp+' mmHg | Heart rate: '+m.hr+' bpm | Oxygen: '+m.spo2+'%','Conditions: '+(m.conds.join(', ')||'None recorded'),'Known allergy: '+(m.allergies.join(', ')||'None recorded'),'Active medicines: '+(m.meds.map(function(x){return x.name+' ('+x.time+')'}).join('; ')||'None recorded'),'Informational support, not a diagnosis.'].join('\n')}
function contactFor(m){var o=S.members.filter(function(x){return x.id!==m.id&&x.age>=18});var pref=S.members.filter(function(x){return x.id==='meera'&&x.id!==m.id})[0];return pref||o[0]||null}
function clinicView(m){
 var map=seriesFor(m),prog=Object.keys(map).map(function(k){var a=map[k],f=a[0],l=a[a.length-1];return a.length>1?k+': '+f.v+' → '+l.v+' '+l.u+' over '+dayDiff(f.date,l.date)+' days.':k+': '+l.v+' '+l.u+'.'}).join('<br>');
 var c=contactFor(m),num=c&&c.contact;
 var on=!!S.consent[m.id];
 var meds=m.meds.map(function(x){return esc(x.name)+' · '+esc(x.time.replace(/^Once daily, /,'Once daily, '))}).join('<br>')||'None recorded';
 var call=c?(num?'<a class="btn green call" href="tel:'+esc(num.replace(/[^+\d]/g,''))+'">'+ic('phone')+'Call '+esc(c.name)+' · Family contact</a><p class="fine" style="margin-top:10px">'+esc(c.name)+': '+esc(num)+'</p>':'<button class="btn green call" data-act="edit">'+ic('phone')+'Add '+esc(c.name)+'’s number</button>'):'';
 return '<div class="chipsrow">'+memberChips(m)+'</div><div class="clinic"><div class="card sum"><div class="k">KINORA / CLINIC SUMMARY</div><h2>'+esc(m.name)+' '+esc(S.family)+'</h2><p class="meta">'+m.age+' years · '+esc(m.sex)+' · Prepared '+fmtDate(TODAY)+'</p>'+
 '<div class="eyebrow gl">AT A GLANCE</div><div class="three"><div class="box"><small>Blood pressure</small><b>'+esc(m.bp)+' mmHg</b></div><div class="box"><small>Heart rate</small><b>'+m.hr+' bpm</b></div><div class="box"><small>Oxygen level</small><b>'+m.spo2+'%</b></div></div>'+
 '<h3 class="sec">Health history</h3><p class="lines">'+(esc(m.conds.join(' · '))||'None recorded')+(m.allergies.length?'<br>Known allergy: '+esc(m.allergies.join(', ')):'')+'</p>'+
 '<h3 class="sec">Active medicines</h3><p class="lines">'+meds+'</p>'+
 '<h3 class="sec">Recent progress & questions</h3><p class="lines">'+(prog?prog+'<br>Ask about target range and ongoing supplementation.':'No reports saved yet.')+'</p>'+
 '<div class="acts"><button class="btn" data-act="copysum">Copy summary</button><button class="btn soft" data-act="shareconsent">Share with consent</button></div>'+(on?'<p class="small" style="margin-top:12px;color:var(--sage-ink)">Consent is on for '+esc(m.name)+'. Copy the summary and paste it into your message to the clinic.</p>':'<p class="small muted" style="margin-top:12px">Sharing stays off until you allow it under Privacy & consent.</p>')+'</div>'+
 '<div class="sos"><div class="hd"><small>EMERGENCY MEDICAL ID</small><h2>The essentials. Instantly.</h2></div><div class="bd"><h2>'+esc(m.name)+' '+esc(S.family)+'</h2><p class="m">'+m.age+' years · Emergency profile</p>'+
 '<div class="bg"><div><span class="a">BLOOD GROUP</span><small class="b">Confirm before transfusion</small></div><div class="v">'+esc(m.blood||'?')+'</div></div>'+
 '<div class="lab">CONDITIONS</div><div class="val">'+(esc(m.conds.join(' · '))||'None recorded')+'</div>'+
 '<div class="lab r">ALLERGY — IMPORTANT</div><div class="val r">'+(esc(m.allergies.join(', '))||'None recorded')+'</div>'+
 '<div class="lab">CURRENT MEDICINES</div><div class="val n">'+(esc(m.meds.map(function(x){return x.name.replace(/ \d.*$/,'')}).join(' · '))||'None recorded')+'</div>'+call+
 '<p class="urg">Urgent medical help in India? Call <a href="tel:112" style="font-weight:600">112</a>.</p><p class="fine">Demo ID • Contact details must be verified.</p></div></div></div>';
}

/* ---------- App ---------- */
function appView(){
 var m=cur(),tabs=['care','reports','diet','meds','clinic'];
 var body={care:careView,reports:reportsView,diet:dietView,meds:medsView,clinic:clinicView}[S.tab](m);
 return '<header class="top"><div class="brand">'+LOGO+'kinora</div><nav class="tabs" aria-label="Sections">'+tabs.map(function(k){return '<button data-act="go" data-v="'+k+'"'+(S.tab===k?' aria-current="page"':'')+'>'+t(k)+'</button>'}).join('')+'</nav><div class="tools"><span id="dbstat" data-state="'+dbState+'" style="font-size:12.5px;color:var(--muted);white-space:nowrap">'+dbLabel()+'</span><button class="langchip" data-act="lang" aria-label="Switch language">'+(S.lang==='en'?'EN / हिन्दी':'हिन्दी / EN')+'</button><button class="famname" data-act="signout" title="Sign out">'+esc(S.family)+' family</button></div></header>'+
 '<div class="app">'+rail()+'<main><div class="pagehead"><div class="eyebrow">'+dayHead()+'</div><h1>'+t('h_'+S.tab)+'</h1><p>'+t('s_'+S.tab,{n:m.name})+'</p></div><div class="content">'+body+'</div><p class="foot">'+(S.tab==='diet'?'':t('disc'))+'</p></main></div>';
}

function render(){
 var a=$('#app'),f=document.activeElement&&document.activeElement.id,val=f?document.activeElement.value:null;
 a.innerHTML=S.signed?appView():loginView();
 if(f){var e=document.getElementById(f);if(e&&val!=null&&e.tagName==='INPUT'&&e.type!=='file'){e.value=val;e.focus()}}
 save();
}
function modal(html){$('#layer').innerHTML='<div class="overlay" data-act="closemodal"><div class="modal" role="dialog" aria-modal="true">'+html+'</div></div>'}
function closeModal(){$('#layer').innerHTML=''}
function editModal(){var m=cur(),c=contactFor(m);
 modal('<h2>Edit profile</h2><p class="muted small" style="margin-bottom:16px">Update '+esc(m.name)+'’s details and latest readings.</p><div class="g3" style="grid-template-columns:1fr 1fr"><div class="field"><label class="l" for="e_age">Age</label><input id="e_age" type="number" value="'+m.age+'"></div><div class="field"><label class="l" for="e_blood">Blood group</label><input id="e_blood" type="text" value="'+esc(m.blood||'')+'"></div></div><div class="field"><label class="l" for="e_conds">Conditions (comma separated)</label><input id="e_conds" type="text" value="'+esc(m.conds.join(', '))+'"></div><div class="field"><label class="l" for="e_all">Allergies (comma separated)</label><input id="e_all" type="text" value="'+esc(m.allergies.join(', '))+'"></div><div class="g3"><div class="field"><label class="l" for="e_bp">Blood pressure</label><input id="e_bp" type="text" value="'+esc(m.bp)+'" placeholder="120/80"></div><div class="field"><label class="l" for="e_hr">Heart rate</label><input id="e_hr" type="number" value="'+m.hr+'"></div><div class="field"><label class="l" for="e_o2">Oxygen %</label><input id="e_o2" type="number" value="'+m.spo2+'"></div></div>'+(c?'<div class="field"><label class="l" for="e_ph">Phone number for '+esc(c.name)+' (family contact)</label><input id="e_ph" type="tel" value="'+esc(c.contact||'')+'" placeholder="+91 98XXXXXXXX"></div>':'')+'<p id="merr" class="err" role="alert"></p><div class="row"><button class="btn" data-act="saveedit">Save</button><button class="btn soft" data-act="closemodal">Cancel</button></div>');
}
function addModal(){modal('<h2>Add family member</h2><div class="field" style="margin-top:16px"><label class="l" for="a_name">Name</label><input id="a_name" type="text"></div><div class="g3" style="grid-template-columns:1fr 1fr"><div class="field"><label class="l" for="a_rel">Relation</label><input id="a_rel" type="text" placeholder="e.g. Son"></div><div class="field"><label class="l" for="a_age">Age</label><input id="a_age" type="number"></div></div><div class="field"><label class="l" for="a_sex">Sex</label><select id="a_sex"><option>Female</option><option>Male</option><option>Other</option></select></div><div class="field"><label class="l" for="a_conds">Conditions (optional, comma separated)</label><input id="a_conds" type="text"></div><p id="merr" class="err" role="alert"></p><div class="row"><button class="btn" data-act="saveadd">Add</button><button class="btn soft" data-act="closemodal">Cancel</button></div>')}
function privacyModal(){modal('<h2>Privacy & consent</h2><p class="muted small" style="margin-bottom:18px">Your family decides what to share, and with whom. Sharing a clinic summary stays off until you allow it for that person.</p>'+S.members.map(function(m){return '<label class="sw"><input type="checkbox" data-act="consent" data-id="'+m.id+'"'+(S.consent[m.id]?' checked':'')+'> Allow sharing '+esc(m.name)+'’s clinic summary</label>'}).join('')+'<p class="small muted">Data stays in this browser. Nothing is uploaded.</p><div class="row" style="margin-top:18px"><button class="btn soft" data-act="resetdemo">Reset demo data</button><button class="btn" data-act="closemodal">Done</button></div>')}
function viewRepModal(id){var r=S.reports.filter(function(x){return x.id===id})[0];if(!r)return;
 modal('<h2>'+esc(r.name)+'</h2><p class="muted small" style="margin-bottom:16px">Saved '+fmtDate(r.date)+'</p>'+r.readings.map(function(x){return '<div class="box" style="margin-bottom:10px"><div class="eyebrow">'+esc(x.label)+'</div><p style="font-size:24px;font-weight:600;color:var(--ink)">'+x.value+' <span class="small muted">'+esc(x.unit)+'</span></p></div>'}).join('')+'<p class="small muted">Only the readings are kept here. Keep the original file safe on your phone or in your records.</p><div class="row" style="margin-top:16px"><button class="btn soft" data-act="delrep" data-id="'+r.id+'">Remove report</button><button class="btn" data-act="closemodal">Close</button></div>');
}

/* ---------- Events ---------- */
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-act]');if(!el)return;var a=el.dataset.act,m=cur();
 if(a==='closemodal'){if(el.classList.contains('overlay')&&e.target!==el)return;closeModal();return}
 if(a==='mode'){S._mode=el.dataset.v;render()}
 else if(a==='sendcode'){
  var fn=$('#fn').value.trim().replace(/\s*family\s*$/i,''),err=$('#err');
  if(!fn){err.textContent='Enter your family name.';return}
  if((S._mode||'phone')==='phone'){if(!/^[6-9]\d{9}$/.test($('#ph').value.trim())){err.textContent='Enter a 10-digit Indian mobile number.';return}}
  else if(!/^\S+@\S+\.\S+$/.test($('#em').value.trim())){err.textContent='Enter a valid email address.';return}
  var contact=(S._mode||'phone')==='phone'?'+91'+$('#ph').value.trim():$('#em').value.trim().toLowerCase();
  if(BACKEND_ON){
   el.disabled=true;
   api('POST','/api/auth/send-code',{contact:contact,family:fn}).then(function(r){
    S.family=fn;S._contact=contact;S._demoCode=r.demo_code||'';S._step='code';render();var c=$('#code');if(c)c.focus();
   }).catch(function(e){el.disabled=false;var x=$('#err');if(x)x.textContent=e.message});
   return;
  }
  S.family=fn;S._step='code';render();var c=$('#code');if(c)c.focus()}
 else if(a==='verify'){
  var code=$('#code').value.trim();
  if(BACKEND_ON){
   el.disabled=true;
   api('POST','/api/auth/verify',{contact:S._contact,family:S.family,code:code}).then(function(r){
    S._token=r.token;S.family=r.family||S.family;S.signed=true;S._demo=false;S._step='form';S._demoCode='';
    var had=r.state&&applyRemote(r.state);skipPush=!!had;render();if(!had)pushNow();
   }).catch(function(e){el.disabled=false;var x=$('#err');if(x)x.textContent=e.message});
   return;
  }
  if(code!=='123456'){$('#err').textContent='That code does not match. Use 123456 in this demo.';return}
  S.signed=true;S._demo=false;S._step='form';render()}
 else if(a==='back'){S._step='form';render()}
 else if(a==='demo'){S.signed=true;S._demo=true;S.family='Sharma';render()}
 else if(a==='signout'){if(S._token&&BACKEND_ON)api('POST','/api/auth/logout').catch(function(){});S._token='';S.signed=false;render()}
 else if(a==='lang'){S.lang=S.lang==='en'?'hi':'en';document.documentElement.lang=S.lang;render()}
 else if(a==='setlang'){S.lang=el.dataset.v;document.documentElement.lang=S.lang;render()}
 else if(a==='go'){S.tab=el.dataset.v;location.hash=S.tab;render();window.scrollTo(0,0)}
 else if(a==='sel'){S.sel=el.dataset.id;S._reply=null;S._pending=null;S.medIdx=0;S._drug=null;S._drugq=null;render()}
 else if(a==='glass'){S.water[m.id+TODAY]=glasses(m)+1;render()}
 else if(a==='unglass'){S.water[m.id+TODAY]=Math.max(0,glasses(m)-1);render()}
 else if(a==='speak'){S._speak=!S._speak;render();var s=$('#say');if(s)s.focus()}
 else if(a==='say'){var v=$('#say').value.trim();if(!v){toast('Type how you feel first');return}S._reply=reply(v,m);render()}
 else if(a==='edit'){closeModal();editModal()}
 else if(a==='addmem')addModal();
 else if(a==='privacy')privacyModal();
 else if(a==='saveedit'){
  var bp=$('#e_bp').value.trim(),age=+$('#e_age').value,hr=+$('#e_hr').value,o2=+$('#e_o2').value;
  if(!/^\d{2,3}\/\d{2,3}$/.test(bp)||!age||!hr||!o2||o2>100){$('#merr').textContent='Check the numbers. Blood pressure looks like 120/80 and oxygen is 1 to 100.';return}
  m.age=age;m.blood=$('#e_blood').value.trim();m.bp=bp;m.hr=hr;m.spo2=o2;
  m.conds=$('#e_conds').value.split(',').map(function(s){return s.trim()}).filter(Boolean);
  m.allergies=$('#e_all').value.split(',').map(function(s){return s.trim()}).filter(Boolean);
  var ph=$('#e_ph'),c=contactFor(m);if(ph&&c)c.contact=ph.value.trim();
  closeModal();render();toast('Profile saved')}
 else if(a==='saveadd'){
  var n=$('#a_name').value.trim(),ag=+$('#a_age').value;
  if(!n||!ag){$('#merr').textContent='Enter a name and age.';return}
  var id=n.toLowerCase().replace(/[^a-z0-9]/g,'')+Date.now()%1000;
  S.members.push({id:id,name:n,rel:$('#a_rel').value.trim()||'Family',age:ag,sex:$('#a_sex').value,img:'',blood:'',conds:$('#a_conds').value.split(',').map(function(s){return s.trim()}).filter(Boolean),allergies:[],bp:'120/80',hr:72,spo2:98,goal:8,contact:'',meds:[]});
  S.sel=id;closeModal();render();toast(n+' added to your circle')}
 else if(a==='resetdemo'){var keep=S.signed,l=S.lang;S=seed();S.signed=keep;S.lang=l;closeModal();render();toast('Demo data reset')}
 else if(a==='viewrep')viewRepModal(el.dataset.id);
 else if(a==='delrep'){S.reports=S.reports.filter(function(r){return r.id!==el.dataset.id});closeModal();render()}
 else if(a==='cancelrep'){S._pending=null;render()}
 else if(a==='savereport'){
  var lab=$('#rl').value.trim(),val=parseFloat($('#rv').value),un=$('#ru').value.trim(),d=$('#rd').value.trim();
  if(!lab||isNaN(val)||!/^\d{4}-\d{2}-\d{2}$/.test(d)){toast('Enter test name, value and a date like '+TODAY);return}
  S.reports.push({id:'r'+Date.now(),member:m.id,name:S._pending.name,date:d,readings:[{label:lab,value:val,unit:un}]});S.series=lab;S._pending=null;render();toast('Report saved to '+m.name)}
 else if(a==='drugsearch'){var q=$('#dq').value.trim().toLowerCase();S._drug=null;S._drugq=q||null;Object.keys(DRUGS).forEach(function(k){if(q&&q.indexOf(k)>-1)S._drug=DRUGS[k]});render()}
 else if(a==='savedrug'){var d=S._drug;m.meds.push({name:d.name,what:d.what,time:d.time,clock:d.clock,doses:d.doses,left:30,expiry:''});S.medIdx=m.meds.length-1;S._drug=null;S._drugq=null;render();toast('Saved to '+m.name+'’s medicines')}
 else if(a==='medpick'){S.medIdx=+el.dataset.i;render()}
 else if(a==='refill'){S.refill[el.dataset.k]=true;render();toast('Refill reminder sent to Meera and Arun (demo)')}
 else if(a==='take'){var k=el.dataset.k,mm=S.members.filter(function(x){return x.id===el.dataset.mid})[0],md=mm.meds[+el.dataset.i];
  if(S.taken[k]){delete S.taken[k];if(md.left!=null)md.left++}else{S.taken[k]=true;if(md.left!=null)md.left=Math.max(0,md.left-1)}render()}
 else if(a==='copysum')copy(summaryText(m),'Summary copied');
 else if(a==='shareconsent'){if(!S.consent[m.id]){privacyModal();toast('Allow sharing first')}else copy(summaryText(m),'Summary copied. Paste it into your message.')}
});
document.addEventListener('change',function(e){
 var t_=e.target;
 if(t_.id==='series'){S.series=t_.value;render()}
 if(t_.dataset&&t_.dataset.act==='consent'){S.consent[t_.dataset.id]=t_.checked;save()}
 if(t_.id==='upl'||t_.id==='cam'){
  var f=t_.files&&t_.files[0];if(!f)return;var er=$('#uerr');
  if(!/\.(pdf|jpe?g|png)$/i.test(f.name)&&!/^image\//.test(f.type)){er.textContent='Use a PDF, JPG or PNG file.';return}
  if(f.size>10*1024*1024){er.textContent='That file is over 10 MB. Try a smaller photo or PDF.';return}
  var guess=/vit.*d/i.test(f.name)?'Vitamin D':/hb|haemo|hemo/i.test(f.name)?'Haemoglobin':/sugar|glucose|hba1c/i.test(f.name)?'Blood sugar':/chol|lipid/i.test(f.name)?'Cholesterol':'';
  S._pending={name:f.name,kb:Math.max(1,Math.round(f.size/1024)),guess:guess};render()
 }
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape')closeModal();
 if(e.key==='Enter'&&e.target.id==='say'){e.preventDefault();var b=$('[data-act="say"]');if(b)b.click()}
 if(e.key==='Enter'&&e.target.id==='dq'){e.preventDefault();var c=$('[data-act="drugsearch"]');if(c)c.click()}
});
window.addEventListener('hashchange',function(){var h=location.hash.slice(1);if(S.signed&&['care','reports','diet','meds','clinic'].indexOf(h)>-1&&h!==S.tab){S.tab=h;render()}});
(function(){var h=location.hash.slice(1);if(['care','reports','diet','meds','clinic'].indexOf(h)>-1)S.tab=h})();
document.documentElement.lang=S.lang;
render();
checkBackend(function(){render();if(dbActive())pullNow(render)});
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'&&dbActive())pullNow(render)});
})();
