/* ================= DATA ================= */
const C = {yellow:'#FFD57A',purple:'#8A7BB5',blue:'#9EC4EA',red:'#C47F7F',violet:'#B98AC9',green:'#9BBB6F',grey:'#8F8F8F',rose:'#D99AAF',olive:'#A9AE8C'};
const EMO = [ ['Бодрость',C.yellow],['Сонливость',C.purple],['Одиночество',C.blue],['Злость',C.red],['Общительность',C.violet],['Спокойствие',C.green],['Усталость',C.grey] ];

const BASE = {open:1,arc:0,brow:0,browOp:0,mouth:.5,mouthO:0,blush:.35,tilt:0,sparkle:0,zzz:0,tear:0,anger:0,sick:0,hurt:0,sweat:0,love:0,heart:'#E0C0AC'};
const P = {
  normal:{open:1,mouth:.6},
  bodr:{open:0,arc:1,mouth:1,blush:.85,sparkle:1},
  sleep:{open:0,arc:-.7,mouth:.15,mouthO:.5,zzz:1,tilt:-9,blush:.45},
  calmSleep:{open:0,arc:-.75,mouth:.55,zzz:.7,tilt:-5,blush:.55},
  calm:{open:.42,mouth:.6,blush:.55},
  normik:{open:.55,mouth:.25,sweat:.5,blush:.4,brow:-.3,browOp:.4},
  lonely:{open:1.12,brow:-1,browOp:.85,mouth:-.35,tear:1},
  angry:{open:.55,brow:1,browOp:1,mouth:-.7,anger:1,blush:.65},
  tired:{open:.3,brow:-.6,browOp:.7,mouth:-.3,mouthO:.3,sweat:1,tilt:6},
  vyaly:{open:.22,brow:-.8,browOp:.8,mouth:-.45,sweat:.6,zzz:.35,tilt:9},
  hurt:{open:.85,brow:-1,browOp:1,mouth:-.6,hurt:1,tear:.45},
  sick:{open:.35,brow:-.8,browOp:.8,mouth:-.5,sick:1,blush:1,sweat:.5,tilt:5},
  social:{open:0,arc:1,mouth:1,mouthO:.8,love:1,blush:1,tilt:-5},
  stress:{open:1.15,brow:-.5,browOp:.8,mouth:-.5,mouthO:.45,sweat:1},
};
function pose(name,color){return Object.assign({},BASE,P[name],{heart:color||BASE.heart})}

const G = (m,f)=> state.gender==='f'?f:m;

/* daily questions */
function QUESTIONS(){ return [
 {type:'slider', title:G('Сколько ты спал?','Сколько ты спала?'), qs:'Сон', opts:[
   {l:'Меньше 4 часов',short:'< 4 ч',p:'vyaly',mood:'Вялый',c:C.grey, cat:{sleep:2}},
   {l:'5–7 часов',short:'5–7 ч',p:'sleep',mood:'Спящий',c:C.purple, cat:{sleep:2}},
   {l:'8–9 часов',short:'8–9 ч',p:'bodr',mood:'Бодрый',c:C.yellow, cat:{sport:1,checkup:1}},
   {l:'Больше 10 часов',short:'10+ ч',p:'calmSleep',mood:'Спокойный',c:C.green, cat:{sport:1,checkup:1}} ], init:2},
 {type:'slider', title:'Охарактеризуй качество сегодняшнего сна', qs:'Качество сна', opts:[
   {l:G('Часто просыпался','Часто просыпалась'),short:'Беспокойный',p:'vyaly',mood:'Вялый',c:C.grey, cat:{sleep:2}},
   {l:G('Спал спокойно','Спала спокойно'),short:'Спокойный',p:'calmSleep',mood:'Спящий',c:C.purple, cat:{sport:1}} ], init:1},
 {type:'slider', title:'Как ты чувствуешь себя физически?', qs:'Самочувствие', opts:[
   {l:'Очень вялый и больной',short:'Болею',p:'sick',mood:'Болеет',c:C.olive, cat:{sleep:2,reading:1}},
   {l:'Что-то болит',short:'Болит',p:'hurt',mood:'Что-то болит',c:C.rose, cat:{sleep:1,reading:1}},
   {l:'Немного устал'+G('','а')+', но норм',short:'Норм',p:'normik',mood:'Нормик',c:C.green, cat:{meditation:2}},
   {l:'Бодрый и заряженный',short:'Бодро',p:'bodr',mood:'Бодрый',c:C.yellow, cat:{sport:2}} ], init:2},
 {type:'slider', title:'Насколько загруженным был твой день?', qs:'Загруженность', opts:[
   {l:'Дел почти не было',short:'Почти нет',p:'calm',mood:'Спокойствие',c:C.green, cat:{sport:1,hobby:1,concert:1,exhibition:1}},
   {l:'Обычная нагрузка',short:'Обычно',p:'normal',mood:'Бодрость',c:C.yellow, cat:{sport:1,hobby:1,concert:1,exhibition:1}},
   {l:'Много дел',short:'Много',p:'tired',mood:'Усталость',c:C.grey, cat:{sleep:1,reading:1,meditation:1}},
   {l:'Очень много дел',short:'Очень много',p:'stress',mood:'Стресс',c:C.red, cat:{sleep:1,reading:1,meditation:2}} ], init:1},
 {type:'slider', title:'Оцени своё общение сегодня', qs:'Общение', opts:[
   {l:'Злой',short:'Злюсь',p:'angry',mood:'Злой',c:C.red, cat:{reading:1,meditation:2}},
   {l:'Уставший и вымотанный',short:'Вымотан'+G('','а'),p:'tired',mood:'Усталость',c:C.grey, cat:{meditation:1,sleep:1,reading:1}},
   {l:'Одинокий',short:'Одиноко',p:'lonely',mood:'Одинокий',c:C.blue, cat:{hobby:1,concert:1,exhibition:1}},
   {l:'Общительный и мега-весёлый',short:'Весело',p:'social',mood:'Общительный',c:C.violet, cat:{sport:2}} ], init:3},
 {type:'cards', mode:'single', title:G('Заботился ли ты о себе сегодня?','Заботилась ли ты о себе сегодня?'), qs:'Забота о себе', opts:[
   {l:G('Да, я уделил себе достаточно времени','Да, я уделила себе достаточно времени'),p:'bodr',c:C.yellow,bg:'var(--sand)',cat:{sport:1,hobby:1}},
   {l:'Да, но совсем немного',p:'calm',c:C.green,bg:'var(--mint)',cat:{meditation:1,reading:1}},
   {l:'Нет, сегодня не удалось',p:'tired',c:C.grey,bg:'var(--peach)',cat:{meditation:1,reading:1}},
   {l:'Я вообще никогда не забочусь о себе',p:'lonely',c:C.blue,bg:'var(--lav)',cat:{sleep:1,reading:1,meditation:1}} ]},
 {type:'cards', mode:'multi', title:'Было ли что-то, что повлияло на твоё состояние?', qs:'Что повлияло', sub:'Можно выбрать несколько', opts:[
   {l:'Да, положительно',s:'общение, встречи, хорошее расположение духа',p:'social',c:C.violet,bg:'var(--lav)',cat:{hobby:1,concert:1,exhibition:1}},
   {l:'Да, положительно',s:'выполненная задача, похвала, закрытый дедлайн, отдых',p:'bodr',c:C.yellow,bg:'var(--sand)',cat:{hobby:1,sport:1}},
   {l:'Да, отрицательно',s:'ссора, конфликт, сложная задача, неудача на работе/учёбе',p:'angry',c:C.red,bg:'var(--peach)',cat:{meditation:1,reading:1}},
   {l:'Да, отрицательно',s:'болезнь, физическое недомогание',p:'sick',c:C.olive,bg:'var(--mint)',cat:{sleep:1,checkup:2}},
   {l:'Нет',s:'ничего особенного не произошло',p:'normal',c:C.green,bg:'var(--card)',cat:{},none:true} ]},
 {type:'choice', title:'Выбери желаемый формат обратной связи', qs:'Формат', sub:'Можно выбрать один или оба', opts:[
   {l:'Рекомендация',s:'конкретный совет, что можно сделать для себя',p:'bodr',c:C.yellow,bg:'var(--mint)',fmt:'rec'},
   {l:'Поддержка',s:'тёплые слова, когда хочется, чтобы тебя поддержали',p:'social',c:C.violet,bg:'var(--pink)',fmt:'sup'} ]},
];}

