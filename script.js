// التحكم العام
    const splash = document.getElementById("splash-screen");

setTimeout(() => {
  splash.style.opacity = '0';

  setTimeout(() => {
    splash.style.display = 'none';
  }, 500);

}, 2000);

    function handleLogin() {
      if (document.getElementById('login-email').value.includes('@')) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
      } else {
        alert("يرجى إدخال ايميل صحيح");
      }
     
    }

    function handleRegister() {
      alert("تم التسجيل! يمكنك الدخول الآن");
      showScreen('login-screen');
    }

    function showScreen(id) {
      document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
     
     

  // أظهر الشاشة المطلوبة

  const screen = document.getElementById(id);

  if(screen) screen.style.display = 'flex';
    }
    // --- تعديل دوال القائمة الجانبية لحل مشكلة الظهور التلقائي ---
    function openSidebar() {
      document.getElementById('sidebar').classList.add('active');
      document.getElementById('overlay').style.display = 'block';
    }

    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('active');
      document.getElementById('overlay').style.display = 'none';
    }

    function goHome() {
      document.querySelectorAll('.section-page').forEach(p => p.style.display = 'none');
      document.getElementById('home-view').style.display = 'block';
      closeSidebar(); // إغلاق القائمة عند العودة للرئيسية
    }

    function showSection(id) {
      document.getElementById('home-view').style.display = 'none';
      document.querySelectorAll('.section-page').forEach(p => p.style.display = 'none');
      document.getElementById(id).style.display = 'block';
      if (id === 'faq-page') loadFAQs();
      closeSidebar(); // إغلاق القائمة عند اختيار أي قسم
      window.scrollTo(0, 0);
    }

    function showSubMenu(id) {
      const el = document.getElementById(id);
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
    // --- نظام الجروبات ---
    let currentGroup = '';
    const groupData = {
      students: {
        title: "مناقشة بين الطلاب",
        msgs: [{
          sender: "د. تالة",
          text: "أهلاً بالجميع، جاهزين نراجع لبعض؟",
          me: false
        }, {
          sender: "د. جنى",
          text: "يلا أنا جاهزة!",
          me: false
        }]
      },
      experience: {
        title: "تبادل الخبرات",
        msgs: [{
          sender: "د. نيرفانا",
          text: "سؤال: ما هي أفضل طريقة للتعامل مع نزيف الشريان الأورطي؟",
          me: false
        }]
      },
      summaries: {
        title: "مشاركة الملخصات",
        msgs: [{
          sender: "د. جودي",
          text: "أحد عنده ملخص البيولوجي؟",
          me: false
        }]
      },
      ai: {
        title: "CORA",
        msgs: [{
          sender: "CORA",
          text: "مرحباً د. سارة، أنا CORA مساعدتك الطبيه بالذكاء الاصطناعي!",
          me: false
        }]
      }
    };

    function openChat(groupKey) {
      currentGroup = groupKey;
      document.getElementById('chat-title').innerText = groupData[groupKey].title;
      document.getElementById('attach-btn').style.display = (groupKey === 'summaries') ? 'block' : 'none';
      showSection('chat-screen');
      renderMessages();
    }

    function renderMessages() {
      const container = document.getElementById('chat-messages');
      container.innerHTML = groupData[currentGroup].msgs.map(m => `

        <div class="bubble ${m.me ? 'me' : 'other'}">

            <span class="sender">${m.sender}</span>

            ${m.img ? `<img src="${m.img}" style="max-width:100%; border-radius:10px; margin-top:5px">` : ''}

            <div>${m.text}</div>

        </div>

    `).join('');
      container.scrollTop = container.scrollHeight;
    }

    function sendChatMessage() {
      const input = document.getElementById('chat-msg-input');
      if (!input.value) return;
      groupData[currentGroup].msgs.push({
        sender: "د. سارة (أنت)",
        text: input.value,
        me: true
      });
      if (currentGroup === 'ai') {
        const userText = input.value;
        setTimeout(() => {
          let aiText = "بناءً على المصادر الطبية، هذا الإجراء يتطلب دقة عالية.";
          if (userText.includes("خياطة")) aiText = "خياطة الجروح أنواع، أهمها الـ Simple Interrupted.";
          groupData.ai.msgs.push({
            sender: "الذكاء الاصطناعي",
            text: aiText,
            me: false
          });
          renderMessages();
        }, 800);
      }
      input.value = '';
      renderMessages();
    }

    function sendFile() {
      const file = document.getElementById('file-input').files[0];
      if (file && currentGroup === 'summaries') {
        const reader = new FileReader();
        reader.onload = function(e) {
          groupData.summaries.msgs.push({
            sender: "د. سارة (أنت)",
            text: "تم إرفاق ملخص",
            img: e.target.result,
            me: true
          });
          renderMessages();
        };
        reader.readAsDataURL(file);
      }
    }

    function loadFAQs() {
      const faqs = [
        ["هل التطبيق مجاني؟", "نعم للطلاب."],
        ["من هم المطورون؟", "طبيبات سعوديات."]
      ];
      document.getElementById('faq-list').innerHTML = faqs.map(f => `<div class="list-item"><b>${f[0]}</b><br><small>${f[1]}</small></div>`).join('');
    }
    function createCommunity() {

  const name = prompt("سمي المجتمع الخاص بك");

  const code = prompt("اختر الرمز السري للمجتمع");

  if (name && code) alert("تم إنشاء المجتمع بنجاح");

}

function joinCommunity() {

  const code = prompt("ادخل رمز المجتمع");

  if (code) alert("تم الدخول إلى المجتمع");

}
    function toggleQuestionOptions(id) {

  const el = document.getElementById(id);

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}

function selectType(subjectId, type) {

  const el = document.getElementById(subjectId);

  // بعد اختيار النوع، نعرض خيارات الصعوبة

  el.innerHTML = `

    <p>نوع السؤال: <b>${type}</b></p>

    <button onclick="selectDifficulty('${subjectId}','سهل')">سهل</button>

    <button onclick="selectDifficulty('${subjectId}','متوسط')">متوسط</button>

    <button onclick="selectDifficulty('${subjectId}','صعب')">صعب</button>

  `;

}

function selectDifficulty(subjectId, difficulty) {

  const el = document.getElementById(subjectId);

  el.innerHTML = `<p>تم اختيار: <b>${difficulty}</b></p>`;

}
    function toggleTools(id) {

  const el = document.getElementById(id);

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}

function selectToolType(tool, type) {

  if (tool.includes("الأدوات") && type === "نظري") {
    window.open("https://books.google.com/books?id=medical_tools", "_blank");
  }

  if (tool.includes("الأدوات") && type === "عملي") {
    window.open("https://youtu.be/yTdTg8TK8kw?si=y6LpA5VGW4w6ekQ4", "_blank");
  }

  if (tool.includes("الخياطة") && type === "نظري") {
    window.open("https://books.google.com/books?id=suturing_book", "_blank");
  }

  if (tool.includes("الخياطة") && type === "عملي") {
    window.open("https://youtu.be/NnKdmjX5pWU?si=xBFf9zqgVPsTZtGz", "_blank");
  }

  if (tool.includes("العمليات") && type === "نظري") {
    window.open("https://books.google.com/books?id=surgery_book", "_blank");
  }

  if (tool.includes("العمليات") && type === "عملي") {
    window.open("https://youtube.com/playlist?list=PLqKadadYB3K1d8lAS_Ys40ozRDw6b7Oit&si=Pgk1urAsN8_0M1As", "_blank");
  }


}
    function toggleProgress() {

  const panel = document.getElementById('progress-panel');

  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';

}
    function toggleLibrary(id) {

  const el = document.getElementById(id);

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}

function selectLibrary(section, source) {

  if (source.includes("المكتبة الرقمية")) {

    window.open("https://sdl.edu.sa", "_blank");

  }

  if (source.includes("Google")) {

    window.open("https://scholar.google.com", "_blank");

  }

}


    // --- إضافة خيارات أسفل كل موضوع في بنك الأسئلة ---

document.querySelectorAll('#questions-page .list-item').forEach(item => {

  // أنشئ div صغير يحوي الخيارات

  const optionsDiv = document.createElement('div');

  optionsDiv.style.marginTop = '5px';

  optionsDiv.style.display = 'flex';

  optionsDiv.style.gap = '8px';

  // قائمة الخيارات

  const options = ['صح أو خطأ', 'اختيار من متعدد', 'بطاقات'];

  options.forEach(opt => {

    const btn = document.createElement('button');

    btn.textContent = opt;

    btn.style.fontSize = '0.7rem';
    

    btn.style.padding = '2px 6px';

    btn.style.borderRadius = '6px';

    btn.style.border = '1px solid #ddd';

    btn.style.cursor = 'pointer';

    btn.style.background = '#fff';

    btn.style.color = 'var(--accent)';

    // عند الضغط على الخيار يظهر alert لاختيار الصعوبة

    btn.onclick = () => alert('اختر الصعوبة: سهل | متوسط | صعب');

    optionsDiv.appendChild(btn);

  });

  item.appendChild(optionsDiv); // ضيف الخيارات تحت كل موضوع

});
document.getElementById("language-card").addEventListener("click", function(){
  alert("اختر اللغة: العربية أو الإنجليزية");
});
function toggleBluetoothInfo() {

  const el = document.getElementById('bluetooth-info');

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}
function selectLibrary(section, source) {

  if (source.includes("المكتبة الرقمية")) {

    window.open("https://sdl.edu.sa", "_blank");

  }

  if (source.includes("Google")) {

    window.open("https://scholar.google.com", "_blank");

  }
function toggleCommunity(id){

  const el = document.getElementById(id);

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}
}function toggleCommunity(id){

  const el = document.getElementById(id);

  el.style.display = el.style.display === 'none' ? 'block' : 'none';

}
// جلب العناصر

const taskPage = document.getElementById("tasks-page");

const dateInput = taskPage.querySelector('input[type="date"]');

const textInput = taskPage.querySelector('input[type="text"]');

const saveBtn = taskPage.querySelector('button.btn-main'); // زر "حفظ المهمة"

const addBtn = taskPage.querySelector('button:nth-of-type(2)'); // زر "إضافة مهمة جديدة"

// إنشاء قائمة المهام

let tasksList = document.createElement("ul");

tasksList.style.marginTop = "10px";

tasksList.style.padding = "0";

tasksList.style.listStyle = "none";

taskPage.insertBefore(tasksList, addBtn);

// دالة لإضافة مهمة

function addTask(text, date) {

  const li = document.createElement("li");

  li.style.display = "flex";

  li.style.justifyContent = "space-between";

  li.style.alignItems = "center";

  li.style.margin = "5px 0";

  li.style.background = "#f7f7f7";

  li.style.padding = "5px 10px";

  li.style.borderRadius = "5px";

  const span = document.createElement("span");

  span.textContent = `📌 ${text} - ${date}`;

  const delBtn = document.createElement("button");

  delBtn.textContent = "🗑️";

  delBtn.style.background = "#A31F2A";

  delBtn.style.color = "#fff";

  delBtn.style.border = "none";

  delBtn.style.borderRadius = "3px";

  delBtn.style.cursor = "pointer";

  delBtn.style.padding = "2px 6px";

  

  // عند الضغط على زر الحذف

  delBtn.addEventListener("click", () => {

    tasksList.removeChild(li);

  });

  li.appendChild(span);

  li.appendChild(delBtn);

  tasksList.appendChild(li);

}

// زر حفظ المهمة

saveBtn.addEventListener("click", () => {

  const text = textInput.value.trim();

  const date = dateInput.value;

  if (!text || !date) {

    alert("اكتب المهمة وحدد التاريخ");

    return;

  }

  addTask(text, date);

  textInput.value = "";

  dateInput.value = "";

});

// زر إضافة مهمة جديدة (يعيد تركيز الحقول)

addBtn.addEventListener("click", () => {

  textInput.focus();

});