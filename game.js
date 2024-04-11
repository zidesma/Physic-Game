let currentQuestion = 0;
let score = 0;

function startGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const question = questions[currentQuestion];

  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(option) {
  const question = questions[currentQuestion];

  if (option === question.answer) {
    score++;
    alert("إجابة صحيحة!");
  } else {
    alert("إجابة خاطئة!");
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  alert(`انتهت اللعبة! لقد حصلت على ${score} من أصل ${questions.length} نقطة.`);
  resetGame();
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("gameContainer").style.display = "none";
}