const REC = {
 sleep:{t:'Сон',tag:'Режим и отдых',p:'calmSleep',c:C.purple,txt:()=>'Кажется, тебе стоит больше спать! Режим дня и здоровый сон – это неотъемлемые составляющие бодрости и хорошего физического состояния. Постарайся ложиться и просыпаться в одно и то же время. Следи, чтобы условия, в которых ты спишь, были комфортными: тёмное, тихое и прохладное (16–22 градуса) помещение. Не забывай, что за 30-60 минут до отхода ко сну стоит отказаться от гаджетов. Мы в тебя верим!'},
 meditation:{t:'Медитация',tag:'Дыхательная практика',p:'calm',c:C.green,txt:()=>'Это может показаться сложным, но попробуй самую простую медитацию – анапанасати, или медитацию на осознанном дыхании. Она поможет снизить уровень тревожности и стресса и прислушаться к себе. Настрой таймер – начать можно с 5 минут в день. Создай для себя комфортные условия: найди тихое место, переведи телефон в беззвучный режим или выключи его, сядь удобно – на стул с прямой спинкой или на пол, закрой глаза. Сделай три глубоких вдоха через нос (обрати внимания: ребра должны расширяться) и три шумных выдоха через рот – это “перезагружает” нервную систему. Найди точку для фокуса на собственном дыхании: кончик носа, носогубный треугольник или диафрагма – для каждого это будет что-то своё. Дыши спокойно и сконцентрируйся на этой точке. Иногда в голову могут приходить мысли – это абсолютно нормально, но старайся возвращать своё внимание к выбранной точке. Когда прозвенит таймер, медленно открой глаза, сделай несколько глубоких вдохов, потянись. Если во время дыхательной практики ты почувствуешь себя неважно, заверши её. Мы в тебя верим!',timer:true},
 sport:{t:'Физическая активность',tag:'Движение',p:'bodr',c:C.yellow,txt:()=>'Нет-нет, мы не предлагаем тебе несколько часов подряд заниматься в зале! Начни с прогулки на свежем воздухе – 20-30 минут в день, например, по пути с работы или учёбы, могут заметно улучшить настроение! Если ты занимаешься каким-то спортом, – бегом, танцами, йогой или плаванием – удели время на это. Занятия спортом стимулируют выработку гормонов счастья и снижают уровень гормонов стресса. Любимый спорт может вернуть тебя в колею быстрее, чем кажется! Ты сможешь!'},
 hobby:{t:'Хобби',tag:'Для души',p:'social',c:C.violet,txt:()=>G('Как давно ты занимался тем, что действительно вдохновляет именно тебя? Фотография, видеоигра, рисование, футбол или, может, готовка? Пора уделить время любимому хобби! Один час в день – и ты снова почувствуешь радость от возвращения к тому, что может надолго подпитать тебя!','Как давно ты занималась тем, что действительно вдохновляет именно тебя? Фотография, видеоигра, рисование, танцы или, может, готовка? Пора уделить время любимому хобби! Один час в день – и ты снова почувствуешь радость от возвращения к тому, что может надолго подпитать тебя!')},
 checkup:{t:'Чек-ап',tag:'Здоровье',p:'normal',c:C.blue,txt:()=>'Самое время сделать чек-ап и проверить свой организм. Забота о себе – самый дорогой подарок, который ты можешь себе сделать! Во многих клиниках общее обследование можно пройти по страховке и совершенно бесплатно. Очень советуем тебе сдать общий и биохимический анализы крови и мочи, сделать электрокардиограмму, УЗИ брюшной полости и щитовидной железы, измерить артериальное давление и посетить терапевта. Если у тебя есть проблемы со здоровьем или хронические заболевания, не забудь посетить профильного специалиста – офтальмолога, эндокринолога, кардиолога. Не болей!'},
 concert:{t:'Концерт',tag:'Мероприятие',p:'calm',c:C.violet,tickets:true,txt:()=>'Один из прекрасных способов расслабиться – посетить концерт классической музыки! Рекомендуем тебе концерт “От мировых хитов до любимых кинолент: вечер при свечах. Циммер, Мариконе, Таривердиев”, который пройдёт 14 ноября в Библиотеке-читальне им. Пушкина. Спокойная атмосфера и полюбившаяся музыка точно помогут тебе расслабиться!'},
 exhibition:{t:'Выставка',tag:'Мероприятие',p:'calm',c:C.blue,tickets:true,txt:()=>'Чтобы расслабиться и заземлиться, рекомендуем тебе посетить выставку! Сейчас в Третьяковской галерее на Лаврушинском переулке, 10 проходит экспозиция и выставка “Хрупкое искусство. Пастель из фондов графики XVIII – начала ХХ века”. Воздушная пастель и полумрак коридоров Третьяковки позволят погрузиться в мир искусства и сделать паузу в круговороте дел и задач.'},
 reading:{t:'Чтение',tag:'Уютный отдых',p:'calmSleep',c:C.green,txt:()=>'Уверены, что у каждого в заметках существует список книг, которые хотелось бы прочесть! Так почему бы не заварить себе какао, не укутаться в плед и не погрузиться в увлекательный мир вымышленных вселенных? Говорят, что в такую осеннюю погоду согреть может, например, “Шоколад” Джоан Харрис. Если ты не знаешь, какую книгу прочесть, но хочешь погрузиться в мир небольшой десертной лавочки во французской провинции, то это – отличный вариант!'},
};
const SUP = [
 ()=>G('Ты действительно делаешь очень многое, и мы искренне восхищаемся этим! Иногда стоит остановиться, оглянуться на всё то, чего тебе удалось добиться, и просто похвалить себя. Поверь: ты можешь собой гордиться. И ты достоин похвалы и восхищения!','Ты действительно делаешь очень многое, и мы искренне восхищаемся этим! Иногда стоит остановиться, оглянуться на всё то, чего тебе удалось добиться, и просто похвалить себя. Поверь: ты можешь собой гордиться. И ты достойна похвалы и восхищения!'),
 ()=>G('Ты невероятен! Иногда трудности могут казаться непреодолимыми, но знай: тебе всё по плечу. Просто иногда стоит дать себе немного отдыха. Мы верим в тебя и знаем, что ты со всем справишься! Это не просто слова. Ты действительно достоин восхищения!','Ты невероятна! Иногда трудности могут казаться непреодолимыми, но знай: тебе всё по плечу. Просто иногда стоит дать себе немного отдыха. Мы верим в тебя и знаем, что ты со всем справишься! Это не просто слова. Ты действительно достойна восхищения!'),
 ()=>'Иногда нам хочется обнять тебя через экран! Ты замечательный человек, чьи старания действительно имеют значение. Твоя сила духа восхищает нас. Продолжай, ведь совсем скоро ты обязательно достигнешь поставленной цели. А мы уже держим за тебя наши виртуальные кулачки!',
 ()=>G('Ничего себе! Это правда? Один человек может сделать столько всего? Поделись-ка своей продуктивностью! А если серьёзно, ты действительно достоин восхищения. И не только потому, что твоя работа настолько серьёзна и важна, а порой просто потому, что ты есть. Это уже волшебство!','Ничего себе! Это правда? Один человек может сделать столько всего? Поделись-ка своей продуктивностью! А если серьёзно, ты действительно достойна восхищения. И не только потому, что твоя работа настолько серьёзна и важна, а порой просто потому, что ты есть. Это уже волшебство!'),
];

/* ================= STATE ================= */
const today = new Date();
const state = {
  gender:'f', inputFormat:'opt', age:22, job:null, jobOther:'',
  answers:{}, texts:{}, recHistory:['sport','reading'], catBias:{}, supBag:[], lastRec:null, lastFmt:'rec',
  history:[], weekly:{}, skipIdx:0,
};

/* ================= HELPERS ================= */
const $=(s,r=document)=>r.querySelector(s);
const app=$('#app');
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
function hex2rgb(h){h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))}
function mixHex(a,b,t){const A=hex2rgb(a),B=hex2rgb(b);return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],t)).toString(16).padStart(2,'0')).join('')}
function mixPose(a,b,t){const o={};for(const k in a){o[k]=k==='heart'?mixHex(a.heart,b.heart,t):lerp(a[k],b[k],t)}return o}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;$('#phone').appendChild(t);setTimeout(()=>t.remove(),2300)}
function setTint(c){document.documentElement.style.setProperty('--tint',c)}
const ICON={
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="#A35F5F" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="#5E8434" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"/></svg>',
 book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 7h6"/></svg>',
 paw:'<svg viewBox="0 0 24 24" fill="#E0C0AC"><circle cx="7" cy="9" r="2.2"/><circle cx="12" cy="7" r="2.2"/><circle cx="17" cy="9" r="2.2"/><path d="M12 11c3 0 5.5 2.6 5.5 5 0 1.7-1.4 2.5-2.8 2.2-1-.2-1.7-.6-2.7-.6s-1.7.4-2.7.6C7.9 18.5 6.5 17.7 6.5 16c0-2.4 2.5-5 5.5-5z"/></svg>',
 pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
 wcheck:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
 wx:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" width="14" height="14"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
};

