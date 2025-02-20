let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerId;

const questions = [
  {
    question: "Berapa hasil dari 2 + 3?",
    options: ["4", "5", "6", "7"],
    answer: 1,
  },
  {
    question: "Hewan apa yang memiliki belalai?",
    options: ["Gajah", "Harimau", "Jerapah", "Kuda"],
    answer: 0,
  },
  {
    question: "Warna apa yang dihasilkan dari campuran merah dan kuning?",
    options: ["Hijau", "Ungu", "Oranye", "Biru"],
    answer: 2,
  },
  {
    question: "Bulan ke berapa hari kemerdekaan Indonesia?",
    options: ["Juli", "Agustus", "September", "Oktober"],
    answer: 1,
  },
];

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
  startTimer();
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((button) => (button.disabled = true));

  if (selectedIndex === question.answer) {
    score += 10;
    buttons[selectedIndex].classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[question.answer].classList.add("correct");
  }

  document.getElementById("score").textContent = score;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      resetTimer();
      buttons.forEach((button) => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
      });
    } else {
      showResult();
    }
  }, 1500);
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
        resetTimer();
      } else {
        showResult();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;
  startTimer();
}

function showResult() {
  clearInterval(timerId);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;
}
