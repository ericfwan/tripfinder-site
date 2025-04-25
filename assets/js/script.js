const questions = [
  {
    question: "What kind of city vibe are you drawn to?",
    options: ["✨ Artistic and romantic", "🌃 Futuristic and fast-paced", "🏙️ Bold and bustling with energy"]
  },
  {
    question: "What’s your ideal way to spend a free day?",
    options: ["🖼️ Visiting museums and sipping coffee", "🎮 Exploring tech districts or arcades", "🛍️ Shopping and seeing a Broadway show"]
  },
  {
    question: "Which food experience excites you the most?",
    options: ["🥐 Fresh pastries and fine dining", "🍣 Sushi, ramen, and quirky treats", "🍕 Iconic street food and world cuisine"]
  },
  {
    question: "What kind of fashion/style inspires you?",
    options: ["🧥 Chic, timeless, designer", "🧢 Creative, tech-inspired, playful", "👟 Trendy, bold, statement-making"]
  },
  {
    question: "What kind of adventure are you looking for?",
    options: ["💘 A romantic getaway", "🎌 Culture shock and discovery", "🎤 Big-city thrill and nightlife"]
  }
];

let current = 0;
const answers = [];

const questionContainer = document.getElementById("question-container");
const progressBar = document.getElementById("progress-bar").firstElementChild;
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressText = document.getElementById("progress");

function loadQuestion() {
  const q = questions[current];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    <div class="option-group">
      ${q.options.map(opt => `
        <div class="option ${answers[current] === opt ? 'selected' : ''}" data-value="${opt}">
          ${opt}
        </div>
      `).join('')}
    </div>
  `;

  document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      answers[current] = option.dataset.value;
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");
    });
  });

  progressText.textContent = `Question ${current + 1} of ${questions.length}`;
  progressBar.style.width = ((current + 1) / questions.length) * 100 + "%";
  prevBtn.style.display = current === 0 ? "none" : "inline-block";
  nextBtn.textContent = current === questions.length - 1 ? "Submit" : "Next";
}

nextBtn.addEventListener("click", () => {
  if (!answers[current]) return alert("Please select an answer!");
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    window.location.href = "results.html";
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
});

loadQuestion();