/* ================= MASCOT SVG ================= */
let uid=0;
function star(cx,cy,r){return `M${cx} ${cy-r} Q${cx+r*.18} ${cy-r*.18} ${cx+r} ${cy} Q${cx+r*.18} ${cy+r*.18} ${cx} ${cy+r} Q${cx-r*.18} ${cy+r*.18} ${cx-r} ${cy} Q${cx-r*.18} ${cy-r*.18} ${cx} ${cy-r}Z`}
function catSVG(s,size=200,opts={}){
  const id='m'+(uid++);
  const o=clamp((s.open-.12)/.25); const ry=Math.max(1.2,13*s.open);
  const eye=(x,y,side)=>{
    const b=s.brow; const inner=side<0?x+12:x-12, outer=side<0?x-12:x+12;
    const by=y-22;
    return `
    <g opacity="${o}"><ellipse cx="${x}" cy="${y}" rx="11.5" ry="${ry}" fill="#2B2828"/>
      <ellipse cx="${x+3.5}" cy="${y-ry*.38}" rx="${3.6*clamp(s.open,0,1.1)}" ry="${4.4*clamp(s.open,0,1.1)}" fill="#fff"/></g>
    <path d="M${x-12} ${y+1} Q${x} ${y+1-13*s.arc} ${x+12} ${y+1}" fill="none" stroke="#2B2828" stroke-width="4.2" stroke-linecap="round" opacity="${1-o}"/>
    <path d="M${outer} ${by-3*b} L${inner} ${by+5*b}" stroke="#4A3A33" stroke-width="3.6" stroke-linecap="round" opacity="${s.browOp}"/>`;
  };
  const m=s.mouth, my=111;
  const heart='M0 6 C-14 -6 -6 -18 0 -9 C6 -18 14 -6 0 6Z';
  const tw=opts.static?'':'twinkle'; const fl=opts.static?'':'floaty';
  return `<svg class="mascot" viewBox="0 0 230 250" width="${size}" height="${size*250/230}" role="img" aria-label="Котик">
  <defs><filter id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="${id}s" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="3"/></filter></defs>
  <ellipse cx="115" cy="240" rx="62" ry="7" fill="#000" opacity=".07"/>
  <!-- tail -->
  <path d="M160 205 C205 200 210 150 192 118" fill="none" stroke="#6E6560" stroke-width="19" stroke-linecap="round"/>
  <path d="M160 205 C205 200 210 150 192 118" fill="none" stroke="#FCF4E8" stroke-width="14" stroke-linecap="round"/>
  <path d="M199 136 C197 128 195 123 192 118" fill="none" stroke="#E8C4AE" stroke-width="14" stroke-linecap="round"/>
  <!-- body -->
  <ellipse cx="115" cy="186" rx="62" ry="52" fill="#FCF4E8" stroke="#6E6560" stroke-width="2.4"/>
  <!-- heart -->
  <g transform="translate(115 200) scale(1.55)"><path d="${heart}" fill="${s.heart}" filter="url(#${id}b)" opacity=".95"/></g>
  <!-- paws -->
  <g stroke="#6E6560" stroke-width="2.2" fill="#FCF4E8">
   <ellipse cx="85" cy="180" rx="15" ry="12"/><ellipse cx="145" cy="180" rx="15" ry="12"/>
   <ellipse cx="90" cy="232" rx="17" ry="10"/><ellipse cx="140" cy="232" rx="17" ry="10"/></g>
  <path d="M75 173 q6 -6 13 -3" stroke="#E8C4AE" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M142 170 q7 -2 12 4" stroke="#E8C4AE" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M84 238 v-5 M92 238 v-5 M134 238 v-5 M142 238 v-5" stroke="#6E6560" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M78 229 q4 -5 10 -4" stroke="#E8C4AE" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- head -->
  <g transform="rotate(${s.tilt} 115 140)">
   <path d="M44 52 C40 22 60 12 80 26 C100 21 130 21 150 26 C170 12 190 22 186 52 C194 80 196 112 184 128 C170 148 60 148 46 128 C34 112 36 80 44 52Z" fill="#FCF4E8" stroke="#6E6560" stroke-width="2.4" stroke-linejoin="round"/>
   <ellipse cx="66" cy="44" rx="15" ry="11" transform="rotate(-28 66 44)" fill="#F6D7C4"/>
   <ellipse cx="164" cy="44" rx="15" ry="11" transform="rotate(28 164 44)" fill="#F6D7C4"/>
   <ellipse cx="66" cy="104" rx="15" ry="8" fill="#F2A7A6" opacity="${.25+.45*s.blush}" filter="url(#${id}s)"/>
   <ellipse cx="164" cy="104" rx="15" ry="8" fill="#F2A7A6" opacity="${.25+.45*s.blush}" filter="url(#${id}s)"/>
   ${eye(82,80,-1)}${eye(148,80,1)}
   <path d="M108 96 Q115 93 122 96 Q119 104 115 105 Q111 104 108 96Z" fill="#E2B49A"/>
   <path d="M101 ${my} Q108 ${my+8*m} 115 ${my} Q122 ${my+8*m} 129 ${my}" fill="none" stroke="#3A3030" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" opacity="${1-s.mouthO*.85}"/>
   <ellipse cx="115" cy="${my+4}" rx="${4+2*s.mouthO}" ry="${1+6*s.mouthO}" fill="#9E5A5A" stroke="#3A3030" stroke-width="2.2" opacity="${clamp(s.mouthO*2)}"/>
   <g stroke="#7A5A4A" stroke-width="2.6" stroke-linecap="round"><path d="M40 98 L70 101 M41 107 L70 107"/><path d="M190 98 L160 101 M189 107 L160 107"/></g>
   <!-- tear -->
   <path d="M152 96 q-5 9 0 12 q5 -3 0 -12z" fill="#9EC4EA" opacity="${s.tear}"/>
   <path d="M78 96 q-5 9 0 12 q5 -3 0 -12z" fill="#9EC4EA" opacity="${s.tear*.8}"/>
   <!-- sweat -->
   <path d="M183 52 q-7 11 0 15 q7 -4 0 -15z" fill="#BFDCEB" stroke="#8FB7CF" stroke-width="1.5" opacity="${s.sweat}"/>
   <!-- anger mark -->
   <g stroke="#C47F7F" stroke-width="3.4" stroke-linecap="round" fill="none" opacity="${s.anger}">
     <path d="M166 34 q5 3 2 8 M178 30 q-3 5 2 8 M172 46 q-4 -4 -9 0 M184 42 q-5 -1 -6 4"/></g>
   <!-- hurt plaster -->
   <g opacity="${s.hurt}" transform="rotate(-28 70 58)"><rect x="54" y="52" width="32" height="13" rx="6.5" fill="#F3D2B6" stroke="#C9A386" stroke-width="1.5"/>
     <rect x="64" y="52" width="12" height="13" fill="#E7BC9C"/><circle cx="68" cy="57" r="1" fill="#C9A386"/><circle cx="72" cy="60" r="1" fill="#C9A386"/></g>
   <!-- sick: thermometer + cold compress -->
   <g opacity="${s.sick}"><path d="M122 114 L156 128" stroke="#7FA0C2" stroke-width="5" stroke-linecap="round"/><circle cx="158" cy="129" r="4.5" fill="#D57B7B"/>
     <rect x="88" y="26" width="54" height="16" rx="6" fill="#D2E5E3" stroke="#9EC4C2" stroke-width="1.5"/></g>
  </g>
  <!-- sparkles -->
  <g fill="#F2DC97" stroke="#CDAE56" stroke-width="1.4" opacity="${s.sparkle}">
    <path class="${tw}" d="${star(26,62,13)}"/><path class="${tw} d2" d="${star(206,36,11)}"/><path class="${tw} d3" d="${star(214,88,9)}"/><path class="${tw} d2" d="${star(18,118,9)}"/></g>
  <!-- zzz -->
  <g fill="#8A7BB5" font-family="Nunito" font-weight="900" opacity="${s.zzz}">
    <text class="${fl}" x="186" y="44" font-size="22">Z</text><text class="${fl} d2" x="204" y="24" font-size="15">z</text><text class="${fl} d3" x="214" y="10" font-size="11">z</text></g>
  <!-- love -->
  <g fill="#E6A9CB" opacity="${s.love}"><path class="${fl}" transform="translate(200 46) scale(.75)" d="${heart}"/><path class="${fl} d2" transform="translate(28 50) scale(.6)" d="${heart}"/><path class="${fl} d3" transform="translate(212 92) scale(.5)" d="${heart}"/></g>
  </svg>`;
}

