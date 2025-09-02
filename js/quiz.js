// =========================
// Quiz.js
// Handles quiz logic
// =========================

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// --- Load questions from JSON ---
async function loadQuestions() {
  try {
    const response = await fetch("../data/questions.json");
    questions = await response.json();

    // Shuffle the questions so each attempt is unique
    questions = questions.sort(() => Math.random() - 0.5);

    showQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

// --- Display a question ---
function showQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  if (!quizContainer) return;

  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const questionObj = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="quiz-question">
      <h3>Q${currentQuestionIndex + 1}. ${questionObj.question}</h3>
      <div class="quiz-options">
        ${questionObj.options
          .map(
            (option, index) => `
          <button class="quiz-option" onclick="checkAnswer(${index})">
            ${option}
          </button>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// --- Check Answer ---
function checkAnswer(selectedIndex) {
  const questionObj = questions[currentQuestionIndex];
  const correctIndex = questionObj.answer;

  const optionButtons = document.querySelectorAll(".quiz-option");
  optionButtons.forEach((btn, idx) => {
    if (idx === correctIndex) {
      btn.classList.add("correct");
    } else if (idx === selectedIndex) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  // Move to next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 1500);
}

// --- Show final results ---
function showResults() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = `
    <div class="quiz-results">
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} / ${questions.length}</p>
      <button onclick="restartQuiz()">Try Again</button>
    </div>
  `;
}

// --- Restart Quiz ---
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questions = questions.sort(() => Math.random() - 0.5); // reshuffle
  showQuestion();
}

// --- Initialize Quiz ---
document.addEventListener("DOMContentLoaded", loadQuestions);
