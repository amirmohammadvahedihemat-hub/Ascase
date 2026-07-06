/* ============================================================
   ASCASE — placeholder catalog
   Replace this data later with real products. Each product:
   id, name, cat (category key), price (تومان), oldPrice (optional),
   badge (optional), specs: [label, value], icon (svg key), accent (hex)
   ============================================================ */

const CATEGORIES = [
  { key: "cases",   title: "کاور و قاب گوشی",     desc: "محافظت دقیق، قالب‌بندی اختصاصی هر مدل",      icon: "case"   },
  { key: "phones",  title: "گوشی موبایل",          desc: "گوشی‌های اورجینال با گارانتی معتبر",          icon: "phone"  },
  { key: "screen",  title: "محافظ صفحه",           desc: "گلاس و نانو، نصب بدون حباب",                 icon: "screen" },
  { key: "charge",  title: "شارژر و کابل",          desc: "شارژ سریع، استاندارد و ایمن",                icon: "charge" },
  { key: "audio",   title: "هندزفری و هدفون",       desc: "بی‌سیم و سیمی، کیفیت صدای استودیویی",        icon: "audio"  },
  { key: "power",   title: "پاوربانک",              desc: "انرژی همراه برای روزهای پرمصرف",             icon: "power"  },
];

const PRODUCTS = [
  { id:"asc-101", name:"کاور آرمور سری ضربه‌گیر", cat:"cases", price:289000, oldPrice:349000, badge:"پرفروش", icon:"case", accent:"#FF4F2E",
    specs:[["DROP","2.4m"],["THK","1.1mm"],["MAT","TPU+PC"]] },
  { id:"asc-102", name:"کاور شفاف ضدزرد", cat:"cases", price:129000, icon:"case", accent:"#44607A",
    specs:[["DROP","1.5m"],["THK","0.9mm"],["MAT","TPU"]] },
  { id:"asc-103", name:"کاور چرمی مگ‌سیف", cat:"cases", price:349000, badge:"جدید", icon:"case", accent:"#8B6F4E",
    specs:[["DROP","1.8m"],["THK","1.0mm"],["MAT","Leather"]] },
  { id:"asc-104", name:"کاور کاربنی نیمه‌مات", cat:"cases", price:259000, icon:"case", accent:"#2B2E33",
    specs:[["DROP","2.0m"],["THK","1.0mm"],["MAT","Fiber"]] },
  { id:"asc-105", name:"کاور رنگی سری ساتن", cat:"cases", price:179000, icon:"case", accent:"#C2553F",
    specs:[["DROP","1.4m"],["THK","0.8mm"],["MAT","Silicone"]] },
  { id:"asc-106", name:"کاور استند مغناطیسی", cat:"cases", price:319000, icon:"case", accent:"#44607A",
    specs:[["DROP","2.0m"],["THK","1.2mm"],["MAT","PC+Stand"]] },

  { id:"asc-201", name:"ASCASE ایکس ۱۲ پرو", cat:"phones", price:48900000, badge:"پرفروش", icon:"phone", accent:"#181A1C",
    specs:[["RAM","8GB"],["STORE","256GB"],["BAT","5000mAh"]] },
  { id:"asc-202", name:"ASCASE نوا ۸", cat:"phones", price:21900000, icon:"phone", accent:"#44607A",
    specs:[["RAM","6GB"],["STORE","128GB"],["BAT","4500mAh"]] },
  { id:"asc-203", name:"ASCASE لایت ۵", cat:"phones", price:13900000, icon:"phone", accent:"#8B9097",
    specs:[["RAM","4GB"],["STORE","128GB"],["BAT","5000mAh"]] },
  { id:"asc-204", name:"ASCASE فولد ۲", cat:"phones", price:62900000, badge:"جدید", icon:"phone", accent:"#FF4F2E",
    specs:[["RAM","12GB"],["STORE","512GB"],["BAT","4800mAh"]] },

  { id:"asc-301", name:"گلاس فول‌چسب نسل ۳", cat:"screen", price:99000, icon:"screen", accent:"#44607A",
    specs:[["H","9H"],["OPT","99.9%"],["FIT","Edge"]] },
  { id:"asc-302", name:"نانو سرامیک ضدخش", cat:"screen", price:89000, icon:"screen", accent:"#8B9097",
    specs:[["H","8H"],["OPT","98%"],["FIT","Flat"]] },
  { id:"asc-303", name:"گلاس حریم‌خصوصی", cat:"screen", price:139000, badge:"جدید", icon:"screen", accent:"#2B2E33",
    specs:[["H","9H"],["VIEW","±28°"],["FIT","Edge"]] },

  { id:"asc-401", name:"کابل تایپ‌سی به تایپ‌سی ۱۰۰وات", cat:"charge", price:159000, icon:"charge", accent:"#FF4F2E",
    specs:[["PD","100W"],["LEN","1.2m"],["CORE","Braided"]] },
  { id:"asc-402", name:"شارژر دیواری دوپورت ۳۰وات", cat:"charge", price:289000, badge:"پرفروش", icon:"charge", accent:"#44607A",
    specs:[["PD","30W"],["PORT","2x"],["IN","220V"]] },
  { id:"asc-403", name:"شارژر بی‌سیم مگ‌سیف ۱۵وات", cat:"charge", price:349000, icon:"charge", accent:"#181A1C",
    specs:[["PD","15W"],["TYPE","MagSafe"],["LEN","1.5m"]] },

  { id:"asc-501", name:"ایرپاد بی‌سیم سری ایر", cat:"audio", price:1290000, badge:"پرفروش", icon:"audio", accent:"#181A1C",
    specs:[["ANC","Yes"],["BAT","28h"],["BT","5.3"]] },
  { id:"asc-502", name:"هدفون روگوشی استودیو", cat:"audio", price:2890000, icon:"audio", accent:"#44607A",
    specs:[["ANC","Yes"],["BAT","40h"],["BT","5.3"]] },
  { id:"asc-503", name:"هندزفری ورزشی نک‌بند", cat:"audio", price:690000, icon:"audio", accent:"#FF4F2E",
    specs:[["IPX","IPX5"],["BAT","18h"],["BT","5.2"]] },

  { id:"asc-601", name:"پاوربانک ۲۰۰۰۰ سریع‌شارژ", cat:"power", price:990000, badge:"جدید", icon:"power", accent:"#FF4F2E",
    specs:[["CAP","20000"],["PD","22.5W"],["PORT","3x"]] },
  { id:"asc-602", name:"پاوربانک جیبی ۱۰۰۰۰", cat:"power", price:590000, icon:"power", accent:"#44607A",
    specs:[["CAP","10000"],["PD","20W"],["PORT","2x"]] },
];

