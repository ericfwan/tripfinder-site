const questions = [
  {
    question: "What type of setting do you prefer?",
    options: ["Beach", "Mountains", "City"]
  },
  {
    question: "What's your ideal climate?",
    options: ["Warm", "Cold", "Mild"]
  },
  {
    question: "What's your travel goal?",
    options: ["Relaxation", "Adventure", "Culture"]
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