/* ================= ROUTER ================= */
let cur='welcome', dir=1;
function go(name,back){dir=back?-1:1;cur=name;render()}
function screen(html,cls=''){
  app.innerHTML=`<div class="screen ${dir>0?'enter':'enterBack'} ${cls}">${html}</div>`;
  return app.firstElementChild;
}
function render(){
  const f=SCREENS[cur]||SCREENS.home; f(); syncSide();
}

/* ================= ONBOARDING (Блок 1) ================= */
const OB_TOTAL=4;
function obBar(i){return `<div class="topbar"><button class="iconbtn" aria-label="Назад" data-back>${ICON.back}</button>
  <div class="progress">${Array.from({length:OB_TOTAL},(_,k)=>`<i class="${k<i?'on':k===i?'cur':''}"></i>`).join('')}</div><span class="qcount">${i+1}/${OB_TOTAL}</span></div>`}
const SCREENS={
 welcome(){
  setTint(C.yellow);
  const el=screen(`
   <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:6px">
     <div class="mwrap"><div class="bob">${catSVG(pose('bodr',C.yellow),230)}</div></div>
     <h1 style="margin-top:16px">Привет!<br>Мы рады тебя видеть!</h1>
     <p class="muted" style="font-weight:700;font-size:16px;max-width:290px">Я буду каждый день спрашивать, как ты, и подсказывать, как позаботиться о себе</p>
     <p class="hand" style="margin-top:14px;transform:rotate(-3deg)">Больше хороших моментов ♡</p>
   </div>
   <p class="muted" style="text-align:center;font-size:13px;font-weight:700;margin-bottom:12px">Сначала пара вопросов перед началом</p>
   <button class="btn" data-next>Начать</button>`);
  el.querySelector('[data-next]').onclick=()=>go('obAge');
 },
 obAge(){
  setTint(C.blue);
  const el=screen(`${obBar(0)}
   <h1>Укажи возраст</h1><p class="muted" style="font-weight:700">Так рекомендации будут точнее</p>
   <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">
     <div class="row" style="align-items:center;gap:22px">
       <button class="round" aria-label="Меньше" data-d="-1" style="font-size:30px;font-weight:900">−</button>
       <div style="text-align:center"><div id="age" style="font-size:84px;font-weight:900;line-height:1">${state.age}</div><div class="muted" style="font-weight:800">лет</div></div>
       <button class="round" aria-label="Больше" data-d="1" style="font-size:30px;font-weight:900">+</button>
     </div>
   </div>
   <button class="btn" data-next>Далее</button>`);
  el.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{state.age=clamp(state.age+ +b.dataset.d,12,99);el.querySelector('#age').textContent=state.age});
  el.querySelector('[data-back]').onclick=()=>go('welcome',1);
  el.querySelector('[data-next]').onclick=()=>go('obGender');
 },
 obGender(){
  setTint(C.violet);
  const el=screen(`${obBar(1)}
   <h1>Укажи пол</h1><p class="muted" style="font-weight:700">Чтобы мы обращались к тебе правильно</p>
   <div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:center">
     ${[['m','Мужской','var(--mint)'],['f','Женский','var(--pink)']].map(([k,l,bg])=>`<button class="optcard ${state.gender===k?'sel':''}" data-g="${k}">
       <span class="ill" style="background:${bg}">${catSVG(pose(k==='m'?'normal':'social',k==='m'?C.blue:C.violet),60,{static:1})}</span>${l}</button>`).join('')}
   </div>
   <button class="btn" data-next>Далее</button>`);
  el.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{state.gender=b.dataset.g;el.querySelectorAll('[data-g]').forEach(x=>x.classList.toggle('sel',x===b));syncSide()});
  el.querySelector('[data-back]').onclick=()=>go('obAge',1);
  el.querySelector('[data-next]').onclick=()=>go('obJob');
 },
 obJob(){
  setTint(C.green);
  const jobs=['Учусь','Работаю','Учусь и работаю','Фриланс','Декрет','В поиске','Другое'];
  const el=screen(`${obBar(2)}
   <h1>Укажи род деятельности</h1><p class="muted" style="font-weight:700">Чем ты занимаешься большую часть дня?</p>
   <div style="flex:1;margin-top:22px">
    <div class="chips">${jobs.map(j=>`<button class="chip ${state.job===j?'sel':''}" data-j="${j}">${j}</button>`).join('')}</div>
    <input class="txt" id="other" placeholder="Напиши свой вариант" style="margin-top:16px;display:${state.job==='Другое'?'block':'none'}" value="${state.jobOther}">
   </div>
   <button class="btn" data-next ${state.job?'':'disabled'}>Далее</button>`);
  el.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{state.job=b.dataset.j;el.querySelectorAll('[data-j]').forEach(x=>x.classList.toggle('sel',x===b));
    el.querySelector('#other').style.display=state.job==='Другое'?'block':'none';el.querySelector('[data-next]').disabled=false});
  el.querySelector('#other').oninput=e=>state.jobOther=e.target.value;
  el.querySelector('[data-back]').onclick=()=>go('obGender',1);
  el.querySelector('[data-next]').onclick=()=>go('obFormat');
 },
 obFormat(){
  setTint(C.yellow);
  const el=screen(`${obBar(3)}
   <h1>Выбери удобный формат ввода ответа</h1><p class="muted" style="font-weight:700">Его можно поменять в любой момент</p>
   <div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:center">
     <button class="optcard ${state.inputFormat==='opt'?'sel':''}" data-f="opt"><span class="ill" style="background:var(--sand)">
       <svg width="44" height="44" viewBox="0 0 44 44"><rect x="4" y="18" width="36" height="9" rx="4.5" fill="#EDE5DA"/><rect x="4" y="18" width="22" height="9" rx="4.5" fill="#FFD57A"/><circle cx="26" cy="22.5" r="8" fill="#fff" stroke="#353333" stroke-width="2.5"/></svg></span>
       <span>Выбор из опций<small>Слайдеры и карточки — быстро, в пару касаний</small></span></button>
     <button class="optcard ${state.inputFormat==='text'?'sel':''}" data-f="text"><span class="ill" style="background:var(--lav)">
       <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#353333" stroke-width="2.6" stroke-linecap="round"><rect x="6" y="8" width="32" height="26" rx="7" fill="#fff"/><path d="M13 17h18M13 24h11"/></svg></span>
       <span>Написать свой текст<small>Опции остаются, а рядом — поле для своих слов</small></span></button>
   </div>
   <button class="btn" data-next>Готово</button>`);
  el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{state.inputFormat=b.dataset.f;el.querySelectorAll('[data-f]').forEach(x=>x.classList.toggle('sel',x===b));syncSide()});
  el.querySelector('[data-back]').onclick=()=>go('obJob',1);
  el.querySelector('[data-next]').onclick=()=>{toast('Профиль готов ♡');go('home')};
 },

