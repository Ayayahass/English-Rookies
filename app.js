// حالة بسيطة تُحفظ في المتصفح
const state = JSON.parse(localStorage.getItem("kids-state") || "{}") || {};
state.stars ??= 0;
state.coins ??= 0;
state.units ??= 0;

function save() { localStorage.setItem("kids-state", JSON.stringify(state)); }
function refreshFooter() {
  document.getElementById("stars").textContent = state.stars;
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("units").textContent = state.units;
}

// صفحات كدوال ترجع HTML
const Home = () => `
  <section class="card center">
    <h1 style="font-size:28px;margin:0 0 12px">مرحباً بك 👋</h1>
    <p>ابدأ رحلتك التعليمية الممتعة!</p>
    <p style="margin:18px 0">
      <a class="btn" href="#/lesson">ابدأ الدرس</a>
    </p>
    <div>
      ⭐ ${state.stars} • 💰 ${state.coins} • الوحدات المكتملة: ${state.units}
    </div>
  </section>
`;

const Lesson = () => `
  <section class="card center">
    <h2>شاهد 🎥</h2>
    <div class="video">▶️ فيديو تعليمي (مكان الفيديو)</div>
    <p style="margin-top:16px">
      <a class="btn soft" href="#/practice">ابدأ التدريب</a>
    </p>
  </section>
`;

const Practice = () => `
  <section class="card center">
    <h2>تدرّب 🎮</h2>
    <p>مثال: لعبة مطابقة الصور بالكلمات</p>
    <div class="grid grid-3" style="max-width:420px;margin:12px auto">
      <div class="cell">🍎</div><div class="cell">تفاحة</div>
      <div class="cell">🐱</div><div class="cell">قطة</div>
      <div class="cell">🚗</div><div class="cell">سيارة</div>
    </div>
    <p><a class="btn" href="#/speak">تحدث الآن 🎤</a></p>
  </section>
`;

const Speak = () => `
  <section class="card center">
    <h2>تكلّم 🎤</h2>
    <p>سجّل صوتك وكرر: "This is an apple"</p>
    <p><button class="btn warn" onclick="fakeRecord()">⏺️ تسجيل الصوت</button></p>
    <p><a class="btn" href="#/book">اذهب للكتاب 📖</a></p>
  </section>
`;

const Book = () => `
  <section class="card center">
    <h2>📖 الكتاب</h2>
    <div class="video">📚 محتوى الكتاب التفاعلي هنا</div>
    <p><button class="btn yellow" onclick="completeBook()">أنجزت الكتاب ✅</button></p>
  </section>
`;

const Rewards = () => `
  <section class="card center">
    <h2>🏆 صندوق الكنز</h2>
    <div class="video">🗝️ صندوق الكنز</div>
    <p>استخدم النجوم لفتح الجوائز:</p>
    <ul style="list-style:none;padding:0">
      <li>👧 شخصية جديدة (10 ⭐)</li>
      <li>🎮 لعبة إضافية (8 ⭐)</li>
      <li>🐰 ملصقات ملونة (5 ⭐)</li>
    </ul>
    <p><a class="btn" href="#/">عودة للرئيسية</a></p>
  </section>
`;

// أفعال بسيطة
window.fakeRecord = function () {
  alert("محاكاة تسجيل الصوت ✅");
  state.coins += 1; save(); refreshFooter();
};

window.completeBook = function () {
  state.stars += 3; state.units += 1; save(); refreshFooter();
  alert("أحسنت! حصلت على 3 نجوم وتمت وحدة واحدة ✅");
};

// راوتر بسيط بالهاش
const routes = {
  "/": Home,
  "/lesson": Lesson,
  "/practice": Practice,
  "/speak": Speak,
  "/book": Book,
  "/rewards": Rewards,
};

function setActiveLink(path) {
  document.querySelectorAll(".nav a").forEach(a => a.classList.remove("active"));
  const id = {
    "/": "lnk-home", "/lesson":"lnk-lesson", "/practice":"lnk-practice",
    "/speak":"lnk-speak", "/book":"lnk-book", "/rewards":"lnk-rewards"
  }[path];
  if (id) document.getElementById(id).classList.add("active");
}

function router() {
  const path = (location.hash.replace("#", "") || "/");
  const view = routes[path] || Home;
  document.getElementById("app").innerHTML = view();
  setActiveLink(path);
  refreshFooter();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
