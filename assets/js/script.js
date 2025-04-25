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

// Load a question
function loadQuestion() {
  const q = questions[current];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    <div class="option-group">
      ${q.options.map(opt => `
        <label class="option">
          <input type="radio" name="answer" value="${opt}" ${answers[current] === opt ? 'checked' : ''}>
          ${opt}
        </label>
      `).join('')}
    </div>
  `;

  // Update progress text
  progressText.textContent = `Question ${current + 1} of ${questions.length}`;

  // Update progress bar width
  const percentage = ((current + 1) / questions.length) * 100;
  progressBar.style.width = percentage + "%";

  // Hide prev button on first question
  prevBtn.style.display = current === 0 ? "none" : "inline-block";

  // Change "Next" to "Submit" on last question
  nextBtn.textContent = current === questions.length - 1 ? "Submit" : "Next";
}

// Handle "Next"
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer!");

  answers[current] = selected.value;

  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    window.location.href = "results.html";
  }
});

// Handle "Previous"
prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
});

// Init
loadQuestion();