/* ================= HOME ================= */
 home(){
  const last=state.history[state.history.length-1];
  const doneToday= last && last.date.toDateString()===today.toDateString();
  setTint(doneToday?last.c:C.yellow);
  const days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const strip=[];for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);
    const h=state.history.find(x=>x.date.toDateString()===d.toDateString());
    strip.push(`<div class="${i===0?'today':''}"><b class="${h?'f':''}" style="${h?'background:'+h.c:''}" title="${h?h.mood:''}"></b>${days[(d.getDay()+6)%7]}</div>`)}
  const mp = doneToday? state.lastPose : pose('normal',C.tan);
  const el=screen(`
   <div class="scroll">
   <div class="hello"><div><p class="muted" style="font-weight:800;text-transform:capitalize">${today.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'})}</p>
     <h1>${doneToday?'Спасибо, что заглянул'+G('','а')+'!':'Как ты сегодня?'}</h1></div></div>
   <div class="mwrap" style="margin:6px 0 4px"><div class="bob">${catSVG(mp||pose('normal',C.tan),190)}</div></div>
   ${doneToday?`<div class="card" style="display:flex;gap:12px;align-items:center"><i style="width:40px;height:40px;border-radius:50%;background:${last.c};flex:none"></i>
       <div style="flex:1"><b>Сегодня: ${last.mood}</b><p class="muted" style="font-size:13px;font-weight:700">${last.rec}</p></div>
       <button class="btn soft" style="width:auto;padding:10px 14px;font-size:14px" data-open-rec>Открыть</button></div>`
     :`<button class="btn" data-daily>Записать состояние</button>`}
   <div class="card" style="margin-top:14px">
     <div style="display:flex;justify-content:space-between;align-items:center"><b>Моя неделя</b><span class="muted" style="font-size:12px;font-weight:800">цвет = эмоция дня</span></div>
     <div class="week">${strip.join('')}</div>
   </div>
   <button class="banner" style="margin-top:14px" data-weekly>
     ${catSVG(pose('calm',C.purple),54,{static:1})}
     <span style="flex:1"><span class="weekly">${ICON.cal} 1 раз в неделю</span><b style="margin-top:4px">Еженедельный опрос</b><span>3 вопроса о наших советах · 1 минута</span></span>${ICON.back.replace('M15 5l-7 7 7 7','M9 5l7 7-7 7')}
   </button>
   <p class="hand" style="text-align:center;margin:18px 0 6px;transform:rotate(-2deg)">Маленькие шаги = большие перемены</p>
   </div>
   ${navHTML('home')}`);
  el.querySelector('[data-daily]')?.addEventListener('click',startDaily);
  el.querySelector('[data-open-rec]')?.addEventListener('click',()=>go('result'));
  el.querySelector('[data-weekly]').onclick=()=>startWeekly();
  bindNav(el);
 },
 diary(){
  setTint(C.lav);
  const items=[...state.history].reverse();
  const fmtDate=d=>d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'})+', '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
  const empty=`<div class="card" style="text-align:center;padding:24px 18px">
      <div class="mwrap"><div class="bob">${catSVG(pose('calm',C.tan),130)}</div></div>
      <b style="display:block;font-size:18px;margin-top:8px">Здесь появятся твои записи</b>
      <p class="muted" style="font-size:14px;font-weight:700;margin:6px 0 14px">Ответь на ежедневные вопросы — и сюда сохранится твоя эмоция дня, ответы и совет, который ты получил${G('','а')}</p>
      <button class="btn" data-daily>Записать состояние</button></div>`;
  const entry=h=>{const R_=h.recKey?REC[h.recKey]:null;
    return `<details class="card entry"><summary><i style="background:${h.c}"></i>
      <span style="flex:1"><b>${h.mood}</b><small>${h.rec}</small></span><span class="when">${fmtDate(h.date)}</span><span class="chev">▾</span></summary>
      <div class="ebody">
        <p class="elabel">Твои ответы</p>
        ${h.answers.map(a=>`<div class="arow"><span>${a.q}</span><b><i style="background:${a.c||'#ccc'}"></i>${a.a}${a.own?`<em>«${a.own}»</em>`:''}</b></div>`).join('')}
        ${R_?`<p class="elabel">Совет · ${R_.t}</p><p class="etext">${R_.txt()}</p>`:''}
        ${h.supIdx!=null&&h.fmt!=='rec'?`<p class="elabel">Поддержка</p><p class="etext">${SUP[h.supIdx]()}</p>`:''}
      </div></details>`};
  const el=screen(`<h1>Дневник</h1><p class="muted" style="font-weight:700;margin-bottom:12px">Твои записи после ежедневных вопросов</p>
   <div class="scroll"><div style="display:flex;flex-direction:column;gap:10px">
   ${items.length?items.map(entry).join(''):empty}
   </div>
   <div class="card" style="margin-top:14px"><b>Цвета эмоций</b><div class="legend">${EMO.map(([n,c])=>`<span><i style="background:${c}"></i>${n}</span>`).join('')}</div></div>
   </div>${navHTML('diary')}`);
  el.querySelector('[data-daily]')?.addEventListener('click',startDaily);
  bindNav(el);
 },
};
function navHTML(on){return `<nav class="nav"><button class="${on==='home'?'on':''}" data-nav="home">${ICON.home}Главная</button><button class="${on==='diary'?'on':''}" data-nav="diary">${ICON.book}Дневник</button></nav>`}
function bindNav(el){el.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{if(b.dataset.nav!==cur)go(b.dataset.nav)})}

/* ================= DAILY (Блок 2) ================= */
let Q=[], qi=0;
function startDaily(){Q=QUESTIONS();qi=0;state.answers={};state.texts={};go('q')}
SCREENS.q=function(){
  const q=Q[qi];
  const bar=`<div class="topbar"><button class="iconbtn" aria-label="Назад" data-back>${ICON.back}</button>
   <div class="progress">${Q.map((_,k)=>`<i class="${k<qi?'on':k===qi?'cur':''}"></i>`).join('')}</div><span class="qcount">${qi+1}/${Q.length}</span></div>`;
  const textBox = state.inputFormat==='text'?`<textarea class="txt" id="own" placeholder="Или опиши своими словами…" style="min-height:64px;margin-top:12px">${state.texts[qi]||''}</textarea>`:'';
  if(q.type==='slider') sliderScreen(q,bar,textBox); else if(q.type==='choice') choiceScreen(q,bar,textBox); else cardsScreen(q,bar,textBox);
};
function bindCommon(el){
  el.querySelector('[data-back]').onclick=()=>{ if(qi===0) go('home',1); else {qi--;go('q',1)} };
  const own=el.querySelector('#own'); if(own) own.oninput=e=>state.texts[qi]=e.target.value;
}
function nextQ(){ if(qi<Q.length-1){qi++;go('q')} else go('loading') }

function sliderScreen(q,bar,textBox){
  const n=q.opts.length, max=n-1;
  let target = state.answers[qi]!=null? state.answers[qi] : q.init;
  let t=target, idx=Math.round(t), dragging=false, raf;
  const grad = q.opts.map((o,i)=>`${o.c} ${n===1?0:i/max*100}%`).join(',');
  const el=screen(`${bar}
   <p class="qtitle">${q.title}</p>
   <div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0">
     <div style="text-align:center"><span class="moodchip"><i id="mc"></i><span id="mn"></span></span></div>
     <div class="mwrap" id="mw" style="margin-top:6px"><div class="bob" id="mb"></div></div>
     <div class="answer" id="ans"></div>
   </div>
   <div class="slider" id="sl">
     <div class="track" id="tr"><div class="fill" style="right:0;background:linear-gradient(90deg,${grad});opacity:.55"></div>
       ${q.opts.map((o,i)=>`<span class="dot" style="left:${i/max*100}%"></span>`).join('')}
       <div class="thumb" id="th" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="${max}" aria-label="${q.title}">${ICON.paw}<span class="bubble" id="bub"></span></div>
     </div>
     <div class="ticks ${n===2?'two':''}">${q.opts.map((o,i)=>`<button data-i="${i}" style="text-align:${n===2?(i?'right':'left'):'center'}">${o.short}</button>`).join('')}</div>
   </div>
   ${textBox}
   <button class="btn" data-next style="margin-top:18px">Далее</button>`);
  bindCommon(el);
  const tr=el.querySelector('#tr'), th=el.querySelector('#th'), mb=el.querySelector('#mb'), mw=el.querySelector('#mw');
  const pad=0; // thumb center travels full track width inset by radius
  function frac2px(f){const w=tr.clientWidth-46;return 23+f*w}
  function px2val(x){const r=tr.getBoundingClientRect();const k=r.width/tr.offsetWidth;return clamp((x-r.left-23*k)/(r.width-46*k))*max}
  function draw(){
    const i0=Math.floor(t), i1=Math.min(max,i0+1), f=t-i0;
    const A=q.opts[i0],B=q.opts[i1];
    const s=mixPose(pose(A.p,A.c),pose(B.p,B.c),f);
    mb.innerHTML=catSVG(s,n===2?215:215);
    th.style.left=frac2px(t/max)+'px'; th.style.borderColor=s.heart;
    setTint(s.heart);
    const near=q.opts[Math.round(t)];
    el.querySelector('#mc').style.background=s.heart;
    el.querySelector('#mn').textContent=near.mood;
    el.querySelector('#ans').textContent=near.l;
    el.querySelector('#bub').textContent=near.short;
    th.setAttribute('aria-valuenow',Math.round(t)); th.setAttribute('aria-valuetext',near.l);
    el.querySelectorAll('.ticks button').forEach((b,i)=>b.classList.toggle('on',i===Math.round(t)));
  }
  function loop(){
    const d=target-t; t+= d*(dragging?.45:.18);
    if(Math.abs(d)<.002) t=target;
    const ni=Math.round(t); if(ni!==idx){idx=ni;mw.classList.remove('boing');void mw.offsetWidth;mw.classList.add('boing')}
    draw();
    if(t!==target||dragging) raf=requestAnimationFrame(loop); else raf=null;
  }
  function kick(){ if(!raf) raf=requestAnimationFrame(loop) }
  function setTarget(v,snap){target=snap?Math.round(v):v; state.answers[qi]=Math.round(v); kick()}
  tr.addEventListener('pointerdown',e=>{dragging=true;th.classList.add('drag');tr.setPointerCapture(e.pointerId);setTarget(px2val(e.clientX));e.preventDefault()});
  tr.addEventListener('pointermove',e=>{if(dragging)setTarget(px2val(e.clientX))});
  const end=e=>{if(!dragging)return;dragging=false;th.classList.remove('drag');setTarget(target,true)};
  tr.addEventListener('pointerup',end);tr.addEventListener('pointercancel',end);
  th.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowUp'){setTarget(Math.min(max,Math.round(target)+1),1);e.preventDefault()}
    if(e.key==='ArrowLeft'||e.key==='ArrowDown'){setTarget(Math.max(0,Math.round(target)-1),1);e.preventDefault()}});
  el.querySelectorAll('.ticks button').forEach(b=>b.onclick=()=>setTarget(+b.dataset.i,1));
  state.answers[qi]=Math.round(target);
  requestAnimationFrame(()=>{draw()});
  el.querySelector('[data-next]').onclick=()=>{state.answers[qi]=Math.round(target);nextQ()};
}


