const questions = [
    {
      question: "Do you prefer the beach, mountains, or city?",
      options: ["beach", "mountains", "city"]
    },
    {
      question: "What’s your ideal climate?",
      options: ["warm", "cold", "mild"]
    }
  ];
  
  let current = 0;
  const answers = [];
  
  const container = document.getElementById('question-container');
  const progress = document.getElementById('progress');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const progressBar = document.getElementById('progress-bar');
  
  function updateProgressBar() {
    if (progressBar) {
      const inner = document.createElement('div');
      inner.style.width = ((current + 1) / questions.length) * 100 + '%';
      progressBar.innerHTML = '';
      progressBar.appendChild(inner);
    }
  }
  
  function loadQuestion() {
    const q = questions[current];
    container.innerHTML = `<h2>${q.question}</h2>` +
      q.options.map(opt => `
        <label>
          <input type="radio" name="answer" value="${opt}" ${answers[current] === opt ? 'checked' : ''}> ${opt}
        </label><br>`).join('');
    progress.textContent = `Question ${current + 1} of ${questions.length}`;
    nextBtn.textContent = current === questions.length - 1 ? 'Submit' : 'Next';
    prevBtn.style.display = current === 0 ? 'none' : 'inline-block';
    updateProgressBar();
  }
  
  nextBtn?.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return alert('Please choose an answer!');
    answers[current] = selected.value;
    if (current < questions.length - 1) {
      current++;
      loadQuestion();
    } else {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      window.location.href = 'results.html';
    }
  });
  
  prevBtn?.addEventListener('click', () => {
    if (current > 0) {
      current--;
      loadQuestion();
    }
  });
  
  if (container) loadQuestion();
  