/* ---------- inline SVG icon templates (no external images) ---------- */
function svgIcon(type, accent){
  accent = accent || "#FF4F2E";
  const tpl = {
    case: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="6" width="92" height="148" rx="20" stroke="${accent}" stroke-width="4"/>
      <circle cx="84" cy="26" r="9" stroke="${accent}" stroke-width="3"/>
      <circle cx="84" cy="26" r="3.5" fill="${accent}"/>
      <rect x="42" y="138" width="36" height="5" rx="2.5" fill="${accent}" opacity=".6"/>
    </svg>`,
    phone: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="4" width="84" height="152" rx="16" stroke="${accent}" stroke-width="4"/>
      <rect x="46" y="12" width="28" height="4" rx="2" fill="${accent}"/>
      <circle cx="60" cy="146" r="5" stroke="${accent}" stroke-width="3"/>
    </svg>`,
    screen: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="8" width="88" height="144" rx="18" stroke="${accent}" stroke-width="3" stroke-dasharray="2 6"/>
      <rect x="26" y="18" width="68" height="124" rx="10" fill="${accent}" opacity=".15"/>
      <rect x="26" y="18" width="68" height="124" rx="10" stroke="${accent}" stroke-width="3"/>
    </svg>`,
    charge: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10h40v40l16 6-48 84 10-58H42l8-72z" stroke="${accent}" stroke-width="4" stroke-linejoin="round"/>
    </svg>`,
    audio: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 90V58a30 30 0 0 1 60 0v32" stroke="${accent}" stroke-width="4"/>
      <rect x="18" y="86" width="22" height="40" rx="10" stroke="${accent}" stroke-width="4"/>
      <rect x="80" y="86" width="22" height="40" rx="10" stroke="${accent}" stroke-width="4"/>
    </svg>`,
    power: `<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="14" width="80" height="132" rx="14" stroke="${accent}" stroke-width="4"/>
      <path d="M66 34 44 84h16l-6 42 30-58H68l4-34" fill="${accent}"/>
    </svg>`,
  };
  return tpl[type] || tpl.case;
}

function fmtPrice(n){
  return new Intl.NumberFormat('fa-IR').format(n);
}

function categoryTitle(key){
  const c = CATEGORIES.find(c => c.key === key);
  return c ? c.title : key;
}