function choiceScreen(q,bar,textBox){
  let sel=new Set(state.answers[qi]||[]);
  const el=screen(`${bar}
   <p class="qtitle">${q.title}</p>
   <p class="muted" style="font-weight:700;font-size:14px">${q.sub}</p>
   <div class="choice">${q.opts.map((o,i)=>`<button class="ch ${sel.has(i)?'sel':''}" data-i="${i}" style="background:${o.bg}" aria-pressed="${sel.has(i)}">
      <span class="tick">${ICON.wcheck}</span>${catSVG(pose(o.p,o.c),120,{static:1})}<b>${o.l}</b><small>${o.s}</small></button>`).join('')}</div>
   ${textBox}
   <button class="btn" data-next style="margin-top:16px" ${sel.size?'':'disabled'}>Далее</button>`);
  bindCommon(el);
  const nb=el.querySelector('[data-next]');
  el.querySelectorAll('.ch').forEach(b=>b.onclick=()=>{const i=+b.dataset.i; sel.has(i)?sel.delete(i):sel.add(i);
    b.classList.toggle('sel',sel.has(i)); b.setAttribute('aria-pressed',sel.has(i)); nb.disabled=!sel.size; state.answers[qi]=[...sel]});
  nb.onclick=()=>{const f=[...sel].map(i=>q.opts[i].fmt); state.lastFmt=f.length===2?'both':f[0]; state.answers[qi]=[...sel]; nextQ()};
}

function cardsScreen(q,bar,textBox){
  const multi=q.mode==='multi';
  let deck=q.opts.map((o,i)=>i);
  let picked = multi? new Set(state.answers[qi]||[]) : new Set();
  if(multi) deck=deck.filter(i=>!picked.has(i));
  const el=screen(`${bar}
   <p class="qtitle">${q.title}</p>
   <p class="muted" style="font-weight:700;font-size:14px">${q.sub?q.sub+' · ':''}смахни карточку пальцем</p>
   <div class="stack" id="stack"><div class="finger" id="finger" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="rgba(53,51,51,.28)" stroke="#fff" stroke-width="4"/><circle cx="32" cy="32" r="10" fill="#fff"/></svg></div></div>
   <div class="guide" aria-hidden="true"><span class="gno"><span class="arr">←</span><i>${ICON.wx.replace('#fff','#9A5252')}</i>Не то</span><span class="gyes">Про меня<i>${ICON.wcheck.replace('#fff','#4F7330')}</i><span class="arr">→</span></span></div>
   ${multi?'<div class="picked" id="picked"></div>':''}
   ${multi?'<button class="btn soft" style="margin-top:10px" data-done>Готово</button>':''}
   ${textBox}`);
  bindCommon(el);
  const stack=el.querySelector('#stack');
  function showPicked(){ if(!multi)return; el.querySelector('#picked').innerHTML=[...picked].map(i=>`<span>${q.opts[i].s?q.opts[i].s.split(',')[0]:q.opts[i].l}</span>`).join('') }
  function build(){
    stack.querySelectorAll('.scard').forEach(c=>c.remove());
    const vis=deck.slice(0,3);
    if(!vis.length){
      if(multi){ finish(); return }
      deck=q.opts.map((o,i)=>i); toast('Выбери вариант, который ближе ♡'); build(); return;
    }
    vis.slice().reverse().forEach((oi,ri)=>{
      const depth=vis.length-1-ri; const o=q.opts[oi];
      const c=document.createElement('div'); c.className='scard'+(depth===0?' top':'');
      c.style.background=o.bg; c.style.transform=`translateY(${depth*14}px) scale(${1-depth*.05})`; c.style.zIndex=10-depth;
      c.innerHTML=`<span class="glow"></span><span class="stamp yes"><i>${ICON.wcheck}</i>Про меня</span><span class="stamp no"><i>${ICON.wx}</i>Не то</span>
        ${catSVG(pose(o.p,o.c),150,{static:depth>0})}<div class="t">${o.l}</div>${o.s?`<div class="s">${o.s}</div>`:''}`;
      c.dataset.oi=oi; stack.appendChild(c);
      if(depth===0) dragCard(c);
    });
    const top=stack.querySelector('.scard.top');
    if(top && !touched){ top.classList.add('hint'); if((state.swipes||0)>=3) top.classList.add('once'); fingerOn(true) }
  }
  function fingerOn(on){const f=el.querySelector('#finger'); if(!f)return; f.classList.remove('on','once'); void f.offsetWidth;
    if(on){f.classList.add('on'); if((state.swipes||0)>=3) f.classList.add('once')}}
  function stopHint(){touched=true; stack.querySelectorAll('.hint').forEach(c=>c.classList.remove('hint','once')); fingerOn(false)}
  function replayHint(){touched=false; const top=stack.querySelector('.scard.top'); if(!top)return;
    top.classList.remove('hint','once'); top.style.transform=''; void top.offsetWidth; top.classList.add('hint','once');
    const f=el.querySelector('#finger'); f.classList.remove('on','once'); void f.offsetWidth; f.classList.add('on','once');
    toast('Смахни карточку вправо или влево'); touched=true}
  function dragCard(c){
    let sx=0,sy=0,dx=0,dy=0,down=false;
    const yes=c.querySelector('.stamp.yes'), no=c.querySelector('.stamp.no'), glow=c.querySelector('.glow');
    c.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sy=e.clientY;dx=0;dy=0;c.setPointerCapture(e.pointerId);
      const wasHint=c.classList.contains('hint'); stopHint(); c.classList.add('dragging')});
    c.addEventListener('pointermove',e=>{if(!down)return;dx=e.clientX-sx;dy=e.clientY-sy;
      c.style.transform=`translate(${dx}px,${dy*.3}px) rotate(${dx/14}deg)`;
      yes.style.opacity=clamp(dx/80);no.style.opacity=clamp(-dx/80);
      glow.style.background=dx>0?'#9BBB6F':'#C47F7F'; glow.style.opacity=clamp(Math.abs(dx)/80)*.22});
    const up=()=>{if(!down)return;down=false;c.classList.remove('dragging');
      if(dx>80) decide(true); else if(dx<-80) decide(false);
      else {c.style.transform='';yes.style.opacity=0;no.style.opacity=0;glow.style.opacity=0; if(Math.abs(dx)<8&&Math.abs(dy)<8) replayHint()}
      dx=0;dy=0};
    c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up);
  }
  let busy=false, touched=false;
  function decide(yes){
    state.swipes=(state.swipes||0)+1;
    if(busy)return; const c=stack.querySelector('.scard.top'); if(!c)return; busy=true;
    const oi=+c.dataset.oi;
    c.querySelector(yes?'.stamp.yes':'.stamp.no').style.opacity=1;
    c.style.transform=`translate(${yes?520:-520}px,40px) rotate(${yes?28:-28}deg)`; c.style.opacity=0;
    setTimeout(()=>{
      busy=false; deck.shift();
      if(yes){
        if(multi){
          if(q.opts[oi].none){picked=new Set([oi]);deck=[]} else {[...picked].forEach(p=>q.opts[p].none&&picked.delete(p));picked.add(oi)}
          state.answers[qi]=[...picked]; showPicked(); build();
        } else { state.answers[qi]=oi; if(q.opts[oi].fmt) state.lastFmt=q.opts[oi].fmt; nextQ(); }
      } else build();
    },300);
  }
  function finish(){ if(!picked.size){const ni=q.opts.findIndex(o=>o.none);if(ni>=0)picked.add(ni)} state.answers[qi]=[...picked]; nextQ() }
  if(multi) el.querySelector('[data-done]').onclick=finish;
  showPicked(); build();
}

/* ================= ALGORITHM ================= */
/* 1) каждый ответ добавляет баллы категориям (по скрипту ТЗ)
   2) штраф за недавние показы (антиповтор), 3) поправка по отзывам из Блока 3, 4) лёгкий случайный разброс */
