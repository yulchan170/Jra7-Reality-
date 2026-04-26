// التحكم العام

    const splash = document.getElementById('splash-screen');

    setTimeout(() => {

      splash.style.opacity = '0';

      setTimeout(() => splash.style.display = 'none', 800);

    }, 2000);

    function handleLogin() {

      if (document.getElementById('login-email').value.includes('')) {

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

      document.getElementById(id).style.display = 'flex';

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

        title: " الدردشة العامة ",

        msgs: [{

          sender: "د. تالة",

          text: "أهلاً بالجميع، من لديه الخبرة في التقديم ؟",

          me: false

        }, {

          sender: "د. جنى",

          text: " أنا متوفرة للإجابة!",

          me: false

        }]

      },

      experience: {

        title: "استشارة سريعة ",

        msgs: [{

          sender: "الرد الآلي ",

          text: "زوّدني باستفسارك، وسأقوم بتوجيهه إلى المختص المناسب ليجيبك في أقرب وقت ممكن.",

          me: false

        }]

      },

      summaries: {

        title: "تحدى مع  أقرانك",

        msgs: [{

          sender: "د. جودي",

          text: "بنات مين جاهز للمراجعة؟",

          me: false

        }]

      },

      ai: {

        title: "CORA AI",

        msgs: [{

          sender: "CORA ",

          text: "مرحباً د. سارة، اسأليني أي سؤال طبي وسأجيبك فوراً.",

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

        sender: "د. نيڤين (أنت)",

        text: input.value,

        me: true

      });

      if (currentGroup === 'ai') {

        const userText = input.value;

        setTimeout(() => {

          let aiText = "بناءً على المصادر الطبية، هذا الإجراء يتطلب دقة عالية.";

          if (userText.includes("خياطة")) aiText = "خياطة الجروح أنواع، أهمها الـ Simple Interrupted.";

          groupData.ai.msgs.push({

            sender:"CORA ",

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

            sender: "د. نيڤين (أنت)",

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

  alert(`تم اختيار ${type} لقسم ${tool}`);

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

  alert(`تم اختيار ${source} لقسم ${section}`);

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


function showBluetoothInfo() {

  const box = document.getElementById("bluetooth-info");

  if (box.style.display === "none" || box.style.display === "") {

    box.style.display = "block";

  } else {

    box.style.display = "none";

  }

}



 

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// عرض المهام عند فتح الصفحة

window.onload = function () {

  renderTasks();

};

function addTask() {

  const date = document.getElementById("taskDate").value;

  const text = document.getElementById("taskText").value;

  if (!date || !text) return;

  const task = {

    id: Date.now(),

    date: date,

    text: text

  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  document.getElementById("taskText").value = "";

  document.getElementById("taskDate").value = "";

}

function renderTasks() {

  const list = document.getElementById("taskList");

  list.innerHTML = "";

  tasks.forEach(task => {

    list.innerHTML += `

      <li>

        📅 ${task.date} - 📝 ${task.text}

        <button onclick="deleteTask(${task.id})">❌ حذف</button>

      </li>

    `;

  });

}

function deleteTask(id) {

  tasks = tasks.filter(t => t.id !== id);

  saveTasks();

  renderTasks();

}

function saveTasks() {

  localStorage.setItem("tasks", JSON.stringify(tasks));

}