function computeRecs(){
  const score={}, why={};
  Object.keys(REC).forEach(k=>{score[k]=0;why[k]=[]});
  Q.forEach((q,i)=>{
    const a=state.answers[i]; if(a==null||q.opts[0].fmt) return;
    (Array.isArray(a)?a:[a]).forEach(ai=>{const o=q.opts[ai]; for(const k in (o.cat||{})){score[k]+=o.cat[k]; why[k].push(o.short||o.s?.split(',')[0]||o.l)}});
  });
  const raw={...score};
  const hist=state.recHistory;
  Object.keys(score).forEach(k=>{
    const pos=hist.lastIndexOf(k); if(pos>=0){const ago=hist.length-pos; score[k]-= ago===1?3: ago<=3?1.5:0}
    score[k]+= (state.catBias[k]||0) + Math.random()*.6;
  });
  const order=Object.keys(score).sort((a,b)=>score[b]-score[a]);
  return {order,score,raw,why};
}
function pickSupport(){
  const loadIdx=state.answers[3]; // много дел → «столько всего»
  if(!state.supBag.length) state.supBag=[0,1,2,3].sort(()=>Math.random()-.5);
  let pick = (loadIdx>=2 && state.supBag.includes(3))?3:state.supBag[0];
  state.supBag=state.supBag.filter(x=>x!==pick); return pick;
}
function dayMood(){
  // эмоция дня = средневзвешенная из физ. состояния (Q3) и общения (Q5)
  const q3=Q[2].opts[state.answers[2]??2], q5=Q[4].opts[state.answers[4]??3];
  const map={'Бодрый':0,'Бодрость':0,'Спящий':1,'Одинокий':2,'Злой':3,'Стресс':3,'Общительный':4,'Нормик':5,'Спокойствие':5,'Усталость':6,'Вялый':6,'Болеет':6,'Что-то болит':6};
  const pick=(q5.mood==='Общительный'||q5.mood==='Злой'||q5.mood==='Одинокий')?q5:q3;
  const e=EMO[map[pick.mood]??5]; return {name:e[0],c:e[1],pose:pose(pick.p,pick.c)};
}

let RESULT=null;
SCREENS.loading=function(){
  const m=dayMood(); setTint(m.c);
  screen(`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:18px">
   <div class="mwrap"><div class="bob">${catSVG(m.pose,200)}</div></div>
   <h2>Подбираю ${state.lastFmt==='sup'?'тёплые слова':state.lastFmt==='both'?'совет и тёплые слова':'совет'} для тебя</h2><div class="dots3"><span></span><span></span><span></span></div></div>`);
  setTimeout(()=>{
    const r=computeRecs();
    RESULT={fmt:state.lastFmt,mood:m,recs:r,ri:0,sup: state.lastFmt!=='rec'?pickSupport():null};
    commitResult(); go('result');
  },1600);
};
function commitResult(){
  const m=RESULT.mood; const rt=REC[RESULT.recs.order[RESULT.ri]].t;
  const title= RESULT.fmt==='sup'?'Поддержка':RESULT.fmt==='both'?rt+' + поддержка':rt;
  if(RESULT.fmt!=='sup'){state.recHistory.push(RESULT.recs.order[RESULT.ri]); state.lastRec=RESULT.recs.order[RESULT.ri]; state.rated=false}
  else {state.lastRec=null}
  state.lastPose=m.pose;
  const answers=Q.map((q,i)=>{const a=state.answers[i]; if(a==null)return null;
    const arr=Array.isArray(a)?a:[a]; const os=arr.map(x=>q.opts[x]).filter(Boolean);
    return {q:q.qs||q.title, a:os.map(o=>o.s&&q.type==='cards'?o.l+': '+o.s:o.l).join('; '), c:os[0]?.c, own:state.texts[i]||''}}).filter(Boolean);
  const ent={date:new Date(),c:m.c,mood:m.name,rec:title,fmt:RESULT.fmt,recKey:RESULT.fmt!=='sup'?RESULT.recs.order[RESULT.ri]:null,supIdx:RESULT.sup,answers};
  RESULT.entry=ent;
  const li=state.history.findIndex(h=>h.date.toDateString()===today.toDateString());
  if(li>=0) state.history[li]=ent; else state.history.push(ent);
}
SCREENS.result=function(){
  if(!RESULT){go('home');return}
  const m=RESULT.mood; setTint(m.c);
  let body='';
  const supCard=`<div class="rec"><span class="tag" style="background:var(--pink)">Поддержка</span>
      <div class="mwrap" style="margin:6px 0"><div class="bob">${catSVG(pose('social',C.violet),RESULT.fmt==='both'?110:150)}</div></div>
      <p style="font-size:17px">${RESULT.sup!=null?SUP[RESULT.sup]():''}</p>
      <p class="hand" style="text-align:right;margin-top:10px">Ты справишься ♡</p>
      ${RESULT.fmt==='both'?'<button class="btn soft" data-more style="margin-top:10px;padding:12px">Ещё тёплые слова</button>':''}</div>`;
  if(RESULT.fmt==='sup'){
    body=supCard+`<div class="row" style="margin-top:16px"><button class="btn soft" data-more>Ещё слова</button><button class="btn" data-home>Спасибо ♡</button></div>`;
  } else {
    const k=RESULT.recs.order[RESULT.ri], R=REC[k];
    const reasons=[...new Set(RESULT.recs.why[k])].slice(0,4);
    const top=RESULT.recs.order.slice(0,4); const mx=Math.max(...top.map(x=>RESULT.recs.raw[x]),1);
    body=`<div class="rec"><span class="tag">${R.tag}</span>
      <div style="display:flex;align-items:center;gap:8px"><h2 style="flex:1">${R.t}</h2>${catSVG(pose(R.p,R.c),74,{static:1})}</div>
      <p>${R.txt()}</p>
      ${R.tickets?'<button class="btn soft" data-tix style="margin-top:12px;padding:12px">Билеты</button>':''}
      ${R.timer?'<button class="btn soft" data-timer style="margin-top:12px;padding:12px">Запустить таймер на 5 минут</button>':''}
      <details class="why"><summary>Почему этот совет? ▾</summary>
        <div class="chips" style="margin-top:8px;gap:6px">${reasons.map(r=>`<span>${r}</span>`).join('')||'<span>общий совет</span>'}</div>
        ${top.map(x=>`<div class="score"><span style="width:118px">${REC[x].t}</span><span class="bar"><i style="width:${Math.max(4,RESULT.recs.raw[x]/mx*100)}%;background:${REC[x].c}"></i></span></div>`).join('')}
        <ol><li>Каждый ответ добавляет баллы категориям советов (сон, медитация, спорт…)</li><li>Совет, показанный вчера, получает штраф — так советы не повторяются</li><li>Отзыв «полезно / бесполезно» поднимает или опускает категорию</li></ol>
      </details></div>
      ${RESULT.fmt==='both'?'<div style="height:14px"></div>'+supCard:''}
      <div class="row" style="margin-top:16px"><button class="btn soft" data-other>Другой совет</button><button class="btn" data-home>Сделаю!</button></div>`;
  }
  const el=screen(`<div class="topbar"><button class="iconbtn" aria-label="На главную" data-homeb>${ICON.home}</button>
     <span style="flex:1"></span><span class="moodchip"><i style="background:${m.c}"></i>Сегодня: ${m.name}</span></div>
     <div class="scroll" style="padding-bottom:6px">${body}</div>`);
  el.querySelector('[data-homeb]').onclick=()=>go('home',1);
  el.querySelector('[data-home]').onclick=()=>{toast(RESULT.fmt==='sup'?'Обнимаем ♡':'Сохранили в дневник ♡');go('home')};
  el.querySelector('[data-other]')?.addEventListener('click',()=>{state.recHistory.pop();RESULT.ri=(RESULT.ri+1)%RESULT.recs.order.length;commitResult();go('result')});
  el.querySelector('[data-more]')?.addEventListener('click',()=>{RESULT.sup=pickSupport();if(RESULT.entry)RESULT.entry.supIdx=RESULT.sup;go('result')});
  el.querySelector('[data-tix]')?.addEventListener('click',()=>toast('В прототипе — ссылка на билеты'));
  el.querySelector('[data-timer]')?.addEventListener('click',e=>{let s=300;const b=e.currentTarget;b.disabled=true;const iv=setInterval(()=>{s--;b.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')} · дыши спокойно`;if(s<=0||!document.body.contains(b))clearInterval(iv)},1000)});
};

/* ================= Блок 3: повторный вход ================= */
function reenter(){
  if(!state.lastRec){state.lastRec='meditation';state.rated=false}
  go('home');
  const R=REC[state.lastRec];
  const ov=document.createElement('div'); ov.className='overlay';
  ov.innerHTML=`<div class="sheet" role="dialog" aria-label="Отзыв о рекомендации"><div class="grab"></div>
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">${catSVG(pose('normal',R.c),70,{static:1})}
      <div><p class="muted" style="font-size:13px;font-weight:800">Вчерашний совет: ${R.t}</p><h2>Помогла ли вам наша рекомендация?</h2></div></div>
    <div style="display:flex;flex-direction:column;gap:10px">
     ${[['yes','Да, она показалась мне полезной','var(--green)','bodr'],['no','Нет, совершенно бесполезная вещь','var(--peach)','angry'],['later',G('Я отложил выполнение рекомендации','Я отложила выполнение рекомендации'),'var(--lav)','sleep']]
       .map(([k,l,bg,p])=>`<button class="optcard" data-fb="${k}" style="padding:10px;font-size:16px"><span class="ill" style="background:${bg};width:52px;height:52px;border-radius:14px">${catSVG(pose(p,R.c),44,{static:1})}</span>${l}</button>`).join('')}
    </div></div>`;
  $('#phone').appendChild(ov);
  ov.onclick=e=>{if(e.target===ov)ov.remove()};
  ov.querySelectorAll('[data-fb]').forEach(b=>b.onclick=()=>{
    const k=state.lastRec, v=b.dataset.fb;
    state.catBias[k]=(state.catBias[k]||0)+(v==='yes'?.8:v==='no'?-2.5:1.2);
    state.rated=true; ov.remove();
    toast(v==='yes'?'Ура! Будем советовать похожее':v==='no'?'Поняли, будем советовать реже':'Напомним об этом ещё раз');
  });
}

/* ================= Блок 4: еженедельный опрос ================= */
let W=[], wi=0;
function startWeekly(){
  const f=state.lastFmt;
  const recQ={type:'cards',mode:'multi',title:'Как ты оцениваешь наши рекомендации?',sub:'Можно выбрать несколько',
    opts:[['Полезные','bodr',C.yellow,'var(--sand)'],['Приятные','social',C.violet,'var(--pink)'],['Банальные','sleep',C.purple,'var(--mint)'],['Бессмысленные','angry',C.red,'var(--peach)']].map(([l,p,c,bg])=>({l,p,c,bg}))};
  const supQ={type:'cards',mode:'multi',title:'Как ты оцениваешь нашу поддержку?',sub:'Можно выбрать несколько',
    opts:[['Комфортная','bodr',C.yellow,'var(--sand)'],['Актуальная','social',C.violet,'var(--lav)'],['Демотивирующая','tired',C.grey,'var(--peach)'],['Однотипная','sleep',C.purple,'var(--mint)']].map(([l,p,c,bg])=>({l,p,c,bg}))};
  W=[
   ...(f==='sup'?[supQ]:f==='both'?[recQ,supQ]:[recQ]),
   {type:'slider',title:G('Как часто ты выполнял наши рекомендации?','Как часто ты выполняла наши рекомендации?'),init:1,opts:[
     {l:G('Я не выполнял рекомендации','Я не выполняла рекомендации'),short:'Никогда',p:'sleep',mood:'Сонливость',c:C.purple},
     {l:G('Выполнил меньше половины','Выполнила меньше половины'),short:'< половины',p:'tired',mood:'Усталость',c:C.grey},
     {l:G('Выполнял каждую 3–5 рекомендацию','Выполняла каждую 3–5 рекомендацию'),short:'Каждую 3–5',p:'calm',mood:'Спокойствие',c:C.green},
     {l:'Каждый раз',short:'Каждый раз',p:'bodr',mood:'Бодрость',c:C.yellow}]},
   {type:'text',title:G('Что ты мог бы посоветовать нам для улучшения?','Что ты могла бы посоветовать нам для улучшения?')},
  ];
  wi=0; state.weekly={}; go('wq');
}
SCREENS.wq=function(){
  // reuse daily renderers by swapping the question context
  const saveQ=Q, saveI=qi, saveA=state.answers;
  Q=W; qi=wi; state.answers=state.weekly;
  const q=W[wi];
  const bar=`<div class="topbar"><button class="iconbtn" aria-label="Назад" data-back>${ICON.back}</button>
   <div class="progress">${W.map((_,k)=>`<i class="${k<wi?'on':k===wi?'cur':''}"></i>`).join('')}</div><span class="weekly">${ICON.cal} 1 раз в неделю</span></div>`;
  const restore=()=>{wi=qi;Q=saveQ;qi=saveI;state.answers=saveA};
  if(q.type==='text'){
    setTint(C.lav);
    const el=screen(`${bar}<p class="qtitle">${q.title}</p><p class="muted" style="font-weight:700">Напиши свой ответ — мы читаем каждый</p>
      <div class="mwrap" style="margin:18px 0"><div class="bob">${catSVG(pose('social',C.violet),150)}</div></div>
      <textarea class="txt" id="wt" placeholder="Например: хочу больше советов про прогулки…" style="min-height:130px">${state.weekly.text||''}</textarea>
      <span style="flex:1"></span><button class="btn" data-next style="margin-top:16px">Отправить</button>`);
    restore();
    el.querySelector('#wt').oninput=e=>state.weekly.text=e.target.value;
    el.querySelector('[data-back]').onclick=()=>{wi--;go('wq',1)};
    el.querySelector('[data-next]').onclick=()=>go('wdone');
    return;
  }
  // patch nextQ/back for weekly
  const origNext=nextQ;
  nextQ=function(){ state.weekly[wi]=state.answers[qi]; nextQ=origNext; restore(); wi++; go('wq') };
  if(q.type==='slider') sliderScreen(q,bar,''); else cardsScreen(q,bar,'');
  const el=app.firstElementChild;
  el.querySelector('[data-back]').onclick=()=>{nextQ=origNext;restore(); if(wi===0) go('home',1); else {wi--;go('wq',1)}};
  // keep weekly context active while this screen is open (answers write to state.weekly)
};
SCREENS.wdone=function(){
  setTint(C.green);
  const el=screen(`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px">
    <div class="mwrap"><div class="bob">${catSVG(pose('social',C.green),210)}</div></div>
    <h1>Спасибо!</h1><p class="muted" style="font-weight:700;max-width:280px">С твоими ответами советы станут точнее. Увидимся через неделю ♡</p>
    <p class="hand" style="margin-top:10px">Маленькие шаги = большие перемены</p></div>
    <button class="btn" data-home>На главную</button>`);
  el.querySelector('[data-home]').onclick=()=>go('home');
};

/* ================= SIDE PANEL ================= */
function syncSide(){
  document.querySelectorAll('#gseg button').forEach(b=>b.classList.toggle('on',b.dataset.g===state.gender));
  document.querySelectorAll('#fseg button').forEach(b=>b.classList.toggle('on',b.dataset.f===state.inputFormat));
}
function jump(k){
  document.querySelector('.overlay')?.remove();
  if(k==='welcome')go('welcome'); else if(k==='daily')startDaily(); else if(k==='reenter')reenter(); else if(k==='weekly')startWeekly(); else go('home');
}
document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>jump(b.dataset.jump));
document.querySelectorAll('#gseg button').forEach(b=>b.onclick=()=>{state.gender=b.dataset.g;if(cur==='q'){Q=QUESTIONS()}render()});
document.querySelectorAll('#fseg button').forEach(b=>b.onclick=()=>{state.inputFormat=b.dataset.f;render()});
$('#fab').onclick=()=>{
  const ex=document.querySelector('.mobmenu'); if(ex){ex.remove();return}
  const m=document.createElement('div'); m.className='mobmenu';
  m.innerHTML=[['welcome','1. Онбординг'],['daily','2. Ежедневные вопросы'],['reenter','3. Повторный вход'],['weekly','4. Еженедельный опрос'],['home','Главный экран']]
    .map(([k,l])=>`<button data-k="${k}">${l}</button>`).join('')+`<button data-tg>Пол: ${state.gender==='f'?'женский':'мужской'} ⇄</button>`;
  document.body.appendChild(m);
  m.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{m.remove();jump(b.dataset.k)});
  m.querySelector('[data-tg]').onclick=()=>{state.gender=state.gender==='f'?'m':'f';m.remove();if(cur==='q')Q=QUESTIONS();render()};
};

/* ================= FIT PHONE TO WINDOW ================= */
function fit(){
  const b=document.body, ph=$('#phone'), box=$('#pbox');
  const W=innerWidth, H=innerHeight;
  const full = W<=600;
  b.classList.toggle('full',full);
  if(full){b.classList.remove('narrow');ph.style.transform='';box.style.width='';box.style.height='';return}
  const PW=414, PH=868; // phone + frame ring
  let k=Math.min(1,(H-32)/PH);
  const narrow = W < PW*k+32+40+300;
  b.classList.toggle('narrow',narrow);
  if(narrow) k=Math.min(k,(W-32)/PW);
  ph.style.transform=`scale(${k})`;
  box.style.width=PW*k+'px'; box.style.height=PH*k+'px';
}
addEventListener('resize',fit); fit();
render();
